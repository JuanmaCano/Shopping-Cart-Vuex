<template>
	<div class="text-right">
		<h6>Carrito</h6>
		<hr />
		<div v-for="(item, $index) in cartItems" :key="item.id">
			{{ item.title }} ({{ item.quantity }})
			<span @click="removeItem($index)" class="ml-2 pointer"><i class="fas fa-trash-alt text-danger"></i></span>
			<hr />
		</div>
		<button class="my-3 btn btn-success" v-if="cartItems.length" @click="checkOut">CheckOut</button>
		<h5>Total {{ cartTotal || 0 }}</h5>
		<div v-if="$store.state.checkOutError" class="alert alert-danger text-center" role="alert">
			Error procesando los artículos
		</div>
	</div>
</template>

<script>
import {currency} from '@/utils/currency.js';
export default {
	name: 'AppShoppingCart',
	methods: {
		removeItem(index) {
			this.$store.dispatch('removeItemFromCart', index);
		},
		checkOut() {
			this.$store.dispatch('checkOut');
		},
	},
	computed: {
		cartItems() {
			return this.$store.getters.productsOnCart;
		},
		cartTotal() {
			return currency(this.$store.getters.cartTotal, ' €');
		},
	},
};
</script>

<style scoped>
ul {
	text-align: left;
}
</style>
