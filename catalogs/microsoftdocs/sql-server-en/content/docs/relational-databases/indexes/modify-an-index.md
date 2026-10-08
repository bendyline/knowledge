---
title: "Modify an Index"
description: Modify an Index
author: rwestMSFT
ms.author: randolphwest
ms.date: "02/17/2017"
ms.service: sql
ms.subservice: table-view-index
ms.topic: how-to
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "indexes [SQL Server], modifying"
  - "modifying indexes"
  - "index changes [SQL Server]"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Modify an Index

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  This topic describes how to modify an index in  SQL Server 
 by using  SQL Server Management Studio 
 or  Transact-SQL .  
  
> **Important:**  
>  Indexes created as the result of a PRIMARY KEY or UNIQUE constraint cannot be modified by using this method. Instead, the constraint must be modified.  

##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
  
#### To modify an index  
  
1.  In Object Explorer, connect to an instance of the  SQL Server Database Engine 
 and then expand that instance.  
  
2.  Expand **Databases**, expand the database in which the table belongs, and then expand **Tables**.  
  
3.  Expand the table in which the index belongs and then expand **Indexes**.  
  
4.  Right-click the index that you want to modify and then click **Properties**.  
  
5.  In the **Index Properties** dialog box, make the desired changes. For example, you can add or remove a column from the index key, or change the setting of an index option.  
  
#### To modify index columns  
  
1.  To add, remove, or change the position of an index column, select the **General** page from the **Index Properties** dialog box.  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
  
#### To modify an index  
  
The following example drops and re-creates an existing index on the `ProductID` column of the `Production.WorkOrder` table in the AdventureWorks database by using the `DROP_EXISTING` option. The options `FILLFACTOR` and `PAD_INDEX` are also set.  
  
[language="sql" source="codesnippet/tsql/modify-an-index_1.sql"::: (complete source file; reference: codesnippet/tsql/modify-an-index_1.sql)](../../../_code/docs/relational-databases/indexes/codesnippet/tsql/modify-an-index_1.sql.md)
  
The following example uses ALTER INDEX to set several options on the index `AK_SalesOrderHeader_SalesOrderNumber`.  
  
[language="sql" source="codesnippet/tsql/modify-an-index_2.sql"::: (complete source file; reference: codesnippet/tsql/modify-an-index_2.sql)](../../../_code/docs/relational-databases/indexes/codesnippet/tsql/modify-an-index_2.sql.md)
  
#### To modify index columns  
  
1.  To add, remove, or change the position of an index column, you must drop and recreate the index.  
  
## Related content

- [CREATE INDEX (Transact-SQL)](../../t-sql/statements/create-index-transact-sql.md)
- [ALTER INDEX (Transact-SQL)](../../t-sql/statements/alter-index-transact-sql.md)
- [INDEXPROPERTY (Transact-SQL)](../../t-sql/functions/indexproperty-transact-sql.md)
- [sys.indexes (Transact-SQL)](../system-catalog-views/sys-indexes-transact-sql.md)
- [sys.index_columns (Transact-SQL)](../system-catalog-views/sys-index-columns-transact-sql.md)
- [Set Index Options](set-index-options.md)
- [Rename Indexes](rename-indexes.md)
