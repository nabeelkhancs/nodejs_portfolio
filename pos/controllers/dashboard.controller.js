const Sale = require('../models/Sale');
const Purchase = require('../models/Purchase');
const Location = require('../models/Location');

module.exports.dashboard_get = async (req, res, next) => {
	
	const location = await Location.findById(req.user.locationId);
	let startDate = new Date();
	let endDate = new Date();
	startDate.setHours(0, 0, 0, 0)
	endDate.setHours(23, 59, 59, 99);
	var where = {};

	if(!req.user.isAdmin)
		where.locationId = req.user.locationId;
	
	if(req.user.isAdmin){
		var todaySales = await Sale.aggregate([
			{
				$match: {
					createdAt: {
						$gte: startDate,
						$lte: endDate
					},
				}
			},
			{ $unwind: "$product" },
			{
				$group: {
					_id: "$createdAt",
					totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },
	
				}
			},
			{
				$group: {
					_id: null,
					sum: { $sum:"$totalAmount" },
				}
			},
		]);
	}
	else {
		var todaySales = await Sale.aggregate([
			{
				$match: {
					createdAt: {
						$gte: startDate,
						$lte: endDate
					},
					locationId: req.user.locationId
				}
			},
			{ $unwind: "$product" },
			{
				$group: {
					_id: "$createdAt",
					totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },
	
				}
			},
			{
				$group: {
					_id: null,
					sum: { $sum:"$totalAmount" },
				}
			},
		]);
	}	
	if(req.user.isAdmin){
		var todayPurchases = await Purchase.aggregate([
			{
				$match: {
					createdAt: {
						$gte: startDate,
						$lte: endDate
					}
				}
			},
			{ $unwind: "$product" },
			{
				$group: {
					_id: "$createdAt",
					totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },

				}
			},
			{
				$group: {
					_id: null,
					sum: { $sum:"$totalAmount" },
				}
			},
		]);
	}
	else {
		var todayPurchases = await Purchase.aggregate([
			{
				$match: {
					createdAt: {
						$gte: startDate,
						$lte: endDate
					},
					locationId: req.user.locationId

				}

			},
			{ $unwind: "$product" },
			{
				$group: {
					_id: "$createdAt",
					totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },

				}
			},
			{
				$group: {
					_id: null,
					sum: { $sum:"$totalAmount" },
				}
			},
		]);
	}

	//=======\

	var lastWeekSales = [];
	var saleDates = [];
	var saleDate = new Date();
	if(req.user.isAdmin){
		for(i = 0; i < 7; i++ ){
			var saleDateTemp = new Date();
			saleDateTemp.setDate(saleDate.getDate() -i);
			var str = (saleDateTemp.getFullYear() + "-" + (saleDateTemp.getMonth()+1) + "-" + (saleDateTemp.getDate()));
			var finalDateStart = new Date(str);
			var finalDateEnd = new Date(str);
			finalDateStart.setHours(0,0,0,0);
			finalDateEnd.setHours(23,59,59,59);
			var daySales = await Sale.aggregate([
				{
					$match: {
						createdAt: {
							$gte: finalDateStart,
							$lte: finalDateEnd
						},
					}
				},
				{ $unwind: "$product" },
				{
					$group: {
						_id: "$createdAt",
						totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },
		
					}
				},
				{
					$group: {
						_id: null,
						sum: { $sum:"$totalAmount" },
					}
				},
			]);
			let pushedSale = typeof(daySales) != "undefined" ? daySales : 0
			lastWeekSales.unshift(pushedSale);
		}
	}
	else {
		for(i = 0; i < 7; i++ ){
			var saleDateTemp = new Date();
			saleDateTemp.setDate(saleDate.getDate() -i);
			var str = (saleDateTemp.getFullYear() + "-" + (saleDateTemp.getMonth()+1) + "-" + (saleDateTemp.getDate()));
			var finalDateStart = new Date(str);
			var finalDateEnd = new Date(str);
			finalDateStart.setHours(0,0,0,0);
			finalDateEnd.setHours(23,59,59,59);
			var daySales = await Sale.aggregate([
				{
					$match: {
						createdAt: {
							$gte: finalDateStart,
							$lte: finalDateEnd
						},
						locationId: req.user.locationId
					}
				},
				{ $unwind: "$product" },
				{
					$group: {
						_id: "$createdAt",
						totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },
		
					}
				},
				{
					$group: {
						_id: null,
						sum: { $sum:"$totalAmount" },
					}
				},
			]);
			let pushedSale = typeof(daySales) != "undefined" ? daySales : 0
			lastWeekSales.unshift(pushedSale);
		}
	}

	//==============================\\
	var monthlySales = [];
	var todayDateForMonth = new Date();
	if(req.user.isAdmin){
		for(i=-1; i<5;i++){
			var firstDay = new Date(todayDateForMonth.getFullYear(), todayDateForMonth.getMonth()-i);
			firstDay.setUTCHours(0,0,0,0);
			firstDay.setDate(1);
			var lastDay = new Date(todayDateForMonth.getFullYear(), todayDateForMonth.getMonth()-i);
			lastDay.setMonth(lastDay.getMonth());
			lastDay.setDate(1);
			lastDay.setDate(lastDay.getDate() -1);
			lastDay.setHours(23,59,59,59);
	
			var monthSales = await Sale.aggregate([
				{
					$match: {
						createdAt: {
							$gte: firstDay,
							$lte: lastDay
						},
					}
				},
				{ $unwind: "$product" },
				{
					$group: {
						_id: "$createdAt",
						totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },
		
					}
				},
				{
					$group: {
						_id: null,
						sum: { $sum:"$totalAmount" },
					}
				},
			]);
	
			// console.log(firstDay+" == "+ lastDay +" == "+monthSales);
			monthlySales.unshift(monthSales);
			// console.log("First Day: "+firstDay.toISOString());
			// console.log("Last Day: "+lastDay.toISOString());
		}
	}
	else {
		for(i=-1; i<5;i++){
			var firstDay = new Date(todayDateForMonth.getFullYear(), todayDateForMonth.getMonth()-i);
			firstDay.setUTCHours(0,0,0,0);
			firstDay.setDate(1);
			var lastDay = new Date(todayDateForMonth.getFullYear(), todayDateForMonth.getMonth()-i);
			lastDay.setMonth(lastDay.getMonth());
			lastDay.setDate(1);
			lastDay.setDate(lastDay.getDate() -1);
			lastDay.setHours(23,59,59,59);
	
			var monthSales = await Sale.aggregate([
				{
					$match: {
						createdAt: {
							$gte: firstDay,
							$lte: lastDay
						},
						locationId: req.user.locationId
					}
				},
				{ $unwind: "$product" },
				{
					$group: {
						_id: "$createdAt",
						totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },
		
					}
				},
				{
					$group: {
						_id: null,
						sum: { $sum:"$totalAmount" },
					}
				},
			]);
	
			// console.log(firstDay+" == "+ lastDay +" == "+monthSales);
			monthlySales.unshift(monthSales);
			// console.log("First Day: "+firstDay.toISOString());
			// console.log("Last Day: "+lastDay.toISOString());
		}
	}

	console.log(monthlySales);
	res.render('index', {
		location: req.user.isAdmin ? "All Stores" : "",
		todaySales: typeof(todaySales[0]) != "undefined" ? todaySales[0].sum : 0,
		todayPurchases: typeof(todayPurchases[0]) != "undefined" ? todayPurchases[0].sum : 0,
		lastWeekSales,
		monthlySales
	});
}

