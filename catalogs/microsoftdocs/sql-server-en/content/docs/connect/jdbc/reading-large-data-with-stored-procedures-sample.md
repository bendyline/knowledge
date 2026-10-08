---
title: Reading large data with stored procedures sample
description: This JDBC Driver sample demonstrates how to retrieve a large OUT parameter from a stored procedure.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: 04/20/2021
ms.service: sql
ms.subservice: connectivity
ms.topic: sample
---

# Reading large data with stored procedures sample



This  Microsoft JDBC Driver for SQL Server 
 sample application demonstrates how to retrieve a large OUT parameter from a stored procedure.

The code file for this sample is named ExecuteStoredProcedure.java, and can be found in the following location:

```bash
\<installation directory>\sqljdbc_<version>\<language>\samples\adaptive
```

## Requirements

To run this sample application, you'll need access to the  AdventureWorks2025  sample database. Set the classpath to include the mssql-jdbc jar file. For more information about how to set the classpath, see [Using the JDBC Driver](using-the-jdbc-driver.md).

> **Note:**
> The  Microsoft JDBC Driver for SQL Server 
 provides mssql-jdbc class library files to be used depending on your preferred Java Runtime Environment (JRE) settings. For more information about which JAR file to choose, see [System Requirements for the JDBC Driver](system-requirements-for-the-jdbc-driver.md).

The sample would create the required stored procedure in the  AdventureWorks2025  sample database:

## Example

This sample code:

1. Makes a connection to the  AdventureWorks2025  database.
1. Creates sample data and updates the `Production.Document` table by using a parameterized query. Finally, the sample code gets the adaptive buffering mode by using the [getResponseBuffering](reference/getresponsebuffering-method-sqlserverstatement.md) method of the [SQLServerStatement](reference/sqlserverstatement-class.md) class and executes the `GetLargeDataValue` stored procedure. Starting with the JDBC driver version 2.0 release, the `responseBuffering` connection property is set to "adaptive" by default.

Finally, the sample code displays the data returned with the OUT parameters and also demonstrates how to use the `mark` and `reset` methods on the stream to re-read any portion of the data.

[language="java" source="codesnippet/Java/reading-large-data-with-\_1_1.java"::: (complete source file; reference: codesnippet/Java/reading-large-data-with-\_1_1.java)](../../../_code/docs/connect/jdbc/codesnippet/Java/reading-large-data-with-_1_1.java.md)

## Related content

- [Working with large data](working-with-large-data.md)
