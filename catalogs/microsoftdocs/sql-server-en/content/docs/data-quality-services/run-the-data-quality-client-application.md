---
title: "Run the Data Quality Client Application"
description: "Run the Data Quality Client Application"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: data-quality-services
ms.topic: how-to
f1_keywords:
  - "sql13.dqs.browseforservers.f1"
  - "sql13.dqs.connecttoserver.f1"
ms.custom:
  - build-2025
---
# Run the Data Quality Client Application


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Important:**  
> Data Quality Services (DQS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support DQS in  SQL Server 2022 (16.x) 
 and earlier versions.


  Run  Data Quality Client 
, and log on to a  Data Quality Server 
.  
  
<a id="BeforeYouBegin"></a>
<a id="Prerequisites"></a>

## Prerequisites

You must have completed the  Data Quality Server 
 installation by running the DQSInstaller.exe file. For more information, see [Run DQSInstaller.exe to Complete Data Quality Server Installation](install-windows/run-dqsinstaller-exe-to-complete-data-quality-server-installation.md).  
  
<a id="Security"></a>
<a id="Permissions"></a>

## Permissions

You must have one of the three DQS roles (dqs_administrator, dqs_kb_editor, or dqs_kb_operator) granted on the DQS_MAIN database to be able to log on to  Data Quality Server 
.  
  
##  <a name="Run"></a> Run Data Quality Client  
 To run  Data Quality Client 
 on the computer where you have installed it:  
  
1.  In the **Start** menu, select the ** SQL Server 
** **Data Quality Client**.  
  
2.  In the **Connect to Server** dialog box:  
  
    1.  Specify the server that you want to connect the  Data Quality Client 
 application to. Select **(LOCAL)** to connect to  Data Quality Server 
 on the local computer. You can also click the down arrow and select **\<Browse network for more servers>** to connect to a different server (or to connect to the local server by name). The **Browse for Servers** dialog box will be displayed. You can select a server in the **Local Servers** tab or in the **Network Servers** tab.  
  
    2.  To encrypt data transfer between  Data Quality Server 
 and  Data Quality Client 
, click **Options**, and then select the **Encrypt Connection** check box.  
  
3.  Click **Connect**.  
  
 The  Data Quality Client 
 home screen appears. For more information, see [Data Quality Client Home Screen](data-quality-client-home-screen.md).
