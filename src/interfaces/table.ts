interface ITableOptions {
    pagination?: boolean
    search?: boolean
    actions?: boolean
}

interface ITableHead {
    label: string
    tag?: string
    sortable?: boolean
    filters?: string[]
}

interface ITableBody {
    id?: number
    template: string
    data: any
}

interface IPagination {
    currentPage: number
    itemsPerPage: number
    totalPages: number
    totalItems: number
}

export type {
    ITableOptions,
    ITableHead,
    ITableBody,
    IPagination
}