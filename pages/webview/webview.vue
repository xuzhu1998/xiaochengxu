<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(options) {
			console.log(options,'webview参数')
			this.url=options.url
		},
		methods: {

		}
	}
</script>

<style>

</style>
