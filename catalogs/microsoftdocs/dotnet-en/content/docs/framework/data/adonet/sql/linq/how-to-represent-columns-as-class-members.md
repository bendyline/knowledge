---
description: "Learn more about: How to: Represent Columns as Class Members"
title: "How to: Represent Columns as Class Members"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 7ab28021-4d15-4d9c-bf2e-6ccc0daa7d1a
---
# How to: Represent Columns as Class Members

Use the LINQ to SQL
 [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute) attribute to associate a field or property with a database column.

### To map a field or property to a database column

- Add the [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute) attribute to the property or field declaration.

## Example

 The following code maps the `CustomerID` field in the `Customer` class to the `CustomerID` column in the `Customers` database table.

 [DLinqCustomize#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCustomize/cs/Program.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCustomize/cs/Program.cs.md)
 [DLinqCustomize#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCustomize/vb/Module1.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCustomize/vb/Module1.vb.md)

 You do not have to specify the [System.Data.Linq.Mapping.DataAttribute.Name](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DataAttribute.Name) property if the name can be inferred. If you do not specify a name, the name is presumed to be the same name as that of the property or field.

## See also

- [The LINQ to SQL Object Model](the-linq-to-sql-object-model.md)
- [How to: Customize Entity Classes by Using the Code Editor](how-to-customize-entity-classes-by-using-the-code-editor.md)
