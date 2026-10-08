---
title: Migrate from ASP.NET Web API to ASP.NET Core
author: ardalis
description: Learn how to migrate a web API implementation from ASP.NET 4.x Web API to ASP.NET Core MVC.
ms.author: wpickett
ms.date: 07/17/2025
uid: migration/fx-to-core/areas/webapi
---
# Migrate from ASP.NET Web API to ASP.NET Core

ASP.NET Core combines ASP.NET 4.x's MVC and Web API app models into a single programming model known as ASP.NET Core MVC.

**Applies to: \>= aspnetcore-6.0**
This article shows how to migrate the Products controller created in [Getting Started with ASP.NET Web API 2](https://learn.microsoft.com/aspnet/web-api/overview/getting-started-with-aspnet-web-api/tutorial-your-first-web-api) to ASP.NET Core.

## Prerequisites

# [Visual Studio](#tab/visual-studio)

* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/#download) with the **ASP.NET and web development** workload.
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)



# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


---

## Create the new ASP.NET Core Web API project

# [Visual Studio](#tab/visual-studio)

1. From the **File** menu, select **New** > **Project**.
1. Enter *Web API* in the search box.
1. Select the **ASP.NET Core Web API** template and select **Next**.
1. In the **Configure your new project** dialog, name the project *ProductsCore* and select **Next**.
1. In the **Additional information** dialog:
   1. Confirm the **Framework** is **.NET 6.0 (Long-term support)**.
   1. Confirm the checkbox for **Use controllers(uncheck to use Minimal APIs)** is checked.
   1. Uncheck **Enable OpenAPI support**.
   1. Select **Create**.

# [Visual Studio Code](#tab/visual-studio-code)

1. Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
1. Change directories (`cd`) to the folder that will contain the project folder.
1. Run the following commands to create a new web API project and open it in Visual Studio Code:

   ```dotnetcli
   dotnet new webapi -o ProductsCore --no-openapi
   cd ProductsCore
   code -r ../ProductsCore
   ```

---

## Remove the *WeatherForecast* template files

1. Remove the `WeatherForecast.cs` and `Controllers/WeatherForecastController.cs` example files from the new *ProductsCore* project.
1. Open *Properties\launchSettings.json*.
1. Change `launchUrl` properties from `weatherforcast` to `productscore`.

## The configuration for ASP.NET Core Web API

ASP.NET Core doesn't use the *App_Start* folder or the *Global.asax* file. The *web.config* file is added at publish time. For more information, see [host-and-deploy/iis/web-config](../../../host-and-deploy/iis/web-config.md).

The `Program.cs` file:

* Replaces *Global.asax*.
* Handles all app startup tasks.

For more information, see [fundamentals/startup](../../../fundamentals/startup.md).

The following shows the application startup code in the ASP.NET Core `Program.cs` file:

[Code example (complete source file; reference: webapi/sample/6.x/ProductsCore/Program.cs)](../../../../_code/aspnetcore/migration/fx-to-core/areas/webapi/sample/6.x/ProductsCore/Program.cs.md)

## Copy the *Product* model

# [Visual Studio](#tab/visual-studio)

1. In **Solution Explorer**, right-click the project. Select **Add** > **New Folder**. Name the folder *Models*.
1. Right-click the **Models** folder. Select **Add** > **Class**. Name the class *Product* and select **Add**.
1. Replace the template model code with the following:

# [Visual Studio Code](#tab/visual-studio-code)

1. Add a folder named *Models*.
1. Add a *Product* class to the *Models* folder with the following code:

---

   [Code example (complete source file; reference: webapi/sample/6.x/ProductsCore/Models/Product.cs?highlight=6,7)](../../../../_code/aspnetcore/migration/fx-to-core/areas/webapi/sample/6.x/ProductsCore/Models/Product.cs.md)

The preceding highlighted code changes the following:

* The `?` annotation has been added to declare the `Name` and `Category` properties as nullable reference types.

