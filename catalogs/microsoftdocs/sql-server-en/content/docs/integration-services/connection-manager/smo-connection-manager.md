---
title: "SMO Connection Manager"
description: "SMO Connection Manager"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.dts.designer.smoconnection.f1"
helpviewer_keywords:
  - "connections [Integration Services], SMO"
  - "SMO connection manager"
  - "connection managers [Integration Services], SMO"
---
# SMO Connection Manager


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  An SMO connection manager enables a package to connect to a SQL Management Object (SMO) server. The transfer tasks that  SQL Server 
  Integration Services 
 includes use an SMO connection manager. For example, the Transfer Logins task that transfers  SQL Server 
 logins uses an SMO connection manager.  
  
 When you add an SMO connection manager to a package,  Integration Services 
 creates a connection manager that will resolve to an SMO connection at run time, sets the connection manager properties, and adds the connection manager to the **Connections** collection on the package. The **ConnectionManagerType** property of the connection manager is set to **SMOServer**.  
  
 You can configure an SMO connection manager in the following ways:  
  
-   Specify the name of a server on which  SQL Server 
 is installed.  
  
-   Select the authentication mode for connecting to the server.  
  
## Configuration of the SMO Connection Manager  
 You can set properties through  SSIS 
 Designer or programmatically.  
 
 For information about configuring a connection manager programmatically, see [Microsoft.SqlServer.Dts.Runtime.ConnectionManager](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManager) and [Adding Connections Programmatically](../building-packages-programmatically/adding-connections-programmatically.md).  
  
## SMO Connection Manager Editor
  Use the **SMO Connection Manager Editor** to configure a  SQL Server 
 connection for use by the various tasks that transfer  SQL Server 
 objects.  
  
 To learn more about the SMO connection manager, see [SMO Connection Manager](#smo-connection-manager).  
  
### Options  
 **Server name**  
 Type the name of the  SQL Server 
 instance or select the server name from the list.  
  
 **Refresh**  
 Refresh the list of available  SQL Server 
 instances that can be detected on the network.  
  
 **Use Windows Authentication**  
 Use Windows Authentication to connect to the selected  SQL Server 
 instance.  
  
 **Use SQL Server Authentication**  
 Use  SQL Server 
 Authentication to connect to the selected  SQL Server 
 instance.  
  
 **User name**  
 If you have selected  SQL Server 
 authentication, enter the  SQL Server 
 user name.  
  
 **Password**  
 If you have selected  SQL Server 
 authentication, enter the password.  
  
 **Test Connection**  
 Test the connection as configured.  
  
## Related content

- [Integration Services (SSIS) Connections](integration-services-ssis-connections.md)
