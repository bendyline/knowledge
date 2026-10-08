---
description: "Learn more about: DbConnection, DbCommand and DbException"
title: "DbConnection, DbCommand and DbException"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 58aab611-7e6f-4749-b983-28ab7ae87dbe
---
# DbConnection, DbCommand and DbException

Once you have created a [System.Data.Common.DbProviderFactory](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory) and a [System.Data.Common.DbConnection](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnection), you can then work with commands and data readers to retrieve data from the data source.

## Retrieving Data Example

 This example takes a `DbConnection` object as an argument. A [System.Data.Common.DbCommand](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommand) is created to select data from the Categories table by setting the [System.Data.Common.DbCommand.CommandText*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommand.CommandText*) to a SQL SELECT statement. The code assumes that the Categories table exists at the data source. The connection is opened and the data is retrieved using a [System.Data.Common.DbDataReader](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader).

 [DataWorks DbProviderFactories.DbCommandData#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbCommandData/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbCommandData/CS/source.cs.md>)
 [DataWorks DbProviderFactories.DbCommandData#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbCommandData/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbCommandData/VB/source.vb.md>)

## Executing a Command Example

 This example takes a `DbConnection` object as an argument. If the `DbConnection` is valid, the connection is opened and a [System.Data.Common.DbCommand](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommand) is created and executed. The [System.Data.Common.DbCommand.CommandText*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommand.CommandText*) is set to a SQL INSERT statement that performs an insert to the Categories table in the Northwind database. The code assumes that the Northwind database exists at the data source, and that the SQL syntax used in the INSERT statement is valid for the specified provider. Errors occurring at the data source are handled by the [System.Data.Common.DbException](https://learn.microsoft.com/search/?terms=System.Data.Common.DbException) code block, and all other exceptions are handled in the [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) block.

 [DataWorks DbProviderFactories.DbCommand#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbCommand/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbCommand/CS/source.cs.md>)
 [DataWorks DbProviderFactories.DbCommand#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbCommand/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbCommand/VB/source.vb.md>)

## Handling Data Errors with DbException

 The [System.Data.Common.DbException](https://learn.microsoft.com/search/?terms=System.Data.Common.DbException) class is the base class for all exceptions thrown on behalf of a data source. You can use it in your exception handling code to handle exceptions thrown by different providers without having to reference a specific exception class. The following code fragment demonstrates how to use [System.Data.Common.DbException](https://learn.microsoft.com/search/?terms=System.Data.Common.DbException) to display error information returned by the data source using [System.Exception.GetType*](https://learn.microsoft.com/search/?terms=System.Exception.GetType*), [System.Exception.Source*](https://learn.microsoft.com/search/?terms=System.Exception.Source*), [System.Runtime.InteropServices.ExternalException.ErrorCode*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ExternalException.ErrorCode*), and [System.Exception.Message](https://learn.microsoft.com/search/?terms=System.Exception.Message) properties. The output will display the type of error, the source indicating the provider name, an error code, and the message associated with the error.

```vb
Try
    ' Do work here.
Catch ex As DbException
    ' Display information about the exception.
    Console.WriteLine("GetType: {0}", ex.GetType())
    Console.WriteLine("Source: {0}", ex.Source)
    Console.WriteLine("ErrorCode: {0}", ex.ErrorCode)
    Console.WriteLine("Message: {0}", ex.Message)
Finally
    ' Perform cleanup here.
End Try
```

```csharp
try
{
    // Do work here.
}
catch (DbException ex)
{
    // Display information about the exception.
    Console.WriteLine("GetType: {0}", ex.GetType());
    Console.WriteLine("Source: {0}", ex.Source);
    Console.WriteLine("ErrorCode: {0}", ex.ErrorCode);
    Console.WriteLine("Message: {0}", ex.Message);
}
finally
{
    // Perform cleanup here.
}
```

## See also

- [DbProviderFactories](dbproviderfactories.md)
- [Obtaining a DbProviderFactory](obtaining-a-dbproviderfactory.md)
- [Modifying Data with a DbDataAdapter](modifying-data-with-a-dbdataadapter.md)
- [ADO.NET Overview](ado-net-overview.md)
