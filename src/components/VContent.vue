<template>
	<div class="constructs">
<!--    хедер -->
		<content-params></content-params>
		<element-list class="report-elements h-full" @show-modal="showModal">
			<v-loading v-show="loading"></v-loading>
			<div class="modal-text" v-if="modal.show">
				<div class="title-window">
					<h3>Изменить заголовок</h3>
					<div class="close" @click="toggleModal()">&#x2715;</div>
					<div class="flex">
						<input
							v-focus
							type="text"
							id="modal-text"
							@keydown.enter="updateText(modal.option)"
							:value="modal.option?.value"
							placeholder="Заголовок ..."
						/>
						<button @click="updateText(modal.option)">
							Сохранить
						</button>
					</div>
				</div>
			</div>
		</element-list>
	</div>
</template>

<script>
import ElementList from "@/components/Content/ElementList";
import ContentParams from "@/components/Content/ContentParams";
import VLoading from "@/components/UI/VLoading";
import { loading } from "@/use/data/checkbox";

export default {
	components: {
		ElementList,
		ContentParams,
		VLoading,
	},
	data() {
		return {
			modal: {
				show: false,
				option: null,
			},
		};
	},
	setup() {
		return {
			loading,
		};
	},
	methods: {
		showModal(nextElement) {
			this.modal.show = true;
			this.modal.option = nextElement;
		},
		updateText(nextElement) {
			nextElement.value = document.querySelector("#modal-text").value;
			this.modal.show = false;
		},
		toggleModal() {
			this.modal.show = !this.modal.show;
		},
	},
};
</script>
