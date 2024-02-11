Number.prototype.limitation = function (min, max) {
	if (isNaN(this)) return min;
	else if (this < min) return min;
	else if (this > max) return max;
	else return this;
};
const OPTIONS = {
	Number: (request, option, index) => {
		if (option.type === "number") {
			let numberValue = parseInt(option.value);
			numberValue = numberValue.limitation(option.min, option.max);
			if (option.name == "text_length" && !option.selected)
				numberValue = 0;
			request[index][option.name] = numberValue;
		}
	},
	Text: (request, option, index) => {
		if (option.type === "text") {
			let textValue = option.value + "";
			request[index][option.name] = textValue;
		}
	},
	SelectIndex: (request, option, index) => {
		if (option.type === "select" && option.outputIndex) {
			option.value.forEach((optionValue) => {
				if (optionValue.selected)
					request[index][option.name] = optionValue.index;
			});
		}
	},
	SelectType: (request, option, index) => {
		if (option.type === "select" && option.name === "type") {
			option.value.forEach((optionMap) => {
				if (optionMap[0].selected) {
					request[index][option.name] = optionMap[0].name;
					Object.keys(optionMap[1]).forEach((key) => {
						request[index][key] = optionMap[1][key];
					});
				}
			});
		}
	},
	Checkbox: (request, option, index) => {
		if (option.type === "checkbox") {
			if (request[index]) {
				request[index][option.name] = option.value;
			} else {
				request[index - 1][option.name] = option.value;
			}
		}
	},
	Columns: (request, option, index) => {
		if (option.type === "columns") {
			request[index][option.name] = [];
			let disabledColumns = 0;
			option.value.forEach((column, id) => {
				let position = 0;
				if (column.selected) position = id + 1 - disabledColumns;
				else if (!column.selected) {
					position = 0;
					disabledColumns++;
				}
				request[index][option.name].push({
					id: column.name,
					position: position,
				});
				if (column.params) {
					column.params.forEach((param) => {
						if (param.type == "checkbox") {
							request[index][option.name][id][param.name] =
								param.selected;
						} else if (param.type == "color") {
							request[index][option.name][id]["color"] = formatIs(
								"pdf"
							)
								? param.value
								: param.value.split("#")[1];
						}
					});
				}
			});
		}
	},
	DropdownTag: (request, option, index) => {
		if (option.type === "dropdown" && option.name === "tag_highlight") {
			request[index][option.name] = {};
			option.value.forEach((optionValue) => {
				let newValue = optionValue.value;
				if (optionValue.type == "color") {
					if (!formatIs("pdf")) {
						newValue =
							optionValue.value !== +optionValue.value &&
							optionValue.value.indexOf("#") > -1
								? optionValue.value.split("#")[1]
								: optionValue.value;
					}
				}
				request[index][option.name][optionValue.name] = newValue;
			});
		}
	},
	DropdownOrder: (request, option, index) => {
		if (option.type === "dropdown" && option.name === "order") {
			request[index][option.name] = {};
			option.value.forEach((optionValue) => {
				if (
					optionValue[0].type === "select" &&
					optionValue[0].outputIndex
				) {
					optionValue[1].forEach((optionSelect) => {
						if (optionSelect.selected)
							request[index][option.name][optionValue[0].name] =
								optionSelect.index;
					});
				}
			});
			switch (option.draggables[0][0].name) {
				case "sentiments":
					request[index][option.name]["predominantly"] = 0;
					break;
				case "categories":
					request[index][option.name]["predominantly"] = 1;
					break;
				default:
					break;
			}
			option.draggables.forEach((optionDraggable) => {
				request[index][option.name][optionDraggable[0].name] = [];
				if (optionDraggable[0].selected) {
					if (optionDraggable[0].name === "sentiments") {
						optionDraggable[1].forEach((sentiment, id) => {
							let _id = id + 1;
							if (!sentiment.selected) _id = 0;
							request[index][option.name][
								optionDraggable[0].name
							].splice(sentiment.defaultPosition, 0, _id);
						});
					} else if (optionDraggable[0].name === "categories") {
						optionDraggable[1].forEach((category) => {
							if (category.selected)
								request[index][option.name][
									optionDraggable[0].name
								].push(category.name);
						});
					}
				} else {
					request[index][option.name][optionDraggable[0].name] = 0;
				}
			});
		}
	},
};

let error = reactive(ref(false));
let message = reactive(ref(""));

function hasGroupError() {
	let hasErrors = false;
	if (formatIs("daily_reports") || formatIs("powerpoint")) return hasErrors;

	let groups = currentReport.value.filter(
		(element) => element[0].name == "GROUP"
	);

	groups.forEach((group) => {
		if (group[1].elements.length != 2) {
			message.value = "Group Error";
			hasErrors = true;
		}
	});
	return hasErrors;
}
function hasProjectError() {
	if (error.value) return error.value;
	let hasErrors = false;
	if (!formatIs("daily_reports") && !formatIs("powerpoint")) return hasErrors;

	let groups = currentReport.value.filter(
		(element) => element[0].name == "GROUP"
	);

	groups.forEach((group) => {
		if (
			group[1].elements.length == 0 ||
			group[0].projectId == "" ||
			group[0].projectName == ""
		) {
			message.value = "Project Error";
			hasErrors = true;
		}
	});
	return hasErrors;
}

