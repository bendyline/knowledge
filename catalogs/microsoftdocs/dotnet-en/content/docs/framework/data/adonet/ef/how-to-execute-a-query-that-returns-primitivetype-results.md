---
description: "Learn more about: How to: Execute a Query that Returns PrimitiveType Results"
title: "How to: Execute a Query that Returns PrimitiveType Results"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 7139d585-4034-4dfa-916f-2120a8b72792
---
# How to: Execute a Query that Returns PrimitiveType Results

This topic shows how to execute a command against a conceptual model by using an [System.Data.EntityClient.EntityCommand](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand), and how to retrieve the [System.Data.Metadata.Edm.PrimitiveType](https://learn.microsoft.com/search/?terms=System.Data.Metadata.Edm.PrimitiveType) results by using an [System.Data.EntityClient.EntityDataReader](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityDataReader).

### To run the code in this example

1. Add the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks) to your project and configure your project to use the Entity Framework. For more information, see [How to: Use the Entity Data Model Wizard](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb738677\(v=vs.100\)).

2. In the code page for your application, add the following `using` directives (`Imports` in Visual Basic):

     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#namespaces)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#namespaces)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## Example

 This example executes a query that returns a [System.Data.Metadata.Edm.PrimitiveType](https://learn.microsoft.com/search/?terms=System.Data.Metadata.Edm.PrimitiveType) result. If you pass the following query as an argument to the `ExecutePrimitiveTypeQuery` function, the function displays the average list price of all `Products`:

 [DP EntityServices Concepts 2#EDM_AVG (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs#edm_avg)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs.md>)

 If you pass a parameterized query, like the following, [System.Data.EntityClient.EntityParameter](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityParameter) objects to the [System.Data.EntityClient.EntityCommand.Parameters](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand.Parameters) property on the [System.Data.EntityClient.EntityCommand](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand) object.

 [DP EntityServices Concepts 2#CASE_WHEN_THEN_ELSE (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs#case_when_then_else)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs.md>)

 [DP EntityServices Concepts#eSQLPrimitiveTypes (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#esqlprimitivetypes)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
 [DP EntityServices Concepts#eSQLPrimitiveTypes (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#esqlprimitivetypes)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## See also

- [Entity SQL Reference](language-reference/entity-sql-reference.md)
- [EntityClient Provider for the Entity Framework](entityclient-provider-for-the-entity-framework.md)
