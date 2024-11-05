<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
    data: {
        type: String,
        required: true
    }
})
</script>

<template>
    <p>{{data}}</p>
</template>

<style lang="scss" scoped>
    p {
        font-size: 12px;
    }
</style>