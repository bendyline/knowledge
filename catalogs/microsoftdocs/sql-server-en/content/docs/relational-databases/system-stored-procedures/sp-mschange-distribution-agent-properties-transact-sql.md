---
title: "sys.sp_MSchange_distribution_agent_properties (Transact-SQL)"
description: Describes the sp_MSchange_distribution_agent_properties stored procedure used to change the properties of the Distribution Agent for a SQL Server Replication topology.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_MSchange_distribution_agent_properties"
  - "sp_MSchange_distribution_agent_properties_TSQL"
helpviewer_keywords:
  - "sp_MSchange_distribution_agent_properties"
dev_langs:
  - "TSQL"
---
# sys.sp_MSchange_distribution_agent_properties (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Changes the properties of a Distribution Agent job that runs at a  SQL Server 2005 (9.x) 
 or later version Distributor. This stored procedure is used to change properties when the Publisher runs on an instance of  SQL Server 2000 (8.x) 
. This stored procedure is executed at the Distributor on the distribution database.



## Syntax

```syntaxsql
sys.sp_MSchange_distribution_agent_properties
    [ @publisher = ] N'publisher'
    , [ @publisher_db = ] N'publisher_db'
    , [ @publication = ] N'publication'
    , [ @subscriber = ] N'subscriber'
    , [ @subscriber_db = ] N'subscriber_db'
    , [ @property = ] N'property'
    , [ @value = ] N'value'
[ ; ]
```

## Arguments

#### [ @publisher = ] N'*publisher*'

The name of the Publisher. *@publisher* is **sysname**, with no default.

#### [ @publisher_db = ] N'*publisher_db*'

The name of the publication database. *@publisher_db* is **sysname**, with no default.

#### [ @publication = ] N'*publication*'

The name of the publication. *@publication* is **sysname**, with no default.

#### [ @subscriber = ] N'*subscriber*'

The name of the Subscriber. *@subscriber* is **sysname**, with no default.

#### [ @subscriber_db = ] N'*subscriber_db*'

The name of the subscription database. *@subscriber_db* is **sysname**, with no default.

#### [ @property = ] N'*property*'

The publication property to change. *@property* is **sysname**, with no default.

#### [ @value = ] N'*value*'

The new property value. *@value* is **nvarchar(524)**, with no default.

This table describes the properties of the Distribution Agent job that can be changed, and restrictions on the values for those properties.

| Property | Value | Description |
| --- | --- | --- |
| `distrib_job_login` |  | Login for the  Microsoft |
 | Windows account under which the agent runs. |
| `distrib_job_password` |  | Password for the Windows account under which the agent job runs. |
| `subscriber_catalog` <sup>1</sup> |  | Catalog to be used when making a connection to the OLE DB provider. |
| `subscriber_datasource` <sup>1</sup> |  | Name of the data source as understood by the OLE DB provider. |
| `subscriber_location` <sup>1</sup> |  | Location of the database as understood by the OLE DB provider. |
| `subscriber_login` |  | Login to use when connecting to a Subscriber to synchronize the subscription. |
| `subscriber_password` |  | Subscriber password.<br /><br /> Do not use a blank password. Use a strong password. |
 |  |
| `subscriber_provider` <sup>1</sup> |  | Unique programmatic identifier (PROGID) with which the OLE DB provider for the non- SQL Server |
 | data source is registered. |
| `subscriber_providerstring` <sup>1</sup> |  | OLE DB provider-specific connection string that identifies the data source. |
| `subscriber_security_mode` | `1` | Windows Authentication.<br /><br /> When possible, use Windows authentication. |
 |  |
|  | `0` | SQL Server |
 | Authentication. |
| `subscriber_type` | `0` | SQL Server |
 | Subscriber |
|  | `1` | ODBC data source server |
|  | `3` | OLE DB provider |
| `subscriptionstreams` <sup>2</sup> |  | Denotes the number of connections allowed per Distribution Agent to apply batches of changes in parallel to a Subscriber. |

<sup>1</sup> Only valid for non- SQL Server 
 Subscribers.

<sup>2</sup> Not supported for non- SQL Server 
 Subscribers, Oracle Publishers, or peer-to-peer subscriptions.

> **Note:**  
> After changing an agent login or password, you must stop and restart the agent before the change takes effect.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_MSchange_distribution_agent_properties` is used in snapshot replication and transactional replication.

You can use [sp_changesubscription](sp-changesubscription-transact-sql.md) on a Publisher, to change properties of a Merge Agent job that synchronizes a push subscription that runs at the Distributor.

## Permissions

Only members of the **sysadmin** fixed server role at the Distributor can execute `sp_MSchange_distribution_agent_properties`.

## Related content

- [sys.sp_addpushsubscription_agent (Transact-SQL)](sp-addpushsubscription-agent-transact-sql.md)
- [sys.sp_addsubscription (Transact-SQL)](sp-addsubscription-transact-sql.md)
