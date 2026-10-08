---
description: "Learn more about: Object States and Change-Tracking"
title: "Object States and Change-Tracking"
ms.date: "03/30/2017"
ms.assetid: 7a808b00-9c3c-479a-aa94-717280fefd71
---
# Object States and Change-Tracking

LINQ to SQL
 objects always participate in some *state*. For example, when LINQ to SQL
 creates a new object, the object is in `Unchanged` state. A new object that you yourself create is unknown to the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) and is in `Untracked` state. Following successful execution of [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*), all objects known to LINQ to SQL
 are in `Unchanged` state. (The single exception is represented by those that have been successfully deleted from the database, which are in `Deleted` state and unusable in that [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) instance.)

## Object States

The following table lists the possible states for LINQ to SQL
 objects.

| State | Description |
| --- | --- |
| `Untracked` | An object not tracked by LINQ to SQL |
| . Examples include the following:<br /><br /> -   An object not queried through the current [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) (such as a newly created object).<br />-   An object created through deserialization<br />-   An object queried through a different [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext). |
| `Unchanged` | An object retrieved by using the current [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) and not known to have been modified since it was created. |
| `PossiblyModified` | An object which is *attached* to a [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext). For more information, see [Data Retrieval and CUD Operations in N-Tier Applications (LINQ to SQL)](data-retrieval-and-cud-operations-in-n-tier-applications.md). |
| `ToBeInserted` | An object not retrieved by using the current [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext). This causes a database `INSERT` during [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*). |
| `ToBeUpdated` | An object known to have been modified since it was retrieved. This causes a database `UPDATE` during [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*). |
| `ToBeDeleted` | An object marked for deletion, causing a database `DELETE` during [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*). |
| `Deleted` | An object that has been deleted in the database. This state is final and does not allow for additional transitions. |

## Inserting Objects

You can explicitly request `Inserts` by using [System.Data.Linq.Table`1.InsertOnSubmit*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.InsertOnSubmit*). Alternatively, LINQ to SQL
 can infer `Inserts` by finding objects connected to one of the known objects that must be updated. For example, if you add an `Untracked` object to an [System.Data.Linq.EntitySet`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntitySet%601) or set an [System.Data.Linq.EntityRef`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntityRef%601) to an `Untracked` object, you make the `Untracked` object reachable by way of tracked objects in the graph. While processing [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*), LINQ to SQL
 traverses the tracked objects and discovers any reachable persistent objects that are not tracked. Such objects are candidates for insertion into the database.

For classes in an inheritance hierarchy, [System.Data.Linq.Table`1.InsertOnSubmit*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.InsertOnSubmit*)(`o`) also sets the value of the member designated as the *discriminator* to match the type of the object `o`. In the case of a type matching the default discriminator value, this action causes the discriminator value to be overwritten with the default value. For more information, see [Inheritance Support](inheritance-support.md).

> **Important:**
> An object added to a `Table` is not in the identity cache. The identity cache reflects only what is retrieved from the database. After a call to [System.Data.Linq.Table`1.InsertOnSubmit*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.InsertOnSubmit*), the added entity does not appear in queries against the database until [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) is successfully completed.

## Deleting Objects

You mark a tracked object `o` for deletion by calling [System.Data.Linq.Table`1.DeleteOnSubmit*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.DeleteOnSubmit*)(o) on the appropriate [System.Data.Linq.Table`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601). LINQ to SQL
 considers the removal of an object from an [System.Data.Linq.EntitySet`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntitySet%601) as an update operation, and the corresponding foreign key value is set to null. The target of the operation (`o`) is not deleted from its table. For example, `cust.Orders.DeleteOnSubmit(ord)` indicates an update where the relationship between `cust` and `ord` is severed by setting the foreign key `ord.CustomerID` to null. It does not cause the deletion of the row corresponding to `ord`.

LINQ to SQL
 performs the following processing when an object is deleted ([System.Data.Linq.Table`1.DeleteOnSubmit*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.DeleteOnSubmit*)) from its table:

- When [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) is called, a `DELETE` operation is performed for that object.

- The removal is not propagated to related objects regardless of whether they are loaded. Specifically, related objects are not loaded for updating the relationship property.

- After successful execution of [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*), the objects are set to the `Deleted` state. As a result, you cannot use the object or its `id` in that [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext). The internal cache maintained by a [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) instance does not eliminate objects that are retrieved or added as new, even after the objects have been deleted in the database.

You can call [System.Data.Linq.Table`1.DeleteOnSubmit*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.DeleteOnSubmit*) only on an object tracked by the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext). For an `Untracked` object, you must call [System.Data.Linq.Table`1.Attach*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.Attach*) before you call [System.Data.Linq.Table`1.DeleteOnSubmit*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.DeleteOnSubmit*). Calling [System.Data.Linq.Table`1.DeleteOnSubmit*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.DeleteOnSubmit*) on an `Untracked` object throws an exception.

> **Note:**
> Removing an object from a table tells LINQ to SQL
 to generate a corresponding SQL `DELETE` command at the time of [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*). This action does not remove the object from the cache or propagate the deletion to related objects.
>
> To reclaim the `id` of a deleted object, use a new [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) instance. For cleanup of related objects, you can use the *cascade delete* feature of the database, or else manually delete the related objects.
>
> The related objects do not have to be deleted in any special order (unlike in the database).

## Updating Objects

You can detect `Updates` by observing notifications of changes. Notifications are provided through the [System.ComponentModel.INotifyPropertyChanging.PropertyChanging](https://learn.microsoft.com/search/?terms=System.ComponentModel.INotifyPropertyChanging.PropertyChanging) event in property setters. When LINQ to SQL
 is notified of the first change to an object, it creates a copy of the object and considers the object a candidate for generating an `Update` statement.

For objects that do not implement [System.ComponentModel.INotifyPropertyChanging](https://learn.microsoft.com/search/?terms=System.ComponentModel.INotifyPropertyChanging), LINQ to SQL
 maintains a copy of the values that objects had when they were first materialized. When you call [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*), LINQ to SQL
 compares the current and original values to decide whether the object has been changed.

For updates to relationships, the reference from the child to the parent (that is, the reference corresponding to the foreign key) is considered the authority. The reference in the reverse direction (that is, from parent to child) is optional. Relationship classes ([System.Data.Linq.EntitySet`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntitySet%601) and [System.Data.Linq.EntityRef`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntityRef%601)) guarantee that the bidirectional references are consistent for one-to-many and one-to-one relationships. If the object model does not use [System.Data.Linq.EntitySet`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntitySet%601) or [System.Data.Linq.EntityRef`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntityRef%601), and if the reverse reference is present, it is your responsibility to keep it consistent with the forward reference when the relationship is updated.

If you update both the required reference and the corresponding foreign key, you must make sure that they agree. An [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) exception is thrown if the two are not synchronized at the time that you call [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*). Although foreign key value changes are sufficient for affecting an update of the underlying row, you should change the reference to maintain connectivity of the object graph and bidirectional consistency of relationships.

## See also

- [Background Information](background-information.md)
- [Insert, Update, and Delete Operations](insert-update-and-delete-operations.md)
