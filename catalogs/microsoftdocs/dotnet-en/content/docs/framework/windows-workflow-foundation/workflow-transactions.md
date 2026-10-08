---
description: "Learn more about: Workflow Transactions"
title: "Workflow Transactions"
ms.date: "03/30/2017"
ms.assetid: 6081fb02-c0f2-483d-97b8-f3b7dc03011d
---
# Workflow Transactions

WF provides support for participating in [System.Transactions](https://learn.microsoft.com/search/?terms=System.Transactions) transactions by using the [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) activity to scope a transacted unit of work. While the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) must be explicitly completed the [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) activity implicitly calls complete on the transaction upon successful completion. Any activities that are contained in the [System.Activities.Statements.TransactionScope.Body*](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope.Body*) of the [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) activity participate in the transaction. WF can to flow transactions into a workflow through the use of the [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) activity. Like the [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) activity, any activity contained in the [System.ServiceModel.Activities.TransactedReceiveScope.Body*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope.Body*) participates in the transaction. WF ensures that activities dependent on [System.Transactions.Transaction.Current*](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.Current*) works with both [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) and [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope). If the system-provided activities do not address all requirements, custom activities can be built using the [System.Activities.RuntimeTransactionHandle](https://learn.microsoft.com/search/?terms=System.Activities.RuntimeTransactionHandle) to enable advanced flow and transaction control scenarios.

In the following example, a workflow is constructed consisting of a [System.Activities.Statements.Sequence](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Sequence) activity that contains child activities including a [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) activity. The [System.Activities.Statements.TransactionScope.Body*](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope.Body*) activities of the [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) execute under the transaction initialized by the [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) activity.

```csharp
static Activity ScenarioOne()
{
    return new Sequence
    {
        Activities =
        {
            new WriteLine { Text = "    Begin workflow" },

            new TransactionScope
            {
                Body = new Sequence
                {
                    Activities =
                    {
                        new WriteLine { Text = "    Begin TransactionScope" },

                        new PrintTransactionId(),

                        new TransactionScopeTest(),

                        new WriteLine { Text = "    End TransactionScope" },
                    },
                },
            },

            new WriteLine { Text = "    End workflow" },
        }
    };
}
```

For more information, see about using [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope), see [Flowing Transactions into and out of Workflow Services](../wcf/feature-details/flowing-transactions-into-and-out-of-workflow-services.md).

## See also

- [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope)
- [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope)
- [System.Transactions.Transaction.Current*](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.Current*)
