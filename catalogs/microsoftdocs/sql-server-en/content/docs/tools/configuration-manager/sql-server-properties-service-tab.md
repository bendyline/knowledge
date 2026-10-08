---
title: "SQL Server Properties (Service Tab)"
description: Learn about the options on the Service tab of the MSSQLSERVER Properties dialog box, such as the binary path, the host name, and the start mode.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/15/2025
ms.service: sql
ms.subservice: tools-other
ms.topic: ui-reference
ms.collection:
  - data-tools
monikerRange: ">=sql-server-2017"
---
# SQL Server Properties (Service tab)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


This service is the  SQL Server 
 service. This service must be running for  SQL Server 
 to work properly. The property values in light gray can't be changed by using this application.

Use the **Service** tab on the **Properties** dialog box to view or specify the following options.

## Options

#### Binary Path

Displays the location of the program files used by this service.

#### Error Control

`1` indicates `SERVICE_ERROR_NORMAL`. If the service fails to start during computer startup, the startup program logs the error and displays a pop-up message box but continues the startup operation. This value can't be changed.

#### Exit Code

When an error occurs, the error number appears in this box.

The Windows error code defines any problems encountered in starting or stopping the service. This property is set to `ERROR_SERVICE_SPECIFIC_ERROR` (`1066`) when the error is unique to the service represented by this class, and information about the error is available in the `ServiceSpecificExitCode` property. The service sets this value to `NO_ERROR` (`0`) when running, and again upon normal termination.

Use this number to troubleshoot failures by searching on Microsoft Learn, or provide the number to your technical support staff.


#### Host Name

Displays the name of the computer or cluster running the  SQL Server 
 service.

#### Name

Indicates the display name of the service.

#### Process ID

Displays the number used by Windows to keep track of this program's processes.

#### SQL Service Type

Displays the type of service provided to calling processes.  SQL Server 
 installs several services.

#### Start Mode

Set this service to the following choices:

- **Manual**: This service doesn't automatically start when the computer starts. You must start the service using  SQL Server 
 Configuration Manager, or some other tool.

- **Automatic**: This service attempts to start when this computer starts.

- **Disabled**: This service can't be started.

#### State

Indicates whether this service is running, stopped, or disabled.

## Related content

- [SQL Server Services](sql-server-services.md)
