<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAlerts } from '@/stores/alerts'
import AlertItem from './Item.vue'

const { alerts } = storeToRefs(useAlerts())
</script>

<template>
    <div class="alerts">
        <AlertItem v-for="alert in alerts" :key="alert.id" :data="alert" />
    </div>
</template>

<style lang="scss" scoped>
    .alerts {
        position: fixed;
        bottom: 20px;
        left: 20px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 360px;
        overflow: auto;
    }
</style>