---
title: "Use table-valued parameters (Database Engine)"
description: "Learn how to use table-valued parameters."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 07/19/2024
ms.service: sql
ms.subservice: table-view-index
ms.topic: how-to
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "table-valued parameters"
  - "table-valued parameters, about table-valued parameters"
  - "parameters [SQL Server], table-valued"
  - "TVP See table-valued parameters"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Use table-valued parameters (Database Engine)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Table-valued parameters are declared by using user-defined table types. You can use table-valued parameters to send multiple rows of data to a  Transact-SQL  statement or a routine, such as a stored procedure or function, without creating a temporary table or many parameters.

Table-valued parameters are like parameter arrays in OLE DB and ODBC, but offer more flexibility and closer integration with  Transact-SQL . Table-valued parameters also have the benefit of being able to participate in set-based operations.

 Transact-SQL  passes table-valued parameters to routines by reference to avoid making a copy of the input data. You can create and execute  Transact-SQL  routines with table-valued parameters, and call them from  Transact-SQL  code, managed and native clients in any managed language.

## <a id="Benefits"></a> Benefits

A table-valued parameter is scoped to the stored procedure, function, or dynamic  Transact-SQL  text, exactly like other parameters. Similarly, a variable of table type has scope like any other local variable that is created by using a DECLARE statement. You can declare table-valued variables within dynamic  Transact-SQL  statements and pass these variables as table-valued parameters to stored procedures and functions.

Table-valued parameters offer more flexibility and in some cases better performance than temporary tables or other ways to pass a list of parameters. Table-valued parameters offer the following benefits:

- Do not acquire locks for the initial population of data from a client.
- Provide a simple programming model.
- Enable you to include complex business logic in a single routine.
- Reduce round trips to the server.
- Can have a table structure of different cardinality.
- Are strongly typed.
- Enable the client to specify sort order and unique keys.
- Are cached like a temp table when used in a stored procedure. Starting with  SQL Server 2012 (11.x) 
 and later versions, table-valued parameters are also cached for parameterized queries.

## Permissions

To create an instance of a **user-defined table type**, or call a stored procedure with a table-valued parameter, the user must have EXECUTE and REFERENCES permissions on the type, or on the schema or database containing the type.

## <a id="Restrictions"></a> Limitations

Table-valued parameters have the following restrictions:

-  SQL Server 
 does not maintain statistics on columns of table-valued parameters.
- Table-valued parameters must be passed as input READONLY parameters to  Transact-SQL  routines. You cannot perform DML operations such as UPDATE, DELETE, or INSERT on a table-valued parameter in the body of a routine.
- You cannot use a table-valued parameter as target of a `SELECT INTO` or `INSERT EXEC` statement. A table-valued parameter can be in the `FROM` clause of `SELECT INTO` or in the `INSERT EXEC` string or stored procedure.

## <a id="BulkInsert"></a> Table-valued parameters vs. BULK INSERT Operations

Using table-valued parameters is comparable to other ways of using set-based variables; however, using table-valued parameters frequently can be faster for large data sets. Compared to bulk operations that have a greater startup cost than table-valued parameters, table-valued parameters perform well for inserting less than 1,000 rows.

Table-valued parameters that are reused benefit from temporary table caching. This table caching enables better scalability than equivalent bulk insert operations. Small row-insert operations might provide a small performance benefit by using parameter lists or batched statements, instead of `BULK INSERT` operations or table-valued parameters. However, these methods are less convenient to program, and performance decreases quickly as rows increase.

Table-valued parameters perform equally well or better than an equivalent parameter array implementation.

## <a id="Example"></a> Examples

The following example uses  Transact-SQL  and shows you how to create a table-valued parameter type, declare a variable to reference it, fill the parameter list, and then pass the values to a stored procedure in the sample `AdventureWorks` database.

```sql
/* Create a table type. */
CREATE TYPE LocationTableType 
   AS TABLE
      ( LocationName VARCHAR(50)
      , CostRate INT );
GO
/* Create a procedure to receive data for the table-valued parameter. */
CREATE PROCEDURE dbo. usp_InsertProductionLocation
   @TVP LocationTableType READONLY
      AS
      SET NOCOUNT ON
      INSERT INTO AdventureWorks2022.Production.Location
         (
            Name
            , CostRate
            , Availability
            , ModifiedDate
         )
      SELECT *, 0, GETDATE()
      FROM @TVP;
GO
/* Declare a variable that references the type. */
DECLARE @LocationTVP AS LocationTableType;
/* Add data to the table variable. */
INSERT INTO @LocationTVP (LocationName, CostRate)
   SELECT Name, 0.00
   FROM AdventureWorks2022.Person.StateProvince;
  
/* Pass the table variable data to a stored procedure. */
EXEC usp_InsertProductionLocation @LocationTVP;
```

The expected resultset is:

```output
(181 rows affected)
```

## Related content

- [CREATE TYPE (Transact-SQL)](../../t-sql/statements/create-type-transact-sql.md)
- [DECLARE @local_variable (Transact-SQL)](../../t-sql/language-elements/declare-local-variable-transact-sql.md)
- [sys.types (Transact-SQL)](../system-catalog-views/sys-types-transact-sql.md)
- [sys.parameters (Transact-SQL)](../system-catalog-views/sys-parameters-transact-sql.md)
- [sys.parameter_type_usages (Transact-SQL)](../system-catalog-views/sys-parameter-type-usages-transact-sql.md)
- [CREATE PROCEDURE (Transact-SQL)](../../t-sql/statements/create-procedure-transact-sql.md)
- [CREATE FUNCTION (Transact-SQL)](../../t-sql/statements/create-function-transact-sql.md)
