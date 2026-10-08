---
title: "Implement a delivery extension"
description: Read an overview of how you can extend the functionality of delivery in Reporting Services by implementing a custom delivery extension.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: extensions
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "delivery [Reporting Services]"
  - "custom delivery extensions [Reporting Services]"
  - "extensions [Reporting Services], delivery"
  - "delivery extensions [Reporting Services]"
---
# Implement a delivery extension
   SQL Server 
  Reporting Services 
 enables users to create and publish reports that, once created and published, can be delivered to various locations. In addition,  Reporting Services 
 includes several delivery extensions and a delivery API that enable developers to create more delivery extensions to further extend the functionality of delivery in  Reporting Services 
.  
  
 For a sample implementation of a delivery extension, see [SQL Server Reporting Services Product Samples](https://go.microsoft.com/fwlink/?LinkId=177889).  
  
## In this section  
 [Delivery extensions overview](delivery-extensions-overview.md)  
 Introduces how to write a custom delivery extension for  Reporting Services 
.  
  
 [Prepare to implement a delivery extension](preparing-to-implement-a-delivery-extension.md)  
 Describes the interfaces and classes available when implementing an  Reporting Services 
 delivery extension and issues to consider before implementation.  
  
 [Create a delivery extension library](creating-a-delivery-extension-library.md)  
 Describes assigning a namespace for your  Reporting Services 
 delivery extension and compiling your delivery extension into a library DLL.  
  
 [Implement the IDeliveryExtension interface for a delivery extension](implementing-the-ideliveryextension-interface-for-a-delivery-extension.md)  
 Describes the attributes of a delivery extension and how to implement your own delivery extension class.  
  
 [Use a Notification class for a delivery extension](using-a-notification-class-for-a-delivery-extension.md)  
 Describes the attributes of a **Notification** class and how to use it in your delivery extension implementation.  
  
 [Use the Setting class for a delivery extension](using-the-setting-class-for-a-delivery-extension.md)  
 Describes the attributes of a **Setting** class and how to use it in your delivery extension implementation.  
  
 [Use the Report class for a delivery extension](using-the-report-class-for-a-delivery-extension.md)  
 Describes the attributes of a **Report** class and how to use it in your delivery extension implementation.  
  
 [Use the RenderedOutputFile class for a delivery extension](using-the-renderedoutputfile-class-for-a-delivery-extension.md)  
 Describes the attributes of a **RenderedOutputFile** class and how to use it in your delivery extension implementation.  
  
 [Deploy a delivery extension](deploying-a-delivery-extension.md)  
 Describes how to deploy your delivery extension.  
  
 [Debug delivery extension code](debugging-delivery-extension-code.md)  
 Describes how to debug code in your delivery extension.  
  
 [Remove a delivery extension](removing-a-delivery-extension.md)  
 Describes how to remove a delivery extension from a report server.  
  
## Related content

- [Reporting Services extensions](../reporting-services-extensions.md)
- [Reporting Services extension library](../reporting-services-extension-library.md)
