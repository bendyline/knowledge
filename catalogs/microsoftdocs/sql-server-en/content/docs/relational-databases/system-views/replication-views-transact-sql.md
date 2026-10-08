---
title: "Replication Views (Transact-SQL)"
description: Replication views contain information that is used by replication in SQL Server. The views enable easier access to data in replication system tables.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
helpviewer_keywords:
  - "distribution databases [SQL Server replication], system views"
  - "metadata [SQL Server], views"
  - "views [SQL Server], replication"
  - "replication views [SQL Server]"
  - "publications [SQL Server replication], system views"
  - "articles [SQL Server replication], system views"
  - "replication metadata [SQL Server]"
  - "subscriptions [SQL Server replication], system views"
  - "system views [SQL Server], replication"
dev_langs:
  - "TSQL"
---
# Replication Views (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  These views contain information that is used by replication in  Microsoft 
  SQL Server 
. The views enable easier access to data in [replication system tables](../system-tables/replication-tables-transact-sql.md). Views are created in a user database when that database is enabled as a publication or subscription database. All replication objects are removed from user databases when the database is removed from a replication topology. The preferred method for accessing replication metadata is by using [Replication Stored Procedures](../system-stored-procedures/replication-stored-procedures-transact-sql.md).  
  
> **Important:**  
>  System views should not be altered directly by any user.  
  
## Replication Views  
 The following is a list of the system views used by replication, grouped by database.  
  
### Replication Views in the msdb Database  



        [MSdatatype_mappings &#40;Transact-SQL&#41;](../../relational-databases/system-views/msdatatype-mappings-transact-sql.md)


        [sysdatatypemappings &#40;Transact-SQL&#41;](../../relational-databases/system-views/sysdatatypemappings-transact-sql.md)



### Replication Views in the Distribution Database  



        [IHextendedArticleView &#40;Transact-SQL&#41;](../../relational-databases/system-views/ihextendedarticleview-transact-sql.md)

        [IHextendedSubscriptionView &#40;Transact-SQL&#41;](../../relational-databases/system-views/ihextendedsubscriptionview-transact-sql.md)

        [IHsyscolumns &#40;Transact-SQL&#41;](../../relational-databases/system-views/ihsyscolumns-transact-sql.md)

        [MSdistribution_status &#40;Transact-SQL&#41;](../../relational-databases/system-views/msdistribution-status-transact-sql.md)

        [sysarticlecolumns &#40;System View&#41; &#40;Transact-SQL&#41;](../../relational-databases/system-views/sysarticlecolumns-system-view-transact-sql.md)
    :::column-end:::
    :::column:::
        [sysarticles &#40;System View&#41; &#40;Transact-SQL&#41;](../../relational-databases/system-views/sysarticles-system-view-transact-sql.md)

        [sysextendedarticlesview &#40;Transact-SQL&#41;](../../relational-databases/system-views/sysextendedarticlesview-transact-sql.md)

        [syspublications &#40;System View&#41; &#40;Transact-SQL&#41;](../../relational-databases/system-views/syspublications-system-view-transact-sql.md)

        [syssubscriptions &#40;System View&#41; &#40;Transact-SQL&#41;](../../relational-databases/system-views/syssubscriptions-system-view-transact-sql.md)
    :::column-end:::


### Replication Views in the Publication Database  



        [sysmergeextendedarticlesview &#40;Transact-SQL&#41;](../../relational-databases/system-views/sysmergeextendedarticlesview-transact-sql.md)

        [systranschemas &#40;Transact-SQL&#41;](../../relational-databases/system-views/systranschemas-transact-sql.md)
    :::column-end:::
    :::column:::
        [sysmergepartitioninfoview &#40;Transact-SQL&#41;](../../relational-databases/system-views/sysmergepartitioninfoview-transact-sql.md)
    :::column-end:::


### Replication Views in the Subscription Database  



        [sysmergeextendedarticlesview &#40;Transact-SQL&#41;](../../relational-databases/system-views/sysmergeextendedarticlesview-transact-sql.md)

        [sysmergepartitioninfoview &#40;Transact-SQL&#41;](../../relational-databases/system-views/sysmergepartitioninfoview-transact-sql.md)
    :::column-end:::
    :::column:::
        [systranschemas &#40;Transact-SQL&#41;](../../relational-databases/system-views/systranschemas-transact-sql.md)
    :::column-end:::

  
## Related content

- [Replication Tables (Transact-SQL)](../system-tables/replication-tables-transact-sql.md)
