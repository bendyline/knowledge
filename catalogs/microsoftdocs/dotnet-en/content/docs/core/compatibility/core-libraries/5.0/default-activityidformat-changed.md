---
title: "Breaking change: Default ActivityIdFormat is W3C"
description: Learn about the .NET 5 breaking change in core .NET libraries where the default ActivityIdFormat is now W3C.
ms.date: 11/01/2020
---
# Default ActivityIdFormat is W3C

The default identifier format for activity ([System.Diagnostics.Activity.DefaultIdFormat](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.DefaultIdFormat)) is now [System.Diagnostics.ActivityIdFormat.W3C](https://learn.microsoft.com/search/?terms=System.Diagnostics.ActivityIdFormat.W3C).

## Change description

The W3C activity ID format was introduced in .NET Core 3.0 as an alternative to the hierarchical ID format. However, to preserve compatibility, the W3C format wasn't made the default until .NET 5. The default was changed in .NET 5 because the [W3C format has been ratified](https://www.w3.org/TR/trace-context/) and gained traction across multiple language implementations.

If your app targets a platform other than .NET 5 or later, it will experience the old behavior, where [System.Diagnostics.ActivityIdFormat.Hierarchical](https://learn.microsoft.com/search/?terms=System.Diagnostics.ActivityIdFormat.Hierarchical) is the default format. This default applies to platforms net45+, netstandard1.1+, and netcoreapp (1.x, 2.x, and 3.x). In .NET 5 and later, [System.Diagnostics.Activity.DefaultIdFormat](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.DefaultIdFormat) is set to [System.Diagnostics.ActivityIdFormat.W3C](https://learn.microsoft.com/search/?terms=System.Diagnostics.ActivityIdFormat.W3C).

## Version introduced

5.0

## Recommended action

If your application is agnostic to the identifier that's used for distributed tracing, no action is needed. Libraries such as ASP.NET Core and [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) can consume or propagate both versions of the [System.Diagnostics.ActivityIdFormat](https://learn.microsoft.com/search/?terms=System.Diagnostics.ActivityIdFormat).

If you require interoperability with existing systems, or current systems rely on the format of the identifier, you can preserve the old behavior by setting [System.Diagnostics.Activity.DefaultIdFormat](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.DefaultIdFormat) to [System.Diagnostics.ActivityIdFormat.Hierarchical](https://learn.microsoft.com/search/?terms=System.Diagnostics.ActivityIdFormat.Hierarchical). Alternatively, you can set an AppContext switch in one of three ways:

- In the project file.

  ```xml
  <ItemGroup>
    <RuntimeHostConfigurationOption Include="System.Diagnostics.DefaultActivityIdFormatIsHierarchial" Value="true" />
  </ItemGroup>
  ```

- In the *runtimeconfig.json* file.

  ```json
  {
      "runtimeOptions": {
          "configProperties": {
              "System.Diagnostics.DefaultActivityIdFormatIsHierarchial": true
          }
      }
  }
  ```

- Through an environment variable.

  Set `DOTNET_SYSTEM_DIAGNOSTICS_DEFAULTACTIVITYIDFORMATISHIERARCHIAL` to `true` or 1.

## Affected APIs

- [System.Diagnostics.Activity.DefaultIdFormat](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.DefaultIdFormat)

<!--

### Category

Core .NET libraries

### Affected APIs

- `P:System.Diagnostics.Activity.DefaultIdFormat`

-->
