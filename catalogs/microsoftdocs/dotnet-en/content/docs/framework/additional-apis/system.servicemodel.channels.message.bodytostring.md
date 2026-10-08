---
description: "Learn more about: Message.BodyToString Method"
title: Message.BodyToString Method (System.ServiceModel.Channels)
ms.date: 11/01/2019
topic_type:
  - "apiref"
api_name:
  - "System.ServiceModel.Channels.Message.BodyToString"
api_location:
  - "system.servicemodel.dll"
api_type:
  - "Assembly"
---
# Message.BodyToString Method

Converts the message body into a string by calling the [System.ServiceModel.Channels.Message.OnBodyToString*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnBodyToString*) method.

```csharp
internal void BodyToString(XmlDictionaryWriter writer);
```

## Parameters

- `writer` [System.Xml.XmlDictionaryWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlDictionaryWriter)\
  The writer that is used to convert the message body to a string.

## Remarks

> **Warning:**
> The `Message.BodyToString` method is internal and is not meant to be used directly in your code.
>
> Microsoft does not support the use of this method in a production application under any circumstance.

## Requirements

**Namespace:** [System.ServiceModel.Channels](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels)

**Assembly:** System.ServiceModel.dll

**.NET Framework versions:** Available since 3.0.
