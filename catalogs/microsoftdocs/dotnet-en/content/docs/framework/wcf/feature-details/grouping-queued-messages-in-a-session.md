---
description: "Learn more about: Grouping Queued Messages in a Session"
title: "Grouping Queued Messages in a Session"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
helpviewer_keywords: 
  - "queues [WCF]. grouping messages"
ms.assetid: 63b23b36-261f-4c37-99a2-cc323cd72a1a
---
# Grouping Queued Messages in a Session

Windows Communication Foundation (WCF) provides a session that allows you to group a set of related messages together for processing by a single receiving application. Messages that are part of a session must be part of the same transaction. Because all messages are part of the same transaction, if one message fails to be processed the entire session is rolled back. Sessions have similar behaviors with regard to dead-letter queues and poison queues. The Time to Live (TTL) property set on a queued binding configured for sessions is applied to the session as a whole. If only some of the messages in the session are sent before the TTL expires, the entire session is placed in the dead-letter queue. Similarly, when messages in a session fail to be sent to an application from the application queue, the entire session is placed in the poison queue (if available).  
  
## Message Grouping Example  

 One example where grouping messages is helpful is when implementing an order-processing application as a WCF service. For instance, a client submits an order to this application that contains a number of items. For each item, the client makes a call to the service, which results in a separate message being sent. It is possible for serve A to receive the first item, and server B to receive the second item. Each time an item is added, the server processing that item has to find the appropriate order and add the item to it, which is highly inefficient. You still run into such inefficiencies with only a single server handling all requests, because the server must keep track of all orders currently being processed and determine which one the new item belongs to. Grouping all requests for a single order greatly simplifies implementation of such an application. The client application sends all items for a single order in a session, so when the service processes the order, it processes the entire session at once. \  
  
## Procedures  
  
#### To set up a service contract to use sessions  
  
1. Define a service contract that requires a session. Do this with the [System.ServiceModel.ServiceContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute) attribute by specifying:  
  
    ```csharp
    SessionMode=SessionMode.Required  
    ```  
  
2. Mark the operations in the contract as one-way, because these methods do not return anything. This is done with the [System.ServiceModel.OperationContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContractAttribute) attribute by specifying:  
  
    ```csharp  
    [OperationContract(IsOneWay = true)]  
    ```  
  
3. Implement the service contract and specify an [System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode) of [System.ServiceModel.InstanceContextMode.PerSession](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.PerSession). This instantiates the service only once for each session.  
  
    ```csharp  
    [ServiceBehavior(InstanceContextMode=InstanceContextMode.PerSession)]  
    ```  
  
4. Each service operation requires a transaction. Specify this with the [System.ServiceModel.OperationBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationBehaviorAttribute) attribute. The operation that completes the transaction should also set [System.ServiceModel.OperationBehaviorAttribute.TransactionAutoComplete](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationBehaviorAttribute.TransactionAutoComplete) to `true`.  
  
    ```csharp  
    [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
    ```  
  
5. Configure an endpoint that uses the system-provided `NetMsmqBinding` binding.  
  
6. Create a transactional queue using [System.Messaging](https://learn.microsoft.com/search/?terms=System.Messaging). You can also create the queue by using Message Queuing (MSMQ) or MMC. If you do, create a transactional queue.  
  
7. Create a service host for the service by using [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost).  
  
8. Open the service host to make the service available.  
  
9. Close the service host.  
  
#### To set up a client  
  
1. Create a transaction scope to write to the transactional queue.  
  
2. Create the WCF client using the [ServiceModel Metadata Utility Tool (Svcutil.exe)](../servicemodel-metadata-utility-tool-svcutil-exe.md) tool.  
  
3. Place the order.  
  
4. Close the WCF client.  
  
## Example  
  
### Description  

 The following example provides the code for the `IProcessOrder` service and for a client that uses this service. It shows how WCF uses queued sessions to provide the grouping behavior.  
  
### Code for the Service  

 [S_Msmq_Session#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_msmq_session/cs/service.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_msmq_session/cs/service.cs.md)
 [S_Msmq_Session#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_session/vb/service.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_session/vb/service.vb.md)  

### Code for the Client  

 [S_Msmq_Session#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_msmq_session/cs/client.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_msmq_session/cs/client.cs.md)
 [S_Msmq_Session#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_session/vb/client.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_session/vb/client.vb.md)  

## See also

- [Sessions and Queues](../samples/sessions-and-queues.md)
- [Queues Overview](queues-overview.md)
