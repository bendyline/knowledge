---
title: "Understanding data type differences"
description: "Learn the differences between Java programming language data types and SQL Server data types and how the JDBC Driver for SQL Server helps with conversions."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "08/12/2019"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
---
# Understanding data type differences



There are a number of differences between the Java programming language data types and  SQL Server 
 data types. The  Microsoft JDBC Driver for SQL Server 
 helps to facilitate those differences through various types of conversions.  

## Character types

The JDBC character string data types are **CHAR**, **VARCHAR**, and **LONGVARCHAR**. The JDBC driver provides support for the JDBC 4.0 API. In the JDBC 4.0, the JDBC character string data types can also be **NCHAR**, **NVARCHAR**, and **LONGNVARCHAR**. These new character string types maintain Java native character types in Unicode format and remove the need to perform any ANSI-to-Unicode or Unicode-to-ANSI conversion.  
  
| Type | Description |
| --- | --- |
| Fixed-length | The  SQL Server |
 | **char** and **nchar** data types map directly to the JDBC **CHAR** and **NCHAR** types. These are fixed-length types with padding provided by the server in the case where the column has `SET ANSI_PADDING ON`. Padding is always turned on for **nchar**, but for **char**, in the case where the server char columns are not padded, the JDBC driver adds the padding. |
| Variable-length | The  SQL Server |
 | **varchar** and **nvarchar** types map directly to the JDBC **VARCHAR** and **NVARCHAR** types, respectively. |
| Long | The  SQL Server |
 | **text** and **ntext** types map to the JDBC **LONGVARCHAR** and **LONGNVARCHAR** type, respectively. These are deprecated types beginning in  SQL Server 2005 (9.x) |
| , so you should use large value types, **varchar(max)** or **nvarchar(max)**, instead.<br /><br /> Using the update\<Numeric Type> and [updateObject (int, java.lang.Object)](reference/updateobject-method-int-java-lang-object.md) methods will fail against **text** and **ntext** server columns. However, using the [setObject](reference/setobject-method-sqlserverpreparedstatement.md) method with a specified character conversion type is supported against **text** and **ntext** server columns. |
  
## Binary string types

The JDBC binary-string types are **BINARY**, **VARBINARY**, and **LONGVARBINARY**.  
  
| Type | Description |
| --- | --- |
| Fixed-length | The  SQL Server |
 | **binary** type maps directly to the JDBC **BINARY** type. This is a fixed-length type with padding provided by the server in the case where the column has SET ANSI_PADDING ON. When the server char columns are not padded, the JDBC driver adds the padding.<br /><br /> The  SQL Server |
 | **timestamp** type is a JDBC **BINARY** type with the fixed length of 8 bytes. |
| Variable-length | The  SQL Server |
 | **varbinary** type maps to the JDBC **VARBINARY** type.<br /><br /> The **udt** type in  SQL Server |
 | maps to JDBC as a **VARBINARY** type. |
| Long | The  SQL Server |
 | **image** type maps to the JDBC **LONGVARBINARY** type. This type is deprecated beginning in  SQL Server 2005 (9.x) |
| , so you should use a large value type, **varbinary(max)** instead. |
  
## Exact numeric types

The JDBC exact numeric types map directly to their corresponding SQL Server types.  
  
| Type | Description |
| --- | --- |
| BIT | The JDBC **BIT** type represents a single bit that can be 0 or 1. This maps to a  SQL Server |
 | **bit** type. |
| TINYINT | The JDBC **TINYINT** type represents a single byte. This maps to a  SQL Server |
 | **tinyint** type. |
| SMALLINT | The JDBC **SMALLINT** type represents a signed 16-bit integer. This maps to a  SQL Server |
 | **smallint** type. |
| INTEGER | The JDBC **INTEGER** type represents a signed 32-bit integer. This maps to a  SQL Server |
 | **int** type. |
| BIGINT | The JDBC **BIGINT** type represents a signed 64-bit integer. This maps to a  SQL Server |
 | **bigint** type. |
| NUMERIC | The JDBC **NUMERIC** type represents a fixed-precision decimal value that holds values of identical precision. The **NUMERIC** type maps to the  SQL Server |
 | **numeric** type. |
| DECIMAL | The JDBC **DECIMAL** type represents a fixed-precision decimal value that holds values of at least the specified precision. The **DECIMAL** type maps to the  SQL Server |
 | **decimal** type.<br /><br /> The JDBC **DECIMAL** type also maps to the  SQL Server |
 | **money** and **smallmoney** types, which are specific fixed-precision decimal types that are stored in 8 and 4 bytes, respectively. |
  
## Approximate numeric types

The JDBC approximate numeric types are **REAL**, **DOUBLE**, and **FLOAT**.  
  
| Type | Description |
| --- | --- |
| REAL | The JDBC **REAL** type has seven digits of precision (single precision) and maps directly to the  SQL Server |
 | **real** type. |
| DOUBLE | The JDBC **DOUBLE** type has 15 digits of precision (double precision) and maps to the  SQL Server |
 | **float** type. The JDBC **FLOAT** type is a synonym of **DOUBLE**. Because there can be confusion between **FLOAT** and **DOUBLE**, **DOUBLE** is preferred. |
  
## Datetime Types

The JDBC **TIMESTAMP** type maps to the  SQL Server 
 **datetime** and **smalldatetime** types. The **datetime** type is stored in two 4-byte integers. The **smalldatetime** type holds the same information (date and time), but with less accuracy, in two 2-byte small integers.  
  
> **Note:**  
> The  SQL Server 
 **timestamp** type is a fixed-length binary-string type. It does not map to any of the JDBC time types: **DATE**, **TIME**, or **TIMESTAMP**.  
  
## Custom type mapping

The custom type mapping feature of JDBC that uses the SQLData interfaces for the JDBC advanced types (UDTs, Struct, and so on). is not implemented in the JDBC driver.  
  
## Related content

- [Understanding the JDBC driver data types](understanding-the-jdbc-driver-data-types.md)
