$(function() {
	solid();
})

function solid(step) {
	step = step | 0
	$("#keji #toplineImg >a").css({"z-index": -1,"opacity":0});
	$("#keji #toplineImg >a").eq(step).animate({opacity:1}, 600, function(){
					$(this).css({"z-index":0})});
	
	
	$("#keji #num ul>li").css({"z-index": -1,"opacity":0});
	$("#keji #num ul>li").eq(step).animate({opacity:1}, 600, function(){
					$(this).css({"z-index":2})});
	
}
var i = 0;
var int = setInterval(function() {
	i++;
	if(i == $("#keji #toplineImg >a").length) {
		i = 0;
	}
	solid(i);
}, 5000);