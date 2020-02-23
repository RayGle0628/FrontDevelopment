/**
 * 该函数使用div元素包装content元素，使得content可以在div内滚动
 * content: 指定被包装的元素
 * frameWidth: 指定div元素的宽度
 * frameHeight: 指定div元素的高度
 * contentX: 指定content元素在div元素内的初始X坐标
 * contentY: 指定content元素在div元素内的初始Y坐标
 */
function enclose(content, frameWidth, frameHeight, contentX, contentY)
{
	// 保证frameWidth、frameHeight最少要大于100
	frameWidth = Math.max(frameWidth, 100);
	frameHeight = Math.max(frameHeight, 100);
	contentX = Math.min(contentX, 0) || 0;
	contentY = Math.min(contentY, 0) || 0;
	// 创建一个div元素，并设置该元素的样式
	var frame = document.createElement("div");
	frame.style.border = "5px solid black";
	frame.style.margin = "5px;";
	frame.style.width = frameWidth + "px"; // 设置该div的宽度和高度
	frame.style.height = frameHeight + "px";
	frame.style.overflow = "hidden"; // 不显示滚动条
	frame.style.boxSizing = "border-box";
	// 使用div元素包装原有的content元素，并代替content元素
	content.parentNode.insertBefore(frame, content);
	frame.appendChild(content);
	// 设置content的position为relative，保证该元素可在div内移动
	content.style.position = "relative";
	// 设置content的初始位置
	content.style.left = contentX + "px";
	content.style.top = contentY + "px";
//	alert(navigator.userAgent);
	// 判断浏览器
	var isFirefox = (navigator.userAgent.indexOf("Gecko") !== -1);
	var isChrome = (navigator.userAgent.indexOf("Chrome") !== -1);
	// 注册鼠标滚轮事件处理函数
	frame.onwheel = wheelHandler;  // 兼容支持DOM 3的浏览器
	frame.onmousewheel = wheelHandler;  // 兼容早期大部分浏览器
	if (isFirefox)  // 兼容早期Firefox浏览器
		frame.addEventListener("DOMMouseScroll", wheelHandler, false);
	function wheelHandler(event)
	{
		// 兼容早期IE浏览器的事件
		var e = event || window.event;
		// 下面计算滚动距离
		// DOM 3使用deltaX、deltaY、deltaZ属性
		// 目前主流浏览器使用的mousewheel事件，
		// 支持wheelDeltaX、wheelDeltaY、wheelDeltaZ
		var deltaX = e.deltaX * -10 || // 兼容DOM 3的wheel事件
			e.wheelDeltaX / 12 ||  // 兼容早期的主流浏览器
			0;	// 如果不支持该属性
		var deltaY = e.deltaY * -10 || // 兼容DOM 3的wheel事件
			e.wheelDeltaY / 12 ||  // 兼容早期的主流浏览器
			(e.wheelDeltaY===undefined && // 如果不支持2个方向的滚动事件
			e.wheelDelta / 4) ||  // 仅使用一个属性
			e.detail * -10 ||  // 兼容早期Firefox浏览器
			0;	 // 如果不支持该属性
		// 为兼容Chrome浏览器，该浏览器中deltaX、deltaY属性返回100或-100
		if(isChrome){
			deltaX /= 10;
			deltaY /= 10;
		}
		// 获取content元素的当前大小
		var contentbox = content.getBoundingClientRect();
		var contentWidth = contentbox.right - contentbox.left;
		var contentHeight = contentbox.bottom - contentbox.top;
		// 如果有X轴（水平方向）的滚动距离，水平移动content元素
		if (deltaX) {
			// 滚动记录不要超过frameWidth宽度
			var minOffset = Math.min(frameWidth-contentWidth, 0);
			// 在原contentX基础上加上deltaX
			contentX = Math.max(contentX + deltaX, minOffset);
			// 新contentX不得大于0
			contentX = Math.min(contentX, 0);
			content.style.left = contentX + "px";
		}
		// 如果有Y轴（垂直方向）的滚动距离，垂直移动content元素
		if (deltaY) {
			var minOffset = Math.min(frameHeight - contentHeight, 0);
			// 在原contentY基础上加上deltaX，且新contentY不得小于minOffset
			contentY = Math.max(contentY + deltaY, minOffset);
			// 新contentY不得大于0
			contentY = Math.min(contentY, 0);
			content.style.top = contentY + "px";
		}
		// 取消默认行为并阻止传播
		if (e.preventDefault) e.preventDefault();
		if (e.stopPropagation) e.stopPropagation();
		e.returnValue = false; // 兼容早期IE浏览器的取消默认行为
		e.cancelBubble = true; // 兼容早期IE浏览器的取消冒泡
		return false;
	}
}
