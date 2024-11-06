import type { IGenericObject } from "@/interfaces"

const convertToCamelCase = (data: any[]) => {
    return data.map((entry: IGenericObject) => {
        const camelCaseEntry: IGenericObject = {}
        for (const key in entry) {
            camelCaseEntry[key.replace(/_(\w)/g, (match, p1) => p1.toUpperCase())] = entry[key]
        }
        return camelCaseEntry
    })
}

export { convertToCamelCase}