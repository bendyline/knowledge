---
title: "Using Linked Servers in SMO"
description: "Using Linked Servers in SMO"
author: "markingmyname"
ms.author: "maghan"
ms.date: "08/06/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "linked servers [SQL Server], SMO"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Using Linked Servers in SMO

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  A linked server represents an OLE DB data source on a remote server. Remote OLE DB data sources are linked to the instance of  SQL Server 
 by using the [Microsoft.SqlServer.Management.Smo.LinkedServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.LinkedServer) object.  
  
 Remote database servers can be linked to the current instance of  Microsoft 
  SQL Server 
 by using an OLE DB Provider. In SMO, linked servers are represented by the [Microsoft.SqlServer.Management.Smo.LinkedServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.LinkedServer) object. The [Microsoft.SqlServer.Management.Smo.LinkedServer.LinkedServerLogins%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.LinkedServer.LinkedServerLogins%252A) property references a collection of [Microsoft.SqlServer.Management.Smo.LinkedServerLogin](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.LinkedServerLogin) objects. These store the logon credentials that are required to establish a connection with the linked server.  
  
## OLE-DB Providers  
 In SMO, installed OLE-DB providers are represented by a collection of [Microsoft.SqlServer.Management.Smo.OleDbProviderSettings](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.OleDbProviderSettings) objects.  
  
## Example  
 For the following code examples, you will have to select the programming environment, programming template and the programming language to create your application. For more information, see [Create a Visual C# SMO Project in Visual Studio .NET](../how-to-create-a-visual-csharp-smo-project-in-visual-studio-net.md).  
  
## Creating a link to an OLE-DB Provider Server in Visual C#  
 The code example shows how to create a link to a  SQL Server 
 OLE DB, heterogeneous data source by using the [Microsoft.SqlServer.Management.Smo.LinkedServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.LinkedServer) object. By specifying  SQL Server 
 as the product name, data is accessed on the linked server by using the  SQL Server 
 Client OLE DB Provider, which is the official OLE DB provider for  SQL Server 
.  
  
```csharp  
//Connect to the local, default instance of SQL Server.   
{   
   Server srv = new Server();   
   //Create a linked server.   
   LinkedServer lsrv = default(LinkedServer);   
   lsrv = new LinkedServer(srv, "OLEDBSRV");   
   //When the product name is SQL Server the remaining properties are   
   //not required to be set.   
   lsrv.ProductName = "SQL Server";   
   lsrv.Create();   
}   
```  
  
## Creating a link to an OLE-DB Provider Server in PowerShell  
 The code example shows how to create a link to a  SQL Server 
 OLE DB, heterogeneous data source by using the [Microsoft.SqlServer.Management.Smo.LinkedServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.LinkedServer) object. By specifying  SQL Server 
 as the product name, data is accessed on the linked server by using the  SQL Server 
 Client OLE DB Provider, which is the official OLE DB provider for  SQL Server 
.  
  
```powershell  
#Get a server object which corresponds to the default instance  
$svr = New-Object -TypeName Microsoft.SqlServer.Management.SMO.Server  
  
#Create a linked server object which corresponds to an OLEDB type of SQL Server product  
$lsvr = New-Object -TypeName Microsoft.SqlServer.Management.SMO.LinkedServer -argumentlist $svr,"OLEDBSRV"  
  
#When the product name is SQL Server the remaining properties are not required to be set.   
$lsvr.ProductName = "SQL Server"  
  
#Create the Database Object  
$lsvr.Create()   
```
