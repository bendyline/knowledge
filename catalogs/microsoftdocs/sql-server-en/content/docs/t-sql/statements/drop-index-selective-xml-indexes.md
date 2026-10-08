---
title: "DROP INDEX (Selective XML Indexes)"
description: DROP INDEX (Selective XML Indexes)
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "08/10/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DROP XML INDEX statement"
dev_langs:
  - "TSQL"
---
# DROP INDEX (Selective XML Indexes)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Drops an existing selective XML index or secondary selective XML index in  SQL Server 
. For more information, see [Selective XML Indexes &#40;SXI&#41;](../../relational-databases/xml/selective-xml-indexes-sxi.md).  
  
 
  
## Syntax  
  
```syntaxsql
DROP INDEX index_name ON <object>  
    [ WITH ( <drop_index_option> [ ,...n ] ) ]  
  
<object> ::=  
{ database_name.schema_name.table_or_view_name | schema_name.table_or_view_name | table_or_view_name }  
  
<drop_index_option> ::=  
{  
    MAXDOP = max_degree_of_parallelism  
    | ONLINE = { ON | OFF }  
}  
```  
  
##  <a name="Arguments"></a> Arguments  
 *index_name*  
 Is the name of the existing index to drop.  
  
 *\< object>* 
 Is the table that contains the indexed XML column. Use one of the following formats:  
  
-   `database_name.schema_name.table_name`  
  
-   `database_name..table_name`  
  
-   `schema_name.table_name`  
  
-   `table_name`  
  
 *\<drop_index_option>* 
 For information about the drop index options, see [DROP INDEX (Transact-SQL)](drop-index-transact-sql.md).  
  
## Security  
  
### Permissions  
 ALTER permission on the table or view is required to run DROP INDEX. This permission is granted by default to the sysadmin fixed server role and the db_ddladmin and db_owner fixed database roles.  
  
## Example  
 The following example shows a DROP INDEX statement.  
  
```sql  
DROP INDEX sxi_index ON tbl;  
```  
  
## Related content

- [Selective XML indexes (SXI)](../../relational-databases/xml/selective-xml-indexes-sxi.md)
- [Create, alter, and drop selective XML indexes](../../relational-databases/xml/create-alter-and-drop-selective-xml-indexes.md)
