---
title: "Transactions Event Category"
description: "Transactions Event Category"
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "SQL Server event classes, Transactions event category"
  - "event classes [SQL Server], Transactions event category"
  - "Transactions event category [SQL Server]"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Transactions Event Category

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  The **Transactions** event classes can be used to monitor the status of transactions. The event class names that are prefixed with **TM:** are used to track the transaction-related operations that are sent through the transaction management interface.  
  
## In This Section  
  
| Topic | Description |
| --- | --- |
| [DTCTransaction Event Class](dtctransaction-event-class.md) | Tracks transactions coordinated by the  Microsoft |
 | Distributed Transaction Coordinator (MS DTC). These are transactions distributed between two or more databases or instances of the  SQL Server Database Engine |
| . |
| [SQLTransaction Event Class](sqltransaction-event-class.md) | Tracks  Transact-SQL  BEGIN TRAN, COMMIT TRAN, SAVE TRAN, and ROLLBACK TRAN statements. |
| [TM: Begin Tran Completed Event Class](tm-begin-tran-completed-event-class.md) | Indicates that a BEGIN TRANSACTION request has completed. |
| [TM: Begin Tran Starting Event Class](tm-begin-tran-starting-event-class.md) | Indicates that a BEGIN TRANSACTION request is starting. |
| [TM: Commit Tran Completed Event Class](tm-commit-tran-completed-event-class.md) | Indicates that a COMMIT TRANSACTION request has completed. |
| [TM: Commit Tran Starting Event Class](tm-commit-tran-starting-event-class.md) | Indicates that a COMMIT TRANSACTION request is starting. |
| [TM: Promote Tran Completed Event Class](tm-promote-tran-completed-event-class.md) | Indicates that a PROMOTE TRANSACTION request has completed. |
| [TM: Promote Tran Starting Event Class](tm-promote-tran-starting-event-class.md) | Indicates that a PROMOTE TRANSACTION request is starting. |
| [TM: Rollback Tran Completed Event Class](tm-rollback-tran-completed-event-class.md) | Indicates that a ROLLBACK TRANSACTION request has completed. |
| [TM: Rollback Tran Starting Event Class](tm-rollback-tran-starting-event-class.md) | Indicates that a ROLLBACK TRANSACTION request is starting. |
| [TM: Save Tran Completed Event Class](tm-save-tran-completed-event-class.md) | Indicates that a SAVE TRANSACTION request has completed. |
| [TM: Save Tran Starting Event Class](tm-save-tran-starting-event-class.md) | Indicates that a SAVE TRANSACTION request is starting. |
| [TransactionLog Event Class](transactionlog-event-class.md) | Tracks when transactions are written to a database transaction log. |
