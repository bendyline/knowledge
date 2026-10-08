---
title: "Broker:Conversation Event Class"
description: "Use the Broker:Conversation event class to report the progress of a Service Broker conversation."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: randolphwest
ms.date: 03/30/2025
ms.service: sql
ms.subservice: supportability
ms.topic: reference
helpviewer_keywords:
  - "Broker:Conversation event class"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Broker:Conversation event class


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





 SQL Server 
 generates a `Broker:Conversation` event to report the progress of a Service Broker conversation.

## Broker:Conversation event class data columns

| Data column | Type | Description | Column number | Filterable |
| --- | --- | --- | --- | --- |
| `ApplicationName` | **nvarchar** | The name of the client application that created the connection to an instance of  SQL Server |
| . This column is populated with the values passed by the application instead of the displayed name of the program. | 10 | Yes |
| `ClientProcessID` | **int** | The ID assigned by the host computer to the process where the client application is running. This data column is populated if the client process ID is provided by the client. | 9 | Yes |
| `DatabaseID` | **int** | The ID of the database that is specified by the `USE <database>` statement. If no `USE <database>` statement was issued, this column specifies the ID of the default database.  SQL Server Profiler |
 | displays the name of the database if the **ServerName** data column is captured in the trace and the server is available. Determine the value for a database by using the `DB_ID` function. | 3 | Yes |
| `EventClass` | **int** | The type of event class captured. Always `124` for `Broker:Conversation`. | 27 | No |
| `EventSequence` | **int** | Sequence number for this event. | 51 | No |
| `EventSubClass` | **nvarchar** | The type of event subclass. This provides more information about each event class. | 21 | Yes |
| `GUID` | **uniqueidentifier** | The conversation ID of the dialog. This identifier is transmitted as part of the message, and is shared between both sides of the conversation. | 54 | No |
| `HostName` | **nvarchar** | The name of the computer on which the client is running. This data column is populated if the host name is provided by the client. To determine the host name, use the `HOST_NAME` function. | 8 | Yes |
| `IsSystem` | **int** | Indicates whether the event occurred on a system process or a user process.<br /><br />0 = `user`<br />1 = `system` | 60 | No |
| `LoginSid` | **image** | The security identification number (SID) of the logged-in user. Each SID is unique for each login in the server. | 41 | Yes |
| `MethodName` | **nvarchar** | The conversation group that the conversation belongs to. | 47 | No |
| `NTDomainName` | **nvarchar** | The Windows domain to which the user belongs. | 7 | Yes |
| `NTUserName` | **nvarchar** | The name of the user that owns the connection that generated this event. | 6 | Yes |
| `ObjectName` | **nvarchar** | The conversation handle of the dialog. | 34 | No |
| `Priority` | **int** | The priority level of the conversation | 5 | Yes |
| `RoleName` | **nvarchar** | The role of the conversation handle. This is either `initiator` or `target`. | 38 | No |
| `ServerName` | **nvarchar** | The name of the instance of  SQL Server |
 | that is being traced. | 26 | No |
| `Severity` | **int** | The  SQL Server |
 | error severity, if this event reports an error. | 29 | No |
| `SPID` | **int** | The session ID that is assigned by  SQL Server |
 | to the process that is associated with the client. | 12 | Yes |
| `StartTime` | **datetime** | The time when the event started, when available. | 14 | Yes |
| `TextData` | **ntext** | The current state of the conversation. Can have one of the following values: | 1 | Yes |
|  |  | `SO`. Started outbound.  SQL Server |
 | processed a `BEGIN CONVERSATION` for this conversation, but no messages have been sent. |  |  |
|  |  | `SI`. Started inbound. Another instance of the  Database Engine |
 | started a new conversation with the current instance, but the current instance hasn't finished receiving the first message.  SQL Server |
 | might create the conversation in this state if the first message is fragmented or  SQL Server |
 | receives messages out of order. However,  SQL Server |
 | might create the conversation in the `CO` state if the first transmission that was received for the conversation contains the complete first message. |  |  |
|  |  | `CO`. Conversing. The conversation is established, and both sides of the conversation can send messages. Most communication for a typical service happens when the conversation is in this state. |  |  |
|  |  | `DI`. Disconnected inbound. The remote side of the conversation has issued an `END CONVERSATION`. The conversation remains in this state until the local side of the conversation issues an `END CONVERSATION`. An application can still receive messages for the conversation. Because the remote side of the conversation has ended the conversation, an application can't send messages on this conversation. When an application issues an `END CONVERSATION`, the conversation moves to the Closed (`CD`) state. |  |  |
|  |  | `DO`. Disconnected outbound. The local side of the conversation has issued an `END CONVERSATION`. The conversation remains in this state until the remote side of the conversation acknowledges the `END CONVERSATION`. An application can't send or receive messages for the conversation. When the remote side of the conversation acknowledges the `END CONVERSATION`, the conversation moves to the Closed (`CD`) state. |  |  |
|  |  | `ER`. Error. An error has occurred on this endpoint. The `Error`, `Severity`, and `State` columns contain information about the specific error that occurred. |  |  |
|  |  | `CD`. Closed. The conversation endpoint is no longer in use. |  |  |
| `TransactionID` | **bigint** | The system-assigned ID of the transaction. | 4 | No |

