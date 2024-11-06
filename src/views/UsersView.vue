<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsers } from '@/stores/users'
import { useModal } from '@/stores/modal'
import type { IUser, ITableBody, ITableHead, ITableOptions, IGenericObject, IFormField } from '@/interfaces'
import { convertDateWithTime } from '@/assets/helpers/dateHandler'
import TableComponent from '@/components/Global/Table/Index.vue'
import BreadcrumbsComponent from '@/components/Global/Breadcrumbs.vue'
import form from '@/assets/json/users/form.json'
import { useRouter } from 'vue-router'

const router = useRouter()

// Page BreadCrumbs
const breadcrumbs = [
  {
	text: 'Home',
	to: null
  },
  {
	text: 'Users',
	to: null,
	active: true
  }
]

// Fetch data on component load
useUsers().fetchData()

const { data, paginationData } = storeToRefs(useUsers())

const tableOptions: ITableOptions = {
  pagination: true,
  search: true,
  actions: true
}

const tableHead: ITableHead[] = [
  {
	label: 'Full Name',
	sortable: true
  },
  {
	label: 'Email',
	sortable: true
  },
  {
	label: 'Last Updated',
	sortable: true
  }
]

const tableBodyItems = computed(() => data.value.map((user: IUser): ITableBody[] => ([
	{
		id: user.id,
		template: 'text',
		data: user.fullName
	},
	{
		template: 'text',
		data: user.email
	},
	{
		template: 'text',
		data: convertDateWithTime(user.updatedAt)
	},
	{
		template: 'actions',
		data: ['orders', 'edit', 'delete']
	}
])))

// Forms
const createForm = {
	title: 'Create User',
	form,
	buttonText: 'submit',
	onSubmit: (params: IGenericObject) => useUsers().createEntry(params)
}

const setUpdateForm = (id: number) => {
	const entry = data.value.find((user: IUser) => user.id === id)

	const updateForm = {
		title: 'Update User',
		form: form.map((field: IFormField) => {
			return {
				...field,
				required: false,
				value: entry![field.tag as keyof IUser]
			}
		}),
		buttonText: 'update',
		onSubmit: (params: IGenericObject) => useUsers().updateEntry(id, params)
	}

	useModal().initModal('form', updateForm)
}

const setDeleteWarning = (id: number) => {
	const entry = data.value.find((user: IUser) => user.id === id)

	const warningData = {
		title: 'Delete User',
		message: `You're about to delete <b>${entry!.fullName}</b>.<br>Are you sure?`,
		actions: [
			{
				back: true,
				label: 'Cancel',
				action: () => useModal().closeModal()
			},
			{
				label: 'Delete',
				action: () => {
					useUsers().deleteEntry(id)
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
		case 'orders':
				router.push(`/user/${id}/orders`)
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
	useUsers().setQuery(query)
}
</script>

<template>
	<div class="page-head">
		<h1 class="lg-title">
			Users
		</h1>
		<BreadcrumbsComponent :data="breadcrumbs" />
	</div>
    <TableComponent
		:options="tableOptions"
		:head="tableHead"
		:body="tableBodyItems"
		:pagination="paginationData"
		@new-action="handleAction"
		@new-query="handleQuery"
	/>
</template>

<style lang="scss" scoped>
.page-head {
	display: flex;
	flex-direction: column;
}
</style>