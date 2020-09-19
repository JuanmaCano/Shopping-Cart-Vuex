<template>
	<div>
		<div>
			<h6>Editing product title ...</h6>
			<input v-model="title" class="input-group" type="text" placeholder="Seleccionar producto" />
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		// v-model on Vuex - warning, no manipulate the store without mutations
		selectedProduct() {
			return this.$store.getters.selectedProduct;
		},

		// solution for this problem
		// Two-way Computed Property
		title: {
			get() {
				return this.$store.getters.selectedProduct.title;
			},
			set(value) {
				return this.$store.commit('editProduct', {title: value});
			},
		},
	},
};
</script>
