---
title: Set up Pacemaker on SUSE Linux Enterprise Server (SLES) in Azure | Microsoft Docs
description: This article discusses how to set up Pacemaker on SUSE Linux Enterprise Server in Azure.
services: virtual-machines-windows,virtual-network,storage
author: rdeltcheva
manager: juergent
ms.service: sap-on-azure
ms.subservice: sap-vm-workloads
ms.topic: article
ms.custom: devx-track-azurepowershell, linux-related-content
ms.date: 08/01/2026
ms.author: radeltch
# Customer intent: "As a system administrator, I want to set up Pacemaker with fencing on SUSE Linux Enterprise Server in Azure, so that I can ensure high availability and reliability for my applications running in the cloud."
zone_pivot_groups: sap-pacemaker-fencing-solution
---

# Set up Pacemaker on SUSE Linux Enterprise Server in Azure

This article explains how to set up and configure a basic two node Pacemaker cluster on SUSE Linux Enterprise Server (SLES) in Azure. These instructions cover `SLES for SAP 12 SP5`, `SLES for SAP 15 SP 4+`, and  `SLES for SAP 16`.

## Prerequisites

* SLES High Availability (HA) documentation
   * [SLES High Availability Administration Guide][susedoc-ha-admin-guide]
   * [SLES 16 High Availability Documentation Hub][susedoc-ha-sles16-hub]

* SLES documentation for SAP Offerings
   * [SLES Supported High Availability Solutions for SAP Applications][susedoc-ha-sap]

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

1. Deploy three virtual machines that run on a supported SLES OS version. The VMs don't need to be large. VM sizes such as Standard_E2s or Standard_D2s are sufficient.
   > **Note:**
   > You don't need to use SLES for SAP Applications OS image for the iSCSI target server. You can use a standard SLES OS image instead. However, the support life cycle varies between different OS product releases.

1. Install the latest updates, and reboot if required.
   ```bash
   sudo zypper -n update
   ```
1. Install the iSCSI target package.
   ```bash
   sudo zypper -n install targetcli-fb
   ```
1. Enable and start the iSCSI service.
   ```bash
   sudo systemctl start targetcli
   sudo systemctl enable targetcli
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
   sudo zypper -n update
   ```
1. **[A]** Install required cluster packages.
   ```bash
   sudo zypper -n install socat pacemaker resource-agents 
   ```
