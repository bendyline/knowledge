---
title: "Building a Knowledge Base"
description: "Building a Knowledge Base"
ms.date: "07/31/2012"
ms.service: sql
ms.subservice: data-quality-services
ms.topic: concept-article
ms.custom:
  - build-2025
---
# Building a Knowledge Base


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Important:**  
> Data Quality Services (DQS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support DQS in  SQL Server 2022 (16.x) 
 and earlier versions.


  A knowledge base in  Data Quality Services 
 (DQS) is a repository of knowledge about your data that enables you to understand your data and maintain its integrity. A knowledge base consists of domains, each of which represents the data in a data field. The knowledge base is used by DQS to perform data cleansing and deduplication on a database. To prepare the knowledge base for data cleansing, you can run a computer-assisted analysis of a data sample, and interactively manage values in the domains. DQS enables you to import knowledge, create rules and relationships, change data values directly, and use a default database.  
  
## In This Section  
 You can perform the following operations on a knowledge base:  
  
| Operation Description | Topic |
| --- | --- |
| Create a new knowledge base from scratch, from an existing knowledge base, or from a .dqs data file. | [Create a Knowledge Base](create-a-knowledge-base.md) |
| Open an existing knowledge base to perform knowledge discovery, domain management, or add a matching policy. | [Open a Knowledge Base](open-a-knowledge-base.md) |
| Perform management actions on a knowledge base, including opening it, unlocking it, discarding your work on it, renaming it, deleting it, or viewing its properties. | [Manage a Knowledge Base](manage-a-knowledge-base.md) |
| Add knowledge to a knowledge base through knowledge discovery; domain value management; adding a matching policy; importing a knowledge, domain, or values; or using the default knowledge base, DQS Data. | [Adding Knowledge to a Knowledge Base](adding-knowledge-to-a-knowledge-base.md) |
| Analyze a data sample for data quality criteria. | [Perform Knowledge Discovery](perform-knowledge-discovery.md) |
  
## Related Tasks  
  
| Task Description | Topic |
| --- | --- |
| Importing knowledge into, or exporting it from, a knowledge base. | [Importing and Exporting Knowledge](importing-and-exporting-knowledge.md) |
| Creating a single domain, and adding knowledge to the domain. | [Managing a Domain](managing-a-domain.md) |
| Creating a composite domain, and adding knowledge to the domain. | [Managing a Composite Domain](managing-a-composite-domain.md) |
