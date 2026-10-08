---
title: Multi-Lingual and Global Deployments
description: Master Data Services supports deployment of components and tools in all languages supported by SQL Server.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
---
# Multi-Lingual and Global Deployments (Master Data Services)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


   Master Data Services 
 supports deployment of components and tools in all languages supported by  SQL Server 
. For more information, see [Local Language Versions in SQL Server](../../sql-server/install/local-language-versions-in-sql-server.md).  
  
## How languages are used  
 The following table describes the language support for the  Master Data Services 
 components and tools.  
  
| Component or Tool | Description |
| --- | --- |
| Master Data Services |
 | Setup | Select the English Setup program when you want the  Master Data Manager |
 | web application to be available and supported in languages that differ from the Setup language. For more information, see the  Master Data Manager |
 | description below. |
| Master Data Services Configuration Manager |
| The Setup language determines the  Master Data Services Configuration Manager |
 | language. For example, if you choose German for the Setup language,  Master Data Services Configuration Manager |
 | is available in German on that computer. |
| Master Data Manager |
| When you run Setup in English, the  Master Data Manager |
 | web application is available and supported in all application languages.  Master Data Manager |
 | can display in any of those application languages and accept locale-specific input based on the language preferences of the client web browser. If the language preferences are configured for a non-supported application language,  Master Data Manager |
 | defaults to English.<br /><br /> When you run Setup in a language other than English, resources are included for the all other application languages but it is not a supported scenario for clients to use  Master Data Manager |
 | in a language other than the selected Setup language. If you try to access  Master Data Manager |
 | in a language different from the Setup language, you might experience problems with data display and input in the application. |
| Master Data Services |
 | database | Information in the  Master Data Services |
 | database is not specific to any locale. This enables  Master Data Manager |
 | to determine how to display information, such as dates and numbers, in the format determined by the language preferences of the client web browser. |
  
## Related content

- [Installation Tasks for Master Data Services](install-master-data-services.md)
