<script lang="ts" setup>
import { type PropType } from 'vue'

type TableActions = 'orders' | 'edit' | 'delete'

defineProps({
    data: Array as PropType<TableActions[]>,
    default: () => []
})

const emit = defineEmits(['new-action'])

const icons = {
    orders: 'url(/icons/order.svg)',
    edit: 'url(/icons/edit.svg)',
    delete: 'url(/icons/delete.svg)'
}

const handleActionClick = (action: string) => {
    emit('new-action', action)
}
</script>

<template>
    <div class="actions">
        <figure
            v-for="action in data"
            :key="action"
            :style="{'--icon': icons[action]}"
            :title="action"
            class="icon"
            :class="action"
            @click="handleActionClick(action)"
        />
    </div>
</template>

<style lang="scss" scoped>
.actions {
    display: flex;
    gap: 12px;

    figure {
        cursor: pointer;
        
        &.delete {
            &::after {
                background: $red;
            }
        }
    }
}
</style>