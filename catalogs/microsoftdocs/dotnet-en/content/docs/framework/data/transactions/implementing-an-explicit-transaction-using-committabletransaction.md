---
title: "Implementing an Explicit Transaction using CommittableTransaction"
description: Implement an explicit transaction using the CommittableTransaction class in .NET. This class provided an explicit way for applications to use a transaction.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 29efe5e5-897b-46c2-a35f-e599a273acc8
---
# Implementing an Explicit Transaction using CommittableTransaction

The [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) class provides an explicit way for applications to use a transaction, as opposed to using the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) class implicitly. It is useful for applications that want to use the same transaction across multiple function calls or multiple thread calls. Unlike the [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) class, the application writer needs to specifically call the [System.Transactions.CommittableTransaction.Commit*](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction.Commit*) and [System.Transactions.Transaction.Rollback*](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.Rollback*) methods in order to commit or abort the transaction.

## Overview of the CommittableTransaction class

 The [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) class derives from the [System.Transactions.Transaction](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction) class, therefore providing all the functionality of the latter. Specifically useful is the [System.Transactions.Transaction.Rollback*](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.Rollback*) method on the [System.Transactions.Transaction](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction) class that can also be used to rollback a [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) object.

 The  [System.Transactions.Transaction](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction) class is similar to the [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) class but does not offer a `Commit` method. This enables you to pass the transaction object (or clones of it) to other methods (potentially on other threads) while still controlling when the transaction is committed. The called code is able to enlist and vote on the transaction, but only the creator of the [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) object has the ability to commit the transaction.

 You should note the followings when working with the [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) class,

- Creating a [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) transaction does not set the ambient transaction. You need to specifically set and reset the ambient transaction, to ensure that resource managers operate under the right transaction context when appropriate. The way to set the current ambient transaction is by setting the static [System.Transactions.Transaction.Current](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.Current) property on the global [System.Transactions.Transaction](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction) object.

- A [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) object cannot be reused. Once a [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) object has been committed or rolled back, it cannot be used again in a transaction. That is, it cannot be set as the current ambient transaction context.

## Creating a CommittableTransaction

 The following sample creates a new [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) and commits it.

 [Tx_CommittableTx#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/tx_committabletx/cs/committabletxwithsql.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/tx_committabletx/cs/committabletxwithsql.cs.md)
 [Tx_CommittableTx#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/tx_committabletx/vb/committabletxwithsql.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/tx_committabletx/vb/committabletxwithsql.vb.md)

 Creating an instance of [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) does not automatically set the ambient transaction context. Therefore, any operation on a resource manager is not part of that transaction. The static [System.Transactions.Transaction.Current](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.Current) property on the global [System.Transactions.Transaction](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction) object is used to set or retrieve the ambient transaction and the application must manually set it to ensure that resource managers can participate in the transaction. It is also a good practice to save the old ambient transaction and restore it when you finish using the [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) object.

 To commit the transaction, you need to explicitly call the [System.Transactions.CommittableTransaction.Commit*](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction.Commit*) method. For rolling back a transaction, you should call the [System.Transactions.Transaction.Rollback*](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.Rollback*) method. It is important to note that until a [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) has been committed or rolled back, all the resources involved in that transaction are still locked.

 A [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) object can be used across function calls and threads. However, it is up to the application developer to handle exceptions and specifically call the [System.Transactions.Transaction.Rollback%28System.Exception%29](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction.Rollback%2528System.Exception%2529) method in case of failures.

## Asynchronous Commit

 The [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) class also provides a mechanism for committing a transaction asynchronously. A transaction commit can take substantial time, as it might involve multiple database access and possible network latency. When you want to avoid deadlocks in high throughput applications, you can use asynchronous commit to finish the transactional work as soon as possible, and run the commit operation as a background task. The [System.Transactions.CommittableTransaction.BeginCommit*](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction.BeginCommit*) and [System.Transactions.CommittableTransaction.EndCommit*](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction.EndCommit*) methods of the [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) class allow you to do so.

 You can call [System.Transactions.CommittableTransaction.BeginCommit*](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction.BeginCommit*) to dispatch the commit holdup to a thread from the thread pool. You can also call [System.Transactions.CommittableTransaction.EndCommit*](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction.EndCommit*) to determine if the transaction has actually been committed. If the transaction failed to commit for whatever reason, [System.Transactions.CommittableTransaction.EndCommit*](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction.EndCommit*) raises a transaction exception. If the transaction is not yet committed by the time [System.Transactions.CommittableTransaction.EndCommit*](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction.EndCommit*) is called, the caller is blocked until the transaction is committed or aborted.

 The easiest way to do an asynchronous commit is by providing a callback method, to be called when committing is finished. However, you must call the [System.Transactions.CommittableTransaction.EndCommit*](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction.EndCommit*) method on the original [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) object used to invoke the call. To obtain that object, you can downcast the *IAsyncResult* parameter of the callback method, since the [System.Transactions.CommittableTransaction](https://learn.microsoft.com/search/?terms=System.Transactions.CommittableTransaction) class implements [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult) class.

 The following example shows how an asynchronous commit can be done.

```csharp
public void DoTransactionalWork()
{
     Transaction oldAmbient = Transaction.Current;
     CommittableTransaction committableTransaction = new CommittableTransaction();
     Transaction.Current = committableTransaction;

     try
     {
          /* Perform transactional work here */
          // No errors - commit transaction asynchronously
          committableTransaction.BeginCommit(OnCommitted,null);
     }
     finally
     {
          //Restore the ambient transaction
          Transaction.Current = oldAmbient;
     }
}
void OnCommitted(IAsyncResult asyncResult)
{
     CommittableTransaction committableTransaction;
     committableTransaction = asyncResult as CommittableTransaction;
     Debug.Assert(committableTransaction != null);
     try
     {
          using(committableTransaction)
          {
               committableTransaction.EndCommit(asyncResult);
          }
     }
     catch(TransactionException e)
     {
          //Handle the failure to commit
     }
}
```

## See also

- [Implementing an Implicit Transaction using Transaction Scope](implementing-an-implicit-transaction-using-transaction-scope.md)
- [Transaction Processing](index.md)
