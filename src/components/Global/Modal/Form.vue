<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useModal } from '@/stores/modal'
import GlobalForm from '@/components/Global/Form/Index.vue'

const { modalData } = storeToRefs(useModal())

const handleFormSubmition = async (data: any) => {
    const submition = await modalData.value.onSubmit(data)

    if (submition) {
        closeModal()
    }
}

const closeModal = () => {
    useModal().closeModal()
}
</script>

<template>
    <section>
        <header>
            <h2 class="md-title">{{modalData.title}}</h2>
            <button type="button" class="close" @click="closeModal" />
        </header>
        <div class="content">
            <GlobalForm :data="modalData.form" id="modal-form" @form-submit="handleFormSubmition" />
        </div>
        <footer>
            <button type="submit" form="modal-form">
                {{modalData.buttonText}}
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
            justify-content: space-between;

            .close {
                background: none;
                border: none;
                cursor: pointer;
                height: 32px;
                aspect-ratio: 1;
                border-radius: 50%;
                @include flex-center;
                background: $grey-200;
                position: relative;

                &::before, &::after {
                    content: '';
                    position: absolute;
                    background: $black;
                    height: 1px;
                    width: 10px;
                }

                &::before {
                    transform: rotate(55deg);
                }

                &::after {
                    transform: rotate(-55deg);
                }
            }
        }

        footer {
            border-top: solid 1px $grey-100;
            width: 100%;
            display: flex;
            justify-content: flex-end;

            button {
                padding: 10px 20px;
                border: none;
                background: $black;
                color: $white;
                border-radius: 6px;
                cursor: pointer;
                text-transform: capitalize
            }
        }

        .content {
            height: calc(100% - 120px);
            padding: 20px;
        }
    }
</style>