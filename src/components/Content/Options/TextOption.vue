<template>
	<div class="acc"
		:style="{
			width: getTextWidth,
		}"
		:class="{
			'mr-0': !toggleShowElement,
		}">
		<div class="acc__title" @click="$emit('show-modal', option)">
			<span class="flex items-center">
				{{ option.ru }}
			</span>
		</div>
		<div class="acc__content"></div>
	</div>
</template>

<script>
import option from '@/mixins/option'

export default {
	name: 'number-option',
    mixins: [option],
	props: {
		option: {
			required: true
		},
	},
	computed: {
		getTextWidth() {
			return this.toggleShowElement ? (this.textWidth) + 'px' : 0
		}
	},
};
</script>

<style>

</style>