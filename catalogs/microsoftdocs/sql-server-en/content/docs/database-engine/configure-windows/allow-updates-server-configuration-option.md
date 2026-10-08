---
title: "Server Configuration: allow updates"
description: "Learn about the obsolete SQL Server configuration option allow updates. See how using this option causes RECONFIGURE statements to fail."
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "allow updates option"
---
# Server configuration: allow updates


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This option is still present in the `sp_configure` stored procedure, although its functionality is unavailable in  SQL Server 
. The setting has no effect. Direct updates to the system tables aren't supported.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 

Changing the `allow updates` option causes the `RECONFIGURE` statement to fail. Changes to the `allow updates` option should be removed from all scripts.

## Related content

- [Server configuration options](server-configuration-options-sql-server.md)
