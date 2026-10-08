---
title: "Deprecated Features in SQL Server Replication"
description: "Deprecated Features in SQL Server Replication"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "deprecated features [SQL Server replication]"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Deprecated Features in SQL Server Replication

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  This topic describes the deprecated Replication features that are still available in  SQL Server 
. These features are scheduled to be removed in a future release of  SQL Server 
. Deprecated features should not be used in new applications.  
  
## Items Deprecated in  SQL Server 2016 (13.x) 
  
  
| Feature | Description |
| --- | --- |
| SQL Server 2008 (10.0.x) |
| Replication is supported if each  SQL Server |
 | endpoint is within two major versions of the current version of  SQL Server |
| . Consequently,  SQL Server 2016 (13.x) |
 | does not support replication to or from  SQL Server 2008 (10.0.x) |
 | or  SQL Server 2008 R2 (10.50.x) |
| . |
| SQL Server Compact |
| Replication is supported if each  SQL Server |
 | endpoint is within two major versions of the current version of  SQL Server |
| . Consequently,  SQL Server 2016 (13.x) |
 | does not support replication to or from  SQL Server Compact |
| . |
  
## Related content

- [Replication backward compatibility](replication-backward-compatibility.md)
