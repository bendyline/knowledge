---
description: "Learn more about: How to: Set the ProtectionLevel Property"
title: "How to: Set the ProtectionLevel Property"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
helpviewer_keywords: 
  - "WCF, security"
  - "ProtectionLevel property"
ms.assetid: 3d4e8f80-0f9e-4a26-9899-beb6584e78df
---
# How to: Set the ProtectionLevel Property

You can set the protection level by applying an appropriate attribute and setting the property. You can set protection at the service level to affect all parts of every message, or you can set protection at increasingly granular levels, from methods to message parts. For more information about the `ProtectionLevel` property, see [Understanding Protection Level](understanding-protection-level.md).  
  
> **Note:**
> You can set protection levels only in code, not in configuration.  
  
### To sign all messages for a service  
  
1. Create an interface for the service.  
  
2. Apply the [System.ServiceModel.ServiceContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute) attribute to the service and set the [System.ServiceModel.ServiceContractAttribute.ProtectionLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute.ProtectionLevel) property to [System.Net.Security.ProtectionLevel.Sign](https://learn.microsoft.com/search/?terms=System.Net.Security.ProtectionLevel.Sign), as shown in the following code (the default level is [System.Net.Security.ProtectionLevel.EncryptAndSign](https://learn.microsoft.com/search/?terms=System.Net.Security.ProtectionLevel.EncryptAndSign)).  
  
     [C_ProtectionLevel#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs.md)
     [C_ProtectionLevel#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb.md)  
  
### To sign all message parts for an operation  
  
1. Create an interface for the service and apply the [System.ServiceModel.ServiceContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute) attribute to the interface.  
  
2. Add a method declaration to the interface.  
  
3. Apply the [System.ServiceModel.OperationContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContractAttribute) attribute to the method, and set the [System.ServiceModel.ServiceContractAttribute.ProtectionLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute.ProtectionLevel) property to [System.Net.Security.ProtectionLevel.Sign](https://learn.microsoft.com/search/?terms=System.Net.Security.ProtectionLevel.Sign), as shown in the following code.  
  
     [C_ProtectionLevel#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs.md)
     [C_ProtectionLevel#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb.md)  
  
## Protecting Fault Messages  

 Exceptions that are thrown on a service can be sent to a client as SOAP faults. For more information about creating strongly typed faults, see [Specifying and Handling Faults in Contracts and Services](specifying-and-handling-faults-in-contracts-and-services.md) and [How to: Declare Faults in Service Contracts](how-to-declare-faults-in-service-contracts.md).  
  
#### To protect a fault message  
  
1. Create a type that represents the fault message. The following example creates a class named `MathFault` with two fields.  
  
2. Apply the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) attribute to the type and a [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attribute to each field that should be serialized, as shown in the following code.  
  
     [C_ProtectionLevel#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs.md)
     [C_ProtectionLevel#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb.md)  
  
3. In the interface that will return the fault, apply the [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute) attribute to the method that will return the fault and set the `detailType` parameter to the type of the fault class.  
  
4. Also in the constructor, set the [System.ServiceModel.FaultContractAttribute.ProtectionLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute.ProtectionLevel) property to [System.Net.Security.ProtectionLevel.EncryptAndSign](https://learn.microsoft.com/search/?terms=System.Net.Security.ProtectionLevel.EncryptAndSign), as shown in the following code.  
  
     [C_ProtectionLevel#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs.md)
     [C_ProtectionLevel#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb.md)  
  
## Protecting Message Parts  

 Use a message contract to protect parts of a message. For more information about message contracts, see [Using Message Contracts](feature-details/using-message-contracts.md).  
  
#### To protect a message body  
  
1. Create a type that represents the message. The following example creates a `Company` class with two fields, `CompanyName` and `CompanyID`.  
  
2. Apply the [System.ServiceModel.MessageContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageContractAttribute) attribute to the class and set the [System.ServiceModel.MessageContractAttribute.ProtectionLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageContractAttribute.ProtectionLevel) property to [System.Net.Security.ProtectionLevel.EncryptAndSign](https://learn.microsoft.com/search/?terms=System.Net.Security.ProtectionLevel.EncryptAndSign).  
  
3. Apply the [System.ServiceModel.MessageHeaderAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageHeaderAttribute) attribute to a field that will be expressed as a message header and set the `ProtectionLevel` property to [System.Net.Security.ProtectionLevel.EncryptAndSign](https://learn.microsoft.com/search/?terms=System.Net.Security.ProtectionLevel.EncryptAndSign).  
  
4. Apply the [System.ServiceModel.MessageBodyMemberAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageBodyMemberAttribute) to any field that will be expressed as part of the message body, and set the `ProtectionLevel` property to [System.Net.Security.ProtectionLevel.EncryptAndSign](https://learn.microsoft.com/search/?terms=System.Net.Security.ProtectionLevel.EncryptAndSign), as shown in the following example.  
  
     [C_ProtectionLevel#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs.md)
     [C_ProtectionLevel#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb.md)  
  
## Example  

 The following example sets the `ProtectionLevel` property of several attribute classes at various places in a service.  
  
 [C_ProtectionLevel#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs.md)
 [C_ProtectionLevel#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb.md)  
  
## Compiling the Code  

 The following code shows the namespaces required to compile the example code.  
  
 [C_ProtectionLevel#0 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs#0)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_protectionlevel/cs/source.cs.md)
 [C_ProtectionLevel#0 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb#0)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_protectionlevel/vb/source.vb.md)  
  
## See also

- [System.ServiceModel.ServiceContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute)
- [System.ServiceModel.OperationContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContractAttribute)
- [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute)
- [System.ServiceModel.MessageContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageContractAttribute)
- [System.ServiceModel.MessageBodyMemberAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageBodyMemberAttribute)
- [Understanding Protection Level](understanding-protection-level.md)
