<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalHeader from './components/Global/Header.vue'
import GlobalModal from './components/Global/Modal/Index.vue'
import { useModal } from './stores/modal'
import { storeToRefs } from 'pinia'

const { showModal } = storeToRefs(useModal())

</script>

<template>
	<div class="encapsulator">
		<GlobalHeader />
		<GlobalModal v-if="showModal" />
		<main class="page">
			<RouterView />
		</main>
	</div>
</template>

<style lang="scss" scoped>
	.encapsulator {
		display: flex;
		flex-direction: column;

		main.page {
			padding: 20px;
			width: min(100%, 1600px);
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
	}
</style>