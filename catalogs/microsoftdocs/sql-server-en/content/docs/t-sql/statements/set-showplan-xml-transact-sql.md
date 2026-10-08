---
title: "SET SHOWPLAN_XML (Transact-SQL)"
description: SET SHOWPLAN_XML returns detailed information about how the statements are going to be executed in the form of a well-defined XML document.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 01/22/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "SET SHOWPLAN_XML"
  - "SET_SHOWPLAN_XML_TSQL"
helpviewer_keywords:
  - "statements [SQL Server], estimates"
  - "SET SHOWPLAN_XML statement"
  - "execution information and estimates [SQL Server]"
  - "statements [SQL Server], information without processing"
  - "XML [SQL Server], statement execution information"
  - "SHOWPLAN_XML option"
  - "estimated execution information [SQL Server]"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# SET SHOWPLAN_XML (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 

Azure Synapse Analytics (dedicated SQL pool only)](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Causes  SQL Server 
 not to execute  Transact-SQL  statements. Instead,  SQL Server 
 returns detailed information about how the statements are going to be executed in the form of a well-defined XML document.



## Syntax

```syntaxsql
SET SHOWPLAN_XML { ON | OFF }
```

## Remarks

The setting of SET SHOWPLAN_XML is set at execute or run time and not at parse time.

When SET SHOWPLAN_XML is ON,  SQL Server 
 returns execution plan information for each statement without executing it, and  Transact-SQL  statements are not executed. After this option is set ON, execution plan information about all subsequent  Transact-SQL  statements is returned until the option is set OFF. For example, if a CREATE TABLE statement is executed while SET SHOWPLAN_XML is ON,  SQL Server 
 returns an error message from a subsequent SELECT statement involving that same table; the specified table does not exist. Therefore, subsequent references to this table fail. When SET SHOWPLAN_XML is OFF,  SQL Server 
 executes the statements without generating a report.

SET SHOWPLAN_XML is intended to return output as **nvarchar(max)** for applications such as the **sqlcmd** utility, where the XML output is subsequently used by other tools to display and process the query plan information.

> **Note:**
> The dynamic management view, `sys.dm_exec_query_plan`, returns the same information as SET SHOWPLAN XML in the **xml** data type. This information is returned from the `query_plan` column of `sys.dm_exec_query_plan`. For more information, see [sys.dm_exec_query_plan (Transact-SQL)](../../relational-databases/system-dynamic-management-objects/sys-dm-exec-query-plan-transact-sql.md).

SET SHOWPLAN_XML cannot be specified inside a stored procedure. It must be the only statement in a batch.

SET SHOWPLAN_XML returns information as a set of XML documents. Each batch after the SET SHOWPLAN_XML ON statement is reflected in the output by a single document. Each document contains the text of the statements in the batch, followed by the details of the execution steps. The document shows the estimated costs, numbers of rows, accessed indexes, and types of operators performed, join order, and more information about the execution plans.

> **Note:**
> If **Include Actual Execution Plan** is selected in  SQL Server Management Studio 
, this SET option does not produce XML Showplan output. Clear the **Include Actual Execution Plan** button before using this SET option.

Estimated execution plans through SSMS and [SET SHOWPLAN_XML](set-showplan-xml-transact-sql.md) are available for dedicated SQL pools (formerly SQL DW) and dedicated SQL pools in Azure Synapse Analytics. To retrieve an actual execution plan for dedicated SQL pools (formerly SQL DW) and dedicated SQL pools in Azure Synapse Analytics, there are different commands. For more information, see [Monitor your Azure Synapse Analytics dedicated SQL pool workload using DMVs](https://learn.microsoft.com/azure/synapse-analytics/sql-data-warehouse/sql-data-warehouse-manage-monitor#monitor-query-execution).

### Location of SHOWPLAN output

The document containing the XML schema for the XML output by SET SHOWPLAN_XML is copied during setup to a local directory on the computer on which Microsoft  SQL Server 
 is installed. The document can be found on the drive containing the  SQL Server 
 installation files, at a path similar to the following:

- `\Microsoft SQL Server\130\Tools\Binn\schemas\sqlserver\2004\07\showplan\showplanxml.xsd`

In the preceding path, the node `130\` is used by SQL Server 2016. The number 130 is derived from the first node of the value returned by `SELECT @@VERSION`, which is 13. For SQL Server 2017 the path would use `140\`, because the first node of its `@@VERSION` value is 14. SQL Server 2019 the first value from `@@VERSION` is 15. SQL Server 2022 the first value from `@@VERSION` is 16.

The Showplan Schema can also be found at [Microsoft SQL Server XML Schemas](https://schemas.microsoft.com/sqlserver/).

## Permissions

In order to use SET SHOWPLAN_XML, you must have sufficient permissions to execute the statements on which SET SHOWPLAN_XML is executed, and you must have SHOWPLAN permission for all databases containing referenced objects.

For `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `EXEC *stored_procedure*`, and `EXEC *user_defined_function*` statements, to produce a Showplan the user must:

- Have the appropriate permissions to execute the  Transact-SQL  statements.

- Have SHOWPLAN permission on all databases containing objects referenced by the  Transact-SQL  statements, such as tables, views, and so on.

For all other statements, such as DDL, `USE *database_name*`, `SET`, `DECLARE`, dynamic SQL, and so on, only the appropriate permissions to execute the  Transact-SQL  statements are needed.

## Examples

The two statements that follow use the SET SHOWPLAN_XML settings to show the way  SQL Server 
 analyzes and optimizes the use of indexes in queries.

The first query uses the Equals comparison operator (`=`) in the WHERE clause on an indexed column. The second query uses the LIKE operator in the WHERE clause. This forces  SQL Server 
 to use a clustered index scan and find the data meeting the WHERE clause condition. The values in the `EstimateRows` and the `EstimatedTotalSubtreeCost` attributes are smaller for the first indexed query, indicating that it is processed much faster and uses fewer resources than the non-indexed query.

```sql
USE AdventureWorks2022;
GO
SET SHOWPLAN_XML ON;
GO
-- First query.
SELECT BusinessEntityID
FROM HumanResources.Employee
WHERE NationalIDNumber = '509647174';
GO
-- Second query.
SELECT BusinessEntityID, JobTitle
FROM HumanResources.Employee
WHERE JobTitle LIKE 'Production%';
GO
SET SHOWPLAN_XML OFF;
```

## Related content

- [SET Statements (Transact-SQL)](set-statements-transact-sql.md)
- [Display the Estimated Execution Plan](../../relational-databases/performance/display-the-estimated-execution-plan.md)
