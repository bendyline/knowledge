---
title: "Executing a command"
description: Describes the Microsoft SqlClient Data Provider for SQL Server `Command` object and how to use it to execute queries and commands against a data source.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra
ms.date: "11/25/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
dev_langs:
  - "csharp"
---
# Executing a command

 **Applies to**:  .NET Framework  .NET  .NET Standard 




The Microsoft SqlClient Data Provider for SQL Server has [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) object that inherits from [System.Data.Common.DbCommand](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommand). This object exposes methods for executing commands based on the type of command and desired return value, as described in the following table.

| Command | Return Value |
| --- | --- |
| `ExecuteReader` | Returns a `DataReader` object. |
| `ExecuteScalar` | Returns a single scalar value. |
| `ExecuteNonQuery` | Executes a command that does not return any rows. |
| `ExecuteXMLReader` | Returns an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader). Available for a `SqlCommand` object only. |

Each strongly typed command object also supports a [System.Data.CommandType](https://learn.microsoft.com/search/?terms=System.Data.CommandType) enumeration that specifies how a command string is interpreted, as described in the following table.

| CommandType | Description |
| --- | --- |
| `Text` | A SQL command defining the statements to be executed at the data source. |
| `StoredProcedure` | The name of the stored procedure. You can use the `Parameters` property of a command to access input and output parameters and return values, regardless of which `Execute` method is called. |
| `TableDirect` | The name of a table. |

> **Important:**
> When using `ExecuteReader`, return values and output parameters will not be accessible until the `DataReader` is closed.

## Example

The following code example demonstrates how to create a [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) object to execute a stored procedure by setting its properties. A [Microsoft.Data.SqlClient.SqlParameter](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlParameter) object is used to specify the input parameter to the stored procedure. The command is executed using the [Microsoft.Data.SqlClient.SqlCommand.ExecuteReader%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.ExecuteReader%252A) method, and the output from the [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader) is displayed in the console window.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlCommand_StoredProcedure.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/execute-command.md)

### Troubleshooting commands

The Microsoft SqlClient Data Provider for SQL Server adds **diagnostic counters** to enable you to detect intermittent problems related to failed command executions. For more information, see [Diagnostic counters in SqlClient](diagnostic-counters.md).

## Related content

- [Commands and parameters](commands-parameters.md)
- [DataAdapters and DataReaders](dataadapters-datareaders.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