function getProjectName() {
	let projectName = document.querySelector("#project-name").value;
	return projectName != "" ? projectName : "Мой Шаблон";
}

function getOptionType(option) {
	switch (option.type) {
		case "text":
			return "Text";
		case "number":
			return "Number";
		case "checkbox":
			return "Checkbox";
		case "select":
			if (option.outputIndex) {
				return "SelectIndex";
			} else if (option.name == "type") {
				return "SelectType";
			}
			break;
		case "columns":
			return "Columns";
		case "dropdown":
			if (option.name == "tag_highlight") {
				return "DropdownTag";
			} else if (option.name == "order") {
				return "DropdownOrder";
			}
			break;
		default:
			break;
	}
}
import {
	selectedOrientation,
	selectedFull_page_title,
	selectedPDF_orientation,
	selectedFormat,
	formatIs
} from "@/use/data/select";
import request from "@/use/utils/request";
import { checkbox } from "@/use/data/checkbox";
import { currentReport } from "@/use/data/reports_copy";
import { reactive, ref } from "vue";


// создаем пост дату для отчета
export default function createPostData() {
	message.value = "";
	error.value = hasGroupError();
	error.value = hasProjectError();

	let params = request.params;

	// копируем  настройки текущего отчета
	let copyArray = JSON.parse(JSON.stringify(currentReport.value));
	let postData = [];
	let ownIndex = 0;

	if (
		copyArray.find((el) => el[0].name == "GROUP") == undefined &&
		(formatIs("powerpoint") || formatIs("daily_reports"))
	) {
		let key = {
			id: `group-1`,
			name: "GROUP",
			projectId: params.an_id,
			projectName: decodeURI(params.projectName),
			error: "Не менее одного элемента в проекте.",
		};
		let value = { elements: [...copyArray] };

		[[key, value]].forEach(([key, value], index) => {
			if (value.elements.length) {
				postData.push({
					position: `1`,
					elements: [],
					projectName: key.projectName,
					projectId: key.projectId,
				});
				ownIndex = 0;
				value.elements.forEach(
					([elementKey, elementValue], elementIndex) => {
						// задаем позициию и id элемента
						postData[index].elements.push({
							id: elementKey.name,
							position: `${elementIndex + 1}`,
						});
						elementValue.forEach((option) => {
							OPTIONS[getOptionType(option)](
								postData[index].elements,
								option,
								ownIndex
							);
						});
						ownIndex++;
					}
				);
			}
		});
	} else {
		console.log(copyArray)
		copyArray.forEach(([key, value], index) => {
			if (key.name !== "GROUP") {
				postData.push({
					id: key.name,
					position: index + 1,
				});
				value.forEach((option) => {
					OPTIONS[getOptionType(option)](postData, option, ownIndex);
				});
				ownIndex++;
			} else {
				if (value.elements.length) {
					if (formatIs("powerpoint") || formatIs("daily_reports")) {
						postData.push({
							position: `${index + 1}`,
							elements: [],
							projectName: key.projectName,
							projectId: key.projectId,
						});
						ownIndex = 0;
						value.elements.forEach(
							([elementKey, elementValue], elementIndex) => {
								postData[index].elements.push({
									id: elementKey.name,
									position: `${elementIndex + 1}`,
								});
								elementValue.forEach((option) => {
									OPTIONS[getOptionType(option)](
										postData[index].elements,
										option,
										ownIndex
									);
								});
								ownIndex++;
							}
						);
					} else {
						value.elements.forEach(
							([groupKey, groupValue], groupIndex) => {
								postData.push({
									id: groupKey.name,
									position: `${index + 1}_${groupIndex + 1}`,
								});
								groupValue.forEach((option) => {
									OPTIONS[getOptionType(option)](
										postData,
										option,
										ownIndex
									);
								});
								ownIndex++;
							}
						);
					}
				}
			}
		});
	}

	let formatFile = '';
	if(selectedFormat.value === "new_word") {
		formatFile = selectedFormat.value === "new_word" ? `word_${request.fullLang}` : selectedFormat.value;
	} else {
		formatFile = `${selectedFormat.value}_${request.fullLang}`;
	}

	let template_settings = {
		position: 0,
		id: "template_settings",
		font_size: 10,
		font_name: "Arial",
		orientation: selectedOrientation(),
		full_page_title: selectedFull_page_title(),
		pdf_orientation: selectedPDF_orientation(),
		content: checkbox.content,
		merge_cells: checkbox.merge_cells,
		footer: checkbox.footer,
		title: getProjectName(),
		format: formatFile,
	};

	let { format, ...otherParams } = params;
	format;
	Object.assign(template_settings, otherParams);

	postData.push(template_settings);

	return {
		postData,
		formatName: selectedFormat.value,
		error: error.value,
		message: message.value,
	};
}
