import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/shop.js';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {
		products: [],
		cart: [],
		checkOutError: false,
		selectedProduct: {},
	},
	// forma de manipular la data de la store, no manipular la data desde componentes
	// las mutaciones son las únicas que pueden hablar con el state, de cambiarlo
	// desde los componentes, se llama a las actions para guardar en el state
	// desde los componentes, se llama a los getters para consultar el state
	mutations: {
		setProducts(state, products) {
			state.products = products;
		},
		incrementProductQty(state, item) {
			item.quantity++;
		},
		addProductToCart(state, product) {
			state.cart.push({
				id: product.id,
				quantity: 1,
			});
		},
		decrementProductQty(state, product) {
			product.inventory--;
		},
		removeProductFromCart(state, index) {
			state.cart.splice(index, 1);
		},
		incrementProductInventory(state, item) {
			const product = state.products.find((product) => product.id === item.id);
			product.inventory += item.quantity;
		},
		emptyCart(state) {
			state.cart = [];
		},
		setCheckOutError(state, error) {
			state.checkOutError = error;
		},
		setSelectedProduct(state, product) {
			state.selectedProduct = product;
		},
		editProduct(state, data) {
			// Buscar el índice del producto
			const index = state.products.findIndex((product) => product.id === state.selectedProduct.id);
			// Componer el producto en base a las propiedades cambiadas
			const product = Object.assign({}, state.products[index], data);
			// Actualizar activando la reactividad
			// cambiar directamente el valor de un array no activa la reactividad
			// debido a limitaciones de JavaScript, viene en la doc de Vue
			// solución:
			Vue.set(state.products, index, product);
		},
	},
	// forma de hacer peticiones asíncronas y cuando tengamos el resultado,
	// llamar a la mutacion con un commit para setear el resultado
	// las actions no modifican nunca el estado, sólo las mutaciones
	actions: {
		getProducts({commit}) {
			return new Promise((resolve) => {
				api.getProducts((products) => {
					commit('setProducts', products);
					resolve();
				});
			});
		},
		addToCart(context, product) {
			// hay stock de ese producto?
			if (product.inventory === 0) return;
			// existe ya en el carrito?
			const item = context.state.cart.find((item) => item.id === product.id);
			if (item) {
				// si existe, añadir una unidad más
				context.commit('incrementProductQty', item);
			} else {
				// si no existe, añadir producto al carrito
				context.commit('addProductToCart', product);
			}

			// restar uno en el inventario del producto
			context.commit('decrementProductQty', product);
		},
		removeItemFromCart(context, index) {
			const item = context.state.cart[index];

			//eliminar el producto del carrito
			context.commit('removeProductFromCart', index);
			// restaurar el inventario
			context.commit('incrementProductInventory', item);
		},
		checkOut({commit, state}) {
			api.buyProducts(
				state.cart,
				() => {
					// vaciar carrito
					commit('emptyCart');
					// establecer que no hay errores
					commit('setCheckOutError', false);
				},
				() => {
					// establecer que hay errores
					commit('setCheckOutError', true);
				}
			);
		},
	},
	// vienen a ser propiedades computadas pero de la store
	getters: {
		productsOnStock(state) {
			return state.products.filter((elem) => elem.inventory > 0);
		},
		productsOnCart(state) {
			return state.cart.map((item) => {
				// los items del cart sólo tiene id y cantidad, el resto de info
				// debemos consultarlo en el state de products.
				const product = state.products.find((product) => product.id === item.id);
				return {
					title: product.title,
					price: product.price,
					quantity: item.quantity,
				};
			});
		},
		cartTotal(state, getters) {
			return getters.productsOnCart.reduce((total, current) => (total = total + current.price * current.quantity), 0);
		},
		selectedProduct(state) {
			return state.selectedProduct;
		},
	},
	modules: {},
});
