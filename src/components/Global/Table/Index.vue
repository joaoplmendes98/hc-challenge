<script lang="ts" setup>
import { defineProps, type PropType, computed } from 'vue'
import type { ITableOptions, ITableHead, ITableBody} from '@/interfaces'
import TableRowComponent from '@/components/Global/Table/Item/Index.vue'

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
    }
})

const availableWidth = computed(() => props.options.actions ? 92 : 100)

</script>

<template>
    <div class="table">
        <header>
            <div v-for="item in head" :key="item.label" :style="{width: `${availableWidth / head.length}%`}">
                <p>{{ item.label }}</p>
            </div>
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
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table {
    display: flex;
    flex-direction: column;
    background: $white;
    border-radius: 6px;

    header {
        height: 32px;
        display: flex;
        align-items: center;
        padding-inline: 12px;

        p {
            font-size: 12px;
            font-weight: 500;
        }

        .actions__column {
            width: 8%;
            display: flex;
            justify-content: flex-end;
        }
    }

    hr {
        border: none;
        width: 100%;
        height: 1px;
        background: $grey-100;
    }
}
</style>