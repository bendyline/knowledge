---
title: "Using Synonyms"
description: "Using Synonyms"
author: "markingmyname"
ms.author: "maghan"
ms.date: "08/06/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "synonyms [SMO]"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Using Synonyms

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  A synonym is an alternative name for a schema-scoped object. In SMO, synonyms are represented by the [Microsoft.SqlServer.Management.Smo.Synonym](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Synonym) object. The [Microsoft.SqlServer.Management.Smo.Synonym](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Synonym) object is a child of the [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) object. This means that synonyms are valid only within the scope of the database in which they are defined. However, the synonym can refer to objects on another database, or on a remote instance of  SQL Server 
.  
  
 The object that is given an alternative name is known as the base object. The name property of the [Microsoft.SqlServer.Management.Smo.Synonym](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Synonym) object is the alternative name given to the base object.  
  
## Example  
 For the following code examples, you will have to select the programming environment, programming template and the programming language to create your application. For more information, see [Create a Visual C# SMO Project in Visual Studio .NET](../how-to-create-a-visual-csharp-smo-project-in-visual-studio-net.md).  
  
## Creating a Synonym in Visual C#  
 The code example shows how to create a synonym or an alternate name for a schema scoped object. Client applications can use a single reference for the base object via a synonym instead of using a multiple part name to reference the base object.  
  
```csharp  
{  
            //Connect to the local, default instance of SQL Server.   
            Server srv = new Server();  
  
            //Reference the AdventureWorks2022 database.   
            Database db = srv.Databases["AdventureWorks2022"];  
  
            //Define a Synonym object variable by supplying the   
            //parent database, name, and schema arguments in the constructor.   
            //The name is also a synonym of the name of the base object.   
            Synonym syn = new Synonym(db, "Shop", "Sales");  
  
            //Specify the base object, which is the object on which   
            //the synonym is based.   
            syn.BaseDatabase = "AdventureWorks2022";  
            syn.BaseSchema = "Sales";  
            syn.BaseObject = "Store";  
            syn.BaseServer = srv.Name;  
  
            //Create the synonym on the instance of SQL Server.   
            syn.Create();  
        }  
```  
  
## Creating a Synonym in PowerShell  
 The code example shows how to create a synonym or an alternate name for a schema scoped object. Client applications can use a single reference for the base object via a synonym instead of using a multiple part name to reference the base object.  
  
```powershell  
#Get a server object which corresponds to the default instance  
$srv = New-Object -TypeName Microsoft.SqlServer.Management.SMO.Server  
  
#And the database object corresponding to Adventureworks  
$db = $srv.Databases["AdventureWorks2022"]  
  
$syn = New-Object -TypeName Microsoft.SqlServer.Management.SMO.Synonym `  
-argumentlist $db, "Shop", "Sales"  
  
#Specify the base object, which is the object on which the synonym is based.  
$syn.BaseDatabase = "AdventureWorks2022"  
$syn.BaseSchema = "Sales"  
$syn.BaseObject = "Store"  
$syn.BaseServer = $srv.Name  
  
#Create the synonym on the instance of SQL Server.  
$syn.Create()  
```  
  
## Related content

- [CREATE SYNONYM (Transact-SQL)](../../../t-sql/statements/create-synonym-transact-sql.md)
