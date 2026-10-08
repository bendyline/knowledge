---
title: "LINQ and ADO.NET"
description: Learn how to form set-based queries in application code using Language-Integrated Query (LINQ) in ADO.NET, without having to use a separate query language.
titleSuffix: ""
ms.date: "03/30/2017"
ms.assetid: bf0c8f93-3ff7-49f3-8aed-f2b7ac938dec
---
# LINQ and ADO.NET

Today, many business developers must use two (or more) programming languages: a high-level language for the business logic and presentation layers (such as Visual C# or Visual Basic), and a query language to interact with the database (such as Transact-SQL). This requires the developer to be proficient in several languages to be effective, and also causes language mismatches in the development environment. For example, an application that uses a data access API to execute a query against a database specifies the query as a string literal by using quotation marks. This query string is unreadable to the compiler and is not checked for errors, such as invalid syntax or whether the columns or rows it references actually exist. There is no type checking of the query parameters and no `IntelliSense` support, either.  
  
 Language-Integrated Query (LINQ) enables developers to form set-based queries in their application code, without having to use a separate query language. You can write LINQ queries against various enumerable data sources (that is, a data source that implements the [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) interface), such as in-memory data structures, XML documents, SQL databases, and [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) objects. Although these enumerable data sources are implemented in various ways, they all expose the same syntax and language constructs. Because queries can be formed in the programming language itself, you do not have to use another query language that is embedded as string literals that cannot be understood or verified by the compiler. Integrating queries into the programming language also enables Visual Studio programmers to be more productive by providing compile-time type and syntax checking, and `IntelliSense`. These features reduce the need for query debugging and error fixing.  
  
 Transferring data from SQL tables into objects in memory is often tedious and error-prone. The LINQ provider implemented by LINQ to DataSet and LINQ to SQL
 converts the source data into [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable)-based object collections. The programmer always views the data as an [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) collection, both when you query and when you update. Full `IntelliSense` support is provided for writing queries against those collections.  
  
 There are three separate ADO.NET Language-Integrated Query (LINQ) technologies: LINQ to DataSet, LINQ to SQL
, and LINQ to Entities. LINQ to DataSet provides richer, optimized querying over the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) and LINQ to SQL
 enables you to directly query SQL Server database schemas, and LINQ to Entities allows you to query an Entity Data Model.  
  
 The following diagram provides an overview of how the ADO.NET LINQ technologies relate to high-level programming languages and LINQ-enabled data sources.  
  
 LINQ to ADO.NET overview  
  
 For more information about LINQ, see [Language Integrated Query (LINQ)](../../../csharp/linq/index.md).
  
 The following sections provide more information about LINQ to DataSet, LINQ to SQL
, and LINQ to Entities.  
  
## LINQ to DataSet  

 The [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) is a key element of the disconnected programming model that ADO.NET is built on, and is widely used. LINQ to DataSet enables developers to build richer query capabilities into [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) by using the same query formulation mechanism that is available for many other data sources. For more information, see [LINQ to DataSet](linq-to-dataset.md).  
  
## LINQ to SQL  

 LINQ to SQL
 is a useful tool for developers who do not require mapping to a conceptual model. By using LINQ to SQL
, you can use the LINQ programming model directly over existing database schema. LINQ to SQL
 enables developers to generate .NET Framework classes that represent data. Rather than mapping to a conceptual data model, these generated classes map directly to database tables, views, stored procedures, and user-defined functions.  
  
 With LINQ to SQL
, developers can write code directly against the storage schema using the same LINQ programming pattern as in-memory collections and the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet), in addition to other data sources such as XML. For more information, see [LINQ to SQL](sql/linq/index.md).  
  
## LINQ to Entities  

 Most applications are currently written on top of relational databases. At some point, these applications will need to interact with the data represented in a relational form. Database schemas are not always ideal for building applications, and the conceptual models of application are not the same as the logical models of databases. The Entity Data Model is a conceptual data model that can be used to model the data of a particular domain so that applications can interact with data as objects. For more information, see [ADO.NET Entity Framework](ef/index.md).  
  
 Through the Entity Data Model, relational data is exposed as objects in the .NET environment. This makes the object layer an ideal target for LINQ support, allowing developers to formulate queries against the database from the language used to build the business logic. This capability is known as LINQ to Entities. For more information, see [LINQ to Entities](ef/language-reference/linq-to-entities.md).  
  
## See also

- [LINQ to DataSet](linq-to-dataset.md)
- [LINQ to SQL](sql/linq/index.md)
- [LINQ to Entities](ef/language-reference/linq-to-entities.md)
- [Language Integrated Query (LINQ)](../../../csharp/linq/index.md)
- [ADO.NET Overview](ado-net-overview.md)
