---
title: "Establishing a Connection"
description: "Establishing a Connection"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sunilbs, mcimfl
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
helpviewer_keywords:
  - "data sources [ODBC], connection functions"
  - "SQLBrowseConnect function [ODBC], establishing a connection"
  - "functions [ODBC], data source or driver connections"
  - "connecting to data source [ODBC], functions"
  - "connecting to driver [ODBC], functions"
  - "connection functions [ODBC]"
  - "SQLConnect function [ODBC], establishing a connection"
  - "SQLDriverConnect function [ODBC], making a connection"
  - "ODBC drivers [ODBC], connection functions"
---
# Establishing a Connection
After allocating environment and connection handles and setting any connection attributes, the application is ready to connect to the data source or driver. There are three different functions the application can use to do this: **SQLConnect** (Core interface conformance level), **SQLDriverConnect** (Core), and **SQLBrowseConnect** (Level 1). Each of the three is designed to be used in a different scenario. Before connecting, the application can determine which of these functions is supported with the **ConnectFunctions** keyword returned by **SQLDrivers**.  
  
> **Note:**  
>  Some drivers limit the number of active connections they support. An application calls **SQLGetInfo** with the SQL_MAX_DRIVER_CONNECTIONS option to determine how many active connections a particular driver supports.  
  
 This section contains the following topics.  
  
-   [Default Data Source](default-data-source.md)  
  
-   [Connecting with SQLConnect](connecting-with-sqlconnect.md)  
  
-   [Connection Strings](connection-strings.md)  
  
-   [Connecting with SQLDriverConnect](connecting-with-sqldriverconnect.md)  
  
-   [Connecting with SQLBrowseConnect](connecting-with-sqlbrowseconnect.md)
