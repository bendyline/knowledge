---
title: "Connect to Azure SQL Database"
description: "Connecting to an Azure SQL Database Using SQL Server Native Client"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
---
# Connecting to an Azure SQL Database Using SQL Server Native Client

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:** 
> [SQL Server Native Client](../sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


  For a sample that shows how to connect to a  Azure SQL Database 
 using  SQL Server 
 Native Client, see [Development: How-to Topics (Azure SQL Database)](https://learn.microsoft.com/previous-versions/azure/ee621787\(v=azure.100\)).  
  
## Known Issues When Connecting to a SQL Database  
 The following are known issues when connecting to a  SQL Database
 using  SQL Server 
 Native Client:  
  
-   A connection made with **SQLBrowseConnect** may be rejected if **SQLBrowseConnect** is used in stages.  For example, if the driver name is sent in the first call, server and credentials (user and password) sent in the second call, establishing the connection, and a database name and a language in the third call.  The third call will cause  SQL Server 
 Native Client to issue a USE statement to change databases. However, the USE statement is not supported in  SQL Database
, generating the following error:  
  
    ```  
    [Microsoft][SQL Server Native Client 11.0][SQL Server]USE statement is not supported to switch between databases. Use a new connection to connect to a different Database.  
    ```  
  
## Related content

- [Building Applications with SQL Server Native Client](building-applications-with-sql-server-native-client.md)
