<script lang="ts" setup>
import InputTemplate from './Input.vue'
import { computed } from 'vue'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const activeTemplate = computed(() => {
    switch (props.item.template) {
        case 'input':
            return InputTemplate
    }
})

</script>

<template>
    <component :is="activeTemplate" :item="props.item" />
</template>