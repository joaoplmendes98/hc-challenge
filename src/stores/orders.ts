import { defineStore } from 'pinia'
import type { IOrder, IPagination, IGenericObject } from '@/interfaces'
import api from  '@/assets/helpers/api'

interface OrdersStoreState {
	entries: IOrder[],
    query: string,
    isDataLoaded: boolean,
    currentPage: number,
    itemsPerPage: number,
    sort: [string | null, number]
}

export const useOrders = defineStore('orders', {
	state: (): OrdersStoreState => ({
		entries: [],
        query: '',
		isDataLoaded: false,
        currentPage: 1,
        itemsPerPage: 10,
        sort: [null, 0]
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

        uniqueProducts(): string[] {
            return [...new Set(this.entries.map(entry => entry.product))]
        },

        // Return entries paginated and queried
        data(): IOrder[] {
            const query = this.query.toLowerCase()
            const sortedQueries = [...this.entries].sort((a, b) => {
                const [tag, direction] = this.sort

                if (!tag) {
                    return 0
                }

                if (direction === 1) {
                    return a[tag as keyof IOrder]! > b[tag as keyof IOrder]! ? 1 : -1
                }

                return a[tag as keyof IOrder]! < b[tag as keyof IOrder]! ? 1 : -1
            })
            const queriedEntries = sortedQueries.filter(entry => {
                return entry.product!.toLowerCase().includes(query)
            })

            return queriedEntries.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
        }
    },

	actions: {
        async fetchData(id: number) {
            const response = await api.get(`orders/${id}`)

            if (response.status !== 200) {
                return
            }

            // Convert all snake_case keys to camelCase
            const data = response.data.map((entry: IGenericObject) => {
                const camelCaseEntry: IGenericObject = {}
                for (const key in entry) {
                    camelCaseEntry[key.replace(/_(\w)/g, (match, p1) => p1.toUpperCase())] = entry[key]
                }
                return camelCaseEntry
            })
            
			this.entries = data as IOrder[]
        },

        setQuery(query: string) {
            this.query = query
        },

        setSort(tag: string) {
            const [currentTag, currentDirection] = this.sort

            if (currentTag !== tag) {
                this.sort = [tag, 1]
                return
            }

            if (currentDirection === 2) {
                this.sort = [null, 0]
                return
            }

            this.sort = [tag, currentDirection + 1]
        },

        setPage(direction: number) {
            this.currentPage += direction
        },

        async createEntry(data: IGenericObject, userId: string): Promise<boolean> {
            const dataToSend = {
                ...data,
                user: userId,
                orderDate: new Date()
            }

            const response = await api.post('orders', dataToSend)

            if (response.status !== 200) {
                return false
            }

            this.entries.unshift(response.data)
            return true
        },

        async updateEntry(id: number, data: IGenericObject): Promise<boolean> {
            const response = await api.put(`order/${id}/edit`, data)

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

        async deleteEntry(id: number): Promise<boolean> {
            const response = await api.delete(`orders/${id}`)

            if (response.status !== 200) {
                return false
            }

            this.entries = this.entries.filter(entry => entry.id !== id)
            return true
        }
    },
})