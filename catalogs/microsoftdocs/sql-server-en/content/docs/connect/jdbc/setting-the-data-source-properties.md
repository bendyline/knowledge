---
title: Setting the data source properties
description: Learn about data sources in JDBC and how to set their properties to configure database access with Java.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: 08/12/2019
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
---

# Setting the data source properties



Data sources are the preferred mechanism by which to create JDBC connections in a Java Platform, Enterprise Edition (Java EE) environment. Data sources provide connections, pooled connections, and distributed connections without hard-coding connection properties into Java code. All  Microsoft JDBC Driver for SQL Server 
 data sources can set or get the value of any property by using the appropriate setter and getter methods, respectively.

Java EE products, such as application servers and servlet/JSP engines, typically let you configure data sources for database access. Any property listed in the [Setting the Connection Properties](setting-the-connection-properties.md) topic can be specified wherever the configuration lets you enter a property as a property=value pair.

For more information about  SQL Server 
 data sources, see the [SQLServerDataSource](reference/sqlserverdatasource-class.md) class. For an example of how to use the SQLServerDataSource class to make a connection to a  SQL Server 
 database, see [Data source sample](data-source-sample.md).

## Related content

- [Connecting to SQL Server with the JDBC driver](connecting-to-sql-server-with-the-jdbc-driver.md)
