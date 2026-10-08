---
title: "Use SOAP API in Web Applications"
description: You can access the functionality of the report server through the Reporting Services SOAP API, which can be accessed to provide enterprise reporting features.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: application-integration
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "SOAP [Reporting Services], Web applications"
  - "impersonation [Reporting Services]"
  - "user impersonation [Reporting Services]"
  - "report servers [Reporting Services], SOAP"
  - "Web applications [Reporting Services]"
---
# Integrate Reporting Services by using SOAP - Web application
  You can access the full functionality of the report server through the Reporting Services SOAP API. Because it's a Web service, the SOAP API can be easily accessed to provide enterprise reporting features to your custom business applications. You access the Report Server Web service from a Web application in much the same way that you access the SOAP API from a  Microsoft 
 Windows application. By using the  Microsoft 
  .NET Framework 
, you can generate a proxy class that exposes the properties and methods of the Report Server Web service. You can then use a familiar infrastructure and tools to build business applications on  Reporting Services 
 technology.  
  
  Reporting Services 
 report management functionality is easily accessed from a Web application or from a Windows application. From a Web application, you can add and remove items from the report server database, set item security, modify report server database items, manage scheduling and delivery, and more.  
  
## Enable impersonation  
 The first step in configuring your Web application is to enable impersonation from the Web service client. With impersonation,  ASP.NET 
 applications can execute with the identity of the client on whose behalf they're operating.  ASP.NET 
 relies on  Microsoft 
 Internet Information Services (IIS) to authenticate the user and either pass an authenticated token to the  ASP.NET 
 application or, if unable to authenticate the user, pass an unauthenticated token. In either case, the  ASP.NET 
 application impersonates whichever token is received if impersonation is enabled. You can enable impersonation on the client, by modifying the Web.config file of the client application as follows:  
  
```asp.net  
<!-- Web.config file. -->  
<identity impersonate="true"/>  
```  
  
> **Note:**  
>  Impersonation is disabled by default.  
  
 For more information about  ASP.NET 
 impersonation, see the  Microsoft 
  .NET Framework 
 SDK documentation.  
  
## Manage the Report Server by using SOAP API  

**Applies to: \>=sql-server-2017**

 You can also use your Web application to manage a report server and its contents. The web portal, included with  Reporting Services 
, is an example of a Web application that manages most of the tasks you would typically perform using Reporting Services. You can add the report management functionality of the web portal to your custom Web applications. For example, you might want to return a list of available reports in the report server database and display them in a  ASP.NET 
 **Listbox** control for your users to choose from. The following code connects to the report server database and returns a list of items in the report server database. The available reports are then added to a Listbox control, which displays the path of each report.  


  
```vb  
Private Sub Page_Load(sender As Object, e As System.EventArgs)  
   ' Create a Web service proxy object and set credentials  
   Dim rs As New ReportingService2005()  
   rs.Credentials = System.Net.CredentialCache.DefaultCredentials  
  
   ' Return a list of catalog items in the report server database  
   Dim items As CatalogItem() = rs.ListChildren("/", True)  
  
   ' For each report, display the path of the report in a Listbox  
   Dim ci As CatalogItem  
   For Each ci In  items  
      If ci.Type = ItemTypeEnum.Report Then  
         catalogListBox.Items.Add(ci.Path)  
      End If  
   Next ci  
End Sub ' Page_Load   
```  
  
```csharp  
private void Page_Load(object sender, System.EventArgs e)  
{  
   // Create a Web service proxy object and set credentials  
   ReportingService2005 rs = new ReportingService2005();  
   rs.Credentials = System.Net.CredentialCache.DefaultCredentials;  
  
   // Return a list of catalog items in the report server database  
   CatalogItem[] items = rs.ListChildren("/", true);  
  
   // For each report, display the path of the report in a Listbox  
   foreach(CatalogItem ci in items)  
   {  
      if (ci.Type == ItemTypeEnum.Report)  
         catalogListBox.Items.Add(ci.Path);  
   }  
}  
```  
  
## Related content

- [Building Applications Using the Web Service and the .NET Framework](../report-server-web-service/net-framework/building-applications-using-the-web-service-and-the-net-framework.md)
- [Integrating Reporting Services into Applications](https://learn.microsoft.com/previous-versions/sql/reporting-services/application-integration/integrating-reporting-services-into-applications)
- [Integrate Reporting Services by using SOAP - Windows application](integrating-reporting-services-using-soap-windows-application.md)
