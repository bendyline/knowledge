---
title: "Showplan Text (Unencoded) Event Class"
description: "Showplan Text (Unencoded) Event Class"
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "Showplan Text (Unencoded) event class"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Showplan Text (Unencoded) Event Class

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  The Showplan Text (Unencoded) event class occurs when  Microsoft 
  SQL Server 
 executes a SQL statement. This event class is the same as the Showplan Text event class, except the event information is formatted as a string rather than as binary data.  
  
 The information included is a subset of the information available in Showplan All, Showplan XML, or Showplan XML Statistics Profile event classes.  
  
 When the Showplan Text (Unencoded) event class is included in a trace, the amount of overhead can significantly impede performance. Showplan Text (Unencoded) will not incur as much overhead as other Showplan event classes. To minimize overhead incurred, limit the use of this event class to traces that monitor specific problems for brief periods of time.  
  
## Showplan Text (Unencoded) Event Class Data Columns  
  
| Data column name | Data type | Description | Column ID | Filterable |
| --- | --- | --- | --- | --- |
| ApplicationName | **nvarchar** | Name of the client application that created the connection to an instance of  SQL Server |
| . This column is populated with the values passed by the application rather than the displayed name of the program. | 10 | Yes |
| BinaryData | **image** | Binary value dependent on the event class captured in the trace. | 2 | Yes |
| ClientProcessID | **int** | ID assigned by the host computer to the process where the client application is running. This data column is populated if the client provides the client process ID. | 9 | Yes |
| DatabaseID | **int** | ID of the database specified by the USE *database* statement or the default database if no USE *database* statement has been issued for a given instance.  SQL Server Profiler |
 | displays the name of the database if the ServerName data column is captured in the trace and the server is available. Determine the value for a database by using the DB_ID function. | 3 | Yes |
| DatabaseName | **nvarchar** | Name of the database in which the user statement is running. | 35 | Yes |
| EventClass | **int** | Type of event = 68. | 27 | No |
| EventSequence | **int** | Sequence of a given event within the request. | 51 | No |
| GroupID | **int** | ID of the workload group where the SQL Trace event fires. | 66 | Yes |
| HostName | **nvarchar** | Name of the computer on which the client is running. This data column is populated if the client provides the host name. To determine the host name, use the HOST_NAME function. | 8 | Yes |
| IntegerData | **int** | Integer value dependent on the event class captured in the trace. | 25 | Yes |
| IsSystem | **int** | Indicates whether the event occurred on a system process or a user process. 1 = system, 0 = user. | 60 | Yes |
| LineNumber | **int** | Displays the number of the line containing the error. | 5 | Yes |
| LoginName | **nvarchar** | Name of the login of the user (either  SQL Server |
 | security login or the  Microsoft |
 | Windows login credentials in the form of DOMAIN\username). | 11 | Yes |
| LoginSid | **image** | Security identification number (SID) of the logged-in user. You can find this information in the sys.server_principals catalog view. Each SID is unique for each login in the server. | 41 | Yes |
| NestLevel | **int** | Integer representing the data returned by @@NESTLEVEL. | 29 | Yes |
| NTDomainName | **nvarchar** | Windows domain to which the user belongs. | 7 | Yes |
| NTUserName | **nvarchar** | Windows user name. | 6 | Yes |
| ObjectID | **int** | System-assigned ID of the object. | 22 | Yes |
| ObjectName | **nvarchar** | Name of the object being referenced. | 34 | Yes |
| ObjectType | **int** | Value representing the type of the object involved in the event. This value corresponds to the type column in the sys.objects catalog view. For values, see [ObjectType Trace Event Column](objecttype-trace-event-column.md). | 28 | Yes |
| RequestID | **int** | ID of the request containing the statement. | 49 | Yes |
| ServerName | **nvarchar** | Name of the instance of  SQL Server |
 | being traced. | 26 | No |
| SessionLoginName | **nvarchar** | Login name of the user who originated the session. For example, if you connect to  SQL Server |
 | using Login1 and execute a statement as Login2, SessionLoginName shows Login1 and LoginName shows Login2. This column displays both  SQL Server |
 | and Windows logins. | 64 | Yes |
| SPID | **int** | ID of the session on which the event occurred. | 12 | Yes |
| StartTime | **datetime** | Time at which the event started, if available. | 14 | Yes |
| TextData | **ntext** | Text value dependent on the event class captured in the trace. | 1 | Yes |
| TransactionID | **bigint** | System-assigned ID of the transaction. | 4 | Yes |
| XactSequence | **bigint** | Token that describes the current transaction. | 50 | Yes |
  
## Related content

- [sp_trace_setevent (Transact-SQL)](../system-stored-procedures/sp-trace-setevent-transact-sql.md)
- [Logical and physical showplan operator reference](../showplan-logical-and-physical-operators-reference.md)
- [Showplan All Event Class](showplan-all-event-class.md)
- [Showplan XML Event Class](showplan-xml-event-class.md)
- [Showplan XML Statistics Profile Event Class](showplan-xml-statistics-profile-event-class.md)
