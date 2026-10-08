---
description: "Learn more about: Walkthrough: Querying Across Relationships (C#)"
title: "Walkthrough: Querying Across Relationships (C#)"
ms.date: "03/30/2017"
ms.assetid: 552abeb1-18f2-4e93-a9c6-ef7b2db30c32
---
# Walkthrough: Querying Across Relationships (C#)

This walkthrough demonstrates the use of LINQ to SQL
 *associations* to represent foreign-key relationships in the database.

 
> **Note:**
> Your computer might show different names or locations for some of the Visual Studio user interface elements in the following instructions. The Visual Studio edition that you have and the settings that you use determine these elements. For more information, see [Personalizing the IDE](https://learn.microsoft.com/visualstudio/ide/personalizing-the-visual-studio-ide).


 This walkthrough was written by using Visual C# Development Settings.

## Prerequisites

 You must have completed [Walkthrough: Simple Object Model and Query (C#)](walkthrough-simple-object-model-and-query-csharp.md). This walkthrough builds on that one, including the presence of the northwnd.mdf file in c:\linqtest5.

## Overview

 This walkthrough consists of three main tasks:

- Adding an entity class to represent the Orders table in the sample Northwind database.

- Supplementing annotations to the `Customer` class to enhance the relationship between the `Customer` and `Order` classes.

- Creating and running a query to test obtaining `Order` information by using the `Customer` class.

## Mapping Relationships Across Tables

 After the `Customer` class definition, create the `Order` entity class definition that includes the following code, which indicates that `Order.Customer` relates as a foreign key to `Customer.CustomerID`.

### To add the Order entity class

- Type or paste the following code after the `Customer` class:

     [DLinqWalk2CS#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqWalk2CS/cs/Program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqWalk2CS/cs/Program.cs.md)

## Annotating the Customer Class

 In this step, you annotate the `Customer` class to indicate its relationship to the `Order` class. (This addition is not strictly necessary, because defining the relationship in either direction is sufficient to create the link. But adding this annotation does enable you to easily navigate objects in either direction.)

### To annotate the Customer class

- Type or paste the following code into the `Customer` class:

     [DLinqWalk2CS#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqWalk2CS/cs/Program.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqWalk2CS/cs/Program.cs.md)

## Creating and Running a Query Across the Customer-Order Relationship

 You can now access `Order` objects directly from the `Customer` objects, or in the opposite order. You do not need an explicit *join* between customers and orders.

### To access Order objects by using Customer objects

1. Modify the `Main` method by typing or pasting the following code into the method:

     [DLinqWalk2CS#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqWalk2CS/cs/Program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqWalk2CS/cs/Program.cs.md)

2. Press F5 to debug your application.

    > **Note:**
    > You can eliminate the SQL code in the Console window by commenting out `db.Log = Console.Out;`.

3. Press Enter in the Console window to stop debugging.

## Creating a Strongly Typed View of Your Database

 It is much easier to start with a strongly typed view of your database. By strongly typing the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) object, you do not need calls to [System.Data.Linq.DataContext.GetTable*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.GetTable*). You can use strongly typed tables in all your queries when you use the strongly typed [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) object.

 In the following steps, you will create `Customers` as a strongly typed table that maps to the Customers table in the database.

### To strongly type the DataContext object

1. Add the following code above the `Customer` class declaration.

     [DLinqWalk2CS#4 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqWalk2CS/cs/Program.cs#4)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqWalk2CS/cs/Program.cs.md)

2. Modify the `Main` method to use the strongly typed [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) as follows:

     [DLinqWalk2CS#5 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqWalk2CS/cs/Program.cs#5)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqWalk2CS/cs/Program.cs.md)

3. Press F5 to debug your application.

     The Console window output is:

     `ID=WHITC`

4. Press Enter in the console window to stop debugging.

## Next Steps

 The next walkthrough ([Walkthrough: Manipulating Data (C#)](walkthrough-manipulating-data-csharp.md)) demonstrates how to manipulate data. That walkthrough does not require that you save the two walkthroughs in this series that you have already completed.

## See also

- [Learning by Walkthroughs](learning-by-walkthroughs.md)
