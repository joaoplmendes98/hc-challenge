<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsers } from '@/stores/users'
import type { IUser, ITableBody, ITableHead, ITableOptions } from '@/interfaces'
import { convertDateWithTime } from '@/assets/helpers/dateHandler'
import TableComponent from '@/components/Global/Table/Index.vue'
import BreadcrumbsComponent from '@/components/Global/Breadcrumbs.vue'

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

// Handle actions
const handleAction = ([id, action]: [number, string]) => {
	console.log(id);
	
	switch (action) {
		case 'orders':
			break;
		case 'edit':
			break;
		case 'delete':
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