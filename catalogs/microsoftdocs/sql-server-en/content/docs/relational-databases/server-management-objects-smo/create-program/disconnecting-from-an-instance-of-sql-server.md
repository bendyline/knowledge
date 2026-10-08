---
title: "Disconnecting from an Instance of SQL Server"
description: "Disconnecting from an Instance of SQL Server"
author: "markingmyname"
ms.author: "maghan"
ms.date: "08/06/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "SQL Server Management Objects, disconnecting"
  - "SMO [SQL Server], disconnecting"
  - "instances of SQL Server, disconnecting"
  - "disconnecting [SMO]"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Disconnecting from an Instance of SQL Server

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Manually closing and disconnecting  SQL Server 
 Management Objects (SMO) objects is not required. Connections are opened and closed as required.  
  
## Connection Pooling  
 When the [Connect](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms199449\(v=sql.120\)) method is called, the connection is not automatically released. The [Disconnect](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms199428\(v=sql.120\)) method must be called explicitly to release the connection to the connection pool. Also, you can request a non-pooled connection. You do this by setting the [NonPooledConnection](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms214357\(v=sql.120\)) property of the [Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%252A) property that references the [ServerConnection](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms218641\(v=sql.120\)) object.  
  
## Disconnecting from an Instance of SQL Server for RMO  
 Closing server connections when you are programming with RMO works slightly different from SMO.  
  
 Because the server connection for an RMO object is maintained by the [ServerConnection](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms218641\(v=sql.120\)) object, this object is also used when disconnecting from an instance of  Microsoft 
  SQL Server 
 when you program by using RMO. To close a connection by using the [ServerConnection](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms218641\(v=sql.120\)) object, call the [Disconnect](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms199428\(v=sql.120\)) method of the RMO object. After the connection has been closed, RMO objects cannot be used.  
  
## Example  
To use any code example that is provided, you will have to choose the programming environment, the programming template, and the programming language in which to create your application. For more information, see [Create a Visual C# SMO Project in Visual Studio .NET](../how-to-create-a-visual-csharp-smo-project-in-visual-studio-net.md).  
 
  
## Closing and Disconnecting an SMO Object in Visual Basic  
 This code example shows how to request a non-pooled connection by setting the [NonPooledConnection](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms214357\(v=sql.120\)) property of the [Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%252A) object property.  
  
```VBNET
Dim srv As Server
srv = New Server
'Disable automatic disconnection.
srv.ConnectionContext.AutoDisconnectMode = AutoDisconnectMode.NoAutoDisconnect
'Connect to the local, default instance of SQL Server.
srv.ConnectionContext.Connect()
'The actual connection is made when a property is retrieved.
Console.WriteLine(srv.Information.Version)
'Disconnect explicitly.
srv.ConnectionContext.Disconnect()
```
  
## Closing and Disconnecting an SMO Object in Visual C#  
 This code example shows how to request a non-pooled connection by setting the [NonPooledConnection](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms214357\(v=sql.120\)) property of the [Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%252A) object property.  
  
```csharp  
{   
Server srv;   
srv = new Server();   
//Disable automatic disconnection.   
srv.ConnectionContext.AutoDisconnectMode = AutoDisconnectMode.NoAutoDisconnect;   
//Connect to the local, default instance of SQL Server.   
srv.ConnectionContext.Connect();   
//The actual connection is made when a property is retrieved.   
Console.WriteLine(srv.Information.Version);   
//Disconnect explicitly.   
srv.ConnectionContext.Disconnect();  
}  
```  
  
## Related content

- [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server)
- [ServerConnection](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms218641\(v=sql.120\))
