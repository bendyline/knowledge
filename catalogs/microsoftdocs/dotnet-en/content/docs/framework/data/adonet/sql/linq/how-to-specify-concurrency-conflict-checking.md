---
description: "Learn more about: How to: Specify Concurrency-Conflict Checking"
title: "How to: Specify Concurrency-Conflict Checking"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: c2547fcb-58eb-4377-9948-1b8d76a0f3d7
---
# How to: Specify Concurrency-Conflict Checking

You can specify which columns of the database are to be checked for concurrency conflicts when you call [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*). For more information, see [How to: Specify Which Members are Tested for Concurrency Conflicts](how-to-specify-which-members-are-tested-for-concurrency-conflicts.md).

## Example

 The following code specifies that the `HomePage` member should never be tested during update checks. For more information, see [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck).

 [System.Data.Linq.Mapping.UpdateCheck#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/system.data.linq.mapping.updatecheck/cs/northwind.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/system.data.linq.mapping.updatecheck/cs/northwind.cs.md)
 [System.Data.Linq.Mapping.UpdateCheck#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.mapping.updatecheck/vb/northwind.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.mapping.updatecheck/vb/northwind.vb.md)

## See also

- [The LINQ to SQL Object Model](the-linq-to-sql-object-model.md)
- [How to: Customize Entity Classes by Using the Code Editor](how-to-customize-entity-classes-by-using-the-code-editor.md)
