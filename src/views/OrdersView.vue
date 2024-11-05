<script setup lang="ts">
import { ref } from 'vue'
const data = ref(null)

const fetchData = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/1`)
	const json = await response.json()

	data.value = json
}

fetchData()

</script>

<template>
  <main>
    {{ data }}
  </main>
</template>
