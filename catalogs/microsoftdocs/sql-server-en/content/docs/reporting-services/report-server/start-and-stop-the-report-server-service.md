---
title: "Start and stop the Report Server service"
description: Learn how to start and stop the Windows service that contains the Report Server Web service, the web portal, and a background processing application.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "stopping Report Server service"
  - "Report Server Windows service, starting"
  - "Report Server service, starting"
  - "starting Report Server service"
---

# Start and stop the Report Server service

  **Applies to:**
 
 Reporting Services and later versions
 

  A report server is implemented as a Windows service that contains the Report Server web service, the web portal, and a background processing application. The service must be running if you want to use any report server functionality. Stopping the service stops all report server operations.  
  
 While the service is stopped, requests for scheduled report and subscription processing that would occur if the service is running are added to the queue. This result happens because jobs that the  SQL Server 
 Agent runs create the events. If you want to avoid a backlog of operations while the service is off, consider stopping  SQL Server 
 Agent as well.  
  
 You can use various tools to start or stop the Report Server service. These tools include the  Reporting Services 
 Configuration tool,  SQL Server 
 Configuration Manager, and the Services tool provided in  Microsoft 
 Windows.  
  
> **Note:**
>  SQL Server 
 Configuration Manager is only an option for SQL Server Reporting Services 2016 and earlier. It does not include Reporting Services 2017 and later or Power BI Report Server.
  
 If you're doing more than starting or stopping the service, you must use the  Reporting Services 
 Configuration tool. This tool is designed for comprehensive configuration tasks beyond basic service management. Using other tools to change the service account can break your  Reporting Services 
 installation and encryption key. For more information, see [Configure the Report Server service account (Report Server Configuration Manager)](../install-windows/configure-the-report-server-service-account-ssrs-configuration-manager.md).  
  
 You can't pause and resume the service. There aren't start parameters. Although there are no explicit dependencies,  SQL Server 
 Agent must be running if you support any subscriptions or scheduled report operations on the report server.  
  
## Use the Reporting Services Configuration tool  
  
1. Start  Reporting Services 
 Configuration tool and connect to the report server.  
  
1. On the **Report Server Status** page, select **Stop** or **Start**.  
  
## Use administrative tools  

1. In Administrative Tools, open **Services**.
1. Right-click **SQL Server Reporting Services (MSSQLSERVER)**, **SQL Server Reporting Services**, or **Power BI Report Server**.
1. Select **Stop** or **Restart**.

  
For Reporting Services 2016 and earlier versions, you must verify that the instance name in parentheses corresponds to the report server instance you want to stop or restart. Specifically, you must follow these steps if you're running multiple instances or if the report server is running as a named instance.

  
## Related content

- [What is the Report Server configuration manager (native mode)?](../install-windows/reporting-services-configuration-manager-native-mode.md)
- [Start, stop, or pause the SQL Server agent service](https://learn.microsoft.com/ssms/agent/start-stop-or-pause-the-sql-server-agent-service)
