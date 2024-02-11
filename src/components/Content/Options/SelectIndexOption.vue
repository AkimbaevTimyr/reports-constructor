<template>
	<div
		class="acc ref_content"
		:style="{
			width: getTextWidth,
		}"
		:class="{
			'mr-0': !toggleShowElement,
		}"
	>
		<div class="acc__title" @click="$emit('show-options')">
			<span>{{ option.ru }}</span>
		</div>
		<div class="acc__content"
			:style="{
				height: getHeight,
				width: getWidth,
			}"
		>
			<div
				class="acc__item"
				v-for="element in option.value"
				:key="element"
				:class="{
					gray: !element.selected,
				}"
				@click="$emit('update-select', option.value, element.name, true)"
			>
				{{ element.name }}
			</div>
		</div>
	</div>
</template>

<script>
import option from '@/mixins/option'

export default {
	name: "select-index-option",
    mixins: [option],
	props: {
		option: {
			required: true,
		},
	},
	computed: {
		getHeight() {
			return this.toggleShowOption ? this.option.height + 'px' : 0
		},
		getWidth() {
			return this.toggleShowOption ? this.option.width + 'px' : this.textWidth + 'px'
		},
		getTextWidth() {
			return this.toggleShowElement ? (this.textWidth) + 'px' : 0
		}
	},
};
</script>

<style>
</style>