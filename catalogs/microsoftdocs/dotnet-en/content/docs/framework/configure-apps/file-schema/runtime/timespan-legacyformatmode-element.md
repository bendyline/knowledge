---
description: "Learn more about: <TimeSpan_LegacyFormatMode> Element"
title: "<TimeSpan_LegacyFormatMode> Element"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "<TimeSpan_LegacyFormatMode> element"
  - "TimeSpan_LegacyFormatMode element"
ms.assetid: 865e7207-d050-4442-b574-57ea29d5e2d6
---
# `<TimeSpan_LegacyFormatMode>` Element

Determines whether the runtime preserves legacy behavior in formatting operations with [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) values.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<runtime>`](runtime-element.md)\
&nbsp;&nbsp;&nbsp;&nbsp;`<TimeSpan_LegacyFormatMode>`

## Syntax

```xml
<TimeSpan_LegacyFormatMode
   enabled="true|false"/>
```

## Attributes and Elements

The following sections describe attributes, child elements, and parent elements.

### Attributes

| Attribute | Description |
| --- | --- |
| `enabled` | Required attribute.<br /><br /> Specifies whether the runtime uses legacy formatting behavior with [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) values. |

## enabled Attribute

| Value | Description |
| --- | --- |
| `false` | The runtime does not restore legacy formatting behavior. |
| `true` | The runtime restores legacy formatting behavior. |

### Child Elements

None.

### Parent Elements

| Element | Description |
| --- | --- |
| `configuration` | The root element in every configuration file used by the common language runtime and .NET Framework applications. |
| `runtime` | Contains information about runtime initialization options. |

## Remarks

Starting with .NET Framework 4, the [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) structure implements the [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) interface and supports formatting operations with standard and custom format strings. If a parsing method encounters an unsupported format specifier or format string, it throws a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException).

In previous versions of .NET Framework, the [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) structure did not implement [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) and did not support format strings. However, many developers mistakenly assumed that [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) did support a set of format strings and used them in [composite formatting operations](../../../../standard/base-types/composite-formatting.md) with methods such as [System.String.Format*](https://learn.microsoft.com/search/?terms=System.String.Format*). Ordinarily, if a type implements [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) and supports format strings, calls to formatting methods with unsupported format strings usually throw a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException). However, because [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) did not implement [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable), the runtime ignored the format string and instead called the [System.TimeSpan.ToString](https://learn.microsoft.com/search/?terms=System.TimeSpan.ToString) method. This means that, although the format strings had no effect on the formatting operation, their presence did not result in a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException).

For cases in which legacy code passes a composite formatting method and an invalid format string, and that code cannot be recompiled, you can use the `<TimeSpan_LegacyFormatMode>` element to restore the legacy [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) behavior. When you set the `enabled` attribute of this element to `true`, the composite formatting method results in a call to [System.TimeSpan.ToString](https://learn.microsoft.com/search/?terms=System.TimeSpan.ToString) rather than [System.TimeSpan.ToString%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.TimeSpan.ToString%2528System.String%252CSystem.IFormatProvider%2529), and a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) is not thrown.

## Example

The following example instantiates a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) object and attempts to format it with the [System.String.Format%28System.String%2CSystem.Object%29](https://learn.microsoft.com/search/?terms=System.String.Format%2528System.String%252CSystem.Object%2529) method by using an unsupported standard format string.

[TimeSpan.BreakingChanges#1 (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_CLR/timespan.breakingchanges/cs/legacyformatmode1.cs#1)](../../../../../_code/samples/snippets/csharp/VS_Snippets_CLR/timespan.breakingchanges/cs/legacyformatmode1.cs.md)
[TimeSpan.BreakingChanges#1 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_CLR/timespan.breakingchanges/vb/legacyformatmode1.vb#1)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/timespan.breakingchanges/vb/legacyformatmode1.vb.md)

When you run the example on .NET Framework 3.5 or on an earlier version, it displays the following output:

```console
12:30:45
```

This differs markedly from the output if you run the example on the .NET Framework 4 or later version:

```console
Invalid Format
```

However, if you add the following configuration file to the example's directory and then run the example on .NET Framework 4 or a later version, the output is identical to that produced by the example when it is run on .NET Framework 3.5.

```xml
<?xml version ="1.0"?>
<configuration>
   <runtime>
      <TimeSpan_LegacyFormatMode enabled="true"/>
   </runtime>
</configuration>
```

## See also

- [Configure apps by using configuration files](../../index.md)
- [Runtime Settings Schema](index.md)
- [Configuration File Schema](../index.md)
