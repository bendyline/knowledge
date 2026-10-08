---
title: Installation Guidance for SQL Server on Linux
description: Install, update, and uninstall SQL Server on Linux. This article covers online, offline, and unattended scenarios.
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: install-set-up-deploy
ms.custom:
  - intro-installation
  - linux-related-content
  - build-2025
  - sfi-ropc-blocked
---
# Installation guidance for SQL Server on Linux


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article provides guidance for installing, updating, and uninstalling  SQL Server 2017 (14.x) 
 and later versions on Linux.

For other deployment scenarios, see:

- [Windows](../../database-engine/install-windows/install-sql-server.md)
- [Linux containers](../containers/deploy.md)
- [Kubernetes - Big Data Clusters](https://learn.microsoft.com/previous-versions/sql/big-data-cluster/deploy-get-started) ( SQL Server 2019 (15.x) 
 only)

This guide covers several deployment scenarios. If you only need step-by-step installation instructions, jump to one of the quickstarts:

- [Quickstart: Install SQL Server and create a database on Red Hat Enterprise Linux](quickstart-install-red-hat.md)
- [Quickstart: Install SQL Server and create a database on SUSE Linux Enterprise Server](quickstart-install-suse.md)
- [Quickstart: Install SQL Server and create a database on Ubuntu](quickstart-install-ubuntu.md)
- [Quickstart: Run SQL Server Linux container images with Docker](quickstart-install-docker.md)

For answers to frequently asked questions, see the [SQL Server on Linux FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-faq.yml).

## SQL Server support policy

| Term | Definition |
| --- | --- |
| **Servicing** | Microsoft releases GDR, hotfixes, and security fixes within lifecycle of product for supported distributions. |
| **Support** | Microsoft supports users with problems pertaining to supported distributions. |

### Support policy

 SQL Server 
 is supported on Linux distributions until the earlier of two events: the end of the distribution's support lifecycle, or the end of the  SQL Server 
 support lifecycle.

### Servicing policy

During the Mainstream support phase of  SQL Server 
, we provide Cumulative Updates (CUs) for all Linux distributions that are also within their Mainstream support period. For Linux distributions that move from Mainstream to Extended support and are still recognized as supported platforms,  Microsoft 
 can release CUs and bug fixes at its discretion.

Once  SQL Server 
 moves beyond Mainstream support and into the Extended support phase, we continue to publish security updates and General Distribution Release (GDR) fixes. However, these updates aren't extended to Linux distributions that conclude their support period.


<a id="supportedplatforms"></a>

## Supported platforms

<!--SQL Server 2017 on Linux-->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

 SQL Server 2017 (14.x) 
 is supported on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), and Ubuntu. It's supported as a container image, which can run on Kubernetes, OpenShift, and Docker Engine on Linux.

| Platform | File system | Installation guide |
| --- | --- | --- |
| Red Hat Enterprise Linux 7.7 - 7.9 Server <sup>1</sup>, or 8.x Server | **XFS** or **ext4** | [Installation guide](quickstart-install-red-hat.md) |
| SUSE Linux Enterprise Server v12 SP3 - SP5 <sup>2</sup> | **XFS** or **ext4** | [Installation guide](quickstart-install-suse.md) |
| Ubuntu 18.04 LTS <sup>3</sup> | **XFS** or **ext4** | [Installation guide](quickstart-install-ubuntu.md) |
| Docker Engine 1.8+ on Linux <sup>4</sup> | N/A | [Installation guide](quickstart-install-docker.md) |

