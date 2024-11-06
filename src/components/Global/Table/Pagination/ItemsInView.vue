<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { IPagination } from '@/interfaces'

const props = defineProps({
    data: {
        type: Object as PropType<IPagination>,
        required: true
    }
})

const seeingItems = computed(() => {
    if (props.data.totalItems < props.data.itemsPerPage) {
        return `1 to ${props.data.totalItems}`
    }

    const maxPageItems = ((props.data.currentPage + 1) * props.data.itemsPerPage) - 1
    const minPageItems = props.data.currentPage * props.data.itemsPerPage

    return maxPageItems > props.data.totalItems ? `${minPageItems + 1} to ${props.data.totalItems}` : `${minPageItems + 1} to ${maxPageItems}`
})
</script>

<template>
    <p>Seeing items <b>{{seeingItems}}</b> from <b>{{ data.totalItems }}</b></p>
</template>

<style lang="scss" scoped>
p {
    font-size: 12px;

    b {
        font-weight: 500;
    }
}
</style>