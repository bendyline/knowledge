---
title: "Creating a Package Programmatically"
description: "Creating a Package Programmatically"
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "SSIS packages, creating"
  - "Integration Services packages, creating"
  - "packages [Integration Services], creating"
  - "SQL Server Integration Services packages, creating"
dev_langs:
  - "VB"
  - "CSharp"
---
# Creating a Package Programmatically


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The [Microsoft.SqlServer.Dts.Runtime.Package](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Package) object is the top-level container for all other objects in an  SSIS 
 project solution. As the top-level container, the package is the first object created, and subsequent objects are added to it, and then executed within the context of the package. The package itself does not move or transform data. The package relies on the tasks it contains to perform the work. Tasks perform most of the work performed by a package, and define the functionality of a package. A package is created and executed with just three lines of code, but various tasks and [Microsoft.SqlServer.Dts.Runtime.ConnectionManager](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManager) objects are added to give additional functionality to your package. This section discusses how to programmatically create a package. It does not provide information about how to create the tasks or the [Microsoft.SqlServer.Dts.Runtime.ConnectionManager](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManager). These are covered in later sections.  
  
## Example  
 To write code using the Visual Studio IDE, a reference to Microsoft.SqlServer.ManagedDTS.DLL is required in order to create a `using` statement (`Imports` in Visual Basic .NET) to the Microsoft.SqlServer.Dts.Runtime. The following code sample demonstrates creating an empty package.  
  
```csharp  
using System;  
using Microsoft.SqlServer.Dts.Runtime;  
  
namespace Microsoft.SqlServer.Dts.Samples  
{  
  class Program  
  {  
    static void Main(string[] args)  
    {  
      Package package;  
      package = new Package();  
    }  
  }  
}  
```  
  
```vb  
Imports Microsoft.SqlServer.Dts.Runtime  
  
Module Module1  
  
  Sub Main()  
  
    Dim package As Package  
    package = New Package  
  
  End Sub  
  
End Module  
```  
  
 To compile and run the sample, press F5 in Visual Studio. To build the code using the C# compiler, **csc.exe**, at the command prompt to compile, use the following command and file references, replacing the *\<filename>* with the name of the .cs or .vb file, and giving it an *\<outputfilename>* of your choice.  
  
 **csc /target:library /out: \<outputfilename>.dll \<filename>.cs /r:Microsoft.SqlServer.Managed DTS.dll" /r:System.dll**  
  
 To build the code using the Visual Basic .NET compiler, **vbc.exe**, at the command prompt to compile, use the following command and file references.  
  
 **vbc /target:library /out: \<outputfilename>.dll \<filename>.vb /r:Microsoft.SqlServer.Managed DTS.dll" /r:System.dll**  
  
 You can also create a package by loading an existing package that was saved on disk, in the file system, or to  SQL Server 
. The difference is that the [Microsoft.SqlServer.Dts.Runtime.Application](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application) object is first created, and then the package object is filled by one of the Application's overloaded methods: **LoadPackage** for flat files, **LoadFromSQLServer** for packages saved to  SQL Server 
, or [Microsoft.SqlServer.Dts.Runtime.Application.LoadFromDtsServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.LoadFromDtsServer%252A) for packages saved to the file system. The following example loads an existing package from disk, and then views several properties on the package.  
  
```csharp  
using System;  
using Microsoft.SqlServer.Dts.Runtime;  
  
namespace Microsoft.SqlServer.Dts.Samples  
{  
  class ApplicationTests  
  {  
    static void Main(string[] args)  
    {  
      // The variable pkg points to the location of the  
      // ExecuteProcess package sample that was installed with  
      // the SSIS samples.  
      string pkg = @"C:\Program Files\Microsoft SQL Server\100\Samples\Integration Services" +  
        @"\Package Samples\ExecuteProcess Sample\ExecuteProcess\UsingExecuteProcess.dtsx";  
  
      Application app = new Application();  
      Package p = app.LoadPackage(pkg, null);  
  
      // Now that the package is loaded, we can query on  
      // its properties.  
      int n = p.Configurations.Count;  
      DtsProperty p2 = p.Properties["VersionGUID"];  
      DTSProtectionLevel pl = p.ProtectionLevel;  
  
      Console.WriteLine("Number of configurations = " + n.ToString());  
      Console.WriteLine("VersionGUID = " + (string)p2.GetValue(p));  
      Console.WriteLine("ProtectionLevel = " + pl.ToString());  
      Console.Read();  
    }  
  }  
}  
```  
  
```vb  
Imports Microsoft.SqlServer.Dts.Runtime  
  
Module ApplicationTests  
  
  Sub Main()  
  
    ' The variable pkg points to the location of the  
    ' ExecuteProcess package sample that was installed with  
    ' the SSIS samples.  
    Dim pkg As String = _  
      "C:\Program Files\Microsoft SQL Server\100\Samples\Integration Services" & _  
      "\Package Samples\ExecuteProcess Sample\ExecuteProcess\UsingExecuteProcess.dtsx"  
  
    Dim app As Application = New Application()  
    Dim p As Package = app.LoadPackage(pkg, Nothing)  
  
    ' Now that the package is loaded, we can query on  
    ' its properties.  
    Dim n As Integer = p.Configurations.Count  
    Dim p2 As DtsProperty = p.Properties("VersionGUID")  
    Dim pl As DTSProtectionLevel = p.ProtectionLevel  
  
    Console.WriteLine("Number of configurations = " & n.ToString())  
    Console.WriteLine("VersionGUID = " & CType(p2.GetValue(p), String))  
    Console.WriteLine("ProtectionLevel = " & pl.ToString())  
    Console.Read()  
  
  End Sub  
  
End Module  
```  
  
 **Sample Output:**  
  
 `Number of configurations = 2`  
  
 `VersionGUID = {09016682-89B8-4406-AAC9-AF1E527FF50F}`  
  
 `ProtectionLevel = DontSaveSensitive`  
  
## Related content

- [API Sample - OleDB source and OleDB destination](https://techcommunity.microsoft.com/t5/sql-server-integration-services/api-sample-oledb-source-and-oledb-destination/ba-p/387553)
- [EzAPI - Updated for SQL Server 2012](https://techcommunity.microsoft.com/t5/sql-server-integration-services/ezapi-updated-for-sql-server-2012/ba-p/388042)
- [Adding Tasks Programmatically](adding-tasks-programmatically.md)
