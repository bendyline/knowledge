---
title: "Open, unlock, rename, and delete a data quality project"
description: Learn how to open, unlock, rename, and delete a data quality project using SQL Server Data Quality Services.
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: data-quality-services
ms.topic: how-to
f1_keywords:
  - "sql13.dqs.dqproject.opendqproject.f1"
helpviewer_keywords:
  - "data quality project,delete"
  - "data quality project,rename"
  - "data quality project,unlock"
  - "data quality project,open"
ms.custom:
  - build-2025
---
# Open, unlock, rename, and delete a Data Quality Project - Data Quality Services (DQS)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Important:**  
> Data Quality Services (DQS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support DQS in  SQL Server 2022 (16.x) 
 and earlier versions.


  This topic describes how to manage a data quality project by using  Data Quality Client 
 such as open, unlock, rename, and delete a data quality project.  

<a id="BeforeYouBegin"></a>

##  <a name="LimitationsRestrictions"></a> Limitations and Restrictions  
  
-   You cannot open a locked project that is created by another user.  
  
-   You cannot unlock, rename, or delete a data quality project that is created by another user.  
  
-   You cannot delete a locked data quality project. You must first unlock it to delete.  
  
-   You can only unlock a data quality project that is created by you.  

<a id="Prerequisites"></a>

## Prerequisites

You must have at least one data quality project to manage.  
  
<a id="Security"></a>
<a id="Permissions"></a>

## Permissions

You must have the dqs_kb_editor or dqs_kb_operator role on the DQS_MAIN database to manage a data quality project.  
  
##  <a name="Open"></a> Open a Data Quality Project  
  
1.   Start Data Quality Client. For information about doing so, see 
 [Run the Data Quality Client Application](run-the-data-quality-client-application.md).  
  
2.  In the  Data Quality Client 
 home screen, click **Open data quality project**. The **Open project** screen appears.  
  
     Alternately, you can directly open a data quality project listed under **Recent data quality project** area by clicking it.  
  
3.  In the **Open project** screen, click to select the data quality project that you want to open, and click **Next**.  
  
4.  The data quality project opens at the same state of the activity where it was last closed. A data quality project has the following states:  
  
    -   For the **Cleansing** activity, a data quality project can have the following states: **Cleansing - Map**, **Cleansing - Cleanse**, **Cleansing - Manage and View Results**, and **Cleansing - Export**.  
  
    -   For the **Matching** activity, a data quality project can have the following states: **Matching - Map**, **Matching - Matching**, **Matching - Survivorship**, and **Matching - Export**.  
  
##  <a name="Unlock"></a> Unlock a Data Quality Project  
 When you create a data quality project, it is in a locked state to prevent usage or modification by other users. You must unlock the data quality project after you have completed your work if you want other users to work on your data quality project. A lock symbol is displayed for projects that are locked.  
  
1.   Start Data Quality Client. For information about doing so, see 
 [Run the Data Quality Client Application](run-the-data-quality-client-application.md).  
  
2.  In the  Data Quality Client 
 home screen, click **Open data quality project**. The **Open project** screen appears.  
  
3.  In the **Open project** screen, right-click a locked data quality project that is created by you, and then click **Unlock** in the shortcut menu. A green check mark is displayed for the project indicating that it is unlocked.  
  
##  <a name="Rename"></a> Rename a Data Quality Project  
  
1.   Start Data Quality Client. For information about doing so, see 
 [Run the Data Quality Client Application](run-the-data-quality-client-application.md).  
  
2.  In the  Data Quality Client 
 home screen, click **Open data quality project**. The **Open project** screen appears.  
  
3.  In the **Open project** screen, right-click a data quality project that is created by you, and then click **Rename** in the shortcut menu.  
  
4.  The data quality project name becomes editable in the **Name** column. Type a new name, and then press Enter.  
  
##  <a name="Delete"></a> Delete a Data Quality Project  
  
1.   Start Data Quality Client. For information about doing so, see 
 [Run the Data Quality Client Application](run-the-data-quality-client-application.md).  
  
2.  In the  Data Quality Client 
 home screen, click **Open data quality project**. The **Open project** screen appears.  
  
3.  In the **Open project** screen, right-click an unlocked data quality project that is created by you, and then click **Delete** in the shortcut menu.  
  
4.  A confirmation message appears. Click **Yes**.
