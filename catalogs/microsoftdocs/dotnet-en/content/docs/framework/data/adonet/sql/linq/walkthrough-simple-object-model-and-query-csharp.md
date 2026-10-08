---
title: "Walkthrough: Simple Object Model and Query (C#)"
description: Follow this walkthrough to create an entity class that models a table in a sample database. Then create a simple query to list customers in a certain location.
ms.date: "03/30/2017"
ms.assetid: 419961cc-92d6-45f5-ae8a-d485bdde3a37
---
# Walkthrough: Simple Object Model and Query (C#)

This walkthrough provides a fundamental end-to-end LINQ to SQL
 scenario with minimal complexities. You will create an entity class that models the Customers table in the sample Northwind database. You will then create a simple query to list customers who are located in London.

This walkthrough is code-oriented by design to help show LINQ to SQL
 concepts. Normally speaking, you would use the Object Relational Designer to create your object model.


> **Note:**
> Your computer might show different names or locations for some of the Visual Studio user interface elements in the following instructions. The Visual Studio edition that you have and the settings that you use determine these elements. For more information, see [Personalizing the IDE](https://learn.microsoft.com/visualstudio/ide/personalizing-the-visual-studio-ide).


This walkthrough was written by using Visual C# Development Settings.

## Prerequisites

- This walkthrough uses a dedicated folder ("c:\linqtest5") to hold files. Create this folder before you begin the walkthrough.

- This walkthrough requires the Northwind sample database. If you do not have this database on your development computer, you can download it from the Microsoft download site. For instructions, see [Downloading Sample Databases](downloading-sample-databases.md). After you have downloaded the database, copy the file to the c:\linqtest5 folder.

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

1. On the Visual Studio **File** menu, point to **New**, and then click **Project**.

2. In the **Project types** pane of the **New Project** dialog box, click **Visual C#**.

3. In the **Templates** pane, click **Console Application**.

4. In the **Name** box, type **LinqConsoleApp**.

5. In the **Location** box, verify where you want to store your project files.

6. Click **OK**.

## Adding LINQ References and Directives

This walkthrough uses assemblies that might not be installed by default in your project. If System.Data.Linq is not listed as a reference in your project (expand the **References** node in **Solution Explorer**), add it, as explained in the following steps.

### To add System.Data.Linq

1. In **Solution Explorer**, right-click **References**, and then click **Add Reference**.

2. In the **Add Reference** dialog box, click **.NET**, click the System.Data.Linq assembly, and then click **OK**.

     The assembly is added to the project.

3. Add the following directives at the top of **Program.cs**:

     [DLinqWalk1CS#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1CS/cs/Program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1CS/cs/Program.cs.md)

## Mapping a Class to a Database Table

In this step, you create a class and map it to a database table. Such a class is termed an *entity class*. Note that the mapping is accomplished by just adding the [System.Data.Linq.Mapping.TableAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.TableAttribute) attribute. The [System.Data.Linq.Mapping.TableAttribute.Name](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.TableAttribute.Name) property specifies the name of the table in the database.

### To create an entity class and map it to a database table

- Type or paste the following code into Program.cs immediately above the `Program` class declaration:

     [DLinqWalk1CS#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1CS/cs/Program.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1CS/cs/Program.cs.md)

## Designating Properties on the Class to Represent Database Columns

In this step, you accomplish several tasks.

- You use the [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute) attribute to designate `CustomerID` and `City` properties on the entity class as representing columns in the database table.

- You designate the `CustomerID` property as representing a primary key column in the database.

- You designate `_CustomerID` and `_City` fields for private storage. LINQ to SQL
 can then store and retrieve values directly, instead of using public accessors that might include business logic.

### To represent characteristics of two database columns

- Type or paste the following code into Program.cs inside the curly braces for the `Customer` class.

     [DLinqWalk1CS#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1CS/cs/Program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1CS/cs/Program.cs.md)

## Specifying the Connection to the Northwind Database

In this step you use a [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) object to establish a connection between your code-based data structures and the database itself. The [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) is the main channel through which you retrieve objects from the database and submit changes.

You also declare a `Table<Customer>` to act as the logical, typed table for your queries against the Customers table in the database. You will create and execute these queries in later steps.

### To specify the database connection

- Type or paste the following code into the `Main` method.

     Note that the `northwnd.mdf` file is assumed to be in the linqtest5 folder. For more information, see the Prerequisites section earlier in this walkthrough.

     [DLinqWalk1CS#4 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1CS/cs/Program.cs#4)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1CS/cs/Program.cs.md)

## Creating a Simple Query

In this step, you create a query to find which customers in the database Customers table are located in London. The query code in this step just describes the query. It does not execute it. This approach is known as *deferred execution*. For more information, see [Introduction to LINQ Queries (C#)](../../../../../csharp/linq/get-started/introduction-to-linq-queries.md).

You will also produce a log output to show the SQL commands that LINQ to SQL
 generates. This logging feature (which uses [System.Data.Linq.DataContext.Log](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.Log)) is helpful in debugging, and in determining that the commands being sent to the database accurately represent your query.

### To create a simple query

- Type or paste the following code into the `Main` method after the `Table<Customer>` declaration.

     [DLinqWalk1ACS#5 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1ACS/cs/Program.cs#5)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1ACS/cs/Program.cs.md)

## Executing the Query

In this step, you actually execute the query. The query expressions you created in the previous steps are not evaluated until the results are needed. When you begin the `foreach` iteration, a SQL command is executed against the database and objects are materialized.

### To execute the query

1. Type or paste the following code at the end of the `Main` method (after the query description).

     [DLinqWalk1ACS#6 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1ACS/cs/Program.cs#6)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqWalk1ACS/cs/Program.cs.md)

2. Press F5 to debug the application.

    > **Note:**
    > If your application generates a runtime error, see the Troubleshooting section of [Learning by Walkthroughs](learning-by-walkthroughs.md).

     The query results in the console window should appear as follows:

     `ID=AROUT, City=London`

     `ID=BSBEV, City=London`

     `ID=CONSH, City=London`

     `ID=EASTC, City=London`

     `ID=NORTS, City=London`

     `ID=SEVES, City=London`

3. Press Enter in the console window to close the application.

## Next Steps

The [Walkthrough: Querying Across Relationships (C#)](walkthrough-querying-across-relationships-csharp.md) topic continues where this walkthrough ends. The Query Across Relationships walkthrough demonstrates how LINQ to SQL
 can query across tables, similar to *joins* in a relational database.

If you want to do the Query Across Relationships walkthrough, make sure to save the solution for the walkthrough you have just completed, which is a prerequisite.

## See also

- [Learning by Walkthroughs](learning-by-walkthroughs.md)
