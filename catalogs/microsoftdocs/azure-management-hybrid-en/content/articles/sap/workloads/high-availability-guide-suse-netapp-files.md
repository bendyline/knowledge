---
title: Azure VMs high availability for SAP NW on SLES with Azure NetApp Files| Microsoft Docs
description: High-availability guide for SAP NetWeaver on SUSE Linux Enterprise Server with Azure NetApp Files for SAP applications
services: virtual-machines-windows,virtual-network,storage
author: rdeltcheva
manager: juergent
ms.service: sap-on-azure
ms.subservice: sap-vm-workloads
ms.topic: article
ms.date: 11/19/2024
ms.author: radeltch
ms.custom:
  - devx-track-azurecli
  - devx-track-azurepowershell
  - linux-related-content
  - sfi-image-nochange
# Customer intent: "As an SAP administrator, I want to configure high availability for SAP NetWeaver on SUSE Linux with Azure NetApp Files, so that I can ensure system reliability and performance in a cloud environment."
---

# High availability for SAP NetWeaver on Azure VMs on SUSE Linux Enterprise Server with Azure NetApp Files for SAP applications

[dbms-guide]:dbms-guide-general.md
[deployment-guide]:deployment-guide.md
[planning-guide]:planning-guide.md

[anf-azure-doc]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-introduction.md
[anf-avail-matrix]:https://azure.microsoft.com/global-infrastructure/services/?products=storage&regions=all
[anf-sap-applications-azure]:https://www.netapp.com/us/media/tr-4746.pdf

[2205917]:https://launchpad.support.sap.com/#/notes/2205917
[1944799]:https://launchpad.support.sap.com/#/notes/1944799
[1928533]:https://launchpad.support.sap.com/#/notes/1928533
[2015553]:https://launchpad.support.sap.com/#/notes/2015553
[2178632]:https://launchpad.support.sap.com/#/notes/2178632
[2191498]:https://launchpad.support.sap.com/#/notes/2191498
[2243692]:https://launchpad.support.sap.com/#/notes/2243692
[1984787]:https://launchpad.support.sap.com/#/notes/1984787
[1999351]:https://launchpad.support.sap.com/#/notes/1999351
[1410736]:https://launchpad.support.sap.com/#/notes/1410736

[suse-ha-guide]:https://www.suse.com/products/sles-for-sap/resource-library/sap-best-practices/
[suse-ha-12sp3-relnotes]:https://www.suse.com/releasenotes/x86_64/SLE-HA/12-SP3/

[sap-hana-ha]:sap-hana-high-availability.md

This article explains how to configure high availability for SAP NetWeaver application with [Azure NetApp Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-introduction.md).

