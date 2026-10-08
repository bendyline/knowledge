---
description: "Learn more about: Querying the DataRowView Collection in a DataView"
title: "Querying the DataRowView Collection in a DataView"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: b9070a12-1094-44d6-bb87-a23b50bcb0af
---
# Querying the DataRowView Collection in a DataView

The [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) exposes an enumerable collection of [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView) objects. [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView) represents a customized view of a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) and displays a specific version of that [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) in a control. Only one version of a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) can be displayed through a control, such as a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView). You can access the [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) that is exposed by the [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView) through the [System.Data.DataRowView.Row](https://learn.microsoft.com/search/?terms=System.Data.DataRowView.Row) property of the [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView). When you view values by using a [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView), the [System.Data.DataView.RowStateFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowStateFilter) property determines which row version of the underlying [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) is exposed. For information about accessing different row versions using a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow), see [Row States and Row Versions](dataset-datatable-dataview/row-states-and-row-versions.md). Because the collection of [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView) objects exposed by the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is enumerable, you can use LINQ to DataSet to query over it.

 The following example queries the `Product` table for red-colored products and creates a table from that query. A [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created from the table and the [System.Data.DataView.RowStateFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowStateFilter) property is set to filter on deleted and modified rows. The [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is then used as a source in a LINQ query, and the [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView) objects that have been modified and deleted are bound to a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) control.

 [DP DataView Samples#QueryDataView2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#querydataview2)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#QueryDataView2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#querydataview2)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

 The following example creates a table of products from a view that is bound to a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) control. The [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is queried for red-colored products and the ordered results are bound to a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) control.

 [DP DataView Samples#QueryDataView1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#querydataview1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#QueryDataView1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#querydataview1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

## See also

- [Data Binding and LINQ to DataSet](data-binding-and-linq-to-dataset.md)
