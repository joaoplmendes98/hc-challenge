<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalHeader from './components/Global/Header.vue'
</script>

<template>
	<div class="encapsulator">
		<GlobalHeader />
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
			padding-inline: 20px;
			width: min(100%, 1600px);
			margin: 0 auto;
		}
	}
</style>