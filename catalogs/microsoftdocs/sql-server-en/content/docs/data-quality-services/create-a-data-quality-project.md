---
title: "Create a Data Quality Project"
description: "Create a Data Quality Project"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: data-quality-services
ms.topic: how-to
f1_keywords:
  - "sql13.dqs.dqproject.newdqproject.f1"
helpviewer_keywords:
  - "create,data quality project"
  - "data quality project,create"
ms.custom:
  - build-2025
---
# Create a Data Quality Project


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Important:**  
> Data Quality Services (DQS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support DQS in  SQL Server 2022 (16.x) 
 and earlier versions.


  This topic describes how to create a data quality project by using  Data Quality Client 
. A data quality project is used to run the cleansing or matching activity in  Data Quality Services 
 (DQS).  
  
<a id="BeforeYouBegin"></a>
<a id="Prerequisites"></a>

## Prerequisites

You must have a relevant knowledge base to use in the data quality project for the cleansing or matching activity.  

<a id="Security"></a>
<a id="Permissions"></a>

## Permissions

You must have the dqs_kb_editor or dqs_kb_operator role on the DQS_MAIN database to create a data quality project.  
  
##  <a name="Create"></a> Create a Data Quality Project  
  
1.   Start Data Quality Client. For information about doing so, see 
 [Run the Data Quality Client Application](run-the-data-quality-client-application.md).  
  
2.  In the  Data Quality Client 
 home screen, click **New data quality project**.  
  
3.  In the **New Data Quality Project** screen:  
  
    1.  In the **Name** box, type a name for the new data quality project.  
  
    2.  (Optional) In the **Description** box, type a description for the new data quality project.  
  
    3.  In the **Use Knowledge base** list, click to select a knowledge base to be used for the data quality project. The **Knowledge base details: <Knowledge_Base_Name>** area on the right side displays the domain names available in the selected knowledge base.  
  
    4.  In the **Select Activity** area, click on an activity that you want to perform using this data quality project:  
  
        -   **Cleansing**: Select this activity to cleanse the source data.  
  
        -   **Matching**: Select this activity to perform matching. This activity is available only if the knowledge base selected for the data quality project contains a matching policy.  
  
4.  Click **Create** to create a data quality project.  
  
##  <a name="FollowUp"></a> Follow Up: After Creating a Data Quality Project  
 After you create a data quality project, you are presented with a wizard that you use to perform the selected activity: cleansing or matching. For more information about the cleansing and matching activities, see [Data Cleansing](data-cleansing.md) and [Data Matching](data-matching.md).
