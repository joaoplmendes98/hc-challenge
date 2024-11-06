import { defineStore } from 'pinia'

interface ModalStoreState {
	showModal: boolean
    modalType: string | null
    modalData: any
    hasActionRunning: boolean
}

export const useModal = defineStore('modal', {
	state: (): ModalStoreState => ({
        showModal: false,
        modalType: null,
        modalData: null,
        hasActionRunning: false
	}),

	actions: {
        initModal(type: string, data: any) {
            this.showModal = true
            this.modalType = type
            this.modalData = data
        },

        closeModal() {
            this.showModal = false
            this.modalType = null
            this.modalData = null
        }
    },
})