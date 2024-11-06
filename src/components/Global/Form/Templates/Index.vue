<script lang="ts" setup>
import InputTemplate from './Input.vue'
import { computed } from 'vue'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['new-value'])

const activeTemplate = computed(() => {
    switch (props.item.template) {
        case 'input':
            return InputTemplate
    }
})

const handleNewValue = ([tag, value]: [string, any]) => {
    emit('new-value', [tag, value])
}

</script>

<template>
    <component :is="activeTemplate" :item="props.item" @new-value="handleNewValue" />
</template>