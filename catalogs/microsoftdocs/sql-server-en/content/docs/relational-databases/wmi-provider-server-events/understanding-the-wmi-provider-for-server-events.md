---
title: "Understand the WMI Provider for Server Events"
description: Learn how the WMI Provider for Server Events uses Windows Management Instrumentation to monitor events by turning SQL Server into a managed WMI object.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 10/30/2023
ms.service: sql
ms.subservice: wmi
ms.topic: "reference"
helpviewer_keywords:
  - "architecture [WMI]"
  - "SQL Server Agent [WMI]"
  - "WMI Provider for Server Events, about WMI Provider for Server Events"
---
# Understand the WMI Provider for Server Events


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

The WMI Provider for Server Events lets you use the Windows Management Instrumentation (WMI) to monitor events in  SQL Server 
. The provider works by turning  SQL Server 
 into a managed WMI object. Any event that can generate an event notification in  SQL Server 
 can be leveraged by the WMI by using this provider. Additionally, as a management application that interacts with the WMI,  SQL Server 
 Agent can respond to these events, increasing the scope of events covered by  SQL Server 
 Agent over earlier releases.

Management applications such as  SQL Server 
 Agent can access  SQL Server 
 events using the WMI Provider for Server Events by issuing WMI Query Language (WQL) statements. WQL is a simplified subset of structured query language (SQL), with some WMI-specific extensions. In using WQL, an application retrieves an event type against a specific database or database object. The WMI Provider for Server Events translates the query into an event notification, effectively creating an event notification in the target database. For more information about how event notifications work in  SQL Server 
, see [WMI Provider for Server Events concepts](wmi-provider-for-server-events-concepts.md). The events that can be queried are listed in [WMI Provider for Server Events classes and properties](wmi-provider-for-server-events-classes-and-properties.md).

When an event occurs that triggers the event notification to send a message, the message goes to a predefined target service in `msdb` that is named `SQL/Notifications/ProcessWMIEventProviderNotification/v1.0`. The service puts the event into a predefined queue in `msdb` that is named `WMIEventProviderNotificationQueue`. (Both the service and the queue are created dynamically by the provider when it first connects to  SQL Server 
.) The provider then reads the event data from this queue and transforms it into managed object format (MOF) before returning it to the application. The following illustration shows this process.

Flow diagram of the WMI Provider for Server Events.

For example, consider the following WQL Query:

```wql
SELECT * FROM DDL_DATABASE_LEVEL_EVENTS
WHERE DatabaseName = 'AdventureWorks2022';
```

In response to this query, the WMI Provider for Server Events creates the equivalent event notification in the target database:

```sql
USE AdventureWorks2022;
GO
CREATE EVENT NOTIFICATION SQLWEP_76CF38C1_18BB_42DD_A7DC_C8820155B0E9
    ON DATABASE
    WITH FAN_IN
    FOR DDL_DATABASE_LEVEL_EVENTS
    TO SERVICE
        'SQL/Notifications/ProcessWMIEventProviderNotification/v1.0',
        'A7E5521A-1CA6-4741-865D-826F804E5135';
GO
```

In this example, `SQLWEP_76CF38C1_18BB_42DD_A7DC_C8820155B0E9` is a  Transact-SQL  identifier that is made up of the prefix `SQLWEP_` and a GUID. `SQLWEP` creates a new GUID for each identifier. The value `A7E5521A-1CA6-4741-865D-826F804E5135` in the `TO SERVICE` clause is the GUID that identifies the broker instance in the `msdb` database.

For more information about how to work with WQL, see [Using WQL with the WMI Provider for Server Events](https://learn.microsoft.com/previous-versions/sql/sql-server-2008-r2/ms180524\(v=sql.105\)).

Management applications direct the WMI Provider for Server Events to an instance of  SQL Server 
 by connecting to a WMI namespace that is defined by the provider. The Windows WMI service maps this namespace to the provider DLL, `sqlwep.dll`, and loads it into memory. The provider manages a WMI namespace for Server Events for each instance of  SQL Server 
, and the format is `\\.\<root>\Microsoft\SqlServer\ServerEvents\<instance_name>`, where `<instance_name>` defaults to `MSSQLSERVER`. For more information about how to connect to a WMI namespace for an instance of  SQL Server 
, see [Using WQL with the WMI Provider for Server Events](https://learn.microsoft.com/previous-versions/sql/sql-server-2008-r2/ms180524\(v=sql.105\)).

The provider DLL, `sqlwep.dll`, is loaded only one time into the WMI host service of the operating system of the server, regardless of how many instances of  SQL Server 
 are on the server.

For an example of a  SQL Server 
 Agent management application that uses the WMI Provider for Server Events, see [Sample: Create a SQL Server Agent Alert with the WMI Provider](sample-creating-a-sql-server-agent-alert-with-the-wmi-provider.md). For an example of a management application that uses the WMI Provider for Server Events in managed code, see [Sample: Use the WMI Event Provider with the .NET Framework](sample-using-the-wmi-event-provider-with-the-net-framework.md). More information is also available about WMI in the  Microsoft 
  .NET Framework 
 SDK.

## Related content

- [WMI Provider for Server Events concepts](wmi-provider-for-server-events-concepts.md)
