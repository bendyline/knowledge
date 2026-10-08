---
title: "SqlServiceType Property (SqlServiceAdvancedProperty)"
description: "SqlServiceType Property (SqlServiceAdvancedProperty Class)"
author: markingmyname
ms.author: maghan
ms.date: 12/16/2025
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "SqlServiceType property"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "SqlServiceType Property (SqlServiceAdvancedProperty Class)"
apitype: "MOFDef"
---
# SqlServiceType property (SqlServiceAdvancedProperty class)


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Gets the type of the managed service associated with the advanced property.

## Syntax

```csharp
object.SetBoolValue(NumValue)
```

## Parts

#### *object*

A [SqlServiceAdvancedProperty Class](sqlserviceadvancedproperty-class.md) object that represents an advanced property.

## Return value

A `uint32` value that specifies the  SQL Server 
 service type.

## Remarks

Return values can be one of the following:

| Type | Name | Definition |
| --- | --- | --- |
| `1` | `MSSQLSERVER` | SQL Server |
 | service. |
| `2` | `SQLSERVERAGENT` | SQL Server |
 | Agent service. |
| `3` | `MSFTESQL` | SQL Server |
 | Full-Text Search Engine service. |
| `4` | `MsDtsServer` | Integration Services |
 | service. |
| `5` | `MSSQLServerOLAPService` | Analysis Services |
 | service. |
| `6` | `ReportServer` | Reporting Services |
 | service. |
| `7` | `SQLBrowser` | SQL Server |
 | Browser service. |
| `8` | `NsService` | SQL Server |
 | Notification Services service. |
| `9` | `MSSQLFDLauncher` | SQL Server |
 | Full-text Filter Daemon Launcher service. |
| `10` | `SQLPBENGINE` | SQL Server |
 | PolyBase Engine service. |
| `11` | `SQLPBDMS` | SQL Server |
 | PolyBase Data Movement service. |
| `12` | `MSSQLLaunchpad` | SQL Server |
 | Launchpad service. |

## Related content

- [Start, stop, pause, resume, and restart SQL Server services](../../../database-engine/configure-windows/start-stop-pause-resume-restart-sql-server-services.md)
