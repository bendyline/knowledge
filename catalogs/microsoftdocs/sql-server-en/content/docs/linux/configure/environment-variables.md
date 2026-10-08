---
title: Configure Environment Variables for SQL Server on Linux
description: This article describes how to use environment variables to configure specific SQL Server settings on Linux.
author: rwestMSFT
ms.author: randolphwest
ms.date: 04/27/2026
ms.service: sql
ms.subservice: linux
ms.topic: how-to
ms.custom:
  - linux-related-content
  - sfi-ropc-blocked
  - ignite-2025
---
# Configure SQL Server settings with environment variables on Linux


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


You can use several different environment variables to configure  SQL Server 
 on Linux. These variables are used in two scenarios:

- To configure initial setup with the `mssql-conf setup` command.
- To configure a new [SQL Server Linux container image](../install-upgrade/quickstart-install-docker.md).

> **Tip:**  
> If you need to configure SQL Server after these setup scenarios, see [Configure SQL Server on Linux with the mssql-conf tool](mssql-conf.md).

## Environment variables

| Environment variable | Description |
| --- | --- |
| `ACCEPT_EULA` | Sets the `ACCEPT_EULA` variable to any value to confirm your acceptance of the [End-User Licensing Agreement](https://go.microsoft.com/fwlink/?LinkId=746388). Required setting for the SQL Server image. |
| `MSSQL_SA_PASSWORD` | Configures the `sa` password.<br /><br />The `SA_PASSWORD` environment variable is deprecated. Use `MSSQL_SA_PASSWORD` instead. |
| `MSSQL_DB` | Sets the name of a database to create on container startup. |
| `MSSQL_USER` | If `MSSQL_DB` is set, sets the name of a non-`sa` user to create on container startup. The user is granted access rights on the `MSSQL_DB` database. If this variable is used, `MSSQL_PASSWORD` must also be set. If `MSSQL_DB` isn't set, this variable is ignored. |
| `MSSQL_PASSWORD` | Sets the password of the user whose name is in `MSSQL_USER`. If this variable is used, `MSSQL_USER` must also be set. If `MSSQL_DB` isn't set, this variable is ignored. |
| `MSSQL_PID` | Sets the [SQL Server edition](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/editions-and-components-of-sql-server-latest.md#sql-server-editions) or product key. Possible values are listed in the following [SQL Server editions](#sql-server-editions) table. If you specify a product key, it must be in the form of `#####-#####-#####-#####-#####`, where `#` is a number or a letter. |
| `MSSQL_LCID` | Sets the language ID to use for SQL Server. For example, 1036 is French. |
| `MSSQL_COLLATION` | Sets the default collation for SQL Server. This setting overrides the default mapping of language ID (LCID) to collation. |
| `MSSQL_MEMORY_LIMIT_MB` | Sets the maximum amount of memory (in MB) that SQL Server can use. By default, it's 80% of the total physical memory. |
| `MSSQL_TCP_PORT` | Configures the TCP port that SQL Server listens on (default 1433). |
| `MSSQL_IP_ADDRESS` | Sets the IP address. Currently, the IP address must be IPv4 style (0.0.0.0). |
| `MSSQL_BACKUP_DIR` | Sets the default backup directory location. |
| `MSSQL_DATA_DIR` | Changes the directory where the new SQL Server database data files (`.mdf`) are created. |
| `MSSQL_LOG_DIR` | Changes the directory where the new SQL Server database log files (`.ldf`) are created. |
| `MSSQL_DUMP_DIR` | Changes the directory where SQL Server deposits the memory dumps and other troubleshooting files by default. |
| `MSSQL_ENABLE_HADR` | Enables availability groups. For example, `1` enables and `0` disables the feature. |
| `MSSQL_AGENT_ENABLED` | Enables SQL Server Agent. For example, `true` enables and `false` disables the agent. By default, the agent is disabled. |
| `MSSQL_MASTER_DATA_FILE` | Sets the location of the `master` database data file. Must be named `master.mdf` until the first run of SQL Server. |
| `MSSQL_MASTER_LOG_FILE` | Sets the location of the `master` database log file. Must be named `mastlog.ldf` until the first run of SQL Server. |
| `MSSQL_ERROR_LOG_FILE` | Sets the location of the `errorlog` files. For example, `/var/opt/mssql/log/errorlog`. |

### SQL Server editions

**Applies to: <=sql-server-ver16 || <=sql-server-linux-ver16**

| `MSSQL_PID` | Edition |
| --- | --- |
| `Evaluation` | SQL Server Evaluation edition |
| `Developer` | SQL Server Developer edition |
| `Express` | SQL Server Express edition |
| `Web` | SQL Server Web edition |
| `Standard` | SQL Server Standard edition |
| `Enterprise` | This legacy option represents Enterprise edition Server + Client Access License (CAL) based licensing, and is limited to a maximum of 20 cores per SQL Server instance. `Enterprise` isn't available for new agreements. You should choose `EnterpriseCore` when you wish to deploy Enterprise edition. |
| `EnterpriseCore` | SQL Server Enterprise Core edition. `EnterpriseCore` represents the core-based server licensing model with no core limits. For more information, see [Compute capacity limits by edition of SQL Server](../../sql-server/compute-capacity-limits-by-edition-of-sql-server.md). |
| `A product key` | If you specify a product key, it must be in the form of `#####-#####-#####-#####-#####`, where `#` is a number or a letter. |

For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2022](../../sql-server/editions-and-components-of-sql-server-2022.md).




**Applies to: \>=sql-server-ver17 || >=sql-server-linux-ver17**

| `MSSQL_PID` | Edition |
| --- | --- |
| `Evaluation` | SQL Server Evaluation edition |
| `Express` | SQL Server Express edition |
| `StandardDeveloper` | SQL Server Standard Developer edition |
| `Standard` | SQL Server Standard edition |
| `EnterpriseDeveloper` | SQL Server Enterprise Developer edition |
| `Enterprise` | This legacy option represents Enterprise edition Server + Client Access License (CAL) based licensing, and is limited to a maximum of 20 cores per SQL Server instance. `Enterprise` isn't available for new agreements. You should choose `EnterpriseCore` when you wish to deploy Enterprise edition. |
| `EnterpriseCore` | SQL Server Enterprise Core edition. `EnterpriseCore` represents the core-based server licensing model with no core limits. For more information, see [Compute capacity limits by edition of SQL Server](../../sql-server/compute-capacity-limits-by-edition-of-sql-server.md). |
| `A product key` | If you specify a product key, it must be in the form of `#####-#####-#####-#####-#####`, where `#` is a number or a letter. |

For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md).




