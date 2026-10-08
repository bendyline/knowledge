---
description: "Learn more about: How to: Dynamically Create a Database"
title: "How to: Dynamically Create a Database"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: fb7f23c4-4572-4c38-9898-a287807d070c
---
# How to: Dynamically Create a Database

In LINQ to SQL, an object model is mapped to a relational database. Mapping is enabled by using attribute-based mapping or an external mapping file to describe the structure of the relational database. In both scenarios, there is enough information about the relational database that you can create a new instance of the database using the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method.

 The [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method creates a replica of the database only to the extent of the information encoded in the object model. Mapping files and attributes from your object model might not encode everything about the structure of an existing database. Mapping information does not represent the contents of user-defined functions, stored procedures, triggers, or check constraints. This behavior is sufficient for a variety of databases.

 You can use the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method in any number of scenarios, especially if a known data provider like Microsoft SQL Server 2008 is available. Typical scenarios include the following:

- You are building an application that automatically installs itself on a customer system.

- You are building a client application that needs a local database to save its offline state.

 You can also use the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method with SQL Server by using an .mdf file or a catalog name, depending on your connection string. LINQ to SQL
 uses the connection string to define the database to be created and on which server the database is to be created.

> **Note:**
> Whenever possible, use Windows Integrated Security to connect to the database so that passwords are not required in the connection string.

## Example 1

 The following code provides an example of how to create a new database named MyDVDs.mdf.

 [DLinqSubmittingChanges#5 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqSubmittingChanges/cs/Program.cs#5)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqSubmittingChanges/cs/Program.cs.md)
 [DLinqSubmittingChanges#5 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqSubmittingChanges/vb/Module1.vb#5)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqSubmittingChanges/vb/Module1.vb.md)

## Example 2

 You can use the object model to create a database by doing the following:

 [DLinqSubmittingChanges#6 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqSubmittingChanges/cs/Program.cs#6)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqSubmittingChanges/cs/Program.cs.md)
 [DLinqSubmittingChanges#6 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqSubmittingChanges/vb/Module1.vb#6)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqSubmittingChanges/vb/Module1.vb.md)

## Example 3

 When building an application that automatically installs itself on a  customer system, see if the database already exists and drop it before creating a new one. The [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) class provides the [System.Data.Linq.DataContext.DatabaseExists*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.DatabaseExists*) and [System.Data.Linq.DataContext.DeleteDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.DeleteDatabase*) methods to help you with this process.

 The following example shows one way these methods can be used to implement this approach:

 [DLinqSubmittingChanges#7 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqSubmittingChanges/cs/Program.cs#7)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqSubmittingChanges/cs/Program.cs.md)
 [DLinqSubmittingChanges#7 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqSubmittingChanges/vb/Module1.vb#7)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqSubmittingChanges/vb/Module1.vb.md)

## See also

- [Attribute-Based Mapping](attribute-based-mapping.md)
- [External Mapping](external-mapping.md)
- [SQL-CLR Type Mapping](sql-clr-type-mapping.md)
- [Background Information](background-information.md)
- [Making and Submitting Data Changes](making-and-submitting-data-changes.md)
