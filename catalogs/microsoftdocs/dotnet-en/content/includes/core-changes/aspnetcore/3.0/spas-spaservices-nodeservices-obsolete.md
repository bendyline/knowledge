### SPAs: SpaServices and NodeServices marked obsolete

The contents of the following NuGet packages have all been unnecessary since ASP.NET Core 2.1. Consequently, the following packages are being marked as obsolete:

- [Microsoft.AspNetCore.SpaServices](https://www.nuget.org/packages/Microsoft.AspNetCore.SpaServices/)
- [Microsoft.AspNetCore.NodeServices](https://www.nuget.org/packages/Microsoft.AspNetCore.NodeServices/)

For the same reason, the following npm modules are being marked as deprecated:

- [aspnet-angular](https://www.npmjs.com/package/aspnet-angular)
- [aspnet-prerendering](https://www.npmjs.com/package/aspnet-prerendering)
- [aspnet-webpack](https://www.npmjs.com/package/aspnet-webpack)
- [aspnet-webpack-react](https://www.npmjs.com/package/aspnet-webpack-react)
- [domain-task](https://www.npmjs.com/package/domain-task)

The preceding packages and npm modules will later be removed in .NET 5.

#### Version introduced

3.0

#### Old behavior

The deprecated packages and npm modules were intended to integrate ASP.NET Core with various Single-Page App (SPA) frameworks. Such frameworks include Angular, React, and React with Redux.

#### New behavior

A new integration mechanism exists in the [Microsoft.AspNetCore.SpaServices.Extensions](https://www.nuget.org/packages/Microsoft.AspNetCore.SpaServices.Extensions/) NuGet package. The package remains the basis of the Angular and React project templates since ASP.NET Core 2.1.

#### Reason for change

ASP.NET Core supports integration with various Single-Page App (SPA) frameworks, including Angular, React, and React with Redux. Initially, integration with these frameworks was accomplished with ASP.NET Core-specific components that handled scenarios like server-side prerendering and integration with Webpack. As time went on, industry standards changed. Each of the SPA frameworks released their own standard command-line interfaces. For example, Angular CLI and create-react-app.

When ASP.NET Core 2.1 was released in May 2018, the team responded to the change in standards. A newer and simpler way to integrate with the SPA frameworks' own toolchains was provided. The new integration mechanism exists in the package `Microsoft.AspNetCore.SpaServices.Extensions` and remains the basis of the Angular and React project templates since ASP.NET Core 2.1.

To clarify that the older ASP.NET Core-specific components are irrelevant and not recommended:

- The pre-2.1 integration mechanism is marked as obsolete.
- The supporting npm packages are marked as deprecated.

#### Recommended action

If you're using these packages, update your apps to use the functionality:

- In the `Microsoft.AspNetCore.SpaServices.Extensions` package.
- Provided by the SPA frameworks you're using

To enable features like server-side prerendering and hot module reload, see the documentation for the corresponding SPA framework. The functionality in `Microsoft.AspNetCore.SpaServices.Extensions` is *not* obsolete and will continue to be supported.

#### Category

ASP.NET Core

#### Affected APIs

- [Microsoft.AspNetCore.Builder.SpaRouteExtensions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.SpaRouteExtensions)
- [Microsoft.AspNetCore.Builder.WebpackDevMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebpackDevMiddleware)

- [Microsoft.AspNetCore.NodeServices.EmbeddedResourceReader](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.NodeServices.EmbeddedResourceReader)
- [Microsoft.AspNetCore.NodeServices.INodeServices](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.NodeServices.INodeServices)
- [Microsoft.AspNetCore.NodeServices.NodeServicesFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.NodeServices.NodeServicesFactory)
- [Microsoft.AspNetCore.NodeServices.NodeServicesOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.NodeServices.NodeServicesOptions)
- [Microsoft.AspNetCore.NodeServices.StringAsTempFile](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.NodeServices.StringAsTempFile)
- [Microsoft.AspNetCore.NodeServices.HostingModels.INodeInstance](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.NodeServices.HostingModels.INodeInstance)
- [Microsoft.AspNetCore.NodeServices.HostingModels.NodeInvocationException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.NodeServices.HostingModels.NodeInvocationException)
- [Microsoft.AspNetCore.NodeServices.HostingModels.NodeInvocationInfo](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.NodeServices.HostingModels.NodeInvocationInfo)
- [Microsoft.AspNetCore.NodeServices.HostingModels.NodeServicesOptionsExtensions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.NodeServices.HostingModels.NodeServicesOptionsExtensions)
- [Microsoft.AspNetCore.NodeServices.HostingModels.OutOfProcessNodeInstance](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.NodeServices.HostingModels.OutOfProcessNodeInstance)

- [Microsoft.AspNetCore.SpaServices.Prerendering.ISpaPrerenderer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SpaServices.Prerendering.ISpaPrerenderer)
- [Microsoft.AspNetCore.SpaServices.Prerendering.ISpaPrerendererBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SpaServices.Prerendering.ISpaPrerendererBuilder)
- [Microsoft.AspNetCore.SpaServices.Prerendering.JavaScriptModuleExport](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SpaServices.Prerendering.JavaScriptModuleExport)
- [Microsoft.AspNetCore.SpaServices.Prerendering.Prerenderer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SpaServices.Prerendering.Prerenderer)
- [Microsoft.AspNetCore.SpaServices.Prerendering.PrerenderTagHelper](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SpaServices.Prerendering.PrerenderTagHelper)
- [Microsoft.AspNetCore.SpaServices.Prerendering.RenderToStringResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SpaServices.Prerendering.RenderToStringResult)
- [Microsoft.AspNetCore.SpaServices.Webpack.WebpackDevMiddlewareOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SpaServices.Webpack.WebpackDevMiddlewareOptions)

- [Microsoft.Extensions.DependencyInjection.NodeServicesServiceCollectionExtensions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.NodeServicesServiceCollectionExtensions)
- [Microsoft.Extensions.DependencyInjection.PrerenderingServiceCollectionExtensions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PrerenderingServiceCollectionExtensions)

<!--

#### Affected APIs

- `T:Microsoft.AspNetCore.Builder.SpaRouteExtensions`
- `T:Microsoft.AspNetCore.Builder.WebpackDevMiddleware`

- `T:Microsoft.AspNetCore.NodeServices.EmbeddedResourceReader`
- `T:Microsoft.AspNetCore.NodeServices.INodeServices`
- `T:Microsoft.AspNetCore.NodeServices.NodeServicesFactory`
- `T:Microsoft.AspNetCore.NodeServices.NodeServicesOptions`
- `T:Microsoft.AspNetCore.NodeServices.StringAsTempFile`
- `T:Microsoft.AspNetCore.NodeServices.HostingModels.INodeInstance`
- `T:Microsoft.AspNetCore.NodeServices.HostingModels.NodeInvocationException`
- `T:Microsoft.AspNetCore.NodeServices.HostingModels.NodeInvocationInfo`
- `T:Microsoft.AspNetCore.NodeServices.HostingModels.NodeServicesOptionsExtensions`
- `T:Microsoft.AspNetCore.NodeServices.HostingModels.OutOfProcessNodeInstance`

- `T:Microsoft.AspNetCore.SpaServices.Prerendering.ISpaPrerenderer`
- `T:Microsoft.AspNetCore.SpaServices.Prerendering.ISpaPrerendererBuilder`
- `T:Microsoft.AspNetCore.SpaServices.Prerendering.JavaScriptModuleExport`
- `T:Microsoft.AspNetCore.SpaServices.Prerendering.Prerenderer`
- `T:Microsoft.AspNetCore.SpaServices.Prerendering.PrerenderTagHelper`
- `T:Microsoft.AspNetCore.SpaServices.Prerendering.RenderToStringResult`
- `T:Microsoft.AspNetCore.SpaServices.Webpack.WebpackDevMiddlewareOptions`

- `T:Microsoft.Extensions.DependencyInjection.NodeServicesServiceCollectionExtensions`
- `T:Microsoft.Extensions.DependencyInjection.PrerenderingServiceCollectionExtensions`

-->
