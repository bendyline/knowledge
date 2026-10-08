---
title: Reporting Services developer documentation
description: Use the documentation to understand Reporting Services features and capabilities to build custom reporting and management tools into Web sites and Windows applications.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: reporting-services
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "developer's guide [Reporting Services]"
  - "Reporting Services, programming"
  - "programming [Reporting Services]"
---

# Reporting Services developer documentation
   SQL Server 
  Reporting Services 
 offers several programming interfaces that you can apply in your own applications. You can use the existing features and capabilities of  Reporting Services 
 to build custom reporting and management tools into Web sites and Windows applications. Or you can extend the  Reporting Services 
 platform.  
  
 Extending the  Reporting Services 
 platform includes creating new components and resources that can be used for data access, report delivery and more. You can market these components and resources to companies that are using  Reporting Services 
 in their organization.  
  
> **Note:**  
>   Reporting Services 
 include programming samples and tutorials to help you get started. For more information, see [Reporting Services Samples](https://msdn.microsoft.com/library/ms160954\(v=sql.110\).aspx) and [Developer's guide: Tutorials (Reporting Services)](https://msdn.microsoft.com/library/aa337423\(v=sql.110\).aspx).  
  
## In this section  
 [Integrate Reporting Services into applications](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/reporting-services/application-integration/integrating-reporting-services-into-applications.md)  
 Provides an overview of how to use  Reporting Services 
 to integrate reporting into custom applications. Describes when to use direct URL access and when to use the Web service to access the report server.  
  
 [Report Server Web service for ASP.NET and traditional applications](report-server-web-service/report-server-web-service.md)  
 The Report Server Web service provides access to the full functionality of the report server. The Web service uses SOAP over HTTP and is designed to act as a communications interface between client programs and the report server. The Web service and its methods expose the functionality of the report server and allow you to create custom tools for any part of the report life cycle, from management to execution.  
 
 [Develop with REST APIs for modern applications](developer/rest-api.md)</br>
 The Reporting Services REST APIs provide programmatic access to the objects in Reporting Services report server catalog. When using the REST APIs, you can navigate to a folder hierarchy, discover the contents of a folder, or download a report definition. You can also create, update, and delete objects.

 [URL access (SSRS)](url-access-ssrs.md)  
  Reporting Services 
 supports a complete set of URL-based requests that you can use as a quick and easy access point for report navigation and viewing. You can use this technology with the Report Server Web service to integrate a complete reporting solution into your custom business applications. URL access is useful when integrating reports as part of a Web portal or when viewing reports from a Web browser.  
  
 [Reporting Services extensions](extensions/reporting-services-extensions.md)  
 The modular architecture of  Reporting Services 
 is designed for extensibility. A managed code API is available so that you can easily develop, install, and manage extensions consumed by many  Reporting Services 
 components. You can create assemblies using the  Microsoft 
  .NET Framework 
 and add new  Reporting Services 
 rendering, security, delivery, and data processing functionality to meet your evolving business needs.  
  
 [Custom report items](custom-report-items/custom-report-items.md)  
 Describes how to create Custom Report Items to add functionality to RDL or extend functionality of existing controls.  
  
 [Use custom assemblies with reports](custom-assemblies/using-custom-assemblies-with-reports.md)  
 Describes how to use custom assemblies with Reports by including code references within the report definition.  
  
 [Access the Reporting Services WMI provider](tools/access-the-reporting-services-wmi-provider.md)  
 Describes how to use the  Reporting Services 
 WMI Provider to manage report server deployments.  
  
## Related content

- [What is SQL Server Reporting Services (SSRS)?](create-deploy-and-manage-mobile-and-paginated-reports.md)
- [Report Definition Language (SSRS)](reports/report-definition-language-ssrs.md)
- [Technical reference (SSRS)](technical-reference-ssrs.md)
- [Secure development (Reporting Services)](extensions/secure-development/secure-development-reporting-services.md)
