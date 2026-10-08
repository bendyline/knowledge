---
title: "Obtain a SqlClientFactory"
description: Learn how to obtain a SqlClientFactory from the DbProviderFactories class to work with specific data sources in .NET.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra
ms.date: "12/22/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
---
# Obtain a SqlClientFactory

 **Applies to**:  .NET Framework  .NET  .NET Standard 




The process of obtaining a [System.Data.Common.DbProviderFactory](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactory) involves passing information about a data provider to the [System.Data.Common.DbProviderFactories](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactories) class. Based on this information, the [System.Data.Common.DbProviderFactories.GetFactory%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactories.GetFactory%252A) method creates a strongly typed provider factory. For example, to create a [Microsoft.Data.SqlClient.SqlClientFactory](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlClientFactory), you can pass `GetFactory` a string with the provider name specified as "**Microsoft.Data.SqlClient**".

The other overload of `GetFactory` takes a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow). Once you create the provider factory, you can then use its methods to create additional objects. Some of the methods of a `SqlClientFactory` include [Microsoft.Data.SqlClient.SqlClientFactory.CreateConnection%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlClientFactory.CreateConnection%252A), [Microsoft.Data.SqlClient.SqlClientFactory.CreateCommand%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlClientFactory.CreateCommand%252A), and [Microsoft.Data.SqlClient.SqlClientFactory.CreateDataAdapter%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlClientFactory.CreateDataAdapter%252A).

## Register SqlClientFactory

To retrieve the [Microsoft.Data.SqlClient.SqlClientFactory](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlClientFactory) object by the [System.Data.Common.DbProviderFactories](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactories) class in .NET Framework, it's necessary to register it in a **App.config** or **web.config** file. The following configuration file fragment shows the syntax and format for [Microsoft.Data.SqlClient](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient).  

```xml  
<system.data>
  <DbProviderFactories>
    <add name="Microsoft SqlClient Data Provider"
      invariant="Microsoft.Data.SqlClient"
      description="Microsoft SqlClient Data Provider for SQL Server"
      type="Microsoft.Data.SqlClient.SqlClientFactory, Microsoft.Data.SqlClient, Version=2.0.20168.4, Culture=neutral, PublicKeyToken=23ec7fc2d6eaa4a5"/>
  </DbProviderFactories>
</system.data>  
```  

The **invariant** attribute identifies the underlying data provider. This three-part naming syntax is also used when creating a new factory and for identifying the provider in an application configuration file so that the provider name, along with its associated connection string, can be retrieved at run time.  

> **Note:**  
> In .NET core, since there is no GAC or global configuration support, the [Microsoft.Data.SqlClient.SqlClientFactory](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlClientFactory) object should be registered by calling [System.Data.Common.DbProviderFactories.RegisterFactory%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbProviderFactories.RegisterFactory%252A) method in the project.

The following sample shows how to use the [Microsoft.Data.SqlClient.SqlClientFactory](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlClientFactory) in a .NET core application.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlClientFactory_Netcoreapp.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/obtain-sqlclientfactory.md)

## Related content

- [DbProviderFactories](dbproviderfactories.md)
- [Connection strings in ADO.NET](connection-strings.md)
- [Using the configuration classes](https://learn.microsoft.com/previous-versions/aspnet/ms228063\(v=vs.100\))
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
