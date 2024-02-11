<template>
<!--  из typeArray мы получаем ключ значение   project - Проект и тд-->
<!--  затем данный ключ передаем в typeList и получаем нужные нам опции у каждой группы-->
<!--  У общее мы получим теги, период и тд взависимости от типа отчета-->
<!--  После получения мы проходимся по полученным опциям из typeList(key) и начинаем отрисовку-->
    <div class="sidebar-menu w-full">
        <template v-for="[key, value] in typeArray" :key="key">
            <div class="sidebar__group" v-if="typeList(key).length > 0">
                <h3 class="f-w-500 title_newprojects block__header">
                    {{ value }}
                </h3>
                <div
                    v-for="(element, id) in typeList(key)"
                    :key="id"
                    class="element"
                    :class="{
                        gray: element[0].count == 0,
                    }"
                    @click="addElement(element[0].name)"
                    :title="element[0].ru"
                >
<!--                  отображение названия опции теги, период-->
                    {{ element[0].ru }}
                </div>
<!--                если пдф отрисовываем блок с группами отображается в блоке с графиками-->
                <div
                    v-if="value == 'Графики'  && formatIs('pdf')"
                    class="element text-center add-group"
                    :class="{
                        gray: leftGroup === 0,
                    }"
                    @click="addGroup()"
                >
                    Группа
                </div>
<!--                если тип отчета dailyReports or powerpoint-->
                <div
                    v-else-if="
                        value == 'Проект' &&
                        (formatIs('powerpoint') || formatIs('daily_reports'))
                    "
                    class="element text-center add-group"
                    :class="{
                        gray: hasEmptyProject,
                    }"
                    @click="addProject()"
                >
                    Проект
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { addGroup, addProject, addElement } from '@/use/actions/toggle';
import { formatIs } from '@/use/data/select';
import { leftGroup, hasEmptyProject } from '@/use/data/reports_copy';

export default {
    props: {
        pdf: {
            required: true,
        },
    },
    data() {
        return {
            groupNames: {
                project: 'Проект',
                default: 'Общее',
                graph: 'Графики',
                map: 'Карты',
                table: 'Таблицы',
            },
            newId: 0,
        };
    },
    methods: {
        typeList(type) {
            // по типу project , default и тд вытаскиваем нужные нам параметры к данным блокам
            return this.pdf.filter((el) => el[0].type == type);
        },
    },
    computed: {
        typeArray() {
            return Object.entries(this.groupNames);
        },
    },
    setup() {
        return {
            formatIs,
            addGroup,
            addProject,
            addElement,
            leftGroup,
            hasEmptyProject,
        };
    },
};
</script>

<style scoped>
.sidebar-menu {
    user-select: none;
}
.sidebar__group {
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
    background: #35485a;
}
.block__header {
    color: #fff;
    text-align: center;
    margin-bottom: 5px;
    margin-top: 0;
    font-size: 18px !important;
    margin: 0;
    margin-bottom: 4px;
}
.element {
    margin-bottom: 2px;
    border-radius: 3.5px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    background-color: #357ebd;
    padding: 5px 7px;
    transition: 0.35s;

    font-size: 13px;
}
.element:not(.element.gray) {
    cursor: pointer;
}
.element.gray {
    background-color: #ccc;
}
</style>
