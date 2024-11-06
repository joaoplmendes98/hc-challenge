<script lang="ts" setup>
import { type PropType, computed } from 'vue'
import type { ITableOptions, ITableHead, ITableBody, IPagination } from '@/interfaces'
import TableRowComponent from '@/components/Global/Table/Item/Index.vue'
import PaginationComponent from './Pagination/Index.vue'
import QueryComponent from './Query.vue'
import CreateButton from '@/components/Global/Buttons/Create.vue'
import HeadItem from './HeadItem.vue'

const props = defineProps({
    options: {
        type: Object as PropType<ITableOptions>,
        default: () => ({})
    },
    head: {
        type: Array as PropType<ITableHead[]>,
        required: true
    },
    body: {
        type: Array as PropType<ITableBody[][]>,
        required: true
    },
    pagination: {
        type: Object as PropType<IPagination>,
        default: () => ({})
    },
    sortData: {
        type: Array,
        default: () => ([null, 0])
    }
})

const emit = defineEmits(['new-action', 'new-query', 'new-sort'])

const availableWidth = computed(() => props.options.actions ? 92 : 100)

const handleAction = (id: number = 0, action: string) => {
    emit('new-action', [id, action])
}

const handleQuery = (query: string) => {
    emit('new-query', query)
}

const handleSort = (tag: string) => {
    emit('new-sort', tag)
}
</script>

<template>
    <div class="table-wrapper">
        <div class="actions">
            <div class="filters">
                <QueryComponent v-if="options.search" @new-query="handleQuery" />
            </div>
            <div class="buttons">
                <CreateButton @new-action="handleAction(0, $event)" />
            </div>
        </div>
        <div class="table">
            <header>
                <HeadItem
                    v-for="item in head"
                    :key="item.label"
                    :data="item"
                    :column-size="availableWidth / head.length"
                    :sort-data="sortData"
                    @sort="handleSort"
                />
                <div class="actions__column">
                    <p>Actions</p>
                </div>
            </header>
            <hr>
            <div class="table__body">
                <TableRowComponent
                    v-for="row in body"
                    :key="row[0].id"
                    :data="row"
                    :column-size="availableWidth / head.length"
                    @new-action="handleAction(row[0].id!, $event)"
                />
                <p class="empty" v-if="!body.length">
                    No Data Available
                </p>
            </div>
        </div>
        <PaginationComponent v-if="options.pagination" :data="pagination" />
    </div>
</template>

<style lang="scss" scoped>

.table-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.table {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: $white;
    border-radius: 6px;

    header {
        height: 32px;
        display: flex;
        align-items: center;
        position: sticky;
        top: 60px;
        background: $white;
        border-radius: 6px;

        .actions__column {
            padding-inline: 12px;
            width: 8%;
            display: flex;
            justify-content: flex-end;
            font-size: 12px;
        }
    }

    hr {
        border: none;
        width: 100%;
        height: 1px;
        background: $grey-100;
    }

    .table__body {
        p.empty {
            width: 100%;
            height: 40px;
            @include flex-center;
            font-size: 12px;
            color: $red;
        }
    }
}
</style>