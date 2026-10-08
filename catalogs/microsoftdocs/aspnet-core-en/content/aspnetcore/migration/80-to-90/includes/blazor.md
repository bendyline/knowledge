### Adopt simplified authentication state serialization for Blazor Web Apps

Blazor Web Apps can optionally adopt [simplified authentication state serialization](https://learn.microsoft.com/search/?terms=aspnetcore-9%23simplified-authentication-state-serialization-for-blazor-web-apps).

In the server project:

* Remove the Persisting Authentication State Provider (`PersistingAuthenticationStateProvider.cs`).

* Remove the service registration from the `Program` file. Instead, chain a call to [Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization%252A) on [Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents%252A):

  ```diff
  - builder.Services.AddScoped<AuthenticationStateProvider, PersistingAuthenticationStateProvider>();

    builder.Services.AddRazorComponents()
        .AddInteractiveServerComponents()
        .AddInteractiveWebAssemblyComponents()
  +     .AddAuthenticationStateSerialization();
  ```

The API only serializes the server-side name and role claims for access in the browser. To include all claims, set [Microsoft.AspNetCore.Components.WebAssembly.Server.AuthenticationStateSerializationOptions.SerializeAllClaims](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Server.AuthenticationStateSerializationOptions.SerializeAllClaims) to `true`:

```csharp
.AddAuthenticationStateSerialization(options => options.SerializeAllClaims = true);
```

In the client project (`.Client`):

* Remove the Persistent Authentication State Provider (`PersistentAuthenticationStateProvider.cs`).

* Remove the service registration from the `Program` file. Instead, call [Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization%252A) on the service collection:

  ```diff
  - builder.Services.AddSingleton<AuthenticationStateProvider, PersistentAuthenticationStateProvider>();
  + builder.Services.AddAuthenticationStateDeserialization();
  ```

For more information, see [aspnetcore-9#simplified-authentication-state-serialization-for-blazor-web-apps](https://learn.microsoft.com/search/?terms=aspnetcore-9%23simplified-authentication-state-serialization-for-blazor-web-apps).

### Streaming rendering attribute no longer requires the `true` parameter

In .NET 8, [streaming rendering](../../../blazor/components/rendering.md) required you to pass `true` for the `enabled` parameter:

```razor
@attribute [StreamRendering(true)]
```

In .NET 9 or later, `true` can optionally be removed, as `true` is now the default for the `enabled` parameter:

```razor
@attribute [StreamRendering]
```
