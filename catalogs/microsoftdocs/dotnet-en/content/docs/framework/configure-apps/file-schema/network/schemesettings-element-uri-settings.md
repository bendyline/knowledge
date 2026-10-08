---
description: "Learn more about: <schemeSettings> Element (Uri Settings)"
title: "<schemeSettings> Element (Uri Settings)"
ms.date: "03/30/2017"
ms.assetid: 0ae45c6e-8c4c-4c0d-8b9f-a93824648890
---
# `<schemeSettings>` Element (Uri Settings)

Specifies how a [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) will be parsed for specific schemes.

[`<configuration>`](../configuration-element.md)
&nbsp;&nbsp;[`<uri>`](uri-element-uri-settings.md)
&nbsp;&nbsp;&nbsp;&nbsp;`<schemeSettings>`

## Syntax

```xml
<schemeSettings>
</schemeSettings>
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

 None

### Child Elements

| **Element** | **Description** |
| --- | --- |
| [add](add-element-for-schemesettings-uri-settings.md) | Adds a scheme setting for a scheme name. |
| [clear](clear-element-for-schemesettings-uri-settings.md) | Clears all existing scheme settings. |
| [remove](remove-element-for-schemesettings-uri-settings.md) | Removes a scheme setting for a scheme name. |

### Parent Elements

| **Element** | **Description** |
| --- | --- |
| [uri](uri-element-uri-settings.md) | Contains settings that specify how the .NET Framework handles web addresses expressed using uniform resource identifiers (URIs). |

## Remarks

 By default, the [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) class un-escapes percent encoded path delimiters before executing path compression. This was implemented as a security mechanism against attacks like the following:

 `http://www.contoso.com/..%2F..%2F/Windows/System32/cmd.exe?/c+dir+c:\`

 If this URI gets passed down to modules not handling percent encoded characters correctly, it could result in the following command being executed by the server:

 `c:\Windows\System32\cmd.exe /c dir c:\`

 For this reason, [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) class first un-escapes path delimiters and then applies path compression. The result of passing the malicious URL above to [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) class constructor results in the following URI:

 `http://www.contoso.com/Windows/System32/cmd.exe?/c+dir+c:\`

 This default behavior can be modified to not un-escape percent encoded path delimiters using the schemeSettings configuration option for a specific scheme.

## Configuration Files

 This element can be used in the application configuration file or the machine configuration file (Machine.config).

## Example

 The following example shows a configuration used by the [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) class to support not escaping percent-encoded path delimiters for the http scheme.

```xml
<configuration>
  <uri>
    <schemeSettings>
      <add name="http" genericUriParserOptions="DontUnescapePathDotsAndSlashes"/>
    </schemeSettings>
  </uri>
</configuration>
```

## Element Information

**Namespace**: System

## See also

- [System.Configuration.SchemeSettingElement](https://learn.microsoft.com/search/?terms=System.Configuration.SchemeSettingElement)
- [System.Configuration.SchemeSettingElementCollection](https://learn.microsoft.com/search/?terms=System.Configuration.SchemeSettingElementCollection)
- [System.Configuration.UriSection](https://learn.microsoft.com/search/?terms=System.Configuration.UriSection)
- [System.Configuration.UriSection.SchemeSettings*](https://learn.microsoft.com/search/?terms=System.Configuration.UriSection.SchemeSettings*)
- [System.GenericUriParserOptions](https://learn.microsoft.com/search/?terms=System.GenericUriParserOptions)
- [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri)
- [Network Settings Schema](index.md)
