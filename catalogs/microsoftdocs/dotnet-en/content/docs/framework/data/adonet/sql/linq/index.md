---
title: "LINQ to SQL"
description: LINQ to SQL is a component of the .NET Framework that provides a runtime infrastructure for managing relational data as objects.
ms.date: "03/30/2017"
ms.assetid: 73d13345-eece-471a-af40-4cc7a2f11655
---
# LINQ to SQL

LINQ to SQL
 is a component of .NET Framework version 3.5 that provides a runtime infrastructure for managing relational data as objects.

> **Note:**
> Relational data appears as a collection of two-dimensional tables (*relations* or *flat files*), where common columns relate tables to each other. To use LINQ to SQL
 effectively, you must have some familiarity with the underlying principles of relational databases.

 In LINQ to SQL
, the data model of a relational database is mapped to an object model expressed in the programming language of the developer. When the application runs, LINQ to SQL
 translates into SQL the language-integrated queries in the object model and sends them to the database for execution. When the database returns the results, LINQ to SQL
 translates them back to objects that you can work with in your own programming language.

 Developers using Visual Studio typically use the Object Relational Designer, which provides a user interface for implementing many of the features of LINQ to SQL
.

 The documentation that is included with this release of LINQ to SQL
 describes the basic building blocks, processes, and techniques you need for building LINQ to SQL
 applications. You can also search Microsoft Docs for specific issues, and you can participate in the [LINQ Forum](https://social.msdn.microsoft.com/forums/home?forum=linqtosql), where you can discuss more complex topics in detail with experts. Finally, the [LINQ to SQL: .NET Language-Integrated Query for Relational Data](https://learn.microsoft.com/previous-versions/dotnet/articles/bb425822\(v=msdn.10\)) white paper details LINQ to SQL
 technology, complete with Visual Basic and C# code examples.

## In This Section

 [Getting Started](getting-started.md)
 Provides a condensed overview of LINQ to SQL
 along with information about how to get started using LINQ to SQL
.

 [Programming Guide](programming-guide.md)
 Provides steps for mapping, querying, updating, debugging, and similar tasks.

 [Reference](reference.md)
 Provides reference information about several aspects of LINQ to SQL
. Topics include SQL-CLR Type Mapping, Standard Query Operator Translation, and more.

 [Samples](samples.md)
 Provides links to Visual Basic and C# samples.

## Related Sections

 [Language-Integrated Query (LINQ) - C#](../../../../../csharp/linq/index.md)\
 Provides overviews of LINQ technologies in C#.

 [Language-Integrated Query (LINQ) - Visual Basic](../../../../../visual-basic/programming-guide/concepts/linq/index.md)
 Provides overviews of LINQ technologies in Visual Basic.

 [LINQ](../../../../../visual-basic/programming-guide/language-features/linq/index.md)
 Describes LINQ technologies for Visual Basic users.

 [LINQ and ADO.NET](../../linq-and-ado-net.md)
 Links to the ADO.NET portal.

 [LINQ to SQL Walkthroughs](https://learn.microsoft.com/previous-versions/visualstudio/visual-studio-2008/bb386295\(v=vs.90\))
 Lists walkthroughs available for LINQ to SQL
.

 [Downloading Sample Databases](downloading-sample-databases.md)
 Describes how to download sample databases used in the documentation.

 [LinqDataSource Web Server Control Overview](https://learn.microsoft.com/previous-versions/aspnet/bb547113\(v=vs.100\))
 Describes how the [System.Web.UI.WebControls.LinqDataSource](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.LinqDataSource) control exposes Language-Integrated Query (LINQ) to Web developers through the ASP.NET data-source control architecture.
