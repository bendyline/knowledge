---
title: "Introduction to exception management in Reporting Services"
description: Learn how to handle exceptions thrown by the Report Server Web service so you can return useful information to users when errors occur.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server-web-service
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "Web service [Reporting Services], exception handling"
  - "errors [Reporting Services]"
  - "exceptions [Reporting Services]"
  - "Report Server Web service, exception handling"
  - "XML Web service [Reporting Services], exception handling"
---
# Introduction to exception management in Reporting Services
  If your  Reporting Services 
 application sends a request to the Report Server Web service that the service is unable to process, the service returns a SOAP exception to the client. Handling exceptions thrown by the Report Server Web service is an important part of the applications that you develop because you can return useful information to users when errors occur.  
  
 This section contains specific information about handling exceptions, preventing user input that isn't valid, and returning meaningful error information to users. For general information about exception handling, see "Handling and Throwing Exceptions" in the  Microsoft 
  .NET Framework 
 SDK documentation.  
  
## In this section  
  
| Article | Description |
| --- | --- |
| [Handle exceptions in Reporting Services](handling-exceptions-in-reporting-services.md) | Provides an overview of exceptions in  Reporting Services |
 | and the role of SOAP in returning errors from a Web service. |
| [Best practices for Reporting Services exception management](best-practices/best-practices-for-reporting-services-exception-handling.md) | Provides recommendations on how to handle exceptions in  Reporting Services |
| . |
| [Reporting Services SoapException class](soapexception-class/reporting-services-soapexception-class.md) | Describes the **SoapException** class in  Reporting Services |
| . |
  
## Related content

- [Building Applications Using the Web Service and the .NET Framework](../report-server-web-service/net-framework/building-applications-using-the-web-service-and-the-net-framework.md)
