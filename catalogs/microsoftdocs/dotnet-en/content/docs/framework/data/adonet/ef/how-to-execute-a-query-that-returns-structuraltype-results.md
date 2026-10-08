---
description: "Learn more about: How to: Execute a Query that Returns StructuralType Results"
title: "How to: Execute a Query that Returns StructuralType Results"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 2314f2a2-b1c3-40c4-95bb-cdf9b21a7b53
---
# How to: Execute a Query that Returns StructuralType Results

This topic shows how to execute a command against a conceptual model by using an [System.Data.EntityClient.EntityCommand](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand) object, and how to retrieve the [System.Data.Metadata.Edm.StructuralType](https://learn.microsoft.com/search/?terms=System.Data.Metadata.Edm.StructuralType) results by using an [System.Data.EntityClient.EntityDataReader](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityDataReader). The [System.Data.Metadata.Edm.EntityType](https://learn.microsoft.com/search/?terms=System.Data.Metadata.Edm.EntityType), [System.Data.Metadata.Edm.RowType](https://learn.microsoft.com/search/?terms=System.Data.Metadata.Edm.RowType) and [System.Data.Metadata.Edm.ComplexType](https://learn.microsoft.com/search/?terms=System.Data.Metadata.Edm.ComplexType) classes derive from the [System.Data.Metadata.Edm.StructuralType](https://learn.microsoft.com/search/?terms=System.Data.Metadata.Edm.StructuralType) class.

### To run the code in this example

1. Add the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks) to your project and configure your project to use the Entity Framework. For more information, see [How to: Use the Entity Data Model Wizard](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb738677\(v=vs.100\)).

2. In the code page for your application, add the following `using` directives (`Imports` in Visual Basic):

     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#namespaces)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#namespaces)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## Example

 This example executes a query that returns [System.Data.Metadata.Edm.EntityType](https://learn.microsoft.com/search/?terms=System.Data.Metadata.Edm.EntityType) results. If you pass the following query as an argument to the `ExecuteStructuralTypeQuery` function, the function displays details about the `Products`:

 [DP EntityServices Concepts 2#SelectProduct (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs#selectproduct)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs.md>)

 If you pass a parameterized query, like the following, add the [System.Data.EntityClient.EntityParameter](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityParameter) objects to the [System.Data.EntityClient.EntityCommand.Parameters](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand.Parameters) property on the [System.Data.EntityClient.EntityCommand](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand) object.

 [DP EntityServices Concepts 2#GREATER_OR_EQUALS (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs#greater_or_equals)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs.md>)

 [DP EntityServices Concepts#eSQLStructuralTypes (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#esqlstructuraltypes)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
 [DP EntityServices Concepts#eSQLStructuralTypes (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#esqlstructuraltypes)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## See also

- [Entity SQL Reference](language-reference/entity-sql-reference.md)
- [EntityClient Provider for the Entity Framework](entityclient-provider-for-the-entity-framework.md)
