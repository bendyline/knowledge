---
description: "Learn more about: ServiceModel Attributes and ServiceDescription Reference"
title: "ServiceModel Attributes and ServiceDescription Reference"
ms.date: "03/30/2017"
ms.assetid: 4ab86b17-eab9-4846-a881-0099f9a7cc64
---
# ServiceModel Attributes and ServiceDescription Reference

The *description tree* is the hierarchy of types (starting with the [System.ServiceModel.Description.ServiceDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDescription) class) that together describe every aspect of a service. Windows Communication Foundation (WCF) uses a description tree to build a valid service runtime, to publish Web Services Description Language (WSDL), XML Schema definition language (XSD), and policy assertions (metadata) about the service that clients can use to connect to and use the service, and to generate various code and configuration file representations of the description tree values.

 This topic describes how contract-related properties are obtained from the service contract, and how they are implemented and added to the description tree. In some cases, attribute values are converted into behavior properties and behavior is then inserted into the description tree. For more information about how the description tree values are converted into metadata, see [ServiceDescription and WSDL Reference](servicedescription-and-wsdl-reference.md).

## Mapping Operations to the Description Tree

 In WCF applications, service contracts are modeled by interfaces (or classes) that use attributes to mark the interface or class and its methods as a grouping of operations. When a [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) class is opened, any service contracts and implementations are reflected over and merged with configuration information into a description tree.

 There are two types of operation models: the *parameter* model and the *message contract* model. The parameter model uses managed methods that do not have a parameter or return value type that is marked by the [System.ServiceModel.MessageContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageContractAttribute) class. In this model, developers control the serialization of parameters and return values, but WCF generates the values that are used to populate the description tree for the service and its contract.

 Bindings specified in configuration files are loaded directly into the [System.ServiceModel.Description.ServiceEndpoint.Binding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint.Binding) property.

| ServiceBehaviorAttribute Property | Description Tree Value Affected |
| --- | --- |
| Name | [System.ServiceModel.Description.ServiceDescription.Name*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDescription.Name*) |
| Namespace | [System.ServiceModel.Description.ServiceDescription.Namespace*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDescription.Namespace*) |
| ConfigurationName | [System.ServiceModel.Description.ServiceDescription.ConfigurationName*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDescription.ConfigurationName*) |
| IgnoreExtensionDataObject | Sets the [System.ServiceModel.Description.DataContractSerializerOperationBehavior.IgnoreExtensionDataObject](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.DataContractSerializerOperationBehavior.IgnoreExtensionDataObject) property for all operations. |
| MaxItemsInObjectGraph | Sets the [System.ServiceModel.Description.DataContractSerializerOperationBehavior.MaxItemsInObjectGraph](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.DataContractSerializerOperationBehavior.MaxItemsInObjectGraph) property for all operations. |

| ServiceContractAttribute Property | Description Tree Value Affected |
| --- | --- |
| CallbackContract | [System.ServiceModel.Description.ContractDescription.CallbackContractType*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ContractDescription.CallbackContractType*), [System.ServiceModel.Description.MessageDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription) added to all operations [System.ServiceModel.Description.OperationDescription.Messages*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription.Messages*). |
| ConfigurationName | [System.ServiceModel.Description.ContractDescription.ConfigurationName*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ContractDescription.ConfigurationName*) |
| ProtectionLevel | [System.ServiceModel.Description.ContractDescription.ProtectionLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ContractDescription.ProtectionLevel) and possibly child protection levels. For more information about the protection-level hierarchy, see [Understanding Protection Level](../understanding-protection-level.md). |
| SessionMode | [System.ServiceModel.Description.ContractDescription.SessionMode*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ContractDescription.SessionMode*) |

| ServiceKnownTypesAttribute Value | Description Tree Value Affected |
| --- | --- |
| MethodName | [System.ServiceModel.Description.OperationDescription.KnownTypes*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription.KnownTypes*) |

