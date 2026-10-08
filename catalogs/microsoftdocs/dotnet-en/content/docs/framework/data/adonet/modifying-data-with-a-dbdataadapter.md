---
description: "Learn more about: Modifying Data with a DbDataAdapter"
title: "Modifying Data with a DbDataAdapter"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: e35c7f9e-648b-4fcc-9361-d365c3e42c9a
---
# Modifying Data with a DbDataAdapter

The [System.Data.Common.DbProviderFactory.CreateDataAdapter*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory.CreateDataAdapter*) method of a [System.Data.Common.DbProviderFactory](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory) object gives you a [System.Data.Common.DbDataAdapter](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataAdapter) object that is strongly typed to the underlying data provider specified at the time you create the factory. You can then use a [System.Data.Common.DbCommandBuilder](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommandBuilder) to create commands to insert, update, and delete data from a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) to a data source.

## Retrieving Data with a DbDataAdapter

 This example demonstrates how to create a strongly typed `DbDataAdapter` based on a provider name and connection string. The code uses the [System.Data.Common.DbProviderFactory.CreateConnection*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory.CreateConnection*) method of the [System.Data.Common.DbProviderFactory](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory) to create a [System.Data.Common.DbConnection](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnection). Next, the code uses the [System.Data.Common.DbProviderFactory.CreateCommand*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory.CreateCommand*) method to create a [System.Data.Common.DbCommand](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommand) to select data by setting its `CommandText` and `Connection` properties. Finally, the code creates a [System.Data.Common.DbDataAdapter](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataAdapter) object using the [System.Data.Common.DbProviderFactory.CreateDataAdapter*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory.CreateDataAdapter*) method and sets its `SelectCommand` property. The `Fill` method of the `DbDataAdapter` loads the data into a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable).

 [DataWorks DbProviderFactories.DbDataAdapter#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbDataAdapter/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbDataAdapter/CS/source.cs.md>)
 [DataWorks DbProviderFactories.DbDataAdapter#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbDataAdapter/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbDataAdapter/VB/source.vb.md>)

## Modifying Data with a DbDataAdapter

 This example demonstrates how to modify data in a `DataTable` using a [System.Data.Common.DbDataAdapter](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataAdapter) by using a [System.Data.Common.DbCommandBuilder](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommandBuilder) to generate the commands required for updating data at the data source. The [System.Data.Common.DbDataAdapter.SelectCommand](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataAdapter.SelectCommand) of the `DbDataAdapter` is set to retrieve the CustomerID and CompanyName from the Customers table. The [System.Data.Common.DbCommandBuilder.GetInsertCommand*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommandBuilder.GetInsertCommand*) method is used to set the [System.Data.Common.DbDataAdapter.InsertCommand](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataAdapter.InsertCommand) property, the [System.Data.Common.DbCommandBuilder.GetUpdateCommand*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommandBuilder.GetUpdateCommand*) method is used to set the [System.Data.Common.DbDataAdapter.UpdateCommand](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataAdapter.UpdateCommand) property, and the [System.Data.Common.DbCommandBuilder.GetDeleteCommand*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbCommandBuilder.GetDeleteCommand*) method is used to set the [System.Data.Common.DbDataAdapter.DeleteCommand](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataAdapter.DeleteCommand) property. The code adds a new row to the Customers table and updates the data source. The code then locates the added row by searching on the CustomerID, which is the primary key defined for the Customers table. It changes the CompanyName and updates the data source. Finally, the code deletes the row.

 [DataWorks DbProviderFactories.DbDataAdapterModify#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbDataAdapterModify/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbDataAdapterModify/CS/source.cs.md>)
 [DataWorks DbProviderFactories.DbDataAdapterModify#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbDataAdapterModify/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.DbDataAdapterModify/VB/source.vb.md>)

## Handling Parameters

 The .NET Framework data providers handle naming and specifying parameters and parameter placeholders differently. This syntax is tailored to a specific data source, as described in the following table.

| Data provider | Parameter naming syntax |
| --- | --- |
| `SqlClient` | Uses named parameters in the format `@`*parametername*. |
| `OracleClient` | Uses named parameters in the format `:`*parmname* (or *parmname*). |
| `OleDb` | Uses positional parameter markers indicated by a question mark (`?`). |
| `Odbc` | Uses positional parameter markers indicated by a question mark (`?`). |

 The factory model is not helpful for creating parameterized `DbCommand` and `DbDataAdapter` objects. You will need to branch in your code to create parameters that are tailored to your data provider.

> **Important:**
> Avoiding provider-specific parameters altogether by using string concatenation to construct direct SQL statements is not recommended for security reasons. Using string concatenation instead of parameters leaves your application vulnerable to SQL injection attacks.

## See also

- [DbProviderFactories](dbproviderfactories.md)
- [Obtaining a DbProviderFactory](obtaining-a-dbproviderfactory.md)
- [DbConnection, DbCommand and DbException](dbconnection-dbcommand-and-dbexception.md)
- [ADO.NET Overview](ado-net-overview.md)
