<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsers } from '@/stores/users'
import type { IUser, ITableBody, ITableHead, ITableOptions } from '@/interfaces'
import { convertDateWithTime } from '@/assets/helpers/dateHandler'
import TableComponent from '@/components/Global/Table/Index.vue'

const { data } = storeToRefs(useUsers())

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


// Fetch data on component load
useUsers().fetchData()
</script>

<template>
  <main>
    <TableComponent
		:options="tableOptions"
		:head="tableHead"
		:body="tableBodyItems"
	/>
  </main>
</template>
