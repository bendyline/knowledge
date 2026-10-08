---
title: "Use Reporting Services SOAP headers"
description: Use Reporting Services SOAP headers to batch operations into a single transaction, manage session state, and retrieve properties based on the path or ID of an item.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server-web-service
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "Web service [Reporting Services], SOAP"
  - "Report Server Web service, SOAP"
  - "SOAP headers [Reporting Services]"
  - "SOAP [Reporting Services], headers"
  - "XML Web service [Reporting Services], SOAP"
---
# Use Reporting Services SOAP headers
  Communication with a Web service method using SOAP follows a standard format. Part of this format is the data that is encoded in an XML document. The XML document consists of a root **Envelope** element, which in turn consists of a required **Body** element and an optional **Header** element. The **Body** element contains the data specific to the message. The optional **Header** element can contain additional information not directly related to the particular message. Each child element of the **Header** element is called a SOAP header.  
  
 Although the SOAP headers can contain data related to the message, they typically contain information processed by the Web server infrastructure.  
  
 The Report Server Web services define several classes for use in the SOAP header: [ReportService2005.BatchHeader](https://learn.microsoft.com/search/?terms=ReportService2005.BatchHeader), [ReportService2010.ItemNamespaceHeader](https://learn.microsoft.com/search/?terms=ReportService2010.ItemNamespaceHeader), [ReportService2010.ServerInfoHeader](https://learn.microsoft.com/search/?terms=ReportService2010.ServerInfoHeader), [ReportService2010.TrustedUserHeader](https://learn.microsoft.com/search/?terms=ReportService2010.TrustedUserHeader), and [ReportExecution2005.ExecutionHeader](https://learn.microsoft.com/search/?terms=ReportExecution2005.ExecutionHeader).  
  
## In this section  
  
| Article | Description |
| --- | --- |
| [Batch methods](batching-methods.md) | Describes how to batch multiple operations into a single transaction using [ReportService2005.BatchHeader](https://learn.microsoft.com/search/?terms=ReportService2005.BatchHeader). |
| [Identify the execution state](identifying-execution-state.md) | Describes how to manage session state in  Reporting Services |
 | using **SessionHeader**. |
| [Set the item namespace for the GetProperties method](setting-the-item-namespace-for-the-getproperties-method.md) | Describes how to retrieve properties based on either the path or the ID of an item by using the [ReportService2010.ReportingService2010.GetProperties%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetProperties%252A) method and the [ReportService2010.ItemNamespaceHeader](https://learn.microsoft.com/search/?terms=ReportService2010.ItemNamespaceHeader) SOAP header. |
  
## Related content

- [Building Applications Using the Web Service and the .NET Framework](../report-server-web-service/net-framework/building-applications-using-the-web-service-and-the-net-framework.md)
- [Technical reference (SSRS)](../technical-reference-ssrs.md)
