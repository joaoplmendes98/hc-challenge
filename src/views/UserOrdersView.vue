<script setup lang="ts">
import { computed, ref, type ComputedRef } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrders } from '@/stores/orders'
import { useUsers } from '@/stores/users'
import { useModal } from '@/stores/modal'
import type {IOrder, IUser, ITableBody, ITableHead, ITableOptions, IGenericObject, IFormField } from '@/interfaces'
import { convertDateWithTime } from '@/assets/helpers/dateHandler'
import TableComponent from '@/components/Global/Table/Index.vue'
import BreadcrumbsComponent from '@/components/Global/Breadcrumbs.vue'
import form from '@/assets/json/orders/form.json'
import { useRoute } from 'vue-router'

const route = useRoute()

const userId = route.params.id as string
const user = ref<IUser | null>(null)

const fetchAsyncUser = async () => {
  user.value = await useUsers().fetchUserDetails(+userId)
}

// Page BreadCrumbs
const breadcrumbs = computed(() => ([
  {
    text: 'Home',
    to: null
  },
  {
    text: 'Users',
    to: '/',
  },
  {
    text: user.value?.full_name || 'Loading',
    to: null
  },
  {
    text: 'Orders',
    to: null,
    active: true
  }
]))

// Fetch data on component load
useOrders().fetchData(+userId)
fetchAsyncUser()

const { data, paginationData, uniqueProducts, sort, filters } = storeToRefs(useOrders())

const tableOptions: ITableOptions = {
	pagination: true,
	search: true,
	actions: true
}

const tableHead: ComputedRef<ITableHead[]> = computed(() => ([
	{
		label: 'Product',
		tag: 'product',
		sortable: true,
		filters: uniqueProducts.value
	},
	{
		label: 'Ordered by',
		sortable: false
	},
	{
		label: 'Ordered at',
		tag: 'orderDate',
		sortable: true
	},
	{
		label: 'Last Update',
		tag: 'updatedDate',
		sortable: true
	}
]))

const tableBodyItems = computed(() => data.value.map((entry: IOrder): ITableBody[] => ([
	{
		id: entry.id,
		template: 'text',
		data: entry.product
	},
	{
		template: 'text',
		data: user.value?.full_name || 'Loading'
	},
	{
		template: 'text',
		data: convertDateWithTime(entry.orderDate)
	},
	{
		template: 'text',
		data: convertDateWithTime(entry.updatedAt)
	},
	{
		template: 'actions',
		data: ['edit', 'delete']
	}
])))

// Forms
const createForm = {
	title: 'New Order',
	form,
	buttonText: 'submit',
	onSubmit: (params: IGenericObject) => useOrders().createEntry(params, userId)
}

const setUpdateForm = (id: number) => {
	const entry = data.value.find((entry: IOrder) => entry.id === id)

	const updateForm = {
		title: 'Update User',
		form: form.map((field: IFormField) => {
			return {
				...field,
				required: false,
				value: entry![field.tag as keyof IOrder]
			}
		}),
		buttonText: 'update',
		onSubmit: (params: IGenericObject) => useOrders().updateEntry(id, params)
	}

	useModal().initModal('form', updateForm)
}

const setDeleteWarning = (id: number) => {
	const entry = data.value.find((entry: IOrder) => entry.id === id)

	const warningData = {
		title: 'Delete Order',
		message: `You're about to delete the order for <b>${entry!.product}</b>.<br>Are you sure you want to proceed?`,
		actions: [
			{
				back: true,
				label: 'Cancel',
				action: () => useModal().closeModal()
			},
			{
				label: 'Delete',
				action: () => {
					useOrders().deleteEntry(id)
					useModal().closeModal()
				}
			}
		]
	}

	useModal().initModal('warning', warningData)
}

// Handle actions
const handleAction = ([id, action]: [number, string]) => {
	switch (action) {
		case 'create':
			useModal().initModal('form', createForm)
			break;
		case 'edit':
			setUpdateForm(id)
			break;
		case 'delete':
			setDeleteWarning(id)
			break;
	}
}

const handleQuery = (query: string) => {
	useOrders().setQuery(query)
}

const handleSort = (tag: string) => {
	useOrders().setSort(tag)
}

const handlePagination = (direction: number) => {
	useOrders().setPage(direction)
}

const handleFilter = ([tag, filter]: [string, string]) => {
	useOrders().setFilter(tag, filter)
}
</script>

<template>
	<div class="page-head">
		<h1 class="lg-title">
			User Orders
		</h1>
		<BreadcrumbsComponent :data="breadcrumbs" />
	</div>
    <TableComponent
		:options="tableOptions"
		:head="tableHead"
		:body="tableBodyItems"
		:pagination="paginationData"
		:sort-data="sort"
		:filters-data="filters"
		@new-action="handleAction"
		@new-query="handleQuery"
		@new-sort="handleSort"
		@new-page="handlePagination"
		@new-filter="handleFilter"
	/>
</template>

<style lang="scss" scoped>
.page-head {
	display: flex;
	flex-direction: column;
}
</style>