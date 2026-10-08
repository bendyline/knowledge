---
description: "Learn more about: How to: Execute a Query that Returns RefType Results"
title: "How to: Execute a Query that Returns RefType Results"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 7dbbfbcd-93f5-4546-9dbf-e5fa290b69fa
---
# How to: Execute a Query that Returns RefType Results

This topic shows how to execute a command against a conceptual model by using an [System.Data.EntityClient.EntityCommand](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand) object, and how to retrieve the [System.Data.Metadata.Edm.RefType](https://learn.microsoft.com/search/?terms=System.Data.Metadata.Edm.RefType) results by using an [System.Data.EntityClient.EntityDataReader](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityDataReader).

### To run the code in this example

1. Add the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks) to your project and configure your project to use the Entity Framework. For more information, see [How to: Use the Entity Data Model Wizard](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb738677\(v=vs.100\)).

2. In the code page for your application, add the following `using` directives (`Imports` in Visual Basic):

     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#namespaces)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#namespaces)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## Example

 This example executes a query that returns [System.Data.Metadata.Edm.RefType](https://learn.microsoft.com/search/?terms=System.Data.Metadata.Edm.RefType) results. If you pass the following query as an argument to the `ExecuteRefTypeQuery` function, the function returns a reference to the entity:

 [DP EntityServices Concepts 2#REF2 (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs#ref2)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs.md>)

 If you pass a parameterized query, like the following, add the [System.Data.EntityClient.EntityParameter](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityParameter) objects to the [System.Data.EntityClient.EntityCommand.Parameters](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand.Parameters) property on the [System.Data.EntityClient.EntityCommand](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand) object.

 [DP EntityServices Concepts 2#REF3 (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs#ref3)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts 2/cs/entitysql.cs.md>)

 [DP EntityServices Concepts#eSQLRefTypes (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#esqlreftypes)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
 [DP EntityServices Concepts#eSQLRefTypes (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#esqlreftypes)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## See also

- [Entity SQL Reference](language-reference/entity-sql-reference.md)
- [EntityClient Provider for the Entity Framework](entityclient-provider-for-the-entity-framework.md)
