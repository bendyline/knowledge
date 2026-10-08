---
description: "Learn more about: <add> Element for <listeners> for <trace>"
title: "<add> Element for <listeners> for <trace>"
ms.date: "03/30/2017"
f1_keywords:
  - "http://schemas.microsoft.com/.NetConfiguration/v2.0#configuration/system.diagnostics/trace/listeners/add"
helpviewer_keywords:
  - "initializeData attribute"
  - "<add> element for <listeners>"
  - "add element for <listeners>"
ms.assetid: 81e804a3-ef11-4d39-bbde-bfa012c179e2
---
# `<add>` Element for `<listeners>` for \<trace>

Adds a listener to the `Listeners` collection.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.diagnostics>`](system-diagnostics-element.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<trace>`](trace-element.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<listeners>`](listeners-element-for-trace.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<add>`

## Syntax

```xml
<add name="name"
     type="trace listener class name, Version, Culture, PublicKeyToken"
     initializeData="data"/>
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

| Attribute | Description |
| --- | --- |
| **type** | Required attribute.<br /><br /> Specifies the type of the listener. You must use a string that meets the requirements specified in [Specifying Fully Qualified Type Names](../../../../fundamentals/reflection/specifying-fully-qualified-type-names.md). |
| **initializeData** | Optional attribute.<br /><br /> The string passed to the constructor for the specified class. |
| **name** | Optional attribute.<br /><br /> Specifies the name of the listener. |

### Child Elements

| Element | Description |
| --- | --- |
| [\<filter>](filter-element-for-add-for-listeners-for-trace.md) | Adds a filter to a listener in the `Listeners` collection for a trace. |

### Parent Elements

| Element | Description |
| --- | --- |
| `configuration` | The root element in every configuration file used by the common language runtime and .NET Framework applications. |
| `listeners` | Specifies a listener that collects, stores, and routes messages. Listeners direct the tracing output to an appropriate target. |
| `system.diagnostics` | Specifies the root element for the ASP.NET configuration section. |
| `trace` | Contains listeners that collect, store, and route tracing messages. |

## Remarks

 The [System.Diagnostics.Debug](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug) and [System.Diagnostics.Trace](https://learn.microsoft.com/search/?terms=System.Diagnostics.Trace) classes share the same `Listeners` collection. If you add a listener object to the collection in one of these classes, the other class uses the same listener. The listener classes derive from the [System.Diagnostics.TraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceListener).

 If you do not specify the `name` attribute of the trace listener, the [System.Diagnostics.TraceListener.Name*](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceListener.Name*) of the trace listener defaults to an empty string (""). If your application has only one listener, you can add it without specifying a name, and remove it by specifying an empty string for the name. However, if your application has more than one listener, you should specify unique names for each trace listener, which allows you to identify and manage individual trace listeners within the [System.Diagnostics.Debug.Listeners*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug.Listeners*) and [System.Diagnostics.Trace.Listeners*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Trace.Listeners*) collections.

> **Note:**
> Adding more than one trace listener of the same type and with the same name results in only one trace listener of that type and name being added to the `Listeners` collection. However, you can programmatically add multiple identical listeners to the `Listeners` collection.

 The value for the `initializeData` attribute depends on the type of listener you create. Not all trace listeners require that you specify **initializeData**.

> **Note:**
> When you use the `initializeData` attribute, you may get the compiler warning "The 'initializeData' attribute is not declared." This warning occurs because the configuration settings are validated against the abstract base class [System.Diagnostics.TraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceListener), which does not recognize the `initializeData` attribute. Typically, you can ignore this warning for trace listener implementations that have a constructor that takes a parameter.

 The following table shows the trace listeners that are included with the .NET Framework and describes the value of their `initializeData` attributes.

| Trace listener class | initializeData attribute value |
| --- | --- |
| [System.Diagnostics.ConsoleTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.ConsoleTraceListener) | The `useErrorStream` value for the [System.Diagnostics.ConsoleTraceListener.%23ctor*](https://learn.microsoft.com/search/?terms=System.Diagnostics.ConsoleTraceListener.%2523ctor*) constructor.  Set the `initializeData` attribute to "`true`" to write trace and debug output to [System.Console.Error*](https://learn.microsoft.com/search/?terms=System.Console.Error*); "`false`" to write to [System.Console.Out*](https://learn.microsoft.com/search/?terms=System.Console.Out*). |
| [System.Diagnostics.DelimitedListTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DelimitedListTraceListener) | The name of the file the [System.Diagnostics.DelimitedListTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DelimitedListTraceListener) writes to. |
| [System.Diagnostics.EventLogTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLogTraceListener) | The name of the name of an existing event log source. |
| [System.Diagnostics.EventSchemaTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventSchemaTraceListener) | The name of the file that the [System.Diagnostics.EventSchemaTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventSchemaTraceListener) writes to. |
| [System.Diagnostics.TextWriterTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TextWriterTraceListener) | The name of the file that the [System.Diagnostics.TextWriterTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TextWriterTraceListener) writes to. |
| [System.Diagnostics.XmlWriterTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.XmlWriterTraceListener) | The name of the file that the [System.Diagnostics.XmlWriterTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.XmlWriterTraceListener) writes to. |

## Example

 The following example shows how to use `<add>` elements to add the listeners `MyListener` and `MyEventListener` to the `Listeners` collection. `MyListener` creates a file called `MyListener.log` and writes the output to the file. `MyEventListener` creates an entry in the event log.

```xml
<configuration>
   <system.diagnostics>
      <trace autoflush="true" indentsize="0">
         <listeners>
            <add name="myListener" type="System.Diagnostics.TextWriterTraceListener, system, version=1.0.3300.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" initializeData="c:\myListener.log" />
            <add name="MyEventListener"
                 type="System.Diagnostics.EventLogTraceListener, system, version=1.0.3300.0, Culture=neutral, PublicKeyToken=b77a5c561934e089"                 initializeData="MyConfigEventLog"/>
            <add name="configConsoleListener"
                 type="System.Diagnostics.ConsoleTraceListener, system, version=1.0.3300.0, Culture=neutral, PublicKeyToken=b77a5c561934e089"/>
         </listeners>
      </trace>
   </system.diagnostics>
</configuration>
```

## See also

- [System.Diagnostics.Trace](https://learn.microsoft.com/search/?terms=System.Diagnostics.Trace)
- [System.Diagnostics.Debug](https://learn.microsoft.com/search/?terms=System.Diagnostics.Debug)
- [System.Diagnostics.EventLogTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLogTraceListener)
- [System.Diagnostics.ConsoleTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.ConsoleTraceListener)
- [System.Diagnostics.TextWriterTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TextWriterTraceListener)
- [Trace and Debug Settings Schema](index.md)
- [Trace Listeners](../../../debug-trace-profile/trace-listeners.md)
