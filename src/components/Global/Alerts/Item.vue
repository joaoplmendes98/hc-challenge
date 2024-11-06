<script lang="ts" setup>
defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="alert" :class="data.type">
        <div :class="['icon-wrapper', data.type]">
            <figure class="icon" :style="{'--icon': `url(/icons/${data.type}.svg)`}" />
        </div>
        <p>{{ data.message }}</p>
    </div>
</template>

<style lang="scss" scoped>
.alert {
    display: flex;
    align-items: center;
    background: $white;
    border: solid 1px $grey-200;
    height: 52px;
    padding-inline: 12px;
    border-radius: 6px;
    gap: 12px;
    position: relative;
    flex-shrink: 0;
    animation: lift 0.3s ease forwards;

    .icon-wrapper {
        border-radius: 50%;
        width: 20px;
        aspect-ratio: 1;
        @include flex-center;

        &.error {
            background: $red;
        }

        &.success {
            background: $green;
        }

        .icon {
            height: 12px;

            &::after {
                background: $white;
            }
        }
    }

    p {
        font-size: 12px;
    }
}
</style>