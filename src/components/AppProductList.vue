<template>
	<div>
		<h6>Listado de productos</h6>
		<hr />
		<div class="row justify-content-between px-2" v-for="product in productsOnStock" :key="product.id">
			<span>
				<i @click="setSelectedProduct(product)" class="fas fa-edit mr-2 text-secondary pointer"></i>
				{{ product.title }}
			</span>
			<span>{{ product.price }}€</span>
			<span>{{ product.inventory }}</span>
			<span @click="addToCart(product)" class="text-success pointer">
				<i class="fas fa-shopping-cart"></i>
			</span>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
	name: 'AppProductList',
	async created() {
		try {
			await this.getProducts();
		} catch (error) {
			console.log(error);
		}
	},
	methods: {
		...mapActions(['addToCart', 'getProducts']),
		...mapMutations(['setSelectedProduct']),
	},

	computed: {
		...mapGetters(['productsOnStock']),
	},
};
</script>

<style>
.pointer {
	cursor: pointer;
}
</style>
