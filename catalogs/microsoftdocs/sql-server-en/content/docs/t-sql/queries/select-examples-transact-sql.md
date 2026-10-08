---
title: "SELECT Examples (Transact-SQL)"
description: "Examples of the SELECT Transact-SQL statement in the Database Engine."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 02/02/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "parentheses [SQL Server]"
  - "GROUP BY clause, SELECT statement"
  - "query hints [SQL Server]"
  - "ALL keyword"
  - "ROLLUP operator"
  - "SELECT statement [SQL Server], examples"
  - "correlated subqueries, SELECT statement"
  - "SELECT INTO statement"
  - "ORDER BY clause [Transact-SQL]"
  - "GROUPING function"
  - "index hints [SQL Server]"
  - "HAVING clause, SELECT statement"
  - "DISTINCT keyword"
  - "CUBE operator"
  - "UNION operator [SQL Server]"
  - "computed sums"
  - "WHERE clause, SELECT statement"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# SELECT examples (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



This article provides examples of using the [SELECT](select-transact-sql.md) statement.

The code samples in this article use the  `AdventureWorks2025` ,  `AdventureWorksDW2025` , or  `AdventureWorksLT2025`  sample database, which you can download from the [Azure Data SQL Samples Repository](https://github.com/microsoft/sql-server-samples) GitHub repository.

## A. Use SELECT to retrieve rows and columns

The following example shows three code examples. The first code example returns all rows (no `WHERE` clause is specified) and all columns (using the `*`) from the `Product` table in the  `AdventureWorks2025`  database.

[language="sql" source="codesnippet/tsql/select-examples-transact_1.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_1.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_1.sql.md)

This example returns all rows (no `WHERE` clause is specified), and only a subset of the columns (`Name`, `ProductNumber`, `ListPrice`) from the `Product` table in the  `AdventureWorks2025`  database. Additionally, a column heading is added.

[language="sql" source="codesnippet/tsql/select-examples-transact_2.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_2.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_2.sql.md)

This example returns only the rows for `Product` that have a product line of `R` and that have days to manufacture that's less than `4`.

[language="sql" source="codesnippet/tsql/select-examples-transact_3.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_3.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_3.sql.md)

## B. Use SELECT with column headings and calculations

The following examples return all rows from the `Product` table. The first example returns total sales and the discounts for each product. In the second example, the total revenue is calculated for each product.

[language="sql" source="codesnippet/tsql/select-examples-transact_4.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_4.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_4.sql.md)

This query calculates the revenue for each product in each sales order.

[language="sql" source="codesnippet/tsql/select-examples-transact_5.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_5.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_5.sql.md)

## C. Use DISTINCT with SELECT

The following example uses `DISTINCT` to prevent the retrieval of duplicate titles.

[language="sql" source="codesnippet/tsql/select-examples-transact_6.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_6.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_6.sql.md)

## D. Create tables with SELECT INTO

The following first example creates a temporary table named `#Bicycles` in `tempdb`.

[language="sql" source="codesnippet/tsql/select-examples-transact_7.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_7.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_7.sql.md)

This second example creates the permanent table `NewProducts`.

[language="sql" source="codesnippet/tsql/select-examples-transact_8.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_8.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_8.sql.md)

## E. Use correlated subqueries

A correlated subquery is a query that depends on the outer query for its values. This query can be executed repeatedly, one time for each row that the outer query selects.

The first example shows queries that are semantically equivalent to illustrate the difference between using the `EXISTS` keyword and the `IN` keyword. Both are examples of a valid subquery that retrieves one instance of each product name for which the product model is a long sleeve logo jersey, and the `ProductModelID` numbers match between the `Product` and `ProductModel` tables.

[language="sql" source="codesnippet/tsql/select-examples-transact_9.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_9.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_9.sql.md)

The next example uses `IN` and retrieves one instance of the first name and family name of each employee for which the bonus in the `SalesPerson` table is `5000.00`, and for which the employee identification numbers match in the `Employee` and `SalesPerson` tables.

[language="sql" source="codesnippet/tsql/select-examples-transact_10.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_10.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_10.sql.md)

The previous subquery in this statement can't be evaluated independently of the outer query. It requires a value for `Employee.EmployeeID`, but this value changes as the  SQL Server Database Engine 
 examines different rows in `Employee`.

You can also use a correlated subquery in the `HAVING` clause of an outer query. This example finds the product models for which the maximum list price is more than twice the average for the model.

[language="sql" source="codesnippet/tsql/select-examples-transact_11.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_11.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_11.sql.md)

This example uses two correlated subqueries to find the names of employees who sold a particular product.

[language="sql" source="codesnippet/tsql/select-examples-transact_12.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_12.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_12.sql.md)

## F. Use GROUP BY

The following example finds the total of each sales order in the database.

[language="sql" source="codesnippet/tsql/select-examples-transact_13.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_13.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_13.sql.md)

Because of the `GROUP BY` clause, the query returns only one row containing the sum of all sales for each sales order.

## G. Use GROUP BY with multiple groups

The following example finds the average price and the sum of year-to-date sales, grouped by product ID and special offer ID.

[language="sql" source="codesnippet/tsql/select-examples-transact_14.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_14.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_14.sql.md)

## H. Use GROUP BY and WHERE

The following example puts the results into groups after retrieving only the rows with list prices greater than `$1000`.

[language="sql" source="codesnippet/tsql/select-examples-transact_15.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_15.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_15.sql.md)

## I. Use GROUP BY with an expression

The following example groups by an expression. You can group by an expression if the expression doesn't include aggregate functions.

[language="sql" source="codesnippet/tsql/select-examples-transact_16.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_16.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_16.sql.md)

## J. Use GROUP BY with ORDER BY

The following example finds the average price of each type of product and orders the results by average price.

[language="sql" source="codesnippet/tsql/select-examples-transact_17.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_17.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_17.sql.md)

## K. Use the HAVING clause

The first example that follows shows a `HAVING` clause with an aggregate function. It groups the rows in the `SalesOrderDetail` table by product ID and eliminates products whose average order quantities are five or less. The second example shows a `HAVING` clause without aggregate functions.

[language="sql" source="codesnippet/tsql/select-examples-transact_18.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_18.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_18.sql.md)

This query uses the `LIKE` clause in the `HAVING` clause.

```sql
USE AdventureWorks2025;
GO

SELECT SalesOrderID,
       CarrierTrackingNumber
FROM Sales.SalesOrderDetail
GROUP BY SalesOrderID, CarrierTrackingNumber
HAVING CarrierTrackingNumber LIKE '4BD%'
ORDER BY SalesOrderID;
```

## L. Use HAVING and GROUP BY

The following example shows using `GROUP BY`, `HAVING`, `WHERE`, and `ORDER BY` clauses in one `SELECT` statement. It produces groups and summary values but does so after eliminating the products with prices over $25 and average order quantities under 5. It also organizes the results by `ProductID`.

[language="sql" source="codesnippet/tsql/select-examples-transact_19.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_19.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_19.sql.md)

## M. Use HAVING with SUM and AVG

The following example groups the `SalesOrderDetail` table by product ID and includes only those groups of products that have orders totaling more than `$1000000.00` and whose average order quantities are less than `3`.

[language="sql" source="codesnippet/tsql/select-examples-transact_20.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_20.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_20.sql.md)

To see the products with total sales greater than `$2000000.00`, use this query:

[language="sql" source="codesnippet/tsql/select-examples-transact_21.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_21.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_21.sql.md)

If you want to make sure the calculations for each product include at least 1,500 items, use `HAVING COUNT(*) > 1500` to eliminate the products that return totals for fewer than `1500` items sold. The query looks like this:

[language="sql" source="codesnippet/tsql/select-examples-transact_22.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_22.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_22.sql.md)

## N. Use the INDEX optimizer hint

The following example shows two ways to use the `INDEX` optimizer hint. The first example shows how to force the optimizer to use a nonclustered index to retrieve rows from a table. The second example forces a table scan by using an index of 0.

[language="sql" source="codesnippet/tsql/select-examples-transact_23.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_23.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_23.sql.md)

## M. Use OPTION and the GROUP hints

The following example shows how the `OPTION (GROUP)` clause is used with a `GROUP BY` clause.

[language="sql" source="codesnippet/tsql/select-examples-transact_24.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_24.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_24.sql.md)

## O. Use the UNION query hint

The following example uses the `MERGE UNION` query hint.

[language="sql" source="codesnippet/tsql/select-examples-transact_25.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_25.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_25.sql.md)

## P. Use a UNION

In the following example, the result set includes the contents of the `ProductModelID` and `Name` columns of both the `ProductModel` and `Gloves` tables.

[language="sql" source="codesnippet/tsql/select-examples-transact_26.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_26.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_26.sql.md)

## Q. Use SELECT INTO with UNION

In the following example, the `INTO` clause in the second `SELECT` statement specifies that the table named `ProductResults` holds the final result set of the union of the designated columns of the `ProductModel` and `Gloves` tables. The `Gloves` table is created in the first `SELECT` statement.

[language="sql" source="codesnippet/tsql/select-examples-transact_27.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_27.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_27.sql.md)

## R. Use UNION of two SELECT statements with ORDER BY

The order of certain parameters used with the `UNION` clause is important. The following example shows the incorrect and correct use of `UNION` in two `SELECT` statements where you rename a column in the output.

[language="sql" source="codesnippet/tsql/select-examples-transact_28.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_28.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_28.sql.md)

## S. Use UNION of three SELECT statements to show the effects of ALL and parentheses

The following examples use `UNION` to combine the results of three tables that all have the same five rows of data. The first example uses `UNION ALL` to show the duplicated records, and returns all 15 rows. The second example uses `UNION` without `ALL` to eliminate the duplicate rows from the combined results of the three `SELECT` statements, and returns five rows.

The third example uses `ALL` with the first `UNION` and parentheses enclose the second `UNION` that isn't using `ALL`. The second `UNION` is processed first because it's in parentheses, and returns five rows because the `ALL` option isn't used and the duplicates are removed. These five rows are combined with the results of the first `SELECT` by using the `UNION ALL` keywords. This example doesn't remove the duplicates between the two sets of five rows. The final result has 10 rows.

[language="sql" source="codesnippet/tsql/select-examples-transact_29.sql"::: (complete source file; reference: codesnippet/tsql/select-examples-transact_29.sql)](../../../_code/docs/t-sql/queries/codesnippet/tsql/select-examples-transact_29.sql.md)

## Related content

- [CREATE TRIGGER (Transact-SQL)](../statements/create-trigger-transact-sql.md)
- [CREATE VIEW (Transact-SQL)](../statements/create-view-transact-sql.md)
- [DELETE (Transact-SQL)](../statements/delete-transact-sql.md)
- [EXECUTE (Transact-SQL)](../language-elements/execute-transact-sql.md)
- [Expressions (Transact-SQL)](../language-elements/expressions-transact-sql.md)
- [INSERT (Transact-SQL)](../statements/insert-transact-sql.md)
- [LIKE (Transact-SQL)](../language-elements/like-transact-sql.md)
- [Set Operators - UNION (Transact-SQL)](../language-elements/set-operators-union-transact-sql.md)
- [Set Operators - EXCEPT and INTERSECT (Transact-SQL)](../language-elements/set-operators-except-and-intersect-transact-sql.md)
- [UPDATE (Transact-SQL)](update-transact-sql.md)
- [WHERE (Transact-SQL)](where-transact-sql.md)
- [PathName (Transact-SQL)](../../relational-databases/system-functions/pathname-transact-sql.md)
- [SELECT - INTO clause (Transact-SQL)](select-into-clause-transact-sql.md)
