---
title: "Implement a Connection class for a data processing extension"
description: Implement a Connection object for a data processing extension in Reporting Services. See which interfaces to implement and what to require of clients.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: extensions
ms.topic: reference
helpviewer_keywords:
  - "connections [Reporting Services], data processing extensions"
  - "Connection class"
  - "data processing extensions [Reporting Services], connections"
ms.custom:
  - updatefrequency5
  - sfi-ropc-nochange
---
# Implement a Connection class for a data processing extension
  The **Connection** object represents a database connection or similar resource and is the starting point for users of a  SQL Server 
  Reporting Services 
 data processing extension. It represents connections to database servers, though any entity with similar behavior can be exposed as a **Connection**.  
  
 To implement a **Connection** object, create a class that implements [Microsoft.ReportingServices.DataProcessing.IDbConnection](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing.IDbConnection) and optionally implements [Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension).  
  
 In your implementation, you must ensure that a connection is created and opened before commands can be executed. Ensure that your implementation requires clients to open and close connections explicitly, rather than having your implementation open and close connections implicitly for the client. Perform your security checks when the connection is obtained. Requiring an existing connection for the other classes in your SSRS
 data processing extension ensures that security checks are always performed when working with your data source.  
  
 The properties of the desired connection are represented as a connection string. SSRS
 data processing extensions should support the [Microsoft.ReportingServices.DataProcessing.IDbConnection.ConnectionString%2A](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing.IDbConnection.ConnectionString%252A) property using the familiar name/value pair system defined by OLE DB.  
  
> **Note:**  
>  **Connection** objects are often resource-intensive to obtain, so you may want to consider pooling connections or other techniques to mitigate this.  
  
 [Microsoft.ReportingServices.DataProcessing.IDbConnection](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing.IDbConnection) inherits from [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension). You must implement the [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension) interface as part of your connection class implementation. The [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension) interface enables a class to implement a localized extension name and to process extension-specific configuration information stored in the  Reporting Services 
 configuration file.  
  
 Your **Connection** object contains the [Microsoft.ReportingServices.Interfaces.IExtension.LocalizedName%2A](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension.LocalizedName%252A) property through its implementation of [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension).  Reporting Services 
 data processing extensions should support the [Microsoft.ReportingServices.Interfaces.IExtension.LocalizedName%2A](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension.LocalizedName%252A) property. Support lets users encounter a familiar, localized name for the extension in a user interface, such as Report Manager.  
  
 [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension) also enables your **Connection** object to retrieve and process custom configuration data stored in the RSReportServer.config file. For more information about processing custom configuration data, see the [Microsoft.ReportingServices.Interfaces.IExtension.SetConfiguration%2A](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension.SetConfiguration%252A) method.  
  
 The class that implements [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension) isn't unloaded from memory when the rest of your data processing extension classes are unloaded. Because of this fact, you can use your **Extension** class to store cross-connection state information or to store data that can be cached in memory. Your **Extension** class remains in memory as long as the report server is running.  
  
 You can extend your **Connection** class to include support for credentials in  Reporting Services 
 by implementing [Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension). When you implement the [Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension.IntegratedSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension.IntegratedSecurity%252A), [Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension.UserName%2A](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension.UserName%252A), and [Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension.Password%2A](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension.Password%252A) properties of the [Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension) interface, you enable the **Integrated Security** check box and **Username** and **Password** text boxes of the **Data Source** dialog in Report Designer. This enables Report Designer to store and retrieve credentials for data sources that support authentication. The credentials are stored securely and used when rendering reports in preview mode.  
  
> **Note:**  
>  Implementing [Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing.IDbConnectionExtension) implicitly requires you to implement the members of the [Microsoft.ReportingServices.DataProcessing.IDbConnection](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.DataProcessing.IDbConnection) and [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension) interfaces.  
>   
>  For a sample **Connection** class implementation, see [Reporting Services Samples on CodePlex (SQL Server Reporting Services SSRS)](https://go.microsoft.com/fwlink/?LinkId=177889).  
  
## Related content

- [Reporting Services extensions](../reporting-services-extensions.md)
- [Implement a data processing extension](implementing-a-data-processing-extension.md)
- [Reporting Services extension library](../reporting-services-extension-library.md)
