---
title: "CLR User-Defined Types"
description: This article describes the process for creating user-defined types (UDTs) to store CLR objects in a SQL Server database.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/27/2024
ms.service: sql
ms.subservice: clr
ms.topic: "reference"
helpviewer_keywords:
  - "validation [CLR integration]"
  - "types [CLR integration]"
  - "UserDefined serialization format [CLR integration]"
  - "null values [CLR integration]"
  - "serialization"
  - "Native serialization format [CLR integration]"
  - "databases [CLR integration]"
  - "building database objects [CLR integration], user-defined types"
  - "user-defined types [CLR integration]"
  - "common language runtime [SQL Server], user-defined types"
  - "UDTs [CLR integration]"
  - "database objects [CLR integration], user-defined types"
  - "turning on CLR functionality"
  - "customizing UDT expression return types [CLR integration]"
  - "UDTs [CLR integration], about UDTs"
  - "comparing UDT values"
  - "annotations [CLR integration]"
  - "user-defined types [CLR integration], about UDTs"
  - "variables [CLR integration]"
  - "invoking UDT methods"
  - "indexes [CLR integration]"
---
# CLR user-defined types


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

 SQL Server 
 gives you the ability to create database objects that are programmed against an assembly created in the  .NET Framework 
 common language runtime (CLR). Database objects that can take advantage of the rich programming model provided by the CLR include triggers, stored procedures, functions, aggregate functions, and types.

> **Note:**  
> The ability to execute CLR code is set to OFF by default in  SQL Server 
. The CLR can be enabled by using the `sp_configure` system stored procedure.

You can use user-defined types (UDTs) to extend the scalar type system of the server, enabling storage of CLR objects in a  SQL Server 
 database. UDTs can contain multiple elements and can have behaviors, differentiating them from the traditional alias data types which consist of a single  SQL Server 
 system data type.

Because UDTs are accessed by the system as a whole, their use for complex data types might negatively affect performance. Complex data is generally best modeled using traditional rows and tables. UDTs in  SQL Server 
 are well suited to the following type of data:

- Date, time, currency, and extended numeric types
- Geospatial applications
- Encoded or encrypted data

The process of developing UDTs in  SQL Server 
 consists of the following steps:

1. **Code and build the assembly that defines the UDT.** UDTs are defined using any of the languages supported by the  .NET Framework 
 common language runtime (CLR) that produce verifiable code. This includes  C# 
 and  Visual Basic  .NET. The data is exposed as fields and properties of a  .NET Framework 
 class or structure, and behaviors are defined by methods of the class or structure.

1. **Register the assembly.** UDTs can be deployed through the Visual Studio user interface in a database project, or by using the  Transact-SQL  `CREATE ASSEMBLY` statement, which copies the assembly containing the class or structure into a database.

1. **Create the UDT in SQL Server.** Once an assembly is loaded into a host database, you use the  Transact-SQL  CREATE TYPE statement to create a UDT and expose the members of the class or structure as members of the UDT. UDTs exist only in the context of a single database, and, once registered, have no dependencies on the external files from which they were created.

1. **Create tables, variables, or parameters using the UDT.** A user-defined type can be used as the column definition of a table, as a variable in a  Transact-SQL  batch, or as an argument of a  Transact-SQL  function or stored procedure.

## In this section

| Article | Description |
| --- | --- |
| [Create user-defined types](creating-user-defined-types.md) | Describes how to create UDTs. |
| [Register user-defined types in SQL Server](registering-user-defined-types-in-sql-server.md) | Describes how to register and manage UDTs in  SQL Server |
| . |
| [Work with user-defined types in SQL Server](working-with-user-defined-types-in-sql-server.md) | Describes how to create queries using UDTs. |
| [Access user-defined types in ADO.NET](accessing-user-defined-types-in-ado-net.md) | Describes how to work with UDTs using the  .NET Framework |
 | Data Provider for  SQL Server |
 | in ADO.NET. |
