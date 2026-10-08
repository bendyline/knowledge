---
description: "Learn more about: Handling DataTable Events"
title: "Handling DataTable Events"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 62f404a5-13ea-4b93-a29f-55b74a16c9d3
---
# Handling DataTable Events

The [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object provides a series of events that can be processed by an application. The following table describes `DataTable` events.

| Event | Description |
| --- | --- |
| [System.Data.DataTable.Initialized](https://learn.microsoft.com/search/?terms=System.Data.DataTable.Initialized) | Occurs after the [System.Data.DataTable.EndInit*](https://learn.microsoft.com/search/?terms=System.Data.DataTable.EndInit*) method of a `DataTable` is called. This event is intended primarily to support design-time scenarios. |
| [System.Data.DataTable.ColumnChanged](https://learn.microsoft.com/search/?terms=System.Data.DataTable.ColumnChanged) | Occurs after a value has been successfully changed in a [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn). |
| [System.Data.DataTable.ColumnChanging](https://learn.microsoft.com/search/?terms=System.Data.DataTable.ColumnChanging) | Occurs when a value has been submitted for a `DataColumn`. |
| [System.Data.DataTable.RowChanged](https://learn.microsoft.com/search/?terms=System.Data.DataTable.RowChanged) | Occurs after a `DataColumn` value or the [System.Data.DataRow.RowState*](https://learn.microsoft.com/search/?terms=System.Data.DataRow.RowState*) of a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) in the `DataTable` has been changed successfully. |
| [System.Data.DataTable.RowChanging](https://learn.microsoft.com/search/?terms=System.Data.DataTable.RowChanging) | Occurs when a change has been submitted for a `DataColumn` value or the `RowState` of a `DataRow` in the `DataTable`. |
| [System.Data.DataTable.RowDeleted](https://learn.microsoft.com/search/?terms=System.Data.DataTable.RowDeleted) | Occurs after a `DataRow` in the `DataTable` has been marked as `Deleted`. |
| [System.Data.DataTable.RowDeleting](https://learn.microsoft.com/search/?terms=System.Data.DataTable.RowDeleting) | Occurs before a `DataRow` in the `DataTable` is marked as `Deleted`. |
| [System.Data.DataTable.TableCleared](https://learn.microsoft.com/search/?terms=System.Data.DataTable.TableCleared) | Occurs after a call to the [System.Data.DataTable.Clear*](https://learn.microsoft.com/search/?terms=System.Data.DataTable.Clear*) method of the `DataTable` has successfully cleared every `DataRow`. |
| [System.Data.DataTable.TableClearing](https://learn.microsoft.com/search/?terms=System.Data.DataTable.TableClearing) | Occurs after the `Clear` method is called but before the `Clear` operation begins. |
| [System.Data.DataTable.TableNewRow](https://learn.microsoft.com/search/?terms=System.Data.DataTable.TableNewRow) | Occurs after a new `DataRow` is created by a call to the `NewRow` method of the `DataTable`. |
| [System.ComponentModel.MarshalByValueComponent.Disposed](https://learn.microsoft.com/search/?terms=System.ComponentModel.MarshalByValueComponent.Disposed) | Occurs when the `DataTable` is `Disposed`. Inherited from [System.ComponentModel.MarshalByValueComponent](https://learn.microsoft.com/search/?terms=System.ComponentModel.MarshalByValueComponent). |

> **Note:**
> Most operations that add or delete rows do not raise the `ColumnChanged` and `ColumnChanging` events. However, the `ReadXml` method does raise `ColumnChanged` and `ColumnChanging` events, unless the `XmlReadMode` is set to `DiffGram` or is set to `Auto` when the XML document being read is a `DiffGram`.

> **Warning:**
> Data corruption can occur if data is modified in a `DataSet` from which the `RowChanged` event is raised. No exception will be raised if such data corruption occurs.

## Additional Related Events

 The [System.Data.DataTable.Constraints](https://learn.microsoft.com/search/?terms=System.Data.DataTable.Constraints) property holds a [System.Data.ConstraintCollection](https://learn.microsoft.com/search/?terms=System.Data.ConstraintCollection) instance. The [System.Data.ConstraintCollection](https://learn.microsoft.com/search/?terms=System.Data.ConstraintCollection) class exposes a [System.Data.ConstraintCollection.CollectionChanged](https://learn.microsoft.com/search/?terms=System.Data.ConstraintCollection.CollectionChanged) event. This event fires when a constraint is added, modified, or removed from the `ConstraintCollection`.

 The [System.Data.DataTable.Columns](https://learn.microsoft.com/search/?terms=System.Data.DataTable.Columns) property holds a [System.Data.DataColumnCollection](https://learn.microsoft.com/search/?terms=System.Data.DataColumnCollection) instance. The `DataColumnCollection` class exposes a [System.Data.DataColumnCollection.CollectionChanged](https://learn.microsoft.com/search/?terms=System.Data.DataColumnCollection.CollectionChanged) event. This event fires when a `DataColumn` is added, modified, or removed from the `DataColumnCollection`. Modifications that cause the event to fire include changes to the name, type, expression or ordinal position of a column.

 The [System.Data.DataSet.Tables](https://learn.microsoft.com/search/?terms=System.Data.DataSet.Tables) property of a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) holds a [System.Data.DataTableCollection](https://learn.microsoft.com/search/?terms=System.Data.DataTableCollection) instance. The `DataTableCollection` class exposes both a `CollectionChanged` and a `CollectionChanging` event. These events fire when a `DataTable` is added to or removed from the `DataSet`.

 Changes to `DataRows` can also trigger events for an associated [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView). The `DataView` class exposes a [System.Data.DataView.ListChanged](https://learn.microsoft.com/search/?terms=System.Data.DataView.ListChanged) event that fires when a `DataColumn` value changes or when the composition or sort order of the view changes. The [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView) class exposes a [System.Data.DataRowView.PropertyChanged](https://learn.microsoft.com/search/?terms=System.Data.DataRowView.PropertyChanged) event that fires when an associated `DataColumn` value changes.

## Sequence of Operations

 Here is the sequence of operations that occur when a `DataRow` is added, modified, or deleted:

1. Create the proposed record and apply any changes.

2. Check constraints for non-expression columns.

3. Raise the `RowChanging` or `RowDeleting` events as applicable.

4. Set the proposed record to be the current record.

5. Update any associated indexes.

6. Raise `ListChanged` events for associated `DataView` objects and `PropertyChanged` events for associated `DataRowView` objects.

7. Evaluate all expression columns, but delay checking any constraints on these columns.

8. Raise `ListChanged` events for associated `DataView` objects and `PropertyChanged` events for associated `DataRowView` objects affected by the expression column evaluations.

9. Raise `RowChanged` or `RowDeleted` events as applicable.

10. Check constraints on expression columns.

> **Note:**
> Changes to expression columns never raise `DataTable` events. Changes to expression columns only raise `DataView` and `DataRowView` events. Expression columns can have dependencies on multiple other columns, and can be evaluated multiple times during a single `DataRow` operation. Each expression evaluation raises events, and a single `DataRow` operation can raise multiple `ListChanged` and `PropertyChanged` events when expression columns are affected, possibly including multiple events for the same expression column.

> **Warning:**
> Do not throw a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) within the `RowChanged` event handler. If a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) is thrown within the `RowChanged` event of a `DataTable`, then the `DataTable` will be corrupted.

### Example

 The following example demonstrates how to create event handlers for the `RowChanged`, `RowChanging`, `RowDeleted`, `RowDeleting`, `ColumnChanged`, `ColumnChanging`, `TableNewRow`, `TableCleared`, and `TableClearing` events. Each event handler displays output in the console window when it is fired.

 [DataWorks DataTable.Events#1 (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DataTable.Events/CS/source.cs#1)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DataTable.Events/CS/source.cs.md>)
 [DataWorks DataTable.Events#1 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DataTable.Events/VB/source.vb#1)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DataTable.Events/VB/source.vb.md>)

## See also

- [Manipulating Data in a DataTable](manipulating-data-in-a-datatable.md)
- [Handling DataAdapter Events](../handling-dataadapter-events.md)
- [Handling DataSet Events](handling-dataset-events.md)
- [ADO.NET Overview](../ado-net-overview.md)