For new implementations on SLES for SAP Applications 15, we  recommended deploying high availability for SAP ASCS/ERS in [simple mount configuration](high-availability-guide-suse-nfs-simple-mount.md). The classic Pacemaker configuration, based on cluster-controlled file systems for the SAP central services directories, described in this article is still [supported](https://documentation.suse.com/sbp/all/single-html/SAP-nw740-sle15-setupguide/#id-introduction).

In the example configurations, installation commands etc., the ASCS instance is number 00, the ERS instance number 01, the Primary Application instance (PAS) is 02 and the Application instance (AAS) is 03. SAP System ID QAS is used. The database layer isn't covered in detail in this article.

Read the following SAP Notes and papers first:

* [Azure NetApp Files documentation][anf-azure-doc]
* SAP Note [1928533][1928533], which has:  
  * List of Azure VM sizes that are supported for the deployment of SAP software
  * Important capacity information for Azure VM sizes
  * Supported SAP software, and operating system (OS) and database combinations
  * Required SAP kernel version for Windows and Linux on Microsoft Azure
* SAP Note [2015553][2015553] lists prerequisites for SAP-supported SAP software deployments in Azure.
* SAP Note [2205917][2205917] has recommended OS settings for SUSE Linux Enterprise Server for SAP Applications
* SAP Note [1944799][1944799] has SAP HANA Guidelines for SUSE Linux Enterprise Server for SAP Applications
* SAP Note [2178632][2178632] has detailed information about all monitoring metrics reported for SAP in Azure.
* SAP Note [2191498][2191498] has the required SAP Host Agent version for Linux in Azure.
* SAP Note [2243692][2243692] has information about SAP licensing on Linux in Azure.
* SAP Note [1984787][1984787] has general information about SUSE Linux Enterprise Server 12.
* SAP Note [1999351][1999351] has additional troubleshooting information for the Azure Enhanced Monitoring Extension for SAP.
* [SAP Community WIKI](https://wiki.scn.sap.com/wiki/display/HOME/SAPonLinuxNotes) has all required SAP Notes for Linux.
* [Azure Virtual Machines planning and implementation for SAP on Linux][planning-guide]
* [Azure Virtual Machines deployment for SAP on Linux][deployment-guide]
* [Azure Virtual Machines DBMS deployment for SAP on Linux][dbms-guide]
* [SUSE SAP HA Best Practice Guides][suse-ha-guide]
  The guides contain all required information to set up Netweaver HA and SAP HANA System Replication on-premises. Use these guides as a general baseline. They provide much more detailed information.
* [SUSE High Availability Extension 12 SP3 Release Notes][suse-ha-12sp3-relnotes]
* [NetApp SAP Applications on Microsoft Azure using Azure NetApp Files][anf-sap-applications-azure]
* [NetApp NFS Best Practices](https://www.netapp.com/media/10720-tr-4067.pdf)

## Overview

High availability(HA) for SAP Netweaver central services requires shared storage.
To achieve that on SUSE Linux so far it was necessary to build separate highly available NFS cluster.

Now it's possible to achieve SAP Netweaver HA by using shared storage, deployed on Azure NetApp Files. Using Azure NetApp Files for the shared storage eliminates the need for additional [NFS cluster](high-availability-guide-suse-nfs.md). Pacemaker is still needed for HA of the SAP Netweaver central services(ASCS/SCS).

SAP NetWeaver High Availability overview

SAP NetWeaver ASCS, SAP NetWeaver SCS, SAP NetWeaver ERS, and the SAP HANA database use virtual hostname and virtual IP addresses. On Azure, a [load balancer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/load-balancer-overview.md) is required to use a virtual IP address. We recommend using [Standard load balancer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-public-portal.md). The presented configuration shows a load balancer with:

* Frontend IP address 10.1.1.20 for ASCS
* Frontend IP address 10.1.1.21 for ERS
* Probe port 62000 for ASCS
* Probe port 62101 for ERS

## Setting up the Azure NetApp Files infrastructure

SAP NetWeaver requires shared storage for the transport and profile directory.  Before proceeding with the setup for Azure NetApp files infrastructure, familiarize yourself with the [Azure NetApp Files documentation][anf-azure-doc].
Check if your selected Azure region offers Azure NetApp Files. The following link shows the availability of Azure NetApp Files by Azure region: [Azure NetApp Files Availability by Azure Region][anf-avail-matrix].

Azure NetApp files is available in several [Azure regions](https://azure.microsoft.com/global-infrastructure/services/?products=netapp).

### Deploy Azure NetApp Files resources  

The steps assume that you have already deployed [Azure Virtual Network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-networks-overview.md). The Azure NetApp Files resources and the VMs, where the Azure NetApp Files resources will be mounted must be deployed in the same Azure Virtual Network or in peered Azure Virtual Networks.  

1. Create the NetApp account in the selected Azure region, following the [instructions to create NetApp Account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-create-netapp-account.md).  
2. Set up Azure NetApp Files capacity pool, following the [instructions on how to set up Azure NetApp Files capacity pool](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-set-up-capacity-pool.md).  
The SAP Netweaver architecture presented in this article uses single Azure NetApp Files capacity pool, Premium SKU. We recommend Azure NetApp Files Premium SKU for SAP Netweaver application workload on Azure.  
3. Delegate a subnet to Azure NetApp files as described in the [instructions Delegate a subnet to Azure NetApp Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-delegate-subnet.md).  
4. Deploy Azure NetApp Files volumes, following the [instructions to create a volume for Azure NetApp Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-create-volumes.md). Deploy the volumes in the designated Azure NetApp Files [subnet](https://learn.microsoft.com/rest/api/virtualnetwork/subnets). The IP addresses of the Azure NetApp volumes are assigned automatically. Keep in mind that the Azure NetApp Files resources and the Azure VMs must be in the same Azure Virtual Network or in peered Azure Virtual Networks. In this example we use two Azure NetApp Files volumes: sap**QAS** and trans. The file paths that are mounted to the corresponding mount points are /usrsap**qas**/sapmnt**QAS**, /usrsap**qas**/usrsap**QAS**sys, etc.  
   1. volume sap**QAS** (nfs://10.1.0.4/usrsap**qas**/sapmnt**QAS**)
   2. volume sap**QAS** (nfs://10.1.0.4/usrsap**qas**/usrsap**QAS**ascs)
   3. volume sap**QAS** (nfs://10.1.0.4/usrsap**qas**/usrsap**QAS**sys)
   4. volume sap**QAS** (nfs://10.1.0.4/usrsap**qas**/usrsap**QAS**ers)
   5. volume trans (nfs://10.1.0.4/trans)
   6. volume sap**QAS** (nfs://10.1.0.4/usrsap**qas**/usrsap**QAS**pas)
   7. volume sap**QAS** (nfs://10.1.0.4/usrsap**qas**/usrsap**QAS**aas)

In this example, we used Azure NetApp Files for all SAP Netweaver file systems to demonstrate how Azure NetApp Files can be used. The SAP file systems that don't need to be mounted via NFS can also be deployed as [Azure disk storage](https://learn.microsoft.com/azure/virtual-machines/disks-types#premium-ssds) . In this example **a-e** must be on Azure NetApp Files and **f-g** (that is, /usr/sap/**QAS**/D**02**, /usr/sap/**QAS**/D**03**) could be deployed as Azure disk storage.

### Important considerations

When considering Azure NetApp Files for the SAP Netweaver on SUSE High Availability architecture, be aware of the following important considerations:

* For volume and capacity pool limits, see [Azure NetApp Files resource limits](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-resource-limits.md).
* Azure NetApp Files and all virtual machines, where Azure NetApp Files volumes will be mounted, must be in the same Azure Virtual Network or in [peered virtual networks](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-network-peering-overview.md) in the same region. Azure NetApp Files access over VNET peering in the same region is supported now. Azure NetApp access over global peering is not yet supported.
* The selected virtual network must have a subnet, delegated to Azure NetApp Files.
* The throughput and performance characteristics of an Azure NetApp Files volume is a function of the volume quota and service level, as documented in [Service level for Azure NetApp Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-service-levels.md). While sizing the SAP Azure NetApp volumes, make sure that the resulting throughput meets the application requirements.  
* Azure NetApp Files offers [export policy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-configure-export-policy.md): you can control the allowed clients, the access type (Read&Write, Read Only, etc.).
* Azure NetApp Files feature isn't zone aware yet. Currently Azure NetApp Files feature isn't deployed in all Availability zones in an Azure region. Be aware of the potential latency implications in some Azure regions.
* Azure NetApp Files volumes can be deployed as NFSv3 or NFSv4.1 volumes. Both protocols are supported for the SAP application layer (ASCS/ERS, SAP application servers).

## Prepare infrastructure

The resource agent for SAP Instance is included in SUSE Linux Enterprise Server for SAP Applications. An image for SUSE Linux Enterprise Server for SAP Applications 12 or 15 is available in Azure Marketplace. You can use the image to deploy new VMs.

### Deploy Linux VMs manually via Azure portal

This document assumes that you've already deployed a resource group, [Azure Virtual Network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-networks-overview.md), and subnet.

Deploy virtual machines with SLES for SAP Applications image. Choose a suitable version of SLES image that is supported for SAP system. You can deploy VM in any one of the availability options - virtual machine scale set, availability zone, or availability set.

### Configure Azure load balancer

During VM configuration, you have an option to create or select exiting load balancer in networking section. Follow the steps below to configure a standard load balancer for the high-availability setup of SAP ASCS and SAP ERS.

#### [Azure portal](#tab/lb-portal)


Follow [create load balancer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-portal.md#create-load-balancer) guide to set up a standard load balancer for a high availability SAP system using the Azure portal. During the setup of load balancer, consider following points.

1. **Frontend IP Configuration:** Create two frontend IP, one for ASCS and another for ERS. Select the same virtual network and subnet as your ASCS/ERS virtual machines.
2. **Backend Pool:** Create backend pool and add ASCS and ERS VMs.
3. **Inbound rules:** Create two load balancing rule, one for ASCS and another for ERS. Follow the same steps for both load balancing rules.
     - Frontend IP address: Select frontend IP
     - Backend pool: Select backend pool
     - Check "High availability ports"
     - Protocol: TCP
     - Health Probe: Create health probe with below details (applies for both ASCS or ERS)
       - Protocol: TCP
       - Port: [for example: 620<Instance-no.> for ASCS, 621<Instance-no.> for ERS]
       - Interval: 5
       - Probe Threshold: 2
     - Idle timeout (minutes): 30
     - Check "Enable Floating IP"

> **Note:**
>
> Health probe configuration property numberOfProbes, otherwise known as "Unhealthy threshold" in Portal, isn't respected. So to control the number of successful or failed consecutive probes, set the property "probeThreshold" to 2. It is currently not possible to set this property using Azure portal, so use either the [Azure CLI](https://learn.microsoft.com/cli/azure/network/lb/probe) or [PowerShell](https://learn.microsoft.com/powershell/module/az.network/set-azloadbalancerprobeconfig) command.


#### [Azure CLI](#tab/lb-azurecli)


> **Note:**
> Use azure-cli v2.63.0 or later. You can check the version using `az version`.

To create Azure standard load balancer for high availability setup of SAP system using Azure CLI, follow below steps.

```azurecli-interactive
# Create the load balancer resource and another frontend IP resource for ERS. Allocation of private IP address is dynamic using below command. If you want to pass static IP address, include parameter --private-ip-address.
az network lb create -g MyResourceGroup -n MyLB --sku Standard --vnet-name MyVMsVirtualNetwork --subnet MyVMsSubnet --backend-pool-name MyBackendPool --frontend-ip-name MyASCSFrontendIpName
az network lb frontend-ip create -g MyResourceGroup --lb-name MyLB -n MyERSFrontendIpName --vnet-name MyVMsVirtualNetwork --subnet MyVMsSubnet

# Create the health probe for ASCS and ERS
az network lb probe create -g MyResourceGroup --lb-name MyLB -n MyASCSHealthProbe --protocol tcp --port MyASCSHealthProbePort --interval 5 --probe-threshold 2
az network lb probe create -g MyResourceGroup --lb-name MyLB -n MyERSHealthProbe --protocol tcp --port MyERSHealthProbePort --interval 5 --probe-threshold 2
 
# Create load balancing rule for ASCS and ERS
az network lb rule create -g MyResourceGroup --lb-name MyLB -n MyASCSRuleName --protocol All --frontend-ip-name MyASCSFrontendIpName --frontend-port 0 --backend-pool-name MyBackendPool --backend-port 0 --probe-name MyASCSHealthProbe --idle-timeout-in-minutes 30 --enable-floating-ip 
az network lb rule create -g MyResourceGroup --lb-name MyLB -n MyERSRuleName --protocol All --frontend-ip-name MyERSFrontendIpName --frontend-port 0 --backend-pool-name MyBackendPool --backend-port 0 --probe-name MyERSHealthProbe --idle-timeout-in-minutes 30 --enable-floating-ip  

# Add ASCS and ERS VMs in backend pool
az network nic ip-config address-pool add --address-pool MyBackendPool --ip-config-name ASCSVmIpConfigName --nic-name ASCSVmNicName -g MyResourceGroup --lb-name MyLB
az network nic ip-config address-pool add --address-pool MyBackendPool --ip-config-name ERSVmIpConfigName --nic-name ERSVmNicName -g MyResourceGroup --lb-name MyLB
```

</br>
<details>
<summary>Expand to view full CLI code</summary>

```azurecli-interactive
# Define variables for Resource Group, ASCS/ERS VMs.

rg_name="resourcegroup-name"
vm1_name="ascs-vm-name"
vm2_name="ers-vm-name"

# Define variables for the load balancer that will be use in the creation of the load balancer resource.

lb_name="sap-ci-sid-ilb"
bkp_name="ascs-ers-backendpool"
ascs_fip_name="ascs-frontendip"
ers_fip_name="ers-frontendip"

ascs_hp_name="ascs-healthprobe"
ascs_hp_port="62000"
ers_hp_name="ers-healthprobe"
ers_hp_port="62101"

ascs_rule_name="ascs-lb-rule"
ers_rule_name="ers-lb-rule"
 
# Command to get VMs network information like primary NIC name, primary IP configuration name, virtual network name, and subnet name.
 
vm1_primary_nic=$(az vm nic list -g $rg_name --vm-name $vm1_name --query "[?primary == \`true\`].{id:id} || [?primary == \`null\`].{id:id}" -o tsv)
vm1_nic_name=$(basename $vm1_primary_nic)
vm1_ipconfig=$(az network nic ip-config list -g $rg_name --nic-name $vm1_nic_name --query "[?primary == \`true\`].name" -o tsv)
 
vm2_primary_nic=$(az vm nic list -g $rg_name --vm-name $vm2_name --query "[?primary == \`true\`].{id:id} || [?primary == \`null\`].{id:id}" -o tsv)
vm2_nic_name=$(basename $vm2_primary_nic)
vm2_ipconfig=$(az network nic ip-config list -g $rg_name --nic-name $vm2_nic_name --query "[?primary == \`true\`].name" -o tsv)
 
vnet_subnet_id=$(az network nic show -g $rg_name -n $vm1_nic_name --query ipConfigurations[0].subnet.id -o tsv)
vnet_name=$(basename $(dirname $(dirname $vnet_subnet_id)))
subnet_name=$(basename $vnet_subnet_id)
 
# Create the load balancer resource and another frontend IP resource for ERS.
# Allocation of private IP address is dynamic using below command. If you want to pass static IP address, include parameter --private-ip-address. 
  
az network lb create -g $rg_name -n $lb_name --sku Standard --vnet-name $vnet_name --subnet $subnet_name --backend-pool-name $bkp_name --frontend-ip-name $ascs_fip_name
az network lb frontend-ip create -g $rg_name --lb-name $lb_name -n $ers_fip_name --vnet-name $vnet_name --subnet $subnet_name
 
# Create the health probe for ASCS and ERS
 
az network lb probe create -g $rg_name --lb-name $lb_name -n $ascs_hp_name --protocol tcp --port $ascs_hp_port --interval 5 --probe-threshold 2
az network lb probe create -g $rg_name --lb-name $lb_name -n $ers_hp_name --protocol tcp --port $ers_hp_port --interval 5 --probe-threshold 2
 
# Create load balancing rule for ASCS and ERS
  
az network lb rule create -g $rg_name --lb-name $lb_name -n  $ascs_rule_name --protocol All --frontend-ip-name $ascs_fip_name --frontend-port 0 --backend-pool-name $bkp_name --backend-port 0 --probe-name $ascs_hp_name --idle-timeout-in-minutes 30 --enable-floating-ip 
az network lb rule create -g $rg_name --lb-name $lb_name -n  $ers_rule_name --protocol All --frontend-ip-name $ers_fip_name --frontend-port 0 --backend-pool-name $bkp_name --backend-port 0 --probe-name $ers_hp_name --idle-timeout-in-minutes 30 --enable-floating-ip 
 
# Add ASCS and ERS VMs in backend pool
 
az network nic ip-config address-pool add --address-pool $bkp_name --ip-config-name $vm1_ipconfig --nic-name $vm1_nic_name -g $rg_name --lb-name $lb_name
az network nic ip-config address-pool add --address-pool $bkp_name --ip-config-name $vm2_ipconfig --nic-name $vm2_nic_name -g $rg_name --lb-name $lb_name

# [OPTIONAL] Change the assignment of frontend IP address from dynamic to static
afip=$(az network lb frontend-ip show --lb-name $lb_name -g $rg_name -n $ascs_fip_name --query "{privateIPAddress:privateIPAddress}" -o tsv)
az network lb frontend-ip update --lb-name $lb_name -g $rg_name -n $ascs_fip_name --private-ip-address $afip

efip=$(az network lb frontend-ip show --lb-name $lb_name -g $rg_name -n $ers_fip_name --query "{privateIPAddress:privateIPAddress}" -o tsv)
az network lb frontend-ip update --lb-name $lb_name -g $rg_name -n $ers_fip_name --private-ip-address $efip
```

</details>


#### [PowerShell](#tab/lb-powershell)


To create Azure standard load balancer for high availability setup of SAP system using Azure PowerShell, follow below steps.

```azurepowershell-interactive
# Create frontend IP configurations
$ascs_fip = New-AzLoadBalancerFrontendIpConfig -Name MyASCSFrontendIpName -SubnetId MyASCSSubnetName
$ers_fip = New-AzLoadBalancerFrontendIpConfig -Name MyERSFrontendIpName -SubnetId MyERSSubnetName

# Create backend pool
$bePool = New-AzLoadBalancerBackendAddressPoolConfig -Name MyBackendPool

# Create health probes for ASCS and ERS
$ascs_healthprobe = New-AzLoadBalancerProbeConfig -Name MyASCSHealthProbe -Protocol 'tcp' -Port MyASCSHealthProbePort -IntervalInSeconds 5 -ProbeThreshold 2 -ProbeCount 1
$ers_healthprobe = New-AzLoadBalancerProbeConfig -Name $ers_hp_name -Protocol 'tcp' -Port MyASCSHealthProbePort -IntervalInSeconds 5 -ProbeThreshold 2 -ProbeCount 1

# Create load balancing rules for ASCS and ERS
$ascs_rule = New-AzLoadBalancerRuleConfig -Name MyASCSRuleName -Probe $ascs_healthprobe -Protocol 'All' -IdleTimeoutInMinutes 30 -FrontendIpConfiguration $ascs_fip -BackendAddressPool $bePool -EnableFloatingIP
$ers_rule = New-AzLoadBalancerRuleConfig -Name MyERSRuleName -Probe $ers_healthprobe -Protocol 'All' -IdleTimeoutInMinutes 30 -FrontendIpConfiguration $ers_fip -BackendAddressPool $bePool -EnableFloatingIP

# Create the load balancer resource
$lb = New-AzLoadBalancer -ResourceGroupName MyResourceGroup -Name MyLB -Location MyRegion -Sku 'Standard' -FrontendIpConfiguration $ascs_fip, $ers_fip -BackendAddressPool $bePool -LoadBalancingRule $ascs_rule, $ers_rule -Probe $ascs_healthprobe, $ers_healthprobe
```

</br>
<details>
<summary>Expand to view full PowerShell code</summary>

```azurepowershell-interactive
# Define variables for Resource Group, and Database VMs.

$rg_name = 'resourcegroup-name'
$vm1_name = 'ascs-vm-name'
$vm2_name = 'ers-vm-name'

# Define variables for the load balancer that will be utilized in the creation of the load balancer resource.

$lb_name = 'sap-ci-sid-ilb'
$bkp_name = 'ascs-ers-backendpool'
$ascs_fip_name = 'ascs-frontendip'
$ers_fip_name = 'ers-frontendip'
 
$ascs_hp_name = 'ascs-healthprobe'
$ascs_hp_port = '62000'
$ers_hp_name = 'ers-healthprobe'
$ers_hp_port = '62101'
 
$ascs_rule_name = 'ascs-lb-rule'
$ers_rule_name = 'ers-lb-rule'
 
# Command to get VMs network information like NIC name, IP configuration name, Virtual Network name, and Subnet 
 
$vm1 = Get-AzVM -ResourceGroupName $rg_name -Name $vm1_name
$vm1_primarynic = $vm1.NetworkProfile.NetworkInterfaces | Where-Object {($_.Primary -eq "True") -or ($_.Primary -eq $null)}
$vm1_nic_name = $vm1_primarynic.Id.Split('/')[-1]
 
$vm1_nic_info = Get-AzNetworkInterface -Name $vm1_nic_name -ResourceGroupName $rg_name
$vm1_primaryip = $vm1_nic_info.IpConfigurations | Where-Object -Property Primary -EQ -Value "True"
$vm1_ipconfig_name = ($vm1_primaryip).Name
 
$vm2 = Get-AzVM -ResourceGroupName $rg_name -Name $vm2_name
$vm2_primarynic = $vm2.NetworkProfile.NetworkInterfaces | Where-Object {($_.Primary -eq "True") -or ($_.Primary -eq $null)}
$vm2_nic_name = $vm2_primarynic.Id.Split('/')[-1]
 
$vm2_nic_info = Get-AzNetworkInterface -Name $vm2_nic_name -ResourceGroupName $rg_name
$vm2_primaryip = $vm2_nic_info.IpConfigurations | Where-Object -Property Primary -EQ -Value "True"
$vm2_ipconfig_name = ($vm2_primaryip).Name
 
$vnet_name = $vm1_primaryip.Subnet.Id.Split('/')[-3]
$subnet_name = $vm1_primaryip.Subnet.Id.Split('/')[-1]
$location = $vm1.Location
 
# Create frontend IP resource for ASCS and ERS.
# Allocation of private IP address is dynamic using below command. If you want to pass static IP address, include parameter -PrivateIpAddress
 
$ascs_lb_fip = @{
    Name = $ascs_fip_name
    SubnetId = $vm1_primaryip.Subnet.Id
}
$ascs_fip = New-AzLoadBalancerFrontendIpConfig @ascs_lb_fip
 
$ers_lb_fip = @{
    Name = $ers_fip_name
    SubnetId = $vm2_primaryip.Subnet.Id
}
$ers_fip = New-AzLoadBalancerFrontendIpConfig @ers_lb_fip

# Create backend pool
 
$bepool = New-AzLoadBalancerBackendAddressPoolConfig -Name $bkp_name

# Create the health probe for ASCS and ERS
 
$ascs_probe = @{
    Name = $ascs_hp_name
    Protocol = 'tcp'
    Port = $ascs_hp_port
    IntervalInSeconds = '5'
    ProbeThreshold = '2'
    ProbeCount = '1'
}
$ascs_healthprobe = New-AzLoadBalancerProbeConfig @ascs_probe
    
$ers_probe = @{
    Name = $ers_hp_name
    Protocol = 'tcp'
    Port = $ers_hp_port
    IntervalInSeconds = '5'
    ProbeThreshold = '2'
    ProbeCount = '1'
}
$ers_healthprobe = New-AzLoadBalancerProbeConfig @ers_probe

# Create load balancing rule for ASCS and ERS
 
$ascs_lbrule = @{
    Name = $ascs_rule_name
    Probe = $ascs_healthprobe
    Protocol = 'All'
    IdleTimeoutInMinutes = '30'
    FrontendIpConfiguration = $ascs_fip
    BackendAddressPool = $bePool 
} 
$ascs_rule = New-AzLoadBalancerRuleConfig @ascs_lbrule -EnableFloatingIP 
 
$ers_lbrule = @{
    Name = $ers_rule_name
    Probe = $ers_healthprobe
    Protocol = 'All'
    IdleTimeoutInMinutes = '30'
    FrontendIpConfiguration = $ers_fip
    BackendAddressPool = $bePool 
} 
$ers_rule = New-AzLoadBalancerRuleConfig @ers_lbrule -EnableFloatingIP

# Create the load balancer resource
 
$loadbalancer = @{
    ResourceGroupName = $rg_name
    Name = $lb_name
    Location = $location
    Sku = 'Standard'
    FrontendIpConfiguration = $ascs_fip,$ers_fip
    BackendAddressPool = $bePool 
    LoadBalancingRule = $ascs_rule,$ers_rule
    Probe = $ascs_healthprobe,$ers_healthprobe 
} 
$lb = New-AzLoadBalancer @loadbalancer

# Add ASCS and ERS VMs in backend pool of load balancer
 
$vm1_primaryip.LoadBalancerBackendAddressPools.Add($lb.BackendAddressPools[0])
$vm2_primaryip.LoadBalancerBackendAddressPools.Add($lb.BackendAddressPools[0])
$vm1_nic_info | Set-AzNetworkInterface
$vm2_nic_info | Set-AzNetworkInterface
```

</details>


---

> **Note:**
> When VMs without public IP addresses are placed in the backend pool of internal (no public IP address) Standard Azure load balancer, there will be no outbound internet connectivity, unless additional configuration is performed to allow routing to public end points. For details on how to achieve outbound connectivity see [Public endpoint connectivity for Virtual Machines using Azure Standard Load Balancer in SAP high-availability scenarios](high-availability-guide-standard-load-balancer-outbound-connections.md).  

> **Important:**
>
> * Don't enable TCP time stamps on Azure VMs placed behind Azure Load Balancer. Enabling TCP timestamps will cause the health probes to fail. Set the `net.ipv4.tcp_timestamps` parameter to `0`. For details, see [Load Balancer health probes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/load-balancer-custom-probe-overview.md).
> * To prevent saptune from changing the manually set `net.ipv4.tcp_timestamps` value from `0` back to `1`, you should update saptune version to 3.1.1 or higher. For more details, see [saptune 3.1.1 – Do I Need to Update?](https://www.suse.com/c/saptune-3-1-1-do-i-need-to-update/)

## Disable ID mapping (if using NFSv4.1)

The instructions in this section are only applicable, if using Azure NetApp Files volumes with NFSv4.1 protocol. Perform the configuration on all VMs, where Azure NetApp Files NFSv4.1 volumes will be mounted.  

1. Verify the NFS domain setting. Make sure that the domain is configured as the default Azure NetApp Files domain that is, **`defaultv4iddomain.com`** and the mapping is set to **nobody**.  

    > **Important:**
    > Make sure to set the NFS domain in `/etc/idmapd.conf` on the VM to match the default domain configuration on Azure NetApp Files: **`defaultv4iddomain.com`**. If there's a mismatch between the domain configuration on the NFS client (i.e. the VM) and the NFS server, i.e. the Azure NetApp configuration, then the permissions for files on Azure NetApp volumes that are mounted on the VMs will be displayed as `nobody`.  

    ```bash
    sudo cat /etc/idmapd.conf
    
    # Example
    [General]
    Verbosity = 0
    Pipefs-Directory = /var/lib/nfs/rpc_pipefs
    Domain = defaultv4iddomain.com
    [Mapping]
    Nobody-User = nobody
    Nobody-Group = nobody
    ```

2. **[A]** Verify `nfs4_disable_idmapping`. It should be set to **Y**. To create the directory structure where `nfs4_disable_idmapping` is located, execute the mount command. You won't be able to manually create the directory under /sys/modules, because access is reserved for the kernel / drivers.  

    ```bash
    # Check nfs4_disable_idmapping 
    cat /sys/module/nfs/parameters/nfs4_disable_idmapping
    
    # If you need to set nfs4_disable_idmapping to Y
    mkdir /mnt/tmp
    mount 10.1.0.4:/sapmnt/qas /mnt/tmp
    umount  /mnt/tmp
    echo "Y" > /sys/module/nfs/parameters/nfs4_disable_idmapping
    
    # Make the configuration permanent
    echo "options nfs nfs4_disable_idmapping=Y" >> /etc/modprobe.d/nfs.conf
    ```

## Setting up (A)SCS

Next, you'll prepare and install the SAP ASCS and ERS instances.

### Create Pacemaker cluster

Follow the steps in [Setting up Pacemaker on SUSE Linux Enterprise Server in Azure](high-availability-guide-suse-pacemaker.md) to create a basic Pacemaker cluster for this (A)SCS server.

### Installation

The following items are prefixed with either **[A]** - applicable to all nodes, **[1]** - only applicable to node 1 or **[2]** - only applicable to node 2.

1. **[A]** Install SUSE Connector

   ```bash
   sudo zypper install sap-suse-cluster-connector
   ```

   > **Note:**
   > The known issue with using a dash in host names is fixed with version **3.1.1** of package **sap-suse-cluster-connector**. Make sure that you are using at least version 3.1.1 of package sap-suse-cluster-connector, if using cluster nodes with dash in the host name. Otherwise your cluster will not work.

   Make sure that you installed the new version of the SAP SUSE cluster connector. The old one was called sap_suse_cluster_connector and the new one is called **sap-suse-cluster-connector**.

   ```bash
   sudo zypper info sap-suse-cluster-connector
   
   # Information for package sap-suse-cluster-connector:
   # ---------------------------------------------------
   # Repository     : SLE-12-SP3-SAP-Updates
   # Name           : sap-suse-cluster-connector
   # Version        : 3.1.0-8.1
   # Arch           : noarch
   # Vendor         : SUSE LLC <https://www.suse.com/>
   # Support Level  : Level 3
   # Installed Size : 45.6 KiB
   # Installed      : Yes
   # Status         : up-to-date
   # Source package : sap-suse-cluster-connector-3.1.0-8.1.src
   # Summary        : SUSE High Availability Setup for SAP Products
   ```

2. **[A]** Update SAP resource agents  

   A patch for the resource-agents package is required to use the new configuration that is described in this article. You can check, if the patch is already installed with the following command

   ```bash
   sudo grep 'parameter name="IS_ERS"' /usr/lib/ocf/resource.d/heartbeat/SAPInstance
   ```

   The output should be similar to

   ```text
   <parameter name="IS_ERS" unique="0" required="0">
   ```

   If the grep command doesn't find the IS_ERS parameter, you need to install the patch listed on [the SUSE download page](https://download.suse.com/patch/finder/#bu=suse&familyId=&productId=&dateRange=&startDate=&endDate=&priority=&architecture=&keywords=resource-agents)

   ```bash
   # example for patch for SLES 12 SP1
   sudo zypper in -t patch SUSE-SLE-HA-12-SP1-2017-885=1
   
   # example for patch for SLES 12 SP2
   sudo zypper in -t patch SUSE-SLE-HA-12-SP2-2017-886=1
   ```

3. **[A]** Setup host name resolution

   You can either use a DNS server or modify the /etc/hosts on all nodes. This example shows how to use the /etc/hosts file.
   Replace the IP address and the hostname in the following commands

   ```bash
   sudo vi /etc/hosts
   ```

   Insert the following lines to /etc/hosts. Change the IP address and hostname to match your environment

   ```text
   # IP address of cluster node 1
   10.1.1.18    anftstsapcl1
   # IP address of cluster node 2
   10.1.1.6     anftstsapcl2
   # IP address of the load balancer frontend configuration for SAP Netweaver ASCS
   10.1.1.20    anftstsapvh
   # IP address of the load balancer frontend configuration for SAP Netweaver ERS
   10.1.1.21    anftstsapers
   ```

4. **[1]** Create SAP directories in the Azure NetApp Files volume.  

   Mount temporarily the Azure NetApp Files volume on one of the VMs and create the SAP directories(file paths).  

   ```bash
   # mount temporarily the volume
   sudo mkdir -p /saptmp
   # If using NFSv3
   sudo mount -t nfs -o rw,hard,rsize=65536,wsize=65536,nfsvers=3,tcp 10.1.0.4:/sapQAS /saptmp
   # If using NFSv4.1
   sudo mount -t nfs -o rw,hard,rsize=65536,wsize=65536,nfsvers=4.1,sec=sys,tcp 10.1.0.4:/sapQAS /saptmp
   # create the SAP directories
   sudo cd /saptmp
   sudo mkdir -p sapmntQAS
   sudo mkdir -p usrsapQASascs
   sudo mkdir -p usrsapQASers
   sudo mkdir -p usrsapQASsys
   sudo mkdir -p usrsapQASpas
   sudo mkdir -p usrsapQASaas
   # unmount the volume and delete the temporary directory
   sudo cd ..
   sudo umount /saptmp
   sudo rmdir /saptmp
   ```

## Prepare for SAP NetWeaver installation

1. **[A]** Create the shared directories

   ```bash
   sudo mkdir -p /sapmnt/QAS
   sudo mkdir -p /usr/sap/trans
   sudo mkdir -p /usr/sap/QAS/SYS
   sudo mkdir -p /usr/sap/QAS/ASCS00
   sudo mkdir -p /usr/sap/QAS/ERS01
   
   sudo chattr +i /sapmnt/QAS
   sudo chattr +i /usr/sap/trans
   sudo chattr +i /usr/sap/QAS/SYS
   sudo chattr +i /usr/sap/QAS/ASCS00
   sudo chattr +i /usr/sap/QAS/ERS01
   ```

2. **[A]** Configure `autofs`

   ```bash
   sudo vi /etc/auto.master
   
   # Add the following line to the file, save and exit
   /- /etc/auto.direct
   ```

   If using NFSv3, create a file with:

   ```bash
   sudo vi /etc/auto.direct
   
   # Add the following lines to the file, save and exit
   /sapmnt/QAS -nfsvers=3,nobind 10.1.0.4:/usrsapqas/sapmntQAS
   /usr/sap/trans -nfsvers=3,nobind 10.1.0.4:/trans
   /usr/sap/QAS/SYS -nfsvers=3,nobind 10.1.0.4:/usrsapqas/usrsapQASsys
   ```

   If using NFSv4.1, create a file with:

   ```bash
   sudo vi /etc/auto.direct
   
   # Add the following lines to the file, save and exit
   /sapmnt/QAS -nfsvers=4.1,nobind,sec=sys 10.1.0.4:/usrsapqas/sapmntQAS
   /usr/sap/trans -nfsvers=4.1,nobind,sec=sys 10.1.0.4:/trans
   /usr/sap/QAS/SYS -nfsvers=4.1,nobind,sec=sys 10.1.0.4:/usrsapqas/usrsapQASsys
   ```

   > **Note:**
   > Make sure to match the NFS protocol version of the Azure NetApp Files volumes, when mounting the volumes. If the Azure NetApp Files volumes are created as NFSv3 volumes, use the corresponding NFSv3 configuration. If the Azure NetApp Files volumes are created as NFSv4.1 volumes, follow the instructions to disable ID mapping and make sure to use the corresponding NFSv4.1 configuration. In this example the Azure NetApp Files volumes were created as NFSv3 volumes.  

   Restart `autofs` to mount the new shares

   ```bash
   sudo systemctl enable autofs
   sudo service autofs restart
   ```

3. **[A]** Configure SWAP file

   ```bash
   sudo vi /etc/waagent.conf
   
   # Check if property ResourceDisk.Format is already set to y and if not, set it
   ResourceDisk.Format=y
   
   # Set the property ResourceDisk.EnableSwap to y
   # Create and use swapfile on resource disk.
   ResourceDisk.EnableSwap=y
   
   # Set the size of the SWAP file with property ResourceDisk.SwapSizeMB
   # The free space of resource disk varies by virtual machine size. Make sure that you do not set a value that is too big. You can check the SWAP space with command swapon
   # Size of the swapfile.
   ResourceDisk.SwapSizeMB=2000
   ```

   Restart the Agent to activate the change

   ```bash
   sudo service waagent restart
   ```

### Installing SAP NetWeaver ASCS/ERS

1. **[1]** Create a virtual IP resource and health-probe for the ASCS instance

   > **Important:**
   > Recent testing revealed situations, where netcat stops responding to requests due to backlog and its limitation of handling only one connection. The netcat resource stops listening to the Azure Load balancer requests and the floating IP becomes unavailable.  
   > For existing Pacemaker clusters, we recommended in the past replacing netcat with socat. Currently we recommend using azure-lb resource agent, which is part of package resource-agents, with the following package version requirements:
   >
   > * For SLES 12 SP4/SP5, the version must be at least resource-agents-4.3.018.a7fb5035-3.30.1.  
   > * For SLES 15/15 SP1, the version must be at least resource-agents-4.3.0184.6ee15eb2-4.13.1.  
   >
   > Note that the change will require brief downtime.  
   > For existing Pacemaker clusters, if the configuration was already changed to use socat as described in [Azure Load-Balancer Detection Hardening](https://www.suse.com/support/kb/doc/?id=7024128), there is no requirement to switch immediately to azure-lb resource agent.

   ```bash
   sudo crm node standby anftstsapcl2
   
   # If using NFSv3
   sudo crm configure primitive fs_QAS_ASCS Filesystem device='10.1.0.4/usrsapqas/usrsapQASascs' directory='/usr/sap/QAS/ASCS00' fstype='nfs' \
     op start timeout=60s interval=0 \
     op stop timeout=60s interval=0 \
     op monitor interval=20s timeout=40s
   
   # If using NFSv4.1
   sudo crm configure primitive fs_QAS_ASCS Filesystem device='10.1.0.4:/usrsapqas/usrsapQASascs' directory='/usr/sap/QAS/ASCS00' fstype='nfs' options='sec=sys,nfsvers=4.1' \
     op start timeout=60s interval=0 \
     op stop timeout=60s interval=0 \
     op monitor interval=20s timeout=105s
   
   sudo crm configure primitive vip_QAS_ASCS IPaddr2 \
     params ip=10.1.1.20 \
     op monitor interval=10 timeout=20
   
   sudo crm configure primitive nc_QAS_ASCS azure-lb port=62000 \
     op monitor timeout=20s interval=10
   
   sudo crm configure group g-QAS_ASCS fs_QAS_ASCS nc_QAS_ASCS vip_QAS_ASCS \
      meta resource-stickiness=3000
   ```

   Make sure that the cluster status is ok and that all resources are started. It isn't important on which node the resources are running.

   ```bash
   sudo crm_mon -r
   
   # Node anftstsapcl2: standby
   # Online: [ anftstsapcl1 ]
   # 
   # Full list of resources:
   #
   # Resource Group: g-QAS_ASCS
   #     fs_QAS_ASCS        (ocf::heartbeat:Filesystem):    Started anftstsapcl1
   #     nc_QAS_ASCS        (ocf::heartbeat:azure-lb):      Started anftstsapcl1
   #     vip_QAS_ASCS       (ocf::heartbeat:IPaddr2):       Started anftstsapcl1
   # stonith-sbd     (stonith:external/sbd): Started anftstsapcl2
   ```

2. **[1]** Install SAP NetWeaver ASCS  

   Install SAP NetWeaver ASCS as root on the first node using a virtual hostname that maps to the IP address of the load balancer frontend configuration for the ASCS, for example **anftstsapvh**, **10.1.1.20** and the instance number that you used for the probe of the load balancer, for example **00**.

   You can use the sapinst parameter SAPINST_REMOTE_ACCESS_USER to allow a non-root user to connect to sapinst. You can use parameter SAPINST_USE_HOSTNAME to install SAP, using virtual hostname.

   ```bash
   sudo <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin SAPINST_USE_HOSTNAME=virtual_hostname
   ```

   If the installation fails to create a subfolder in /usr/sap/**QAS**/ASCS**00**, try setting the owner and group of the ASCS**00**  folder and retry.

   ```bash
   chown qasadm /usr/sap/QAS/ASCS00
   chgrp sapsys /usr/sap/QAS/ASCS00
   ```

3. **[1]** Create a virtual IP resource and health-probe for the ERS instance.

   ```bash
   sudo crm node online anftstsapcl2
   sudo crm node standby anftstsapcl1
   
   # If using NFSv3
   sudo crm configure primitive fs_QAS_ERS Filesystem device='10.1.0.4:/usrsapqas/usrsapQASers' directory='/usr/sap/QAS/ERS01' fstype='nfs' \
     op start timeout=60s interval=0 \
     op stop timeout=60s interval=0 \
     op monitor interval=20s timeout=40s
   
   # If using NFSv4.1
   sudo crm configure primitive fs_QAS_ERS Filesystem device='10.1.0.4:/usrsapqas/usrsapQASers' directory='/usr/sap/QAS/ERS01' fstype='nfs' options='sec=sys,nfsvers=4.1' \
     op start timeout=60s interval=0 \
     op stop timeout=60s interval=0 \
     op monitor interval=20s timeout=105s
   
   sudo crm configure primitive vip_QAS_ERS IPaddr2 \
     params ip=10.1.1.21 \
     op monitor interval=10 timeout=20
   
   sudo crm configure primitive nc_QAS_ERS azure-lb port=62101 \
     op monitor timeout=20s interval=10
   
   sudo crm configure group g-QAS_ERS fs_QAS_ERS nc_QAS_ERS vip_QAS_ERS
   ```

   Make sure that the cluster status is ok and that all resources are started. It isn't important on which node the resources are running.

   ```bash
   sudo crm_mon -r
   
   # Node anftstsapcl1: standby
   # Online: [ anftstsapcl2 ]
   # 
   # Full list of resources:
   #
   # stonith-sbd     (stonith:external/sbd): Started anftstsapcl2
   #  Resource Group: g-QAS_ASCS
   #      fs_QAS_ASCS        (ocf::heartbeat:Filesystem):    Started anftstsapcl2
   #      nc_QAS_ASCS        (ocf::heartbeat:azure-lb):      Started anftstsapcl2
   #      vip_QAS_ASCS       (ocf::heartbeat:IPaddr2):       Started anftstsapcl2
   #  Resource Group: g-QAS_ERS
   #      fs_QAS_ERS (ocf::heartbeat:Filesystem):    Started anftstsapcl2
   #      nc_QAS_ERS (ocf::heartbeat:azure-lb):      Started anftstsapcl2
   #      vip_QAS_ERS  (ocf::heartbeat:IPaddr2):     Started anftstsapcl2
   ```

4. **[2]** Install SAP NetWeaver ERS

   Install SAP NetWeaver ERS as root on the second node using a virtual hostname that maps to the IP address of the load balancer frontend configuration for the ERS, for example **anftstsapers**, **10.1.1.21** and the instance number that you used for the probe of the load balancer, for example **01**.

   You can use the sapinst parameter SAPINST_REMOTE_ACCESS_USER to allow a non-root user to connect to sapinst. You can use parameter SAPINST_USE_HOSTNAME to install SAP, using virtual hostname.

   ```bash
   sudo <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin SAPINST_USE_HOSTNAME=virtual_hostname
   ```

   > **Note:**
   > Use SWPM SP 20 PL 05 or higher. Lower versions do not set the permissions correctly and the installation will fail.

   If the installation fails to create a subfolder in /usr/sap/**QAS**/ERS**01**, try setting the owner and group of the ERS**01** folder and retry.

   ```bash
   chown qasadm /usr/sap/QAS/ERS01
   chgrp sapsys /usr/sap/QAS/ERS01
   ```

5. **[1]** Adapt the ASCS/SCS and ERS instance profiles

   * ASCS/SCS profile

     ```bash
     sudo vi /sapmnt/QAS/profile/QAS_ASCS00_anftstsapvh
     
     # Change the restart command to a start command
     #Restart_Program_01 = local $(_EN) pf=$(_PF)
     Start_Program_01 = local $(_EN) pf=$(_PF)
     
     # Add the following lines
     service/halib = $(DIR_EXECUTABLE)/saphascriptco.so
     service/halib_cluster_connector = /usr/bin/sap_suse_cluster_connector
     
     # Add the keep alive parameter, if using ENSA1
     enque/encni/set_so_keepalive = TRUE
     ```

     For both ENSA1 and ENSA2, make sure that the `keepalive` OS parameters are set as described in SAP note [1410736](https://launchpad.support.sap.com/#/notes/1410736).  

   * ERS profile

     ```bash
     sudo vi /sapmnt/QAS/profile/QAS_ERS01_anftstsapers
     
     # Change the restart command to a start command
     #Restart_Program_00 = local $(_ER) pf=$(_PFL) NR=$(SCSID)
     Start_Program_00 = local $(_ER) pf=$(_PFL) NR=$(SCSID)
     
     # Add the following lines
     service/halib = $(DIR_EXECUTABLE)/saphascriptco.so
     service/halib_cluster_connector = /usr/bin/sap_suse_cluster_connector
     
     # remove Autostart from ERS profile
     # Autostart = 1
     ```

6. **[A]** Configure Keep Alive

   The communication between the SAP NetWeaver application server and the ASCS/SCS is routed through a software load balancer. The load balancer disconnects inactive connections after a configurable timeout. To prevent this you need to set a parameter in the SAP NetWeaver ASCS/SCS profile, if using ENSA1, and change the Linux system `keepalive` settings on all SAP servers for both ENSA1/ENSA2. Read [SAP Note 1410736][1410736] for more information.

   ```bash
   # Change the Linux system configuration
   sudo sysctl net.ipv4.tcp_keepalive_time=300
   ```

7. **[A]** Configure the SAP users after the installation

   ```bash
   # Add sidadm to the haclient group
   sudo usermod -aG haclient qasadm
   ```

8. **[1]** Add the ASCS and ERS SAP services to the `sapservice` file

   Add the ASCS service entry to the second node and copy the ERS service entry to the first node.

   ```bash
   cat /usr/sap/sapservices | grep ASCS00 | sudo ssh anftstsapcl2 "cat >>/usr/sap/sapservices"
   sudo ssh anftstsapcl2 "cat /usr/sap/sapservices" | grep ERS01 | sudo tee -a /usr/sap/sapservices
   ```

9. **[A]** Disabling `systemd` services of the ASCS and ERS SAP instance. This step is only applicable, if SAP startup framework is managed by systemd as per SAP Note [3115048](https://me.sap.com/notes/3115048)

   > **Note:**
   > When managing SAP instances like SAP ASCS and SAP ERS using SLES cluster configuration, you would need to make additional modifications to integrate the cluster with the native systemd-based SAP start framework. This ensures that maintenance procedures do no compromise cluster stability. After installation or switching SAP startup framework to systemd-enabled setup as per SAP Note [3115048](https://me.sap.com/notes/3115048), you should disable the `systemd` services for the ASCS and ERS SAP instances.

   ```bash
   # Stop ASCS and ERS instances using <sid>adm
   sapcontrol -nr 00 -function Stop
   sapcontrol -nr 00 -function StopService

   sapcontrol -nr 01 -function Stop
   sapcontrol -nr 01 -function StopService

   # Execute below command on VM where you have performed ASCS instance installation (e.g. anftstsapcl1)
   sudo systemctl disable SAPQAS_00
   # Execute below command on VM where you have performed ERS instance installation (e.g. anftstsapcl2)
   sudo systemctl disable SAPQAS_01
   ```

10. **[1]** Create the SAP cluster resources.

    Depending on whether you are running an ENSA1 or ENSA2 system, select respective tab to define the resources. SAP introduced support for [ENSA2](https://help.sap.com/docs/ABAP_PLATFORM_NEW/cff8531bc1d9416d91bb6781e628d4e0/6d655c383abf4c129b0e5c8683e7ecd8.html), including replication, in SAP NetWeaver 7.52. Starting with ABAP Platform 1809, ENSA2 is installed by default. For ENSA2 support, see SAP Note [2630416](https://launchpad.support.sap.com/#/notes/2630416).

    #### [ENSA1](#tab/ensa1)

    ```bash
    sudo crm configure property maintenance-mode="true"
   
    # If using NFSv3
    sudo crm configure primitive rsc_sap_QAS_ASCS00 SAPInstance \
       operations \$id=rsc_sap_QAS_ASCS00-operations \
       op monitor interval=11 timeout=60 on-fail=restart \
       params InstanceName=QAS_ASCS00_anftstsapvh START_PROFILE="/sapmnt/QAS/profile/QAS_ASCS00_anftstsapvh" \
       AUTOMATIC_RECOVER=false \
       meta resource-stickiness=5000 failure-timeout=60 migration-threshold=1 priority=10
   
    # If using NFSv4.1
    sudo crm configure primitive rsc_sap_QAS_ASCS00 SAPInstance \
       operations \$id=rsc_sap_QAS_ASCS00-operations \
       op monitor interval=11 timeout=105 on-fail=restart \
       params InstanceName=QAS_ASCS00_anftstsapvh START_PROFILE="/sapmnt/QAS/profile/QAS_ASCS00_anftstsapvh" \
       AUTOMATIC_RECOVER=false \
       meta resource-stickiness=5000 failure-timeout=105 migration-threshold=1 priority=10
   
    # If using NFSv3   
    sudo crm configure primitive rsc_sap_QAS_ERS01 SAPInstance \
       operations \$id=rsc_sap_QAS_ERS01-operations \
       op monitor interval=11 timeout=60 on-fail=restart \
       params InstanceName=QAS_ERS01_anftstsapers START_PROFILE="/sapmnt/QAS/profile/QAS_ERS01_anftstsapers" AUTOMATIC_RECOVER=false IS_ERS=true \
       meta priority=1000
   
    # If using NFSv4.1
    sudo crm configure primitive rsc_sap_QAS_ERS01 SAPInstance \
       operations \$id=rsc_sap_QAS_ERS01-operations \
       op monitor interval=11 timeout=105 on-fail=restart \
       params InstanceName=QAS_ERS01_anftstsapers START_PROFILE="/sapmnt/QAS/profile/QAS_ERS01_anftstsapers" AUTOMATIC_RECOVER=false IS_ERS=true \
       meta priority=1000
   
    sudo crm configure modgroup g-QAS_ASCS add rsc_sap_QAS_ASCS00
    sudo crm configure modgroup g-QAS_ERS add rsc_sap_QAS_ERS01
      
    sudo crm configure colocation col_sap_QAS_no_both -5000: g-QAS_ERS g-QAS_ASCS
    sudo crm configure location loc_sap_QAS_failover_to_ers rsc_sap_QAS_ASCS00 rule 2000: runs_ers_QAS eq 1
    sudo crm configure order ord_sap_QAS_first_start_ascs Optional: rsc_sap_QAS_ASCS00:start rsc_sap_QAS_ERS01:stop symmetrical=false

    sudo crm_attribute --delete --name priority-fencing-delay
      
    sudo crm node online anftstsapcl1
    sudo crm configure property maintenance-mode="false"
    ```

    #### [ENSA2](#tab/ensa2)

    > **Note:**
    > If you have a two-node cluster running ENSA2, you have the option to configure priority-fencing-delay cluster property. This property introduces additional delay in fencing a node that has higher total resource priority when a split-brain scenario occurs. For more information, see [SUSE Linux Enterprise Server high availability extension administration guide](https://documentation.suse.com/sle-ha/15-SP3/single-html/SLE-HA-administration/#pro-ha-storage-protect-fencing).
    >
    > The property priority-fencing-delay is only applicable for ENSA2 running on two-node cluster.

    ```bash
    sudo crm configure property maintenance-mode="true"

    sudo crm configure property priority-fencing-delay=30
      
    # If using NFSv3
    sudo crm configure primitive rsc_sap_QAS_ASCS00 SAPInstance \
       operations \$id=rsc_sap_QAS_ASCS00-operations \
       op monitor interval=11 timeout=60 on-fail=restart \
       params InstanceName=QAS_ASCS00_anftstsapvh START_PROFILE="/sapmnt/QAS/profile/QAS_ASCS00_anftstsapvh" \
       AUTOMATIC_RECOVER=false \
       meta resource-stickiness=5000 priority=100
      
    # If using NFSv4.1
    sudo crm configure primitive rsc_sap_QAS_ASCS00 SAPInstance \
       operations \$id=rsc_sap_QAS_ASCS00-operations \
       op monitor interval=11 timeout=105 on-fail=restart \
       params InstanceName=QAS_ASCS00_anftstsapvh START_PROFILE="/sapmnt/QAS/profile/QAS_ASCS00_anftstsapvh" \
       AUTOMATIC_RECOVER=false \
       meta resource-stickiness=5000 priority=100
      
    # If using NFSv3
    sudo crm configure primitive rsc_sap_QAS_ERS01 SAPInstance \
       operations \$id=rsc_sap_QAS_ERS01-operations \
       op monitor interval=11 timeout=60 on-fail=restart \
       params InstanceName=QAS_ERS01_anftstsapers START_PROFILE="/sapmnt/QAS/profile/QAS_ERS01_anftstsapers" AUTOMATIC_RECOVER=false IS_ERS=true
      
    # If using NFSv4.1
    sudo crm configure primitive rsc_sap_QAS_ERS01 SAPInstance \
       operations \$id=rsc_sap_QAS_ERS01-operations \
       op monitor interval=11 timeout=105 on-fail=restart \
       params InstanceName=QAS_ERS01_anftstsapers START_PROFILE="/sapmnt/QAS/profile/QAS_ERS01_anftstsapers" AUTOMATIC_RECOVER=false IS_ERS=true
      
    sudo crm configure modgroup g-QAS_ASCS add rsc_sap_QAS_ASCS00
    sudo crm configure modgroup g-QAS_ERS add rsc_sap_QAS_ERS01
      
    sudo crm configure colocation col_sap_QAS_no_both -5000: g-QAS_ERS g-QAS_ASCS
    sudo crm configure order ord_sap_QAS_first_start_ascs Optional: rsc_sap_QAS_ASCS00:start rsc_sap_QAS_ERS01:stop symmetrical=false
      
    sudo crm node online anftstsapcl1
    sudo crm configure property maintenance-mode="false"
    ```

     ---

If you're upgrading from an older version and switching to enqueue server 2, see SAP note [2641019](https://launchpad.support.sap.com/#/notes/2641019).

> **Note:**
> The higher timeouts, suggested when using NFSv4.1 are necessary due to protocol-specific pause, related to NFSv4.1 lease renewals. For more information, see [NFS in NetApp Best practice](https://www.netapp.com/media/10720-tr-4067.pdf).
>
> The timeouts in the above configuration may need to be adapted to the specific SAP setup.

Make sure that the cluster status is ok and that all resources are started. It isn't important on which node the resources are running.

```bash
sudo crm_mon -r
  
# Full list of resources:
#
# stonith-sbd     (stonith:external/sbd): Started anftstsapcl2
#  Resource Group: g-QAS_ASCS
#      fs_QAS_ASCS        (ocf::heartbeat:Filesystem):    Started anftstsapcl1
#      nc_QAS_ASCS        (ocf::heartbeat:azure-lb):      Started anftstsapcl1
#      vip_QAS_ASCS       (ocf::heartbeat:IPaddr2):       Started anftstsapcl1
#      rsc_sap_QAS_ASCS00 (ocf::heartbeat:SAPInstance):   Started anftstsapcl1
#  Resource Group: g-QAS_ERS
#      fs_QAS_ERS (ocf::heartbeat:Filesystem):    Started anftstsapcl2
#      nc_QAS_ERS (ocf::heartbeat:azure-lb):      Started anftstsapcl2
#      vip_QAS_ERS        (ocf::heartbeat:IPaddr2):       Started anftstsapcl2
#      rsc_sap_QAS_ERS01  (ocf::heartbeat:SAPInstance):   Started anftstsapcl2
```

> **Note:**
> SAP ASCS/ERS cluster can be extended from 2-node to 3-node cluster with 3rd node as a spare node for failover of ASCS or ERS services.
> - 3-node setup can only be used for SAP systems using SAP Enqueue Replication Server 2 (ENSA2).
> - The cluster property `priority-fencing-delay` should not be used in a 3-node cluster.

## SAP NetWeaver application server preparation

Some databases require that the database instance installation is executed on an application server. Prepare the application server virtual machines to be able to use them in these cases.

The steps below assume that you install the application server on a server different from the ASCS/SCS and HANA servers. Otherwise some of the steps below (like configuring host name resolution) aren't needed.

The following items are prefixed with either **[A]** - applicable to both PAS and AAS, **[P]** - only applicable to PAS or **[S]** - only applicable to AAS.

1. **[A]** Configure operating system

   Reduce the size of the dirty cache. For more information, see [Low write performance on SLES 11/12 servers with large RAM](https://www.suse.com/support/kb/doc/?id=7010287).

   ```bash
   sudo vi /etc/sysctl.conf
   
   # Change/set the following settings
   vm.dirty_bytes = 629145600
   vm.dirty_background_bytes = 314572800
   ```

1. **[A]** Setup host name resolution

   You can either use a DNS server or modify the /etc/hosts on all nodes. This example shows how to use the /etc/hosts file.
   Replace the IP address and the hostname in the following commands

   ```bash
   sudo vi /etc/hosts
   ```

   Insert the following lines to /etc/hosts. Change the IP address and hostname to match your environment

   ```text
   # IP address of the load balancer frontend configuration for SAP NetWeaver ASCS/SCS
   10.1.1.20 anftstsapvh
   # IP address of the load balancer frontend configuration for SAP NetWeaver ERS
   10.1.1.21 anftstsapers
   # IP address of all application servers
   10.1.1.15 anftstsapa01
   10.1.1.16 anftstsapa02
   ```

1. **[A]** Create the sapmnt directory

   ```bash
   sudo mkdir -p /sapmnt/QAS
   sudo mkdir -p /usr/sap/trans
   
   sudo chattr +i /sapmnt/QAS
   sudo chattr +i /usr/sap/trans
   ```

1. **[P]** Create the PAS directory

   ```bash
   sudo mkdir -p /usr/sap/QAS/D02
   sudo chattr +i /usr/sap/QAS/D02
   ```

1. **[S]** Create the AAS directory

   ```bash
   sudo mkdir -p /usr/sap/QAS/D03
   sudo chattr +i /usr/sap/QAS/D03
   ```

1. **[P]** Configure `autofs` on PAS

   ```bash
   sudo vi /etc/auto.master
   
   # Add the following line to the file, save and exit
   /- /etc/auto.direct
   ```

   If using NFSv3, create a new file with:

   ```bash
   sudo vi /etc/auto.direct
   
   # Add the following lines to the file, save and exit
   /sapmnt/QAS -nfsvers=3,nobind 10.1.0.4:/usrsapqas/sapmntQAS
   /usr/sap/trans -nfsvers=3,nobind 10.1.0.4:/trans
   /usr/sap/QAS/D02 -nfsvers=3,nobind 10.1.0.4:/usrsapqas/usrsapQASpas
   ```

   If using NFSv4.1, create a new file with:

   ```bash
   sudo vi /etc/auto.direct
   # Add the following lines to the file, save and exit
   /sapmnt/QAS -nfsvers=4.1,nobind,sec=sys 10.1.0.4:/usrsapqas/sapmntQAS
   /usr/sap/trans -nfsvers=4.1,nobind,sec=sys 10.1.0.4:/trans
   /usr/sap/QAS/D02 -nfsvers=4.1,nobind,sec=sys 10.1.0.4:/usrsapqas/usrsapQASpas
   ```

   Restart `autofs` to mount the new shares

   ```bash
   sudo systemctl enable autofs
   sudo service autofs restart
   ```

1. **[P]** Configure `autofs` on AAS

   ```bash
   sudo vi /etc/auto.master
   
   # Add the following line to the file, save and exit
   /- /etc/auto.direct
   ```

   If using NFSv3, create a new file with:

   ```bash
   sudo vi /etc/auto.direct
   
   # Add the following lines to the file, save and exit
   /sapmnt/QAS -nfsvers=3,nobind 10.1.0.4:/usrsapqas/sapmntQAS
   /usr/sap/trans -nfsvers=3,nobind 10.1.0.4:/trans
   /usr/sap/QAS/D03 -nfsvers=3,nobind 10.1.0.4:/usrsapqas/usrsapQASaas
   ```

   If using NFSv4.1, create a new file with:

   ```bash
   sudo vi /etc/auto.direct
   
   # Add the following lines to the file, save and exit
   /sapmnt/QAS -nfsvers=4.1,nobind,sec=sys 10.1.0.4:/usrsapqas/sapmntQAS
   /usr/sap/trans -nfsvers=4.1,nobind,sec=sys 10.1.0.4:/trans
   /usr/sap/QAS/D03 -nfsvers=4.1,nobind,sec=sys 10.1.0.4:/usrsapqas/usrsapQASaas
   ```

   Restart `autofs` to mount the new shares

   ```bash
   sudo systemctl enable autofs
   sudo service autofs restart
   ```

1. **[A]** Configure SWAP file

   ```bash
   sudo vi /etc/waagent.conf
   
   # Set the property ResourceDisk.EnableSwap to y
   # Create and use swapfile on resource disk.
   ResourceDisk.EnableSwap=y
   
   # Set the size of the SWAP file with property ResourceDisk.SwapSizeMB
   # The free space of resource disk varies by virtual machine size. Make sure that you do not set a value that is too big. You can check the SWAP space with command swapon
   # Size of the swapfile.
   ResourceDisk.SwapSizeMB=2000
   ```

   Restart the Agent to activate the change

   ```bash
   sudo service waagent restart
   ```

## Install database

In this example, SAP NetWeaver is installed on SAP HANA. You can use every supported database for this installation. For more information on how to install SAP HANA in Azure, see [High Availability of SAP HANA on Azure Virtual Machines (VMs)][sap-hana-ha]. For a list of supported databases, see [SAP Note 1928533][1928533].

* Run the SAP database instance installation

   Install the SAP NetWeaver database instance as root using a virtual hostname that maps to the IP address of the load balancer frontend configuration for the database.

   You can use the sapinst parameter SAPINST_REMOTE_ACCESS_USER to allow a non-root user to connect to sapinst.

   ```bash
   sudo <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin
   ```

## SAP NetWeaver application server installation

Follow these steps to install an SAP application server.

1. **[A]** Prepare application server
   Follow the steps in the chapter [SAP NetWeaver application server preparation](#sap-netweaver-application-server-preparation) above to prepare the application server.

2. **[A]** Install SAP NetWeaver application server
   Install a primary or additional SAP NetWeaver applications server.

   You can use the sapinst parameter SAPINST_REMOTE_ACCESS_USER to allow a non-root user to connect to sapinst.

   ```bash
   sudo <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin
   ```

3. **[A]** Update SAP HANA secure store

   Update the SAP HANA secure store to point to the virtual name of the SAP HANA System Replication setup.

   Run the following command to list the entries

   ```bash
   hdbuserstore List
   ```

   This should list all entries and should look similar to

   ```text
   DATA FILE       : /home/qasadm/.hdb/anftstsapa01/SSFS_HDB.DAT
   KEY FILE        : /home/qasadm/.hdb/anftstsapa01/SSFS_HDB.KEY
   
   KEY DEFAULT
     ENV : 10.1.1.5:30313
     USER: SAPABAP1
     DATABASE: QAS
   ```

   The output shows that the IP address of the default entry is pointing to the virtual machine and not to the load balancer's IP address. This entry needs to be changed to point to the virtual hostname of the load balancer. Make sure to use the same port (**30313** in the output above) and database name (**QAS** in the output above)!

   ```bash
   su - qasadm
   
   hdbuserstore SET DEFAULT qasdb:30313@QAS SAPABAP1 <password of ABAP schema>
   ```

## Test the cluster setup

Thoroughly test your Pacemaker cluster. [Execute the typical failover tests](high-availability-guide-suse.md#test-the-cluster-setup).

## Next steps

* [HA for SAP NW on Azure VMs on SLES for SAP applications multi-SID guide](high-availability-guide-suse-multi-sid.md)
* [Azure Virtual Machines planning and implementation for SAP][planning-guide]
* [Azure Virtual Machines deployment for SAP][deployment-guide]
* [Azure Virtual Machines DBMS deployment for SAP][dbms-guide]
* To learn how to establish high availability and plan for disaster recovery of SAP HANA on Azure VMs, see [High Availability of SAP HANA on Azure Virtual Machines (VMs)][sap-hana-ha]
