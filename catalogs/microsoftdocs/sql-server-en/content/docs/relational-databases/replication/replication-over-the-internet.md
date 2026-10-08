---
title: "Replication over the Internet"
description: "Replication over the Internet"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "Web publishing [SQL Server replication], about Web publishing"
  - "Web publishing [SQL Server replication]"
  - "Internet [SQL Server replication]"
  - "Internet [SQL Server replication], publishing"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Replication over the Internet

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  Replicating data over the Internet allows remote, disconnected users to access data when they need it using a connection to the Internet. Replicate data over the Internet using:  
  
-   A Virtual Private Network (VPN). For more information, see [Publish Data over the Internet Using VPN](publish-data-over-the-internet-using-vpn.md).  
  
-   The Web synchronization option for merge replication. For more information, see [Web Synchronization for Merge Replication](web-synchronization-for-merge-replication.md).  
  
 All types of  Microsoft 
  SQL Server 
 replication can replicate data over a VPN, but you should consider Web synchronization if you are using merge replication.
