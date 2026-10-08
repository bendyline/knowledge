---
title: "SQL XML column values"
description: "Demonstrates how to retrieve and work with XML data retrieved from SQL Server."
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
# SQL XML column values




SQL Server supports the `xml` data type, and developers can retrieve result sets including this type using standard behavior of the [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) class. An `xml` column can be retrieved just as any column is retrieved (into a [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader), for example) but if you want to work with the content of the column as XML, you must use an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader).  
  
## Example  
The following console application selects two rows, each containing an `xml` column, from the **Sales.Store** table in the **AdventureWorks** database to a [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader) instance. For each row, the value of the `xml` column is read using the [Microsoft.Data.SqlClient.SqlDataReader.GetSqlXml%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader.GetSqlXml%252A) method of [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader). The value is stored in an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader). Note that you must use [Microsoft.Data.SqlClient.SqlDataReader.GetSqlXml%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader.GetSqlXml%252A) rather than the [System.Data.IDataRecord.GetValue%2A](https://learn.microsoft.com/search/?terms=System.Data.IDataRecord.GetValue%252A) method if you want to set the contents to a [System.Data.SqlTypes.SqlXml](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes.SqlXml) variable; [System.Data.IDataRecord.GetValue%2A](https://learn.microsoft.com/search/?terms=System.Data.IDataRecord.GetValue%252A) returns the value of the `xml` column as a string.  
  
> **Note:**
>  The **AdventureWorks** sample database is not installed by default when you install SQL Server. You can install it by running SQL Server Setup.  
  
[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlDataReader_GetSqlXml.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/sql/sql-xml-column-values.md)
  
## Related content

- [System.Data.SqlTypes.SqlXml](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes.SqlXml)
- [XML data in SQL Server](xml-data-sql-server.md)
