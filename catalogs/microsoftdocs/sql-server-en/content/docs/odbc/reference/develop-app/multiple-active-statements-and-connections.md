---
title: "Multiple Active Statements and Connections"
description: "Multiple Active Statements and Connections"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sunilbs, mcimfl
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
helpviewer_keywords:
  - "interoperability [ODBC], multiple active statements and connections"
  - "multiple active statements and connections [ODBC]"
---
# Multiple Active Statements and Connections
Some drivers and DBMSs limit the number of statements and connections that can be active at one time. These numbers can be as small as one. For more information, see the SQL_MAX_CONCURRENT_ACTIVITIES and SQL_MAX_DRIVER_CONNECTIONS options in the [SQLGetInfo](../syntax/sqlgetinfo-function.md) function description, and [Statement Handles](statement-handles.md) and [Connection Handles](connection-handles.md).
