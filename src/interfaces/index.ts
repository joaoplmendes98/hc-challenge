import type { IUser } from './users'
import type { ITableOptions, ITableHead, ITableBody } from './table'

interface IGenericObject {
    [key: string]: any
}

export type {
    IGenericObject,
    ITableOptions,
    ITableHead,
    ITableBody,
    IUser
}