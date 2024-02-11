import TextOption from "@/components/Content/Options/TextOption";
import CheckboxOption from "@/components/Content/Options/CheckboxOption";
import NumberOption from "@/components/Content/Options/NumberOption";
import SelectIndexOption from "@/components/Content/Options/SelectIndexOption";
import SelectTypeOption from "@/components/Content/Options/SelectTypeOption";
import ColumnsOption from "@/components/Content/Options/ColumnsOption";
import DropdownTagOption from "@/components/Content/Options/DropdownTagOption";
import DropdownOrderOption from "@/components/Content/Options/DropdownOrderOption";
import { formatIs } from "@/use/data/select";

const Methods = {
	select(elementOption, keyName, isSelect = false, value = "selected") {
		elementOption.forEach((el) => {
			if (isSelect) {
				el[value] = el.name == keyName;
			} else {
				el[0][value] = el[0].name == keyName;
			}
		});
	},
	updateCheckbox(option, isCheck) {
		option.value = isCheck;
	},
	updateNumber(option, number) {
		option.value = number;
	},
	updateText(option, text) {
		option.value = text;
	},
	check(checkbox, check) {
		checkbox = !Methods.stringToBoolean(check);
	},
	updateLength(option, selectedLength) {
		option.selected = !Methods.stringToBoolean(selectedLength);
	},
	stringToBoolean(string) {
		return string === "true";
	},
	getTable(options) {
		return formatIs("word") || formatIs("daily_reports")
			? options[0].value
			: true;
	},
	updateShowResources(dragId, key, option) {
		if (!key.showResources === false) {
			option.draggables[dragId][0].showResources = !key.showResources;
			return;
		}
		option.draggables[dragId][0].showResources = !key.showResources;
		option.draggables[dragId == 1 ? 0 : 1][0].showResources =
			!key.showResources;
	},
	dynamicComponent: (option) => {
		switch (option.type) {
			case "text":
				return TextOption;
			case "number":
				return NumberOption;
			case "checkbox":
				return CheckboxOption;
			case "select":
				if (option.outputIndex) {
					return SelectIndexOption;
				} else if (option.name == "type") {
					return SelectTypeOption;
				}
				break;
			case "columns":
				return ColumnsOption;
			case "dropdown":
				if (option.name == "tag_highlight") {
					return DropdownTagOption;
				} else if (option.name == "order") {
					return DropdownOrderOption;
				}
				break;
			default:
				break;
		}
	},
};

export default Methods;
