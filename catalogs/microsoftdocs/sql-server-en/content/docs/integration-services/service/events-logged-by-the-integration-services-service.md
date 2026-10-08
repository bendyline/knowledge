---
title: "Events Logged by the Integration Services Service"
description: "Events Logged by the Integration Services Service"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: error-reference
helpviewer_keywords:
  - "service [Integration Services], events"
  - "events [Integration Services], service"
  - "Integration Services service, events"
---
# Events Logged by the Integration Services Service


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The  Integration Services 
 service logs various messages to the Windows Application event log. The service logs these messages when the service starts, when the service stops, and when certain problems occur.  
  
 This topic provides information about the common event messages that the service logs to the Application event log. The  Integration Services 
 service logs all the messages described in this topic with an Event Source of SQLISService.  
  
 For general information about the  Integration Services 
 service, see [Integration Services Service (SSIS Service)](integration-services-service-ssis-service.md).  
  
## Service status messages
 When you select  Integration Services 
 for installation, the  Integration Services 
 service is installed and started, and its Startup Type is set to Automatic.  
  
| Event ID | Symbolic Name | Text | Notes |
| --- | --- | --- | --- |
| 256 | DTS_MSG_SERVER_STARTING | Starting  Microsoft |
  | SSIS |
 | Service. | The service is about to start. |
| 257 | DTS_MSG_SERVER_STARTED | Microsoft |
  | SSIS |
 | Service started. | The service started. |
| 260 | DTS_MSG_SERVER_START_FAILED | Microsoft |
  | SSIS |
 | Service failed to start.%nError: %1 | The service was not able to start. This inability to start might be the result of a damaged installation or an inappropriate service account. |
| 258 | DTS_MSG_SERVER_STOPPING | Stopping  Microsoft |
  | SSIS |
 | Service.%n%nStop all running packages on exit: %1 | The service is stopping, and if you configure the service to do this, will stop all running packages. You can set a true or false value in the configuration file that determines whether the service stops running packages when the service itself stops. The message for this event includes the value of this setting. |
| 259 | DTS_MSG_SERVER_STOPPED | Microsoft |
  | SSIS |
 | Service stopped.%nServer version %1 | The service stopped. |
  
## Settings file messages  
 Settings for the  Integration Services 
 service are stored in an XML file that you can modify. For more information, see [Integration Services Service (SSIS Service)](integration-services-service-ssis-service.md).  
  
| Event ID | Symbolic Name | Text | Notes |
| --- | --- | --- | --- |
| 274 | DTS_MSG_SERVER_MISSING_CONFIG_REG | Microsoft |
  | SSIS |
 | Service: %nRegistry setting specifying configuration file does not exist. %nAttempting to load default config file. | The Registry entry that contains the path of the configuration file does not exist or is empty. |
| 272 | DTS_MSG_SERVER_MISSING_CONFIG | Microsoft |
  | SSIS |
 | Service configuration file does not exist.%nLoading with default settings. | The configuration file itself does not exist at the specified location. |
| 273 | DTS_MSG_SERVER_BAD_CONFIG | Microsoft |
  | SSIS |
 | Service configuration file is incorrect.%nError reading config file: %1%n%nLoading server with default settings. | The configuration file could not be read or is not valid. This error might be the result of an XML syntax error in the file. |
  
## Other messages  
  
| Event ID | Symbolic Name | Text | Notes |
| --- | --- | --- | --- |
| 336 | DTS_MSG_SERVER_STOPPING_PACKAGE | Microsoft |
  | SSIS |
 | Service: stopping running package.%nPackage instance ID: %1%nPackage ID: %2%nPackage name: %3%nPackage description: %4%nPackage | The service is trying to stop a running package. You can monitor and stop running packages in  Management Studio |
| . For information about how to manage packages in  Management Studio |
| , see [Package Management (SSIS Service)](package-management-ssis-service.md). |

## View events
  There are two tools in which you can view events for the  Integration Services 
 service:  
  
-   The **Log File Viewer** dialog box in  SQL Server Management Studio 
. The **Log File Viewer** dialog box includes options to export, filter, and search the log. For more information about the options in the **Log File Viewer**, see [Log File Viewer F1 Help](../../relational-databases/logs/log-file-viewer-f1-help.md).  
  
-   The Windows Event Viewer.  
  
 For descriptions of the events logged by the  Integration Services 
 service, see [Events Logged by the Integration Services Service](#events-logged-by-the-integration-services-service).  
  
### To view service events for Integration Services in SQL Server Management Studio  
  
1.  Open  SQL Server Management Studio 
.  
  
2.  On the **File** menu, click **Connect Object Explorer**.  
  
3.  In the **Connect to Server** dialog box, select the  Integration Services 
 server type, select or locate the server to connect to, and then click **Connect**.  
  
4.  In Object Explorer, right-click  Integration Services 
 and click **View Logs**.  
  
5.  To view  Integration Services 
 events, select **SQL Server Integration Services**. The **NT Events** option is automatically selected and cleared with the **SQL Server Integration Services** option.  
  
### To view service events for Integration Services in Windows Event Viewer  
  
1.  In **Control Panel**, if you are using Classic View, click **Administrative Tools**, or, if you are using Category View, click **Performance and Maintenance** and then click **Administrative Tools**.  
  
2.  Click **Event Viewer**.  
  
3.  In the **Event Viewer** dialog box, click **Application**.  
  
4.  In the **Application** snap-in, locate an entry in the **Source** column that has the value **SQLISService**, right-click the entry, and then click **Properties**.  
  
5.  Optionally, click the up or down arrow to show the previous or next event.  
  
6.  Optionally, click the Copy to Clipboard icon to copy the event information.  
  
7.  Choose to display event data using bytes or words.  
  
8.  Click **OK**.  
  
9. On the **File** menu, click **Exit** to close the **Event Viewer** dialog box.  
 
## Related Tasks  
 For information about how to view log entries, see [Events Logged by an Integration Services Package](../performance/events-logged-by-an-integration-services-package.md)
