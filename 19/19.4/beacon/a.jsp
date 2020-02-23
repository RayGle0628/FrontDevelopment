<%--
网站: <a href="http://www.crazyit.org">疯狂Java联盟</a>
author yeeku.H.lee kongyeeku@163.com
version 1.0
Copyright (C), 2001-2016, yeeku.H.Lee
This program is protected by copyright laws.
Program Name:
Date: 
--%>

<%@ page contentType="text/html; charset=GBK" language="java" errorPage=""
	import="java.io.*"%>
<%
// 使用IO流读取客户端Beacon发送的数据
BufferedReader br = new BufferedReader(
	new InputStreamReader(request.getInputStream(), "utf-8"));
System.out.println("接收到的数据---" + br.readLine());
%>