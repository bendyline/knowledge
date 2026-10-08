---
title: Back up the Service Master Key
description: Learn how to back up the service master key in SQL Server by using Transact-SQL. This key is the root of the encryption hierarchy.
author: jaszymas
ms.author: jaszymas
ms.reviewer: vanto, randolphwest
ms.date: 07/22/2026
ms.service: sql
ms.subservice: security
ms.topic: how-to
helpviewer_keywords:
  - "service master key [SQL Server], exporting"
---

# Back up a service master key


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to back up the *service master key* in  SQL Server 
 by using  Transact-SQL . The service master key is the root of the encryption hierarchy, and directly or indirectly protects all other keys and secrets on the server.

If it's deleted or corrupted,  SQL Server 
 might be unable to decrypt those keys, and the data encrypted with them is effectively lost. For this reason, back up the service master key and store the backup in a secure off-site location.

## Remarks

Back up the service master key as soon as  SQL Server 
 generates it, and store the backup in a secure, off-site location.

Creating this backup should be one of the first administrative actions performed on the server.

## Permissions

Requires `CONTROL SERVER` permission on the server.

## Back up the service master key

1. Connect to the  SQL Server 
 instance containing the service master key you want to back up. You can connect to an instance of  SQL Server 
 using any familiar  SQL Server 
 client tool, such as **[sqlcmd](../../../tools/sqlcmd/sqlcmd-utility.md)**, [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/), or the [MSSQL extension for Visual Studio Code](../../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md).

1. Choose a unique password for encrypting the service master key on the backup medium. Your password should follow the  SQL Server 
 default [password policy](../password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. Get a removable backup medium for storing a copy of the backed-up key.

1. Identify an NTFS directory where you create the backup of the key. This directory is where you create the file in the next step. Protect the directory with highly restrictive access control lists (ACLs).

1. Review and run the following Transact-SQL script.

   In this example, you back up the service master key to `C:\Backups\Keys\service_master_key`. Change these settings to match your environment.

   > **Caution:**  
   > You need the password to restore the service master key. Make sure you store this password safely and securely.

   ```sql
   USE master;
   GO

   BACKUP SERVICE MASTER KEY TO FILE = 'C:\Backups\Keys\service_master_key' ENCRYPTION BY PASSWORD = '<password>';
   GO
   ```

1. Copy the backed up file to the backup medium and verify the copy.

1. Store the backup in a secure, off-site location.

## Related content

- [Restore a service master key](restore-the-service-master-key.md)
- [BACKUP SERVICE MASTER KEY (Transact-SQL)](../../../t-sql/statements/backup-service-master-key-transact-sql.md)
- [Back up a database master key](back-up-a-database-master-key.md)
