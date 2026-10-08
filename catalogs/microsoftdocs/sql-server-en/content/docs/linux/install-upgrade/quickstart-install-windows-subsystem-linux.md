---
title: "WSL 2: Install SQL Server on Windows Subsystem for Linux"
description: This quickstart shows how to install SQL Server on Windows Subsystem for Linux (WSL 2) and then create and query a database with sqlcmd.
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: quickstart
ms.custom:
  - intro-installation
  - linux-related-content
  - build-2025
---
# Quickstart: Install SQL Server and create a database on Windows Subsystem for Linux (WSL 2)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


Use the Windows Subsystem for Linux (WSL) to run a Linux environment directly on your Windows machine, without the need for a virtual machine or dual booting. WSL provides a seamless and productive experience for developers who want to use both Windows and Linux simultaneously. For more information, see [What is the Windows Subsystem for Linux?](https://learn.microsoft.com/windows/wsl/about)

## SQL Server on WSL is for development use only

SQL Server on WSL 2 is intended for development purposes only, and is **not** supported for production workloads. Run SQL Server in WSL environments on one of the [supported platforms](../sql-server-linux-release-notes.md#supported-platforms), for the version of SQL Server you intend to run.

For any support related issues, you can [obtain support from Microsoft](https://learn.microsoft.com/troubleshoot/sql/database-engine/install/windows/support-policy-sql-server#obtain-support-from-microsoft).

## Get started with SQL Server on WSL 2

There are two ways to get started with SQL Server on WSL 2:

- Install SQL Server as a `systemd` service, which you can then manage with `systemctl` commands. Make sure that you enable `systemd` on WSL. For more information, see [How to enable systemd](https://learn.microsoft.com/windows/wsl/systemd#how-to-enable-systemd).

- Deploy SQL Server containers in WSL. For this option, you need to install a Linux container engine in WSL, such as Docker or Podman, and then deploy SQL Server containers.

## Prerequisites

Install WSL 2. Ensure you're running Windows 10 version 2004 or a later version (Build 19041 and higher), or Windows 11. To install WSL, open a PowerShell or Windows command prompt in administrator mode, and follow the instructions in the next section.

For detailed instructions, see [How to install Linux on Windows with WSL](https://learn.microsoft.com/windows/wsl/install). For information on setting up the WSL environment for development, see [Set up a WSL development environment](https://learn.microsoft.com/windows/wsl/setup/environment).

## Install SQL Server in WSL

This section describes the steps to set up a Linux distribution in WSL, and how to install SQL Server in that Linux distribution.

### Choose Linux distribution

List all the valid distributions that you can install in WSL:

```console
wsl -l -o
```

The output looks similar to the following example:

```output
The following is a list of valid distributions that can be installed.
Install using 'wsl.exe --install <Distro>'.

NAME                            FRIENDLY NAME
Ubuntu                          Ubuntu
Debian                          Debian GNU/Linux
kali-linux                      Kali Linux Rolling
Ubuntu-18.04                    Ubuntu 18.04 LTS
Ubuntu-20.04                    Ubuntu 20.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
Ubuntu-24.04                    Ubuntu 24.04 LTS
OracleLinux_7_9                 Oracle Linux 7.9
OracleLinux_8_7                 Oracle Linux 8.7
OracleLinux_9_1                 Oracle Linux 9.1
openSUSE-Leap-15.6              openSUSE Leap 15.6
SUSE-Linux-Enterprise-15-SP5    SUSE Linux Enterprise 15 SP5
SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
openSUSE-Tumbleweed             openSUSE Tumbleweed
```

For this quickstart, install Ubuntu 22.04, and then install  SQL Server 2022 (16.x) 
 into that distribution.

To install Ubuntu 22.04, run the following command. Make a note of the UNIX user account and password. In this example, use `wsluser` as the username.

```console
wsl --install -d Ubuntu-22.04
```

The output looks similar to the following example. At the end, it shows that you're logged into the Ubuntu 22.04 Bash shell.

```output
Installing: Ubuntu 22.04 LTS
Ubuntu 22.04 LTS has been installed.
Launching Ubuntu 22.04 LTS...
Installing, this may take a few minutes...
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username: wsluser
New password:
Retype new password:
passwd: password updated successfully
Installation successful!
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

Welcome to Ubuntu 22.04.5 LTS (GNU/Linux 5.15.167.4-microsoft-standard-WSL2 x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Tue Dec  3 00:32:14 IST 2024

  System load:  0.33                Processes:             32
  Usage of /:   0.1% of 1006.85GB   Users logged in:       0
  Memory usage: 2%                  IPv4 address for eth0: 10.18.123.249
  Swap usage:   0%

This message is shown once a day. To disable it please create the
/home/wsluser/.hushlogin file.
```

### Install SQL Server

After you sign in to the Ubuntu 22.04 Bash shell, follow the steps outlined in [Quickstart: Install SQL Server and create a database on Ubuntu](quickstart-install-ubuntu.md?view=sql-server-ver16&preserve-view=true&tabs=ubuntu2204#install-sql-server) to install  SQL Server 2022 (16.x) 
.

You should also [install the SQL Server command-line tools](quickstart-install-ubuntu.md?view=sql-server-ver16&preserve-view=true&tabs=ubuntu2204#install-the-sql-server-command-line-tools).

### Get IP address

You can connect to an instance of  SQL Server 
 using any familiar  SQL Server 
 client tool, such as **[sqlcmd](../../tools/sqlcmd/sqlcmd-utility.md)**, [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/), or the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md).

To find the IP address, run the `ifconfig` command:

```bash
ifconfig
```

The output looks similar to the following example:

```output
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.19.50.241  netmask 255.255.240.0  broadcast 10.19.63.255
        inet6 fe80::215:5dff:fe76:c05d  prefixlen 64  scopeid 0x20<link>
        ether 00:15:5d:76:c0:5d  txqueuelen 1000  (Ethernet)
        RX packets 2146  bytes 1452448 (1.4 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1905  bytes 345288 (345.2 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 2039  bytes 4144340 (4.1 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2039  bytes 4144340 (4.1 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

## Deploy SQL Server containers in WSL

To deploy containers in WSL, you first need to install a Linux container engine, such as Docker. For more information, see [Get started with Docker remote containers on WSL](https://learn.microsoft.com/windows/wsl/tutorials/wsl-containers). After you install the Docker engine, deploy the SQL Server container image as follows.

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" \
-e "MSSQL_PID=Developer" -e "MSSQL_AGENT_ENABLED=true" \
-p 14333:1433 --name sqlcontainerwsl --hostname sqlcontainerwsl \
-d mcr.microsoft.com/mssql/server:2022-latest
```

> **Note:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


### Add persistent storage with WSL for SQL Server containers

Create a data volume as described in [Use a named data volume](../containers/configure.md?pivots=cs1-bash#use-a-named-data-volume).

For example, run the following command to set up a volume called `sql_volume` located at `/var/opt/mssql/`.

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" \
-e "MSSQL_PID=Developer" -e "MSSQL_AGENT_ENABLED=true" \
-p 14333:1433 --name sqlcontainerwsl --hostname sqlcontainerwsl \
-v sql_volume:/var/opt/mssql/ \
-d mcr.microsoft.com/mssql/server:2022-latest
```

Even if you run the `wsl --terminate` command, you don't lose the data. When you start up WSL again and run the `docker run` command to deploy using the `sql_volume` volume, it still has all the data intact.

If you want to delete the persisted volume, make sure that you stop and remove the container that uses the volume, and then run the following command.

```bash
docker volume rm sql_volume
```

## Remarks

You can configure most of the features supported for SQL Server on Linux for development purposes, except the business continuity features that depend on clustering stacks. These features, such as Pacemaker or HPE Serviceguard, aren't supported on WSL.

For a full list of unsupported features for SQL Server on Linux, see [Editions and supported features of SQL Server 2022 on Linux](../sql-server-linux-editions-and-components-2022.md).

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
