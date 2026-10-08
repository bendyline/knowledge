---
title: "Reporting Services extensions"
description: Find out how to extend data processing capabilities in Reporting Services by customizing report data, notification mechanisms, and security systems.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: extensions
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "SQL Server Reporting Services, extending"
  - "extensions [Reporting Services], about extensions"
  - "SSIS, extending"
  - "Reporting Services, extending"
  - "extensions [Reporting Services]"
---
# Reporting Services extensions
  The modular architecture of  Reporting Services 
 is designed for extensibility. A managed code API is available so that you can easily develop, install, and manage extensions consumed by many  Reporting Services 
 components. You can create private or shared assemblies using the  Microsoft 
  .NET Framework 
 and add new  Reporting Services 
 functionality to meet your evolving business needs.  
  
 The unique extensibility architecture of  Reporting Services 
 enables developers to extend specific features of the product and its components. Currently, broad support exists for extending the data processing capabilities of  Reporting Services 
. The data processing API includes familiar,  .NET Framework 
 data provider constructs and conventions that enable developers to build additional data processing into  Reporting Services 
. These data processing extensions add functionality to both the Report Server and Report Designer, enabling seamless integration of custom data into reports.  
  
 Another supported extension is the delivery extension. The delivery API is fully integrated with the  .NET Framework 
 architecture, enabling a wide variety of delivery mechanisms to be used when sending report notifications to users. You can extend the Report Server to provide custom delivery to users and you can extend the subscription management pages of Report Manager to enable subscriptions that use custom delivery extensions.  
  
 Another report server extension, Report Definition Customization Extension (RDCE), can dynamically customize a report definition before it is passed to the processing engine. You might customize reports based on factors such as users or languages. For example, you might want to implement different views for various users such as managers or members of a department, or you might want to customize a report to have a different layout when it is rendered in French or Arabic.  
  
## In this section  
 [Security considerations for extensions](security-considerations-for-extensions.md)  
 Describes security issues related to developing and deploying  Reporting Services 
 extensions.  
  
 [Implementing a data processing extension](data-processing/implementing-a-data-processing-extension.md)  
 Describes the requirements and steps for implementing a data processing extension for  Reporting Services 
.  
  
 [Implementing a delivery extension](delivery-extension/implementing-a-delivery-extension.md)  
 Describes the requirements and steps for implementing a delivery extension for  Reporting Services 
.  
  
 [Implementing a rendering extension](rendering-extension/implementing-a-rendering-extension.md)  
 Contains an introduction to developing rendering extensions.  
  
 [Implementing a security extension](security-extension/implementing-a-security-extension.md)  
 Describes the requirements and steps for implementing a  Reporting Services 
 security extension.  
  
 [Reporting Services extension library](reporting-services-extension-library.md)  
 Contains the programming reference for the extension API library for the  Reporting Services 
 extensibility features.