1. **[A]** Install required fencing packages.

   **Applies to: sbd-shared-disk**

   ```bash
   sudo zypper -n install sbd
   ```

   
   **Applies to: sbd-iscsi**

   ```bash
   sudo zypper -n install sbd open-iscsi
   ```

   
   **Applies to: azure-fence-agent**

   ```bash
   sudo zypper -n install fence-agents-azure-arm
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

   
1. **[A]** Exchange SSH root keys between the nodes.
   ```bash
   sudo ssh-keygen -t ed25519 -N "" -f /root/.ssh/id_ed25519
   sudo cat /root/.ssh/id_ed25519.pub
   sudo vi /root/.ssh/authorized_keys
   [...]
   <Contents from cat command on other server>
   ```
1. **[A]** Configure the operating system.
   1. Adjust the dirty cache for NFS clients on high memory systems. See [this][susedoc-kb17857-writeperf-nfs] article for more information.
      ```bash
      sudoedit /etc/sysctl.d/30-nfs.conf && sudo sysctl --system
      ```
      ```/etc/sysctl.d/30-nfs.conf
      vm.dirty_bytes = 629145600
      vm.dirty_background_bytes = 314572800
      ```
   1. Make sure `vm.swappiness` is set to 10 to reduce swap usage and favor memory.
      ```bash
      sudoedit /etc/sysctl.d/31-memswap.conf && sudo sysctl --system
      ```
      ```/etc/sysctl.d/31-memswap.conf
      vm.swappiness = 10
      ```
   1. **SLES 12 SP 5 Only**: Pacemaker occasionally creates many processes, which can exhaust the allowed number. When this happens, a heartbeat between the cluster nodes might fail and lead to a failover of your resources. Increase the maximum number of allowed processes by setting the following parameter:
      ```bash
      # Edit the configuration file
      sudo vi /etc/systemd/system.conf
      [...]
      DefaultTasksMax=4096
      [...]
      
      # Activate this setting
      sudo systemctl daemon-reload
      
      # Test to ensure that the change was successful
      sudo systemctl --no-pager show | grep DefaultTasksMax
      ```
   
1. **[1]** Create the cluster.
   ```bash
   sudo crm cluster init --yes --name ascsnw1 --node sap-cl1 --node sap-cl2
   ```
1. **[1]** Configure cluster settings.
   ```bash
   sudo crm corosync set totem.token 30000
   sudo csync2 -xv
   sudo crm cluster run "corosync-cfgtool -R"
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
      OnBootSec=216
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
      sudo crm cluster disable --all
      ```
1. Validate the cluster.
   1. **[1]** Validate Pacemaker cluster.
      ```bash
      sudo crm status
      
      Cluster Summary:
        * Stack: corosync (Pacemaker is running)
        * Current DC: sap-cl1 (version 2.1.7+20231219.0f7f88312-150600.6.15.1-2.1.7+20231219.0f7f88312) - partition with quorum
        * Last updated: Tue Aug  4 17:50:24 2026 on sap-cl1
        * Last change:  Thu Jul 30 19:02:56 2026 by hacluster via hacluster on sap-cl1
        * 2 nodes configured
        * 0 resource instances configured
      
      Node List:
        * Online: [ sap-cl1 sap-cl2 ]
      
      Full List of Resources:
      ```
   1. **[A]** Validate services.
      ```bash
      systemctl list-unit-files pacemaker.timer pacemaker.service corosync.service
      ```
      ```output
      UNIT FILE         STATE    PRESET
      corosync.service  disabled disabled
      pacemaker.service disabled disabled
      pacemaker.timer   enabled  disabled
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
   sudo crm cluster init --yes sbd -s /dev/disk/by-id/scsi-360022480055c9f501a24256ea0f87617
   ```
1. **[1]** Change SBD configuration settings.
   ```bash
   sudo crm configure property stonith-timeout=210
   sudo crm configure property stonith-enabled=true
   # For the below command, 600 is the interval, and 120 is the timeout
   sudo crm configure monitor stonith-sbd 600:120
   sudo crm configure set stonith-sbd.pcmk_delay_max 15
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
   sudo crm cluster init --yes sbd \
      -s /dev/disk/by-id/scsi-3600140537cf4c6d604a4ae4b58f1a528 \
      -s /dev/disk/by-id/scsi-360014056e4d07b80e1148ac973330dff \
      -s /dev/disk/by-id/scsi-360014059f135275c24647d49268123e5
   ```
1. **[1]** Change SBD configuration settings.
   ```bash
   sudo crm configure property stonith-timeout=210
   sudo crm configure property stonith-enabled=true
   # For the below command, 600 is the interval, and 120 is the timeout
   sudo crm configure monitor stonith-sbd 600:120
   sudo crm configure set stonith-sbd.pcmk_delay_max 15
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
   sudo crm configure primitive rsc_st_azure stonith:fence_azure_arm params msi=true \ 
      resourceGroup="<ResourceGroupName>" subscriptionId="<SubscriptionID>" \
      pcmk_host_map="sap-cl1:<AzureVMNameCL1>;sap-cl2:<AzureVMNameCL2>" \
      power_timeout=240 pcmk_reboot_timeout=900 pcmk_monitor_timeout=120 \
      pcmk_monitor_retries=4 pcmk_action_limit=3 pcmk_delay_max=15 \
      meta failure-timeout=120s op monitor interval=3600 timeout=120
   ```
   #### [Service principal](#tab/spn)
   ```bash
   sudo crm configure primitive rsc_st_azure stonith:fence_azure_arm params \
      login="<ClientID>" passwd="<ClientSecret>" tenantId="<TenantID>" \
      resourceGroup="<ResourceGroupName>" subscriptionId="<SubscriptionID>" \
      pcmk_host_map="sap-cl1:<AzureVMNameCL1>;sap-cl2:<AzureVMNameCL2>" \
      power_timeout=240 pcmk_reboot_timeout=900 pcmk_monitor_timeout=120 \
      pcmk_monitor_retries=4 pcmk_action_limit=3 pcmk_delay_max=15 \
      meta failure-timeout=120s op monitor interval=3600 timeout=120
   ```
1. **[1]** Configure the cluster for Azure Fence Agent.
   ```bash
   sudo crm configure property stonith-enabled=true
   sudo crm configure property stonith-timeout=900
   ```


### Building a Pacemaker cluster with more than two nodes

If you're building a larger cluster, keep these considerations in mind:
1. **[1]** Adjust cluster configuration.

   The `quorum.two_node` and `quorum.expected_votes` values automatically update when you add a third or more nodes. Validate the `quorum.two_node` is `0` and `quorum.expected_votes` equals the number of nodes in your cluster.
   ```bash
   sudo crm corosync get quorum.two_node
   sudo crm corosync get quorum.expected_votes
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

1. **SLES 12 SP5 Only** Check your version of the `resource-agents` package and update if required.  SLES 15 and higher include it by default in their installed versions.

   ```bash
   zypper info resource-agents
   ```
   The minimum version is `resource-agents-4.3.018.a7fb5035-3.98.1`.

1. **[1]** Place the cluster in maintenance mode.
   ```bash
   sudo crm configure property maintenance-mode=true
   ```
1. **[1]** Set the pacemaker cluster health node strategy and constraint.
   > **Important:**
   > Don't define any other resources in the cluster starting with `health-`, besides the resources described in the next steps.

   ```bash
   sudo crm configure property node-health-strategy=custom
   sudo crm configure location loc_azure_health \
      /'!health-.*'/ rule '#health-azure': defined '#uname'
   ```

