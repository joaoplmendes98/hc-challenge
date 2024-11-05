interface ITableOptions {
    pagination?: boolean
    search?: boolean
    actions?: boolean
}

interface ITableHead {
    label: string
    sortable?: boolean
}

interface ITableBody {
    id?: number
    template: string
    data: any
}

export type {
    ITableOptions,
    ITableHead,
    ITableBody
}