module.exports.locationDashboard_get = async (req, res, next) => {

	var id = req.params.id;
	const location = await Location.findById(id);
	let startDate = new Date();
	let endDate = new Date();
	startDate.setHours(0, 0, 0, 0);
	endDate.setHours(23, 59, 59, 99);
	//total sales tody
	var todaySales = await Sale.aggregate([
		{
			$match: {
				createdAt: {
					$gte: startDate,
					$lte: endDate
				},
				locationId: location._id
			} 
		},
		{ $unwind: "$product" },
		{
			$group: {
				_id: "$createdAt",
				totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },

			}
		},
		{
			$group: {
				_id: null,
				sum: { $sum:"$totalAmount" },
			}
		},
	]);

	var todayPurchases = await Purchase.aggregate([
		{
			$match: {
				createdAt: {
					$gte: startDate,
					$lte: endDate
				},
				locationId: location._id
			}
		},
		{ $unwind: "$product" },
		{
			$group: {
				_id: "$createdAt",
				totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },

			}
		},
		{
			$group: {
				_id: null,
				sum: { $sum:"$totalAmount" },
			}
		},
	]);

	//==========\\
	var lastWeekSales = [];
	var saleDate = new Date();

	for(i = 0; i < 7; i++ ){
		var saleDateTemp = new Date();
		saleDateTemp.setDate(saleDate.getDate() -i);
		var str = (saleDateTemp.getFullYear() + "-" + (saleDateTemp.getMonth()+1) + "-" + (saleDateTemp.getDate()));
		var finalDateStart = new Date(str);
		var finalDateEnd = new Date(str);
		finalDateStart.setHours(0,0,0,0);
		finalDateEnd.setHours(23,59,59,59);
		// console.log(finalDateStart+"=="+finalDateEnd);
		var daySales = await Sale.aggregate([
			{
				$match: {
					createdAt: {
						$gte: finalDateStart,
						$lte: finalDateEnd
					},
					locationId: location._id
				}
			},
			{ $unwind: "$product" },
			{
				$group: {
					_id: "$createdAt",
					totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },
				}
			},
			{
				$group: {
					_id: null,
					sum: { $sum:"$totalAmount" },
				}
			},
		]);
		console.log(daySales);
		let pushedSale = typeof(daySales) != "undefined" ? daySales : 0
		lastWeekSales.unshift(daySales);
	}

	//============================\\
	var monthlySales = [];
	var todayDateForMonth = new Date();

	for(i=-1; i<5;i++){
		var firstDay = new Date(todayDateForMonth.getFullYear(), todayDateForMonth.getMonth()-i);
		firstDay.setUTCHours(0,0,0,0);
		firstDay.setDate(1);
		var lastDay = new Date(todayDateForMonth.getFullYear(), todayDateForMonth.getMonth()-i);
		lastDay.setMonth(lastDay.getMonth());
		lastDay.setDate(1);
		lastDay.setDate(lastDay.getDate() -1);
		lastDay.setHours(23,59,59,59);

		var monthSales = await Sale.aggregate([
			{
				$match: {
					createdAt: {
						$gte: firstDay,
						$lte: lastDay
					},
					locationId: location._id
				}
			},
			{ $unwind: "$product" },
			{
				$group: {
					_id: "$createdAt",
					totalAmount: { $sum: { $multiply: ["$product.pricePerUnit", "$product.quantity"] } },
	
				}
			},
			{
				$group: {
					_id: null,
					sum: { $sum:"$totalAmount" },
				}
			},
		]);

		// console.log(firstDay+" == "+ lastDay +" == "+monthSales);
		monthlySales.unshift(monthSales);
		// console.log("First Day: "+firstDay.toISOString());
		// console.log("Last Day: "+lastDay.toISOString());
	}

	res.render('index', {
		location: location.name,
		todaySales: typeof(todaySales[0]) != "undefined" ? todaySales[0].sum : 0,
		todayPurchases: typeof(todayPurchases[0]) != "undefined" ? todayPurchases[0].sum : 0,
		lastWeekSales,
		monthlySales
	});

}