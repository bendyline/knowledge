---
description: "Learn more about: Responsibilities of the Developer In Overriding Default Behavior"
title: "Responsibilities of the Developer In Overriding Default Behavior"
ms.date: "03/30/2017"
ms.assetid: c6909ddd-e053-46a8-980c-0e12a9797be1
---
# Responsibilities of the Developer In Overriding Default Behavior

LINQ to SQL
 does not enforce the following requirements, but behavior is undefined if these requirements are not satisfied.

- The overriding method must not call [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) or [System.Data.Linq.Table`1.Attach*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.Attach*). LINQ to SQL
 throws an exception if these methods are called in an override method.

- Override methods cannot be used to start, commit, or stop a transaction. The [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) operation is performed under a transaction. An inner nested transaction can interfere with the outer transaction. Load override methods can start a transaction only after they determine that the operation is not being performed in a [System.Transactions.Transaction](https://learn.microsoft.com/search/?terms=System.Transactions.Transaction).

- Override methods are expected to follow the applicable optimistic concurrency mapping. The override method is expected to throw a [System.Data.Linq.ChangeConflictException](https://learn.microsoft.com/search/?terms=System.Data.Linq.ChangeConflictException) when an optimistic concurrency conflict occurs. LINQ to SQL
 catches this exception so that you can correctly process the [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) option provided on [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*).

- Create (`Insert`) and `Update` override methods are expected to flow back the values for database-generated columns to corresponding object members when the operation is successfully completed.

     For example, if `Order.OrderID` is mapped to an identity column (*autoincrement* primary key), then the `InsertOrder()` override method must retrieve the database-generated ID and set the `Order.OrderID` member to that ID. Likewise, timestamp members must be updated to the database-generated timestamp values to make sure that the updated objects are consistent. Failure to propagate the database-generated values can cause an inconsistency between the database and the objects tracked by the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext).

- It is the user's responsibility to invoke the correct dynamic API. For example, in the update override method, only the [System.Data.Linq.DataContext.ExecuteDynamicUpdate*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.ExecuteDynamicUpdate*) can be called. LINQ to SQL
 does not detect or verify whether the invoked dynamic method matches the applicable operation. If an inapplicable method is called (for example, [System.Data.Linq.DataContext.ExecuteDynamicDelete*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.ExecuteDynamicDelete*) for an object to be updated), the results are undefined.

- Finally, the overriding method is expected to perform the stated operation. The semantics of LINQ to SQL
 operations such as eager loading, deferred loading, and [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*)) require the overrides to provide the stated service. For example, a load override that just returns an empty collection without checking the contents in the database will likely lead to inconsistent data.

## See also

- [Customizing Insert, Update, and Delete Operations](customizing-insert-update-and-delete-operations.md)
