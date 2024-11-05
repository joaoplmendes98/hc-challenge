import { defineStore } from 'pinia'
import api from  '@/assets/helpers/api'

interface OrdersStoreState {
	entries: any[],
    isDataLoaded: boolean,
    currentPage: number
}

export const useOrders = defineStore('orders', {
	state: (): OrdersStoreState => ({
		entries: [],
		isDataLoaded: false,
        currentPage: 1
	}),

    getters: {
        // Return the total number of pages
        totalPages(): number {
            return Math.ceil(this.entries.length / 10)
        },

        // Return entries paginated by 10 per page
        data(): any[] {
            return this.entries.slice((this.currentPage - 1) * 10, this.currentPage * 10)
        }
    },

	actions: {
        async fetchData(id: number) {
            const response = await api.get(`orders/${id}`)

            if (response.status !== 200) {
                return
            }
            
			this.entries = response.data
        }
    },
})