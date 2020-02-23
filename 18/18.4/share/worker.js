var start;
onconnect = function(e)
{
	// 获取第一个通信port
	var port = e.ports[0];
	port.onmessage = function(event)
	{
		// 将数据提取出来。
		var data = JSON.parse(event.data);
		if(!start){
			// 取出start参数
			start = data.start;
		}
		var result = "";
		search:
		for (var n = start,count = 0 ; count < 10; n++)
		{
			for (var i = 2; i <= Math.sqrt(n); i ++)
			{
				// 如果除以n的余数为0，开始判断下一个数字。
				if (n % i == 0)
				{
					continue search;
				}
			}
			// 搜集找到的质数
			result += (n + ",");
			start = n;
			count++; // 找到1个质数，count加1
		}
		start++;
		// 发送消息，将会触发前台JavaScript脚本中
		// SharedWorker对象的port属性的onmessage方法
		port.postMessage(result);
	}
}