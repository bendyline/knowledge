---
title: "Retrieve data by a DataReader"
description: Learn how to retrieve data using a DataReader in ADO.NET with this sample code. DataReader provides an unbuffered stream of data.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra
ms.date: "11/30/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
dev_langs:
  - "csharp"
---
# Retrieve data by a DataReader

 **Applies to**:  .NET Framework  .NET  .NET Standard 




To retrieve data using a **DataReader**, create an instance of the **Command** object, and then create a **DataReader** by calling **Command.ExecuteReader** to retrieve rows from a data source. The **DataReader** provides an unbuffered stream of data that allows procedural logic to efficiently process results from a data source sequentially.

> **Note:**
> The **DataReader** is a good choice when you're retrieving large amounts of data because the data is not cached in memory.

The following example illustrates using a **DataReader**, where `reader` represents a valid DataReader and `command` represents a valid Command object.  

```csharp
reader = command.ExecuteReader();  
```

Use the **DataReader.Read** method to obtain a row from the query results. You can access each column of the returned row by passing the name or ordinal number of the column to the **DataReader**. However, for best performance, the **DataReader** provides a series of methods that allow you to access column values in their native data types (**GetDateTime**, **GetDouble**, **GetGuid**, **GetInt32**, and so on). For a list of typed accessor methods for data provider-specific **DataReaders**, see [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader). Using the typed accessor methods when you know the underlying data type reduces the amount of type conversion required when retrieving the column value.  

The following example iterates through a **DataReader** object and returns two columns from each row.  

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlDataReader_HasRows.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/retrieve-data-by-datareader.md)

## Close the DataReader  

Always call the `Close()` method when you have finished using the `DataReader` object.

> **Note:**
> If your **Command** contains output parameters or return values, those values are not available until the **DataReader** is closed.  

> **Important:**
> While a **DataReader** is open, the **Connection** is in use exclusively by that **DataReader**. You cannot execute any commands for the **Connection**, including creating another **DataReader**, until the original **DataReader** is closed.  

> **Note:**
> Do not call **Close** or **Dispose** on a **Connection**, a **DataReader**, or any other managed object in the **Finalize** method of your class. In a finalizer, only release unmanaged resources that your class owns directly. If your class does not own any unmanaged resources, do not include a **Finalize** method in your class definition. For more information, see [Garbage Collection](https://learn.microsoft.com/dotnet/standard/garbage-collection/index).
 
## Retrieve multiple result-sets using NextResult

If the **DataReader** returns multiple result sets, call the **NextResult** method to iterate through the result sets sequentially. The following example shows the [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader) processing the results of two SELECT statements using the [Microsoft.Data.SqlClient.SqlCommand.ExecuteReader%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.ExecuteReader%252A) method.  

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlDataReader_NextResult.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/retrieve-data-by-datareader.md)

## Get schema information from the DataReader  

While a **DataReader** is open, you can retrieve schema information about the current result set using the **GetSchemaTable** method. **GetSchemaTable** returns a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object populated with rows and columns that contain the schema information for the current result set. The **DataTable** contains one row for each column of the result set. Each column of the schema table maps to a property of the columns returned in the rows of the result set, where the **ColumnName** is the name of the property and the value of the column is the value of the property. The following example writes out the schema information for **DataReader**.  

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlDataReader_GetSchemaTable.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/retrieve-data-by-datareader.md)

## Related content

- [DataAdapters and DataReaders](dataadapters-datareaders.md)
- [Commands and parameters](commands-parameters.md)
- [Retrieving database schema information](retrieving-database-schema-information.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
