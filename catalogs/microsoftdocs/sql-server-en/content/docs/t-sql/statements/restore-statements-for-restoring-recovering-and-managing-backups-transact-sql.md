---
title: Restoring, recovering, and managing backups
description: Transact-SQL RESTORE statements for restoring, recovering, and managing backups.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/30/2018"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
helpviewer_keywords:
  - "restoring files [SQL Server], RESTORE statement"
  - "RESTORE statement, about restore operations"
  - "database restores [SQL Server], RESTORE statement"
  - "restoring databases [SQL Server], RESTORE statement"
  - "database backups [SQL Server], RESTORE statement"
  - "backing up databases [SQL Server], RESTORE statement"
  - "file restores [SQL Server], RESTORE statement"
  - "transaction log backups [SQL Server], RESTORE statement"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017 || >=sql-server-linux-2017"
---
# RESTORE Statements for Restoring, Recovering, and Managing Backups (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  This section describes the RESTORE statements for backups. In addition to the main RESTORE {DATABASE | LOG} statement for restoring and recovering backups, a number of auxiliary RESTORE statements help you manage your backups and plan your restore sequences. The auxiliary RESTORE commands include: RESTORE FILELISTONLY, RESTORE HEADERONLY, RESTORE LABELONLY, RESTORE REWINDONLY, and RESTORE VERIFYONLY.  
  
> **Important:**  
>  In previous versions of SQL Server, any user could obtain information about backup sets and backup devices by using the RESTORE FILELISTONLY, RESTORE HEADERONLY, RESTORE LABELONLY, and RESTORE VERIFYONLY Transact-SQL statements. Because they reveal information about the content of the backup files, in  SQL Server 2008 (10.0.x) 
 and later versions these statements require CREATE DATABASE permission. This requirement secures your backup files and protects your backup information more fully than in previous versions. For information about this permission, see [GRANT Database Permissions (Transact-SQL)](grant-database-permissions-transact-sql.md).  
  
## In This Section  
  
| Statement | Description |
| --- | --- |
| [RESTORE (Transact-SQL)](restore-statements-transact-sql.md) | Describes the RESTORE DATABASE and RESTORE LOG Transact-SQL statements used to restore and recover a database from backups taken using the BACKUP command. RESTORE DATABASE is used for databases under all recovery models. RESTORE LOG is used only under the full and bulk-logged recovery models. RESTORE DATABASE can also be used to revert a database to a database snapshot. |
| [RESTORE Arguments (Transact-SQL)](restore-statements-arguments-transact-sql.md) | Documents the arguments described in the "Syntax" sections of the RESTORE statement and of the associated set of auxiliary statements: RESTORE FILELISTONLY, RESTORE HEADERONLY, RESTORE LABELONLY, RESTORE REWINDONLY, and RESTORE VERIFYONLY. Most of the arguments are supported by only a subset of these six statements. The support for each argument is indicated in the description of the argument. |
| [RESTORE FILELISTONLY (Transact-SQL)](restore-statements-filelistonly-transact-sql.md) | Describes the RESTORE FILELISTONLY Transact-SQL statement, which is used to return a result set containing a list of the database and log files contained in the backup set. |
| [RESTORE HEADERONLY (Transact-SQL)](restore-statements-headeronly-transact-sql.md) | Describes the RESTORE HEADERONLY Transact-SQL statement, which is used to return a result set containing all the backup header information for all backup sets on a particular backup device. |
| [RESTORE LABELONLY (Transact-SQL)](restore-statements-labelonly-transact-sql.md) | Describes the RESTORE LABELONLY Transact-SQL statement, which is used to return a result set containing information about the backup media identified by the given backup device. |
| [RESTORE REWINDONLY (Transact-SQL)](restore-statements-rewindonly-transact-sql.md) | Describes the RESTORE REWINDONLY Transact-SQL statement, which is used to rewind and close tape devices that were left open by BACKUP or RESTORE statements executed with the NOREWIND option. |
| [RESTORE VERIFYONLY (Transact-SQL)](restore-statements-verifyonly-transact-sql.md) | Describes the RESTORE VERIFYONLY Transact-SQL statement, which is used to verify the backup but does not restore it, and checks to see that the backup set is complete and the entire backup is readable; does not attempt to verify the structure of the data. |
  
## Related content

- [Back up and restore of SQL Server databases](../../relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases.md)
