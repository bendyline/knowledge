---
title: Configure ASP.NET Core apps
description: Learn how to configure an ASP.NET Core app in native Windows instances or in a prebuilt Linux container in Azure App Service. 
ms.devlang: csharp
ms.topic: how-to
ms.date: 07/07/2025
zone_pivot_groups: app-service-platform-windows-linux
author: cephalin
ms.author: cephalin
#customer intent: As an app designer, I want to learn how to configure my ASP.NET Core app to use Azure App Service.
ms.service: azure-app-service
ms.custom:
  - devx-track-csharp
  - devx-track-azurecli
  - devx-track-dotnet
  - linux-related-content
  - sfi-ropc-nochange
---

# Configure an ASP.NET Core app for Azure App Service

> **Note:**
> For ASP.NET in .NET Framework, see [Configure an ASP.NET app for Azure App Service](configure-language-dotnet-framework.md). If your ASP.NET Core app runs in a custom Windows or Linux container, see [Configure a custom container for Azure App Service](configure-custom-container.md).

ASP.NET Core apps must be deployed to Azure App Service as compiled binaries. The Visual Studio publishing tool builds the solution and then deploys the compiled binaries directly. The App Service deployment engine deploys the code repository first and then compiles the binaries.

This guide provides key concepts and instructions for ASP.NET Core developers. If this article is your first time using Azure App Service, first follow [Deploy an ASP.NET web app](quickstart-dotnetcore.md) and [Deploy an ASP.NET Core and Azure SQL Database app to Azure App Service](tutorial-dotnetcore-sqldb-app.md).

**Applies to: platform-windows**


## Show supported .NET Core runtime versions

In App Service, the Windows instances already have all the supported .NET Core versions installed. To see the .NET Core runtime and SDK versions that are available to you, go to your Kudu site.

Go to your app in the Azure portal and then select **Development Tools** > **Advanced Tools**. Select **Go**. In Kudu, select **Debug console** for **CMD** or **PowerShell**.

Run the following command in the browser-based console:

```azurecli-interactive
dotnet --info
```



**Applies to: platform-linux**


## Show .NET Core version

