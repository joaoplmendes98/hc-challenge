<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
    data: Array,
    default: () => []
})

const icons = {}
</script>

<template>
    <p>actions</p>
</template>