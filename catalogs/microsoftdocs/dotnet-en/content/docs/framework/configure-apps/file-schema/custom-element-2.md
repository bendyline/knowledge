---
description: "Learn more about: Custom element for NameValueSectionHandler and DictionarySectionHandler"
title: "Custom element for NameValueSectionHandler and DictionarySectionHandler"
ms.date: "05/01/2017"
f1_keywords:
  - "http://schemas.microsoft.com/.NetConfiguration/v2.0#configuration/sectionName"
helpviewer_keywords:
  - "custom element"
---
# Custom element for NameValueSectionHandler and DictionarySectionHandler

Defines settings for custom configuration sections that use the [System.Configuration.NameValueSectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.NameValueSectionHandler) and [System.Configuration.DictionarySectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.DictionarySectionHandler) classes.

[`<configuration>`](configuration-element.md)\
&nbsp;&nbsp;`<sectionName>`

## Attributes

None

## Parent element

| Parent element | Description |
| --- | --- |
| [`<configuration>`](configuration-element.md) | The root element in every configuration file used by the common language runtime and .NET Framework applications. |

## Child elements

| Child element | Description |
| --- | --- |
| [`<add>`](add-element-for-custom-2.md) for [System.Configuration.NameValueSectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.NameValueSectionHandler) and [System.Configuration.DictionarySectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.DictionarySectionHandler) | Adds custom application settings. |
| [`<remove>`](remove-element-for-custom-2.md) for [System.Configuration.NameValueSectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.NameValueSectionHandler) and [System.Configuration.DictionarySectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.DictionarySectionHandler) | Removes a previously defined setting. |
| [`<clear>`](clear-element-for-custom-2.md) for [System.Configuration.NameValueSectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.NameValueSectionHandler) and [System.Configuration.DictionarySectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.DictionarySectionHandler) | Clears all previously defined settings in a section. |

## Remarks

The `<sectionName>` element is a custom element defined by a `<section>` tag in the `<configSections>` element.

The following table shows the type of object the [System.Configuration.ConfigurationSettings.GetConfig(System.String)](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationSettings.GetConfig(System.String)) method returns for each configuration section handler:

| Configuration section handler | Return type |
| --- | --- |
| [System.Configuration.NameValueSectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.NameValueSectionHandler) | [System.Collections.Specialized.NameValueCollection](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.NameValueCollection) |
| [System.Configuration.DictionarySectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.DictionarySectionHandler) | [System.Collections.IDictionary](https://learn.microsoft.com/search/?terms=System.Collections.IDictionary) |

## Example

The following example shows how to declare sections that use the [System.Configuration.DictionarySectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.DictionarySectionHandler) and [System.Configuration.NameValueSectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.NameValueSectionHandler) classes.

The first custom element is `<dictionarySample>`, which contains settings read by the [System.Configuration.DictionarySectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.DictionarySectionHandler) class in the `System.dll` assembly. The second custom element is `<mySection>`, which contains settings read by the [System.Configuration.NameValueSectionHandler](https://learn.microsoft.com/search/?terms=System.Configuration.NameValueSectionHandler) class in the `System.dll` assembly.

```xml
<configuration>
  <configSections>
    <section name="dictionarySample" type="System.Configuration.DictionarySectionHandler,System" />
    <sectionGroup name="mySectionGroup">
      <section name="mySection" type="System.Configuration.NameValueSectionHandler,System" />
    </sectionGroup>
  </configSections>
  <dictionarySample>
    <add key="myKey" value="myValue" />
  </dictionarySample>
  <mySectionGroup>
    <mySection>
      <add key="key1" value="value1" />
    </mySection>
  </mySectionGroup>
</configuration>
```

## Configuration file

This element can be used in the application configuration file, the machine configuration file (*Machine.config*), and *Web.config* files that are not at the application directory level.

## See also

- [Configuration file schema for the .NET Framework](index.md)
