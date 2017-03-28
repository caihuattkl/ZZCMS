$(function() {
	solid.initSolid();
	solid.offSolid();
	solid.offInterval()
})

var solid = {
	other: $("#other"),
	jump: $("#jump >span"),
	items: $("#other #toplineImg >a"),
	itemText: $("#other #num>ul>li"),
	index: 0,
	timer: null,
	initSolid: function() {
		this.items.attr('style', 'opacity:0;');
		this.itemText.attr('style', 'opacity:0;');
		$(this.items[0]).attr("style", "opacity:1;z-index:1");
		$(this.itemText[0]).attr("style", "opacity:1;z-index:1");
	},
	autoSolid: function() {
		solid.items.attr('style', 'opacity:0;');
		solid.itemText.attr('style', 'opacity:0;');
		if(solid.index++ >= solid.items.length - 1) {
			solid.index = 0
		}
		$(solid.items[solid.index]).animate({"opacity":"1","z-index":"1"},"slow");
		$(solid.itemText[solid.index]).animate({"opacity":"1","z-index":"1"},"slow");
	},
	offSolid: function() {
		this.jump.mouseover(function(e) {
			e.stopPropagation();
			e.preventDefault()
			clearInterval(solid.timer)
			$(solid.items).attr('style', 'opacity:0;');
			$(solid.itemText).attr('style', 'opacity:0;');
			$(solid.items[$(this).index()]).attr("style", "opacity:1;z-index:1");
			$(solid.itemText[$(this).index()]).attr("style", "opacity:1;z-index:1");
		}).mouseout(function(e) {
			e.stopPropagation();
			e.preventDefault()
			solid.timer = setInterval(solid.autoSolid, 3000);
		});
	},
	offInterval: function() {
		this.other.mouseover(function(e) {
			clearInterval(solid.timer)
		}).mouseout(function(e) {
			solid.timer = setInterval(solid.autoSolid, 3000);
		});
	}
}

solid.timer = setInterval(solid.autoSolid, 3000);
