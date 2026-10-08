---
title: Install the sqlcmd and bcp SQL Server Command-Line Tools on Linux
titleSuffix: SQL Server
description: Learn how to install the SQL Server command-line tools, Microsoft ODBC drivers, and their dependencies on Linux.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: mahyon
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: install-set-up-deploy
ms.custom:
  - intro-installation
  - linux-related-content
---
# Install the sqlcmd and bcp SQL Server command-line tools on Linux


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


The following steps install the command-line tools, Microsoft ODBC drivers, and their dependencies. The **mssql-tools18** package contains:

- [sqlcmd](../../tools/sqlcmd/sqlcmd-use-utility.md): Command-line query utility.
- [bcp](../../tools/bcp/bcp-utility.md): Bulk import-export utility.

Install the tools for your platform:

- [Red Hat Enterprise Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/install-upgrade/setup-tools.md?tabs=redhat-install#RHEL)
- [SUSE Linux Enterprise Server](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/install-upgrade/setup-tools.md?tabs=sles-install#SLES)
- [Ubuntu](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/install-upgrade/setup-tools.md?tabs=ubuntu-install#ubuntu)
- [macOS](#macos)
- [Docker](#docker)

This article describes how to install the command-line tools. If you're looking for examples of how to use **`sqlcmd`** or **`bcp`**, see the [Related content](#related-content) at the end of this article.

> **Important:**  
> **`sqlcmd`** and **`bcp`** are available in **mssql-tools18** for `x64` and `arm64` architectures. For a modern alternative across Linux, macOS, and Windows, see [go-sqlcmd utility](../../tools/sqlcmd/sqlcmd-utility.md).

## Install tools on Linux

These instructions are for installing the  Microsoft 
 ODBC 18 packages. For previous versions, see [Install the Microsoft ODBC driver for SQL Server (Linux)](../../connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server.md).

### [Red Hat Enterprise Linux](#tab/redhat-install)

<a id="RHEL"></a>

Use the following steps to install the **mssql-tools18** on Red Hat Enterprise Linux.

1. Download the Microsoft Red Hat repository configuration file.

   - For Red Hat 10, use the following command to download the Microsoft Red Hat repository configuration file from the RHEL 9 repo. The same versions of tools also work for RHEL 10.

     ```bash
     curl https://packages.microsoft.com/config/rhel/9/prod.repo | sudo tee /etc/yum.repos.d/mssql-release.repo
     ```

   - For Red Hat 9, use the following command:

     ```bash
     curl https://packages.microsoft.com/config/rhel/9/prod.repo | sudo tee /etc/yum.repos.d/mssql-release.repo
     ```

   - For Red Hat 8, use the following command:

     ```bash
     curl https://packages.microsoft.com/config/rhel/8/prod.repo | sudo tee /etc/yum.repos.d/mssql-release.repo
     ```

   - For Red Hat 7, use the following command:

     ```bash
     curl https://packages.microsoft.com/config/rhel/7/prod.repo | sudo tee /etc/yum.repos.d/mssql-release.repo
     ```

1. If you had a previous version of **mssql-tools** installed, remove any older unixODBC packages.

   ```bash
   sudo yum remove mssql-tools unixODBC-utf16 unixODBC-utf16-devel
   ```

1. Run the following commands to install **mssql-tools18** with the unixODBC developer package.

   ```bash
   sudo yum install -y mssql-tools18 unixODBC-devel
   ```

   To update to the latest version of **mssql-tools**, run the following commands:

   ```bash
   sudo yum check-update
   sudo yum update mssql-tools18
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


### [SUSE Linux Enterprise Server](#tab/sles-install)

<a id="SLES"></a>

Use the following steps to install **mssql-tools18** on SUSE Linux Enterprise Server.

> **Note:**  
> Starting in  SQL Server 2025 (17.x) 
, SUSE Linux Enterprise Server (SLES) isn't supported.

1. Import the Microsoft package signing key.

   ```bash
   curl -O https://packages.microsoft.com/keys/microsoft.asc
   sudo rpm --import microsoft.asc
   ```

1. Add the  SQL Server 
 repository to Zypper.

   - For SLES 15, use the following command:

     ```bash
     sudo zypper ar https://packages.microsoft.com/config/sles/15/prod.repo
     ```

   - For SLES 12, use the following command:

     ```bash
     sudo zypper ar https://packages.microsoft.com/config/sles/12/prod.repo
     ```

1. Install **mssql-tools18** with the unixODBC developer package.

   - For SLES 15, use the following command:

   ```bash
   sudo zypper install -y mssql-tools18 unixODBC-devel glibc-locale-base
   ```

   - For SLES 12, use the following command:

   ```bash
   sudo zypper install -y mssql-tools18 unixODBC-devel
   ```

   To update to the latest version of **mssql-tools18**, run the following commands:

   ```bash
   sudo zypper refresh
   sudo zypper update mssql-tools18
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


### [Ubuntu](#tab/ubuntu-install)

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


---

<a id="macos"></a>

## Install tools on macOS

Install [Homebrew](https://brew.sh) if you don't have it already:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

To install the tools for macOS El Capitan and later versions, use the following commands:

```bash
# brew untap microsoft/mssql-preview if you installed the preview version
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
brew install mssql-tools18
```

<a id="docker"></a>

## Install tools on Docker

If you [run SQL Server in a Docker container](quickstart-install-docker.md), the  SQL Server 
 command-line tools are already included in the  SQL Server 
 Linux container image. If you attach to a running container with an interactive Bash shell, you can run the tools locally.

If you're creating a container with the  SQL Server 
 command-line tools, you should add `ACCEPT_EULA=Y` to the installation command to silently accept the EULA, and not interrupt image creation. An example final command as part of installation on an Ubuntu-based image is:

```bash
sudo ACCEPT_EULA=Y apt-get install mssql-tools18 unixodbc-dev
```

## Offline installation

If your Linux machine doesn't have access to the online repositories used in the previous sections, you can download the package files directly. These packages are located in the Microsoft repository at <https://packages.microsoft.com>.

> **Tip:**  
> If you successfully installed with the steps in the previous sections, you don't need to download or manually install the following packages. This is only for the offline scenario.


### [Red Hat Enterprise Linux](#tab/redhat-install)

1. First, locate and copy the **mssql-tools18** package for your Linux distribution. For Red Hat 8.0, this package is located at <https://packages.microsoft.com/rhel/8/prod>.

1. Also locate and copy the **msodbcsql18** package, which is a dependency. The **msodbcsql18** package also has a dependency on **unixODBC-devel**. For Red Hat, the **msodbcsql18** package is located at <https://packages.microsoft.com/rhel/8/prod>.

1. **Move the downloaded packages to your Linux machine**. If you used a different machine to download the packages, one way to move the packages to your Linux machine is with the **scp** command.

1. **Install the packages**: Install the **mssql-tools18** and **msodbcsql18** packages. If you get any dependency errors, ignore them until the next step. Replace `<version>` with the correct version:

   ```bash
   sudo yum localinstall msodbcsql18-<version>.rpm
   sudo yum localinstall mssql-tools18-<version>.rpm
   ```

1. **Resolve missing dependencies**: You might have missing dependencies at this point. If not, you can skip this step. In some cases, you must manually locate and install these dependencies.

   You can inspect the required dependencies with the following commands. Replace `<version>` with the correct version:

   ```bash
   rpm -qpR msodbcsql18-<version>.rpm
   rpm -qpR mssql-tools18-<version>.rpm
   ```

### [SUSE Linux Enterprise Server](#tab/sles-install)

> **Note:**  
> Starting in  SQL Server 2025 (17.x) 
, SUSE Linux Enterprise Server (SLES) isn't supported.

1. First, locate and copy the **mssql-tools18** package for your Linux distribution. For SLES 15, this package is located at <https://packages.microsoft.com/sles/15/prod>.

1. Also locate and copy the **msodbcsql18** package, which is a dependency. The **msodbcsql18** package also has a dependency on **unixODBC-devel**. For SLES, the **msodbcsql18** package is located at <https://packages.microsoft.com/sles/15/prod>.

1. **Move the downloaded packages to your Linux machine**. If you used a different machine to download the packages, one way to move the packages to your Linux machine is with the **scp** command.

1. **Install the packages**: Install the **mssql-tools18** and **msodbcsql18** packages. If you get any dependency errors, ignore them until the next step. Replace `<version>` with the correct version:

   ```bash
   sudo zypper install msodbcsql18-<version>.rpm
   sudo zypper install mssql-tools18-<version>.rpm
   ```

1. **Resolve missing dependencies**: You might have missing dependencies at this point. If not, you can skip this step. In some cases, you must manually locate and install these dependencies.

   You can inspect the required dependencies with the following commands. Replace `<version>` with the correct version:

   ```bash
   rpm -qpR msodbcsql18-<version>.rpm
   rpm -qpR mssql-tools18-<version>.rpm
   ```

### [Ubuntu](#tab/ubuntu-install)

1. First, locate and copy the **mssql-tools18** package for your Linux distribution. For Ubuntu 20.04, this package is located at <https://packages.microsoft.com/ubuntu/20.04/prod/pool/main/m/mssql-tools>.

1. Also locate and copy the **msodbcsql18** package, which is a dependency. The **msodbcsql18** package also has a dependency on **unixodbc-dev**. For Ubuntu, the **msodbcsql18** packages are located at [**msodbcsql18**](https://packages.microsoft.com/ubuntu/20.04/prod/pool/main/m/msodbcsql17/), and [**unixodbc-dev**](https://packages.microsoft.com/ubuntu/20.04/prod/pool/main/u/unixodbc/).

1. **Move the downloaded packages to your Linux machine**. If you used a different machine to download the packages, one way to move the packages to your Linux machine is with the **scp** command.

1. **Install the packages**: Install the **mssql-tools18** and **msodbcsql18** packages. If you get any dependency errors, ignore them until the next step. Replace `<version>` with the correct version:

   ```bash
   sudo dpkg -i msodbcsql18_<version>.deb
   sudo dpkg -i mssql-tools18_<version>.deb
   ```

1. **Resolve missing dependencies**: You might have missing dependencies at this point. If not, you can skip this step. In some cases, you must manually locate and install these dependencies.

   If you have access to approved repositories containing those dependencies, the easiest solution is to use the **apt-get** command:

   ```bash
   sudo apt-get -f install
   ```

   This command completes the installation of the  SQL Server 
 packages as well.

   If this step doesn't work for your Debian package, you can inspect the required dependencies with the following commands:

   ```bash
   dpkg -I msodbcsql18_<version>_amd64.deb | grep "Depends:"
   dpkg -I mssql-tools18_<version>_amd64.deb | grep "Depends:"
   ```

---

## Related content

- [Quickstart: Install SQL Server and create a database on Red Hat Enterprise Linux](quickstart-install-red-hat.md)
- [Quickstart: Install SQL Server and create a database on SUSE Linux Enterprise Server](quickstart-install-suse.md)
- [Quickstart: Install SQL Server and create a database on Ubuntu](quickstart-install-ubuntu.md)
- [Quickstart: Run SQL Server Linux container images with Docker](quickstart-install-docker.md)
- [Bulk copy data with bcp to SQL Server on Linux](../migrate/bulk-copy.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](../../sql-server/sql-server-docs-contribute.md).
