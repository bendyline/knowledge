---
description: "Learn more about: How to: Navigate Relationships with the Navigate Operator"
title: "How to: Navigate Relationships with the Navigate Operator"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 79996d2d-9b03-4a9d-82cc-7c5e7c2ad93d
---
# How to: Navigate Relationships with the Navigate Operator

This topic shows how to execute a command against a conceptual model by using an [System.Data.EntityClient.EntityCommand](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand) object, and how to retrieve the [System.Data.Metadata.Edm.RefType](https://learn.microsoft.com/search/?terms=System.Data.Metadata.Edm.RefType) results by using an [System.Data.EntityClient.EntityDataReader](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityDataReader).

### To run the code in this example

1. Add the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks) to your project and configure your project to use the Entity Framework. For more information, see [How to: Use the Entity Data Model Wizard](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb738677\(v=vs.100\)).

2. In the code page for your application, add the following `using` directives (`Imports` in Visual Basic):

     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#namespaces)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#namespaces)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## Example

 The following example shows how to navigate relationships in Entity SQL by using the [NAVIGATE](language-reference/navigate-entity-sql.md) operator. The `Navigate` operator takes the following parameters: an instance of an entity, the relationship type, the end of the relationship, and the beginning of the relationship. Optionally, you can pass only an instance of an entity and the relationship type to the `Navigate` operator.

 [DP EntityServices Concepts#NavigateWithNavOperatorWithEntityCommand (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#navigatewithnavoperatorwithentitycommand)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
 [DP EntityServices Concepts#NavigateWithNavOperatorWithEntityCommand (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#navigatewithnavoperatorwithentitycommand)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## See also

- [EntityClient Provider for the Entity Framework](entityclient-provider-for-the-entity-framework.md)
- [Entity SQL Language](language-reference/entity-sql-language.md)
