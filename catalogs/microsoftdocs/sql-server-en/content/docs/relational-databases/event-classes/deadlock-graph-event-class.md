---
title: "Deadlock Graph Event Class"
description: "Deadlock Graph Event Class"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "Deadlock Graph event class"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Deadlock Graph Event Class

 
**Applies to:**
 

 and later versions 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  The **Deadlock Graph** event class provides an XML description of a deadlock. This class occurs simultaneously with the **Lock:Deadlock** event class.  
  
## Deadlock Graph Event Class Data Columns  
  
| Data column name | Data type | Description | Column ID | Filterable |
| --- | --- | --- | --- | --- |
| **EventClass** | **int** | Type of event = 148. | 27 | No |
| **EventSequence** | **int** | Sequence of a given event within the request. | 51 | No |
| **IsSystem** | **int** | Indicates whether the event occurred on a system process or a user process. 1 = system, 0 = user. This value is always 1 for this event. | 60 | Yes |
| **LoginName** | **nvarchar** | Name of the login of the user (either the  Microsoft |
  | SQL Server |
 | security login or the  Microsoft |
 | Windows login credentials in the form of DOMAIN\username). This value is always the system user for this event. | 11 | Yes |
| **LoginSid** | **image** | Security identification number (SID) of the logged-in user. You can find this information in the sys.server_principals catalog view. Each SID is unique for each login in the server. This value is always the SID of the system user for this event. | 41 | Yes |
| **ServerName** | **nvarchar** | Name of the instance of  SQL Server |
 | being traced. | 26 | No |
| **SessionLoginName** | **nvarchar** | Login name of the user who originated the session. For example, if you connect to  SQL Server |
 | using Login1 and execute a statement as Login2, **SessionLoginName** shows Login1 and **LoginName** shows Login2. This column displays both  SQL Server |
 | and Windows logins. | 64 | Yes |
| **SPID** | **int** | ID of the session on which the event occurred. | 12 | Yes |
| **StartTime** | **datetime** | Time at which the deadlock was detected. | 14 | Yes |
| **TextData** | **ntext** | XML description of the deadlock. | 1 | Yes |
| **TransactionID** | **bigint** | Not used. | 4 | Yes |
  
## Related content

- [sp_trace_setevent (Transact-SQL)](../system-stored-procedures/sp-trace-setevent-transact-sql.md)
- [Lock:Deadlock Event Class](lock-deadlock-event-class.md)
