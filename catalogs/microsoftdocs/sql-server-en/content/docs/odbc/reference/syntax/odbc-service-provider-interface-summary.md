---
title: "ODBC Service Provider Interface Summary"
description: "ODBC Service Provider Interface Summary"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sunilbs, mcimfl
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# ODBC Service Provider Interface Summary
The following table describes ODBC Service Provider interface functions. For more information about the syntax and semantics for each function, see [ODBC Service Provider Interface (SPI) Reference](odbc-service-provider-interface-spi-reference.md).  
  
| Function name | Purpose |
| --- | --- |
| [SQLSetConnectAttrForDbcInfo](sqldatasourcetodriver-function.md) | Same as [SQLSetConnectAttr](sqlsetconnectattr-function.md), but it sets the attribute on the connection information token instead of on the connection handle. |
| [SQLSetDriverConnectInfo](sqldrivertodatasource-function.md) | Sets the connection string into the connection info token for an application's [SQLDriverConnect](sqldriverconnect-function.md) call. |
| [SQLSetConnectInfo](sqldatasourcetodriver-function.md) | Sets the data source, user ID, and password into the connection info token for an application's [SQLConnect](sqlconnect-function.md) call. |
| [SQLGetPoolID](sqldatasourcetodriver-function.md) | Retrieves the pool ID. |
| [SQLRateConnection](sqldatasourcetodriver-function.md) | Determines if a driver can reuse an existing connection in the connection pool. |
| [SQLPoolConnect](sqldatasourcetodriver-function.md) | Create a new connection if no connection in the pool can be reused. |
| [SQLCleanupConnectionPoolID](sqldatasourcetodriver-function.md) | Informs a driver that a pool ID was timed out. |
