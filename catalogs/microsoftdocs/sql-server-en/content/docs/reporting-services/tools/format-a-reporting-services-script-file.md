---
title: "Format a Reporting Services script file"
description: Format a Reporting Services script file in Microsoft Visual Basic .NET that contains user-defined procedures and module-level variables.


ms.reviewer: maghan, randolphwest
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: tools
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "scripts [Reporting Services], formats"
  - "formats [Reporting Services], script files"
---
# Format a Reporting Services script file

A  Reporting Services 
 script is a  Visual Basic  code file, written against a proxy that is built on Web Service Description Language (WSDL), which defines the Reporting Services SOAP API. A script file is stored as a Unicode or UTF-8 text file with the extension .rss.

The script file acts as a  Visual Basic  module and can contain user-defined procedures and module-level variables. For the script file to run successfully, it must contain a `Main` procedure. The `Main` procedure is the first procedure that is accessed when your script file runs. `Main` is where you can add your Web service operations and run your user defined subprocedures. The following code creates a `Main` procedure:

```vbnet
Public Sub Main()
    ' Your code goes here.
End Sub
```

The script environment automatically connects to the report server, creates the Web proxy class, and generates a reference variable (`rs`) to the Web service proxy object. Individual statements you create only need to refer to the `rs` module-level variable, to perform any of the Web service operations available in the Web service library. The following  Visual Basic  code calls the Web service [ReportService2010.ReportingService2010.ListChildren%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListChildren%252A) method from within a script file:

```vbnet
Public Sub Main()
    Dim items() As CatalogItem
    items = rs.ListChildren("/", True)

    Dim item As CatalogItem
    For Each item In items
        Console.WriteLine(item.Name)
    Next item
End Sub
```

User credentials are managed by the script environment and passed through command prompt arguments using **RS.exe**. Although you can use the `rs` variable to set the authentication of the Web service, you should use the script environment instead. You don't need to authenticate the Web service in the script file. For more information about authenticating the script environment, see [RS.exe utility (SSRS)](rs-exe-utility-ssrs.md).

You don't declare namespaces within the script file. The scripting environment makes several useful  Microsoft 
  .NET Framework 
 namespaces available to you: `System.Web.Services`, `System.Web.Services.Protocols`, `System.Xml`, and `System.IO`.

For script samples, see [SQL Server Reporting Services Product Samples](https://learn.microsoft.com/archive/technet-wiki/1093.reporting-services-samples-on-codeplex-sql-server-reporting-services-ssrs).

## Related content

- [Report Server Web service](../report-server-web-service/report-server-web-service.md)
- [Technical reference (SSRS)](../technical-reference-ssrs.md)
- [RS.exe utility (SSRS)](rs-exe-utility-ssrs.md)
