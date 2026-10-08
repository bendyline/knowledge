### Support for `IOpenApiDocumentProvider` in the DI container

ASP.NET Core in .NET 10 supports [Microsoft.AspNetCore.OpenApi.IOpenApiDocumentProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.OpenApi.IOpenApiDocumentProvider) in the dependency injection (DI) container. Inject the interface to access the OpenAPI document. This approach is useful for accessing OpenAPI documents outside the context of HTTP requests, such as in background services or custom middleware.

Previously, running app startup logic without launching an HTTP server could be accomplished using [`HostFactoryResolver`](https://github.com/dotnet/runtime/blob/main/src/libraries/Microsoft.Extensions.HostFactoryResolver/src/HostFactoryResolver.cs) with a no-op [Microsoft.AspNetCore.Hosting.Server.IServer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.Server.IServer) implementation. The new feature simplifies this process.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


For more information, see [Add IOpenApiDocumentProvider interface and implementation (`dotnet/aspnetcore` #61463)](https://github.com/dotnet/aspnetcore/pull/61463).
