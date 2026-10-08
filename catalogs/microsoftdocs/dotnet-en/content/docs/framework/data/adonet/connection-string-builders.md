---
title: "Connection String Builders"
description: Learn about the connection string builder classes used for different providers in ADO.NET, all of which inherit from DbConnectionStringBuilder.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
---
# Connection string builders

In early versions of ADO.NET, compile-time checking of connection strings with concatenated string values did not occur, so that at runtime, an incorrect keyword generated an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException). Each of the .NET Framework data providers supported different syntax for connection string keywords, which made constructing valid connection strings difficult if done manually. To address this problem, ADO.NET 2.0 introduced new connection string builders for each .NET Framework data provider. Each data provider includes a strongly typed connection string builder class that inherits from [System.Data.Common.DbConnectionStringBuilder](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnectionStringBuilder). The following table lists the .NET Framework data providers and their associated connection string builder classes.

| Provider | ConnectionStringBuilder class |
| --- | --- |
| [System.Data.SqlClient](https://learn.microsoft.com/search/?terms=System.Data.SqlClient) | [System.Data.SqlClient.SqlConnectionStringBuilder](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnectionStringBuilder) |
| [System.Data.OleDb](https://learn.microsoft.com/search/?terms=System.Data.OleDb) | [System.Data.OleDb.OleDbConnectionStringBuilder](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbConnectionStringBuilder) |
| [System.Data.Odbc](https://learn.microsoft.com/search/?terms=System.Data.Odbc) | [System.Data.Odbc.OdbcConnectionStringBuilder](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcConnectionStringBuilder) |
| [System.Data.OracleClient](https://learn.microsoft.com/search/?terms=System.Data.OracleClient) | [System.Data.OracleClient.OracleConnectionStringBuilder](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleConnectionStringBuilder) |

## Connection string injection attacks

 A connection string injection attack can occur when dynamic string concatenation is used to build connection strings that are based on user input. If the string is not validated and malicious text or characters not escaped, an attacker can potentially access sensitive data or other resources on the server. For example, an attacker could mount an attack by supplying a semicolon and appending an additional value. The connection string is parsed by using a "last one wins" algorithm, and the hostile input is substituted for a legitimate value.

 The connection string builder classes are designed to eliminate guesswork and protect against syntax errors and security vulnerabilities. They provide methods and properties corresponding to the known key/value pairs permitted by each data provider. Each class maintains a fixed collection of synonyms and can translate from a synonym to the corresponding well-known key name. Checks are performed for valid key/value pairs, and an invalid pair throws an exception. In addition, injected values are handled in a safe manner.

 The following example demonstrates how [System.Data.SqlClient.SqlConnectionStringBuilder](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnectionStringBuilder) handles an inserted extra value for the `Initial Catalog` setting.

```vb
Dim builder As New System.Data.SqlClient.SqlConnectionStringBuilder
builder("Data Source") = "(local)"
builder("Integrated Security") = True
builder("Initial Catalog") = "AdventureWorks;NewValue=Bad"
Console.WriteLine(builder.ConnectionString)
```

```csharp
System.Data.SqlClient.SqlConnectionStringBuilder builder =
  new System.Data.SqlClient.SqlConnectionStringBuilder();
builder["Data Source"] = "(local)";
builder["integrated Security"] = true;
builder["Initial Catalog"] = "AdventureWorks;NewValue=Bad";
Console.WriteLine(builder.ConnectionString);
```

> **Important:**
> Microsoft recommends that you use the most secure authentication flow available. If you're connecting to Azure SQL, [Managed Identities for Azure resources](https://learn.microsoft.com/sql/connect/ado-net/sql/azure-active-directory-authentication#using-managed-identity-authentication) is the recommended authentication method.


The output shows that the [System.Data.SqlClient.SqlConnectionStringBuilder](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnectionStringBuilder) handled this correctly by escaping the extra value in double quotation marks instead of appending it to the connection string as a new key/value pair.

```output
data source=(local);Integrated Security=True;
initial catalog="AdventureWorks;NewValue=Bad"
```

## Build connection strings from configuration files

 If certain elements of a connection string are known beforehand, they can be stored in a configuration file and retrieved at runtime to construct a complete connection string. For example, the name of the database might be known in advance, but not the name of the server.

 One of the overloaded constructors for a connection string builder takes a [System.String](https://learn.microsoft.com/search/?terms=System.String) as an argument, which enables you to supply a partial connection string that can then be completed from user input. The partial connection string can be stored in a configuration file and retrieved at runtime.

> **Note:**
> The [System.Configuration](https://learn.microsoft.com/search/?terms=System.Configuration) namespace allows programmatic access to configuration files that use the [System.Web.Configuration.WebConfigurationManager](https://learn.microsoft.com/search/?terms=System.Web.Configuration.WebConfigurationManager) for web apps and the [System.Configuration.ConfigurationManager](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationManager) for Windows applications. For more information about working with connection strings and configuration files, see [Connection Strings and Configuration Files](connection-strings-and-configuration-files.md).

## See also

- [Connection Strings](connection-strings.md)
- [Privacy and Data Security](privacy-and-data-security.md)
- [ADO.NET Overview](ado-net-overview.md)
