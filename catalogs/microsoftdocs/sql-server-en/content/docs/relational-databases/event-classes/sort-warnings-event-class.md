---
title: "Sort Warnings Event Class"
description: "Sort Warnings Event Class"
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "Sort Warnings event class"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Sort Warnings Event Class

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  The Sort Warnings event class indicates that sort operations do not fit into memory. This does not include sort operations involving the creation of indexes, only sort operations within a query (such as an ORDER BY clause used in a SELECT statement).  
  
 If a query involving a sort operation generates a Sort Warnings event class with an EventSubClass data column value of 2, the performance of the query can be affected because multiple passes over the data are required to sort the data. Investigate the query further to determine if the sort operation can be eliminated.  
  
## Sort Warnings Event Class Data Columns  
  
| Data column name | Data type | Description | Column ID | Filterable |
| --- | --- | --- | --- | --- |
| ApplicationName | **nvarchar** | Name of the client application that created the connection to an instance of  SQL Server |
| . This column is populated with the values passed by the application rather than the displayed name of the program. | 10 | Yes |
| ClientProcessID | **int** | ID assigned by the host computer to the process where the client application is running. This data column is populated if the client provides the client process ID. | 9 | Yes |
| DatabaseID | **int** | ID of the database specified by the USE *database* statement or the default database if no USE *database* statement has been issued for a given instance.  SQL Server Profiler |
 | displays the name of the database if the ServerName data column is captured in the trace and the server is available. Determine the value for a database by using the DB_ID function. | 3 | Yes |
| DatabaseName | **nvarchar** | Name of the database in which the user statement is running. | 35 | Yes |
| EventClass | **int** | Type of event = 69. | 27 | No |
| EventSequence | **int** | The sequence of a given event within the request. | 51 | No |
| EventSubClass | **int** | Type of event subclass.<br /><br /> 1 = Single pass. When the sort table was written to disk, only a single additional pass over the data was required to obtain sorted output.<br /><br /> 2 = Multiple pass. When the sort table was written to disk, multiple passes over the data were required to obtain sorted output. | 21 | Yes |
| GroupID | **int** | ID of the workload group where the SQL Trace event fires. | 66 | Yes |
| HostName | **nvarchar** | Name of the computer on which the client is running. This data column is populated if the client provides the host name. To determine the host name, use the HOST_NAME function. | 8 | Yes |
| IsSystem | **int** | Indicates whether the event occurred on a system process or a user process. 1 = system, NULL = user. | 60 | Yes |
| LoginName | **nvarchar** | Name of the login of the user (either  SQL Server |
 | security login or the  Microsoft |
 | Windows login credentials in the form of DOMAIN\username). | 11 | Yes |
| LoginSid | **image** | Security identification number (SID) of the logged-in user. You can find this information in the sys.server_principals catalog view. Each SID is unique for each login in the server. | 41 | Yes |
| NTDomainName | **nvarchar** | Windows domain to which the user belongs. | 7 | Yes |
| NTUserName | **nvarchar** | Windows user name. | 6 | Yes |
| RequestID | **int** | ID of the request containing the statement. | 49 | Yes |
| ServerName | **nvarchar** | Name of the instance of  SQL Server |
 | being traced. | 26 | No |
| SessionLoginName | **nvarchar** | Login name of the user who originated the session. For example, if you connect to  SQL Server |
 | using Login1 and execute a statement as Login2, SessionLoginName shows Login1 and LoginName shows Login2. This column displays both  SQL Server |
 | and Windows logins. | 64 | Yes |
| SPID | **int** | ID of the session on which the event occurred. | 12 | Yes |
| StartTime | **datetime** | Time at which the event started, when available. | 14 | Yes |
| TransactionID | **bigint** | System-assigned ID of the transaction. | 4 | Yes |
| XactSequence | **bigint** | Token that describes the current transaction. | 50 | Yes |
  
## Related content

- [sp_trace_setevent (Transact-SQL)](../system-stored-procedures/sp-trace-setevent-transact-sql.md)
