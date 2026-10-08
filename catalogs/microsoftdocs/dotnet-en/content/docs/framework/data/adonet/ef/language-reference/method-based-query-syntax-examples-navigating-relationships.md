---
description: "Learn more about: Method-Based Query Syntax Examples: Navigating Relationships"
title: "Method-Based Query Syntax Examples: Navigating Relationships"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: a0bfa4b1-99e5-4dd1-9912-4b825a9dc25c
---
# Method-Based Query Syntax Examples: Navigating Relationships

Navigation properties in the Entity Framework are shortcut properties used to locate the entities at the ends of an association. Navigation properties allow a user to navigate from one entity to another, or from one entity to related entities through an association set. This topic provides examples in method-based query syntax of how to navigate relationships through navigation properties in LINQ to Entities queries.

 The AdventureWorks Sales Model used in these examples is built from the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#importsusing)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#ImportsUsing (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#importsusing)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Example 1

 The following example in method-based query syntax uses the [System.Linq.Queryable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.SelectMany*) method to get all the orders of the contacts whose last name is "Zhou". The `Contact.SalesOrderHeader` navigation property is used to get the collection of `SalesOrderHeader` objects for each contact.

 [DP L2E Examples#SelectEachContactsOrders_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#selecteachcontactsorders_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#SelectEachContactsOrders_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#selecteachcontactsorders_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Example 2

 The following example in method-based query syntax uses the [System.Linq.Queryable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Select*) method to get all the contact IDs and the sum of the total due for each contact whose last name is "Zhou". The `Contact.SalesOrderHeader` navigation property is used to get the collection of `SalesOrderHeader` objects for each contact. The `Sum` method uses the `Contact.SalesOrderHeader` navigation property to sum the total due of all the orders for each contact.

 [DP L2E Examples#SelectEachContactsOrders2_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#selecteachcontactsorders2_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#SelectEachContactsOrders2_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#selecteachcontactsorders2_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Example 3

 The following example in method-based query syntax gets all the orders of the contacts whose last name is "Zhou". The `Contact.SalesOrderHeader` navigation property is used to get the collection of `SalesOrderHeader` objects for each contact. The contact's name and orders are returned in an anonymous type.

 [DP L2E Examples#SelectEachContactsOrders3_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#selecteachcontactsorders3_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#SelectEachContactsOrders3_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#selecteachcontactsorders3_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Example 4

 The following example uses the `SalesOrderHeader.Address` and `SalesOrderHeader.Contact` navigation properties to get the collection of `Address` and `Contact` objects associated with each order. The last name of the contact, the street address, the sales order number, and the total due for each order to the city of Seattle are returned in an anonymous type.

 [DP L2E Examples#GetOrderInfoThruRelationships_MQ (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#getorderinfothrurelationships_mq)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#GetOrderInfoThruRelationships_MQ (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#getorderinfothrurelationships_mq)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## Example 5

 The following example uses the `Where` method to find orders that were made after December 1, 2003, and then uses the `order.SalesOrderDetail` navigation property to get the details for each order.

 [DP L2E Examples#WhereNavProperty (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs#wherenavproperty)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Examples/CS/Program.cs.md>)
 [DP L2E Examples#WhereNavProperty (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb#wherenavproperty)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Examples/VB/Module1.vb.md>)

## See also

- [Relationships, navigation properties and foreign keys](https://learn.microsoft.com/ef/ef6/fundamentals/relationships)
- [Queries in LINQ to Entities](queries-in-linq-to-entities.md)
