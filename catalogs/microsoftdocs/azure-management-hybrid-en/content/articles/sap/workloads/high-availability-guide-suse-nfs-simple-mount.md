---
title: Azure VMs high availability for SAP NetWeaver on SLES for SAP Applications with simple mount and NFS
description: Learn how to configure high-availability SAP NetWeaver on SUSE Linux Enterprise Server with simple mount and NFS for SAP applications.
services: virtual-machines-windows,virtual-network,storage
ms.service: sap-on-azure
ms.subservice: sap-vm-workloads
ms.topic: how-to
manager: juergent
author: rdeltcheva
ms.author: radeltch
ms.date: 03/04/2026
zone_pivot_groups: sap-ha-nfs-solution
ms.custom:
  - devx-track-azurecli
  - devx-track-azurepowershell
  - linux-related-content
  - sfi-image-nochange
# Customer intent: "As an IT administrator, I want to deploy a high-availability SAP NetWeaver system on Azure using NFS for shared storage, so that I can ensure continuous service and reliability for my applications running on SUSE Linux Enterprise Server."
---

# High-availability SAP NetWeaver with simple mount and NFS on SLES for SAP Virtual Machines


This article describes how to deploy and configure Azure virtual machines (VMs), install the cluster framework, and install a high-availability (HA) SAP NetWeaver system with a simple mount structure. You can implement the presented architecture by using one of the Azure native Network File System (NFS) services selectable above.

This article describes a high-availability configuration for ASCS with a simple mount structure. To deploy the SAP application layer, you need shared directories like `/sapmnt/SID`, `/usr/sap/SID`, and `/usr/sap/trans`, which are highly available. 

You still need a Pacemaker cluster to help protect single-point-of-failure components like SAP Central Services (SCS) and ASCS.

Compared to the classic Pacemaker cluster configuration, with the simple mount deployment, the cluster doesn't manage the file systems.

This article doesn't cover the database layer.

The example configurations and installation commands use the following instance numbers and server names.

| Instance name | Instance number |
| --- | --- |
| ASCS | 00 |
| Enqueue Replication Server (ERS) | 01 |
| Primary Application Server (PAS) | 02 |
| Additional Application Server (AAS) | 03 |
| SAP system identifier | NW1 |

A diagram that shows SAP NetWeaver high availability with simple mount and NFS.
This diagram shows a typical SAP NetWeaver HA architecture with a simple mount. The `sapmnt` and `saptrans` file systems are deployed on Azure native NFS, NFS shares on Azure Files, or NFS volumes on Azure NetApp Files. A Pacemaker cluster protects the SAP central services. The clustered VMs are behind an Azure load balancer. The Pacemaker cluster doesn't manage the file systems, in contrast to the classic Pacemaker configuration.



> **Important:**
> SUSE supports the cluster configuration with simple mount on SLES for SAP Applications 15 and later releases.

## Prerequisites

The following guides contain all the required information to configure a NetWeaver HA system:

- SUSE Documentation
   - [SUSE SAP High Availability with Simple Mount][susedoc-sap-ha-simplemount]
   - [SUSE Simple Mount KB 19944][susedoc-kb-19944]
   - [SAP Applications on SLES 16 Best Practices][susedoc-sap-sles-16-bestpractices]
   - [SAP Applications on SLES 15 Best Practices][susedoc-sap-sles-15-bestpractices]
   - [SUSE Release Notes][susedoc-release-notes]
- SAP Documentation for SUSE
   - SAP Note [1275776][sapnote-1275776-sles]: SAP SUSE Documentation
   - SAP Note [3565382][sapnote-3565382-sles16]: recommended OS settings for SLES 16
   - SAP Note [2578899][sapnote-2578899-sles15]: recommended OS settings for SLES 15

- SAP documentation for SAP on Azure
   - SAP Note [1928533][sapnote-1928533-AzureVMInfo], which has:
     - A list of Azure Virtual Machine sizes that are supported for the deployment of SAP software
     - Important capacity information for Azure Virtual Machine sizes
     - Supported SAP software, operating systems (OSs), and combinations
     - The required SAP kernel version for Windows and Linux on Microsoft Azure
   - SAP Note [2015553][sapnote-2015553-AzurePrereqs], which lists prerequisites for SAP-supported SAP software deployments in Azure.
   - SAP Note [2178632][sapnote-2178632-AzureMonitoringMetrics], which has detailed information about all monitoring metrics reported for SAP in Azure
   - SAP Note [2191498][sapnote-2191498-AzureHostAgentLinux], which has the required SAP Host Agent version for Linux in Azure
   - SAP Note [2243692][sapnote-2243692-LicensingInAzure], which has information about SAP licensing on Linux in Azure
   - SAP Note [1999351][sapnote-1999351-AzureEnhancedMonitoringExtension], which has more troubleshooting information for the Azure Enhanced Monitoring Extension for SAP
- Azure Services documentation
   - [NFS on Azure Files][azdoc-afs-intro]
   - [Azure NetApp Files][azdoc-anf-intro]
   - [Azure Internal Load Balancer][azdoc-ilb-intro]
