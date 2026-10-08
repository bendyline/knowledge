---
title: "Cursor Library Cache"
description: "Cursor Library Cache"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sunilbs, mcimfl
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
helpviewer_keywords:
  - "ODBC cursor library [ODBC], cache"
  - "cursor library [ODBC], cache"
  - "cache [ODBC]"
---
# Cursor Library Cache
> **Important:**  
>  This feature will be removed in a future version of Windows. Avoid using this feature in new development work and plan to modify applications that currently use this feature. Microsoft recommends using the driver's cursor functionality.  
  
 For each row of data in the result set, the cursor library caches the data for each bound column, the length of the data in each bound column, and the status of the row. The cursor library uses the values in the cache both to return through **SQLFetch** and **SQLFetchScroll** and to construct searched statements for positioned operations. For more information, see [Constructing Searched Statements](constructing-searched-statements.md).  
  
 This section contains the following topics.  
  
-   [Column Data](column-data.md)  
  
-   [Length of Column Data](length-of-column-data.md)  
  
-   [Row Status](row-status.md)  
  
-   [Location of Cache](location-of-cache.md)
