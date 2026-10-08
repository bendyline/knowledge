---
title: "Creating, Altering, and Removing User-Defined Functions"
description: "Creating, Altering, and Removing User-Defined Functions"
author: "markingmyname"
ms.author: "maghan"
ms.date: "08/06/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "user-defined functions [SMO]"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Creating, Altering, and Removing User-Defined Functions

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)


  The [Microsoft.SqlServer.Management.Smo.UserDefinedFunction](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.UserDefinedFunction) object provides functionality that lets users programmatically manage user-defined functions in  Microsoft 
  SQL Server 
. User-defined functions support input and output parameters, and also support direct references to table columns.  
  
  SQL Server 
 requires assemblies to be registered within a database before these can be used inside stored procedures, user defined functions, triggers, and user defined data types. SMO supports this feature with the [Microsoft.SqlServer.Management.Smo.SqlAssembly](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.SqlAssembly) object.  
  
 The [Microsoft.SqlServer.Management.Smo.UserDefinedFunction](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.UserDefinedFunction) object references the .NET assembly with the [Microsoft.SqlServer.Management.Smo.UserDefinedFunction.AssemblyName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.UserDefinedFunction.AssemblyName%252A), [Microsoft.SqlServer.Management.Smo.UserDefinedFunction.ClassName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.UserDefinedFunction.ClassName%252A), and [Microsoft.SqlServer.Management.Smo.UserDefinedFunction.MethodName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.UserDefinedFunction.MethodName%252A) properties.  
  
 When the [Microsoft.SqlServer.Management.Smo.UserDefinedFunction](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.UserDefinedFunction) object references a .NET assembly, you must register the assembly by creating a [Microsoft.SqlServer.Management.Smo.SqlAssembly](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.SqlAssembly) object and adding it to the [Microsoft.SqlServer.Management.Smo.SqlAssemblyCollection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.SqlAssemblyCollection) object, which belongs to the [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) object.  
  
