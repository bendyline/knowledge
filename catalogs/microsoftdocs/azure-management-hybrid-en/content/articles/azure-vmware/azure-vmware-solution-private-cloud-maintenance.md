---
title: Private Cloud Maintenance
description: Ensuring seamless, reliably maintaintenance of Azure VMware Solution private cloud
ms.topic: concept-article
ms.service: azure-vmware
ms.date: 08/12/2026
# Customer intent: "As an IT administrator managing Azure VMware Solution, I want to ensure optimal performance and minimize downtime during updates."
---

# Azure VMware Solution private cloud maintenance

Azure VMware Solution undertakes periodic maintenance of the private cloud. This maintenance includes security patches, minor and major updates to VMware software stack. This page describes the host monitoring, remediation, and mandatory steps that keep the private cloud ready for maintenance.

## Host maintenance and lifecycle management


<!-- Used in faq.md and concepts-private-clouds-clusters.md -->

One benefit of Azure VMware Solution private clouds is that the platform is maintained for you. Microsoft is responsible for the lifecycle management of VMware software (ESXi, vCenter Server, and vSAN) and NSX appliances. Microsoft is also responsible for bootstrapping the network configuration, like creating the Tier-0 gateway and enabling North-South routing. You’re responsible for the NSX SDN configuration: network segments, distributed firewall rules, Tier 1 gateways, and load balancers.

> **Note:**
> A T0 gateway is created and configured as part of a private cloud deployment. Any modification to that logical router or the NSX edge node VMs could affect connectivity to your private cloud and should be avoided.

Microsoft is responsible for applying any patches, updates, or upgrades to ESXi, vCenter Server, vSAN, and NSX in your private cloud. The impact of patches, updates, and upgrades on ESXi, vCenter Server, and NSX has the following considerations:

- **ESXi** - There's no impact to workloads running in your private cloud. Access to vCenter Server and NSX isn't blocked during this time. During this time, we recommend you don't plan other activities like: scaling up private cloud, scheduling or initiating active HCX migrations, making HCX configuration changes, and so on, in your private cloud.

- **vCenter Server** - There's no impact to workloads running in your private cloud. During this time, vCenter Server is unavailable and you can't manage VMs (stop, start, create, or delete). We recommend you don't plan other activities like scaling up private cloud, creating new networks, and so on, in your private cloud. When you use VMware Site Recovery Manager or vSphere Replication user interfaces, we recommend you don't do either of the  actions: configure vSphere Replication, and configure or execute site recovery plans during the vCenter Server upgrade.

- **NSX** - Microsoft follows the standard Broadcom NSX upgrade workflow.  NSX Edge upgrades are done first and carried out one at a time, which may result in transient packet drops as Edge transitions gracefully to another active edge during the upgrade. Typically, this does not impact end applications, since retransmission at the TCP layer usually addresses the issue. For hosts, Azure VMware Solution uses host maintenance mode upgrades to avoid any impact during host upgrades; this process moves all VMs to other hosts in the cluster and puts hosts into maintenance mode before upgrading. During the upgrade, access to the NSX management plane is blocked, and configuration changes to the NSX environment cannot be made. We recommend you don't plan other activities like, scaling up private cloud, and so on, in your private cloud. Other activities can prevent the upgrade from starting or could have adverse impacts on the upgrade and the environment.
 
You're notified through Azure Service Health that includes the timeline of the upgrade. This notification also provides details on the upgraded component, its effect on workloads, private cloud access, and other Azure services. You can reschedule an upgrade as needed.

Software updates include:

- **Patches** - Security patches or bug fixes released by VMware

- **Updates** - Minor version change of a VMware stack component

- **Upgrades** - Major version change of a VMware stack component

>**Note:**
> Microsoft tests a critical security patch as soon as it becomes available from VMware.

Documented VMware workarounds are implemented in lieu of installing a corresponding patch until the next scheduled updates are deployed.


## Host monitoring and remediation

