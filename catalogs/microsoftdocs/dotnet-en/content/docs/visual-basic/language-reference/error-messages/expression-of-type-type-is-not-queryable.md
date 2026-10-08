---
description: "Learn more about: BC36593: Expression of type <type> is not queryable"
title: "Expression of type <type> is not queryable"
ms.date: 07/20/2015
f1_keywords:
  - "bc36593"
  - "vbc36593"
helpviewer_keywords:
  - "BC36593"
ms.assetid: 6f1f5860-bf97-4885-9ebb-bc87d028095c
---
# BC36593: Expression of type \<type> is not queryable

Expression of type \<type> is not queryable. Make sure you are not missing an assembly reference and/or namespace import for the LINQ provider.

 Queryable types are defined in the [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq), [System.Data.Linq](https://learn.microsoft.com/search/?terms=System.Data.Linq), and [System.Xml.Linq](https://learn.microsoft.com/search/?terms=System.Xml.Linq) namespaces. You must import one or more of these namespaces to perform LINQ queries.

 The [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq) namespace enables you to query objects such as collections and arrays by using LINQ.

 The [System.Data.Linq](https://learn.microsoft.com/search/?terms=System.Data.Linq) namespace enables you to query ADO.NET Datasets and SQL Server databases by using LINQ.

 The [System.Xml.Linq](https://learn.microsoft.com/search/?terms=System.Xml.Linq) namespace enables you to query XML by using LINQ and to use XML features in Visual Basic.

 **Error ID:** BC36593

## To correct this error

1. Add an `Import` statement for the [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq), [System.Data.Linq](https://learn.microsoft.com/search/?terms=System.Data.Linq), or [System.Xml.Linq](https://learn.microsoft.com/search/?terms=System.Xml.Linq) namespace to your code file. You can also import namespaces for your project by using the **References** page of the Project Designer (**My Project**).

2. Ensure that the type that you have identified as the source of your query is a queryable type. That is, a type that implements [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) or [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601).

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [System.Data.Linq](https://learn.microsoft.com/search/?terms=System.Data.Linq)
- [System.Xml.Linq](https://learn.microsoft.com/search/?terms=System.Xml.Linq)
- [Introduction to LINQ in Visual Basic](../../programming-guide/language-features/linq/introduction-to-linq.md)
- [LINQ](../../programming-guide/language-features/linq/index.md)
- [XML](../../programming-guide/language-features/xml/index.md)
- [References and the Imports Statement](../../programming-guide/program-structure/references-and-the-imports-statement.md)
- [Imports Statement (.NET Namespace and Type)](../statements/imports-statement-net-namespace-and-type.md)
- [References Page, Project Designer (Visual Basic)](https://learn.microsoft.com/visualstudio/ide/reference/references-page-project-designer-visual-basic)
