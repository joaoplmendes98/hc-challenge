<script lang="ts" setup>
import type { PropType } from 'vue'

interface BreadCrumb {
    text: string;
    to: string | null;
    active?: boolean;
}

defineProps({
    data: {
        type: Array as PropType<BreadCrumb[]>,
        required: true
    }
})
</script>

<template>
    <div class="breadcrumbs">
        <div class="breadcrumb__item" v-for="(item, i) in data" :key="item.text">
            <router-link :to="item.to || ''" :disabled="!item.to" :class="{active: item.active}">
                {{ item.text }}
            </router-link>
            <span v-if="data[i + 1]">/</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.breadcrumbs {
    display: flex;
    align-items: center;
    gap: 4px;

    .breadcrumb__item {
        display: flex;
        align-items: center;
        gap: 4px;
        width: fit-content;

        a {
            text-decoration: none;
            color: $black;
            font-size: 12px;

            &.active {
                color: $blue;
            }
        }
    }
}
</style>