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
			:class="{
				open: option.visible && toggleShowOption,
			}"
        >
            <div
                class="acc__item pos-r"
                v-for="[key, value] in option.value"
                :key="key"
                :class="{
                    gray: !key.selected,
                }"
                @click="$emit('update-select', option.value, key.name)"
            >
                <span class="flex items-center">
                    {{ key.ru }}
                    <i class="fa-solid fa-angle-right w-full flex justify-end acc-tag__ptl"></i>
                </span>
                <div class="pos-a" v-if="key.selected">
                    <div
                        v-for="[_key, _value] in Object.entries(value)"
                        :key="_key"
                        class="acc__item flex justify-start items-center"
                        :class="{
                            gray: !_value,
                        }"
                        @click="value[_key] = !_value"
                    >
                        <span class="w-full text-left mr-1">{{ keyNames[_key] }}</span>

                        <input
                            type="checkbox"
                            @change="$emit('update-check', _value, $event.target.value)"
                            :checked="_value"
                            :value="_value"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import option from '@/mixins/option'

export default {
    name: "select-type-option",
    mixins: [option],
    data() {
        return {
            keyNames: {
                data_labels: "Метрики данных",
                labels: "Метрики",
            }
        }
    },
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
            return this.toggleShowOption ? (this.option.width + 14) + 'px' : this.textWidth + 'px'
        },
		getTextWidth() {
            let plus = 0;
            if (this.toggleShowOption) plus = 14;

			return this.toggleShowElement ? (this.textWidth + plus) + 'px' : 0
		}
	},
};
</script>

<style>
</style>