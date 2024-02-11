import { reactive, ref } from "vue";

let checkbox = reactive(
	ref({
		content: true,
		footer: false,
		merge_cells: false,
	})
);

function updateCheckbox(name, value) {
	checkbox.value[name] = value;
}

let loading = reactive(ref(false));

function toggleLoading() {
	loading.value = !loading.value;
}

export { checkbox, updateCheckbox, loading, toggleLoading };
