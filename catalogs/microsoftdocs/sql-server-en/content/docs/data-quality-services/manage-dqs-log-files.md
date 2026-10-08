---
title: "Manage DQS Log Files"
description: "Manage DQS Log Files"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: data-quality-services
ms.topic: concept-article
helpviewer_keywords:
  - "logging"
  - "log files"
  - "dqs log files"
ms.custom:
  - build-2025
---
# Manage DQS Log Files


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Important:**  
> Data Quality Services (DQS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support DQS in  SQL Server 2022 (16.x) 
 and earlier versions.


   Data Quality Services 
 (DQS) log files help you in diagnosing and troubleshooting issue with  Data Quality Server 
,  Data Quality Client 
, and the  DQS Cleansing component in Integration Services 
. Separate log files are generated for  Data Quality Server 
,  Data Quality Client 
, and the  DQS Cleansing component 
.  
  
 You can use  Data Quality Client 
 to configure the log severity setting for  Data Quality Server 
 features and modules. Additionally, you can also configure some other (advanced) settings for the DQS log files by manually changing the DQS log configuration settings in the DQS_MAIN database and an XML file on the  Data Quality Client 
 computer.  
  
##  <a name="DQSServer"></a> Data Quality Server Log File  
 The  Data Quality Server 
 log file, DQServerLog.DQS_MAIN.log, includes logs of activities that are run on  Data Quality Server 
. If you installed the default instance of SQL Server, the DQServerLog.DQS_MAIN.log file is available at C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\Log. The  Data Quality Server 
 log file contains the following pieces of information, each delimited by a pipe (|):  
  
-   Date and time  
  
-   Thread name  
  
-   Thread ID  
  
-   Log severity (FATAL, ERROR, WARN, INFO, and DEBUG)  
  
    > **Note:**  
    >  The DEBUG logging severity is same as Verbose.  
  
-   UID (internal DQS infrastructure ID)  
  
-   Namespace  
  
-   Class and method  
  
-   Message  
  
 Along with these, the log file also displays information about the application version, computer name, user name, and operating system.  
  
 A sample entry in the  Data Quality Server 
 log file looks like the following:  
  
```  
23-08-2013 01:45:29|[]|4|INFO|PUID|InfInfoModuleStarting|Microsoft.Ssdqs.Core.Startup.ServerInit|Starting DQS ServerInit: version [12.0.0.0], machine name [DQS-TEST], user name [NT Service\MSSQLSERVER], operating system [Microsoft Windows NT 6.1.7600.0]...  
```  
  
 The DQServerLog.DQS_MAIN.log file is a rolling file, and a new log file is created once the existing log file exceeds the rolling file size limit specified in the  Data Quality Server 
 log configuration settings. For more information, see [Configure Advanced Settings for DQS Log Files](configure-advanced-settings-for-dqs-log-files.md).  
  
##  <a name="DQSClient"></a> Data Quality Client Log File  
 The  Data Quality Client 
 log file, DQClientLog.log, includes the client side logs. The  Data Quality Client 
 log file is available at %APPDATA%\SSDQS\Log. The  Data Quality Client 
 log file contains similar set of information as in the server log file, but for the client side.  
  
 As with the  Data Quality Server 
 log file, the  Data Quality Client 
 log file is also a rolling file, and a new log file is created once the existing log file exceeds the rolling file size limit specified in the  Data Quality Client 
 log configuration settings. For more information, see [Configure Advanced Settings for DQS Log Files](configure-advanced-settings-for-dqs-log-files.md).  
  
##  <a name="DQSCleansing"></a> DQS Cleansing Component Log File  
 The  DQS Cleansing component 
 log file, DQSSSISLog.log, includes logs of activities performed using the  DQS Cleansing component in Integration Services 
. The  DQS Cleansing component 
 component log file is available at %APPDATA%\SSDQS\Log. The  DQS Cleansing component 
 log file contains similar set of information as in the server log file, but for the  DQS Cleansing component 
.  
  
##  <a name="RT"></a> Related Tasks  
  
| Task Description | Topic |
| --- | --- |
| Describes how to configure log severity settings for DQS log files using  Data Quality Client |
| . | [Configure Severity Levels for DQS Log Files](configure-severity-levels-for-dqs-log-files.md) |
| Describes how to manually configure advanced settings for DQS log files. | [Configure Advanced Settings for DQS Log Files](configure-advanced-settings-for-dqs-log-files.md) |
  
## Related content

- [DQS Administration](dqs-administration.md)
