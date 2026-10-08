---
title: "Integration Services Service (SSIS Service)"
description: "Integration Services Service (SSIS Service)"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.ssiseditserverregistration.connectionproperties.f1"
  - "sql13.swb.connecttodts.connectionproperties.f1"
  - "sql13.swb.connection.login.dtsserver.f1"
  - "sql13.swb.connecttodts.login.f1"
  - "sql13.swb.connecttodtsserver.login.f1"
helpviewer_keywords:
  - "Integration Services service, about Integration Services service"
  - "SQL Server Integration Services service"
  - "service [Integration Services],about Integration Services service"
  - "service [Integration Services]"
  - "SQL Server Integration Services, service"
---
# Integration Services Service (SSIS Service)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The topics in this section discuss the  Integration Services 
 service, a Windows service for managing  Integration Services 
 packages. This service is not required to create, save, and run Integration Services packages.  SQL Server 2012 (11.x) 
 supports the  Integration Services 
 service for backward compatibility with earlier releases of  Integration Services 
.  
  
 Starting in  SQL Server 2012 (11.x) 
,  Integration Services 
 stores objects, settings, and operational data in the **SSISDB** database for projects that you've deployed to the  Integration Services 
 server using the project deployment model. The  Integration Services 
 server, which is an instance of the  SQL Server 
 Database Engine, hosts the database. For more information about the database, see [SSIS Catalog](../catalog/ssis-catalog.md). For more information about deploying projects to the  Integration Services 
 server, see [Deploy Integration Services (SSIS) Projects and Packages](../packages/deploy-integration-services-ssis-projects-and-packages.md).  
  
## Management capabilities  
 The  Integration Services 
 service is a Windows service for managing  Integration Services 
 packages. The  Integration Services 
 service is available only in  SQL Server Management Studio 
.  
  
 Running the  Integration Services 
 service provides the following management capabilities:  
  
-   Starting remote and locally stored packages  
  
-   Stopping remote and locally running packages  
  
-   Monitoring remote and locally running packages  
  
-   Importing and exporting packages  
  
-   Managing package storage  
  
-   Customizing storage folders  
  
-   Stopping running packages when the service is stopped  
  
-   Viewing the Windows Event log  
  
-   Connecting to multiple  Integration Services 
 servers  
  
## Startup type
 The  Integration Services 
 service is installed when you install the  Integration Services 
 component of  SQL Server 
. By default, the  Integration Services 
 service is started and the startup type of the service is set to automatic. The service must be running to monitor the packages that are stored in the  SSIS 
 Package Store. The  SSIS 
 Package Store can be either the msdb database in an instance of  SQL Server 
 or the designated folders in the file system.  
  
 The  Integration Services 
 service is not required if you only want to design and execute  Integration Services 
 packages. However, the service is required to list and monitor packages using  SQL Server Management Studio 
.  

## Manage the service
  
 When you install the  Integration Services 
 component of  SQL Server 
, the  Integration Services 
 service is also installed. By default, the  Integration Services 
 service is started and the startup type of the service is set to automatic. However, you must also install  SQL Server Management Studio 
 to use the service to manage stored and running  Integration Services 
 packages.  
  
