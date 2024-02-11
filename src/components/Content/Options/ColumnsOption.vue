<template>
    <div
        class="acc ref_content"
        v-show="option.name == isTable"
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
        <div
            class="acc__content adaptive-height"
            :style="{
                height: getHeight,
            }"
            :class="{
                open: option.visible && toggleShowOption,
            }"
        >
            <div
                class="acc__item hhh flex pos-r columns bg-transparent"
                :id="`columns-${currentElementId}-${option.name}`"
                :style="{
                    left: `-${option.minusDistance}px`,
                }"
            >
                <vuedraggable
                    :list="option.value"
                    class="flex flex-wrap adaptive-width"
                    animation="250"
                >
                    <div v-for="element in option.value" :key="element">
                        <div
                            v-if="element.selected != 'hide'"
                            class="acc__item mr-1 pos-r acc-column"
                            :class="{
                                gray: !element.selected,
                            }"
                            @click="toggleParams(element)"
                        >
                            <span class="w-full text-left">
                                <i
                                    class="fa-solid fa-grip-lines handle mr-1 rotate-90"
                                ></i
                                >{{ element.ru }}
                            </span>
                            <input
                                type="checkbox"
                                class="ml-1 m-top-1"
                                v-if="element.selected != 'default'"
                                v-model="element.selected"
                            />
                            <div
                                class="pos-a pl-0 w-full acc-column__params"
                                v-if="element.selected && element.showParams"
                                @click.stop
                            >
                                <template
                                    v-for="param in element.params"
                                    :key="param.name"
                                >
                                    <div
                                        class="acc__item mb-0.5 flex"
                                        v-if="param.type == 'checkbox'"
                                        :class="{
                                            gray: !param.selected,
                                        }"
                                    >
                                        <span>{{ paramKeys[param.name] }}</span>
                                        <input
                                            type="checkbox"
                                            class="mt-0 ml-auto acc-column__chbox"
                                            v-model="param.selected"
                                        />
                                    </div>
                                    <div
                                        class="acc__item m-0"
                                        v-if="param.type == 'color'"
                                    >
                                        <input
                                            type="color"
                                            class="w-full acc-color"
                                            v-model="param.value"
                                        />
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </vuedraggable>
            </div>
        </div>
    </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import option from '@/mixins/option'

export default {
    name: "columns-option",
    mixins: [option],
    components: {
        vuedraggable: VueDraggableNext,
    },
    data() {
        return {
            paramKeys: {
                bold: "Жирность",
                italic: "Курсив",
                underline: "Подчеркнуть",
            },
        };
    },
    props: {
        currentElementId: {
            required: true,
        },
        table: {
            required: true,
        },
    },
    methods: {
        toggleParams(element) {
            element.showParams = !element.showParams;
        },
    },
    computed: {
        getHeight() {
            return this.toggleShowOption ? "" : 0;
        },
        getTextWidth() {
            return this.toggleShowElement ? this.textWidth + "px" : 0;
        },
        isTable() {
            return this.table ? "columns" : "list_rows";
        },
    },
};
</script>

<style scoped>
/* 
	3 - maxWindowWidth
	
	1 - minWindowWidth
	2 - minWidth
	4 - maxWidth
 */
.columns {
    width: 1000px;
}
.bg-transparent {
    background: transparent;
}
@media (min-width: 1160px) {
    .adaptive-width {
        width: 850px;
    }
}
@media (max-width: 1160px) and (min-width: 500px) {
    .adaptive-width {
        width: calc(220px + (850 - 220) * ((100vw - 500px) / (1160 - 500)));
    }
}
@media (max-width: 500px) {
    .adaptive-width {
        width: 270px;
    }
}
</style>
