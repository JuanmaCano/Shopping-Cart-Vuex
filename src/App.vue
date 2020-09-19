<template>
	<div id="app" class="container mt-5">
		<div class="row">
			<div class="col-12 col-md-6 border-right">
				<AppProductList />
			</div>
			<div class="col-12 col-md-6">
				<AppShoppingCart />
			</div>
		</div>
		<hr />
		<div class="row">
			<div class="col-12">
				<AppProductEdit />
			</div>
		</div>
	</div>
</template>

<script>
import AppProductList from './components/AppProductList.vue';
import AppShoppingCart from './components/AppShoppingCart.vue';
import AppProductEdit from './components/AppProductEdit.vue';

export default {
	name: 'App',
	components: {
		AppProductList,
		AppShoppingCart,
		AppProductEdit,
	},
};
</script>

<style></style>
