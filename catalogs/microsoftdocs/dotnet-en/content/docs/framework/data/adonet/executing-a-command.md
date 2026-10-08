---
description: "Learn more about: Executing a Command"
title: "Executing a Command"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 40494916-c25a-4cb8-8f7c-fcb8d378464e
---
# Executing a Command

Each .NET Framework data provider included with the .NET Framework has its own command object that inherits from [System.Data.Common.DbCommand](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommand). The .NET Framework Data Provider for OLE DB includes an [System.Data.OleDb.OleDbCommand](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbCommand) object, the .NET Framework Data Provider for SQL Server includes a [System.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlCommand) object, the .NET Framework Data Provider for ODBC includes an [System.Data.Odbc.OdbcCommand](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcCommand) object, and the .NET Framework Data Provider for Oracle includes an [System.Data.OracleClient.OracleCommand](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleCommand) object. Each of these objects exposes methods for executing commands based on the type of command and desired return value, as described in the following table.

| Command | Return Value |
| --- | --- |
| `ExecuteReader` | Returns a `DataReader` object. |
| `ExecuteScalar` | Returns a single scalar value. |
| `ExecuteNonQuery` | Executes a command that does not return any rows. |
| `ExecuteXMLReader` | Returns an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader). Available for a `SqlCommand` object only. |

 Each strongly typed command object also supports a [System.Data.CommandType](https://learn.microsoft.com/search/?terms=System.Data.CommandType) enumeration that specifies how a command string is interpreted, as described in the following table.

| CommandType | Description |
| --- | --- |
| `Text` | An SQL command defining the statements to be executed at the data source. |
| `StoredProcedure` | The name of the stored procedure. You can use the `Parameters` property of a command to access input and output parameters and return values, regardless of which `Execute` method is called. When using `ExecuteReader`, return values and output parameters will not be accessible until the `DataReader` is closed. |
| `TableDirect` | The name of a table. |

## Example

 The following code example demonstrates how to create a [System.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlCommand) object to execute a stored procedure by setting its properties. A [System.Data.SqlClient.SqlParameter](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlParameter) object is used to specify the input parameter to the stored procedure. The command is executed using the [System.Data.SqlClient.SqlCommand.ExecuteReader*](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlCommand.ExecuteReader*) method, and the output from the [System.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlDataReader) is displayed in the console window.

 [DataWorks SqlClient.StoredProcedure#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks SqlClient.StoredProcedure/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks SqlClient.StoredProcedure/CS/source.cs.md>)
 [DataWorks SqlClient.StoredProcedure#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks SqlClient.StoredProcedure/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks SqlClient.StoredProcedure/VB/source.vb.md>)

### Troubleshooting Commands

 The .NET Framework Data Provider for SQL Server adds performance counters to enable you to detect intermittent problems related to failed command executions. For more information see [Performance Counters](performance-counters.md).

## See also

- [Commands and Parameters](commands-and-parameters.md)
- [DataAdapters and DataReaders](dataadapters-and-datareaders.md)
- [ADO.NET Overview](ado-net-overview.md)