<sup>1</sup> At the end of June 2024, RHEL 7.x transitioned from mainstream maintenance to extended lifecycle support (ELS). For more information, see [Red Hat Enterprise Linux Life Cycle](https://access.redhat.com/support/policy/updates/errata/).

<sup>2</sup> At the end of Oct 2024, SLES v12 transitioned from standard general support to long term service pack support (LTSS). For more information, see [Product Support Lifecycle Lifecycle Dates by Product](https://www.suse.com/lifecycle#suse-linux-enterprise-server-12).

<sup>3</sup> At the end of April 2023, Ubuntu 18.04 LTS transitioned from standard maintenance to expanded security maintenance (ESM). For more information, see [Ubuntu 18.04 end of standard support](https://ubuntu.com/blog/18-04-end-of-standard-support).

<sup>4</sup>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


> **Tip:**  
> For more information, review the [system requirements](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#system) for  SQL Server 
 on Linux. For the latest support policy for  SQL Server 
, see the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/general/support-policy-sql-server).




<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

 SQL Server 2019 (15.x) 
 is supported on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), and Ubuntu. It's supported as a container image, which can run on Kubernetes, OpenShift, and Docker Engine on Linux.

You should run production workloads on supported platforms like [Red Hat Enterprise Linux](https://www.redhat.com/technologies/linux-platforms/enterprise-linux/sql-server), [SUSE Linux Enterprise Server](https://www.suse.com/c/microsoft-sql-server-on-suse-linux-enterprise-server-new-suse-best-practices), and [Ubuntu Pro](https://ubuntu.com/blog/microsoft-sql-server-on-ubuntu), as they receive regular OS security updates, and have support coverage options that you need for enterprise database deployments.

| Platform | File system | Installation guide | Get |
| --- | --- | --- | --- |
| Red Hat Enterprise Linux 7.7 - 7.9 Server <sup>1</sup>, or 8.x Server | **XFS** or **ext4** | [Installation guide](quickstart-install-red-hat.md) | [Get RHEL 8](https://access.redhat.com/products/red-hat-enterprise-linux/evaluation) |
| SUSE Linux Enterprise Server v12 (SP3 - SP5) <sup>2</sup>, or v15 | **XFS** or **ext4** | [Installation guide](quickstart-install-suse.md) | [Get SLES v15](https://www.suse.com/products/server) |
| Ubuntu 18.04 <sup>3</sup> or 20.04 | **XFS** or **ext4** | [Installation guide](quickstart-install-ubuntu.md) | [Get Ubuntu 20.04](https://releases.ubuntu.com/20.04/) |
| Docker Engine 1.8+ on Linux <sup>4</sup> | N/A | [Installation guide](quickstart-install-docker.md) | [Get Docker](https://www.docker.com/get-started) |

<sup>1</sup> At the end of June 2024, RHEL 7.x transitioned from mainstream maintenance to extended lifecycle support (ELS). For more information, see [Red Hat Enterprise Linux Life Cycle](https://access.redhat.com/support/policy/updates/errata/).

<sup>2</sup> At the end of Oct 2024, SLES v12 transitioned from standard general support to long term service pack support (LTSS). For more information, see [Product Support Lifecycle Lifecycle Dates by Product](https://www.suse.com/lifecycle#suse-linux-enterprise-server-12).

<sup>3</sup> At the end of April 2023, Ubuntu 18.04 LTS transitioned from standard maintenance to expanded security maintenance (ESM). For more information, see [Ubuntu 18.04 end of standard support](https://ubuntu.com/blog/18-04-end-of-standard-support).

<sup>4</sup>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


> **Tip:**  
> For more information, review the [system requirements](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#system) for  SQL Server 
 on Linux. For the latest support policy for  SQL Server 
, see the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/general/support-policy-sql-server).




<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

 SQL Server 2022 (16.x) 
 is supported on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), and Ubuntu. It's supported as a container image, which can run on Kubernetes, OpenShift, and Docker Engine on Linux.

You should run production workloads on supported platforms like [Red Hat Enterprise Linux](https://www.redhat.com/technologies/linux-platforms/enterprise-linux/sql-server), [SUSE Linux Enterprise Server](https://www.suse.com/c/microsoft-sql-server-on-suse-linux-enterprise-server-new-suse-best-practices), and [Ubuntu Pro](https://ubuntu.com/blog/microsoft-sql-server-on-ubuntu), as they receive regular OS security updates, and have support coverage options that you need for enterprise database deployments.

| Platform | File system | Installation guide | Get |
| --- | --- | --- | --- |
| Red Hat Enterprise Linux 8.x Server, or 9.x Server | **XFS** or **ext4** | [Installation guide](quickstart-install-red-hat.md) | [Get RHEL 9](https://access.redhat.com/products/red-hat-enterprise-linux/evaluation) |
| SUSE Linux Enterprise Server v15 (SP1 - SP4) | **XFS** or **ext4** | [Installation guide](quickstart-install-suse.md) | [Get SLES v15](https://www.suse.com/products/server) |
| Ubuntu 20.04, or 22.04 | **XFS** or **ext4** | [Installation guide](quickstart-install-ubuntu.md) | [Get Ubuntu 22.04](https://releases.ubuntu.com/22.04/) |
| Docker Engine 1.8+ on Linux <sup>1</sup> | N/A | [Installation guide](quickstart-install-docker.md) | [Get Docker](https://www.docker.com/get-started) |

<sup>1</sup>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


> **Tip:**  
> For more information, review the [system requirements](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#system) for  SQL Server 
 on Linux. For the latest support policy for  SQL Server 
, see the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/general/support-policy-sql-server).




<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

 SQL Server 2025 (17.x) 
 is supported on Red Hat Enterprise Linux (RHEL) and Ubuntu. It's supported as a container image, which can run on Kubernetes, OpenShift, and Docker Engine on Linux.

You should run production workloads on supported platforms like [Red Hat Enterprise Linux](https://www.redhat.com/technologies/linux-platforms/enterprise-linux/sql-server) and [Ubuntu Pro](https://ubuntu.com/blog/microsoft-sql-server-on-ubuntu), as they receive regular OS security updates, and have support coverage options that you need for enterprise database deployments.

| Platform | File system | Installation guide | Get |
| --- | --- | --- | --- |
| Red Hat Enterprise Linux 10.x Server<br /><br />Red Hat Enterprise Linux 9.x Server | **XFS** or **ext4** | [Installation guide](quickstart-install-red-hat.md) | [Get RHEL 10](https://access.redhat.com/products/red-hat-enterprise-linux/evaluation)<br /><br />[Get RHEL 9](https://access.redhat.com/products/red-hat-enterprise-linux/evaluation) |
| Ubuntu 24.04<br /><br />Ubuntu 22.04 | **XFS** or **ext4** | [Installation guide](quickstart-install-ubuntu.md) | [Get Ubuntu 24.04](https://releases.ubuntu.com/24.04/)<br /><br />[Get Ubuntu 22.04](https://releases.ubuntu.com/22.04/) |
| Docker Engine 1.8+ on Linux <sup>1</sup> | N/A | [Installation guide](quickstart-install-docker.md) | [Get Docker](https://www.docker.com/get-started) |

<sup>1</sup>  SQL Server 
 container images are supported only on Linux hosts running on [Intel and AMD x86-64 CPUs](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md#hardware-requirements). Emulation or translation environments (for example, Rosetta 2, Prism, or QEMU) aren't tested or supported. If you want to create a feature request, or report an emulator-related issue, visit the [official GitHub repository](https://github.com/microsoft/mssql-docker/issues).


> **Tip:**  
> For more information, review the [system requirements](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#system) for  SQL Server 
 on Linux. For the latest support policy for  SQL Server 
, see the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/general/support-policy-sql-server).




Microsoft also supports deploying and managing  SQL Server 
 containers by using OpenShift and Kubernetes.

> **Note:**  
>  SQL Server 
 is tested and supported on Linux for the previously listed distributions. If you choose to install  SQL Server 
 on an unsupported operating system, review the **Support policy** section of the [Technical support policy for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/general/support-policy-sql-server) to understand the support implications.

<a id="system"></a>

## System requirements

 SQL Server 
 has the following system requirements for Linux:

|  | Requirement |
| --- | --- |
| **Memory** | 2 GB <sup>1</sup> |
| **File System** | **XFS** or **ext4** (other file systems, such as **BTRFS**, aren't supported) |
| **Disk space** | 6 GB |
| **Processor speed** | 2 GHz |
| **Processor cores** | 2 cores |
| **Processor type** | x64-compatible only |

<sup>1</sup> 2 GB is the minimum required memory to start  SQL Server 
 on Linux, which accommodates system threads and internal processes. You must take this amount into consideration when setting **[max server memory](../../database-engine/configure-windows/server-memory-server-configuration-options.md#max-server-memory)** and **[MemoryLimitMB](../configure/mssql-conf.md#memorylimit)**.

If you use **Network File System (NFS)** remote shares in production, note the following support requirements:

- Use NFS version **4.2 or higher**. Older versions of NFS don't support required features, such as `fallocate` and sparse file creation, common to modern file systems.
- Locate only the `/var/opt/mssql` directories on the NFS mount. Other files, such as the  SQL Server 
 system binaries, aren't supported.

<a id="repositories"></a>

## Configure source repositories

**Applies to: <=sql-server-linux-ver16 || <=sql-server-ver16**

When you install or upgrade  SQL Server 
, you get the latest version of  SQL Server 
 from your configured Microsoft repository. The quickstarts use the Cumulative Update (CU) repository for  SQL Server 
. For more information on repositories and how to configure them, see [Configure repositories for installing and upgrading SQL Server on Linux](change-repo.md).


**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

When you install or upgrade  SQL Server 
, you get the latest version of  SQL Server 
 from your configured Microsoft repository. The quickstarts use the Cumulative Update (CU) repository for  SQL Server 
. For more information on repositories and how to configure them, see [Configure repositories for installing and upgrading SQL Server 2025 on Linux](change-repo-2025.md).



<a id="platforms"></a>

## Install SQL Server

You can install  SQL Server 
 on Linux from the command line. For step-by-step instructions, see one of the following quickstarts:

| Platform | Installation quickstarts |
| --- | --- |
| Red Hat Enterprise Linux (RHEL) | [2017](quickstart-install-red-hat.md?view=sql-server-2017&preserve-view=true) \| [2019](quickstart-install-red-hat.md?view=sql-server-linux-ver15&preserve-view=true) \| [2022](quickstart-install-red-hat.md?view=sql-server-linux-ver16&preserve-view=true) \| [2025](quickstart-install-red-hat.md?view=sql-server-linux-ver17&preserve-view=true) |
| SUSE Linux Enterprise Server (SLES) <sup>1</sup> | [2017](quickstart-install-suse.md?view=sql-server-2017&preserve-view=true) \| [2019](quickstart-install-suse.md?view=sql-server-linux-ver15&preserve-view=true) \| [2022](quickstart-install-suse.md?view=sql-server-linux-ver16&preserve-view=true) |
| Ubuntu | [2017](quickstart-install-ubuntu.md?view=sql-server-2017&preserve-view=true) \| [2019](quickstart-install-ubuntu.md?view=sql-server-linux-ver15&preserve-view=true) \| [2022](quickstart-install-ubuntu.md?view=sql-server-linux-ver16&preserve-view=true) \| [2025](quickstart-install-ubuntu.md?view=sql-server-linux-ver17&preserve-view=true) |
| Docker | [2017](quickstart-install-docker.md?view=sql-server-2017&preserve-view=true) \| [2019](quickstart-install-docker.md?view=sql-server-linux-ver15&preserve-view=true) \| [2022](quickstart-install-docker.md?view=sql-server-linux-ver16&preserve-view=true) \| [2025](quickstart-install-docker.md?view=sql-server-linux-ver17&preserve-view=true) |

<sup>1</sup> Starting in  SQL Server 2025 (17.x) 
, SUSE Linux Enterprise Server (SLES) isn't supported.

You can also run  SQL Server 
 on Linux in an Azure virtual machine. For more information, see [Provision a SQL VM in Azure](https://learn.microsoft.com/azure/azure-sql/virtual-machines/linux/sql-vm-create-portal-quickstart?toc=/sql/toc/toc.json).

After installing, consider making extra configuration changes for optimal performance. For more information, see:

- [Performance best practices: Storage, kernel, CPU, and network for SQL Server on Linux](../configure/performance-best-practices-operating-system.md)
- [Performance best practices: SQL Server memory on Linux](../configure/performance-best-practices-sql-server-memory.md)

<a id="upgrade"></a>

## Update or upgrade SQL Server

To update the `mssql-server` package to the latest release, use one of the following commands based on your platform:

| Platform | Package update commands |
| --- | --- |
| RHEL | `sudo yum update mssql-server` |
| SLES | `sudo zypper update mssql-server` |
| Ubuntu | `sudo apt-get update`<br />`sudo apt-get install mssql-server` |

These commands download the newest package and replace the binaries located under `/opt/mssql/`. This operation doesn't affect the user-generated databases or system databases.

**Applies to: <=sql-server-linux-ver16 || <=sql-server-ver16**

To upgrade  SQL Server 
, first [change your configured repository](change-repo.md) to the desired version of  SQL Server 
. Then use the same `update` command to upgrade your version of  SQL Server 
. This step is only possible if the upgrade path is supported between the two repositories.


**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

To upgrade  SQL Server 
, first [change your configured repository](change-repo-2025.md) to the desired version of  SQL Server 
. Then use the same `update` command to upgrade your version of  SQL Server 
. This step is only possible if the upgrade path is supported between the two repositories.



<a id="rollback"></a>

## Roll back SQL Server

To roll back or downgrade  SQL Server 
 to a previous release, use the following steps:

1. Find the version number for the  SQL Server 
 package you want to downgrade to. For a list of package numbers, see [KB 5122767](https://support.microsoft.com/help/5122767).

1. Downgrade to a previous version of  SQL Server 
. In the following commands, replace `<version_number>` with the  SQL Server 
 version number you found in step 1.

   | Platform | Package update commands |
   | --- | --- |
   | **RHEL** | `sudo yum downgrade mssql-server-<version_number>.x86_64` |
   | **SLES** | `sudo zypper install --oldpackage mssql-server=<version_number>` |
   | **Ubuntu** | `sudo apt-get install mssql-server=<version_number>`<br />`sudo systemctl start mssql-server` |

> **Note:**  
> The only supported downgrade is if you downgrade to a release within the same major version, such as  SQL Server 2022 (16.x) 
.


<a id="versioncheck"></a>

## Check installed SQL Server version

To verify your current version and edition of  SQL Server 
 on Linux, use the following procedure:

1. If you don't already have **`sqlcmd`** installed, see [Install the sqlcmd and bcp SQL Server command-line tools on Linux](setup-tools.md).

1. Use **`sqlcmd`** to run a Transact-SQL command that displays your  SQL Server 
 version and edition.

   ```bash
   sqlcmd -S localhost -U sa -Q 'select @@VERSION'
   ```

<a id="uninstall"></a>

## Uninstall SQL Server

To remove the `mssql-server` package on Linux, use one of the following commands based on your platform:

| Platform | Package removal commands |
| --- | --- |
| RHEL | `sudo yum remove mssql-server` |
| SLES | `sudo zypper remove mssql-server` |
| Ubuntu | `sudo apt-get remove mssql-server` |

Removing the package doesn't delete the generated database files. If you want to delete the database files, use the following command:

```bash
sudo rm -rf /var/opt/mssql/
```

<a id="unattended"></a>

## Unattended install

You can perform an unattended installation in the following way:

- Follow the initial steps in the [quickstarts](#platforms) to register the repositories and install  SQL Server 
.
- When you run `mssql-conf setup`, set [environment variables](../configure/environment-variables.md) and use the `-n` (no prompt) option.

The following example configures 
 SQL Server Developer  edition with the `MSSQL_PID` environment variable. It also accepts the EULA (`ACCEPT_EULA`) and sets the `sa` password (`MSSQL_SA_PASSWORD`). The `-n` parameter performs an unprompted installation where the configuration values come from the environment variables.

```bash
sudo MSSQL_PID=Developer ACCEPT_EULA=Y MSSQL_SA_PASSWORD='<password>' /opt/mssql/bin/mssql-conf -n setup
```

> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


You can also create a script that performs other actions. For example, you could install other  SQL Server 
 packages.

For a more detailed sample script, see the following examples:

- [Sample: Unattended SQL Server installation script for Red Hat Enterprise Linux](unattended-install-redhat.md)
- [Sample: Unattended SQL Server installation script for SUSE Linux Enterprise Server](unattended-install-suse.md)
- [Sample: Unattended SQL Server installation script for Ubuntu](unattended-install-ubuntu.md)

<a id="offline"></a>

## Offline install

If your Linux machine can't access the online repositories used in the [quickstarts](#platforms), you can download the package files directly. These packages are located at <https://packages.microsoft.com>.

> **Tip:**  
> If you followed a quickstart guide to install  SQL Server 
, you don't need to download or manually install the  SQL Server 
 packages. This section is only for the offline scenario.

1. **Download the database engine package for your platform**. Find package download links in the package details section of the [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md).

1. **Move the downloaded package to your Linux machine**. If you used a different machine to download the packages, one way to move the packages to your Linux machine is with the **scp** command.

1. **Install the database engine package**. Use one of the following commands based on your platform. Replace the package file name in this example with the exact name you downloaded.

   | Platform | Package install command |
   | --- | --- |
   | RHEL | `sudo yum localinstall mssql-server_versionnumber.x86_64.rpm` |
   | SLES | `sudo zypper install mssql-server_versionnumber.x86_64.rpm` |
   | Ubuntu | `sudo dpkg -i mssql-server_versionnumber_amd64.deb` |

   > **Note:**  
   > You can also install the RPM packages (RHEL and SLES) with the `rpm -ivh` command, but the commands in the previous table automatically install dependencies if available from approved repositories.

1. **Resolve missing dependencies**: You might have missing dependencies at this point. If not, you can skip this step. On Ubuntu, if you have access to approved repositories containing those dependencies, the easiest solution is to use the `apt-get -f install` command. This command also completes the installation of  SQL Server 
. To manually inspect dependencies, use the following commands:

   | Platform | List dependencies command |
   | --- | --- |
   | RHEL | `rpm -qpR mssql-server_versionnumber.x86_64.rpm` |
   | SLES | `rpm -qpR mssql-server_versionnumber.x86_64.rpm` |
   | Ubuntu | `dpkg -I mssql-server_versionnumber_amd64.deb` |

   After you resolve the missing dependencies, you can try installing the `mssql-server` package again.

1. **Complete the SQL Server setup**. Use **`mssql-conf`** to complete the  SQL Server 
 setup:

   ```bash
   sudo /opt/mssql/bin/mssql-conf setup
   ```

<a id="licensing-and-pricing"></a>

## License and pricing

 SQL Server 
 is licensed the same for Linux and Windows. For more information about  SQL Server 
 licensing and pricing, see [How to license SQL Server](https://www.microsoft.com/sql-server/sql-server-2022-pricing), and [SQL Server Licensing Resources and Documents](https://www.microsoft.com/licensing/docs/view/SQL-Server).

## Optional SQL Server features

After installation, you can also install or enable optional  SQL Server 
 features.

- [Install the sqlcmd and bcp SQL Server command-line tools on Linux](setup-tools.md)
- [Install SQL Server Agent on Linux](setup-sql-agent.md)
- [Install SQL Server Full-Text Search on Linux](setup-full-text-search.md)
- [Install SQL Server 2019 Machine Learning Services (Python and R) on Linux](setup-machine-learning.md)
- [Install SQL Server Integration Services (SSIS) on Linux](setup-ssis.md)


##  Get help

- [Ideas for SQL: Have suggestions for improving SQL Server?](https://feedback.azure.com/forums/908035-sql-server)
- [Microsoft Q & A (SQL Server)](https://learn.microsoft.com/answers/products/sql-server)
- [DBA Stack Exchange (tag sql-server): Ask SQL Server questions](https://dba.stackexchange.com/questions/tagged/sql-server)
- [Stack Overflow (tag sql-server): Answers to SQL development questions](https://stackoverflow.com/questions/tagged/sql-server)
- [Microsoft SQL Server License Terms and Information](https://www.microsoft.com/licensing/product-licensing/sql-server)
- [Support options for business users](https://support.microsoft.com/support-for-business)
- [Additional SQL Server help and feedback](../../sql-server/sql-server-get-help.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](../../sql-server/sql-server-docs-contribute.md).



## Related content

- [SQL Server on Linux FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-faq.yml)
