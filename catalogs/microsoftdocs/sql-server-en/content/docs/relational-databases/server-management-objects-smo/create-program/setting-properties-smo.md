---
title: "Setting Properties - SMO"
description: "Setting Properties - SMO"
author: "markingmyname"
ms.author: "maghan"
ms.date: "08/06/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "SMO [SQL Server], properties"
  - "SQL Server Management Objects, properties"
  - "properties [SMO]"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Setting Properties - SMO

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Properties are values that store descriptive information about the object. For example,  Microsoft 
  SQL Server 
 configuration options are represented by the [Microsoft.SqlServer.Management.Smo.Server.Configuration%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.Configuration%252A) object's properties. Properties can be accessed either directly or indirectly by using the property collection. Accessing properties directly uses the following syntax:  
  
 `objInstance.PropertyName`  
  
 A property value can be modified or retrieved depending on whether the property has read/write access or read-only access. It is also necessary to set certain properties before an object can be created. For more information, see the SMO reference for the particular object.  
  
> **Note:**  
>  Collections of child objects appear as the property of an object. For example, the **Tables** collection is a property of a **Server** object. For more information, see [Using Collections](using-collections.md).  
  
 The properties of an object are members of the Properties collection. The Properties collection can be used to iterate through every property of an object.  
  
 Sometimes a property is not available for the following reasons:  
  
-   The server version does not support the property, such as if you try to access a property that represents a new  SQL Server 
 feature on an older version of  SQL Server 
.  
  
-   The server does not provide data for the property, such as if you try to access a property that represents a  SQL Server 
 component that is not installed.  
  
 You can handle these circumstances by catching the [Microsoft.SqlServer.Management.Smo.UnknownPropertyException](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.UnknownPropertyException) and the [Microsoft.SqlServer.Management.Smo.PropertyCannotBeRetrievedException](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.PropertyCannotBeRetrievedException) SMO exceptions.  
  
## Setting Default Initialization Fields  
 SMO performs an optimization when retrieving objects. The optimization minimizes the number of properties loaded by automatically scaling between the following states:  
  
1.  Partially loaded. When an object is first referenced it has a minimum of properties available (such as Name and Schema).  
  
2.  Fully loaded. When any property is referenced, the remaining properties that are quick to load, are initialized and are made available.  
  
3.  Properties that use lots of memory. The remaining unavailable properties use lots of memory and have an [Microsoft.SqlServer.Management.Smo.Property.Expensive%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Property.Expensive%252A) property value of true (such as [Microsoft.SqlServer.Management.Smo.Database.DataSpaceUsage%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database.DataSpaceUsage%252A)). These properties are loaded only when specifically referenced.  
  
 If your application does fetch extra properties, besides the ones provided in the partially loaded state, it submits a query to retrieve these extra properties and scales up to the fully loaded state. This can cause unnecessary traffic between the client and server. More optimization can be achieved by calling the [Microsoft.SqlServer.Management.Smo.Server.SetDefaultInitFields%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.SetDefaultInitFields%252A) method. The [Microsoft.SqlServer.Management.Smo.Server.SetDefaultInitFields%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.SetDefaultInitFields%252A) method allows specification of the properties that are loaded when the object is initialized.  
  
 The [Microsoft.SqlServer.Management.Smo.Server.SetDefaultInitFields%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.SetDefaultInitFields%252A) method sets the property loading behavior for the rest of application or until it is reset. You can save the original behavior by using the [Microsoft.SqlServer.Management.Smo.Server.GetDefaultInitFields%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.GetDefaultInitFields%252A) method and restore it as required.  
  
