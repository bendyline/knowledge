---
title: "Configure Availability Group Listeners and Load Balancer (PowerShell)"
description: Configure Availability Group listeners on the Azure Resource Manager model, using an internal load balancer with one or more IP addresses.
author: AbdullahMSFT
ms.author: amamun
ms.reviewer: mathoma
ms.date: 09/22/2025
ms.service: azure-vm-sql-server
ms.subservice: hadr
ms.topic: how-to
ms.custom:
  - devx-track-azurepowershell
  - devx-track-arm-template
editor: monicar
---
# Configure one or more Always On availability group listeners



  **Applies to:**    [SQL Server on Azure VM](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> **Tip:**
> There are many [methods to deploy an availability group](availability-group-overview.md#deployment-options). Simplify your deployment and eliminate the need for an Azure Load Balancer or distributed network name (DNN) for your Always On availability group by creating your SQL Server virtual machines (VMs) in [multiple subnets](availability-group-manually-configure-prerequisites-tutorial-multi-subnet.md) within the same Azure virtual network. If you've already created your availability group in a single subnet, you can [migrate it to a multi-subnet environment](availability-group-manually-migrate-multi-subnet.md). 

This document shows you how to use PowerShell to do one of the following tasks:

- create a load balancer
- add IP addresses to an existing load balancer for SQL Server availability groups.

An availability group listener is a virtual network name that clients connect to for database access. On Azure virtual machines in a single subnet, a load balancer holds the IP address for the listener. The load balancer routes traffic to the instance of SQL Server that is listening on the probe port. Usually, an availability group uses an internal load balancer. An Azure internal load balancer can host one or many IP addresses. Each IP address uses a specific probe port.

To assign multiple IP addresses to an internal load balancer, you need to have a SQL Server availability group deployed on Azure virtual machines in the Resource Manager model. Both SQL Server virtual machines must belong to the same availability set. You can use an [Azure Quickstart Template](availability-group-quickstart-template-configure.md) to automatically create the availability group in Azure Resource Manager. This template automatically creates the availability group, including the internal load balancer for you. If you prefer, you can [manually configure an Always On availability group](availability-group-manually-configure-tutorial-single-subnet.md).

To complete the steps in this article, your availability groups should already be configured.

Related articles include:

- [Configure Always On Availability Groups in Azure VM (GUI)](availability-group-manually-configure-tutorial-single-subnet.md)
- [Configure a VNet-to-VNet connection by using Azure Resource Manager and PowerShell](https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-vnet-vnet-rm-ps)


## Start your PowerShell session

Run the [**Connect-AzAccount**](https://learn.microsoft.com/powershell/module/Az.Accounts/Connect-AzAccount) cmdlet and you're presented with a sign-in screen to enter your credentials. Use the same credentials that you use to sign in to the Azure portal.

```powershell
Connect-AzAccount
```

If you have multiple subscriptions, use the [**Set-AzContext**](https://learn.microsoft.com/powershell/module/az.accounts/set-azcontext) cmdlet to select which subscription your PowerShell session should use. To see what subscription the current PowerShell session is using, run [**Get-AzContext**](https://learn.microsoft.com/powershell/module/az.accounts/get-azcontext). To see all your subscriptions, run [**Get-AzSubscription**](https://learn.microsoft.com/powershell/module/az.accounts/get-azsubscription).

```powershell
Set-AzContext -SubscriptionId 'aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e'
```


## Verify PowerShell version

The examples in this article are tested using Azure PowerShell module version 5.4.1.

Verify that your PowerShell module is 5.4.1 or later.

See [Install the Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-az-ps).

## Configure the Windows Firewall

Configure the Windows Firewall to allow SQL Server access. The firewall rules allow TCP connections to the ports used by the SQL Server instance, and the listener probe. For detailed instructions, see [Configure a Windows Firewall for Database Engine Access](https://learn.microsoft.com/sql/database-engine/configure-windows/configure-a-windows-firewall-for-database-engine-access#Anchor_1). Create an inbound rule for the SQL Server port and for the probe port.

If you're restricting access with an Azure Network Security Group, ensure that the rules allow access for:

- The backend SQL Server VM IP addresses
- The load balancer floating IP addresses for the AG listener
- The cluster core IP address, if applicable.

## Example Script: Create an internal load balancer with PowerShell

> **Note:**  
> If you created your availability group with an [Azure Quickstart Template](availability-group-quickstart-template-configure.md), the internal load balancer was already created.

The following PowerShell script creates an internal load balancer, configures the load-balancing rules, and sets an IP address for the load balancer. To run the script, open Windows PowerShell ISE, and then paste the script in the Script pane. Use `Connect-AzAccount` to sign in to Azure with PowerShell. If you have multiple Azure subscriptions, use `Select-AzSubscription` to set the subscription.

```powershell
# Connect-AzAccount
# Select-AzSubscription -SubscriptionId <xxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx>

$ResourceGroupName = "<Resource Group Name>" # Resource group name
$VNetName = "<Virtual Network Name>"         # Virtual network name
$SubnetName = "<Subnet Name>"                # Subnet name
$ILBName = "<Load Balancer Name>"            # ILB name
$Location = "<Azure Region>"                 # Azure location
$VMNames = "<VM1>","<VM2>"                   # Virtual machine names

$ILBIP = "<n.n.n.n>"                         # IP address
[int]$ListenerPort = "<nnnn>"                # AG listener port
[int]$ProbePort = "<nnnn>"                   # Probe port

$LBProbeName ="ILBPROBE_$ListenerPort"       # The Load balancer Probe Object Name
$LBConfigRuleName = "ILBCR_$ListenerPort"    # The Load Balancer Rule Object Name

$FrontEndConfigurationName = "FE_SQLAGILB_1" # Object name for the front-end configuration
$BackEndConfigurationName ="BE_SQLAGILB_1"   # Object name for the back-end configuration

$VNet = Get-AzVirtualNetwork -Name $VNetName -ResourceGroupName $ResourceGroupName

$Subnet = Get-AzVirtualNetworkSubnetConfig -VirtualNetwork $VNet -Name $SubnetName

$FEConfig = New-AzLoadBalancerFrontendIpConfig -Name $FrontEndConfigurationName -PrivateIpAddress $ILBIP -SubnetId $Subnet.id

$BEConfig = New-AzLoadBalancerBackendAddressPoolConfig -Name $BackEndConfigurationName

$SQLHealthProbe = New-AzLoadBalancerProbeConfig -Name $LBProbeName -Protocol tcp -Port $ProbePort -IntervalInSeconds 15 -ProbeCount 2

$ILBRule = New-AzLoadBalancerRuleConfig -Name $LBConfigRuleName -FrontendIpConfiguration $FEConfig -BackendAddressPool $BEConfig -Probe $SQLHealthProbe -Protocol tcp -FrontendPort $ListenerPort -BackendPort $ListenerPort -LoadDistribution Default -EnableFloatingIP

$ILB= New-AzLoadBalancer -Location $Location -Name $ILBName -ResourceGroupName $ResourceGroupName -FrontendIpConfiguration $FEConfig -BackendAddressPool $BEConfig -LoadBalancingRule $ILBRule -Probe $SQLHealthProbe

$bepool = Get-AzLoadBalancerBackendAddressPoolConfig -Name $BackEndConfigurationName -LoadBalancer $ILB

foreach($VMName in $VMNames)
    {
        $VM = Get-AzVM -ResourceGroupName $ResourceGroupName -Name $VMName
        $NICName = ($vm.NetworkProfile.NetworkInterfaces.Id.split('/') | select -last 1)
        $NIC = Get-AzNetworkInterface -name $NICName -ResourceGroupName $ResourceGroupName
        $NIC.IpConfigurations[0].LoadBalancerBackendAddressPools = $BEPool
        Set-AzNetworkInterface -NetworkInterface $NIC
        start-AzVM -ResourceGroupName $ResourceGroupName -Name $VM.Name
    }
```

> **Note:**
> The Basic load balancer has been retired. For new deployments, use the Standard load balancer. If you have an existing deployment that uses the Basic load balancer, [upgrade to the Standard load balancer](https://learn.microsoft.com/azure/load-balancer/load-balancer-basic-upgrade-guidance). 


<a id="Add-IP"></a>

## Example script: Add an IP address to an existing load balancer with PowerShell

To use more than one availability group, add another IP address to the load balancer. Each IP address requires its own load-balancing rule, probe port, and front port.
Add only the primary IP address of the VM to the back-end pool of the load balancer as the [secondary VM IP address doesn't support floating IP](https://learn.microsoft.com/azure/load-balancer/load-balancer-floating-ip).

The front-end port is the port that applications use to connect to the SQL Server instance. IP addresses for different availability groups can use the same front-end port.

> **Note:**  
> For SQL Server availability groups, each IP address requires a specific probe port. For example, if one IP address on a load balancer uses probe port 59999, no other IP addresses on that load balancer can use probe port 59999.

- For information about load balancer limits, see **Private front end IP per load balancer** under [Networking Limits - Azure Resource Manager](https://learn.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-resource-manager-virtual-networking-limits).
- For information about availability group limits, see [Restrictions (Availability Groups)](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/prereqs-restrictions-recommendations-always-on-availability#RestrictionsAG).

The following script adds a new IP address to an existing load balancer. The ILB uses the listener port for the load-balancing front-end port. This port can be the port that SQL Server is listening on. For default instances of SQL Server, the port is 1433. The load-balancing rule for an availability group requires a floating IP (direct server return) so the back-end port is the same as the front-end port. Update the variables for your environment.

```powershell
# Connect-AzAccount
# Select-AzSubscription -SubscriptionId <xxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx>

$ResourceGroupName = "<ResourceGroup>"          # Resource group name
$VNetName = "<VirtualNetwork>"                  # Virtual network name
$SubnetName = "<Subnet>"                        # Subnet name
$ILBName = "<ILBName>"                          # ILB name

$ILBIP = "<n.n.n.n>"                            # IP address
[int]$ListenerPort = "<nnnn>"                   # AG listener port
[int]$ProbePort = "<nnnnn>"                     # Probe port

$ILB = Get-AzLoadBalancer -Name $ILBName -ResourceGroupName $ResourceGroupName

$count = $ILB.FrontendIpConfigurations.Count+1
$FrontEndConfigurationName ="FE_SQLAGILB_$count"

$LBProbeName = "ILBPROBE_$count"
$LBConfigrulename = "ILBCR_$count"

$VNet = Get-AzVirtualNetwork -Name $VNetName -ResourceGroupName $ResourceGroupName
$Subnet = Get-AzVirtualNetworkSubnetConfig -VirtualNetwork $VNet -Name $SubnetName

$ILB | Add-AzLoadBalancerFrontendIpConfig -Name $FrontEndConfigurationName -PrivateIpAddress $ILBIP -SubnetId $Subnet.Id

$ILB | Add-AzLoadBalancerProbeConfig -Name $LBProbeName  -Protocol Tcp -Port $Probeport -ProbeCount 2 -IntervalInSeconds 15  | Set-AzLoadBalancer

$ILB = Get-AzLoadBalancer -Name $ILBname -ResourceGroupName $ResourceGroupName

$FEConfig = get-AzLoadBalancerFrontendIpConfig -Name $FrontEndConfigurationName -LoadBalancer $ILB

$SQLHealthProbe  = Get-AzLoadBalancerProbeConfig -Name $LBProbeName -LoadBalancer $ILB

$BEConfig = Get-AzLoadBalancerBackendAddressPoolConfig -Name $ILB.BackendAddressPools[0].Name -LoadBalancer $ILB

$ILB | Add-AzLoadBalancerRuleConfig -Name $LBConfigRuleName -FrontendIpConfiguration $FEConfig  -BackendAddressPool $BEConfig -Probe $SQLHealthProbe -Protocol tcp -FrontendPort  $ListenerPort -BackendPort $ListenerPort -LoadDistribution Default -EnableFloatingIP | Set-AzLoadBalancer
```

## Configure the listener

The availability group listener is an IP address and network name that the SQL Server availability group listens on. To create the availability group listener:

1. <a name="getnet"></a>Get the name of the cluster network resource:

   a. Use [Bastion](https://learn.microsoft.com/azure/bastion/bastion-connect-vm-rdp-windows) to connect to the Azure virtual machine that hosts the primary replica.

   b. Open **Failover Cluster Manager**.

   c. Select the **Networks** node, and note the cluster network name. Use this name in the `$ClusterNetworkName` variable in the PowerShell script. In the following image, the cluster network name is **Cluster Network 1**:

   Screenshot that shows a cluster network name in Failover Cluster Manager.

1. <a name="addcap"></a>Add the client access point. The client access point is the network name that applications use to connect to the databases in an availability group.

   a. In **Failover Cluster Manager**, expand the cluster name, and then select **Roles**.

   b. On the **Roles** pane, right-click the availability group name, and then select **Add Resource** > **Client Access Point**.

   Screenshot of Failover Cluster Manager that shows selecting the Client Access Point command on the shortcut menu for the availability group.

   c. In the **Name** box, create a name for this new listener.
  The name for the new listener is the network name that applications use to connect to databases in the SQL Server availability group.

   d. To finish creating the listener, select **Next** twice, and then select **Finish**. Don't bring the listener or resource online at this point.

1. Take the cluster role for the availability group offline. In **Failover Cluster Manager**, under **Roles**, right-click the role, and then select **Stop Role**.

1. <a name="congroup"></a>Configure the IP resource for the availability group:

   a. Select the **Resources** tab, and then expand the client access point that you created. The client access point is offline.

   Screenshot of Failover Cluster Manager that shows an offline status for a client access point.

   b. Right-click the IP resource, and then select **Properties**. Note the name of the IP address, and use it in the `$IPResourceName` variable in the PowerShell script.

   c. Under **IP Address**, select **Static IP Address**. Set the IP address as the same address that you used when you set the load balancer address on the Azure portal.

   Screenshot of Failover Cluster Manager that shows the selection of an IP address.
    
1. <a name = "dependencyGroup"></a>Make the SQL Server availability group dependent on the client access point:

   a. In **Failover Cluster Manager**, select **Roles**, and then select your availability group.

   b. On the **Resources** tab, under **Other Resources**, right-click the availability group resource, and then select **Properties**.

   c. On the **Dependencies** tab, add the name of the client access point (the listener).

   Screenshot of Failover Cluster Manager that shows adding a name on the Dependencies tab.

   d. Select **OK**.

1. <a name="listname"></a>Make the client access point dependent on the IP address:

   a. In **Failover Cluster Manager**, select **Roles**, and then select your availability group.

   b. On the **Resources** tab, right-click the client access point under **Server Name**, and then select **Properties**.

   Screenshot of Failover Cluster Manager that shows the Properties menu option for the listener's name.

   c. Select the **Dependencies** tab. Verify that the IP address is a dependency. If it isn't, set a dependency on the IP address. If multiple resources are listed, verify that the IP addresses have `OR`, not `AND`, dependencies. Then select **OK**.

   Screenshot of the Dependencies tab that shows an IP resource for an availability group.

   > **Tip:**  
   > You can validate that the dependencies are correctly configured. In **Failover Cluster Manager**, go to **Roles**, right-click the availability group, select **More Actions**, and then select **Show Dependency Report**. When the dependencies are correctly configured, the availability group is dependent on the network name, and the network name is dependent on the IP address.


1. <a name="setparam"></a>Set the cluster parameters in PowerShell:

   a. Copy the following PowerShell script to one of your SQL Server instances. Update the variables for your environment.

   - `$ClusterNetworkName` find the name in the **Failover Cluster Manager** by selecting **Networks**, right-click the network and select **Properties**. The **$ClusterNetworkName** is under **Name** on the General tab.

   - `$IPResourceName` is the name given to the IP Address resource in the **Failover Cluster Manager**. This is found in the **Failover Cluster Manager** by selecting **Roles**, select the **SQL Server AG or FCI name**, select the **Resources** tab under **Server Name**, right-click the IP address resource and select **Properties**. The correct value is under **Name** on the General tab.

   - `$ListenerILBIP` is the IP address that you created on the Azure load balancer for the availability group listener. Find the **$ListenerILBIP** in the **Failover Cluster Manager** on the same properties page as the SQL Server AG/FCI Listener Resource Name.

   - `$ListenerProbePort` is the port that you configured on the Azure load balancer for the availability group listener, such as 59999. Any unused TCP port is valid.

   ```powershell
   $ClusterNetworkName = "<MyClusterNetworkName>" # The cluster network name. Use Get-ClusterNetwork on Windows Server 2012 or later to find the name.
   $IPResourceName = "<IPResourceName>" # The IP address resource name.
   $ListenerILBIP = "<n.n.n.n>" # The IP address of the internal load balancer. This is the static IP address for the load balancer that you configured in the Azure portal.
   [int]$ListenerProbePort = <nnnnn>

   Import-Module FailoverClusters

   Get-ClusterResource $IPResourceName | Set-ClusterParameter -Multiple @{"Address"="$ListenerILBIP";"ProbePort"=$ListenerProbePort;"SubnetMask"="255.255.255.255";"Network"="$ClusterNetworkName";"EnableDhcp"=0}
   ```

   b. Set the cluster parameters by running the PowerShell script on one of the cluster nodes.

   > **Note:**  
   > If your SQL Server instances are in separate regions, you need to run the PowerShell script twice. The first time, use the `$ListenerILBIP` and `$ListenerProbePort` values from the first region. The second time, use the `$ListenerILBIP` and `$ListenerProbePort` values from the second region. The cluster network name and the cluster IP resource name are also different for each region.

1. Bring the cluster role for the availability group online. In **Failover Cluster Manager**, under **Roles**, right-click the role, and then select **Start Role**.

If necessary, repeat the preceding steps to set the cluster parameters for the IP address of the Windows Server failover cluster:

1. Get the IP address name of the Windows Server failover cluster. In **Failover Cluster Manager**, under **Cluster Core Resources**, locate **Server Name**.

1. Right-click **IP Address**, and then select **Properties**.

1. Copy the name of the IP address from **Name**. It might be **Cluster IP Address**.

1. <a name="setwsfcparam"></a>Set the cluster parameters in PowerShell:
  
   a. Copy the following PowerShell script to one of your SQL Server instances. Update the variables for your environment.

   - `$ClusterCoreIP` is the IP address that you created on the Azure load balancer for the Windows Server failover cluster's core cluster resource. It's different from the IP address for the availability group listener.

   - `$ClusterProbePort` is the port that you configured on the Azure load balancer for the Windows Server failover cluster's health probe. It's different from the probe for the availability group listener.

   ```powershell
   $ClusterNetworkName = "<MyClusterNetworkName>" # The cluster network name. Use Get-ClusterNetwork on Windows Server 2012 or later to find the name.
   $IPResourceName = "<ClusterIPResourceName>" # The IP address resource name.
   $ClusterCoreIP = "<n.n.n.n>" # The IP address of the cluster IP resource. This is the static IP address for the load balancer that you configured in the Azure portal.
   [int]$ClusterProbePort = <nnnnn> # The probe port from WSFCEndPointprobe in the Azure portal. This port must be different from the probe port for the availability group listener.

   Import-Module FailoverClusters

   Get-ClusterResource $IPResourceName | Set-ClusterParameter -Multiple @{"Address"="$ClusterCoreIP";"ProbePort"=$ClusterProbePort;"SubnetMask"="255.255.255.255";"Network"="$ClusterNetworkName";"EnableDhcp"=0}
   ```

   b. Set the cluster parameters by running the PowerShell script on one of the cluster nodes.

If any SQL resource is configured to use a port between 49,152 and 65,536 (the [default dynamic port range for TCP/IP](https://learn.microsoft.com/windows/client-management/troubleshoot-tcpip-port-exhaust#default-dynamic-port-range-for-tcpip)), add an exclusion for each port. Such resources might include:

- SQL Server database engine
- Always On availability group listener
- Health probe for the failover cluster instance
- Database mirroring endpoint
- Cluster core IP resource

Adding an exclusion will prevent other system processes from being dynamically assigned to the same port. For this scenario, configure the following exclusions on all cluster nodes:

- `netsh int ipv4 add excludedportrange tcp startport=58888 numberofports=1 store=persistent`
- `netsh int ipv4 add excludedportrange tcp startport=59999 numberofports=1 store=persistent`

It's important to configure the port exclusion when the port isn't in use. Otherwise, the command will fail with a message like `The process cannot access the file because it is being used by another process`.
To confirm that the exclusions are configured correctly, use the following command: `netsh int ipv4 show excludedportrange tcp`.

> **Warning:**  
> The port for the availability group listener's health probe has to be different from the port for the cluster core IP address's health probe. In these examples, the listener port is 59999 and the cluster core IP address's health probe port is 58888. Both ports require an "allow inbound" firewall rule.


## Set the listener port in SQL Server Management Studio

1. Launch SQL Server Management Studio and connect to the primary replica.

1. Navigate to **Always On High Availability** > **Availability Groups** > **Availability Group Listeners**.

1. You should now see the listener name that you created in Failover Cluster Manager. Right-click the listener name and select **Properties**.

1. In the **Port** box, specify the port number for the availability group listener by using the $EndpointPort you used earlier (1433 was the default), then select **OK**.

## Test the connection to the listener

To test the connection:

1. Use [Bastion](https://learn.microsoft.com/azure/bastion/bastion-connect-vm-rdp-windows) to connect to a SQL Server that is in the same virtual network, but doesn't own the replica. It might be the other SQL Server in the cluster.

1. Use **sqlcmd** utility to test the connection. For example, the following script establishes a **sqlcmd** connection to the primary replica through the listener with Windows authentication:

   ```
   sqlcmd -S <listenerName> -E
   ```

   If the listener is using a port other than the default port (1433), specify the port in the connection string. For example, the following sqlcmd command connects to a listener at port 1435:

   ```
   sqlcmd -S <listenerName>,1435 -E
   ```

The SQLCMD connection automatically connects to whichever instance of SQL Server hosts the primary replica.

> **Note:**  
> Make sure that the port you specify is open on the firewall of both SQL Server instances. Both servers require an inbound rule for the TCP port that you use. For more information, see [Add or Edit Firewall Rule](https://learn.microsoft.com/previous-versions/orphan-topics/ws.11/cc753558\(v=ws.11\)).
>

If you're on the secondary replica VM, and you're unable to connect to the listener, it's possible the probe port wasn't configured correctly.

You can use the following script to validate the probe port is correctly configured for the availability group:

```powershell
Clear-Host
Get-ClusterResource `
| Where-Object {$_.ResourceType.Name -like "IP Address"} `
| Get-ClusterParameter `
| Where-Object {($_.Name -like "Network") -or ($_.Name -like "Address") -or ($_.Name -like "ProbePort") -or ($_.Name -like "SubnetMask")}
```

## Guidelines and limitations

Note the following guidelines for an availability group listener in Azure using an internal load balancer:

- With an internal load balancer, you only access the listener from within the same virtual network.

- If you're restricting access with an Azure Network Security Group, ensure that the rules allow access for:

  - The backend SQL Server VM IP addresses
  - The load balancer floating IP addresses for the AG listener
  - The cluster core IP address, if applicable.

- Create a service endpoint when using a standard load balancer with Azure Storage for the cloud witness. For more information, see [Grant access from a virtual network](https://learn.microsoft.com/azure/storage/common/storage-network-security?toc=%2fazure%2fvirtual-network%2ftoc.json#grant-access-from-a-virtual-network).

## PowerShell cmdlets

Use the following PowerShell cmdlets to create an internal load balancer for Azure Virtual Machines.

- [New-AzLoadBalancer](https://learn.microsoft.com/powershell/module/Az.Network/New-AzLoadBalancer) creates a load balancer.
- [New-AzLoadBalancerFrontendIpConfig](https://learn.microsoft.com/powershell/module/Az.Network/New-AzLoadBalancerFrontendIpConfig) creates a front-end IP configuration for a load balancer.
- [New-AzLoadBalancerRuleConfig](https://learn.microsoft.com/powershell/module/Az.Network/New-AzLoadBalancerRuleConfig) creates a rule configuration for a load balancer.
- [New-AzLoadBalancerBackendAddressPoolConfig](https://learn.microsoft.com/powershell/module/Az.Network/New-AzLoadBalancerBackendAddressPoolConfig) creates a backend address pool configuration for a load balancer.
- [New-AzLoadBalancerProbeConfig](https://learn.microsoft.com/powershell/module/Az.Network/New-AzLoadBalancerProbeConfig) creates a probe configuration for a load balancer.
- [Remove-AzLoadBalancer](https://learn.microsoft.com/powershell/module/Az.Network/Remove-AzLoadBalancer) removes a load balancer from an Azure resource group.

## Related content

- [Windows Server Failover Cluster with SQL Server on Azure VMs](hadr-windows-server-failover-cluster-overview.md)
- [Always On availability group on SQL Server on Azure VMs](availability-group-overview.md)
- [Overview: What is an Always On availability group?](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server)
- [HADR configuration best practices (SQL Server on Azure VMs)](hadr-cluster-best-practices.md)
