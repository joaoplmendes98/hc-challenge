const convertDate = (value: string) => {
    const date = new Date(value)
	return date.toISOString().slice(0, 10)
}

const convertDateWithTime = (value: string) => {
    const date = new Date(value)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    if (diff < 24 * 60 * 60 * 1000) {
        const diffSeconds = Math.floor(diff / 1000)
        const diffMinutes = Math.floor(diff / (1000 * 60))
        const diffHours = Math.floor(diff / (1000 * 60 * 60))

        if (diffSeconds < 60) {
            return `${diffSeconds} second${diffSeconds !== 1 ? 's' : ''} ago`
        } else if (diffMinutes < 60) {
            return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`
        } else {
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
        }
    }

    return `${date.toISOString().slice(0, 10)} ${hours}:${minutes}:${seconds}`
}

export { convertDate, convertDateWithTime }