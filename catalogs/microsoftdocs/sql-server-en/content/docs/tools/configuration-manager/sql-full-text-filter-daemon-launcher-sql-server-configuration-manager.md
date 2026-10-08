---
title: "SQL Full-Text Filter Daemon Launcher (SQL Server Configuration Manager)"
description: Learn about the SQL Full-text Filter Daemon Launcher, a service that SQL Server uses to start a process that it requires for full-text search.
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
# SQL Full-text Filter Daemon Launcher (SQL Server Configuration Manager)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


The SQL Full-text Filter Daemon Launcher (FDHOST Launcher) service is used by  SQL Server 
 full-text search to start the filter daemon host process, which handles full-text search filtering and word breaking.

You must run this service to use full-text search. The FDHOST Launcher service is an instance-aware service that associates with a specific instance of  SQL Server 
. The FDHOST Launcher service propagates the service account information to each filter daemon host process it starts.

For more information about the filter daemon host processes, see [Full-Text Search architecture](../../relational-databases/search/full-text-search.md#architecture).

## Configuration tabs

This article provides details about the available options when configuring the SQL Full-text Filter Daemon Launcher service. To access these property tabs, open **SQL Server Configuration Manager**, go to **SQL Server Services**, and open **SQL Full-Text Filter Daemon Launcher**.

- [Log On](#log-on-tab)
- [Service](#service-tab)
- [Advanced](#advanced-tab)

## Log On tab

Use the **Log On** tab of the **SQL Full-text Filter Daemon Launcher Properties** dialog box to specify the account used by the  SQL Server 
 full-text service, to change the password of an account, and to start and stop the service. Changing the password of an account takes effect after restarting the service.

When you change the account name used by a service on a clustered instance, the new account must be a member of the domain group specified during setup for the service, or you must have permission to add members to that group. If you don't have permission to modify group membership, contact the domain administrator.

For more information about selecting an account to run the service, see [Configure Windows service accounts and permissions](../../database-engine/configure-windows/configure-windows-service-accounts-and-permissions.md).

## Remarks

By default, only members of the local administrators group can start, stop, pause, resume or restart a service. To grant non-administrators the ability to manage services, see [How to grant users rights to manage services](https://learn.microsoft.com/troubleshoot/windows-server/windows-security/grant-users-rights-manage-services).

### Options

#### Built-in account

- **Local System**: Specify the local system account. This account doesn't require a password. However, the local system account might prevent the service from interacting with other servers, depending on the privileges granted to the account.

- **Local Service**: Specify the local service account. This account doesn't require a password. However, the local service account might prevent the service from interacting with other servers, depending on the privileges granted to the account.

- **Network Service**: Don't use the Network Service account for the  SQL Server 
 services or the  SQL Server 
 Agent services. Local User or Domain User accounts are more appropriate for these services.

#### This account

Specify a local or domain user account that uses Microsoft Windows Authentication. Use a domain user account that has minimal rights for services.

- **Account Name**: Specify the local or domain user account name.
- **Password**: Type the password of the account.
- **Confirm password**: Type the password of the account again.

#### Service status

- **Start**: Select this button to start the service.
- **Stop**: Select this button to stop the service.
- **Pause**: Select this button to pause the service. This option isn't available for the SQL Full-text Filter Daemon Launcher service.
- **Resume**: Resume a paused service.

## Advanced tab

The **Advanced** tab doesn't show any properties by default. If you define custom properties, they appear on this tab with their associated values.

## Service tab

Use the **Service** tab to view or specify the following options.

### Options

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
 Full-Text service.

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
