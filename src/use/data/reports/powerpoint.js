import { ref, reactive } from "vue";

const map = new Map();

map.set(
    {
        count: 1,
        id: "element-1",
        name: "presentation",
        ru: "Презентация",
        type: "project",
    },
    [
        {
			height: 24,
			visible: false,
            name: "window_count",
            ru: "Количество окон",
            type: "number",
            min: 0,
            max: 6,
            value: 4,
        },
    ]
)
    .set(
        {
            count: 1,
            id: "element-2",
            name: "distribution",
            ru: "Распределение",
            type: "project",
        },
        [
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
            id: "element-3",
            name: "activity_1",
            ru: "Активность 1",
            type: "project",
        },
        [
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
            id: "element-4",
            name: "activity_2",
            ru: "Активность 2",
            type: "project",
        },
        [
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
            id: "element-5",
            name: "activity_3",
            ru: "Активность 3",
            type: "project",
        },
        [
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
    );

export default reactive(
    ref(Object.entries([...map.entries()]).map((el) => el[1]))
);