To show the current .NET Core version, run the following command in [Azure Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp config show --resource-group <resource-group-name> --name <app-name> --query linuxFxVersion
```

To show all supported .NET Core versions, run the following command in [Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp list-runtimes --os linux | grep DOTNET
```



## Set .NET Core version

**Applies to: platform-windows**


Set the target framework in the project file for your ASP.NET Core project. For more information, see [Select the .NET Core version to use](https://learn.microsoft.com/dotnet/core/versions/selection).



**Applies to: platform-linux**


To set the .NET Core version to 8.0, run the following command in [Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp config set --name <app-name> --resource-group <resource-group-name> --linux-fx-version "DOTNETCORE|8.0"
```




## What happens to outdated runtimes in App Service?

Outdated runtimes are deprecated by the maintaining organization or have significant vulnerabilities. Accordingly, they're removed from the create and configure pages in the portal. When an outdated runtime is hidden from the portal, any app that's still using that runtime continues to run. 

If you want to create an app with an outdated runtime version that's no longer shown on the portal, use the Azure CLI, an ARM template, or Bicep. These deployment alternatives let you create deprecated runtimes that are removed from the portal but are still being supported.

If a runtime is fully removed from the App Service platform, your Azure subscription owner receives an email notice before the removal.


**Applies to: platform-linux**


## Customize build automation

If you deploy your app by using Git or ZIP packages [with build automation enabled](deploy-zip.md#enable-build-automation-for-zip-deploy), the App Service build automation follows this sequence:

1. Run custom script if specified by `PRE_BUILD_SCRIPT_PATH`.
1. To restore NuGet dependencies, run `dotnet restore`.
1. To build a binary for production, run `dotnet publish`.
1. Run custom script if specified by `POST_BUILD_SCRIPT_PATH`.

`PRE_BUILD_COMMAND` and `POST_BUILD_COMMAND` are environment variables that are empty by default. To run prebuild commands, define `PRE_BUILD_COMMAND`. To run post-build commands, define `POST_BUILD_COMMAND`.

The following example specifies the two variables to a series of commands, separated by commas.

```azurecli-interactive
az webapp config appsettings set --name <app-name> --resource-group <resource-group-name> --settings PRE_BUILD_COMMAND="echo foo, scripts/prebuild.sh"
az webapp config appsettings set --name <app-name> --resource-group <resource-group-name> --settings POST_BUILD_COMMAND="echo foo, scripts/postbuild.sh"
```

For other environment variables that you can use to customize build automation, see [Oryx configuration](https://github.com/microsoft/Oryx/blob/master/doc/configuration.md).

For more information on how App Service runs and builds ASP.NET Core apps in Linux, see [Oryx documentation: How .NET Core apps are detected and built](https://github.com/microsoft/Oryx/blob/master/doc/runtimes/dotnetcore.md).



## Access environment variables

In App Service, you can [set app settings](configure-common.md#configure-app-settings) outside your app code. You can then access them in any class by using the standard ASP.NET Core dependency injection pattern:

```csharp
using Microsoft.Extensions.Configuration;

namespace SomeNamespace 
{
    public class SomeClass
    {
        private IConfiguration _configuration;
    
        public SomeClass(IConfiguration configuration)
        {
            _configuration = configuration;
        }
    
        public SomeMethod()
        {
            // retrieve nested App Service app setting
            var myHierarchicalConfig = _configuration["My:Hierarchical:Config:Data"];
            // retrieve App Service connection string
            var myConnString = _configuration.GetConnectionString("MyDbConnection");
        }
    }
}
```

If you configure an app setting with the same name in App Service and in `appsettings.json`, the App Service value takes precedence over the `appsettings.json` value. By using the local `appsettings.json` value, you can debug the app locally. By using the App Service value, you can run the app in production with production settings. Connection strings work the same way. By using this method, you can keep your application secrets outside your code repository and access the appropriate values without changing your code.

> **Note:**
> You can also consider more secure connectivity options that don't require connection secrets. For more information, see [Secure connectivity to Azure services and databases from Azure App Service](tutorial-connect-overview.md).

**Applies to: platform-linux**


The [hierarchical configuration data](https://learn.microsoft.com/aspnet/core/fundamentals/configuration/#hierarchical-configuration-data) in `appsettings.json` is accessed by using the `__` (double underscore) delimiter that's standard on Linux to .NET Core. To override a specific hierarchical configuration setting in App Service, set the app setting name with the same delimited format in the key. You can run the following example in [Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp config appsettings set --name <app-name> --resource-group <resource-group-name> --settings My__Hierarchical__Config__Data="some value"
```



**Applies to: platform-windows**


The [hierarchical configuration data](https://learn.microsoft.com/aspnet/core/fundamentals/configuration/#hierarchical-configuration-data) in `appsettings.json` is accessed by using the `:` delimiter that's standard to .NET Core. To override a specific hierarchical configuration setting in App Service, set the app setting name with the same delimited format in the key. You can run the following example in [Azure Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp config appsettings set --name <app-name> --resource-group <resource-group-name> --settings My:Hierarchical:Config:Data="some value"
```


## Deploy multi-project solutions

When a Visual Studio solution includes multiple projects, the Visual Studio publish process selects the project to deploy. When you deploy to the App Service deployment engine, such as with Git, or with ZIP deploy [with build automation enabled](deploy-zip.md#enable-build-automation-for-zip-deploy), the App Service deployment engine picks the first website or web application project that it finds as the App Service app. You can specify which project App Service should use by specifying the `PROJECT` app setting. For example, run the following command in [Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp config appsettings set --resource-group <resource-group-name> --name <app-name> --settings PROJECT="<project-name>/<project-name>.csproj"
```

## Access diagnostic logs

ASP.NET Core offers a [built-in logging provider for App Service](https://learn.microsoft.com/aspnet/core/fundamentals/logging/#azure-app-service). In your project's `program.cs` file, add the provider to your application through the `ConfigureLogging` extension method, as shown in the following example:

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureLogging(logging =>
        {
            logging.AddAzureWebAppDiagnostics();
        })
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });
```

You can then configure and generate logs with the standard .NET Core pattern. See [Logging in .NET Core and ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/logging).


To access the console logs generated from inside your application code in App Service, turn on diagnostic logging by running the following command in [Cloud Shell](https://shell.azure.com):

```azurecli-interactive
az webapp log config --resource-group <resource-group-name> --name <app-name> --docker-container-logging filesystem --level Verbose
```

Possible values for `--level` are `Error`, `Warning`, `Info`, and `Verbose`. Each subsequent level includes the previous level. For example, `Error` includes only error messages. `Verbose` includes all messages.

After you turn on diagnostic logging, run the following command to see the log stream:

```azurecli-interactive
az webapp log tail --resource-group <resource-group-name> --name <app-name>
```

If console logs don't appear immediately, check again in 30 seconds.

To stop log streaming at any time, select **Ctrl**+**C**.


For more information on troubleshooting ASP.NET Core apps in App Service, see [Troubleshoot ASP.NET Core on Azure App Service and IIS](https://learn.microsoft.com/aspnet/core/test/troubleshoot-azure-iis).

## Access a detailed exceptions page

When your ASP.NET Core app generates an exception in the Visual Studio debugger, the browser displays a detailed exception page. In App Service, a generic "HTTP 500" or "An error occurred while processing your request" message replaces that page. To display the detailed exception page in App Service, add the `ASPNETCORE_ENVIRONMENT` app setting to your app by running the following command in <a target="_blank" href="https://shell.azure.com" >Cloud Shell</a>.

```azurecli-interactive
az webapp config appsettings set --name <app-name> --resource-group <resource-group-name> --settings ASPNETCORE_ENVIRONMENT="Development"
```

## Detect HTTPS session

In App Service, [TLS termination](https://wikipedia.org/wiki/TLS_termination_proxy) happens at the network load balancers. All HTTPS requests reach your app as unencrypted HTTP requests. If your app logic needs to know if user requests are encrypted, configure the Forwarded Headers Middleware in `Startup.cs`:

- Configure the middleware with [`ForwardedHeadersOptions`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.forwardedheadersoptions) to forward the `X-Forwarded-For` and `X-Forwarded-Proto` headers in `Startup.ConfigureServices`.
- Add private IP address ranges to the known networks, so that the middleware can trust the App Service load balancer.
- Invoke the [`UseForwardedHeaders`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.forwardedheadersextensions.useforwardedheaders) method in `Startup.Configure` before calling other middleware.

When you assemble the three elements, your code looks like the following example:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc();

    services.Configure<ForwardedHeadersOptions>(options =>
    {
        options.ForwardedHeaders =
            ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
        // These three subnets encapsulate the applicable Azure subnets. At the moment, it's not possible to narrow it down further.
        options.KnownNetworks.Add(new IPNetwork(IPAddress.Parse("::ffff:10.0.0.0"), 104));
        options.KnownNetworks.Add(new IPNetwork(IPAddress.Parse("::ffff:192.168.0.0"), 112));
        options.KnownNetworks.Add(new IPNetwork(IPAddress.Parse("::ffff:172.16.0.0"), 108));
    });
}

public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseForwardedHeaders();

    ...

    app.UseMvc();
}
```

For more information, see [Configure ASP.NET Core to work with proxy servers and load balancers](https://learn.microsoft.com/aspnet/core/host-and-deploy/proxy-load-balancer).

**Applies to: platform-linux**


## Rewrite or redirect URL

To rewrite or redirect a URL, use the [URL-rewriting middleware in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/url-rewriting).

## Open SSH session in browser



If you want to open a direct SSH session with your container, your app should be running.

Use the [az webapp ssh](https://learn.microsoft.com/cli/azure/webapp#az-webapp-ssh) command.

If you're not authenticated, you need to authenticate with your Azure subscription to connect. When you're authenticated, you see an in-browser shell where you can run commands inside your container.

SSH connection


> **Note:**
> Any changes that you make outside the `/home` directory are stored in the container itself and don't persist beyond an app restart.
>

To open a remote SSH session from your local machine, see [Open SSH session from remote shell](configure-linux-open-ssh-session.md#open-ssh-session-with-azure-cli).



## Ignore the robots933456 message in logs

You might see the following message in the container logs:

```
2019-04-08T14:07:56.641002476Z "-" - - [08/Apr/2019:14:07:56 +0000] "GET /robots933456.txt HTTP/1.1" 404 415 "-" "-"
```

You can safely ignore this message. `/robots933456.txt` is a dummy URL path. App Service uses it to check if the container is capable of serving requests. A "404" error response indicates that the path doesn't exist, and it signals to App Service that the container is healthy and ready to respond to requests.




## Related content

- [Tutorial: Deploy an ASP.NET Core and Azure SQL Database app](tutorial-dotnetcore-sqldb-app.md)

**Applies to: platform-linux**


- [Azure App Service on Linux FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/faq-app-service-linux.yml)



- [Environment variables and app settings reference](reference-app-settings.md)
