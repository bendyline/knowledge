---
title: "<defaultProxy> Element (Network Settings)"
description: The <defaultProxy> network settings element configures the Hypertext Transfer Protocol (HTTP) proxy server in .NET Framework.
ms.date: 08/10/2023
f1_keywords:
  - "http://schemas.microsoft.com/.NetConfiguration/v2.0#defaultProxy"
  - "http://schemas.microsoft.com/.NetConfiguration/v2.0#configuration/system.net/defaultProxy"
helpviewer_keywords:
  - "defaultProxy element"
  - "<defaultProxy> element"
---
# `<defaultProxy>` element (network settings)

Configures the Hypertext Transfer Protocol (HTTP) proxy server.

[`<configuration>`](../configuration-element.md)
&nbsp;&nbsp;[`<system.net>`](system-net-element-network-settings.md)
&nbsp;&nbsp;&nbsp;&nbsp;`<defaultProxy>`

> **Note:**
> If you're migrating to .NET 6+, configure the proxy server using the [System.Net.Http.HttpClient.DefaultProxy](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.DefaultProxy) property.

## Syntax

```xml
<defaultProxy
  enabled="True|False"
  useDefaultCredentials="True|False">
    <bypasslist>...</bypasslist>
    <proxy>...</proxy>
    <module>...</module>
</defaultProxy>
```

## Attributes and elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

| **Element** | **Description** |
| --- | --- |
| `enabled` | Specifies whether a web proxy is used. The default value is `True`. |
| `useDefaultCredentials` | Specifies whether the default credentials for this host are used to access the web proxy. The default value is `False`. |

### Child elements

| **Element** | **Description** |
| --- | --- |
| [bypasslist](bypasslist-element-network-settings.md) | Provides a set of regular expressions that describe addresses that do not use the proxy. |
| [module](module-element-network-settings.md) | Adds a new proxy module to the application. |
| [proxy](proxy-element-network-settings.md) | Defines a proxy server. |

### Parent elements

| **Element** | **Description** |
| --- | --- |
| [system.net](system-net-element-network-settings.md) | Contains settings that specify how .NET Framework connects to the network. |

## Remarks

 If the `defaultProxy` element is empty, the system proxy settings are used.

 An exception is thrown if the [module](module-element-network-settings.md) element specifies a non-public type, the type is not deriving from the [System.Net.IWebProxy](https://learn.microsoft.com/search/?terms=System.Net.IWebProxy) class, an exception from the parameterless constructor of this object occurred, or an exception occurred while retrieving the system-specified default proxy. The [System.Exception.InnerException](https://learn.microsoft.com/search/?terms=System.Exception.InnerException) property on the exception should have more information about the root cause of the error.

## Configuration files

This element can be used in the application configuration file or the machine configuration file (Machine.config).

## Example

The following example uses the defaults from the system proxy, specifies the proxy address, and bypasses the proxy for local access and contoso.com.

```xml
<configuration>
  <system.net>
    <defaultProxy>
      <proxy
        usesystemdefault="True"
        proxyaddress="http://192.168.1.10:3128"
        bypassonlocal="True"
      />
      <bypasslist>
        <add address="[a-z]+\.contoso\.com$" />
      </bypasslist>
    </defaultProxy>
  </system.net>
</configuration>
```

## See also

- [System.Net.WebProxy](https://learn.microsoft.com/search/?terms=System.Net.WebProxy)
- [Network Settings Schema](index.md)
