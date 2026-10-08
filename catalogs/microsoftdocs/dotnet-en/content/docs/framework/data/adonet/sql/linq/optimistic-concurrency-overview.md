---
description: "Learn more about: Optimistic Concurrency: Overview"
title: "Optimistic Concurrency: Overview"
ms.date: "03/30/2017"
ms.assetid: c2e38512-d0c8-4807-b30a-cb7e30338694
---
# Optimistic Concurrency: Overview

LINQ to SQL
 supports optimistic concurrency control. The following table describes terms that apply to optimistic concurrency in LINQ to SQL
 documentation:

| Terms | Description |
| --- | --- |
| concurrency | The situation in which two or more users at the same time try to update the same database row. |
| concurrency conflict | The situation in which two or more users at the same time try to submit conflicting values to one or more columns of a row. |
| concurrency control | The technique used to resolve concurrency conflicts. |
| optimistic concurrency control | The technique that first investigates whether other transactions have changed values in a row before permitting changes to be submitted.<br /><br /> Contrast with *pessimistic concurrency control*, which locks the record to avoid concurrency conflicts.<br /><br /> *Optimistic* control is so termed because it considers the chances of one transaction interfering with another to be unlikely. |
| conflict resolution | The process of refreshing a conflicting item by querying the database again and then reconciling differences.<br /><br /> When an object is refreshed, the LINQ to SQL |
 | change tracker holds the following data:<br /><br /> -   The values originally taken from the database and used for the update check.<br />-   The new database values from the subsequent query.<br /><br /> LINQ to SQL |
 | then determines whether the object is in conflict (that is, whether one or more of its member values has changed). If the object is in conflict, LINQ to SQL |
 | next determines which of its members are in conflict.<br /><br /> Any member conflict that LINQ to SQL |
 | discovers is added to a conflict list. |

 In the LINQ to SQL
 object model, an *optimistic concurrency conflict* occurs when both of the following conditions are true:

- The client tries to submit changes to the database.

- One or more update-check values have been updated in the database since the client last read them.

 Resolution of this conflict includes discovering which members of the object are in conflict, and then deciding what you want to do about it.

> **Note:**
> Only members mapped as [System.Data.Linq.Mapping.UpdateCheck.Always](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.UpdateCheck.Always) or [System.Data.Linq.Mapping.UpdateCheck.WhenChanged](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.UpdateCheck.WhenChanged) participate in optimistic concurrency checks. No check is performed for members marked [System.Data.Linq.Mapping.UpdateCheck.Never](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.UpdateCheck.Never). For more information, see [System.Data.Linq.Mapping.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.UpdateCheck).

## Example

 For example, in the following scenario, User1 starts to prepare an update by querying the database for a row. User1 receives a row with values of Alfreds, Maria, and Sales.

 User1 wants to change the value of the Manager column to Alfred and the value of the Department column to Marketing. Before User1 can submit those changes, User2 has submitted changes to the database. So now the value of the Assistant column has been changed to Mary and the value of the Department column to Service.

 When User1 now tries to submit changes, the submission fails and a [System.Data.Linq.ChangeConflictException](https://learn.microsoft.com/search/?terms=System.Data.Linq.ChangeConflictException) exception is thrown. This result occurs because the database values for the Assistant column and the Department column are not those that were expected. Members representing the Assistant and Department columns are in conflict. The following table summarizes the situation.

| State | Manager | Assistant | Department |
| --- | --- | --- | --- |
| Original state | Alfreds | Maria | Sales |
| User1 | Alfred |  | Marketing |
| User2 |  | Mary | Service |

 You can resolve conflicts such as this in different ways. For more information, see [How to: Manage Change Conflicts](how-to-manage-change-conflicts.md).

## Conflict Detection and Resolution Checklist

 You can detect and resolve conflicts at any level of detail. At one extreme, you can resolve all conflicts in one of three ways (see [System.Data.Linq.RefreshMode](https://learn.microsoft.com/search/?terms=System.Data.Linq.RefreshMode)) without additional consideration. At the other extreme, you can designate a specific action for each type of conflict on every member in conflict.

- Specify or revise [System.Data.Linq.Mapping.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.UpdateCheck) options in your object model.

     For more information, see [How to: Specify Which Members are Tested for Concurrency Conflicts](how-to-specify-which-members-are-tested-for-concurrency-conflicts.md).

- In the try/catch block of your call to [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*), specify at what point you want exceptions to be thrown.

     For more information, see [How to: Specify When Concurrency Exceptions are Thrown](how-to-specify-when-concurrency-exceptions-are-thrown.md).

- Determine how much conflict detail you want to retrieve, and include code in your try/catch block accordingly.

     For more information, see [How to: Retrieve Entity Conflict Information](how-to-retrieve-entity-conflict-information.md) and [How to: Retrieve Member Conflict Information](how-to-retrieve-member-conflict-information.md).

- Include in your `try`/`catch` code how you want to resolve the various conflicts you discover.

     For more information, see [How to: Resolve Conflicts by Retaining Database Values](how-to-resolve-conflicts-by-retaining-database-values.md), [How to: Resolve Conflicts by Overwriting Database Values](how-to-resolve-conflicts-by-overwriting-database-values.md), and [How to: Resolve Conflicts by Merging with Database Values](how-to-resolve-conflicts-by-merging-with-database-values.md).

## LINQ to SQL Types That Support Conflict Discovery and Resolution

 Classes and features to support the resolution of conflicts in optimistic concurrency in LINQ to SQL
 include the following:

- [System.Data.Linq.ObjectChangeConflict](https://learn.microsoft.com/search/?terms=System.Data.Linq.ObjectChangeConflict)

- [System.Data.Linq.MemberChangeConflict](https://learn.microsoft.com/search/?terms=System.Data.Linq.MemberChangeConflict)

- [System.Data.Linq.ChangeConflictCollection](https://learn.microsoft.com/search/?terms=System.Data.Linq.ChangeConflictCollection)

- [System.Data.Linq.ChangeConflictException](https://learn.microsoft.com/search/?terms=System.Data.Linq.ChangeConflictException)

- [System.Data.Linq.DataContext.ChangeConflicts*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.ChangeConflicts*)

- [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*)

- [System.Data.Linq.DataContext.Refresh*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.Refresh*)

- [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck)

- [System.Data.Linq.Mapping.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.UpdateCheck)

- [System.Data.Linq.RefreshMode](https://learn.microsoft.com/search/?terms=System.Data.Linq.RefreshMode)

## See also

- [How to: Manage Change Conflicts](how-to-manage-change-conflicts.md)
