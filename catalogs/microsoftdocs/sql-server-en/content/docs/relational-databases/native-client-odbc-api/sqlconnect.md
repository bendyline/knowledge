---
title: "SQLConnect"
description: "SQLConnect"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLConnect function"
---
# SQLConnect

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  When a connection is opened,  SQL Server 
 Native Client sets SQL_COPT_SS_MUTUALLY_AUTHENTICATED and SQL_COPT_SS_INTEGRATED_AUTHENTICATION_METHOD to the authentication method used to open the connection. For more information about SPNs, see [Service Principal Names (SPNs) in Client Connections (ODBC)](../native-client/odbc/service-principal-names-spns-in-client-connections-odbc.md).  
  
## SQLConnect Support for High Availability, Disaster Recovery  
 For more information on using **SQLConnect** to connect to a  Always On availability groups 
 cluster, see [SQL Server Native Client Support for High Availability, Disaster Recovery](../native-client/features/sql-server-native-client-support-for-high-availability-disaster-recovery.md).  
  
## Related content

- [SQLConnect Function](../../odbc/reference/syntax/sqlconnect-function.md)
- [ODBC API implementation details](odbc-api-implementation-details.md)
