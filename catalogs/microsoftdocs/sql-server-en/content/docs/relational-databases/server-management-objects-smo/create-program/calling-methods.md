---
title: "Calling Methods"
description: "Calling Methods"
author: "markingmyname"
ms.author: "maghan"
ms.date: "08/06/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "methods [SMO]"
  - "calling methods"
  - "SQL Server Management Objects, method calling"
  - "SMO [SQL Server], method calling"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Calling Methods


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Methods perform specific tasks related to the object, such as issuing a **Checkpoint** on a database or requesting an enumerated list of logons for the instance of  Microsoft 
  SQL Server 
.  
  
 Methods perform an operation on an object. Methods can take parameters and often have a return value. The return value can be a simple data type, a complex object, or a structure that contains many members.  
  
 Use exception handling to detect whether the method has been successful. For more information, see [Handling SMO Exceptions](handling-smo-exceptions.md).  
  
## Examples  
To use any code example that is provided, you will have to choose the programming environment, the programming template, and the programming language in which to create your application. For more information, see  [Create a Visual C# SMO Project in Visual Studio .NET](../how-to-create-a-visual-csharp-smo-project-in-visual-studio-net.md).  
 
  
## Using a Simple SMO Method in Visual Basic  
 In this example, the [Microsoft.SqlServer.Management.Smo.Database.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database.Create%252A) method takes no parameters and has no return value.  
  
```VBNET
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'Define a Database object variable by supplying the parent server and the database name arguments in the constructor.
Dim db As Database
db = New Database(srv, "Test_SMO_Database")
'Call the Create method to create the database on the instance of SQL Server. 
db.Create()
```
  
## Using a Simple SMO Method in Visual C#  
 In this example, the [Microsoft.SqlServer.Management.Smo.Database.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database.Create%252A) method takes no parameters and has no return value.  
  
```csharp  
{   
//Connect to the local, default instance of SQL Server.   
Server srv;   
srv = new Server();   
//Define a Database object variable by supplying the parent server and the database name arguments in the constructor.   
Database db;   
db = new Database(srv, "Test_SMO_Database");   
//Call the Create method to create the database on the instance of SQL Server.   
db.Create();   
}
```  
  
## Using an SMO Method with a Parameter in Visual Basic  
 The [Microsoft.SqlServer.Management.Smo.Table](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Table) object has a method called [Microsoft.SqlServer.Management.Smo.Table.RebuildIndexes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Table.RebuildIndexes%252A). This method requires a numeric parameter that specifies the **FillFactor**.  
  
```VBNET
Dim srv As Server  
srv = New Server  
Dim tb As Table  
tb = srv.Databases("AdventureWorks2022").Tables("Employee", "HumanResources")  
tb.RebuildIndexes(70)  
```  
  
## Using an SMO Method with a Parameter in Visual C#  
 The [Microsoft.SqlServer.Management.Smo.Table](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Table) object has a method called [Microsoft.SqlServer.Management.Smo.Table.RebuildIndexes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Table.RebuildIndexes%252A). This method requires a numeric parameter that specifies the `FillFactor`.  
  
```csharp  
{   
Server srv = default(Server);   
srv = new Server();   
Table tb = default(Table);   
tb = srv.Databases("AdventureWorks2022").Tables("Employee", "HumanResources");   
tb.RebuildIndexes(70);   
}   
```  
  
## Using an Enumeration Method that Returns a DataTable Object in Visual Basic  
 This section describes how to call an enumeration method and how to handle the data in the returned [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object.  
  
 The [Microsoft.SqlServer.Management.Smo.Server.EnumCollations%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.EnumCollations%252A) method returns a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object, which requires further navigation to access all available collation information about the instance of  SQL Server 
.  
  
```VBNET
'Connect to the local, default instance of SQL Server.  
Dim srv As Server  
srv = New Server  
'Call the EnumCollations method and return collation information to DataTable variable.  
Dim d As DataTable  
'Select the returned data into an array of DataRow.  
d = srv.EnumCollations  
'Iterate through the rows and display collation details for the instance of SQL Server.  
Dim r As DataRow  
Dim c As DataColumn  
For Each r In d.Rows  
    Console.WriteLine("==")  
    For Each c In r.Table.Columns  
        Console.WriteLine(c.ColumnName + " = " + r(c).ToString)  
    Next  
Next  
```  
  
## Using an Enumeration Method that Returns a DataTable Object in Visual C#  
 This section describes how to call an enumeration method and how to handle the data in the returned [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object.  
  
 The [Microsoft.SqlServer.Management.Smo.Server.EnumCollations%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.EnumCollations%252A) method returns a system [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object. The [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object requires further navigation to access all available collation information about the instance of  SQL Server 
.  
  
```csharp  
//Connect to the local, default instance of SQL Server.   
{   
Server srv = default(Server);   
srv = new Server();   
//Call the EnumCollations method and return collation information to DataTable variable.   
DataTable d = default(DataTable);   
//Select the returned data into an array of DataRow.   
d = srv.EnumCollations;   
//Iterate through the rows and display collation details for the instance of SQL Server.   
DataRow r = default(DataRow);   
DataColumn c = default(DataColumn);   
foreach ( r in d.Rows) {   
  Console.WriteLine("=========");   
  foreach ( c in r.Table.Columns) {   
    Console.WriteLine(c.ColumnName + " = " + r(c).ToString);   
  }   
}   
}   
```  
  
## Constructing an Object in Visual Basic  
 The constructor of any object can be called by using the **New** operator. The [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) object constructor is overloaded and the version of the [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) object constructor that is used in the sample takes two parameters: the parent [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object to which the database belongs, and a string that represents the name of the new database.  
  
```VBNET
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'Declare and define a Database object by supplying the parent server and the database name arguments in the constructor.
Dim d As Database
d = New Database(srv, "Test_SMO_Database")
'Create the database on the instance of SQL Server.
d.Create()
Console.WriteLine(d.Name)
```
  
## Constructing an Object in Visual C#  
 The constructor of any object can be called by using the **New** operator. The [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) object constructor is overloaded and the version of the [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) object constructor that is used in the sample takes two parameters: the parent [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object to which the database belongs, and a string that represents the name of the new database.  
  
```csharp  
{   
Server srv;   
srv = new Server();   
Table tb;   
tb = srv.Databases("AdventureWorks2022").Tables("Employee", "HumanResources");   
tb.RebuildIndexes(70);   
//Connect to the local, default instance of SQL Server.   
Server srv;   
srv = new Server();   
//Declare and define a Database object by supplying the parent server and the database name arguments in the constructor.   
Database d;   
d = new Database(srv, "Test_SMO_Database");   
//Create the database on the instance of SQL Server.   
d.Create();   
Console.WriteLine(d.Name);   
}  
```  
  
## Copying an SMO Object in Visual Basic  
 This code example uses the [Microsoft.SqlServer.Management.Common.ServerConnection.Copy%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection.Copy%252A) method to create a copy of the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object. The [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object represents a connection to an instance of  SQL Server 
.  
  
```VBNET  
'Connect to the local, default instance of SQL Server.
Dim srv1 As Server
srv1 = New Server()
'Modify the default database and the timeout period for the connection.
srv1.ConnectionContext.DatabaseName = "AdventureWorks2022"
srv1.ConnectionContext.ConnectTimeout = 30
'Make a second connection using a copy of the ConnectionContext property and verify settings.
Dim srv2 As Server
srv2 = New Server(srv1.ConnectionContext.Copy)
Console.WriteLine(srv2.ConnectionContext.ConnectTimeout.ToString)
```
  
## Copying an SMO Object in Visual C#  
 This code example uses the [Microsoft.SqlServer.Management.Common.ServerConnection.Copy%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection.Copy%252A) method to create a copy of the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object. The [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object represents a connection to an instance of  SQL Server 
.  
  
```csharp  
{   
//Connect to the local, default instance of SQL Server.   
Server srv1;   
srv1 = new Server();   
//Modify the default database and the timeout period for the connection.   
srv1.ConnectionContext.DatabaseName = "AdventureWorks2022";   
srv1.ConnectionContext.ConnectTimeout = 30;   
//Make a second connection using a copy of the ConnectionContext property and verify settings.   
Server srv2;   
srv2 = new Server(srv1.ConnectionContext.Copy);   
Console.WriteLine(srv2.ConnectionContext.ConnectTimeout.ToString);   
}  
```  
  
## Monitoring Server Processes in Visual Basic  
 You can obtain the current status type information about the instance of  SQL Server 
 through enumeration methods. The code example uses the [Microsoft.SqlServer.Management.Smo.Server.EnumProcesses%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.EnumProcesses%252A) method to discover information about the current processes. It also demonstrates how to work with the columns and rows in the returned [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object.  
  
```VBNET
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'Call the EnumCollations method and return collation information to DataTable variable.
Dim d As DataTable
'Select the returned data into an array of DataRow.
d = srv.EnumProcesses
'Iterate through the rows and display collation details for the instance of SQL Server.
Dim r As DataRow
Dim c As DataColumn
For Each r In d.Rows
    Console.WriteLine("============================================")
    For Each c In r.Table.Columns
        Console.WriteLine(c.ColumnName + " = " + r(c).ToString)
    Next
Next
```
  
## Monitoring Server Processes in Visual C#  
 You can obtain the current status type information about the instance of  SQL Server 
 through enumeration methods. The code example uses the [Microsoft.SqlServer.Management.Smo.Server.EnumProcesses%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.EnumProcesses%252A) method to discover information about the current processes. It also demonstrates how to work with the columns and rows in the returned [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object.  
  
```csharp  
//Connect to the local, default instance of SQL Server.   
{   
Server srv = default(Server);   
srv = new Server();   
//Call the EnumCollations method and return collation information to DataTable variable.   
DataTable d = default(DataTable);   
//Select the returned data into an array of DataRow.   
d = srv.EnumProcesses;   
//Iterate through the rows and display collation details for the instance of SQL Server.   
DataRow r = default(DataRow);   
DataColumn c = default(DataColumn);   
foreach ( r in d.Rows) {   
  Console.WriteLine("=====");   
  foreach ( c in r.Table.Columns) {   
    Console.WriteLine(c.ColumnName + " = " + r(c).ToString);   
  }   
}   
}   
```  
  
## Related content

- [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server)
- [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection)
