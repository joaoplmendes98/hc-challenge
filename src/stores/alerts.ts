import { defineStore } from 'pinia'

interface AlertsStoreState {
	alerts: { id: number, type: string, message: string, dismiss: Function }[]
    id: number
}

export const useAlerts = defineStore('alerts', {
	state: (): AlertsStoreState => ({
		alerts: [],
        id: 1
	}),

	actions: {
        addAlert(type: string, message: string) {
            const id = this.id

            this.alerts.push({
                id,
                type,
                message,
                dismiss: () => this.removeAlert(id)
            })

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