import axios from "axios";
import { toggleLoading } from "@/use/data/checkbox";
import createPostData from "@/use/actions/createPostData";
// import { useWebSocket } from '@vueuse/core'
import { io } from "socket.io-client";

// форматы при скачке отчета
const formats = {
	daily_reports:
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	word: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	pdf: "application/pdf", // response.headers["content-type"]
	excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	powerpoint:
		"application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

const formatExtension = {
	daily_reports: "docx",
	word: "docx",
	pdf: "pdf",
	excel: "xlsx",
	powerpoint: "pptx",
	new_word: "docx"
};

// скачка отчета со старого реста для отчетов ?
export const downloadReport = function () {
	let created_post_data = createPostData();
	if (created_post_data.error) {
		console.error(created_post_data.message);
		return;
	}

	let { postData, formatName } = created_post_data;

	toggleLoading();

	// в зависимости от типа отчеты выбираем end point
	let path = "daily_reports" == formatName ? "dayly" : "constructor";

	console.log(postData);

	axios({
		method: "post",
		url: `https://export.imas.kz/${path}`, // https://export.imas.kz/test
		responseType: "arraybuffer",
		data: postData,
	})
		.then(function (response) {
			let blob = new Blob([response.data], {
				type: formats[formatName],
			});
			let link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.download = `Export_iMAS_${formatYmd(new Date())}.${
				formatExtension[formatName]
			}`; // Export_iMAS_2022-12-20_15-36.pdf
			link.click();
		})
		.catch((error) => console.error(error))
		.finally(toggleLoading);
};


// функция для скачивания отчетов с нового реста для отчетов
export const downloadNewVReport = function () {
	let created_post_data = createPostData();
	if (created_post_data.error) {
		console.error(created_post_data.message);
		return;
	}

	let { postData, formatName} = created_post_data;

	toggleLoading();

	console.log(postData);

	axios({
		method: "post",
		url: `https://reports.imas.kz/api/v1/get-report/`,
		data: postData,
	})
		.then(function (response) {

			let token = JSON.parse(response.data).user_unique_identifier;
			console.log(token)

			const socket = io('https://reports.imas.kz/ws/get-report/');

			socket.send(token);

			socket.on('connect', () => {
				console.log('Успешное соединение с удаленным сервером');
			});

			socket.on('message', (data) => {
				console.log('Полученные данные:', data);
				let blob = new Blob([data.file_data], {
					type: formats[formatName],
				});
				let link = document.createElement("a");
				link.href = window.URL.createObjectURL(blob);
				link.download = `Export_iMAS_${formatYmd(new Date())}.${
					formatExtension[formatName]
				}`; // Export_iMAS_2022-12-20_15-36.pdf
				link.click();

			});

		})
		.catch((error) => console.error(error))
		.finally(()=> toggleLoading());
}

function padTo2Digits(num) {
	return String(num).padStart(2, "0");
}
function formatYmd(_date) {
	const date = new Date();
	const hoursAndMinutes =
		padTo2Digits(date.getHours()) + "-" + padTo2Digits(date.getMinutes());

	return `${_date.toISOString().slice(0, 10)}_${hoursAndMinutes}`;
}
