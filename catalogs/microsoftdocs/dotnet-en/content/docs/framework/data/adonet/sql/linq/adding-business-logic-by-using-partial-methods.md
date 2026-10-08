---
description: "Learn more about: Adding Business Logic By Using Partial Methods"
title: "Adding Business Logic By Using Partial Methods"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 3a73991e-fd4e-4610-93fb-7ced4dc6b7f9
---
# Add Business Logic By Using Partial Methods

You can customize Visual Basic and C# generated code in your LINQ to SQL
 projects by using *partial methods*. The code that LINQ to SQL
 generates defines signatures as one part of a partial method. If you want to implement the method, you can add your own partial method. If you do not add your own implementation, the compiler discards the partial methods signature and calls the default methods in LINQ to SQL
.

> **Note:**
> If you are using Visual Studio, you can use the Object Relational Designer to add validation and other customizations to entity classes.

 For example, the default mapping for the `Customer` class in the Northwind sample database includes the following partial method:

 [DLinqOverrideDefault#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqOverrideDefault/cs/northwind.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqOverrideDefault/cs/northwind.cs.md)
 [DLinqOverrideDefault#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqOverrideDefault/vb/northwind.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqOverrideDefault/vb/northwind.vb.md)

 You can implement your own method by adding code such as the following to your own partial `Customer` class:

 [DLinqOverrideDefault#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqOverrideDefault/cs/Program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqOverrideDefault/cs/Program.cs.md)
 [DLinqOverrideDefault#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqOverrideDefault/vb/Module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqOverrideDefault/vb/Module1.vb.md)

 This approach is typically used in LINQ to SQL
 to override default methods for `Insert`, `Update`, `Delete`, and to validate properties during object life-cycle events.

 For more information, see [Partial Methods](../../../../../visual-basic/programming-guide/language-features/procedures/partial-methods.md) (Visual Basic) or [partial (Method) (C# Reference)](../../../../../csharp/language-reference/keywords/partial-member.md) (C#).

## Example 1

 The following example shows `ExampleClass` first as it might be defined by a code-generating tool such as SQLMetal, and then how you might implement only one of the two methods.

 [DLinqSubmittingChanges#4 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqSubmittingChanges/cs/Program.cs#4)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqSubmittingChanges/cs/Program.cs.md)
 [DLinqSubmittingChanges#4 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqSubmittingChanges/vb/Module1.vb#4)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqSubmittingChanges/vb/Module1.vb.md)

## Example 2

 The following example uses the relationship between `Shipper` and `Order` entities. Note among the methods the partial methods, `InsertShipper` and `DeleteShipper`. These methods override the default partial methods supplied by LINQ to SQL
 mapping.

 [DLinqOverrideDefault#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqOverrideDefault/cs/northwind.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqOverrideDefault/cs/northwind.cs.md)
 [DLinqOverrideDefault#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqOverrideDefault/vb/northwind.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqOverrideDefault/vb/northwind.vb.md)

## See also

- [Making and Submitting Data Changes](making-and-submitting-data-changes.md)
- [Customizing Insert, Update, and Delete Operations](customizing-insert-update-and-delete-operations.md)
