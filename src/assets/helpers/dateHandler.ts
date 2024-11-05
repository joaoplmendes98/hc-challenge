const convertDate = (value: string) => {
    const date = new Date(value)
	return date.toISOString().slice(0, 10)
}

const convertDateWithTime = (value: string) => {
    const date = new Date(value)

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    return `${date.toISOString().slice(0, 10)} ${hours}:${minutes}:${seconds}`
}

export { convertDate, convertDateWithTime }