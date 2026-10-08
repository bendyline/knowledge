---
description: "Learn more about: Transaction Support"
title: "Transaction Support"
ms.date: "03/30/2017"
ms.assetid: 8cceb26e-8d36-4365-8967-58e2e89e0187
---
# Transaction Support

LINQ to SQL
 supports three distinct transaction models. The following lists these models in the order of checks performed.

## Explicit Local Transaction

 When [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) is called, if the [System.Data.Linq.DataContext.Transaction](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.Transaction) property is set to a (`IDbTransaction`) transaction, the [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) call is executed in the context of the same transaction.

 It is your responsibility to commit or rollback the transaction after successful execution of the transaction. The connection corresponding to the transaction must match the connection used for constructing the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext). An exception is thrown if a different connection is used.

## Explicit Distributable Transaction

 You can call LINQ to SQL
 APIs (including but not limited to [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*)) in the scope of an active [System.Transactions.Transaction](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction). LINQ to SQL
 detects that the call is in the scope of a transaction and does not create a new transaction. LINQ to SQL
 also avoids closing the connection in this case. You can perform query and [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) executions in the context of such a transaction.

## Implicit Transaction

 When you call [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*), LINQ to SQL
 checks to see whether the call is in the scope of a [System.Transactions.Transaction](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction) or if the `Transaction` property (`IDbTransaction`) is set to a user-started local transaction. If it finds neither transaction, LINQ to SQL
 starts a local transaction (`IDbTransaction`) and uses it to execute the generated SQL commands. When all SQL commands have been successfully completed, LINQ to SQL
 commits the local transaction and returns.

## See also

- [Background Information](background-information.md)
- [How to: Bracket Data Submissions by Using Transactions](how-to-bracket-data-submissions-by-using-transactions.md)