1. **[1]** Set initial value of the cluster attributes.
   
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
   sudo crm configure primitive health-azure-events ocf:heartbeat:azure-events-az \
      meta failure-timeout=120s \
      op start start-delay=60s \
      op monitor interval=10s
   
   sudo crm configure clone health-azure-events-cln health-azure-events \
      meta allow-unhealthy-nodes=true
   ```

   > **Note:**
   > When you configure the `health-azure-events` resource, you can ignore the following warning message.
   >
   > WARNING: health-azure-events: unknown attribute 'allow-unhealthy-nodes'.

1. Take the Pacemaker cluster out of maintenance mode and clear any errors.

   ```bash
   sudo crm configure property maintenance-mode=false
   sudo crm resource cleanup
   ```

1. Verify that `health-azure-events` starts successfully on all nodes.

   ```bash
   crm status
   
   Cluster Summary:
     * Stack: corosync (Pacemaker is running)
     * Current DC: sap-cl1 (version 3.0.0+20250218.64cd85422c-160000.4.1-3.0.0+20250218.64cd85422c) - partition with quorum
     * Last updated: Thu Jul 30 19:07:49 2026 on sap-cl1
     * Last change:  Thu Jul 30 19:06:01 2026 by root via root on sap-cl1
     * 2 nodes configured
     * 3 resource instances configured
   
   Node List:
     * Online: [ z04ascs3 z04ascs4 ]
   
   Full List of Resources:
     * stonith-sbd (stonith:fence_sbd):     Started sap-cl1
     * Clone Set: health-azure-events-cln [health-azure-events]:
       * Started: [ sap-cl1 sap-cl2 ]
   ```

   The first time query execution for scheduled events [can take up to 2 minutes][azdoc-vm-linux-scheduled-events-enable]. Pacemaker testing with scheduled events can use reboot or redeploy actions for the cluster VMs. For more information, see [scheduled events][azdoc-vm-linux-scheduled-events].

   > **Note:**
   > After you configure the Pacemaker resources for the azure-events agent, if you place the cluster in or out of maintenance mode, you might get warning messages such as:
   >
   > WARNING: cib-bootstrap-options: unknown attribute 'hostName_**hostname**'  
   > WARNING: cib-bootstrap-options: unknown attribute 'azure-events_globalPullState'  
   > WARNING: cib-bootstrap-options: unknown attribute 'hostName_ **hostname**'  
   > You can ignore these warning messages.

## Next steps

- [Azure Virtual Machines planning and implementation for SAP][azdoc-sap-planning-guide].
- [Azure Virtual Machines deployment for SAP][azdoc-sap-deployment-guide].
- [Azure Virtual Machines DBMS deployment for SAP][azdoc-sap-dbms-guide].
- [High availability for NFS Simple Mount on Azure VMs on SUSE Linux Enterprise Server][azdoc-sap-sles-ha-simplemount].
- To learn how to establish high availability and plan for disaster recovery of SAP HANA on Azure VMs, see [High availability of SAP HANA on Azure Virtual Machines][azdoc-sap-hana-ha].


[susedoc-ha-watchdog]: https://documentation.suse.com/sle-ha/15-SP7/html/SLE-HA-all/cha-ha-storage-protect.html#sec-ha-storage-protect-sw-watchdog
[susedoc-ha-admin-guide]: https://documentation.suse.com/sle-ha/15-SP6/html/SLE-HA-all/book-administration.html
[susedoc-ha-sles16-hub]: https://documentation.suse.com/sle-ha/16.0/
[susedoc-ha-azure]: https://documentation.suse.com/sbp/sap-15/html/SBP-SAP-HANA-PerOpt-HA-Azure/index.html
[susedoc-ha-sap]: https://documentation.suse.com/en-us/sles-sap/sap-ha-support/html/sap-ha-support/index.html
[susedoc-kb17857-writeperf-nfs]: https://support.scc.suse.com/s/kb/Low-write-performance-on-SLES-servers-with-remote-storage-1583239384308?language=en_US




[azdoc-sap-planning-guide]: https://learn.microsoft.com/azure/sap/workloads/planning-guide
[azdoc-sap-deployment-guide]: https://learn.microsoft.com/azure/sap/workloads/deployment-guide
[azdoc-sap-dbms-guide]: https://learn.microsoft.com/azure/sap/workloads/dbms-guide-general
[azdoc-sap-hana-ha]: https://learn.microsoft.com/azure/sap/workloads/sap-hana-high-availability
[azdoc-sap-sles-ha-simplemount]: https://learn.microsoft.com/azure/sap/workloads/high-availability-guide-suse-nfs-simple-mount


[azdoc-vm-linux-scheduled-events-enable]: https://learn.microsoft.com/azure/virtual-machines/linux/scheduled-events#enabling-and-disabling-scheduled-events
[azdoc-vm-linux-scheduled-events]: https://learn.microsoft.com/azure/virtual-machines/linux/scheduled-events
