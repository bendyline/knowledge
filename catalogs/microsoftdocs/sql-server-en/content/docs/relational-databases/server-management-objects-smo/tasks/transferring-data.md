---
title: "Transferring Data"
description: "Transferring Data"
author: "markingmyname"
ms.author: "maghan"
ms.date: "08/06/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "data transfers [SMO]"
  - "transferring data"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Transferring Data

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  The [Microsoft.SqlServer.Management.Smo.Transfer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Transfer) class is a utility class that provides tools to transfer objects and data.  
  
 Objects in the database schema are transferred by executing a generated script on the target server. [Microsoft.SqlServer.Management.Smo.Table](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Table) data is transferred with a dynamically created DTS package.  
  
 The [Microsoft.SqlServer.Management.Smo.Transfer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Transfer) object uses the [SQLBulkCopy](https://learn.microsoft.com/dotnet/api/system.data.sqlclient.sqlbulkcopy) API to transfer data. Also, the methods and properties that are used to perform data transfers reside on the [Microsoft.SqlServer.Management.Smo.Transfer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Transfer) object instead of the [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) object. Moving functionality from the instance classes to utility classes is consistent with a lighter object model because the code for specific tasks is loaded only when it is required.  
  
 The [Microsoft.SqlServer.Management.Smo.Transfer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Transfer) object does not support data transfers to a target database that has a [Microsoft.SqlServer.Management.Smo.Database.CompatibilityLevel%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database.CompatibilityLevel%252A) less than the version of the instance of  SQL Server 
.  
  
## Example  
To use any code example that is provided, you will have to choose the programming environment, the programming template, and the programming language in which to create your application. For more information, see [Create a Visual C# SMO Project in Visual Studio .NET](../how-to-create-a-visual-csharp-smo-project-in-visual-studio-net.md).  
 
  
## Transferring Schema and Data from One Database to Another in Visual Basic  
 This code example shows how to transfer schema and data from one database to another using the [Microsoft.SqlServer.Management.Smo.Transfer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Transfer) object.  
  
```VBNET
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'Reference the AdventureWorks2022 database
Dim db As Database
db = srv.Databases("AdventureWorks2022")
'Create a new database that is to be destination database.
Dim dbCopy As Database
dbCopy = New Database(srv, "AdventureWorks2022Copy")
dbCopy.Create()
'Define a Transfer object and set the required options and properties.
Dim xfr As Transfer
xfr = New Transfer(db)
xfr.CopyAllTables = True
xfr.Options.WithDependencies = True
xfr.Options.ContinueScriptingOnError = True
xfr.DestinationDatabase = "AdventureWorks2022Copy"
xfr.DestinationServer = srv.Name
xfr.DestinationLoginSecure = True
xfr.CopySchema = True
'Script the transfer. Alternatively perform immediate data transfer with TransferData method.
xfr.ScriptTransfer()
```
  
## Transferring Schema and Data from One Database to Another in Visual C#  
 This code example shows how to transfer schema and data from one database to another using the [Microsoft.SqlServer.Management.Smo.Transfer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Transfer) object.  
  
```csharp  
{  
            Server srv;  
            srv = new Server();  
            //Reference the AdventureWorks2022 database   
            Database db;  
            db = srv.Databases["AdventureWorks2022"];  
            //Create a new database that is to be destination database.   
            Database dbCopy;  
            dbCopy = new Database(srv, "AdventureWorks2022Copy");  
            dbCopy.Create();  
            //Define a Transfer object and set the required options and properties.   
            Transfer xfr;  
            xfr = new Transfer(db);  
            xfr.CopyAllTables = true;  
            xfr.Options.WithDependencies = true;  
            xfr.Options.ContinueScriptingOnError = true;  
            xfr.DestinationDatabase = "AdventureWorks2022Copy";  
            xfr.DestinationServer = srv.Name;  
            xfr.DestinationLoginSecure = true;  
            xfr.CopySchema = true;  
            //Script the transfer. Alternatively perform immediate data transfer   
            // with TransferData method.   
            xfr.ScriptTransfer();  
        }   
```  
  
## Transferring Schema and Data from One Database to Another in PowerShell  
 This code example shows how to transfer schema and data from one database to another using the [Microsoft.SqlServer.Management.Smo.Transfer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Transfer) object.  
  
```powershell  
#Connect to the local, default instance of SQL Server.  
  
#Get a server object which corresponds to the default instance  
$srv = New-Object -TypeName Microsoft.SqlServer.Management.SMO.Server  
  
#Reference the AdventureWorks2022 database.  
$db = $srv.Databases["AdventureWorks2022"]  
  
#Create a database to hold the copy of AdventureWorks  
$dbCopy = New-Object -TypeName Microsoft.SqlServer.Management.SMO.Database -argumentlist $srv, "AdventureWorksCopy"  
$dbCopy.Create()  
  
#Define a Transfer object and set the required options and properties.  
$xfr = New-Object -TypeName Microsoft.SqlServer.Management.SMO.Transfer -argumentlist $db  
  
#Set this objects properties  
$xfr.CopyAllTables = $true  
$xfr.Options.WithDependencies = $true  
$xfr.Options.ContinueScriptingOnError = $true  
$xfr.DestinationDatabase = "AdventureWorksCopy"  
$xfr.DestinationServer = $srv.Name  
$xfr.DestinationLoginSecure = $true  
$xfr.CopySchema = $true  
"Scripting Data Transfer"  
#Script the transfer. Alternatively perform immediate data transfer with TransferData method.  
$xfr.ScriptTransfer()  
```
