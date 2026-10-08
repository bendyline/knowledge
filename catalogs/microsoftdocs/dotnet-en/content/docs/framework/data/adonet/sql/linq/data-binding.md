---
description: "Learn more about: Data Binding"
title: "Data Binding"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: cbec8b02-a1e8-4ae8-a83b-bb5190413ac5
---

# Data Binding

LINQ to SQL
 supports binding to common controls, such as grid controls. Specifically, LINQ to SQL
 defines the basic patterns for binding to a data grid and handling master-detail binding, both with regard to display and updating.

## Underlying Principle

LINQ to SQL
 translates LINQ queries to SQL for execution on a database. The results are strongly typed `IEnumerable`. Because these objects are ordinary common language runtime (CLR) objects, ordinary object data binding can be used to display the results. On the other hand, change operations (inserts, updates, and deletes) require additional steps.

## Operation

Implicitly binding to Windows Forms controls is accomplished by implementing [System.ComponentModel.IListSource](https://learn.microsoft.com/search/?terms=System.ComponentModel.IListSource). Data sources generic [System.Data.Linq.Table`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601) (`Table<T>` in C# or `Table(Of T)` in Visual Basic) and generic `DataQuery` have been updated to implement [System.ComponentModel.IListSource](https://learn.microsoft.com/search/?terms=System.ComponentModel.IListSource). User interface (UI) data-binding engines (Windows Forms and Windows Presentation Foundation) both test whether their data source implements [System.ComponentModel.IListSource](https://learn.microsoft.com/search/?terms=System.ComponentModel.IListSource). Therefore, writing a direct affectation of a query to a data source of a control implicitly calls LINQ to SQL
 collection generation, as in the following example:

[DLinqDataBinding#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqDataBinding/cs/Program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqDataBinding/cs/Program.cs.md)
[DLinqDataBinding#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqDataBinding/vb/Module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqDataBinding/vb/Module1.vb.md)

The same occurs with Windows Presentation Foundation:

[DLinqDataBinding#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqDataBinding/cs/Program.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqDataBinding/cs/Program.cs.md)
[DLinqDataBinding#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqDataBinding/vb/Module1.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqDataBinding/vb/Module1.vb.md)

Collection generations are implemented by generic [System.Data.Linq.Table`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601) and generic `DataQuery` in [System.ComponentModel.IListSource.GetList*](https://learn.microsoft.com/search/?terms=System.ComponentModel.IListSource.GetList*).

## IListSource Implementation

LINQ to SQL
 implements [System.ComponentModel.IListSource](https://learn.microsoft.com/search/?terms=System.ComponentModel.IListSource) in two locations:

- The data source is a [System.Data.Linq.Table`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601): LINQ to SQL
 browses the table to fill a `DataBindingList` collection that keeps a reference on the table.

- The data source is an [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601). There are two scenarios:

  - If LINQ to SQL
 finds the underlying [System.Data.Linq.Table`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601) from the [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601), the source allows for edition and the situation is the same as in the first bullet point.

  - If LINQ to SQL
 cannot find the underlying [System.Data.Linq.Table`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601), the source does not allow for edition (for example, `groupby`). LINQ to SQL
 browses the query to fill a generic `SortableBindingList`, which is a simple [System.ComponentModel.BindingList`1](https://learn.microsoft.com/search/?terms=System.ComponentModel.BindingList%601) that implements the sorting feature for T entities for a given property.

## Specialized Collections

For many features described earlier in this document, [System.ComponentModel.BindingList`1](https://learn.microsoft.com/search/?terms=System.ComponentModel.BindingList%601) has been specialized to some different classes. These classes are generic `SortableBindingList` and generic `DataBindingList`. Both are declared as internal.

### Generic SortableBindingList

This class inherits from [System.ComponentModel.BindingList`1](https://learn.microsoft.com/search/?terms=System.ComponentModel.BindingList%601), and is a sortable version of [System.ComponentModel.BindingList`1](https://learn.microsoft.com/search/?terms=System.ComponentModel.BindingList%601). Sorting is an in-memory solution and never contacts the database itself. [System.ComponentModel.BindingList`1](https://learn.microsoft.com/search/?terms=System.ComponentModel.BindingList%601) implements [System.ComponentModel.IBindingList](https://learn.microsoft.com/search/?terms=System.ComponentModel.IBindingList) but does not support sorting by default. However, [System.ComponentModel.BindingList`1](https://learn.microsoft.com/search/?terms=System.ComponentModel.BindingList%601) implements [System.ComponentModel.IBindingList](https://learn.microsoft.com/search/?terms=System.ComponentModel.IBindingList) with virtual *core* methods. You can easily override these methods. Generic `SortableBindingList` overrides [System.ComponentModel.BindingList`1.SupportsSortingCore*](https://learn.microsoft.com/search/?terms=System.ComponentModel.BindingList%601.SupportsSortingCore*), [System.ComponentModel.BindingList`1.SortPropertyCore](https://learn.microsoft.com/search/?terms=System.ComponentModel.BindingList%601.SortPropertyCore), [System.ComponentModel.BindingList`1.SortDirectionCore](https://learn.microsoft.com/search/?terms=System.ComponentModel.BindingList%601.SortDirectionCore), and [System.ComponentModel.BindingList`1.ApplySortCore*](https://learn.microsoft.com/search/?terms=System.ComponentModel.BindingList%601.ApplySortCore*). `ApplySortCore` is called by [System.ComponentModel.IBindingList.ApplySort*](https://learn.microsoft.com/search/?terms=System.ComponentModel.IBindingList.ApplySort*) and sorts the list of T items for a given property.

An exception is raised if the property does not belong to T.

To achieve sorting, LINQ to SQL
 creates a generic `SortableBindingList.PropertyComparer` class that inherits from generic [System.Collections.Generic.Comparer`1.System%23Collections%23IComparer%23Compare*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Comparer%601.System%2523Collections%2523IComparer%2523Compare*) and implements a default comparer for a given type T, a `PropertyDescriptor`, and a direction. This class dynamically creates a `Comparer` of T where T is the `PropertyType` of the `PropertyDescriptor`. Then, the default comparer is retrieved from the static generic `Comparer`. A default instance is obtained by using reflection.

Generic `SortableBindingList` is also the base class for `DataBindingList`. Generic `SortableBindingList` offers two virtual methods for suspending or resuming items add/remove tracking. Those two methods can be used for base features such as sorting, but will really be implemented by upper classes like generic `DataBindingList`.

### Generic DataBindingList

This class inherits from generic `SortableBindingLIst`. Generic `DataBindingList` keeps a reference on the underlying generic `Table` of the generic `IQueryable` used for the initial filling of the collection. Generic `DatabindingList` adds tracking for item add/remove to the collection by overriding `InsertItem`() and `RemoveItem`(). It also implements the abstract suspend/resume tracking feature to make tracking conditional. This feature makes generic `DataBindingList` take advantage of all the polymorphic usage of the tracking feature of the parent classes.

## Binding to EntitySets

Binding to `EntitySet` is a special case because `EntitySet` is already a collection that implements [System.ComponentModel.IBindingList](https://learn.microsoft.com/search/?terms=System.ComponentModel.IBindingList). LINQ to SQL
 adds sorting and canceling ([System.ComponentModel.ICancelAddNew](https://learn.microsoft.com/search/?terms=System.ComponentModel.ICancelAddNew)) support. An `EntitySet` class uses an internal list to store entities. This list is a low-level collection based on a generic array, the generic `ItemList` class.

### Adding a Sorting Feature

Arrays offer a sort method (`Array.Sort()`) that you can be used with a `Comparer` of T. LINQ to SQL
 uses the generic `SortableBindingList.PropertyComparer` class described earlier in this topic to obtain this `Comparer` for the property and the direction to be sorted on. An `ApplySort` method is added to generic `ItemList` to call this feature.

On the `EntitySet` side, you now have to declare sorting support:

- [System.ComponentModel.IBindingList.SupportsSorting*](https://learn.microsoft.com/search/?terms=System.ComponentModel.IBindingList.SupportsSorting*) returns `true`.

- [System.ComponentModel.IBindingList.ApplySort*](https://learn.microsoft.com/search/?terms=System.ComponentModel.IBindingList.ApplySort*) calls `entities.ApplySort()` and then `OnListChanged()`.

- [System.ComponentModel.IBindingList.SortDirection](https://learn.microsoft.com/search/?terms=System.ComponentModel.IBindingList.SortDirection) and [System.ComponentModel.IBindingList.SortProperty](https://learn.microsoft.com/search/?terms=System.ComponentModel.IBindingList.SortProperty) properties expose the current sorting definition, which is stored in local members.

When you use a System.Windows.Forms.BindingSource and bind an EntitySet\<TEntity> to the System.Windows.Forms.BindingSource.DataSource, you must call EntitySet\<TEntity>.GetNewBindingList to update BindingSource.List.

If you use a System.Windows.Forms.BindingSource and set the BindingSource.DataMember property and set BindingSource.DataSource to a class that has a property named in the BindingSource.DataMember that exposes the EntitySet\<TEntity>, you don’t have to call EntitySet\<TEntity>.GetNewBindingList to update the BindingSource.List but you lose Sorting capability.

## Caching

LINQ to SQL
 queries implement [System.ComponentModel.IListSource.GetList*](https://learn.microsoft.com/search/?terms=System.ComponentModel.IListSource.GetList*). When the Windows Forms BindingSource class meets this interface, it calls GetList() threes time for a single connection. To work around this situation, LINQ to SQL
 implements a cache per instance to store and always return the same generated collection.

## Cancellation

[System.ComponentModel.IBindingList](https://learn.microsoft.com/search/?terms=System.ComponentModel.IBindingList) defines an [System.ComponentModel.IBindingList.AddNew*](https://learn.microsoft.com/search/?terms=System.ComponentModel.IBindingList.AddNew*) method that is used by controls to create a new item from a bound collection. The `DataGridView` control shows this feature very well when the last visible row contains a star in its header. The star shows you that you can add a new item.

In addition to this feature, a collection can also implement [System.ComponentModel.ICancelAddNew](https://learn.microsoft.com/search/?terms=System.ComponentModel.ICancelAddNew). This feature allows for the controls to cancel or validate that the new edited item has been validated or not.

[System.ComponentModel.ICancelAddNew](https://learn.microsoft.com/search/?terms=System.ComponentModel.ICancelAddNew) is implemented in all LINQ to SQL
 databound collections (generic `SortableBindingList` and generic `EntitySet`). In both implementations the code performs as follows:

- Lets items be inserted and then removed from the collection.

- Does not track changes as long as the UI does not commit the edition.

- Does not track changes as long as the edition is canceled ([System.ComponentModel.ICancelAddNew.CancelNew*](https://learn.microsoft.com/search/?terms=System.ComponentModel.ICancelAddNew.CancelNew*)).

- Allows tracking when the edition is committed ([System.ComponentModel.ICancelAddNew.EndNew*](https://learn.microsoft.com/search/?terms=System.ComponentModel.ICancelAddNew.EndNew*)).

- Lets the collection behave normally if the new item does not come from [System.ComponentModel.IBindingList.AddNew*](https://learn.microsoft.com/search/?terms=System.ComponentModel.IBindingList.AddNew*).

## Troubleshooting

This section calls out several items that might help troubleshoot your LINQ to SQL
 data binding applications.

- You must use properties; using only fields is not sufficient. Windows Forms require this usage.

- By default, `image`, `varbinary`, and `timestamp` database types map to byte array. Because `ToString()` is not supported in this scenario, these objects cannot be displayed.

- A class member mapped to a primary key has a setter, but LINQ to SQL
 does not support object identity change. Therefore, the primary/unique key that is used in mapping cannot be updated in the database. A change in the grid causes an exception when you call [System.Data.Linq.DataContext.SubmitChanges*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.SubmitChanges*).

- If an entity is bound in two separate grids (for example, one master and another detail), a `Delete` in the master grid is not propagated to the detail grid.

## See also

- [Background Information](background-information.md)