## Examples  
To use any code example that is provided, you will have to choose the programming environment, the programming template, and the programming language in which to create your application. For more information, see [Create a Visual C# SMO Project in Visual Studio .NET](../how-to-create-a-visual-csharp-smo-project-in-visual-studio-net.md).  

  
## Getting and Setting a Property in Visual Basic  
 This code example shows how to get the [Microsoft.SqlServer.Management.Smo.Information.Edition%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Information.Edition%252A) property of the [Microsoft.SqlServer.Management.Smo.Information](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Information) object and how to set the [Microsoft.SqlServer.Management.Common.ServerConnection.SqlExecutionModes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection.SqlExecutionModes%252A) property of the [Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%252A) property to the **ExecuteSql** member of the [Microsoft.SqlServer.Management.Common.SqlExecutionModes](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.SqlExecutionModes) enumerated type.  
  
```VBNET
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'Get a property.
Console.WriteLine(srv.Information.Version)
'Set a property.
srv.ConnectionContext.SqlExecutionModes = SqlExecutionModes.ExecuteSql
```
  
## Getting and Setting a Property in Visual C#  
 This code example shows how to get the [Microsoft.SqlServer.Management.Smo.Information.Edition%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Information.Edition%252A) property of the [Microsoft.SqlServer.Management.Smo.Information](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Information) object and how to set the [Microsoft.SqlServer.Management.Common.ServerConnection.SqlExecutionModes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection.SqlExecutionModes%252A) property of the [Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%252A) property to the **ExecuteSql** member of the [Microsoft.SqlServer.Management.Common.SqlExecutionModes](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.SqlExecutionModes) enumerated type.  
  
```csharp  
{   
//Connect to the local, default instance of SQL Server.   
Server srv;   
srv = new Server();   
//Get a property.   
Console.WriteLine(srv.Information.Version);   
//Set a property.   
srv.ConnectionContext.SqlExecutionModes = SqlExecutionModes.ExecuteSql;   
}  
```  
  
## Setting Various Properties Before an Object is Created in Visual Basic  
 This code example shows how to directly set the [Microsoft.SqlServer.Management.Smo.Table.AnsiNullsStatus%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Table.AnsiNullsStatus%252A) property of the [Microsoft.SqlServer.Management.Smo.Table](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Table) object, and how to create and add columns before you create the [Microsoft.SqlServer.Management.Smo.Table](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Table) object.  
  
```VBNET
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'Create a new table in the AdventureWorks2022 database. 
Dim db As Database
db = srv.Databases("AdventureWorks2022")
Dim tb As Table
'Specify the parent database, table schema and the table name in the constructor.
tb = New Table(db, "Test_Table", "HumanResources")
'Add columns because the table requires columns before it can be created. 
Dim c1 As Column
'Specify the parent table, the column name and data type in the constructor.
c1 = New Column(tb, "ID", DataType.Int)
tb.Columns.Add(c1)
c1.Nullable = False
c1.Identity = True
c1.IdentityIncrement = 1
c1.IdentitySeed = 0
Dim c2 As Column
c2 = New Column(tb, "Name", DataType.NVarChar(100))
c2.Nullable = False
tb.Columns.Add(c2)
tb.AnsiNullsStatus = True
'Create the table on the instance of SQL Server.
tb.Create()
```
  
## Setting Various Properties Before an Object is Created in Visual C#  
 This code example shows how to directly set the [Microsoft.SqlServer.Management.Smo.Table.AnsiNullsStatus%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Table.AnsiNullsStatus%252A) property of the [Microsoft.SqlServer.Management.Smo.Table](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Table) object, and how to create and add columns before you create the [Microsoft.SqlServer.Management.Smo.Table](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Table) object.  
  
```csharp  
{   
//Connect to the local, default instance of SQL Server.   
Server srv;   
srv = new Server();   
//Create a new table in the AdventureWorks2022 database.   
Database db;   
db = srv.Databases["AdventureWorks2022"];   
Table tb;   
//Specify the parent database, table schema, and the table name in the constructor.   
tb = new Table(db, "Test_Table", "HumanResources");   
//Add columns because the table requires columns before it can be created.   
Column c1;   
//Specify the parent table, the column name, and data type in the constructor.   
c1 = new Column(tb, "ID", DataType.Int);   
tb.Columns.Add(c1);   
c1.Nullable = false;   
c1.Identity = true;   
c1.IdentityIncrement = 1;   
c1.IdentitySeed = 0;   
Column c2;   
c2 = new Column(tb, "Name", DataType.NVarChar(100));   
c2.Nullable = false;   
tb.Columns.Add(c2);   
tb.AnsiNullsStatus = true;   
//Create the table on the instance of SQL Server.   
tb.Create();   
}  
```  
  
## Iterating Through All Properties of an Object in Visual Basic  
 This code example iterates through the **Properties** collection of the [Microsoft.SqlServer.Management.Smo.StoredProcedure](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.StoredProcedure) object and displays them on the  Visual Studio 
 Output screen.  
  
 In the example, the [Microsoft.SqlServer.Management.Smo.Property](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Property) object has been put in square parentheses because it is also a  Visual Basic  keyword.  
  
```VBNET
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'Set properties on the uspGetEmployeeManagers stored procedure on the AdventureWorks2022 database.
Dim db As Database
db = srv.Databases("AdventureWorks2022")
Dim sp As StoredProcedure
sp = db.StoredProcedures("uspGetEmployeeManagers")
sp.AnsiNullsStatus = False
sp.QuotedIdentifierStatus = False
'Iterate through the properties of the stored procedure and display.
'Note the Property object requires [] parentheses to distinguish it from the Visual Basic key word.
Dim p As [Property]
For Each p In sp.Properties
    Console.WriteLine(p.Name & p.Value)
Next
```
  
## Iterating Through All Properties of an Object in Visual C#  
 This code example iterates through the **Properties** collection of the [Microsoft.SqlServer.Management.Smo.StoredProcedure](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.StoredProcedure) object and displays them on the  Visual Studio 
 Output screen.  
  
```csharp  
{   
//Connect to the local, default instance of SQL Server.   
Server srv;   
srv = new Server();   
//Set properties on the uspGetEmployeeManagers stored procedure on the AdventureWorks2022 database.   
Database db;   
db = srv.Databases["AdventureWorks2022"];   
StoredProcedure sp;   
sp = db.StoredProcedures("uspGetEmployeeManagers");   
sp.AnsiNullsStatus = false;   
sp.QuotedIdentifierStatus = false;   
//Iterate through the properties of the stored procedure and display.   
  Property p;   
  foreach ( p in sp.Properties) {   
    Console.WriteLine(p.Name + p.Value);   
  }   
}  
```  
  
## Setting Default Initialization Fields in Visual Basic  
 This code example shows how to minimize the number of object properties initialized in an SMO program. You have to include the `using System.Collections.Specialized`; statement to use the [System.Collections.Specialized.StringCollection](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.StringCollection) object.  
  
  SQL Server Profiler 
 can be used to compare the number statements sent to the instance of  SQL Server 
 with this optimization.  
  
```VBNET
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'Reference the AdventureWorks2022 database.
Dim db As Database
db = srv.Databases("AdventureWorks2022")
'Assign the Table object type to a System.Type object variable.
Dim tb As Table
Dim typ As Type
tb = New Table
typ = tb.GetType
'Assign the current default initialization fields for the Table object type to a 
'StringCollection object variable.
Dim sc As StringCollection
sc = srv.GetDefaultInitFields(typ)
'Set the default initialization fields for the Table object type to the CreateDate property.
srv.SetDefaultInitFields(typ, "CreateDate")
'Retrieve the Schema, Name, and CreateDate properties for every table in AdventureWorks2022.
'Note that the improvement in performance can be viewed in SQL Profiler.
For Each tb In db.Tables
    Console.WriteLine(tb.Schema + "." + tb.Name + " " + tb.CreateDate)
Next
'Set the default initialization fields for the Table object type back to the original settings.
srv.SetDefaultInitFields(typ, sc)
```
  
## Setting Default Initialization Fields in Visual C#  
 This code example shows how to minimize the number of object properties initialized in an SMO program. You have to include the `using System.Collections.Specialized`; statement to use the [System.Collections.Specialized.StringCollection](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.StringCollection) object.  
  
  SQL Server Profiler 
 can be used to compare the number statements sent to the instance of  SQL Server 
 with this optimization.  
  
```csharp  
{   
//Connect to the local, default instance of SQL Server.   
Server srv;   
srv = new Server();   
//Reference the AdventureWorks2022 database.   
Database db;   
db = srv.Databases["AdventureWorks2022"];   
//Assign the Table object type to a System.Type object variable.   
Table tb;   
Type typ;   
tb = new Table();   
typ = tb.GetType;   
//Assign the current default initialization fields for the Table object type to a   
//StringCollection object variable.   
StringCollection sc;   
sc = srv.GetDefaultInitFields(typ);   
//Set the default initialization fields for the Table object type to the CreateDate property.   
srv.SetDefaultInitFields(typ, "CreateDate");   
//Retrieve the Schema, Name, and CreateDate properties for every table in AdventureWorks2022.   
   //Note that the improvement in performance can be viewed in SQL Server Profiler.   
foreach ( tb in db.Tables) {   
   Console.WriteLine(tb.Schema + "." + tb.Name + " " + tb.CreateDate);   
}   
//Set the default initialization fields for the Table object type back to the original settings.   
srv.SetDefaultInitFields(typ, sc);   
}  
```
