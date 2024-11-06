<script lang="ts" setup>
import { type PropType, computed } from 'vue'
import type { ITableHead } from '@/interfaces'

const props = defineProps({
    data: {
        type: Object as PropType<ITableHead>,
        required: true
    },
    columnSize: Number,
    sortData: {
        type: Array,
        default: () => ([null, 0])
    }
})

const emit = defineEmits(['sort'])

const handleSort = () => {
    emit('sort', props.data.tag)
}

const sortingEnum = {
    1: 'asc',
    2: 'desc'
}

const sortingClass = computed(() => {
    if (!props.sortData[0] || props.sortData[0] !== props.data.tag) {
        return
    }

    return sortingEnum[props.sortData[1] as keyof typeof sortingEnum]
})
</script>

<template>
    <div class="column" :style="{width: `${columnSize}%`}">
        <p>{{ data.label }}</p>
        <div :class="['sort', sortingClass]" v-if="data.sortable" @click="handleSort">
            <figure class="icon" :style="{'--icon': 'url(/icons/triangle.svg)'}" />
            <figure class="icon invert" :style="{'--icon': 'url(/icons/triangle.svg)'}" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.column {
    display: flex;
    align-items: center;
    padding-inline: 12px;
    gap: 8px;

    p {
        font-size: 12px;
        font-weight: 500;
    }

    .sort {
        display: flex;
        flex-direction: column;
        cursor: pointer;

        &.asc {
            .icon:last-of-type {
                &::after {
                    background: rgba($black, 0.4);
                }
            }
        }

        &.desc {
            .icon:first-of-type {
                &::after {
                    background: rgba($black, 0.4);
                }
            }
        }

        .icon {
            height: 6px;

            &.invert {
                transform: rotate(180deg);
            }

            &::after {
                background: rgba($black, 0.2);
            }
        }
    }
}
</style>