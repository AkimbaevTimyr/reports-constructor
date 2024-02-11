<template>
	<div class="acc"
		:style="{
			width: getTextWidth,
		}"
		:class="{
			'mr-0': !toggleShowElement,
		}">
		<div class="acc__title" @click="$emit('show-options')">
			<span :class="{
				gray:
					option.name == 'text_length' &&
					!option.selected,
			}"
				class="acc-text_length"
			>
				{{ option.ru }}

				<input type="checkbox" v-if="option.name == 'text_length'"
					@change="$emit('update-length', option, $event.target.value)" :value="option.selected"
					:checked="option.selected" class="text_length"/>
			</span>
		</div>
		<div class="acc__content"
			v-show="
				option.name != 'text_length' ||
				(option.name == 'text_length' && option.selected)
			"
			:style="{
				height: getHeight,
				width: getTextWidth,
			}"
		>
			<div class="acc__item">
				<input class="acc-number bg-transparent appearance-none w-full" :type="option.type"
					@input="$emit('update-number', option, $event.target.value)" :value="option.value"
					:min="option.min" :max="option.max" />
			</div>
		</div>
	</div>
</template>

<script>
import option from '@/mixins/option'

export default {
	name: 'number-option',
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
			let plus = 0;
			if (this.option.name == 'text_length') plus += 19;

			return this.toggleShowElement ? (this.textWidth + plus) + 'px' : 0
		},
	},
};
</script>

<style>

</style>