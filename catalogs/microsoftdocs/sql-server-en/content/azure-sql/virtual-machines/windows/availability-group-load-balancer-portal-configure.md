---
title: "Configure a Load Balancer & Availability Group Listener (Azure Portal)"
description: Step-by-step instructions for creating a listener for an Always On availability group for SQL Server in Azure virtual machines
author: AbdullahMSFT
ms.author: amamun
ms.reviewer: mathoma, randolphwest
ms.date: 09/17/2025
ms.service: azure-vm-sql-server
ms.subservice: hadr
ms.topic: how-to
ms.custom:
  - sfi-image-nochange
editor: monicar
---
# Configure a load balancer & availability group listener (SQL Server on Azure VMs)



  **Applies to:**    [SQL Server on Azure VM](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> **Tip:**
> There are many [methods to deploy an availability group](availability-group-overview.md#deployment-options). Simplify your deployment and eliminate the need for an Azure Load Balancer or distributed network name (DNN) for your Always On availability group by creating your SQL Server virtual machines (VMs) in [multiple subnets](availability-group-manually-configure-prerequisites-tutorial-multi-subnet.md) within the same Azure virtual network. If you've already created your availability group in a single subnet, you can [migrate it to a multi-subnet environment](availability-group-manually-migrate-multi-subnet.md). 

This article explains how to create a load balancer for an Always On availability group on SQL Server Azure Virtual Machine. An availability group requires a load balancer when the SQL Server VMs are in a single subnet. The load balancer stores the IP address for the availability group listener. If an availability group spans multiple regions, each region needs a load balancer.

To complete this task, you need to already have an Always On availability group deployed to Azure VMs in the same availability set, or different availability zones. You can use a [Microsoft template](availability-group-quickstart-template-configure.md) to automatically create the availability group, which automatically creates an internal load balancer for you.

If you prefer, you can [manually configure an availability group](availability-group-manually-configure-tutorial-single-subnet.md).

View related articles:

- [Configure Always On availability groups in Azure VM](availability-group-manually-configure-tutorial-single-subnet.md)
- [Configure a VNet-to-VNet connection by using Azure Resource Manager and PowerShell](https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-vnet-vnet-rm-ps)

By walking through this article, you create and configure a load balancer in the Azure portal. After the process is complete, you configure the cluster to use the IP address from the load balancer for the availability group listener.

## Create & configure load balancer

In this portion of the task, do the following steps:

1. In the Azure portal, create the load balancer and configure the IP address.
1. Configure the back-end pool.
1. Create the probe.
1. Set the load-balancing rules.
1. If the SQL Server instances are in multiple resource groups and regions, perform each step twice, once in each resource group.

### Step 1: Create the load balancer and configure the IP address

First, create the load balancer.

1. In the Azure portal, open the resource group that contains the SQL Server virtual machines.

1. In the resource group, select **+ Create**.

1. Search for **load balancer**. Choose **Load Balancer** (published by **Microsoft**) in the search results.

1. On the **Load Balancer** pane, select **Create**.

1. Configure the following parameters for the load balancer.

   | Setting | Field |
   | --- | --- |
   | **Subscription** | Use the same subscription as the virtual machine. |
   | **Resource Group** | Use the same resource group as the virtual machine. |
   | **Name** | Use a text name for the load balancer, for example **sqlLB**. |
   | **Region** | Use the same region as the virtual machine. |
   | **Type** | Internal |

   > **Note:**
> The Basic load balancer has been retired. For new deployments, use the Standard load balancer. If you have an existing deployment that uses the Basic load balancer, [upgrade to the Standard load balancer](https://learn.microsoft.com/azure/load-balancer/load-balancer-basic-upgrade-guidance). 


1. Select **Next: Frontend IP Configuration**

1. Select **Add a frontend IP Configuration**

   Screenshot of Azure portal, Create load balancer page, showing frontend IP configuration tab.

1. Set up the frontend IP using the following values:

   - **Name**: A name that identifies the frontend IP configuration.
   - **Virtual network**: The same network as the virtual machines.
   - **Subnet**: The subnet as the virtual machines.
   - **IP address assignment**: Static.
   - **IP address**: Use an available address from subnet. **Use this address for your availability group listener**. Notice this is different from your cluster IP address.
   - **Availability zone**: Optionally choose an availability zone to deploy your IP to.

   The following image shows the **Add frontend IP Configuration** UI:

   Screenshot of Azure portal, add frontend IP configuration page.

1. Select **Add** to create the frontend IP.

1. Choose **Review + Create** to validate the configuration, and then **Create** to create the load balancer and the frontend IP.

Azure creates the load balancer. The load balancer belongs to a specific network, subnet, resource group, and location. After Azure completes the task, verify the load balancer settings in Azure.

To configure the load balancer, you need to create a backend pool, a probe, and set the load balancing rules. Do these in the Azure portal.

### Step 2: Configure the backend pool

Azure calls the back-end address pool *backend pool*. In this case, the backend pool is the addresses of the two SQL Server instances in your availability group.

1. In the Azure portal, go to your availability group. You might need to refresh the view to see the newly created load balancer.

   Screenshot of Azure portal, resource group page, searching for the Load Balancer.

1. Select the load balancer, select **Backend pools**, and select **+Add**.

1. Provide a **Name** for the Backend pool.

1. Select **NIC** for Backend Pool Configuration.

1. Select **Add** to associate the backend pool with the availability set that contains the VMs.

1. Under **Virtual machine** choose the SQL Server virtual machines that will host availability group replicas.

   > **Note:**  
   > If both virtual machines aren't specified, connections will only succeed to the primary replica.

1. Select **Add** to add the virtual machines to the backend pool.

1. Select **Save** to create the backend pool.

Azure updates the settings for the back-end address pool. Now your availability set has a pool of two SQL Server instances.

### Step 3: Create a probe

The probe defines how Azure verifies which of the SQL Server instances currently owns the availability group listener. Azure probes the service based on the IP address on a port that you define when you create the probe.

1. Select the load balancer, choose **Health probes**, and then select **+Add**.

1. Set the listener health probe as follows:

   | Setting | Description | Example |
   | --- | --- | --- |
   | **Name** | Text | SQLAlwaysOnEndPointProbe |
   | **Protocol** | Choose TCP | TCP |
   | **Port** | Any unused port | 59999 |
   | **Interval** | The amount of time between probe attempts in seconds | 5 |

1. Select **Add** to set the health probe.

> **Note:**  
> Make sure that the port you specify is open on the firewall of both SQL Server instances. Both instances require an inbound rule for the TCP port that you use. For more information, see [Add or Edit Firewall Rule](https://learn.microsoft.com/previous-versions/orphan-topics/ws.11/cc753558\(v=ws.11\)).
>

Azure creates the probe, and then uses it to test which SQL Server instance has the listener for the availability group.

### Step 4: Set the load-balancing rules

The load-balancing rules configure how the load balancer routes traffic to the SQL Server instances. For this load balancer, you enable direct server return because only one of the two SQL Server instances owns the availability group listener resource at a time.

1. Select the load balancer, choose **Load balancing rules**, and select **+Add**.

1. Set the listener load balancing rules as follows.

   | Setting | Description | Example |
   | --- | --- | --- |
   | **Name** | Text | SQLAlwaysOnEndPointListener |
   | **Frontend IP address** | Choose an address | Use the address that you created when you created the load balancer. |
   | **Backend pool** | Choose the backend pool | Select the backend pool containing the virtual machines targeted for the load balancer. |
   | **Protocol** | Choose TCP | TCP |
   | **Port** | Use the port for the availability group listener | 1433 |
   | **Backend Port** | This field isn't used when Floating IP is set for direct server return | 1433 |
   | **Health Probe** | The name you specified for the probe | SQLAlwaysOnEndPointProbe |
   | **Session Persistence** | Dropdown list | **None** |
   | **Idle Timeout** | Minutes to keep a TCP connection open | 4 |
   | **Floating IP (direct server return)** | A flow topology and an IP address mapping scheme | Enabled |

   > **Warning:**  
   > Direct server return is set during creation. It can't be changed.

1. Select **Save** to set the listener load balancing rules.

Azure configures the load-balancing rule. Now the load balancer is configured to route traffic to the SQL Server instance that hosts the listener for the availability group.

At this point, the resource group has a load balancer that connects to both SQL Server machines. The load balancer also contains an IP address for the SQL Server Always On availability group listener so that either machine can respond to requests for the availability groups.

> **Note:**  
> If your SQL Server instances are in two separate regions, repeat the steps in the other region. Each region requires a load balancer.

### Add the cluster core IP address for the Windows Server Failover Cluster (WSFC)

The WSFC IP address also needs to be on the load balancer. If you're using Windows Server 2019, skip this process as the cluster creates a **Distributed Server Name** instead of the **Cluster Network Name**.

1. In the Azure portal, go to the same Azure load balancer. Select **Frontend IP configuration**, and select **+Add**. Use the IP Address you configured for the WSFC in the cluster core resources. Set the IP address as static.

1. On the load balancer, select **Health probes**, and then select **+Add**.

1. Set the WSFC cluster core IP address health probe as follows:

   | Setting | Description | Example |
   | --- | --- | --- |
   | **Name** | Text | WSFCEndPointProbe |
   | **Protocol** | Choose TCP | TCP |
   | **Port** | Any unused port | 58888 |
   | **Interval** | The amount of time between probe attempts in seconds | 5 |

1. Select **Add** to set the health probe.

1. Set the load balancing rules. Select **Load balancing rules**, and select **+Add**.

1. Set the cluster core IP address load balancing rules as follows.

   | Setting | Description | Example |
   | --- | --- | --- |
   | **Name** | Text | WSFCEndPoint |
   | **Frontend IP address** | Choose an address | Use the address that you created when you configured the WSFC IP address. This is different from the listener IP address. |
   | **Backend pool** | Choose the backend pool | Select the backend pool containing the virtual machines targeted for the load balancer. |
   | **Protocol** | Choose TCP | TCP |
   | **Port** | Use the port for the cluster IP address. This is an available port that isn't used for the listener probe port. | 58888 |
   | **Backend Port** | This field isn't used when Floating IP is set for direct server return. | 58888 |
   | **Probe** | The name you specified for the probe. | WSFCEndPointProbe |
   | **Session Persistence** | Dropdown list. | **None** |
   | **Idle Timeout** | Minutes to keep a TCP connection open. | 4 |
   | **Floating IP (direct server return)** | A flow topology and an IP address mapping scheme. | Enabled |

   > **Warning:**  
   > Direct server return is set during creation. It can't be changed.

1. Select **OK** to set the load balancing rules.

## Configure the cluster to use the load balancer IP address

The next step is to configure the listener on the cluster and bring the listener online. Do the following steps:

1. Create the availability group listener on the failover cluster.

1. Bring the listener online.

### Step 5: Create the availability group listener on the failover cluster

In this step, you manually create the availability group listener in Failover Cluster Manager and SQL Server Management Studio.

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


### Verify the configuration of the listener

If the cluster resources and dependencies are correctly configured, you should be able to view the listener in SQL Server Management Studio. To set the listener port, do the following steps:

1. Start SQL Server Management Studio, and then connect to the primary replica.

1. Go to **Always On High Availability** > **Availability Groups** > **Availability Group Listeners**.

   You should now see the listener name that you created in Failover Cluster Manager.

1. Right-click the listener name, and then select **Properties**.

1. In the **Port** box, specify the port number for the availability group listener by using the $EndpointPort you used earlier (1433 was the default). Then select **OK**.

You now have an availability group in Azure virtual machines running in Resource Manager mode.

## Test the connection to the listener

Test the connection by doing the following steps:

1. Use [Bastion](https://learn.microsoft.com/azure/bastion/bastion-connect-vm-rdp-windows) to connect to a SQL Server instance that's in the same virtual network but doesn't own the replica. This server can be the other SQL Server instance in the cluster.

1. Use **sqlcmd** utility to test the connection. For example, the following script establishes a **sqlcmd** connection to the primary replica through the listener with Windows authentication:

   ```console
   sqlcmd -S <listenerName> -E
   ```

The SQLCMD connection automatically connects to the SQL Server instance that hosts the primary replica.

## Create an IP address for an additional availability group

Each availability group uses a separate listener. Each listener has its own IP address. Use the same load balancer to hold the IP address for additional listeners. Add only the primary IP address of the VM to the back-end pool of the load balancer as the [secondary VM IP address doesn't support floating IP](https://learn.microsoft.com/azure/load-balancer/load-balancer-floating-ip).

To add an IP address to a load balancer with the Azure portal, do the following steps:

1. In the Azure portal, open the resource group that contains the load balancer, and then select the load balancer.

1. Under **Settings**, select **Frontend IP configuration**, and then select **+ Add**.

1. Under **Add frontend IP address**, assign a name for the front end.

1. Verify that the **Virtual network** and the **Subnet** are the same as the SQL Server instances.

1. Set the IP address for the listener.

   > **Tip:**  
   > You can set the IP address to static and type an address that isn't currently used in the subnet. Alternatively, you can set the IP address to dynamic and save the new front-end IP pool. When you do so, the Azure portal automatically assigns an available IP address to the pool. You can then reopen the front-end IP pool and change the assignment to static.

1. Save the IP address for the listener by selecting **Add**.

1. Add a health probe selecting **Health probes** under **Settings** and use the following settings:

   | Setting | Value |
   | :--- | :--- |
   | **Name** | A name to identify the probe. |
   | **Protocol** | TCP |
   | **Port** | An unused TCP port, which must be available on all virtual machines. It can't be used for any other purpose. No two listeners can use the same probe port. |
   | **Interval** | The amount of time between probe attempts. Use the default (5). |

1. Select **Add** to save the probe.

1. Create a load-balancing rule. Under **Settings**, select **Load balancing rules**, and then select **+ Add**.

1. Configure the new load-balancing rule by using the following settings:

   | Setting | Value |
   | :--- | :--- |
   | **Name** | A name to identify the load-balancing rule. |
   | **Frontend IP address** | Select the IP address you created. |
   | **Backend pool** | The pool that contains the virtual machines with the SQL Server instances. |
   | **Protocol** | TCP |
   | **Port** | Use the port that the SQL Server instances are using. A default instance uses port 1433, unless you changed it. |
   | **Backend port** | Use the same value as **Port**. |
   | **Health probe** | Choose the probe you created. |
   | **Session persistence** | None |
   | **Idle timeout (minutes)** | Default (4) |
   | **Floating IP (direct server return)** | Enabled |

### Configure the availability group to use the new IP address

To finish configuring the cluster, repeat the steps that you followed when you made the first availability group. That is, configure the [cluster to use the new IP address](#configure-the-cluster-to-use-the-load-balancer-ip-address).

After you've added an IP address for the listener, configure the additional availability group by doing the following steps:

1. Verify that the probe port for the new IP address is open on both SQL Server virtual machines.

1. [In Cluster Manager, add the client access point](#addcap).

1. [Configure the IP resource for the availability group](#congroup).

   > **Important:**  
   > When you create the IP address, use the IP address that you added to the load balancer.

1. [Make the SQL Server availability group resource dependent on the client access point](#dependencyGroup).

1. [Make the client access point resource dependent on the IP address](#listname).

1. [Set the cluster parameters in PowerShell](#setparam).

If you're on the secondary replica VM and unable to connect to the listener, it's possible the probe port wasn't configured correctly.

You can use the following script to validate the probe port is correctly configured for the availability group:

```powershell
Clear-Host
Get-ClusterResource `
| Where-Object {$_.ResourceType.Name -like "IP Address"} `
| Get-ClusterParameter `
| Where-Object {($_.Name -like "Network") -or ($_.Name -like "Address") -or ($_.Name -like "ProbePort") -or ($_.Name -like "SubnetMask")}
```

## Add load-balancing rule for distributed availability group

If an availability group participates in a distributed availability group, the load balancer needs an additional rule. This rule stores the port used by the distributed availability group listener.

> **Important:**  
> This step only applies if the availability group participates in a [distributed availability group](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/configure-distributed-availability-groups).

1. On each server that participates in the distributed availability group, create an inbound rule on the distributed availability group listener TCP port. In many examples, documentation uses 5022.

1. In the Azure portal, select the load balancer and select **Load balancing rules**. Then select **+Add**.

1. Create the load balancing rule with the following settings:

   | Setting | Value |
   | :--- | :--- |
   | **Name** | A name to identify the load balancing rule for the distributed availability group. |
   | **Frontend IP address** | Use the same frontend IP address as the availability group. |
   | **Backend pool** | The pool that contains the virtual machines with the SQL Server instances. |
   | **Protocol** | TCP |
   | **Port** | 5022 - The port for the [distributed availability group endpoint listener](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/configure-distributed-availability-groups).<br /> Can be any available port. |
   | **Backend port** | 5022 - Use the same value as **Port**. |
   | **Health probe** | Choose the probe you created. |
   | **Session persistence** | None |
   | **Idle timeout (minutes)** | Default (4) |
   | **Floating IP (direct server return)** | Enabled |

Repeat these steps for the load balancer on the other availability groups that participate in the distributed availability groups.

If you have an Azure Network Security Group to restrict access, make sure that the allow rules include:

- The backend SQL Server VM IP addresses.
- The load balancer floating IP addresses for the AG listener.
- The cluster core IP address, if applicable.

## Related content

- [Windows Server Failover Cluster with SQL Server on Azure VMs](hadr-windows-server-failover-cluster-overview.md)
- [Always On availability group on SQL Server on Azure VMs](availability-group-overview.md)
- [Always On availability groups overview](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server)
- [HADR configuration best practices (SQL Server on Azure VMs)](hadr-cluster-best-practices.md)
