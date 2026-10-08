---
title: "Queries"
description: "Queries"
author: VanMSFT
ms.author: vanto
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# Queries


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Data Manipulation Language (DML) is a vocabulary used to retrieve and work with data in  SQL Server 
 and SQL Database. Most also work in  Azure Synapse Analytics  (review each individual statement for details). Use these statements to add, modify, query, or remove data from a  SQL Server 
 database.  
  
## In This Section  
 The following table lists the DML statements that  SQL Server 
 uses.  



        [BULK INSERT &#40;Transact-SQL&#41;](../../t-sql/statements/bulk-insert-transact-sql.md)


        [SELECT &#40;Transact-SQL&#41;](../../t-sql/queries/select-transact-sql.md)




        [DELETE &#40;Transact-SQL&#41;](../../t-sql/statements/delete-transact-sql.md)


        [UPDATE &#40;Transact-SQL&#41;](../../t-sql/queries/update-transact-sql.md)




        [INSERT &#40;Transact-SQL&#41;](../../t-sql/statements/insert-transact-sql.md)


        [UPDATETEXT &#40;Transact-SQL&#41;](../../t-sql/queries/updatetext-transact-sql.md)




        [MERGE &#40;Transact-SQL&#41;](../../t-sql/statements/merge-transact-sql.md)


        [WRITETEXT &#40;Transact-SQL&#41;](../../t-sql/queries/writetext-transact-sql.md)




        [READTEXT &#40;Transact-SQL&#41;](../../t-sql/queries/readtext-transact-sql.md)





&nbsp;

 The following table lists the clauses that are used in multiple DML statements or clauses.  
  
| Clause | Can be used in these statements |
| --- | --- |
| [FROM (Transact-SQL)](from-transact-sql.md) | DELETE, SELECT, UPDATE |
| [Hints (Transact-SQL)](hints-transact-sql.md) | DELETE, INSERT, SELECT, UPDATE |
| [OPTION Clause (Transact-SQL)](option-clause-transact-sql.md) | DELETE, SELECT, UPDATE |
| [OUTPUT Clause (Transact-SQL)](output-clause-transact-sql.md) | DELETE, INSERT, MERGE, UPDATE |
| [Search Condition (Transact-SQL)](search-condition-transact-sql.md) | DELETE, MERGE, SELECT, UPDATE |
| [Table Value Constructor (Transact-SQL)](table-value-constructor-transact-sql.md) | FROM, INSERT, MERGE |
| [TOP (Transact-SQL)](top-transact-sql.md) | DELETE, INSERT, MERGE, SELECT, UPDATE |
| [WHERE (Transact-SQL)](where-transact-sql.md) | DELETE, SELECT, UPDATE, MATCH |
| [WITH common_table_expression (Transact-SQL)](with-common-table-expression-transact-sql.md) | DELETE, INSERT, MERGE, SELECT, UPDATE |
| &nbsp; | &nbsp; |
