---
title: "Integrate using SOAP"
description: The Reporting Services SOAP API provides several Web service endpoints for developing custom reporting solutions.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: application-integration
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "Report Server Web service, application integration"
  - "SOAP [Reporting Services]"
  - "SOAP [Reporting Services], about report integration"
  - "integrating reports [Reporting Services]"
  - "Web service [Reporting Services], application integration"
---
# Integrate Reporting Services by using SOAP
  The  SQL Server 2008 R2 (10.50.x) 
  Reporting Services 
 SOAP API provides several Web service endpoints for developing custom reporting solutions. The endpoints currently fall into two categories: management and execution. The management functionality is exposed through the [ReportService2005](https://learn.microsoft.com/search/?terms=ReportService2005), [ReportService2006](https://learn.microsoft.com/search/?terms=ReportService2006), and [ReportService2010](https://learn.microsoft.com/search/?terms=ReportService2010) endpoints. The [ReportService2005](https://learn.microsoft.com/search/?terms=ReportService2005) endpoint is used for managing a report server that is configured in native mode. The [ReportService2006](https://learn.microsoft.com/search/?terms=ReportService2006) endpoint is used for managing a report server that is configured for SharePoint integrated mode. The [ReportService2010](https://learn.microsoft.com/search/?terms=ReportService2010) merges the functionalities of [ReportService2005](https://learn.microsoft.com/search/?terms=ReportService2005) and [ReportService2006](https://learn.microsoft.com/search/?terms=ReportService2006) and can manage a report server that is configured for either native or SharePoint integrated mode.  
  
> **Note:**  
>  The [ReportService2005](https://learn.microsoft.com/search/?terms=ReportService2005) and [ReportService2006](https://learn.microsoft.com/search/?terms=ReportService2006) endpoints are deprecated in  SQL Server 2008 R2 (10.50.x) 
. The [ReportService2010](https://learn.microsoft.com/search/?terms=ReportService2010) endpoint includes the functionalities of both endpoints and contains additional management features.  
  
 The execution functionality is exposed through the [ReportExecution2005](https://learn.microsoft.com/search/?terms=ReportExecution2005) endpoint and is used when the report server is configured in native or SharePoint integrated mode. The following articles show how these endpoints can be used for developing reporting solutions in  Microsoft 
 Windows, SharePoint, and Web applications.  
  
## In this section  
 [Using the SOAP API in a Windows Application](integrating-reporting-services-using-soap-windows-application.md)  
 Describes how to use the SOAP API to integrate  Reporting Services 
 into a Windows environment.  
  
 [Using the SOAP API in a Web Application](integrating-reporting-services-using-soap-web-application.md)  
 Describes how to use the SOAP API to integrate  Reporting Services 
 into a Web environment.  
  
## Related content

- [Integrating Reporting Services into Applications](https://learn.microsoft.com/previous-versions/sql/reporting-services/application-integration/integrating-reporting-services-into-applications)
- [Report Server Web service](../report-server-web-service/report-server-web-service.md)
- [Building Applications Using the Web Service and the .NET Framework](../report-server-web-service/net-framework/building-applications-using-the-web-service-and-the-net-framework.md)
