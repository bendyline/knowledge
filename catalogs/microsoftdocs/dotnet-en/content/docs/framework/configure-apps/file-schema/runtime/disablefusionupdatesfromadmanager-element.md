---
description: "Learn more about: <disableFusionUpdatesFromADManager> Element"
title: "<disableFusionUpdatesFromADManager> Element"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "disableFusionUpdatesFromADManager element"
  - "<disableFusionUpdatesFromADManager> element"
ms.assetid: 58d2866c-37bd-4ffa-abaf-ff35926a2939
---
# `<disableFusionUpdatesFromADManager>` Element

Specifies whether the default behavior, which is to allow the runtime host to override configuration settings for an application domain, is disabled.

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<runtime>`](runtime-element.md)\
&nbsp;&nbsp;&nbsp;&nbsp;`<disableFusionUpdatesFromADManager>`

## Syntax

```xml
<disableFusionUpdatesFromADManager enabled="0|1"/>
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

| Attribute | Description |
| --- | --- |
| enabled | Required attribute.<br /><br /> Specifies whether the default ability to override Fusion settings is disabled. |

## enabled Attribute

| Value | Description |
| --- | --- |
| 0 | Do not disable the ability to override Fusion settings. This is the default behavior, starting with the .NET Framework 4. |
| 1 | Disable the ability to override Fusion settings. This reverts to the behavior of earlier versions of the .NET Framework. |

### Child Elements

 None.

### Parent Elements

| Element | Description |
| --- | --- |
| `configuration` | The root element in every configuration file used by the common language runtime and .NET Framework applications. |
| `runtime` | Contains information about assembly binding and garbage collection. |

## Remarks

 Starting with the .NET Framework 4, the default behavior is to allow the [System.AppDomainManager](https://learn.microsoft.com/search/?terms=System.AppDomainManager) object to override configuration settings by using the [System.AppDomainSetup.ConfigurationFile](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ConfigurationFile) property or the [System.AppDomainSetup.SetConfigurationBytes*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.SetConfigurationBytes*) method of the [System.AppDomainSetup](https://learn.microsoft.com/search/?terms=System.AppDomainSetup) object that is passed to your implementation of the [System.AppDomainManager.InitializeNewDomain*](https://learn.microsoft.com/search/?terms=System.AppDomainManager.InitializeNewDomain*) method, in your subclass of [System.AppDomainManager](https://learn.microsoft.com/search/?terms=System.AppDomainManager). For the default application domain, the settings you change override the settings that were specified by the application configuration file. For other application domains, they override the configuration settings that were passed to the [System.AppDomainManager.CreateDomain*](https://learn.microsoft.com/search/?terms=System.AppDomainManager.CreateDomain*) or [System.AppDomain.CreateDomain*](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateDomain*) method.

 You can either pass new configuration information, or pass null (`Nothing` in Visual Basic) to eliminate configuration information that was passed in.

 Do not pass configuration information to both the [System.AppDomainSetup.ConfigurationFile](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ConfigurationFile) property and the [System.AppDomainSetup.SetConfigurationBytes*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.SetConfigurationBytes*) method. If you pass configuration information to both, the information you pass to the [System.AppDomainSetup.ConfigurationFile](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ConfigurationFile) property is ignored, because the [System.AppDomainSetup.SetConfigurationBytes*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.SetConfigurationBytes*) method overrides configuration information from the application configuration file. If you use the [System.AppDomainSetup.ConfigurationFile](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ConfigurationFile) property, you can pass null (`Nothing` in Visual Basic) to the [System.AppDomainSetup.SetConfigurationBytes*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.SetConfigurationBytes*) method to eliminate any configuration bytes that were specified in the call to the [System.AppDomainManager.CreateDomain*](https://learn.microsoft.com/search/?terms=System.AppDomainManager.CreateDomain*) or [System.AppDomain.CreateDomain*](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateDomain*) method.

 In addition to configuration information, you can change the following settings on the [System.AppDomainSetup](https://learn.microsoft.com/search/?terms=System.AppDomainSetup) object that is passed to your implementation of the [System.AppDomainManager.InitializeNewDomain*](https://learn.microsoft.com/search/?terms=System.AppDomainManager.InitializeNewDomain*) method: [System.AppDomainSetup.ApplicationBase*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ApplicationBase*), [System.AppDomainSetup.ApplicationName*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ApplicationName*), [System.AppDomainSetup.CachePath*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.CachePath*), [System.AppDomainSetup.DisallowApplicationBaseProbing*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.DisallowApplicationBaseProbing*), [System.AppDomainSetup.DisallowBindingRedirects*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.DisallowBindingRedirects*), [System.AppDomainSetup.DisallowCodeDownload*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.DisallowCodeDownload*), [System.AppDomainSetup.DisallowPublisherPolicy*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.DisallowPublisherPolicy*), [System.AppDomainSetup.DynamicBase*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.DynamicBase*), [System.AppDomainSetup.LoaderOptimization](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.LoaderOptimization), [System.AppDomainSetup.PrivateBinPath*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.PrivateBinPath*), [System.AppDomainSetup.PrivateBinPathProbe*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.PrivateBinPathProbe*), [System.AppDomainSetup.ShadowCopyDirectories*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ShadowCopyDirectories*), and [System.AppDomainSetup.ShadowCopyFiles*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ShadowCopyFiles*).

 As an alternative to using the `<disableFusionUpdatesFromADManager>` element, you can disable the default behavior by creating a registry setting or by setting an environment variable. In the registry, create a DWORD value named `COMPLUS_disableFusionUpdatesFromADManager` under `HKCU\Software\Microsoft\.NETFramework` or `HKLM\Software\Microsoft\.NETFramework`, and set the value to 1. At the command line, set the environment variable `COMPLUS_disableFusionUpdatesFromADManager` to 1.

## Example

 The following example shows how to disable the ability to override Fusion settings by using the `<disableFusionUpdatesFromADManager>` element.

```xml
<configuration>
   <runtime>
      <disableFusionUpdatesFromADManager enabled="1" />
   </runtime>
</configuration>
```

## See also

- [Configure apps by using configuration files](../../index.md)
- [Runtime Settings Schema](index.md)
- [Configuration File Schema](../index.md)
- [How the Runtime Locates Assemblies](../../../deployment/how-the-runtime-locates-assemblies.md)
