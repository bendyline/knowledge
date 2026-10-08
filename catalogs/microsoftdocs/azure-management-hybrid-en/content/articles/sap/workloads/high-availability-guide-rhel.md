---
title: Azure Virtual Machines HA for SAP NW on RHEL | Microsoft Docs
description: This article describes Azure Virtual Machines high availability for SAP NetWeaver on Red Hat Enterprise Linux (RHEL).
author: rdeltcheva
manager: juergent
ms.service: sap-on-azure
ms.subservice: sap-vm-workloads
ms.topic: article
ms.date: 04/16/2026
ms.author: radeltch
ms.custom:
  - devx-track-azurecli
  - devx-track-azurepowershell
  - linux-related-content
  - sfi-image-nochange
# Customer intent: "As a systems administrator, I want to implement a high-availability setup for SAP NetWeaver on Red Hat Enterprise Linux in Azure, so that I can ensure continuous operation and reliability of the SAP services in our organization."
---

# Azure Virtual Machines high availability for SAP NetWeaver on Red Hat Enterprise Linux

[dbms-guide]:dbms-guide-general.md
[deployment-guide]:deployment-guide.md
[planning-guide]:planning-guide.md

[2002167]:https://launchpad.support.sap.com/#/notes/2002167
[2009879]:https://launchpad.support.sap.com/#/notes/2009879
[1928533]:https://launchpad.support.sap.com/#/notes/1928533
[2015553]:https://launchpad.support.sap.com/#/notes/2015553
[2178632]:https://launchpad.support.sap.com/#/notes/2178632
[2191498]:https://launchpad.support.sap.com/#/notes/2191498
[2243692]:https://launchpad.support.sap.com/#/notes/2243692
[1999351]:https://launchpad.support.sap.com/#/notes/1999351
[1410736]:https://launchpad.support.sap.com/#/notes/1410736

[template-multisid-xscs]:https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-quickstart-templates%2Fmaster%2Fapplication-workloads%2Fsap%2Fsap-3-tier-marketplace-image-multi-sid-xscs-md%2Fazuredeploy.json

[sap-hana-ha]:sap-hana-high-availability-rhel.md
[glusterfs-ha]:high-availability-guide-rhel-glusterfs.md

This article describes how to deploy virtual machines (VMs), configure the VMs, install the cluster framework, and install a highly available SAP NetWeaver 7.50 system.

In the example configurations and installation commands, ASCS instance number 00, ERS instance number 02, and SAP System ID NW1 are used. The names of the resources (for example, VMs and virtual networks) in the example assume that you used the [ASCS/SCS template][template-multisid-xscs] with Resource Prefix NW1 to create the resources.

## Prerequisites

Read the following SAP Notes and papers first:

* SAP Note [1928533], which has:
  * A list of Azure VM sizes that are supported for the deployment of SAP software.
  * Important capacity information for Azure VM sizes.
  * Supported SAP software and operating system (OS) and database combinations.
  * Required SAP kernel version for Windows and Linux on Microsoft Azure.
