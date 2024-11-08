import { defineStore } from 'pinia'
import type { IOrder, IPagination, IGenericObject } from '@/interfaces'
import { useAlerts } from './alerts'
import api from  '@/assets/helpers/api'
import { convertToCamelCase } from '@/assets/helpers/globalHelper'

interface OrdersStoreState {
	entries: IOrder[],
    query: string,
    isDataLoaded: boolean,
    currentPage: number,
    itemsPerPage: number,
    sort: [string | null, number],
    filters: IGenericObject
}

export const useOrders = defineStore('orders', {
	state: (): OrdersStoreState => ({
		entries: [],
        query: '',
		isDataLoaded: false,
        currentPage: 1,
        itemsPerPage: 10,
        sort: [null, 0],
        filters: {}
	}),

    getters: {
        totalPages(): number {
            return Math.ceil(this.filteredEntries.length / this.itemsPerPage)
        },

        totalItems(): number {
            return this.filteredEntries.length
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

        filteredEntries(): IOrder[] {
            return this.entries.filter(entry => {
                for (const tag in this.filters) {
                    if (!this.filters[tag].includes(entry[tag as keyof IOrder]!)) {
                        return false
                    }
                }
                return true
            })
        },

        // Return entries paginated and queried
        data(): IOrder[] {
            const query = this.query.toLowerCase()

            const sortEntries = [...this.filteredEntries].sort((a, b) => {
                const [tag, direction] = this.sort
            
                if (!tag) {
                    return 0
                }

                if (direction === 1) {
                    return a[tag as keyof IOrder]! < b[tag as keyof IOrder]! ? 1 : -1
                }

                return a[tag as keyof IOrder]! > b[tag as keyof IOrder]! ? 1 : -1
            })

            const queryEntries = sortEntries.filter(entry => {
                return entry.product!.toLowerCase().includes(query)
            })

            return queryEntries.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
        }
    },

	actions: {
        async fetchData(id: number) {
            const response = await api.get(`orders/${id}`)
            
            if (response.status !== 200) {
                useAlerts().addAlert('error', response.data.message)
                return
            }
            
			this.entries = convertToCamelCase(response.data) as IOrder[]
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

        setFilter(tag: string, value: string) {
            if (!this.filters[tag]) {
                this.filters[tag] = [value]
                return
            }

            const index = this.filters[tag].indexOf(value)

            if (index === -1) {
                this.filters[tag].push(value)
                return
            }

            this.filters[tag].splice(index, 1)

            if (!this.filters[tag].length) {
                delete this.filters[tag]
            }
        },

        async createEntry(data: IGenericObject, userId: string): Promise<boolean> {
            const dataToSend = {
                ...data,
                user: userId,
                orderDate: new Date()
            }

            const response = await api.post('orders', dataToSend)

            if (response.status !== 200) {
                useAlerts().addAlert('error', response.data.message)
                return false
            }
            
            this.entries.push(response.data)
            useAlerts().addAlert('success', 'Order created successfully')
            return true
        },

        async updateEntry(id: number, data: IGenericObject): Promise<boolean> {
            const response = await api.put(`order/${id}/edit`, data)

            if (response.status !== 200) {
                useAlerts().addAlert('error', response.data.message)
                return false
            }

            const index = this.entries.findIndex(entry => entry.id === id)
            this.entries[index] = {
                ...this.entries[index],
                ...response.data
            }
            useAlerts().addAlert('success', 'Order edited successfully')
            return true
        },

        async deleteEntry(id: number): Promise<boolean> {
            const response = await api.delete(`orders/${id}`)

            if (response.status !== 200) {
                useAlerts().addAlert('error', response.data.message)
                return false
            }

            this.entries = this.entries.filter(entry => entry.id !== id)
            useAlerts().addAlert('success', 'Order deleted successfully')
            return true
        },

        clearData() {
            this.entries = []
            this.query = ''
            this.isDataLoaded = false
            this.currentPage = 1
            this.sort = [null, 0]
            this.filters = {}
        }
    },
})