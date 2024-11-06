<script lang="ts" setup>
import { type PropType } from 'vue'
import type { IPagination } from '@/interfaces'
import ItemsInView from './ItemsInView.vue'

const props = defineProps({
    data: {
        type: Object as PropType<IPagination>,
        required: true
    }
})

const emit = defineEmits(['new-page'])

const handlePagination = (direction: number) => {
    emit('new-page', direction)
}
</script>

<template>
    <div class="pagination">
        <ItemsInView :data="data" />
        <div class="actions">
            <button :disabled="props.data.currentPage === 1" @click.prevent="handlePagination(-1)">&#60;</button>
            <p>{{ data.currentPage }}</p>
            <button :disabled="props.data.currentPage === props.data.totalPages" @click.prevent="handlePagination(1)">&#62;</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.pagination {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;

    p {
        font-size: 12px;
    }

    .actions {
        display: flex;
        align-items: center;
        gap: 4px;

        button {
            background: $white;
            border: none;
            font-weight: 500;
            padding: 4px;
            border-radius: 2px 4px;
            border: solid 1px $grey-100;
            cursor: pointer;
        }
    }
}
</style>