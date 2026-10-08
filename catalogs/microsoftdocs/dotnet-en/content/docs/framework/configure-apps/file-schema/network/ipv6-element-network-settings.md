---
description: "Learn more about: <ipv6> Element (Network Settings)"
title: "<ipv6> Element (Network Settings)"
ms.date: "03/30/2017"
f1_keywords:
  - "http://schemas.microsoft.com/.NetConfiguration/v2.0#configuration/system.net/settings/ipv6"
  - "http://schemas.microsoft.com/.NetConfiguration/v2.0#ipv6"
helpviewer_keywords:
  - "<ipv6> element"
  - "ipv6 element"
ms.assetid: 10b79aef-327b-4718-a892-e11f55e4d169
---
# `<ipv6>` Element (Network Settings)

Enables Internet Protocol version 6 (IPv6) responses from obsolete members of the [System.Net.Dns](https://learn.microsoft.com/search/?terms=System.Net.Dns) class.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.net>`](system-net-element-network-settings.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<settings>`](settings-element-network-settings.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<ipv6>`

## Syntax

```xml
<ipv6
  enabled="true|false"
/>
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

| **Attribute** | **Description** |
| --- | --- |
| `enabled` | Specifies whether members of the [System.Net.Dns](https://learn.microsoft.com/search/?terms=System.Net.Dns) class return Internet Protocol version 6 (IPv6) addresses. The default value is `false`. |

### Child Elements

 None.

### Parent Elements

| **Element** | **Description** |
| --- | --- |
| [settings](settings-element-network-settings.md) | Configures basic network options for the [System.Net](https://learn.microsoft.com/search/?terms=System.Net) namespace. |

## Remarks

 This setting enables IPv6 support for the obsolete members of the [System.Net.Dns](https://learn.microsoft.com/search/?terms=System.Net.Dns) class: [System.Net.Dns.BeginGetHostByName*](https://learn.microsoft.com/search/?terms=System.Net.Dns.BeginGetHostByName*), [System.Net.Dns.BeginResolve*](https://learn.microsoft.com/search/?terms=System.Net.Dns.BeginResolve*), [System.Net.Dns.EndGetHostByName*](https://learn.microsoft.com/search/?terms=System.Net.Dns.EndGetHostByName*), [System.Net.Dns.EndResolve*](https://learn.microsoft.com/search/?terms=System.Net.Dns.EndResolve*), [System.Net.Dns.GetHostByAddress*](https://learn.microsoft.com/search/?terms=System.Net.Dns.GetHostByAddress*), [System.Net.Dns.GetHostByName*](https://learn.microsoft.com/search/?terms=System.Net.Dns.GetHostByName*), and [System.Net.Dns.Resolve*](https://learn.microsoft.com/search/?terms=System.Net.Dns.Resolve*). For other members of the [System.Net](https://learn.microsoft.com/search/?terms=System.Net) namespace, IPv6 addresses may be returned if IPv6 is enabled in the operating system.

## Configuration Files

 This element can be used in the application configuration file or the machine configuration file (Machine.config).

## Example

 The following example shows how to enable IPv6 support for the [System.Net.Dns](https://learn.microsoft.com/search/?terms=System.Net.Dns) class.

```xml
<configuration>
  <system.net>
    <settings>
      <ipv6 enabled="true"/>
    </settings>
  </system.net>
</configuration>
```

## See also

- [System.Net](https://learn.microsoft.com/search/?terms=System.Net)
- [System.Net.Dns](https://learn.microsoft.com/search/?terms=System.Net.Dns)
- [System.Net.Sockets.Socket.OSSupportsIPv6*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.OSSupportsIPv6*)
- [Network Settings Schema](index.md)
