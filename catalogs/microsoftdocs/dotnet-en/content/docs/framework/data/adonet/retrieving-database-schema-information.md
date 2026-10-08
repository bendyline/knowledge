---
description: "Learn more about: Retrieving Database Schema Information"
title: "Retrieving Database Schema Information"
ms.date: "03/30/2017"
ms.assetid: 79038d52-f122-4fd4-9bfb-aaa22d6a114b
---
# Retrieving Database Schema Information

Obtaining schema information from a database is accomplished with the process of schema discovery. Schema discovery allows applications to request that managed providers find and return information about the database schema, also known as *metadata*, of a given database. Different database schema elements such as tables, columns, and stored-procedures are exposed through schema collections. Each schema collection contains a variety of schema information specific to the provider being used.

 Each of the .NET Framework managed providers implement the `GetSchema` method in the `Connection` class, and the schema information that is returned from the `GetSchema` method comes in the form of a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable). The `GetSchema` method is an overloaded method that provides optional parameters for specifying the schema collection to return, and restricting the amount of information returned.

 The .NET Framework Data Providers for OLE DB, ODBC, Oracle, and SqlClient provide a `GetSchemaTable` method that returns a DataTable describing the column metadata of the **DataReader**.

 The .NET Framework Data Provider for OLE DB also exposes schema information by using the [System.Data.OleDb.OleDbConnection.GetOleDbSchemaTable*](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbConnection.GetOleDbSchemaTable*) method of the [System.Data.OleDb.OleDbConnection](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbConnection) object. As arguments, `GetOleDbSchemaTable` takes an [System.Data.OleDb.OleDbSchemaGuid](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbSchemaGuid) that identifies the schema information to return, and an array of restrictions on those returned columns. `GetOleDbSchemaTable` returns a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) populated with the requested schema information.

## In This Section

 [GetSchema and Schema Collections](getschema-and-schema-collections.md)
 Describes the `GetSchema` method and how it can be used to retrieve and restrict schema information from a database.

 Schema Restrictions
 Describes schema restrictions that can be used with **GetSchema**.

 [Common Schema Collections](common-schema-collections.md)
 Describes all of the common schema collections supported by all of the .NET Framework managed providers.

 [SQL Server Schema Collections](sql-server-schema-collections.md)
 Describes the schema collection supported by the .NET Framework provider for SQL Server.

 [Oracle Schema Collections](oracle-schema-collections.md)
 Describes the schema collection supported by the .NET Framework provider for Oracle.

 [ODBC Schema Collections](odbc-schema-collections.md)
 Describes the schema collections for ODBC drivers.

 [OLE DB Schema Collections](ole-db-schema-collections.md)
 Describes the schema collections for OLE DB providers.

## Reference

 [System.Data.Common.DbConnection.GetSchema*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnection.GetSchema*)
 Describes the `GetSchema` method of the [System.Data.Common.DbConnection](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnection) class.

 [System.Data.Odbc.OdbcConnection.GetSchema*](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcConnection.GetSchema*)
 Describes the `GetSchema` method of the [System.Data.Odbc.OdbcConnection](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcConnection) class.

 [System.Data.OleDb.OleDbConnection.GetSchema*](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbConnection.GetSchema*)
 Describes the `GetSchema` method of the [System.Data.OleDb.OleDbConnection](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbConnection) class.

 [System.Data.OracleClient.OracleConnection.GetSchema*](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleConnection.GetSchema*)
 Describes the `GetSchema` method of the [System.Data.OracleClient.OracleConnection](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleConnection) class.

 [System.Data.SqlClient.SqlConnection.GetSchema*](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnection.GetSchema*)
 Describes the `GetSchema` method of the [System.Data.SqlClient.SqlConnection](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnection) class.

 [System.Data.Common.DbDataReader.GetSchemaTable*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader.GetSchemaTable*)
 Describes the `GetSchemaTable` method of the [System.Data.Common.DbDataReader](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader) class.

 [System.Data.Odbc.OdbcDataReader.GetSchemaTable*](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcDataReader.GetSchemaTable*)
 Describes the `GetSchemaTable` method of the [System.Data.Odbc.OdbcDataReader](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcDataReader) class.

 [System.Data.OleDb.OleDbDataReader.GetSchemaTable*](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbDataReader.GetSchemaTable*)
 Describes the `GetSchemaTable` method of the [System.Data.OleDb.OleDbDataReader](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbDataReader) class.

 [System.Data.OracleClient.OracleDataReader.GetSchemaTable*](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleDataReader.GetSchemaTable*)
 Describes the `GetSchemaTable` method of the [System.Data.OracleClient.OracleDataReader](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleDataReader) class.

 [System.Data.SqlClient.SqlDataReader.GetSchemaTable*](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlDataReader.GetSchemaTable*)
 Describes the `GetSchemaTable` method of the [System.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlDataReader) class.

## See also

- [Retrieving and Modifying Data in ADO.NET](retrieving-and-modifying-data.md)
- [ADO.NET Overview](ado-net-overview.md)
