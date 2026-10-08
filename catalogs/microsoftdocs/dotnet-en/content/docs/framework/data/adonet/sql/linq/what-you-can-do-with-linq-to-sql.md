---
description: "Learn more about: What You Can Do With LINQ to SQL"
title: "What You Can Do With LINQ to SQL"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 061d98b2-baa7-4336-8ad2-c14de8134d91
---
# What You Can Do With LINQ to SQL

LINQ to SQL
 supports all the key capabilities you would expect as a SQL developer. You can query for information, and insert, update, and delete information from tables.

## Selecting

 Selecting (*projection*) is achieved by just writing a LINQ query in your own programming language, and then executing that query to retrieve the results. LINQ to SQL
 itself translates all the necessary operations into the necessary SQL operations that you are familiar with. For more information, see [LINQ to SQL](index.md).

 In the following example, the company names of customers from London are retrieved and displayed in the console window.

 [DLinqGettingStarted#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqGettingStarted/cs/Program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqGettingStarted/cs/Program.cs.md)
 [DLinqGettingStarted#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqGettingStarted/vb/Module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqGettingStarted/vb/Module1.vb.md)

## Inserting

 To execute a SQL `Insert`, just add objects to the object model you have created, and call [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) on the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext).

 In the following example, a new customer and information about the customer is added to the `Customers` table by using [System.Data.Linq.Table`1.InsertOnSubmit*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.InsertOnSubmit*).

 [DLinqGettingStarted#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqGettingStarted/cs/Program.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqGettingStarted/cs/Program.cs.md)
 [DLinqGettingStarted#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqGettingStarted/vb/Module1.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqGettingStarted/vb/Module1.vb.md)

## Updating

 To `Update` a database entry, first retrieve the item and edit it directly in the object model. After you have modified the object, call [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) on the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) to update the database.

 In the following example, all customers who are from London are retrieved. Then the name of the city is changed from "London" to "London - Metro". Finally, [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) is called to send the changes to the database.

 [DLinqGettingStarted#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqGettingStarted/cs/Program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqGettingStarted/cs/Program.cs.md)
 [DLinqGettingStarted#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqGettingStarted/vb/Module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqGettingStarted/vb/Module1.vb.md)

## Deleting

 To `Delete` an item, remove the item from the collection to which it belongs, and then call [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) on the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) to commit the change.

> **Note:**
> LINQ to SQL
 does not recognize cascade-delete operations. If you want to delete a row in a table that has constraints against it, see [How to: Delete Rows From the Database](how-to-delete-rows-from-the-database.md).

 In the following example, the customer who has `CustomerID` of `98128` is retrieved from the database. Then, after confirming that the customer row was retrieved, [System.Data.Linq.Table`1.DeleteOnSubmit*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601.DeleteOnSubmit*) is called to remove that object from the collection. Finally, [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*) is called to forward the deletion to the database.

 [DLinqGettingStarted#4 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqGettingStarted/cs/Program.cs#4)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqGettingStarted/cs/Program.cs.md)
 [DLinqGettingStarted#4 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqGettingStarted/vb/Module1.vb#4)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqGettingStarted/vb/Module1.vb.md)

## See also

- [Programming Guide](programming-guide.md)
- [The LINQ to SQL Object Model](the-linq-to-sql-object-model.md)
- [Getting Started](getting-started.md)
