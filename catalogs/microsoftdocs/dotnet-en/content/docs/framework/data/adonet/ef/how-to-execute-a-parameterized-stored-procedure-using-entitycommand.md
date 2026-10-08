---
description: "Learn more about: How to: Execute a Parameterized Stored Procedure Using EntityCommand"
title: "How to: Execute a Parameterized Stored Procedure Using EntityCommand"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 4f5639bf-bb7f-4982-bb1d-c7caa4348888
---
# How to: Execute a Parameterized Stored Procedure Using EntityCommand

This topic shows how to execute a parameterized stored procedure by using the [System.Data.EntityClient.EntityCommand](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityCommand) class.

### To run the code in this example

1. Add the [School Model](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb896300\(v=vs.100\)) to your project and configure your project to use the Entity Framework. For more information, see [How to: Use the Entity Data Model Wizard](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb738677\(v=vs.100\)).

2. In the code page for your application, add the following `using` directives (`Imports` in Visual Basic):

     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#namespaces)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
     [DP EntityServices Concepts#Namespaces (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#namespaces)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

3. Import the `GetStudentGrades` stored procedure and specify `CourseGrade` entities as a return type. For information on how to import a stored procedure, see [How to: Import a Stored Procedure](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb896231\(v=vs.100\)).

## Example

 The following code executes the `GetStudentGrades` stored procedure where `StudentId` is a required parameter. The results are then read by an [System.Data.EntityClient.EntityDataReader](https://learn.microsoft.com/search/?terms=System.Data.EntityClient.EntityDataReader).

 [DP EntityServices Concepts#StoredProcWithEntityCommand (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs#storedprocwithentitycommand)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/source.cs.md>)
 [DP EntityServices Concepts#StoredProcWithEntityCommand (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb#storedprocwithentitycommand)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp entityservices concepts/vb/source.vb.md>)

## See also

- [EntityClient Provider for the Entity Framework](entityclient-provider-for-the-entity-framework.md)
