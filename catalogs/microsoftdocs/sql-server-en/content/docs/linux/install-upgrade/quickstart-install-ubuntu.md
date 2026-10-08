---
title: "Ubuntu: Install SQL Server on Linux"
description: This quickstart shows how to install SQL Server 2017 and later versions on Ubuntu and then create and query a database with sqlcmd.
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: quickstart
ms.custom:
  - intro-installation
  - linux-related-content
  - ignite-2025
---
# Quickstart: Install SQL Server and create a database on Ubuntu


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


<!--SQL Server 2017 on Linux-->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

In this quickstart, you install  SQL Server 2017 (14.x) 
 on Ubuntu 18.04. Then you can connect with **`sqlcmd`** to create your first database and run queries.

For more information on supported platforms, see [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md).


<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

In this quickstart, you install  SQL Server 2019 (15.x) 
 on Ubuntu 20.04. Then you can connect with **`sqlcmd`** to create your first database and run queries.

For more information on supported platforms, see [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md).


<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

In this quickstart, you install  SQL Server 2022 (16.x) 
 on Ubuntu 20.04 or 22.04. Then you can connect with **`sqlcmd`** to create your first database and run queries.

For more information on supported platforms, see [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md).



<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

In this quickstart, you install  SQL Server 2025 (17.x) 
 on Ubuntu 22.04. Then you can connect with **`sqlcmd`** to create your first database and run queries.

> **Note:**  
> Starting with  SQL Server 2025 (17.x) 
 Cumulative Update (CU) 1, Ubuntu 24.04 is supported.

For more information on supported platforms, see [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md).



> **Tip:**  
> This tutorial requires user input and an internet connection. If you're interested in the [unattended](setup.md#unattended) or [offline](setup.md#offline) installation procedures, see [Installation guidance for SQL Server on Linux](setup.md).

> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


## Prerequisites

<!--SQL Server 2017 on Linux-->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

You need an Ubuntu 18.04 machine with **at least 2 GB** of memory.

To install Ubuntu 18.04 on your own machine, go to <https://releases.ubuntu.com/18.04/>. You can also create Ubuntu or Ubuntu Pro virtual machines in Azure. See [Tutorial: Create and Manage Linux VMs with the Azure CLI](https://learn.microsoft.com/azure/virtual-machines/linux/tutorial-manage-vm).

If you previously installed a preview version of  SQL Server 
, you must first remove the old repository before following these steps. For more information, see [Configure repositories for installing and upgrading SQL Server on Linux](change-repo.md).


<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

You need an Ubuntu 20.04 machine with **at least 2 GB** of memory.

To install Ubuntu 20.04 on your own machine, go to <https://releases.ubuntu.com/20.04/>. You can also create Ubuntu or Ubuntu Pro virtual machines in Azure. See [Tutorial: Create and Manage Linux VMs with the Azure CLI](https://learn.microsoft.com/azure/virtual-machines/linux/tutorial-manage-vm).

If you previously installed a preview version of  SQL Server 
, you must first remove the old repository before following these steps. For more information, see [Configure repositories for installing and upgrading SQL Server on Linux](change-repo.md).


<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

You need an Ubuntu 20.04 or Ubuntu 22.04 machine with **at least 2 GB** of memory.

To install Ubuntu 20.04 on your own machine, go to <https://releases.ubuntu.com/20.04/>. You can also create Ubuntu or Ubuntu Pro virtual machines in Azure. See [Tutorial: Create and Manage Linux VMs with the Azure CLI](https://learn.microsoft.com/azure/virtual-machines/linux/tutorial-manage-vm).

If you previously installed a preview version of  SQL Server 
, you must first remove the old repository before following these steps. For more information, see [Configure repositories for installing and upgrading SQL Server on Linux](change-repo.md).


<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

You need an Ubuntu 22.04 or 24.04 machine with **at least 2 GB** of memory.

