---
title: "RPC:Completed Event Class"
description: "The RPC:Completed event class indicates that a remote procedure call has been completed in SQL Server."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: randolphwest
ms.date: 10/20/2025
ms.service: sql
ms.subservice: supportability
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "RPC:Completed event class"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# RPC:Completed event class


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



The `RPC:Completed` event class indicates that a remote procedure call has been completed.

## RPC:Completed event class data columns

| Data column name | Data type | Description | Column ID | Filterable |
| --- | --- | --- | --- | --- |
| `ApplicationName` | **nvarchar** | Name of the client application that created the connection to an instance of  SQL Server |
| . This column is populated with the values passed by the application rather than the displayed name of the program. | 10 | Yes |
| `BinaryData` | **image** | Binary value dependent on the event class captured in the trace. | 2 | Yes |
| `ClientProcessID` | **int** | ID assigned by the host computer to the process where the client application is running. This data column is populated if the client process ID is provided by the client. | 9 | Yes |
| `CPU` | **int** | Amount of CPU time used by the event. In microseconds beginning with  SQL Server 2012 (11.x) |
| . In milliseconds in earlier versions. | 18 | Yes |
| `DatabaseID` | **int** | ID of the database specified by the `USE <database>` statement or the default database if no `USE <database>` statement has been issued for a given instance.  SQL Server Profiler |
 | displays the name of the database if the ServerName data column is captured in the trace and the server is available. Determine the value for a database by using the DB_ID function. | 3 | Yes |
| `DatabaseName` | **nvarchar** | Name of the database in which the user statement is running. | 35 | Yes |
| `Duration` | **bigint** | Amount of time taken by the event. In microseconds beginning with  SQL Server 2008 R2 (10.50.x) |
| . In milliseconds in earlier versions. | 13 | Yes |
| `EndTime` | **datetime** | Time at which the remote procedure call ended. | 15 | Yes |
| `Error` | **int** | Error number of a given event.<br /><br />`0`=OK<br />`1` = Error<br />`2` = Abort<br />`3` = Skipped | 31 | Yes |
| `EventClass` | **int** | Type of event = 10. | 27 | No |
| `EventSequence` | **int** | Sequence of a given event within the request. | 51 | No |
| `GroupID` | **int** | ID of the workload group where the SQL Trace event fires. | 66 | Yes |
| `HostName` | **nvarchar** | Name of the computer on which the client is running. This data column is populated if the host name is provided by the client. To determine the host name, use the `HOST_NAME` function. | 8 | Yes |
| `IsSystem` | **int** | Indicates whether the event occurred on a system process or a user process. `1` = system, `0` = user. | 60 | Yes |
| `LoginName` | **nvarchar** | Name of the login of the user (either  SQL Server |
 | security login or the Windows login credentials in the form of `<DOMAIN>\<username>`). | 11 | Yes |
| `LoginSid` | **image** | Security identification number (SID) of the logged-in user. You can find this information in the `sys.server_principals` catalog view. Each SID is unique for each login in the server. | 41 | Yes |
| `NTDomainName` | **nvarchar** | Windows domain to which the user belongs. | 7 | Yes |
| `NTUserName` | **nvarchar** | Windows user name. | 6 | Yes |
| `ObjectName` | **nvarchar** | Name of the object being referenced. | 34 | Yes |
| `Reads` | **bigint** | Number of page reads issued by the remote procedure call. | 16 | Yes |
| `RequestID` | **int** | ID of the request containing the statement. | 49 | Yes |
| `RowCounts` | **bigint** | Number of rows in the RPC batch. | 48 | Yes |
| `ServerName` | **nvarchar** | Name of the instance of  SQL Server |
 | being traced. | 26 |  |
| `SessionLoginName` | **nvarchar** | Login name of the user who originated the session. For example, if you connect to  SQL Server |
 | using `Login1` and execute a statement as `Login2`, `SessionLoginName` shows `Login1` and `LoginName` shows `Login2`. This column displays both  SQL Server |
 | and Windows logins. | 64 | Yes |
| `SPID` | **int** | ID of the session on which the event occurred. | 12 | Yes |
| `StartTime` | **datetime** | Time at which the event started, if available. | 14 | Yes |
| `TextData` | **ntext** | Text of the remote procedure call. | 1 | Yes |
| `TransactionID` | **bigint** | System-assigned ID of the transaction. | 4 | Yes |
| `Writes` | **bigint** | Number of page writes issued by the remote procedure call. | 17 | Yes |
| `XactSequence` | **bigint** | Token that describes the current transaction. | 50 | Yes |

## Related content

- [sp_trace_setevent (Transact-SQL)](../system-stored-procedures/sp-trace-setevent-transact-sql.md)
