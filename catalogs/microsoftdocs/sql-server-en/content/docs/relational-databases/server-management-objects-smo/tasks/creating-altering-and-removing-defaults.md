---
title: "Creating, Altering, and Removing Defaults"
description: "Creating, Altering, and Removing Defaults"
author: "markingmyname"
ms.author: "maghan"
ms.date: "08/06/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "defaults [SMO]"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Creating, Altering, and Removing Defaults

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  In  SQL Server 
 Management Objects (SMO), the default constraint is represented by the [Microsoft.SqlServer.Management.Smo.Default](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Default) object.  
  
 The [Microsoft.SqlServer.Management.Smo.DefaultRuleBase.TextBody%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.DefaultRuleBase.TextBody%252A) property of the [Microsoft.SqlServer.Management.Smo.Default](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Default) object is used to set the value to be inserted. This can be a constant or a  Transact-SQL  statement that returns a constant value, such as GETDATE(). The [Microsoft.SqlServer.Management.Smo.DefaultRuleBase.TextBody%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.DefaultRuleBase.TextBody%252A) property cannot be modified by using the [Microsoft.SqlServer.Management.Smo.DefaultRuleBase.Alter%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.DefaultRuleBase.Alter%252A) method. Instead, the [Microsoft.SqlServer.Management.Smo.Default](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Default) object must be dropped and re-created.  
  
## Example  
 To use any code example that is provided, you will have to choose the programming environment, the programming template, and the programming language in which to create your application. For more information, see [Create a Visual C# SMO Project in Visual Studio .NET](../how-to-create-a-visual-csharp-smo-project-in-visual-studio-net.md).  
  
## Creating, Altering, and Removing a Default in Visual Basic  
 This code example shows how to create one default that is simple text, and another default that is a  Transact-SQL  statement. The default must be attached to the column by using the [Microsoft.SqlServer.Management.Smo.DefaultRuleBase.BindToColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.DefaultRuleBase.BindToColumn%252A) method and detached by using the [Microsoft.SqlServer.Management.Smo.DefaultRuleBase.UnbindFromColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.DefaultRuleBase.UnbindFromColumn%252A) method.  
  
```VBNET
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'Reference the AdventureWorks2022 database.
Dim db As Database
db = srv.Databases("AdventureWorks2022")
'Define a Default object variable by supplying the parent database and the default name 
'in the constructor.
Dim def As [Default]
def = New [Default](db, "Test_Default2")
'Set the TextHeader and TextBody properties that define the default.
def.TextHeader = "CREATE DEFAULT [Test_Default2] AS"
def.TextBody = "GetDate()"
'Create the default on the instance of SQL Server.
def.Create()
'Declare a Column object variable and reference a column in the AdventureWorks2022 database.
Dim col As Column
col = db.Tables("SpecialOffer", "Sales").Columns("StartDate")
'Bind the default to the column.
def.BindToColumn("SpecialOffer", "StartDate", "Sales")
'Unbind the default from the column and remove it from the database.
def.UnbindFromColumn("SpecialOffer", "StartDate", "Sales")
def.Drop()
```
  
## Creating, Altering, and Removing a Default in Visual C#  
 This code example shows how to create one default that is simple text, and another default that is a  Transact-SQL  statement. The default must be attached to the column by using the [Microsoft.SqlServer.Management.Smo.DefaultRuleBase.BindToColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.DefaultRuleBase.BindToColumn%252A) method and detached by using the [Microsoft.SqlServer.Management.Smo.DefaultRuleBase.UnbindFromColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.DefaultRuleBase.UnbindFromColumn%252A) method.  
  
```csharp  
{  
  
          Server srv = new Server();  
  
            //Reference the AdventureWorks2022 database.   
            Database  db = srv.Databases["AdventureWorks2022"];  
  
            //Define a Default object variable by supplying the parent database and the default name   
            //in the constructor.   
            Default def = new Default(db, "Test_Default2");  
  
            //Set the TextHeader and TextBody properties that define the default.   
            def.TextHeader = "CREATE DEFAULT [Test_Default2] AS";  
            def.TextBody = "GetDate()";  
  
            //Create the default on the instance of SQL Server.   
            def.Create();  
  
            //Bind the default to a column in a table in AdventureWorks2022  
            def.BindToColumn("SpecialOffer", "StartDate", "Sales");  
  
            //Unbind the default from the column and remove it from the database.   
            def.UnbindFromColumn("SpecialOffer", "StartDate", "Sales");  
            def.Drop();  
        }  
```  
  
## Creating, Altering, and Removing a Default in PowerShell  
 This code example shows how to create one default that is simple text, and another default that is a  Transact-SQL  statement. The default must be attached to the column by using the [Microsoft.SqlServer.Management.Smo.DefaultRuleBase.BindToColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.DefaultRuleBase.BindToColumn%252A) method and detached by using the [Microsoft.SqlServer.Management.Smo.DefaultRuleBase.UnbindFromColumn%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.DefaultRuleBase.UnbindFromColumn%252A) method.  
  
```powershell   
# Set the path context to the local, default instance of SQL Server and get a reference to AdventureWorks2022  
CD \sql\localhost\default\databases  
$db = get-item AdventureWorks2022  
  
#Define a Default object variable by supplying the parent database and the default name in the constructor.  
$def = New-Object -TypeName Microsoft.SqlServer.Management.SMO.Default `  
-argumentlist $db, "Test_Default2"  
  
#Set the TextHeader and TextBody properties that define the default.   
$def.TextHeader = "CREATE DEFAULT [Test_Default2] AS"  
$def.TextBody = "GetDate()"  
  
#Create the default on the instance of SQL Server.   
$def.Create()  
  
#Bind the default to the column.   
$def.BindToColumn("SpecialOffer", "StartDate", "Sales")  
  
#Unbind the default from the column and remove it from the database.   
$def.UnbindFromColumn("SpecialOffer", "StartDate", "Sales")  
$def.Drop()  
```  
  
## Related content

- [Microsoft.SqlServer.Management.Smo.Default](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Default)
