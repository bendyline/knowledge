---
description: "Learn more about: XmlReader.CreateSqlReader Method"
title: XmlReader.CreateSqlReader Method (System.Xml)
ms.date: 10/17/2019
topic_type:
  - "apiref"
api_name:
  - "System.Xml.XmlReader.CreateSqlReader"
api_location:
  - "system.xml.dll"
api_type:
  - "Assembly"
---
# XmlReader.CreateSqlReader Method

Creates a new [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) instance using the specified stream, settings, and context information for parsing.

```csharp
internal static XmlReader CreateSqlReader(Stream input,
  XmlReaderSettings settings, XmlParserContext inputContext)
```

## Parameters

- `input` [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream)  
  The stream that contains the XML data.

- `settings` [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings)  
  The settings for the new [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) instance. This value can be `null`.

- `inputContext` [System.Xml.XmlParserContext](https://learn.microsoft.com/search/?terms=System.Xml.XmlParserContext)  
  The context information required to parse the XML fragment. This value can be `null`.

## Returns

[System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader)  
An object that is used to read the XML data in the stream.

## Remarks

> **Warning:**
> The `XmlReader.CreateSqlReader` method is internal and is not meant to be used directly in your code.
>
> Microsoft does not support the use of this method in a production application under any circumstance.

## Requirements

**Namespace:** [System.Xml](https://learn.microsoft.com/search/?terms=System.Xml)

**Assembly:** System.Xml.dll

**.NET Framework versions:** Available since 2.0.
