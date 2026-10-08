---
title: "Accessing User-Defined Types in ADO.NET"
description: UDTs, written in .NET Framework CLR languages, allow a SQL Server database to store objects and custom data structures. In ADO.NET, a provider exposes UDTs.
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/19/2026
ms.service: sql
ms.subservice: clr
ms.topic: "reference"
helpviewer_keywords:
  - "ADO.NET [CLR integration]"
  - "UDTs [CLR integration], ADO.NET"
  - "user-defined types [CLR integration], ADO.NET"
---
# Access user-defined types in ADO.NET


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

User-defined types (UDTs) are written using any of the languages supported by the  .NET Framework 
 common language runtime (CLR) that produce verifiable code. This includes  C# 
 and  Visual Basic  .NET. UDTs allow objects and custom data structures to be stored in a  SQL Server 
 database.

The data is exposed as public members of a .NET Framework class or structure, and behaviors are defined by methods of the class or structure. A UDT can be used as the column definition of a table, as a variable in a  Transact-SQL  batch, or as an argument of a  Transact-SQL  function or stored procedure.

In ADO.NET, the `Microsoft.Data.SqlClient` provider exposes UDTs in the following ways:

- Through the `Microsoft.Data.SqlClient.SqlDataReader` as an object.
- Through the `SqlDataReader` as raw bytes.
- As a parameter of a `Microsoft.Data.SqlClient.SqlParameter` object.

## In this section

| Article | Description |
| --- | --- |
| [Retrieve user-defined type (UDT) data in ADO.NET](accessing-user-defined-types-retrieving-udt-data.md) | Describes how to retrieve UDT data and how to specify parameters. |
| [Update user-defined type (UDT) columns with DataAdapters](accessing-user-defined-types-updating-udt-columns-with-dataadapters.md) | Describes how to work with UDTs in a `DataSet` and how to update UDT data using a `DataAdapter`. |

## Related content

- [CLR user-defined types](clr-user-defined-types.md)
