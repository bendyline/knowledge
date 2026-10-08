---
description: "Learn more about: Known Issues and Considerations in LINQ to Entities"
title: "Known Issues and Considerations in LINQ to Entities"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: acd71129-5ff0-4b4e-b266-c72cc0c53601
---
# Known Issues and Considerations in LINQ to Entities

This section provides information about known issues with LINQ to Entities queries.

- [LINQ Queries That cannot be Cached](#LINQQueriesThatAreNotCached)

- [Ordering Information Lost](#OrderingInfoLost)

- [Unsigned Integers Not Supported](#UnsignedIntsUnsupported)

- [Type Conversion Errors](#TypeConversionErrors)

- [Referencing Non-Scalar Variables Not Supported](#RefNonScalarClosures)

- [Nested Queries May Fail with SQL Server 2000](#NestedQueriesSQL2000)

- [Projecting to an Anonymous Type](#ProjectToAnonymousType)

<a name="LINQQueriesThatAreNotCached"></a>

## LINQ Queries That cannot be Cached

 Starting with .NET Framework 4.5, LINQ to Entities queries are automatically cached. However, LINQ to Entities queries that apply the `Enumerable.Contains` operator to in-memory collections are not automatically cached. Also parameterizing in-memory collections in compiled LINQ queries is not allowed.

<a name="OrderingInfoLost"></a>

## Ordering Information Lost

 Projecting columns into an anonymous type will cause ordering information to be lost in some queries that are executed against a SQL Server 2005 database set to a compatibility level of "80".  This occurs when a column name in the order-by list matches a column name in the selector, as shown in the following example:

 [DP L2E Conceptual Examples#SBUDT543840 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#sbudt543840)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#SBUDT543840 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#sbudt543840)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

<a name="UnsignedIntsUnsupported"></a>

## Unsigned Integers Not Supported

 Specifying an unsigned integer type in a LINQ to Entities query is not supported because the Entity Framework does not support unsigned integers. If you specify an unsigned integer, an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) exception will be thrown during the query expression translation, as shown in the following example. This example queries for an order with ID 48000.

 [DP L2E Conceptual Examples#UIntAsQueryParam (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#uintasqueryparam)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#UIntAsQueryParam (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#uintasqueryparam)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

<a name="TypeConversionErrors"></a>

## Type Conversion Errors

 In Visual Basic, when a property is mapped to a column of SQL Server bit type with a value of 1 using the `CByte` function, a [System.Data.SqlClient.SqlException](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlException) is thrown with an "Arithmetic overflow error" message. The following example queries the `Product.MakeFlag` column in the AdventureWorks sample database and an exception is thrown when the query results are iterated over.

 [DP L2E Conceptual Examples#SBUDT544355 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#sbudt544355)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

<a name="RefNonScalarClosures"></a>

## Referencing Non-Scalar Variables Not Supported

 Referencing a non-scalar variables, such as an entity, in a query is not supported. When such a query executes, a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) exception is thrown with a message that states "Unable to create a constant value of type `EntityType`. Only primitive types ('such as Int32, String, and Guid') are supported in this context."

> **Note:**
> Referencing a collection of scalar variables is supported.

 [DP L2E Conceptual Examples#SBUDT555877 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#sbudt555877)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#SBUDT555877 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#sbudt555877)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

<a name="NestedQueriesSQL2000"></a>

## Nested Queries May Fail with SQL Server 2000

 With SQL Server 2000, LINQ to Entities queries may fail if they produce nested Transact-SQL queries that are three or more levels deep.

<a name="ProjectToAnonymousType"></a>

## Projecting to an Anonymous Type

 If you define your initial query path to include related objects by using the [System.Data.Objects.ObjectQuery`1.Include*](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectQuery%601.Include*) method on the [System.Data.Objects.ObjectQuery`1](https://learn.microsoft.com/search/?terms=System.Data.Objects.ObjectQuery%601) and then use LINQ to project the returned objects to an anonymous type, the objects specified in the include method are not included in the query results.

 [DP L2E Conceptual Examples#ProjToAnonType1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#projtoanontype1)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#ProjToAnonType1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#projtoanontype1)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

 To get related objects, do not project returned types to an anonymous type.

 [DP L2E Conceptual Examples#ProjToAnonType2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs#projtoanontype2)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DP L2E Conceptual Examples/CS/Program.cs.md>)
 [DP L2E Conceptual Examples#ProjToAnonType2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb#projtoanontype2)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DP L2E Conceptual Examples/VB/Module1.vb.md>)

## See also

- [LINQ to Entities](linq-to-entities.md)
