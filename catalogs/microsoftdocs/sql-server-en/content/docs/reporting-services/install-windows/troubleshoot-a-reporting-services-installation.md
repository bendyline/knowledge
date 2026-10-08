---
title: "Troubleshoot a Reporting Services installation"
description: "Troubleshoot a Reporting Services installation"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server
ms.topic: troubleshooting-general
ms.custom:
  - updatefrequency5
---

# Troubleshoot a Reporting Services installation

  If you cannot install  Reporting Services 
 because of errors that occur during setup, use the instructions in this article to address the conditions that are most likely to cause installation errors.  
  
 For information about other errors and issues related to  Reporting Services 
, see [Troubleshoot SSRS issues and errors](https://learn.microsoft.com/archive/technet-wiki/1633.ssrs-troubleshoot-issues-and-errors-with-reporting-services).  
  
 Review the [Online release notes](https://go.microsoft.com/fwlink/?linkid=236893) in case the issue you encounter is described in the release notes.  
  
##  <a name="bkmk_setuplogs"></a> Check setup logs  
 Setup errors are recorded in log files in the **\<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\
Setup Bootstrap\Log** folder. A subfolder is created each time you run Setup. The subfolder name is the time and date you ran Setup. For instructions on how to view the Setup log files, see [View and Read SQL Server Setup Log Files](../../database-engine/install-windows/view-and-read-sql-server-setup-log-files.md).  
  
-   The log files include a collection of files.  
  
-   Open the *_summary.txt file to view product, component, and instance information.  
  
-   Open the *_errorlog.txt file to view error information generated during Setup.  
  
-   Open the *_RS\_\*_ComponentUpdateSetup.log to view  Reporting Services 
 setup information.  
  
##  <a name="bkmk_prereq"></a> Check prerequisites  
 Setup checks prerequisites automatically. However, if you are troubleshooting setup problems, it is helpful to know which requirements Setup is checking for.  
  
-   Account requirements for running Setup include membership in the local Administrators group. Setup must have permission to add files, registry settings, create local security groups, and set permissions. If you are installing a default configuration, Setup must have permission to create a report server database on the  SQL Server 
 instance on which you are installing.  
  
-   Operating System must support HTTP.SYS 1.1.  
  
-   HTTP service must be enabled and running.  
  
-   Distributed Transaction Coordinator (DTC) must be running if you are also installing  SQL Server 
 Agent service.  
  
-   Authz.dll must be present in the System32 folder.  
  
 Setup no longer checks for Internet Information Services (IIS) or  ASP.NET 
.  Reporting Services 
 requires MDAC 2.0 and the  Microsoft 
  .NET Framework 
 version 2.0; Setup will install these, if they are not already installed.  

##  <a name="bkmk_tshoot_native"></a> Troubleshoot problems with the native mode installations  
  
###  <a name="PerfCounters"></a> Performance counters are not visible after upgrading to Windows Vista or Windows Server 2008  
 If you upgrade the operating system to  Windows Vista 
 or  Windows Server 2008 
 on a computer that runs  Reporting Services 
,  Reporting Services 
 performance counters will not be set after the upgrade.  
  
#### To reinstate Reporting Services performance counters  
  
1.  Delete the following registry keys:  
  
    -   **HKLM\SYSTEM\CurrentControlSet\Services\MSRS 2016 Web Service**  
  
    -   **HKLM\SYSTEM\CurrentControlSet\Services\MSRS 2016 Windows Service**  
  
2.  Open a command window and type the following command at the prompt:  
  
    -   **run \<** *.NET 4.0 Framework directory* **>\InstallUtil.exe \<** *Report Server Bin directory* **>\ReportingServicesLibrary.dll**  
  
        > **Note:**  
        >  Replace \<*.NET 4.0 Framework directory*> with the physical path of the .NET Framework 4.0 files and replace \<*Report Server Bin directory*> with the physical path of the report server bin files.  
  
3.  Restart the  Reporting Services 
 service.  
  
 To verify that the steps worked, open a Web browser and navigate to the web portal URL or the Report Server URL. Then open Performance Monitor to verify that the counters are working.  
  
#### To add the performance registry keys again by using Registry Editor  
  
1.  Open the Registry Editor:  
  
    1.  Click **Start**, and click **Run**.  
  
    2.  In the **Run** dialog box, in the **Open** box, type **regedit**.  
  
2.  In Registry Editor, select the following registry key: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\MSRS 2016 Web Service\Performance`  
  
3.  Right-click the **Performance** node, point to **New**, and click **Multi-String Value**.  
  
4.  Type **Counter Names** and then press ENTER.  
  
5.  Repeat to add the **Counter Types** registry key in this node.  
  
6.  Navigate to the following registry key: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\MSRS 2016 Web Service\Performance`  
  
7.  Right-click the **Performance** node, point to **New**, and click **Multi-String Value**.  
  
8.  Type **Counter Names** and then press ENTER.  
  
9. Repeat to add the **Counter Types** registry key in this node.  
  
 After you repair the 64-bit instance or add the registry keys again manually, you can use Performance Monitor to configure the  Reporting Services 
 performance objects that you want to monitor.  
  
###  <a name="ConfigPropsMissing"></a> ReportServerExternalURL and PassThroughCookies configuration properties are not configured after an upgrade from SQL Server 2005  
 When you upgrade from  SQL Server 2005 (9.x) 
 to 
 SQL Server 2016 (13.x) 
 Reporting Services or later (SSRS)
, the **ReportServerExternalURL** and **PassThroughCookies** configuration properties are not configured by the upgrade process. **ReportServerExternalURL** is an optional property, and it should be set only if you are using SharePoint 2.0 Web Parts and you want users to be able to retrieve a report and open it in a new browser window. For more information about **ReportServerExternalURL**, see [URLs in Configuration Files  (Report Server Configuration Manager)](urls-in-configuration-files-ssrs-configuration-manager.md). **PassThroughCookies** is required only when using Custom authentication method. For more information about **PassThroughCookies**, see [Configure the Web Portal to Pass Custom Authentication Cookies](../security/configure-the-web-portal-to-pass-custom-authentication-cookies.md).  
  
> **Note:**  
>  When you use Custom authentication, it is recommended that you migrate your installation rather than performing an upgrade. For more information about migrating  Reporting Services 
, see [Migrate a Reporting Services Installation (Native Mode)](migrate-a-reporting-services-installation-native-mode.md).  
  
 By default, these properties do not exist in the 
 SQL Server 2016 (13.x) 
 Reporting Services or later (SSRS)
 configuration. If you configured these properties in  SQL Server 2005 (9.x) 
 and you continue to require the functionality that they provide, you must manually add them to the **RSReportServer.config** file following the upgrade process. For more information, see [Modify a Reporting Services Configuration File (RSreportserver.config)](../report-server/modify-a-reporting-services-configuration-file-rsreportserver-config.md).  

### <a name="WindowsAuthBreaksAfterUpgrade"></a> 401-Unauthorized error when using Windows authentication after an upgrade from SQL Server 2005 to SQL Server 2016

 If you upgrade from  SQL Server 2005 (9.x) 
  Reporting Services 
 to 
 SQL Server 2016 (13.x) 
 Reporting Services or later (SSRS)
, and you use NTLM authentication with a built-in account for the Report Server service account, you might encounter a 401-Unauthorized error when you access the report server or the web portal after the upgrade.  
  
 You see this message because of a change in the default 
 SQL Server 2016 (13.x) 
 Reporting Services or later (SSRS)
 configuration for Windows authentication. Negotiate is configured when the Report Server service account is either Network Service or Local System. NTLM is configured when the Report Server service account is not one of those built-in accounts. To fix this issue after you upgrade, you can edit the RSReportServer.config file and configure the **AuthenticationType** to be **RSWindowsNTLM**. For more information, see [Configure Windows Authentication on the Report Server](../security/configure-windows-authentication-on-the-report-server.md).  

### <a name="Uninstall32BitBreaks64Bit"></a> Uninstalling 32-bit instance of SQL Server 2016 Reporting Services in side-by-side deployment with a 64-bit instance breaks the 64-bit instance

 When you install a 32-bit instance and a 64-bit instance of 
 SQL Server 2016 (13.x) 
 Reporting Services or later (SSRS)
 side by side on a computer, and you uninstall the 32-bit instance, four  Reporting Services 
 registry keys are removed. Removing the keys breaks the 64-bit instance of  Reporting Services 
. The  Reporting Services 
 registry keys that are removed when you uninstall the 32-bit instance are:  
  
 `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\MSRS 2016 Web Service\Performance:Counter Names` `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\MSRS 2016 Windows Service\Performance:Counter Names` `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\MSRS 2016 Web Service\Performance:Counter Types` `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\MSRS 2016 Windows Service\Performance:Counter Types`  
  
 To fix this issue, you can repair the 64-bit instance. Although it is recommended to use repair, you can add the registry keys again manually by using Registry Editor.  
  
> **Caution:**  
>  Incorrectly editing the registry can severely damage your system. Before making changes to the registry, you should back up any valued data on the computer.  
  
##  <a name="bkmk_additional"></a> Additional resources  
 The following are additional resources you can review to assist you with troubleshooting issues:  
  
-   [Reporting Services SharePoint Integration Troubleshooting](https://learn.microsoft.com/previous-versions/sql/sql-server-2008/ee384252\(v=sql.100\))  
  
-   [Microsoft Q & A: SQL Server Reporting Services](https://learn.microsoft.com/answers/topics/sql-server-reporting-services.html)  
  
-   Got feedback or more questions? Share [ideas for SQL](https://feedback.azure.com/forums/908035-sql-server).
