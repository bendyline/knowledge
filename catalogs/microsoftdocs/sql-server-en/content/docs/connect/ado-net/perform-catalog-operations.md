---
title: "Performing catalog operations"
description: Describes how to execute commands that modify database schema.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra
ms.date: "11/25/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
dev_langs:
  - "csharp"
---
# Performing catalog operations

 **Applies to**:  .NET Framework  .NET  .NET Standard 




To execute a command to modify a database or catalog, such as the CREATE TABLE or CREATE PROCEDURE statement, create a **Command** object using the appropriate SQL statements and a **Connection** object. Execute the command with the [Microsoft.Data.SqlClient.SqlCommand.ExecuteNonQuery%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.ExecuteNonQuery%252A) method of the [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) object.

## Example

The following code example creates a stored procedure in a Microsoft SQL Server database.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlCommand_ExecuteNonQuery_SP_DML.cs#3](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/perform-catalog-operations.md)

## Related content

- [Using commands to modify data](use-commands-to-modify-data.md)
- [Commands and parameters](commands-parameters.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
