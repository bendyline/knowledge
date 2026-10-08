---
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: include
ms.custom:
  - linux-related-content
---
## Connect locally

The following steps use the [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md) to locally connect to your new  SQL Server 
 instance. [Download and install the sqlcmd utility](../../tools/sqlcmd/sqlcmd-download-install.md) for Windows, Linux and macOS.

> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. Run **`sqlcmd`** with parameters for your  SQL Server 
 name (`-S`), the user name (`-U`), and the password (`-P`). In this tutorial, you connect locally, so the server name is `localhost`. The user name is `sa` and the password is the one you provided for the `sa` account during setup.

   ```bash
   sqlcmd -S localhost -U sa -P '<password>'
   ```

   > **Note:**  
   > Newer versions of **`sqlcmd`** are secure by default. For more information about connection encryption, see [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md) for Windows, Linux and macOS. If the connection doesn't succeed, you can add the `-No` option to **`sqlcmd`** to specify that encryption is optional, not mandatory.

   You can omit the password on the command line to be prompted to enter it.

   If you later decide to connect remotely, specify the machine name or IP address for the `-S` parameter, and make sure port 1433 is open on your firewall.

1. If successful, you should get to a **`sqlcmd`** command prompt: `1>`.

1. If you get a connection failure, first attempt to diagnose the problem from the error message. Then review the [connection troubleshooting recommendations](../sql-server-linux-troubleshooting-guide.md#connection).

## Create and query data

The following sections walk you through using **`sqlcmd`** to create a new database, add data, and run a basic query.

For more information about writing Transact-SQL (T-SQL) statements and queries, see [Tutorial: Write Transact-SQL statements](../../t-sql/tutorial-writing-transact-sql-statements.md).

### Create a new database

The following steps create a new database named `TestDB`.

1. From the **`sqlcmd`** command prompt, paste the following T-SQL command to create a test database:

   ```sql
   CREATE DATABASE TestDB;
   ```

1. On the next line, write a query to return the name of all of the databases on your server:

   ```sql
   SELECT Name
   FROM sys.databases;
   ```

1. The previous two commands aren't executed immediately. You must type `GO` on a new line to execute the previous commands:

   ```sql
   GO
   ```

### Insert data

Next create a new table, `dbo.Inventory`, and insert two new rows.

1. From the **`sqlcmd`** command prompt, switch context to the new `TestDB` database:

   ```sql
   USE TestDB;
   ```

1. Create new table named `dbo.Inventory`:

   ```sql
   CREATE TABLE dbo.Inventory
   (
       id INT,
       name NVARCHAR (50),
       quantity INT,
       PRIMARY KEY (id)
   );
   ```

1. Insert data into the new table:

   ```sql
   INSERT INTO dbo.Inventory
   VALUES (1, 'banana', 150);

   INSERT INTO dbo.Inventory
   VALUES (2, 'orange', 154);
   ```

1. Type `GO` to execute the previous commands:

   ```sql
   GO
   ```

### Select data

Now, run a query to return data from the `dbo.Inventory` table.

1. From the **`sqlcmd`** command prompt, enter a query that returns rows from the `dbo.Inventory` table where the quantity is greater than 152:

   ```sql
   SELECT *
   FROM dbo.Inventory
   WHERE quantity > 152;
   ```

1. Execute the command:

   ```sql
   GO
   ```

### Exit the sqlcmd command prompt

To end your **`sqlcmd`** session, type `QUIT`:

```sql
QUIT
```

## Performance best practices

After installing  SQL Server 
 on Linux, review the best practices for configuring Linux and  SQL Server 
 to improve performance for production scenarios. For more information, see:

- [Performance best practices: Storage, kernel, CPU, and network for SQL Server on Linux](../configure/performance-best-practices-operating-system.md)
- [Performance best practices: SQL Server memory on Linux](../configure/performance-best-practices-sql-server-memory.md)

## Cross-platform data tools

In addition to **`sqlcmd`**, you can use the following cross-platform tools to manage  SQL Server 
:

| Tool | Description |
| --- | --- |
| [Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-run-first-query.md) | A cross-platform GUI code editor that runs T-SQL statements with the [MSSQL extension](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md). |
| [PowerShell](../sql-server-linux-manage-powershell-core.md) | A cross-platform automation and configuration tool based on cmdlets. |

## Connect from Windows

 SQL Server 
 tools on Windows connect to  SQL Server 
 instances on Linux in the same way they would connect to any remote  SQL Server 
 instance.

If you have a Windows machine that can connect to your Linux machine, try the same steps in this article from a Windows command-prompt running **`sqlcmd`**. You must use the target Linux machine name or IP address rather than `localhost`, and make sure that TCP port 1433 is open on the  SQL Server 
 machine. If you have any problems connecting from Windows, see [connection troubleshooting recommendations](../sql-server-linux-troubleshooting-guide.md#connection).

For other tools that run on Windows but connect to  SQL Server 
 on Linux, see:

- [Use SQL Server Management Studio on Windows to manage SQL Server on Linux](../sql-server-linux-manage-ssms.md)
- [Use PowerShell on Windows to manage SQL Server on Linux](../sql-server-linux-manage-powershell.md)
- [Use Visual Studio to create databases for SQL Server on Linux](../sql-server-linux-develop-use-ssdt.md)

## Other deployment scenarios

For other installation scenarios, see the following resources:

- [Upgrade](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade): Learn how to upgrade an existing installation of  SQL Server 
 on Linux
- [Uninstall](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#uninstall): Uninstall  SQL Server 
 on Linux
- [Unattended install](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#unattended): Learn how to script the installation without prompts
- [Offline install](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#offline): Learn how to manually download the packages for offline installation

For answers to frequently asked questions, see the [SQL Server on Linux FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-faq.yml).

## Related content

- [Migrate a SQL Server database from Windows to Linux using backup and restore](../migrate/restore-database.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](../../sql-server/sql-server-docs-contribute.md).
