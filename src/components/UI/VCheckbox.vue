<template>
    <div class="abc-checkbox-circlle flex items-center bg-white">
        <input type="checkbox" :id="param" v-model="checkbox[param]" />
        <label class="font-normal whitespace-nowrap mb-0" :for="param">
            <slot></slot>
        </label>
    </div>
</template>

<script>
import { checkbox } from "@/use/data/checkbox";

export default {
    setup() {
        return {
            checkbox,
        }
    },
    props: {
        param: {
            type: String,
            required: true,
        },
    },
};
</script>

<style>

</style>