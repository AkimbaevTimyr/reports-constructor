export default {
    props: {
        mainOptionId: {
            required: true,
        },
        option: {
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
        mutationOption(option, value) {
            option.visible = value
        },
		text(text, font) {
			let context = document.createElement("canvas").getContext("2d");
			context.font = font + "px Arial";
			return parseInt(context.measureText(text).width);
		},
    },
    computed: {
        textWidth() {
            if (this.toggleShowOption) {
                return this.option.width
            }
            else
            {
                return this.text(this.option.ru, 13) + 20;
            }
        },
    },
    watch: {
        mainOptionId() {
            if (this.option.name == "text_length" && !this.option.selected) {
                this.mutationOption(this.option, false)
                return;
            }
            
            if (this.option.type === "columns") {
                this.mutationOption(this.option, this.toggleShowOption)
            }
			else {
                setTimeout(() => {
                    if (this.toggleShowOption) {
                        this.mutationOption(this.option, true)
                    }
                }, 350);
            }
        },
        toggleShowOption(newBool) {
            if (!newBool) {
                this.mutationOption(this.option, false)
            }
        },
    },
};
