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
    const startItem = (props.data.currentPage - 1) * props.data.itemsPerPage + 1
    const endItem = Math.min(props.data.currentPage * props.data.itemsPerPage, props.data.totalItems)

    return `${startItem} to ${endItem}`
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