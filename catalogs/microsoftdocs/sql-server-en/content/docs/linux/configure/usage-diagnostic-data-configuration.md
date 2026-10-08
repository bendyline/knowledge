---
title: Configure Usage and Diagnostic Data Collection for SQL Server on Linux
description: Describes how SQL Server customer usage and diagnostic data is collected and configured on Linux.
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: how-to
ms.custom:
  - linux-related-content
  - build-2025
  - sfi-ropc-blocked
---
# Configure usage and diagnostic data collection for SQL Server on Linux


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


By default,  Microsoft 
 collects information about how its customers use  SQL Server 
. Specifically,  SQL Server 
 collects information about the installation experience, usage, and performance. This information helps  Microsoft 
 improve the product to better meet customer needs. For example,  Microsoft 
 collects information about what kinds of error codes customers encounter so that we can fix related bugs, improve our documentation about how to use  SQL Server 
, and determine whether features should be added to the product to better serve customers.

This article provides details about what kind of information is collected, and about how to configure  SQL Server 
 on Linux to send that collected information to  Microsoft 
.  SQL Server 
 includes a privacy statement that explains what information we do and don't collect from users. For more information, see the [privacy statement](../../sql-server/sql-server-privacy.md).

Specifically,  SQL Server 
 doesn't collect or send any of the following types of information through this mechanism:

- Any values from inside user tables
- Any sign-in credentials or other authentication information
- Personal data

 SQL Server 
 always collects and sends information about the installation experience from the setup process so that we can quickly find and fix any installation problems that the customer is experiencing.  SQL Server 
 can be configured not to send information (on a per-server instance basis) to  Microsoft 
 through the [mssql-conf](mssql-conf.md) configuration script, which installs with  SQL Server 
 for Red Hat Enterprise Linux, SUSE Linux Enterprise Server, and Ubuntu.

> **Note:**  
> You can disable the sending of information to  Microsoft 
 only in paid versions of  SQL Server 
.

## Disable usage and diagnostic data collection

This option lets you choose whether  SQL Server 
 sends usage and diagnostic data to  Microsoft 
. By default, this value is set to `true`. To change the value, run the following commands:

> **Important:**  
> You can't turn off sending usage and diagnostic data for free editions of  SQL Server 
, Express and Developer.

### On Red Hat, SUSE, and Ubuntu

1. Run the **`mssql-conf`** script as root with the `set` command for `telemetry.customerfeedback`. The following example turns off usage and diagnostic data collection by specifying `false`.

   ```bash
   sudo /opt/mssql/bin/mssql-conf set telemetry.customerfeedback false
   ```

1. Restart the  SQL Server 
 service:

   ```bash
   sudo systemctl restart mssql-server
   ```

### In a Linux container

To disable usage and diagnostic data collection in a Linux container, you must have the container [persist your data](../containers/deploy.md).

<!--SQL Server 2017 on Linux -->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

1. Add an `mssql.conf` file with the lines `[telemetry]` and `customerfeedback = false` in the host directory:

   ```bash
   echo '[telemetry]' >> <host directory>/mssql.conf
   ```

   ```bash
   echo 'customerfeedback = false' >> <host directory>/mssql.conf
   ```

1. Run the container image:

   > **Important:**  
   > The `SA_PASSWORD` environment variable is deprecated. Use `MSSQL_SA_PASSWORD` instead.

   ```bash
   docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2017-latest
   ```

   ```powershell
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2017-latest
   ```


<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

1. Add an `mssql.conf` file with the lines `[telemetry]` and `customerfeedback = false` in the host directory:

   ```bash
   echo '[telemetry]' >> <host directory>/mssql.conf
   ```

   ```bash
   echo 'customerfeedback = false' >> <host directory>/mssql.conf
   ```

1. Run the container image:

   > **Important:**  
   > The `SA_PASSWORD` environment variable is deprecated. Use `MSSQL_SA_PASSWORD` instead.

   ```bash
   docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2019-latest
   ```

   ```powershell
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2019-latest
   ```


<!--SQL Server 2022 on Linux-->
**Applies to: \>=sql-server-linux-ver16 || >=sql-server-ver16**

1. Add an `mssql.conf` file with the lines `[telemetry]` and `customerfeedback = false` in the host directory:

   ```bash
   echo '[telemetry]' >> <host directory>/mssql.conf
   ```

   ```bash
   echo 'customerfeedback = false' >> <host directory>/mssql.conf
   ```

1. Run the container image:

   > **Important:**  
   > The `SA_PASSWORD` environment variable is deprecated. Use `MSSQL_SA_PASSWORD` instead.

   ```bash
   docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2022-latest
   ```

   ```powershell
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2022-latest
   ```



> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


