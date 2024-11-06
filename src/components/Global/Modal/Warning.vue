<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useModal } from '@/stores/modal'

const { modalData } = storeToRefs(useModal())

const handleFormSubmition = async (data: any) => {
    const submition = await modalData.value.onSubmit(data)

    if (submition) {
        useModal().closeModal()
    }
}
</script>

<template>
    <section>
        <header>
            <h2 class="md-title">{{modalData.title}}</h2>
        </header>
        <div class="content">
           <p v-html="modalData.message" />
        </div>
        <footer>
            <button
                type="button"
                v-for="(action, i) in modalData.actions"
                :key="i"
                :class="{back: action.back}"
                @click="action.action"
            >
                {{action.label}}
            </button>
        </footer>
    </section>
</template>

<style lang="scss" scoped>
    section {
        height: fit-content;
        max-height: 100%;
        width: min(100%, 500px);
        background: $white;
        border-radius: 6px;

        header, footer {
            height: 60px;
            padding-inline: 20px;
            display: flex;
            align-items: center;
        }

        header {
            border-bottom: solid 1px $grey-100;
        }

        footer {
            border-top: solid 1px $grey-100;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            gap: 8px;

            button {
                padding: 10px 20px;
                border: none;
                background: $black;
                color: $white;
                border-radius: 6px;
                cursor: pointer;
                text-transform: capitalize;
                transition: 0.2s;

                &.back {
                    background: $grey-100;
                    color: $black;

                    &:hover {
                        background: $grey-200;
                    }
                }
            }
        }

        .content {
            height: calc(100% - 120px);
            padding: 20px;
            font-size: 14px;
        }
    }
</style>