---
title: "SQL Server Multi-Subnet Clustering"
description: Learn about configuring a SQL Server failover cluster instance in a multi-subnet environment, which provides disaster recovery in addition to high availability.
author: MashaMSFT
ms.author: mathoma
ms.date: 08/25/2025
ms.service: sql
ms.subservice: failover-cluster-instance
ms.topic: concept-article
ms.custom:
  - sfi-image-nochange
helpviewer_keywords:
  - "stretch cluster"
  - "Availability Groups [SQL Server], WSFC clusters"
  - "failover clustering [SQL Server], AlwaysOn Availability Groups"
  - "failover clustering [SQL Server], Always On Availability Groups"
  - "multi-site failover cluster"
  - "failover clustering [SQL Server]"
---
# SQL Server multi-subnet clustering


**Applies to:**
 

](../../sql-docs-navigation-guide.md#applies-to)
 

A  SQL Server 
 multi-subnet failover cluster is a configuration in which each failover cluster node is connected to a different subnet or a different set of subnets. These subnets can be in the same location or in geographically dispersed sites. Clusters in geographically dispersed sites are sometimes referred to as *stretch clusters*. Because there's no shared storage that all the nodes can access, data should be replicated between the data storage on the multiple subnets. When you replicate data, there's more than one copy of the data available. Therefore, a multi-subnet failover cluster provides a disaster recovery solution in addition to high availability.

<a id="VisualElement"></a>

## SQL Server multi-subnet failover cluster (two nodes, two subnets)
 The following illustration represents a two-node, two-subnet failover cluster instance (FCI) in  SQL Server 
.

Diagram that shows a multi-subnet architecture with MultiSubnetFailover.

<a id="Configurations"></a>

## Multi-subnet failover cluster instance configurations

Following are some examples of  SQL Server 
 FCIs that use multiple subnets:

-    SQL Server 
 FCI SQLCLUST1 includes Node1 and Node2. Node1 is connected to Subnet1. Node2 is connected to Subnet2.  SQL Server 
 Setup sees this configuration as a multi-subnet cluster and sets the IP address resource dependency to `OR`.

-    SQL Server 
 FCI SQLCLUST2 includes Node1, Node2, and Node3. Node1 and Node2 are connected to Subnet1. Node 3 is connected to Subnet2.  SQL Server 
 Setup sees this configuration as a multi-subnet cluster and sets the IP address resource dependency to `OR`. Because Node1 and Node2 are on the same subnet, this configuration provides additional local high availability.

-    SQL Server 
 FCI SQLCLUST3 includes Node1 and Node2. Node1 is on Subnet1. Node2 is on Subnet1 and Subnet2.  SQL Server 
 Setup sees this configuration as a multi-subnet cluster and sets the IP address resource dependency to `OR`.

-    SQL Server 
 FCI SQLCLUST4 includes Node1 and Node2. Node1 is connected to Subnet1 and Subnet2. Node2 is also connected to Subnet1 and Subnet2.  SQL Server 
 Setup sets the IP address resource dependency to `AND`.

    > [!NOTE]  
    > This configuration isn't considered a multi-subnet failover cluster configuration because the clustered nodes are on the same set of subnets.

<a id="ComponentsAndConcepts"></a>

## IP address resource considerations

 In a multi-subnet failover cluster configuration, the IP addresses aren't owned by all the nodes in the failover cluster, and they might not all be online during  SQL Server 
 startup. Starting in  SQL Server 2012 (11.x) 
, you can set the IP address resource dependency to `OR`. Doing so enables  SQL Server 
 to be online when there's at least one valid IP address that it can bind to.

  > **Note:**  
  > In  SQL Server 
 versions earlier than  SQL Server 2012 (11.x) 
, a stretch V-LAN technology was used in multi-site cluster configurations to expose a single IP address for failover across sites. Now that SQL Server can cluster nodes across different subnets, you can configure  SQL Server 
 failover clusters across multiple sites without implementing the stretch V-LAN technology.

### IP address resource OR dependency considerations

 You might want to consider the following failover behavior if you set the IP address resource dependency to `OR`:

-   When there's a failure of one of the IP addresses on the node that currently owns the  SQL Server 
 cluster resource group, a failover isn't triggered automatically until all the IP addresses valid on that node fail.

-   When a failover occurs,  SQL Server 
 comes online if it can bind to at least one IP address that's valid on the current node. The IP addresses that didn't bind to  SQL Server 
 at startup will be listed in the error log.

 When a  SQL Server 
 FCI is installed side-by-side with a standalone instance of the  SQL Server Database Engine 
, be careful to avoid TCP port number conflicts on the IP addresses. Conflicts usually occur when two instances of the  Database Engine 
 are configured to use the default TCP port (1433). To avoid conflicts, configure one instance to use a nondefault fixed port. Configuring a fixed port is usually easier on the standalone instance. Configuring the  Database Engine 
 to use different ports prevents an unexpected IP address / TCP port conflict that blocks an instance startup when a  SQL Server 
 FCI fails to the standby node.

<a id="DNS"></a>

## Client recovery latency during failover

 By default, a multi-subnet FCI enables the RegisterAllProvidersIP cluster resource for its network name. In a multi-subnet configuration, the online and offline IP addresses of the network name are both registered at the DNS server. The client application then retrieves all registered IP addresses from the DNS server and attempts to connect to the addresses, either in order or in parallel. This means that client recovery time in multi-subnet failovers no longer depends on DNS update latencies. By default, the client tries the IP addresses in order. When the client uses the optional `MultiSubnetFailover=True` parameter in its connection string, it instead tries the IP addresses simultaneously and connects to the first server that responds. This configuration can help minimize the client recovery latency when failovers occur. For more information, see [Always On client connectivity (SQL Server)](../../../database-engine/availability-groups/windows/always-on-client-connectivity-sql-server.md) and [Create or configure an availability group listener (SQL Server)](../../../database-engine/availability-groups/windows/create-or-configure-an-availability-group-listener-sql-server.md).

 With legacy client libraries or non-Microsoft data providers, you can't use the **MultiSubnetFailover** parameter in your connection string. To help ensure that your client application works optimally with multi-subnet FCI in  SQL Server 
, try to adjust the connection timeout in the client connection string by 21 seconds for each additional IP address. This configuration ensures that the client's reconnection attempt doesn't time out before it can cycle through all IP addresses in your multi-subnet FCI.

 The default client connection timeout period for  SQL Server 
 Management Studio and **sqlcmd** is 15 seconds.

 > **Note:**  
 > If you're using multiple subnets and have a static DNS, you need to have a process in place to update the DNS record associated with the listener before you perform a failover. Otherwise the network name won't come online.

## Configure SQL Server Agent for multi-subnet failover and failover cluster instances

When you configure a multi-subnet failover cluster instance on a custom port (other than 1433), the initial SQL Server Agent connection uses `MultiSubnetFailover=Yes`. When you configure SQL Server Agent, consider using a local alias on each node to route to the non-default TCP port. For more information, see [Problem: SQL Server Agent can't connect to a multi-subnet failover cluster instance on a custom port](failover-cluster-troubleshooting.md#problem-sql-server-agent-cant-connect-to-a-multi-subnet-failover-cluster-instance-on-a-custom-port).

<a id="RelatedContent"></a>

## Related content

- [Create a New Always On Failover Cluster Instance (Setup)](../install/create-a-new-sql-server-failover-cluster-setup.md)
- [Upgrade a failover cluster instance](upgrade-a-sql-server-failover-cluster-instance.md)
- [Add or remove nodes in a failover cluster instance (Setup)](../install/add-or-remove-nodes-in-a-sql-server-failover-cluster-setup.md)
- [View events and logs for a failover cluster](https://technet.microsoft.com/library/cc772342(WS.10).aspx)
- [Get-ClusterLog failover cluster cmdlet](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/ee461045\(v=technet.10\))
