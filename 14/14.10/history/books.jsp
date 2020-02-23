<%@page pageEncoding="UTF-8"%>
<%
	String id = request.getParameter("id");
	String result = null;
	switch(id) 
	{
		case "java":
			result = "覆盖Java 8的Lambda表达式、函数式编程、流式编程、并行支持、改进的类型推断、JDBC 4.2等新特性";
			break;

		case "ee":
			result = "国内知名IT图书作家李刚老师基于曾荣获中国书刊发行业协会“年度全行业畅销品种”大奖的《轻量级Java EE企业应用实战（第3版）》全新升级；";
			break;

		case "android":
			result = "开卷数据显示2014年度Android图书排行榜第一名，曾获评CSDN年度具有技术影响力十大原创图书";
			break;

		case "html":
			result = "适合开发者入门的HTML 5图书，本书繁体中文版已经输出到台湾地区";
			break;

		case "front":
			result = "基于畅销书《疯狂Ajax讲义》升级而来，全面介绍jQuery、Ext JS、BootStrap等主流前端开发库";
			break;
	}
	out.println(result);
%>