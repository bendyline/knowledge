---
description: "Learn more about: How to: Retrieve Member Conflict Information"
title: "How to: Retrieve Member Conflict Information"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 7dd6829e-79a5-4480-9023-9e588cb0bf2e
---
# How to: Retrieve Member Conflict Information

You can use the [System.Data.Linq.MemberChangeConflict](https://learn.microsoft.com/search/?terms=System.Data.Linq.MemberChangeConflict) class to retrieve information about individual members in conflict. In this same context you can provide for custom handling of the conflict for any member. For more information, see [Optimistic Concurrency: Overview](optimistic-concurrency-overview.md).

## Example

 The following code iterates through the [System.Data.Linq.ObjectChangeConflict](https://learn.microsoft.com/search/?terms=System.Data.Linq.ObjectChangeConflict) objects. For each object, it then iterates through the [System.Data.Linq.MemberChangeConflict](https://learn.microsoft.com/search/?terms=System.Data.Linq.MemberChangeConflict) objects.

> **Note:**
> Include [System.Reflection](https://learn.microsoft.com/search/?terms=System.Reflection) in order to provide [System.Data.Linq.MemberChangeConflict.Member*](https://learn.microsoft.com/search/?terms=System.Data.Linq.MemberChangeConflict.Member*) information.

 [System.Data.Linq.MemberChangeConflict#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/system.data.linq.memberchangeconflict/cs/program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/system.data.linq.memberchangeconflict/cs/program.cs.md)
 [System.Data.Linq.MemberChangeConflict#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.memberchangeconflict/vb/module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.memberchangeconflict/vb/module1.vb.md)

## See also

- [How to: Manage Change Conflicts](how-to-manage-change-conflicts.md)
