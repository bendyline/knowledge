---
title: "Managing Service Broker"
description: "Managing Service Broker"
author: "markingmyname"
ms.author: "maghan"
ms.date: "05/24/2019"
ms.service: sql
ms.topic: "reference"
helpviewer_keywords:
  - "Service Broker [SMO]"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Managing Service Broker


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  In SMO, the  Service Broker 
 objects are found in the **Microsoft.SqlServer.Management.Smo.Broker** namespace, which requires a reference to the Microsoft.SqlServer.Smo.dll. A reference to the Microsoft.SqlServer.ServiceBrokerEnum.dll is also required for supporting class information.  
  
 SMO provides a set of  Service Broker 
 objects that permit programmatic management (DDL) of the  Service Broker 
 implementation. This includes defining the message types, contracts, queues, and services. Because SMO is a management tool that is not intended for data manipulation, sending and receiving  Service Broker 
 messages is not supported by SMO.  
  
 In SMO, the [Microsoft.SqlServer.Management.Smo.Database.ServiceBroker%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database.ServiceBroker%252A) object is the top-level class under which all the  Service Broker 
 functionality resides. A  Service Broker 
 implementation is required for each database that is participating in the distributed messaging application. Therefore, the [Microsoft.SqlServer.Management.Smo.Broker.ServiceBroker](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Broker.ServiceBroker) object is a child of the [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) object.  
  
 The [Microsoft.SqlServer.Management.Smo.Broker.ServiceBroker](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Broker.ServiceBroker) object contains collections of the following objects that are used to define the  Service Broker 
 implementation:  
  
-   [Microsoft.SqlServer.Management.Smo.Broker.MessageType](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Broker.MessageType) objects represent message types that define the content of messages.  
  
-   [Microsoft.SqlServer.Management.Smo.Broker.MessageTypeMapping](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Broker.MessageTypeMapping) objects represent contracts that specify the direction and type of messages in a given conversation.  
  
-   [Microsoft.SqlServer.Management.Smo.Broker.ServiceQueue](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Broker.ServiceQueue) objects store messages prior to sending and after they are received. They provide asynchronous communication between services, as well as other benefits, such as automatically locking messages in the same conversation group.  
  
-   [Microsoft.SqlServer.Management.Smo.Broker.BrokerService](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Broker.BrokerService) objects represent  Service Broker 
 services, which are the addressable endpoints for conversations.  Service Broker 
 messages are sent from one service to another service. A service specifies a queue to hold messages, and specifies the contracts for which the service can be the target.  
  
-   [Microsoft.SqlServer.Management.Smo.Broker.RemoteServiceBinding](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Broker.RemoteServiceBinding) objects represent the settings that  Service Broker 
 uses for security and authentication when communicating with a remote service.  
  
-   [Microsoft.SqlServer.Management.Smo.Broker.ServiceRoute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Broker.ServiceRoute) objects represents a  Service Broker 
 route, which contains the location information for the service and the database on which it is defined. A route is required for message delivery. By default, each database contains a route that specifies the location as the current instance of  SQL Server 
.  
  
## Related content

- [Microsoft.SqlServer.Management.Smo.Broker](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Broker)
- [Service Broker](../../../database-engine/configure-windows/sql-server-service-broker.md)
