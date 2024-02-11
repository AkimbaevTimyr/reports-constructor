<template>
	<div class="acc ref_content"
		:style="{
			width: getTextWidth,
		}"
		:class="{
			'mr-0': !toggleShowElement,
		}">
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
			}">
			<template v-for="[key, arr] in option.value" :key="key">
				<div class="acc__item pos-r p-0" v-if="key.type == 'select'">
					<span
						class="flex justify-center"
						@click="key.selected = !key.selected"
					>
						{{ key.ru }}
						<i
							class="fa-solid fa-angle-right absolute acc-order__arrow"
						></i>
					</span>

					<div class="pos-a" v-if="key.selected">
						<div
							v-for="el in arr"
							:key="el"
							class="acc__item"
							:class="{
								gray: !el.selected,
							}"
							@click="$emit('update-select', arr, el.name, true)"
						>
							{{ el.name }}
						</div>
					</div>
				</div>
			</template>

			<vuedraggable :list="option.draggables" animation="250">
				<template
					v-for="([key, arr], dragId) in option.draggables"
					:key="key.name"
				>
					<div
						class="acc__item pos-r p-0 on-hover"
						v-if="key.type == 'draggable'"
					>
						<span
							class="flex items-center h-full acc-order__px"
							:class="{
								gray: !key.selected,
							}"
							@click="showResources(dragId, key, option)"
						>
							<i
								class="fa-solid fa-grip-lines -translate-x-1"
							></i>
							<span class="acc-order__mx">{{ key.ru }}</span>
							<input
								type="checkbox"
								v-model="key.selected"
								class="acc-order__mtl"
								@click="key.selected = !key.selected"
							/>
						</span>

						<div
							class="pos-a"
							v-if="key.selected && key.showResources"
						>
							<vuedraggable :list="arr" animation="250">
								<div
									v-for="el in arr"
									:key="el"
									class="acc__item flex justify-between items-center h-full"
									:class="{
										gray: !el.selected,
									}"
									@click="el.selected = !el.selected"
								>
									<i
										class="fa-solid fa-grip-lines -translate-x-1"
									></i>
									{{ el.ru ?? el.name }}
									<input
										type="checkbox"
										v-model="el.selected"
									/>
								</div>
							</vuedraggable>
						</div>
					</div>
				</template>
			</vuedraggable>
		</div>
	</div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import option from '@/mixins/option'

export default {
	name: "dropdown-order-option",
	components: {
		vuedraggable: VueDraggableNext,
	},
    mixins: [option],
	props: {
		option: {
			required: true,
		},
        mainOptionId: {
            required: true,
        },
        toggleShowElement: {
            required: true,
        },
        toggleShowOption: {
            required: true,
        },
	},
	methods: {
		showResources(dragId, key, option) {
			this.$emit('update-show-resources', dragId, key, option)
		},
	},
	computed: {
		getHeight() {
			let plus = 0;
			if (this.toggleShowOption) {
				this.option.draggables.forEach((draggableOption, index) => {
					if (draggableOption[0].selected && draggableOption[0].showResources) {
						if (draggableOption[0].name === "categories") {
							plus = 24 * (draggableOption[1].length + (index - 2))
						}
						else {
							plus = 24 * (index + 1)
						}
					}
				});
			}
			return this.toggleShowOption ? (this.option.height + plus) + 'px' : 0
		},
		getWidth() {
			return this.toggleShowOption ? (this.option.width + 18) + 'px' : this.textWidth + 'px'
		},
		getTextWidth() {
			let plus = 0;
			if (this.toggleShowOption) plus = 18;

			return this.toggleShowElement ? (this.textWidth + plus) + 'px' : 0
		}
	},
};
</script>

<style></style>
