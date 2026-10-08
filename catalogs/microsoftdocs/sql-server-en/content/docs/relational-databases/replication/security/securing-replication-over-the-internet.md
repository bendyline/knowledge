---
title: "Securing Replication Over the Internet"
description: "Securing Replication Over the Internet"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "security [SQL Server replication], Internet"
  - "Internet [SQL Server replication], security"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Securing Replication Over the Internet

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  Replication over the Internet can provide flexibility, particularly for mobile Subscribers, but you must configure Internet replication appropriately to ensure adequate security.  Microsoft 
 recommends using one of two techniques for securely sharing information over the Internet:  
  
-   Virtual private network (VPN)  
  
-   The Web synchronization option for merge replication  
  
## Virtual Private Network  
 Virtual private networks provide a simple and secure layered approach to replicating  SQL Server 
 data over the Internet. The VPN connection over the Internet logically operates as a Wide Area Network (WAN) link between the sites.  
  
 This is achieved by allowing the user to tunnel through the Internet or another public network using a protocol such as  Microsoft 
 Point-to-Point Tunneling Protocol (PPTP) available with the  Microsoft 
 Windows NT version 4.0 or  Microsoft 
 Windows 2000 operating system, or Layer Two Tunneling Protocol (L2TP) available with the Windows 2000 operating system. This process provides security and features similar to those available in a private network.  
  
 For more information about setting up a VPN, see the  Microsoft 
 Windows documentation.  
  
## Web Synchronization Through IIS  
 The web synchronization option for merge replication provides the ability to replicate data using the HTTPS protocol, which can be a convenient approach to replicating data through a firewall. For more information, see [Configure Web Synchronization](../configure-web-synchronization.md) and [Security Architecture for Web Synchronization](security-architecture-for-web-synchronization.md).  
  
## Related content

- [Replication Security Best Practices](replication-security-best-practices.md)
- [View and modify replication security settings](view-and-modify-replication-security-settings.md)