Azure VMware Solution continuously monitors the health of both the VMware components and underlay. When Azure VMware Solution detects a failure, it takes action to repair the failed components. When Azure VMware Solution detects a degradation or failure on an Azure VMware Solution node, it triggers the host remediation process.

Host remediation involves replacing the faulty node with a new healthy node in the cluster. Then, when possible, the faulty host is placed in VMware vSphere maintenance mode. VMware vSphere vMotion moves the VMs off the faulty host to other available servers in the cluster, potentially allowing zero downtime for live migration of workloads. If the faulty host can't be placed in maintenance mode, the host is removed from the cluster. Before the faulty host is removed, the customer workloads are migrated to a newly added host.

> **Tip:**
> **Customer communication:** An email is sent to the customer's email address before the replacement is initiated and again after the replacement is successful. 
> 
> To receive emails related to host replacement, you must be added to one of the following Azure Role-Based Access Control (RBAC) roles in the subscription: 'ServiceAdmin', 'CoAdmin', 'Owner', or 'Contributor'.

Azure VMware Solution monitors the following conditions on the host:

- Processor status
- Memory status
- Connection and power state
- Hardware fan status
- Network connectivity loss
- Hardware system board status
- Errors occurred on one or more disks of a vSAN host
- Hardware voltage
- Hardware temperature status
- Hardware power status
- Storage status
- Connection failure

## Actions to ensure private cloud is maintenance-ready

