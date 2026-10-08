---
title: "Using Transactions"
description: "Using Transactions"
author: "markingmyname"
ms.author: "maghan"
ms.date: "03/14/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "SQL Server Management Objects, transactions"
  - "transactions [SMO]"
  - "SMO [SQL Server], transactions"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Using Transactions

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  In  SQL Server 
 Management Objects (SMO), transaction processing is achieved through the connection to the instance of  SQL Server 
 by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object. The [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object is referenced by the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property of the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object when the connection is established. Methods such as [Microsoft.SqlServer.Management.Common.DataTransferProgressEventType.StartTransaction](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.DataTransferProgressEventType.StartTransaction), [Microsoft.SqlServer.Management.Common.ServerConnection.RollBackTransaction%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection.RollBackTransaction%252A), and [Microsoft.SqlServer.Management.Common.ServerConnection.CommitTransaction%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection.CommitTransaction%252A) belong to the [Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.ConnectionContext%252A) object property.  
  
## Related content

- [Creating SMO Programs](creating-smo-programs.md)
