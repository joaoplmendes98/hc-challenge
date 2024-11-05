<script lang="ts" setup>

const emit = defineEmits(['new-action'])

const handleClick = () => {
    emit('new-action', 'create')
}
</script>

<template>
    <button type="button" class="create" @click.prevent="handleClick">
        <p>Create New</p>
    </button>
</template>

<style lang="scss" scoped>
.create {
    display: flex;
    align-items: center;
    gap: 8px;
    background: $black;
    border-radius: 6px;
    height: 28px;
    padding-inline: 12px;
    cursor: pointer;

    p {
        color: $white;
        font-size: 12px;
    }
}
</style>