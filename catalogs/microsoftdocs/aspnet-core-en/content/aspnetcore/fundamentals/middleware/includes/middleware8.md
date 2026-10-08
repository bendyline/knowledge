**Applies to: \>= aspnetcore-8.0**

[WebApplication](../../minimal-apis/webapplication.md) automatically adds the following middleware in ASP.NET Core apps depending on certain conditions:

* [UseDeveloperExceptionPage](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.diagnostics.developerexceptionpagemiddleware) is added first when the [HostingEnvironment](../../environments.md) is `"Development"`.

* [UseRouting](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.endpointroutingapplicationbuilderextensions.userouting) is added second, if the user code didn't already call `UseRouting` and endpoints are configured, for example `app.MapGet`.

* [UseEndpoints](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.endpointroutingapplicationbuilderextensions.useendpoints) is added at the end of the middleware pipeline if endpoints are configured.

* [UseAuthentication](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.authappbuilderextensions.useauthentication) is added immediately after `UseRouting`, if user code didn't already call `UseAuthentication` and if [IAuthenticationSchemeProvider](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authentication.iauthenticationschemeprovider) can be detected in the service provider. `IAuthenticationSchemeProvider` is added by default when you use [AddAuthentication](https://learn.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.authenticationservicecollectionextensions.addauthentication), and services are detected by using [IServiceProviderIsService](https://learn.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.iserviceproviderisservice).

* [UseAuthorization](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.authorizationappbuilderextensions.useauthorization) is added next, if user code didn't already call `UseAuthorization` and if [IAuthorizationHandlerProvider](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authorization.iauthorizationhandlerprovider) can be detected in the service provider. `IAuthorizationHandlerProvider` is added by default when you use [AddAuthorization](https://learn.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.authenticationservicecollectionextensions.addauthentication), and services are detected by using `IServiceProviderIsService`.

* User configured middleware and endpoints are added between `UseRouting` and `UseEndpoints`.

The following code is effectively what the automatic middleware being added to the app produces:

```csharp
if (isDevelopment)
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

if (isAuthenticationConfigured)
{
    app.UseAuthentication();
}

if (isAuthorizationConfigured)
{
    app.UseAuthorization();
}

// User middleware/endpoints
app.CustomMiddleware(...);
app.MapGet("/", () => "hello world");
// End user middleware/endpoints

app.UseEndpoints(e => {});
```

In some cases, the default middleware configuration isn't correct for the app and requires modification. For example, [Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors%252A) should be called before [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) and [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A). The app needs to call `UseAuthentication` and `UseAuthorization` if `UseCors` is called:

```csharp
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
```

If middleware should run before route matching occurs, [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A) should be called and the middleware should be placed before the call to `UseRouting`. [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%252A) isn't required in this case because it's automatically added as described earlier:

```csharp
app.Use((context, next) =>
{
    return next(context);
});

app.UseRouting();

// Other middleware and endpoints
```

When adding a terminal middleware:

* The middleware must be added after `UseEndpoints`.

* The app needs to call `UseRouting` and `UseEndpoints` so the terminal middleware can be placed at the correct location.

```csharp
app.UseRouting();

app.MapGet("/", () => "hello world");

app.UseEndpoints(e => {});

app.Run(context =>
{
    context.Response.StatusCode = 404;
    return Task.CompletedTask;
});
```

Terminal middleware is middleware that runs if no endpoint handles the request.

For information on antiforgery middleware in Minimal APIs, see [security/anti-request-forgery#afwma](https://learn.microsoft.com/search/?terms=security%2Fanti-request-forgery%23afwma).
