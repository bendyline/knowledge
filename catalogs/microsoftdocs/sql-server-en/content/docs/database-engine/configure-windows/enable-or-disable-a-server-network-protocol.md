---
title: Enable or Disable a Server Network Protocol
description: Use SQL Server Configuration Manager or PowerShell to enable or disable a SQL Server server network protocol.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "network protocols [SQL Server], disabling"
  - "remote connections [SQL Server], enabling using Configuration Manager"
  - "protocols [SQL Server], enabling using Configuration Manager"
  - "protocols [SQL Server], disabling using Configuration Manager"
  - "disabling network protocols, Configuration Manager"
  - "network protocols [SQL Server], enabling"
  - "enabling network protocols, Configuration Manager"
  - "surface area configuration [SQL Server], connection protocols"
  - "connections [SQL Server], enabling remote using Configuration Manager"
---
# Enable or disable a server network protocol


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


All network protocols are installed during installation, by  SQL Server 
 Setup, but might or might not be enabled. This article describes how to enable or disable a server network protocol in  SQL Server 
 by using  SQL Server 
 Configuration Manager or PowerShell. The  Database Engine 
 must be stopped and restarted for the change to take effect.

## Remarks

- During setup of  SQL Server Express 
 edition, a login is added for the BUILTIN\Users group. This login allows all authenticated users of the computer to access the instance of  SQL Server Express 
 as a member of the public role. The BUILTIN\Users login can be safely removed to restrict  Database Engine 
 access to computer users who have individual logins or are members of other Windows groups with logins.

-  SQL Server 
 and  Microsoft 
 data providers for  SQL Server 
 up to  SQL Server 2014 (12.x)
 only support TLS 1.0 and SSL 3.0 by default. If you enforce a different protocol (such as TLS 1.1 or TLS 1.2) by making changes in the operating system SChannel layer, your connections to  SQL Server 
 might fail, unless you install the appropriate update to add support for TLS 1.1 and 1.2 to  SQL Server 
. For more information, see [TLS 1.2 support for Microsoft SQL Server](https://learn.microsoft.com/troubleshoot/sql/database-engine/connect/tls-1-2-support-microsoft-sql-server). In  SQL Server 2016 (13.x) 
 and later versions, all release versions of SQL Server include at least TLS 1.2 support without further updates required.

<a id="SSMSProcedure"></a>

## Use SQL Server Configuration Manager

1. In  SQL Server 
 Configuration Manager, in the console pane, expand **SQL Server Network Configuration**.

1. In the console pane, select **Protocols for _\<instance name>_**.

1. In the details pane, right-click the protocol you want to change, and then select **Enable** or **Disable**.

1. In the console pane, select **SQL Server Services**.

1. In the details pane, right-click **SQL Server (_\<instance name>_)**, and then select **Restart**, to stop and restart the  SQL Server 
 service.

> **Note:**  
> If you have a named instance of  SQL Server 
, including  SQL Server Express 
 edition, you should also restart the SQL Server Browser service.

<a id="PowerShellProcedure"></a>

## Use SQL Server PowerShell

### Enable a server network protocol with PowerShell

1. Using administrator permissions, open a command prompt.

1. Start Windows PowerShell from the taskbar or Start menu.

1. Import the **SqlServer** module by entering `Import-Module SqlServer`.

1. Execute the following statements to enable both the TCP and named pipes protocols. Replace `<computer_name>` with the name of the computer that is running  SQL Server 
. If you're configuring a named instance (including  SQL Server Express 
 edition), replace `MSSQLSERVER` with the instance name.

   To disable protocols, set the `IsEnabled` properties to `$false`.

   You can run this script from any machine, with or without SQL Server installed. Make sure you have the **SqlServer** module installed.

   ```powershell
   # This script requires the SqlServer module
   Import-Module SQLServer

   $wmi = New-Object Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer <#computer_name#>

   # List the object properties, including the instance names.
   $Wmi

   # Enable the TCP protocol on the default instance.
   $uri = "ManagedComputer[@Name='<#computer_name#>']/ServerInstance[@Name='MSSQLSERVER']/ServerProtocol[@Name='Tcp']"
   $Tcp = $wmi.GetSmoObject($uri)
   $Tcp.IsEnabled = $true
   $Tcp.Alter()
   $Tcp

   # Enable the named pipes protocol for the default instance.
   $uri = "ManagedComputer[@Name='<#computer_name#>']/ServerInstance[@Name='MSSQLSERVER']/ServerProtocol[@Name='Np']"
   $Np = $wmi.GetSmoObject($uri)
   $Np.IsEnabled = $true
   $Np.Alter()
   $Np
   ```

### Configure the protocols for the local computer

When the script is run locally and configures the local computer,  SQL Server 
 PowerShell can make the script more flexible by dynamically determining the local computer name. To retrieve the local computer name, replace the line setting the `$uri` variable with the following line.

```powershell
$uri = "ManagedComputer[@Name='" + (get-item env:\computername).Value + "']/ServerInstance[@Name='MSSQLSERVER']/ServerProtocol[@Name='Tcp']"
```

### Restart the Database Engine with SQL Server PowerShell

After you enable or disable protocols, you must stop and restart the  Database Engine 
 for the change to take effect. Execute the following statements to stop and start the default instance by using  SQL Server 
 PowerShell. To stop and start a named instance, replace `'MSSQLSERVER'` with `'MSSQL$<instance_name>'`.

```powershell
# Get a reference to the ManagedComputer class.
Set-Location SQLSERVER:\SQL\<computer_name>
$Wmi = (get-item .).ManagedComputer

# Get a reference to the default instance of the Database Engine.
$DfltInstance = $Wmi.Services['MSSQLSERVER']

# Display the state of the service.
$DfltInstance

# Stop the service.
$DfltInstance.Stop();

# Wait until the service has time to stop.

# Refresh the cache.
$DfltInstance.Refresh();

# Display the state of the service.
$DfltInstance

# Start the service again.
$DfltInstance.Start();

# Wait until the service has time to start.

# Refresh the cache and display the state of the service.
$DfltInstance.Refresh();
$DfltInstance
```

If you have a named instance of  SQL Server 
, including  SQL Server Express 
 edition, you should also restart the SQL Server Browser service.

## Related content

- [Start, stop, pause, resume, and restart SQL Server services](start-stop-pause-resume-restart-sql-server-services.md)
- [SQL Server Browser (SQL Server Configuration Manager)](../../tools/configuration-manager/sql-server-browser-sql-server-configuration-manager.md)
