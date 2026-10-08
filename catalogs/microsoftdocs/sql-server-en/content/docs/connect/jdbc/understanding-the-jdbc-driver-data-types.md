---
title: "Understanding the JDBC driver data types"
description: "Learn about JDBC data types and how the Microsoft JDBC Driver for SQL Server converts those types to database types."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "08/12/2019"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
---
# Understanding the JDBC driver data types



 Microsoft JDBC Driver for SQL Server 
 supports the use of JDBC basic and advanced data types within a Java application that uses  SQL Server 
 as its database.  
  
The JDBC type system mediates the conversion between  SQL Server 
 data types and Java language types and objects. The JDBC types are modeled on the SQL-92 and SQL-99 types. The JDBC driver adheres to the JDBC specification and is designed to provide the right balance between predictability and flexibility.  
  
The topics in this section describe how to use the basic and advanced data types, and how data types can be converted into other data types.  
  
## In this section  
  
| Topic | Description |
| --- | --- |
| [Using basic data types](using-basic-data-types.md) | Describes the JDBC basic data types. Includes examples of how to work with the data types by using result sets, parameterized queries, and stored procedures. |
| [Configuring how java.sql.Time values are sent to the server](configuring-how-java-sql-time-values-are-sent-to-the-server.md) | Describes how the JDBC Driver generates dates. |
| [Using advanced data types](using-advanced-data-types.md) | Describes the JDBC advanced data types. |
| [Understanding data type differences](understanding-data-type-differences.md) | Describes differences between the various JDBC driver data types. |
| [Understanding data type conversions](understanding-data-type-conversions.md) | Describes how data type conversion is handled when using getter and setter methods. |
| [National character set support](national-character-set-support.md) | Describes the support for the national character set types. |
| [Supporting XML data](supporting-xml-data.md) | Describes the SQLXML interface. Also describes how to read and write an XML data from and to the relational database with the **SQLXML** Java data type. |
| [Wrappers and interfaces](wrappers-and-interfaces.md) | Discusses the interfaces that have the  Microsoft JDBC Driver for SQL Server |
 | specific methods and constants that allow an application server to create a proxy of the class, Also discusses supports for the `java.sql.Wrapper` interface. |
  
## Related content

- [Overview of the JDBC driver](overview-of-the-jdbc-driver.md)
