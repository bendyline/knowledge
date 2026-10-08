---
description: "Learn more about: How to: Execute a Parameterized Entity SQL Query Using EntityCommand"
title: "How to: Execute a Parameterized Entity SQL Query Using EntityCommand"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: e93fea43-7e03-4d7d-9fee-2517b8b88cba
---
# How to: Execute a Parameterized Entity SQL Query Using EntityCommand

This topic shows how to execute an Entity SQL query that has parameters by using an [System.Data.EntityClient.EntityCommand](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand) object.

### To run the code in this example

1. Add the [AdventureWorks Sales Model](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks) to your project and configure your project to use the Entity Framework. For more information, see [How to: Use the Entity Data Model Wizard](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb738677\(v=vs.100\)).

2. In the code page for your application, add the following `using` directives (`Imports` in Visual Basic):

     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#namespaces)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#namespaces)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## Example

 The following example shows how to construct a query string with two parameters. It then creates an [System.Data.EntityClient.EntityCommand](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand), adds two parameters to the [System.Data.EntityClient.EntityParameter](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityParameter) collection of that [System.Data.EntityClient.EntityCommand](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand), and iterates through the collection of `Contact` items.

 [DP EntityServices Concepts#ParameterizedQueryWithEntityCommand (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#parameterizedquerywithentitycommand)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
 [DP EntityServices Concepts#ParameterizedQueryWithEntityCommand (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#parameterizedquerywithentitycommand)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## See also

- [How to: Execute a Parameterized Query](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb738521\(v=vs.100\))
- [Entity SQL Language](language-reference/entity-sql-language.md)
