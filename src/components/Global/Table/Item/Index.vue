<script lang="ts" setup>
import type { ITableBody } from '@/interfaces'
import TableRowTemplates from '@/components/Global/Table/Item/Templates/Index.vue'

defineProps({
    data: {
        type: Object as () => ITableBody[],
        required: true
    },
    columnSize: {
        type: Number,
        default: () => 1
    }
})

const emit = defineEmits(['new-action'])

const handleAction = (action: string) => {
    emit('new-action', action)
}
</script>

<template>
    <article>
        <div class="column"
            v-for="(item, i) in data"
            :key="item.template + i"
            :style="{'--column-size': `${columnSize}%`}"
            :class="{actions: item.template === 'actions', 'pointer': i === 0}"
            @click="i === 0 && handleAction('see')"
        >
            <TableRowTemplates :item="item" @new-action="handleAction"/>
        </div>
    </article>
</template>

<style lang="scss" scoped>
article {
    height: 40px;
    display: flex;
    align-items: center;

    .column {
        display: flex;
        align-items: center;
        width: var(--column-size);
        height: 100%;
        padding-inline: 12px;

        &.actions {
            width: 8%;
            justify-content: flex-end;
        }

        &.pointer {
            cursor: pointer;
        }
    }
}
</style>