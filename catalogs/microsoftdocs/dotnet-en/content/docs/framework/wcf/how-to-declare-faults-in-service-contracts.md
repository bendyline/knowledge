---
description: "Learn more about: How to: Declare Faults in Service Contracts"
title: "How to: Declare Faults in Service Contracts"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: e8da98e7-d22f-4f60-ac82-3fb0928a353f
---
# How to: Declare Faults in Service Contracts

In managed code, exceptions are thrown when error conditions occur. In Windows Communication Foundation (WCF) applications, however, service contracts specify what error information is returned to clients by declaring SOAP faults in the service contract. For an overview of the relationship between exceptions and faults, see [Specifying and Handling Faults in Contracts and Services](specifying-and-handling-faults-in-contracts-and-services.md).

## Create a service contract that specifies a SOAP fault

1. Create a service contract that contains at least one operation. For an example, see [How to: Define a Service Contract](how-to-define-a-wcf-service-contract.md).

2. Select an operation that can specify an error condition about which clients can expect to be notified. To decide which error conditions justify returning SOAP faults to clients, see [Specifying and Handling Faults in Contracts and Services](specifying-and-handling-faults-in-contracts-and-services.md).

3. Apply a [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute) to the selected operation and pass a serializable fault type to the constructor. For details about creating and using serializable types, see [Specifying Data Transfer in Service Contracts](feature-details/specifying-data-transfer-in-service-contracts.md). The following example shows how to specify that the `SampleMethod` operation can result in a `GreetingFault`.

     [FaultContractAttribute#4 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/services.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/services.cs.md)
     [FaultContractAttribute#4 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/services.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/services.vb.md)

4. Repeat steps 2 and 3 for all operations in the contract that communicate error conditions to clients.

## Implementing an Operation to Return a Specified SOAP Fault

 Once an operation has specified that a specific SOAP fault can be returned (such as in the preceding procedure) to communicate an error condition to a calling application, the next step is to implement that specification.

### Throw the specified SOAP fault in the operation

1. When a [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute)-specified error condition occurs in an operation, throw a new [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) where the specified SOAP fault is the type parameter. The following example shows how to throw the `GreetingFault` in the `SampleMethod` shown in the preceding procedure and in the following Code section.

     [FaultContractAttribute#5 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/services.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/services.cs.md)
     [FaultContractAttribute#5 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/services.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/services.vb.md)

## Example

The following code example shows an implementation of a single operation that specifies a `GreetingFault` for the `SampleMethod` operation.

[FaultContractAttribute#1 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/services.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/services.cs.md)
[FaultContractAttribute#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/services.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/services.vb.md)

## See also

- [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute)
- [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601)
