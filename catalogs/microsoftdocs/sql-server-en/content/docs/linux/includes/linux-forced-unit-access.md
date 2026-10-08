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
Some supported Linux distributions implement Forced Unit Access (FUA) at the I/O subsystem level to ensure data durability.  SQL Server 
 leverages this capability to provide efficient and reliable I/O performance for Linux workloads. For more information about FUA support across Linux distributions and its effect on  SQL Server 
, see [SQL Server on Linux: Forced Unit Access (FUA) Internals](https://techcommunity.microsoft.com/blog/sqlserver/sql-server-on-linux-forced-unit-access-fua-internals/3199102).

Support for FUA in the I/O subsystem was introduced in SUSE Linux Enterprise Server 12 SP5, Red Hat Enterprise Linux 8.0, and Ubuntu 18.04. In  SQL Server 2017 (14.x) 
 CU 6 and later versions, use the following configuration to enable high performing and efficient I/O with FUA in  SQL Server 
.

Use this recommended configuration if the following conditions are met:

-  SQL Server 2017 (14.x) 
 CU 6 and later versions

- Linux distribution and version that supports FUA capability (starting with Red Hat Enterprise Linux 8.0, SUSE Linux Enterprise Server 12 SP5, or Ubuntu 18.04)

  > **Note:**  
  > Starting in  SQL Server 2025 (17.x) 
, SUSE Linux Enterprise Server (SLES) isn't supported.

- **XFS** file system for  SQL Server 
 storage, on Linux kernel 4.18 or later versions.

- **ext4** file system for  SQL Server 
 storage, on Linux kernel 5.6 or later versions.

  > **Note:**  
  > Use the **XFS** file system for hosting  SQL Server 
 data and transaction log files when the Linux kernel version is lower than 5.6. Starting with the kernel version 5.6, you can choose between **XFS** and **ext4** based on your specific requirements.

- Storage subsystem and hardware that supports and is configured for FUA capability

Recommended configuration:

1. Enable trace flag 3979 as a startup parameter.

1. Use **`mssql-conf`** to configure `control.writethrough = 1` and `control.alternatewritethrough = 0`.

For almost all other configurations that don't meet the previous conditions, use the following recommended configuration:

1. Enable trace flag 3982 as a startup parameter (which is the default for  SQL Server 
 in the Linux ecosystem), and make sure that trace flag 3979 isn't enabled as a startup parameter.

1. Use **`mssql-conf`** to configure `control.writethrough = 1` and `control.alternatewritethrough = 1`.

#### FUA support for SQL Server containers deployed in Kubernetes

1. The  SQL Server 
 must use persisted mounted storage, and not `overlayfs`.

1. The storage must use the **XFS** or **ext4** filesystems and should support FUA (**ext4** doesn't support FUA on the Linux kernel earlier than version 5.6). Before enabling this setting, work with your Linux distribution and storage vendor to ensure that the OS and storage subsystem supports FUA options. On Kubernetes, you can query for the filesystem type using the following command, where `<pvc-name>` is your `PersistentVolumeClaim`:

   ```bash
   kubectl describe pv <pvc-name>
   ```

   In the output, look for the `fstype` that is set to XFS.

1. The worker node hosting the  SQL Server 
 pods should use a Linux distribution and version that supports FUA capability (starting with Red Hat Enterprise Linux 8.0, SUSE Linux Enterprise Server 12 SP5, or Ubuntu 18.04).

If the preceding conditions are met, use the following recommended FUA settings:

1. Enable trace flag 3979 as a startup parameter.

1. Use **`mssql-conf`** to configure `control.writethrough = 1` and `control.alternatewritethrough = 0`.
