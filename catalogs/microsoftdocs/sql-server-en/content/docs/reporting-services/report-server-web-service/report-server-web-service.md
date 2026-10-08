---
title: "Report Server Web Service"
description: Reporting Services provides functionality of the report server with Report Server Web service, a SOAP service endpoint for report execution and management.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server-web-service
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "SSIS, Web service"
  - "Web service [Reporting Services]"
  - "Reporting Services, extending"
  - "SQL Server Reporting Services, Web service"
  - "Reporting Services, Web service"
  - "XML Web service [Reporting Services]"
  - "Report Server Web service"
---
# Report Server Web service
   SQL Server 
  Reporting Services 
 provides access to the full functionality of the report server through the Report Server Web service. The Report Server Web service is an XML Web service with a SOAP API. It uses SOAP over HTTP and acts as a communications interface between client programs and the report server. The Web service provides two endpoints - one for report execution and one for report management - with methods that expose the functionality of the report server and enable you to create custom tools for any part of the report life cycle.  
  
 There are three primary ways to develop  Reporting Services 
 applications based on the Web service. You can:  
  
-   Develop applications using  Microsoft 
  Visual Studio 
 and the  Microsoft 
  .NET Framework 
 SDK. For more information about using the  .NET Framework 
 to build Web service applications, see [Building Applications Using the Web Service and the .NET Framework](net-framework/building-applications-using-the-web-service-and-the-net-framework.md).  
  
-   Develop applications using the **rs** utility (RS.exe), the  Reporting Services 
 script environment. With  Reporting Services 
 and  Visual Basic  scripts, you can run any of the Report Server Web service operations. For more information about scripting in  Reporting Services 
, see [Script with the rs.exe Utility and the Web Service](../tools/script-with-the-rs-exe-utility-and-the-web-service.md).  
  
-   Develop applications using any SOAP-enabled set of development tools. For more information, see [The Role of SOAP in Reporting Services](the-role-of-soap-in-reporting-services.md).  
  
## Programming diagram  
 Report Server Web service development options  
Reporting Services available Web service development options  
  
## In this section  
 [Report Server Web Service Methods](methods/report-server-web-service-methods.md)  
 Describes the features and methods of each Report Server Web service.  
  
 [The Role of SOAP in Reporting Services](the-role-of-soap-in-reporting-services.md)  
 Provides an overview of SOAP and how it's used in the Report Server Web services.  
  
 [Accessing the SOAP API](accessing-the-soap-api.md)  
 Describes the Web Service Description Language (WSDL) and provides URLs for accessing a Reporting Services WSDL file.  
  
 [Building Applications Using the Web Service and the .NET Framework](net-framework/building-applications-using-the-web-service-and-the-net-framework.md)  
 Contains information about developing applications and Web services that call the Reporting Services SOAP API.  
  
 [Script with the rs.exe Utility and the Web Service](../tools/script-with-the-rs-exe-utility-and-the-web-service.md)  
 Provides an overview of the  Reporting Services 
 scripting environment.  
  
 [Technical Reference (SSRS)](../technical-reference-ssrs.md)  
 Contains reference material specific to Report Server Web services methods and corresponding complex types.  
  
## User requirements for web service development  
 To develop applications using the Report Server Web service, you need:  
  
-    Microsoft 
 Internet Explorer 5.5 or later installed on a computer with an Internet connection to and access to the report server.  
  
-    Microsoft 
  Visual Studio 
 or the  Microsoft 
  .NET Framework 
 SDK installed on a computer if you want to develop and deploy  Reporting Services 
 applications using the  Microsoft 
  .NET Framework 
.  
  
-   An in-depth understanding of  Microsoft 
  SQL Server 
  Reporting Services 
 features and capabilities.  
  
-   A firm understanding of SOAP and XML Web Services.  
  
-   Development experience in a  .NET Framework 
-compatible language such as  Microsoft 
  C# 
 or  Microsoft 
  Visual Basic , if you plan to use the  .NET Framework 
 as your development platform.  
  
## Related content

- [Report Server Web Service](#report-server-web-service)
