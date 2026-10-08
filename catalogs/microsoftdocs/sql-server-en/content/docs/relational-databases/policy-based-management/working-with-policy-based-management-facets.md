---
title: "Working with Policy-Based Management Facets"
description: "Working with Policy-Based Management Facets"
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: security
ms.topic: concept-article
helpviewer_keywords:
  - "viewing Policy-Based Management facets"
  - "facets [Policy-Based Management], copying"
  - "facets [Policy-Based Management], viewing"
  - "copying Policy-Based Management facets"
---
# Working with Policy-Based Management Facets
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  A Policy-Based Management facet is a set of logical properties that are related to an area of management interest.  SQL Server 
 includes several predefined facets. For example, the Surface Area Configuration facet defines, as properties, the features that are off by default.  
  
 When you manage many similar  SQL Server 
 environments, you can configure a facet in one instance of  SQL Server 
, copy the state of the facet to a file, and then import that file into another instance of  SQL Server 
 as a policy. When the state has been converted to a policy, the policy can be applied to other instances of  SQL Server 
, instance objects, databases, or database objects.  
  
 This topic describes how to copy the state of a facet to an XML file.  
  
<a id="Permissions"></a>

## Permissions

The procedures in this topic require membership in the PolicyAdministratorRole role in the msdb database.  
  
## Viewing and Copying Facet States  
 [View the Policy-Based Management Facets on a SQL Server Object](view-the-policy-based-management-facets-on-a-sql-server-object.md)  
  
 [Copy a Policy-Based Management Facet State to an XML File](copy-a-policy-based-management-facet-state-to-an-xml-file.md)  
  
## Related content

- [Administer Servers by Using Policy-Based Management](administer-servers-by-using-policy-based-management.md)
