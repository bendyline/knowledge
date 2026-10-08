---
title: "dateTimeInvalidLocalFormat MDA"
description: Review the dateTimeInvalidLocalFormat managed debugging assistant (MDA), which is activated when a UTC-stored DateTime value gets a local-only DateTime format.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "dates [.NET Framework], formatting"
  - "invalid date time local format"
  - "invalid local formats"
  - "MDAs (managed debugging assistants), invalid local formats"
  - "managed debugging assistants (MDAs), invalid local formats"
  - "dateTimeInvalidLocalFormat MDA"
  - "date formatting"
  - "time formatting"
  - "UTC formatting"
ms.assetid: c4a942bb-2651-4b65-8718-809f892a0659
---
# dateTimeInvalidLocalFormat MDA

> **Note:**
> This article is specific to .NET Framework. It doesn't apply to newer implementations of .NET, including .NET 6 and later versions.


The `dateTimeInvalidLocalFormat` MDA is activated when a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) instance that is stored as a Universal Coordinated Time (UTC) is formatted using a format that is intended to be used only for local [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) instances. This MDA is not activated for unspecified or default [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) instances.

## Symptom

 An application is manually serializing a UTC [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) instance using a local format:

```csharp
DateTime myDateTime = DateTime.UtcNow;
Serialize(myDateTime.ToString("yyyy-MM-dd'T'HH:mm:ss.fffffffzzz"));
```

### Cause

 The 'z' format for the [System.DateTime.ToString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToString*) method includes the local time zone offset, for example, "+10:00" for Sydney time. As such, it will only produce a meaningful result if the value of the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) is local. If the value is UTC time, [System.DateTime.ToString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToString*) includes the local time zone offset, but it does not display or adjust the time zone specifier.

### Resolution

 UTC [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) instances should be formatted in a way that indicates that they are UTC. The recommended format for UTC times to use a 'Z' to denote UTC time:

```csharp
DateTime myDateTime = DateTime.UtcNow;
Serialize(myDateTime.ToString("yyyy-MM-dd'T'HH:mm:ss.fffffffZ"));
```

 There is also an "o" format that serializes a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) making use of the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property that serializes correctly regardless of whether the instance is local, UTC, or unspecified:

```csharp
DateTime myDateTime = DateTime.UtcNow;
Serialize(myDateTime.ToString("o"));
```

## Effect on the Runtime

 This MDA does not affect the runtime.

## Output

 There is no special output as a result of this MDA activating., However, the call stack can be used to determine the location of the [System.DateTime.ToString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToString*) call that activated the MDA.

## Configuration

```xml
<mdaConfig>
  <assistants>
    <dateTimeInvalidLocalFormat />
  </assistants>
</mdaConfig>
```

## Example

 Consider an application that is indirectly serializing a UTC [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value by using the [System.Xml.XmlConvert](https://learn.microsoft.com/search/?terms=System.Xml.XmlConvert) or [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) class, in the following manner.

```csharp
DateTime myDateTime = DateTime.UtcNow;
String serialized = XMLConvert.ToString(myDateTime);
```

 The [System.Xml.XmlConvert](https://learn.microsoft.com/search/?terms=System.Xml.XmlConvert) and [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) serializations use local formats for serialization by default. Additional options are required to serialize other kinds of [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values, such as UTC.

 For this specific example, pass in `XmlDateTimeSerializationMode.RoundtripKind` to the `ToString` call on `XmlConvert`. This serializes the data as a UTC time.

 If using a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet), set the [System.Data.DataColumn.DateTimeMode](https://learn.microsoft.com/search/?terms=System.Data.DataColumn.DateTimeMode) property on the [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn) object to [System.Data.DataSetDateTime.Utc](https://learn.microsoft.com/search/?terms=System.Data.DataSetDateTime.Utc).

```csharp
DateTime myDateTime = DateTime.UtcNow;
String serialized = XmlConvert.ToString(myDateTime,
    XmlDateTimeSerializationMode.RoundtripKind);
```

## See also

- [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo)
- [Diagnosing Errors with Managed Debugging Assistants](diagnosing-errors-with-managed-debugging-assistants.md)
