<script lang="ts" setup>
import { type PropType, computed, ref } from 'vue'
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
    },
    filtersData: {
        type: Array,
        default: () => ([])
    }
})

const emit = defineEmits(['sort', 'filter'])

// Hanlde Sorting
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

// Handle Filtering
const showFiltersTab = ref(false)

const handleCloseDropdown = () => {
    if (!showFiltersTab.value) return
    
    showFiltersTab.value = false
}

const toggleFilter = (filter: string) => {
    emit('filter', [props.data.tag, filter])
}
</script>

<template>
    <div class="column" :style="{width: `${columnSize}%`}">
        <p>{{ data.label }}</p>
        <div v-if="data.sortable" @click="handleSort" :class="['sort', sortingClass]">
            <figure class="icon" :style="{'--icon': 'url(/icons/triangle.svg)'}" />
            <figure class="icon invert" :style="{'--icon': 'url(/icons/triangle.svg)'}" />
        </div>
        <div v-if="data.filters" class="filter" :class="{active: showFiltersTab || filtersData.length}" v-click-outside="handleCloseDropdown">
            <figure class="icon" :style="{'--icon': 'url(/icons/filter.svg)'}" @click="showFiltersTab = !showFiltersTab" />
            <div v-show="showFiltersTab" class="available-filters">
                <h6>Filters</h6>
                <ul>
                    <li
                        v-for="filter in data.filters"
                        :key="filter" @click="toggleFilter(filter)"
                        :class="{active: filtersData.includes(filter)}"
                    >
                        <p>{{ filter }}</p>
                        <span />
                    </li>
                </ul>
            </div>
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

    .filter {
        cursor: pointer;
        position: relative;

        &.active {
            .icon {
                &::after {
                    background: rgba($black, 0.6);
                }
            }
        }

        .icon {
            height: 10px;

            &::after {
                background: rgba($black, 0.2);
            }
        }

        .available-filters {
            position: absolute;
            background: $grey-100;
            border-radius: 4px;
            top: 16px;
            box-shadow: 0px 0px 1px rgba($black, 0.1);
            user-select: none;

            h6 {
                padding-inline: 4px;
                font-size: 10px;
                height: 28px;
                font-weight: 500;
                display: flex;
                align-items: center;
                border-bottom: solid 1px $grey-200;
            }

            ul {
                list-style-type: none;
                max-height: 200px;
                overflow: auto;

                li {
                    padding-inline: 4px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 120px;
                    transition: 0.2s;

                    &:hover {
                        background: $grey-200;
                    }

                    &.active {
                        span {
                            background: rgba($green, 0.4);
                        }
                    }

                    p {
                        font-size: 10px;
                        font-weight: 400;
                        width: 80%;
                    }

                    span {
                        height: 12px;
                        aspect-ratio: 1;
                        border-radius: 2px;
                        border: solid 1px rgba($black, 0.2);
                    }
                }
            }
        }
    }
}
</style>