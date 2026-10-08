---
title: "MSSQL_ENG021075"
description: "MSSQL_ENG021075"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "MSSQL_ENG021075 error"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# MSSQL_ENG021075

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




    
## Message Details  
  
| Attribute | Value |
| --- | --- |
| Product Name | SQL Server |
| Event ID | 21075 |
| Event Source | MSSQLSERVER |
| Component | SQL Server Database Engine |
|  |
| Symbolic Name |  |
| Message Text | The initial snapshot for publication '%s' is not yet available. |
  
## Explanation  
 Error MSSQL_ENG021075 is raised if the Distribution Agent or Merge Agent is started before the Snapshot Agent has finished generating the snapshot.  
  
## User Action  
 If the Snapshot Agent for the publication has not been started since the subscription was created, or if it has not been started since the last time you chose to reinitialize the subscription, start the Snapshot Agent and let it complete before starting the Distribution Agent or Merge Agent. For more information, see [Create and Apply the Snapshot](create-and-apply-the-initial-snapshot.md).  
  
 If the Snapshot Agent does not complete, check the Snapshot Agent history for errors and address them. For information about viewing agent status and error details in Replication Monitor, see [View Information and Perform Tasks using Replication Monitor](monitor/view-information-and-perform-tasks-replication-monitor.md).  
  
 If the error continues to occur, increase the logging of the agent and specify an output file for the log. Depending on the context of the error, this could provide the steps leading up to the error and/or additional error messages.  
  
## Related content

- [Errors and Events Reference (Replication)](errors-and-events-reference-replication.md)
