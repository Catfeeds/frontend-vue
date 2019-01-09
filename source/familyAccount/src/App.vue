<template>
	<div id="app">
		<familyAccount />
	</div>
</template>

<script>
	import familyAccount from './components/familyAccount.vue'

	export default {
		name: 'app',
		components: {
			familyAccount
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
	}
</style>
