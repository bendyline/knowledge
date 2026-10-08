---
description: "Learn more about: Transaction Activities in WF"
title: "Transaction Activities in WF"
ms.date: "03/30/2017"
ms.topic: "reference"
---
# Transaction Activities in WF

The .NET Framework 4.6.1
 has several system-provided activities for modeling transactions, compensation, and cancellation. These programming models allow the workflow to continue forward progress in the event of changes in business logic and error handling. For more information about transactions, compensation, and cancellation, see [Transactions](workflow-transactions.md), [Compensation](compensation.md), and [Cancellation](modeling-cancellation-behavior-in-workflows.md).  
  
## Transaction Activities  
  
| Activity type | Description |
| --- | --- |
| [System.Activities.Statements.CancellationScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.CancellationScope) | Associates cancellation logic, in the form of an activity, with a main path of execution, also expressed as an activity. |
| [System.Activities.Statements.CompensableActivity](https://learn.microsoft.com/search/?terms=System.Activities.Statements.CompensableActivity) | Supports compensation of its child activities. |
| [System.Activities.Statements.Compensate](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Compensate) | Explicitly invokes the compensation handler of a [System.Activities.Statements.CompensableActivity](https://learn.microsoft.com/search/?terms=System.Activities.Statements.CompensableActivity). |
| [System.Activities.Statements.Confirm](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Confirm) | Explicitly invokes the confirmation handler of a [System.Activities.Statements.CompensableActivity](https://learn.microsoft.com/search/?terms=System.Activities.Statements.CompensableActivity). |
| [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) | Demarcates a transaction boundary. |
| [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) | Scopes the lifetime of a transaction that is initiated by a received message. The transaction may be flowed into the workflow on the initiating message, or created by the dispatcher when the message is received. **Note:**  The [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) is located in the **Messaging** section of the **Toolbox**. |
