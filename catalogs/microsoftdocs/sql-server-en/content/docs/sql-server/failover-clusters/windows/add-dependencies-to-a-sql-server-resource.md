---
title: "Add dependencies to a SQL Server FCI resource"
description: "Add Dependencies to a SQL Server Resource"
author: MashaMSFT
ms.author: mathoma
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: failover-cluster-instance
ms.topic: how-to
helpviewer_keywords:
  - "resource dependencies [SQL Server]"
  - "failover clustering [SQL Server], dependencies"
  - "clusters [SQL Server], dependencies"
  - "dependencies [SQL Server], clustering"
---
# Add Dependencies to a SQL Server Resource

**Applies to:**
 

](../../sql-docs-navigation-guide.md#applies-to)
 
  This topic describes how to add dependencies to an Always On failover cluster instance (FCI) resource by using the Failover Cluster Manager snap-in. The Failover Cluster Manager snap-in is the cluster management application for the Windows Server Failover Clustering (WSFC) service.  
  
<a id="BeforeYouBegin"></a>

##  <a name="Restrictions"></a> Limitations and Restrictions  
 It is important to note that if you add any other resources to the  SQL Server 
 group, those resources must always have their own unique SQL network name resources and their own SQL IP address resources.  
  
 Do not use the existing SQL network name resources and SQL IP address resources for anything other than  SQL Server 
. If  SQL Server 
 resources are shared with other resources, the following problems may occur:  
  
-   Outages that are not expected may occur.  
  
-   Service pack installations may not be successful.  
  
-   The  SQL Server 
 Setup program may not be successful. If this problem occurs, you cannot install additional instances of  SQL Server 
 or perform routine maintenance.  
  
 Consider these additional issues:  
  
-   FTP with  SQL Server 
 replication: For instances of  SQL Server 
 that use FTP with  SQL Server 
 replication, your FTP service must use one of the same physical disks as the installation of  SQL Server 
 that is set up to use the FTP service.  
  
-    SQL Server 
 resource dependencies: If you add a resource to a  SQL Server 
 group and you have a dependency on the  SQL Server 
 resource to make sure that  SQL Server 
 is available,  Microsoft 
 recommends that you add a dependency on the  SQL Server 
 Agent resource. Do not add a dependency on the  SQL Server 
 resource. To make sure that the computer that is running  SQL Server 
 remains highly available, configure the  SQL Server 
 Agent resource so that it does not affect the  SQL Server 
 group if the  SQL Server 
 Agent resource fails.  
  
-   File shares and printer resources: When you install File Share resources or Printer cluster resources, they should not be put on the same physical disk resources as the computer that is running  SQL Server 
. If they are put on the same physical disk resources, you may experience performance degradation and loss of service to the computer that is running  SQL Server 
.  
  
-   MS DTC considerations: After you install the operating system and configure your FCI, you must configure  Microsoft 
 Distributed Transaction Coordinator (MS DTC) to work in a cluster by using the Failover Cluster Manager snap-in. Failure to cluster MS DTC will not block  SQL Server 
 Setup, but  SQL Server 
 application functionality may be affected if MS DTC is not properly configured.  
  
     If you install MS DTC in your  SQL Server 
 group and you have other resources that are dependent on MS DTC, MS DTC will not be available if this group is offline or during a failover.  Microsoft 
 recommends that you put MS DTC in its own group with its own physical disk resource, if it is possible.  
  
<a id="Prerequisites"></a>

## Prerequisites

If you install  SQL Server 
 into a WSFC resource group with multiple disk drives and choose to place your data on one of the drives, the  SQL Server 
 resource will be set to be dependent only on that drive. To put data or logs on another disk, you must first add a dependency to the  SQL Server 
 resource for the additional disk.  
  
##  <a name="WinClusManager"></a> Using the Failover Cluster Manager Snap-in  
 **To add a dependency to a SQL Server resource**  
  
-   Open the Failover Cluster Manager snap-in.  
  
-   Locate the group that contains the applicable  SQL Server 
 resource that you would like to make dependent.  
  
-   If the resource for the disk is already in this group, go to step 4. Otherwise, locate the group that contains the disk. If that group and the group that contains  SQL Server 
 are not owned by the same node, move the group containing the resource for the disk to the node that owns the  SQL Server 
 group.  
  
-   Select the  SQL Server 
 resource, open the **Properties** dialog box, and use the **Dependencies** tab to add the disk to the set of  SQL Server 
 dependencies.
