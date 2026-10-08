---
title: "Implement a data processing extension"
description: Find out how to create a bridge between a data source and a dataset in Reporting Services by implementing a data processing extension.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: extensions
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "custom data processing extensions [Reporting Services]"
  - "data sources [Reporting Services], data processing extensions"
  - "data processing extensions [Reporting Services]"
  - "extensions [Reporting Services], data processing"
---
# Implement a data processing extension
  Data processing extensions in  Reporting Services 
 enable you to connect to a data source and retrieve data. They also serve as a bridge between a data source and a dataset.  Reporting Services 
 data processing extensions are modeled after a subset of the  Microsoft 
  .NET Framework 
 data provider interfaces.  
  
## In this section  
 [Data processing extensions overview](data-processing-extensions-overview.md)  
 Introduces how to write a custom data processing extension for  Reporting Services 
.  
  
 [Prepare to implement a data processing extension](preparing-to-implement-a-data-processing-extension.md)  
 Describes the interfaces available when implementing an  Reporting Services 
 data processing extension, and when you're required to implement a particular interface.  
  
 [Create a data processing extension library](creating-a-data-processing-extension-library.md)  
 Describes assigning a namespace for your  Reporting Services 
 data processing extension and compiling your data processing extension into a library DLL.  
  
 [Implement a Connection class for a data processing extension](implementing-a-connection-class-for-a-data-processing-extension.md)  
 Describes the attributes of a connection and how to implement your own **Connection** class for your data processing extension.  
  
 [Implement a Command class for a data processing extension](implementing-a-command-class-for-a-data-processing-extension.md)  
 Describes the attributes of a command, and how to implement your own **Command** class for your data processing extension.  
  
 [Implement a DataReader class for a data processing extension](implementing-a-datareader-class-for-a-data-processing-extension.md)  
 Describes the attributes of a data reader and how to implement your own **DataReader** class for your data processing extension.  
  
 [Use an external dataset with Reporting Services](using-an-external-dataset-with-reporting-services.md)  
 Describes how to expose your custom **DataSet** objects to the report server for consumption.  
  
 [Deploy a data processing extension](deploying-a-data-processing-extension.md)  
 Describes how to deploy your data processing extension.  
  
 [Debug data processing extension code](debugging-data-processing-extension-code.md)  
 Describes how to debug code in your data processing extensions.  
  
 For a sample of a fully implemented data processing extension, see [SQL Server Reporting Services Product Samples](https://go.microsoft.com/fwlink/?LinkId=177889).  
  
## Related content

- [Reporting Services extensions](../reporting-services-extensions.md)
- [Reporting Services extension library](../reporting-services-extension-library.md)
