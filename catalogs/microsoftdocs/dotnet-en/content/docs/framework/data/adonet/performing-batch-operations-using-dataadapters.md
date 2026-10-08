---
description: "Learn more about batching operations using DataAdapters, instead of sending one operation at a time, to improve performance."
title: "Performing Batch Operations Using DataAdapters"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.custom: sfi-ropc-nochange
---
# Perform batch operations using DataAdapters

Batch support in ADO.NET allows a [System.Data.Common.DataAdapter](https://learn.microsoft.com/search/?terms=System.Data.Common.DataAdapter) to group INSERT, UPDATE, and DELETE operations from a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) or [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) to the server, instead of sending one operation at a time. The reduction in the number of round trips to the server typically results in significant performance gains. Batch updates are supported for the .NET data providers for SQL Server ([System.Data.SqlClient](https://learn.microsoft.com/search/?terms=System.Data.SqlClient)) and Oracle ([System.Data.OracleClient](https://learn.microsoft.com/search/?terms=System.Data.OracleClient)).

 When updating a database with changes from a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) in previous versions of ADO.NET, the `Update` method of a `DataAdapter` performed updates to the database one row at a time. As it iterated through the rows in the specified [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable), it examined each [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) to see if it had been modified. If the row had been modified, it called the appropriate `UpdateCommand`, `InsertCommand`, or `DeleteCommand`, depending on the value of the [System.Data.DataRow.RowState](https://learn.microsoft.com/search/?terms=System.Data.DataRow.RowState) property for that row. Every row update involved a network round-trip to the database.

 Starting with ADO.NET 2.0, the [System.Data.Common.DbDataAdapter](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataAdapter) exposes an [System.Data.Common.DbDataAdapter.UpdateBatchSize](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataAdapter.UpdateBatchSize) property. Setting the `UpdateBatchSize` to a positive integer value causes updates to the database to be sent as batches of the specified size. For example, setting the `UpdateBatchSize` to 10 will group 10 separate statements and submit them as single batch. Setting the `UpdateBatchSize` to 0 will cause the [System.Data.Common.DataAdapter](https://learn.microsoft.com/search/?terms=System.Data.Common.DataAdapter) to use the largest batch size that the server can handle. Setting it to 1 disables batch updates, as rows are sent one at a time.

 Executing an extremely large batch could decrease performance. Therefore, you should test for the optimum batch size setting before implementing your application.

## Using the UpdateBatchSize Property

 When batch updates are enabled, the [System.Data.IDbCommand.UpdatedRowSource](https://learn.microsoft.com/search/?terms=System.Data.IDbCommand.UpdatedRowSource) property value of the DataAdapter's `UpdateCommand`, `InsertCommand`, and `DeleteCommand` should be set to [System.Data.UpdateRowSource.None](https://learn.microsoft.com/search/?terms=System.Data.UpdateRowSource.None) or [System.Data.UpdateRowSource.OutputParameters](https://learn.microsoft.com/search/?terms=System.Data.UpdateRowSource.OutputParameters). When performing a batch update, the command's [System.Data.IDbCommand.UpdatedRowSource](https://learn.microsoft.com/search/?terms=System.Data.IDbCommand.UpdatedRowSource) property value of [System.Data.UpdateRowSource.FirstReturnedRecord](https://learn.microsoft.com/search/?terms=System.Data.UpdateRowSource.FirstReturnedRecord) or [System.Data.UpdateRowSource.Both](https://learn.microsoft.com/search/?terms=System.Data.UpdateRowSource.Both) is invalid.

 The following procedure demonstrates the use of the `UpdateBatchSize` property. The procedure takes two arguments, a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object that has columns representing the `ProductCategoryID` and `Name` fields in the **Production.ProductCategory** table, and an integer representing the batch size (the number of rows in the batch). The code creates a new [System.Data.SqlClient.SqlDataAdapter](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlDataAdapter) object, setting its [System.Data.SqlClient.SqlDataAdapter.UpdateCommand](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlDataAdapter.UpdateCommand), [System.Data.SqlClient.SqlDataAdapter.InsertCommand](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlDataAdapter.InsertCommand), and [System.Data.SqlClient.SqlDataAdapter.DeleteCommand](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlDataAdapter.DeleteCommand) properties. The code assumes that the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object has modified rows. It sets the `UpdateBatchSize` property and executes the update.

```vb
Public Sub BatchUpdate( _
  ByVal dataTable As DataTable, ByVal batchSize As Int32)
    ' Assumes GetConnectionString() returns a valid connection string.
    Dim connectionString As String = GetConnectionString()

    ' Connect to the AdventureWorks database.
    Using connection As New SqlConnection(connectionString)
        ' Create a SqlDataAdapter.
        Dim adapter As New SqlDataAdapter()

        'Set the UPDATE command and parameters.
        adapter.UpdateCommand = New SqlCommand( _
          "UPDATE Production.ProductCategory SET " _
          & "Name=@Name WHERE ProductCategoryID=@ProdCatID;", _
          connection)
        adapter.UpdateCommand.Parameters.Add("@Name", _
          SqlDbType.NVarChar, 50, "Name")
        adapter.UpdateCommand.Parameters.Add("@ProdCatID",  _
          SqlDbType.Int, 4, " ProductCategoryID ")
        adapter.UpdateCommand.UpdatedRowSource = _
          UpdateRowSource.None

        'Set the INSERT command and parameter.
        adapter.InsertCommand = New SqlCommand( _
          "INSERT INTO Production.ProductCategory (Name) VALUES (@Name);", _
  connection)
        adapter.InsertCommand.Parameters.Add("@Name", _
          SqlDbType.NVarChar, 50, "Name")
        adapter.InsertCommand.UpdatedRowSource = _
          UpdateRowSource.None

        'Set the DELETE command and parameter.
        adapter.DeleteCommand = New SqlCommand( _
          "DELETE FROM Production.ProductCategory " _
          & "WHERE ProductCategoryID=@ProdCatID;", connection)
        adapter.DeleteCommand.Parameters.Add("@ProdCatID", _
           SqlDbType.Int, 4, " ProductCategoryID ")
        adapter.DeleteCommand.UpdatedRowSource = UpdateRowSource.None

        ' Set the batch size.
        adapter.UpdateBatchSize = batchSize

        ' Execute the update.
        adapter.Update(dataTable)
    End Using
End Sub
```

```csharp
public static void BatchUpdate(DataTable dataTable,Int32 batchSize)
{
    // Assumes GetConnectionString() returns a valid connection string.
    string connectionString = GetConnectionString();

    // Connect to the AdventureWorks database.
    using (SqlConnection connection = new
      SqlConnection(connectionString))
    {

        // Create a SqlDataAdapter.
        SqlDataAdapter adapter = new SqlDataAdapter();

        // Set the UPDATE command and parameters.
        adapter.UpdateCommand = new SqlCommand(
            "UPDATE Production.ProductCategory SET "
            + "Name=@Name WHERE ProductCategoryID=@ProdCatID;",
            connection);
        adapter.UpdateCommand.Parameters.Add("@Name",
           SqlDbType.NVarChar, 50, "Name");
        adapter.UpdateCommand.Parameters.Add("@ProdCatID",
           SqlDbType.Int, 4, "ProductCategoryID");
         adapter.UpdateCommand.UpdatedRowSource = UpdateRowSource.None;

        // Set the INSERT command and parameter.
        adapter.InsertCommand = new SqlCommand(
            "INSERT INTO Production.ProductCategory (Name) VALUES (@Name);",
            connection);
        adapter.InsertCommand.Parameters.Add("@Name",
          SqlDbType.NVarChar, 50, "Name");
        adapter.InsertCommand.UpdatedRowSource = UpdateRowSource.None;

        // Set the DELETE command and parameter.
        adapter.DeleteCommand = new SqlCommand(
            "DELETE FROM Production.ProductCategory "
            + "WHERE ProductCategoryID=@ProdCatID;", connection);
        adapter.DeleteCommand.Parameters.Add("@ProdCatID",
          SqlDbType.Int, 4, "ProductCategoryID");
        adapter.DeleteCommand.UpdatedRowSource = UpdateRowSource.None;

        // Set the batch size.
        adapter.UpdateBatchSize = batchSize;

        // Execute the update.
        adapter.Update(dataTable);
    }
}
```

## Handling Batch Update-Related Events and Errors

 The `DataAdapter` has two update-related events: `RowUpdating` and **RowUpdated**. In previous versions of ADO.NET, when batch processing is disabled, each of these events is generated once for each row processed. `RowUpdating` is generated before the update occurs, and `RowUpdated` is generated after the database update has been completed.

### Event Behavior Changes with Batch Updates

 When batch processing is enabled, multiple rows are updated in a single database operation. Therefore, only one `RowUpdated` event occurs for each batch, whereas the `RowUpdating` event occurs for each row processed. When batch processing is disabled, the two events are fired with one-to-one interleaving, where one `RowUpdating` event and one `RowUpdated` event fire for a row, and then one `RowUpdating` and one `RowUpdated` event fire for the next row, until all of the rows are processed.

### Accessing Updated Rows

 When batch processing is disabled, the row being updated can be accessed using the [System.Data.Common.RowUpdatedEventArgs.Row](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs.Row) property of the [System.Data.Common.RowUpdatedEventArgs](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs) class.

 When batch processing is enabled, a single `RowUpdated` event is generated for multiple rows. Therefore, the value of the `Row` property for each row is null. `RowUpdating` events are still generated for each row. The [System.Data.Common.RowUpdatedEventArgs.CopyToRows*](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs.CopyToRows*) method of the [System.Data.Common.RowUpdatedEventArgs](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs) class allows you to access the processed rows by copying references to the rows into an array. If no rows are being processed, `CopyToRows` throws an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException). Use the [System.Data.Common.RowUpdatedEventArgs.RowCount](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs.RowCount) property to return the number of rows processed before calling the [System.Data.Common.RowUpdatedEventArgs.CopyToRows*](https://learn.microsoft.com/search/?terms=System.Data.Common.RowUpdatedEventArgs.CopyToRows*) method.

### Handling Data Errors

 Batch execution has the same effect as the execution of each individual statement. Statements are executed in the order that the statements were added to the batch. Errors are handled the same way in batch mode as they are when batch mode is disabled. Each row is processed separately. Only rows that have been successfully processed in the database will be updated in the corresponding [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) within the [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable).

 The data provider and the back-end database server determine which SQL constructs are supported for batch execution. An exception may be thrown if a non-supported statement is submitted for execution.

## See also

- [DataAdapters and DataReaders](dataadapters-and-datareaders.md)
- [Updating Data Sources with DataAdapters](updating-data-sources-with-dataadapters.md)
- [Handling DataAdapter Events](handling-dataadapter-events.md)
- [ADO.NET Overview](ado-net-overview.md)
