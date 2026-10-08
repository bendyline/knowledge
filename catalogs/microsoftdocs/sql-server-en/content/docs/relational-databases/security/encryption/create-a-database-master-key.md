---
title: Create a Database Master Key
description: Learn how to create a database master key in SQL Server by using Transact-SQL. This essential key encrypts other keys and certificates.
author: jaszymas
ms.author: jaszymas
ms.reviewer: vanto, randolphwest
ms.date: 07/22/2026
ms.service: sql
ms.subservice: security
ms.topic: how-to
helpviewer_keywords:
  - "database master key [SQL Server], creating"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---

# Create a database master key


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





This article describes how to create a *database master key* in  SQL Server 
 by using  Transact-SQL . The database master key encrypts other keys and certificates inside a database. Create the database master key once per database, and back it up to a secure off-site location so you can restore it if it's deleted or corrupted.

## Permissions

Requires `CONTROL` permission on the database.

## Create the database master key

The code samples in this article use the  `AdventureWorks2025` ,  `AdventureWorksDW2025` , or  `AdventureWorksLT2025`  sample database, which you can download from the [Azure Data SQL Samples Repository](https://github.com/microsoft/sql-server-samples) GitHub repository.

1. Connect to the  SQL Server 
 instance where you want to create the database master key. You can connect to an instance of  SQL Server 
 using any familiar  SQL Server 
 client tool, such as **[sqlcmd](../../../tools/sqlcmd/sqlcmd-utility.md)**, [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/), or the [MSSQL extension for Visual Studio Code](../../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md).

1. Choose a strong password for encrypting the database master key. Your password should follow the  SQL Server 
 default [password policy](../password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. Review and run the following Transact-SQL script in the context of the database where you want to create the database master key. Change the password to match your environment.

   > **Caution:**  
   > You need the password to open the database master key. Make sure you store this password safely and securely.

   ```sql
   USE AdventureWorks2025;
   GO

   CREATE MASTER KEY ENCRYPTION BY PASSWORD = '<password>';
   ```

1. Back up the newly created database master key. For more information, see [Back up a database master key](back-up-a-database-master-key.md).

## Related content

- [Back up a database master key](back-up-a-database-master-key.md)
- [Restore a database master key](restore-a-database-master-key.md)
- [CREATE MASTER KEY (Transact-SQL)](../../../t-sql/statements/create-master-key-transact-sql.md)
- [OPEN MASTER KEY (Transact-SQL)](../../../t-sql/statements/open-master-key-transact-sql.md)
