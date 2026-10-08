---
description: "Learn more about: How to: Represent Computed Columns"
title: "How to: Represent Computed Columns"
ms.date: "03/30/2017"
ms.assetid: 4025f1fd-9dfa-46c0-b04f-34e8bc7957a2
---
# How to: Represent Computed Columns

Use the LINQ to SQL
 [System.Data.Linq.Mapping.ColumnAttribute.Expression](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.Expression) property on a [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute) attribute to represent a column whose contents are the result of calculation.

 For code examples, see [System.Data.Linq.Mapping.ColumnAttribute.Expression*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.Expression*).

> **Note:**
> LINQ to SQL
 does not support computed columns as primary keys.

### To represent a computed column

1. Add the [System.Data.Linq.Mapping.ColumnAttribute.Expression](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.Expression) property to the [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute) attribute.

2. Assign a string representation of the formula to the [System.Data.Linq.Mapping.ColumnAttribute.Expression](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.Expression) property.

## See also

- [The LINQ to SQL Object Model](the-linq-to-sql-object-model.md)
- [How to: Customize Entity Classes by Using the Code Editor](how-to-customize-entity-classes-by-using-the-code-editor.md)
