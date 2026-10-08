---
description: "Learn more about: <namespaceTable>"
title: "<namespaceTable>"
ms.date: "03/30/2017"
---

# `<namespaceTable>`

Represents a configuration section for defining a set of elements that contain namespace to prefix mappings that can then be used in XPath filters for routing.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.serviceModel>`](system-servicemodel.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<routing>`](routing.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<namespaceTable>`

## Syntax

```xml
<system.serviceModel>
  <routing>
    <namespaceTable>
      <add namespace="String"
           prefix="String" />
    </namespaceTable>
  </routing>
</system.serviceModel>
```

## Attributes and elements

The following sections describe attributes, child elements, and parent elements.

### Attributes

None

### Child elements

| Child element | Description |
| --- | --- |
| [`<filter>`](filter.md) | Defines a namespace prefix mapping used for XPath expressions. |

### Parent elements

| Parent element | Description |
| --- | --- |
| [`<routing>`](routing.md) | Represents a configuration section for defining a set of routing filters, which determine the type of Windows Communication Foundation (WCF)[System.ServiceModel.Dispatcher.MessageFilter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.MessageFilter) to be used when evaluating incoming messages, as well as routing tables that define the target endpoints to send messages to when a filter matches. |

## See also

- [System.ServiceModel.Routing.Configuration.NamespaceElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Routing.Configuration.NamespaceElementCollection)
