### Hosting: IHostingEnvironment and IApplicationLifetime types marked obsolete and replaced

New types have been introduced to replace existing `IHostingEnvironment` and `IApplicationLifetime` types.

#### Version introduced

3.0

#### Old behavior

There were two different `IHostingEnvironment` and `IApplicationLifetime` types from `Microsoft.Extensions.Hosting` and `Microsoft.AspNetCore.Hosting`.

#### New behavior

The old types have been marked as obsolete and replaced with new types.

#### Reason for change

When `Microsoft.Extensions.Hosting` was introduced in ASP.NET Core 2.1, some types like `IHostingEnvironment` and `IApplicationLifetime` were copied from `Microsoft.AspNetCore.Hosting`. Some ASP.NET Core 3.0 changes cause apps to include both the `Microsoft.Extensions.Hosting` and `Microsoft.AspNetCore.Hosting` namespaces. Any use of those duplicate types causes an "ambiguous reference" compiler error when both namespaces are referenced.

#### Recommended action

Replaced any usages of the old types with the newly introduced types as below:

**Obsolete types (warning):**

- [Microsoft.Extensions.Hosting.IHostingEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostingEnvironment)
- [Microsoft.AspNetCore.Hosting.IHostingEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IHostingEnvironment)
- [Microsoft.Extensions.Hosting.IApplicationLifetime](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IApplicationLifetime)
- [Microsoft.AspNetCore.Hosting.IApplicationLifetime](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IApplicationLifetime)
- [Microsoft.Extensions.Hosting.EnvironmentName](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.EnvironmentName)
- [Microsoft.AspNetCore.Hosting.EnvironmentName](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.EnvironmentName)

**New types:**

- [Microsoft.Extensions.Hosting.IHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment)
- `Microsoft.AspNetCore.Hosting.IWebHostEnvironment : IHostEnvironment`
- [Microsoft.Extensions.Hosting.IHostApplicationLifetime](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostApplicationLifetime)
- [Microsoft.Extensions.Hosting.Environments](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Environments)

The new `IHostEnvironment` `IsDevelopment` and `IsProduction` extension methods are in the `Microsoft.Extensions.Hosting` namespace. That namespace may need to be added to your project.

#### Category

ASP.NET Core

#### Affected APIs

- [Microsoft.AspNetCore.Hosting.EnvironmentName](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.EnvironmentName)
- [Microsoft.AspNetCore.Hosting.IApplicationLifetime](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IApplicationLifetime)
- [Microsoft.AspNetCore.Hosting.IHostingEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IHostingEnvironment)
- [Microsoft.Extensions.Hosting.EnvironmentName](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.EnvironmentName)
- [Microsoft.Extensions.Hosting.IApplicationLifetime](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IApplicationLifetime)
- [Microsoft.Extensions.Hosting.IHostingEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostingEnvironment)

<!-- 

#### Affected APIs

- `T:Microsoft.AspNetCore.Hosting.EnvironmentName`
- `T:Microsoft.AspNetCore.Hosting.IApplicationLifetime`
- `T:Microsoft.AspNetCore.Hosting.IHostingEnvironment`
- `T:Microsoft.Extensions.Hosting.EnvironmentName`
- `T:Microsoft.Extensions.Hosting.IApplicationLifetime`
- `T:Microsoft.Extensions.Hosting.IHostingEnvironment`

-->
