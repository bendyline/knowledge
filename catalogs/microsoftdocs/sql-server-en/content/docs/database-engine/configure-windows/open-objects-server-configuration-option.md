---
title: "Server Configuration: open objects"
description: "Learn about the disabled configuration option open objects. See how SQL Server now manages the number of open database objects."
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "open objects option"
---
# Server configuration: open objects


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This option is still present in `sp_configure`, although its functionality has been disabled in  SQL Server 
. (The setting has no effect.) In  SQL Server 
, the number of open database objects is managed dynamically and is limited only by the available memory. The `open objects` option available in `sp_configure` for backward compatibility with existing scripts.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 

## Related content

- [Server configuration options](server-configuration-options-sql-server.md)
