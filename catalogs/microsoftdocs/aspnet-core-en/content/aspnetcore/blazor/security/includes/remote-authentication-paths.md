Remote authentication paths are customized using [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationApplicationPathsOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationApplicationPathsOptions) on the [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationOptions%601.AuthenticationPaths%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationOptions%25601.AuthenticationPaths%252A) property in the app's `Program` file. For the framework's default path values, see the [`dotnet/aspnetcore` reference source](https://github.com/dotnet/aspnetcore/blob/main/src/Components/WebAssembly/WebAssembly.Authentication/src/RemoteAuthenticationDefaults.cs).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list. For more information, see [How to select a version tag of ASP.NET Core source code (dotnet/AspNetCore.Docs #26205)](https://github.com/dotnet/AspNetCore.Docs/discussions/26205).


If an app [customizes a remote authentication path](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Fwebassembly%2Fadditional-scenarios%23customize-app-routes), take either of the following approaches:

* Match the path in hard-coded strings around the app.

* Inject [Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationOptions%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationOptions%25601) to obtain the configured value around the app. The following example demonstrates the approach for the [`RedirectToLogin` component](#redirecttologin-component).

  Add the following Razor directives to the top of the component's Razor file:

  ```razor
  @using Microsoft.Extensions.Options
  @inject IOptionsSnapshot<RemoteAuthenticationOptions<ApiAuthorizationProviderOptions>> RemoteOptions
  ```

  Modify the component's redirect in the `OnInitialized` method:

  ```diff
  - Navigation.NavigateToLogin("authentication/login");
  + Navigation.NavigateToLogin(RemoteOptions.Get(Options.DefaultName)
  +     .AuthenticationPaths.LogInPath);
  ```

  > **Note:**
  > If other paths differ from the project template's paths or [framework's default paths](https://github.com/dotnet/aspnetcore/blob/main/src/Components/WebAssembly/WebAssembly.Authentication/src/RemoteAuthenticationDefaults.cs), manage them in the same fashion.
