---
description: "Learn more about: How to: Filter Query Results by Using LINQ (Visual Basic)"
title: "How to: Filter Query Results by Using LINQ"
ms.date: 07/20/2015
helpviewer_keywords:
  - "filtering [Visual Basic]"
  - "filtering data [LINQ in Visual Basic]"
  - "filtering [LINQ in Visual Basic]"
  - "queries [LINQ in Visual Basic], filtering results"
  - "querying databases [LINQ]"
  - "queries [LINQ in Visual Basic], how-to topics"
  - "query samples [Visual Basic]"
  - "filtering data [Visual Basic]"
ms.assetid: ef103092-9bed-4134-97f4-2db696e83c12
---
# How to: Filter Query Results by Using LINQ (Visual Basic)

Language-Integrated Query (LINQ) makes it easy to access database information and execute queries.

The following example shows how to create a new application that performs queries against a SQL Server database and filters the results by a particular value by using the `Where` clause. For more information, see [Where Clause](../../../language-reference/queries/where-clause.md).

The examples in this article use the Northwind sample database. To obtain the database, see [Downloading Sample Databases](../../../../framework/data/adonet/sql/linq/downloading-sample-databases.md).


> **Note:**
> Your computer might show different names or locations for some of the Visual Studio user interface elements in the following instructions. The Visual Studio edition that you have and the settings that you use determine these elements. For more information, see [Personalizing the IDE](https://learn.microsoft.com/visualstudio/ide/personalizing-the-visual-studio-ide).


## To create a connection to a database

1. In Visual Studio, open **Server Explorer**/**Database Explorer** by clicking **Server Explorer**/**Database Explorer** on the **View** menu.

2. Right-click **Data Connections** in **Server Explorer**/**Database Explorer** and then click **Add Connection**.

3. Specify a valid connection to the Northwind sample database.

## To add a project that contains a LINQ to SQL file

1. In Visual Studio, on the **File** menu, point to **New** and then click **Project**. Select Visual Basic **Windows Forms Application** as the project type.

2. On the **Project** menu, click **Add New Item**. Select the **LINQ to SQL Classes** item template.

3. Name the file `northwind.dbml`. Click **Add**. The Object Relational Designer (O/R Designer) opens for the northwind.dbml file.

## To add tables to query to the O/R Designer

1. In **Server Explorer**/**Database Explorer**, expand the connection to the Northwind database. Expand the **Tables** folder.

     If you have closed the O/R Designer, you can reopen it by double-clicking the northwind.dbml file that you added earlier.

2. Click the Customers table and drag it to the left pane of the designer. Click the Orders table and drag it to the left pane of the designer.

     The designer creates new `Customer` and `Order` objects for your project. Notice that the designer automatically detects relationships between the tables and creates child properties for related objects. For example, IntelliSense will show that the `Customer` object has an `Orders` property for all orders related to that customer.

3. Save your changes and close the designer.

4. Save your project.

## To add code to query the database and display the results

1. From the **Toolbox**, drag a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) control onto the default Windows Form for your project, Form1.

2. Double-click Form1 to add code to the `Load` event of the form.

3. When you added tables to the O/R Designer, the designer added a [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) object for your project. This object contains the code that you must have to access those tables, in addition to individual objects and collections for each table. The [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) object for your project is named based on the name of your .dbml file. For this project, the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) object is named `northwindDataContext`.

    You can create an instance of the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) in your code and query the tables specified by the O/R Designer.

    Add the following code to the `Load` event to query the tables that are exposed as properties of your data context. The query filters the results and returns only customers that are located in `London`.

    [VbLINQToSQLHowTos#11 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbLINQtoSQLHowTos/VB/Form5.vb#11)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbLINQtoSQLHowTos/VB/Form5.vb.md)

4. Press F5 to run your project and view the results.

5. Following are some other filters that you can try.

    [VbLINQToSQLHowTos#12 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbLINQtoSQLHowTos/VB/Form5.vb#12)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbLINQtoSQLHowTos/VB/Form5.vb.md)

## See also

- [LINQ](index.md)
- [Queries](../../../language-reference/queries/index.md)
- [LINQ to SQL](../../../../framework/data/adonet/sql/linq/index.md)
- [DataContext Methods (O/R Designer)](https://learn.microsoft.com/visualstudio/data-tools/datacontext-methods-o-r-designer)
