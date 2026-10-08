---
title: Get started with Swashbuckle and ASP.NET Core
author: wadepickett
description: Learn how to add Swashbuckle to your ASP.NET Core web API project to integrate the Swagger UI.
ms.author: wpickett
monikerRange: ">= aspnetcore-3.1 <= aspnetcore-8.0"
ms.date: 10/27/2025
uid: tutorials/get-started-with-swashbuckle
---
# Get started with Swashbuckle and ASP.NET Core


**Applies to: \>= aspnetcore-6.0 < aspnetcore-9.0**

> **Note:**
> In .NET 9 and later, ASP.NET Core includes built-in OpenAPI support. Swashbuckle is no longer included by default, but it remains available as a community package you can add manually to ASP.NET Core projects targeting .NET 9 or later.
> 
> • To understand the built‑in OpenAPI features, see [fundamentals/openapi/overview](../fundamentals/openapi/overview.md).  
> • To add and use the Swagger UI provided by the `Swashbuckle.AspNetCore.SwaggerUI` package for interactive exploration or local ad‑hoc testing, see [fundamentals/openapi/using-openapi-documents#use-swagger-ui-for-local-ad-hoc-testing](https://learn.microsoft.com/search/?terms=fundamentals%2Fopenapi%2Fusing-openapi-documents%23use-swagger-ui-for-local-ad-hoc-testing).
>
>The following instructions apply when using Swashbuckle with .NET versions earlier than 9.

There are three main components to Swashbuckle:

* [Swashbuckle.AspNetCore.Swagger](https://www.nuget.org/packages/Swashbuckle.AspNetCore.Swagger/): a Swagger object model and middleware to expose `SwaggerDocument` objects as JSON endpoints.

* [Swashbuckle.AspNetCore.SwaggerGen](https://www.nuget.org/packages/Swashbuckle.AspNetCore.SwaggerGen/): a Swagger generator that builds `SwaggerDocument` objects directly from your routes, controllers, and models. It's typically combined with the Swagger endpoint middleware to automatically expose Swagger JSON.

* [Swashbuckle.AspNetCore.SwaggerUI](https://www.nuget.org/packages/Swashbuckle.AspNetCore.SwaggerUI/): an embedded version of the Swagger UI tool. It interprets Swagger JSON to build a rich, customizable experience for describing the web API functionality. It includes built-in test harnesses for the public methods.

## Package installation

Swashbuckle can be added with the following approaches:

### [Visual Studio](#tab/visual-studio)

* From the **Package Manager Console** window:
  * Go to **View** > **Other Windows** > **Package Manager Console**
  * Navigate to the directory in which the `.csproj` file exists
  * Execute the following command:

    ```powershell
    Install-Package Swashbuckle.AspNetCore -Version 6.6.2
    ```

* From the **Manage NuGet Packages** dialog:
  * Right-click the project in **Solution Explorer** > **Manage NuGet Packages**
  * Set the **Package source** to "nuget.org"
  * Ensure the "Include prerelease" option is enabled
  * Enter "Swashbuckle.AspNetCore" in the search box
  * Select the latest "Swashbuckle.AspNetCore" package from the **Browse** tab and click **Install**

### [Visual Studio Code](#tab/visual-studio-code)

Run the following command from the **Integrated Terminal**:

```dotnetcli
dotnet add TodoApi.csproj package Swashbuckle.AspNetCore -v 6.6.2
```

### [.NET CLI](#tab/net-cli)

Run the following command:

```dotnetcli
dotnet add TodoApi.csproj package Swashbuckle.AspNetCore -v 6.6.2
```

---

## Add and configure Swagger middleware

Add the Swagger generator to the services collection in `Program.cs`:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs" id="snippet_ServicesDefault" highlight="3,4"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs.md)

The call to [Microsoft.Extensions.DependencyInjection.EndpointMetadataApiExplorerServiceCollectionExtensions.AddEndpointsApiExplorer%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EndpointMetadataApiExplorerServiceCollectionExtensions.AddEndpointsApiExplorer%252A) shown in the preceding example is required only for [Minimal APIs](https://learn.microsoft.com/aspnet/core/fundamentals/apis). For more information, see [this StackOverflow post](https://stackoverflow.com/a/71933535).

Enable the middleware for serving the generated JSON document and the Swagger UI, also in `Program.cs`:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Program.cs" id="snippet_Middleware" highlight="3,4"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Program.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Program.cs.md)

The preceding code adds the Swagger middleware only if the current environment is set to `Development`. The `UseSwaggerUI` method call enables an embedded version of the Swagger UI tool.

Launch the app and navigate to `https://localhost:<port>/swagger/v1/swagger.json`. The generated document describing the endpoints appears as shown in [OpenAPI specification (openapi.json)](https://learn.microsoft.com/search/?terms=tutorials%2Fweb-api-help-pages-using-swagger%23openapi-specification-openapijson).

The Swagger UI can be found at `https://localhost:<port>/swagger`. Explore the API via Swagger UI and incorporate it in other programs.

> **Tip:**
> To serve the Swagger UI at the app's root (`https://localhost:<port>/`), set the `RoutePrefix` property to an empty string:
>
> [language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs" id="snippet_MiddlewareRoutePrefix" highlight="6"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs.md)

If using directories with IIS or a reverse proxy, set the Swagger endpoint to a relative path using the `./` prefix. For example, `./swagger/v1/swagger.json`. Using `/swagger/v1/swagger.json` instructs the app to look for the JSON file at the true root of the URL (plus the route prefix, if used). For example, use `https://localhost:<port>/<route_prefix>/swagger/v1/swagger.json` instead of `https://localhost:<port>/<virtual_directory>/<route_prefix>/swagger/v1/swagger.json`.

> **Note:**
> By default, Swashbuckle generates and exposes Swagger JSON in version 3.0 of the specification&mdash;officially called the OpenAPI Specification. To support backwards compatibility, you can opt into exposing JSON in the 2.0 format instead. This 2.0 format is important for integrations such as Microsoft Power Apps and Microsoft Flow that currently support OpenAPI version 2.0. To opt into the 2.0 format, set the `SerializeAsV2` property in `Program.cs`:
>
> [language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs" id="snippet_MiddlewareJsonV2" highlight="3"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs.md)

## Customize and extend

Swagger provides options for documenting the object model and customizing the UI to match your theme.

### API info and description

The configuration action passed to the `AddSwaggerGen` method adds information such as the author, license, and description.

In `Program.cs`, import the following namespace to use the `OpenApiInfo` class:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Program.cs" id="snippet_UsingOpenApiModels"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Program.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Program.cs.md)

Using the `OpenApiInfo` class, modify the information displayed in the UI:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs" id="snippet_ServicesOpenApiInfo" highlight="3-19"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs.md)

The Swagger UI displays the version's information:

Swagger UI with version information: description, author, and license.

### XML comments

XML comments can be enabled with the following approaches:

#### [Visual Studio](#tab/visual-studio)

* Right-click the project in **Solution Explorer** and select *`Edit <project_name>.csproj`*.
* Add [GenerateDocumentationFile](https://learn.microsoft.com/dotnet/core/project-sdk/msbuild-props#generatedocumentationfile)  to the `.csproj` file:

```XML
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
</PropertyGroup>
```

#### [Visual Studio Code](#tab/visual-studio-code)

Add [GenerateDocumentationFile](https://learn.microsoft.com/dotnet/core/project-sdk/msbuild-props#generatedocumentationfile)  to the `.csproj` file:

```XML
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
</PropertyGroup>
```

#### [.NET CLI](#tab/net-cli)

Add [GenerateDocumentationFile](https://learn.microsoft.com/dotnet/core/project-sdk/msbuild-props#generatedocumentationfile)  to the `.csproj` file:

```XML
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
</PropertyGroup>
```

---

Enabling XML comments provides debug information for undocumented public types and members. Undocumented types and members are indicated by the warning message. For example, the following message indicates a violation of warning code 1591:

```text
warning CS1591: Missing XML comment for publicly visible type or member 'TodoController'
```

To suppress warnings project-wide, define a semicolon-delimited list of warning codes to ignore in the project file. Appending the warning codes to `$(NoWarn);` applies the [C# default values](https://github.com/dotnet/sdk/blob/2eb6c546931b5bcb92cd3128b93932a980553ea1/src/Tasks/Microsoft.NET.Build.Tasks/targets/Microsoft.NET.Sdk.CSharp.props#L16) too.

[language="xml" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/SwashbuckleSample.csproj" range="9-12" highlight="3"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/SwashbuckleSample.csproj)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/SwashbuckleSample.csproj.md)

To suppress warnings only for specific members, enclose the code in [#pragma warning](https://learn.microsoft.com/dotnet/csharp/language-reference/preprocessor-directives/preprocessor-pragma-warning) preprocessor directives. This approach is useful for code that shouldn't be exposed via the API docs. In the following example, warning code CS1591 is ignored for the entire `TodoContext` class. Enforcement of the warning code is restored at the close of the class definition. Specify multiple warning codes with a comma-delimited list.

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Models/TodoContext.cs" id="snippet_PragmaWarningDisable" highlight="3,10"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Models/TodoContext.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Models/TodoContext.cs.md)

Configure Swagger to use the XML file that's generated with the preceding instructions. For Linux or non-Windows operating systems, file names and paths can be case-sensitive. For example, a `TodoApi.XML` file is valid on Windows but not Ubuntu.

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Program.cs" id="snippet_Services" highlight="22-23"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Program.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Program.cs.md)

In the preceding code, [Reflection](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/reflection) is used to build an XML file name matching that of the web API project. The [AppContext.BaseDirectory](https://learn.microsoft.com/search/?terms=System.AppContext.BaseDirectory%252A) property is used to construct a path to the XML file. Some Swagger features (for example, schemata of input parameters or HTTP methods and response codes from the respective attributes) work without the use of an XML documentation file. For most features, namely method summaries and the descriptions of parameters and response codes, the use of an XML file is mandatory.

Adding triple-slash comments to an action enhances the Swagger UI by adding the description to the section header. Add a [\<summary>](https://learn.microsoft.com/dotnet/csharp/programming-guide/xmldoc/summary) element above the `Delete` action:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs" id="snippet_Delete" highlight="1-3"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs.md)

The Swagger UI displays the inner text of the preceding code's `<summary>` element:

Swagger UI showing XML comment 'Deletes a specific TodoItem.' for the DELETE method.

The UI is driven by the generated JSON schema:

[language="json" source="\~/tutorials/web-api-help-pages-using-swagger/\_static/v6-swagger-delete.json" range="2-24"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/\_static/v6-swagger-delete.json)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/_static/v6-swagger-delete.json.md)

Add a [\<remarks>](https://learn.microsoft.com/dotnet/csharp/programming-guide/xmldoc/remarks) element to the `Create` action method documentation. It supplements information specified in the `<summary>` element and provides a more robust Swagger UI. The `<remarks>` element content can consist of text, JSON, or XML.

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs" id="snippet_Create" highlight="6-16"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs.md)

Notice the UI enhancements with these additional comments:

Swagger UI with additional comments shown.

### Data annotations

Mark the model with attributes, found in the [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace, to help drive the Swagger UI components.

Add the `[Required]` attribute to the `Name` property of the `TodoItem` class:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Models/TodoItem.cs" highlight="10"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Models/TodoItem.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Models/TodoItem.cs.md)

The presence of this attribute changes the UI behavior and alters the underlying JSON schema:

[language="json" source="\~/tutorials/web-api-help-pages-using-swagger/\_static/v6-swagger-schemas-todoitem.json" range="2-23" highlight="3-5"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/\_static/v6-swagger-schemas-todoitem.json)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/_static/v6-swagger-schemas-todoitem.json.md)

Add the `[Produces("application/json")]` attribute to the API controller. Its purpose is to declare that the controller's actions support a response content type of *application/json*:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs" id="snippet_ClassDeclaration" highlight="3"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs.md)

The **Media type** drop-down selects this content type as the default for the controller's GET actions:

Swagger UI with default response content type

As the usage of data annotations in the web API increases, the UI and API help pages become more descriptive and useful.

### Describe response types

Developers consuming a web API are most concerned with what's returned&mdash;specifically response types and error codes (if not standard). The response types and error codes are denoted in the XML comments and data annotations.

The `Create` action returns an HTTP 201 status code on success. An HTTP 400 status code is returned when the posted request body is null. Without proper documentation in the Swagger UI, the consumer lacks knowledge of these expected outcomes. Fix that problem by adding the highlighted lines in the following example:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs" id="snippet_Create" highlight="17-18,20-21"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Controllers/TodoController.cs.md)

The Swagger UI now clearly documents the expected HTTP response codes:

Swagger UI showing POST Response Class description 'Returns the newly created Todo item' and '400 - If the item is null' for status code and reason under Response Messages.

Conventions can be used as an alternative to explicitly decorating individual actions with `[ProducesResponseType]`. For more information, see [web-api/advanced/conventions](../web-api/advanced/conventions.md).

To support the `[ProducesResponseType]` decoration, the [Swashbuckle.AspNetCore.Annotations](https://github.com/domaindrivendev/Swashbuckle.AspNetCore/blob/master/README.md#swashbuckleaspnetcoreannotations) package offers extensions to enable and enrich the response, schema, and parameter metadata.

### Customize the UI

The default UI is both functional and presentable. However, API documentation pages should represent your brand or theme. Branding the Swashbuckle components requires adding the resources to serve static files and building the folder structure to host those files.

Enable static file middleware:

[Code reference unavailable in this source snapshot: getting-started-with-swashbuckle/includes/~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs?name=snippet_MiddlewareStaticFiles\\&highlight=2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/getting-started-with-swashbuckle.md)

To inject additional CSS stylesheets, add them to the project's *wwwroot* folder and specify the relative path in the middleware options:

[Code reference unavailable in this source snapshot: getting-started-with-swashbuckle/includes/~/tutorials/web-api-help-pages-using-swagger/samples/6.x/SwashbuckleSample/Snippets/Program.cs?name=snippet_MiddlewareInjectStylesheet\\&highlight=5](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/getting-started-with-swashbuckle.md)

## Additional resources

* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
* [Improve the developer experience of an API with Swagger documentation](https://learn.microsoft.com/training/modules/improve-api-developer-experience-with-swagger/)



**Applies to: < aspnetcore-6.0**

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

There are three main components to Swashbuckle:

* [Swashbuckle.AspNetCore.Swagger](https://www.nuget.org/packages/Swashbuckle.AspNetCore.Swagger/): a Swagger object model and middleware to expose `SwaggerDocument` objects as JSON endpoints.

* [Swashbuckle.AspNetCore.SwaggerGen](https://www.nuget.org/packages/Swashbuckle.AspNetCore.SwaggerGen/): a Swagger generator that builds `SwaggerDocument` objects directly from your routes, controllers, and models. It's typically combined with the Swagger endpoint middleware to automatically expose Swagger JSON.

* [Swashbuckle.AspNetCore.SwaggerUI](https://www.nuget.org/packages/Swashbuckle.AspNetCore.SwaggerUI/): an embedded version of the Swagger UI tool. It interprets Swagger JSON to build a rich, customizable experience for describing the web API functionality. It includes built-in test harnesses for the public methods.

## Package installation

Swashbuckle can be added with the following approaches:

### [Visual Studio](#tab/visual-studio)

* From the **Package Manager Console** window:
  * Go to **View** > **Other Windows** > **Package Manager Console**
  * Navigate to the directory in which the `TodoApi.csproj` file exists
  * Execute the following command:

    ```powershell
    Install-Package Swashbuckle.AspNetCore -Version 5.6.3
    ```

* From the **Manage NuGet Packages** dialog:
  * Right-click the project in **Solution Explorer** > **Manage NuGet Packages**
  * Set the **Package source** to "nuget.org"
  * Ensure the "Include prerelease" option is enabled
  * Enter "Swashbuckle.AspNetCore" in the search box
  * Select the latest "Swashbuckle.AspNetCore" package from the **Browse** tab and click **Install**

### [Visual Studio Code](#tab/visual-studio-code)

Run the following command from the **Integrated Terminal**:

```dotnetcli
dotnet add TodoApi.csproj package Swashbuckle.AspNetCore -v 5.6.3
```

### [.NET CLI](#tab/net-cli)

Run the following command:

```dotnetcli
dotnet add TodoApi.csproj package Swashbuckle.AspNetCore -v 5.6.3
```

---

## Add and configure Swagger middleware

Add the Swagger generator to the services collection in the `Startup.ConfigureServices` method:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup2.cs" id="snippet_ConfigureServices" highlight="8"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup2.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup2.cs.md)

In the `Startup.Configure` method, enable the middleware for serving the generated JSON document and the Swagger UI:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup2.cs" id="snippet_Configure" highlight="6,9"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup2.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup2.cs.md)

> **Note:**
> Swashbuckle relies on MVC's [Microsoft.AspNetCore.Mvc.ApiExplorer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiExplorer) to discover the routes and endpoints. If the project calls [Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddMvc%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddMvc%252A), routes and endpoints are discovered automatically. When calling [Microsoft.Extensions.DependencyInjection.MvcCoreServiceCollectionExtensions.AddMvcCore%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcCoreServiceCollectionExtensions.AddMvcCore%252A), the [Microsoft.Extensions.DependencyInjection.MvcApiExplorerMvcCoreBuilderExtensions.AddApiExplorer%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.MvcApiExplorerMvcCoreBuilderExtensions.AddApiExplorer%252A) method must be explicitly called. For more information, see [Swashbuckle, ApiExplorer, and Routing](https://github.com/domaindrivendev/Swashbuckle.AspNetCore#swashbuckle-apiexplorer-and-routing).

In development, the preceding `UseSwaggerUI` method call enables an embedded version of the Swagger UI tool. This depends on
the [static file middleware](../fundamentals/static-files.md). If targeting .NET Framework or .NET Core 1.x, add the [Microsoft.AspNetCore.StaticFiles](https://www.nuget.org/packages/Microsoft.AspNetCore.StaticFiles/) NuGet package to the project.

Launch the app, and navigate to `http://localhost:<port>/swagger/v1/swagger.json`. The generated document describing the endpoints appears as shown in [OpenAPI specification (openapi.json)](https://learn.microsoft.com/search/?terms=tutorials%2Fweb-api-help-pages-using-swagger%23openapi-specification-openapijson).

The Swagger UI can be found at `http://localhost:<port>/swagger`. Explore the API via Swagger UI and incorporate it in other programs.

> **Tip:**
> To serve the Swagger UI at the app's root (`http://localhost:<port>/`), set the `RoutePrefix` property to an empty string:
>
> [language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Startup3.cs" id="snippet_UseSwaggerUI" highlight="4"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Startup3.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Startup3.cs.md)

If using directories with IIS or a reverse proxy, set the Swagger endpoint to a relative path using the `./` prefix. For example, `./swagger/v1/swagger.json`. Using `/swagger/v1/swagger.json` instructs the app to look for the JSON file at the true root of the URL (plus the route prefix, if used). For example, use `http://localhost:<port>/<route_prefix>/swagger/v1/swagger.json` instead of `http://localhost:<port>/<virtual_directory>/<route_prefix>/swagger/v1/swagger.json`.

> **Note:**
> By default, Swashbuckle generates and exposes Swagger JSON in version 3.0 of the specification&mdash;officially called the OpenAPI Specification. To support backwards compatibility, you can opt into exposing JSON in the 2.0 format instead. This 2.0 format is important for integrations such as Microsoft Power Apps and Microsoft Flow that currently support OpenAPI version 2.0. To opt into the 2.0 format, set the `SerializeAsV2` property in `Startup.Configure`:
>
> [language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup3.cs" id="snippet_Configure" highlight="6-9"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup3.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup3.cs.md)

## Customize and extend

Swagger provides options for documenting the object model and customizing the UI to match your theme.

In the `Startup` class, add the following namespaces:

```csharp
using System;
using System.Reflection;
using System.IO;
```

### API info and description

The configuration action passed to the `AddSwaggerGen` method adds information such as the author, license, and description:

In the `Startup` class, import the following namespace to use the `OpenApiInfo` class:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Startup2.cs" id="snippet_InfoClassNamespace"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Startup2.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Startup2.cs.md)

Using the `OpenApiInfo` class, modify the information displayed in the UI:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Startup4.cs" id="snippet_AddSwaggerGen"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Startup4.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Startup4.cs.md)

The Swagger UI displays the version's information:

Swagger UI with version information: description, author, and see more link.

### XML comments

XML comments can be enabled with the following approaches:

#### [Visual Studio](#tab/visual-studio)

* Right-click the project in **Solution Explorer** and select *`Edit <project_name>.csproj`*.
* Manually add the highlighted lines to the `.csproj` file:

[language="xml" source="\~/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj" range="8-11" highlight="1-2,4"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj.md)

#### [Visual Studio Code](#tab/visual-studio-code)

Manually add the highlighted lines to the `.csproj` file:

[language="xml" source="\~/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj" range="8-11" highlight="1-2,4"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj.md)

#### [.NET CLI](#tab/net-cli)

Manually add the highlighted lines to the `.csproj` file:

[language="xml" source="\~/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj" range="8-11" highlight="1-2,4"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj.md)

---

Enabling XML comments provides debug information for undocumented public types and members. Undocumented types and members are indicated by the warning message. For example, the following message indicates a violation of warning code 1591:

```text
warning CS1591: Missing XML comment for publicly visible type or member 'TodoController.GetAll()'
```

To suppress warnings project-wide, define a semicolon-delimited list of warning codes to ignore in the project file. Appending the warning codes to `$(NoWarn);` applies the [C# default values](https://github.com/dotnet/sdk/blob/2eb6c546931b5bcb92cd3128b93932a980553ea1/src/Tasks/Microsoft.NET.Build.Tasks/targets/Microsoft.NET.Sdk.CSharp.props#L16) too.

[language="xml" source="\~/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj" range="8-11" highlight="3"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.Swashbuckle/TodoApi.csproj.md)

To suppress warnings only for specific members, enclose the code in [#pragma warning](https://learn.microsoft.com/dotnet/csharp/language-reference/preprocessor-directives/preprocessor-pragma-warning) preprocessor directives. This approach is useful for code that shouldn't be exposed via the API docs. In the following example, warning code CS1591 is ignored for the entire `Program` class. Enforcement of the warning code is restored at the close of the class definition. Specify multiple warning codes with a comma-delimited list.

```csharp
namespace TodoApi
{
#pragma warning disable CS1591
    public class Program
    {
        public static void Main(string[] args) =>
            BuildWebHost(args).Run();

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
#pragma warning restore CS1591
}
```

Configure Swagger to use the XML file that's generated with the preceding instructions. For Linux or non-Windows operating systems, file names and paths can be case-sensitive. For example, a `TodoApi.XML` file is valid on Windows but not Ubuntu.

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup.cs" id="snippet_ConfigureServices" highlight="30-32"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup.cs.md)

In the preceding code, [Reflection](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/reflection) is used to build an XML file name matching that of the web API project. The [AppContext.BaseDirectory](https://learn.microsoft.com/search/?terms=System.AppContext.BaseDirectory%252A) property is used to construct a path to the XML file. Some Swagger features (for example, schemata of input parameters or HTTP methods and response codes from the respective attributes) work without the use of an XML documentation file. For most features, namely method summaries and the descriptions of parameters and response codes, the use of an XML file is mandatory.

Adding triple-slash comments to an action enhances the Swagger UI by adding the description to the section header. Add a [\<summary>](https://learn.microsoft.com/dotnet/csharp/programming-guide/xmldoc/summary) element above the `Delete` action:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Controllers/TodoController.cs" id="snippet_Delete" highlight="1-3"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Controllers/TodoController.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Controllers/TodoController.cs.md)

The Swagger UI displays the inner text of the preceding code's `<summary>` element:

Swagger UI showing XML comment 'Deletes a specific TodoItem.' for the DELETE method.

The UI is driven by the generated JSON schema:

```json
"delete": {
    "tags": [
        "Todo"
    ],
    "summary": "Deletes a specific TodoItem.",
    "operationId": "ApiTodoByIdDelete",
    "consumes": [],
    "produces": [],
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "description": "",
            "required": true,
            "type": "integer",
            "format": "int64"
        }
    ],
    "responses": {
        "200": {
            "description": "Success"
        }
    }
}
```

Add a [\<remarks>](https://learn.microsoft.com/dotnet/csharp/programming-guide/xmldoc/remarks) element to the `Create` action method documentation. It supplements information specified in the `<summary>` element and provides a more robust Swagger UI. The `<remarks>` element content can consist of text, JSON, or XML.

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Controllers/TodoController.cs" id="snippet_Create" highlight="4-14"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Controllers/TodoController.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Controllers/TodoController.cs.md)

Notice the UI enhancements with these additional comments:

Swagger UI with additional comments shown.

### Data annotations

Mark the model with attributes, found in the [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) namespace, to help drive the Swagger UI components.

Add the `[Required]` attribute to the `Name` property of the `TodoItem` class:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Models/TodoItem.cs" highlight="10"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Models/TodoItem.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.Swashbuckle/Models/TodoItem.cs.md)

The presence of this attribute changes the UI behavior and alters the underlying JSON schema:

```json
"definitions": {
    "TodoItem": {
        "required": [
            "name"
        ],
        "type": "object",
        "properties": {
            "id": {
                "format": "int64",
                "type": "integer"
            },
            "name": {
                "type": "string"
            },
            "isComplete": {
                "default": false,
                "type": "boolean"
            }
        }
    }
},
```

Add the `[Produces("application/json")]` attribute to the API controller. Its purpose is to declare that the controller's actions support a response content type of *application/json*:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Controllers/TodoController.cs" id="snippet_TodoController" highlight="1"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Controllers/TodoController.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Controllers/TodoController.cs.md)

The **Response Content Type** drop-down selects this content type as the default for the controller's GET actions:

Swagger UI with default response content type.

As the usage of data annotations in the web API increases, the UI and API help pages become more descriptive and useful.

### Describe response types

Developers consuming a web API are most concerned with what's returned&mdash;specifically response types and error codes (if not standard). The response types and error codes are denoted in the XML comments and data annotations.

The `Create` action returns an HTTP 201 status code on success. An HTTP 400 status code is returned when the posted request body is null. Without proper documentation in the Swagger UI, the consumer lacks knowledge of these expected outcomes. Fix that problem by adding the highlighted lines in the following example:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Controllers/TodoController.cs" id="snippet_Create" highlight="17,18,20,21"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Controllers/TodoController.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Controllers/TodoController.cs.md)

The Swagger UI now clearly documents the expected HTTP response codes:

Swagger UI showing POST Response Class description 'Returns the newly created Todo item' and '400 - If the item is null' for status code and reason under Response Messages.

In ASP.NET Core 2.2 or later, conventions can be used as an alternative to explicitly decorating individual actions with `[ProducesResponseType]`. For more information, see [web-api/advanced/conventions](../web-api/advanced/conventions.md).

To support the `[ProducesResponseType]` decoration, the [Swashbuckle.AspNetCore.Annotations](https://github.com/domaindrivendev/Swashbuckle.AspNetCore/blob/master/README.md#swashbuckleaspnetcoreannotations) package offers extensions to enable and enrich the response, schema, and parameter metadata.

### Customize the UI

The default UI is both functional and presentable. However, API documentation pages should represent your brand or theme. Branding the Swashbuckle components requires adding the resources to serve static files and building the folder structure to host those files.

If targeting .NET Framework or .NET Core 1.x, add the [Microsoft.AspNetCore.StaticFiles](https://www.nuget.org/packages/Microsoft.AspNetCore.StaticFiles) NuGet package to the project:

```xml
<PackageReference Include="Microsoft.AspNetCore.StaticFiles" Version="2.1.1" />
```

The preceding NuGet package is already installed if targeting .NET Core 2.x and using the [metapackage](../fundamentals/metapackage.md).

Enable static file middleware:

[language="csharp" source="\~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup.cs" id="snippet_Configure" highlight="3"::: (complete source file; reference: \~/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup.cs)](../../_code/aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/3.x/TodoApi.Swashbuckle/Startup.cs.md)

To inject additional CSS stylesheets, add them to the project's *wwwroot* folder and specify the relative path in the middleware options:

```csharp
if (env.IsDevelopment())
{
    app.UseSwaggerUI(c =>
    {
        c.InjectStylesheet("/swagger-ui/custom.css");
    }
}
```

## Additional resources

* [Improve the developer experience of an API with Swagger documentation](https://learn.microsoft.com/training/modules/improve-api-developer-experience-with-swagger/)
