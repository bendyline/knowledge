---
description: "Learn more about: Defining and Specifying Faults"
title: "Defining and Specifying Faults"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "handling faults [WCF], specifying"
  - "handling faults [WCF], defining"
ms.assetid: c00c84f1-962d-46a7-b07f-ebc4f80fbfc1
---
# Defining and Specifying Faults

SOAP faults convey error condition information from a service to a client and, in the duplex case, from a client to a service in an interoperable way. This topic discusses when and how to define custom fault content and specify which operations can return them. For more information about how a service, or duplex client, can send those faults and how a client or service application handles these faults, see [Sending and Receiving Faults](sending-and-receiving-faults.md). For an overview of error handling in Windows Communication Foundation (WCF) applications, see [Specifying and Handling Faults in Contracts and Services](specifying-and-handling-faults-in-contracts-and-services.md).

## Overview

 Declared SOAP faults are those in which an operation has a [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute) that specifies a custom SOAP fault type. Undeclared SOAP faults are those that are not specified in the contract for an operation. This topic helps you identify those error conditions and create a fault contract for your service that clients can use to properly handle those error conditions when notified by custom SOAP faults. The basic tasks are, in order:

1. Define the error conditions that a client of your service should know about.

2. Define the custom content of the SOAP faults for those error conditions.

3. Mark your operations so that the specific SOAP faults that they throw are exposed to clients in WSDL.

### Defining Error Conditions That Clients Should Know About

 SOAP faults are publicly described messages that carry fault information for a particular operation. Because they are described along with other operation messages in WSDL, clients know and, therefore, expect to handle such faults when invoking an operation. But because WCF services are written in managed code, deciding which error conditions in managed code are to be converted into faults and returned to the client provides you the opportunity to separate error conditions and bugs in your service from the formal error conversation you have with a client.

 For example, the following code example shows an operation that takes two integers and returns another integer. Several exceptions can be thrown here, so when designing the fault contract, you must determine which error conditions are important for your client. In this case, the service should detect the [System.DivideByZeroException](https://learn.microsoft.com/search/?terms=System.DivideByZeroException) exception.

```csharp
[ServiceContract]
public class CalculatorService
{
    [OperationContract]
    int Divide(int a, int b)
    {
      if (b==0) throw new Exception("Division by zero!");
      return a/b;
    }
}
```

```vb
<ServiceContract> _
Public Class CalculatorService
    <OperationContract> _
    Public Function Divide(a As Integer, b As Integer) As Integer
        If b = 0 Then Throw New DivideByZeroException("Division by zero!")
        Return a / b
    End Function
End Class
```

 In the preceding example the operation can either return a custom SOAP fault that is specific to dividing by zero, a custom fault that is specific to math operations but that contains information specific to dividing by zero, multiple faults for several different error situations, or no SOAP fault at all.

### Define the Content of Error Conditions

 Once an error condition has been identified as one that can usefully return a custom SOAP fault, the next step is to define the contents of that fault and ensure that the content structure can be serialized. The code example in the preceding section shows an error specific to a `Divide` operation, but if there are other operations on the `Calculator` service, then a single custom SOAP fault can inform the client of all calculator error conditions, `Divide` included. The following code example shows the creation of a custom SOAP fault, `MathFault`, which can report errors made using all math operations, including `Divide`. While the class can specify an operation (the `Operation` property) and a value that describes the problem (the `ProblemType` property), the class and these properties must be serializable to be transferred to the client in a custom SOAP fault. Therefore, the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) and [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attributes are used to make the type and its properties serializable and as interoperable as possible.

 [Faults#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/faults/cs/service.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/faults/cs/service.cs.md)
 [Faults#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/faults/vb/service.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/faults/vb/service.vb.md)

 For more information about how to ensure your data is serializable, see [Specifying Data Transfer in Service Contracts](feature-details/specifying-data-transfer-in-service-contracts.md). For a list of the serialization support that [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) provides, see [Types Supported by the Data Contract Serializer](feature-details/types-supported-by-the-data-contract-serializer.md).

### Mark Operations to Establish the Fault Contract

 Once a serializable data structure that is returned as part of a custom SOAP fault is defined, the last step is to mark your operation contract as throwing a SOAP fault of that type. To do this, use the [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute) attribute and pass the type of the custom data type that you have constructed. The following code example shows how to use the [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute) attribute to specify that the `Divide` operation can return a SOAP fault of type `MathFault`. Other math-based operations can now also specify that they can return a `MathFault`.

 [Faults#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/faults/cs/service.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/faults/cs/service.cs.md)
 [Faults#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/faults/vb/service.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/faults/vb/service.vb.md)

 An operation can specify that it returns more than one custom fault by marking that operation with more than one [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute) attribute.

 The next step, to implement the fault contract in your operation implementation, is described in the topic [Sending and Receiving Faults](sending-and-receiving-faults.md).

#### SOAP, WSDL, and Interoperability Considerations

 In some circumstances, especially when interoperating with other platforms, it may be important to control the way a fault appears in a SOAP message or the way it is described in the WSDL metadata.

 The [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute) attribute has a [System.ServiceModel.FaultContractAttribute.Name](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute.Name) property that allows control of the WSDL fault element name that is generated in the metadata for that fault.

 According to the SOAP standard, a fault can have an `Action`, a `Code`, and a `Reason`. The `Action` is controlled by the [System.ServiceModel.FaultContractAttribute.Action](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute.Action) property. The [System.ServiceModel.FaultException.Code](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException.Code) property and [System.ServiceModel.FaultException.Reason](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException.Reason) property are both properties of the [System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException) class, which is the parent class of the generic [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601). The `Code` property includes a [System.ServiceModel.FaultCode.SubCode*](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultCode.SubCode*) member.

 When accessing non-services that generate faults, certain limitations exist. WCF supports only faults with detail types that the schema describes and that are compatible with data contracts. For example, as mentioned above, WCF does not support faults that use XML attributes in their detail types, or faults with more than one top-level element in the detail section.

## See also

- [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute)
- [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute)
- [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute)
- [Specifying and Handling Faults in Contracts and Services](specifying-and-handling-faults-in-contracts-and-services.md)
- [Sending and Receiving Faults](sending-and-receiving-faults.md)
- [How to: Declare Faults in Service Contracts](how-to-declare-faults-in-service-contracts.md)
- [Understanding Protection Level](understanding-protection-level.md)
- [How to: Set the ProtectionLevel Property](how-to-set-the-protectionlevel-property.md)
- [Specifying Data Transfer in Service Contracts](feature-details/specifying-data-transfer-in-service-contracts.md)
