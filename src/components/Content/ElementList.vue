<template>
<!--  тут лежат все добавленный элементы на шаблон-->
    <vuedraggable
        group="todosapp"
        class="accs"
        :list="currentReport"
        :move="checkMove"
        @change="finishMove"
        animation="250"
        handle=".handle"
    >
<!--      в key лежит первый обьект, в value его options   пояснение в низу комопнента-->
        <div v-for="([key, value], id) of currentReport" :key="id">
<!--            если группа отрисовывается блок группы-->
            <element-group
                :_key="key"
                :value="value"
                :groupId="id"
                @update-input="updateInput"
                @show-modal="
                    (nextElement) => {
                        $emit('show-modal', nextElement);
                    }
                "
                v-if="key.name === 'GROUP'"
            />

<!--          отрисовка items по типу - период , динамика сообщений -->
            <element-item
                @update-option-id="updateOptionId"
                @update-element-list="toggleNextElementList(key.id)"
                :mainElementId="mainElementId"
                :mainOptionId="mainOptionId"
                :elementId="key.id"
                :elementIndex="id"
                :_key="key"
                :value="value"
                @show-modal="
                    (nextElement) => {
                        $emit('show-modal', nextElement);
                    }
                "
                v-else
            />
        </div>
        <slot> </slot>
    </vuedraggable>
</template>

<script>
import ElementGroup from "@/components/Content/ElementGroup";
import ElementItem from "@/components/Content/ElementItem";
import { VueDraggableNext } from "vue-draggable-next";
import { formatIs } from "@/use/data/select";
import { currentReport } from "@/use/data/reports_copy";
import {
    updateOptionId,
    toggleNextElementList,
    mainElementId,
    mainOptionId,
} from "@/use/actions/currentElement";
import { currentBaseReport } from "@/use/data/reports";

export default {
    components: {
        ElementGroup,
        ElementItem,
        vuedraggable: VueDraggableNext,
    },
    methods: {
        finishMove(event) {
            console.log(event);
            if (event.removed != undefined) {
                let _element = currentBaseReport.value.find(el => el[0].name === event.removed.element[0].name)

                if (_element) {
                    _element[0].count = 1
                }
            }
            else if (event.added != undefined) {
                let _element = currentBaseReport.value.find(el => el[0].name === event.added.element[0].name)

                if (_element) {
                    _element[0].count = 0
                }
            }
        },
        checkMove(event) {
            if (
                event.dragged.firstChild.classList.contains("group") &&
                event.to.classList.contains("group__body")
            ) {
                return false;
            } else if (
                event.from.classList.contains("accs") &&
                event.to.classList.contains("group__body")
            ) {
                if (
                    !this.formatIs("powerpoint") &&
                    !this.formatIs("daily_reports")
                ) {
                    let group = event.to;
                    if (event.draggedContext.element[0].type == "graph")
                        return group.children.length < 3;
                    else return false;
                } else {
                    currentBaseReport.value.forEach((el) => {
                        if (
                            el[0].name === event.draggedContext.element[0].name
                        ) {
                            if (!event.willInsertAfter) {
                                // // el[0].count = 1;
                            } else if (event.relatedContext.list.length > 0) {
                                // el[0].count = 1;
                            }
                            return true;
                        }
                    });
                }
            }
        },
        updateInput(key, name, value) {
            key[name] = value;
        },
    },
    setup() {
        return {
            formatIs,
            currentReport,

            updateOptionId,
            toggleNextElementList,
            mainElementId,
            mainOptionId,
        };
    },
};
</script>



<!--Example key - {&ndash;&gt;-->
<!--        "count": 1,-->
<!--        "id": "element-20.9662289169610303",-->
<!--        "name": "period",-->
<!--        "ru": "Период",-->
<!--        "type": "default"-->
<!--      }-->

<!-- Пример value - [-->
<!--  {-->
<!--    "height": 48,-->
<!--    "width": 169,-->
<!--    "visible": false,-->
<!--    "name": "format",-->
<!--    "ru": "Формат",-->
<!--    "type": "select",-->
<!--    "outputIndex": true,-->
<!--    "value": [-->
<!--    {-->
<!--      "name": "День-Месяц-Год",-->
<!--      "index": 0,-->
<!--      "selected": true-->
<!--    },-->
<!--    {-->
<!--      "name": "День-Месяц-Год Час:Мин",-->
<!--      "index": 1,-->
<!--      "selected": false-->
<!--    }-->
<!--    ]-->
<!--  }-->
<!--]-->