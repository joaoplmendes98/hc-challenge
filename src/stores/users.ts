import { defineStore } from 'pinia'
import type { IUser, IPagination, IGenericObject } from '@/interfaces'
import api from  '@/assets/helpers/api'

interface UsersStoreState {
	entries: IUser[],
    query: string,
    isDataLoaded: boolean,
    currentPage: number,
    itemsPerPage: number
}

export const useUsers = defineStore('users', {
	state: (): UsersStoreState => ({
		entries: [],
        query: '',
		isDataLoaded: false,
        currentPage: 1,
        itemsPerPage: 10
	}),

    getters: {
        totalPages(): number {
            return Math.ceil(this.entries.length / this.itemsPerPage)
        },

        totalItems(): number {
            return this.entries.length
        },

        paginationData(): IPagination {
            return {
                currentPage: this.currentPage,
                itemsPerPage: this.itemsPerPage,
                totalPages: this.totalPages,
                totalItems: this.totalItems
            }
        },

        // Return entries paginated and queried
        data(): IUser[] {
            const query = this.query.toLowerCase()
            const queriedEntries = this.entries.filter(entry => {
                return entry.fullName.toLowerCase().includes(query) || entry.email.toLowerCase().includes(query)
            }) 

            return queriedEntries.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
        }
    },

	actions: {
        async fetchData() {
            const response = await api.get('users')

            if (response.status !== 200) {
                return
            }
            
			this.entries = response.data
        },

        setQuery(query: string) {
            this.query = query
        },

        async createEntry(data: IGenericObject): Promise<boolean> {
            const response = await api.post('users', data)

            if (response.status !== 200) {
                return false
            }

            this.entries.unshift(response.data)
            return true
        },

        async updateEntry(id: number, data: IGenericObject): Promise<boolean> {
            const response = await api.put(`user/${id}/edit`, data)

            if (response.status !== 200) {
                return false
            }

            const index = this.entries.findIndex(entry => entry.id === id)
            this.entries[index] = {
                ...this.entries[index],
                ...response.data
            }
            return true
        },
    },
})