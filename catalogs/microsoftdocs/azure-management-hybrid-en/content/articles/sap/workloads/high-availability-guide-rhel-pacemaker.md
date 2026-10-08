---
title: Set up Pacemaker on RHEL in Azure | Microsoft Docs
description: Learn how to set up Pacemaker on Red Hat Enterprise Linux (RHEL) in Azure.
services: virtual-machines-windows,virtual-network,storage
author: rdeltcheva
manager: juergent
ms.service: sap-on-azure
ms.topic: article
ms.tgt_pltfrm: vm-linux
ms.date: 08/01/2026
ms.author: radeltch
ms.custom:
  - linux-related-content
  - sfi-image-nochange
  - sfi-ropc-nochange
# Customer intent: "As a system administrator managing RHEL clusters on Azure, I want to configure a high availability cluster using Pacemaker, so that I can ensure redundancy and fault tolerance for my applications."
zone_pivot_groups: sap-pacemaker-fencing-solution
---

# Set up Pacemaker on Red Hat Enterprise Linux in Azure

This article explains how to set up and configure a basic two node Pacemaker cluster on Red Hat Enterprise Linux (RHEL). The instructions cover `RHEL 8.6+`, `RHEL 9.x`, and `RHEL 10.x`.

## Prerequisites

* RHEL High Availability (HA) documentation
  * [Configuring and managing high availability clusters][rheldoc-ha-guide].
  * [Support Policies for RHEL High-Availability Clusters - sbd and fence_sbd][rheldoc-ha-support-sbd-fence_sbd].
  * [Support Policies for RHEL High Availability clusters - fence_azure_arm][rheldoc-ha-support-fence_azure_arm].
  * [Software-Emulated Watchdog Known Limitations][rheldoc-ha-softdog-limitations].
  * [Exploring RHEL High Availability's Components - sbd and fence_sbd][rheldoc-ha-sbd-fence_sbd].
  * [Design Guidance for RHEL High Availability Clusters - sbd Considerations][rheldoc-ha-sbd-considerations].
  * [Considerations in adopting RHEL 8 - High Availability and Clusters][rheldoc-ha-rhel8-considerations]

* Azure-specific RHEL documentation
  * [Support Policies for RHEL High-Availability Clusters - Microsoft Azure Virtual Machines as Cluster Members][rheldoc-ha-support-azure].
  * [Design Guidance for RHEL High Availability Clusters - Microsoft Azure Virtual Machines as Cluster Members][rheldoc-ha-design-azure].

* RHEL documentation for SAP offerings
  * [Support Policies for RHEL High Availability Clusters - Management of SAP S/4HANA in a cluster][rheldoc-sap-ha-support].

## Overview

This guide assumes you already deployed the required resource group, Azure virtual network, subnet, and virtual machines (VMs).

Clusters running on Linux require a fencing agent to fence unhealthy nodes. To accomplish this task on Azure, use one of the following methods:
- Storage Based Death (SBD) with Azure Shared Disk
- Storage Based Death (SBD) with iSCSI targets
- Azure Fencing Agent

> **Note:**
> The following prefixes are used in this document:
> - **[A]**: Applicable to all nodes.
> - **[1]**: Applicable to only node 1.
> - **[2]**: Applicable to only node 2.

<!--- Fencing Option Overview --->
**Applies to: sbd-shared-disk,sbd-iscsi**

> **Important:**
> In Azure, RHEL high availability clusters with storage based fencing (fence_sbd) use a software-emulated watchdog. Review the following documentation when using SBD.
> * [Software-Emulated Watchdog Known Limitations][rheldoc-ha-softdog-limitations]
> * [Support Policies for RHEL High Availability Clusters - sbd and fence_sbd][rheldoc-ha-support-sbd-fence_sbd]


**Applies to: sbd-shared-disk**

## Using SBD with Azure Shared Disk
By using [Azure Shared Disks][azdoc-vm-shared-disks], you can mount the same disk across all virtual machines that are part of the cluster. You can host your SBD device on that shared disk without extra infrastructure requirements.

Diagram of an Azure Shared Disk as an SBD device in a Pacemaker Cluster.

### Benefits
- Provides a native Azure shared block device option for SBD without requiring additional resources.
- Virtual machines attach the managed disk directly, reducing dependency on additional network considerations.

### Important considerations
- You can use an Azure shared disk with the `Premium SSD` SKU as an SBD device.
- Review the [List of Supported Operating Systems][azdoc-vm-shared-disks-supported-os].
- SBD devices that use an Azure premium shared disk support [locally redundant storage (LRS)][azdoc-vm-disk-lrs] and [zone-redundant storage (ZRS)][azdoc-vm-disk-zrs].
- Depending on the [type of your deployment][azdoc-sap-deployment-type], choose the appropriate redundant storage for an Azure shared disk as your SBD device.
   - An SBD device that uses LRS for Azure premium shared disk (skuName - Premium_LRS) supports only deployments in an availability set.
   - An SBD device that uses ZRS for an Azure premium shared disk (skuName - Premium_ZRS) is recommended for deployments in availability zones.
- The Azure shared disk that you use for SBD devices doesn't need to be large. The [maxShares][azdoc-vm-disk-share-max] value determines how many cluster nodes can use the shared disk. For example, you can use P1 or P2 disk sizes for your SBD device on a two-node cluster such as SAP ASCS/ERS or SAP HANA scale-up.
   - For clusters with more than two nodes, refer to the documented [maxShares][azdoc-vm-disk-share-max] for your selected disk.
- Don't attach an Azure shared disk SBD device across different Pacemaker clusters.
- If you use multiple Azure shared disk SBD devices, check on the limit for a maximum number of data disks that can be attached to a VM.
- For more information about limitations for Azure shared disks, carefully review the "Limitations" section of [Azure shared disk documentation][azdoc-vm-shared-disks-limitations].

[azdoc-vm-shared-disks-limitations]: https://learn.microsoft.com/azure/virtual-machines/disks-shared#limitations
[azdoc-vm-shared-disks]: https://learn.microsoft.com/azure/virtual-machines/disks-shared
[azdoc-vm-shared-disks-supported-os]: https://learn.microsoft.com/azure/virtual-machines/disks-shared#linux
[azdoc-vm-disk-lrs]: https://learn.microsoft.com/azure/virtual-machines/disks-redundancy#locally-redundant-storage-for-managed-disks
[azdoc-vm-disk-zrs]: https://learn.microsoft.com/azure/virtual-machines/disks-redundancy#zone-redundant-storage-for-managed-disks
[azdoc-sap-deployment-type]: https://learn.microsoft.com/azure/sap/workloads/sap-high-availability-architecture-scenarios#comparison-of-different-deployment-types-for-sap-workload
[azdoc-vm-disk-share-max]: https://learn.microsoft.com/azure/virtual-machines/disks-shared-enable#disk-sizes
[azdoc-sap-hana-scale-out]: https://learn.microsoft.com/azure/sap/workloads/sap-hana-high-availability-scale-out-hsr-suse


**Applies to: sbd-iscsi**

## Using SBD with iSCSI targets
This solution requires you to host Internet Small Computer System Interface (iSCSI) targets on at least one additional virtual machine (VM).

Diagram of iSCSI servers hosting iSCSI targets for SBD devices in a Pacemaker Cluster.

### Benefits
- These iSCSI host servers can host iSCSI targets for other Pacemaker clusters in the same region as well.
- If you're already using them on-premises, they don't require any changes to how you operate the Pacemaker cluster.

### Important considerations
- You must use three iSCSI host servers to have the highest level of resiliency for your cluster.
   - Using only one server introduces a single point of failure that prevents your cluster from fencing if it's down.
   - Pacemaker doesn't allow fencing if you only have two targets and one is down.
- iSCSI target host servers must reside in the same region as your clusters.
- Network routing between your clusters and iSCSI host servers must not traverse any non-redundant network devices (like a [Network Virtual Appliance][azblog-nva-bestpractices]).
   -  Maintenance events and other issues with network devices can negatively affect the stability and reliability of the overall cluster configuration.

[azblog-nva-bestpractices]: https://azure.microsoft.com/blog/best-practices-to-consider-before-deploying-a-network-virtual-appliance/?msockid=0d7b0a8194026e6002e31c6895b26faf





**Applies to: azure-fence-agent**

## Using the Azure Fence Agent
By using the Azure Fence Agent, your cluster can fence nodes by directly calling the Azure APIs to restart failed nodes.

Diagram of Azure Fence Agent in a Pacemaker Cluster.

### Benefits
- No extra resources needed.
- Managed Identities remove any credential maintenance.
### Important considerations
- Use Managed Identities for authentication. If you're currently using a service principal, [Update the Azure Fence Agent from SPN to MSI][techcomm-fence-agent-spn-to-msi].
- The Azure fence agent requires outbound connectivity to public Azure endpoints. For more information along with possible solutions, see [Public endpoint connectivity for VMs using standard ILB][azdoc-sap-load-balancer-outbound-connections].
- The monitoring and fencing operations are deserialized. As a result, if there's a longer running monitoring operation and simultaneous fencing event, there's no delay to the cluster failover because the monitoring operation is already running.

[azdoc-sap-load-balancer-outbound-connections]: https://learn.microsoft.com/azure/sap/workloads/high-availability-guide-standard-load-balancer-outbound-connections
[techcomm-fence-agent-spn-to-msi]: https://techcommunity.microsoft.com/t5/running-sap-applications-on-the/sap-on-azure-high-availability-change-from-spn-to-msi-for/ba-p/3609278


<!--- Fencing Option Deployment --->

**Applies to: sbd-shared-disk**

## Deploy an Azure Shared Disk for SBD

To create and attach an Azure shared disk by using PowerShell, run the following commands. If you want to deploy resources by using the Azure CLI or the Azure portal, see [Deploy a ZRS disk][azdoc-vm-disk-deploy-zrs].

```azurepowershell-interactive
$ResourceGroup = "<ResourceGroupName>"
$DiskSizeInGB = 4
$DiskName = "<SBDDiskName>"
# Must be Equal to or greater than the Number of Nodes in the Cluster
$ShareNodes = 2 
# Options are "Premium_LRS" or "Premium_ZRS"
$SKUName = "<DiskSKU>"
# VMs to attach the disk to
$vmNames = @("sap-cl1", "sap-cl2")
# Lun to attach the disk to. You should use the same lun on all servers in the cluster.
$lunNumber = <lunNumber>

$diskConfig = New-AzDiskConfig -Location $Location -SkuName $SkuName -CreateOption Empty -DiskSizeGB $DiskSizeInGB -MaxSharesCount $ShareNodes

$dataDisk = New-AzDisk -ResourceGroupName $ResourceGroup -DiskName $DiskName -Disk $diskConfig

# Attach SBD disk to cluster VMs
foreach ($vmName in $vmNames) 
{
  $vm = Get-AzVM -ResourceGroupName $resourceGroup -Name $vmName
  Add-AzVMDataDisk -VM $vm -Name $diskName -CreateOption Attach -ManagedDiskId $dataDisk.Id -Lun $lunNumber
  Update-AzVM -VM $vm -ResourceGroupName $resourceGroup -Verbose
}

```

[azdoc-vm-disk-deploy-zrs]: https://learn.microsoft.com/azure/virtual-machines/disks-deploy-zrs


**Applies to: sbd-iscsi**


## Use iSCSI targets
### Build iSCSI target host servers

1. Deploy three virtual machines that run on a supported RHEL OS version. The VMs don't need to be large. VM sizes such as Standard_E2s or Standard_D2s are sufficient.
   > **Note:**
   > You don't need to use RHEL for SAP with HA and Update Services, or RHEL for SAP Apps OS image for the iSCSI target server. You can use a standard RHEL OS image instead. However, the support life cycle varies between different OS product releases.

1. Install the latest updates, and reboot if required.
   ```bash
   sudo dnf -y update
   ```
1. Install the iSCSI target package.
   ```bash
   sudo dnf install -y targetcli
   ```
1. Enable and start the iSCSI service.
   ```bash
   sudo systemctl start target
   sudo systemctl enable target
   ```
1. Open the port in the firewall.
   ```bash
   sudo firewall-cmd --add-port=3260/tcp --permanent
   sudo firewall-cmd --reload
   ```   

### Create iSCSI targets

For each cluster, you need to provision an iSCSI disk on each iSCSI host server, and then grant every cluster node access to that disk. In this example, you create disks for two different clusters:
- ascsnw1: The ASCS/ERS cluster for NW1
- hdbnw1: The HANA Database cluster for NW1
- sap-cl1 and sap-cl2: Hostnames for the NW1 ASCS/ERS cluster nodes
- sap-db1 and sap-db2: Hostnames for the NW1 HANA cluster nodes

1. Create the root folder for all SBD devices.
   ```bash
   sudo mkdir /sbd
   ```
1. Create the SBD device for the first cluster (ascsnw1).
   ```bash
   # Create Storage Object
   sudo targetcli backstores/fileio create sbdascsnw1 /sbd/sbdascsnw1 50M write_back=false
   # Create iSCSI Target
   sudo targetcli iscsi/ create iqn.2006-04.ascsnw1.local:ascsnw1
   # Creates the LUN and attaches it to the iSCSI Target
   sudo targetcli iscsi/iqn.2006-04.ascsnw1.local:ascsnw1/tpg1/luns/ create /backstores/fileio/sbdascsnw1
   # Grant Cluster Node 1 (sap-cl1) access to the iSCSI Target
   sudo targetcli iscsi/iqn.2006-04.ascsnw1.local:ascsnw1/tpg1/acls/ create iqn.2006-04.sap-cl1.local:sap-cl1
   # Grant Cluster Node 2 (sap-cl2) access to the iSCSI Target
   sudo targetcli iscsi/iqn.2006-04.ascsnw1.local:ascsnw1/tpg1/acls/ create iqn.2006-04.sap-cl2.local:sap-cl2
   ```
1. Create the SBD device for the second cluster (hdbnw1).
   ```bash
   # Create Storage Object
   sudo targetcli backstores/fileio create sbdhdbnw1 /sbd/sbdhdbnw1 50M write_back=false
   # Create iSCSI Target
   sudo targetcli iscsi/ create iqn.2006-04.hdbnw1.local:hdbnw1
   # Creates the LUN and attaches it to the iSCSI Target
   sudo targetcli iscsi/iqn.2006-04.hdbnw1.local:hdbnw1/tpg1/luns/ create /backstores/fileio/sbdhdbnw1
   # Grant Cluster Node 1 (sap-db1) access to the iSCSI Target
   sudo targetcli iscsi/iqn.2006-04.hdbnw1.local:hdbnw1/tpg1/acls/ create iqn.2006-04.sap-db1.local:sap-db1
   # Grant Cluster Node 2 (sap-db2) access to the iSCSI Target
   sudo targetcli iscsi/iqn.2006-04.hdbnw1.local:hdbnw1/tpg1/acls/ create iqn.2006-04.sap-db2.local:sap-db2
   ```
1. Save the configuration.
   ```bash
   sudo targetcli saveconfig
   ```
1. Verify the setup.
   ```bash
   sudo targetcli ls

   o- / ............................................................................................... [...]
     o- backstores .................................................................................... [...]
     | o- block ........................................................................ [Storage Objects: 0]
     | o- fileio ....................................................................... [Storage Objects: 2]
     | | o- sbdascsnw1 ..................................... [/sbd/sbdascsnw1 (50.0MiB) write-thru activated]
     | | | o- alua ......................................................................... [ALUA Groups: 1]
     | | |   o- default_tg_pt_gp ............................................. [ALUA state: Active/optimized]
     | | o- sbdhdbnw1 ....................................... [/sbd/sbdhdbnw1 (50.0MiB) write-thru activated]
     | |   o- alua ......................................................................... [ALUA Groups: 1]
     | |     o- default_tg_pt_gp ............................................. [ALUA state: Active/optimized]
     | o- pscsi ........................................................................ [Storage Objects: 0]
     | o- ramdisk ...................................................................... [Storage Objects: 0]
     o- iscsi .................................................................................. [Targets: 2]
     | o- iqn.2006-04.hdbnw1.local:hdbnw1 ......................................................... [TPGs: 1]
     | | o- tpg1 ..................................................................... [no-gen-acls, no-auth]
     | |   o- acls ................................................................................ [ACLs: 2]
     | |   | o- iqn.2006-04.sap-db1.local:sap-db1 .......................................... [Mapped LUNs: 1]
     | |   | | o- mapped_lun0 ..................................................... [lun0 fileio/sbdhdb (rw)]
     | |   | o- iqn.2006-04.sap-db2.local:sap-db2 .......................................... [Mapped LUNs: 1]
     | |   |   o- mapped_lun0 ..................................................... [lun0 fileio/sbdhdb (rw)]
     | |   o- luns ................................................................................ [LUNs: 1]
     | |   | o- lun0 ................................. [fileio/sbdhdbnw1 (/sbd/sbdhdbnw1) (default_tg_pt_gp)]
     | |   o- portals .......................................................................... [Portals: 1]
     | |     o- 0.0.0.0:3260 ........................................................................... [OK]
     | o- iqn.2006-04.ascsnw1.local:ascsnw1 ....................................................... [TPGs: 1]
     |   o- tpg1 ..................................................................... [no-gen-acls, no-auth]
     |     o- acls ................................................................................ [ACLs: 2]
     |     | o- iqn.2006-04.sap-cl1.local:sap-cl1 .......................................... [Mapped LUNs: 1]
     |     | | o- mapped_lun0 ................................................. [lun0 fileio/sbdascsnw1 (rw)]
     |     | o- iqn.2006-04.sap-cl2.local:sap-cl2 .......................................... [Mapped LUNs: 1]
     |     |   o- mapped_lun0 ................................................. [lun0 fileio/sbdascsnw1 (rw)]
     |     o- luns ................................................................................ [LUNs: 1]
     |     | o- lun0 ............................... [fileio/sbdascsnw1 (/sbd/sbdascsnw1) (default_tg_pt_gp)]
     |     o- portals .......................................................................... [Portals: 1]
     |       o- 0.0.0.0:3260 ........................................................................... [OK]
     o- loopback ............................................................................... [Targets: 0]
   ```




**Applies to: azure-fence-agent**

## Configure Azure Fence Agent 

1. Create Identity
   #### [Managed identity](#tab/msi)
      To create a managed identity (MSI), [create a system-assigned managed identity](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities?pivots=qs-configure-portal-windows-vm#system-assigned-managed-identity) for each VM in the cluster. User assigned managed identities aren't supported at this time.
   
   #### [Service principal](#tab/spn)
   > **Caution:**
   > Service principal-based authentication relies on a static secret, which adds credential management overhead and increases security risk. We recommend the use of managed identity for fence agent.
   
   1. [Create an application][azdoc-entra-spn-create]
      - Note the client ID for later use.
   1. [Add a client secret][azdoc-entra-spn-addsecret]
      - Securely store your client secret for later use.
   

1. Create a custom role.

   Your identity needs permissions through Azure RBAC to perform fencing actions against your VMs. To comply with the Least Privileged Access (LPA) Security Model, [create a custom RBAC role][azdoc-rbac-customrole-create].
   
   Use the following definition for your role, replacing your Subscription ID(s) where needed: 

   ```json
   {
         "Name": "Linux Fence Agent",
         "description": "Allowed to power-off and start virtual machines",
         "assignableScopes": [
                 "/subscriptions/<Subscription 1 ID (GUID)>",
                 "/subscriptions/<Subscription N ID (GUID)>"
         ],
         "actions": [
                 "Microsoft.Compute/*/read",
                 "Microsoft.Compute/virtualMachines/powerOff/action",
                 "Microsoft.Compute/virtualMachines/start/action"
         ],
         "notActions": [],
         "dataActions": [],
         "notDataActions": []
   }
   ```

1. Assign the custom role to your identities.

   #### [Managed identity](#tab/msi)
   
   For each VM in your cluster, assign its managed identity to the custom "Linux Fence Agent" role for every VM in the cluster, including itself. For detailed steps, see [Assign a managed identity access to a resource by using the Azure portal][azdoc-entra-mi-assignment].
   
   > **Important:**
   > Be aware that the assignment and removal of authorization with managed identities [can be delayed][azdoc-entra-mi-limits] until effective.
   
   #### [Service principal](#tab/spn)
   
   For each VM in your cluster, assign your service principal the custom role you created. For more information, see [Assign Azure roles by using the Azure portal][azdoc-rbac-portal-assignment].


[azdoc-entra-mi-assignment]: https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/grant-managed-identity-resource-access-azure-portal
[azdoc-entra-mi-limits]: https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/managed-identity-best-practice-recommendations#limitation-of-using-managed-identities-for-authorization
[azdoc-rbac-portal-assignment]: https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal
[azdoc-rbac-customrole-create]: https://learn.microsoft.com/azure/role-based-access-control/custom-roles-portal
[azdoc-entra-spn-create]: https://learn.microsoft.com/entra/identity-platform/quickstart-register-app
[azdoc-entra-spn-addsecret]: https://learn.microsoft.com/entra/identity-platform/how-to-add-credentials?tabs=client-secret


## Create and configure cluster
1. **[A]** Update the OS and reboot if required.
   ```bash
   sudo dnf -y update
   ```
1. **[A]** Install required cluster packages.
   #### [RHEL 10 / RHEL 9](#tab/rhel10+rhel9)
   ```bash
   sudo dnf install -y nmap-ncat pcs pacemaker resource-agents resource-agents-cloud
   ```
   #### [RHEL 8](#tab/rhel8)
   ```bash
   sudo dnf install -y nmap-ncat pcs pacemaker resource-agents
   ```
   
1. **[A]** Install required fencing packages.
   **Applies to: sbd-shared-disk**

   ```bash
   sudo dnf install -y sbd fence-agents-sbd
   ```

   
   **Applies to: sbd-iscsi**

   ```bash
   sudo dnf install -y sbd fence-agents-sbd iscsi-initiator-utils
   ```

   
   **Applies to: azure-fence-agent**

   ```bash
   sudo dnf install -y fence-agents-azure-arm
   ```


1. **[A]** Configure DNS.

   You can either use a DNS server or modify `/etc/hosts` on all nodes. This example shows how to use the `/etc/hosts` file.
   
   Update the entries to match your IPs and hostnames.
   **Applies to: sbd-shared-disk,azure-fence-agent**

   ```bash
   sudo vi /etc/hosts
   [...]
   # IP address of cluster node 1
   10.27.0.6    sap-cl1
   # IP address of cluster node 2
   10.27.0.7    sap-cl2
   ```

   **Applies to: sbd-iscsi**

   ```bash
   sudo vi /etc/hosts
   [...]
   # IP address of cluster node 1
   10.0.0.6    sap-cl1
   # IP address of cluster node 2
   10.0.0.7    sap-cl2
   # IP address of iSCSI Target Host Server 1
   10.0.0.17   sbd-iscsi1
   # IP address of iSCSI Target Host Server 1
   10.0.0.18   sbd-iscsi2
   # IP address of iSCSI Target Host Server 1
   10.0.0.19   sbd-iscsi3
   ```

1. **[A]** Update the `hacluster` password to be the same on all nodes.
   ```bash
   sudo passwd hacluster
   ```
1. **[A]** Update the firewall.
   ```bash  
   sudo firewall-cmd --add-service=high-availability --permanent
   sudo firewall-cmd --reload
   ```
1. **[A]** Enable Pacemaker services.
   ```bash
   sudo systemctl start pcsd.service
   sudo systemctl enable pcsd.service
   ```
1. **[1]** Create the cluster.
   ```bash
   sudo pcs host auth sap-cl1 sap-cl2 -u hacluster
   sudo pcs cluster setup ascsnw1 sap-cl1 sap-cl2 totem token=30000
   sudo pcs cluster start --all
   ```
1. Configure a startup delay for Pacemaker.

   Starting Pacemaker immediately after boot can potentially let a node rejoin the cluster before failover completes, preventing failover or delaying recovery. To solve this problem use a timer service to delay pacemaker startup on reboot.
   1. **[A]** Configure timer service.
      ```bash
      sudo vi /etc/systemd/system/pacemaker.timer   
      ```
      ```pacemaker.timer
      [Unit]
      Description=Delay start of pacemaker.service after boot
      [Timer]
      OnBootSec=186
      Unit=pacemaker.service
      [Install]
      WantedBy=timers.target
      ```
   1. **[A]** Enable timer service.
      ```bash
      sudo systemctl daemon-reload
      sudo systemctl enable pacemaker.timer
      ```
   1. **[1]** Disable Pacemaker services.
      ```bash
      sudo pcs cluster disable --all
      ```
1. Validate the cluster.
   1. **[1]** Validate Pacemaker cluster.
      ```bash
      sudo pcs status

      Cluster name: ascsnw1
      Cluster Summary:
        * Stack: corosync (Pacemaker is running)
        * Current DC: sap-cl1 (version 3.0.0-5.1.el10_0-8818a21) - partition with quorum
        * Last updated: Tue May 19 22:15:08 2026 on sap-cl1
        * Last change:  Tue Apr 21 23:11:34 2026 by root via root on sap-cl1
        * 2 nodes configured
        * 0 resource instances configured
      
      Node List:
        * Online: [ sap-cl1 sap-cl2 ]
      
      Full List of Resources:
      
      Daemon Status:
        corosync: active/disabled
        pacemaker: active/disabled
        pcsd: active/enabled
      ```
   1. **[A]** Validate services.
      ```bash
      systemctl list-unit-files pacemaker.timer pacemaker.service corosync.service pcsd.service
      ```
      ```output
      UNIT FILE         STATE    PRESET
      corosync.service  disabled disabled
      pacemaker.service disabled disabled
      pacemaker.timer   enabled  disabled
      pcsd.service      enabled  disabled
      ```
## Configure fencing

**Applies to: sbd-shared-disk**


1. **[A]** Enable the SBD service.
   ```bash
   sudo systemctl enable sbd
   ```
1. **[A]** Enable software watchdog.
   ```bash
   echo softdog | sudo tee /etc/modules-load.d/softdog.conf
   sudo modprobe softdog
   ```
1. **[A]** Discover the iSCSI device ID.
   1. Determine mount point based on LUN number
      ```bash
      ls -l /dev/disk/azure/scsi1/lun1
      lrwxrwxrwx. 1 root root 12 Apr 16 20:22 /dev/disk/azure/scsi1/lun1 -> ../../../sdb
      ```
   1. Get the iSCSI device ID from mount.
      ```bash
      ls -l /dev/disk/by-id/scsi-3* | grep -i sdb
      lrwxrwxrwx. 1 root root  9 Apr 16 20:22 /dev/disk/by-id/scsi-360022480055c9f501a24256ea0f87617 -> ../../sdb
      ```
1. **[1]** Create the SBD device.
   ```bash
   sudo sbd -d /dev/disk/by-id/scsi-360022480055c9f501a24256ea0f87617 -1 60 -4 120 create
   ```

5. **[1]** Add the SBD device to the cluster.
   ```bash
   sudo pcs stonith create sbd fence_sbd devices=/dev/disk/by-id/scsi-360022480055c9f501a24256ea0f87617 op monitor interval=600 timeout=15
   ```
1. **[1]** Change SBD configuration settings.
   ```bash
   sudo pcs property set stonith-timeout=210
   sudo pcs property set stonith-enabled=true
   ```
1. **[A]** Validate SBD config file.
   ```bash
   sudo vi /etc/sysconfig/sbd
   ```
   ```/etc/sysconfig/sbd
   [...]
   SBD_DELAY_START=no
   [...]
   SBD_PACEMAKER=yes
   [...]
   SBD_STARTMODE=always
   [...]
   ```


**Applies to: sbd-iscsi**

1. **[A]** Enable the required services.
   ```bash
   sudo systemctl enable sbd iscsi iscsid
   ```
1. **[A]** Enable software watchdog.
   ```bash
   echo softdog | sudo tee /etc/modules-load.d/softdog.conf
   sudo modprobe softdog
   ```
1. **[1]** Update the `InitiatorName` for node 1.
   ```bash
   sudo vi /etc/iscsi/initiatorname.iscsi
   [...]
   InitiatorName=iqn.2006-04.sap-cl1.local:sap-cl1
   ```
1. **[2]** Update the `InitiatorName` for node 2.
   ```bash
   # Node 2
   sudo vi /etc/iscsi/initiatorname.iscsi
   [...]
   InitiatorName=iqn.2006-04.sap-cl2.local:sap-cl2
   ```
1. **[A]** Restart the iSCSI services.
   ```bash
   sudo systemctl restart iscsi iscsid
   ```
1. **[A]** Mount the iSCSI targets from all the iSCSI host servers.
   ```bash
   for hostServer in sbd-iscsi1 sbd-iscsi2 sbd-iscsi3; do
      iscsiadm -m discovery --type=st --portal=${hostServer}:3260 
      iscsiadm -m node -T iqn.2006-04.ascsnw1.local:ascsnw1 --login --portal=${hostServer}:3260
      iscsiadm -m node --portal=${hostServer}:3260 -T iqn.2006-04.ascsnw1.local:ascsnw1 --op=update --name=node.startup --value=automatic
   done
   ```
1. **[A]** Discover the iSCSI device IDs.
   1. Determine the iSCSI mount points.
      ```bash
      lsscsi
      [0:0:0:0]    disk    Msft     Virtual Disk     1.0   /dev/sda
      [1:0:0:1]    disk    Msft     Virtual Disk     1.0   /dev/sdb
      [2:0:0:0]    disk    LIO-ORG  sbdascsnw1       4.0   /dev/sdc
      [3:0:0:0]    disk    LIO-ORG  sbdascsnw1       4.0   /dev/sdd
      [4:0:0:0]    disk    LIO-ORG  sbdascsnw1       4.0   /dev/sde
      ```
   1. Get the iSCSI device IDs.
      ```bash
      ls -l /dev/disk/by-id/scsi-3* | grep sd[c,d,e]
      lrwxrwxrwx 1 root root  9 Jul 21 18:02 /dev/disk/by-id/scsi-3600140537cf4c6d604a4ae4b58f1a528 -> ../../sdd
      lrwxrwxrwx 1 root root  9 Jul 21 17:50 /dev/disk/by-id/scsi-360014056e4d07b80e1148ac973330dff -> ../../sdc
      lrwxrwxrwx 1 root root  9 Jul 21 18:04 /dev/disk/by-id/scsi-360014059f135275c24647d49268123e5 -> ../../sde
      ```
1. **[1]** Create the SBD devices.
   ```bash
   sudo sbd -d /dev/disk/by-id/scsi-3600140537cf4c6d604a4ae4b58f1a528 -1 60 -4 120 create
   sudo sbd -d /dev/disk/by-id/scsi-360014056e4d07b80e1148ac973330dff -1 60 -4 120 create
   sudo sbd -d /dev/disk/by-id/scsi-360014059f135275c24647d49268123e5 -1 60 -4 120 create
   ```

9. **[1]** Add the SBD devices to the cluster.
   ```bash
   sudo pcs stonith create sbd fence_sbd \
      devices=/dev/disk/by-id/scsi-3600140537cf4c6d604a4ae4b58f1a528,/dev/disk/by-id/scsi-360014056e4d07b80e1148ac973330dff,/dev/disk/by-id/scsi-360014059f135275c24647d49268123e5 \
      op monitor interval=600 timeout=120
   ```
1. **[1]** Change SBD configuration settings.
   ```bash
   sudo pcs property set stonith-timeout=210
   sudo pcs property set stonith-enabled=true
   ```
1. **[A]** Validate SBD config file.
   ```bash
   sudo vi /etc/sysconfig/sbd
   ```
   ```/etc/sysconfig/sbd
   [...]
   SBD_DELAY_START=no
   [...]
   SBD_PACEMAKER=yes
   [...]
   SBD_STARTMODE=always
   [...]
   ```


**Applies to: azure-fence-agent**

1. **[1]** Configure Azure Fence Agent.
   > **Note:**
   > When using Azure government cloud, you must specify the `cloud=` option when configuring the Azure Fence Agent. For example, `cloud=usgov` for the Azure US government cloud.

   #### [Managed identity](#tab/msi)
   ```bash
   sudo pcs stonith create rsc_st_azure fence_azure_arm msi=true \
      resourceGroup="<ResourceGroupName>" subscriptionId="<SubscriptionID>" \
      pcmk_host_map="sap-cl1:<AzureVMNameCL1>;sap-cl2:<AzureVMNameCL2>" \
      power_timeout=240 pcmk_reboot_timeout=900 pcmk_monitor_timeout=120 \
      pcmk_monitor_retries=4 pcmk_action_limit=3 pcmk_delay_max=15 \
      meta failure-timeout=120s op monitor interval=3600 timeout=120
   ```
   #### [Service principal](#tab/spn)
   ```bash
   sudo pcs stonith create rsc_st_azure fence_azure_arm \
      username="<ClientID>" password="<ClientSecret>" tenantId="<TenantID>" \
      resourceGroup="<ResourceGroupName>" subscriptionId="<SubscriptionID>" \
      pcmk_host_map="sap-cl1:<AzureVMNameCL1>;sap-cl2:<AzureVMNameCL2>" \
      power_timeout=240 pcmk_reboot_timeout=900 pcmk_monitor_timeout=120 \
      pcmk_monitor_retries=4 pcmk_action_limit=3 pcmk_delay_max=15 \
      meta failure-timeout=120s op monitor interval=3600 timeout=120
   ```
1. **[1]** Configure the cluster for Azure Fence Agent.
   ```bash
   sudo pcs property set stonith-enabled=true
   sudo pcs property set stonith-timeout=900
   ```


### Building a Pacemaker cluster with more than two nodes

If you're building a larger cluster, keep these considerations in mind:
1. **[1]** Adjust cluster configuration.

   The `Votequorum - Expected votes` and `Votequorum - Flags - 2Node` values automatically update when you add a third or more nodes. Validate the `2Node` flag is absent and `Votequorum - Expected votes` equals the number of nodes in your cluster.
   ```bash
   sudo pcs quorum status
   
   Quorum information
   ------------------
   [...]
   
   Votequorum information
   ----------------------
   Expected votes:   3
   Highest expected: 3
   Total votes:      3
   Quorum:           2
   Flags:            Quorate WaitForAll
   
   Membership information
   ----------------------
   [...]
   ```

1. Adjust fencing configuration.
   **Applies to: sbd-shared-disk,sbd-iscsi**

   ```bash
   sudo crm resource param stonith-sbd delete pcmk_delay_max
   sudo crm resource param stonith-sbd set pcmk_action_limit -1
   ```

   **Applies to: azure-fence-agent**

   ```bash
   sudo crm resource param rsc_st_azure delete pcmk_delay_max
   sudo crm resource param rsc_st_azure pcmk_action_limit -1
   ```


## Configure Pacemaker for Azure scheduled events

[Scheduled Events][azdoc-vm-linux-scheduled-events] is an Azure Metadata Service that gives your application time to prepare for VM maintenance. It provides information about upcoming maintenance events, such as a reboot, so that your application can prepare for them and limit disruption. 

The [azure-events-az][github-clusterlabs-resource-agents-pr] resource agent monitors this metadata service. When the agent detects events and determines that another cluster node is available, it sets a node-level health attribute `#health-azure` to `-1000000`. This value causes the cluster to consider the node unhealthy and migrates resources away from the affected node. The location constraint ensures resources starting with `health-` are excluded, as the azure-events-az agent still needs to run on both nodes. Once the affected cluster node is free of running cluster resources, the agent notifies the metadata service and the scheduled event can continue. When all events complete, the resource agent sets the `#health-azure` attribute back to `0`, marking the node as healthy again.

> **Important:**
> Previously, this document described the use of resource agent [azure-events][github-clusterlabs-azure-events]. New resource agent [azure-events-az][github-clusterlabs-azure-events-az] fully supports Azure environments deployed in different availability zones.
> Use the newer azure-events-az agent for all SAP highly available systems with Pacemaker.

[azdoc-vm-linux-scheduled-events]: https://learn.microsoft.com/azure/virtual-machines/linux/scheduled-events
[github-clusterlabs-resource-agents-pr]: https://github.com/ClusterLabs/resource-agents/pull/1161
[github-clusterlabs-azure-events]: https://github.com/ClusterLabs/resource-agents/blob/main/heartbeat/azure-events.in
[github-clusterlabs-azure-events-az]: https://github.com/ClusterLabs/resource-agents/blob/main/heartbeat/azure-events-az.in

1. Install and update the `resource-agents` package.
   ```bash
   sudo dnf install -y resource-agents
   ```

1. **[1]** Place the cluster in maintenance mode.
   ```bash
   sudo pcs property set maintenance-mode=true
   ```
1. **[1]** Set the Pacemaker cluster health node strategy and constraint.
   > **Important:**
   > Don't define any other resources in the cluster starting with `health-` besides the resources described in the next steps.

   #### [RHEL 10](#tab/rhel10)
   ```bash
   sudo pcs property set node-health-strategy=custom
   sudo pcs constraint location 'regexp%!health-.*' \
      rule score-attribute='#health-azure' \
      "defined #uname"
   ```
   #### [RHEL 9 / RHEL 8](#tab/rhel9+rhel8)
   ```bash
   sudo pcs property set node-health-strategy=custom
   sudo pcs constraint location 'regexp%!health-.*' \
      rule score-attribute='#health-azure' \
      defined '#uname'
   ```
1. **[1]** Set the initial value of the cluster attributes. 

   Run a command for each cluster node. For scale-out environments include the majority maker VM.

   ```bash
   # Node 1
   sudo crm_attribute --node sap-cl1 --name '#health-azure' --update 0
   # Node 2
   sudo crm_attribute --node sap-cl2 --name '#health-azure' --update 0
   # Node N
   sudo crm_attribute --node sap-clN --name '#health-azure' --update 0
   ```

1. **[1]** Configure the resources in Pacemaker. The resources must start with `health-azure`.
   ```bash
   sudo pcs resource create health-azure-events \
      ocf:heartbeat:azure-events-az \
      meta failure-timeout=120s \
      op monitor interval=10s timeout=240s \
      op start timeout=10s start-delay=90s
   ```
   #### [RHEL 10](#tab/rhel10)
   ```bash
   sudo pcs resource clone health-azure-events meta allow-unhealthy-nodes=true
   ```
   #### [RHEL 9 / RHEL 8](#tab/rhel9+rhel8)
   ```bash
   sudo pcs resource clone health-azure-events allow-unhealthy-nodes=true
   ```

1. Take the Pacemaker cluster out of maintenance mode and clear any errors

   ```bash
   sudo pcs property set maintenance-mode=false
   sudo pcs resource cleanup
   ```

1. Verify that `health-azure-events` starts successfully on all nodes.
   ```bash
   sudo pcs status

      Cluster name: ascsnw1
      Cluster Summary:
        * Stack: corosync (Pacemaker is running)
        * Current DC: sap-cl1 (version 3.0.0-5.1.el10_0-8818a21) - partition with quorum
        * Last updated: Tue May 19 22:15:08 2026 on sap-cl1
        * Last change:  Tue Apr 21 23:11:34 2026 by root via root on sap-cl1
        * 2 nodes configured
        * 3 resource instances configured
      
      Node List:
        * Online: [ sap-cl1 sap-cl2 ]
      
      Full List of Resources:
        * sbd (stonith:fence_sbd):     Started sap-cl1
        * Clone Set: health-azure-events-clone [health-azure-events]:
          * Started: [ sap-cl1 sap-cl2 ]

      Daemon Status:
        corosync: active/disabled
        pacemaker: active/disabled
        pcsd: active/enabled
        sbd: active/enabled
   ```

   First-time query execution for scheduled events [can take up to two minutes][azdoc-vm-linux-scheduled-events-enable]. Pacemaker testing with scheduled events can use reboot or redeploy actions for the cluster VMs. For more information, see [Scheduled events][azdoc-vm-linux-scheduled-events].

## Optional fencing configuration  

> **Tip:**
> This section is only applicable if you want to configure the special fencing device `fence_kdump`.  

If you need to collect diagnostic information within the VM, it might be useful to configure another fencing device based on the fence agent `fence_kdump`. The `fence_kdump` agent can detect that a node entered kdump crash recovery and can allow the crash recovery service to complete before other fencing methods are invoked. Note that `fence_kdump` isn't a replacement for traditional fence mechanisms, like the SBD or Azure fence agent, when you're using Azure VMs.

> **Important:**
> Be aware that when `fence_kdump` is configured as a first-level fencing device, it introduces delays in the fencing operations and, respectively, delays in the application resources failover.
>
> If a crash dump is successfully detected, the fencing is delayed until the crash recovery service completes. If the failed node is unreachable or if it doesn't respond, the fencing is delayed by time determined, the configured number of iterations, and the `fence_kdump` timeout.
>
> The proposed `fence_kdump` timeout might need to be adapted to the specific environment.
>
> We recommend that you configure `fence_kdump` fencing only when necessary to collect diagnostics within the VM and always in combination with traditional fence methods, such as SBD or Azure fence agent.

The following Red Hat KB articles contain important information about configuring `fence_kdump` fencing:

* See [How do I configure fence_kdump in a Red Hat Pacemaker cluster?][rheldoc-ha-fence_kdump]
* See [How to configure/manage fencing levels in an RHEL cluster with Pacemaker][rheldoc-ha-fencing-levels].
* For information on how to change the default timeout, see [How do I configure kdump for use with the RHEL 6, 7, 8 HA Add-On?][rheldoc-ha-fence_kdump-timeout]
* For information on how to reduce failover delay when you use `fence_kdump`, see [Can I reduce the expected delay of failover when adding fence_kdump configuration?][rheldoc-ha-fence_kdump-reduce-delay]
  

Run the following optional steps to add `fence_kdump` as a first-level fencing configuration, in addition to the Azure fence agent configuration.

1. **[A]** Verify that `kdump` is active and configured.

    ```bash
    systemctl is-active kdump
    # Expected result
    # active
    ```

1. **[A]** Install the `fence_kdump` fence agent.
   ```bash
   sudo dnf install -y fence-agents-kdump
   ```

1. **[1]** Create a `fence_kdump` fencing device in the cluster.

    ```bash
    pcs stonith create rsc_st_kdump fence_kdump pcmk_reboot_action="off" pcmk_host_list="sap-cl1 sap-cl2" timeout=30
    ```

1. **[1]** Configure fencing levels so that the `fence_kdump` fencing mechanism is engaged first.  

    ```bash
    pcs stonith create rsc_st_kdump fence_kdump pcmk_reboot_action="off" pcmk_host_list="sap-cl1 sap-cl2"
    pcs stonith level add 1 sap-cl1 rsc_st_kdump
    pcs stonith level add 1 sap-cl2 rsc_st_kdump
    # Replace <stonith-resource-name> to the resource name of the STONITH resource configured in your pacemaker cluster (example based on above configuration - sbd or rsc_st_azure)
    pcs stonith level add 2 sap-cl1 <stonith-resource-name>
    pcs stonith level add 2 sap-cl2 <stonith-resource-name>
    
    # Check the fencing level configuration 
    pcs stonith level
    # Example output
    # Target: sap-cl1
    # Level 1 - rsc_st_kdump
    # Level 2 - <stonith-resource-name>
    # Target: sap-cl2
    # Level 1 - rsc_st_kdump
    # Level 2 - <stonith-resource-name>
    ```

1. **[A]** Allow the required ports for `fence_kdump` through the firewall.

   ```bash
   firewall-cmd --add-port=7410/udp --permanent
   firewall-cmd --reload
   ```

1. **[A]** Perform the `fence_kdump_nodes` configuration in `/etc/kdump.conf` to avoid  `fence_kdump` from failing with a timeout for some `kexec-tools` versions. For more information, see [fence_kdump times out when fence_kdump_nodes isn't specified with kexec-tools version 2.0.15 or later][rheldoc-ha-fence_kdump-timeout-kexec]. The example configuration for a two-node cluster is presented here. After you make a change in `/etc/kdump.conf`, the kdump image must be regenerated. To regenerate, restart the `kdump` service.  

    ```bash
    vi /etc/kdump.conf
    # On node prod-cl1-0 make sure the following line is added
    fence_kdump_nodes  prod-cl1-1
    # On node prod-cl1-1 make sure the following line is added
    fence_kdump_nodes  prod-cl1-0
    
    # Restart the service on each node
    systemctl restart kdump
    ```

1. **[A]** Ensure that the `initramfs` image file contains the `fence_kdump` and `hosts` files.

    ```bash
    lsinitrd /boot/initramfs-$(uname -r)kdump.img | egrep "fence|hosts"
    # Example output 
    # -rw-r--r--   1 root     root          208 Jun  7 21:42 etc/hosts
    # -rwxr-xr-x   1 root     root        15560 Jun 17 14:59 usr/libexec/fence_kdump_send
    ```

1. Test the configuration by crashing a node. 

    > **Important:**
    > If the cluster is already in productive use, plan the test accordingly because crashing a node has an impact on the application.

    ```bash
    echo c > /proc/sysrq-trigger
    ```

## Next steps

- [Azure Virtual Machines planning and implementation for SAP][azdoc-sap-planning-guide].
- [Azure Virtual Machines deployment for SAP][azdoc-sap-deployment-guide].
- [Azure Virtual Machines DBMS deployment for SAP][azdoc-sap-dbms-guide].
- [High availability for NFS Simple Mount on Azure VMs on Red Hat Enterprise Linux][azdoc-sap-rhel-ha-simplemount].
- To learn how to establish high availability and plan for disaster recovery of SAP HANA on Azure VMs, see [High availability of SAP HANA on Azure Virtual Machines][azdoc-sap-hana-ha].



[rheldoc-ha-guide]: https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/configuring_and_managing_high_availability_clusters/index
[rheldoc-ha-support-sbd-fence_sbd]: https://access.redhat.com/articles/2800691
[rheldoc-ha-support-fence_azure_arm]: https://access.redhat.com/articles/6627541
[rheldoc-ha-softdog-limitations]: https://access.redhat.com/articles/7034141
[rheldoc-ha-sbd-fence_sbd]: https://access.redhat.com/articles/2943361
[rheldoc-ha-sbd-considerations]: https://access.redhat.com/articles/2941601
[rheldoc-ha-rhel8-considerations]: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/considerations_in_adopting_rhel_8/high-availability-and-clusters_considerations-in-adopting-rhel-8
[rheldoc-ha-support-azure]: https://access.redhat.com/articles/3131341
[rheldoc-ha-design-azure]: https://access.redhat.com/articles/3402391
[rheldoc-sap-ha-support]: https://access.redhat.com/articles/4016901
[rheldoc-ha-fence_kdump]: https://access.redhat.com/solutions/2876971
[rheldoc-ha-fencing-levels]: https://access.redhat.com/solutions/891323
[rheldoc-ha-fence_kdump-timeout]: https://access.redhat.com/articles/67570
[rheldoc-ha-fence_kdump-reduce-delay]: https://access.redhat.com/solutions/5512331
[rheldoc-ha-fence_kdump-timeout-kexec]: https://access.redhat.com/solutions/4498151

[azdoc-sap-planning-guide]: https://learn.microsoft.com/azure/sap/workloads/planning-guide
[azdoc-sap-deployment-guide]: https://learn.microsoft.com/azure/sap/workloads/deployment-guide
[azdoc-sap-dbms-guide]: https://learn.microsoft.com/azure/sap/workloads/dbms-guide-general
[azdoc-sap-hana-ha]: https://learn.microsoft.com/azure/sap/workloads/sap-hana-high-availability
[azdoc-sap-rhel-ha-simplemount]: https://learn.microsoft.com/azure/sap/workloads/high-availability-guide-rhel-nfs-simple-mount

[azdoc-vm-linux-scheduled-events-enable]: https://learn.microsoft.com/azure/virtual-machines/linux/scheduled-events#enabling-and-disabling-scheduled-events
[azdoc-vm-linux-scheduled-events]: https://learn.microsoft.com/azure/virtual-machines/linux/scheduled-events
