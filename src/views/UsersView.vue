<script setup lang="ts">
import { useUsers } from '@/stores/users'
import { storeToRefs } from 'pinia'

const { data } = storeToRefs(useUsers())

useUsers().fetchData()
</script>

<template>
  <main>
    {{ data }}
  </main>
</template>
