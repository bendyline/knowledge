---
title: Configure Persistent Memory (PMEM) on Linux
description: Learn how to configure persistent memory (PMEM) for SQL Server on Linux, and how to create namespaces for PMEM devices
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: derekw, amitkh, atsingh
ms.date: 08/11/2026
ms.service: sql
ms.subservice: linux
ms.topic: how-to
ms.custom:
  - linux-related-content
  - build-2025
monikerRange: ">=sql-server-linux-ver15 || >=sql-server-ver15"
---

# Configure persistent memory (PMEM) for SQL Server on Linux


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article describes how to configure persistent memory (PMEM) for  SQL Server 2019 (15.x) 
 and later versions on Linux.

## Overview

 SQL Server 2019 (15.x) 
 adds persistent memory support to accelerate several storage-intensive operations.

With a PMEM-aware file system, memory mapping (`mmap()`) gives user-space applications direct access to file data. When a memory map is created for a file, the application can issue load/store instructions that bypass the storage layer.

> **Note:**  
> This direct access is called an *enlightened* file access method from the perspective of the host extension application, which is how SQL Server interacts with the host operating system, using the SQL Platform Abstraction Layer (SQLPAL).

This article shows you how to configure persistent memory for  SQL Server 
 on Linux.

## Create namespaces for PMEM devices

### Configure the devices

In Linux, use the `ndctl` utility.

- Install `ndctl` to configure PMEM device from [Installing NDCTL](https://docs.pmem.io/persistent-memory/getting-started-guide/installing-ndctl).
- Use `ndctl` to create a namespace. Namespaces are interleaved across PMEM NVDIMMs and can provide different types of user-space access to memory regions on the device. `fsdax` is default and desired mode for  SQL Server 
.

```bash
ndctl create-namespace -f -e namespace0.0 --mode=fsdax --map=dev
```

The `fsdax` mode stores per-page metadata in system memory. The `--map=dev` option is recommended because it stores the metadata on the namespace directly. Storing metadata in memory with `--map=mem` is experimental.

Use `ndctl` to verify the namespace.

Sample output follows:

```bash
# ndctl list -N
{
  "dev":"namespace0.0",
  "mode":"fsdax",
  "map":"dev",
  "size":4294967296,
  "sector_size":512,
  "blockdev":"pmem0",
  "numa_node":0
}
```

### Create and mount PMEM device

For example, with **XFS**:

```bash
mkfs.xfs -f /dev/pmem0
mount -o dax,noatime /dev/pmem0 /mnt/dax
xfs_io -c "extsize 2m" /mnt/dax
```

For example, with **ext4**:

```bash
mkfs.ext4 -b 4096 -E stride=512 -F /dev/pmem0
mount -o dax,noatime /dev/pmem0 /mnt/dax
```

## Technical considerations

- Block allocation of 2 MB for either XFS or ext4, as described previously
- Misalignment between block allocation and `mmap` results in silent fallback to 4 KB
- File sizes should be a multiple of 2 MB (modulo 2 MB)
- Don't disable transparent huge pages (THP) (enabled by default on most distributions)

After you use `ndctl` to configure, create, and mount the device, you can place database files in it or create a new database.

You can store the  SQL Server 
 data files (`.mdf`, `.ndf`) and `tempdb` files on a PMEM device in `fsdax` mode with the following command. Don't use this mode to store the  SQL Server 
 log (`.ldf`) files, because the transaction log requires storage that provides sector atomic guarantees:

```bash
ndctl create-namespace -f -e namespace0.0 --mode=fsdax --map=dev
```

Before you set the map option in the preceding command, keep the following points in mind:

- For best performance when accessing and updating these NVDIMM page entries for this device, use `--map=mem`
- If the capacity of the NVDIMM is too large (greater than 512 GB), set `--map=dev`, which affects I/O throughput and reduces performance

For  SQL Server 
 log files on PMEM devices, configure the PMEM devices to use sector/Block Translation Table (BTT). This configuration provides the sector atomicity that  SQL Server 
 log files require for this storage technology. Perform workload performance validations. Compare the  SQL Server 
 log performance for your workload between this solution and best-in-class NVMe SSDs, and then select the one that best meets your needs.

```bash
ndctl create-namespace -f -e namespace0.0 --mode=sector
```

### Disable forced flush behavior

Because PMEM devices are `O_DIRECT` (direct I/O) safe, you can [disable the forced flush behavior](#sql-server-and-forced-unit-access-fua-io-subsystem-capability).

> **Note:**  
> A storage system can ensure that any cached or staged writes are safe and durable by guaranteeing that writes to the device reside on a medium that persists across system crashes, interface resets, and power failures, and that the medium itself is hardware redundant.

- Database (`.mdf` and `.ndf`) and transaction log (`.ldf`) files don't use `writethrough` and `alternatewritethrough` by default in  SQL Server 2017 (14.x) 
 CU 6 and later versions, because they use the forced flush behavior. Trace flag 3979 disables the forced flush behavior for database and transaction log files, and uses the `writethrough` and `alternatewritethrough` logic.

- Other files that  SQL Server 
 opens with `FILE_FLAG_WRITE_THROUGH`, such as database snapshots, internal snapshots for database consistency checks (`DBCC CHECKDB`), profiler trace files, and extended event trace files, use the `writethrough` and `alternatewritethrough` optimizations.

For more information about the changes introduced in  SQL Server 2017 (14.x) 
 CU 6, see [KB 4131496](https://support.microsoft.com/help/4131496). For more information about forced unit access (FUA) internals, see [FUA internals](https://learn.microsoft.com/archive/blogs/bobsql/sql-server-on-linux-forced-unit-access-fua-internals).

#### SQL Server and forced unit access (FUA) I/O subsystem capability

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


## Related content

- [What is SQL Server on Linux?](../sql-server-linux-overview.md)
- [Performance best practices: Storage, kernel, CPU, and network for SQL Server on Linux](performance-best-practices-operating-system.md)
- [Performance best practices: SQL Server memory on Linux](performance-best-practices-sql-server-memory.md)
