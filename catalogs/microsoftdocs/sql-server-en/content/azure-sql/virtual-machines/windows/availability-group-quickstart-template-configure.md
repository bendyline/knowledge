---
title: Configure availability group (Azure quickstart template)
description: "Use Azure quickstart templates to create the Windows Server failover cluster, join SQL Server VMs to the cluster, create the listener, and configure the internal load balancer in Azure."
author: AbdullahMSFT
ms.author: amamun
ms.reviewer: mathoma
ms.date: 01/23/2026
ms.service: azure-vm-sql-server
ms.subservice: hadr
ms.topic: how-to
ms.custom:
tags: azure-resource-manager
---
# Use Azure quickstart templates to configure an availability group for SQL Server on Azure VM


  **Applies to:**    [SQL Server on Azure VM](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> **Tip:**
> There are many [methods to deploy an availability group](availability-group-overview.md#deployment-options). Simplify your deployment and eliminate the need for an Azure Load Balancer or distributed network name (DNN) for your Always On availability group by creating your SQL Server virtual machines (VMs) in [multiple subnets](availability-group-manually-configure-prerequisites-tutorial-multi-subnet.md) within the same Azure virtual network. If you've already created your availability group in a single subnet, you can [migrate it to a multi-subnet environment](availability-group-manually-migrate-multi-subnet.md). 

This article describes how to use the Azure quickstart templates to partially automate the deployment of an Always On availability group configuration for SQL Server virtual machines (VMs) within a single subnet in Azure. Two Azure quickstart templates are used in this process: 

   | Template | Description |
   | --- | --- |
   | [101-sql-vm-ag-setup](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.sqlvirtualmachine/sql-vm-ag-setup) | Creates the Windows Server failover cluster and joins the SQL Server VMs to it. |
   | [101-sql-vm-aglistener-setup](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.sqlvirtualmachine/sql-vm-aglistener-setup) | Creates the availability group listener and configures the internal load balancer. This template can be used only if the Windows Server failover cluster was created with the **101-sql-vm-ag-setup** template. |


Other parts of the availability group configuration must be done manually, such as creating the availability group and creating the internal load balancer. This article provides the sequence of automated and manual steps.

While this article uses the Azure Quickstart templates to configure the availability group environment, it is also possible to do so using the [Azure portal](availability-group-azure-portal-configure.md), [PowerShell or the Azure CLI](availability-group-az-commandline-configure.md), or [Manually](availability-group-manually-configure-tutorial-single-subnet.md) as well. 

> **Note:**
> It's now possible to lift and shift your availability group solution to SQL Server on Azure VMs using Azure Migrate. See [Migrate availability group](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/migration-guides/virtual-machines/sql-server-availability-group-to-sql-on-azure-vm.md) to learn more. 
 

## Prerequisites 

To automate the setup of an Always On availability group by using quickstart templates, you must have the following prerequisites: 
- An [Azure subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A resource group with a domain controller. 
- One or more domain-joined [VMs in Azure running SQL Server 2016 (or later) Enterprise edition](create-sql-vm-portal.md) that are in the same availability set or availability zone and that have been [registered with the SQL IaaS Agent extension](sql-agent-extension-manually-register-single-vm.md).  
- An internal Azure Load Balancer and an available (not used by any entity) IP address for the availability group listener within the same subnet as the SQL Server VM. 


## Permissions

The following permissions are necessary to configure the Always On availability group by using Azure quickstart templates: 

- An existing domain user account that has **Create Computer Object** permission in the domain.  For example, a domain admin account typically has sufficient permission (for example: account@domain.com). _This account should also be part of the local administrator group on each VM to create the cluster._
- The domain user account that controls SQL Server. 


## Create cluster

After your SQL Server VMs have been registered with the SQL IaaS Agent extension, you can join your SQL Server VMs to *SqlVirtualMachineGroups*. This resource defines the metadata of the Windows Server failover cluster. Metadata includes the version, edition, fully qualified domain name, Active Directory accounts to manage both the cluster and SQL Server, and the storage account as the cloud witness. 

Adding SQL Server VMs to the *SqlVirtualMachineGroups* resource bootstraps the Windows Server Failover Cluster Service to create the cluster and then joins those SQL Server VMs to that cluster. This step is automated with the **101-sql-vm-ag-setup** quickstart template. You can implement it by using the following steps:

1. Go to the [**101-sql-vm-ag-setup**](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.sqlvirtualmachine/sql-vm-ag-setup) quickstart template. Then, select **Deploy to Azure** to open the quickstart template in the Azure portal.
1. Fill out the required fields to configure the metadata for the Windows Server failover cluster. You can leave the optional fields blank.

   The following table shows the necessary values for the template: 

   | **Field** | Value |
   | --- | --- |
   | **Subscription** | The subscription where your SQL Server VMs exist. |
   | **Resource group** | The resource group where your SQL Server VMs reside. |
   | **Failover Cluster Name** | The name that you want for your new Windows Server failover cluster. |
   | **Existing Vm List** | The SQL Server VMs that you want to participate in the availability group and be part of this new cluster. Separate these values with a comma and a space (for example: *SQLVM1, SQLVM2*). |
   | **SQL Server Version** | The SQL Server version of your SQL Server VMs. Select it from the dropdown list. |
   | **Existing Fully Qualified Domain Name** | The existing FQDN for the domain in which your SQL Server VMs reside. |
   | **Existing Domain Account** | An existing domain user account that has **Create Computer Object** permission in the domain as the [CNO](https://learn.microsoft.com/windows-server/failover-clustering/prestage-cluster-adds) is created during template deployment. For example, a domain admin account typically has sufficient permission (for example: account@domain.com). *This account should also be part of the local administrator group on each VM to create the cluster.* |
   | **Domain Account Password** | The password for the previously mentioned domain user account. |
   | **Existing Sql Service Account** | The domain user account that controls the [SQL Server service](https://learn.microsoft.com/sql/database-engine/configure-windows/configure-windows-service-accounts-and-permissions) during availability group deployment (for example: account@domain.com). |
   | **Sql Service Password** | The password used by the domain user account that controls SQL Server. |
   | **Cloud Witness Name** | A new Azure storage account that will be created and used for the cloud witness. You can modify this name. |
   | **\_artifacts Location** | This field is set by default and should not be modified. |
   | **\_artifacts Location SAS Token** | This field is intentionally left blank. |


1. If you agree to the terms and conditions, select the **I Agree to the terms and conditions stated above** check box. Then select **Purchase** to finish deployment of the quickstart template. 
1. To monitor your deployment, either select the deployment from the **Notifications** bell icon in the top navigation banner or go to **Resource Group** in the Azure portal. Select **Deployments** under **Settings**, and choose the **Microsoft.Template** deployment. 

>**Note:**
> Credentials provided during template deployment are stored only for the length of the deployment. After deployment finishes, those passwords are removed. You'll be asked to provide them again if you add more SQL Server VMs to the cluster. 

## Configure quorum

Although the disk witness is the most resilient quorum option, it requires an Azure shared disk which imposes some limitations to the availability group. As such, the cloud witness is the recommended quorum solution for clusters hosting availability groups for SQL Server on Azure VMs. 

If you have an even number of votes in the cluster, configure the [quorum solution](hadr-cluster-quorum-configure-how-to.md) that best suits your business needs. For more information, see [Quorum with SQL Server VMs](hadr-windows-server-failover-cluster-overview.md#quorum). 

## Validate cluster 

For a failover cluster to be supported by Microsoft, it must pass cluster validation. Connect to the VM using your preferred method, such as [Bastion](https://learn.microsoft.com/azure/bastion/bastion-connect-vm-rdp-windows), and validate that your cluster passes validation before proceeding further. Failure to do so leaves your cluster in an unsupported state. 

You can validate the cluster using Failover Cluster Manager (FCM) or the following PowerShell command:

   ```powershell
   Test-Cluster -Node ("<node1>","<node2>") -Include "Inventory", "Network", "System Configuration"
   ```


## Create availability group 

Manually create the availability group as you normally would, by using [SQL Server Management Studio](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/use-the-availability-group-wizard-sql-server-management-studio), [PowerShell](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/create-an-availability-group-sql-server-powershell), or [Transact-SQL](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/create-an-availability-group-transact-sql). 

> **Important:**
> Do *not* create a listener at this time, because the **101-sql-vm-aglistener-setup** quickstart template does that automatically in a later step. 

## Create load balancer


> **Note:**
> Availability group deployments to [multiple subnets](availability-group-manually-configure-prerequisites-tutorial-multi-subnet.md) don't require a load balancer. In a single-subnet environment, customers who use SQL Server 2019 CU8 and later on Windows 2016 and later can replace the traditional virtual network name (VNN) listener and Azure Load Balancer with a [distributed network name (DNN) listener](availability-group-distributed-network-name-dnn-listener-configure.md). If you want to use a DNN, skip any tutorial steps that configure Azure Load Balancer for your availability group. 


The Always On availability group listener requires an internal instance of Azure Load Balancer. The internal load balancer provides a "floating" IP address for the availability group listener that allows for faster failover and reconnection. 

> **Important:**
> The internal load balancer should be in the same virtual network as the SQL Server VM instances. 

You just need to create the internal load balancer. In step 4, the **101-sql-vm-aglistener-setup** quickstart template handles the rest of the configuration (such as the backend pool, health probe, and load-balancing rules). 

1. In the Azure portal, open the resource group that contains the SQL Server virtual machines. 
2. In the resource group, select **Add**.
3. Search for **load balancer**. In the search results, select **Load Balancer**, which is published by **Microsoft**.
4. On the **Load Balancer** pane, select **Create**.
5. In the **Create load balancer** dialog box, configure the load balancer as follows:

   | Setting | Value |
   | --- | --- |
   | **Name** | Enter a text name that represents the load balancer. For example, enter **sqlLB**. |
   | **Type** | **Internal**: Most implementations use an internal load balancer, which allows applications within the same virtual network to connect to the availability group.  </br> **External**: Allows applications to connect to the availability group through a public internet connection. |
   | **Virtual network** | Select the virtual network that the SQL Server instances are in. |
   | **Subnet** | Select the subnet that the SQL Server instances are in. |
   | **IP address assignment** | **Static** |
   | **Private IP address** | Specify an available IP address from the subnet. |
   | **Subscription** | If you have multiple subscriptions, this field might appear. Select the subscription that you want to associate with this resource. It's normally the same subscription as all the resources for the availability group. |
   | **Resource group** | Select the resource group that the SQL Server instances are in. |
   | **Location** | Select the Azure location that the SQL Server instances are in. |


6. Select **Create**. 


>**Important:**
> The public IP resource for each SQL Server VM should have a Standard SKU to be compatible with the Standard load balancer. To determine the SKU of your VM's public IP resource, go to **Resource Group**, select your **Public IP Address** resource for the SQL Server VM, and locate the value under **SKU** in the **Overview** pane. 

## Create listener 

Create the availability group listener and configure the internal load balancer automatically by using the **101-sql-vm-aglistener-setup**  quickstart template. The template provisions the Microsoft.SqlVirtualMachine/SqlVirtualMachineGroups/AvailabilityGroupListener resource. The  **101-sql-vm-aglistener-setup** quickstart template, via the SQL IaaS Agent extension, does the following actions:

- Creates a new frontend IP resource (based on the IP address value provided during deployment) for the listener. 
- Configures the network settings for the cluster and the internal load balancer. 
- Configures the backend pool for the internal load balancer, the health probe, and the load-balancing rules.
- Creates the availability group listener with the given IP address and name.
 
> **Note:**
> You can use **101-sql-vm-aglistener-setup** only if the Windows Server failover cluster was created with the **101-sql-vm-ag-setup** template.
   
   
To configure the internal load balancer and create the availability group listener, do the following:
1. Go to the [101-sql-vm-aglistener-setup](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.sqlvirtualmachine/sql-vm-aglistener-setup) quickstart template and select **Deploy to Azure** to start the quickstart template in the Azure portal.
1. Fill out the required fields to configure the internal load balancer, and create the availability group listener. You can leave the optional fields blank. 

   The following table shows the necessary values for the template: 

   | **Field** | Value |
   | --- | --- |
   | **Resource group** | The resource group where your SQL Server VMs and availability group exist. |
   | **Existing Failover Cluster Name** | The name of the cluster that your SQL Server VMs are joined to. |
   | **Existing Sql Availability Group** | The name of the availability group that your SQL Server VMs are a part of. |
   | **Existing Vm List** | The names of the SQL Server VMs that are part of the previously mentioned availability group. Separate the names with a comma and a space (for example: *SQLVM1, SQLVM2*). |
   | **Listener** | The DNS name that you want to assign to the listener. By default, this template specifies the name "aglistener," but you can change it. The name should not exceed 15 characters. |
   | **Listener Port** | The port that you want the listener to  use. Typically, this port should be the default of 1433. This is the port number that the template specifies. But if your default port has been changed, the listener port should use that value instead. |
   | **Listener IP** | The IP address that you want the listener to use. This address will be created during template deployment, so provide one that isn't already in use. |
| **Existing Subnet** | The name of the internal subnet of your SQL Server VMs (for example: *default*). You can determine this value by going to **Resource Group**, selecting your virtual network, selecting **Subnets** in the **Settings** pane, and copying the value under **Name**. |
   | **Existing Internal Load Balancer** | The name of the internal load balancer that you created in step 3. |
   | **Probe Port** | The probe port that you want the internal load balancer to use. The template uses 59999 by default, but you can change this value. |


1. If you agree to the terms and conditions, select the **I Agree to the terms and conditions stated above** check box. Select **Purchase** to finish deployment of the quickstart template. 
1. To monitor your deployment, either select the deployment from the **Notifications** bell icon in the top navigation banner or go to **Resource Group** in the Azure portal. Select **Deployments** under **Settings**, and choose the **Microsoft.Template** deployment. 

>**Note:**
>If your deployment fails halfway through, you'll need to manually [remove the newly created listener](#remove-listener) by using PowerShell before you redeploy the **101-sql-vm-aglistener-setup** quickstart template. 

## Configure probe port

When using an Azure Load Balancer to support a Virtual Network Name (VNN) resource, you must configure the cluster to reply to the health probe requests. If the health probe fails to get a response from a backend instance, then no new connections are sent to that backend instance until the health probe succeeds again.

To set the probe port parameter in PowerShell, use the following script once per applicable IP address resource:

```powershell
$ClusterNetworkName = "<MyClusterNetworkName>" # The cluster network name. Use Get-ClusterNetwork on Windows Server 2012 or later to find the name.
$IPResourceName = "<IPResourceName>" # The IP address resource name.
[int]$ProbePort = <nnnnn> # The probe port that you configured in the health probe of the load balancer for a given Frontend IP Address. Any unused TCP port is valid.

Import-Module FailoverClusters

Get-ClusterResource $IPResourceName | Set-ClusterParameter -Multiple @{"Address"="$IPResourceName";"ProbePort"=$ProbePort;"SubnetMask"="255.255.255.255";"Network"="$ClusterNetworkName";"EnableDhcp"=0}
```

The changes you make don't take effect until the IP address resource is taken offline and brought online again. Perform a failover of the resource for this change to take effect.

After you set the cluster probe, use the following PowerShell script to check cluster parameters:

```powershell
Get-ClusterResource $IPResourceName | Get-ClusterParameter
```

## Exclude ports from the dynamic port range

When using a health probe port between 49,152 and 65,535 (the [default dynamic port range for TCP/IP](https://learn.microsoft.com/windows/client-management/troubleshoot-tcpip-port-exhaust#default-dynamic-port-range-for-tcpip)), add an exclusion for each health probe port on every VM.

Configuring port exclusion prevents other system processes from being dynamically assigned the same port on the VM

To set a port exclusion, use the following PowerShell script:
- for each health probe port
- on every VM

```powershell
[int]$ProbePort = <nnnnn> # The probe port that you configured in the health probe of the load balancer. Any unused TCP port is valid.

netsh int ipv4 add excludedportrange tcp startport=$ProbePort numberofports=1 store=persistent
```

To confirm that exclusions have been configured correctly, use the following command:

```powershell
netsh int ipv4 show excludedportrange tcp
```


## Remove listener
If you later need to remove the availability group listener that the template configured, you must go through the SQL IaaS Agent extension. Because the listener is registered through the SQL IaaS Agent extension, just deleting it via SQL Server Management Studio is insufficient. 

The best method is to delete it through the SQL IaaS Agent extension by using the following code snippet in PowerShell. Doing so removes the availability group listener metadata from the SQL IaaS Agent extension. It also physically deletes the listener from the availability group. 

```PowerShell
# Remove the availability group listener
# example: Remove-AzResource -ResourceId '/subscriptions/a0a0a0a0-bbbb-cccc-dddd-e1e1e1e1e1e1/resourceGroups/SQLAG-RG/providers/Microsoft.SqlVirtualMachine/SqlVirtualMachineGroups/Cluster/availabilitygrouplisteners/aglistener' -Force
Remove-AzResource -ResourceId '/subscriptions/<SubscriptionID>/resourceGroups/<resource-group-name>/providers/Microsoft.SqlVirtualMachine/SqlVirtualMachineGroups/<cluster-name>/availabilitygrouplisteners/<listener-name>' -Force
```
 
## Common errors
This section discusses some known issues and their possible resolution. 

### Availability group listener for availability group '\<AG-Name>' already exists
The selected availability group used in the Azure quickstart template for the availability group listener already contains a listener. Either it is physically within the availability group, or its metadata remains within the SQL IaaS Agent extension. Remove the listener by using [PowerShell](#remove-listener) before redeploying the **101-sql-vm-aglistener-setup** quickstart template. 

### Connection only works from primary replica

This behavior is likely from a failed **101-sql-vm-aglistener-setup** template deployment that left the configuration of the internal load balancer in an inconsistent state. Verify that the backend pool lists the availability set, and that rules exist for the health probe and for the load-balancing rules. If anything is missing, the configuration of the internal load balancer is in an inconsistent state. 

To resolve this behavior, remove the listener by using [PowerShell](#remove-listener), delete the internal load balancer via the Azure portal, and start again at step 3. 

### BadRequest - Only SQL virtual machine list can be updated
This error might occur when you're deploying the **101-sql-vm-aglistener-setup** template if the listener was deleted via SQL Server Management Studio (SSMS), but was not deleted from the SQL IaaS Agent extension. Deleting the listener via SSMS does not remove the metadata of the listener from the SQL IaaS Agent extension. The listener must be deleted from the resource provider through [PowerShell](#remove-listener). 

### Domain account does not exist
This error can have two causes. Either the specified domain account doesn't exist, or it's missing the [User Principal Name (UPN)](https://learn.microsoft.com/windows/desktop/ad/naming-properties#userprincipalname) data. The **101-sql-vm-ag-setup** template expects a domain account in the UPN form (that is, user@domain.com), but some domain accounts might be missing it. This typically happens when a local user has been migrated to be the first domain administrator account when the server was promoted to a domain controller, or when a user was created through PowerShell. 

Verify that the account exists. If it does, you might be running into the second situation. To resolve it, do the following:

1. On the domain controller, open the **Active Directory Users and Computers** window from the **Tools** option in **Server Manager**. 
2. Go to the account by selecting **Users** in the left pane.
3. Right-click the account, and select **Properties**.
4. Select the **Account** tab. If the **User logon name** box is blank, this is the cause of your error. 

    Blank user account indicates missing UPN

5. Fill in the **User logon name** box to match the name of the user, and select the proper domain from the dropdown list. 
6. Select **Apply** to save your changes, and close the dialog box by selecting **OK**. 

After you make these changes, try to deploy the Azure quickstart template once more. 


## Next steps

To learn more, see:

* [Overview of SQL Server VMs](sql-server-on-azure-vm-iaas-what-is-overview.md)
* [FAQ for SQL Server VMs](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/virtual-machines/windows/frequently-asked-questions-faq.yml)
* [Pricing guidance for SQL Server VMs](pricing-guidance.md)
* [What's new in SQL Server on Azure VMs](doc-changes-updates-release-notes-whats-new.md)
* [Switching licensing models for a SQL Server VM](licensing-model-azure-hybrid-benefit-ahb-change.md)
