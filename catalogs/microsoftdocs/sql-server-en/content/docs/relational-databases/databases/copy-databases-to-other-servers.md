---
title: "Copy databases to other servers"
description: Learn how to copy a SQL Server database from one computer to another for testing, to make it available to remote-branch operations, or for other reasons.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: randolphwest
ms.date: 07/19/2024
ms.service: sql
ms.subservice: backup-restore
ms.topic: concept-article
helpviewer_keywords:
  - "servers [SQL Server], copying databases between"
  - "bulk exporting [SQL Server], between servers"
  - "database copying [SQL Server]"
  - "migrating databases [SQL Server]"
  - "moving databases"
  - "copying databases"
  - "bulk importing [SQL Server], between servers"
---
# Copy databases to other servers


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Sometimes you might find it useful to copy a database from one computer to another. Reasons include testing, checking consistency, developing software, running reports, creating a mirror database, or possibly to make the database available to remote-branch operations.

There are several ways to copy a database:

- Use the Copy Database Wizard

  You can use the Copy Database Wizard to copy or move databases between servers or to upgrade a  SQL Server 
 database to a later version. For more information, see [Use the Copy Database Wizard](use-the-copy-database-wizard.md).

- Restore a database backup

  To copy an entire database, you can use the BACKUP and RESTORE  Transact-SQL  statements. Typically, restoring a full backup of a database is used to copy the database from one computer to another for various reasons. For information on using backup and restore to copy a database, see [Copy Databases with Backup and Restore](copy-databases-with-backup-and-restore.md).

  > **Note:**  
  > To set up a mirror database for database mirroring, you must restore the database onto the mirror server by using `RESTORE DATABASE <database_name> WITH NORECOVERY`. For more information, see [Prepare a Mirror Database for Mirroring (SQL Server)](../../database-engine/database-mirroring/prepare-a-mirror-database-for-mirroring-sql-server.md).

## Related content

- [Use the Copy Database Wizard](use-the-copy-database-wizard.md)
- [Restore database (General page)](../backup-restore/restore-database-general-page.md)