* SAP Note [2015553] lists prerequisites for SAP-supported SAP software deployments in Azure.
* SAP Note [2002167] has recommended OS settings for Red Hat Enterprise Linux (RHEL).
* SAP Note [2009879] has SAP HANA Guidelines for Red Hat Enterprise Linux.
* SAP Note [2178632] has detailed information about all monitoring metrics reported for SAP in Azure.
* SAP Note [2191498] has the required SAP Host Agent version for Linux in Azure.
* SAP Note [2243692] has information about SAP licensing on Linux in Azure.
* SAP Note [1999351] has more troubleshooting information for the Azure Enhanced Monitoring Extension for SAP.
* [SAP Community WIKI](https://wiki.scn.sap.com/wiki/display/HOME/SAPonLinuxNotes) has all required SAP Notes for Linux.
* [Azure Virtual Machines planning and implementation for SAP on Linux][planning-guide]
* [Azure Virtual Machines deployment for SAP on Linux][deployment-guide]
* [Azure Virtual Machines DBMS deployment for SAP on Linux][dbms-guide]
* [Product Documentation for Red Hat Gluster Storage](https://access.redhat.com/documentation/en-us/red_hat_gluster_storage/3.5)
* [SAP NetWeaver in Pacemaker cluster](https://access.redhat.com/articles/3150081)
* General RHEL documentation:
  * [High Availability Add-On Overview](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/high_availability_add-on_overview/index)
  * [High Availability Add-On Administration](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/high_availability_add-on_administration/index)
  * [High Availability Add-On Reference](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/high_availability_add-on_reference/index)
  * [Configuring ASCS/ERS for SAP NetWeaver with Standalone Resources in RHEL 7.5](https://access.redhat.com/articles/3569681)
  * [Configure SAP S/4HANA ASCS/ERS with Standalone Enqueue Server 2 (ENSA2) in Pacemaker on RHEL](https://access.redhat.com/articles/3974941)
* Azure-specific RHEL documentation:
  * [Support Policies for RHEL High Availability Clusters - Microsoft Azure Virtual Machines as Cluster Members](https://access.redhat.com/articles/3131341)
  * [Installing and Configuring a Red Hat Enterprise Linux 7.4 (and later) High-Availability Cluster on Microsoft Azure](https://access.redhat.com/articles/3252491)

## Overview

To achieve high availability, SAP NetWeaver requires shared storage. GlusterFS is configured in a separate cluster and multiple SAP systems can use it.

Diagram that shows an overview of SAP NetWeaver high availability.

SAP NetWeaver ASCS, SAP NetWeaver SCS, SAP NetWeaver ERS, and the SAP HANA database use virtual hostname and virtual IP addresses. On Azure, a load balancer is required to use a virtual IP address. We recommend using [Standard Azure Load Balancer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-public-portal.md). The configuration here shows a load balancer with:

* Front-end IP address 10.0.0.7 for ASCS
* Front-end IP address 10.0.0.8 for ERS
* Probe port 62000 for ASCS
* Probe port 62101 for ERS

## Set up GlusterFS

SAP NetWeaver requires shared storage for the transport and profile directory. To see how to set up GlusterFS for SAP NetWeaver, see [GlusterFS on Azure VMs on Red Hat Enterprise Linux for SAP NetWeaver][glusterfs-ha].

## Prepare the infrastructure

Azure Marketplace contains images qualified for SAP with the High Availability add-on, which you can use to deploy new VMs by using various versions of Red Hat.

### Deploy Linux VMs manually via the Azure portal

This document assumes that you already deployed an [Azure virtual network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-networks-overview.md), subnet, and resource group.

Deploy VMs for SAP ASCS, ERS and Application servers. Choose a suitable RHEL image that's supported for the SAP system. You can deploy a VM in any one of the availability options: virtual machine scale set, availability zone, or availability set.

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
> When VMs without public IP addresses are placed in the back-end pool of an internal (no public IP address) Standard Azure load balancer, there's no outbound internet connectivity unless more configuration is performed to allow routing to public endpoints. For more information on how to achieve outbound connectivity, see [Public endpoint connectivity for VMs using Azure Standard Load Balancer in SAP high-availability scenarios](high-availability-guide-standard-load-balancer-outbound-connections.md).

> **Important:**
> Don't enable TCP timestamps on Azure VMs placed behind Azure Load Balancer. Enabling TCP timestamps causes the health probes to fail. Set the parameter `net.ipv4.tcp_timestamps` to `0`. For more information, see [Load Balancer health probes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/load-balancer-custom-probe-overview.md).

## Set up (A)SCS

Next, you'll prepare and install the SAP ASCS and ERS instances.

### Create a Pacemaker cluster

Follow the steps in [Set up Pacemaker on Red Hat Enterprise Linux in Azure](high-availability-guide-rhel-pacemaker.md) to create a basic Pacemaker cluster for this (A)SCS server.

### Prepare for the SAP NetWeaver installation

The following items are prefixed with:

* **[A]**: Applicable to all nodes
* **[1]**: Only applicable to node 1
* **[2]**: Only applicable to node 2

1. **[A]** Set up hostname resolution.

   You can either use a DNS server or modify the `/etc/hosts` file on all nodes. This example shows how to use the `/etc/hosts` file. Replace the IP address and the hostname in the following commands:

   ```bash
   sudo vi /etc/hosts
   ```

   Insert the following lines to the `/etc/hosts` file. Change the IP address and hostname to match your environment.

   ```text
   # IP addresses of the GlusterFS nodes
   10.0.0.40 glust-0
   10.0.0.41 glust-1
   10.0.0.42 glust-2
   # IP address of the load balancer frontend configuration for SAP NetWeaver ASCS
   10.0.0.7 nw1-ascs
   # IP address of the load balancer frontend configuration for SAP NetWeaver ASCS ERS
   10.0.0.8 nw1-aers
   ```

2. **[A]** Create the shared directories.

   ```bash
   sudo mkdir -p /sapmnt/NW1
   sudo mkdir -p /usr/sap/trans
   sudo mkdir -p /usr/sap/NW1/SYS
   sudo mkdir -p /usr/sap/NW1/ASCS00
   sudo mkdir -p /usr/sap/NW1/ERS02
   
   sudo chattr +i /sapmnt/NW1
   sudo chattr +i /usr/sap/trans
   sudo chattr +i /usr/sap/NW1/SYS
   sudo chattr +i /usr/sap/NW1/ASCS00
   sudo chattr +i /usr/sap/NW1/ERS02
   ```

3. **[A]** Install the GlusterFS client and other required packages.

   ```bash
   sudo yum -y install glusterfs-fuse resource-agents resource-agents-sap
   ```

4. **[A]** Check the version of `resource-agents-sap`.

   Make sure that the version of the installed `resource-agents-sap` package is at least 3.9.5-124.el7.

   ```bash
   sudo yum info resource-agents-sap
   
   # Loaded plugins: langpacks, product-id, search-disabled-repos
   # Repodata is over 2 weeks old. Install yum-cron? Or run: yum makecache fast
   # Installed Packages
   # Name        : resource-agents-sap
   # Arch        : x86_64
   # Version     : 3.9.5
   # Release     : 124.el7
   # Size        : 100 k
   # Repo        : installed
   # From repo   : rhel-sap-for-rhel-7-server-rpms
   # Summary     : SAP cluster resource agents and connector script
   # URL         : https://github.com/ClusterLabs/resource-agents
   # License     : GPLv2+
   # Description : The SAP resource agents and connector script interface with
   #          : Pacemaker to allow SAP instances to be managed in a cluster
   #          : environment.
   ```

5. **[A]** Add mount entries.

   ```bash
   sudo vi /etc/fstab
   
   # Add the following lines to fstab, save and exit
   glust-0:/NW1-sapmnt /sapmnt/NW1 glusterfs backup-volfile-servers=glust-1:glust-2 0 0
   glust-0:/NW1-trans /usr/sap/trans glusterfs backup-volfile-servers=glust-1:glust-2 0 0
   glust-0:/NW1-sys /usr/sap/NW1/SYS glusterfs backup-volfile-servers=glust-1:glust-2 0 0
   ```

   Mount the new shares.

   ```bash
   sudo mount -a
   ```

6. **[A]** Configure the SWAP file.

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

   Restart the agent to activate the change.

   ```bash
   sudo service waagent restart
   ```

7. **[A]** Configure RHEL.

   Based on the RHEL version, perform the configuration mentioned in SAP Note [2002167](https://launchpad.support.sap.com/#/notes/2002167), SAP Note [2772999](https://launchpad.support.sap.com/#/notes/2772999), or SAP Note [3108316](https://launchpad.support.sap.com/#/notes/3108316).

### Install SAP NetWeaver ASCS/ERS

1. **[1]** Configure the cluster default properties.

   ```bash
   pcs resource defaults resource-stickiness=1
   pcs resource defaults migration-threshold=3
   ```

2. **[1]** Create a virtual IP resource and health probe for the ASCS instance.

   ```bash
   sudo pcs node standby nw1-cl-1
   
   sudo pcs resource create fs_NW1_ASCS Filesystem device='glust-0:/NW1-ascs' \
     directory='/usr/sap/NW1/ASCS00' fstype='glusterfs' \
     options='backup-volfile-servers=glust-1:glust-2'
   
   sudo pcs resource create vip_NW1_ASCS IPaddr2 \
     ip=10.0.0.7
   
   sudo pcs resource create nc_NW1_ASCS azure-lb port=62000

   sudo pcs resource group add g-NW1_ASCS fs_NW1_ASCS vip_NW1_ASCS nc_NW1_ASCS
   ```

   Make sure that the cluster status is okay and that all resources are started. Which node the resources are running on isn't important.

   ```bash
   sudo pcs status
   
   # Node nw1-cl-1: standby
   # Online: [ nw1-cl-0 ]
   #
   # Full list of resources:
   #
   # rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
   #  Resource Group: g-NW1_ASCS
   #      fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
   #      nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
   #      vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
   ```

3. **[1]** Install SAP NetWeaver ASCS.

   Install SAP NetWeaver ASCS as the root on the first node by using a virtual hostname that maps to the IP address of the load balancer front-end configuration for the ASCS, for example, **nw1-ascs** and **10.0.0.7**, and the instance number that you used for the probe of the load balancer, for example, **00**.

   You can use the `sapinst` parameter `SAPINST_REMOTE_ACCESS_USER` to allow a nonroot user to connect to `sapinst`.

   ```bash
   # Allow access to SWPM. This rule is not permanent. If you reboot the machine, you have to run the command again.
   sudo firewall-cmd --zone=public  --add-port=4237/tcp
   
   sudo <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin
   ```

   If the installation fails to create a subfolder in /usr/sap/**NW1**/ASCS**00**, try setting the owner and group of the ASCS**00** folder and retry.

   ```bash
   sudo chown nw1adm /usr/sap/NW1/ASCS00
   sudo chgrp sapsys /usr/sap/NW1/ASCS00
   ```

4. **[1]** Create a virtual IP resource and health probe for the ERS instance.

   ```bash
   sudo pcs node unstandby nw1-cl-1
   sudo pcs node standby nw1-cl-0
   
   sudo pcs resource create fs_NW1_AERS Filesystem device='glust-0:/NW1-aers' \
     directory='/usr/sap/NW1/ERS02' fstype='glusterfs' \
     options='backup-volfile-servers=glust-1:glust-2'
   
   sudo pcs resource create vip_NW1_AERS IPaddr2 \
     ip=10.0.0.8
   
   sudo pcs resource create nc_NW1_AERS azure-lb port=62102

   sudo pcs resource group add g-NW1_AERS fs_NW1_AERS vip_NW1_AERS nc_NW1_AERS 
   ```

   Make sure that the cluster status is okay and that all resources are started. Which node the resources are running on isn't important.

   ```bash
   sudo pcs status
   
   # Node nw1-cl-0: standby
   # Online: [ nw1-cl-1 ]
   #
   # Full list of resources:
   #
   # rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-1
   #  Resource Group: g-NW1_ASCS
   #      fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
   #      nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
   #      vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
   #  Resource Group: g-NW1_AERS
   #      fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
   #      nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
   #      vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
   ```

5. **[2]** Install SAP NetWeaver ERS.

   Install SAP NetWeaver ERS as the root on the second node by using a virtual hostname that maps to the IP address of the load balancer front-end configuration for the ERS, for example, **nw1-aers** and **10.0.0.8**, and the instance number that you used for the probe of the load balancer, for example, **02**.

   You can use the `sapinst` parameter `SAPINST_REMOTE_ACCESS_USER` to allow a nonroot user to connect to `sapinst`.

   ```bash
   # Allow access to SWPM. This rule is not permanent. If you reboot the machine, you have to run the command again.
   sudo firewall-cmd --zone=public  --add-port=4237/tcp
   
   sudo <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin
   ```

   If the installation fails to create a subfolder in /usr/sap/**NW1**/ERS**02**, try setting the owner and group of the ERS**02** folder and retry.

   ```bash
   sudo chown nw1adm /usr/sap/NW1/ERS02
   sudo chgrp sapsys /usr/sap/NW1/ERS02
   ```

6. **[1]** Adapt the ASCS/SCS and ERS instance profiles.

   * ASCS/SCS profile:

     ```bash
     sudo vi /sapmnt/NW1/profile/NW1_ASCS00_nw1-ascs
     
     # Change the restart command to a start command
     #Restart_Program_01 = local $(_EN) pf=$(_PF)
     Start_Program_01 = local $(_EN) pf=$(_PF)
     
     # Add the keep alive parameter, if using ENSA1
     enque/encni/set_so_keepalive = TRUE
     ```

     For both ENSA1 and ENSA2, make sure that the `keepalive` OS parameters are set as described in SAP Note [1410736](https://launchpad.support.sap.com/#/notes/1410736).

   * ERS profile:

     ```bash
     sudo vi /sapmnt/NW1/profile/NW1_ERS02_nw1-aers
     
     # Change the restart command to a start command
     #Restart_Program_00 = local $(_ER) pf=$(_PFL) NR=$(SCSID)
     Start_Program_00 = local $(_ER) pf=$(_PFL) NR=$(SCSID)
     
     # remove Autostart from ERS profile
     # Autostart = 1
     ```

7. **[A]** Configure Keep Alive.

   The communication between the SAP NetWeaver application server and the ASCS/SCS is routed through a software load balancer. The load balancer disconnects inactive connections after a configurable timeout. To prevent this action, set a parameter in the SAP NetWeaver ASCS/SCS profile, if you're using ENSA1. Change the Linux system `keepalive` settings on all SAP servers for both ENSA1 and ENSA2. For more information, see SAP Note [1410736][1410736].

   ```bash
   # Change the Linux system configuration
   sudo sysctl net.ipv4.tcp_keepalive_time=300
   ```

8. **[A]** Update the `/usr/sap/sapservices` file.

   To prevent the start of the instances by the `sapinit` startup script, all instances managed by Pacemaker must be commented out from the `/usr/sap/sapservices` file.

   ```bash
   sudo vi /usr/sap/sapservices
   
   # On the node where you installed the ASCS, comment out the following line
   # LD_LIBRARY_PATH=/usr/sap/NW1/ASCS00/exe:$LD_LIBRARY_PATH; export LD_LIBRARY_PATH; /usr/sap/NW1/ASCS00/exe/sapstartsrv pf=/usr/sap/NW1/SYS/profile/NW1_ASCS00_nw1-ascs -D -u nw1adm
   
   # On the node where you installed the ERS, comment out the following line
   # LD_LIBRARY_PATH=/usr/sap/NW1/ERS02/exe:$LD_LIBRARY_PATH; export LD_LIBRARY_PATH; /usr/sap/NW1/ERS02/exe/sapstartsrv pf=/usr/sap/NW1/ERS02/profile/NW1_ERS02_nw1-aers -D -u nw1adm
   ```

9. **[1]** Create the SAP cluster resources.

   Depending on whether you are running an ENSA1 or ENSA2 system, select respective tab to define the resources. SAP introduced support for [ENSA2](https://help.sap.com/docs/ABAP_PLATFORM_NEW/cff8531bc1d9416d91bb6781e628d4e0/6d655c383abf4c129b0e5c8683e7ecd8.html), including replication, in SAP NetWeaver 7.52. Starting with ABAP Platform 1809, ENSA2 is installed by default. For ENSA2 support, see SAP Note [2630416](https://launchpad.support.sap.com/#/notes/2630416) for enqueue server 2 support.

   If you use enqueue server 2 architecture ([ENSA2](https://help.sap.com/docs/ABAP_PLATFORM_NEW/cff8531bc1d9416d91bb6781e628d4e0/6d655c383abf4c129b0e5c8683e7ecd8.html)), install resource agent resource-agents-sap-4.1.1-12.el7.x86_64 or newer and define the resources as shown here:

    #### [ENSA1](#tab/ensa1)

    ```bash
    sudo pcs property set maintenance-mode=true
   
    sudo pcs resource create rsc_sap_NW1_ASCS00 SAPInstance \
    InstanceName=NW1_ASCS00_nw1-ascs START_PROFILE="/sapmnt/NW1/profile/NW1_ASCS00_nw1-ascs" \
    AUTOMATIC_RECOVER=false \
    meta resource-stickiness=5000 migration-threshold=1 failure-timeout=60 \
    op monitor interval=20 on-fail=restart timeout=60 \
    op start interval=0 timeout=600 op stop interval=0 timeout=600

    sudo pcs resource group add g-NW1_ASCS rsc_sap_NW1_ASCS00
    sudo pcs resource meta g-NW1_ASCS resource-stickiness=3000
   
    sudo pcs resource create rsc_sap_NW1_ERS02 SAPInstance \
    InstanceName=NW1_ERS02_nw1-aers START_PROFILE="/sapmnt/NW1/profile/NW1_ERS02_nw1-aers" \
    AUTOMATIC_RECOVER=false IS_ERS=true \
    op monitor interval=20 on-fail=restart timeout=60 op start interval=0 timeout=600 op stop interval=0 timeout=600

    sudo pcs resource group add g-NW1_AERS rsc_sap_NW1_ERS02
   
    sudo pcs constraint order start g-NW1_ASCS then stop g-NW1_AERS kind=Optional symmetrical=false
    sudo pcs constraint colocation add g-NW1_AERS with g-NW1_ASCS score=-5000
    # On RHEL 7.x, 8.x, 9.x
    sudo pcs constraint location rsc_sap_NW1_ASCS00 rule score=2000 runs_ers_NW1 eq 1
    # On RHEL 10.x
    sudo pcs constraint location rsc_sap_NW1_ASCS00 rule score=2000 "runs_ers_NW1 eq 1"

    sudo pcs node unstandby nw1-cl-0
    sudo pcs property set maintenance-mode=false
    ```

    #### [ENSA2](#tab/ensa2)

    ```bash
    sudo pcs property set maintenance-mode=true
   
    sudo pcs resource create rsc_sap_NW1_ASCS00 SAPInstance \
    InstanceName=NW1_ASCS00_nw1-ascs START_PROFILE="/sapmnt/NW1/profile/NW1_ASCS00_nw1-ascs" \
    AUTOMATIC_RECOVER=false \
    meta resource-stickiness=5000 \
    op monitor interval=20 on-fail=restart timeout=60 \
    op start interval=0 timeout=600 op stop interval=0 timeout=600

    sudo pcs resource group add g-NW1_ASCS rsc_sap_NW1_ASCS00
    sudo pcs resource meta g-NW1_ASCS resource-stickiness=3000
   
    sudo pcs resource create rsc_sap_NW1_ERS02 SAPInstance \
    InstanceName=NW1_ERS02_nw1-aers START_PROFILE="/sapmnt/NW1/profile/NW1_ERS02_nw1-aers" \
    AUTOMATIC_RECOVER=false IS_ERS=true \
    op monitor interval=20 on-fail=restart timeout=60 op start interval=0 timeout=600 op stop interval=0 timeout=600

    sudo pcs resource group add g-NW1_AERS rsc_sap_NW1_ERS02
   
    sudo pcs constraint order start g-NW1_ASCS then stop g-NW1_AERS kind=Optional symmetrical=false
    sudo pcs constraint colocation add g-NW1_AERS with g-NW1_ASCS score=-5000

    sudo pcs node unstandby nw1-cl-0
    sudo pcs property set maintenance-mode=false
    ```

    ---

    > **Note:**
    > If you're upgrading from an older version and switching to enqueue server 2, see SAP Note [2641322](https://launchpad.support.sap.com/#/notes/2641322).

    > **Note:**
    > The timeouts in the preceding configuration are only examples and might need to be adapted to the specific SAP setup.

    Make sure that the cluster status is okay and that all resources are started. Which node the resources are running on isn't important.

    ```bash
    sudo pcs status
   
    # Online: [ nw1-cl-0 nw1-cl-1 ]
    #
    # Full list of resources:
    #
    # rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    #  Resource Group: g-NW1_ASCS
    #      fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
    #      nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
    #      vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
    #      rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
    #  Resource Group: g-NW1_AERS
    #      fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
    #      nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
    #      vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
    #      rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
    ```

10. **[1]** Run the following step to configure `priority-fencing-delay` (applicable only as of pacemaker-2.0.4-6.el8 or higher).

    > **Note:**
    > If you have a two-node cluster, you have the option to configure the `priority-fencing-delay` cluster property. This property introduces additional delay in fencing a node that has higher total resource priority when a split-brain scenario occurs. For more information, see [Can Pacemaker fence the cluster node with the fewest running resources?](https://access.redhat.com/solutions/5110521)
    >
    > The property `priority-fencing-delay` is applicable for pacemaker-2.0.4-6.el8 version or higher. If you set up `priority-fencing-delay` on an existing cluster, make sure to clear the `pcmk_delay_max` setting in the fencing device.  

    ```bash
    sudo pcs resource defaults update priority=1
    sudo pcs resource update rsc_sap_NW1_ASCS00 meta priority=10

    sudo pcs property set priority-fencing-delay=15s
    ```

11. **[A]** Add firewall rules for ASCS and ERS on both nodes.

    ```bash
    # Probe Port of ASCS
    sudo firewall-cmd --zone=public --add-port={62000,3200,3600,3900,8100,50013,50014,50016}/tcp --permanent
    sudo firewall-cmd --zone=public --add-port={62000,3200,3600,3900,8100,50013,50014,50016}/tcp
    # Probe Port of ERS
    sudo firewall-cmd --zone=public --add-port={62102,3202,3302,50213,50214,50216}/tcp --permanent
    sudo firewall-cmd --zone=public --add-port={62102,3202,3302,50213,50214,50216}/tcp
    ```

> **Note:**
> SAP ASCS/ERS cluster can be extended from 2-node to 3-node cluster with 3rd node as a spare node for failover of ASCS or ERS services.
> - 3-node setup can only be used for SAP systems using SAP Enqueue Replication Server 2 (ENSA2).
> - The cluster property `priority-fencing-delay` should not be used in a 3-node cluster.


## SAP NetWeaver application server preparation

Some databases require that the database instance installation runs on an application server. Prepare the application server VMs to be able to use them in these cases.

The following steps assume that you install the application server on a server different from the ASCS/SCS and HANA servers. Otherwise, some of the steps (like configuring hostname resolution) aren't needed.

1. Set up hostname resolution.

   You can either use a DNS server or modify the `/etc/hosts` file on all nodes. This example shows how to use the `/etc/hosts` file. Replace the IP address and the hostname in the following commands:

   ```bash
   sudo vi /etc/hosts
   ```

   Insert the following lines to `/etc/hosts`. Change the IP address and hostname to match your environment.

   ```bash
   # IP addresses of the GlusterFS nodes
   10.0.0.40 glust-0
   10.0.0.41 glust-1
   10.0.0.42 glust-2
   # IP address of the load balancer frontend configuration for SAP NetWeaver ASCS
   10.0.0.7 nw1-ascs
   # IP address of the load balancer frontend configuration for SAP NetWeaver ASCS ERS
   10.0.0.8 nw1-aers
   # IP address of the load balancer frontend configuration for database
   10.0.0.13 nw1-db
   ```

1. Create the `sapmnt` directory.

   ```bash
   sudo mkdir -p /sapmnt/NW1
   sudo mkdir -p /usr/sap/trans
   
   sudo chattr +i /sapmnt/NW1
   sudo chattr +i /usr/sap/trans
   ```

1. Install the GlusterFS client and other requirements.

   ```bash
   sudo yum -y install glusterfs-fuse uuidd
   ```

1. Add mount entries.

   ```bash
   sudo vi /etc/fstab
   
   # Add the following lines to fstab, save and exit
   glust-0:/NW1-sapmnt /sapmnt/NW1 glusterfs backup-volfile-servers=glust-1:glust-2 0 0
   glust-0:/NW1-trans /usr/sap/trans glusterfs backup-volfile-servers=glust-1:glust-2 0 0
   ```

   Mount the new shares.

   ```bash
   sudo mount -a
   ```

1. Configure the SWAP file.

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

   Restart the agent to activate the change.

   ```bash
   sudo service waagent restart
   ```

## Install the database

In this example, SAP NetWeaver is installed on SAP HANA. You can use every supported database for this installation. For more information on how to install SAP HANA in Azure, see [High availability of SAP HANA on Azure VMs on Red Hat Enterprise Linux][sap-hana-ha]. For a list of supported databases, see SAP Note [1928533][1928533].

1. Run the SAP database instance installation.

   Install the SAP NetWeaver database instance as the root by using a virtual hostname that maps to the IP address of the load balancer front-end configuration for the database, for example, **nw1-db** and **10.0.0.13**.

   You can use the `sapinst` parameter `SAPINST_REMOTE_ACCESS_USER` to allow a nonroot user to connect to `sapinst`.

   ```bash
   sudo <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin
   ```

## SAP NetWeaver application server installation

Follow these steps to install an SAP application server.

1. Prepare the application server.

   Follow the steps in the previous section [SAP NetWeaver application server preparation](#sap-netweaver-application-server-preparation) to prepare the application server.

1. Install the SAP NetWeaver application server.

   Install a primary or additional SAP NetWeaver applications server.

   You can use the `sapinst` parameter `SAPINST_REMOTE_ACCESS_USER` to allow a nonroot user to connect to `sapinst`.

   ```bash
   sudo <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin
   ```

1. Update the SAP HANA secure store.

   Update the SAP HANA secure store to point to the virtual name of the SAP HANA System Replication setup.

   Run the following command to list the entries as \<sapsid>adm:

   ```bash
   hdbuserstore List
   ```

   All entries should be listed and look similar to:

   ```text
   DATA FILE       : /home/nw1adm/.hdb/nw1-di-0/SSFS_HDB.DAT
   KEY FILE        : /home/nw1adm/.hdb/nw1-di-0/SSFS_HDB.KEY
   
   KEY DEFAULT
     ENV : 10.0.0.14:30313
     USER: SAPABAP1
     DATABASE: NW1
   ```

   The output shows that the IP address of the default entry is pointing to the VM and not to the load balancer's IP address. This entry needs to be changed to point to the virtual hostname of the load balancer. Make sure to use the same port (**30313** in the preceding output) and database name (**HN1** in the preceding output).

   ```bash
   su - nw1adm
   hdbuserstore SET DEFAULT nw1-db:30313@NW1 SAPABAP1 <password of ABAP schema>
   ```

## Test the cluster setup

1. Manually migrate the ASCS instance.

   Resource state before starting the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
   ```

   Run the following commands as root to migrate the ASCS instance.

   ```bash
   [root@nw1-cl-0 ~]# pcs resource move rsc_sap_NW1_ASCS00
   
   [root@nw1-cl-0 ~]# pcs resource clear rsc_sap_NW1_ASCS00
   
   # Remove failed actions for the ERS that occurred as part of the migration
   [root@nw1-cl-0 ~]# pcs resource cleanup rsc_sap_NW1_ERS02
   ```

   Resource state after the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
   ```

2. Simulate a node crash.

   Resource state before starting the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
   ```

   Run the following command as root on the node where the ASCS instance is running.

   ```bash
   [root@nw1-cl-1 ~]# echo b > /proc/sysrq-trigger
   ```

   The status after the node is started again should look like:

   ```text
   Online: [ nw1-cl-0 nw1-cl-1 ]
   
   Full list of resources:
   
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
   
   Failed Actions:
   * rsc_sap_NW1_ERS02_monitor_11000 on nw1-cl-0 'not running' (7): call=45, status=complete, exitreason='',
       last-rc-change='Tue Aug 21 13:52:39 2018', queued=0ms, exec=0ms
   ```

   > **Note:**
   > If you're using SBD as a STONITH mechanism, it could happen that after a reboot, when the node attempts to rejoin the cluster, it receives the message "we were allegedly just fenced" message in /var/log/messages and shut down the Pacemaker and Corosync services. To address the issue, you can follow the workaround described in RedHat KB [A node shuts down pacemaker after getting fenced and restarting corosync and pacemaker](https://access.redhat.com/solutions/5644441). However, in Azure, set a delay of 150 seconds for Corosync service to startup. Ensure that these steps are applied to all cluster nodes.

   Use the following command to clean the failed resources.

   ```bash
   [root@nw1-cl-0 ~]# pcs resource cleanup rsc_sap_NW1_ERS02
   ```

   Resource state after the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
   ```

3. Block network communication.

   Resource state before starting the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
   ```

   Run a firewall rule to block the communication on one of the nodes.

   ```bash
    # Execute iptable rule on nw1-cl-0 (10.0.0.7) to block the incoming and outgoing traffic to nw1-cl-1 (10.0.0.8)
    iptables -A INPUT -s 10.0.0.8 -j DROP; iptables -A OUTPUT -d 10.0.0.8 -j DROP
   ```

   When cluster nodes can't communicate with each other, there's a risk of a split-brain scenario. In such situations, cluster nodes try to simultaneously fence each other, which results in a fence race. To avoid this situation, we recommend that you set a [priority-fencing-delay](https://access.redhat.com/solutions/5110521) property in a cluster configuration (applicable only for [pacemaker-2.0.4-6.el8](https://access.redhat.com/errata/RHEA-2020:4804) or higher).

   By enabling the `priority-fencing-delay` property, the cluster introduces a delay in the fencing action, specifically on the node hosting ASCS resource, allowing the node to win the fence race.

   > **Note:**
   > The `priority-fencing-delay` property applies only to two-node cluster configurations.

   Run the following command to delete the firewall rule.

   ```bash
    # If the iptables rule set on the server gets reset after a reboot, the rules will be cleared out. In case they have not been reset, please proceed to remove the iptables rule using the following command.
    iptables -D INPUT -s 10.0.0.8 -j DROP; iptables -D OUTPUT -d 10.0.0.8 -j DROP
   ```

4. Kill the message server process.

   Resource state before starting the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
   ```

   Run the following commands as root to identify the process of the message server and kill it.

   ```bash
   [root@nw1-cl-0 ~]# pgrep -f ms.sapNW1 | xargs kill -9
   ```

   If you kill the message server only once, `sapstart` restarts it. If you kill it often enough, Pacemaker eventually moves the ASCS instance to the other node. Run the following commands as root to clean up the resource state of the ASCS and ERS instance after the test.

   ```bash
   [root@nw1-cl-0 ~]# pcs resource cleanup rsc_sap_NW1_ASCS00
   [root@nw1-cl-0 ~]# pcs resource cleanup rsc_sap_NW1_ERS02
   ```

   Resource state after the test:

   ```bash
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
   ```

5. Kill the enqueue server process.

   Resource state before starting the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
   ```

   Run the following commands as root on the node where the ASCS instance is running to kill the enqueue server.

   ```bash
   #If using ENSA1 
   [root@nw1-cl-1 ~]# pgrep -f en.sapNW1 | xargs kill -9
   
   #If using ENSA2
   [root@nw1-cl-1 ~]# pgrep -f enq.sapNW1 | xargs kill -9
   ```

   The ASCS instance should immediately fail over to the other node, in the case of ENSA1. The ERS instance should also fail over after the ASCS instance is started. Run the following commands as root to clean up the resource state of the ASCS and ERS instance after the test.

   ```bash
   [root@nw1-cl-0 ~]# pcs resource cleanup rsc_sap_NW1_ASCS00
   [root@nw1-cl-0 ~]# pcs resource cleanup rsc_sap_NW1_ERS02
   ```

   Resource state after the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
   ```

6. Kill the enqueue replication server process.

   Resource state before starting the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
   ```

   Run the following command as root on the node where the ERS instance is running to kill the enqueue replication server process.

   ```bash
   #If using ENSA1
   [root@nw1-cl-1 ~]# pgrep -f er.sapNW1 | xargs kill -9
   
   #If using ENSA2
   [root@nw1-cl-1 ~]# pgrep -f enqr.sapNW1 | xargs kill -9
   ```

   If you run the command only once, `sapstart` restarts the process. If you run it often enough, `sapstart` won't restart the process and the resource is in a stopped state. Run the following commands as root to clean up the resource state of the ERS instance after the test.

   ```bash
   [root@nw1-cl-0 ~]# pcs resource cleanup rsc_sap_NW1_ERS02
   ```

   Resource state after the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
   ```

7. Kill the enqueue `sapstartsrv` process.

   Resource state before starting the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
   ```

   Run the following commands as root on the node where the ASCS is running.

   ```bash
   [root@nw1-cl-0 ~]# pgrep -fl ASCS00.*sapstartsrv
   # 59545 sapstartsrv
   
   [root@nw1-cl-0 ~]# kill -9 59545
   ```

   The `sapstartsrv` process should always be restarted by the Pacemaker resource agent as part of the monitoring. Resource state after the test:

   ```text
   rsc_st_azure    (stonith:fence_azure_arm):      Started nw1-cl-0
    Resource Group: g-NW1_ASCS
        fs_NW1_ASCS        (ocf::heartbeat:Filesystem):    Started nw1-cl-0
        nc_NW1_ASCS        (ocf::heartbeat:azure-lb):      Started nw1-cl-0
        vip_NW1_ASCS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-0
        rsc_sap_NW1_ASCS00 (ocf::heartbeat:SAPInstance):   Started nw1-cl-0
    Resource Group: g-NW1_AERS
        fs_NW1_AERS        (ocf::heartbeat:Filesystem):    Started nw1-cl-1
        nc_NW1_AERS        (ocf::heartbeat:azure-lb):      Started nw1-cl-1
        vip_NW1_AERS       (ocf::heartbeat:IPaddr2):       Started nw1-cl-1
        rsc_sap_NW1_ERS02  (ocf::heartbeat:SAPInstance):   Started nw1-cl-1
   ```

## Next steps

* To deploy a cost-optimization scenario where the PAS and AAS instance is deployed with SAP NetWeaver HA cluster on RHEL, see [Install SAP dialog instance with SAP ASCS/SCS high availability VMs on RHEL](high-availability-guide-rhel-with-dialog-instance.md).
* See [HA for SAP NW on Azure VMs on RHEL for SAP applications multi-SID guide](high-availability-guide-rhel-multi-sid.md).
* See [Azure Virtual Machines planning and implementation for SAP][planning-guide].
* See [Azure Virtual Machines deployment for SAP][deployment-guide].
* See [Azure Virtual Machines DBMS deployment for SAP][dbms-guide].
* To learn how to establish HA and plan for disaster recovery of SAP HANA on Azure (large instances), see [SAP HANA (large instances) high availability and disaster recovery on Azure](https://learn.microsoft.com/azure/virtual-machines/workloads/sap/hana-overview-high-availability-disaster-recovery).
* To learn how to establish HA and plan for disaster recovery of SAP HANA on Azure VMs, see [High availability of SAP HANA on Azure Virtual Machines][sap-hana-ha].
