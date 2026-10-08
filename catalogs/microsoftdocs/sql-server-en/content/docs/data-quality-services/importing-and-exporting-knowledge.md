---
title: "Importing and Exporting Knowledge"
description: "Importing and Exporting Knowledge"
ms.date: "07/31/2012"
ms.service: sql
ms.subservice: data-quality-services
ms.topic: concept-article
ms.custom:
  - build-2025
---
# Importing and Exporting Knowledge


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Important:**  
> Data Quality Services (DQS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support DQS in  SQL Server 2022 (16.x) 
 and earlier versions.


  You can create knowledge bases and domains directly in the  Data Quality Client 
 application, or you can import knowledge into, or export it from, a knowledge base. In the  Data Quality Client 
 application, you can use a data file for import and export operations, or an Excel file for import operations. The data file used is an encrypted file that is created by  Data Quality Services 
 (DQS) with a .dqs extension. The files created by Microsoft Excel can have an extension of .xlsx, .xls, or .csv. These operations give you more flexibility in building and sharing the knowledge that you use to perform data cleansing and matching.  
  
> **Important:**  
>  You can export *all* the knowledge bases in your  Data Quality Server 
 to a DQS backup file (.dqsb) at once by running the DQSInstaller.exe file from the command prompt. Similarly, you can import *all* the knowledge bases from a DQS backup file (.dqsb) to your  Data Quality Server 
 at once by running the DQSInstaller.exe file from the command prompt. For information about doing so, see [Export and Import DQS Knowledge Bases Using DQSInstaller.exe](install-windows/export-and-import-dqs-knowledge-bases-using-dqsinstaller-exe.md) in the DQS installation guide.  
  
## In This Section  
 You can perform the following import and export operations:  
  
| Operation Description | Topic |
| --- | --- |
| Export a domain in a knowledge base to a .dqs data file | [Export a Domain to a .dqs File](export-a-domain-to-a-dqs-file.md) |
| Import a domain from a .dqs data file into an existing knowledge base | [Import a Domain from a .dqs File](import-a-domain-from-a-dqs-file.md) |
| Export an entire knowledge base to a .dqs data file | [Export a Knowledge Base to a .dqs File](export-a-knowledge-base-to-a-dqs-file.md) |
| Import an entire knowledge base to a .dqs data file | [Import a Knowledge Base from a .dqs File](import-a-knowledge-base-from-a-dqs-file.md) |
| Import values from an Excel file into a domain | [Import Values from an Excel File into a Domain](import-values-from-an-excel-file-into-a-domain.md) |
| Import domains from an Excel file into a knowledge base | [Import Domains from an Excel File in Knowledge Discovery](import-domains-from-an-excel-file-in-knowledge-discovery.md) |
| Import knowledge gathered during cleansing into a knowledge base | [Import Cleansing Project Values into a Domain](import-cleansing-project-values-into-a-domain.md) |
  
## Related Tasks  
  
| Task Description | Topic |
| --- | --- |
| Building a knowledge base by running knowledge discovery and interactively managing knowledge | [Building a Knowledge Base](building-a-knowledge-base.md) |
| Creating a single domain, and adding knowledge to the domain. | [Managing a Domain](managing-a-domain.md) |
| Creating a composite domain, and adding knowledge to the domain. | [Managing a Composite Domain](managing-a-composite-domain.md) |
