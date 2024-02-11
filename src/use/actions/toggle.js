import { currentGraphCount, currentReport, groupCount, leftGroup } from "@/use/data/reports_copy";
import { currentBaseReport } from "@/use/data/reports";

// добавление элемента на шаблон - теги период и тд
function addElement(name) {
	// console.log(name) - soc_distribution пример
	const id = currentBaseReport.value.findIndex(
		(el) => el[0].name === name
	);
	let count = currentBaseReport.value[id][0].count;
	if (count !== 0) {
		// копируем элемент по его id
		let element = JSON.parse(JSON.stringify(currentBaseReport.value[id]));

		element[0].id += Math.random();

		console.log(currentReport, 'report')
		console.log(currentReport.value, 'value')

		currentReport.value.push(element);

		currentBaseReport.value[id][0].count -= 1;
	}
	console.log(currentReport.value)
	// [ example вторрый массивом лежат его методы по типу формат и тд
	// 	{
	// 		"count": 1,
	// 		"id": "element-30.0018581483571138424",
	// 		"name": "count",
	// 		"ru": "Общее количество сообщений",
	// 		"type": "default"
	// 	},
	// 	[]
	// ]
}


function removeElement(name, copy_id, groupId = null) {
	const base_index = currentBaseReport.value.findIndex(
		(el) => el[0].name === name
	);
	if (groupId != null) {
		currentReport.value[groupId][1].elements.splice(copy_id, 1)
	}
	else {
		currentReport.value.splice(copy_id, 1)
	}
	currentBaseReport.value[base_index][0].count += 1;
}

// добавление группы
function addGroup() {
	if (leftGroup.value === 0) {
		console.error('Больше нет групп!');
		return;
	}
	console.log(leftGroup.value, 'left-group')
	if (currentGraphCount.value > 0) {
		currentReport.value.push([
            {
                id: `group-${groupCount.value}`,
                name: "GROUP",
                error: "Должно быть два элемента.",
            },
            {
                elements: [],
            },
        ]);
		console.log('currRepValue',currentReport.value)
	}
	// если нету графика на отчете
	else
	{
        alert("Добавьте график.");
	}
}

// удаление группы
function removeGroup(groupId) {
    const currentGroup = currentReport.value[groupId];
    const currentGroupElements = currentGroup[1].elements;
    currentReport.value.splice(groupId, 1, ...currentGroupElements);
}


// функция добавление проекта на отчет
function addProject() {
    let emptyGroup = currentReport.value.find(
        (el) => el[1].elements?.length == 0
    );
	console.log('emptyGroup', emptyGroup);
	if (emptyGroup === undefined) {
		currentReport.value.push([
            {
                id: `group-${groupCount + 1}`,
                name: "GROUP",
                projectId: "",
                projectName: "",
                error: "Не менее одного элемента в проекте.",
            },
            {
                elements: [],
            },
        ])
		console.log('currRepValue',currentReport.value)
	}
}

function removeProject(groupId) {
    removeGroup(groupId)
}

export { addElement, removeElement, addGroup, removeGroup, addProject, removeProject }