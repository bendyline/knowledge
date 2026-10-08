---
title: "Prepare to implement a delivery extension"
description: Discover how to implement a delivery extension in Reporting Services. Learn about available interfaces and classes and required and optional functionality.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: extensions
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "interfaces [Reporting Services]"
  - "delivery extensions [Reporting Services], implementing"
---
# Prepare to implement a delivery extension
  Before you implement your  Reporting Services 
 delivery extension, you should define the interfaces to implement. You first need to decide how to use your delivery extension, what settings your delivery extension requires, and the specific functionality you need to implement in order to deliver report notifications.  
  
 Each  Reporting Services 
 delivery extension must provide the following functionality:  
  
-   An [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension) interface implementation that represents the extension and a localized extension name.  
  
-   An [Microsoft.ReportingServices.Interfaces.IDeliveryExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IDeliveryExtension) implementation that creates a delivery extension that can be used to deliver report notifications to end users.  
  
-   The ability to process specific user data for a subscription.  
  
 Each delivery extension can be enhanced to include the following functionality:  
  
-   An  ASP.NET 
 user control implementation that enables end users to use Report Manager to create report subscriptions that use the delivery extension.  
  
 The following table describes the available interfaces and classes for delivery extensions.  
  
| Interface or class | Description |
| --- | --- |
| [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension) Interface | Represents an extension in  Reporting Services |
| . |
| [Microsoft.ReportingServices.Interfaces.IDeliveryExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IDeliveryExtension) Interface | Represents a delivery extension in  Reporting Services |
| . |
| [Microsoft.ReportingServices.Interfaces.IDeliveryReportServerInformation](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IDeliveryReportServerInformation) Interface | Contains information about the report server that delivery extensions require (for example, a list of the available rendering extensions). |
| [Microsoft.ReportingServices.Interfaces.Setting](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.Setting) Class | Represents a setting for an extension. |
| [Microsoft.ReportingServices.Interfaces.Notification](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.Notification) Class | Contains subscription information that delivery extensions use to deliver reports. |
| [Microsoft.ReportingServices.Interfaces.Report](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.Report) Class | Represents report-specific information and methods that enable delivery extensions to deliver reports to users. |
| [Microsoft.ReportingServices.Interfaces.RenderedOutputFile](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.RenderedOutputFile) Class | Represents the output from a rendering extension. A [Microsoft.ReportingServices.Interfaces.RenderedOutputFile](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.RenderedOutputFile) object contains the associated file name and type information the delivery extension requires in order to process the stream returned by the rendering extension. |
| [Microsoft.ReportingServices.Interfaces.ISubscriptionBaseUIUserControl](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.ISubscriptionBaseUIUserControl) Interface | A user control that represents the means to retrieve delivery extension-specific subscription information from the user in Report Manager (for example, an e-mail address or the path to a file share). |
  
## Related content

- [Reporting Services extensions](../reporting-services-extensions.md)
- [Implement a delivery extension](implementing-a-delivery-extension.md)
- [Reporting Services extension library](../reporting-services-extension-library.md)
