---
title: "Connect to Server (Oracle), Connection Properties"
description: "Connect to Server (Oracle), Connection Properties"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
f1_keywords:
  - "sql13.rep.oracleconnection.connectionprops.f1"
helpviewer_keywords:
  - "Connect to Server dialog box, replication"
---
# Connect to Server (Oracle), Connection Properties
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Use the **Connection Properties** tab of the **Connect to Server** dialog box to specify a publishing option of **Gateway** or **Complete**. After a Publisher is identified, this option cannot be changed without dropping and reconfiguring the Publisher. For more information, see [Configure an Oracle Publisher](non-sql/configure-an-oracle-publisher.md).  
  
## Options  
 **Publisher type**  
 Select **Gateway** or **Complete**. The **Complete** option is designed to provide snapshot and transactional publications with the complete set of supported features for Oracle publishing. The **Gateway** option provides specific design optimizations to improve performance for cases where replication serves as a gateway between systems. The **Gateway** option cannot be used if you plan to publish the same table in multiple transactional publications. A table can appear in at most one transactional publication and any number of snapshot publications if you select **Gateway**.  
  
 **Timeouts**  
 Specify how long the  Microsoft 
  SQL Server 
 Distributor should attempt to connect to the Oracle Publisher before a timeout error occurs.  
  
## Related content

- [Glossary of Terms for Oracle Publishing](non-sql/glossary-of-terms-for-oracle-publishing.md)
- [Performance Tuning for Oracle Publishers](non-sql/performance-tuning-for-oracle-publishers.md)
