<script lang="ts" setup>
// Import Template Components
import TextTemplate from './Text.vue'
import ActionsTemplate from './Actions.vue'

import { type PropType } from 'vue'
import type { ITableBody } from '@/interfaces'

defineProps({
    item: {
        type: Object as PropType<ITableBody>,
        required: true
    }
})

const emit = defineEmits(['new-action'])

const handleAction = (action: string) => {
    emit('new-action', action)
}
</script>

<template>
    <TextTemplate v-if="item.template === 'text'" :data="item.data" />
    <ActionsTemplate v-else-if="item.template === 'actions'" :data="item.data" @new-action="handleAction" />
</template>