## Example  
 To use any code example that is provided, you will have to choose the programming environment, the programming template, and the programming language in which to create your application. For more information, see [Create a Visual C# SMO Project in Visual Studio .NET](../how-to-create-a-visual-csharp-smo-project-in-visual-studio-net.md).  
  
## Creating a Scalar User-Defined Function in Visual Basic  
 This code example shows how to create and remove a scalar user-defined function that has an input [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object parameter and an integer return type in  Visual Basic . The user-defined function is created on the  AdventureWorks2025  database. The example creates a user-defined function, ISOweek, which takes a date argument and calculates the ISO week number. For this function to calculate correctly, the database DATEFIRST option must be set to 1 before the function is called.  
  
```VBNET
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'Reference the AdventureWorks2022 database.
Dim db As Database
db = srv.Databases("AdventureWorks2022")
'Define a UserDefinedFunction object variable by supplying the parent database and the name arguments in the constructor.
Dim udf As UserDefinedFunction
udf = New UserDefinedFunction(db, "IsOWeek")
'Set the TextMode property to false and then set the other properties.
udf.TextMode = False
udf.DataType = DataType.Int
udf.ExecutionContext = ExecutionContext.Caller
udf.FunctionType = UserDefinedFunctionType.Scalar
udf.ImplementationType = ImplementationType.TransactSql
'Add a parameter.
Dim par As UserDefinedFunctionParameter
par = New UserDefinedFunctionParameter(udf, "@DATE", DataType.DateTime)
udf.Parameters.Add(par)
'Set the TextBody property to define the user defined function.
udf.TextBody = "BEGIN  DECLARE @ISOweek int SET @ISOweek= DATEPART(wk,@DATE)+1 -DATEPART(wk,CAST(DATEPART(yy,@DATE) as CHAR(4))+'0104') IF (@ISOweek=0) SET @ISOweek=dbo.ISOweek(CAST(DATEPART(yy,@DATE)-1 AS CHAR(4))+'12'+ CAST(24+DATEPART(DAY,@DATE) AS CHAR(2)))+1 IF ((DATEPART(mm,@DATE)=12) AND ((DATEPART(dd,@DATE)-DATEPART(dw,@DATE))>= 28)) SET @ISOweek=1 RETURN(@ISOweek) END;"
'Create the user defined function on the instance of SQL Server.
udf.Create()
'Remove the user defined function.
udf.Drop()
``` 
  
## Creating a Scalar User-Defined Function in Visual C#  
 This code example shows how to create and remove a scalar user-defined function that has an input [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object parameter and an integer return type in  C# 
. The user-defined function is created on the  AdventureWorks2025  database. The example creates the user-defined function. `ISOweek`. This function takes a date argument and calculates the ISO week number. For this function to calculate correctly, the database `DATEFIRST` option must be set to `1` before the function is called.  
  
```csharp  
{  
            //Connect to the local, default instance of SQL Server.   
           Server srv = new Server();  
            //Reference the AdventureWorks2022 database.   
           Database db = srv.Databases["AdventureWorks2022"];  
  
            //Define a UserDefinedFunction object variable by supplying the parent database and the name arguments in the constructor.   
            UserDefinedFunction udf = new UserDefinedFunction(db, "IsOWeek");  
  
            //Set the TextMode property to false and then set the other properties.   
            udf.TextMode = false;  
            udf.DataType = DataType.Int;  
            udf.ExecutionContext = ExecutionContext.Caller;  
            udf.FunctionType = UserDefinedFunctionType.Scalar;  
            udf.ImplementationType = ImplementationType.TransactSql;  
  
            //Add a parameter.   
  
     UserDefinedFunctionParameter par = new UserDefinedFunctionParameter(udf, "@DATE", DataType.DateTime);  
            udf.Parameters.Add(par);  
  
            //Set the TextBody property to define the user-defined function.   
            udf.TextBody = "BEGIN DECLARE @ISOweek int SET @ISOweek= DATEPART(wk,@DATE)+1 -DATEPART(wk,CAST(DATEPART(yy,@DATE) as CHAR(4))+'0104') IF (@ISOweek=0) SET @ISOweek=dbo.ISOweek(CAST(DATEPART(yy,@DATE)-1 AS CHAR(4))+'12'+ CAST(24+DATEPART(DAY,@DATE) AS CHAR(2)))+1 IF ((DATEPART(mm,@DATE)=12) AND ((DATEPART(dd,@DATE)-DATEPART(dw,@DATE))>= 28)) SET @ISOweek=1 RETURN(@ISOweek) END;";  
  
            //Create the user-defined function on the instance of SQL Server.   
            udf.Create();  
  
            //Remove the user-defined function.   
            udf.Drop();  
        }  
```  
  
## Creating a Scalar User-Defined Function in PowerShell  
 This code example shows how to create and remove a scalar user-defined function that has an input [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object parameter and an integer return type in  C# 
. The user-defined function is created on the  AdventureWorks2025  database. The example creates the user-defined function. `ISOweek`. This function takes a date argument and calculates the ISO week number. For this function to calculate correctly, the database `DATEFIRST` option must be set to `1` before the function is called.  
  
```powershell   
# Set the path context to the local, default instance of SQL Server and get a reference to AdventureWorks2022  
CD \sql\localhost\default\databases  
$db = get-item AdventureWorks2022  
  
# Define a user defined function object variable by supplying the parent database and name arguments in the constructor.   
$udf  = New-Object -TypeName Microsoft.SqlServer.Management.SMO.UserDefinedFunction `  
-argumentlist $db, "IsOWeek"  
  
# Set the TextMode property to false and then set the other properties.   
$udf.TextMode = $false  
$udf.DataType = [Microsoft.SqlServer.Management.SMO.DataType]::Int   
$udf.ExecutionContext = [Microsoft.SqlServer.Management.SMO.ExecutionContext]::Caller  
$udf.FunctionType = [Microsoft.SqlServer.Management.SMO.UserDefinedFunctionType]::Scalar  
$udf.ImplementationType = [Microsoft.SqlServer.Management.SMO.ImplementationType]::TransactSql  
  
# Define a Parameter object variable by supplying the parent function, name and type arguments in the constructor.  
$type = [Microsoft.SqlServer.Management.SMO.DataType]::DateTime  
$par  = New-Object -TypeName Microsoft.SqlServer.Management.SMO.UserDefinedFunctionParameter `  
-argumentlist $udf, "@DATE",$type  
  
# Add the parameter to the function  
$udf.Parameters.Add($par)  
  
#Set the TextBody property to define the user-defined function.   
$udf.TextBody = "BEGIN DECLARE @ISOweek int SET @ISOweek= DATEPART(wk,@DATE)+1 -DATEPART(wk,CAST(DATEPART(yy,@DATE) as CHAR(4))+'0104') IF (@ISOweek=0) SET @ISOweek=dbo.ISOweek(CAST(DATEPART(yy,@DATE)-1 AS CHAR(4))+'12'+ CAST(24+DATEPART(DAY,@DATE) AS CHAR(2)))+1 IF ((DATEPART(mm,@DATE)=12) AND ((DATEPART(dd,@DATE)-DATEPART(dw,@DATE))>= 28)) SET @ISOweek=1 RETURN(@ISOweek) END;"  
  
# Create the user-defined function on the instance of SQL Server.   
$udf.Create()  
  
# Remove the user-defined function.   
$udf.Drop()  
```  
  
## Related content

- [Microsoft.SqlServer.Management.Smo.UserDefinedFunction](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.UserDefinedFunction)
