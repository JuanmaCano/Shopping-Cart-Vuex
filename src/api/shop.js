/**
 * Mocking client-server processing
 */
const _products = [
	{id: 1, title: 'iPad Air 4', price: 649.0, inventory: 7},
	{id: 2, title: 'iPhone 12', price: 1199.0, inventory: 10},
	{id: 3, title: 'PlayStation 5', price: 399.99, inventory: 5},
];

export default {
	getProducts(cb) {
		setTimeout(() => cb(_products), 100);
	},

	buyProducts(products, cb, errorCb) {
		setTimeout(() => {
			// simulate random checkout failure.
			Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1 ? cb() : errorCb();
		}, 100);
	},
};
