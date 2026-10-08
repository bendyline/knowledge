---
description: "Learn more about: DataTable Constraints"
title: "DataTable Constraints"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 27c9f2fd-f64d-4b4e-bbf6-1d24f47067cb
---
# DataTable Constraints

You can use constraints to enforce restrictions on the data in a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable), in order to maintain the integrity of the data. A constraint is an automatic rule, applied to a column or related columns, that determines the course of action when the value of a row is somehow altered. Constraints are enforced when the `System.Data.DataSet.EnforceConstraints` property of the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) is **true**. For a code example that shows how to set the `EnforceConstraints` property, see the [System.Data.DataSet.EnforceConstraints*](https://learn.microsoft.com/search/?terms=System.Data.DataSet.EnforceConstraints*) reference topic.

 There are two kinds of constraints in ADO.NET: the [System.Data.ForeignKeyConstraint](https://learn.microsoft.com/search/?terms=System.Data.ForeignKeyConstraint) and the [System.Data.UniqueConstraint](https://learn.microsoft.com/search/?terms=System.Data.UniqueConstraint). By default, both constraints are created automatically when you create a relationship between two or more tables by adding a [System.Data.DataRelation](https://learn.microsoft.com/search/?terms=System.Data.DataRelation) to the **DataSet**. However, you can disable this behavior by specifying `createConstraints` = `false` when creating the relation.

## ForeignKeyConstraint

 A `ForeignKeyConstraint` enforces rules about how updates and deletes to related tables are propagated. For example, if a value in a row of one table is updated or deleted, and that same value is also used in one or more related tables, a `ForeignKeyConstraint` determines what happens in the related tables.

 The [System.Data.ForeignKeyConstraint.DeleteRule](https://learn.microsoft.com/search/?terms=System.Data.ForeignKeyConstraint.DeleteRule) and [System.Data.ForeignKeyConstraint.UpdateRule](https://learn.microsoft.com/search/?terms=System.Data.ForeignKeyConstraint.UpdateRule) properties of the `ForeignKeyConstraint` define the action to be taken when the user attempts to delete or update a row in a related table. The following table describes the different settings available for the `DeleteRule` and `UpdateRule` properties of the **ForeignKeyConstraint**.

| Rule setting | Description |
| --- | --- |
| **Cascade** | Delete or update related rows. |
| **SetNull** | Set values in related rows to **DBNull**. |
| **SetDefault** | Set values in related rows to the default value. |
| **None** | Take no action on related rows. This is the default. |

 A `ForeignKeyConstraint` can restrict, as well as propagate, changes to related columns. Depending on the properties set for the `ForeignKeyConstraint` of a column, if the `EnforceConstraints` property of the `DataSet` is **true**, performing certain operations on the parent row will result in an exception. For example, if the `DeleteRule` property of the `ForeignKeyConstraint` is **None**, a parent row cannot be deleted if it has any child rows.

 You can create a foreign key constraint between single columns or between an array of columns by using the `ForeignKeyConstraint` constructor. Pass the resulting `ForeignKeyConstraint` object to the `Add` method of the table's `Constraints` property, which is a **ConstraintCollection**. You can also pass constructor arguments to several overloads of the `Add` method of a `ConstraintCollection` to create a **ForeignKeyConstraint**.

 When creating a **ForeignKeyConstraint**, you can pass the `DeleteRule` and `UpdateRule` values to the constructor as arguments, or you can set them as properties as in the following example (where the `DeleteRule` value is set to **None**).

```vb
Dim custOrderFK As ForeignKeyConstraint = New ForeignKeyConstraint("CustOrderFK", _
  custDS.Tables("CustTable").Columns("CustomerID"), _
  custDS.Tables("OrdersTable").Columns("CustomerID"))
custOrderFK.DeleteRule = Rule.None
' Cannot delete a customer value that has associated existing orders.
custDS.Tables("OrdersTable").Constraints.Add(custOrderFK)
```

```csharp
ForeignKeyConstraint custOrderFK = new ForeignKeyConstraint("CustOrderFK",
  custDS.Tables["CustTable"].Columns["CustomerID"],
  custDS.Tables["OrdersTable"].Columns["CustomerID"]);
custOrderFK.DeleteRule = Rule.None;
// Cannot delete a customer value that has associated existing orders.
custDS.Tables["OrdersTable"].Constraints.Add(custOrderFK);
```

### AcceptRejectRule

 Changes to rows can be accepted using the `AcceptChanges` method or canceled using the `RejectChanges` method of the **DataSet**, **DataTable**, or **DataRow**. When a `DataSet` contains **ForeignKeyConstraints**, invoking the `AcceptChanges` or `RejectChanges` methods enforces the **AcceptRejectRule**. The `AcceptRejectRule` property of the `ForeignKeyConstraint` determines which action will be taken on the child rows when `AcceptChanges` or `RejectChanges` is called on the parent row.

 The following table lists the available settings for the **AcceptRejectRule**.

| Rule setting | Description |
| --- | --- |
| **Cascade** | Accept or reject changes to child rows. |
| **None** | Take no action on child rows. This is the default. |

### Example

 The following example creates a [System.Data.ForeignKeyConstraint](https://learn.microsoft.com/search/?terms=System.Data.ForeignKeyConstraint), sets several of its properties, including the [System.Data.ForeignKeyConstraint.AcceptRejectRule](https://learn.microsoft.com/search/?terms=System.Data.ForeignKeyConstraint.AcceptRejectRule), and adds it to the [System.Data.ConstraintCollection](https://learn.microsoft.com/search/?terms=System.Data.ConstraintCollection) of a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object.

 [DataWorks Data.AcceptRejectRule#1 (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks Data.AcceptRejectRule/CS/source.cs#1)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks Data.AcceptRejectRule/CS/source.cs.md>)
 [DataWorks Data.AcceptRejectRule#1 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks Data.AcceptRejectRule/VB/source.vb#1)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks Data.AcceptRejectRule/VB/source.vb.md>)

## UniqueConstraint

 The `UniqueConstraint` object, which can be assigned either to a single column or to an array of columns in a **DataTable**, ensures that all data in the specified column or columns is unique per row. You can create a unique constraint for a column or array of columns by using the `UniqueConstraint` constructor. Pass the resulting `UniqueConstraint` object to the `Add` method of the table's `Constraints` property, which is a **ConstraintCollection**. You can also pass constructor arguments to several overloads of the `Add` method of a `ConstraintCollection` to create a **UniqueConstraint**. When creating a `UniqueConstraint` for a column or columns, you can optionally specify whether the column or columns are a primary key.

 You can also create a unique constraint for a column by setting the `Unique` property of the column to **true**. Alternatively, setting the `Unique` property of a single column to `false` removes any unique constraint that may exist. Defining a column or columns as the primary key for a table will automatically create a unique constraint for the specified column or columns. If you remove a column from the `PrimaryKey` property of a **DataTable**, the `UniqueConstraint` is removed.

 The following example creates a `UniqueConstraint` for two columns of a **DataTable**.

```vb
Dim custTable As DataTable = custDS.Tables("Customers")
Dim custUnique As UniqueConstraint = _
    New UniqueConstraint(New DataColumn()   {custTable.Columns("CustomerID"), _
    custTable.Columns("CompanyName")})
custDS.Tables("Customers").Constraints.Add(custUnique)
```

```csharp
DataTable custTable = custDS.Tables["Customers"];
UniqueConstraint custUnique = new UniqueConstraint(new DataColumn[]
    {custTable.Columns["CustomerID"],
    custTable.Columns["CompanyName"]});
custDS.Tables["Customers"].Constraints.Add(custUnique);
```

## See also

- [System.Data.DataRelation](https://learn.microsoft.com/search/?terms=System.Data.DataRelation)
- [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable)
- [System.Data.ForeignKeyConstraint](https://learn.microsoft.com/search/?terms=System.Data.ForeignKeyConstraint)
- [System.Data.UniqueConstraint](https://learn.microsoft.com/search/?terms=System.Data.UniqueConstraint)
- [DataTable Schema Definition](datatable-schema-definition.md)
- [DataSets, DataTables, and DataViews](index.md)
- [ADO.NET Overview](../ado-net-overview.md)
