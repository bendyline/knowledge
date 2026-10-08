---
title: "Using Commands to modify data"
description: Describes how to use a data provider to execute stored procedures or data definition language (DDL) statements.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra
ms.date: "11/25/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
---
# Using commands to modify data

 **Applies to**:  .NET Framework  .NET  .NET Standard 




Using the Microsoft SqlClient Data Provider for SQL Server, you can execute stored procedures or data definition language statements (for example, CREATE TABLE and ALTER COLUMN) to perform schema manipulation on a database or catalog. These commands do not return rows as a query would, so the [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) object provides an [Microsoft.Data.SqlClient.SqlCommand.ExecuteNonQuery%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.ExecuteNonQuery%252A) to process them.

In addition to using **ExecuteNonQuery** to modify schema, you can also use this method to process SQL statements that modify data but that do not return rows, such as INSERT, UPDATE, and DELETE.

Although rows are not returned by the **ExecuteNonQuery** method, input and output parameters and return values can be passed and returned via the **Parameters** collection of the **Command** object.

## In this section

[Updating data in a data source](update-data-inside-data-source.md)  
Describes how to execute commands or stored procedures that modify data in a database.

[Performing catalog operations](perform-catalog-operations.md)  
Describes how to execute commands that modify database schema.

## Related content

- [Retrieving and modifying data in ADO.NET](retrieving-modifying-data.md)
- [Commands and parameters](commands-parameters.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
