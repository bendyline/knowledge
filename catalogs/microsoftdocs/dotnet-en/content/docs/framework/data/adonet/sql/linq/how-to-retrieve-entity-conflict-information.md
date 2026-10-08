---
description: "Learn more about: How to: Retrieve Entity Conflict Information"
title: "How to: Retrieve Entity Conflict Information"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: 9a02b608-e7bb-4041-a452-a7fed26fd008
---
# How to: Retrieve Entity Conflict Information

You can use objects of the [System.Data.Linq.ObjectChangeConflict](https://learn.microsoft.com/search/?terms=System.Data.Linq.ObjectChangeConflict) class to provide information about conflicts revealed by [System.Data.Linq.ChangeConflictException](https://learn.microsoft.com/search/?terms=System.Data.Linq.ChangeConflictException) exceptions. For more information, see [Optimistic Concurrency: Overview](optimistic-concurrency-overview.md).  
  
## Example  

 The following example iterates through a list of accumulated conflicts.  
  
 [System.Data.Linq.ObjectChangeConflict#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/system.data.linq.objectchangeconflict/cs/program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/system.data.linq.objectchangeconflict/cs/program.cs.md)
 [System.Data.Linq.ObjectChangeConflict#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.objectchangeconflict/vb/module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.objectchangeconflict/vb/module1.vb.md)  
  
## See also

- [How to: Manage Change Conflicts](how-to-manage-change-conflicts.md)
