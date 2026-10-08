---
title: "How to: Configure Network Tracing"
description: Learn how to configure network tracing in the computer configuration file or application configuration file. An application configuration file takes precedence.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "formatting [.NET Framework], network tracing"
  - "network tracing, configuring"
  - "level attribute"
  - "app.config files, network tracing"
  - "configuration files [.NET Framework], network tracing"
  - "protocol-level trace output"
  - "application configuration files, network tracing"
  - "sockets, trace output"
ms.assetid: 5ef9fe4b-8d3d-490e-9259-1d014b2181af
---
# How to: Configure network tracing

The application or computer configuration file holds the settings that determine the format and content of network traces. Before performing this procedure, be sure tracing is enabled. For more information, see [Enable network tracing](enabling-network-tracing.md).

The computer configuration file, *machine.config*, is stored in the *%windir%\Microsoft.NET\Framework* folder. There is a separate *machine.config* file in the folders under *%windir%\Microsoft.NET\Framework* for each version of the .NET Framework installed on the computer, for example:

- *C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727\Config\machine.config*
- *C:\WINDOWS\Microsoft.NET\Framework64\v4.0.30319\Config\machine.config*

These settings can also be made in the configuration file for the application, which has precedence over the computer configuration file.

## Configure network tracing

To configure network tracing, add the following lines to the appropriate configuration file. The values and options for these settings are described in the tables below.

```xml
<configuration>
  <system.diagnostics>
    <sources>
      <source name="System.Net" tracemode="includehex" maxdatasize="1024">
        <listeners>
          <add name="System.Net"/>
        </listeners>
      </source>
      <source name="System.Net.Cache">
        <listeners>
          <add name="System.Net"/>
        </listeners>
      </source>
      <source name="System.Net.Http">
        <listeners>
          <add name="System.Net"/>
        </listeners>
      </source>
      <source name="System.Net.Sockets">
        <listeners>
          <add name="System.Net"/>
        </listeners>
      </source>
      <source name="System.Net.WebSockets">
        <listeners>
          <add name="System.Net"/>
        </listeners>
      </source>
   </sources>
    <switches>
      <add name="System.Net" value="Verbose"/>
      <add name="System.Net.Cache" value="Verbose"/>
      <add name="System.Net.Http" value="Verbose"/>
      <add name="System.Net.Sockets" value="Verbose"/>
      <add name="System.Net.WebSockets" value="Verbose"/>
    </switches>
    <sharedListeners>
      <add name="System.Net"
        type="System.Diagnostics.TextWriterTraceListener"
        initializeData="network.log"
        traceOutputOptions="ProcessId, DateTime"
      />
    </sharedListeners>
    <trace autoflush="true"/>
  </system.diagnostics>
</configuration>
```

### Trace output from methods

When you add a name to the `<switches>` block, the trace output includes information from some methods related to the name. The following table describes the output:

| Name | Output from |
| --- | --- |
| `System.Net.Sockets` | Some public methods of the [System.Net.Sockets.Socket](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket), [System.Net.Sockets.TcpListener](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener), [System.Net.Sockets.TcpClient](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient), and [System.Net.Dns](https://learn.microsoft.com/search/?terms=System.Net.Dns) classes. |
| `System.Net` | Some public methods of the [System.Net.HttpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest), [System.Net.HttpWebResponse](https://learn.microsoft.com/search/?terms=System.Net.HttpWebResponse), [System.Net.FtpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.FtpWebRequest), and [System.Net.FtpWebResponse](https://learn.microsoft.com/search/?terms=System.Net.FtpWebResponse) classes, and SSL debug information (invalid certificates, missing issuers list, and client certificate errors). |
| `System.Net.HttpListener` | Some public methods of the [System.Net.HttpListener](https://learn.microsoft.com/search/?terms=System.Net.HttpListener), [System.Net.HttpListenerRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpListenerRequest), and [System.Net.HttpListenerResponse](https://learn.microsoft.com/search/?terms=System.Net.HttpListenerResponse) classes. |
| `System.Net.Cache` | Some private and internal methods in `System.Net.Cache`. |
| `System.Net.Http` | Some public methods of the  [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient),  [System.Net.Http.DelegatingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.DelegatingHandler),  [System.Net.Http.HttpClientHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler), [System.Net.Http.HttpMessageHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpMessageHandler),  [System.Net.Http.MessageProcessingHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.MessageProcessingHandler), and  [System.Net.Http.WebRequestHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.WebRequestHandler) classes. |
| `System.Net.WebSockets.WebSocket` | Some public methods of the [System.Net.WebSockets.ClientWebSocket](https://learn.microsoft.com/search/?terms=System.Net.WebSockets.ClientWebSocket) and [System.Net.WebSockets.WebSocket](https://learn.microsoft.com/search/?terms=System.Net.WebSockets.WebSocket) classes. |

### Trace output attributes

The attributes listed in the following table configure trace output:

| Attribute name | Attribute value |
| --- | --- |
| `value` | Required [System.String](https://learn.microsoft.com/search/?terms=System.String) attribute. Sets the verbosity of the output. Legitimate values are `Critical`, `Error`, `Verbose`, `Warning`, and `Information`.<br /><br />This attribute must be set on the `add` element of the `switches` element. An exception is thrown if this attribute is set on the `source` element.<br/><br/>Example: `<add name="System.Net" value="Verbose"/>` |
| `maxdatasize` | Optional [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) attribute. Sets the maximum number of bytes of network data included in each line trace. The default value is 1024.<br /><br />This attribute must be set on the `source` element. An exception is thrown if this attribute is set on an element under the `switches` element.<br/><br/>Example: `<source name="System.Net" tracemode="includehex" maxdatasize="1024">` |
| `tracemode` | Optional [System.String](https://learn.microsoft.com/search/?terms=System.String) attribute. Set to `includehex` to show protocol traces in hexadecimal and text format. Set to `protocolonly` to show only text. The default value is `includehex`.<br /><br />This attribute must be set on the `source` element. An exception is thrown if this attribute is set on an element under the `switches` element.<br/><br/>Example: `<source name="System.Net" tracemode="includehex" maxdatasize="1024">` |

## See also

- [Interpreting Network Tracing](interpreting-network-tracing.md)
- [Network Tracing in the .NET Framework](network-tracing.md)
- [Enabling Network Tracing](enabling-network-tracing.md)
- [Tracing and Instrumenting Applications](../debug-trace-profile/tracing-and-instrumenting-applications.md)
