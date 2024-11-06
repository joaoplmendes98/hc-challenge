<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['new-value'])

const value = ref(props.item.value || '')

watch(() => value.value, () => {
    emit('new-value', [props.item.tag, value.value])
})

// Toggle password visibility
const togglePassword = ref(false)

const handleTogglePassword = () => {
    if (props.item.type !== 'password') return

    togglePassword.value = !togglePassword.value
}

const type = computed(() => {
    if (props.item.type === 'password' && togglePassword.value) {
        return 'text'
    }

    return props.item.type
})
</script>

<template>
    <div class="form-item">
        <label for="input">{{item.label}} {{ item.required ? '*' : '' }}</label>
        <input :type="type" v-model="value" :required="item.required" />
        <figure v-if="item.type === 'password'" class="icon" :style="{'--icon': 'url(/icons/eye.svg)'}" @click="handleTogglePassword" />
    </div>
</template>

<style lang="scss" scoped>
.form-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;

    label {
        font-size: 12px;
    }

    input {
        padding: 10px;
        border: solid 1px $grey-300;
        border-radius: 6px;
    }

    figure {
        position: absolute;
        right: 10px;
        bottom: 10px;
        cursor: pointer;
    }
}
</style>