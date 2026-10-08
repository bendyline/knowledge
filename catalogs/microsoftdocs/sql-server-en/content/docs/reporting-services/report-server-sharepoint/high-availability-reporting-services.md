---
title: "High availability in SQL Server Reporting Services"
description: Learn about the best way to ensure the availability of Reporting Services functionality in SQL Server.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server-sharepoint
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# High availability in SQL Server Reporting Services

A  Reporting Services 
 report server is a stateless server that stores application data, content, properties, and session information in two  SQL Server 
 relational databases. As such, the best way to ensure the availability of  Reporting Services 
 functionality is to do the following actions:  
  
-   Use the high availability features of the  SQL Server 
  Database Engine 
 to maximize the uptime of the report server databases. If you configure a  Database Engine 
 instance to run in a failover cluster, you can select that instance when you create a report server database.  
  
-   Use  SQL Server 
  Always On availability groups 
 with the  Reporting Services 
 databases and for data sources, as possible. For more information, see [Reporting Services with Always On Availability Groups](../../database-engine/availability-groups/windows/reporting-services-with-always-on-availability-groups-sql-server.md).  
  
-   Configure multiple report servers to run in a scale-out deployment, where all the servers share a single report server database. You can deploy multiple report server instances, preferably on different servers, in a scale-out deployment to help provide uninterrupted service in the event one of the report server instances goes down.  
  
 A scale-out deployment provides a way to share a database. If one report server goes down, other servers in the same deployment continue to work.  
  
  Reporting Services 
 isn't cluster-aware. By itself, a scale-out deployment doesn't provide load balancing; it doesn't detect the processing loads on a report server and route new processing requests to the least busy server. It doesn't reroute processing requests that failed before completion. To get load balancing features, you must configure load balancing for the Web servers that host the report servers. You must then configure the report servers in a scale-out deployment so that they share the same report server database.  
  
 The Report Server Web service and Windows service are tightly integrated and run together as a single report server instance. You can't configure availability for one service separately from the other.  

More questions? [Try asking the Reporting Services forum](https://learn.microsoft.com/answers/search.html?c=\&f=\&includeChildren=\&q=ssrs+OR+reporting+services\&redirect=search%2fsearch\&sort=relevance\&type=question+OR+idea+OR+kbentry+OR+answer+OR+topic+OR+user)
