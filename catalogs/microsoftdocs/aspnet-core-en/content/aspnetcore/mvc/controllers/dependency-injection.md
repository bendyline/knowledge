---
title: Dependency injection into controllers in ASP.NET Core
ai-usage: ai-assisted
author: ardalis
description: Discover how ASP.NET Core MVC controllers request their dependencies explicitly via their constructors with dependency injection in ASP.NET Core.
ms.author: tdykstra
ms.date: 03/04/2026
uid: mvc/controllers/dependency-injection
---
# Dependency injection into controllers in ASP.NET Core

**Applies to: \>= aspnetcore-8.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT)

ASP.NET Core MVC controllers request dependencies explicitly via constructors. ASP.NET Core has built-in support for [dependency injection (DI)](../../fundamentals/dependency-injection.md). DI makes apps easier to test and maintain.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/controllers/dependency-injection/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Constructor injection

Services are added as a constructor parameter, and the runtime resolves the service from the service container. Services are typically defined using interfaces. For example, consider an app that requires the current time. The following interface exposes the `IDateTime` service:

[Code example (complete source file; reference: \~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Interfaces/IDateTime.cs?name=snippet)](../../../_code/aspnetcore/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Interfaces/IDateTime.cs.md)

The following code implements the `IDateTime` interface:

[Code example (complete source file; reference: \~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Services/SystemDateTime.cs?name=snippet)](../../../_code/aspnetcore/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Services/SystemDateTime.cs.md)

Add the service to the service container:

[Code example (complete source file; reference: \~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Startup1.cs?name=snippet\&highlight=3)](../../../_code/aspnetcore/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Startup1.cs.md)

For more information on [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*), see [DI service lifetimes](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes).

The following code displays a greeting to the user based on the time of day:

[Code example (complete source file; reference: \~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Controllers/HomeController.cs?name=snippet)](../../../_code/aspnetcore/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Controllers/HomeController.cs.md)

Run the app and a message is displayed based on the time.

## Action injection with `FromServices`

The [Microsoft.AspNetCore.Mvc.FromServicesAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromServicesAttribute) enables injecting a service directly into an action method without using constructor injection:

[Code example (complete source file; reference: \~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Controllers/HomeController.cs?name=snippet2)](../../../_code/aspnetcore/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Controllers/HomeController.cs.md)

## Action injection with `FromKeyedServices`

The following code shows how to access keyed services from the DI container by using the [`[FromKeyedServices]`](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute) attribute:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/KeyServiceController/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

## Access settings from a controller

Accessing app or configuration settings from within a controller is a common pattern. The *options pattern* described in [fundamentals/configuration/options](../../fundamentals/configuration/options.md) is the preferred approach to manage settings. Generally, don't directly inject [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration) into a controller.

Create a class that represents the options. For example:

[Code example (complete source file; reference: \~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Models/SampleWebSettings.cs?name=snippet)](../../../_code/aspnetcore/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Models/SampleWebSettings.cs.md)

Add the configuration class to the services collection:

[Code example (complete source file; reference: \~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Startup.cs?highlight=4\&name=snippet1)](../../../_code/aspnetcore/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Startup.cs.md)

Configure the app to read the settings from a JSON-formatted file:

[Code example (complete source file; reference: \~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Program.cs?name=snippet\&range=10-15)](../../../_code/aspnetcore/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Program.cs.md)

The following code requests the `IOptions<SampleWebSettings>` settings from the service container and uses them in the `Index` method:

[Code example (complete source file; reference: \~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Controllers/SettingsController.cs?name=snippet)](../../../_code/aspnetcore/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Controllers/SettingsController.cs.md)

## Controllers as services

By default, ASP.NET Core doesn't register controllers as services in the DI container. The runtime uses the [DefaultControllerActivator](https://source.dot.net/#Microsoft.AspNetCore.Mvc.Core/Controllers/DefaultControllerActivator.cs) to create controller instances and resolves services from the DI container for constructor parameters, but the controller itself isn't resolved from the container.

Calling `AddControllersAsServices` registers all controllers as services in the DI container:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews().AddControllersAsServices();
```

Registering controllers as services enables:

* Intercepting controller creation with a custom `IControllerActivator`.
* Using any DI lifetime management for controllers.
* Injecting services into controllers using any registered constructor, since the DI container selects the constructor.

> **Note:**
> Configure the `ApplicationPartManager` **before** calling `AddControllersAsServices`. See [mvc/extensibility/app-parts#prevent-loading-resources](https://learn.microsoft.com/search/?terms=mvc%2Fextensibility%2Fapp-parts%23prevent-loading-resources) for details.

## Additional resources

* See [mvc/controllers/testing](testing.md) to learn how to make code easier to test by explicitly requesting dependencies in controllers.
* [Keyed service dependency injection container support](https://andrewlock.net/exploring-the-dotnet-8-preview-keyed-services-dependency-injection-support/)
* [Replace the default dependency injection container with a third party implementation](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23default-service-container-replacement).




**Applies to: \>= aspnetcore-3.0 < aspnetcore-8.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT) and [Steve Smith](https://github.com/ardalis)

ASP.NET Core MVC controllers request dependencies explicitly via constructors. ASP.NET Core has built-in support for [dependency injection (DI)](../../fundamentals/dependency-injection.md). DI makes apps easier to test and maintain.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/controllers/dependency-injection/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Constructor injection

Services are added as a constructor parameter, and the runtime resolves the service from the service container. Services are typically defined using interfaces. For example, consider an app that requires the current time. The following interface exposes the `IDateTime` service:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Interfaces/IDateTime.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

The following code implements the `IDateTime` interface:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Services/SystemDateTime.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

Add the service to the service container:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Startup1.cs?name=snippet\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

For more information on [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*), see [DI service lifetimes](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes).

The following code displays a greeting to the user based on the time of day:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Controllers/HomeController.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

Run the app and a message is displayed based on the time.

## Action injection with `FromServices`

The [Microsoft.AspNetCore.Mvc.FromServicesAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromServicesAttribute) enables injecting a service directly into an action method without using constructor injection:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Controllers/HomeController.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

## Access settings from a controller

Accessing app or configuration settings from within a controller is a common pattern. The *options pattern* described in [fundamentals/configuration/options](../../fundamentals/configuration/options.md) is the preferred approach to manage settings. Generally, don't directly inject [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration) into a controller.

Create a class that represents the options. For example:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Models/SampleWebSettings.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

Add the configuration class to the services collection:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Startup.cs?highlight=4\\&name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

Configure the app to read the settings from a JSON-formatted file:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Program.cs?name=snippet\\&range=10-15](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

The following code requests the `IOptions<SampleWebSettings>` settings from the service container and uses them in the `Index` method:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/3.1sample/ControllerDI/Controllers/SettingsController.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

## Controllers as services

By default, ASP.NET Core doesn't register controllers as services in the DI container. The runtime uses the [DefaultControllerActivator](https://source.dot.net/#Microsoft.AspNetCore.Mvc.Core/Controllers/DefaultControllerActivator.cs) to create controller instances and resolves services from the DI container for constructor parameters, but the controller itself isn't resolved from the container.

Calling `AddControllersAsServices` registers all controllers as services in the DI container:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllersWithViews().AddControllersAsServices();
}
```

