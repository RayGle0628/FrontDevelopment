function keyMove(content)
{
	var frame = document.createElement("div");
	frame.style.position = "absolute";
	frame.style.boxSizing = "border-box";
	// 使用div元素包装原有的content元素，并代替content元素
	content.parentNode.insertBefore(frame, content);
	frame.appendChild(content);
	// 注册鼠标滚轮事件处理函数
	window.onkeydown = keyHandler;
	function keyHandler(event)
	{
		// 兼容早期IE浏览器的事件
		var e = event || window.event;
		var framebox = frame.getBoundingClientRect();
		// 判断keyCode的值，根据keyCode值改变frame的元素的位置
		switch(e.keyCode)
		{
			case 37:
				frame.style.left = (framebox.left - 5) + "px";
				break;
			case 38:
				frame.style.top = (framebox.top - 5) + "px";
				break;
			case 39:
				frame.style.left = (framebox.left + 5) + "px";
				break;
			case 40:
				frame.style.top = (framebox.top + 5) + "px";
				break;
		}
		// 取消默认行为并阻止传播
		if (e.preventDefault) e.preventDefault();
		if (e.stopPropagation) e.stopPropagation();
		e.returnValue = false; // 兼容早期IE浏览器的取消默认行为
		e.cancelBubble = true; // 兼容早期IE浏览器的取消冒泡
		return false;
	}
}
