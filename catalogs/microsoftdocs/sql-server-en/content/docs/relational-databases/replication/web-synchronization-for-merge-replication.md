---
title: "Web Synchronization for Merge Replication"
description: "Web Synchronization for Merge Replication"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "merge replication synchronization [SQL Server replication]"
  - "Internet [SQL Server replication], synchronization"
  - "synchronization [SQL Server replication], Web Synchronization"
  - "Web publishing [SQL Server replication], synchronization"
  - "Web synchronization, about"
  - "Web synchronization"
---
# Web Synchronization for Merge Replication
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Web synchronization for merge replication lets you replicate data by using the HTTPS protocol, and is useful for the following scenarios:  
  
-   Synchronizing data from mobile users over the Internet.  
  
-   Synchronizing data between  Microsoft 
  SQL Server 
 databases across a corporate firewall.  
  
 For example, a traveling sales representative can use Web synchronization. The company,  Adventure Works Cycles 
, has sales representatives that travel to various stores and suppliers throughout their regions. On longer trips the representatives stay in hotels and need a convenient way to upload sales data and download any product updates at the end of each day.  
  
 The  Adventure Works 
 IT department has configured each portable computer with  SQL Server 
 and has enabled merge replication to use Web synchronization. The Merge Agent on each portable computer has an Internet URL that points to the replication components that are installed on a computer that is running  Microsoft 
 Internet Information Services (IIS). These components synchronize the Subscriber with the Publisher. Each representative can now connect through any available Internet connection without using a remote dial-up connection, and can upload and download the appropriate data. The Internet connection uses Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL); therefore, a virtual private network (VPN) is not required.  
  
 For information about how to configure the components that are required for Web synchronization, see [Configure Web Synchronization](configure-web-synchronization.md), [Configure IIS for Web Synchronization](configure-iis-7-for-web-synchronization.md), and [Configure IIS 7 for Web Synchronization](configure-iis-7-for-web-synchronization.md).  
  
> **Note:**  
>  Web synchronization is designed for synchronizing data with portable computers, handheld devices, and other clients. Web synchronization is not intended for high-volume server-to-server applications.  
  
## Overview of How Web Synchronization Works  
 When Web synchronization is used, updates at the Subscriber are packaged and sent as an XML message to the computer that is running IIS by using the HTTPS protocol. The computer that is running IIS then sends the commands to the Publisher in a binary format, typically by using TCP/IP. Updates at the Publisher are sent to the computer that is running IIS and then packaged as an XML message for delivery to the Subscriber.  
  
 The following illustration shows some of the components that are involved in Web synchronization for merge replication.  
  
 Web synchronization components and data flow  
  
 Web synchronization is an option only for pull subscriptions; therefore, a Merge Agent will always run on the Subscriber. This Merge Agent can be the standard Merge Agent, the Merge Agent ActiveX control, or an application that provides synchronization through Replication Management Objects (RMO). To specify the location of the computer that is running IIS, use the **–InternetUrl** parameter for the Merge Agent.  
  
 The  SQL Server 
 Replication Listener (Replisapi.dll) is configured on the computer that is running IIS and is responsible for handling messages that are sent to the server from the Publisher and Subscribers. Each node in the topology handles the XML data stream by using the Merge Replication Reconciler (Replrec.dll).  
  
  SQL Server 2005 (9.x) 
 or a later version is required for all computers that participate in Web synchronization.  
  
### Synchronization Process  
 The following steps occur during synchronization:  
  
1.  The Merge Agent is started at the Subscriber. The agent does the following:  
  
    1.  Makes a SQL connection to the subscription database.  
  
    2.  Extracts any changes from the database.  
  
    3.  Makes an HTTPS request to the computer that is running IIS.  
  
    4.  Uploads data changes as an XML message.  
  
2.  The  SQL Server 
 Replication Listener and Merge Replication Reconciler that are hosted on the computer that is running IIS do the following:  
  
    1.  Respond to the HTTPS request.  
  
    2.  Make a SQL connection to the publication database.  
  
    3.  Apply the upload changes to the publication database.  
  
    4.  Extract the download changes for the Subscriber.  
  
    5.  Send an HTTPS response back to the Merge Agent.  
  
3.  The Merge Agent at the Subscriber then accepts the HTTPS response and applies the download changes to the subscription database.  
  
## Related content

- [Configure Web Synchronization](configure-web-synchronization.md)
- [Topologies for Web Synchronization](topologies-for-web-synchronization.md)
