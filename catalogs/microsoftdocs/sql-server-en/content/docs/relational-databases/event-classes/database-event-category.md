---
title: "Database Event Category"
description: "Database Event Category"
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "event classes [SQL Server], Database event category"
  - "Database event category [SQL Server]"
  - "SQL Server event classes, Database event category"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Database Event Category

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  The **Database** event category contains event classes to monitor the  SQL Server Database Engine 
.  
  
## In This Section  
  
| Topic | Description |
| --- | --- |
| [Data File Auto Grow Event Class](data-file-auto-grow-event-class.md) | Indicates that the data file grew automatically. This event is not triggered if the data file is grown explicitly through ALTER DATABASE. |
| [Data File Auto Shrink Event Class](data-file-auto-shrink-event-class.md) | Indicates that the data file has been shrunk. |
| [Database Mirroring Connection Event Class](database-mirroring-connection-event-class.md) | An event generated to report the status of a transport connection for database mirroring. |
| [Database Mirroring State Change Event Class](database-mirroring-state-change-event-class.md) | Indicates when the state of a mirrored database changes. |
| [Database Suspect Data Page Event Class](database-suspect-data-page-event-class.md) | Indicates when a page is added to the **suspect_pages** table in the **msdb** database. |
| [Log File Auto Grow Event Class](log-file-auto-grow-event-class.md) | Indicates that the log file grew automatically. This event is not triggered if the log file is grown explicitly through ALTER DATABASE. |
| [Log File Auto Shrink Event Class](log-file-auto-shrink-event-class.md) | Indicates that the log file grew automatically. This event is not triggered if the log file shrinks explicitly through ALTER DATABASE. |
  
## Related content

- [Extended Events overview](../extended-events/extended-events.md)
