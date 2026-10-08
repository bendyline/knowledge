---
description: "Learn more about: How to: Specify Which Members are Tested for Concurrency Conflicts"
title: "How to: Specify Which Members are Tested for Concurrency Conflicts"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: d2cda293-1e2f-4878-af0e-5aaf0d092120
---
# How to: Specify Which Members are Tested for Concurrency Conflicts

Apply one of three enums to the LINQ to SQL
 [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck) property on a [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute) attribute to specify which members are to be included in update checks for the detection of optimistic concurrency conflicts.

 The [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck) property (mapped at design time) is used together with runtime concurrency features in LINQ to SQL
. For more information, see [Optimistic Concurrency: Overview](optimistic-concurrency-overview.md).

> **Note:**
> Original member values are compared with the current database state as long as no member is designated as `IsVersion=true`. For more information, see [System.Data.Linq.Mapping.ColumnAttribute.IsVersion](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.IsVersion).

 For code examples, see [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck).

### To always use this member for detecting conflicts

1. Add the [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck) property to the [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute) attribute.

2. Set the [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck) property value to `Always`.

### To never use this member for detecting conflicts

1. Add the [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck) property to the [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute) attribute.

2. Set the [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck) property value to `Never`.

### To use this member for detecting conflicts only when the application has changed the value of the member

1. Add the [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck) property to the [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute) attribute.

2. Set the [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck) property value to `WhenChanged`.

## Example

 The following example specifies that `HomePage` objects should never be tested during update checks. For more information, see [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck).

 [System.Data.Linq.Mapping.UpdateCheck#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/system.data.linq.mapping.updatecheck/cs/northwind.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/system.data.linq.mapping.updatecheck/cs/northwind.cs.md)
 [System.Data.Linq.Mapping.UpdateCheck#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.mapping.updatecheck/vb/northwind.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.mapping.updatecheck/vb/northwind.vb.md)

## See also

- [How to: Manage Change Conflicts](how-to-manage-change-conflicts.md)
- [Making and Submitting Data Changes](making-and-submitting-data-changes.md)
