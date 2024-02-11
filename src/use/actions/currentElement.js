import { reactive, ref } from "vue";

let mainElementId = reactive(ref(null))
let mainOptionId = reactive(ref(null))


function updateOptionId(optId) {
    mainOptionId.value = mainOptionId.value === optId ? null : optId;
}
function toggleNextElementList(elementId) {
    mainOptionId.value = null;
    mainElementId.value = mainElementId.value === elementId ? null : elementId;
}

export {
    updateOptionId,
    toggleNextElementList,
    mainElementId,
    mainOptionId,
}