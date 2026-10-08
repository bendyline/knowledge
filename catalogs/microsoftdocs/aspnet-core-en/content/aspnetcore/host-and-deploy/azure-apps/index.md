---
title: Deploy ASP.NET Core apps to Azure App Service
author: wadepickett
description: This article contains links to Azure host and deploy resources.
monikerRange: '>= aspnetcore-2.1'
ms.author: wpickett
ms.date: 05/27/2025
uid: host-and-deploy/azure-apps/index
---
# Deploy ASP.NET Core apps to Azure App Service

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


[Azure App Service](https://azure.microsoft.com/services/app-service/) is a [Microsoft cloud computing platform service](https://azure.microsoft.com/) for hosting web apps, including ASP.NET Core.

## Enterprise web app patterns

For guidance on creating a reliable, secure, performant, testable, and scalable ASP.NET Core app, see [Enterprise web app patterns](https://learn.microsoft.com/azure/architecture/web-apps/guides/enterprise-app-patterns/overview). A complete production-quality sample web app that implements the patterns is available.


## Useful resources

[App Service Documentation](https://learn.microsoft.com/azure/app-service/) is the home for Azure Apps documentation, tutorials, samples, how-to guides, and other resources. Two notable tutorials that pertain to hosting ASP.NET Core apps are:

[Create an ASP.NET Core web app in Azure](https://learn.microsoft.com/azure/app-service/app-service-web-get-started-dotnet)  
Use Visual Studio to create and deploy an ASP.NET Core web app to Azure App Service on Windows.

[Create an ASP.NET Core app in App Service on Linux](https://learn.microsoft.com/azure/app-service/containers/quickstart-dotnetcore)  
Use the command line to create and deploy an ASP.NET Core web app to Azure App Service on Linux.

Subscribe to the [App Service Announcements](https://github.com/Azure/app-service-announcements/) repository and monitor the issues. The App Service team regularly posts announcements and scenarios arriving in App Service.

The following articles are available in ASP.NET Core documentation:

[tutorials/publish-to-azure-webapp-using-vs](../../tutorials/publish-to-azure-webapp-using-vs.md)  
Learn how to publish an ASP.NET Core app to Azure App Service using Visual Studio.

[Create your first pipeline](https://learn.microsoft.com/azure/devops/pipelines/get-started-yaml)  
Set up a CI build for an ASP.NET Core app, then create a continuous deployment release to Azure App Service.

[Azure Web App sandbox](https://github.com/projectkudu/kudu/wiki/Azure-Web-App-sandbox)  
Discover Azure App Service runtime execution limitations enforced by the Azure Apps platform.

[test/troubleshoot](../../test/troubleshoot.md)  
Understand and troubleshoot warnings and errors with ASP.NET Core projects.

## Application configuration

### Platform

The platform architecture (x86/x64) of an App Services app is set in the app's settings in the Azure portal for apps that are hosted on an A-series compute (Basic) or higher hosting tier. Confirm that the app's publish settings (for example, in the Visual Studio [publish profile (.pubxml)](../visual-studio-publish-profiles.md)) match the setting in the app's service configuration in the Azure portal.

**Applies to: \>= aspnetcore-2.2**

ASP.NET Core apps can be published [framework-dependent](https://learn.microsoft.com/dotnet/core/deploying/) because the runtimes for 64-bit (x64) and 32-bit (x86) apps are present on Azure App Service. The [.NET Core SDK](https://learn.microsoft.com/dotnet/core/sdk) available on App Service is 32-bit, but you can deploy 64-bit apps built locally using the [Kudu](https://github.com/projectkudu/kudu/wiki) console or the publish process in Visual Studio. For more information, see the [Publish and deploy the app](#publish-and-deploy-the-app) section.



**Applies to: < aspnetcore-2.2**

For apps with native dependencies, runtimes for 32-bit (x86) apps are present on Azure App Service. The [.NET Core SDK](https://learn.microsoft.com/dotnet/core/sdk) available on App Service is 32-bit.



For more information on .NET Core framework components and distribution methods, such as information on the .NET Core runtime and the .NET Core SDK, see [About .NET Core: Composition](https://learn.microsoft.com/dotnet/core/about#composition).

### Packages

Include the following NuGet packages to provide automatic logging features for apps deployed to Azure App Service:

* [Microsoft.AspNetCore.AzureAppServices.HostingStartup](https://www.nuget.org/packages/Microsoft.AspNetCore.AzureAppServices.HostingStartup/) uses [IHostingStartup](../../fundamentals/host/platform-specific-configuration.md) to provide ASP.NET Core logging integration with Azure App Service. The added logging features are provided by the `Microsoft.AspNetCore.AzureAppServicesIntegration` package.
* [Microsoft.AspNetCore.AzureAppServicesIntegration](https://www.nuget.org/packages/Microsoft.AspNetCore.AzureAppServicesIntegration/) executes [Microsoft.Extensions.Logging.AzureAppServicesLoggerFactoryExtensions.AddAzureWebAppDiagnostics%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.AzureAppServicesLoggerFactoryExtensions.AddAzureWebAppDiagnostics%252A) to add Azure App Service diagnostics logging providers in the `Microsoft.Extensions.Logging.AzureAppServices` package.
* [Microsoft.Extensions.Logging.AzureAppServices](https://www.nuget.org/packages/Microsoft.Extensions.Logging.AzureAppServices/) provides logger implementations to support Azure App Service diagnostics logs and log streaming features.

The preceding packages must be explicitly referenced in the app's project file.

## Override app configuration using the Azure portal

App settings in the Azure portal permit you to set environment variables for the app. For more information, see the following resources:

* [Configure an App Service app (Azure documentation)](https://learn.microsoft.com/azure/app-service/configure-common)
* [fundamentals/configuration/index#environment-variables-configuration-provider](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23environment-variables-configuration-provider)

## Proxy server and load balancer scenarios

The [IIS integration middleware](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23enable-the-iisintegration-components), which configures forwarded headers middleware when hosting [out-of-process](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fiis%2Findex%23out-of-process-hosting-model), and the ASP.NET Core Module are configured to forward the scheme (HTTP/HTTPS) and the remote IP address where the request originated. Additional configuration might be required for apps hosted behind additional proxy servers and load balancers. For more information, see [Configure ASP.NET Core to work with proxy servers and load balancers](../proxy-load-balancer.md).

## Monitoring and logging

**Applies to: \>= aspnetcore-3.0**

ASP.NET Core apps deployed to App Service automatically receive an App Service extension, **ASP.NET Core Logging Integration**. The extension enables logging integration for ASP.NET Core apps on Azure App Service.



**Applies to: < aspnetcore-3.0**

ASP.NET Core apps deployed to App Service automatically receive an App Service extension, **ASP.NET Core Logging Extensions**. The extension enables logging integration for ASP.NET Core apps on Azure App Service.



For monitoring, logging, and troubleshooting information, see the following articles:

[Monitor apps in Azure App Service](https://learn.microsoft.com/azure/app-service/web-sites-monitor)  
Learn how to review quotas and metrics for apps and App Service plans.

[Enable diagnostics logging for apps in Azure App Service](https://learn.microsoft.com/azure/app-service/web-sites-enable-diagnostic-log)  
Discover how to enable and access diagnostic logging for HTTP status codes, failed requests, and web server activity.

[fundamentals/error-handling](../../fundamentals/error-handling.md)  
Understand common approaches to handling errors in ASP.NET Core apps.

[test/troubleshoot-azure-iis](../../test/troubleshoot-azure-iis.md)  
Learn how to diagnose issues with Azure App Service deployments with ASP.NET Core apps.

[host-and-deploy/azure-iis-errors-reference](../azure-iis-errors-reference.md)  
See the common deployment configuration errors for apps hosted by Azure App Service/IIS with troubleshooting advice.

## Data Protection key ring and deployment slots

[ASP.NET Core Data Protection keys](https://learn.microsoft.com/search/?terms=security%2Fdata-protection%2Fimplementation%2Fkey-management%23data-protection-implementation-key-management) are persisted to the *%HOME%\ASP.NET\DataProtection-Keys* folder. This folder is backed by network storage and is synchronized across all machines hosting the app. Keys aren't protected at rest. This folder supplies the key ring to all instances of an app in a single deployment slot. Separate deployment slots, such as Staging and Production, don't share a key ring.

When swapping between deployment slots, any system using data protection won't be able to decrypt stored data using the key ring inside the previous slot. ASP.NET cookie middleware uses data protection to protect its cookies. This leads to users being signed out of an app that uses the standard ASP.NET cookie middleware. For a slot-independent key ring solution, use an external key ring provider, such as:

* Azure Blob Storage
* Azure Key Vault
* SQL store
* Redis cache

For more information, see [security/data-protection/implementation/key-storage-providers](../../security/data-protection/implementation/key-storage-providers.md).
<a name="deploy-aspnet-core-preview-release-to-azure-app-service"></a>

## Deploy an ASP.NET Core app that uses a .NET Core preview

To deploy an app that uses a preview release of .NET Core, see the following resources. These approaches are also used when the runtime is available but the SDK hasn't been installed on Azure App Service.

* [Specify the .NET Core SDK Version using Azure Pipelines](#specify-the-net-core-sdk-version-using-azure-pipelines)
* [Deploy a self-contained preview app](#deploy-a-self-contained-preview-app)
* [Use Docker with Web Apps for containers](#use-docker-with-web-apps-for-containers)
* [Install the preview site extension](#install-the-preview-site-extension)

See [Select the .NET Core version to use](https://learn.microsoft.com/dotnet/core/versions/selection) for information on selecting the version of the .NET SDK for self-contained deployments.

### Specify the .NET Core SDK Version using Azure Pipelines

Use [Azure App Service CI/CD scenarios](https://learn.microsoft.com/azure/app-service/deploy-continuous-deployment) to set up a continuous integration build with Azure DevOps. After the Azure DevOps build is created, optionally configure the build to use a specific SDK version. 

#### Specify the .NET Core SDK version

When using the App Service deployment center to create an Azure DevOps build, the default build pipeline includes steps for `Restore`, `Build`, `Test`, and `Publish`. To specify the SDK version, select the **Add (+)** button in the Agent job list to add a new step. Search for **.NET Core SDK** in the search bar. 

Add the .NET Core SDK step

Move the step into the first position in the build so that the steps following it use the specified version of the .NET Core SDK. Specify the version of the .NET Core SDK. In this example, the SDK is set to `3.0.100`.

Completed SDK step

To publish a [self-contained deployment (SCD)](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd), configure SCD in the `Publish` step and provide the [Runtime Identifier (RID)](https://learn.microsoft.com/dotnet/core/rid-catalog).

Self-contained publish

### Deploy a self-contained preview app

A [self-contained deployment (SCD)](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd) that targets a preview runtime carries the preview runtime in the deployment.

When deploying a self-contained app:

* The site in Azure App Service doesn't require the [preview site extension](#install-the-preview-site-extension).
* The app must be published following a different approach than when publishing for a [framework-dependent deployment (FDD)](https://learn.microsoft.com/dotnet/core/deploying#framework-dependent-deployments-fdd).

Follow the guidance in the [Deploy the app self-contained](#deploy-the-app-self-contained) section.

### Use Docker with Web Apps for containers

<!--
     Doc author note on the Docker Hub cross-link (@guardrex 1/11/24)

     The landing page at https://hub.docker.com/_/microsoft-dotnet
     is throwing 401/404/405 errors on load, which is triggering a 
     broken link warning on our doc builds. I've code fenced the link.
     I asked them about the errors, and they say that they can't
     fix them. https://github.com/dotnet/dotnet-docker/issues/5064
-->

The Docker Hub at `https://hub.docker.com/_/microsoft-dotnet` contains the latest preview Docker images. The images can be used as a base image. Use the image and deploy to Web Apps for Containers normally.

### Install the preview site extension

If a problem occurs using the preview site extension, open an [dotnet/AspNetCore issue](https://github.com/dotnet/AspNetCore/issues).

1. From the Azure portal, navigate to the App Service.
1. Select the web app.
1. Type "ex" in the search box to filter for "Extensions" or scroll down the list of management tools.
1. Select **Extensions**.
1. Select **Add**.
1. Select the **ASP.NET Core {X.Y} ({x64|x86}) Runtime** extension from the list, where `{X.Y}` is the ASP.NET Core preview version and `{x64|x86}` specifies the platform.
1. Select **OK** to accept the legal terms.
1. Select **OK** to install the extension.

When the operation completes, the latest .NET Core preview is installed. Verify the installation:

1. Select **Advanced Tools**.
1. Select **Go** in **Advanced Tools**.
1. Select the **Debug console** > **PowerShell** menu item.
1. At the PowerShell prompt, execute the following command. Substitute the ASP.NET Core runtime version for `{X.Y}` and the platform for `{PLATFORM}` in the command:

   ```powershell
   Test-Path D:\home\SiteExtensions\AspNetCoreRuntime.{X.Y}.{PLATFORM}\
   ```

   The command returns `True` when the x64 preview runtime is installed.

> **Note:**
> The platform architecture (x86/x64) of an App Services app is set in the app's settings in the Azure portal for apps that are hosted on an A-series compute (Basic) or higher hosting tier. Confirm that the app's publish settings (for example, in the Visual Studio [publish profile (.pubxml)](../visual-studio-publish-profiles.md)) match the setting in the app's service configuration in the Azure portal.
>
> If the app is run in in-process mode and the platform architecture is configured for 64-bit (x64), the ASP.NET Core Module uses the 64-bit preview runtime, if present. Install the **ASP.NET Core {X.Y} (x64) Runtime** extension using the Azure portal.
>
> After installing the x64 preview runtime, run the following command in the Azure Kudu PowerShell command window to verify the installation. Substitute the ASP.NET Core runtime version for `{X.Y}` in the following command:
>
> ```powershell
> Test-Path D:\home\SiteExtensions\AspNetCoreRuntime.{X.Y}.x64\
> ```
>
> The command returns `True` when the x64 preview runtime is installed.

**Use the preview site extension with an ARM template**

If an ARM template is used to create and deploy apps, the `Microsoft.Web/sites/siteextensions` resource type can be used to add the site extension to a web app. In the following example, the .NET 5 (x64) Runtime site extension (`AspNetCoreRuntime.5.0.x64`) is added to the app:

[Code example (complete source file; reference: index/sample/arm.json)](../../../_code/aspnetcore/host-and-deploy/azure-apps/index/sample/arm.json.md)

For the placeholder `{SITE NAME}`, use the app's name in Azure App Service (for example, `contoso`).

## Publish and deploy the app

**Applies to: \>= aspnetcore-2.2**

For a 64-bit deployment:

* Use a 64-bit .NET Core SDK to build a 64-bit app.
* Set the **Platform** to **64 Bit** in the App Service's **Configuration** > **General settings**. The app must use a Basic or higher service plan to enable the choice of platform bitness.



### Deploy the app framework-dependent

Apps published as framework-dependent are cross-platform and don't include the .NET runtime in the deployment. Azure App Service includes the .NET runtime.

# [Visual Studio](#tab/visual-studio)

1. Right-click the project in **Solution Explorer** and select **Publish**. Alternatively, select **Build** > **Publish {Application Name}** from the Visual Studio toolbar.
1. In the **Publish** dialog, select **Azure** > **Next**.
1. Select the Azure service.
1. Select **Advanced**. The **Publish** dialog opens.
1. Select a Resource group and Hosting plan, or create new ones.
1. Select **Finish**.
1. In the **Publish** page:
   * For **Configuration**, select the pen icon **Edit Configuration**:   
      * Confirm that the **Release** configuration is selected.
      * In the **Deployment Mode** drop-down list, select  **Framework-Dependent**.
      * In the **Target Runtime** drop-down list, select the desired runtime. The default is `win-x86`.
    * To remove additional files upon deployment, open **File Publish Options** and select the checkbox to remove additional files at the destination.
   * Select **Save**.
   * Select **Publish**.

# [.NET CLI](#tab/net-cli/)

1. In the project file, don't specify a [Runtime Identifier (RID)](https://learn.microsoft.com/dotnet/core/rid-catalog).

1. From a command shell, publish the app in Release configuration with the [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command. In the following example, the app is published as a framework-dependent app:

   ```console
   dotnet publish --configuration Release
   ```

1. Move the contents of the *bin/Release/{TARGET FRAMEWORK}/publish* directory to the site in App Service. If dragging the *publish* folder contents from your local hard drive or network share directly to App Service in the [Kudu](https://github.com/projectkudu/kudu/wiki) console, drag the files to the `D:\home\site\wwwroot` folder in the Kudu console.

---

### Deploy the app self-contained

Publishing an app as self-contained produces a platform-specific executable. The output publishing folder contains all components of the app, including the .NET libraries and target runtime. For more information, see [Publish self-contained]/dotnet/core/deploying/#publish-self-contained).
Use Visual Studio or the .NET CLI for a [self-contained deployment (SCD)](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd).

# [Visual Studio](#tab/visual-studio)

1. Right-click the project in **Solution Explorer** and select **Publish**. Alternatively, select **Build** > **Publish {Application Name}** from the Visual Studio toolbar.
1. In the **Publish** dialog, select **Azure** > **Next**.
1. Select the Azure service.
1. Select **Advanced**. The **Publish** dialog opens.
1. Select a Resource group and Hosting plan, or create new ones.
1. Select **Finish**.
1. In the **Publish** page:
   * For **Configuration**, select the pen icon **Edit Configuration**:   
      * Confirm that the **Release** configuration is selected.
      * In the **Deployment Mode** drop-down list, select **Self-Contained**.
      * In the **Target Runtime** drop-down list, select the desired runtime. The default is `win-x86`.
    * To remove additional files upon deployment, open **File Publish Options** and select the checkbox to remove additional files at the destination.
   * Select **Save**.
   * Select **Publish**.

# [.NET CLI](#tab/net-cli/)

1. In the project file, specify one or more [Runtime Identifiers (RIDs)](https://learn.microsoft.com/dotnet/core/rid-catalog). Use `<RuntimeIdentifier>` for a single RID, or use `<RuntimeIdentifiers>` to provide a semicolon-delimited list of multiple RIDs. In the following example, the `win-x86` RID is specified:

   ```xml
   <PropertyGroup>
     <TargetFramework>{TARGET FRAMEWORK}</TargetFramework>
     <RuntimeIdentifier>win-x86</RuntimeIdentifier>
   </PropertyGroup>
   ```

1. From a command shell, publish the app in Release configuration for the host's runtime with the [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command. In the following example, the app is published for the `win-x86` RID. The RID supplied to the `--runtime` option must be provided in the `<RuntimeIdentifier>` (or `<RuntimeIdentifiers>`) property in the project file.

   ```console
   dotnet publish --configuration Release --runtime win-x86 --self-contained
   ```

1. Move the contents of the *bin/Release/{TARGET FRAMEWORK}/{RUNTIME IDENTIFIER}/publish* directory to the site in App Service. If dragging the *publish* folder contents from your local hard drive or network share directly to App Service in the [Kudu console](https://github.com/projectkudu/kudu/wiki), drag the files to the `D:\home\site\wwwroot` folder in the Kudu console.

---

## Protocol settings (HTTPS)

Secure protocol bindings allow specifying a certificate to use when responding to requests over HTTPS. Binding requires a valid private certificate (*.pfx*) issued for the specific hostname. For more information, see [Tutorial: Bind an existing custom SSL certificate to Azure App Service](https://learn.microsoft.com/azure/app-service/app-service-web-tutorial-custom-ssl).

## Transform web.config

If you need to transform *web.config* on publish (for example, set environment variables based on the configuration, profile, or environment), see [host-and-deploy/iis/transform-webconfig](../iis/transform-webconfig.md).

## Additional resources

* [App Service overview](https://learn.microsoft.com/azure/app-service/app-service-web-overview)
* [Azure App Service diagnostics overview](https://learn.microsoft.com/azure/app-service/app-service-diagnostics)
* [host-and-deploy/web-farm](../web-farm.md)
* [Tutorial: Connect to SQL Database from .NET App Service without secrets using a managed identity](https://learn.microsoft.com/azure/app-service/tutorial-connect-msi-sql-database?tabs=efcore%2Cdotnetcore)

Azure App Service on Windows Server uses [Internet Information Services (IIS)](https://www.iis.net/). [Kestrel and YARP](https://devblogs.microsoft.com/dotnet/bringing-kestrel-and-yarp-to-azure-app-services/) on the front end provides the load balancer. The following topics pertain to the underlying IIS technology:
<!-- Kestrel can't replace IIS because it's needed for ASP.NET Framework ,FX 3.5 and 4.8 -->

* [host-and-deploy/iis/index](../iis/index.md)
* [host-and-deploy/aspnet-core-module](../aspnet-core-module.md)
* [host-and-deploy/iis/modules](../iis/modules.md)
* [Windows Server - IT administrator content for current and previous releases](https://learn.microsoft.com/windows-server/windows-server-versions)
