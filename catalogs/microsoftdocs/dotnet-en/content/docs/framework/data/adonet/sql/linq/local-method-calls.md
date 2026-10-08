---
description: "Learn more about: Local Method Calls"
title: "Local Method Calls"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: c34b5012-aee9-4994-9364-1d99d12b7463
---
# Local Method Calls

A local method call is one that is executed within the object model. A remote method call is one that LINQ to SQL
 translates to SQL and transmits to the database engine for execution. Local method calls are needed when LINQ to SQL
 cannot translate the call into SQL. Otherwise, an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) is thrown.  
  
## Example 1  

 In the following example, an `Order` class is mapped to the Orders table in the Northwind sample database. A local instance method has been added to the class.  
  
 In Query 1, the constructor for the `Order` class is executed locally. In Query 2, if LINQ to SQL
 tried to translate `LocalInstanceMethod()`into SQL, the attempt would fail and an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) exception would be thrown. But because LINQ to SQL
 provides support for local method calls, Query2 will not throw an exception.  
  
 [DlinqLocalMethodCall#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqLocalMethodCall/cs/Program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqLocalMethodCall/cs/Program.cs.md)
 [DlinqLocalMethodCall#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqLocalMethodCall/vb/Module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqLocalMethodCall/vb/Module1.vb.md)  
  
 [DlinqLocalMethodCall#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqLocalMethodCall/cs/northwind.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqLocalMethodCall/cs/northwind.cs.md)
 [DlinqLocalMethodCall#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqLocalMethodCall/vb/northwind.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqLocalMethodCall/vb/northwind.vb.md)  
  
## See also

- [Background Information](background-information.md)