The following table lists the subclass values for this event class.

| ID | Subclass | Description |
| --- | --- | --- |
| 1 | `SEND Message` | SQL Server |
 | generates a `SEND Message` event when the  Database Engine |
 | executes a SEND statement. |
| 2 | `END CONVERSATION` | SQL Server |
 | generates an `END CONVERSATION` event when the  Database Engine |
 | executes an `END CONVERSATION` statement that doesn't include the `WITH ERROR` clause. |
| 3 | `END CONVERSATION WITH ERROR` | SQL Server |
 | generates an `END CONVERSATION WITH ERROR` event when the  Database Engine |
 | executes an `END CONVERSATION` statement that includes the `WITH ERROR` clause. |
| 4 | `Broker Initiated Error` | SQL Server |
 | generates a `Broker Initiated Error` event whenever  Service Broker |
 | creates an error message. For example, when  Service Broker |
 | can't successfully route a message for a dialog, the broker creates an error message for the dialog and generates this event.  SQL Server |
 | doesn't generate this event when an application program ends a conversation with an error. |
| 5 | `Terminate Dialog` | Service Broker |
 | terminated the dialog.  Service Broker |
 | terminates dialogs in response to conditions that prevent the dialog from continuing, but which aren't errors or the normal end of a conversation. For example, dropping a service causes  Service Broker |
 | to terminate all dialogs for that service. |
| 6 | `Received Sequenced Message` | SQL Server |
 | generates a `Received Sequenced Message` event class when  SQL Server |
 | receives a message that contains a message sequence number. All user-defined message types are sequenced messages.  Service Broker |
 | generates an unsequenced message in two cases:<br /><br />Error messages generated by  Service Broker |
 | are unsequenced.<br /><br />Message acknowledgments might be unsequenced. For efficiency,  Service Broker |
 | includes message any available acknowledgment as part of a sequenced message. However, if an application doesn't send a sequenced message to the remote endpoint within a certain period of time,  Service Broker |
 | creates an unsequenced message for the message acknowledgment. |
| 7 | `Received END CONVERSATION` | SQL Server |
 | generates a `Received END CONVERSATION` event when  SQL Server |
 | receives an End Dialog message from the other side of the conversation. |
| 8 | `Received END CONVERSATION WITH ERROR` | SQL Server |
 | generates a `Received END CONVERSATION WITH ERROR` event when  SQL Server |
 | receives a user-defined error from the other side of the conversation.  SQL Server |
 | doesn't generate this event when  SQL Server |
 | receives a broker-defined error. |
| 9 | `Received Broker Error Message` | SQL Server |
 | generates a `Received Broker Error Message` event when  Service Broker |
 | receives a broker-defined error message from the other side of the conversation.  SQL Server |
 | doesn't generate this event when  Service Broker |
 | receives an error message that was generated by an application.<br /><br />For example, if the current database contains a default route to a forwarding database,  Service Broker |
 | routes a message with an unknown service name to the forwarding database. If that database can't route the message, the broker in that database creates an error message and returns that error message to the current database. When the current database receives the broker-generated error from the forwarding database, the current database generates a `Received Broker Error Message` event. |
| 10 | `Received END CONVERSATION Ack` | SQL Server |
 | generates a `Received END CONVERSATION Ack` event class when the other side of a conversation acknowledges an `End Dialog` or `Error` message sent by this side of the conversation. |
| 11 | `BEGIN DIALOG` | SQL Server |
 | generates a `BEGIN DIALOG` event when the Database Engine executes a `BEGIN DIALOG` command. |
| 12 | `Dialog Created` | SQL Server |
 | generates a `Dialog Created` event when  Service Broker |
 | creates an endpoint for a dialog.  Service Broker |
 | creates an endpoint whenever a new dialog is established, regardless of whether the current database is the initiator or the target of the dialog. |
| 13 | `END CONVERSATION WITH CLEANUP` | SQL Server |
 | generates an `END CONVERSATION WITH CLEANUP` event when the  Database Engine |
 | executes an `END CONVERSATION` statement that includes the `WITH CLEANUP` clause. |

## Related content

- [Service Broker](../../database-engine/configure-windows/sql-server-service-broker.md)