By utilizing the [Nullable feature introduced in C# 8](https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-8#nullable-reference-types), ASP.NET Core can provide additional code flow analysis and compile-time safety in the handling of reference types. For example, protecting against `null` reference exceptions.

In this case, the intent is that the `Name` and `Category` can be nullable types.

ASP.NET Core in .NET 6 projects enable nullable reference types by default. For more information, see [Nullable reference types](https://learn.microsoft.com/dotnet/csharp/nullable-references).

## Copy the *ProductsController*

# [Visual Studio](#tab/visual-studio)

1. Right-click the **Controllers** folder.
1. Select **Add > Controller...**.
1. In **Add New Scaffolded Item** dialog, select **Mvc Controller - Empty** then select **Add**.
1. Name the controller *ProductsController* and select **Add**.
1. Replace the template controller code with the following:

# [Visual Studio Code](#tab/visual-studio-code)

1. Add a *ProductsController* class to the *Controllers* folder with the following code:

---

   [Code example (complete source file; reference: webapi/sample/6.x/ProductsCore/Controllers/ProductsController.cs?highlight=1,2,4,6,7,8,26,32,33,40)](../../../../_code/aspnetcore/migration/fx-to-core/areas/webapi/sample/6.x/ProductsCore/Controllers/ProductsController.cs.md)

The preceding highlighted code changes the following, to migrate to ASP.NET Core:

* Removes using statements for the following ASP.NET 4.x components that don't exist in ASP.NET Core:

  * `ApiController` class
  * `System.Web.Http` namespace
  * `IHttpActionResult` interface

* Changes the `using ProductsApp.Models;` statement to `using ProductsCore.Models;`.
* Sets the root namespace to `ProductsCore`.
* Changes `ApiController` to [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase).
* Adds `using Microsoft.AspNetCore.Mvc;` to resolve the `ControllerBase` reference.
* Changes the `GetProduct` action's return type from `IHttpActionResult` to `ActionResult<Product>`. For more info, see [Controller action return types](https://learn.microsoft.com/aspnet/core/web-api/action-return-types).
* Simplifies the `GetProduct` action's `return` statement to the following statement:

    ```csharp
    return product;
    ```

* Adds the following attributes which are explained in the next sections:
  * `[Route("api/[controller]")]`
  * `[ApiController]`
  * `[HttpGet]`
  * `[HttpGet("{id}")]`

## Routing

ASP.NET Core provides a minimal hosting model in which the endpoint routing middleware wraps the entire middleware pipeline, therefore routes can be added directly to the [Microsoft.AspNetCore.Builder.WebApplication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication) without an explicit call to [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%252A) or [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A) to register routes.

`UseRouting` can still be used to specify where route matching happens, but `UseRouting` doesn't need to be explicitly called if routes should be matched at the beginning of the middleware pipeline.

[Code example (complete source file; reference: webapi/sample/6.x/ProductsCore/Program.cs?highlight=15)](../../../../_code/aspnetcore/migration/fx-to-core/areas/webapi/sample/6.x/ProductsCore/Program.cs.md)

**Note:** Routes added directly to the [Microsoft.AspNetCore.Builder.WebApplication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication) execute at the ***end*** of the pipeline.

## Routing in the migrated `ProductsController`

The migrated `ProductsController` contains the following highlighted attributes:

[Code example (complete source file; reference: webapi/sample/6.x/ProductsCore/Controllers/ProductsController.cs?highlight=6,7,26,32)](../../../../_code/aspnetcore/migration/fx-to-core/areas/webapi/sample/6.x/ProductsCore/Controllers/ProductsController.cs.md)

* The [`[Route]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RouteAttribute) attribute [configures the controller's attribute routing](../../../fundamentals/routing.md) pattern.
* The [`[ApiController]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute makes attribute routing a requirement for all actions in this controller.

* [Attribute routing supports tokens](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23token-replacement-in-route-templates-controller-action-area), such as `[controller]` and `[action]`. At runtime, each token is replaced with the name of the controller or action, respectively, to which the attribute has been applied. The tokens:

  * Reduces or eliminates the need to use hard coded strings for the route.
  * Ensure routes remain synchronized with the corresponding controllers and actions when automatic rename refactorings are applied.

* HTTP Get requests are enabled for `ProductController` actions with the following attributes:

  * [`[HttpGet]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpGetAttribute) attribute applied to the `GetAllProducts` action.
  * `[HttpGet("{id}")]` attribute applied to the `GetProduct` action.

Run the migrated project, and browse to `/api/products`.  For example: https://localhost:`<port>`/api/products. A full list of three products appears. Browse to `/api/products/1`. The first product appears.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/migration/) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Additional resources

* [web-api/index](../../../web-api/index.md)
* [web-api/action-return-types](../../../web-api/action-return-types.md)
* [mvc/compatibility-version](../../../mvc/compatibility-version.md)



**Applies to: < aspnetcore-6.0**
This article demonstrates the steps required to migrate from ASP.NET 4.x Web API to ASP.NET Core MVC.

## Prerequisites

* [Visual Studio 2019 16.4 or later](https://visualstudio.microsoft.com/downloads/?utm_medium=microsoft&utm_source=learn.microsoft.com&utm_campaign=inline+link&utm_content=download+vs2019) with the **ASP.NET and web development** workload
* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)



## Review ASP.NET 4.x Web API project

This article uses the *ProductsApp* project created in [Getting Started with ASP.NET Web API 2](https://learn.microsoft.com/aspnet/web-api/overview/getting-started-with-aspnet-web-api/tutorial-your-first-web-api). In that project, a basic ASP.NET 4.x Web API project is configured as follows.

In `Global.asax.cs`, a call is made to `WebApiConfig.Register`:

[Code example (complete source file; reference: webapi/sample/3.x/ProductsApp/Global.asax.cs?highlight=14)](../../../../_code/aspnetcore/migration/fx-to-core/areas/webapi/sample/3.x/ProductsApp/Global.asax.cs.md)

The `WebApiConfig` class is found in the *App_Start* folder and has a static `Register` method:

[Code example (complete source file; reference: webapi/sample/3.x/ProductsApp/App_Start/WebApiConfig.cs)](../../../../_code/aspnetcore/migration/fx-to-core/areas/webapi/sample/3.x/ProductsApp/App_Start/WebApiConfig.cs.md)

The preceding class:

* Configures [attribute routing](https://learn.microsoft.com/aspnet/web-api/overview/web-api-routing-and-actions/attribute-routing-in-web-api-2), although it's not actually being used.
* Configures the routing table.
The sample code expects URLs to match the format `/api/{controller}/{id}`, with `{id}` being optional.

The following sections demonstrate migration of the Web API project to ASP.NET Core MVC.

## Create the destination project

Create a new blank solution in Visual Studio and add the ASP.NET 4.x Web API project to migrate:

1. From the **File** menu, select **New** > **Project**.
1. Select the **Blank Solution** template and select **Next**.
1. Name the solution *WebAPIMigration*. Select **Create**.
1. Add the existing *ProductsApp* project to the solution.

Add a new API project to migrate to:

1. Add a new **ASP.NET Core Web Application** project to the solution.
1. In the **Configure your new project** dialog, Name the project *ProductsCore*, and select **Create**.
1. In the **Create a new ASP.NET Core Web Application** dialog, confirm that **.NET Core** and **ASP.NET Core 3.1** are selected. Select the **API** project template, and select **Create**.
1. Remove the `WeatherForecast.cs` and `Controllers/WeatherForecastController.cs` example files from the new *ProductsCore* project.

The solution now contains two projects. The following sections explain migrating the *ProductsApp* project's contents to the *ProductsCore* project.

## Migrate configuration

ASP.NET Core doesn't use the *App_Start* folder or the *Global.asax* file. Additionally, the *web.config* file is added at publish time.

The `Startup` class:

* Replaces *Global.asax*.
* Handles all app startup tasks.

For more information, see [fundamentals/startup](../../../fundamentals/startup.md).

## Migrate models and controllers

The following code shows the `ProductsController` to be updated for ASP.NET Core:

[Code example (complete source file; reference: webapi/sample/3.x/ProductsApp/Controllers/ProductsController.cs)](../../../../_code/aspnetcore/migration/fx-to-core/areas/webapi/sample/3.x/ProductsApp/Controllers/ProductsController.cs.md)

Update the `ProductsController` for ASP.NET Core:

1. Copy `Controllers/ProductsController.cs` and the *Models* folder from the original project to the new one.
1. Change the copied files' root namespace to `ProductsCore`.
1. Update the `using ProductsApp.Models;` statement to `using ProductsCore.Models;`.

The following components don't exist in ASP.NET Core:

* `ApiController` class
* `System.Web.Http` namespace
* `IHttpActionResult` interface

Make the following changes:

1. Change `ApiController` to [Microsoft.AspNetCore.Mvc.ControllerBase](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase). Add `using Microsoft.AspNetCore.Mvc;` to resolve the `ControllerBase` reference.
1. Delete `using System.Web.Http;`.
1. Change the `GetProduct` action's return type from `IHttpActionResult` to `ActionResult<Product>`.
1. Simplify the `GetProduct` action's `return` statement to the following:

    ```csharp
    return product;
    ```

## Configure routing

The ASP.NET Core *API* project template includes endpoint routing configuration in the generated code.

The following [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting%252A) and [Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints%252A) calls:

* Register route matching and endpoint execution in the [middleware](../../../fundamentals/middleware/index.md) pipeline.
* Replace the *ProductsApp* project's `App_Start/WebApiConfig.cs` file.

[Code example (complete source file; reference: webapi/sample/3.x/ProductsCore/Startup.cs?name=snippet_Configure\&highlight=10,14)](../../../../_code/aspnetcore/migration/fx-to-core/areas/webapi/sample/3.x/ProductsCore/Startup.cs.md)

Configure routing as follows:

1. Mark the `ProductsController` class with the following attributes:

    ```csharp
    [Route("api/[controller]")]
    [ApiController]
    ```

    The preceding [`[Route]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RouteAttribute) attribute configures the controller's attribute routing pattern. The [`[ApiController]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute makes attribute routing a requirement for all actions in this controller.

    Attribute routing supports tokens, such as `[controller]` and `[action]`. At runtime, each token is replaced with the name of the controller or action, respectively, to which the attribute has been applied. The tokens:
    * Reduce the number of magic strings in the project.
    * Ensure routes remain synchronized with the corresponding controllers and actions when automatic rename refactorings are applied.
1. Enable HTTP Get requests to the `ProductsController` actions:
    * Apply the [`[HttpGet]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpGetAttribute) attribute to the `GetAllProducts` action.
    * Apply the `[HttpGet("{id}")]` attribute to the `GetProduct` action.

Run the migrated project, and browse to `/api/products`. A full list of three products appears. Browse to `/api/products/1`. The first product appears.

## Additional resources

* [web-api/index](../../../web-api/index.md)
* [web-api/action-return-types](../../../web-api/action-return-types.md)
* [mvc/compatibility-version](../../../mvc/compatibility-version.md)