## Use with initial setup

This example runs `mssql-conf setup` with configured environment variables. The following environment variables are specified:

- `ACCEPT_EULA` accepts the end user license agreement.

- `MSSQL_PID` specifies the freely licensed Developer Edition of SQL Server for non-production use.

- `MSSQL_SA_PASSWORD` sets a strong password. Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


- `MSSQL_TCP_PORT` sets the TCP port that SQL Server listens on to 1234.

```bash
sudo ACCEPT_EULA='Y' MSSQL_PID='Developer' MSSQL_SA_PASSWORD='<password>' MSSQL_TCP_PORT=1234 /opt/mssql/bin/mssql-conf setup
```

## Use with Docker

This example `docker` command uses the following environment variables to create a new SQL Server container:

- `ACCEPT_EULA` accepts the end user license agreement.

- `MSSQL_PID` specifies the freely licensed Developer Edition of SQL Server for non-production use.

- `MSSQL_SA_PASSWORD` sets a strong password. Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


- `MSSQL_TCP_PORT` sets the TCP port that SQL Server listens on to 1234. This means that instead of mapping port 1433 (default) to a host port, the custom TCP port must be mapped with the `-p 1234:1234` command in this example.

<!--SQL Server 2017 on Linux -->
**Applies to: \=sql-server-linux-2017 || =sql-server-2017**

If you're running Docker on Linux, use the following syntax with single quotes:

```bash
docker run -e ACCEPT_EULA=Y -e MSSQL_PID='Developer' -e MSSQL_SA_PASSWORD='<password>' -e MSSQL_TCP_PORT=1234 -p 1234:1234 -d mcr.microsoft.com/mssql/server:2017-latest
```

If you're running Docker on Windows, use the following syntax with double quotes:

```bash
docker run -e ACCEPT_EULA=Y -e MSSQL_PID="Developer" -e MSSQL_SA_PASSWORD="<password>" -e MSSQL_TCP_PORT=1234 -p 1234:1234 -d mcr.microsoft.com/mssql/server:2017-latest
```

> **Note:**  
> The process for running production editions in containers is slightly different. For more information, see [Run production container images](../containers/deploy.md#production).



<!--SQL Server 2019 on Linux-->
**Applies to: \=sql-server-linux-ver15 || =sql-server-ver15**

If you're running Docker on Linux, use the following syntax with single quotes:

```bash
docker run -e ACCEPT_EULA=Y -e MSSQL_PID='Developer' -e MSSQL_SA_PASSWORD='<password>' -e MSSQL_TCP_PORT=1234 -p 1234:1234 -d mcr.microsoft.com/mssql/server:2019-latest
```

If you're running Docker on Windows, use the following syntax with double quotes:

```bash
docker run -e ACCEPT_EULA=Y -e MSSQL_PID="Developer" -e MSSQL_SA_PASSWORD="<password>" -e MSSQL_TCP_PORT=1234 -p 1234:1234 -d mcr.microsoft.com/mssql/server:2019-latest
```



<!--SQL Server 2022 on Linux-->
**Applies to: \=sql-server-linux-ver16 || =sql-server-ver16**

If you're running Docker on Linux, use the following syntax with single quotes:

```bash
docker run -e ACCEPT_EULA=Y -e MSSQL_PID='Developer' -e MSSQL_SA_PASSWORD='<password>' -e MSSQL_TCP_PORT=1234 -p 1234:1234 -d mcr.microsoft.com/mssql/server:2022-latest
```

If you're running Docker on Windows, use the following syntax with double quotes:

```bash
docker run -e ACCEPT_EULA=Y -e MSSQL_PID="Developer" -e MSSQL_SA_PASSWORD="<password>" -e MSSQL_TCP_PORT=1234 -p 1234:1234 -d mcr.microsoft.com/mssql/server:2022-latest
```



<!--SQL Server 2025 on Linux-->
**Applies to: \>=sql-server-linux-ver17 || >=sql-server-ver17**

If you're running Docker on Linux, use the following syntax with single quotes:

```bash
docker run -e ACCEPT_EULA=Y -e MSSQL_PID='Developer' -e MSSQL_SA_PASSWORD='<password>' -e MSSQL_TCP_PORT=1234 -p 1234:1234 -d mcr.microsoft.com/mssql/server:2025-latest
```

If you're running Docker on Windows, use the following syntax with double quotes:

```bash
docker run -e ACCEPT_EULA=Y -e MSSQL_PID="Developer" -e MSSQL_SA_PASSWORD="<password>" -e MSSQL_TCP_PORT=1234 -p 1234:1234 -d mcr.microsoft.com/mssql/server:2025-latest
```



> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


## Related content

- [Configure SQL Server on Linux with the mssql-conf tool](mssql-conf.md)
- [Installation guidance for SQL Server on Linux](../install-upgrade/setup.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](../../sql-server/sql-server-docs-contribute.md).
