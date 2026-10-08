---
description: "Learn more about: How to: Call Custom Database Functions"
title: "How to: Call Custom Database Functions"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 4354e5eb-dd45-469d-97fb-1c495705ee59
---
# How to: Call Custom Database Functions

This topic describes how to call custom functions that are defined in the database from within LINQ to Entities queries.

Database functions that are called from LINQ to Entities queries are executed in the database. Executing functions in the database can improve application performance.

The procedure below provides a high-level outline for calling a custom database function. The example that follows provides more detail about the steps in the procedure.

## To call custom functions that are defined in the database

1. Create a custom function in your database.

     For more information about creating custom functions in SQL Server, see [CREATE FUNCTION (Transact-SQL)](https://learn.microsoft.com/sql/t-sql/statements/create-function-transact-sql).

2. Declare a function in the store schema definition language (SSDL) of your .edmx file. The name of the function must be the same as the name of the function declared in the database.

     For more information, see [Function Element (SSDL)](https://learn.microsoft.com/ef/ef6/modeling/designer/advanced/edmx/ssdl-spec#function-element-ssdl).

3. Add a corresponding method to a class in your application code and apply a [System.Data.Objects.DataClasses.EdmFunctionAttribute](https://learn.microsoft.com/search/?terms=System.Data.Objects.DataClasses.EdmFunctionAttribute) to the method Note that the [System.Data.Objects.DataClasses.EdmFunctionAttribute.NamespaceName*](https://learn.microsoft.com/search/?terms=System.Data.Objects.DataClasses.EdmFunctionAttribute.NamespaceName*) and [System.Data.Objects.DataClasses.EdmFunctionAttribute.FunctionName*](https://learn.microsoft.com/search/?terms=System.Data.Objects.DataClasses.EdmFunctionAttribute.FunctionName*) parameters of the attribute are the namespace name of the conceptual model and the function name in the conceptual model respectively. Function name resolution for LINQ is case sensitive.

4. Call the method in a LINQ to Entities query.

## Example 1

The following example demonstrates how to call a custom database function from within a LINQ to Entities query. The example uses the School model. For information about the School model, see [Creating the School Sample Database](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb399731\(v=vs.100\)) and [Generating the School .edmx File](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/bb399739\(v=vs.100\)).

The following code adds the `AvgStudentGrade` function to the School sample database.

> **Note:**
> The steps for calling a custom database function are the same regardless of the database server. However, the code below is specific to creating a function in a SQL Server database. The code for creating a custom function in other database servers might differ.

[DP L2E MapToDBFunction#1 (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp l2e maptodbfunction/tsql/create_avgstudentgrade.sql#1)](<../../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp l2e maptodbfunction/tsql/create_avgstudentgrade.sql.md>)

## Example 2

Next, declare a function in the store schema definition language (SSDL) of your *.edmx* file. The following code declares the `AvgStudentGrade` function in SSDL:

[Code reference unavailable in this source snapshot: ~/samples/snippets/csharp/VS_Snippets_Data/dp l2e maptodbfunction/cs/school.edmx#2](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/framework/data/adonet/ef/language-reference/how-to-call-custom-database-functions.md)

## Example 3

Now, create a method and map it to the function declared in the SSDL. The method in the following class is mapped to the function defined in the SSDL (above) by using an [System.Data.Objects.DataClasses.EdmFunctionAttribute](https://learn.microsoft.com/search/?terms=System.Data.Objects.DataClasses.EdmFunctionAttribute). When this method is called, the corresponding function in the database is executed.

[DP L2E MapToDBFunction#3 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_Data/dp l2e maptodbfunction/cs/program.cs#3)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp l2e maptodbfunction/cs/program.cs.md>)
[DP L2E MapToDBFunction#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_Data/dp l2e maptodbfunction/vb/module1.vb#3)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp l2e maptodbfunction/vb/module1.vb.md>)

## Example 4

Finally, call the method in a LINQ to Entities query. The following code displays students' last names and average grades to the console:

[DP L2E MapToDBFunction#4 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_Data/dp l2e maptodbfunction/cs/program.cs#4)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp l2e maptodbfunction/cs/program.cs.md>)
[DP L2E MapToDBFunction#4 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_Data/dp l2e maptodbfunction/vb/module1.vb#4)](<../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/dp l2e maptodbfunction/vb/module1.vb.md>)

## See also

- [.edmx File Overview](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/cc982042\(v=vs.100\))
- [Queries in LINQ to Entities](queries-in-linq-to-entities.md)