> **Note:**
> To connect directly to an instance of the legacy Integration Services Service, you have to use the version of SQL Server Management Studio (SSMS) aligned with the version of SQL Server on which the Integration Services Service is running. For example, to connect to the legacy Integration Services Service running on an instance of SQL Server 2016, you have to use the version of SSMS released for SQL Server 2016. For more information, see [Release history for SQL Server Management Studio](https://learn.microsoft.com/ssms/release-history).
>
>   In the SSMS **Connect to Server** dialog box, you cannot enter the name of a server on which an earlier version of the  Integration Services 
 service is running. However, to manage packages that are stored on a remote server, you do not have to connect to the instance of the  Integration Services 
 service on that remote server. Instead, edit the configuration file for the  Integration Services 
 service so that  SQL Server Management Studio 
 displays the packages that are stored on the remote server.   
  
 You can only install a single instance of the  Integration Services 
 service on a computer. The service is not specific to a particular instance of the  Database Engine 
. You connect to the service by using the name of the computer on which it is running.  
  
 You can manage the  Integration Services 
 service by using one of the following Microsoft Management Console (MMC) snap-ins: SQL Server Configuration Manager or Services. Before you can manage packages in  SQL Server Management Studio 
, you must make sure that the service is started.  
  
 By default, the  Integration Services 
 service is configured to manage packages in the msdb database of the instance of the  Database Engine 
 that is installed at the same time as  Integration Services 
. If an instance of the  Database Engine 
 is not installed at the same time, the  Integration Services 
 service is configured to manage packages in the msdb database of the local, default instance of the  Database Engine 
. To manage packages that are stored in a named or remote instance of the  Database Engine 
, or in multiple instances of the  Database Engine 
, you have to modify the configuration file for the service.
  
 By default, the  Integration Services 
 service is configured to stop running packages when the service is stopped. However, the  Integration Services 
 service does not wait for packages to stop and some packages may continue running after the  Integration Services 
 service is stopped.  
  
 If the  Integration Services 
 service is stopped, you can continue to run packages using the  SQL Server 
 Import and Export Wizard, the  SSIS 
 Designer, the Execute Package Utility, and the **dtexec** command prompt utility (dtexec.exe). However, you cannot monitor the running packages.  
  
 By default, the  Integration Services 
 service runs in the context of the NETWORK SERVICE account. It is recommended to run the SQL Server Integration Services service under an account that has limited permissions such as the NETWORK SERVICE account. Running the SQL Server Integration Services service under a highly-privileged account represents a potential security risk. 
  
 The  Integration Services 
 service writes to the Windows event log. You can view service events in  SQL Server Management Studio 
. You can also view service events by using the Windows Event Viewer.  
  
## Set the properties of the service
  
 The  Integration Services 
 service manages and monitors packages in  SQL Server Management Studio 
. When you first install  SQL Server 
  Integration Services 
, the  Integration Services 
 service is started and the startup type of the service is set to automatic.  
  
 After the  Integration Services 
 service has been installed, you can set the properties of the service by using either SQL Server Configuration Manager or the Services MMC snap-in.  
  
 To configure other important features of the service, including the locations where it stores and manages packages, you must modify the configuration file of the service.
  
### To set properties of the Integration Services service by using SQL Server Configuration Manager  
  
1.  On the **Start** menu, point to **All Programs**, point to **Microsoft SQL Server**, point to **Configuration Tools**, and then click **SQL Server Configuration Manager**.  
  
2.  In the **SQL Server Configuration Manager** snap-in, locate **SQL Server Integration Services** in the list of services, right-click **SQL Server Integration Services**, and then click **Properties**.  
  
3.  In the **SQL Server Integration Services Properties** dialog box you can do the following:  
  
    -   Click the **Log On** tab to view the logon information such as the account name.  
  
    -   Click the **Service** tab to view information about the service such as the name of the host computer and to specify the start mode of  Integration Services 
 service.  
  
        > **Note:**  
        >  The **Advanced** tab contains no information for  Integration Services 
 service.  
  
4.  Click **OK**.  
  
5.  On the **File** menu, click **Exit** to close the **SQL Server Configuration Manager** snap-in.  
  
### To set properties of the Integration Services service by using Services  
  
1.  In **Control Panel**, if you are using Classic View, click **Administrative Tools**, or, if you are using Category View, click **Performance and Maintenance** and then click **Administrative Tools**.  
  
2.  Click **Services**.  
  
3.  In the **Services** snap-in, locate **SQL Server Integration Services** in the list of services, right-click **SQL Server Integration Services**, and then click **Properties**.  
  
4.  In the **SQL Server Integration Services Properties** dialog box, you can do the following:  
  
    -   Click the **General** tab. To enable the service, select either the manual or automatic startup type. To disable the service, select Disable in the **Startup type** box. Selecting Disable does not stop the service if it is currently running.  
  
         If the service is already enabled, you can click **Stop** to stop the service, or click **Start** to start the service.  
  
    -   Click the **Log On** tab to view or edit the logon information.  
  
    -   Click the **Recovery** tab to view the default computer responses to service failure. You can modify these options to suit your environment.  
  
    -   Click the **Dependencies** tab to view a list of dependent services. The  Integration Services 
 service has no dependencies.  
  
5.  Click **OK**.  
  
6.  Optionally, if the startup type is Manual or Automatic, you can right-click **SQL Server Integration Services** and click **Start, Stop, or Restart**.  
  
7.  On the **File** menu, click **Exit** to close the **Services** snap-in.  

## Grant permissions to the service
  In previous versions of  SQL Server 
, by default when you installed  SQL Server 
 all users in the Users group in Local Users and Groups had access to the  Integration Services 
 service. When you install  SQL Server 2016 (13.x) 
 and later versions, users do not have access to the  Integration Services 
 service. The service is secure by default. After  SQL Server 
 is installed, the administrator must grant access to the service.
  
### To grant access to the Integration Services service  
  
1.  Run Dcomcnfg.exe. Dcomcnfg.exe provides a user interface for modifying certain settings in the registry.  
  
2.  In the **Component Services** dialog, expand the Component Services > Computers > My Computer > DCOM Config node.  
  
3.  Right-click **Microsoft SQL Server Integration Services 13.0**, and then click **Properties**.  
  
4.  On the **Security** tab, click **Edit** in the **Launch and Activation Permissions** area.  
  
5.  Add users and assign appropriate permissions, and then click Ok.  
  
6.  Repeat steps 4 - 5 for Access Permissions.  
  
7.  Restart SQL Server Management Studio.  
  
8.  Restart the  Integration Services 
 Service.  

### Event logged when permissions are missing

If the service account of the SQL Server Agent doesn't have the Integration Services DCOM **[Launch and Activation Permissions]**, the following event is added to the system event logs when the SQL Server Agent executes the SSIS package jobs:

```
Log Name: System
Source: **Microsoft-Windows-DistributedCOM**
Date: 1/9/2019 5:42:13 PM
Event ID: **10016**
Task Category: None
Level: Error
Keywords: Classic
User: NT SERVICE\SQLSERVERAGENT
Computer: testmachine
Description:
The application-specific permission settings do not grant Local Activation permission for the COM Server application with CLSID
{xxxxxxxxxxxxxxxxxxxxxxxxxxxxx}
and APPID
{xxxxxxxxxxxxxxxxxxxxxxxxxxxxx}
to the user NT SERVICE\SQLSERVERAGENT SID (S-1-5-80-344959196-2060754871-2302487193-2804545603-1466107430) from address LocalHost (Using LRPC) running in the application container Unavailable SID (Unavailable). This security permission can be modified using the Component Services administrative tool.
```

## Configure the service
 
When you install  Integration Services 
, the setup process creates and installs the configuration file for the  Integration Services 
 service. This configuration file contains the following settings:  
  
-   Packages are sent a stop command when the service stops.  
  
-   The root folders to display for  Integration Services 
 in Object Explorer of  SQL Server Management Studio 
 are the MSDB and File System folders.  
  
-   The packages in the file system that the  Integration Services 
 service manages are located in %ProgramFiles%\Microsoft SQL Server\130\DTS\Packages.  
  
 This configuration file also specifies which msdb database contains the packages that the  Integration Services 
 service will manage. By default, the  Integration Services 
 service is configured to manage packages in the msdb database of the instance of the  Database Engine 
 that is installed at the same time as  Integration Services 
. If an instance of the  Database Engine 
 is not installed at the same time, the  Integration Services 
 service is configured to manage packages in the msdb database of the local, default instance of the  Database Engine 
.  
  
### Default Configuration File Example  
 The following example shows a default configuration file that specifies the following settings:  
  
-   Packages stop running when the  Integration Services 
 service stops.  
  
-   The root folders for package storage in  Integration Services 
 are MSDB and File System.  
  
-   The service manages packages that are stored in the msdb database of the local, default instance of  SQL Server 
.  
  
-   The service manages packages that are stored in the file system in the Packages folder.  
  
 **Example of a Default Configuration File**  
  
```xml
\<?xml version="1.0" encoding="utf-8"?>  
\<DtsServiceConfiguration xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">  
  <StopExecutingPackagesOnShutdown>true</StopExecutingPackagesOnShutdown>  
  <TopLevelFolders>  
    \<Folder xsi:type="SqlServerFolder">  
      <Name>MSDB</Name>  
      <ServerName>.</ServerName>  
    </Folder>  
    \<Folder xsi:type="FileSystemFolder">  
      <Name>File System</Name>  
      <StorePath>..\Packages</StorePath>  
    </Folder>  
  </TopLevelFolders>    
</DtsServiceConfiguration>  
```  
  
### Modify the configuration file  
 You can modify the configuration file to allow packages to continue running if the service stops, to display additional root folders in Object Explorer, or to specify a different folder or additional folders in the file system to be managed by  Integration Services 
 service. For example, you can create additional root folders of type, **SqlServerFolder**, to manage packages in the msdb databases of additional instances of  Database Engine 
.  
  
> **Note:**  
>  Some characters are not valid in folder names. Valid characters for folder names are determined by the  .NET Framework 
 class **System.IO.Path** and the **GetInvalidFilenameChars** field. The **GetInvalidFilenameChars** field provides a platform-specific array of characters that cannot be specified in path string arguments passed to members of the **Path** class. The set of invalid characters can vary by file system. Typically, invalid characters are the quotation mark ("), less than (<) character, and pipe (|) character.  
  
 However, you will have to modify the configuration file to manage packages that are stored in a named instance or a remote instance of  Database Engine 
. If you do not update the configuration file, you cannot use **Object Explorer** in  SQL Server Management Studio 
 to view packages that are stored in the msdb database on the named instance or the remote instance. If you try to use **Object Explorer** to view these packages, you receive the following error message:  
  
 `Failed to retrieve data for this request. (Microsoft.SqlServer.SmoEnum)`  
  
 `The SQL Server specified in Integration Services service configuration is not present or is not available. This might occur when there is no default instance of SQL Server on the computer. For more information, see the topic "Configuring the Integration Services Service" in SQL Server 2008 Books Online.`  
  
 `Login Timeout Expired`  
  
 `An error has occurred while establishing a connection to the server. When connecting to SQL Server 2008, this failure may be caused by the fact that under the default settings SQL Server does not allow remote connections.`  
  
 `Named Pipes Provider: Could not open a connection to SQL Server [2]. (MsDtsSvr).`  
  
 To modify the configuration file for the  Integration Services 
 service, you use a text editor.  
  
> **Important:**  
>  After you modify the service configuration file, you must restart the service to use the updated service configuration.  
  
### Modified Configuration File Example  
 The following example shows a modified configuration file for  Integration Services 
. This file is for a named instance of  SQL Server 
 called `InstanceName` on a server named `ServerName`.  
  
 **Example of a Modified Configuration File for a Named Instance of SQL Server**  
  
```xml
\<?xml version="1.0" encoding="utf-8"?>  
\<DtsServiceConfiguration xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">  
  <StopExecutingPackagesOnShutdown>true</StopExecutingPackagesOnShutdown>  
  <TopLevelFolders>  
    \<Folder xsi:type="SqlServerFolder">  
      <Name>MSDB</Name>  
      <ServerName>ServerName\InstanceName</ServerName>  
    </Folder>  
    \<Folder xsi:type="FileSystemFolder">  
      <Name>File System</Name>  
      <StorePath>..\Packages</StorePath>  
    </Folder>  
  </TopLevelFolders>    
</DtsServiceConfiguration>  
```  
  
### Modify the Configuration File Location  
 The Registry key **HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SQL Server\130\SSIS\ServiceConfigFile** specifies the location and name for the configuration file that  Integration Services 
 service uses. The default value of the Registry key is **C:\Program Files\Microsoft SQL Server\130\DTS\Binn\MsDtsSrvr.ini.xml**. You can update the value of the Registry key to use a different name and location for the configuration file. Note that the version number in the path (120 for SQL Server   SQL Server 2014 (12.x)
, 130 for   SQL Server 2016 (13.x) 
, etc.) will vary depending on the SQL Server version.
  
> **Caution:**  
>  Incorrectly editing the Registry can cause serious problems that may require you to reinstall your operating system.  Microsoft 
 cannot guarantee that problems resulting from editing the Registry incorrectly can be resolved. Before editing the Registry, back up any valuable data. For information about how to back up, restore, and edit the Registry, see the  Microsoft 
 Knowledge Base article, [Description of the Microsoft Windows registry](https://support.microsoft.com/kb/256986).  
  
 The  Integration Services 
 service loads the configuration file when the service is started. Any changes to the Registry entry require that the service be restarted.  

## Connect to the local service
  Before you connect to the  Integration Services 
 service, the administrator must grant you access to the service. 
  
### To connect to the Integration Services Service  
  
1.  Open  SQL Server Management Studio 
.  
  
2.  Click **Object Explorer** on the **View** menu.  
  
3.  On the Object Explorer toolbar, click **Connect**, and then click **Integration Services**.  
  
4.  In the **Connect to Server** dialog box, provide a server name. You can use a period (.), (local), or **localhost** to indicate the local server.  
  
5.  Click **Connect**.  

## Connect to a remote SSIS server
  
 Connecting to an instance of  Integration Services 
 on a remote server, from  SQL Server Management Studio 
 or another management application, requires a specific set of rights on the server for the users of the application.  
  
> **Important:**
> To connect directly to an instance of the legacy Integration Services Service, you have to use the version of SQL Server Management Studio (SSMS) aligned with the version of SQL Server on which the Integration Services Service is running. For example, to connect to the legacy Integration Services Service running on an instance of SQL Server 2016, you have to use the version of SSMS released for SQL Server 2016. For more information, see [Release history for SQL Server Management Studio](https://learn.microsoft.com/ssms/release-history).
>
>  To manage packages that are stored on a remote server, you do not have to connect to the instance of the  Integration Services 
 service on that remote server. Instead, edit the configuration file for the  Integration Services 
 service so that  SQL Server Management Studio 
 displays the packages that are stored on the remote server.
  
### Connecting to Integration Services on a Remote Server  
  
#### To connect to Integration Services on a Remote Server  
  
1.  Open  SQL Server Management Studio 
.  
  
2.  Select **File**, **Connect Object Explorer** to display the **Connect to Server** dialog box.  
  
3.  Select **Integration Services** in the **Server type** list.  
  
4.  Type the name of a  SQL Server 
  Integration Services 
 server in the **Server name** text box.  
  
    > **Note:**  
    >  The  Integration Services 
 service is not instance-specific. You connect to the service by using the name of the computer on which the Integration Services service is running.  
  
5.  Click **Connect**.  
  
> **Note:**  
>  The **Browse for Servers** dialog box does not display remote instances of  Integration Services 
. In addition, the options available on the **Connection Options** tab of the **Connect to Server** dialog box, which is displayed by clicking the **Options** button, are not applicable to  Integration Services 
 connections.  
  
### Eliminating the "Access Is Denied" Error  
 When a user without sufficient rights attempts to connect to an instance of  Integration Services 
 on a remote server, the server responds with an "Access is denied" error message. You can avoid this error message by ensuring that users have the required DCOM permissions.  
  
#### To configure rights for remote users on Windows Server 2003 or Windows XP  
  
1.  If the user is not a member of the local Administrators group, add the user to the Distributed COM Users group. You can do this in the Computer Management MMC snap-in accessed from the **Administrative Tools** menu.  
  
2.  Open Control Panel, double-click **Administrative Tools,** and then double-click **Component Services** to start the Component Services MMC snap-in.  
  
3.  Expand the **Component Services** node in the left pane of the console. Expand the **Computers** node, expand **My Computer**, and then click the **DCOM Config** node.  
  
4.  Select the **DCOM Config** node, and then select SQL Server Integration Services 11.0 in the list of applications that can be configured.  
  
5.  Right-click on SQL Server Integration Services 11.0 and select **Properties**.  
  
6.  In the **SQL Server Integration Services 11.0 Properties** dialog box, select the **Security** tab.  
  
7.  Under **Launch and Activation Permissions**, select **Customize**, then click **Edit** to open the **Launch Permission** dialog box.  
  
8.  In the **Launch Permission** dialog box, add or delete users, and assign the appropriate permissions to the appropriate users and groups. The available permissions are Local Launch, Remote Launch, Local Activation, and Remote Activation. The Launch rights grant or deny permission to start and stop the service; the Activation rights grant or deny permission to connect to the service.  
  
9. Click OK to close the dialog box.  
  
10. Under **Access Permissions**, repeat steps 7 and 8 to assign the appropriate permissions to the appropriate users and groups.  
  
11. Close the MMC snap-in.  
  
12. Restart the  Integration Services 
 service.  
  
#### To configure rights for remote users on Windows 2000 with the latest service packs  
  
1.  Run **dcomcnfg.exe** at the command prompt.  
  
2.  On the **Applications** page of the **Distributed COM Configuration Properties** dialog box, select SQL Server Integration Services 11.0 and then click **Properties**.  
  
3.  Select the **Security** page.  
  
4.  Use the two separate dialog boxes to configure **Access Permissions** and **Launch Permissions**. You cannot distinguish between remote and local access - Access permissions include local and remote access, and Launch permissions include local and remote launch.  
  
5.  Close the dialog boxes and **dcomcnfg.exe**.  
  
6.  Restart the  Integration Services 
 service.  
  
### Connecting by using a Local Account

If you are working in a local Windows account on a client computer, you can connect to the  Integration Services 
 service on a remote computer only if a local account that has the same name and password and the appropriate rights exists on the remote computer.  
  
### SSIS Windows service doesn't support delegation

SSIS doesn't support the delegation of credentials, sometimes referred to as a double hop. In this scenario, you're working on a client computer, SSIS is installed on a second computer, and SQL Server is installed on a third computer. Although SSMS successfully passes your credentials from the client computer to the second computer (where SSIS is running), SSIS can't delegate your credentials from the second computer to the third computer (where SQL Server is running).

## Configure the firewall
  
 The Windows firewall system helps prevent unauthorized access to computer resources over a network connection. To access  Integration Services 
 through this firewall, you have to configure the firewall to enable access.  
  
> **Important:**  
>  To manage packages that are stored on a remote server, you do not have to connect to the instance of the  Integration Services 
 service on that remote server. Instead, edit the configuration file for the  Integration Services 
 service so that  SQL Server Management Studio 
 displays the packages that are stored on the remote server.
  
 The  Integration Services 
 service uses the DCOM protocol.
  
 There are many firewall systems available. If you are running a firewall other than Windows firewall, see your firewall documentation for information that is specific to the system you are using.  
  
 If the firewall supports application-level filtering, you can use the user interface that Windows provides to specify the exceptions that are allowed through the firewall, such as programs and services. Otherwise, you have to configure DCOM to use a limited set of TCP ports. The Microsoft website link previously provided includes information about how to specify the TCP ports to use.  
  
 The Integration Services service uses port 135, and the port cannot be changed. You have to open TCP port 135 for access to the service control manager (SCM). SCM performs tasks such as starting and stopping  Integration Services 
 services and transmitting control requests to the running service.  
  
 The information in the following section is specific to Windows firewall. You can configure the Windows firewall system by running a command at the command prompt, or by setting properties in the Windows firewall dialog box.  
  
 For more information about the default Windows firewall settings, and a description of the TCP ports that affect the Database Engine, Analysis Services, Reporting Services, and Integration Services, see [Configure the Windows Firewall to Allow SQL Server Access](../../sql-server/install/configure-the-windows-firewall-to-allow-sql-server-access.md).  
  
### Configuring a Windows firewall  
 You can use the following commands to open TCP port 135, add MsDtsSrvr.exe to the exception list, and specify the scope of unblocking for the firewall.  
  
#### To configure a Windows firewall using the Command Prompt window  
  
1.  Run the following command:

    ```dos
    netsh firewall add portopening protocol=TCP port=135 name="RPC (TCP/135)" mode=ENABLE scope=SUBNET
    ```
  
2.  Run the following command:

    ```dos
    netsh firewall add allowedprogram program="%ProgramFiles%\Microsoft SQL Server\100\DTS\Binn\MsDtsSrvr.exe" name="SSIS Service" scope=SUBNET
    ```
  
    > **Note:**  
    >  To open the firewall for all computers, and also for computers on the Internet, replace scope=SUBNET with scope=ALL.  
  
 The following procedure describes how to use the Windows user interface to open TCP port 135, add MsDtsSrvr.exe to the exception list, and specify the scope of unblocking for the firewall.  
  
#### To configure a firewall using the Windows firewall dialog box  
  
1.  In the Control Panel, double-click **Windows Firewall**.  
  
2.  In the **Windows Firewall** dialog box, click the **Exceptions** tab and then click **Add Program.**  
  
3.  In the **Add a Program** dialog box, **click Browse**, navigate to the Program Files\Microsoft SQL Server\100\DTS\Binn folder, click MsDtsSrvr.exe, and then click **Open**. Click **OK** to close the **Add a Program** dialog box.  
  
4.  On the **Exceptions** tab, click **Add Port.**  
  
5.  In the **Add a Port** dialog box, type **RPC(TCP/135)** or another descriptive name in the **Name** box, type **135** in the **Port Number** box, and then select **TCP**.  
  
    > **Important:**  
    >   Integration Services 
 service always uses port 135. You cannot specify a different port.  
  
6.  In the **Add a Port** dialog box, you can optionally click **Change Scope** to modify the default scope.  
  
7.  In the **Change Scope** dialog box, select **My network (subnet only)** or type a custom list, and then click **OK**.  
  
8.  To close the **Add a Port** dialog box, click **OK**.  
  
9. To close the **Windows Firewall** dialog box, click **OK**.  
  
    > **Note:**  
    >  To configure the Windows firewall, this procedure uses the **Windows Firewall** item in Control Panel. The **Windows Firewall** item only configures the firewall for the current network location profile. However, you can also configure the Windows firewall by using the **netsh** command line tool or the  Microsoft 
 Management Console (MMC) snap-in named Windows firewall with Advanced Security. For more information about these tools, see [Configure the Windows Firewall to Allow SQL Server Access](../../sql-server/install/configure-the-windows-firewall-to-allow-sql-server-access.md).
