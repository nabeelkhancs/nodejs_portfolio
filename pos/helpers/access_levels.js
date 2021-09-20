let access_levels = [
	{
		name: 'Dashboard', 
		route: '/',
		code: '000'
	},
	{
		name: 'Products',
		route: null,
		code: '100'
	},
	{
		name: 'Add Product',
		route: '/products/add',
		code: '110'
	},
	{
		name: 'Edit Product',
		route: '/products/edit',
		code: '111'
	},
	{
		name: 'Delete Product',
		route: '/products/delete',
		code: '112'
	},
	{
		name: 'Update Product',
		route: '/products/update',
		code: '113'
	},
	{
		name: 'List Products',
		route: '/products/',
		code: '120'
	},
	{
		name: 'Product Categories',
		route: '/products/categories',
		code: '130'
	},
	{
		name: 'Delete Product Categories',
		route: '/products/categories/delete',
		code: '131'
	},
	{
		name: 'Barcode Labels',
		route: '/products/printlabel',
		code: '140'
	},
	{
		name: 'Product Pricing',
		route: '/products/pricing',
		code: '150'
	},
	{
		name: 'Product Pricing Delete',
		route: '/products/pricing/delete',
		code: '151'
	},
	{
		name: 'Purchases',
		route: null,
		code: '200'
	},
	{
		name: 'Add Purchase',
		route: '/purchases/add',
		code: '210'
	},
	{
		name: 'Delete Purchase',
		route: '/purchases/delete',
		code: '211'
	},
	{
		name: 'Print Purchase',
		route: '/purchases/print',
		code: '212'
	},
	{
		name: 'List Purchase',
		route: '/purchases/',
		code: '220'
	},
	{
		name: 'Suppliers',
		route: '/suppliers/',
		code: '230'
	},
	{
		name: 'Suppliers Delete',
		route: '/suppliers/delete',
		code: '231'
	},
	{
		name: 'Sales',
		route: null,
		code: '300'
	},
	{
		name: 'POS Screen',
		route: '/pos/',
		code: '310'
	},
	{
		name: 'Print Slip',
		route: '/sales/printslip',
		code: '311'
	},
	{
		name: 'Sales List',
		route: '/sales/',
		code: '320'
	},
	{
		name: 'Delete Sales',
		route: '/sales/delete',
		code: '321'
	},
	{
		name: 'Customers',
		route: '/customers/',
		code: '330'
	},
	{
		name: 'Customers Delete',
		route: '/customers/delete',
		code: '331'
	},
	{
		name: "Locations",
		route: null,
		code: '400'
	},
	{
		name: "Add Locations",
		route: "/locations/add",
		code: "410"
	},
	{
		name: "Edit Locations",
		route: "/locations/edit",
		code: "411"
	},
	{
		name: "Update Locations",
		route: "/locations/update",
		code: "412"
	},
	{
		name: "Delete Locations",
		route: "/locations/delete",
		code: '413'
	},
	{
		name: "List Locations",
		route: "/locations/",
		code: "420"
	},
	{
		name: "Inventory Location Transfer",
		route: "/locations/transfer",
		code: "430"
	},
	{
		name: "Inventory Location Transfer Log",
		route: "/locations/transferlog",
		code: "440"
	},
	{
		name: 'Settings',
		route: null,
		code: '500'
	},
	{
		name: 'Users',
		route: '/users/',
		code: '510'
	},
	{
		name: 'Users Edit',
		route: '/users/edit',
		code: '511'
	},
	{
		name: 'Users Delete',
		route: '/users/delete',
		code: '512'
	},
	{
		name: 'Permissions List',
		route: '/permissions/',
		code: '520'
	},
	{
		name: 'Add Permissions',
		route: '/permissions/add',
		code: '530'
	},
	{
		name: 'Edit Permissions',
		route: '/permissions/edit',
		code: '531'
	},
	{
		name: 'Update Permissions',
		route: '/permissions/update',
		code: '532'
	},
	{
		name: 'Delete Permissions',
		route: '/permissions/delete',
		code: '533'
	},
];

module.exports = access_levels;