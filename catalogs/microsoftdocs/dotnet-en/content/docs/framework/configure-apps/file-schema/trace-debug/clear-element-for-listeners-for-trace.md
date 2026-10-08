---
description: "Learn more about: <clear> Element for <listeners> for <trace>"
title: "<clear> Element for <listeners> for <trace>"
ms.date: "03/30/2017"
f1_keywords:
  - "http://schemas.microsoft.com/.NetConfiguration/v2.0#configuration/system.diagnostics/trace/listeners/clear"
helpviewer_keywords:
  - "clear element for <listeners> for <trace>"
  - "<clear> element for <listeners> for <trace>"
ms.assetid: b44732a8-271f-4a06-ba9e-fe3298d6f192
---
# `<clear>` Element for `<listeners>` for \<trace>

Clears the `Listeners` collection for trace.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.diagnostics>`](system-diagnostics-element.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<trace>`](trace-element.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<listeners>`](listeners-element-for-trace.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<clear>`

## Syntax

```xml
<clear/>
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

 None.

### Child Elements

 None.

### Parent Elements

| Element | Description |
| --- | --- |
| `configuration` | The root element in every configuration file used by the common language runtime and .NET Framework applications. |
| `system.diagnostics` | Specifies trace listeners that collect, store, and route messages and the level where a trace switch is set. |
| `trace` | Contains listeners that collect, store, and route tracing messages. |
| `listeners` | Contains listeners that collect, store, and route messages. Listeners direct the tracing output to an appropriate target. |

## Remarks

 The `<clear>` element removes all listeners from the `Listeners` collection for trace. You can use the `<clear>` element before using the `<add>` element to be certain there are no other active listeners in the collection.

 You can clear the `Listeners` collection programmatically by calling the [System.Diagnostics.TraceListenerCollection.Clear*](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceListenerCollection.Clear*) method on the [System.Diagnostics.Trace.Listeners](https://learn.microsoft.com/search/?terms=System.Diagnostics.Trace.Listeners) property (`System.Diagnostics.Trace.Listeners.Clear()`).

 This element can be used in the machine configuration file (Machine.config) and the application configuration file.

> **Note:**
> The `<clear>` element removes the [System.Diagnostics.DefaultTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DefaultTraceListener) from the `Listeners` collection, altering the behavior of the [System.Diagnostics.Debug.Assert*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.Assert*), [System.Diagnostics.Trace.Assert*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Trace.Assert*), [System.Diagnostics.Debug.Fail*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.Fail*), and [System.Diagnostics.Trace.Fail*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Trace.Fail*) methods. Calling an `Assert` or `Fail` method normally results in the display of a message box. However, the message box is not displayed if the [System.Diagnostics.DefaultTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DefaultTraceListener) is not in the `Listeners` collection.

## Example

 The following example shows how to use the `<clear>` element before using the `<add>` element to add the listener `console` to the `Listeners` collection for trace.

```xml
<configuration>
  <system.diagnostics>
    <trace autoflush="false" indentsize="4">
      <listeners>
        <clear/>
        <add name="console"
          type="System.Diagnostics.ConsoleTraceListener" >
          <filter type="System.Diagnostics.EventTypeFilter"
            initializeData="Error" />
        </add>
      </listeners>
    </trace>
  </system.diagnostics>
</configuration>
```

## See also

- [System.Diagnostics.Trace.Listeners*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Trace.Listeners*)
- [System.Diagnostics.Trace](https://learn.microsoft.com/search/?terms=System.Diagnostics.Trace)
- [System.Diagnostics.Debug](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug)
- [System.Diagnostics.TraceSource](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceSource)
- [Trace and Debug Settings Schema](index.md)
- [\<remove>](remove-element-for-listeners-for-trace.md)
- [Trace Listeners](../../../debug-trace-profile/trace-listeners.md)
