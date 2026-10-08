---
title: Configure the SQL Server Agent on Linux
description: Learn how to enable or install the SQL Server Agent on Linux. Starting with SQL Server 2017 CU4, SQL Server Agent is included with the mssql-server package.
author: rwestMSFT
ms.author: randolphwest
ms.date: 01/02/2026
ms.service: sql
ms.subservice: linux
ms.topic: install-set-up-deploy
ms.custom:
  - intro-installation
  - linux-related-content
---
# Install SQL Server Agent on Linux


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article describes how to enable or install the SQL Server Agent on Linux.

The [SQL Server Agent](https://learn.microsoft.com/ssms/agent/sql-server-agent) runs scheduled SQL Server jobs. Starting with  SQL Server 2017 (14.x) 
 CU 4, SQL Server Agent is included with the **mssql-server** package and is disabled by default.

For a list of features supported by the editions of  SQL Server 
 on Linux, see:

- [Editions and supported features of SQL Server 2025](../sql-server-linux-editions-and-components-2025.md)
- [Editions and supported features of SQL Server 2022](../sql-server-linux-editions-and-components-2022.md)
- [Editions and supported features of SQL Server 2019](../sql-server-linux-editions-and-components-2019.md)
- [Editions and supported features of SQL Server 2017](../sql-server-linux-editions-and-components-2017.md)


## Instructions

Before using the SQL Server Agent on Linux, use the following steps to enable or install it.

1. Add your hostname (with and without domain) in the `/etc/hosts` file. The following lines show an example of the format for these entries:

   ```bash
   <IP address> <hostname>
   <IP address> <hostname.domain.com>
   ```

1. Follow the instructions in one of the following sections based on your version of SQL Server:

   | Versions | Instructions |
   | --- | --- |
   | SQL Server 2017 (14.x) |
 CU 4 and later versions | [Enable the SQL Server Agent](#EnableAgentAfterCU4) |
   |  SQL Server 2017 (14.x) 
 CU 3 and earlier versions | [Install the SQL Server Agent](#InstallAgentBelowCU4) |

<a id="EnableAgentAfterCU4"></a>

## Enable the SQL Server Agent

For  SQL Server 2017 (14.x) 
 CU 4 and later versions, you only need to enable the SQL Server Agent. You don't need to install a separate package.

To enable SQL Server Agent, follow these steps.

```bash
sudo /opt/mssql/bin/mssql-conf set sqlagent.enabled true
sudo systemctl restart mssql-server
```

If you upgrade from  SQL Server 2017 (14.x) 
 CU 3 or an earlier version with Agent installed, SQL Server Agent is enabled automatically, and previous Agent packages are uninstalled.

> **Note:**  
> SQL Server Management Studio Object Explorer doesn't display the contents of the SQL Server Agent node unless the [Agent XPs](../../database-engine/configure-windows/agent-xps-server-configuration-option.md) server configuration option is enabled, regardless of the SQL Server Agent service state.

<a id="InstallAgentBelowCU4"></a>

## Install the SQL Server Agent

For  SQL Server 2017 (14.x) 
 CU 3 and earlier versions, you must install the SQL Server Agent package.

The following installation instructions apply to  SQL Server 2017 (14.x) 
 CU 3 and earlier versions only. Before you install SQL Server Agent, first [install SQL Server](setup.md#platforms), which configures the keys and repositories you need when you install the **mssql-server-agent** package.

Install the SQL Server Agent for your platform.

### [Red Hat Enterprise Linux (RHEL)](#tab/rhel)

Use the following steps to install the **mssql-server-agent** on Red Hat Enterprise Linux.

```bash
sudo yum install mssql-server-agent
sudo systemctl restart mssql-server
```

If **mssql-server-agent** is installed, you can update to the latest version with the following commands:

```bash
sudo yum check-update
sudo yum update mssql-server-agent
sudo systemctl restart mssql-server
```

If you need an offline installation, locate the SQL Server Agent package download in the [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md). Then use the same offline installation steps described in the article [Install SQL Server](setup.md#offline).

### [Ubuntu](#tab/ubuntu)

Use the following steps to install the **mssql-server-agent** on Ubuntu.

```bash
sudo apt-get update
sudo apt-get install mssql-server-agent
sudo systemctl restart mssql-server
```

If **mssql-server-agent** is installed, you can update to the latest version with the following commands:

```bash
sudo apt-get update
sudo apt-get install mssql-server-agent
sudo systemctl restart mssql-server
```

If you need an offline installation, locate the SQL Server Agent package download in the [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md). Then use the same offline installation steps described in the article [Install SQL Server](setup.md#offline).

### [SUSE Linux Enterprise Server (SLES)](#tab/sles)

Use the following steps to install the **mssql-server-agent** on SUSE Linux Enterprise Server.

> **Note:**  
> Starting in  SQL Server 2025 (17.x) 
, SUSE Linux Enterprise Server (SLES) isn't supported.

Install **mssql-server-agent**

```bash
sudo zypper install mssql-server-agent
sudo systemctl restart mssql-server
```

If **mssql-server-agent** is installed, you can update to the latest version with the following commands:

```bash
sudo zypper refresh
sudo zypper update mssql-server-agent
sudo systemctl restart mssql-server
```

If you need an offline installation, locate the SQL Server Agent package download in the [Release information for SQL Server on Linux](../sql-server-linux-release-notes.md). Then use the same offline installation steps described in the article [Install SQL Server](setup.md#offline).

---

## Related content

- [Create and run SQL Server Agent jobs on Linux](../sql-server-linux-run-sql-server-agent-job.md)