| OperationContractAttribute Value | Description Tree Value Affected |
| --- | --- |
| Action | [System.ServiceModel.Description.MessageDescription.Action*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription.Action*) for the output message or input message, depending upon contract/callback contract. |
| AsyncPattern | If true, [System.ServiceModel.Description.OperationDescription.BeginMethod](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription.BeginMethod) and [System.ServiceModel.Description.OperationDescription.EndMethod](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription.EndMethod) |
| IsOneWay | Maps to a single [System.ServiceModel.Description.MessageDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription) in [System.ServiceModel.Description.OperationDescription.Messages*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription.Messages*) |
| IsInitiating | [System.ServiceModel.Description.OperationDescription.IsInitiating](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription.IsInitiating) |
| IsTerminating | [System.ServiceModel.Description.OperationDescription.IsTerminating](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription.IsTerminating) |
| Name | [System.ServiceModel.Description.OperationDescription.Name*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription.Name*) |
| ProtectionLevel | [System.ServiceModel.Description.OperationDescription.ProtectionLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription.ProtectionLevel) and possibly child protection levels. For more information about the protection-level hierarchy, see [Understanding Protection Level](../understanding-protection-level.md). |
| ReplyAction | [System.ServiceModel.Description.MessageDescription.Action*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription.Action*) for the output message or input message, depending upon contract/callback contract. |

| FaultContractAttribute Value | Description Tree Value Affected |
| --- | --- |
| Action | [System.ServiceModel.Description.FaultDescription.Action*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.FaultDescription.Action*) depending upon contract/callback contract. |
| DetailType | [System.ServiceModel.Description.FaultDescription.DetailType*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.FaultDescription.DetailType*) |
| Name | [System.ServiceModel.Description.FaultDescription.Name*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.FaultDescription.Name*) |
| Namespace | [System.ServiceModel.Description.FaultDescription.Namespace*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.FaultDescription.Namespace*) |
| ProtectionLevel | [System.ServiceModel.Description.FaultDescription.ProtectionLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.FaultDescription.ProtectionLevel) |

