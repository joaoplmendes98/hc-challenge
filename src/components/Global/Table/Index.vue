<script lang="ts" setup>
import { type PropType, computed, ref, onUnmounted, watch } from 'vue'
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
    },
    filtersData: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['new-action', 'new-query', 'new-sort', 'new-page', 'new-filter'])

const availableWidth = computed(() => props.options.actions ? 92 : 100)

const availableColumns = () => {
    // 40px from the page padding (20 each side), 24 from the row padding (12 each side)
    const totalWidth = window.innerWidth - 40 - 24
    const widthAvailable = (totalWidth / availableWidth.value) * 100

    return Math.floor(widthAvailable / 200)
}

const headColumns = ref(props.head)
const bodyColumns = ref(props.body)

const setHeadAndBodyColumns = () => {
    headColumns.value = props.head.slice(0, availableColumns())
    bodyColumns.value = props.body.map((row) => {
        const slicedRow = row.slice(0, availableColumns())
        const actionColumn = row.find(col => col.template === 'actions')

        if (actionColumn && !slicedRow.some(col => col.template === 'actions')) {
            slicedRow.push(actionColumn)
        }
        return slicedRow
    })
}

setHeadAndBodyColumns()

window.addEventListener('resize', setHeadAndBodyColumns)

watch(() => props.head, () => {
    setHeadAndBodyColumns()
})

watch(() => props.body, () => {
    setHeadAndBodyColumns()
})

// Handle Emit Events
const handleAction = (id: number = 0, action: string) => {
    emit('new-action', [id, action])
}

const handleQuery = (query: string) => {
    emit('new-query', query)
}

const handleSort = (tag: string) => {
    emit('new-sort', tag)
}

const handleFilter = ([tag, filter]: [string, string]) => {
    emit('new-filter', [tag, filter])
}

const handlePagination = (direction: number) => {
    emit('new-page', direction)
}

// handle unmound
onUnmounted(() => {
    window.removeEventListener('resize', setHeadAndBodyColumns)
})
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
                    v-for="item in headColumns"
                    :key="item.label"
                    :data="item"
                    :column-size="availableWidth / headColumns.length"
                    :sort-data="sortData"
                    :filters-data="item.tag ? filtersData[item.tag] : []"
                    @sort="handleSort"
                    @filter="handleFilter"
                />
                <div class="actions__column">
                    <p>Actions</p>
                </div>
            </header>
            <hr>
            <div class="table__body">
                <TableRowComponent
                    v-for="row in bodyColumns"
                    :key="row[0].id"
                    :data="row"
                    :column-size="availableWidth / headColumns.length"
                    @new-action="handleAction(row[0].id!, $event)"
                />
                <p class="empty" v-if="!bodyColumns.length">
                    No Data Available
                </p>
            </div>
        </div>
        <PaginationComponent v-if="options.pagination" :data="pagination" @new-page="handlePagination" />
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