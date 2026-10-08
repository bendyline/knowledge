---
title: "Step 2: Initialize the Application"
description: "Step 2: Initialize the Application"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sunilbs, mcimfl
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
helpviewer_keywords:
  - "initializing applications [ODBC]"
  - "application process [ODBC], initializing applications"
---
# Step 2: Initialize the Application
The second step is to initialize the application, as shown in the following illustration. Exactly what is done here varies with the application.  
  
 Shows initializing an ODBC application  
  
 At this point, it is common to use **SQLGetInfo** to discover the capabilities of the driver. For more information, see [Considering Database Features to Use](considering-database-features-to-use.md).  
  
 All applications need to allocate a statement handle with **SQLAllocHandle**, and many applications set statement attributes, such as the cursor type, with **SQLSetStmtAttr**. For more information, see [Allocating a Statement Handle](allocating-a-statement-handle-odbc.md) and [Statement Attributes](statement-attributes.md).