| DataContractFormatAttribute Value | Description Tree Value Affected |
| --- | --- |
| Use | The [System.ServiceModel.DataContractFormatAttribute.Style*](https://learn.microsoft.com/search/?terms=System.ServiceModel.DataContractFormatAttribute.Style*) value is set on the [System.ServiceModel.Description.DataContractSerializerOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.DataContractSerializerOperationBehavior) for the operation. |

| XmlSerializerFormatAttribute Value | Description Tree Value Affected |
| --- | --- |
| Style | This [System.ServiceModel.XmlSerializerFormatAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.XmlSerializerFormatAttribute) property is set on the [System.ServiceModel.Description.XmlSerializerOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.XmlSerializerOperationBehavior) for the operation. |
| Use | The [System.ServiceModel.XmlSerializerFormatAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.XmlSerializerFormatAttribute) is set on the [System.ServiceModel.Description.XmlSerializerOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.XmlSerializerOperationBehavior) for the operation. |

| TransactionFlowAttribute Value | Description Tree Value Affected |
| --- | --- |
| TransactionFlowOption | The [System.ServiceModel.TransactionFlowAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.TransactionFlowAttribute) is added as an operation behavior to the [System.ServiceModel.Description.OperationDescription.Behaviors](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription.Behaviors) property. |

| MessageContractAttribute Value | Description Tree Value Affected |
| --- | --- |
| ProtectionLevel | [System.ServiceModel.Description.MessageDescription.ProtectionLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription.ProtectionLevel) |
| WrapperName | [System.ServiceModel.Description.MessageBodyDescription.WrapperName*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageBodyDescription.WrapperName*) |
| WrapperNamespace | [System.ServiceModel.Description.MessageBodyDescription.WrapperNamespace*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageBodyDescription.WrapperNamespace*) |

| MessageHeaderAttribute Value | Description Tree Value Affected |
| --- | --- |
| Actor | [System.ServiceModel.Description.MessageHeaderDescription.Actor*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageHeaderDescription.Actor*) for the corresponding header in [System.ServiceModel.Description.MessageDescription.Headers*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription.Headers*) |
| MustUnderstand | [System.ServiceModel.Description.MessageHeaderDescription.MustUnderstand*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageHeaderDescription.MustUnderstand*) for the corresponding header in [System.ServiceModel.Description.MessageDescription.Headers*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription.Headers*) |
| Name | [System.ServiceModel.Description.MessagePartDescription.Name*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.Name*) for the corresponding header in [System.ServiceModel.Description.MessageDescription.Headers*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription.Headers*) |
| Namespace | [System.ServiceModel.Description.MessagePartDescription.Namespace*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.Namespace*) for the corresponding header in [System.ServiceModel.Description.MessageDescription.Headers*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription.Headers*) |
| ProtectionLevel | [System.ServiceModel.Description.MessagePartDescription.ProtectionLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.ProtectionLevel) for the corresponding header in [System.ServiceModel.Description.MessageDescription.Headers*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription.Headers*) |
| Relay | [System.ServiceModel.Description.MessageHeaderDescription.Relay*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageHeaderDescription.Relay*) for the corresponding header in [System.ServiceModel.Description.MessageDescription.Headers*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription.Headers*) |

| MessageBodyMemberAttribute Value | Description Tree Value Affected |
| --- | --- |
| Name | [System.ServiceModel.Description.MessagePartDescription.Name*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.Name*) for the corresponding part in [System.ServiceModel.Description.MessageBodyDescription.Parts*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageBodyDescription.Parts*) |
| Namespace | [System.ServiceModel.Description.MessagePartDescription.Namespace*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.Namespace*) for the corresponding part in [System.ServiceModel.Description.MessageBodyDescription.Parts*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageBodyDescription.Parts*) |
| Order | [System.ServiceModel.Description.MessagePartDescription.Index*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.Index*) for the corresponding part in [System.ServiceModel.Description.MessageBodyDescription.Parts*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageBodyDescription.Parts*) |
| ProtectionLevel | [System.ServiceModel.Description.MessagePartDescription.ProtectionLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.ProtectionLevel) for the corresponding part in [System.ServiceModel.Description.MessageBodyDescription.Parts*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageBodyDescription.Parts*) |

| MessageHeaderArrayAttribute Value | Description Tree Value Affected |
| --- | --- |
| Actor | [System.ServiceModel.Description.MessageHeaderDescription.Actor*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageHeaderDescription.Actor*) |
| MustUnderstand | [System.ServiceModel.Description.MessageHeaderDescription.MustUnderstand*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageHeaderDescription.MustUnderstand*) |
| Name | [System.ServiceModel.Description.MessagePartDescription.Name*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.Name*) |
| Namespace | [System.ServiceModel.Description.MessagePartDescription.Namespace*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.Namespace*) |
| ProtectionLevel | [System.ServiceModel.Description.MessagePartDescription.ProtectionLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.ProtectionLevel) |
| Relay | [System.ServiceModel.Description.MessageHeaderDescription.Relay*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageHeaderDescription.Relay*) |

| MessagePropertyAttribute Value | Description Tree Value Affected |
| --- | --- |
| Name | [System.ServiceModel.Description.MessagePartDescription.Name*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.Name*) |

| MessageParameterAttribute Value | Description Tree Value Affected |
| --- | --- |
| Name | [System.ServiceModel.Description.MessagePartDescription.Name*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription.Name*) for the corresponding part in [System.ServiceModel.Description.MessageBodyDescription.Parts*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageBodyDescription.Parts*) |

 For more information about how the description tree values are converted into metadata, see [ServiceDescription and WSDL Reference](servicedescription-and-wsdl-reference.md).

## See also

- [ServiceDescription and WSDL Reference](servicedescription-and-wsdl-reference.md)
