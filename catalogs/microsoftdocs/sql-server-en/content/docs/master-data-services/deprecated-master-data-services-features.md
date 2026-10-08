---
title: Deprecated Features of Master Data Services
description: Deprecated Features of Master Data Services
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
monikerRange: ">=sql-server-ver16"
---
# Deprecated Features of Master Data Services


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  This topic describes the deprecated  Master Data Services 
 features. Future release will remove these features. Deprecated features shouldn't be used in new applications.
  
## Explicit Hierarchies, Collections, and Related Components  
 Explicit hierarchies, collections, and related components are deprecated. Members that before were modeled as consolidated member types (explicit hierarchy parent) and collection member types are modeled as leaf members in derived hierarchies. The following new features enable derived hierarchies to take the place of explicit hierarchies.  
  
-   Recursive Derived Hierarchies can now be used to assign member security permissions.  
  
     An explicit hierarchy is analogous to a recursive derived hierarchy with a single, nonrecursive level below the recursive level. A recursive derived hierarchy can be complex by including level below and/or above a recursive level.
  
-   In Explorer, the derived hierarchy page now shows unassigned (unused) members for each hierarchy level. Unused nodes are grouped by hierarchy level. Members can be moved between the Unused and Root nodes, by dragging and dropping or by cutting and pasting.  
  
     In System Administration, unused nodes are visible in the **Preview** pane. In Security, the unused nodes are visible in the **Hierarchy Member Permissions** pane. Any member whether under the **Root** node or **Unused** node, can be assigned a permission. The **Root**, **Unused**, and **Unused** pseudo members can also be assigned permissions.  
  
-   The stored procedure, mdm.udpConvertCollectionAndConsolidatedMembersToLeaf, converts explicit hierarchies to recursive derived hierarchies, and coverts consolidated and collection members to leaf members.  
  
     Explicit hierarchies and consolidated and collection member types are still supported, so running the stored procedure is optional. However, if you use these items it's recommended that you run the stored procedure because they are deprecated. However, if you use these items it is recommended that you run the stored procedure because they're deprecated.
  
 For information about explicit hierarchies, collections, and consolidated members see the following topics.  
  
-   [Explicit Hierarchies (Master Data Services)](explicit-hierarchies-master-data-services.md)  
  
-   [Collections (Master Data Services)](collections-master-data-services.md)  
  
-   [Members (Master Data Services)](members-master-data-services.md)  
  
## Attribute Entity Transaction Log Type  
Entity transaction log type "Attribute" is deprecated, migrate to the "Member" entity transaction log type. For information about entity transaction log types, see the following topic:
* [Change the Entity Transaction Log Type (Master Data Services)](change-the-entity-transaction-log-type-master-data-services.md)
* [Member Revision History](member-revision-history-master-data-services.md)
  
## Related content

- [Deprecated: Explicit Hierarchies and Collections](https://techcommunity.microsoft.com/t5/sql-server-integration-services/deprecated-explicit-hierarchies-and-collections/ba-p/388221)
- [Discontinued Features of Master Data Services](discontinued-master-data-services-features.md)
