import { selectOption } from "@/use/data/select";
import { updateCheckbox } from "@/use/data/checkbox";
import { currentReport } from "@/use/data/reports_copy";
import axios from "axios";
import { currentBaseReport } from "@/use/data/reports";
import request from "@/use/utils/request";


// воставновление шаблона при получении его из базы
export default function restoreConstructor() {
	let params = request.params;
	if (params.constructorId != null) {
		axios
			.get(
				`/ru/reports/getreport?id=${params.constructorId}&token=${params.token}`
			)
			.then((res) => {
				let _json = res.data.projects[0].json;
				let _format = res.data.projects[0].format;
				const formats = {
					daily_repo: "Daily Reports",
					word: "WORD",
					pdf: "PDF",
					excel: "Excel",
					powerpoint: "PowerPoint",
				};
				selectOption("format", formats[_format]);

				let response = JSON.parse(_json);
				for (let i = 0; i < response.length; i++) {
					let el = response[i];

					if (el.id == "template_settings") {
						Object.assign(el, params);
						document.querySelector("#project-name").value =
							el.title;
						document.querySelector("#constructor-name").value =
							decodeURI(params.constructorName);
						el.format = `${params.format}_${request.fullLang}`;

						const orientation = {
							portrait: "Портрет",
							landscape: "Пейзаж",
						};
						const pdf_orientation = {
							portrait: "Книжная",
							landscape: "Альбомная",
						};
						const full_page_title = {
							mtszn: "МТСЗН",
							petropavlovsk: "Петропавловск",
							shevron: "ТШО",
						};

						selectOption(
							"orientation",
							orientation[el.orientation]
						);
						selectOption(
							"pdf_orientation",
							pdf_orientation[el.pdf_orientation]
						);
						selectOption(
							"full_page_title",
							full_page_title[el.full_page_title]
						);
						selectOption("menu", "Проект");
						updateCheckbox("content", strToBool(el.content));
						updateCheckbox(
							"merge_cells",
							strToBool(el.merge_cells)
						);
					} else {
						if (
							_format == "powerpoint" ||
							_format == "daily_repo"
						) {
							currentReport.value.push([
								{
									id: `group-${el.position}`,
									name: "GROUP",
									projectId: el.projectId,
									projectName: el.projectName,
									error: "Не менее одного элемента в проекте.",
								},
								{
									elements: [],
								},
							]);
							let groupElements =
								currentReport.value[i][1].elements;
							el.elements.forEach((element) => {
								restoreElement(groupElements, element);
							});
						} else {
							restoreElement(currentReport.value, el);
						}
					}
				}
			});
	}
}
const strToBool = (string) => string === "true";


function restoreElement(report, el) {
	for (let i = 0; i < currentBaseReport.value.length; i++) {
		const element = currentBaseReport.value[i];
		if (element[0].name == el.id) {
			let independentCopy = JSON.parse(JSON.stringify(element));

			let fromGroup = false;

			if (
				typeof el.position === "string" &&
				el.position.indexOf("_") > -1
			) {
				fromGroup = true;
				let groupId = el.position.split("_")[0];
				if (
					report.length === 0 ||
					(report &&
						report[report.length - 1] &&
						report[report.length - 1][0].id.split("-")[1] !==
							groupId)
				) {
					report.push([
						{
							id: `group-${groupId}`,
							name: "GROUP",
							error: "Должно быть два элемента.",
						},
						{
							elements: [],
						},
					]);
				}
			}
			if (independentCopy[1]) {
				let elKeys = Object.keys(el);
				let values = independentCopy[1];
				values.forEach((value) => {
					let elType = value.type;

					elKeys.forEach((elKey) => {
						if (
							(elType == "checkbox" ||
								elType == "number" ||
								elType == "text") &&
							elKey == value.name
						) {
							if (value.name == "text_length")
								value.selected = el[elKey] == 0 ? false : true;
							value.value = el[elKey];
						} else if (
							elType == "select" &&
							value.name == "type" &&
							elKey == value.name
						) {
							value.value.forEach((val) => {
								val[0].selected = val[0].name == el[elKey];
								Object.keys(val[1]).forEach((valueName) => {
									val[1].valueName = el[valueName];
								});
							});
						} else if (
							elType == "select" &&
							value.outputIndex &&
							elKey == value.name
						) {
							value.value.forEach((val) => {
								val.selected = val.index == el[elKey];
							});
						} else if (elType == "columns" && elKey == value.name) {
							let myDraggables = [...value.value];
							let array = el[elKey];
							let newArray = [];
							array.forEach((arrayEl) => {
								myDraggables.forEach((myDraggable) => {
									if (myDraggable.name == arrayEl.id) {
										newArray.push(myDraggable);
									}
								});
							});
							value.value = newArray;
							value.value.forEach((column, index) => {
								if (
									column.name != "number" &&
									column.name != "content"
								) {
									column.selected =
										el[elKey][index].position != 0;
									if (column.params) {
										column.params.forEach((columnParam) => {
											let paramType =
												columnParam.type == "checkbox"
													? "selected"
													: "value";
											let paramValue =
												columnParam.type == "checkbox"
													? el[elKey][index][
														columnParam.name
													]
													: "#" +
													el[elKey][index][
														columnParam.name
													];
											columnParam[paramType] = paramValue;
										});
									}
								}
							});
						} else if (
							(elType == "dropdown" ||
								value.name == "tag_highlight") &&
							elKey == value.name
						) {
							value.value.forEach((val) => {
								let dropdownValue =
									val.name == "back_color" ||
									val.name == "color"
										? "#" + el[elKey][val.name]
										: el[elKey][val.name];
								val.value = dropdownValue;
							});
						} else if (
							(elType == "dropdown" || value.name == "order") &&
							elKey == value.name
						) {
							value.value.forEach((val) => {
								val[1].forEach((selectData) => {
									selectData.selected =
										selectData.index ==
										el[elKey][val[0].name];
								});
							});
							value.draggables.forEach((draggable) => {
								let myDraggables = [...draggable[1]];
								let array = el[elKey][draggable[0].name];
								let newArray = [];
								array.forEach((arrayEl) => {
									myDraggables.forEach((myDraggable) => {
										if (myDraggable.name == arrayEl) {
											newArray.push(myDraggable);
										} else {
											myDraggable.selected = false;
											newArray.push(myDraggable);
										}
									});
								});
								draggable[1] = newArray;
								draggable[1].forEach((selectData) => {
									let array = el[elKey][draggable[0].name];
									array.forEach((arrayEl) => {
										selectData.selected =
											selectData.name == arrayEl;
									});
								});
							});
						}
					});
				});
			}


			if (fromGroup) {
				report[report.length - 1][1].elements.push(independentCopy);
			} else {
				report.push(independentCopy);
			}
		}
	}
}