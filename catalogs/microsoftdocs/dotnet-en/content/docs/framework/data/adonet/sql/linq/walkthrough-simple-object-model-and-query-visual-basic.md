---
description: "Learn more about: Walkthrough: Simple Object Model and Query (Visual Basic)"
title: "Walkthrough: Simple Object Model and Query (Visual Basic)"
ms.date: "03/30/2017"
dev_langs:
  - "vb"
ms.assetid: c878e457-f715-46e4-a136-ff14d6c86018
---
# Walkthrough: Simple Object Model and Query (Visual Basic)

This walkthrough provides a fundamental end-to-end LINQ to SQL
 scenario with minimal complexities. You will create an entity class that models the Customers table in the sample Northwind database. You will then create a simple query to list customers who are located in London.

This walkthrough is code-oriented by design to help show LINQ to SQL
 concepts. Normally speaking, you would use the Object Relational Designer to create your object model.


> **Note:**
> Your computer might show different names or locations for some of the Visual Studio user interface elements in the following instructions. The Visual Studio edition that you have and the settings that you use determine these elements. For more information, see [Personalizing the IDE](https://learn.microsoft.com/visualstudio/ide/personalizing-the-visual-studio-ide).


This walkthrough was written by using Visual Basic Development Settings.

## Prerequisites

- This walkthrough uses a dedicated folder ("c:\linqtest") to hold files. Create this folder before you begin the walkthrough.

- This walkthrough requires the Northwind sample database. If you do not have this database on your development computer, you can download it from the Microsoft download site. For instructions, see [Downloading Sample Databases](downloading-sample-databases.md). After you have downloaded the database, copy the file to the c:\linqtest folder.

## Overview

This walkthrough consists of six main tasks:

- Creating a LINQ to SQL
 solution in Visual Studio.

- Mapping a class to a database table.

- Designating properties on the class to represent database columns.

- Specifying the connection to the Northwind database.

- Creating a simple query to run against the database.

- Executing the query and observing the results.

## Creating a LINQ to SQL Solution

In this first task, you create a Visual Studio solution that contains the necessary references to build and run a LINQ to SQL
 project.

### To create a LINQ to SQL solution

1. On the **File** menu, click **New Project**.

2. In the **Project types** pane of the **New Project** dialog box, click **Visual Basic**.

3. In the **Templates** pane, click **Console Application**.

4. In the **Name** box, type **LinqConsoleApp**.

5. Click **OK**.

## Adding LINQ References and Directives

This walkthrough uses assemblies that might not be installed by default in your project. If `System.Data.Linq` is not listed as a reference in your project (click **Show All Files** in **Solution Explorer** and expand the **References** node), add it, as explained in the following steps.

### To add System.Data.Linq

1. In **Solution Explorer**, right-click **References**, and then click **Add Reference**.

2. In the **Add Reference** dialog box, click **.NET**, click the System.Data.Linq assembly, and then click **OK**.

     The assembly is added to the project.

3. Also in the **Add Reference** dialog box, click **.NET**, scroll to and click System.Windows.Forms, and then click **OK**.

     This assembly, which supports the message box in the walkthrough, is added to the project.

4. Add the following directives above `Module1`:

     [DLinqWalk1VB#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1VB/vb/Module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1VB/vb/Module1.vb.md)

## Mapping a Class to a Database Table

In this step, you create a class and map it to a database table. Such a class is termed an *entity class*. Note that the mapping is accomplished by just adding the [System.Data.Linq.Mapping.TableAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.TableAttribute) attribute. The [System.Data.Linq.Mapping.TableAttribute.Name](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.TableAttribute.Name) property specifies the name of the table in the database.

### To create an entity class and map it to a database table

- Type or paste the following code into Module1.vb immediately above `Sub Main`:

     [DLinqWalk1VB#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1VB/vb/Module1.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1VB/vb/Module1.vb.md)

## Designating Properties on the Class to Represent Database Columns

In this step, you accomplish several tasks.

- You use the [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute) attribute to designate `CustomerID` and `City` properties on the entity class as representing columns in the database table.

- You designate the `CustomerID` property as representing a primary key column in the database.

- You designate `_CustomerID` and `_City` fields for private storage. LINQ to SQL
 can then store and retrieve values directly, instead of using public accessors that might include business logic.

### To represent characteristics of two database columns

- Type or paste the following code into Module1.vb just before `End Class`:

     [DLinqWalk1VB#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1VB/vb/Module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1VB/vb/Module1.vb.md)

## Specifying the Connection to the Northwind Database

In this step you use a [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) object to establish a connection between your code-based data structures and the database itself. The [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) is the main channel through which you retrieve objects from the database and submit changes.

You also declare a `Table(Of Customer)` to act as the logical, typed table for your queries against the Customers table in the database. You will create and execute these queries in later steps.

### To specify the database connection

- Type or paste the following code into the `Sub Main` method.

     Note that the `northwnd.mdf` file is assumed to be in the linqtest folder. For more information, see the Prerequisites section earlier in this walkthrough.

     [DLinqWalk1VB#4 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1VB/vb/Module1.vb#4)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1VB/vb/Module1.vb.md)

## Creating a Simple Query

In this step, you create a query to find which customers in the database Customers table are located in London. The query code in this step just describes the query. It does not execute it. This approach is known as *deferred execution*. For more information, see [Introduction to LINQ Queries (C#)](../../../../../csharp/linq/get-started/introduction-to-linq-queries.md).

You will also produce a log output to show the SQL commands that LINQ to SQL
 generates. This logging feature (which uses [System.Data.Linq.DataContext.Log](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.Log)) is helpful in debugging, and in determining that the commands being sent to the database accurately represent your query.

### To create a simple query

- Type or paste the following code into the `Sub Main` method after the `Table(Of Customer)` declaration:

     [DLinqWalk1AVB#5 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1AVB/vb/Module1.vb#5)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1AVB/vb/Module1.vb.md)

## Executing the Query

In this step, you actually execute the query. The query expressions you created in the previous steps are not evaluated until the results are needed. When you begin the `For Each` iteration, a SQL command is executed against the database and objects are materialized.

### To execute the query

1. Type or paste the following code at the end of the `Sub Main` method (after the query description):

     [DLinqWalk1AVB#6 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1AVB/vb/Module1.vb#6)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk1AVB/vb/Module1.vb.md)

2. Press F5 to debug the application.

    > **Note:**
    > If your application generates a runtime error, see the Troubleshooting section of [Learning by Walkthroughs](learning-by-walkthroughs.md).

     The message box displays a list of six customers. The Console window displays the generated SQL code.

3. Click **OK** to dismiss the message box.

     The application closes.

4. On the **File** menu, click **Save All**.

     You will need this application if you continue with the next walkthrough.

## Next Steps

The [Walkthrough: Querying Across Relationships (Visual Basic)](walkthrough-querying-across-relationships-visual-basic.md) topic continues where this walkthrough ends. The Querying Across Relationships walkthrough demonstrates how LINQ to SQL
 can query across tables, similar to *joins* in a relational database.

If you want to do the Querying Across Relationships walkthrough, make sure to save the solution for the walkthrough you have just completed, which is a prerequisite.

## See also

- [Learning by Walkthroughs](learning-by-walkthroughs.md)
