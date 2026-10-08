---
title: "Instantiating a DateTimeOffset object"
description: Read how to instantiate (make an instance of) a DateTimeOffset object in .NET. Learn about date & time literals, constructors, implicit type conversion, & more.
ms.date: "04/10/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "instantiating time zone objects"
  - "time zone objects [.NET], instantiation"
  - "DateTimeOffset structure, converting to DateTime"
  - "DateTimeOffset structure, instantiating"
ms.topic: how-to
---
# Instantiating a DateTimeOffset object

The [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) structure offers a number of ways to create new [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values. Many of them correspond directly to the methods available for instantiating new [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values, with enhancements that allow you to specify the date and time value's offset from Coordinated Universal Time (UTC). In particular, you can instantiate a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value in the following ways:

- By using a date and time literal.

- By calling a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) constructor.

- By implicitly converting a value to [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value.

- By parsing the string representation of a date and time.

This topic provides greater detail and code examples that illustrate these methods of instantiating new [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values.

## Date and time literals

For languages that support it, one of the most common ways to instantiate a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value is to provide the date and time as a hard-coded literal value. For example, the following Visual Basic code creates a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object whose value is May 1, 2008, at 8:06:32 AM.

[language="vb" source="./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb" id="1"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb.md)

[System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values can also be initialized using date and time literals when using languages that support [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) literals. For example, the following Visual Basic code creates a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) object.

[language="vb" source="./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb" id="2"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb.md)

As the console output shows, the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value created in this way is assigned the offset of the local time zone. This means that a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value assigned using a character literal does not identify a single point of time if the code is run on different computers.

## DateTimeOffset constructors

The [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) type defines six constructors. Four of them correspond directly to [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) constructors, with an additional parameter of type [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) that defines the date and time's offset from UTC. These allow you to define a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value based on the value of its individual date and time components. For example, the following code uses these four constructors to instantiate [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) objects with identical values of 5/1/2008 8:06:32 +01:00.

[language="csharp" source="./snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs" id="3"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs.md)
[language="vb" source="./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb" id="3"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb.md)

Note that, when the value of the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) object instantiated using a [System.Globalization.PersianCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.PersianCalendar) object as one of the arguments to its constructor is displayed to the console, it is expressed as a date in the Gregorian rather than the Persian calendar. To output a date using the Persian calendar, see the example in the [System.Globalization.PersianCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.PersianCalendar) topic.

The other two constructors create a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) object from a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value. The first of these has a single parameter, the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value to convert to a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value. The offset of the resulting [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value depends on the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property of the constructor's single parameter. If its value is [System.DateTimeKind.Utc](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Utc), the offset is set equal to [System.TimeSpan.Zero](https://learn.microsoft.com/search/?terms=System.TimeSpan.Zero). Otherwise, its offset is set equal to that of the local time zone. The following example illustrates the use of this constructor to instantiate [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) objects representing UTC and the local time zone:

[language="csharp" source="./snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs" id="4"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs.md)
[language="vb" source="./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb" id="4"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb.md)

> **Note:**
> Calling the overload of the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) constructor that has a single [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) parameter is equivalent to performing an implicit conversion of a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value to a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value.

The second constructor that creates a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) object from a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value has two parameters: the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value to convert, and a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value representing the date and time's offset from UTC. This offset value must correspond to the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property of the constructor's first parameter or an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) is thrown. If the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property of the first parameter is [System.DateTimeKind.Utc](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Utc), the value of the second parameter must be [System.TimeSpan.Zero](https://learn.microsoft.com/search/?terms=System.TimeSpan.Zero). If the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property of the first parameter is [System.DateTimeKind.Local](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Local), the value of the second parameter must be the offset of the local system's time zone. If the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property of the first parameter is [System.DateTimeKind.Unspecified](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Unspecified), the offset can be any valid value. The following code illustrates calls to this constructor to convert [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) to [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values.

[language="csharp" source="./snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs" id="5"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs.md)
[language="vb" source="./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb" id="5"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb.md)

## Implicit type conversion

The [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) type supports one *implicit* type conversion: from a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value to a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value. (An implicit type conversion is a conversion from one type to another that does not require an explicit cast (in C#) or conversion (in Visual Basic) and that does not lose information.) It makes code like the following possible.

[language="csharp" source="./snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs" id="6"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs.md)
[language="vb" source="./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb" id="6"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb.md)

The offset of the resulting [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value depends on the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property value. If its value is [System.DateTimeKind.Utc](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Utc), the offset is set equal to [System.TimeSpan.Zero](https://learn.microsoft.com/search/?terms=System.TimeSpan.Zero). If its value is either [System.DateTimeKind.Local](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Local) or [System.DateTimeKind.Unspecified](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Unspecified), the offset is set equal to that of the local time zone.

## Parsing the string representation of a date and time

The [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) type supports four methods that allow you to convert the string representation of a date and time into a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value:

- [System.DateTimeOffset.Parse*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.Parse*), which tries to convert the string representation of a date and time to a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value and throws an exception if the conversion fails.

- [System.DateTimeOffset.TryParse*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.TryParse*), which tries to convert the string representation of a date and time to a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value and returns `false` if the conversion fails.

- [System.DateTimeOffset.ParseExact*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ParseExact*), which tries to convert the string representation of a date and time in a specified format to a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value. The method throws an exception if the conversion fails.

- [System.DateTimeOffset.TryParseExact*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.TryParseExact*), which tries to convert the string representation of a date and time in a specified format to a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value. The method returns `false` if the conversion fails.

The following example illustrates calls to each of these four string conversion methods to instantiate a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value.

[language="csharp" source="./snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs" id="7"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/csharp/Instantiate.cs.md)
[language="vb" source="./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb" id="7"::: (complete source file; reference: ./snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb)](../../../_code/docs/standard/datetime/snippets/instantiating-a-datetimeoffset-object/vb/Instantiate.vb.md)

## See also

- [Dates, times, and time zones](index.md)
