import { defineStore } from 'pinia'
import type { IUser } from '@/interfaces'
import api from  '@/assets/helpers/api'

interface UsersStoreState {
	entries: IUser[],
    isDataLoaded: boolean,
    currentPage: number
}

export const useUsers = defineStore('users', {
	state: (): UsersStoreState => ({
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
        data(): IUser[] {
            return this.entries.slice((this.currentPage - 1) * 10, this.currentPage * 10)
        }
    },

	actions: {
        async fetchData() {
            const response = await api.get('users')

            if (response.status !== 200) {
                return
            }
            
			this.entries = response.data
        }
    },
})