To install Ubuntu 22.04 on your own machine, go to <https://releases.ubuntu.com/22.04/>. You can also create Ubuntu or Ubuntu Pro virtual machines in Azure. See [Tutorial: Create and Manage Linux VMs with the Azure CLI](https://learn.microsoft.com/azure/virtual-machines/linux/tutorial-manage-vm).

If you previously installed a preview version of  SQL Server 
, you must first remove the old repository before following these steps. For more information, see [Configure repositories for installing and upgrading SQL Server 2025 on Linux](change-repo-2025.md).



> **Note:**  
>  SQL Server 
 on Windows Subsystem for Linux (WSL) is supported for development purposes only. For instructions on installing SQL Server on WSL, see [Quickstart: Install SQL Server and create a database on Windows Subsystem for Linux (WSL 2)](quickstart-install-windows-subsystem-linux.md).

For other system requirements, see [System requirements for SQL Server on Linux](setup.md#system).

> **Tip:**  
> For production environments that require FIPS compliance or Expanded Security Maintenance (ESM) coverage for Ubuntu Universe packages, use **Ubuntu Pro**. You can enable Ubuntu Pro on your existing instance, or select a preconfigured Ubuntu Pro image when you provision your virtual machine in Azure.

<a id="install"></a>

## Install SQL Server

To configure  SQL Server 
 on Ubuntu, run the following commands in a terminal to install the **mssql-server** package.

<!--SQL Server 2017 on Linux-->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

1. Import the public repository GPG keys:

   ```bash
   curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
   ```

1. Register the  SQL Server 
 Ubuntu repository:

   ```bash
   sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/18.04/mssql-server-2017.list)"
   ```

   > **Tip:**  
   > If you want to install a different version of  SQL Server 
, see the [SQL Server 2019](quickstart-install-ubuntu.md?view=sql-server-linux-ver15&preserve-view=true#install), [SQL Server 2022](quickstart-install-ubuntu.md?view=sql-server-linux-ver16&preserve-view=true#install), or [SQL Server 2025](quickstart-install-ubuntu.md?view=sql-server-linux-ver17&preserve-view=true#install) versions of this article.

1. Install  SQL Server 
:

   ```bash
   sudo apt-get update
   sudo apt-get install -y mssql-server
   ```

1. After the package installation finishes, run `mssql-conf setup` and follow the prompts to set the `sa` password and choose your edition. The following  SQL Server 
 editions are freely licensed: Evaluation, Developer, and Express.

   ```bash
   sudo /opt/mssql/bin/mssql-conf setup
   ```

   > **Caution:**  
   > Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. When the configuration is done, verify that the service is running:

   ```bash
   systemctl status mssql-server --no-pager
   ```

1. If you plan to connect remotely, you might also need to open the  SQL Server 
 TCP port (default 1433) on your firewall.


<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

1. Import the public repository GPG keys:

   ```bash
   curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
   ```

1. Register the  SQL Server 
 Ubuntu repository:

   ```bash
   sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/20.04/mssql-server-2019.list)"
   ```

   > **Tip:**  
   > If you want to install a different version of  SQL Server 
, see the [SQL Server 2017](quickstart-install-ubuntu.md?view=sql-server-linux-2017&preserve-view=true#install), [SQL Server 2022](quickstart-install-ubuntu.md?view=sql-server-linux-ver16&preserve-view=true#install), or [SQL Server 2025](quickstart-install-ubuntu.md?view=sql-server-linux-ver17&preserve-view=true#install) versions of this article.

1. Install  SQL Server 
:

   ```bash
   sudo apt-get update
   sudo apt-get install -y mssql-server
   ```

1. After the package installation finishes, run `mssql-conf setup` and follow the prompts to set the `sa` password and choose your edition. The following  SQL Server 
 editions are freely licensed: Evaluation, Developer, and Express.

   ```bash
   sudo /opt/mssql/bin/mssql-conf setup
   ```

   > **Caution:**  
   > Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. When the configuration is done, verify that the service is running:

   ```bash
   systemctl status mssql-server --no-pager
   ```

1. If you plan to connect remotely, you might also need to open the  SQL Server 
 TCP port (default 1433) on your firewall.



<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

### [Ubuntu 20.04](#tab/ubuntu2004)

1. Import the public repository GPG keys:

   ```bash
   curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
   ```

1. Register the  SQL Server 
 Ubuntu repository:

   ```bash
   sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/20.04/mssql-server-2022.list)"
   ```

   > **Tip:**  
   > If you want to install a different version of  SQL Server 
, see the [SQL Server 2017](quickstart-install-ubuntu.md?view=sql-server-linux-2017&preserve-view=true#install), [SQL Server 2019](quickstart-install-ubuntu.md?view=sql-server-linux-ver15&preserve-view=true#install), or [SQL Server 2025](quickstart-install-ubuntu.md?view=sql-server-linux-ver17&preserve-view=true#install) versions of this article.

1. Install  SQL Server 
:

   ```bash
   sudo apt-get update
   sudo apt-get install -y mssql-server
   ```

1. After the package installation finishes, run `mssql-conf setup` and follow the prompts to set the `sa` password and choose your edition. The following  SQL Server 
 editions are freely licensed: Evaluation, Developer, and Express.

   ```bash
   sudo /opt/mssql/bin/mssql-conf setup
   ```

   > **Caution:**  
   > Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. When the configuration is done, verify that the service is running:

   ```bash
   systemctl status mssql-server --no-pager
   ```

1. If you plan to connect remotely, you might also need to open the  SQL Server 
 TCP port (default 1433) on your firewall.

### [Ubuntu 22.04](#tab/ubuntu2204)

1. Download the public key, convert it from ASCII to GPG format, and write it to the required location:

   ```bash
   curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg
   ```

   If you receive a warning about the public key not being available, use the following command instead:

   ```bash
   curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
   ```

1. Manually download and register the  SQL Server 
 Ubuntu repository:

   ```bash
   curl -fsSL https://packages.microsoft.com/config/ubuntu/22.04/mssql-server-2022.list | sudo tee /etc/apt/sources.list.d/mssql-server-2022.list
   ```

   > **Tip:**  
   > If you want to install a different version of  SQL Server 
, see the [SQL Server 2017](quickstart-install-ubuntu.md?view=sql-server-linux-2017&preserve-view=true#install), [SQL Server 2019](quickstart-install-ubuntu.md?view=sql-server-linux-ver15&preserve-view=true#install), or [SQL Server 2025](quickstart-install-ubuntu.md?view=sql-server-linux-ver17&preserve-view=true#install) versions of this article.

1. Install  SQL Server 
:

   ```bash
   sudo apt-get update
   sudo apt-get install -y mssql-server
   ```

1. After the package installation finishes, run `mssql-conf setup` and follow the prompts to set the `sa` password and choose your edition. The following  SQL Server 
 editions are freely licensed: Evaluation, Developer, and Express.

   ```bash
   sudo /opt/mssql/bin/mssql-conf setup
   ```

   > **Caution:**  
   > Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. When the configuration is done, verify that the service is running:

   ```bash
   systemctl status mssql-server --no-pager
   ```

1. If you plan to connect remotely, you might also need to open the  SQL Server 
 TCP port (default 1433) on your firewall.

---



<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

### [Ubuntu 22.04](#tab/2025ubuntu2204)

1. Download the public key, convert it from ASCII to GPG format, and write it to the required location:

   ```bash
   curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg
   ```

   If you receive a warning about the public key not being available, use the following command instead:

   ```bash
   curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
   ```

1. Manually download and register the  SQL Server 
 Ubuntu repository:

   ```bash
   curl -fsSL https://packages.microsoft.com/config/ubuntu/22.04/mssql-server-2025.list | sudo tee /etc/apt/sources.list.d/mssql-server-2025.list
   ```

   > **Tip:**  
   > To install a different version of  SQL Server 
, see the [SQL Server 2017](quickstart-install-ubuntu.md?view=sql-server-linux-2017&preserve-view=true#install), [SQL Server 2019](quickstart-install-ubuntu.md?view=sql-server-linux-ver15&preserve-view=true#install), or [SQL Server 2022](quickstart-install-ubuntu.md?view=sql-server-linux-ver16&preserve-view=true#install) versions of this article.

1. Install  SQL Server 
:

   ```bash
   sudo apt-get update
   sudo apt-get install -y mssql-server
   ```

1. After the package installation finishes, run `mssql-conf setup` and follow the prompts to set the `sa` password and choose your edition. The following  SQL Server 
 editions are freely licensed: Evaluation, Developer, and Express.

   ```bash
   sudo /opt/mssql/bin/mssql-conf setup
   ```

   > **Caution:**  
   > Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. When the configuration is done, verify that the service is running:

   ```bash
   systemctl status mssql-server --no-pager
   ```

1. If you plan to connect remotely, you might also need to open the  SQL Server 
 TCP port (default 1433) on your firewall.

At this point,  SQL Server 
 is running on your Ubuntu machine and is ready to use.

### [Ubuntu 24.04](#tab/2025ubuntu2404)

**Applies to**:  SQL Server 2025 (17.x) 
 CU 1 and later versions.

1. Download the public key, convert it from ASCII to GPG format, and write it to the required location:

   ```bash
   curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg
   ```

1. Manually download and register the  SQL Server 
 Ubuntu repository:

   ```bash
   curl -fsSL https://packages.microsoft.com/config/ubuntu/24.04/mssql-server-2025.list | sudo tee /etc/apt/sources.list.d/mssql-server-2025.list
   ```

   > **Tip:**  
   > To install a different version of  SQL Server 
, see the [SQL Server 2017](quickstart-install-ubuntu.md?view=sql-server-linux-2017&preserve-view=true#install), [SQL Server 2019](quickstart-install-ubuntu.md?view=sql-server-linux-ver15&preserve-view=true#install), or [SQL Server 2022](quickstart-install-ubuntu.md?view=sql-server-linux-ver16&preserve-view=true#install) versions of this article.

1. Install  SQL Server 
:

   ```bash
   sudo apt-get update
   sudo apt-get install -y mssql-server
   ```

1. After the package installation finishes, run `mssql-conf setup` and follow the prompts to set the `sa` password and choose your edition. The following  SQL Server 
 editions are freely licensed: Evaluation, Developer, and Express.

   ```bash
   sudo /opt/mssql/bin/mssql-conf setup
   ```

   > **Caution:**  
   > Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


1. When the configuration is done, verify that the service is running:

   ```bash
   systemctl status mssql-server --no-pager
   ```

1. If you plan to connect remotely, you might also need to open the  SQL Server 
 TCP port (default 1433) on your firewall.

At this point,  SQL Server 
 is running on your Ubuntu machine and is ready to use.

---



## Disable the `sa` account as a best practice

When you connect to your  SQL Server 
 instance using the system administrator (`sa`) account for the first time after installation, it's important for you to follow these steps, and then immediately disable the `sa` account as a security best practice.

1. Create a new login, and make it a member of the **sysadmin** server role.

   - Depending on whether you have a container or non-container deployment, enable Windows authentication, and create a new Windows-based login and add it to the **sysadmin** server role.

     - [Tutorial: Use adutil to configure Active Directory authentication with SQL Server on Linux](../security/authentication/adutil-tutorial.md)

     - [Tutorial: Configure Active Directory authentication with SQL Server on Linux containers](../containers/tutorial-adutil.md)

   - Otherwise, create a login using  SQL Server 
 authentication, and add it to the **sysadmin** server role.

1. Connect to the  SQL Server 
 instance using the new login you created.

1. Disable the `sa` account, as recommended for security best practice.


<a id="tools"></a>

## Install the SQL Server command-line tools

To create a database, you need to connect with a tool that can run Transact-SQL statements on  SQL Server 
. The following steps install the  SQL Server 
 command-line tools: [sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md) and [bcp utility](../../tools/bcp/bcp-utility.md).

<a id="ubuntu"></a>

Use the following steps to install the **mssql-tools18** on Ubuntu.

- Ubuntu 24.04 is supported starting with  SQL Server 2025 (17.x) 
 CU 1.
- Ubuntu 22.04 is supported starting with  SQL Server 2022 (16.x) 
 CU 10.
- Ubuntu 20.04 is supported starting with  SQL Server 2019 (15.x) 
 CU 10.
- Ubuntu 18.04 is supported starting with  SQL Server 2019 (15.x) 
 CU 3.

### [Ubuntu 18.04](#tab/odbc-ubuntu-1804)

1. Enter superuser mode.

   ```bash
   sudo su
   ```

1. Import the public repository GPG keys.

   ```bash
   curl https://packages.microsoft.com/keys/microsoft.asc | tee /etc/apt/trusted.gpg.d/microsoft.asc
   ```

1. Register the Microsoft Ubuntu repository.

   ```bash
   curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list | tee /etc/apt/sources.list.d/mssql-release.list
   ```

1. Exit superuser mode.

   ```bash
   exit
   ```

### [Ubuntu 20.04](#tab/odbc-ubuntu-2004)

1. Enter superuser mode.

   ```bash
   sudo su
   ```

1. Import the public repository GPG keys.

   ```bash
   curl https://packages.microsoft.com/keys/microsoft.asc | tee /etc/apt/trusted.gpg.d/microsoft.asc
   ```

1. Register the Microsoft Ubuntu repository.

   ```bash
   curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list | tee /etc/apt/sources.list.d/mssql-release.list
   ```

1. Exit superuser mode.

   ```bash
   exit
   ```

### [Ubuntu 22.04](#tab/odbc-ubuntu-2204)

1. Enter superuser mode.

   ```bash
   sudo su
   ```

1. Import the public repository GPG keys.

   ```bash
   curl https://packages.microsoft.com/keys/microsoft.asc | tee /etc/apt/trusted.gpg.d/microsoft.asc
   ```

1. Register the Microsoft Ubuntu repository.

   ```bash
   curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | tee /etc/apt/sources.list.d/mssql-release.list
   ```

1. Exit superuser mode.

   ```bash
   exit
   ```

### [Ubuntu 24.04](#tab/odbc-ubuntu-2404)

Use the following steps to install the **mssql-tools18** for  SQL Server 2025 (17.x) 
 on Ubuntu 24.04.

1. Enter superuser mode.

   ```bash
   sudo su
   ```

1. Register the Microsoft repository for Ubuntu 24.04.

   ```bash
   curl -sSL -O https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb
   ```

1. Install the repository package:

   ```bash
   sudo dpkg -i packages-microsoft-prod.deb
   ```

1. Exit superuser mode.

   ```bash
   exit
   ```

---

1. Update the sources list and run the installation command with the unixODBC developer package.

   ```bash
   sudo apt-get update
   sudo apt-get install mssql-tools18 unixodbc-dev
   ```

   To update to the latest version of **mssql-tools**, run the following commands:

   ```bash
   sudo apt-get update
   sudo apt-get install mssql-tools18
   ```

1. **Optional**: Add `/opt/mssql-tools18/bin/` to your `PATH` environment variable in a Bash shell.

   To make **`sqlcmd`** and **`bcp`** accessible from the Bash shell for login sessions, modify your `PATH` in the `~/.bash_profile` file with the following command:

   ```bash
   echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bash_profile
   source ~/.bash_profile
   ```

   To make **`sqlcmd`** and **`bcp`** accessible from the Bash shell for interactive and non-login sessions, modify the `PATH` in the `~/.bashrc` file with the following command:

   ```bash
   echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bashrc
   source ~/.bashrc
   ```


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
