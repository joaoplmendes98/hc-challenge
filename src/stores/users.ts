import { defineStore } from 'pinia'
import type { IUser, IPagination, IGenericObject } from '@/interfaces'
import { useAlerts } from './alerts'
import api from  '@/assets/helpers/api'
import { convertToCamelCase } from '@/assets/helpers/globalHelper'

interface UsersStoreState {
	entries: IUser[],
    query: string,
    isDataLoaded: boolean,
    currentPage: number,
    itemsPerPage: number,
    sort: [string | null, number]
}

export const useUsers = defineStore('users', {
	state: (): UsersStoreState => ({
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

        // Return entries paginated and queried
        data(): IUser[] {
            const query = this.query.toLowerCase()
            const sortedQueries = [...this.entries].sort((a, b) => {
                const [tag, direction] = this.sort

                if (!tag) {
                    return 0
                }

                if (direction === 1) {
                    return a[tag as keyof IUser]! > b[tag as keyof IUser]! ? 1 : -1
                }

                return a[tag as keyof IUser]! < b[tag as keyof IUser]! ? 1 : -1
            })
            const queriedEntries = sortedQueries.filter(entry => {
                return entry.fullName!.toLowerCase().includes(query) || entry.email.toLowerCase().includes(query)
            }) 

            return queriedEntries.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
        }
    },

	actions: {
        async fetchData() {
            const response = await api.get('users')

            if (response.status !== 200) {
                useAlerts().addAlert('error', response.data.message)
                return
            }
            
			this.entries = response.data
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

        async createEntry(data: IGenericObject): Promise<boolean> {
            const response = await api.post('users', data)

            if (response.status !== 200) {
                useAlerts().addAlert('error', response.data.message)
                return false
            }

            this.entries.unshift(response.data)

            useAlerts().addAlert('success', 'User created successfully')
            return true
        },

        async updateEntry(id: number, data: IGenericObject): Promise<boolean> {
            const response = await api.put(`user/${id}/edit`, data)

            if (response.status !== 200) {
                useAlerts().addAlert('error', response.data.message)
                return false
            }

            const index = this.entries.findIndex(entry => entry.id === id)
            this.entries[index] = {
                ...this.entries[index],
                ...response.data
            }

            useAlerts().addAlert('success', 'User edited successfully')
            return true
        },

        async deleteEntry(id: number): Promise<boolean> {
            const response = await api.delete(`users/${id}`)

            if (response.status !== 204) {
                useAlerts().addAlert('error', response.data.message)
                return false
            }

            this.entries = this.entries.filter(entry => entry.id !== id)

            useAlerts().addAlert('success', 'User deleted successfully')
            return true
        },

        async fetchUserDetails(id: number): Promise<IUser | null> {
            const response = await api.get(`user/${id}`)

            if (response.status !== 200) {
                return null
            }
            

            const userData = convertToCamelCase([response.data])[0]
            return userData as IUser
        },

        clearData() {
            this.entries = []
            this.query = ''
            this.isDataLoaded = false
            this.currentPage = 1
            this.itemsPerPage = 10
            this.sort = [null, 0]
        }
    },
})