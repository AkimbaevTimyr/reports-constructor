<template>
	<div class="acc2__content flex"
		:class="{
			open: toggleShowElement,
		}"
	>
		<!--
			@update-text - Обновить текст
			@show-modal - Показать модальное окно
			@update-number - Обновить число
			@update-length - Обновить длину текст
			@show-options - Показать опций
			@update-checkbox - Показать checkbox
			@update-select - Показать select
			@show-column-options - Показать опцию колонки
			:table - Для форматов (Word и Daily_Reports) передать тип таблицы (columns или list_rows)
			:is="dynamicComponent(option)" - передаем опцию и по ее типу отрисовываем нужный нам компонент
		-->
		<keep-alive>
			<component
				v-for="(option, optionId) in options"
				:key="optionId"
				:currentElementId="elementId"
				:is="dynamicComponent(option)"
				:option="option"
				:mainOptionId="mainOptionId"
				:toggleShowElement="toggleShowElement"
				:toggleShowOption="toggleShowOption(optionId)"
				@show-modal="(option) => $emit('show-modal', option)"
				@show-options="$emit('update-option-id', optionId)"
				@show-column-options="select"
				@update-text="updateText"
				@update-number="updateNumber"
				@update-length="updateLength"
				@update-checkbox="updateCheckbox"
				@update-select="select"
				@update-show-resources="updateShowResources"
				:table="getTable(options)"
			></component>
		</keep-alive>

<!--    сюда попадает кнопка удаление-->
		<slot></slot>
	</div>
</template>

<script>
import Methods from "@/components/Content/Options"; // ->  index.js  <- (все методы здесь)

export default {
	props: {
		_key: {
			type: Object,
			required: true,
		},
		options: {
			required: false,
		},
		elementId: {
			required: false,
		},
		mainElementId: {
			required: false,
		},
		mainOptionId: {
			required: true,
		},
		toggleShowElement: {
			required: false,
		},
	},
	methods: {
      toggleShowOption(optId) {
          return (this.mainOptionId === optId) && this.toggleShowElement;
      },
	},
	setup() {
		return { ...Methods };
	},
};
</script>
