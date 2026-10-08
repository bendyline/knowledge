---
title: "SqlTypes and the DataSet"
description: "Describes type support for SqlTypes in the DataSet."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra
ms.date: "08/15/2019"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
dev_langs:
  - "csharp"
---
# SqlTypes and the DataSet




ADO.NET 2.0 introduced enhanced type support for the `DataSet` through the  [System.Data.SqlTypes](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes) namespace. The types in [System.Data.SqlTypes](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes) are designed to provide data types with the same semantics and precision as the data types in a SQL Server database. Each data type in [System.Data.SqlTypes](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes) has an equivalent data type in SQL Server, with the same underlying data representation.  
  
Using [System.Data.SqlTypes](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes) directly in a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) confers several benefits when working with SQL Server data types. [System.Data.SqlTypes](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes) supports the same semantics as SQL Server native data types. Specifying one of the [System.Data.SqlTypes](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes) in the definition of a [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn) eliminates the loss of precision that can occur when converting decimal or numeric data types to one of the common language runtime (CLR) data types.  

The following example creates a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object, explicitly defining the [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn) data types by using [System.Data.SqlTypes](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes) instead of CLR types. The code fills the [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) with data from the Sales.SalesOrderDetail table in the AdventureWorks database in SQL Server. The output displayed in the console window shows the data type of each column, and the values retrieved from SQL Server.  
  
[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/DataColumn_DataType.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/sql/sqltypes-dataset.md)
