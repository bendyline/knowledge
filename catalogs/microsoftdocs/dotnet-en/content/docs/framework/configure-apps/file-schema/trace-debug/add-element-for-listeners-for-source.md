---
description: "Learn more about: <add> Element for <listeners> for <source>"
title: "<add> Element for <listeners> for <source>"
ms.date: "03/30/2017"
f1_keywords:
  - "http://schemas.microsoft.com/.NetConfiguration/v2.0#configuration/system.diagnostics/sources/source/listeners/add"
helpviewer_keywords:
  - "initializeData attribute"
  - "add element for <listeners> for <source>"
  - "<add> element for <listeners> for <source>"
ms.assetid: 4ce36ac1-81ef-48e8-b8b2-b5a5b0e2adcb
---
# `<add>` Element for `<listeners>` for \<source>

Adds a listener to the `Listeners` collection for a trace source.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.diagnostics>`](system-diagnostics-element.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<sources>`](sources-element.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<source>`](source-element.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<listeners>`](listeners-element-for-source.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<add>`

## Syntax

```xml
<add name="name"
  type="TraceListenerClassName, Version, Culture, PublicKeyToken"
  initializeData="data"/>
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

| Attribute | Description |
| --- | --- |
| `type` | Required attribute, unless you're referencing a listener in the `sharedListeners` collection, in which case you only need to refer to it by name (see the [Example](#example)).<br /><br /> Specifies the type of the listener. You must use a string that meets the requirements specified in [Specifying Fully Qualified Type Names](../../../../fundamentals/reflection/specifying-fully-qualified-type-names.md). |
| `initializeData` | Optional attribute.<br /><br /> The string passed to the constructor for the specified class. A [System.Configuration.ConfigurationException](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationException) is thrown if the class does not have a constructor that takes a string. |
| `name` | Optional attribute.<br /><br /> Specifies the name of the listener. |
| `traceOutputOptions` | Optional attribute.<br /><br /> Specifies the [System.Diagnostics.TraceListener.TraceOutputOptions](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceListener.TraceOutputOptions) property value for the trace listener. |
| [custom attributes] | Optional attributes.<br /><br /> Specifies the value for listener-specific attributes identified by the [System.Diagnostics.TraceListener.GetSupportedAttributes*](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceListener.GetSupportedAttributes*) method for that listener. [System.Diagnostics.DelimitedListTraceListener.Delimiter*](https://learn.microsoft.com/search/?terms=System.Diagnostics.DelimitedListTraceListener.Delimiter*) is an example of an extra attribute unique to the [System.Diagnostics.DelimitedListTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DelimitedListTraceListener) class. |

### Child Elements

| Element | Description |
| --- | --- |
| [\<filter>](filter-element-for-add-for-listeners-for-source.md) | Adds a filter to a listener in the `Listeners` collection for a trace source. |

### Parent Elements

| Element | Description |
| --- | --- |
| `configuration` | The root element in every configuration file used by the common language runtime and .NET Framework applications. |
| `system.diagnostics` | Specifies trace listeners that collect, store, and route messages and the level where a trace switch is set. |
| `sources` | Contains trace sources that initiate tracing messages. |
| `source` | Specifies a trace source that initiates tracing messages. |
| `listeners` | Specifies listeners that collect, store, and route messages. |

## Remarks

 The listener classes shipped with the .NET Framework derive from the [System.Diagnostics.TraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceListener) class.

 If you do not specify the `name` attribute of the trace listener, the [System.Diagnostics.TraceListener.Name](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceListener.Name) property of the trace listener defaults to an empty string (""). If your application has only one listener, you can add it without specifying a name, and you can remove it by specifying an empty string for the name. However, if your application has more than one listener, you should specify a unique name for each trace listener, which allows you to identify and manage individual trace listeners in the [System.Diagnostics.TraceSource.Listeners*](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceSource.Listeners*) collection.

> **Note:**
> Adding more than one trace listener of the same type and with the same name results in only one trace listener of that type and name being added to the `Listeners` collection. However, you can programmatically add multiple identical listeners to the `Listeners` collection.

 The value for the `initializeData` attribute depends on the type of listener you create. Not all trace listeners require that you specify `initializeData`.

> **Note:**
> When you use the `initializeData` attribute, you may get the compiler warning "The 'initializeData' attribute is not declared." This warning occurs because the configuration settings are validated against the abstract base class [System.Diagnostics.TraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceListener), which does not recognize the `initializeData` attribute. Typically, you can ignore this warning for trace listener implementations that have a constructor that takes a parameter.

 The following table shows the trace listeners that are included with the .NET Framework and describes the value of their `initializeData` attributes.

| Trace listener class | initializeData attribute value |
| --- | --- |
| [System.Diagnostics.ConsoleTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.ConsoleTraceListener) | The `useErrorStream` value for the [System.Diagnostics.ConsoleTraceListener.%23ctor*](https://learn.microsoft.com/search/?terms=System.Diagnostics.ConsoleTraceListener.%2523ctor*) constructor.  Set the `initializeData` attribute to "`true`" to write trace and debug output to the standard error stream; set it to "`false`" to write to the standard output stream. |
| [System.Diagnostics.DelimitedListTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DelimitedListTraceListener) | The name of the file the [System.Diagnostics.DelimitedListTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DelimitedListTraceListener) writes to. |
| [System.Diagnostics.EventLogTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLogTraceListener) | The name of an existing event log source. |
| [System.Diagnostics.EventSchemaTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventSchemaTraceListener) | The name of the file that the [System.Diagnostics.EventSchemaTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventSchemaTraceListener) writes to. |
| [System.Diagnostics.TextWriterTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TextWriterTraceListener) | The name of the file that the [System.Diagnostics.TextWriterTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TextWriterTraceListener) writes to. |
| [System.Diagnostics.XmlWriterTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.XmlWriterTraceListener) | The name of the file that the [System.Diagnostics.XmlWriterTraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.XmlWriterTraceListener) writes to. |

## Configuration File

 This element can be used in the machine configuration file (Machine.config) and the application configuration file.

## Example

 The following example shows how to use `<add>` elements to add the listeners `console` and `textListener` to the `Listeners` collection for the trace source `TraceSourceApp`. The `textListener` listener writes trace output to the file myListener.log.

```xml
<configuration>
  <system.diagnostics>
    <sources>
      <source name="TraceSourceApp" switchName="sourceSwitch"
        switchType="System.Diagnostics.SourceSwitch">
        <listeners>
          <add name="console"
            type="System.Diagnostics.ConsoleTraceListener"/>
          <add name="textListener"/>
          <remove name="Default"/>
        </listeners>
      </source>
    </sources>
    <sharedListeners>
      <add name="textListener"
        type="System.Diagnostics.TextWriterTraceListener"
        initializeData="myListener.log"/>
    </sharedListeners>
    <switches>
      <add name="sourceSwitch" value="Warning"/>
    </switches>
  </system.diagnostics>
</configuration>
```

## See also

- [System.Diagnostics.TraceSource](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceSource)
- [System.Diagnostics.TraceListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.TraceListener)
- [Trace and Debug Settings Schema](index.md)
- [Trace Listeners](../../../debug-trace-profile/trace-listeners.md)
