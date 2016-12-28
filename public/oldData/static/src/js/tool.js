$("#calcFn").click(function() {
	var firstPrice = Number($("#firstPrice").val()),//首次买入价
		firstNumber = Number($("#firstNumber").val()),//首次买入股数
		BuyingPositions = Number($("#BuyingPositions").val()),//补仓买入价
		BuyingStocks = Number($("#BuyingStocks").val()),//补仓买入股数
		commissionRate = Number($("#commissionRate").val()),//手续费
		totalCost;//补仓后成本价
	if(0 !== firstPrice && 0 !== firstNumber && 0!== BuyingPositions && 0!== BuyingStocks && !isNaN(firstPrice) && !isNaN(firstNumber) && !isNaN(BuyingPositions) && !isNaN(BuyingStocks) && !isNaN(commissionRate)) {
		//(首次买入价 * 首次买入股数 + 补仓买入价 * 补仓买入股数) / (首次买入股数 + 补仓买入股数);
		totalCost=(firstPrice * firstNumber + BuyingPositions * BuyingStocks) /(firstNumber + BuyingStocks);
		alert ("您补仓后成本价是:"+totalCost);
		
	} else {
		alert("请将表单填写完整且必须填写数字")
	}
})


function validIpt(){
	
}
function resetFrom(){
	$("#firstPrice").val("");
	$("#firstNumber").val("");
	$("#BuyingPositions").val("");
	$("#BuyingStocks").val("");
}
