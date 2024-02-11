<template>
    <div class="group">
        <div
            class="group__title group-bg flex items-center"
            v-if="!formatIs('powerpoint') && !formatIs('daily_reports')"
        >
            <span class="w-full cursor-pointer handle">Группа</span>
<!--          удаление группы-->
            <button class="remove-element" @click="removeGroup(groupId)">
                Разгруппировать
            </button>
        </div>
        <div class="group__title group-bg flex items-center" v-else>
            <span class="w-full cursor-pointer handle">
                <label>
                    Проект:
                    <input
                        type="text"
                        :value="_key.projectName"
                        @input="
                            $emit(
                                'update-input',
                                _key,
                                'projectName',
                                $event.target.value
                            )
                        "
                        class="group-input"
                        :class="{
                            'input-error':
                                _key.projectName == '' &&
                                (formatIs('daily_reports') ||
                                    formatIs('powerpoint')),
                        }"
                    />
                </label>
                <label>
                    его номер:
                    <input
                        type="text"
                        :value="_key.projectId"
                        @input="
                            $emit(
                                'update-input',
                                _key,
                                'projectId',
                                $event.target.value
                            )
                        "
                        class="group-input"
                        :class="{
                            'input-error':
                                _key.projectId == '' &&
                                (formatIs('daily_reports') ||
                                    formatIs('powerpoint')),
                        }"
                    />
                </label>
            </span>
            <button class="remove-element" @click="removeProject(groupId)">
                Удалить
            </button>
        </div>

        <vuedraggable
            group="todosapp"
            class="group__body group-bg pos-r"
            :class="_key.id"
            :list="value.elements"
            :move="checkMoveFromGroup"
            animation="250"
            handle=".handle"
        >
            <template v-for="([key, value], id) of value.elements" :key="id">
                <element-item
                    @update-option-id="updateOptionId"
                    @update-element-list="toggleNextElementList(key.id)"
                    :mainElementId="mainElementId"
                    :mainOptionId="mainOptionId"
                    :groupId="groupId"
                    :elementId="key.id"
                    :elementIndex="id"
                    :_key="key"
                    :value="value"
                    @show-modal="
                        (nextElement) => $emit('show-modal', nextElement)
                    "
                ></element-item>
            </template>
            <div
                class="absolute left-3 bottom-1.5 text-red-500"
                :class="{
                    hidden: groupError,
                }"
            >
                {{ _key.error }}
            </div>
        </vuedraggable>
    </div>
</template>

<script>
import ElementItem from "@/components/Content/ElementItem";
import { VueDraggableNext } from "vue-draggable-next";
import { removeGroup, removeProject } from "@/use/actions/toggle";
import { formatIs } from "@/use/data/select";
import {
    updateOptionId,
    toggleNextElementList,
    mainElementId,
    mainOptionId,
} from "@/use/actions/currentElement";
import { currentBaseReport } from "@/use/data/reports";

export default {
    components: {
        ElementItem,
        vuedraggable: VueDraggableNext,
    },
    props: {
        groupId: {
            type: Number,
            required: true,
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
        checkMoveFromGroup(event) {
            if (
                !this.formatIs("powerpoint") &&
                !this.formatIs("daily_reports")
            ) {
                if (
                    event.from.classList.contains("group__body") &&
                    event.to.classList.contains("group__body")
                ) {
                    let groupFrom = event.from;
                    let groupTo = event.to;

                    if (groupFrom == groupTo) {
                        return true;
                    }

                    return groupTo.children.length < 3;
                }
            } else if (
                event.from.classList.contains("group__body") &&
                event.to.classList.contains("accs")
            ) {
                for (let i = 0; i < currentBaseReport.value.length; i++) {
                    if (currentBaseReport.value[i][0].name === event.draggedContext.element[0].name) {
                        console.log('name', currentBaseReport.value[i][0].name);
                        // if (currentBaseReport.value[i][0].count === 0)
                        // {
                        //     console.log('count', currentBaseReport.value[i][0].count);
                        //     return false;
                        // }
                        // currentBaseReport.value[i][0].count -= 1;
                        return true;
                    }
                }
            }
        },
    },
    computed: {
        groupError() {
            return formatIs("daily_reports") || formatIs("powerpoint")
                ? this.value.elements.length > 0
                : this.value.elements.length == 2;
        },
    },
    setup() {
        return {
            formatIs,
            removeGroup,
            removeProject,

            updateOptionId,
            toggleNextElementList,
            mainElementId,
            mainOptionId,
        };
    },
};
</script>
