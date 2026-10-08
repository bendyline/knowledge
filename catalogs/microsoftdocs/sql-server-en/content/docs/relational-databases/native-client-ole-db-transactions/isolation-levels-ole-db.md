---
title: "Isolation Levels (Native Client OLE DB provider)"
description: "Isolation Levels (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "OLE DB, transactions"
  - "isolation levels [OLE DB]"
  - "transactions [OLE DB]"
  - "SQL Server Native Client OLE DB provider, transactions"
---
# Isolation Levels (Native Client OLE DB Provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





   SQL Server 
 clients can control transaction-isolation levels for a connection. To control transaction-isolation level, the  SQL Server 
 Native Client OLE DB provider consumer uses:  
  
-   DBPROPSET_SESSION property DBPROP_SESS_AUTOCOMMITISOLEVELS for the  SQL Server 
 Native Client OLE DB provider default autocommit mode.  
  
     The  SQL Server 
 Native Client OLE DB provider default for the level is DBPROPVAL_TI_READCOMMITTED.  
  
-   The *isoLevel* parameter of the **ITransactionLocal::StartTransaction** method for local manual-commit transactions.  
  
-   The *isoLevel* parameter of the **ITransactionDispenser::BeginTransaction** method for MS DTC-coordinated distributed transactions.  
  
  SQL Server 
 allows read-only access at the dirty read isolation level. All other levels restrict concurrency by applying locks to  SQL Server 
 objects. As the client requires greater concurrency levels,  SQL Server 
 applies greater restrictions on concurrent access to data. To maintain the highest level of concurrent access to data, the  SQL Server 
 Native Client OLE DB provider consumer should intelligently control its requests for specific concurrency levels.  
  
> **Note:**  
>   SQL Server 2005 (9.x) 
 introduced snapshot isolation level. For more information, see [Working with Snapshot Isolation](../native-client/features/working-with-snapshot-isolation.md).  
  
## Related content

- [Transactions in SQL Server Native Client](transactions.md)
