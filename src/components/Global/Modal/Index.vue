<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useModal } from '@/stores/modal'
import { computed } from 'vue'
import FormModal from './Form.vue'
import WarningModal from './Warning.vue'

const { modalType } = storeToRefs(useModal())

const activeModal = computed(() => {
    switch (modalType.value) {
        case 'form':
            return FormModal
        case 'warning':
            return WarningModal
    }
})
</script>

<template>
    <div class="modal">
        <component :is="activeModal" />
    </div>
</template>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($black, 0.1);
    backdrop-filter: blur(2px);
    @include flex-center;
    z-index: 100;
    padding: 20px;
}
</style>