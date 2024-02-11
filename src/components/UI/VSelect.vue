<template>
    <div class="select bg-white cursor-pointer" @mouseleave="hideOptions" @click="showOptions">
        <div
            class="
                select-default
                h-full
                flex
                justify-start
                items-center
                pl-3
                pr-5
            "
            :style="{
                width: selectWidth + 'px',
            }"
        >
            {{ name ?? selectedOptionName }}
        </div>
		<div class="select-offset h-1 w-full" @click.stop></div>
        <div class="pt-4px">
            <div
                class="select-options"
                :style="{
                    width: selectWidth + 'px',
                }"
				:class="{
					format: isFormat
				}"
                @click.stop
            >
                <div
                    class="w-full pl-3 pr-5"
                    v-for="option in options"
                    :key="option"
                    :class="{
                        selected: option.selected,
                    }"
                    @click="$emit('select-option', arrayName, option.name)"
                >

                            <i
                                v-if="option.iconClass"
                                :class="option.iconClass"
                                class="mr-2 fz-14px"
                            ></i>
                    {{ option.name }}
                </div>
                <span></span>
                <ul></ul>
            </div>
        </div>
        <i class="fa fa-angle-down"></i>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: false,
            default: undefined,
        },
        arrayName: {
            type: String,
            required: false,
            default: 'format',
        },
        options: {
            type: Array,
            required: true,
        },
        selectWidth: {
            type: Number,
            required: true,
        },
        isFormat: {
            type: Boolean,
            default: false,
        },
	},
	computed: {
		selectedOptionName() {
			return this.options.find(option => option.selected).name;
		}
	},
  methods: {
      showOptions(event) {
          if (event.target.classList.contains("select")) {
              event.target.querySelector(" .select-options").style.display =
                  "block";
          } else {
              event.target.parentElement.querySelector(
                  ".select-options"
              ).style.display = "block";
          }
      },
      hideOptions(event) {
          event.target.querySelector(" .select-options").style.display =
              "none";
      },
  },
};
</script>

<style>
.select-default {
    user-select: none;
}
.params > * {
    height: 36px;
    border-radius: 4px;
    font-size: 10pt;
}

.select {
    position: relative;
}
.select .fa.fa-angle-down {
    position: absolute;
    top: calc(50% - 7px);
    right: 6px;
}
.select-options > ul {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    z-index: 1;
}
.select-options {
    margin-top: 4px;
    border-radius: 4px;
    display: none;
    position: absolute;
    top: 100%;
	background: white;
	overflow: hidden;
}
.select-options > div {
    height: 30px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 3;
}
.select-options > span {
    content: "";
    position: absolute;
    top: -30px;
    right: 0;
    left: 0;
    height: 30px;
    z-index: 2;
    transition: 0.3s;
}
.select-options > div:nth-child(1).selected {
    background: #0583f3;
}
.select-options > div:hover i ,
	.select-options > div.selected i {
	color: white !important;
}
.select-options > div.selected,
.select-options > div:hover {
    color: white;
}
.select-options > div:nth-child(1) i {
	color: #0583f3;
}
.select-options > div:nth-child(1):hover ~ span {
    background: #0583f3 !important;
    top: 0 !important;
}
.select-options > div:nth-child(1).selected ~ span {
    background: #0583f3;
    top: 0;
}
.select-options > div:nth-child(2).selected {
    background: #e10000;
}
.select-options > div:nth-child(2) i {
	color: #e10000;
}
.select-options > div:nth-child(2):hover ~ span {
    background: #e10000 !important;
    top: 30px !important;
}
.select-options > div:nth-child(2).selected ~ span {
    background: #e10000;
    top: 30px;
}
.select-options > div:nth-child(3).selected {
    background: #00ac0f;
}
.select-options > div:nth-child(3) i {
	color: #00ac0f;
}
.select-options > div:nth-child(3):hover ~ span {
    background: #00ac0f !important;
    top: 60px !important;
}
.select-options > div:nth-child(3).selected ~ span {
    background: #00ac0f;
    top: 60px;
}
.select-options > div:nth-child(4).selected {
    background: #f2b90a;
}
.select-options > div:nth-child(4) i {
	color: #f2b90a;
}
.select-options > div:nth-child(4):hover ~ span {
    background: #f2b90a !important;
    top: 90px !important;
}
.select-options > div:nth-child(4).selected ~ span {
    background: #f2b90a;
    top: 90px;
}



.select-options.format > div:nth-child(1).selected {
	background: #0583f3;
}
.select-options.format > div:nth-child(1) i {
	color: #0583f3;
}
.select-options.format > div:nth-child(1):hover ~ span {
	background: #0583f3 !important;
	top: 0 !important;
}
.select-options.format > div:nth-child(1).selected ~ span {
	background: #0583f3;
	top: 0;
}
.select-options.format > div:nth-child(2).selected {
	background: #0583f3;
}
.select-options.format > div:nth-child(2) i {
	color: #0583f3;
}
.select-options.format > div:nth-child(2):hover ~ span {
	background: #0583f3 !important;
	top: 30px !important;
}
.select-options.format > div:nth-child(2).selected ~ span {
	background: #0583f3;
	top: 30px;
}
.select-options.format > div:nth-child(3).selected {
	background: #e10000;
}
.select-options.format > div:nth-child(3) i {
	color: #e10000;
}
.select-options.format > div:nth-child(3):hover ~ span {
	background: #e10000 !important;
	top: 60px !important;
}
.select-options.format > div:nth-child(3).selected ~ span {
	background: #e10000;
	top: 60px;
}
.select-options.format > div:nth-child(4).selected {
	background: #00ac0f;
}
.select-options.format > div:nth-child(4) i {
	color: #00ac0f;
}
.select-options.format > div:nth-child(4):hover ~ span {
	background: #00ac0f !important;
	top: 90px !important;
}
.select-options.format > div:nth-child(4).selected ~ span {
	background: #00ac0f;
	top: 90px;
}
.select-options.format > div:nth-child(5).selected {
	background: #f2b90a;
}
.select-options.format > div:nth-child(5) i {
	color: #f2b90a;
}
.select-options.format > div:nth-child(5):hover ~ span {
	background: #f2b90a !important;
	top: 120px !important;
}
.select-options.format > div:nth-child(5).selected ~ span {
	background: #f2b90a;
	top: 120px;
}


.select-options.format > div:nth-child(6).selected {
  background: #0583f3;
}
.select-options.format > div:nth-child(6) i {
  color: #0583f3;
}
.select-options.format > div:nth-child(6):hover ~ span {
  background: #0583f3 !important;
  top: 150px !important;
}
.select-options.format > div:nth-child(6).selected ~ span {
  background: #0583f3;
  top: 150px;
}


</style>