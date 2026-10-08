---
description: "Learn how to bind a DataView object to a Windows Forms DataGridView control, which provides a powerful and flexible way to display data in a tabular format."
title: "How to: Bind a DataView Object to a Windows Forms DataGridView Control"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
---
# How to: Bind a DataView Object to a Windows Forms DataGridView Control

The [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) control provides a powerful and flexible way to display data in a tabular format. The [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) control supports the standard Windows Forms data binding model, so it will bind to [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) and a variety of other data sources. In most situations, however, you will bind to a [System.Windows.Forms.BindingSource](https://learn.microsoft.com/search/?terms=System.Windows.Forms.BindingSource) component that will manage the details of interacting with the data source.

 For more information about the [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) control, see [DataGridView Control Overview](https://learn.microsoft.com/dotnet/desktop/winforms/controls/datagridview-control-overview-windows-forms).

## To connect a DataGridView control to a DataView

1. Implement a method to handle the details of retrieving data from a database. The following code example implements a `GetData` method that initializes a [System.Data.SqlClient.SqlDataAdapter](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlDataAdapter) component and uses it to fill a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet). Be sure to set the `connectionString` variable to a value that's appropriate for your database. You will need access to a server with the AdventureWorks SQL Server sample database installed.

     [DP DataViewWinForms Sample#LDVSample1GetData (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataViewWinForms Sample/CS/Form1.cs#ldvsample1getdata)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataViewWinForms Sample/CS/Form1.cs.md>)
     [DP DataViewWinForms Sample#LDVSample1GetData (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataViewWinForms Sample/VB/Form1.vb#ldvsample1getdata)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataViewWinForms Sample/VB/Form1.vb.md>)

2. In the [System.Windows.Forms.Form.Load](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Form.Load) event handler of your form, bind the [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) control to the [System.Windows.Forms.BindingSource](https://learn.microsoft.com/search/?terms=System.Windows.Forms.BindingSource) component and call the `GetData` method to retrieve the data from the database. The [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created from a LINQ to DataSet query over the Contact [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) and is then bound to the [System.Windows.Forms.BindingSource](https://learn.microsoft.com/search/?terms=System.Windows.Forms.BindingSource) component.

     [DP DataViewWinForms Sample#LDVSample1FormLoad (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataViewWinForms Sample/CS/Form1.cs#ldvsample1formload)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataViewWinForms Sample/CS/Form1.cs.md>)
     [DP DataViewWinForms Sample#LDVSample1FormLoad (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataViewWinForms Sample/VB/Form1.vb#ldvsample1formload)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataViewWinForms Sample/VB/Form1.vb.md>)

## See also

- [Data Binding and LINQ to DataSet](data-binding-and-linq-to-dataset.md)
