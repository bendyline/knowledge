---
title: "How to: Delete Rows From the Database"
description: Learn to delete rows in a database by removing LINQ to SQL objects from a table-related collection. LINQ to SQL translates deletions to SQL DELETE commands.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 2144c99b-8055-4080-a5c6-1ea14335e2a3
---
# How to: Delete Rows From the Database

You can delete rows in a database by removing the corresponding LINQ to SQL
 objects from their table-related collection. LINQ to SQL
 translates your changes to the appropriate SQL `DELETE` commands.

LINQ to SQL
 does not support or recognize cascade-delete operations. If you want to delete a row in a table that has constraints against it, you must complete either of the following tasks:

- Set the `ON DELETE CASCADE` rule in the foreign-key constraint in the database.

- Use your own code to first delete the child objects that prevent the parent object from being deleted.

 Otherwise, an exception is thrown. See the second code example later in this topic.

> **Note:**
> You can override LINQ to SQL
 default methods for `Insert`, `Update`, and `Delete` database operations. For more information, see [Customizing Insert, Update, and Delete Operations](customizing-insert-update-and-delete-operations.md).
>
> Developers using Visual Studio can use the Object Relational Designer to develop stored procedures for the same purpose.

The following steps assume that a valid [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) connects you to the Northwind database. For more information, see [How to: Connect to a Database](how-to-connect-to-a-database.md).

### To delete a row in the database

1. Query the database for the row to be deleted.

2. Call the [System.Data.Linq.Table`1.DeleteOnSubmit*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.DeleteOnSubmit*) method.

3. Submit the change to the database.

## Example 1

This first code example queries the database for order details that belong to Order #11000, marks these order details for deletion, and submits these changes to the database.

[System.Data.Linq.Table#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/system.data.linq.table/cs/program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/system.data.linq.table/cs/program.cs.md)
[System.Data.Linq.Table#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.table/vb/module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.table/vb/module1.vb.md)

## Example 2

In this second example, the objective is to remove an order (#10250). The code first examines the `OrderDetails` table to see whether the order to be removed has children there. If the order has children, first the children and then the order are marked for removal. The [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) puts the actual deletes in correct order so that delete commands sent to the database abide by the database constraints.

[DLinqCascadeWorkaround#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCascadeWorkaround/cs/Program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCascadeWorkaround/cs/Program.cs.md)
[DLinqCascadeWorkaround#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCascadeWorkaround/vb/Module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCascadeWorkaround/vb/Module1.vb.md)

## See also

- [How to: Manage Change Conflicts](how-to-manage-change-conflicts.md)
- [How to: Assign stored procedures to perform updates, inserts, and deletes (O/R Designer)](https://learn.microsoft.com/visualstudio/data-tools/how-to-assign-stored-procedures-to-perform-updates-inserts-and-deletes-o-r-designer)
- [Making and Submitting Data Changes](making-and-submitting-data-changes.md)
