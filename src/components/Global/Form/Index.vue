<script lang="ts" setup>
import { ref } from 'vue'
import FormTemplates from './Templates/Index.vue'
import type { IGenericObject } from '@/interfaces'

interface IField {
    tag: string
    label: string
    template: string
    type?: string
    required?: boolean
}

defineProps({
    data: {
        type: Array as () => IField[],
        required: true
    }
})

const emit = defineEmits(['form-submit'])

const finalData = ref<IGenericObject>({})

const handleNewValue = ([tag, value]: [string, any]) => {
    finalData.value[tag] = value
}

const handleSumit = () => {
    emit('form-submit', finalData.value)
}
</script>

<template>
    <form @submit.prevent="handleSumit">
        <FormTemplates v-for="field in data" :key="field.tag" :item="field" @new-value="handleNewValue" />
    </form>
</template>

<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>