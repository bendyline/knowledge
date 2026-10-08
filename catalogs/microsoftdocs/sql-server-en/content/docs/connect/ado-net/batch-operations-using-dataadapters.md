---
title: "Batch operations using DataAdapters"
description: Describes enhancing application performance by reducing the number of round trips to SQL Server when applying updates from the DataSet.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra
ms.date: "11/30/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
dev_langs:
  - "csharp"
---
# Batch operations using DataAdapters

 **Applies to**:  .NET Framework  .NET  .NET Standard 




Batch support in ADO.NET allows a [System.Data.Common.DataAdapter](https://learn.microsoft.com/search/?terms=System.Data.Common.DataAdapter) to group INSERT, UPDATE, and DELETE operations from a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) or [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) to the server, instead of sending one operation at a time. The reduction in the number of round trips to the server typically results in significant performance gains. Batch update is supported for the Microsoft SqlClient data provider for SQL Server ([Microsoft.Data.SqlClient](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient)).

When updating a database with changes from a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) in previous versions of ADO.NET, the `Update` method of a `DataAdapter` performed updates to the database one row at a time. As it iterated through the rows in the specified [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable), it examined each [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) to see if it had been modified. If the row had been modified, it called the appropriate `UpdateCommand`, `InsertCommand`, or `DeleteCommand`, depending on the value of the [System.Data.DataRow.RowState%2A](https://learn.microsoft.com/search/?terms=System.Data.DataRow.RowState%252A) property for that row. Every row update involved a network round-trip to the database.

At the Microsoft SqlClient Data Provider for SQL Server, the [Microsoft.Data.SqlClient.SqlDataAdapter](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataAdapter) exposes an [Microsoft.Data.SqlClient.SqlDataAdapter.UpdateBatchSize%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataAdapter.UpdateBatchSize%252A) property. Setting the `UpdateBatchSize` to a positive integer value causes updates to the database to be sent as batches of the specified size. For example, setting the `UpdateBatchSize` to 10 will group 10 separate statements and submit them as single batch. Setting the `UpdateBatchSize` to 0 will cause the [Microsoft.Data.SqlClient.SqlDataAdapter](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataAdapter) to use the largest batch size that the server can handle. Setting it to 1 disables batch updates, as rows are sent one at a time.

> **Note:**
> Executing an extremely large batch could decrease performance. Therefore, you should test for the optimum batch size setting before implementing your application.

## Use the UpdateBatchSize property

When batch updates are enabled, the [System.Data.IDbCommand.UpdatedRowSource%2A](https://learn.microsoft.com/search/?terms=System.Data.IDbCommand.UpdatedRowSource%252A) property value of the DataAdapter's `UpdateCommand`, `InsertCommand`, and `DeleteCommand` should be set to [System.Data.UpdateRowSource.None](https://learn.microsoft.com/search/?terms=System.Data.UpdateRowSource.None) or [System.Data.UpdateRowSource.OutputParameters](https://learn.microsoft.com/search/?terms=System.Data.UpdateRowSource.OutputParameters). When performing a batch update, the command's [System.Data.IDbCommand.UpdatedRowSource%2A](https://learn.microsoft.com/search/?terms=System.Data.IDbCommand.UpdatedRowSource%252A) property value of [System.Data.UpdateRowSource.FirstReturnedRecord](https://learn.microsoft.com/search/?terms=System.Data.UpdateRowSource.FirstReturnedRecord) or [System.Data.UpdateRowSource.Both](https://learn.microsoft.com/search/?terms=System.Data.UpdateRowSource.Both) is invalid.
  
The following procedure demonstrates the use of the `UpdateBatchSize` property. The procedure takes two arguments, a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that has columns representing the **ProductCategoryID** and **Name** fields in the **Production.ProductCategory** table, and an integer representing the batch size (the number of rows in the batch). The code creates a new [Microsoft.Data.SqlClient.SqlDataAdapter](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataAdapter) object, setting its [Microsoft.Data.SqlClient.SqlDataAdapter.UpdateCommand%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataAdapter.UpdateCommand%252A), [Microsoft.Data.SqlClient.SqlDataAdapter.InsertCommand%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataAdapter.InsertCommand%252A), and [Microsoft.Data.SqlClient.SqlDataAdapter.DeleteCommand%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataAdapter.DeleteCommand%252A) properties. The code assumes that the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object has modified rows. It sets the `UpdateBatchSize` property and executes the update.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlDataAdapter_Batch.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/batch-operations-using-dataadapters.md)

## Handle batch update-related events and errors

The **DataAdapter** has two update-related events: **RowUpdating** and **RowUpdated**. For more information, see [Handle DataAdapter events](handle-dataadapter-events.md).

### Event behavior changes with batch updates

When batch processing is enabled, multiple rows are updated in a single database operation. Therefore, only one `RowUpdated` event occurs for each batch, whereas the `RowUpdating` event occurs for each row processed. When batch processing is disabled, the two events are fired with one-to-one interleaving, where one `RowUpdating` event and one `RowUpdated` event fire for a row, and then one `RowUpdating` and one `RowUpdated` event fire for the next row, until all of the rows are processed.

### Access updated rows

When batch processing is disabled, the row being updated can be accessed using the [System.Data.Common.RowUpdatedEventArgs.Row%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs.Row%252A) property of the [System.Data.Common.RowUpdatedEventArgs](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs) class.

When batch processing is enabled, a single `RowUpdated` event is generated for multiple rows. Therefore, the value of the `Row` property for each row is null. `RowUpdating` events are still generated for each row. The [System.Data.Common.RowUpdatedEventArgs.CopyToRows%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs.CopyToRows%252A) method of the [System.Data.Common.RowUpdatedEventArgs](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs) class allows you to access the processed rows by copying references to the rows into an array. If no rows are being processed, `CopyToRows` throws an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException). Use the [System.Data.Common.RowUpdatedEventArgs.RowCount%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs.RowCount%252A) property to return the number of rows processed before calling the [System.Data.Common.RowUpdatedEventArgs.CopyToRows%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs.CopyToRows%252A) method.

### Handle data errors

Batch execution has the same effect as the execution of each individual statement. Statements are executed in the order that the statements were added to the batch. Errors are handled the same way in batch mode as they are when batch mode is disabled. Each row is processed separately. Only rows that have been successfully processed in the database will be updated in the corresponding [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) within the [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable).

> **Note:**
> The Microsoft SqlClient Data Provider for SQL Server and the back-end database server determine which SQL constructs are supported for batch execution. An exception may be thrown if a non-supported statement is submitted for execution.

## Related content

- [DataAdapters and DataReaders](dataadapters-datareaders.md)
- [Update data sources with DataAdapters](update-data-sources-with-dataadapters.md)
- [Handle DataAdapter events](handle-dataadapter-events.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
