---
title: "DQS Administration"
description: "DQS Administration"
ms.date: "10/01/2012"
ms.service: sql
ms.subservice: data-quality-services
ms.topic: concept-article
helpviewer_keywords:
  - "dqs administration"
  - "administration"
  - "dqs,administration"
ms.custom:
  - build-2025
---
# DQS Administration


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Important:**  
> Data Quality Services (DQS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support DQS in  SQL Server 2022 (16.x) 
 and earlier versions.


   Data Quality Services 
 (DQS) allows you to administer and manage various DQS activities performed on  Data Quality Server 
, configure server-level properties related to DQS activities, configure the Reference Data Service settings, and configure DQS log settings. These things are done through the **Administration** feature in  Data Quality Client 
. Depending upon your security access (role) in DQS, you are granted/denied access to certain functionalities in this area.  
  
 Apart from these administration activities, this topic also provides information about an administration activity, backing up and restoring DQS databases, which is not performed using  Data Quality Client 
.  
  
 The administration feature in  Data Quality Client 
 has the following benefits:  
  
-   Enables data stewards to monitor various DQS activities on a  Data Quality Server 
 from a  Data Quality Client 
.  
  
-   Enables DQS administrators to monitor the DQS activities on a  Data Quality Server 
 from a  Data Quality Client 
, and *terminate* a running activity or *stop* a running process within an activity, if required.  
  
-   Configure reference data service settings such as setting up connectivity with Azure Marketplace and managing direct third-party reference data service providers.  
  
-   Configure threshold values for the cleansing and matching activities.  
  
-   Enable/disable notifications in  Data Quality Client 
.  
  
-   Configure logging based on the severity level of the events.  
  
##  <a name="AdminUsingClient"></a> Administration Activities by Using Data Quality Client  
 These activities are performed by using the **Administration** feature in  Data Quality Client 
.  
  
### Activity Monitoring  
 The **Activity Monitoring** screen in  Data Quality Client 
 displays detailed information about each activity performed on a  Data Quality Server 
. This screen will be primarily used by the data steward to perform a high-level monitoring of all the activities performed on the  Data Quality Server 
 that the  Data Quality Client 
 application is connected to. This screen does not provide any system-level monitoring. Additionally, this screen also enables the DQS administrators to control an activity or a process within an activity by terminating a running activity or stopping a running process within an activity, if required. The data is displayed for knowledge discovery, domain management, matching policy, cleansing, matching, and SQL Server Integration Services (SSIS)-based cleansing.  
  
### Configuration  
 The **Configuration** screen in  Data Quality Client 
 enables the DQS administrator to do the following things:  
  
-   **Reference Data**: Configure reference data service providers: Azure Marketplace or direct reference data service providers. After you set up the reference data service providers, you can map a domain/composite domain with the reference data during domain management activity in a knowledge base, and then use the same knowledge base for the cleansing activity in a data quality project. It also enables you to specify the proxy settings for connecting to the Internet to use Azure Marketplace.  
  
-   **General Settings**: Specify the threshold values for data cleansing and data matching, and whether to enable notifications for profiling in  Data Quality Client 
. These threshold values are used by DQS during the computer-assisted cleansing and matching activities in a data quality project.  
  
-   **Log Settings**: The log files in DQS record the activities performed in DQS, and are useful for tracking operational issues during maintenance and troubleshooting. You can filter the messages that you want to be logged for various DQS features (domain management, knowledge discovery, cleansing, matching, and reference data services) and DQS modules based on the severity level of the events.  
  
> **Note:**  
>  The **Configuration** screen is available only for those users who have the dqs_administrator role on the DQS_MAIN database.  
  
##  <a name="AdminOutsideClient"></a> Administration Activities Outside of Data Quality Client  
 There activities are performed outside of Data Quality Client:  
  
-   **Backup and Restore DQS Databases**: The backup and restore of DQS databases is same as backing up and restoring any SQL Server database with some considerations that are specific to DQS.  
  
-   **Detach and Attach DQS Databases**: The steps to detach and attach DQS databases is same as detaching and attaching any SQL Server database with some considerations that are specific to DQS.  
  
 For more information, see [Manage DQS Databases](manage-dqs-databases.md).  
  
## Related Tasks  
  
| Task Description | Topic |
| --- | --- |
| Describes how to monitor activities in DQS. | [Monitor DQS Activities](monitor-dqs-activities.md) |
| Describes how to configure reference data settings in DQS. | [Configure DQS to Use Reference Data](configure-dqs-to-use-reference-data.md) |
| Describes how to configure threshold values for the cleansing and matching activities. | [Configure Threshold Values for Cleansing and Matching](configure-threshold-values-for-cleansing-and-matching.md) |
| Describes how to enable or disable notifications in DQS. | [Enable or Disable Profiling Notifications in DQS](enable-or-disable-profiling-notifications-in-dqs.md) |
| Describes how to configure DQS logging based on the severity level of the events. | [Configure Severity Levels for DQS Log Files](configure-severity-levels-for-dqs-log-files.md) |
| Describes how to configure advanced settings for DQS logging. | [Configure Advanced Settings for DQS Log Files](configure-advanced-settings-for-dqs-log-files.md) |
| Describes how to back up and restore DQS databases. | [Backing Up and Restoring DQS Databases](backing-up-and-restoring-dqs-databases.md) |
| Describes how to detach and attach DQS databases. | [Detaching and Attaching DQS Databases](detaching-and-attaching-dqs-databases.md) |
  
## Related content

- [Reference Data Services in DQS](reference-data-services-in-dqs.md)
- [Manage DQS Log Files](manage-dqs-log-files.md)
- [Manage DQS Databases](manage-dqs-databases.md)
