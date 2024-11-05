<script lang="ts" setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['new-query'])

const queryString = ref<string>('')
const timeout = ref<ReturnType<typeof setTimeout>>(0)

watch(() => queryString.value, (value) => {
    clearTimeout(timeout.value)

    if (!value) {
        emit('new-query', value)
        return
    }
    
    timeout.value = setTimeout(() => {
        emit('new-query', value)
    }, 500)
})
</script>

<template>
    <div class="query">
        <figure class="icon" :style="{'--icon': 'url(/icons/search.svg)'}" />
        <input v-model="queryString" type="text" name="table-query" placeholder="Query..." >
    </div>
</template>

<style lang="scss" scoped>
.query {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    background: $white;
    width: fit-content;
    gap: 8px;
    border-radius: 4px;
}
</style>