Registering controllers as services enables:

* Intercepting controller creation with a custom `IControllerActivator`.
* Using any DI lifetime management for controllers.
* Injecting services into controllers using any registered constructor, since the DI container selects the constructor.

> **Note:**
> Configure the `ApplicationPartManager` **before** calling `AddControllersAsServices`. See [mvc/extensibility/app-parts#prevent-loading-resources](https://learn.microsoft.com/search/?terms=mvc%2Fextensibility%2Fapp-parts%23prevent-loading-resources) for details.

## Additional resources

* See [mvc/controllers/testing](testing.md) to learn how to make code easier to test by explicitly requesting dependencies in controllers.

* [Replace the default dependency injection container with a third party implementation](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23default-service-container-replacement).



**Applies to: < aspnetcore-3.0**

ASP.NET Core MVC controllers request dependencies explicitly via constructors. ASP.NET Core has built-in support for [dependency injection (DI)](../../fundamentals/dependency-injection.md). DI makes apps easier to test and maintain.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/mvc/controllers/dependency-injection/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Constructor injection

Services are added as a constructor parameter, and the runtime resolves the service from the service container. Services are typically defined using interfaces. For example, consider an app that requires the current time. The following interface exposes the `IDateTime` service:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/sample/ControllerDI/Interfaces/IDateTime.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

The following code implements the `IDateTime` interface:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/sample/ControllerDI/Services/SystemDateTime.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

Add the service to the service container:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/sample/ControllerDI/Startup1.cs?name=snippet\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

For more information on [Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*), see [DI service lifetimes](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23service-lifetimes).

The following code displays a greeting to the user based on the time of day:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/sample/ControllerDI/Controllers/HomeController.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

Run the app and a message is displayed based on the time.

## Action injection with `FromServices`

The [Microsoft.AspNetCore.Mvc.FromServicesAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.FromServicesAttribute) enables injecting a service directly into an action method without using constructor injection:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/sample/ControllerDI/Controllers/HomeController.cs?name=snippet2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

## Access settings from a controller

Accessing app or configuration settings from within a controller is a common pattern. The *options pattern* described in [fundamentals/configuration/options](../../fundamentals/configuration/options.md) is the preferred approach to manage settings. Generally, don't directly inject [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration) into a controller.

Create a class that represents the options. For example:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/sample/ControllerDI/Models/SampleWebSettings.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

Add the configuration class to the services collection:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/sample/ControllerDI/Startup.cs?highlight=4\\&name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

Configure the app to read the settings from a JSON-formatted file:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/sample/ControllerDI/Program.cs?name=snippet\\&range=10-15](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

The following code requests the `IOptions<SampleWebSettings>` settings from the service container and uses them in the `Index` method:

[Code reference unavailable in this source snapshot: includes/~/mvc/controllers/dependency-injection/sample/ControllerDI/Controllers/SettingsController.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/mvc/controllers/dependency-injection.md)

## Controllers as services

By default, ASP.NET Core doesn't register controllers as services in the DI container. The runtime uses the [DefaultControllerActivator](https://source.dot.net/#Microsoft.AspNetCore.Mvc.Core/Controllers/DefaultControllerActivator.cs) to create controller instances and resolves services from the DI container for constructor parameters, but the controller itself isn't resolved from the container.

Calling `AddControllersAsServices` registers all controllers as services in the DI container:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc().AddControllersAsServices();
}
```

Registering controllers as services enables:

* Intercepting controller creation with a custom `IControllerActivator`.
* Using any DI lifetime management for controllers.
* Injecting services into controllers using any registered constructor, since the DI container selects the constructor.

> **Note:**
> Configure the `ApplicationPartManager` **before** calling `AddControllersAsServices`. See [mvc/extensibility/app-parts#prevent-loading-resources](https://learn.microsoft.com/search/?terms=mvc%2Fextensibility%2Fapp-parts%23prevent-loading-resources) for details.

## Additional resources

* See [mvc/controllers/testing](testing.md) to learn how to make code easier to test by explicitly requesting dependencies in controllers.

* [Replace the default dependency injection container with a third party implementation](https://learn.microsoft.com/search/?terms=fundamentals%2Fdependency-injection%23default-service-container-replacement).
