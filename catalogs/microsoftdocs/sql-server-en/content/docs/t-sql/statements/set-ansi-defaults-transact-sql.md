---
title: "SET ANSI_DEFAULTS (Transact-SQL)"
description: SET ANSI_DEFAULTS (Transact-SQL)
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 04/16/2020
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "SET ANSI_DEFAULTS"
  - "ANSI_DEFAULTS"
  - "SET_ANSI_DEFAULTS_TSQL"
  - "ANSI_DEFAULTS_TSQL"
helpviewer_keywords:
  - "ANSI_DEFAULTS option"
  - "SET ANSI_DEFAULTS statement"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric"
---
# SET ANSI_DEFAULTS (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Controls a group of  SQL Server 
 settings that collectively specify some ISO standard behavior.  
  
 

## Syntax

### Syntax for  SQL Server 
,  serverless SQL pool in Azure Synapse Analytics 
, Microsoft Fabric
```syntaxsql
SET ANSI_DEFAULTS { ON | OFF }
```

### Syntax for  Azure Synapse Analytics 
```syntaxsql
SET ANSI_DEFAULTS ON
```

## Remarks
ANSI_DEFAULTS is a server-side setting which can enable the behavior for all client connections. The client typically requests the setting on connection or session initialization. Users should not modify the server setting.   
To change client the behavior, users should use the client specific methods like `SQL_COPT_SS_PRESERVE_CURSORS`. For more information, see  [SQLSetConnectAttr](../../relational-databases/native-client-odbc-api/sqlsetconnectattr.md).
  
When enabled (ON), this option enables the following ISO settings:  
  


        SET ANSI_NULLS


        SET CURSOR_CLOSE_ON_COMMIT




        SET ANSI_NULL_DFLT_ON


        SET IMPLICIT_TRANSACTIONS




        SET ANSI_PADDING


        SET QUOTED_IDENTIFIER




        SET ANSI_WARNINGS





&nbsp;

Together, these ISO standard SET options define the query processing environment for the duration of the work session of the user, a running trigger, or a stored procedure. However, these SET options do not include all the options required to comply with the ISO standard.  
  
When dealing with indexes on computed columns, filtered indexes, and indexed views, four of these defaults (`ANSI_NULLS`, `ANSI_PADDING`, `ANSI_WARNINGS`, and `QUOTED_IDENTIFIER`) must be set to ON. These defaults are among seven SET options that must be assigned the required values when you are creating and changing indexes on computed columns, filtered indexes, and indexed views. The other SET options are `ARITHABORT` (ON), `CONCAT_NULL_YIELDS_NULL` (ON), and `NUMERIC_ROUNDABORT` (OFF). For more information about the required SET option settings with indexed views, filtered indexes, and indexes on computed columns, see [Considerations When You Use the SET Statements](set-statements-transact-sql.md#considerations-when-you-use-the-set-statements).  
  
The  SQL Server 
 Native Client ODBC driver and  SQL Server 
 Native Client OLE DB Provider for  SQL Server 
 automatically set ANSI_DEFAULTS to ON when connecting. The driver and Provider then set CURSOR_CLOSE_ON_COMMIT and IMPLICIT_TRANSACTIONS to OFF. The OFF settings for `CURSOR_CLOSE_ON_COMMIT` and `IMPLICIT_TRANSACTIONS` can be configured in ODBC data sources, in ODBC connection attributes, or in OLE DB connection properties that are set in the application before connecting to  SQL Server 
. The default for `ANSI_DEFAULTS` is OFF for connections from DB-Library applications.  
  
When SET ANSI_DEFAULTS is issued, QUOTED_IDENTIFIER is set at parse time, and the following options are set at execute time:  
  


        SET ANSI_NULLS


        SET ANSI_WARNINGS




        SET ANSI_NULL_DFLT_ON


        SET CURSOR_CLOSE_ON_COMMIT




        SET ANSI_PADDING


        SET IMPLICIT_TRANSACTIONS



## Permissions  
Requires membership in the **public** role.  
  
## Examples  
The following example sets ANSI_DEFAULTS to ON and uses the `DBCC USEROPTIONS` statement to display the settings that are affected.  
  
```sql  
-- SET ANSI_DEFAULTS ON.  
SET ANSI_DEFAULTS ON;  
GO  

-- Display the current settings.  
DBCC USEROPTIONS;  
GO 

-- SET ANSI_DEFAULTS OFF.  
SET ANSI_DEFAULTS OFF;  
GO  
```  
  
## Related content

- [DBCC USEROPTIONS (Transact-SQL)](../database-console-commands/dbcc-useroptions-transact-sql.md)
- [SET Statements (Transact-SQL)](set-statements-transact-sql.md)
- [SET ANSI_NULL_DFLT_ON (Transact-SQL)](set-ansi-null-dflt-on-transact-sql.md)
- [SET ANSI_NULLS (Transact-SQL)](set-ansi-nulls-transact-sql.md)
- [SET ANSI_PADDING (Transact-SQL)](set-ansi-padding-transact-sql.md)
- [SET ANSI_WARNINGS (Transact-SQL)](set-ansi-warnings-transact-sql.md)
- [SET CURSOR_CLOSE_ON_COMMIT (Transact-SQL)](set-cursor-close-on-commit-transact-sql.md)
- [SET IMPLICIT_TRANSACTIONS (Transact-SQL)](set-implicit-transactions-transact-sql.md)
- [SET QUOTED_IDENTIFIER (Transact-SQL)](set-quoted-identifier-transact-sql.md)
