---
title: "SqlClient streaming support"
description: Describes how to write applications that stream large data from SQL Server without loading it all in memory.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: cmalhotra, davidengel, paulmedynski
ms.date: "12/04/2020"
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
---
# SqlClient streaming support

 **Applies to**:  .NET Framework  .NET  .NET Standard 




Streaming support between SQL Server and an application supports unstructured data on the server (documents, images, and media files). A SQL Server database can store binary large objects (BLOBs), but retrieving BLOBS can use a large amount of memory.

Streaming support to and from SQL Server simplifies writing applications that stream data, without having to fully load the data into memory, resulting in fewer memory overflow exceptions.

Streaming support also enables middle-tier applications to scale better, especially in scenarios where business objects connect to Azure SQL in order to send, retrieve, and manipulate large BLOBs.

> **Warning:**
> The members that support streaming are used to retrieve data from queries and to pass parameters to queries and stored procedures. The streaming feature addresses basic Online Transaction Processing (OLTP) and data migration scenarios and is applicable to on-premises and off-premises data migrations environments.

## Streaming support from SQL Server

Streaming support from SQL Server introduces new functionality in the [System.Data.Common.DbDataReader](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader) and in the [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader) classes in order to get [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream), [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader), and [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader) objects and react to them. These classes are used to retrieve data from queries. As a result, Streaming support from SQL Server addresses OLTP scenarios and applies to on-premises and off-premises environments.

The following members were added to [Microsoft.Data.SqlClient.SqlDataReader](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader) to enable streaming support from SQL Server:

- [Microsoft.Data.SqlClient.SqlDataReader.IsDBNullAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader.IsDBNullAsync%252A)

- [Microsoft.Data.SqlClient.SqlDataReader.GetFieldValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader.GetFieldValue%252A)

- [Microsoft.Data.SqlClient.SqlDataReader.GetFieldValueAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader.GetFieldValueAsync%252A)

- [Microsoft.Data.SqlClient.SqlDataReader.GetStream%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader.GetStream%252A)

- [Microsoft.Data.SqlClient.SqlDataReader.GetTextReader%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader.GetTextReader%252A)

- [Microsoft.Data.SqlClient.SqlDataReader.GetXmlReader%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlDataReader.GetXmlReader%252A)

The following members were added to [System.Data.Common.DbDataReader](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader) to enable streaming support from SQL Server:

- [System.Data.Common.DbDataReader.GetFieldValue%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader.GetFieldValue%252A)

- [System.Data.Common.DbDataReader.GetStream%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader.GetStream%252A)

- [System.Data.Common.DbDataReader.GetTextReader%2A](https://learn.microsoft.com/search/?terms=System.Data.Common.DbDataReader.GetTextReader%252A)

## Streaming support to SQL Server

Streaming support to SQL Server is in the [Microsoft.Data.SqlClient.SqlParameter](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlParameter) class so it can accept and react to [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader), [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream), and [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader) objects. [Microsoft.Data.SqlClient.SqlParameter](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlParameter) is used to pass parameters to queries and stored procedures.

> **Note:**
> Disposing a [Microsoft.Data.SqlClient.SqlCommand](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand) object or calling [Microsoft.Data.SqlClient.SqlCommand.Cancel%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlCommand.Cancel%252A) must cancel any streaming operation. If an application sends [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken), cancellation isn't guaranteed.

The following [Microsoft.Data.SqlClient.SqlParameter.SqlDbType%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlParameter.SqlDbType%252A) types accept a [Microsoft.Data.SqlClient.SqlParameter.Value%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlParameter.Value%252A) of [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream):

- `Binary`

- `VarBinary`

The following [Microsoft.Data.SqlClient.SqlParameter.SqlDbType%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlParameter.SqlDbType%252A) types accept a [Microsoft.Data.SqlClient.SqlParameter.Value%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlParameter.Value%252A) of [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader):

- `Char`

- `NChar`

- `NVarChar`

- `Xml`

- `Json`

The **Xml** [Microsoft.Data.SqlClient.SqlParameter.SqlDbType%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlParameter.SqlDbType%252A) type accepts a [Microsoft.Data.SqlClient.SqlParameter.Value%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlParameter.Value%252A) of [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader).

[Microsoft.Data.SqlClient.SqlParameter.SqlValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlParameter.SqlValue%252A) can accept values of type [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader), [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader), and [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream).

The [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader), [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader), and [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) object is transferred up to the value defined by the [Microsoft.Data.SqlClient.SqlParameter.Size%2A](https://learn.microsoft.com/search/?terms=Microsoft.Data.SqlClient.SqlParameter.Size%252A).

## Sample--streaming from SQL Server

Use the following Transact-SQL to create the sample database:

```sql
CREATE DATABASE [Demo]
GO
USE [Demo]
GO
CREATE TABLE [Streams] (
[id] INT PRIMARY KEY IDENTITY(1, 1),
[textdata] NVARCHAR(MAX),
[bindata] VARBINARY(MAX),
[xmldata] XML)
GO
INSERT INTO [Streams] (textdata, bindata, xmldata) VALUES (N'This is a test', 0x48656C6C6F, N'<test>value</test>')
INSERT INTO [Streams] (textdata, bindata, xmldata) VALUES (N'Hello, World!', 0x54657374696E67, N'<test>value2</test>')
INSERT INTO [Streams] (textdata, bindata, xmldata) VALUES (N'Another row', 0x666F6F626172, N'<fff>bbb</fff><fff>bbc</fff>')
GO
```

The sample shows how to do the following actions:

- Avoid blocking a user-interface thread by providing an asynchronous way to retrieve large files.

- Transfer a large text file from SQL Server in .NET.

- Transfer a large XML file from SQL Server in .NET.

- Retrieve data from SQL Server.

- Transfer large files (BLOBs) from one SQL Server database to another without running out of memory.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlClient_Streaming_FromServer.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/sqlclient-streaming-support.md)

## Sample--streaming to SQL Server

Use the following Transact-SQL to create the sample database:

```sql
CREATE DATABASE [Demo2]
GO
USE [Demo2]
GO
CREATE TABLE [BinaryStreams] (
[id] INT PRIMARY KEY IDENTITY(1, 1),
[bindata] VARBINARY(MAX))
GO
CREATE TABLE [TextStreams] (
[id] INT PRIMARY KEY IDENTITY(1, 1),
[textdata] NVARCHAR(MAX))
GO
CREATE TABLE [BinaryStreamsCopy] (
[id] INT PRIMARY KEY IDENTITY(1, 1),
[bindata] VARBINARY(MAX))
GO
```

The sample shows how to do the following actions:

- Transferring a large BLOB to SQL Server in .NET.

- Transferring a large text file to SQL Server in .NET.

- Using the new asynchronous feature to transfer a large BLOB.

- Using the new asynchronous feature and the `await` keyword to transfer a large BLOB.

- Canceling the transfer of a large BLOB.

- Streaming from one SQL Server to another using the asynchronous feature.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlClient_Streaming_ToServer.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/sqlclient-streaming-support.md)

## Sample--Streaming from one SQL Server to another SQL Server

This sample demonstrates how to asynchronously stream a large BLOB from one SQL Server to another, with support for cancellation.

> **Note:**
> Before running the following sample, be sure the Demo and Demo2 databases are created.

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/SqlClient_Streaming_ServerToServer.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/sqlclient-streaming-support.md)

## Related content

- [Retrieving and modifying data in ADO.NET](retrieving-modifying-data.md)
- [Microsoft.Data.SqlClient for SQL Server](microsoft-ado-net-sql-server.md)
