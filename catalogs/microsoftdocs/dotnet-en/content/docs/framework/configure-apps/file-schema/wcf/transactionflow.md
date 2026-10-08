---
description: "Learn more about: <transactionFlow>"
title: "<transactionFlow>"
ms.date: "03/30/2017"
ms.assetid: 8c7b4c5b-ace3-4fe3-89ff-7b13c9aacd13
---
# `<transactionFlow>`

Specifies transaction flow support for the custom binding.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.serviceModel>`](system-servicemodel.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<bindings>`](bindings.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<customBinding>`](custombinding.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<binding>`\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<transactionFlow>`

## Syntax

```xml
<transactionFlow transactionProtocol="OleTransactions/WSAtomicTransactionOctober2004" />
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

| Attribute | Description |
| --- | --- |
| transactionProtocol | Specifies the transaction protocol to be used. Valid values include the following:<br /><br /> -   OleTransactions<br />-   WSAtomicTransactionOctober2004<br /><br /> The default is OleTransactions.<br /><br /> This attribute is of type [System.ServiceModel.TransactionProtocol](https://learn.microsoft.com/search/?terms=System.ServiceModel.TransactionProtocol). |

### Child Elements

 None.

### Parent Elements

| Element | Description |
| --- | --- |
| [\<binding>](bindings.md) | Defines all binding capabilities of the custom binding. |

## Remarks

 This element allows you to enable or disable incoming transaction flow in an endpoint’s binding settings, as well as to specify the desired protocol format for incoming transactions. For more information on using this configuration element, see [ServiceModel Transaction Configuration](../../../wcf/feature-details/servicemodel-transaction-configuration.md) and [Enabling Transaction Flow](../../../wcf/feature-details/enabling-transaction-flow.md).

> **Caution:**
> When using the `OleTransactions` protocol to flow transactions from endpoint to endpoint, the transaction timeout can be lost if the destination endpoint attempts to flow again using any protocol other than `OleTransactions`. This can cause all down-level nodes after the OleTransactions hop to timeout later than expected.

## See also

- [System.ServiceModel.Configuration.TransactionFlowElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.TransactionFlowElement)
- [System.ServiceModel.Channels.TransactionFlowBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransactionFlowBindingElement)
- [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding)
- [ServiceModel Transaction Configuration](../../../wcf/feature-details/servicemodel-transaction-configuration.md)
- [Enabling Transaction Flow](../../../wcf/feature-details/enabling-transaction-flow.md)
- [Bindings](../../../wcf/bindings.md)
- [Extending Bindings](../../../wcf/extending/extending-bindings.md)
- [Custom Bindings](../../../wcf/extending/custom-bindings.md)
- [\<customBinding>](custombinding.md)