- NetApp NFS documentation
   - [NetApp NFS best practices](https://www.netapp.com/media/10720-tr-4067.pdf)
- Microsoft SAP on Azure documentation
   - [Azure Virtual Machines planning and implementation for SAP on Linux][azdoc-sap-planning-guide]
   - [Azure Virtual Machines deployment for SAP on Linux][azdoc-sap-deployment-guide]
   - [Azure Virtual Machines DBMS deployment for SAP on Linux][azdoc-sap-dbms-guide]



[azdoc-afs-intro]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-introduction.md

[azdoc-anf-intro]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-introduction.md

[azdoc-ilb-intro]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/load-balancer-overview.md

[azdoc-sap-dbms-guide]: dbms-guide-general.md
[azdoc-sap-deployment-guide]: deployment-guide.md
[azdoc-sap-planning-guide]: planning-guide.md

[sapnote-1928533-AzureVMInfo]: https://launchpad.support.sap.com/#/notes/1928533
[sapnote-2015553-AzurePrereqs]: https://launchpad.support.sap.com/#/notes/2015553
[sapnote-2178632-AzureMonitoringMetrics]: https://launchpad.support.sap.com/#/notes/2178632
[sapnote-2191498-AzureHostAgentLinux]: https://launchpad.support.sap.com/#/notes/2191498
[sapnote-2243692-LicensingInAzure]: https://launchpad.support.sap.com/#/notes/2243692
[sapnote-1999351-AzureEnhancedMonitoringExtension]: https://launchpad.support.sap.com/#/notes/1999351

## Prepare the infrastructure

The resource agent for SAP Instance is included in SUSE Linux Enterprise Server for SAP images in the Azure Marketplace. You can use it to deploy new VMs.

### Deploy Linux VMs manually via Azure portal

This article assumes that you previously deployed a resource group, [Azure Virtual Network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-networks-overview.md), and subnet for your cluster.

Deploy VMs for SAP ASCS, ERS, and application servers. Choose a suitable version of SLES that is supported for your SAP system. You can deploy VMs in any one of the availability options - virtual machine scale set, availability zone, or availability set.

### Configure Azure load balancer


During virtual machine (VM) configuration, you can create or select an existing internal load balancer (ILB) in the networking section. Follow the steps outlined to configure a standard load balancer for the high-availability setup of an SAP system. You need a combination of a front end IP, health probe, and load balancing rule for each service you're hosting in your cluster.

Use the following reference when configuring your ILB:
- Frontend IP Configuration: Create one IP for each service you're hosting in your cluster. It must be on the same virtual network & subnet as your VMs.
- Backend Pool: Create one backend pool for your cluster and add your VMs to it.
- Health Probes: Create one health probe for each service in your cluster, use the following options:
   - Protocol: TCP
   - Port: 625## (where ## is the service's instance number)
   - Interval: 5
   - Probe Threshold: 2
- Load Balancing Rules: Create one per service in your cluster.
   - Protocol: TCP
   - Frontend IP: Select the corresponding IP for your service
   - Backend Pool: Select your backend pool
   - High Availability Ports: Use this option
   - Health Probe: Select the corresponding health probe for your service
   - Session Persistence: None
   - Idle Timeout (minutes): 30
   - Enable TCP Reset: No
   - Enable Floating IP: Yes

#### [Azure portal](#tab/lb-portal)

Follow the [Create load balancer][azdoc-ilb-create-portal] guide to set up a standard load balancer for a high availability SAP system using the Azure portal.

> **Note:**
> The health probe configuration property `ProbeThreshold` can't be specified in the Portal. So to control the number of successful or failed consecutive probes, set the property "probeThreshold" to 2 by using either the [Azure CLI][azcli-lb-probe-update] or [PowerShell][azps-setlb-probe-update] commands.

#### [Azure CLI](#tab/lb-azurecli)

Use the following commands to create and configure your internal load balancer. Additional command reference can be found at [Create load balancer][azdoc-ilb-create-azcli]

```azurecli-interactive
# Create the load balancer resource (it creates 1 Frontend IP by default).  Allocation of private IP address is dynamic using below command. If you want to pass static IP address, include parameter --private-ip-address.
az network lb create -g <ResourceGroupName> -n <LBName> --sku Standard --vnet-name <VMsVirtualNetworkName> --subnet <VMsSubnetName> --backend-pool-name <BackendPoolName> --frontend-ip-name <Service1FrontendIpName>

# Add Cluster VMs into the Backend Pool
az network nic ip-config address-pool add --address-pool <BackendPoolName> --ip-config-name <ClusterVM1-IpConfigName> --nic-name <ClusterVM1-NicName> -g <ResourceGroupName> --lb-name <LBName>
az network nic ip-config address-pool add --address-pool <BackendPoolName> --ip-config-name <ClusterVM2-IpConfigName> --nic-name <ClusterVM2-NicName> -g <ResourceGroupName> --lb-name <LBName>

# Create the health probe for Service 1 (ASCS or Hana)
az network lb probe create -g <ResourceGroupName> --lb-name <LBName> -n <Service1HealthProbeName> --protocol tcp --port 625<##> --interval 5 --probe-threshold 2

# Create load balancing rule for Service 1 (ASCS or Hana)
az network lb rule create -g <ResourceGroupName> --lb-name <LBName> -n <Service1LoadBalancerRuleName> --frontend-ip-name <Service1FrontendIpName> --backend-pool-name <BackendPoolName> --probe-name <Service1HealthProbeName> --protocol All --frontend-port 0 --backend-port 0 --idle-timeout-in-minutes 30 --enable-floating-ip

# Service N (ERS, PAS, etc)
# Create Seperate IP
az network lb frontend-ip create -g <ResourceGroupName> --lb-name <LBName> -n <ServiceNFrontendIpName> --vnet-name <VMsVirtualNetworkName> --subnet <VMsSubnetName>

# Create the health probe
az network lb probe create -g <ResourceGroupName> --lb-name <LBName> -n <ServiceNHealthProbeName> --protocol tcp --port 625<##> --interval 5 --probe-threshold 2

# Create load balancing rule
az network lb rule create -g <ResourceGroupName> --lb-name <LBName> -n <ServiceNLoadBalancerRuleName> --protocol All --frontend-ip-name <ServiceNFrontendIpName> --frontend-port 0 --backend-pool-name <BackendPoolName> --backend-port 0 --probe-name <ServiceNHealthProbeName> --idle-timeout-in-minutes 30 --enable-floating-ip
```

</br>
<details>
<summary>Expand to view full CLI code</summary>

```azurecli-interactive
# Define variables for Resource Group, Cluster VMs.

rg_name="<ResourceGroupName>"
vm1_name="<ClusterVM1Name>"
vm2_name="<ClusterVM2Name>"

# Define variables for the load balancer that will be use in the creation of the load balancer resource.

lb_name="<LBName>"
bkp_name="<BackendPoolName>"

# Service 1 (ASCS or Hana)
service_1_fip_name="<Service1FrontendIpName>"
service_1_hp_name="<Service1HealthProbeName>"
service_1_hp_port="625<##>"
service_1_rule_name="<Service1LoadBalancerRuleName>"

# Service N (ERS, PAS, etc)
service_n_fip_name="<ServiceNFrontendIpName>"
service_n_hp_name="<ServiceNHealthProbeName>"
service_n_hp_port="625<##>"
service_n_rule_name="<ServiceNLoadBalancerRuleName>"
 
# Command to get VMs network information automatically from the names
 
vm1_primary_nic=$(az vm nic list -g $rg_name --vm-name $vm1_name --query "[?primary == \`true\`].{id:id} || [?primary == \`null\`].{id:id}" -o tsv)
vm1_nic_name=$(basename $vm1_primary_nic)
vm1_ipconfig=$(az network nic ip-config list -g $rg_name --nic-name $vm1_nic_name --query "[?primary == \`true\`].name" -o tsv)
 
vm2_primary_nic=$(az vm nic list -g $rg_name --vm-name $vm2_name --query "[?primary == \`true\`].{id:id} || [?primary == \`null\`].{id:id}" -o tsv)
vm2_nic_name=$(basename $vm2_primary_nic)
vm2_ipconfig=$(az network nic ip-config list -g $rg_name --nic-name $vm2_nic_name --query "[?primary == \`true\`].name" -o tsv)
 
vnet_subnet_id=$(az network nic show -g $rg_name -n $vm1_nic_name --query ipConfigurations[0].subnet.id -o tsv)
vnet_name=$(basename $(dirname $(dirname $vnet_subnet_id)))
subnet_name=$(basename $vnet_subnet_id)

# Create the load balancer resource (it creates 1 Frontend IP by default).  Allocation of private IP address is dynamic using below command. If you want to pass static IP address, include parameter --private-ip-address.
az network lb create -g $rg_name -n $lb_name --sku Standard --vnet-name $vnet_name --subnet $subnet_name --backend-pool-name $bkp_name --frontend-ip-name $service_1_fip_name

# Add Cluster VMs into the Backend Pool
az network nic ip-config address-pool add --address-pool $bkp_name --ip-config-name $vm1_ipconfig --nic-name $vm1_nic_name -g $rg_name --lb-name $lb_name
az network nic ip-config address-pool add --address-pool $bkp_name --ip-config-name $vm2_ipconfig --nic-name $vm2_nic_name -g $rg_name --lb-name $lb_name

# -- Service 1 (ASCS or Hana) --
# Create the health probe for Service 1
az network lb probe create -g $rg_name --lb-name $lb_name -n $service_1_hp_name --protocol tcp --port $service_1_hp_port --interval 5 --probe-threshold 2 -ProbeCount 1

# Create load balancing rule for Service 1
az network lb rule create -g $rg_name --lb-name $lb_name -n $service_1_rule_name --frontend-ip-name $service_1_fip_name --backend-pool-name $bkp_name --probe-name $service_1_hp_name --protocol All --frontend-port 0 --backend-port 0 --idle-timeout-in-minutes 30 --enable-floating-ip

# -- Service N (ERS, PAS, etc) --
# Create a Seperate IP
az network lb frontend-ip create -g $rg_name --lb-name $lb_name -n $service_n_fip_name --vnet-name $vnet_name --subnet $subnet_name

# Create the health probe
az network lb probe create -g $rg_name --lb-name $lb_name -n $service_n_hp_name --protocol tcp --port $service_n_hp_port --interval 5 --probe-threshold 2 -ProbeCount 1

# Create load balancing rule
az network lb rule create -g $rg_name --lb-name $lb_name -n $service_n_rule_name --protocol All --frontend-ip-name $service_n_fip_name --frontend-port 0 --backend-pool-name $bkp_name --backend-port 0 --probe-name $service_n_hp_name --idle-timeout-in-minutes 30 --enable-floating-ip
```

</details>

#### [PowerShell](#tab/lb-powershell)
Use the following commands to create and configure your internal load balancer. Additional command reference can be found at [Create load balancer][azdoc-ilb-create-powershell].

```azurepowershell-interactive
# Get the subnet reference for the load balancer frontend IPs
$vnet = Get-AzVirtualNetwork -Name <VMsVirtualNetworkName> -ResourceGroupName <ResourceGroupName>
$subnet = Get-AzVirtualNetworkSubnetConfig -Name <VMsSubnetName> -VirtualNetwork $vnet

# Create backend pool configuration
$bePool = New-AzLoadBalancerBackendAddressPoolConfig -Name <BackendPoolName>

# Create frontend IP configurations for Service 1. Allocation of private IP address is dynamic using below command. If you want to pass a static IP address, include parameter -PrivateIpAddress.
$service1Fip = New-AzLoadBalancerFrontendIpConfig -Name <Service1FrontendIpName> -SubnetId $subnet.Id

# Create the health probe for Service 1 (ASCS or Hana)
$service1Probe = New-AzLoadBalancerProbeConfig -Name <Service1HealthProbeName> -Protocol Tcp -Port 625<##> -IntervalInSeconds 5 -ProbeThreshold 2 -ProbeCount 1

# Create load balancing rule for Service 1 (ASCS or Hana)
$service1Rule = New-AzLoadBalancerRuleConfig -Name <Service1LoadBalancerRuleName> -FrontendIpConfiguration $service1Fip -BackendAddressPool $bePool -Probe $service1Probe -Protocol All -FrontendPort 0 -BackendPort 0 -IdleTimeoutInMinutes 30 -EnableFloatingIP

# Create the load balancer resource with Service 1 configuration
$lb = New-AzLoadBalancer -ResourceGroupName <ResourceGroupName> -Name <LBName> -Location <Region> -Sku Standard -FrontendIpConfiguration $service1Fip -BackendAddressPool $bePool -LoadBalancingRule $service1Rule -Probe $service1Probe

# Add Cluster VMs into the Backend Pool
$vm1Nic = Get-AzNetworkInterface -Name <ClusterVM1-NicName> -ResourceGroupName <ResourceGroupName>
$vm1Nic.IpConfigurations[0].LoadBalancerBackendAddressPools = $lb.BackendAddressPools[0]
Set-AzNetworkInterface -NetworkInterface $vm1Nic

$vm2Nic = Get-AzNetworkInterface -Name <ClusterVM2-NicName> -ResourceGroupName <ResourceGroupName>
$vm2Nic.IpConfigurations[0].LoadBalancerBackendAddressPools = $lb.BackendAddressPools[0]
Set-AzNetworkInterface -NetworkInterface $vm2Nic

# Service N (ERS, PAS, etc)
# Create separate frontend IP
$lb | Add-AzLoadBalancerFrontendIpConfig -Name <ServiceNFrontendIpName> -SubnetId $subnet.Id | Set-AzLoadBalancer
$lb = Get-AzLoadBalancer -Name <LBName> -ResourceGroupName <ResourceGroupName>

# Create the health probe for Service N
$lb | Add-AzLoadBalancerProbeConfig -Name <ServiceNHealthProbeName> -Protocol Tcp -Port 625<##> -IntervalInSeconds 5 -ProbeThreshold 2 -ProbeCount 1 | Set-AzLoadBalancer
$lb = Get-AzLoadBalancer -Name <LBName> -ResourceGroupName <ResourceGroupName>

# Create load balancing rule for Service N
$serviceNFip = $lb.FrontendIpConfigurations | Where-Object { $_.Name -eq '<ServiceNFrontendIpName>' }
$serviceNProbe = $lb.Probes | Where-Object { $_.Name -eq '<ServiceNHealthProbeName>' }
$serviceNBePool = $lb.BackendAddressPools[0]
$lb | Add-AzLoadBalancerRuleConfig -Name <ServiceNLoadBalancerRuleName> -FrontendIpConfiguration $serviceNFip -BackendAddressPool $serviceNBePool -Probe $serviceNProbe -Protocol All -FrontendPort 0 -BackendPort 0 -IdleTimeoutInMinutes 30 -EnableFloatingIP | Set-AzLoadBalancer
```

</br>
<details>
<summary>Expand to view full PowerShell code</summary>

```azurepowershell-interactive
# Define variables for Resource Group, and Database VMs.

$rg_name = "<ResourceGroupName>"
$vm1_name = "<ClusterVM1Name>"
$vm2_name = "<ClusterVM2Name>"

# Define variables for the load balancer that will be utilized in the creation of the load balancer resource.
$lb_name = "<LBName>"
$bkp_name = "<BackendPoolName>"

# Service 1 (ASCS or Hana)
$service_1_fip_name = "<Service1FrontendIpName>"
$service_1_hp_name = "<Service1HealthProbeName>"
$service_1_hp_port = "625<##>"
$service_1_rule_name = "<Service1LoadBalancerRuleName>"

# Service N (ERS, PAS, etc)
$service_n_fip_name = "<ServiceNFrontendIpName>"
$service_n_hp_name = "<ServiceNHealthProbeName>"
$service_n_hp_port = "625<##>"
$service_n_rule_name = "<ServiceNLoadBalancerRuleName>"
 
# Command to get VMs network information automatically from the names 
 
$vm1 = Get-AzVM -ResourceGroupName $rg_name -Name $vm1_name
$vm1_primarynic = $vm1.NetworkProfile.NetworkInterfaces | Where-Object {($_.Primary -eq "True") -or ($_.Primary -eq $null)}
$vm1_nic_name = $vm1_primarynic.Id.Split('/')[-1]
 
$vm1_nic_info = Get-AzNetworkInterface -Name $vm1_nic_name -ResourceGroupName $rg_name
$vm1_primaryip = $vm1_nic_info.IpConfigurations | Where-Object -Property Primary -EQ -Value "True"
 
$vm2 = Get-AzVM -ResourceGroupName $rg_name -Name $vm2_name
$vm2_primarynic = $vm2.NetworkProfile.NetworkInterfaces | Where-Object {($_.Primary -eq "True") -or ($_.Primary -eq $null)}
$vm2_nic_name = $vm2_primarynic.Id.Split('/')[-1]
 
$vm2_nic_info = Get-AzNetworkInterface -Name $vm2_nic_name -ResourceGroupName $rg_name
$vm2_primaryip = $vm2_nic_info.IpConfigurations | Where-Object -Property Primary -EQ -Value "True"
 
$location = $vm1.Location
 
# Create backend pool configuration
$bePool = New-AzLoadBalancerBackendAddressPoolConfig -Name $bkp_name

# Create frontend IP configurations for Service 1. Allocation of private IP address is dynamic using below command. If you want to pass a static IP address, include parameter -PrivateIpAddress.
$service1Fip = New-AzLoadBalancerFrontendIpConfig -Name $service_1_fip_name -SubnetId $vm1_primaryip.Subnet.Id

# Create the health probe for Service 1 (ASCS or Hana)
$service1Probe = New-AzLoadBalancerProbeConfig -Name $service_1_hp_name -Protocol Tcp -Port $service_1_hp_port -IntervalInSeconds 5 -ProbeThreshold 2 -ProbeCount 1

# Create load balancing rule for Service 1 (ASCS or Hana)
$service1Rule = New-AzLoadBalancerRuleConfig -Name $service_1_rule_name -FrontendIpConfiguration $service1Fip -BackendAddressPool $bePool -Probe $service1Probe -Protocol All -FrontendPort 0 -BackendPort 0 -IdleTimeoutInMinutes 30 -EnableFloatingIP

# Create the load balancer resource with Service 1 configuration
$lb = New-AzLoadBalancer -ResourceGroupName $rg_name -Name $lb_name -Location $location -Sku Standard -FrontendIpConfiguration $service1Fip -BackendAddressPool $bePool -LoadBalancingRule $service1Rule -Probe $service1Probe

# Add Cluster VMs into the Backend Pool
$vm1_nic_info.IpConfigurations[0].LoadBalancerBackendAddressPools.Add($lb.BackendAddressPools[0])
Set-AzNetworkInterface -NetworkInterface $vm1_nic_info

$vm2_nic_info.IpConfigurations[0].LoadBalancerBackendAddressPools.Add($lb.BackendAddressPools[0])
Set-AzNetworkInterface -NetworkInterface $vm2_nic_info

# Service N (ERS, PAS, etc)
# Create separate frontend IP
$lb | Add-AzLoadBalancerFrontendIpConfig -Name $service_n_fip_name -SubnetId $vm1_primaryip.Subnet.Id | Set-AzLoadBalancer
$lb = Get-AzLoadBalancer -Name $lb_name -ResourceGroupName $rg_name

# Create the health probe for Service N
$lb | Add-AzLoadBalancerProbeConfig -Name $service_n_hp_name -Protocol Tcp -Port $service_n_hp_port -IntervalInSeconds 5 -ProbeThreshold 2 -ProbeCount 1| Set-AzLoadBalancer
$lb = Get-AzLoadBalancer -Name $lb_name -ResourceGroupName $rg_name

# Create load balancing rule for Service N
$serviceNFip = $lb.FrontendIpConfigurations | Where-Object { $_.Name -eq $service_n_fip_name }
$serviceNProbe = $lb.Probes | Where-Object { $_.Name -eq $service_n_hp_name }
$serviceNBePool = $lb.BackendAddressPools[0]
$lb | Add-AzLoadBalancerRuleConfig -Name $service_n_rule_name -FrontendIpConfiguration $serviceNFip -BackendAddressPool $serviceNBePool -Probe $serviceNProbe -Protocol All -FrontendPort 0 -BackendPort 0 -IdleTimeoutInMinutes 30 -EnableFloatingIP | Set-AzLoadBalancer 
```

</details>

---

> **Note:**
> When VMs without public IP addresses are added to the back-end pool of an internal Standard Azure Load Balancer, they lack outbound internet connectivity. Further configuration is needed to enable routing to public endpoints. For details on how to achieve outbound connectivity, see [Public endpoint connectivity for virtual machines using Azure Standard Load Balancer in SAP high-availability scenarios][azdoc-sap-ilb-outbound].

> **Important:**
>
> Don't enable TCP time stamps on Azure VMs placed behind Azure Load Balancer. Enabling TCP timestamps causes the health probes to fail. Set the `net.ipv4.tcp_timestamps` parameter to `0`. For details, see [Load Balancer health probes][azdoc-ilb-health-probe].

[azdoc-ilb-create-portal]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-portal.md#create-load-balancer
[azdoc-ilb-create-azcli]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-cli.md#create-the-load-balancer
[azdoc-ilb-create-powershell]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-powershell.md#create-load-balancer
[azdoc-ilb-health-probe]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/load-balancer-custom-probe-overview.md
[azcli-lb-probe-update]: https://learn.microsoft.com/cli/azure/network/lb/probe#az-network-lb-probe-update
[azps-setlb-probe-update]: https://learn.microsoft.com/powershell/module/az.network/set-azloadbalancerprobeconfig#-probethreshold

[azdoc-sap-ilb-outbound]: high-availability-guide-standard-load-balancer-outbound-connections.md

> **Important:**
> - To prevent `saptune` from changing the manually set `net.ipv4.tcp_timestamps` value from `0` back to `1`, update `saptune` to version 3.1.1 or later. For more information, see [Saptune 3.1.1 – Do I Need to Update?](https://www.suse.com/c/saptune-3-1-1-do-i-need-to-update/)

**Applies to: azurefiles**


### Deploy NFS on Azure Files

NFS on Azure Files runs on top of [Azure Files premium storage][azdoc-afs-intro]. Before you set up NFS on Azure Files, see [How to create an NFS share][azdoc-afs-create-share].

There are two options for redundancy within an Azure region:

- [Locally redundant storage (LRS)][azdoc-afs-lrs] offers local, in-zone synchronous data replication.
- [Zone-redundant storage (ZRS)][azdoc-afs-zrs] replicates your data synchronously across three [availability zones](https://learn.microsoft.com/azure/reliability/availability-zones-overview) in the region.

Check if your selected Azure region offers Premium Azure Files with your required redundancy. Review the [availability of Azure Files by Azure region][azure-availability-matrix] for **Premium Files Storage**. If your scenario benefits from ZRS, [verify that premium file shares with ZRS are supported in your Azure region][azdoc-afs-zrs].

We recommend that you access your Azure storage account through an [Azure private endpoint][azdoc-afs-private-endpoints]. Be sure to deploy the Azure Files storage account endpoint, and the VMs where you need to mount the NFS shares, in the same Azure virtual network or in a peered Azure virtual network.

1. Deploy an Azure Files storage account named **sapnfsafs**. This example uses ZRS. If you're not familiar with the process, see [Create a storage account][azdoc-afs-create-account] for the Azure portal.
1. On the **Basics** tab, use these settings:
   1. For **Storage account name**, enter **sapnfsafs**.
   1. For **Performance**, select **Premium**.
   1. For **Premium account type**, select **FileStorage**.
   1. For **Replication**, select **Zone redundancy (ZRS)**.
1. Select **Next**.
1. On the **Advanced** tab, clear **Require secure transfer for REST API**. If you don't clear this option, you can't mount the NFS share to your VM (the mount operation times out).
1. Select **Next**.
1. In the **Networking** section, configure these settings:
   1. Under **Networking connectivity**, for **Connectivity method**, select **Private endpoint**.
   1. Under **Private endpoint**, select **Add private endpoint**.
1. On the **Create private endpoint** pane, select your subscription, resource group, and location. Then make the following selections:
   1. For **Name**, enter **sapnfsafs_pe**.
   1. For **Storage sub-resource**, select **file**.
   1. Under **Networking**, for **Virtual network**, select the virtual network and subnet to use. Again, you can use either the virtual network where your SAP VMs are or a peered virtual network.
   1. Under **Private DNS integration**, accept the default option of **Yes** for **Integrate with private DNS zone**. Be sure to select your private DNS zone.
   1. Select **OK**.
1. On the **Networking** tab again, select **Next**.
1. On the **Data protection** tab, keep all the default settings.
1. Select **Review + create** to validate your configuration.
1. Wait for the validation to finish. Fix any issues before continuing.
1. On the **Review + create** tab, select **Create**.

Next, deploy the NFS shares in the storage account that you created. In this example, there are two NFS shares, `sapnw1` and `saptrans`.

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Select or search for **Storage accounts**.
1. On the **Storage accounts** page, select **sapnfsafs**.
1. On the resource menu for **sapnfsafs**, select **File shares** under **Data storage**.
1. On the **File shares** page, select **File share**, and then:
   1. For **Name**, enter `**sapnw1**`, `**saptrans**`.
   1. Select an appropriate share size. Consider the size of the data stored on the share, I/O per second (IOPS), and throughput requirements. For more information, see [Azure file share targets][azdoc-afs-scaling].
   1. Select **NFS** as the protocol.
   1. Select **No root Squash**. Otherwise, when you mount the shares on your VMs, you can't see the file owner or group.

> **Note:**
> Azure Files NFS supports Encryption in Transit (EiT). If you would like to use EiT, read [Azure Files NFS Encryption in Transit for SAP on Azure Systems][azdoc-afs-encryption-in-transit] to learn how to configure and deploy.

#### Important considerations for NFS on Azure Files shares

When you plan your deployment with NFS on Azure Files, consider the following important points:

- The minimum share size is 100 GiB. You pay for only the [capacity of the provisioned shares][azdoc-afs-billing].
- Size your NFS shares not only based on capacity requirements, but also on IOPS and throughput requirements. For details, see [Azure file share targets][azdoc-afs-share-limits].
- Test the workload to validate your sizing and ensure that it meets your performance targets. To learn how to troubleshoot performance issues with NFS on Azure Files, consult [Troubleshoot Azure file share performance][azdoc-afs-perf-troubleshooting].
- For SAP J2EE systems, placing `/usr/sap/<SID>/J<nr>` on NFS on Azure Files isn't supported.
- If your SAP system has a heavy load of batch jobs, you might have millions of job logs. If the SAP batch job logs are stored in the file system, pay special attention to the sizing of the `sapmnt` share. As of SAP_BASIS 7.52, the default behavior for the batch job logs is to be stored in the database. For details, see [Job sign in the database][sapnote-2360818-JobLog].
- Deploy a separate `sapmnt` share for each SAP system.
- Don't use the `sapmnt` share for any other activity, such as interfaces.
- Don't use the `saptrans` share for any other activity, such as interfaces.
- Avoid consolidating the shares for too many SAP systems in a single storage account. There are also [scalability and performance targets for storage accounts][azdoc-afs-share-limits]. Be careful to not exceed the limits for the storage account, too.
- In general, don't consolidate the shares for more than _five_ SAP systems in a single storage account. This guideline helps you avoid exceeding the storage account limits and simplifies performance analysis.
- In general, avoid mixing shares like `sapmnt` for nonproduction and production SAP systems in the same storage account.
- Ensure your Linux Kernel is above v5.12.5 to avoid the bug mentioned in [NFS client improvements][azdoc-afs-nfs-client-improvements].
- Use a private endpoint. In the unlikely event of a zonal failure, your NFS sessions automatically redirect to a healthy zone. You don't have to remount the NFS shares on your VMs.
- If you're deploying your VMs across availability zones, use a [storage account with ZRS][azdoc-afs-zrs] in the Azure regions that supports ZRS.
- Azure Files doesn't currently support automatic cross-region replication for disaster recovery scenarios.

The SAP file systems that don't need to be mounted via NFS can also be deployed on [Azure disk storage](https://learn.microsoft.com/azure/virtual-machines/disks-types#premium-ssds). In this example, you can deploy `/usr/sap/NW1/D02` and `/usr/sap/NW1/D03` on Azure disk storage.

[azure-availability-matrix]: https://azure.microsoft.com/explore/global-infrastructure/products-by-region/table

[azdoc-afs-intro]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-introduction.md
[azdoc-afs-create-share]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/create-file-share.md
[azdoc-afs-scaling]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-scale-targets.md
[azdoc-afs-encryption-in-transit]: sap-azure-files-nfs-encryption-in-transit-guide.md
[azdoc-afs-billing]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/understanding-billing.md#provisioned-v1-model
[azdoc-afs-share-limits]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-scale-targets.md
[azdoc-afs-perf-troubleshooting]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/files-troubleshoot-performance.md
[azdoc-afs-nfs-client-improvements]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/files-troubleshoot-linux-nfs.md#ls-hangs-for-large-directory-enumeration-on-some-kernels
[azdoc-afs-create-account]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md?tabs=azure-portal#create-a-storage-account
[azdoc-afs-private-endpoints]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-networking-endpoints.md?tabs=azure-portal
[azdoc-afs-lrs]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-redundancy.md#locally-redundant-storage
[azdoc-afs-zrs]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-redundancy.md#zone-redundant-storage



[sapnote-2360818-JobLog]: https://me.sap.com/notes/2360818


**Applies to: anf**


### Deploy Azure NetApp Files

[Azure NetApp Files][azdoc-anf-intro] is a native, first-party, high-performance file storage service that provides volumes as a service. Here we're using it to host our NFS SAP shares.

1. Check that the Azure NetApp Files service is available in your [Azure region of choice][azure-availability-matrix].
1. [Create the NetApp account][azdoc-anf-create-account] in the selected Azure region.
1. [Create a capacity pool for Azure NetApp Files][azdoc-anf-create-capacitypool].

   The SAP NetWeaver architecture presented in this article uses a single Azure NetApp Files capacity pool, Premium SKU. We recommend Azure NetApp Files Premium SKU for SAP NetWeaver application workloads on Azure.

1. [Delegate a subnet to Azure NetApp Files][azdoc-anf-delegate-subnet].
1. [Create an NFS volume for Azure NetApp Files][azdoc-anf-create-volume]. Deploy the volumes in the designated Azure NetApp Files [subnet](https://learn.microsoft.com/rest/api/virtualnetwork/subnets). The IP addresses of the Azure NetApp volumes are assigned automatically.

   Keep in mind that the Azure NetApp Files resources and the Azure VMs must be in the same Azure virtual network or in peered Azure virtual networks. This example uses two Azure NetApp Files volumes: `sapnw1` and `trans`. The file paths that are mounted to the corresponding mount points are:

   - Volume `sapnw1` (`nfs://10.27.1.5/sapnw1/sapmntNW1`)
   - Volume `sapnw1` (`nfs://10.27.1.5/sapnw1/usrsapNW1`)
   - Volume `trans` (`nfs://10.27.1.5/trans`)

#### Important considerations for NFS on Azure NetApp Files

When you're considering Azure NetApp Files for the SAP NetWeaver high-availability architecture, be aware of the following important considerations:

- The minimum capacity pool is 4 tebibytes (TiB). You can increase the size of the capacity pool in 1-TiB increments.
- The minimum volume is 100 GiB.
- Azure NetApp Files, and all virtual machines where Azure NetApp Files volumes are mounted, must be in the same Azure virtual network. If they're not in the same virtual network, they must be in [peered virtual networks][azdoc-vnet-peering] in the same region. Azure NetApp Files access over virtual network peering in the same region is supported. Azure NetApp Files access over global peering isn't yet supported.
- The selected virtual network must have a delegated subnet to Azure NetApp Files.
- The throughput and performance characteristics of an Azure NetApp Files volume is a function of the volume quota and service level, as documented in [Service level for Azure NetApp Files][azdoc-anf-service-levels]. When you're sizing the Azure NetApp Files volumes for SAP, make sure that the resulting throughput meets the application's requirements.
- Azure NetApp Files offers an [export policy][azdoc-anf-export-policy]. You can control the allowed clients and the access type (for example, read/write or read-only).
- Azure NetApp Files isn't zone aware yet. Currently, Azure NetApp Files isn't deployed in all availability zones in an Azure region. Be aware of the potential latency implications in some Azure regions.
- Azure NetApp Files volumes can be deployed as NFSv3 or NFSv4.1 volumes. Both protocols are supported for the SAP application layer (ASCS/ERS, SAP application servers).

---

The SAP file systems that don't need to be mounted via NFS can also be deployed on [Azure disk storage](https://learn.microsoft.com/azure/virtual-machines/disks-types#premium-ssds). In this example, you can deploy `/usr/sap/NW1/D02` and `/usr/sap/NW1/D03` on Azure disk storage.

[azure-availability-matrix]: https://azure.microsoft.com/explore/global-infrastructure/products-by-region/table

[azdoc-afs-regions]: https://azure.microsoft.com/global-infrastructure/services/?products=storage&regions=all
[azdoc-afs-intro]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-introduction.md
[azdoc-afs-create-share]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/create-file-share.md
[azdoc-afs-scaling]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-scale-targets.md
[azdoc-afs-encryption-in-transit]: sap-azure-files-nfs-encryption-in-transit-guide.md
[azdoc-afs-billing]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/understanding-billing.md#provisioned-v1-model
[azdoc-afs-share-limits]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-scale-targets.md
[azdoc-afs-perf-troubleshooting]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/files-troubleshoot-performance.md
[azdoc-afs-nfs-overview]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/files-nfs-protocol.md
[azdoc-afs-nfs-client-improvements]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/files-troubleshoot-linux-nfs.md#ls-hangs-for-large-directory-enumeration-on-some-kernels
[azdoc-afs-create-account]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md?tabs=azure-portal#create-a-storage-account
[azdoc-afs-private-endpoints]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-networking-endpoints.md?tabs=azure-portal
[azdoc-afs-lrs]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-redundancy.md#locally-redundant-storage
[azdoc-afs-zrs]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-redundancy.md#zone-redundant-storage

[azdoc-anf-regions]: https://azure.microsoft.com/global-infrastructure/services/?products=netapp
[azdoc-anf-intro]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-introduction.md
[azdoc-anf-create-account]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-create-netapp-account.md
[azdoc-anf-create-capacitypool]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-set-up-capacity-pool.md
[azdoc-anf-delegate-subnet]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-delegate-subnet.md
[azdoc-anf-create-volume]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-create-volumes.md
[azdoc-anf-service-levels]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-service-levels.md
[azdoc-anf-export-policy]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/azure-netapp-files-configure-export-policy.md

[azdoc-vnet-peering]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-network-peering-overview.md

[sapnote-2360818-JobLog]: https://me.sap.com/notes/2360818


## Prepare Pacemaker cluster nodes for SAP installation

The next step is to prepare the nodes for installation. Begin by following the steps in [Set up Pacemaker on SUSE Linux Enterprise Server in Azure][azdoc-sap-sles-pacemaker], then continue.

> **Note:**
> The following items are prefixed with:
> - **[A]**: Applicable to all nodes.
> - **[1]**: Applicable to only node 1.
> - **[2]**: Applicable to only node 2.

1. **[A]** Install the latest version of the SAP Cluster Connector and the SAP Resource Agents.

   ```bash
   sudo zypper -n install sap-suse-cluster-connector sapstartsrv-resource-agents
   ```
   
   > **Important:**
   > You need to have `sapstartsrv-resource-agents 0.9.1` or a later version for Simple Mount.


2. **[A]** Configure host name resolution.
   You can either use a DNS server or modify `/etc/hosts` on all nodes. This example shows how to use the `/etc/hosts` file.

   Update the entries to match your IPs and hostnames.

   ```bash
   sudo vi /etc/hosts
   [...]
   # IP address of cluster node 1
   10.27.0.6    sap-cl1
   # IP address of cluster node 2
   10.27.0.7    sap-cl2
   # IP address of the load balancer's front-end configuration for SAP NetWeaver ASCS
   10.27.0.9    sapascs
   # IP address of the load balancer's front-end configuration for SAP NetWeaver ERS
   10.27.0.10   sapers
   # Add Any Additional Hostnames/IPs as needed for the Database and/or Additional Application Servers
   10.27.0.8    sapa01
   10.27.0.11   sapa02
   10.27.0.3    sapdb1
   10.27.0.4    sapdb2
   10.27.0.5    sapdb
   ```

3. **[A]** Configure TCP KeepAlive settings.
   
   To ensure communication channels between nodes aren't dropped, configure the following keepalive settings on both nodes. For more information, see SAP Note [1410736][sapnote-1410736-tcpkeepalive].

   ```bash
   # Check Current Settings:
   sudo sysctl -a --pattern net.ipv4.tcp_keepalive
   
   net.ipv4.tcp_keepalive_intvl = 75
   net.ipv4.tcp_keepalive_probes = 9
   net.ipv4.tcp_keepalive_time = 7200
   
   # Set the values:
   sudo vi /etc/sysctl.d/sap.conf
   
   net.ipv4.tcp_keepalive_intvl=75
   net.ipv4.tcp_keepalive_probes=9
   net.ipv4.tcp_keepalive_time=300
   
   # Apply the changes.
   sudo sysctl --system
   ```

4. **[A]** Configure the SWAP file.
   Follow [Create a SWAP partition for an Azure Linux VM][azdoc-vm-linux-swap] to configure a SWAP space for each VM.

[sapnote-1410736-tcpkeepalive]: https://me.sap.com/notes/1410736

[azdoc-vm-linux-swap]: https://learn.microsoft.com/troubleshoot/azure/virtual-machines/linux/create-swap-file-linux-vm

5. **[1]** Configure Pacemaker Resource Defaults
   
   ```bash
   # Check Values
   sudo crm configure show type:rsc_defaults
   # Output
   rsc_defaults build-resource-defaults: \
        resource-stickiness=1 \
        migration-threshold=3 \
        priority=1
   
   # Set Values if Required
   sudo crm configure rsc_defaults resource-stickiness=1 migration-threshold=3
   ```

### Prepare and mount SAP shares
**Applies to: azurefiles**

   
1. **[1]** Create the SAP Sub Directories on the NFS Share

   ```bash
   # Temporarily mount the volume.
   sudo mkdir -p /saptmp
   sudo mount -t nfs sapnfsafs.file.core.windows.net:/sapnfsafs/sapnw1 /saptmp -o noresvport,nfsvers=4.1,sec=sys

   # Create the SAP sub directories.
   cd /saptmp
   sudo mkdir -p sapmntNW1
   sudo mkdir -p usrsapNW1

   # Unmount the volume and delete the temporary directory.
   cd ..
   sudo umount /saptmp
   sudo rmdir /saptmp
   ```

1. **[A]** Create the mount point directories

   ```bash
   sudo mkdir -p /sapmnt/NW1
   sudo mkdir -p /usr/sap/NW1
   sudo mkdir -p /usr/sap/trans

   sudo chattr +i /sapmnt/NW1
   sudo chattr +i /usr/sap/NW1
   sudo chattr +i /usr/sap/trans
   ```

1. **[A]** Mount the NFS Shares

   ```bash
   sudo vi /etc/fstab
   [...]
   sapnfsafs.file.core.windows.net:/sapnfsafs/sapnw1/sapmntNW1 /sapmnt/NW1 nfs noresvport,nfsvers=4.1,sec=sys,hard  0  0
   sapnfsafs.file.core.windows.net:/sapnfsafs/sapnw1/usrsapNW1 /usr/sap/NW1 nfs noresvport,nfsvers=4.1,sec=sys,hard  0  0
   sapnfsafs.file.core.windows.net:/saptrans /usr/sap/trans nfs noresvport,nfsvers=4.1,sec=sys,hard  0  0

   # Mount the file systems.
   sudo mount -a
   ```

   > **Note:**
   > For Encryption-in-Transit (EiT) enabled File systems, use `aznfs` as filesystem type in the mount command syntax. Read [Azure Files NFS Encryption in Transit for SAP on Azure Systems][azdoc-sap-afs-encryption], to learn how to enable EiT and mounting the file systems.


[azdoc-sap-afs-encryption]: sap-azure-files-nfs-encryption-in-transit-guide.md

**Applies to: anf**

   
1. **[A]** Disable ID Mapping (NFSv4.1 Only)
   1. Edit the NFS domain setting. Make sure that the domain is configured as the default Azure NetApp Files domain, `defaultv4iddomain.com`. Also verify that the mapping is set to `nobody`.

      ```bash
      sudo vi /etc/idmapd.conf
      [General]
      Verbosity = 0
      Pipefs-Directory = /var/lib/nfs/rpc_pipefs
      Domain = defaultv4iddomain.com
      [...]
      [Mapping]
      Nobody-User = nobody
      Nobody-Group = nobody
      [...]
      ```

   1. Verify `nfs4_disable_idmapping`. It should be set to `Y`.

      To create the directory structure where `nfs4_disable_idmapping` is located, run the `mount` command. You're unable to manually create the directory under `/sys/modules` because access is reserved for the kernel and drivers.

      ```bash
      # Check nfs4_disable_idmapping.
      cat /sys/module/nfs/parameters/nfs4_disable_idmapping

      # If you need to set nfs4_disable_idmapping to Y:
      sudo mkdir /mnt/tmp
      sudo mount 10.27.1.5:/sapnw1 /mnt/tmp
      sudo umount /mnt/tmp
      echo "Y" | sudo tee /sys/module/nfs/parameters/nfs4_disable_idmapping

      # Make the configuration permanent.
      echo "options nfs nfs4_disable_idmapping=Y" | sudo tee -a /etc/modprobe.d/nfs.conf
      ```

1. **[1]** Temporarily mount the Azure NetApp Files volume on one of the VMs and create the SAP directories (file paths).
   ```bash
   # Temporarily mount the volume.
   sudo mkdir -p /saptmp
   # NFSv4.1
   sudo mount -t nfs -o rw,hard,rsize=65536,wsize=65536,nfsvers=4.1,sec=sys,tcp 10.27.1.5:/sapnw1 /saptmp
   # NFSv3
   sudo mount -t nfs -o rw,hard,rsize=65536,wsize=65536,nfsvers=3,tcp 10.27.1.5:/sapnw1 /saptmp

   # Create the SAP directories.
   cd /saptmp
   sudo mkdir -p sapmntNW1
   sudo mkdir -p usrsapNW1

   # Unmount the volume and delete the temporary directory.
   cd ..
   sudo umount /saptmp
   sudo rmdir /saptmp
   ```

1. **[A]** Create the shared directories.
   ```bash
   sudo mkdir -p /sapmnt/NW1
   sudo mkdir -p /usr/sap/NW1
   sudo mkdir -p /usr/sap/trans

   sudo chattr +i /sapmnt/NW1
   sudo chattr +i /usr/sap/NW1
   sudo chattr +i /usr/sap/trans
   ```

1. **[A]** Mount the file systems.
   ```bash
   sudo vi /etc/fstab
   [...]
   # NFSv4.1
   10.27.1.5:/sapnw1/sapmntNW1 /sapmnt/NW1 nfs nfsvers=4.1,sec=sys,hard 0 0
   10.27.1.5:/sapnw1/usrsapNW1 /usr/sap/NW1 nfs nfsvers=4.1,sec=sys,hard 0 0
   10.27.1.5:/saptrans /usr/sap/trans nfs nfsvers=4.1,sec=sys,hard 0 0

   # NFSv3
   10.27.1.5:/sapnw1/sapmntNW1 /sapmnt/NW1 nfs nfsvers=3,hard 0 0
   10.27.1.5:/sapnw1/usrsapNW1 /usr/sap/NW1 nfs nfsvers=3,hard 0 0
   10.27.1.5:/saptrans /usr/sap/trans nfs nfsvers=3,hard 0 0

   # Mount the file systems.
   sudo mount -a
   ```

---

[azdoc-anf-nfs-convert]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/convert-nfsv3-nfsv41.md#convert-from-nfsv3-to-nfsv41


## Install SAP NetWeaver ASCS and ERS

1. **[1]** Create a virtual IP resource and health probe for the ASCS instance.

   > **Important:**
   > We recommend using the `azure-lb` resource agent, which is part of the resource-agents package.

   ```bash
   sudo crm node standby sap-cl2
   sudo crm configure primitive vip_NW1_ASCS IPaddr2 params ip=10.27.0.9 \
      op monitor interval=10 timeout=20
   sudo crm configure primitive nc_NW1_ASCS azure-lb port=62500 \
      op monitor timeout=20s interval=10
   sudo crm configure group g-NW1_ASCS nc_NW1_ASCS vip_NW1_ASCS \
      meta resource-stickiness=3000
   ```

   Check that the cluster status is OK and all resources are started. As long as the resources in `g-NW1_ASCS` are on `sap-cl1`, you're good. 

   ```bash
   sudo crm status

   Cluster Summary:
     * Stack: corosync (Pacemaker is running)
     * Current DC: sap-cl1 (version 2.1.7+20231219.0f7f88312-150600.6.12.1-2.1.7+20231219.0f7f88312) - partition with quorum
     * Last updated: Wed Jul  8 21:26:21 2026 on sap-cl1
     * Last change:  Mon Jun  8 20:49:31 2026 by root via root on sap-cl1
     * 2 nodes configured
     * 3 resource instances configured

   Node List:
     * Node sap-cl2: standby
     * Online: [ sap-cl1 ]

   Full List of Resources:
     * stonith-sbd (stonith:external/sbd):  Started sap-cl1
     * Resource Group: g-NW1_ASCS:
       * nc_NW1_ASCS       (ocf::heartbeat:azure-lb):       Started sap-cl1
       * vip_NW1_ASCS      (ocf::heartbeat:IPaddr2):        Started sap-cl1
   ```

1. **[1]** Install SAP NetWeaver ASCS as root on the first node.

   Use a virtual host name that maps to the IP address of the load balancer's front-end configuration for ASCS (for example, `sapascs`, `10.27.0.9`) and the instance number that you used for the probe of the load balancer (for example, `00`).

   You can use the `sapinst` parameter `SAPINST_REMOTE_ACCESS_USER` to allow a nonroot user to connect to `sapinst`. You can use the `SAPINST_USE_HOSTNAME` parameter to install SAP by using a virtual host name.

   ```bash
   sudo <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin SAPINST_USE_HOSTNAME=<virtual_hostname>
   ```

1. **[1]** Create a virtual IP resource and health probe for the ERS instance.

   ```bash
   sudo crm node online sap-cl2
   sudo crm node standby sap-cl1

   sudo crm configure primitive vip_NW1_ERS IPaddr2 params ip=10.27.0.10 \
      op monitor interval=10 timeout=20
   sudo crm configure primitive nc_NW1_ERS azure-lb port=62501 \
      op monitor timeout=20s interval=10
   sudo crm configure group g-NW1_ERS nc_NW1_ERS vip_NW1_ERS
   ```

   Check that the cluster status is OK and all resources are started. As long as the resources in `g-NW1_ERS` are on `sap-cl2`, you're good.

   ```bash
   sudo crm status

   Cluster Summary:
     * Stack: corosync (Pacemaker is running)
     * Current DC: sap-cl1 (version 2.1.7+20231219.0f7f88312-150600.6.12.1-2.1.7+20231219.0f7f88312) - partition with quorum
     * Last updated: Wed Jul  8 21:26:21 2026 on sap-cl1
     * Last change:  Mon Jun  8 20:49:31 2026 by root via root on sap-cl1
     * 2 nodes configured
     * 5 resource instances configured

   Node List:
     * Node sap-cl1: standby
     * Online: [ sap-cl2 ]

   Full List of Resources:
     * stonith-sbd (stonith:external/sbd):  Started sap-cl2
     * Resource Group: g-NW1_ASCS:
       * nc_NW1_ASCS       (ocf::heartbeat:azure-lb):       Started sap-cl2
       * vip_NW1_ASCS      (ocf::heartbeat:IPaddr2):        Started sap-cl2
     * Resource Group: g-NW1_ERS:
       * nc_NW1_ERS        (ocf::heartbeat:azure-lb):       Started sap-cl2
       * vip_NW1_ERS       (ocf::heartbeat:IPaddr2):        Started sap-cl2
   ```

1. **[2]** Install SAP NetWeaver ERS as root on the second node.

   Use a virtual host name that maps to the IP address of the load balancer's front-end configuration for ERS (for example, `sapers`, `10.27.0.10`) and the instance number that you used for the probe of the load balancer (for example, `01`).

   You can use the `SAPINST_REMOTE_ACCESS_USER` parameter to allow a nonroot user to connect to `sapinst`. You can use the `SAPINST_USE_HOSTNAME` parameter to install SAP by using a virtual host name.

   ```bash
   <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin SAPINST_USE_HOSTNAME=virtual_hostname
   ```

   > **Note:**
   > Use SWPM SP 20 PL 05 or later. Earlier versions don't set the permissions correctly, and they cause the installation to fail.

## Configure SAP to run in the cluster
1. **[1]** Add cluster libraries to the profiles of all instances managed by the cluster.

   ```bash
   sudo vi /sapmnt/NW1/profile/NW1_<instanceProfile>_nw1<instance>
   [...]
   #-----------------------------------------------------------------------
   # SAP Cluster Config
   #-----------------------------------------------------------------------
   service/halib = $(DIR_EXECUTABLE)/saphascriptco.so
   service/halib_cluster_connector = /usr/bin/sap_suse_cluster_connector
   [...]
   ```



2. **[1]** Adapt the instance profiles for running in a cluster.
   1. The ASCS and ERS profiles might contain `Restart_Program` configurations for certain instance services by default. Change these entries to `Start_Program` to prevent SAP from automatically restarting the enqueue replication process, because the cluster manages it. 
      1. ASCS Profile (Enqueue Server)
         ```bash
         sudo vi /sapmnt/NW1/profile/NW1_ASCS00_nw1ascs
         [...]
         #-----------------------------------------------------------------------
         # Start SAP enqueue server
         #-----------------------------------------------------------------------
         _ENQ = enq.sap$(SAPSYSTEMNAME)_$(INSTANCE_NAME)
         Execute_04 = local rm -f $(_ENQ)
         Execute_05 = local ln -s -f $(DIR_EXECUTABLE)/enq_server$(FT_EXE) $(_ENQ)
         Start_Program_01 = local $(_ENQ) pf=$(_PF)
         [...]
         ```
      1. ERS Profile (Enqueue Replicator)
         ```bash
         sudo vi /sapmnt/NW1/profile/NW1_ERS01_nw1ers
         [...]
         #-----------------------------------------------------------------------
         # Start enqueue replicator
         #-----------------------------------------------------------------------
         _ENQR = enqr.sap$(SAPSYSTEMNAME)_$(INSTANCE_NAME)
         Execute_02 = local rm -f $(_ENQR)
         Execute_03 = local ln -s -f $(DIR_EXECUTABLE)/enq_replicator$(FT_EXE) $(_ENQR)
         Start_Program_00 = local $(_ENQR) pf=$(_PF)
         [...]
         ```
   1. Remove `Autostart` from any instances in the cluster, as the cluster manages them.
   1. **ENSA1 only**: Add the Keepalive parameter to the ERS profile.
      ```bash
      sudo vi /sapmnt/NW1/profile/NW1_ERS01_nw1ers
      [...]
      enque/encni/set_so_keepalive = TRUE
      [...]
      ```

1. **[A]** Add the `sidadm` account to the `haclient` group to allow it to run cluster commands.

   ```bash
   sudo usermod -a -G haclient nw1adm
   ```

1. **[A]** Register ASCS and ERS services on both nodes. This step adds or updates the entries in the `/usr/sap/sapservices` file so that both services are listed.

   ```bash
   sudo LD_LIBRARY_PATH=/usr/sap/NW1/ASCS00/exe /usr/sap/NW1/ASCS00/exe/sapstartsrv pf=/usr/sap/NW1/SYS/profile/NW1_ASCS00_nw1ascs -reg
   sudo LD_LIBRARY_PATH=/usr/sap/NW1/ERS01/exe /usr/sap/NW1/ERS01/exe/sapstartsrv pf=/usr/sap/NW1/SYS/profile/NW1_ERS01_nw1ers -reg
   ```

1. **[A]** Ensure all SAP services are stopped and disabled on both nodes. The cluster manages them.
   ```bash
   # Run as sidadm
   sudo su - nw1adm
   sapcontrol -nr 00 -function Stop
   sapcontrol -nr 00 -function StopService
   
   sapcontrol -nr 01 -function Stop
   sapcontrol -nr 01 -function StopService
   #Log off of sidadm
   exit
   
   sudo systemctl disable SAPNW1_00
   sudo systemctl disable SAPNW1_01
   ```

1. **[A]** Enable `sapping` and `sappong` services.
   
   The `sapping` agent runs before `sapinit` to hide the `/usr/sap/sapservices` file. The `sappong` agent runs after `sapinit` to unhide the `sapservices` file during VM boot. `SAPStartSrv` isn't started automatically for an SAP instance at boot time, because the Pacemaker cluster manages it.

   ```bash
   sudo systemctl enable sapping
   sudo systemctl enable sappong
   ```


7. **[1]** Create SAP services in the cluster.
   1. Put the cluster into maintenance mode.
      ```bash
      sudo crm configure property maintenance-mode=true
      ```
   1. Create the ASCS and ERS services.
      **Applies to: azurefiles**

      #### [ENSA2](#tab/ensa2)
      ```bash
      # ASCS Resources
      sudo crm configure primitive rsc_SAPStartSrv_NW1_ASCS00 \
         ocf:suse:SAPStartSrv params InstanceName=NW1_ASCS00_nw1ascs
      sudo crm configure primitive rsc_SAPInstance_NW1_ASCS00 SAPInstance \
         op monitor interval=11 timeout=60 on-fail=restart \
         params InstanceName=NW1_ASCS00_nw1ascs \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ASCS00_nw1ascs" \
         AUTOMATIC_RECOVER=false MINIMAL_PROBE=true \
         meta resource-stickiness=5000 priority=100
      
      # ERS Resources
      sudo crm configure primitive rsc_SAPStartSrv_NW1_ERS01 \
         ocf:suse:SAPStartSrv params InstanceName=NW1_ERS01_nw1ers
      sudo crm configure primitive rsc_SAPInstance_NW1_ERS01 SAPInstance \
         op monitor interval=11 timeout=60 on-fail=restart \
         params InstanceName=NW1_ERS01_nw1ers \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ERS01_nw1ers" \
         AUTOMATIC_RECOVER=false IS_ERS=true MINIMAL_PROBE=true
      ```
      #### [ENSA1](#tab/ensa1)
      ```bash
      # ASCS Resources
      sudo crm configure primitive rsc_SAPStartSrv_NW1_ASCS00 \
         ocf:suse:SAPStartSrv params InstanceName=NW1_ASCS00_nw1ascs
      sudo crm configure primitive rsc_SAPInstance_NW1_ASCS00 SAPInstance \
         op monitor interval=11 timeout=60 on-fail=restart \
         params InstanceName=NW1_ASCS00_nw1ascs \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ASCS00_nw1ascs" \
         AUTOMATIC_RECOVER=false MINIMAL_PROBE=true \
         meta resource-stickiness=5000 priority=10 \
         failure-timeout=60 migration-threshold=1
      
      # ERS Resources
      sudo crm configure primitive rsc_SAPStartSrv_NW1_ERS01 \
         ocf:suse:SAPStartSrv params InstanceName=NW1_ERS01_nw1ers
      sudo crm configure primitive rsc_SAPInstance_NW1_ERS01 SAPInstance \
         op monitor interval=11 timeout=60 on-fail=restart \
         params InstanceName=NW1_ERS01_nw1ers \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ERS01_nw1ers" \
         AUTOMATIC_RECOVER=false IS_ERS=true MINIMAL_PROBE=true \
         meta priority=1000
      ```
      ---

      **Applies to: anf**

      #### [ENSA2](#tab/ensa2)
      ```bash
      # ASCS Resources
      sudo crm configure primitive rsc_SAPStartSrv_NW1_ASCS00 \
         ocf:suse:SAPStartSrv params InstanceName=NW1_ASCS00_nw1ascs
      # NFSv4.1
      sudo crm configure primitive rsc_SAPInstance_NW1_ASCS00 SAPInstance \
         op monitor interval=11 timeout=120 on-fail=restart \
         params InstanceName=NW1_ASCS00_nw1ascs \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ASCS00_nw1ascs" \
         AUTOMATIC_RECOVER=false MINIMAL_PROBE=true \
         meta resource-stickiness=5000 priority=100
      # NFSv3
      sudo crm configure primitive rsc_SAPInstance_NW1_ASCS00 SAPInstance \
         op monitor interval=11 timeout=60 on-fail=restart \
         params InstanceName=NW1_ASCS00_nw1ascs \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ASCS00_nw1ascs" \
         AUTOMATIC_RECOVER=false MINIMAL_PROBE=true \
         meta resource-stickiness=5000 priority=100         

      # ERS Resources
      sudo crm configure primitive rsc_SAPStartSrv_NW1_ERS01 \
         ocf:suse:SAPStartSrv params InstanceName=NW1_ERS01_nw1ers
      # NFSv4.1
      sudo crm configure primitive rsc_SAPInstance_NW1_ERS01 SAPInstance \
         op monitor interval=11 timeout=120 on-fail=restart \
         params InstanceName=NW1_ERS01_nw1ers \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ERS01_nw1ers" \
         AUTOMATIC_RECOVER=false IS_ERS=true MINIMAL_PROBE=true
      # NFSv3
      sudo crm configure primitive rsc_SAPInstance_NW1_ERS01 SAPInstance \
         op monitor interval=11 timeout=60 on-fail=restart \
         params InstanceName=NW1_ERS01_nw1ers \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ERS01_nw1ers" \
         AUTOMATIC_RECOVER=false IS_ERS=true MINIMAL_PROBE=true
      ```
      #### [ENSA1](#tab/ensa1)
      ```bash
      # ASCS Resources
      sudo crm configure primitive rsc_SAPStartSrv_NW1_ASCS00 \
         ocf:suse:SAPStartSrv params InstanceName=NW1_ASCS00_nw1ascs
      # NFSv4.1
      sudo crm configure primitive rsc_SAPInstance_NW1_ASCS00 SAPInstance \
         op monitor interval=11 timeout=120 on-fail=restart \
         params InstanceName=NW1_ASCS00_nw1ascs \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ASCS00_nw1ascs" \
         AUTOMATIC_RECOVER=false MINIMAL_PROBE=true \
         meta resource-stickiness=5000 priority=10 \
         failure-timeout=60 migration-threshold=1
      # NFSv3
      sudo crm configure primitive rsc_SAPInstance_NW1_ASCS00 SAPInstance \
         op monitor interval=11 timeout=60 on-fail=restart \
         params InstanceName=NW1_ASCS00_nw1ascs \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ASCS00_nw1ascs" \
         AUTOMATIC_RECOVER=false MINIMAL_PROBE=true \
         meta resource-stickiness=5000 priority=10 \
         failure-timeout=60 migration-threshold=1
      
      # ERS Resources
      sudo crm configure primitive rsc_SAPStartSrv_NW1_ERS01 \
         ocf:suse:SAPStartSrv params InstanceName=NW1_ERS01_NW1ers
      # NFSv4.1
      sudo crm configure primitive rsc_SAPInstance_NW1_ERS01 SAPInstance \
         op monitor interval=11 timeout=120 on-fail=restart \
         params InstanceName=NW1_ERS01_nw1ers \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ERS01_nw1ers" \
         AUTOMATIC_RECOVER=false IS_ERS=true MINIMAL_PROBE=true \
         meta priority=1000
      # NFSv3
      sudo crm configure primitive rsc_SAPInstance_NW1_ERS01 SAPInstance \
         op monitor interval=11 timeout=60 on-fail=restart \
         params InstanceName=NW1_ERS01_nw1ers \
         START_PROFILE="/sapmnt/NW1/profile/NW1_ERS01_nw1ers" \
         AUTOMATIC_RECOVER=false IS_ERS=true MINIMAL_PROBE=true \
         meta priority=1000
      ```
      ---

   1. Configure groups and constraints for the cluster.
      ```bash
      sudo crm configure modgroup g-NW1_ASCS add rsc_sapstartsrv_NW1_ASCS00
      sudo crm configure modgroup g-NW1_ASCS add rsc_sap_NW1_ASCS00
      sudo crm configure modgroup g-NW1_ERS add rsc_sapstartsrv_NW1_ERS01
      sudo crm configure modgroup g-NW1_ERS add rsc_sap_NW1_ERS01

      sudo crm configure colocation col_sap_NW1_no_both -5000: g-NW1_ERS g-NW1_ASCS
      sudo crm configure order ord_sap_NW1_first_start_ascs \
         Optional: rsc_sap_NW1_ASCS00:start rsc_sap_NW1_ERS01:stop symmetrical=false
      ```
   1. Configure ENSA specific properties and constraints.
      #### [ENSA2](#tab/ensa2)
      ```bash
      sudo crm configure property priority-fencing-delay=30
      ```
      #### [ENSA1](#tab/ensa1)
      ```bash
      sudo crm_attribute --delete --name priority-fencing-delay
      sudo crm configure location loc_sap_NW1_failover_to_ers \
         rsc_sap_NW1_ASCS00 rule 2000: runs_ers_NW1 eq 1
      ```
   1. Enable the nodes and take the cluster out of maintenance mode.
      ```bash
      sudo crm node online sap-cl1
      sudo crm configure property maintenance-mode=false
      ```
1. Verify your cluster setup. It should have a similar status.
   ```bash
   sudo crm status

   Cluster Summary:
     * Stack: corosync (Pacemaker is running)
     * Current DC: sap-cl1 (version 2.1.7+20231219.0f7f88312-150600.6.12.1-2.1.7+20231219.0f7f88312) - partition with quorum
     * Last updated: Wed Jul  8 21:26:21 2026 on sap-cl1
     * Last change:  Mon Jun  8 20:49:31 2026 by root via root on sap-cl1
     * 2 nodes configured
     * 9 resource instances configured

   Node List:
     * Online: [ sap-cl1 sap-cl2 ]

   Full List of Resources:
     * stonith-sbd (stonith:external/sbd):  Started sap-cl2
     * Resource Group: g-NW1_ASCS:
       * nc_NW1_ASCS       (ocf::heartbeat:azure-lb):       Started sap-cl1
       * vip_NW1_ASCS      (ocf::heartbeat:IPaddr2):        Started sap-cl1
       * rsc_SAPStartSrv_NW1_ASCS00         (ocf::suse:SAPStartSrv):         Started sap-cl1
       * rsc_SAPInstance_NW1_ASCS00         (ocf::heartbeat:SAPInstance):    Started sap-cl1
     * Resource Group: g-NW1_ERS:
       * nc_NW1_ERS        (ocf::heartbeat:azure-lb):       Started sap-cl2
       * vip_NW1_ERS       (ocf::heartbeat:IPaddr2):        Started sap-cl2
       * rsc_SAPStartSrv_NW1_ERS01         (ocf::suse:SAPStartSrv):         Started sap-cl2
       * rsc_SAPInstance_NW1_ERS01         (ocf::heartbeat:SAPInstance):    Started sap-cl2
   ```

> **Note:**
> You can extend a SAP ASCS/ERS cluster from a two-node to a three-node cluster with a third node as a spare for failover of ASCS or ERS services.
> - A three-node cluster setup can only be used with Enqueue Replication Server 2 (ENSA2).
> - Don't use the cluster property `priority-fencing-delay` in a three-node cluster. 

## Install SAP Database and Application Server

Some databases require you to execute the database installation on an application server. Prepare an application server, then trigger the Database installation, and finally install the Application Server.

The following common steps assume that you install the application server on a server that's different from the ASCS and HANA servers:

1. Configure host name resolution.

   You can either use a DNS server or modify `/etc/hosts` on all nodes. This example shows how to use the `/etc/hosts` file.

   Update the entries to match your IPs and Hostnames.

   ```bash
   sudo vi /etc/hosts
   [...]
   # IP address of cluster node 1
   10.27.0.6    sap-cl1
   # IP address of cluster node 2
   10.27.0.7    sap-cl2
   # IP address of the load balancer's front-end configuration for SAP NetWeaver ASCS
   10.27.0.9    sapascs
   # IP address of the load balancer's front-end configuration for SAP NetWeaver ERS
   10.27.0.10   sapers
   # Add Any Additional Hostnames/IPs as needed for the Database and/or Additional Application Servers
   10.27.0.8    sapa01
   10.27.0.11   sapa02
   10.27.0.3    sapdb1
   10.27.0.4    sapdb2
   10.27.0.5    sapdb
   ```

1. Configure the SWAP file.
   Follow [Create a SWAP partition for an Azure Linux VM][azdoc-vm-linux-swap] to configure a SWAP space for each VM.

1. Configure SAP Directories
   1. Create the Mount Points
      ```bash
      sudo mkdir -p /sapmnt/NW1
      sudo mkdir -p /usr/sap/trans
      
      sudo chattr +i /sapmnt/NW1
      sudo chattr +i /usr/sap/trans
      ```
   1. Mount the File Systems
      **Applies to: azurefiles**

         ```bash
         echo "sapnfsafs.file.core.windows.net:/sapnfsafs/sapnw1/sapmntNW1 /sapmnt/NW1 nfs noresvport,nfsvers=4.1,sec=sys  0  0" >> /etc/fstab
         echo "sapnfsafs.file.core.windows.net:/sapnfsafs/saptrans /usr/sap/trans nfs noresvport,nfsvers=4.1,sec=sys  0  0" >> /etc/fstab
         
         # Mount the file systems.
         mount -a
         ```

      **Applies to: anf**

         ```bash
         # NFSv4.1:
         echo "10.27.1.5:/sapnw1/sapmntNW1 /sapmnt/NW1 nfs nfsvers=4.1,sec=sys,hard 0 0" >> /etc/fstab
         echo "10.27.1.5:/saptrans /usr/sap/trans nfs nfsvers=4.1,sec=sys,hard 0 0" >> /etc/fstab

         # NFSv3:
         echo "10.27.1.5:/sapnw1/sapmntNW1 /sapmnt/NW1 nfs nfsvers=3,hard 0 0" >> /etc/fstab
         echo "10.27.1.5:/saptrans /usr/sap/trans nfs nfsvers=3,hard 0 0" >> /etc/fstab
         
         # Mount the file systems.
         mount -a
         ```

1. Install Database from Application Server

   In this example, SAP NetWeaver is installed on SAP HANA. You can use any supported database for this installation. For more information on how to install SAP HANA in Azure, see [High availability of SAP HANA on Azure virtual machines][azdoc-sap-hana-ha-rhel]. For a list of supported databases, see SAP Note [1928533][sapnote-1928533-supportedos].

   Install the SAP NetWeaver database instance as root by using a virtual host name that maps to the IP address of the load balancer's front-end configuration for the database. You can use the `SAPINST_REMOTE_ACCESS_USER` parameter to allow a nonroot user to connect to `sapinst`.
   
   ```bash
   sudo <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin
   ```

1. Install SAP NetWeaver on Application Server
   1. Install SAP
      You can use the `SAPINST_REMOTE_ACCESS_USER` parameter to allow a nonroot user to connect to `sapinst`.

      ```bash
      sudo <swpm>/sapinst SAPINST_REMOTE_ACCESS_USER=sapadmin
      ```
   1. Update hdbuserstore to point to the database cluster name
      List the entries
      ```bash
      #Run as SIDADM
      su - nw1adm

      hdbuserstore list
      DATA FILE       : /home/nw1adm/.hdb/sapa01/SSFS_HDB.DAT
      KEY FILE        : /home/nw1adm/.hdb/sapa01/SSFS_HDB.KEY
      
      KEY DEFAULT
        ENV : 10.27.0.3:30313
        USER: SAPABAP1
        DATABASE: NW1
      ```
      In this example, the IP address of the default entry points to the VM, not the load balancer. Change the entry to point to the virtual host name of the load balancer. Be sure to use the same port and database name. For example, use `30313` and `NW1` in the sample output.

      ```bash
      hdbuserstore SET DEFAULT sapdb:30313@NW1 SAPABAP1 <password of ABAP schema>
      ```
      


[azdoc-sap-hana-ha-rhel]: sap-hana-high-availability-rhel.md

[sapnote-1928533-supportedos]: https://launchpad.support.sap.com/#/notes/1928533

[azdoc-vm-linux-swap]: https://learn.microsoft.com/troubleshoot/azure/virtual-machines/linux/create-swap-file-linux-vm

## Test your cluster setup

Thoroughly test your Pacemaker cluster. Run the typical [failover tests][azdoc-sap-sles-test-cluster].

## Next steps

- [HA for SAP NetWeaver on Azure VMs on SLES for SAP applications multi-SID guide][azdoc-sap-sles-multi-sid]
- [SAP workload configurations with Azure availability zones][azdoc-sap-ha-zones]
- [Azure Virtual Machines planning and implementation for SAP][azdoc-sap-planning-guide]
- [Azure Virtual Machines deployment for SAP][azdoc-sap-deployment-guide]
- [Azure Virtual Machines DBMS deployment for SAP][azdoc-sap-dbms-guide]
- [High Availability of SAP HANA on Azure VMs][azdoc-sap-hana-ha]

[azdoc-sap-ha-zones]: high-availability-zones.md
[azdoc-sap-hana-ha]: sap-hana-high-availability.md
[azdoc-sap-dbms-guide]: dbms-guide-general.md
[azdoc-sap-deployment-guide]: deployment-guide.md
[azdoc-sap-planning-guide]: planning-guide.md
[azdoc-sap-sles-pacemaker]: high-availability-guide-suse-pacemaker.md
[azdoc-sap-sles-test-cluster]: high-availability-guide-suse.md#test-the-cluster-setup
[azdoc-sap-sles-multi-sid]: high-availability-guide-suse-multi-sid.md

[sapnote-1275776-sles]: https://me.sap.com/notes/1275776
[sapnote-2578899-sles15]: https://me.sap.com/notes/2578899
[sapnote-3565382-sles16]: https://me.sap.com/notes/3565382

[susedoc-sap-ha-simplemount]: https://documentation.suse.com/en-us/sbp/sap-15/html/SAP-S4HA10-setupguide-simplemount-sle15/
[susedoc-kb-19944]: https://support.scc.suse.com/s/kb/Use-of-Filesystem-resource-for-ASCS-ERS-HA-setup-not-possible?language=en_US
[susedoc-sap-sles-15-bestpractices]: https://documentation.suse.com/en-us/sbp/sap-15/
[susedoc-sap-sles-16-bestpractices]: https://documentation.suse.com/en-us/sbp/sap-16/
[susedoc-release-notes]: https://www.suse.com/releasenotes/index.html
