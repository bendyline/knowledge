---
title: "Configure SQL Server Error Logs (SQL Server Configuration Manager)"
description: Learn about error log recycling. See how to set a maximum log file size and how to set the number of previous log files that SQL Server backs up and archives.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
f1_keywords:
  - "sql13.swb.configurelogs.configureerrorlogs.f1"
---
# SQL Server Configuration Manager: Configure SQL Server error logs


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to view or modify the way  SQL Server 
 error logs are recycled.

## Open the Configure SQL Server Error Logs dialog box

1. In Object Explorer, expand the instance of SQL Server, expand **Management**, right-click **SQL Server Logs**, and then select **Configure**.

1. In the **Configure SQL Server Error Logs** dialog box, choose from the following options.

   - Log files count

     **Limit the number of the error log files before they are recycled**

     Check to limit the number of error logs created before they're recycled. A new error log is created each time an instance of  SQL Server 
 is started.  SQL Server 
 retains backups of the previous six logs, unless you check this option, and specify a different maximum number of error log files.

     **Maximum number of error log files**

     Specify the maximum number of archived error log files created before they're recycled. The default is 6, not including the current one. This value determines the number of previous backup logs that  SQL Server 
 retains before recycling them.

   - Log file size

     **Maximum size for error log file in KB**

     You can set the size amount of each file in KB. If you leave it at `0`, the log size is unlimited.
