---
title: "Integration Services (SSIS) in a Cluster"
description: "Integration Services (SSIS) in a Cluster"
ms.date: "05/25/2025"
ms.service: sql
ms.subservice: integration-services
ms.topic: integration
---
# Integration Services (SSIS) in a Cluster


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Clustering  Integration Services 
 isn't recommended because the  Integration Services 
 service isn't a clustered or cluster-aware service, and doesn't support failover from one cluster node to another. However, in a clustered environment,  Integration Services 
 can be installed and started as a stand-alone service on each node in the cluster.  

> **Note:**
> Per SQL Server licensing terms, the software components of a single SQL Server license can't be separated. Any operating system environment (OSE) running any of the licensed components, including SQL Server Integration Services (SSIS), requires a license. Hence running SSIS on passive nodes require separate SQL license.  
>
> Further information regarding SQL Server licensing can be found in the [SQL Server licensing guide (download link)](https://go.microsoft.com/fwlink/p/?linkid=2215573).
  
 Although the  Integration Services 
 service isn't a clustered service, you can manually configure the service to operate as a cluster resource after you install  Integration Services 
 separately on each node of the cluster.  
  
 However, if high availability is your goal in establishing a clustered hardware environment, you can achieve this goal without configuring the  Integration Services 
 service as a cluster resource.  To manage your packages on any node in the cluster from any other node in the cluster, modify the configuration file for the  Integration Services 
 service on each node in the cluster. You modify each of these configuration files to point to all available instances of  SQL Server 
 on which packages are stored. This solution provides the high availability that most customers need, without the potential problems encountered when the  Integration Services 
 service is configured as a cluster resource. For more information about how to change the configuration file, see [Integration Services Service (SSIS Service)](integration-services-service-ssis-service.md).  
  
 Understanding the role of the  Integration Services 
 service is critical to making an informed decision about how to configure the service in a clustered environment. For more information, see [Integration Services Service (SSIS Service)](integration-services-service-ssis-service.md).  
  
## Disadvantages
 Some of the potential disadvantages of configuring the  Integration Services 
 service as a cluster resource include the following:  
  
-   **When a failover occurs, running packages do not restart.**
    
    You can recover from package failures by restarting packages from checkpoints. You can restart from checkpoints without configuring the service as a cluster resource. For more information, see [Restart Packages by Using Checkpoints](../packages/restart-packages-by-using-checkpoints.md).  
  
-   When you configure the  Integration Services 
 service in a different resource group from  SQL Server 
, you can't use  Management Studio
 from client computers to manage packages that are stored in the msdb database. The  Integration Services 
 service can't delegate credentials in this double-hop scenario.  
  
-   When you have multiple  SQL Server 
 resource groups that include the  Integration Services 
 service in a cluster, a failover could lead to unexpected results. Consider the following scenario. Group1, which includes the  SQL Server 
 service and the  Integration Services 
 service, is running on Node A. Group2, which also includes the  SQL Server 
 service and the  Integration Services 
 service, is running on Node B. Group 2 fails over to Node A. The attempt to start another instance of the  Integration Services 
 service on Node A fails because the  Integration Services 
 service is a single-instance service. Whether the  SQL Server 
 service that is trying to fail over to Node A also fails depends on the configuration of the  Integration Services 
 service in Group 2. If the  Integration Services 
 service was configured to affect the other services in the resource group, the  SQL Server 
 service that is failing over will fail because the  Integration Services 
 service failed. If the service was configured not to affect the other services in the resource group, the  SQL Server 
 service will be able to fail over to Node A.Unless the  Integration Services 
 service in Group 2 was configured not to affect the other services in the resource group, the failure of the  Integration Services 
 service that is failing over could cause the  SQL Server 
 service that is failing over to fail also.  

## Configure the Service as a Cluster Resource
For those customers who conclude that the advantages of configuring the  Integration Services 
 service as a cluster resource outweigh the disadvantages, this section contains the necessary configuration instructions. However,  Microsoft 
 doesn't recommend that the  Integration Services 
 service be configured as a cluster resource.  
  
 To configure the  Integration Services 
 service as a cluster resource, you need to complete the following tasks.  
  
-   Install  Integration Services 
 on a cluster.  
  
     To install  Integration Services 
 on a cluster, you must install  Integration Services 
 on each node in the cluster.  
  
-   Configure  Integration Services 
 as a cluster resource.  
  
     With Integration Services installed on each node in the cluster, you need to configure Integration Services as a cluster resource. When you configure the  Integration Services 
 service as a cluster resource, you can add the service to the same resource group as the  SQL Server Database Engine 
, or to a different group. The following table describes the possible advantages and disadvantages in selecting a resource group.  
  
    | When Integration Services and SQL Server are in the same resource group | When Integration Services and SQL Server are in different resource groups |
    | --- | --- |
    | Client computers can use  SQL Server Management Studio |
 to manage packages stored in the msdb database because both the  SQL Server Database Engine 
 and  Integration Services 
 service are running on the same virtual server. This configuration avoids the delegation issues of the double-hop scenario.|Client computers can't use  SQL Server Management Studio 
 to manage packages stored in the msdb database. The client can connect to the virtual server on which the  Integration Services 
 service is running. However, that computer can't delegate the user's credentials to the virtual server on which  SQL Server 
 is running. This is known as a double-hop scenario.|  
    |The  Integration Services 
 service competes with other  SQL Server 
 services for CPU and other computer resources.|The  Integration Services 
 service doesn't compete with other  SQL Server 
 services for CPU and other computer resources because the different resource groups are configured on different nodes.|  
    |The loading and saving of packages to the msdb database is faster and generates less network traffic because both services are running on the same computer.|The loading and saving of packages to the msdb database might be slower and generate more network traffic.|  
    |Both services are online or offline at the same time.|The  Integration Services 
 service might be online while the  SQL Server Database Engine 
 is offline. Thus, the packages stored in the msdb database of the  SQL Server Database Engine 
 are unavailable.|  
    |The  Integration Services 
 service can't be moved quickly to another node if it's required.|The  Integration Services 
 service can be moved more quickly to another node if it's required.|  
  
     After you have decided to which resource group you'll add  Integration Services 
, you have to configure  Integration Services 
 as a cluster resource in that group.  
  
-   Configure the  Integration Services 
 service and package store.  
  
     Having configured  Integration Services 
 as a cluster resource, you must modify the location and the content of the configuration file for the  Integration Services 
 service on each node in the cluster. These modifications make both the configuration file and the package store available to all nodes if there's a failover. After you modify the location and content of the configuration file, you have to bring the service online.  
  
-   Bring the  Integration Services 
 service online as a cluster resource.  
  
 After configuring the  Integration Services 
 service on a cluster, or on any server, you might have to configure DCOM permissions before you can connect to the service from a client computer. For more information, see [Integration Services Service (SSIS Service)](integration-services-service-ssis-service.md).  
  
 The  Integration Services 
 service can't delegate credentials. Therefore, you can't use  Management Studio
 to manage packages stored in the msdb database when the following conditions are true:  
  
-   The  Integration Services 
 service and  SQL Server 
 are running on separate servers or virtual servers.  
  
-   The client that is running  SQL Server Management Studio 
 is a third computer.  
  
 The client can connect to the virtual server on which the  Integration Services 
 service is running. However, that computer can't delegate the user's credentials to the virtual server on which  SQL Server 
 is running. This is known as a double-hop scenario.  
  
### To Install Integration Services on a Cluster  
  
1.  Install and configure a cluster with one or more nodes.  
  
2.  (Optional) Install clustered services, such as the  SQL Server Database Engine 
.  
  
3.  Install  Integration Services 
 on each node of the cluster.  
  
### To Configure Integration Services as a Cluster Resource  
  
1.  Open the **Cluster Administrator**.  
  
2.  In the console tree, select the Groups folder.  
  
3.  In the results pane, select the group to which you plan to add  Integration Services 
:  
  
    -   To add Integrations Services as a cluster resource to the same resource group as  SQL Server 
, select the group to which  SQL Server 
 belongs.  
  
    -   To add Integrations Services as a cluster resource to a different group than  SQL Server 
, select a group other than the group to which  SQL Server 
 belongs.  
  
4.  On the **File** menu, point to **New**, and then click **Resource**.  
  
5.  On the **New Resource** page of the Resource Wizard, type a name and select **"Generic Service"** as the **Service Type**. Don't change the value of **Group**. Click **Next**.  
  
6.  On the **Possible Owners** page, add or remove the nodes of the cluster as the possible owners of the resource. Click **Next**.  
  
7.  To add dependencies, on the **Dependencies** page, select a resource under **Available resources**, and then click **Add**. In case of a failover, both  SQL Server 
 and the shared disk that stores  Integration Services 
 packages should come back online before  Integration Services 
 is brought online. After you have selected the dependencies, click **Next**.  
  
     For more information, see [Add Dependencies to a SQL Server Resource](../../sql-server/failover-clusters/windows/add-dependencies-to-a-sql-server-resource.md).  
  
8.  On the **Generic Service Parameters** page, enter **MsDtsServer** as the name of the service. Click **Next**.  
  
9. On the **Registry Replication** page, click **Add** to add the registry key that identifies the location of the configuration file for the  Integration Services 
 service. This file must be located on a shared disk that is in the same resource group as the  Integration Services 
 service.  
  
10. In the **Registry Key** dialog box, type **SOFTWARE\Microsoft\Microsoft SQL Server\100\SSIS\ServiceConfigFile**. Click **OK**, and then click **Finish**.  
  
     The  Integration Services 
 service has now been added as a cluster resource.  
  
### To Configure the Integration Services Service and Package Store  
  
1.  Locate the configuration file at %ProgramFiles%\Microsoft SQL Server\100\DTS\Binn\MsDtsSrvr.ini.xml. Copy it to the shared disk for the group to which you added the  Integration Services 
 service.  
  
2.  On the shared disk, create a new folder named **Packages** to serve as the package store. Grant List Folders and Write permissions on the new folder to appropriate users and groups.  
  
3.  On the shared disk, open the configuration file in a text or XML editor. Change the value of the **ServerName** element to the name of the virtual  SQL Server 
 that is in the same resource group.  
  
4.  Change the value of the **StorePath** element to the fully-qualified path of the **Packages** folder created on the shared disk in a previous step.  
  
5.  On each node, update the value of **HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SQL Server\100\SSIS\ServiceConfigFile** in the Registry to the fully-qualified path and file name of the service configuration file on the shared disk.  
  
### To bring the Integration Services service online  
  
-   In the **Cluster Administrator**, select the  Integration Services 
 service, right-click, and select **Bring Online** from the popup menu. The  Integration Services 
 service is now online as a cluster resource.
