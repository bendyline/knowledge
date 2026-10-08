---
title: Compute Capacity Limits by Edition of SQL Server
description: This article discusses compute capacity limits for SQL Server 2019 and how they differ in physical and virtualized environments with simultaneous multithreading (SMT) processors.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest, derekw
ms.date: 08/13/2026
ms.service: sql
ms.subservice: release-landing
ms.topic: concept-article
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "simultaneous multithreading [SQL Server]"
  - "SMT [SQL Server]"
  - "hyper-threading [SQL Server]"
  - "processors [SQL Server], supported"
  - "number of processors supported"
  - "maximum number of processors supported"
---
# Compute capacity limits by edition of SQL Server


**Applies to:**
 

](sql-docs-navigation-guide.md#applies-to)
 

This article discusses compute capacity limits for editions of  SQL Server 
 and how they differ in physical and virtualized environments with simultaneous multithreading (SMT) processors. On Intel CPUs, SMT is called *Hyper-Threading*.

## Overview

Diagram showing the mappings to compute capacity limits.

This table describes the notations in the preceding diagram:

| Value | Description |
| --- | --- |
| 0..1 | Zero or one |
| 1 | Exactly one |
| 1..* | One or more |
| 0..* | Zero or more |
| 1..2 | One or two |

To elaborate further:

- A virtual machine (VM) has one or more virtual processors.
- One or more virtual processors are allocated to exactly one virtual machine.
- Zero or one virtual processor is mapped to zero or more logical processors. When the mapping of virtual processors to logical processors is:
  - One to zero: represents an unbound logical processor not used by the guest operating systems.
  - One to many: represents an overcommit.
  - Zero to many: represents the absence of virtual machine on the host system. So VMs don't use any logical processors.
- A socket is mapped to zero or more cores. When the socket-to-core mapping is:
  - One to zero: represents an empty socket. No chip is installed.
  - One to one: represents a single-core chip installed in the socket. This mapping is rare these days.
  - One to many: represents a multi-core chip installed in the socket. Typical values are 2, 4, and 8.
- A core is mapped to one or two logical processors. When the mapping of cores to logical processors is:
  - One to one: SMT is off.
  - One to two: SMT is on.

The following definitions apply to the terms used in this article:

- A thread or logical processor is one logical computing engine from the perspective of  SQL Server 
, the operating system, an application, or a driver.

- A core is a processor unit. It can consist of one or more logical processors.

- A physical processor can consist of one or more cores. A physical processor is the same as a processor package or a socket.

<a id="numa-64"></a>

<a id="breaking-change-in-sql-server-2022-cumulative-update-11"></a>

<a id="reduce-logical-core-count-per-numa-node"></a>

## Limit number of logical cores per NUMA node to 64

 SQL Server 
 doesn't currently support more than 64 logical cores per NUMA node. If you run  SQL Server 
 on a machine that exceeds this limit, you can experience stack dumps and other reliability issues. A BIOS or firmware configuration can reduce the logical core count presented to the operating system to a maximum of 64 logical processors per NUMA node for a supported  SQL Server 
 configuration.

> **Caution:**  
> To avoid reliability issues,  SQL Server 2022 (16.x) 
 Cumulative Update 11 introduced a breaking change, where the  Database Engine 
 doesn't start if it detects a configuration that can exceed 64 logical cores per NUMA node.
>
> Starting from  SQL Server 2022 (16.x) 
 Cumulative Update 15, Setup produces a warning that this configuration is unsupported and will result in the  Database Engine 
 service being stopped and disabled. The warning is also included in Setup logs.

In Azure Virtual Machines, you can reduce the logical core count per NUMA node by [disabling SMT](#disable-smt-in-an-azure-virtual-machine).

For bare-metal machines, you can [reduce the logical core count](#reduce-logical-core-count-on-bare-metal-instances) with sub-NUMA clustering (SNC) or Nodes per Socket (NPS) options.

On certain bare-metal machines, you might be able to disable the SNC or NPS option after installing  SQL Server 
 and create a configuration with more than 64 logical cores per NUMA node. These configurations are unsupported.

<a id="disable-smt-in-a-virtual-machine"></a>

### Disable SMT in an Azure Virtual Machine

 SQL Server 
 has a supported limit of 64 logical cores per NUMA node. In some cases, the Azure Mv3-series VM might exceed this limit, which prevents  SQL Server 
 from starting, or allowing it to run with degraded performance. To disable SMT, make the following changes using **PowerShell** and the **Registry Editor** (`reg.exe`). Be sure to back up your registry before editing it.

1. Check the number of logical cores. SMT is enabled if the ratio is 2:1 (the number of logical cores is twice the number of cores).

   ```powershell
   Get-CimInstance -ClassName Win32_Processor | Select-Object -Property "NumberOfCores", "NumberOfLogicalProcessors"
   ```

1. Disable SMT with the following two registry changes, then reboot the VM.

   ```cmd
   reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management" /v FeatureSettingsOverride /t REG_DWORD /d 8264 /f
   reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management" /v FeatureSettingsOverrideMask /t REG_DWORD /d 3 /f
   ```

1. Check the number of logical cores once again. The number of logical cores should match the number of cores.

   ```powershell
   Get-CimInstance -ClassName Win32_Processor | Select-Object -Property "NumberOfCores", "NumberOfLogicalProcessors"
   ```

### Reduce logical core count on bare-metal instances

The following sections describe how to reduce the logical core count on bare-metal instances of  SQL Server 
.

#### Intel Xeon CPU

On third, fourth, and fifth generation **Intel Xeon CPUs**, you can enable sub-NUMA clustering (SNC), formerly called Cluster-on-Die (CoD), resulting in two NUMA domains within a single physical socket.

> **Note:**  
> Sixth generation Intel Xeon CPUs come with sub-NUMA clustering (SNC2 or SNC3) enabled by default. In some CPU models, the default SNC configuration could result in more than 64 logical processors per NUMA node. You should activate the Intel virtual NUMA feature in the BIOS/firmware, alongside SNC2 or SNC3, for these CPU models.

| Configuration&nbsp;setting | Description |
| --- | --- |
| SNC disabled <sup>1</sup> | Disables sub-NUMA clustering. |
| SNC2 enabled <sup>2</sup> | Presents two NUMA nodes per socket. |
| SNC3 enabled <sup>2</sup> | Presents three NUMA nodes per socket. |
| Intel VirtualNuma enabled <sup>3</sup> | Creates multiple virtual nodes within a single physical NUMA node. |

<sup>1</sup> Default for third, fourth, and fifth generation Intel Xeon CPUs.

<sup>2</sup> Default for sixth generation Intel Xeon CPUs and later.

<sup>3</sup> Only available on sixth generation Intel Xeon CPUs and later. Use this setting for high core count CPUs, where the number of logical processors per NUMA node exceeds 64 when using the SNC defaults.

#### AMD CPU

On **AMD CPUs**, you can enable various Nodes per Socket (NPS) options.

| Configuration&nbsp;setting | Description |
| --- | --- |
| `NPS0` | In a dual socket system, NUMA presents as a single node with all memory channels interleaved across the node. |
| `NPS1` (default) | This configuration presents one NUMA node per socket. |
| `NPS2` | This configuration presents two NUMA nodes per socket, similar to SNC. |
| `NPS4` | This configuration presents four NUMA nodes per socket. |

## Remarks

Systems with more than one physical processor or systems with physical processors that have multiple cores and/or SMT enable the operating system to execute multiple tasks simultaneously. Each thread of execution appears as a logical processor. For example, if your computer has two quad-core processors with SMT enabled and two threads per core, you have 16 logical processors: 2 processors x 4 cores per processor x 2 threads per core. It's worth noting that:

- The compute capacity of a logical processor from a single thread of an SMT core is less than the compute capacity of a logical processor from that same core with SMT disabled.

- The compute capacity of the two logical processors in the SMT core is greater than the compute capacity of the same core with SMT disabled.

Each edition of  SQL Server 
 has two compute capacity limits:

- A maximum number of sockets (or physical processors or processor packages)

- A maximum number of cores as reported by the operating system

These limits apply to a single instance of  SQL Server 
. They represent the maximum compute capacity that a single instance uses. They don't constrain the server where the instance might be deployed. In fact, deploying multiple instances of  SQL Server 
 on the same physical server is an efficient way to use the compute capacity of a physical server with more sockets and/or cores than the capacity limits allow.

The following table specifies the compute capacity limits for a single instance of each edition of  SQL Server 
:

|  SQL Server 
 edition | Maximum compute capacity for a single instance ( SQL Server 
  Database Engine 
) | Maximum compute capacity for a single instance (AS, RS) |
| --- | --- | --- |
| Enterprise edition: Core-based licensing <sup>1</sup> | Operating system maximum | Operating system maximum |
| Developer | Operating system maximum | Operating system maximum |
| Standard <sup>2</sup> | Limited to lesser of 4 sockets or 32 cores | Limited to lesser of 4 sockets or 32 cores |
| Express | Limited to lesser of 1 socket or 4 cores | Limited to lesser of 1 socket or 4 cores |

<sup>1</sup> Enterprise edition with Server + Client Access License (CAL) licensing is limited to 20 cores per  SQL Server 
 instance. (This licensing isn't available for new agreements.) There are no limits under the Core-based Server Licensing model.

<sup>2</sup> In  SQL Server 2022 (16.x) 
 and earlier versions, the limit is the lesser of 4 sockets or 24 cores.

In a virtualized environment, the compute capacity limit is based on the number of logical processors, not cores. The reason is that the processor architecture isn't visible to the guest applications.

For example, a server that has four sockets populated with quad-core processors and the ability to enable two SMT threads per core contains 32 logical processors with SMT enabled. But it contains only 16 logical processors with SMT disabled. These logical processors can be mapped to virtual machines on the server. The virtual machines' compute load on that logical processor is mapped to a thread of execution on the physical processor in the host server.

You might want to disable SMT when the performance for each virtual processor is important. You can configure SMT by using a BIOS setting for the processor during the BIOS setup, but it's typically a server-scoped operation that affects all workloads running on the server. You might consider separating workloads that run in virtualized environments, from workloads that would benefit from the SMT performance boost in a physical operating system environment.

## Related content

- [Editions and supported features of SQL Server](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/editions-and-components-of-sql-server-latest.md)
- [Maximum capacity specifications for SQL Server](maximum-capacity-specifications-for-sql-server.md)
- [SQL Server installation guide](../database-engine/install-windows/install-sql-server.md)


##  Get help

- [Ideas for SQL: Have suggestions for improving SQL Server?](https://feedback.azure.com/forums/908035-sql-server)
- [Microsoft Q & A (SQL Server)](https://learn.microsoft.com/answers/products/sql-server)
- [DBA Stack Exchange (tag sql-server): Ask SQL Server questions](https://dba.stackexchange.com/questions/tagged/sql-server)
- [Stack Overflow (tag sql-server): Answers to SQL development questions](https://stackoverflow.com/questions/tagged/sql-server)
- [Microsoft SQL Server License Terms and Information](https://www.microsoft.com/licensing/product-licensing/sql-server)
- [Support options for business users](https://support.microsoft.com/support-for-business)
- [Additional SQL Server help and feedback](sql-server-get-help.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](sql-server-docs-contribute.md).