## Local Audit for SQL Server on Linux usage and diagnostic data collection

 SQL Server 
 contains Internet-enabled features that can collect and send information about your computer or device ("standard computer information") to  Microsoft 
. The Local Audit component of  SQL Server 
 usage and diagnostic data collection can write data collected by the service to a designated folder, representing the data (logs) that is sent to  Microsoft 
. The purpose of the Local Audit is to allow customers to see all data  Microsoft 
 collects with this feature, for compliance, regulatory or privacy validation reasons.

In  SQL Server 
 on Linux, Local Audit is configurable at instance level for  SQL Server 
 Database Engine. Other  SQL Server 
 components and  SQL Server 
 Tools don't have Local Audit capability for usage and diagnostic data collection.

### Enable Local Audit

This option enables Local Audit and lets you set the directory where the Local Audit logs are created.

1. Create a target directory for new Local Audit logs. The following example creates a new `/tmp/audit` directory:

   ```bash
   sudo mkdir /tmp/audit
   ```

1. Change the owner and group of the directory to the `mssql` user:

   ```bash
   sudo chown mssql /tmp/audit
   sudo chgrp mssql /tmp/audit
   ```

1. Run the **`mssql-conf`** script as root with the `set` command for `telemetry.userrequestedlocalauditdirectory`:

   ```bash
   sudo /opt/mssql/bin/mssql-conf set telemetry.userrequestedlocalauditdirectory /tmp/audit
   ```

1. Restart the  SQL Server 
 service:

   ```bash
   sudo systemctl restart mssql-server
   ```

### In a Linux container

To enable Local Audit in a Linux container, you must have the container [persist your data](../containers/deploy.md).

<!--SQL Server 2017 on Linux -->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

1. The target directory for new Local Audit logs will be in the container. Create a target directory for new Local Audit logs in the host directory on your machine. The following example creates a new `/audit` directory:

   ```bash
   sudo mkdir <host directory>/audit
   ```

1. Add an `mssql.conf` file with the lines `[telemetry]` and `userrequestedlocalauditdirectory = /var/opt/mssql/audit` in the host directory:

   ```bash
   echo '[telemetry]' >> <host directory>/mssql.conf
   ```

   ```bash
   echo 'userrequestedlocalauditdirectory = /var/opt/mssql/audit' >> <host directory>/mssql.conf
   ```

1. Run the container image:

   ```bash
   docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2017-latest
   ```

   ```powershell
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2017-latest
   ```


<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

1. The target directory for new Local Audit logs will be in the container. Create a target directory for new Local Audit logs in the host directory on your machine. The following example creates a new `/audit` directory:

   ```bash
   sudo mkdir <host directory>/audit
   ```

1. Add an `mssql.conf` file with the lines `[telemetry]` and `userrequestedlocalauditdirectory = /var/opt/mssql/audit` in the host directory:

   ```bash
   echo '[telemetry]' >> <host directory>/mssql.conf
   ```

   ```bash
   echo 'userrequestedlocalauditdirectory = /var/opt/mssql/audit' >> <host directory>/mssql.conf
   ```

1. Run the container image:

   ```bash
   docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2019-latest
   ```

   ```powershell
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2019-latest
   ```


<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

1. The target directory for new Local Audit logs will be in the container. Create a target directory for new Local Audit logs in the host directory on your machine. The following example creates a new `/audit` directory:

   ```bash
   sudo mkdir <host directory>/audit
   ```

1. Add an `mssql.conf` file with the lines `[telemetry]` and `userrequestedlocalauditdirectory = /var/opt/mssql/audit` in the host directory:

   ```bash
   echo '[telemetry]' >> <host directory>/mssql.conf
   ```

   ```bash
   echo 'userrequestedlocalauditdirectory = /var/opt/mssql/audit' >> <host directory>/mssql.conf
   ```

1. Run the container image:

   ```bash
   docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2022-latest
   ```

   ```powershell
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2022-latest
   ```


<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

1. The target directory for new Local Audit logs will be in the container. Create a target directory for new Local Audit logs in the host directory on your machine. The following example creates a new `/audit` directory:

   ```bash
   sudo mkdir <host directory>/audit
   ```

1. Add an `mssql.conf` file with the lines `[telemetry]` and `userrequestedlocalauditdirectory = /var/opt/mssql/audit` in the host directory:

   ```bash
   echo '[telemetry]' >> <host directory>/mssql.conf
   ```

   ```bash
   echo 'userrequestedlocalauditdirectory = /var/opt/mssql/audit' >> <host directory>/mssql.conf
   ```

1. Run the container image:

   ```bash
   docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=<password>' -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2025-latest
   ```

   ```powershell
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" -p 1433:1433 -v <host directory>:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2025-latest
   ```



> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


## Related content

- [What is SQL Server on Linux?](../sql-server-linux-overview.md)
