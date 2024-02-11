import { ref, reactive, computed } from "vue";

let select = {
	format: reactive(
		ref({
			width: 135,
			options: [
				{
					name: "Daily Reports",
					value: "daily_reports",
					iconClass: "fa-regular fa-file-word",
					selected: false,
				},
				{
					name: "WORD",
					value: "word",
					iconClass: "fa-regular fa-file-word",
					selected: false,
				},
				{
					name: "PDF",
					value: "pdf",
					iconClass: "fa-regular fa-file-pdf",
					selected: true,
				},
				{
					name: "Excel",
					value: "excel",
					iconClass: "fa-regular fa-file-excel",
					selected: false,
				},
				{
					name: "PowerPoint",
					value: "powerpoint",
					iconClass: "fa-regular fa-file-powerpoint",
					selected: false,
				},
				{
					name: "WORD new",
					value: "new_word",
					iconClass: "fa-regular fa-file-word",
					selected: false,
				},
			],
		})
	),
	orientation: reactive(
		ref({
			name: "Ориентация страницы",
			width: 176.4,
			options: [
				{
					name: "Книжная",
					value: "portrait",
					selected: false,
				},
				{
					name: "Альбомная",
					value: "landscape",
					selected: true,
				},
			],
		})
	),
	full_page_title: reactive(
		ref({
			// Титульная страница
			name: "Титульный лист",
			width: 138,
			options: [
				{
					name: "IMAS",
					value: "imas",
					selected: true,
				},
				{
					name: "МТСЗН",
					value: "mtszn",
					selected: false,
				},
				{
					name: "Петропавловск",
					value: "petropavlovsk",
					selected: false,
				},
				{
					name: "ТШО",
					value: "shevron",
					selected: false,
				},
			],
		})
	),
	pdf_orientation: reactive(
		ref({
			name: "Ориентация страницы",
			width: 176.4,
			options: [
				{
					name: "Книжная",
					value: "portrait",
					selected: true,
				},
				{
					name: "Альбомная",
					value: "landscape",
					selected: false,
				},
			],
		})
	),
	menu: reactive(
		ref({
			width: 86.4,
			options: [
				{
					name: "Проект",
					value: "project",
					selected: false,
				},
				{
					name: "Шаблон",
					value: "template",
					selected: true,
				},
			],
		})
	),
};

// выбранный формат
const selectedFormat = computed(() => {
	return select.format.value.options.find((option) => option.selected)?.value;
});

// проверка текущего выбранного типа отчета
const formatIs = (format = "pdf") => {
	return selectedFormat.value == format;
};
function selectedOrientation() {
	return select.orientation.value.options.find((option) => option.selected)
		?.value;
}
function selectedFull_page_title() {
	return select.full_page_title.value.options.find(
		(option) => option.selected
	)?.value;
}
function selectedPDF_orientation() {
	return select.pdf_orientation.value.options.find(
		(option) => option.selected
	)?.value;
}
const selectedMenu = computed(() => {
	return select.menu.value.options.find((option) => option.selected)?.value;
});
const isTemplate = computed(() => {
	return selectedMenu.value == "template";
});
const isProject = computed(() => {
	return selectedMenu.value == "project";
});


// спросить про это  ?
function selectOption(selectName, optionName) {
	select[selectName].value.options.forEach((opt) => {
		opt.selected = opt.name == optionName;
		// установка текущего формата  пдф ворд
		if (selectName == 'format' && opt.selected) {
			document.querySelector('#format_type').value = opt.value
		}
	});
}

export {
	select,
	selectedFormat,
	formatIs,
	selectedOrientation,
	selectedFull_page_title,
	selectedPDF_orientation,
	isTemplate,
	isProject,
	selectOption,
};
