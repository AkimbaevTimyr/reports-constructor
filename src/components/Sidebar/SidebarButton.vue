<template>
	<div class="sidebar-buttons w-full flex flex-col">

    <button
        v-if="formatIs('new_word')"
        :disabled="loading"
        @click="downloadNewVReport()"
        onclick="amplitude_event(event, document.querySelector('#an_id')?.value ?? '', 'report_constructor', {event_type:'click_download_report', format_type: document.querySelector('#format_type')?.value ?? ''});">
      новый ворд
    </button>

    <button
        v-else
        :disabled="loading"
        @click="downloadReport()"
        onclick="amplitude_event(event, document.querySelector('#an_id')?.value ?? '', 'report_constructor', {event_type:'click_download_report', format_type: document.querySelector('#format_type')?.value ?? ''});">
      Скачать
    </button>

		<button
        :disabled="loading"
        @click="saveTemplate()"
        onclick="amplitude_event(event, document.querySelector('#an_id')?.value ?? '', 'report_constructor', {event_type:'click_save_report_template', format_type: document.querySelector('#format_type')?.value ?? ''});">
      Сохранить шаблон
    </button>
	</div>
</template>

<script>
import saveTemplate from "@/use/actions/saveTemplate";
import {downloadNewVReport, downloadReport} from "@/use/actions/downloadReport";
import { loading } from "@/use/data/checkbox";
import {formatIs} from "@/use/data/select";

export default {
  methods: {formatIs},
	props: {
		pdf: {
			required: true,
		},
	},
	setup() {
		return {
			downloadReport,
      downloadNewVReport,
			saveTemplate,
			loading,
		};
	},
};
</script>
