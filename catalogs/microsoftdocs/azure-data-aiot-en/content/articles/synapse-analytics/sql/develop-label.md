---
title: Use query labels in Synapse SQL
description: Included in this article are essential tips for using query labels in Synapse SQL.
author: filippopovic
ms.author: fipopovi
ms.date: 04/15/2020
ms.service: azure-synapse-analytics
ms.subservice: sql
ms.topic: how-to
---

# Use query labels in Synapse SQL

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

Included in this article are essential tips for using query labels in Synapse SQL.

> **Note:**
> Serverless SQL pool doesn't support labelling queries.

## What are query labels

Dedicated SQL pool supports a concept called query labels. Before going into any depth, let's look at an example:

```sql
SELECT *
FROM sys.tables
OPTION (LABEL = 'My Query Label')
;
```

The last line tags the string 'My Query Label' to the query. This tag is helpful since the label is query-able through the DMVs. Querying for labels provides a mechanism for locating problem queries and helps to identify progress through an ELT run.

Good naming conventions are most helpful. For example, starting the label with PROJECT, PROCEDURE, STATEMENT, or COMMENT uniquely identifies the query among all the code in source control.

The following query uses a dynamic management view to search by label:

```sql
SELECT  *
FROM    sys.dm_pdw_exec_requests r
WHERE   r.[label] = 'My Query Label'
;
```

> **Note:**
> It is essential to put square brackets or double quotes around the word label when querying. Label is a reserved word and causes an error when it is not delimited. 
> 
> 

## Next steps
For more development tips, see [development overview](develop-overview.md).
