---
title: Overview of Azure Boost
description: Learn more about how Azure Boost can Learn more about how Azure Boost can improve security and performance of your virtual machines.
author: mattmcinnes
ms.service: azure-virtual-machines
ms.topic: overview
ms.custom:
  - ignite-2023
ms.date: 03/18/2025
ms.author: mattmcinnes
ms.reviewer: mattmcinnes
#Customer intent: I want to improve the security and performance of my Azure virtual machines
# Customer intent: "As a cloud architect, I want to implement Azure Boost for my virtual machines, so that I can enhance their performance and security while optimizing resource usage."
---

# Microsoft Azure Boost

**Applies to:** :heavy_check_mark: Linux VMs :heavy_check_mark: Windows VMs :heavy_check_mark: Sizes

Azure Boost is a system designed by Microsoft that offloads server virtualization processes traditionally performed by the hypervisor and host OS onto purpose-built software and hardware. This offloading frees up CPU resources for the guest virtual machines, resulting in improved performance. Azure Boost also provides a secure foundation for your cloud workloads. Microsoft's in-house developed hardware and software systems provide a secure environment for your virtual machines.

## Benefits

Azure Boost contains several features that can improve the performance and security of your virtual machines. These features are available on select [Azure Boost compatible virtual machine sizes](overview.md#current-availability).

- **Networking:** Azure Boost includes a suite of software and hardware networking systems that provide a significant boost to both network performance (Up to 200-Gbps network bandwidth) and network security. Azure Boost compatible virtual machine hosts contain the new [Microsoft Azure Network Adapter (MANA)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/accelerated-networking-mana-overview.md). Learn more about [Azure Boost networking](overview.md#networking).

- **Storage:** Storage processing operations are offloaded to the Azure Boost FPGA. This offload to FPGA provides leading efficiency and performance while improving security, reducing jitter, and improving latency for workloads. Local storage now runs at up to 36GBps throughput and 6.6 million IOPS, and with remote storage up to 14GBps throughput and 750K IOPS. Learn more about [Azure Boost Storage](overview.md#storage).

- **Security:** Azure Boost uses [Cerberus](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security/fundamentals/project-cerberus.md) as an independent HW Root of Trust to achieve NIST 800-193 certification. Customer workloads can't run on Azure Boost powered architecture unless the firmware and software running on the system is trusted. Learn more about [Azure Boost Security](overview.md#security).

- **Performance:** With Azure Boost offloading storage and networking, CPU resources are freed up for increased virtualization performance. Resources that would normally be used for these essential background tasks are now available to the guest VM. Learn more about [Azure Boost Performance](overview.md#performance).

## Networking
The next generation of Azure Boost will introduce the [Microsoft Azure Network Adapter (MANA)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/accelerated-networking-mana-overview.md). This network interface card (NIC) includes the latest hardware acceleration features and provides competitive performance with a consistent driver interface. This custom hardware and software implementation ensures optimal networking performance, tailored specifically for Azure's demands. MANA's features are designed to enhance your networking experience with: 
- **Over 200-Gbps of network bandwidth:**
Custom hardware and software drivers facilitating faster and more efficient data transfers. Starting up to 200Gbps network bandwidth with increases in the future.

- **High network availability and stability:** 
With an active/active network connection to the Top of Rack (ToR) switch, Azure Boost ensures your network is always up and running at the highest possible performance.  

- **Native support for DPDK:**
Learn more about Azure Boost's support for [Data Plane Development Kit (DPDK) on Linux VMs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/setup-dpdk-mana.md). 

- **Consistent driver interface:**
Assuring a one-time transition that won't be disrupted during future hardware changes.

- **Integration with future Azure features:**
Consistent updates and performance enhancements ensures you're always a step ahead.

Diagram showing the networking layout of an Azure Boost host with a connected MANA NIC.

## Storage
Azure Boost architecture offloads storage covering local, remote and cached disks that provide leading efficiency and performance while improving security, reducing jitter & improving latency for workloads. Azure Boost already provides acceleration for workloads in the fleet using remote storage including specialized workloads such as the Ebsv5 VM types. Also, these improvements provide potential cost saving for customers by consolidating existing workload into fewer or smaller sized VMs. 

Azure Boost delivers industry leading throughput performance at up to 14GBps throughput and 750K IOPS for remote disk access performance. This performance is enabled by accelerated storage processing and exposing NVMe disk interfaces to VMs. Storage processing tasks are offloaded from the host processor to dedicated programmable Azure Boost hardware in our dynamically programmable FPGA. This architecture allows us to update the FPGA hardware in the fleet enabling continuous delivery for our customers.

Diagram showing the difference between managed SCSI storage and Azure Boost's managed NVMe storage.

### Azure Boost SSD 
With Azure Boost SSD architecture, we deliver local, and cached disk performance improvements at up to 36GBps throughput and 6.6M IOPS depending on the VM size of your choice. Azure Boost SSDs are designed to provide high performance optimized encryption at rest, and minimal jitter to NVMe local disks for Azure VMs with local disks.

Diagram showing the difference between local SCSI SSDs and Azure Boost's local NVMe SSDs.

## Security
Azure Boost's security contains several components that work together to provide a secure environment for your virtual machines. Microsoft's in-house developed hardware and software systems provide a secure foundation for your cloud workloads. 

- **Security chip:**
Boost employs the [Cerberus](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security/fundamentals/project-cerberus.md) chip as an independent hardware root of trust to achieve NIST 800-193 certification. Customer workloads can't run on Azure Boost powered architecture unless the firmware and software running on the system garners trust.

- **Attestation:**
HW RoT identity, Secure Boot, and Attestation through Azure’s Attestation Service ensures that Boost and its powered hosts always operate in a healthy and trusted state. Any machine that can't be securely attested is prevented from hosting workloads and it's restored to a trusted state offline.

- **Code integrity:**
Boost systems embrace multiple layers of defense-in-depth, including ubiquitous code integrity verification that enforces only Microsoft approved and signed code runs on the Boost system on chip. Microsoft has sought to learn from and contribute back to the wider security community, up streaming advancements to the Integrity Measurement Architecture.

- **Security Enhanced OS:**
Azure Boost uses Security Enhanced Linux (SELinux) to enforce principle of least privilege for all software running on its system on chip. All control plane and data plane software running on top of the Boost OS is restricted to running only with the minimum set of privileges required to operate – the operating system restricts any attempt by Boost software to act in an unexpected manner. Boost OS properties make it difficult to compromise code, data, or the availability of Boost and Azure hosting Infrastructure.

- **Rust memory safety:**
Rust serves as the primary language for all new code written on the Boost system, to provide memory safety without impacting performance. Control and data plane operations are isolated with memory safety improvements that enhance Azure’s ability to keep tenants safe. 

- **FIPS certification:**
Boost employs a FIPS 140 certified system kernel, providing reliable and robust security validation of cryptographic modules.

## Performance
The hardware running virtual machines are a shared resource. The hypervisor (host system) must perform several tasks to ensure that each virtual machine is both isolated from other virtual machines and that each virtual machine receives the resources it needs to run. These tasks include networking between the physical and virtual networks, security, and storage management. Azure Boost reduces the overhead of these tasks by offloading them to dedicated hardware. This offloading frees up CPU resources for the guest virtual machines, resulting in improved performance.

- **VMs using large sizes:** 
Large sizes that encompass most of a host's resources benefit from Azure Boost. While a large VM size running on a Boost-enabled host might not directly see extra resources, workloads and applications that stress the host processes replaced by Azure Boost see a performance increase.

- **Dedicated hosts:**
Performance improvements also have significant impact to Azure Dedicated Hosts (ADH) users. Azure Boost-enabled hosts can potentially run extra, small VMs or increase the size of existing VMs. This allows you to do more work on a single host, reducing your overall costs.


## Current availability
Azure Boost is currently available on several VM size families:


| Size Series | Series Type | Deployment Status |
| :---: | :---: | :---: |
| [Mbsv3](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/mbsv3-mbdsv3-series) | Memory Optimized | Preview |
| [Mbdsv3](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/mbsv3-mbdsv3-series) | Memory Optimized | Preview |
| [Easv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/easv6-series) | Memory Optimized | Production |
| [Eadsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/eadsv6-series) | Memory Optimized | Production |
| [Epdsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/epdsv6-series) | Memory Optimized | Production |
| [Epsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/epsv6-series) | Memory Optimized | Production |
| [ECesv5/ECedsv5](https://learn.microsoft.com/azure/virtual-machines/ecesv5-ecedsv5-series) | Memory Optimized | Preview |
| [Dsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dsv6-series) | General Purpose | Production |
| [Dldsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dldsv6-series) | General Purpose | Production |
| [Ddsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/ddsv6-series) | General Purpose | Production |
| [DCesv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dcesv5-series) | General Purpose | Preview |
| [DCedsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dcedsv5-series) | General Purpose | Preview |
| [Dasv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dasv6-series) | General Purpose | Production |
| [Dalsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dalsv6-series) | General Purpose | Production |
| [Daldsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/daldsv6-series) | General Purpose | Production |
| [Dadsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dadsv6-series) | General Purpose | Production |
| [Dpsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dpsv6-series) | General Purpose | Production |
| [Dplsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dplsv6-series) | General Purpose | Production |
| [Dlsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dlsv6-series) | General Purpose | Production |
| [Dpdsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dpdsv6-series) | General Purpose | Production |
| [Dpldsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dpldsv6-series) | General Purpose | Production |
| [Nvadsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/gpu-accelerated/nvadsa10v5-series) | GPU/AI workload optimized | Production |
| [Msv3](https://learn.microsoft.com/azure/virtual-machines/msv3-mdsv3-medium-series) | Memory Optimized | Production |
| [Mdsv3](https://learn.microsoft.com/azure/virtual-machines/msv3-mdsv3-medium-series) | Memory Optimized | Production |
| [Msv3](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/msv3-mdsv3-high-memory-series) | High Memory Optimized | Production |
| [Mdsv3](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/msv3-mdsv3-high-memory-series) | High Memory Optimized | Production |
| [Lsv3](https://learn.microsoft.com/azure/virtual-machines/sizes/storage-optimized/lsv3-series) | Storage Optimized | Production |
| [HX](https://learn.microsoft.com/azure/virtual-machines/sizes/high-performance-compute/hx-series) | High Performance Compute | Production |
| [HBv4](https://learn.microsoft.com/azure/virtual-machines/sizes/high-performance-compute/hbv4-series) | High Performance Compute | Production |
| [Fasv6](https://learn.microsoft.com/azure/virtual-machines/sizes/compute-optimized/fasv6-series) | Compute Optimized | Production |
| [Falsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/compute-optimized/falsv6-series) | Compute Optimized | Production |
| [Famsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/compute-optimized/famsv6-series) | Compute Optimized | Production |
| [Ev5](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/ev5-series) | Memory Optimized | Production |
| [Esv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/esv6-series) | Memory Optimized | Production |
| [Esv5](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/esv5-series) | Memory Optimized | Production |
| [Epsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/epsv5-series) | Memory Optimized | Production |
| [Epdsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/epdsv5-series) | Memory Optimized | Production |
| [Edv5](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/edv5-series) | Memory Optimized | Production |
| [Edsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/edsv6-series) | Memory Optimized | Production |
| [Edsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/edsv5-series) | Memory Optimized | Production |
| [Ebsv5](https://learn.microsoft.com/azure/virtual-machines/ebdsv5-ebsv5-series) | Memory Optimized | Production |
| [Ebdsv5](https://learn.microsoft.com/azure/virtual-machines/ebdsv5-ebsv5-series) | Memory Optimized | Production |
| [Ebsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/ebsv6-series) | Memory Optimized | Production |
| [Ebdsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/ebdsv6-series) | Memory Optimized | Production |
| [Dv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dv5-series) | General Purpose | Production |
| [Dsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dsv5-series) | General Purpose | Production |
| [Dpsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dpsv5-series) | General Purpose | Production |
| [Dplsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dplsv5-series) | General Purpose | Production |
| [Dpldsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dpldsv5-series) | General Purpose | Production |
| [Dpdsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dpdsv5-series) | General Purpose | Production |
| [Dlsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dlsv5-series) | General Purpose | Production |
| [Dldsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dldsv5-series) | General Purpose | Production |
| [Ddv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/ddv5-series) | General Purpose | Production |
| [Ddsv5](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/ddsv5-series) | General Purpose | Production |
| [DCdsv3](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dcdsv3-series) | General Purpose | Production |
| [Bsv2](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/bsv2-series) | General Purpose | Production |
| [Bpsv2](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/bpsv2-series) | General Purpose | Production |
| [Dsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dsv7-series) | General Purpose | Production |
| [Ddsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/ddsv7-series) | General Purpose | Production |
| [Dasv7](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dasv7-series) | General Purpose | Production |
| [Dadsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dadsv7-series) | General Purpose | Production |
| [Dlsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dlsv7-series) | General Purpose | Production |
| [Dldsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dldsv7-series) | General Purpose | Production |
| [Dalsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dalsv7-series) | General Purpose | Production |
| [Daldsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/daldsv7-series) | General Purpose | Production |
| [DCsv3](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dcsv3-series) | General Purpose | Production |
| [DCasv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dcasv6-series) | General Purpose | Production |
| [DCadsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dcadsv6-series) | General Purpose | Production |
| [DCesv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dcesv6-series) | General Purpose | Production |
| [DCedsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dcedsv6-series) | General Purpose | Production |
| [Esv7](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/esv7-series) | Memory Optimized | Production |
| [Edsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/edsv7-series) | Memory Optimized | Production |
| [Easv7](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/easv7-series) | Memory Optimized | Production |
| [Eadsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/eadsv7-series) | Memory Optimized | Production |
| [Ensv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/ensv6-series) | Memory Optimized | Production |
| [Endsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/endsv6-series) | Memory Optimized | Production |
| [ECasv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/ecasv6-series) | Memory Optimized | Production |
| [ECadsv6](https://learn.microsoft.com/azure/virtual-machines/sizes/memory-optimized/ecadsv6-series) | Memory Optimized | Production |
| [Fasv7](https://learn.microsoft.com/azure/virtual-machines/sizes/compute-optimized/fasv7-series) | Compute Optimized | Production |
| [Fadsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/compute-optimized/fadsv7-series) | Compute Optimized | Production |
| [Falsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/compute-optimized/falsv7-series) | Compute Optimized | Production |
| [Faldsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/compute-optimized/faldsv7-series) | Compute Optimized | Production |
| [Famsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/compute-optimized/famsv7-series) | Compute Optimized | Production |
| [Famdsv7](https://learn.microsoft.com/azure/virtual-machines/sizes/compute-optimized/famdsv7-series) | Compute Optimized | Production |
| [FXmsv2](https://learn.microsoft.com/azure/virtual-machines/sizes/compute-optimized/fxmsv2-series) | Compute Optimized | Production |
| [FXmdsv2](https://learn.microsoft.com/azure/virtual-machines/sizes/compute-optimized/fxmdsv2-series) | Compute Optimized | Production |
| [NCadsH100v5](https://learn.microsoft.com/azure/virtual-machines/sizes/gpu-accelerated/ncadsh100v5-series) | GPU/AI workload optimized | Production |
| [ND H200 v5](https://learn.microsoft.com/azure/virtual-machines/sizes/gpu-accelerated/nd-h200-v5-series) | GPU/AI workload optimized | Production |
| [ND MI300X v5](https://learn.microsoft.com/azure/virtual-machines/sizes/gpu-accelerated/nd-mi300x-v5-series) | GPU/AI workload optimized | Production |
| [ND GB300 v6](https://learn.microsoft.com/azure/virtual-machines/sizes/gpu-accelerated/nd-gb300-v6-series) | GPU/AI workload optimized | Production |
| [Lasv4](https://learn.microsoft.com/azure/virtual-machines/sizes/storage-optimized/lasv4-series) | Storage Optimized | Production |
| [Lsv4](https://learn.microsoft.com/azure/virtual-machines/sizes/storage-optimized/lsv4-series) | Storage Optimized | Production |
| [Laosv4](https://learn.microsoft.com/azure/virtual-machines/sizes/storage-optimized/laosv4-series) | Storage Optimized | Production |


## Next Steps
- Learn more about [Azure Virtual Network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-networks-overview.md).
- Look into [Azure Dedicated Hosts](https://learn.microsoft.com/azure/virtual-machines/dedicated-hosts).
- Learn more about [Azure Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-introduction.md).
