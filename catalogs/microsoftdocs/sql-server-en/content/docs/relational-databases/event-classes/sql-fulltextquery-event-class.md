---
title: "SQL:FullTextQuery Event Class"
description: "SQL:FullTextQuery Event Class"
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "SQL:FullTextQuery event class"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# SQL:FullTextQuery Event Class

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  The SQL:FullTextQuery event class occurs when  SQL Server 
 executes a full text query. Include this event class in traces that are monitoring problems associated with full text catalogs.  
  
 When the SQL:FullTextQuery event class is included, the amount of overhead will be high. If such events occur frequently, the trace may significantly impede performance. To minimize this, limit the use of this event class to traces that monitor specific problems for brief periods of time.  
  
## SQL:FullTextQuery Event Class Data Columns  
  
| Data column name | Data type | Description | Column ID | Filterable |
| --- | --- | --- | --- | --- |
| ApplicationName | **nvarchar** | Name of the client application that created the connection to an instance of  SQL Server |
| . This column is populated with the values passed by the application rather than the displayed name of the program. | 10 | Yes |
| ClientProcessID | **int** | ID assigned by the host computer to the process where the client application is running. This data column is populated if the client provides the client process ID. | 9 | Yes |
| DatabaseID | **int** | ID of the database specified by the USE *database* statement or the default database if no USE *database*statement has been issued for a given instance.  SQL Server Profiler |
 | displays the name of the database if the ServerName data column is captured in the trace and the server is available. Determine the value for a database by using the DB_ID function. | 3 | Yes |
| DatabaseName | **nvarchar** | Name of the database in which the user statement is running. | 35 | Yes |
| Duration | **bigint** | Length of time to complete the Full Text Query. | 13 | No |
| EndTime | **datetime** | Time event ended | 15 | Yes |
| Error | **int** | Error message number. | 31 | Yes |
| EventClass | **int** | Type of event recorded = 123. | 27 | No |
| EventSequence | **int** | Sequence of a given event within the request. | 51 | No |
| GroupID | **int** | ID of the workload group where the SQL Trace event fires. | 66 | Yes |
| HostName | **nvarchar** | Name of the computer on which the client is running. This data column is populated if the client provides the host name. To determine the host name, use the HOST_NAME function. | 8 | Yes |
| IntegerData | **int** | Number of rows returned. If the query returns an error, the value is NULL. If the query returns no rows, the value is 0. | 25 | Yes |
| IsSystem | **int** | Indicates whether the event occurred on a system process or a user process. 1 = system, 0 = user. | 60 | Yes |
| LoginName | nvarchar | Name of the login of the user (either  SQL Server |
 | security login or the  Microsoft |
 | Windows login credentials in the form of DOMAIN\username). | 11 | Yes |
| LoginSid | **image** | Security identifier (SID) of the logged-in user. You can find this information in the sys.server_principals catalog view. Each SID is unique for each login in the server. | 41 | Yes |
| NTDomainName | **nvarchar** | Windows domain to which the user belongs. | 7 | Yes |
| ObjectID | **int** | System-assigned ID of the target | 22 | Yes |
| RequestID | **int** | Request identification that initiated the full text query. | 49 | Yes |
| ServerName | **nvarchar** | Name of the instance of  SQL Server |
 | being traced. | 26 | No |
| SessionLoginName | **nvarchar** | Login name of the user who originated the session. For example, if you connect to  SQL Server |
 | using Login1 and execute a statement as Login2, SessionLoginName shows Login1 and LoginName shows Login2. This column displays both  SQL Server |
 | and Windows logins. | 64 | Yes |
| SPID | **int** | ID of the session on which the event occurred. | 12 | Yes |
| StartTime | **datetime** | Time at which the event started, if available. | 14 | Yes |
| TextData | **nvarchar** | The full text portion of the query submitted to  SQL Server |
| . | 1 | No |
| TransactionID | **bigint** | System-assigned ID of the transaction. | 4 | Yes |
| XactSequence | **bigint** | Token that describes the current transaction. | 50 | Yes |
  
## Related content

- [sp_trace_setevent (Transact-SQL)](../system-stored-procedures/sp-trace-setevent-transact-sql.md)
