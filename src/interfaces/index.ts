import type { IUser } from './users'
import type { ITableOptions, ITableHead, ITableBody, IPagination } from './table'

interface IGenericObject {
    [key: string]: any
}

interface IFormField {
    tag: string
    label: string
    template: string
    type?: string
    required?: boolean
}

export type {
    IGenericObject,
    ITableOptions,
    ITableHead,
    ITableBody,
    IPagination,
    IUser,
    IFormField
}