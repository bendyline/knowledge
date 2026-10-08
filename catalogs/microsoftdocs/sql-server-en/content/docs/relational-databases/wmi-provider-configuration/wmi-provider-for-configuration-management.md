---
title: "WMI Provider for Configuration Management Concepts"
description: Learn about WMI provider, which is used with SQL Server Configuration Manager in Microsoft Management Console and Microsoft SQL Server Configuration Manager.
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "WMI Provider for Configuration Management"
  - "SQL Server WMI Provider"
  - "configuration management [WMI]"
  - "WMI Provider for Configuration Management, about WMI Provider for Configuration Management"
---
# WMI Provider for Configuration Management

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  The WMI provider is a published layer that is used with the  SQL Server 
 Configuration Manager snap-in for  Microsoft 
 Management Console (MMC) and the  Microsoft 
  SQL Server 
 Configuration Manager. It provides a unified way for interfacing with the API calls that manage the registry operations requested by  SQL Server 
 Configuration Manager and provides enhanced control and manipulation over the selected  SQL Server 
 services.  
  
 The  SQL Server 
 WMI Provider is a DLL and a MOF file, which are compiled automatically by  SQL Server 
 Setup.  
  
 The  SQL Server 
 WMI Provider contains a set of object classes used to control the  SQL Server 
 services using the following methods:  
  
-   A script language such as VBScript,  JScript 
, or Perl, in which Windows Query Language (WQL) can be embedded.  
  
-   The [Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer) object in an SMO managed code program.  
  
-   The  SQL Server 
 Configuration Manager or MMC with the  SQL Server 
 WMI provider snap-in.  
  
## Using a Script Language  
 The advantages of using a script language include the following:  
  
-   A development environment is not required.  
  
-   The files that support the script language are widely available.  
  
 The script can also work with other WMI Providers in addition to the  SQL Server 
 WMI Provider. A domain administrator can use a script to set up the services, network settings, and alias settings on multiple computers on a network.  
  
 This section deals with accessing the WMI Provider for Configuration Management from scripts in further detail.  
  
## Using the SMO ManagedComputer Object  
 The [Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer) object is a managed SMO object that provides access to the WMI Provider for Configuration Management. By using an SMO program, the [Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer) object can be used to view and modify  SQL Server 
 services, network settings, and alias settings. For more information, see [Managing Services and Network Settings by Using WMI Provider](../server-management-objects-smo/tasks/managing-services-and-network-settings-by-using-wmi-provider.md).  
  
## Using the Microsoft Management Console or SQL Server Configuration Manager  
 Microsoft Management Console (MMC) provides an interface to manage  SQL Server 
 services, as opposed to a scripting language or managed code program. The  SQL Server 
 Management MMC snap-in can be used to stop and start services, and to change service accounts.  
  
 The  SQL Server 
 Configuration Manager can also be used to manage  SQL Server 
 services, client and server protocols, and server aliases  
  
## Related content

- [Understanding the WMI Provider for Configuration Management](understanding-the-wmi-provider-for-configuration-management.md)
- [Working with the WMI Provider for Configuration Management](working-with-the-wmi-provider-for-configuration-management.md)
- [Using WQL and Scripting Languages with the WMI Provider](using-wql-and-scripting-languages-with-the-wmi-provider.md)
