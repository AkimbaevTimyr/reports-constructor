<template>
	<div class="app">
		<div class="content">
			<content-constructs :checkbox="checkbox" />
<!--      под pdf передается текущий выбранный тип отчета-->
			<content-sidebar :pdf="currentBaseReport" />
		</div>
	</div>
</template>

<script>
import ContentConstructs from "@/components/VContent";
import ContentSidebar from "@/components/VSidebar";

import { currentBaseReport } from "@/use/data/reports";
import { checkbox } from "@/use/data/checkbox";
import restoreConstructor from "@/use/restoreConstructor";
import { onMounted } from "vue";

// SidebarButton - содержит кнопки скачать и сохранить шаблон
// ElementGroup - элемент группа на отчете
// ElementItem - элемент который создается при выборе из списка общее - график - карты
// ElementOptions - отображается когда кликаем по элементу из списка ElementItem открывается доп меню содержащая по типу длина, тип, число
// где метод который создает меню с графиками и картами ?
export default {
	name: "App",
	components: {
		ContentConstructs,
		ContentSidebar,
	},
	setup() {

		onMounted(restoreConstructor);

		return {
			currentBaseReport,
			checkbox,
		}

	},
};
</script>

<style>
.app {
	background: #f3f3f4;
}

body {
	background: #f3f3f4;
}

.content {
	display: flex;
	margin: 24px;
	height: 100%;
}
</style>
