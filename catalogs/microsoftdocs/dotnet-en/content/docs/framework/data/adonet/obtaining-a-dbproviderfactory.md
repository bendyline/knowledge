---
title: "Obtaining a DbProviderFactory"
description: Learn how to obtain a DbProviderFactory from the DbProviderFactories class to work with specific data sources in .NET Framework.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
---
# Obtaining a DbProviderFactory

The process of obtaining a [System.Data.Common.DbProviderFactory](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory) involves passing information about a data provider to the [System.Data.Common.DbProviderFactories](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactories) class. Based on this information, the [System.Data.Common.DbProviderFactories.GetFactory*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactories.GetFactory*) method creates a strongly typed provider factory. For example, to create a [System.Data.SqlClient.SqlClientFactory](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlClientFactory), you can pass `GetFactory` a string with the provider name specified as "System.Data.SqlClient". The other overload of `GetFactory` takes a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow). Once you create the provider factory, you can then use its methods to create additional objects. Some of the methods of a `SqlClientFactory` include [System.Data.SqlClient.SqlClientFactory.CreateConnection*](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlClientFactory.CreateConnection*), [System.Data.SqlClient.SqlClientFactory.CreateCommand*](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlClientFactory.CreateCommand*), and [System.Data.SqlClient.SqlClientFactory.CreateDataAdapter*](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlClientFactory.CreateDataAdapter*).

> **Note:**
> The [System.Data.OracleClient.OracleClientFactory](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleClientFactory), [System.Data.Odbc.OdbcFactory](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcFactory), and [System.Data.OleDb.OleDbFactory](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbFactory) classes also provide similar functionality.

## Registering DbProviderFactories

 Each .NET Framework data provider that supports a factory-based class registers configuration information in the `DbProviderFactories` section of the **machine.config** file on the local computer. The following configuration file fragment shows the syntax and format for [System.Data.SqlClient](https://learn.microsoft.com/search/?terms=System.Data.SqlClient).

```xml
<system.data>
  <DbProviderFactories>
    <add name="SqlClient Data Provider"
     invariant="System.Data.SqlClient"
     description=".Net Framework Data Provider for SqlServer"
     type="System.Data.SqlClient.SqlClientFactory, System.Data,
     Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089"
    />
  </DbProviderFactories>
</system.data>
```

 The `invariant` attribute identifies the underlying data provider. This three-part naming syntax is also used when creating a new factory and for identifying the provider in an application configuration file so that the provider name, along with its associated connection string, can be retrieved at runtime.

## Retrieving Provider Information

 You can retrieve information about all of the data providers installed on the local computer by using the [System.Data.Common.DbProviderFactories.GetFactoryClasses*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactories.GetFactoryClasses*) method. It returns a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) named `DbProviderFactories` that contains the columns described in the following table.

| Column ordinal | Column name | Example output | Description |
| --- | --- | --- | --- |
| 0 | `Name` | SqlClient Data Provider | Readable name for the data provider |
| 1 | `Description` | .Net Framework Data Provider for SqlServer | Readable description of the data provider |
| 2 | `InvariantName` | System.Data.SqlClient | Name that can be used programmatically to refer to the data provider |
| 3 | `AssemblyQualifiedName` | System.Data.SqlClient.SqlClientFactory, System.Data, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089 | Fully qualified name of the factory class, which contains enough information to instantiate the object |

 This `DataTable` can be used to enable a user to select a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) at runtime. The selected `DataRow` can then be passed to the [System.Data.Common.DbProviderFactories.GetFactory*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactories.GetFactory*) method to create a strongly typed [System.Data.Common.DbProviderFactory](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory). A selected [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) can be passed to the `GetFactory` method to create the desired `DbProviderFactory` object.

## Listing the Installed Provider Factory Classes

 This example demonstrates how to use the [System.Data.Common.DbProviderFactories.GetFactoryClasses*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactories.GetFactoryClasses*) method to return a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) containing information about the installed providers. The code iterates through each row in the `DataTable`, displaying information for each installed provider in the console window.

 [DataWorks DbProviderFactories#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories/CS/source.cs.md>)
 [DataWorks DbProviderFactories#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories/VB/source.vb.md>)

## Using Application Configuration Files to Store Factory Information

 The design pattern used for working with factories entails storing provider and connection string information in an application configuration file, such as **app.config** for a Windows application, and **web.config** for an ASP.NET application.

 The following configuration file fragment demonstrates how to save two named connection strings: "NorthwindSQL" for a connection to the Northwind database in SQL Server, and "NorthwindAccess" for a connection to the Northwind database in Access/Jet. The `invariant` name is used for the `providerName` attribute.

```xml
<configuration>
  <connectionStrings>
    <clear/>
    <add name="NorthwindSQL"
     providerName="System.Data.SqlClient"
     connectionString=
     "Data Source=MSSQL1;Initial Catalog=Northwind;Integrated Security=true"
    />

    <add name="NorthwindAccess"
     providerName="System.Data.OleDb"
     connectionString=
     "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\Data\Northwind.mdb;"
    />
  </connectionStrings>
</configuration>
```

> **Important:**
> Microsoft recommends that you use the most secure authentication flow available. If you're connecting to Azure SQL, [Managed Identities for Azure resources](https://learn.microsoft.com/sql/connect/ado-net/sql/azure-active-directory-authentication#using-managed-identity-authentication) is the recommended authentication method.


### Retrieve a Connection String by Provider Name

 In order to create a provider factory, you must supply a connection string as well as the provider name. This example demonstrates how to retrieve a connection string from an application configuration file by passing the provider name in the invariant format "*System.Data.ProviderName*". The code iterates through the [System.Configuration.ConnectionStringSettingsCollection](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettingsCollection). It returns the [System.Configuration.ConnectionStringSettings.ProviderName*](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettings.ProviderName*) on success; otherwise `null` (`Nothing` in Visual Basic). If there are multiple entries for a provider, the first one found is returned. For more information and examples of retrieving connection strings from configuration files, see [Connection Strings and Configuration Files](connection-strings-and-configuration-files.md).

> **Note:**
> A reference to `System.Configuration.dll` is required in order for the code to run.

 [DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider/CS/source.cs.md>)
 [DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider/VB/source.vb.md>)

## Creating the DbProviderFactory and DbConnection

 This example demonstrates how to create a [System.Data.Common.DbProviderFactory](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory) and [System.Data.Common.DbConnection](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnection) object by passing it the provider name in the format "*System.Data.ProviderName*" and a connection string. A `DbConnection` object is returned on success; `null` (`Nothing` in Visual Basic) on any error.

 The code obtains the `DbProviderFactory` by calling [System.Data.Common.DbProviderFactories.GetFactory*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactories.GetFactory*). Then the [System.Data.Common.DbProviderFactory.CreateConnection*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory.CreateConnection*) method creates the [System.Data.Common.DbConnection](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnection) object and the [System.Data.Common.DbConnection.ConnectionString](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnection.ConnectionString) property is set to the connection string.

 [DataWorks DbProviderFactories.GetFactory#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.GetFactory/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.GetFactory/CS/source.cs.md>)
 [DataWorks DbProviderFactories.GetFactory#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.GetFactory/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DbProviderFactories.GetFactory/VB/source.vb.md>)

## See also

- [DbProviderFactories](dbproviderfactories.md)
- [Connection Strings](connection-strings.md)
- [Using the Configuration Classes](https://learn.microsoft.com/previous-versions/aspnet/ms228063\(v=vs.100\))
- [ADO.NET Overview](ado-net-overview.md)
