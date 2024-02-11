<template>

    <div class="acc2">
        <div
            class="acc2__title"
            :class="{
                'table-element': _key.type == 'table',
            }"
        >
<!--            перетаскивание элементов по данному ползунку-->
            <i class="fa-solid fa-grip-lines handle"></i>
<!--            отображение текста по типу  - период , динамика сообщений-->
            <span
                :class="_key.type != 'table' ? _key.type : ''"
                >{{ _key.ru }}
            </span>
<!--          кнопка в право для отображение подалки-->
            <i
                @click="$emit('update-element-list')"
                class="fa-solid fa-angle-right"
            ></i>
        </div>
<!--      отрисовка опций-->
        <element-options
            :elementId="elementId"
            :mainOptionId="mainOptionId"
            :mainElementId="mainElementId"
            :_key="_key"
            :toggleShowElement="toggleShowElement"
            :options="value"
            @show-modal="
                (nextElement) => {
                    $emit('show-modal', nextElement);
                }
            "
            @update-option-id="(optId) => $emit('update-option-id', optId)"
        >
            <div
                class="acc"
                :style="{
                    width: getTextWidth,
                }"
                :class="{
                    'mr-0': !toggleShowElement,
                }"
            >
<!--              кнопка удаление элемента с шаблона отчета-->
                <div
                    class="acc__title-copy"
                    @click="removeElement(_key.name, elementIndex, groupId)"
                >
                    <span class="remove-element">Удалить</span>
                </div>
            </div>
        </element-options>
    </div>
</template>

<script>
import ElementOptions from "@/components/Content/ElementOptions";
import { removeElement } from "@/use/actions/toggle";

export default {
    components: {
        ElementOptions,
    },
    props: {
        mainElementId: {
            required: true,
        },
        mainOptionId: {
            required: true,
        },
        elementId: {
            required: true,
        },
        elementIndex: {
            required: true,
        },
        groupId: {
            type: Number,
            required: false,
            default: null,
        },
        _key: {
            type: Object,
            required: true,
        },
        value: {
            type: Object,
            required: true,
        },
    },
    methods: {
        text(text, font) {
            let context = document.createElement("canvas").getContext("2d");
            context.font = font + "px Arial";
            return parseInt(context.measureText(text).width);
        },
    },
    computed: {
        toggleShowElement() {
            return this.mainElementId === this.elementId;
        },
        getTextWidth() {
            return this.toggleShowElement ? this.text("Удалить", 13) + 20 + "px" : 0;
        },
    },
    setup() {
        return {
            removeElement,
        };
    },
};
</script>
