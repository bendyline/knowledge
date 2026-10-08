---
title: "Data processing extensions overview"
description: See which data processing extensions are included with Reporting Services, and learn how to add custom data processing to your report server.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: extensions
ms.topic: reference
helpviewer_keywords:
  - "data processing extensions [Reporting Services], about extensions"
ms.custom:
  - updatefrequency5
  - sfi-image-nochange
---
# Data processing extensions overview
  Data processing extensions in  Reporting Services 
 enable you to connect to a data source and retrieve data. They also serve as a bridge between a data source and a dataset.  Reporting Services 
 data processing extensions are modeled after a subset of the  Microsoft 
  .NET Framework 
 data provider interfaces.  
  
 The following table lists the data processing extensions included with  Reporting Services 
.  
  
| Data processing extension | Description |
| --- | --- |
| Data processing extension for  SQL Server |
| Uses the .NET Framework Data Provider for SQL Server to connect to and retrieve data from the  SQL Server Database Engine |
| . |
| Data processing extension for OLE DB | Uses the .NET Framework Data Provider for OLE DB. With this extension, the report server can query any data source that has an OLE DB provider. |
| Data processing extension for Oracle | Uses the .NET Framework Data Provider for Oracle. With this extension, the report server can access Oracle data sources through Oracle client connectivity software. |
| Data processing extension for ODBC | Uses the .NET Framework Data Provider for ODBC. With this extension, the report server can access data in any database for which there's an ODBC driver. |
  
 You can use the SSRS
 data processing API to add custom data processing to your report server.  
  
> **Note:**  
>   Reporting Services 
 has built-in support for data providers in the  .NET Framework 
. If you have already implemented a full data provider, you do not need to implement a  Reporting Services 
 data processing extension. However, you should consider extending your data provider to include functionality specific to  Reporting Services 
 2005, which includes secure connection credentials and server-side aggregates.  
  
 Each of the data processing extensions included with  Reporting Services 
 uses a common set of interfaces. These common interfaces ensure that each extension implements comparable functionality.  
  
 You can develop data processing extensions for your own data sources, or you can use the interfaces to add another layer of data processing to common database infrastructures. You can deploy your custom data processing extensions to enable seamless integration of data into the existing report servers in your organization. You can also use them as part of a custom reporting suite that you provide to your consumers.  

Screenshot of the Reporting Services data processing extension architecture.
Reporting Services data processing extension architecture  
  
 The advantages to implementing a custom  Reporting Services 
 data processing extension include:  
  
-   A simplified data access architecture, often with better maintainability and improved performance.  
  
-   The ability to directly expose extension-specific functionality to consumers.  
  
-   A specific interface for your consumers to access your data source within  Reporting Services 
.  
  
## Data extension process flow  
 Before developing your custom data extension, you should understand how the report server uses data extensions to process data. You should also understand the constructors and methods that are called by the report server.  

Screenshot of the step-by-step process flow of a data extension that is called by the report server.
  
 The illustration shows the following sequence of events:  
  
1.  The report server creates a connection object and passes in the connection string and credentials associated with the report.  
  
2.  The command text of the report is used to create a command object. In the process, the data processing extension might include code that parses the command text and creates any parameters for the command.  
  
3.  Once the command object and any parameters are processed, a data reader is generated that returns a result set and enables the report server to associate the report data with the report layout.  
  
## Developer requirements  
 Developing a  Reporting Services 
 data processing extension requires you to have:  
  
-   A deployment computer with Report Designer or a report server installed.  
  
-   A development computer with  Microsoft 
  Visual Studio 2005 
 or greater, or the  Microsoft 
  .NET Framework 
 Software Development Kit (SDK) installed.  
  
-   An in-depth understanding of  Reporting Services 
 features and capabilities.  
  
-   An in-depth understanding of  Microsoft 
  ADO.NET 
 architecture,  .NET Framework 
 data providers, ADO.NET DataSet objects, and the common  ADO.NET 
 interfaces.  
  
-   Development experience in a  .NET Framework 
 language such as  Microsoft 
 Visual C# or  Microsoft 
  Visual Basic  .NET.  
  
## Related content

- [Reporting Services extensions](../reporting-services-extensions.md)
- [Reporting Services extension library](../reporting-services-extension-library.md)
