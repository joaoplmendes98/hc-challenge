import { defineStore } from 'pinia'

interface AlertsStoreState {
	alerts: { id: number, type: string, message: string }[]
    id: number
}

export const useAlerts = defineStore('alerts', {
	state: (): AlertsStoreState => ({
		alerts: [],
        id: 1
	}),

	actions: {
        addAlert([type, message]: [string, string]) {
            const id = this.id

            this.alerts.push({ id, type, message })

            this.id++

            setTimeout(() => {
                this.removeAlert(id)
            }, 3000)
        },

        removeAlert(id: number) {
            this.alerts = this.alerts.filter(alert => alert.id !== id)
        }
    },
})