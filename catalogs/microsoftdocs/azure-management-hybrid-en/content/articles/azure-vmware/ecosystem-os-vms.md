---
title: Operating system support for Azure VMware Solution virtual machines
description: Learn about operating system support for your Azure VMware Solution virtual machines.
ms.topic: how-to
ms.service: azure-vmware
ms.date: 05/29/2026
ms.custom: engagement-fy25
# Customer intent: "As a cloud administrator, I want to understand the operating system support for Azure VMware Solution virtual machines, so that I can ensure compatibility and optimize workloads within my cloud infrastructure."
---

# Operating system support for Azure VMware Solution virtual machines

Azure VMware Solution supports a wide range of operating systems to be used in the guest virtual machines (VMs). Based on VMware vSphere, Azure VMware Solution customers can use operating systems currently supported by vSphere for their workloads.

## VMware software versions


<!-- Used in faq.md and concepts-private-clouds-clusters#host-maintenance-and-lifecycle-management and introduction#vmware-software-versions-->

The following table lists the software versions that are used in new deployments of Azure VMware Solution private clouds.

| Software | Version | Build number |
| :--- | :---: | :---: |
| VMware vCenter Server | [8.0 U3k](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/vcenter-server-update-and-patch-release-notes/vsphere-vcenter-server-80u3k-release-notes.html) | 25600417 |
| VMware ESXi | [8.0 U3k](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u3k-release-notes.html) | 25595708 |
| VMware vSAN | [8.0 U3](https://techdocs.broadcom.com/us/en/vmware-cis/vsan/vsan/8-0/release-notes/vmware-vsan-803-release-notes.html) | 25595708 |
| VMware vSAN Witness | [8.0 U3](https://techdocs.broadcom.com/us/en/vmware-cis/vsan/vsan/8-0/release-notes/vmware-vsan-803-release-notes.html) | 25595708 |
| VMware vSAN on-disk format | [20](https://knowledge.broadcom.com/external/article?legacyId=2148493) | N/A |
| VMware vSAN storage architecture | [Gen 1: OSA, Gen2: ESA](https://blogs.vmware.com/cloud-foundation/2022/08/31/comparing-the-original-storage-architecture-to-the-vsan-8-express-storage-architecture/) | N/A |
| VMware NSX |
| [4.2.3.2](https://techdocs.broadcom.com/us/en/vmware-cis/nsx/vmware-nsx/4-2/release-notes/vmware-nsx-4232-release-notes.html) |
 | 25077145 |
| VMware HCX | [4.11.4](https://techdocs.broadcom.com/us/en/vmware-cis/hcx/vmware-hcx/4-11/hcx-4-11-release-notes/vmware-hcx-4114-release-notes.html) | 25238712 |
| VMware Live Site Recovery | [9.0.2.1](https://techdocs.broadcom.com/us/en/vmware-cis/live-recovery/live-site-recovery/9-0/release-notes/vmware-live-site-recovery-90-release-notes.html) | 24401761 |
| VMware vSphere Replication | [9.0.2.1](https://techdocs.broadcom.com/us/en/vmware-cis/live-recovery/vsphere-replication/9-0/release-notes/vsphere-replication-9021-release-notes.html) | 24383568 |

If the listed build number doesn't match the build number listed in the release notes, it's because a custom patch was applied for cloud providers.

The current running software version is applied to new clusters that are added to an existing private cloud, if the vCenter Server version supports it.


Check the list of operating systems and configurations supported in the [Broadcom Compatibility Guide](https://compatibilityguide.broadcom.com/search?program=software&persona=live&column=osVendors&order=asc). Create a query for the previously listed ESXi version then, select all operating systems and vendors.

We worked with Red Hat, SUSE, and Canonical to extend the support model currently in place for Azure VMs to the workloads running on Azure VMware Solution. Check the following vendor sites for more information about the benefits of running their operating system on Azure.

- [Red Hat Enterprise Linux](https://access.redhat.com/ecosystem/microsoft-azure)
- [Ubuntu Server](https://ubuntu.com/azure)
- [SUSE Enterprise Linux Server](https://www.suse.com/partners/alliance/microsoft/)
