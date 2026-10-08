---
title: Transactions (Native Client OLE DB provider)
description: "Transactions in SQL Server Native Client"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "OLE DB, transactions"
  - "transactions [OLE DB]"
  - "SQL Server Native Client OLE DB provider, transactions"
---
# Transactions in SQL Server Native Client

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The  SQL Server 
 Native Client OLE DB provider implements local transaction support. The consumer can use distributed or coordinated transactions by using Microsoft Distributed Transaction Coordinator (MS DTC). For consumers requiring transaction control that spans multiple sessions, the  SQL Server 
 Native Client OLE DB provider can join transactions initiated and maintained by MS DTC.  
  
 By default, the  SQL Server 
 Native Client OLE DB provider uses an autocommit transaction mode, where each discrete action on a consumer session comprises a complete transaction against an instance of  SQL Server 
. The  SQL Server 
 Native Client OLE DB provider autocommit mode is local, and autocommit transactions never span more than a single session.  
  
 The  SQL Server 
 Native Client OLE DB provider exposes the **ITransactionLocal** interface, allowing the consumer to use explicitly and implicitly start transactions on a single connection to an instance of  SQL Server 
. The  SQL Server 
 Native Client OLE DB provider does not support nested local transactions.  
  
## In This Section  
  
-   [Supporting Local Transactions](supporting-local-transactions.md)  
  
-   [Supporting Distributed Transactions](supporting-distributed-transactions.md)  
  
-   [Isolation Levels (OLE DB)](isolation-levels-ole-db.md)  
  
## Related content

- [SQL Server Native Client (OLE DB)](../native-client/ole-db/sql-server-native-client-ole-db.md)
