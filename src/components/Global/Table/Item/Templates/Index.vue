<script lang="ts" setup>
// Import Template Components
import TextTemplate from './Text.vue'
import ActionsTemplate from './Actions.vue'

import { defineProps, type PropType } from 'vue'
import type { ITableBody } from '@/interfaces'

defineProps({
    item: {
        type: Object as PropType<ITableBody>,
        required: true
    }
})
</script>

<template>
    <TextTemplate v-if="item.template === 'text'" :data="item.data" />
    <ActionsTemplate v-else-if="item.template === 'actions'" :data="item.data" />
</template>