---
title: "READTEXT (Transact-SQL)"
description: "READTEXT (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: "10/24/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "READTEXT_TSQL"
  - "READTEXT"
helpviewer_keywords:
  - "column reading [SQL Server]"
  - "READTEXT statement"
  - "reading columns"
dev_langs:
  - "TSQL"
---
# READTEXT (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





Reads **text**, **ntext**, or **image** values from a **text**, **ntext**, or **image** column. Starts reading from a specified offset and reading the specified number of bytes.  
  
> **Important:**  
>  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use the [SUBSTRING](../functions/substring-transact-sql.md) function instead.  
  

  
## Syntax  
  
```syntaxsql
READTEXT { table.column text_ptr offset size } [ HOLDLOCK ]  
```  
  
## Arguments
_table_ **.** _column_  
Is the name of a table and column from which to read. Table and column names must fulfill the rules for [identifiers](../../relational-databases/databases/database-identifiers.md). Specifying the table and column names is required; however, specifying the database name and owner names is optional.  
  
_text\_ptr_  
Is a valid text pointer. _text\_ptr_ must be **binary(16)**.  
  
_offset_  
Is the number of bytes when the **text** or **image** data types are used. It can also be the number of bytes for characters when the **ntext** data type is used to skip before it starts to read the **text**, **image**, or **ntext** data.  
  
_size_
Is the number of bytes when the **text** or **image** data types are used. It can also be the number of bytes for characters when the **ntext** data type is used for data to read. If _size_ is 0, 4 KB of data is read.  
  
HOLDLOCK  
Causes the text value to be locked for reads until the end of the transaction. Other users can read the value, but they can't modify it.  
  
## Remarks  
Use the [TEXTPTR](../functions/text-and-image-functions-textptr-transact-sql.md) function to obtain a valid _text\_ptr_ value. TEXTPTR returns a pointer to the **text**, **ntext**, or **image** column in the specified row. TEXTPRT can also return a pointer or to the **text**, **ntext**, or **image** column in the last row that the query returns if the query returns more than one row. Because TEXTPTR returns a 16-byte binary string, we recommend declaring a local variable to hold the text pointer, and then use the variable with READTEXT. For more information about declaring a local variable, see [DECLARE @local_variable (Transact-SQL)](../language-elements/declare-local-variable-transact-sql.md).  
  
In  SQL Server 
, in-row text pointers may exist but may not be valid. For more information about the **text in row** option, see [sp_tableoption &#40;Transact-SQL&#41;](../../relational-databases/system-stored-procedures/sp-tableoption-transact-sql.md). For more information about invalidating text pointers, see [sp_invalidate_textptr &#40;Transact-SQL&#41;](../../relational-databases/system-stored-procedures/sp-invalidate-textptr-transact-sql.md).  
  
The value of the @@TEXTSIZE function supersedes the size specified for READTEXT if it's less than the specified size for READTEXT. The @@TEXTSIZE function specifies the limit on the number of data bytes returned which is set by the SET TEXTSIZE statement. For more information about how to set the session setting for TEXTSIZE, see [SET TEXTSIZE (Transact-SQL)](../statements/set-textsize-transact-sql.md).  
  
## Permissions  
READTEXT permissions default to users that have SELECT permissions on the specified table. Permissions are transferable when SELECT permissions are transferred.  
  
## Examples  
The following example reads the second through 26th characters of the `pr_info` column in the `pub_info` table.  
  
> **Note:**  
>  To run this example, you must install the [**pubs**](https://github.com/microsoft/sql-server-samples/tree/master/samples/databases) sample database.  
  
```sql
USE pubs;  
GO  
DECLARE @ptrval VARBINARY(16);  
SELECT @ptrval = TEXTPTR(pr_info)   
   FROM pub_info pr INNER JOIN publishers p  
      ON pr.pub_id = p.pub_id   
      AND p.pub_name = 'New Moon Books'  
READTEXT pub_info.pr_info @ptrval 1 25;  
GO  
```  
  
## Related content

- [@@TEXTSIZE (Transact-SQL)](../functions/textsize-transact-sql.md)
- [UPDATETEXT (Transact-SQL)](updatetext-transact-sql.md)
- [WRITETEXT (Transact-SQL)](writetext-transact-sql.md)