The following actions are necessary for ensuring host maintenance operations are carried out successfully:
- **vSAN storage utilization:** To maintain Service Level Agreement (SLA), ensure that your vSphere cluster's storage space utilization remains below 75%. If the utilization exceeds 75%, upgrades can take longer than expected or fail entirely. If your storage utilization exceeds 75%, consider adding a node to expand the cluster and prevent potential downtime during upgrades.
- **Remove or update any stale or inaccessible network adapters or switch connected to virtual machine** so they do not block vMotion or Azure maintenance. If this is not completed before the upgrade starts, Microsoft will act on your behalf by moving these VM adapters to a Microsoft-created isolated port-group/segment in a disconnected state so the upgrade can proceed.  Microsoft also sends periodic Azure VMware Solution resource health notifications for such virtual machines, so you can take proactive action and keep the environment ready for planned upgrades.
- **Distributed Resource Scheduler (DRS) rules:** DRS VM-VM anti-affinity rules must be configured in a way to have at least (N+1) hosts in the cluster, where N is the number of VMs part of DRS rule.
- **Failures To Tolerate (FTT) violation:** Prevent data loss by changing VMs configured with a vSAN storage policy for Failures to Tolerate (FTT) of 0 to a vSAN storage policy compliant with [Microsoft SLA](https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services?lang=1) (FTT=1 for up to five hosts in a cluster and FTT=2 for six or more hosts in a cluster). Ensure host maintenance operations can be carried out seamlessly.
- **Remove VM CD-ROM mounts:** VMs mounted with "Emulate mode" CD-ROMs block VMs from being live migrated off of hosts that need to be put into maintenance mode. Ensure CD-ROMs are mounted in "Passthrough mode".
- **Serial/parallel port or external device:** If you're using an image file (ISO, FLP, etc.), ensure that it's accessible from all ESXi hosts in the cluster. Store the files on a datastore that are shared between all ESXi Servers that participate in the vMotion of the virtual machine (VM). For more information, see [Broadcom KB article](https://knowledge.broadcom.com/external/article/324829/vmotion-fails-with-the-compatibility-err.html).
- **Orphaned VMs:** For orphaned VMs, they need to be re-registered if not already deleted or removed from inventory. For more information, see [Broadcom KB article](https://knowledge.broadcom.com/external/article/312831/virtual-machines-appear-as-invalid-or-or.html).
- **SCSI shared controller:** When using SCSI bus sharing, use bus type as "Physical" for VMs. VMs connected to SCSI bus controllers in "Virtual" mode might be powered off during maintenance mode because these VMs can't be live migrated off hosts that need to be put into maintenance mode. For more information, see [Broadcom KB article](https://knowledge.broadcom.com/external/article?legacyId=2147661).
- **Third-party VMs & applications:** For third-party VMs & applications:
    - Ensure that third-party solutions deployed on Azure VMware Solution are compliant and don't interfere with maintenance operations.
    - Ensure backup operations are paused during the maintenance window.
    - Ensure that the VM isn’t installed with a VM-Host "Must run" DRS rule. Additionally, verify that these applications are compatible with upcoming versions of the VMware stack.
    - Consult with your solution vendor and update in advance if necessary to maintain compatibility post-upgrade.

>**Important:**
> If any maintenance blocking configurations exist on an Azure VMware Solution host, you receive alerts on your Resource Health dashboard. To ensure unhealthy hosts are replaced and upgrades succeed, such blocking configurations are mitigated by taking appropriate remediation steps to maintain the availability of your private cloud. In some cases, these remediation steps would include powering off a VM and migrating it to another host and then powering it on, which might briefly disrupt the application running on the VM.

## Alert Codes and Remediation Table
| Error Code | Error Details | Recommended Action |
| --- | --- | --- |
| EPC_CDROM_EMULATEMODE | An error occurs when CD-ROM on the VM uses emulate mode, whose ISO image isn't accessible. | Follow [this KB article](https://knowledge.broadcom.com/external/article?legacyId=79306) for the removal of any CDROM mounted on a customers workload VM in emulate mode or detach ISO. The recommendation is to use "Passthrough mode" for mounting any CD-ROM. |
| EPC_DRSOVERRIDERULE | An error occurs when there's a VM with DRS Override set to "Disabled" mode. | VM shouldn't block vMotion while putting host into maintenance. Set Partially Automated DRS rules for the VM. Refer to [this document](https://learn.microsoft.com/azure/azure-vmware/create-placement-policy#enable-restrict-vm-movement-for-specific-vms) to know more about VM placement policies. |
| EPC_SCSIDEVICE_SHARINGMODE | An error occurs when a VM is configured to use SCSI controller with bus-sharing in "virtual" mode. | Follow [this KB article](https://knowledge.broadcom.com/external/article?legacyId=79910) for the removal of any SCSI controller engaged in bus-sharing in virtual mode is attached to VMs. |
| EPC_DATASTORE_INACCESSIBLE | An error occurs when any external datastore attached to Azure VMware Solution Private Cloud becomes inaccessible. | Follow [this article](https://learn.microsoft.com/azure/azure-vmware/attach-azure-netapp-files-to-azure-vmware-solution-hosts?tabs=azure-portal#performance-best-practices) for the removal of any stale Datastore attached to cluster |
| EPC_NWADAPTER_STALE | An error occurs when connected Network interface on the VM uses network adapter, which becomes inaccessible. | Follow [this KB article](https://knowledge.broadcom.com/external/article/318738/troubleshooting-the-migration-compatibil.html) for the removal of any stale N/W adapters attached to VMs. |
| EPC_SERIAL_PORT | An error occurs when a VM serial port is connected to a device that can't be accessed on the destination host. | If you're using an image file (ISO, FLP, and so on), ensure that it's accessible from all ESXi servers on the cluster. Store the files on a data store that is shared between all ESXi servers that participate in vMotion of the VM. For more information, see [this KB article](https://knowledge.broadcom.com/external/article/324829/vmotion-fails-with-the-compatibility-err.html) from Broadcom. |
| EPC_HARDWARE_DEVICE | An error occurs when a VM parallel Port/USB Device is connected to a device can't be accessed on the destination host. | If you're using an image file (ISO, FLP, and so on), ensure that it's accessible from all ESXi servers of the cluster. Store the files on a data store that is shared between all ESXi servers that participate in the vMotion of the VM. Learn more about [Broadcom](https://knowledge.broadcom.com/external/article/324829/vmotion-fails-with-the-compatibility-err.html) and VMotion fails with the compatibility error. |
| EPC_INVALIDVM / EPC_ORPHANVM | An error occurs when there's an orphaned or Invalid VM is present in the inventory. | Ensure all your VMs are accessible to the vCenter. Learn more about [Broadcom](https://knowledge.broadcom.com/external/article/312831/virtual-machines-appear-as-invalid-or-or.html) and VMs that appear as invalid, orphaned, or inaccessible. |
| EPC_VMHOSTDRSRULE | An error occurs when there's a VM with Host affinity/anti-affinity DRS rule. | VM shouldn't block VMware vMotion while putting a host into maintenance mode. Set **should rules** for VM-Host affinity. Learn more about [create placement policy](https://learn.microsoft.com/azure/azure-vmware/create-placement-policy#what-is-the-difference-between-the-vm-host-affinity-policy-and-restrict-vm-movement). |
| EPC_FTT_ZERO | An error occurs when a VM has "Failures to Tolerate" as 0 or "No data redundancy". | Learn more about [Broadcom](https://knowledge.broadcom.com/external/article/391522/the-esxi-host-takes-very-long-time-enter.html) and how to configure FTT as 1 or 2 for the VM. |
| EPC_FTTVIOLATION | An error occurs when a cluster doesn't have the minimum number of hosts that the storage policy needs. | Add hosts as needed by the storage policy or change the VM FTT policy to support putting the host into maintenance mode. Learn more about [Broadcom](https://knowledge.broadcom.com/external/article/326857/vsan-host-fails-to-enter-maintenance-mod.html) and FTT policy. |
| EPC_VSANSTORAGEUTILIZATION | An error occurs when vSAN utilization on the cluster is above 75%, which could lead to performance degradation and would make the cluster unmaintainable. | If vSAN utilization on the cluster is above 75%, you can either add nodes to increase available capacity or reduce the data utilization on the cluster. Follow this document [Tutorial - Scale clusters in a private cloud](https://learn.microsoft.com/azure/azure-vmware/tutorial-scale-private-cloud) to scale up vSAN. Follow instructions for [Backup solutions for Azure VMware Solution virtual machines](https://learn.microsoft.com/azure/azure-vmware/ecosystem-back-up-vms) to learn how to back up and remove VMs that aren't essential. |
| ERECOMMENDATION_CLUSTER_SIZE | This recommendation indicates a cluster in the private cloud has 14 or more hosts. Azure VMware Solution supports a maximum of 16 hosts in a cluster. | Create a new cluster for new any new hosts that could be required. |
| ERECOMMENDATION_PRIVATECLOUD_SIZE | This recommendation indicates a private cloud has 90 or more hosts. Azure VMware Solution supports a maximum of 96 hosts in a private cloud. | Consider creating a new private cloud for any new hosts and distribute hosts across the private clouds as necessary. |
| ERECOMMENDATION_VCENTER_SCALE | This recommendation identifies that the vCenter VM is provisioned with fewer CPU cores or less memory than recommended for the current VM count within the private cloud. | Open up a support request to have the vCenter memory and CPU increased. |

> **Note:**
> Azure VMware Solution tenant admins must not edit or delete the previously defined VMware vCenter Server alarms because the Azure VMware Solution control plane on vCenter Server manages them. These alarms are used by Azure VMware Solution monitoring to trigger the Azure VMware Solution host remediation process.


## Next steps

You learned how to ensure seamless Azure VMware Solution private cloud maintenance. Your next step could be to learn more about:

- [How to configure Resource Health alerts for Azure VMware Solution](configure-azure-monitor-for-resource-health-for-azure-vmware-solution.md)
- [Azure VMware Solution networking and interconnectivity concepts](architecture-networking.md)
- [Azure VMware Solution storage concepts](architecture-storage.md)
- [How to configure Azure Alerts in Azure VMware Solution](configure-alerts-for-azure-vmware-solution.md)

<!-- LINKS - internal -->
[concepts-networking]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/concepts-networking.md

<!-- LINKS - external-->
[vCSA versions]: https://kb.vmware.com/s/article/2143838

[ESXi versions]: https://kb.vmware.com/s/article/2143832

[vSAN versions]: https://kb.vmware.com/s/article/2150753
