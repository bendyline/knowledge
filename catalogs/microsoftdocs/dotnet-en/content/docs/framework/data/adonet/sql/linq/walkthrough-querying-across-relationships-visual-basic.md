---
description: "Learn more about: Walkthrough: Querying Across Relationships (Visual Basic)"
title: "Walkthrough: Querying Across Relationships (Visual Basic)"
ms.date: "03/30/2017"
dev_langs:
  - "vb"
ms.assetid: a7da43e3-769f-4e07-bcd6-552b8bde66f4
---
# Walkthrough: Querying Across Relationships (Visual Basic)

This walkthrough demonstrates the use of LINQ to SQL
 *associations* to represent foreign-key relationships in the database.

 
> **Note:**
> Your computer might show different names or locations for some of the Visual Studio user interface elements in the following instructions. The Visual Studio edition that you have and the settings that you use determine these elements. For more information, see [Personalizing the IDE](https://learn.microsoft.com/visualstudio/ide/personalizing-the-visual-studio-ide).


 This walkthrough was written by using Visual Basic Development Settings.

## Prerequisites

 You must have completed [Walkthrough: Simple Object Model and Query (Visual Basic)](walkthrough-simple-object-model-and-query-visual-basic.md). This walkthrough builds on that one, including the presence of the northwnd.mdf file in c:\linqtest.

## Overview

 This walkthrough consists of three main tasks:

- Adding an entity class to represent the Orders table in the sample Northwind database.

- Supplementing annotations to the `Customer` class to enhance the relationship between the `Customer` and `Order` classes.

- Creating and running a query to test the process of obtaining `Order` information by using the `Customer` class.

## Mapping Relationships across Tables

 After the `Customer` class definition, create the `Order` entity class definition that includes the following code, which indicates that `Orders.Customer` relates as a foreign key to `Customers.CustomerID`.

#### To add the Order entity class

- Type or paste the following code after the `Customer` class:

     [DLinqWalk2VB#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk2VB/vb/Module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk2VB/vb/Module1.vb.md)

## Annotating the Customer Class

 In this step, you annotate the `Customer` class to indicate its relationship to the `Order` class. (This addition is not strictly necessary, because defining the relationship in either direction is sufficient to create the link. But adding this annotation does enable you to easily navigate objects in either direction.)

#### To annotate the Customer class

- Type or paste the following code into the `Customer` class:

     [DLinqWalk2VB#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk2VB/vb/Module1.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk2VB/vb/Module1.vb.md)

## Creating and Running a Query across the Customer-Order Relationship

 You can now access `Order` objects directly from the `Customer` objects, or in the opposite order. You do not need an explicit *join* between customers and orders.

#### To access Order objects by using Customer objects

1. Modify the `Sub Main` method by typing or pasting the following code into the method:

     [DLinqWalk2VB#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk2VB/vb/Module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk2VB/vb/Module1.vb.md)

2. Press F5 to debug your application.

     Two names appear in the message box, and the Console window shows the generated SQL code.

3. Close the message box to stop debugging.

## Creating a Strongly Typed View of Your Database

 It is much easier to start with a strongly typed view of your database. By strongly typing the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) object, you do not need calls to [System.Data.Linq.DataContext.GetTable*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.GetTable*). You can use strongly typed tables in all your queries when you use the strongly typed [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) object.

 In the following steps, you will create `Customers` as a strongly typed table that maps to the Customers table in the database.

#### To strongly type the DataContext object

1. Add the following code above the `Customer` class declaration.

     [DLinqWalk2VB#4 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk2VB/vb/Module1.vb#4)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk2VB/vb/Module1.vb.md)

2. Modify `Sub Main` to use the strongly typed [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) as follows:

     [DLinqWalk2VB#5 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk2VB/vb/Module1.vb#5)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqWalk2VB/vb/Module1.vb.md)

3. Press F5 to debug your application.

     The Console window output is:

     `ID=WHITC`

4. Press Enter in the Console window to close the application.

5. On the **File** menu, click **Save All** if you want to save this application.

## Next Steps

 The next walkthrough ([Walkthrough: Manipulating Data (Visual Basic)](walkthrough-manipulating-data-visual-basic.md)) demonstrates how to manipulate data. That walkthrough does not require that you save the two walkthroughs in this series that you have already completed.

## See also

- [Learning by Walkthroughs](learning-by-walkthroughs.md)
