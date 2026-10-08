---
description: "Learn more about: How to: Exchange Queued Messages with WCF Endpoints"
title: "How to: Exchange Queued Messages with WCF Endpoints"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: 938e7825-f63a-4c3d-b603-63772fabfdb3
---
# How to: Exchange Queued Messages with WCF Endpoints

Queues ensure that reliable messaging can occur between a client and a Windows Communication Foundation (WCF) service, even if the service is not available at the time of communication. The following procedures show how to ensure durable communication between a client and a service by using the standard queued binding when implementing the WCF service.  
  
 This section explains how to use [System.ServiceModel.NetMsmqBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetMsmqBinding) for queued communication between a WCF client and a WCF service.  
  
### To use queuing in a WCF service  
  
1. Define a service contract using an interface marked with the [System.ServiceModel.ServiceContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute). Mark the operations in the interface that are part of the service contract with the [System.ServiceModel.OperationContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContractAttribute) and specify them as one-way because no response to the method is returned. The following code provides an example service contract and its operation definition.  
  
     [S_Msmq_Transacted#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/service.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/service.cs.md)
     [S_Msmq_Transacted#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/service.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/service.vb.md)  
  
2. When the service contract passes user-defined types, you must define data contracts for those types. The following code shows two data contracts, `PurchaseOrder` and `PurchaseOrderLineItem`. These two types define data that is sent to the service. (Note that the classes that define this data contract also define a number of methods. These methods are not considered part of the data contract. Only those members that are declared with the [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attribute are part of the data contract.)  
  
     [S_Msmq_Transacted#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/service.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/service.cs.md)
     [S_Msmq_Transacted#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/service.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/service.vb.md)  
  
3. Implement the methods of the service contract defined in the interface in a class.  
  
     [S_Msmq_Transacted#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/service.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/service.cs.md)
     [S_Msmq_Transacted#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/service.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/service.vb.md)  
  
     Notice the [System.ServiceModel.OperationBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationBehaviorAttribute) placed on the `SubmitPurchaseOrder` method. This specifies that this operation must be called within a transaction and that the transaction automatically completes when the method completes.  
  
4. Create a transactional queue using [System.Messaging](https://learn.microsoft.com/search/?terms=System.Messaging). You can choose to create the queue using Microsoft Message Queuing (MSMQ) Microsoft Management Console (MMC) instead. If so, make sure you create a transactional queue.  
  
     [S_Msmq_Transacted#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/hostapp.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/hostapp.cs.md)
     [S_Msmq_Transacted#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/hostapp.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/hostapp.vb.md)  
  
5. Define a [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint) in configuration that specifies the service address and uses the standard [System.ServiceModel.NetMsmqBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetMsmqBinding) binding. For more information about using WCF configuration, see [Configuring WCF services](../configuring-services.md).  

6. Create a host for the `OrderProcessing` service using [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) that reads messages from the queue and processes them. Open the service host to make the service available. Display a message that tells the user to press any key to terminate the service. Call `ReadLine` to wait for the key to be pressed and then close the service.  
  
     [S_Msmq_Transacted#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/hostapp.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/hostapp.cs.md)
     [S_Msmq_Transacted#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/hostapp.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/hostapp.vb.md)  
  
### To create a client for the queued service  
  
1. The following example shows how to run the hosting application and use the Svcutil.exe tool to create the WCF client.  
  
    ```console
    svcutil http://localhost:8000/ServiceModelSamples/service  
    ```  
  
2. Define a [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint) in configuration that specifies the address and uses the standard [System.ServiceModel.NetMsmqBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetMsmqBinding) binding, as shown in the following example.  

3. Create a transaction scope to write to the transactional queue, call the `SubmitPurchaseOrder` operation and close the WCF client, as shown in the following example.  
  
     [S_Msmq_Transacted#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/client.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/client.cs.md)
     [S_Msmq_Transacted#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/client.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/client.vb.md)  
  
## Example  

 The following examples show the service code, hosting application, App.config file, and client code included for this example.  
  
 [S_Msmq_Transacted#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/service.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/service.cs.md)
 [S_Msmq_Transacted#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/service.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/service.vb.md)  
  
 [S_Msmq_Transacted#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/hostapp.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/hostapp.cs.md)
 [S_Msmq_Transacted#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/hostapp.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/hostapp.vb.md)  

 [S_Msmq_Transacted#12 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/client.cs#12)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/s_msmq_transacted/cs/client.cs.md)
 [S_Msmq_Transacted#12 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/client.vb#12)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/s_msmq_transacted/vb/client.vb.md)  

## See also

- [System.ServiceModel.NetMsmqBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetMsmqBinding)
- [Transacted MSMQ Binding](../samples/transacted-msmq-binding.md)
- [Queuing in WCF](queuing-in-wcf.md)
- [How to: Exchange Messages with WCF Endpoints and Message Queuing Applications](how-to-exchange-messages-with-wcf-endpoints-and-message-queuing-applications.md)
- [Windows Communication Foundation to Message Queuing](../samples/wcf-to-message-queuing.md)
- [Installing Message Queuing (MSMQ)](../samples/installing-message-queuing-msmq.md)
- [Message Queuing to Windows Communication Foundation](../samples/message-queuing-to-wcf.md)
- [Message Security over Message Queuing](../samples/message-security-over-message-queuing.md)
