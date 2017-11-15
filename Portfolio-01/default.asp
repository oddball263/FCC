<%@ Language=VBScript %>

<%
dim site_id

site_id = lcase(Request.ServerVariables("PATH_INFO"))

 'Response.Write(site_id & "<br>")

site_id = Replace(site_id,"/default.asp","")

 'Response.Write(site_id & "<br>")

site_id = Right(site_id,6)

 'Response.Write(site_id & "<br>")

 if site_id = 123456 then
    Response.Redirect "../../webdev/active770.html"
 end if

 if Len(site_id) = 6 and IsNumeric(site_id) then
	Response.Redirect "../../Section1.aspx?&sid=" & site_id
	'Response.Write(site_id & "true <br>")
 else
	Response.Redirect "../../Default.aspx?sid=" & site_id & "&locate=no"
	'Response.Write(site_id & "false <br>")
 end if

%>
<HTML>
<HEAD>

</HEAD>
<BODY>

<a href="../../Default.aspx">inetTeacher.com</a>

</BODY>
</HTML>
