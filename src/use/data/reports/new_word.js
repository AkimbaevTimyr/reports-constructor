import { ref, reactive } from "vue";

function text(text, font = 13) {
    let context = document.createElement("canvas").getContext("2d");
    context.font = font + "px Arial";
    return parseInt(context.measureText(text).width) + 16;
}

const map = new Map();

function createMap(_function) {
    let newMap = new Map();

    _function(newMap);

    return newMap;
}

map.set(
    {
        count: 1,
        id: "element-1",
        name: "tags",
        ru: "Теги",
        type: "default",
    },
    []
)
    .set(
        {
            count: 1,
            id: "element-6",
            name: "contents",
            ru: "Оглавление",
            type: "default",
        },
        [
            {
                height: 24,
                visible: false,
                name: "smi",
                ru: "СМИ",
                type: "number",
                min: 0,
                max: 50,
                value: 0,
            },
            {
                height: 24,
                visible: false,
                name: "soc",
                ru: "Соцсети",
                type: "number",
                min: 0,
                max: 50,
                value: 0,
            },
            {
                name: "table",
                ru: "Таблица",
                type: "checkbox",
                value: false,
            },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-4",
            name: "message_dynamic",
            ru: "Динамика сообщений",
            type: "graph",
        },
        []
    )
    .set(
        {
            count: 1,
            id: "element-5",
            name: "sentiments",
            ru: "Тональность сообщений",
            type: "graph",
        },
        [
            {
                height: 24 * 3,
                width: text("Круговая"),
                visible: false,
                name: "type",
                ru: "Тип",
                type: "select",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "pie",
                                ru: "Круговая",
                                type: "select",
                                selected: true,
                            },
                            { data_labels: false }
                        );
                        newMap.set(
                            {
                                name: "bar",
                                ru: "Бар",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true, labels: true }
                        );
                        newMap.set(
                            {
                                name: "column",
                                ru: "Столбец",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true, labels: true }
                        );
                    }),
                ],
            },
            {
                name: "number",
                ru: "Число",
                type: "checkbox",
                value: true, // number: input, object: [], array, boolean
            },
            {
                name: "percent",
                ru: "Процент",
                type: "checkbox",
                value: true,
            },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-6",
            name: "distribution",
            ru: "Распределение по СМИ, Соцсети",
            type: "graph",
        },
        [
            {
                height: 24 * 3,
                width: text("Круговая"),
                visible: false,
                name: "type",
                ru: "Тип",
                type: "select",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "pie",
                                ru: "Круговая",
                                type: "select",
                                selected: true,
                            },
                            { data_labels: false }
                        );
                        newMap.set(
                            {
                                name: "bar",
                                ru: "Бар",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true, labels: true }
                        );
                        newMap.set(
                            {
                                name: "column",
                                ru: "Столбец",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true, labels: true }
                        );
                    }),
                ],
            },
            {
                name: "number",
                ru: "Число",
                type: "checkbox",
                value: true,
            },
            {
                name: "percent",
                ru: "Процент",
                type: "checkbox",
                value: true,
            },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-7",
            name: "smi_distribution",
            ru: "Распределение по категориям источников в СМИ",
            type: "graph",
        },
        [
            {
                height: 24,
                visible: false,
                name: "length",
                ru: "Длина",
                type: "number",
                min: 3,
                max: 10,
                value: 10,
            },
            {
                height: 24 * 3,
                width: text("Круговая"),
                visible: false,
                name: "type",
                ru: "Тип",
                type: "select",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "pie",
                                ru: "Круговая",
                                type: "select",
                                selected: true,
                            },
                            { data_labels: false }
                        );
                        newMap.set(
                            {
                                name: "bar",
                                ru: "Бар",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true, labels: true }
                        );
                        newMap.set(
                            {
                                name: "column",
                                ru: "Столбец",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true }
                        );
                    }),
                ],
            },
            {
                name: "number",
                ru: "Число",
                type: "checkbox",
                value: true,
            },
            {
                name: "percent",
                ru: "Процент",
                type: "checkbox",
                value: true,
            },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-8",
            name: "soc_distribution",
            ru: "Распределение по соцсетям",
            type: "graph",
        },
        [
            {
                height: 24,
                visible: false,
                name: "length",
                ru: "Длина",
                type: "number",
                min: 3,
                max: 10,
                value: 10,
            },
            {
                height: 24 * 3,
                width: text("Круговая"),
                visible: false,
                name: "type",
                ru: "Тип",
                type: "select",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "pie",
                                ru: "Круговая",
                                type: "select",
                                selected: true,
                            },
                            { data_labels: false }
                        );
                        newMap.set(
                            {
                                name: "bar",
                                ru: "Бар",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true, labels: true }
                        );
                        newMap.set(
                            {
                                name: "column",
                                ru: "Столбец",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true }
                        );
                    }),
                ],
            },
            {
                name: "number",
                ru: "Число",
                type: "checkbox",
                value: true,
            },
            {
                name: "percent",
                ru: "Процент",
                type: "checkbox",
                value: true,
            },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-9",
            name: "media_top",
            ru: "Самые активные источники в СМИ",
            type: "graph",
        },
        [
            {
                height: 24,
                visible: false,
                name: "length",
                ru: "Длина",
                type: "number",
                min: 3,
                max: 20,
                value: 20,
            },
            {
                height: 24 * 3,
                width: text("Круговая"),
                visible: false,
                name: "type",
                ru: "Тип",
                type: "select",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "pie",
                                ru: "Круговая",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: false }
                        );
                        newMap.set(
                            {
                                name: "bar",
                                ru: "Бар",
                                type: "select",
                                selected: true,
                            },
                            { data_labels: true, labels: true }
                        );
                        newMap.set(
                            {
                                name: "column",
                                ru: "Столбец",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true }
                        );
                    }),
                ],
            },
            { name: "number", ru: "Число", type: "checkbox", value: false },
            { name: "percent", ru: "Процент", type: "checkbox", value: false },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-10",
            name: "soc_top",
            ru: "Самые активные источники в Соцсетях",
            type: "graph",
        },
        [
            {
                height: 24,
                visible: false,
                name: "length",
                ru: "Длина",
                type: "number",
                min: 3,
                max: 20,
                value: 20,
            },
            {
                height: 24 * 3,
                width: text("Круговая"),
                visible: false,
                name: "type",
                ru: "Тип",
                type: "select",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "pie",
                                ru: "Круговая",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: false }
                        );
                        newMap.set(
                            {
                                name: "bar",
                                ru: "Бар",
                                type: "select",
                                selected: true,
                            },
                            { data_labels: true, labels: true }
                        );
                        newMap.set(
                            {
                                name: "column",
                                ru: "Столбец",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true }
                        );
                    }),
                ],
            },
            { name: "number", ru: "Число", type: "checkbox", value: false },
            { name: "percent", ru: "Процент", type: "checkbox", value: false },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-11",
            name: "most_popular_soc",
            ru: "Самые активные источники в соцсети",
            type: "graph",
        },
        [
            {
                height: 24,
                visible: false,
                name: "length",
                ru: "Длина",
                type: "number",
                min: 3,
                max: 20,
                value: 20,
            },
            {
                height: 24 * 3,
                width: text("Круговая"),
                visible: false,
                name: "type",
                ru: "Тип",
                type: "select",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "pie",
                                ru: "Круговая",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: false }
                        );
                        newMap.set(
                            {
                                name: "bar",
                                ru: "Бар",
                                type: "select",
                                selected: true,
                            },
                            { data_labels: true, labels: true }
                        );
                        newMap.set(
                            {
                                name: "column",
                                ru: "Столбец",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true }
                        );
                    }),
                ],
            },
            { name: "number", ru: "Число", type: "checkbox", value: false },
            { name: "percent", ru: "Процент", type: "checkbox", value: false },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-12",
            name: "top_negative",
            ru: "Топ негативных источников",
            type: "graph",
        },
        [
            {
                height: 24,
                visible: false,
                name: "length",
                ru: "Длина",
                type: "number",
                min: 3,
                max: 20,
                value: 20,
            },
            {
                height: 24 * 3,
                width: text("Круговая"),
                visible: false,
                name: "type",
                ru: "Тип",
                type: "select",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "pie",
                                ru: "Круговая",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: false }
                        );
                        newMap.set(
                            {
                                name: "bar",
                                ru: "Бар",
                                type: "select",
                                selected: true,
                            },
                            { data_labels: true, labels: true }
                        );
                        newMap.set(
                            {
                                name: "column",
                                ru: "Столбец",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true }
                        );
                    }),
                ],
            },
            { name: "number", ru: "Число", type: "checkbox", value: false },
            { name: "percent", ru: "Процент", type: "checkbox", value: false },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-13",
            name: "smi_top_negative",
            ru: "Топ негативных источников по СМИ",
            type: "graph",
        },
        [
            {
                height: 24,
                visible: false,
                name: "length",
                ru: "Длина",
                type: "number",
                min: 3,
                max: 20,
                value: 20,
            },
            {
                height: 24 * 3,
                width: text("Круговая"),
                visible: false,
                name: "type",
                ru: "Тип",
                type: "select",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "pie",
                                ru: "Круговая",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: false }
                        );
                        newMap.set(
                            {
                                name: "bar",
                                ru: "Бар",
                                type: "select",
                                selected: true,
                            },
                            { data_labels: true, labels: true }
                        );
                        newMap.set(
                            {
                                name: "column",
                                ru: "Столбец",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true }
                        );
                    }),
                ],
            },
            { name: "number", ru: "Число", type: "checkbox", value: false },
            { name: "percent", ru: "Процент", type: "checkbox", value: false },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-14",
            name: "soc_top_negative",
            ru: "Топ негативных источников по Соц.сетям",
            type: "graph",
        },
        [
            {
                height: 24,
                visible: false,
                name: "length",
                ru: "Длина",
                type: "number",
                min: 3,
                max: 20,
                value: 20,
            },
            {
                height: 24 * 3,
                width: text("Круговая"),
                visible: false,
                name: "type",
                ru: "Тип",
                type: "select",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "pie",
                                ru: "Круговая",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: false }
                        );
                        newMap.set(
                            {
                                name: "bar",
                                ru: "Бар",
                                type: "select",
                                selected: true,
                            },
                            { data_labels: true, labels: true }
                        );
                        newMap.set(
                            {
                                name: "column",
                                ru: "Столбец",
                                type: "select",
                                selected: false,
                            },
                            { data_labels: true }
                        );
                    }),
                ],
            },
            { name: "number", ru: "Число", type: "checkbox", value: false },
            { name: "percent", ru: "Процент", type: "checkbox", value: false },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-15",
            name: "world_map",
            ru: "Активность источников по регионам",
            type: "map",
        },
        [
            {
                height: 24,
                visible: false,
                name: "length",
                ru: "Длина",
                type: "number",
                min: 0,
                max: 44,
                value: 44,
            },
            { name: "number", ru: "Число", type: "checkbox", value: true },
            { name: "percent", ru: "Процент", type: "checkbox", value: true },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-16",
            name: "kaz_map",
            ru: "Активность источников по РК",
            type: "map",
        },
        [
            {
                height: 24,
                visible: false,
                name: "length",
                ru: "Длина",
                type: "number",
                min: 0,
                max: 44,
                value: 44,
            },
            { name: "number", ru: "Число", type: "checkbox", value: true },
            { name: "percent", ru: "Процент", type: "checkbox", value: true },
        ]
    )


export default reactive(
    ref(Object.entries([...map.entries()]).map((el) => el[1]))
);
