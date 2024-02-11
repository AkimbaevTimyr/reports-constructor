<template>
    <div
        class="acc"
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
				width: getTextWidth,
			}"
			:class="{
				open: option.visible && toggleShowOption,
			}"
        >
            <template v-for="element in option.value" :key="element">
                <div
                    class="acc__item"
                    :class="{
                        gray: !element.value,
                    }"
                    @click="element.value = !element.value"
                    v-if="element.type == 'checkbox'"
                >
                    {{ element.ru }}
                </div>
                <div
                    class="acc__item pos-r p-0"
                    v-else-if="element.type == 'color'"
                >
                    <span
                        class="flex px-2 items-center"
                        @click="element.show = !element.show"
                        >
                            {{ element.ru }}

                            <i class="fa-solid fa-angle-right w-full flex justify-end acc-tag__ptl"></i>
                        </span
                    >
                    <div class="pos-a" v-show="element.show">
                        <div class="acc__item">
                            <input
                                type="color"
                                v-model="element.value"
                                class="acc-color"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import option from '@/mixins/option'

export default {
    name: "dropdown-tag-option",
    mixins: [option],
    props: {
        option: {
            required: true,
        },
	},
	methods: {
    },
	computed: {
        getHeight() {
            return this.toggleShowOption ? this.option.height + 'px' : 0
        },
        getTextWidth() {
			return this.toggleShowElement ? (this.textWidth) + 'px' : 0
		}
	},
};
</script>

<style>
</style>