<script lang="ts" setup>
import FormTemplates from './Templates/Index.vue'

interface IField {
    tag: string
    label: string
    template: string
    type?: string
    required?: boolean
}

defineProps<{
    data: IField[]
}>()

const handleSumit = () => {
    console.log('Form Submitted')
}
</script>

<template>
    <form @submit.prevent="handleSumit">
        <FormTemplates v-for="field in data" :key="field.tag" :item="field" />
    </form>
</template>

<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>