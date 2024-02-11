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
    { count: 1, id: "element-1", name: "tags", ru: "Теги", type: "default" },
    [
        // { name: "length", ru: "Длина", type: "number", value: 225 }
    ]
)
    .set(
        {
            count: 1,
            id: "element-2",
            name: "category",
            ru: "Категория",
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
                name: "number",
                ru: "Число",
                type: "checkbox",
                value: true,
            },
            {
                name: "percent",
                ru: "Процент",
                type: "checkbox",
                value: false,
            },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-3",
            name: "sentiments",
            ru: "Тональность сообщений",
            type: "graph",
        },
        [
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
                value: false,
            },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-4",
            name: "resources",
            ru: "Ресурсы",
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
            { name: "number", ru: "Число", type: "checkbox", value: true },
            { name: "percent", ru: "Процент", type: "checkbox", value: false },
        ]
    )
    .set(
        { count: 1, id: "element-5", name: "dates", ru: "Даты", type: "graph" },
        [
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
                value: false,
            },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-6",
            name: "smi_table",
            ru: "СМИ",
            type: "table",
        },
        [
            {
                width: text("Столбцы") + 4,
                minusDistance: 151,
                name: "columns",
                ru: "Столбцы",
                type: "columns",
                value: [
                    { name: "number", ru: "Число", selected: "hide" },
                    { name: "title", ru: "Заголовок", selected: true },
                    { name: "content", ru: "Краткое", selected: "default" },
                    { name: "date", ru: "Дата", selected: true },
                    { name: "resource", ru: "Источник", selected: true },
                    { name: "resource_link", ru: "Источник", selected: true },
                    { name: "news_link", ru: "URL", selected: true },
                    { name: "sentiment", ru: "Оценка", selected: true },
                    { name: "category", ru: "Категория", selected: true },
                ],
            },
            {
                height: 24 * 3,
                visible: false,
                name: "tag_highlight",
                ru: "Выделение тега",
                type: "dropdown",
                value: [
                    {
                        name: "bold",
                        ru: "Жирность",
                        type: "checkbox",
                        value: true,
                    },
                    {
                        name: "tag_color",
                        ru: "Цвет текста",
                        type: "color",
                        value: "#000000",
                        show: false,
                    },
                    {
                        name: "back_color",
                        ru: "Цвет фона",
                        type: "color",
                        value: "#dcdcdc",
                        show: false,
                    },
                ],
            },
            {
                height: 24 * 3,
                width: text("Тональность") + 18,
                visible: false,
                name: "order",
                ru: "Порядок",
                type: "dropdown",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "date",
                                ru: "Дата",
                                selected: false,
                                type: "select",
                                outputIndex: true,
                            },
                            [
                                {
                                    name: "По убыванию",
                                    index: 0,
                                    selected: true,
                                },
                                {
                                    name: "По возрастанию",
                                    index: 1,
                                    selected: false,
                                },
                            ]
                        );
                    }),
                ],
                draggables: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "sentiments",
                                ru: "Тональность",
                                type: "draggable",
                                showResources: true,
                                selected: true,
                            },
                            [
                                {
                                    name: "positive",
                                    ru: "Позитивные",
                                    selected: true,
                                    defaultPosition: 0,
                                },
                                {
                                    name: "neutral",
                                    ru: "Нейтральные",
                                    selected: true,
                                    defaultPosition: 1,
                                },
                                {
                                    name: "negative",
                                    ru: "Негативные",
                                    selected: true,
                                    defaultPosition: 2,
                                },
                            ]
                        );
                        newMap.set(
                            {
                                name: "categories",
                                ru: "Категории",
                                type: "draggable",
                                showResources: false,
                                selected: false,
                            },
                            [
                                {
                                    name: "Государственные источники",
                                    selected: true,
                                },
                                {
                                    name: "Информационные агентства",
                                    selected: true,
                                },
                                {
                                    name: "Региональные источники",
                                    selected: true,
                                },
                                { name: "Электронные СМИ", selected: true },
                                { name: "Специализированные", selected: true },
                                {
                                    name: "Зарубежные источники",
                                    selected: true,
                                },
                                {
                                    name: "Государственные закупки",
                                    selected: true,
                                },
                                { name: "LiveJournal", selected: true },
                                { name: "Печатные СМИ", selected: true },
                                { name: "Телевидение", selected: true },
                                { name: "Радио", selected: true },
                                { name: "Агрегаторы СМИ", selected: true },
                                { name: "Печатные издания", selected: true },
                            ]
                        );
                    }),
                ],
            },
            {
                name: "text_length",
                ru: "Количество символов",
                selected: true,
                height: 24,
                visible: false,
                min: 70,
                max: 500,
                type: "number",
                value: 400,
            },
        ]
    )
    .set(
        {
            count: 1,
            id: "element-7",
            name: "soc_table",
            ru: "Социальные сети",
            type: "table",
        },
        [
            {
                width: text("Столбцы") + 4,
                minusDistance: 214,
                name: "columns",
                ru: "Столбцы",
                type: "columns",
                value: [
                    { name: "number", ru: "Число", selected: "hide" },
                    {
                        name: "content",
                        ru: "Краткое содержание",
                        selected: "default",
                    },
                    { name: "resource", ru: "Источник", selected: true },
                    { name: "date", ru: "Дата", selected: true },
                    { name: "category", ru: "Категория", selected: true },
                    { name: "resource_link", ru: "Источник", selected: true },
                    { name: "news_link", ru: "URL", selected: true },
                    {
                        name: "sentiment",
                        ru: "Оценка новостей",
                        selected: true,
                    },
                ],
            },
            {
                height: 24 * 3,
                visible: false,
                name: "tag_highlight",
                ru: "Выделение тега",
                type: "dropdown",
                value: [
                    {
                        name: "bold",
                        ru: "Жирность",
                        type: "checkbox",
                        value: true,
                    },
                    {
                        name: "tag_color",
                        ru: "Цвет текста",
                        type: "color",
                        value: "#000000",
                        show: false,
                    },
                    {
                        name: "back_color",
                        ru: "Цвет фона",
                        type: "color",
                        value: "#dcdcdc",
                        show: false,
                    },
                ],
            },
            {
                height: 24 * 3,
                width: text("Тональность") + 18,
                visible: false,
                name: "order",
                ru: "Порядок",
                type: "dropdown",
                value: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "date",
                                ru: "Дата",
                                selected: false,
                                type: "select",
                                outputIndex: true,
                            },
                            [
                                {
                                    name: "По убыванию",
                                    index: 0,
                                    selected: true,
                                },
                                {
                                    name: "По возрастанию",
                                    index: 1,
                                    selected: false,
                                },
                            ]
                        );
                    }),
                ],
                draggables: [
                    ...createMap((newMap) => {
                        newMap.set(
                            {
                                name: "sentiments",
                                ru: "Тональность",
                                type: "draggable",
                                selected: true,
                            },
                            [
                                {
                                    name: "positive",
                                    ru: "Позитивные",
                                    selected: true,
                                    defaultPosition: 0,
                                },
                                {
                                    name: "neutral",
                                    ru: "Нейтральные",
                                    selected: true,
                                    defaultPosition: 1,
                                },
                                {
                                    name: "negative",
                                    ru: "Негативные",
                                    selected: true,
                                    defaultPosition: 2,
                                },
                            ]
                        );
                        newMap.set(
                            {
                                name: "categories",
                                ru: "Категории",
                                type: "draggable",
                                selected: false,
                            },
                            [
                                { name: "Вконтакте", selected: true },
                                { name: "Facebook", selected: true },
                                { name: "Twitter", selected: true },
                                { name: "Instagram", selected: true },
                                { name: "LinkedIn", selected: true },
                                { name: "Youtube", selected: true },
                                { name: "Одноклассники", selected: true },
                                { name: "Мой_Мир", selected: true },
                                { name: "Telegram", selected: true },
                                { name: "TikTok", selected: true },
                            ]
                        );
                    }),
                ],
            },
            {
                name: "text_length",
                ru: "Количество символов",
                selected: true,
                height: 24,
                visible: false,
                min: 70,
                max: 500,
                type: "number",
                value: 400,
            },
        ]
    );

export default reactive(
    ref(Object.entries([...map.entries()]).map((el) => el[1]))
);
