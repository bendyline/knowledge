---
title: Back up a Database Master Key
description: Learn how to back up a database master key in SQL Server by using Transact-SQL. This essential key encrypts other keys and certificates.
author: jaszymas
ms.author: jaszymas
ms.reviewer: vanto, randolphwest
ms.date: 07/22/2026
ms.service: sql
ms.subservice: security
ms.topic: how-to
helpviewer_keywords:
  - "database master key [SQL Server], exporting"
---

# Back up a database master key


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to back up a *database master key* in  SQL Server 
 by using  Transact-SQL . The database master key encrypts other keys and certificates inside a database. If it's deleted or corrupted,  SQL Server 
 might be unable to decrypt those keys, and the data encrypted with them is effectively lost. For this reason, back up the database master key and store the backup in a secure off-site location.

## Limitations

You must open and decrypt the database master key before backing it up. If the service master key encrypts the database master key, you don't need to explicitly open the database master key. However, if a password is the only encryption method for the database master key, you must explicitly open it.

Back up the database master key as soon as you create it, and store the backup in a secure, off-site location.

## Permissions

Requires `CONTROL` permission on the database.

## Back up the database master key

The code samples in this article use the  `AdventureWorks2025` ,  `AdventureWorksDW2025` , or  `AdventureWorksLT2025`  sample database, which you can download from the [Azure Data SQL Samples Repository](https://github.com/microsoft/sql-server-samples) GitHub repository.

1. Connect to the  SQL Server 
 instance containing the database master key you want to back up. You can connect to an instance of  SQL Server 
 using any familiar  SQL Server 
 client tool, such as **[sqlcmd](../../../tools/sqlcmd/sqlcmd-utility.md)**, [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/), or the [MSSQL extension for Visual Studio Code](../../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md).

1. Choose a unique password for encrypting the database master key on the backup medium. Your password should follow the  SQL Server 
 default [password policy](../password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. Get a removable backup medium for storing a copy of the backed-up key.

1. Identify an NTFS directory where you create the backup of the key. This directory is where you create the file in the next step. Protect the directory with highly restrictive access control lists (ACLs).

1. Review and run the following Transact-SQL script.

   In this example:

   - The service master key doesn't encrypt the database master key, so you must specify a password when opening it.

   - You back up the database master key for  `AdventureWorks2025`  to `C:\Backups\Keys\AdventureWorks2025_master_key`. Change these settings to match your environment.

   > **Caution:**  
   > You need the password to restore a database backup. Make sure you store this password safely and securely.

   ```sql
   USE AdventureWorks2025;
   GO

   OPEN MASTER KEY DECRYPTION BY PASSWORD = '<dmk-password>';

   BACKUP MASTER KEY TO FILE = 'C:\Backups\Keys\AdventureWorks2025_master_key'
       ENCRYPTION BY PASSWORD = '<password>';
   GO
   ```

1. Copy the backed up file to the backup medium and verify the copy.

1. Store the backup in a secure, off-site location.

## Related content

- [Create a database master key](create-a-database-master-key.md)
- [Restore a database master key](restore-a-database-master-key.md)
- [OPEN MASTER KEY (Transact-SQL)](../../../t-sql/statements/open-master-key-transact-sql.md)
- [BACKUP MASTER KEY (Transact-SQL)](../../../t-sql/statements/backup-master-key-transact-sql.md)
