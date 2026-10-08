---
description: "Learn more about: How to: Execute a Polymorphic Query"
title: "How to: Execute a Polymorphic Query"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 2f05da1e-845b-4f14-83e4-c6353a850553
---

# How to: Execute a Polymorphic Query

This topic shows how to execute a polymorphic Entity SQL query using the [OFTYPE](language-reference/oftype-entity-sql.md) operator.

### To run the code in this example

1. Add the [School Model](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb896300\(v=vs.100\)) to your project and configure your project to use the Entity Framework. For more information, see [How to: Use the Entity Data Model Wizard](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb738677\(v=vs.100\)).

2. In the code page for your application, add the following `using` directives (`Imports` in Visual Basic):

    [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#namespaces)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
    [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#namespaces)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

3. Modify the conceptual model to have a table-per-hierarchy inheritance by following the steps in [Walkthrough: Mapping Inheritance - Table-per-Hierarchy](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/cc716683\(v=vs.100\)).

## Example

The following example uses an OFTYPE operator to get and display a collection of only `OnsiteCourses` from a collection of `Courses`.

[DP EntityServices Concepts#PolymorphicQuery (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#polymorphicquery)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
[DP EntityServices Concepts#PolymorphicQuery (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#polymorphicquery)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## See also

- [EntityClient Provider for the Entity Framework](entityclient-provider-for-the-entity-framework.md)
- [Entity SQL Language](language-reference/entity-sql-language.md)
