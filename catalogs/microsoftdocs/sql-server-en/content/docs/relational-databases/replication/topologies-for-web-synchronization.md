---
title: "Topologies for Web Synchronization"
description: "Topologies for Web Synchronization"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "Web synchronization, topologies"
  - "IIS server configuration [SQL Server replication]"
---
# Topologies for Web Synchronization
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  You can choose from a variety of  Microsoft 
  SQL Server 
 Web synchronization replication topologies. Common ways to configure Web synchronization include:  
  
-   Single server  
  
-   Two servers  
  
-   Multiple  Microsoft 
 Internet Information Services (IIS) systems and  SQL Server 
 republishing  
  
 For information about configuring Web synchronization, see [Configure Web Synchronization](configure-web-synchronization.md).  
  
## Single Server  
 In the simplest topology, IIS, the  SQL Server 
 Publisher, and the  SQL Server 
 Distributor all reside on a single server. Subscribers synchronize by connecting to IIS on the Publisher. The Publisher can be located behind a firewall.  
  
> **Note:**  
>  This configuration is recommended only for intranet scenarios. For other scenarios, it is recommended that the IIS server and  SQL Server 
 Publisher/Distributor be on separate computers.  
  
 Web synchronization with a single server  
  
## Two Servers  
 You can place IIS on one server and configure the  SQL Server 
 Publisher and Distributor on another server. The server running IIS can be isolated from the Internet by a firewall. Subscribers synchronize by connecting to IIS.  
  
 Web synchronization with two servers  
  
## Multiple IIS Systems and SQL Server Republishing  
 If you need to support very large numbers of Subscribers that synchronize at the same time, you can partition the work across multiple computers running IIS.  
  
 Web synchronization with multiple IIS servers  
  
 If further load balancing is required on the computer running  SQL Server 
, you can create a republishing hierarchy on multiple computers. The top-level Publisher publishes data to Subscribers, which in turn republish the data, load balancing requests from the Subscribers.  
  
> **Note:**  
>  Subscribers can only synchronize with a specific Publisher. For example, a Subscriber to republisher A cannot synchronize with republisher B when A is not available.  
  
 Web synchronization with republishing  
  
## Related content

- [Configure Web Synchronization](configure-web-synchronization.md)
- [Web Synchronization for Merge Replication](web-synchronization-for-merge-replication.md)
