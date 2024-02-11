import { computed, reactive, ref } from "vue";
import { selectedFormat } from "@/use/data/select";


// задаем форматы
let report_copy = reactive(
    ref({
        daily_reports: [],
        word: [],
        pdf: [],
        excel: [],
        powerpoint: [],
        new_word: [],
    })
);

//
// текущий выбранный тип отчета
// как работает?
const currentReport = computed(() => {
    return report_copy.value[selectedFormat.value];
});

const leftGroup = computed(() => {
    return 5 - groups.value.length;
});
const groups = computed(() => {
    return currentReport.value.filter(el => el[0].name === "GROUP");
});
const hasEmptyProject = computed(() => {
    return groups.value.find(el => el[1].elements.length === 0) !== undefined;
});

const groupCount = computed(() => {
    return currentReport.value.filter(el => el[0].name === "GROUP").length;
});
const currentGraphCount = computed(() => {
    return currentReport.value.filter(el => el[0].type === "graph").length;
});

export { report_copy, currentReport, leftGroup, hasEmptyProject, groupCount, currentGraphCount }