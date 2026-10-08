---
title: "Import a Domain from a .dqs File"
description: "Import a Domain from a .dqs File"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: data-quality-services
ms.topic: how-to
ms.custom:
  - build-2025
---
# Import a Domain from a .dqs File


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Important:**  
> Data Quality Services (DQS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support DQS in  SQL Server 2022 (16.x) 
 and earlier versions.


  This topic describes how to import a domain from a .dqs file into an existing knowledge base in  Data Quality Services 
 (DQS). A .dqs data file is created by exporting a domain or knowledge base from the  Data Quality Client 
 application. A .dqs data file is encrypted, so cannot be viewed.  
  
 Using a .dqs data file to export a domain from one knowledge base and then import it to another knowledge base simplifies the knowledge generation process, saving time and effort. It enables you to share a domain and its knowledge with others, saving them time. You can import either one single domain or one composite domain (containing multiple single domains). A .dqs file containing a single domain includes all domain data including domain properties, values, and rules data, except for the mapped reference data information. A .dqs file containing a composite domain includes all composite domain data, including all domain data for the singles domains that are contained within the composite domain, and the composite domain properties, value relations, and CD rules, except for the mapped reference data. Published and unpublished data will be imported.  
  
 When you import a domain, the name of the domain remains the same as the name of the domain that was originally exported, unless the domain name already exists, in which case DQS will append "_1" to the name. This is also true if you import a composite domain that contains an individual domain with the same name as an existing domain.  
  
<a id="BeforeYouBegin"></a>
<a id="Prerequisites"></a>

## Prerequisites

To import a domain from a .dqs file, you must have already exported one single domain or one composite domain (containing multiple single domains) into the .dqs file. The .dqs file must only contain one domain. You must also have created and opened a knowledge base to import the domain into.  
  
<a id="Security"></a>
<a id="Permissions"></a>

## Permissions

You must have the dqs_kb_editor or the dqs_administrator role on the DQS_MAIN database to import a domain from a .dqs data file.  
  
##  <a name="Import"></a> Import a domain from a .dqs file  
  
1.   Start Data Quality Client. For information about doing so, see 
 [Run the Data Quality Client Application](run-the-data-quality-client-application.md).  
  
2.  In the  Data Quality Client 
 home screen, open a knowledge base in the Domain Management activity.  
  
3.  Click the **Import Domain from data file** icon.  
  
4.  In the **Import from Data File** dialog box, move to the folder that you want to import the file from, select the file (of type DQS File), and then click **Open**.  
  
5.  In the **Import Domain** dialog box, click **OK**.  
  
    > **Note:**  
    >  The import operation will succeed only if the .dqs file that you are importing from contains only one single domain or one composite domain (containing multiple single domains).  
  
6.  Verify that the domain that you imported is displayed in the **Domain** list. If you imported a composite domain, verify that the composite domain and the single domains contained in it are all in the **Domain** list.  
  
##  <a name="FollowUp"></a> Follow Up: After Importing a Domain from a .dqs File  
 After you import a domain from a .dqs file, you can add knowledge to the domain or use the domain in a cleansing or matching project, depending on the contents of the domain. For more information, see [Perform Knowledge Discovery](perform-knowledge-discovery.md), [Managing a Domain](managing-a-domain.md), [Managing a Composite Domain](managing-a-composite-domain.md), [Create a Matching Policy](create-a-matching-policy.md), [Data Cleansing](data-cleansing.md), or [Data Matching](data-matching.md).
