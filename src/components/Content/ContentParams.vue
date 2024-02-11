<template>
	<div class="params">
		<input
			type="text"
			placeholder="Название Шаблона..."
			class="pl-4 w-full"
			id="constructor-name"
			v-show="isTemplate"
		/>
		<input
			type="text"
			placeholder="Имя проекта..."
			class="pl-4 w-full"
			id="project-name"
			v-show="isProject"
		/>
<!--    при екселе-->
		<v-checkbox v-show="isProject && formatIs('excel')" :param="'merge_cells'">
			Объединить ячейки
		</v-checkbox>
<!--    при поверпоинт-->
		<v-checkbox v-show="isProject && formatIs('powerpoint')" :param="'content'">
			Оглавление
		</v-checkbox>
<!--    ежедневный отчет-->
		<v-checkbox
			v-show="isProject && (formatIs('daily_reports'))"
			:param="'footer'"
		>
			Контактные данные
		</v-checkbox>

<!--    форматы-->
		<v-select
			v-show="isTemplate"
			:options="format.options"
			:selectWidth="format.width"
			@select-option="selectOption"
			:isFormat="true"
		>
		</v-select>

		<v-select
			v-show="isProject && (formatIs('word') || formatIs('daily_reports'))"
			:options="orientation.options"
			:name="orientation.name"
			:arrayName="'orientation'"
			:selectWidth="orientation.width"
			@select-option="selectOption"
		>
		</v-select>

		<v-select
			v-show="isProject && formatIs('daily_reports')"
			:options="full_page_title.options"
			:name="full_page_title.name"
			:arrayName="'full_page_title'"
			:selectWidth="full_page_title.width"
			@select-option="selectOption"
		>
		</v-select>

		<v-select
			v-show="isProject && formatIs('pdf')"
			:options="pdf_orientation.options"
			:name="pdf_orientation.name"
			:arrayName="'pdf_orientation'"
			:selectWidth="pdf_orientation.width"
			@select-option="selectOption"
		>
		</v-select>

<!--    проект - шаблон-->
		<v-select
			:options="menu.options"
			:arrayName="'menu'"
			:selectWidth="menu.width"
			@select-option="selectOption"
		>
		</v-select>

	</div>
</template>

<script>
import VSelect from "@/components/UI/VSelect";
import VCheckbox from "@/components/UI/VCheckbox";
import * as createSelect from "@/use/data/select";

export default {
	setup() {
		let {
			select: {
				format,
				orientation,
				full_page_title,
				pdf_orientation,
				menu,
			},
			formatIs,

			isTemplate,
			isProject,

			selectOption,
		} = createSelect;

		return {
			format,
			orientation,
			full_page_title,
			pdf_orientation,
			menu,
			selectOption,

			isTemplate,
			isProject,

			formatIs,
		};
	},
	components: {
		VSelect,
		VCheckbox,
	},
};
</script>

<style scoped>
.params > *:not(.params > *:last-child) {
	margin-right: 8px;
}

.params {
	display: flex;
	margin-bottom: 8px;
}
</style>
