---
title: "WMI Provider for Configuration Management Classes"
description: Discover and implement the functionality that Windows Management Instrumentation provides. Choose from these classes for Configuration Manager.
author: markingmyname
ms.author: maghan
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "WMI Provider for Configuration Management, classes"
  - "classes [WMI]"
apilocation: "sqlmgmproviderxpsp2up.mof"
apiname: "WMI Classes"
---

# WMI Provider for Configuration Management Classes


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

The SQL Server WMI provider for Configuration Management exposes a set of classes that administrators, automation systems, and management tools can use to query and modify SQL Server instance settings, network libraries, protocol properties, error logs, and service configuration.  
This article organizes the WMI classes into functional groups so that you can quickly find the class that applies to your configuration scenario.

## Client-side Networking & Configuration Classes

These classes define how SQL Server clients resolve servers, use network libraries, and determine client-level communication settings.

| Class | Description |
| --- | --- |
| [ClientNetLibInfo](clientnetlibinfo-class/clientnetlibinfo-class.md) | Returns information about installed client network libraries and protocols |
| [ClientNetworkProtocol](clientnetworkprotocol-class/clientnetworkprotocol-class.md) | Represents a specific client network protocol configuration (such as TCP/IP or Named Pipes) |
| [ClientNetworkProtocolProperty](clientnetworkprotocolproperty-class/clientnetworkprotocolproperty-class.md) | Exposes protocol-level settings for client network protocols |
| [ClientSettings](clientsettings-class.md) | Provides high-level client configuration, including resolution behavior and defaults |
| [ClientSettingsGeneralFlag](clientsettingsgeneralflag-class/clientsettingsgeneralflag-class.md) | Represents general client flags used to toggle or control client features |

## Server Networking & Protocol Configuration

These classes control server-side networking options such as protocol enablement, IP bindings, and advanced communication properties.

| Class | Description |
| --- | --- |
| [ServerNetworkProtocol](servernetworkprotocol-class/servernetworkprotocol-class.md) | Represents a server-side network protocol (TCP/IP, Named Pipes, Shared Memory) |
| [ServerNetworkProtocolIPAddress](servernetworkprotocolipaddress-class/servernetworkprotocolipaddress-class.md) | Represents IP address-specific bindings and configuration for SQL Server network protocols |
| [ServerNetworkProtocolProperty](servernetworkprotocolproperty-class/servernetworkprotocolproperty-class.md) | Exposes protocol-level configurable settings such as ports and packet behavior |

## Server settings, flags, and instance metadata

These classes provide information you can use to query or control SQL Server instance-level settings, flags, and server environment details.

| Class | Description |
| --- | --- |
| [ServerSettings](serversettings-class/serversettings-class.md) | Defines general SQL Server instance configuration settings |
| [ServerSettingsGeneralFlag](serversettingsgeneralflag-class/serversettingsgeneralflag-class.md) | Represents configurable flags that enable or disable server-level features |
| [CInstance](cinstance-class.md) | Provides details for clustered SQL Server instances in failover cluster environments |
| [SInstance](sinstance-class/sinstance-class.md) | Represents a standalone SQL Server instance, including identity and configuration metadata |

## SQL Server services and alias management

Use these classes to manage SQL Server services, such as starting, stopping, and configuring them. You can also manage client and server alias definitions.

| Class | Description |
| --- | --- |
| [SqlService](sqlservice-class/sqlservice-class.md) | Represents a SQL-related Windows service, such as SQL Server, SQL Agent, or Browser, and allows you to manage its state |
| [SqlServiceAdvancedProperty](sqlserviceadvancedproperty-class/sqlserviceadvancedproperty-class.md) | Exposes advanced service configuration properties |
| [SqlServerAlias](sqlserveralias-class/sqlserveralias-class.md) | Represents client-side alias definitions for redirecting SQL Server connections |

## SQL Server error log and diagnostic classes

These classes expose SQL Server error log metadata and error events. By using them, you can monitor or automate log parsing.

| Class | Description |
| --- | --- |
| [SqlErrorLogEvent](sqlerrorlogevent-class.md) | Represents individual events recorded in the SQL Server error log |
| [SqlErrorLogFile](sqlerrorlogfile-class.md) | Provides metadata about SQL Server error log files, including paths, sizes, and rollover behavior |

## Security and certificate configuration

These classes support client and server certificate management for encrypted connections.

| Class | Description |
| --- | --- |
| [SecurityCertificate](securitycertificate-class/securitycertificate-class.md) | Represents certificates that SQL Server uses for encrypted network communication |

## Related content

- [WMI Provider for Configuration Management](../wmi-provider-configuration/wmi-provider-for-configuration-management.md)
