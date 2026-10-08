---
title: "Obtaining a single value from a database"
description: Learn how to return a single value in ADO.NET. This example code returns the identity column value for an inserted record.
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
# Obtaining a single value from a database

 **Applies to**:  .NET Framework  .NET  .NET Standard 




You may need to return database information that is simply a single value rather than in the form of a table or data stream. For example, you may want to return the result of an aggregate function such as COUNT(\*), SUM(Price), or AVG(Quantity). The **Command** object provides the capability to return single values using the **ExecuteScalar** method. The **ExecuteScalar** method returns, as a scalar value, the value of the first column of the first row of the result set.

## Example

The following code example inserts a new value in the database using a [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand). The [Microsoft.Data.SqlClient.SqlCommand.ExecuteScalar%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.ExecuteScalar%252A) method is used to return the identity column value for the inserted record.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlCommand_ExecuteScalar_Return_Id.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/obtain-single-value-from-database.md)

## Related content

- [Commands and parameters](commands-parameters.md)
- [Executing a command](execute-command.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
