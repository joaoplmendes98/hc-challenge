<script lang="ts" setup>
defineProps({
    item: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="form-item">
        <label for="input">{{item.label}}</label>
        <input type="text" />
    </div>
</template>