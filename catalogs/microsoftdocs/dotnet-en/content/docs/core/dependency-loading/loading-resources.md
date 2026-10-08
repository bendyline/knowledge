---
title: Satellite assembly loading algorithm - .NET Core
description: Description of the details of the Satellite assembly loading algorithm in .NET Core
ms.date: 08/09/2019
author: sdmaclea
---
# Satellite assembly loading algorithm

Satellite assemblies are used to store localized resources customized for language and culture.

Satellite assemblies use a different loading algorithm than general managed assemblies.

## When are satellite assemblies loaded?

Satellite assemblies are loaded when loading a localized resource.

The basic API to load localized resources is the [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager) class. Ultimately the [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager) class will call the [System.Reflection.Assembly.GetSatelliteAssembly*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GetSatelliteAssembly*) method for each [System.Globalization.CultureInfo.Name](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.Name).

Higher-level APIs may abstract the low-level API.

## Algorithm

The .NET Core resource fallback process involves the following steps:

1. Determine the `active` [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext) instance. In all cases, the `active` instance is the executing assembly's [System.Runtime.Loader.AssemblyLoadContext](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext).

2. The `active` instance loads a satellite assembly for the requested culture in the following priority order:

    - Check its cache.

    - If `active` is the [System.Runtime.Loader.AssemblyLoadContext.Default](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Default) instance, run the [default satellite (resource) assembly probing](default-probing.md#satellite-resource-assembly-probing) logic.

    - Call the [System.Runtime.Loader.AssemblyLoadContext.Load*](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Load*) function.

    - If the managed assembly corresponding to the satellite assembly was loaded from a file, check the directory of the managed assembly for a subdirectory that matches the requested [System.Globalization.CultureInfo.Name](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.Name) (for example, `es-MX`).

        > **Note:**
        > On Linux and macOS, the subdirectory is case-sensitive and must either:
        >
        > - Exactly match case.
        > - Be in lower case.

    - Raise the [System.Runtime.Loader.AssemblyLoadContext.Resolving](https://learn.microsoft.com/search/?terms=System.Runtime.Loader.AssemblyLoadContext.Resolving) event.

    - Raise the [System.AppDomain.AssemblyResolve](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyResolve) event.

3. If a satellite assembly is loaded:
   - The [System.AppDomain.AssemblyLoad](https://learn.microsoft.com/search/?terms=System.AppDomain.AssemblyLoad) event is raised.
   - The assembly is searched for the requested resource. If the runtime finds the resource in the assembly, it uses it. If it doesn't find the resource, it continues the search.

    > **Note:**
    > To find a resource within the satellite assembly, the runtime searches for the resource file requested by the [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager) for the current [System.Globalization.CultureInfo.Name](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.Name). Within the resource file, it searches for the requested resource name. If either is not found, the resource is treated as not found.

4. The [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager) next searches the parent culture assemblies through many potential levels, each time repeating steps 2 & 3.

    Each culture has only one parent, which is defined by the [System.Globalization.CultureInfo.Parent](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.Parent) property.

    The search for parent cultures stops when a culture's [System.Globalization.CultureInfo.Parent](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.Parent) property is [System.Globalization.CultureInfo.InvariantCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture).

    For the [System.Globalization.CultureInfo.InvariantCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture), we don't return to steps 2 & 3, but rather continue with step 5.

5. If the resource is still not found, the [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager) uses the resource for the default (fallback) culture.

   Typically, the resources for the default culture are included in the main application assembly. However, you can specify [System.Resources.UltimateResourceFallbackLocation.Satellite](https://learn.microsoft.com/search/?terms=System.Resources.UltimateResourceFallbackLocation.Satellite) for the [System.Resources.NeutralResourcesLanguageAttribute.Location](https://learn.microsoft.com/search/?terms=System.Resources.NeutralResourcesLanguageAttribute.Location) property. This value indicates that the ultimate fallback location for resources is a satellite assembly rather than the main assembly.

    > **Note:**
    > The default culture is the ultimate fallback. Therefore, we recommend that you always include an exhaustive set of resources in the default resource file. This helps prevent exceptions from being thrown. By having an exhaustive set, you provide a fallback for all resources and ensure that at least one resource is always present for the user, even if it is not culturally specific.

6. Finally,
   - If the runtime doesn't find a resource file for a default (fallback) culture, a [System.Resources.MissingManifestResourceException](https://learn.microsoft.com/search/?terms=System.Resources.MissingManifestResourceException) or [System.Resources.MissingSatelliteAssemblyException](https://learn.microsoft.com/search/?terms=System.Resources.MissingSatelliteAssemblyException) exception is thrown.
   - If the resource file is found but the requested resource isn't present, the request returns `null`.
