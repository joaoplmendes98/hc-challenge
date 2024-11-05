import type { IUser } from './users'
import type { ITableOptions, ITableHead, ITableBody, IPagination } from './table'

interface IGenericObject {
    [key: string]: any
}

export type {
    IGenericObject,
    ITableOptions,
    ITableHead,
    ITableBody,
    IPagination,
    IUser
}