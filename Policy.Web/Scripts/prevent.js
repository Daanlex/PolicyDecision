//屏蔽谷歌浏览器触摸屏的前进后退事件
$(function() {
			//$(document).bind("contextmenu", function() { return false; }); 
		});

function getCircleInfo(p1x,p1y,p2x,p2y,p3x,p3y) {
	var circleInfo = new Object();
	var mat1,mat2,mat3;
	mat1 =  ((p2x*p2x + p2y*p2y)-(p1x*p1x + p1y*p1y)) * (2*(p3y -p1y))-((p3x*p3x +p3y*p3y) -(p1x*p1x+p1y*p1y))*(2*(p2y-p1y));
	mat2 =  (2*(p2x-p1x))*((p3x*p3x + p3y*p3y) -(p1x*p1x +p1y*p1y)) -(2*(p3x-p1x))*((p2x*p2x + p2y*p2y)-(p1x*p1x +p1y*p1y));
	mat3 =  4*((p2x-p1x)*(p3y-p1y)-(p3x-p1x)*(p2y-p1y));
	circleInfo.pointx = mat1/mat3;
	circleInfo.pointy = mat2/mat3;
	circleInfo.raduis = Math.pow(((p1x-circleInfo.pointx)*(p1x-circleInfo.pointx)+(p1y-circleInfo.pointy)*(p1y-circleInfo.pointy)),2);
	return circleInfo;
}
var circle = null;
if (document.createTouch && document.body.addEventListener) {
	var scrollLeft;
	var clientX;
	document.body.addEventListener("touchstart", function(e) {
		if (e.touches.length > 1) {
			//e.preventDefault();
			//e.stopPropagation();
			if (e.touches.length >= 3) {
				circle = getCircleInfo(e.touches[0].clientX, e.touches[0].clientY, e.touches[1].clientX, e.touches[1].clientY, e.touches[2].clientX, e.touches[2].clientY);
			}
			return;
		}
		var t = e.target;
		var l;
		var noPrevent = false;
		while (t) {
			if (t.className && t.className.indexOf("noPrevent") >= 0) {
				noPrevent = true;
				break;
			}
			l = t.scrollLeft;
			if (l > 0)
				break;
			t = t.parentNode;
		}
		if (typeof l == "undefined")
			l = 0;
		if (l == 0)
			clientX = e.touches[0].clientX;

		var t = e.target;
		var r = true;
		while (t && t != document.documentElement && r) {
			if (t.className && t.className.indexOf("noPrevent") >= 0) {
				noPrevent = true;
				break;
			}
			if (t.scrollWidth > t.clientWidth + t.scrollLeft) {
				r = false;
				break;
			}
			t = t.parentNode;
		}
		if (r)
			clientX = e.touches[0].clientX;
	});
	document.body.addEventListener("touchmove", function(e) {
		var t = e.target;
		var l;
		var noPrevent = false;
		while (t) {
			if (t.className && t.className.indexOf("noPrevent") >= 0) {
				noPrevent = true;
				break;
			}
			l = t.scrollLeft;
			if (l > 0)
				break;
			t = t.parentNode;
		}
		if (typeof l == "undefined")
			l = 0;
		if (!noPrevent && l == 0 && e.touches[0].clientX - clientX > 10) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		var t = e.target;
		var r = true;
		while (t && t != document.documentElement && r) {
			if (t.className && t.className.indexOf("noPrevent") >= 0) {
				noPrevent = true;
				break;
			}
			if (t.scrollWidth > t.clientWidth + t.scrollLeft) {
				r = false;
				break;
			}
			t = t.parentNode;
		}
		if (!noPrevent && r && clientX - e.touches[0].clientX> 10) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
	});
	document.body.addEventListener("touchend", function(e) {
		if (circle && e.touches.length + e.changedTouches.length >= 3) {
			var array = [];
			for (var i = 0; i < e.touches.length; i++)
				array.push(e.touches[i]);
			for (var i = 0; i < e.changedTouches.length; i++) {
				array.push(e.changedTouches[i]);
			}
			var endCircle = getCircleInfo(array[0].clientX, array[0].clientY, array[1].clientX, array[1].clientY, array[2].clientX, array[2].clientY);
			if (endCircle.raduis < circle.raduis) {
				console.info('抓取触发回到首页。');
				circle = null;
			}
		}
		clientX = null;
	});
}
