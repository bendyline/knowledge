---
description: "Learn more about: <remove> Element for <listeners> for <trace>"
title: "<remove> Element for <listeners> for <trace>"
ms.date: "03/30/2017"
f1_keywords:
  - "http://schemas.microsoft.com/.NetConfiguration/v2.0#configuration/system.diagnostics/trace/listeners/remove"
helpviewer_keywords:
  - "remove element"
  - "<remove> element"
ms.assetid: 9a5cd1b5-be1a-485f-8f0c-2890ad3ef3e0
---
# `<remove>` Element for `<listeners>` for \<trace>

Removes a listener from the `Listeners` collection.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.diagnostics>`](system-diagnostics-element.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<trace>`](trace-element.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<listeners>`](listeners-element-for-trace.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<remove>`

## Syntax

```xml
<remove name="listener name" />
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

| Attribute | Description |
| --- | --- |
| **name** | Required attribute.<br /><br /> The name of the listener to remove from the `Listeners` collection. |

### Child Elements

 None.

### Parent Elements

| Element | Description |
| --- | --- |
| `configuration` | The root element in every configuration file used by the common language runtime and .NET Framework applications. |
| `listeners` | Specifies a listener that collects, stores, and routes messages. Listeners direct the tracing output to an appropriate target. |
| `system.diagnostics` | Specifies trace listeners that collect, store, and route messages and the level where a trace switch is set. |
| `trace` | Configures the ASP.NET trace service. |

## Remarks

> **Note:**
> Removing the [System.Diagnostics.DefaultTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DefaultTraceListener) from the `Listeners` collection alters the behavior of the [System.Diagnostics.Debug.Assert*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.Assert*), [System.Diagnostics.Trace.Assert*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Trace.Assert*), [System.Diagnostics.Debug.Fail*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.Fail*), and [System.Diagnostics.Trace.Fail*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Trace.Fail*) methods. Calling an `Assert` or `Fail` method normally results in the display of a message box, however the message box is not displayed if the [System.Diagnostics.DefaultTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DefaultTraceListener) is not in the `Listeners` collection.

## Example

 The following example shows how to remove the default trace listener from the trace `Listeners` collection.

```xml
<configuration>
   <system.diagnostics>
      <trace autoflush="true" indentsize="0">
         <listeners>
            <remove name="Default" />
         </listeners>
      </trace>
   </system.diagnostics>
</configuration>
```

## See also

- [System.Diagnostics.TraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceListener)
- [System.Diagnostics.DefaultTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DefaultTraceListener)
- [System.Diagnostics.TextWriterTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TextWriterTraceListener)
- [System.Diagnostics.EventLogTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLogTraceListener)
- [Trace and Debug Settings Schema](index.md)
