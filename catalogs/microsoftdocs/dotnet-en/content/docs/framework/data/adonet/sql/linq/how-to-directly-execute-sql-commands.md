---
description: "Learn more about: How to: Directly Execute SQL Commands"
title: "How to: Directly Execute SQL Commands"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 04671bb0-40c0-4465-86e5-77986f454661
---
# How to: Directly Execute SQL Commands

Assuming a [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) connection, you can use [System.Data.Linq.DataContext.ExecuteCommand*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.ExecuteCommand*) to execute SQL commands that do not return objects.

## Example

 The following example causes SQL Server to increase UnitPrice by 1.00.

 [DLinqCommunicatingWithDatabase#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCommunicatingWithDatabase/cs/Program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCommunicatingWithDatabase/cs/Program.cs.md)
 [DLinqCommunicatingWithDatabase#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCommunicatingWithDatabase/vb/Module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCommunicatingWithDatabase/vb/Module1.vb.md)

## See also

- [How to: Directly Execute SQL Queries](how-to-directly-execute-sql-queries.md)
- [Communicating with the Database](communicating-with-the-database.md)
