import Daily_Report from "@/use/data/reports/daily_reports";
import WORD from "@/use/data/reports/word";
import PDF from "@/use/data/reports/pdf";
import Excel from "@/use/data/reports/excel";
import PowerPoint from "@/use/data/reports/powerpoint";
import NewWord from '@/use/data/reports/new_word'
import { selectedFormat } from "@/use/data/select";
import { computed } from "vue";


// выбор отчетов
// по ключу лежат файлы с заготовками для отчета
const BASE_REPORT = {
	daily_reports: Daily_Report,
	word: WORD,
	pdf: PDF,
	excel: Excel,
	powerpoint: PowerPoint,
	new_word: NewWord
};


// получение выбранного типа отчета
const currentBaseReport = computed(() => {
	console.log(BASE_REPORT[selectedFormat.value].value)
    return BASE_REPORT[selectedFormat.value].value;
	// return pdf.js file or excel js.file по типу отчета
});

export { BASE_REPORT, currentBaseReport };
