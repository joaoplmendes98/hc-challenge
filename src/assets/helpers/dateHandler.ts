const convertDate = (value: string) => {
    const date = new Date(value)
	return date.toISOString().slice(0, 10)
}

const convertDateWithTime = (value: string) => {
    const date = new Date(value)

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return `${date.toISOString().slice(0, 10)} ${hours}:${minutes}:${seconds}`
}

export { convertDate, convertDateWithTime }