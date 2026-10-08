---
description: "Learn more about: Insert, Update, and Delete Operations"
title: "Insert, Update, and Delete Operations"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 26a43a4f-83c9-4732-806d-bb23aad0ff6b
---
# Insert, Update, and Delete Operations

You perform `Insert`, `Update`, and `Delete` operations in LINQ to SQL
 by adding, changing, and removing objects in your object model. By default, LINQ to SQL
 translates your actions to SQL and submits the changes to the database.

LINQ to SQL
 offers maximum flexibility in manipulating and persisting changes that you made to your objects. As soon as entity objects are available (either by retrieving them through a query or by constructing them anew), you can change them as typical objects in your application. That is, you can change their values, you can add them to your collections, and you can remove them from your collections. LINQ to SQL
 tracks your changes and is ready to transmit them back to the database when you call [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*).

> **Note:**
> LINQ to SQL
 does not support or recognize cascade-delete operations. If you want to delete a row in a table that has constraints against it, you must either set the `ON DELETE CASCADE` rule in the foreign-key constraint in the database, or use your own code to first delete the child objects that prevent the parent object from being deleted. Otherwise, an exception is thrown. For more information, see [How to: Delete Rows From the Database](how-to-delete-rows-from-the-database.md).

The following excerpts use the `Customer` and `Order` classes from the Northwind sample database. Class definitions are not shown for brevity.

[DLinqCRUDOps#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCRUDOps/cs/Program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCRUDOps/cs/Program.cs.md)
[DLinqCRUDOps#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCRUDOps/vb/Module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCRUDOps/vb/Module1.vb.md)

When you call [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*), LINQ to SQL
 automatically generates and executes the SQL commands that it must have to transmit your changes back to the database.

> **Note:**
> You can override this behavior by using your own custom logic, typically by way of a stored procedure. For more information, see [Responsibilities of the Developer In Overriding Default Behavior](responsibilities-of-the-developer-in-overriding-default-behavior.md).
>
> Developers using Visual Studio can use the Object Relational Designer to develop stored procedures for this purpose.

## See also

- [Downloading Sample Databases](downloading-sample-databases.md)
- [Customizing Insert, Update, and Delete Operations](customizing-insert-update-and-delete-operations.md)
