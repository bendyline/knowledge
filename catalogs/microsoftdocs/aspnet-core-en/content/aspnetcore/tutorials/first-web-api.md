---
title: "Tutorial: Create a controller-based web API with ASP.NET Core"
ai-usage: ai-assisted
author: wadepickett
description: Learn how to build a controller-based web API with ASP.NET Core.
ms.author: wpickett
ms.date: 08/24/2026
uid: tutorials/first-web-api
---

# Tutorial: Create a controller-based web API with ASP.NET Core

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


By [Tim Deschryver](https://timdeschryver.dev/) and [Rick Anderson](https://twitter.com/RickAndMSFT)

**Applies to: \>= aspnetcore-9.0**

This tutorial teaches the basics of building a controller-based web API that uses a database. Another approach to creating APIs in ASP.NET Core is to create *Minimal APIs*. For help with choosing between Minimal APIs and controller-based APIs, see [fundamentals/apis](../fundamentals/apis.md). For a tutorial on creating a Minimal API, see [tutorials/min-web-api](min-web-api.md).

## Overview

This tutorial creates the following API:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /api/todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /api/todoitems/{id}` | Get an item by ID | None | To-do item |
| `POST /api/todoitems` | Add a new item | To-do item | To-do item |
| `PUT /api/todoitems/{id}` | Update an existing item &nbsp; | To-do item | None |
| `DELETE /api/todoitems/{id}` &nbsp; &nbsp; | Delete an item &nbsp; &nbsp; | None | None |

The following diagram shows the design of the app.

The client is represented by a box on the left. It submits a request and receives a response from the application, a box drawn on the right. Within the application box, three boxes represent the controller, the model, and the data access layer. The request comes into the application's controller, and read/write operations occur between the controller and the data access layer. The model is serialized and returned to the client in the response.

## Prerequisites

# [Visual Studio](#tab/visual-studio)

<!-- use the include for articles that are not updated every release, like the data/ef articles -->
* [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) with the **ASP.NET and web development** workload.

  VS22 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# Dev Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
* [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)


You can follow the Visual Studio Code instructions on macOS, Linux, or Windows. Changes may be required if you use an integrated development environment (IDE) other than Visual Studio Code.


---

## Create a Web API project

# [Visual Studio](#tab/visual-studio)

* From the **File** menu, select **New** > **Project**.
* Enter *Web API* in the search box.
* Select the **ASP.NET Core Web API** template and select **Next**.
* In the **Configure your new project dialog**, name the project *TodoApi* and select **Next**.
* In the **Additional information** dialog:
  * Confirm the **Framework** is **.NET 9.0 (Standard Term Support)**.
  * Confirm the checkbox for **Enable OpenAPI support** is checked.
  * Confirm the checkbox for **Use controllers (uncheck to use Minimal APIs)** is checked.
  * Select **Create**.

## Add a NuGet package

A NuGet package must be added to support the database used in this tutorial.

* From the **Tools** menu, select **NuGet Package Manager > Manage NuGet Packages for Solution**.
* Select the **Browse** tab.
* Enter **Microsoft.EntityFrameworkCore.InMemory** in the search box, and then select `Microsoft.EntityFrameworkCore.InMemory`.
* Select the **Project** checkbox in the right pane and then select **Install**.

# [Visual Studio Code](#tab/visual-studio-code)

* Open the [integrated terminal](https://code.visualstudio.com/docs/terminal/basics).
* Change directories (`cd`) to the folder that will contain the project folder.
* Run the following commands:

   ```dotnetcli
   dotnet new webapi --use-controllers -o TodoApi
   cd TodoApi
   dotnet add package Microsoft.EntityFrameworkCore.InMemory
   code -r .
   ```

  These commands:

  * Create a new web API project and open it in Visual Studio Code.
  * Add a NuGet package that is needed for the next section.
  * Open the *TodoApi* folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

---

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


### Run the project

The project template creates a `WeatherForecast` API with support for [OpenAPI](../fundamentals/openapi/overview.md).

# [Visual Studio](#tab/visual-studio)

Press Ctrl+F5 to run without the debugger.

Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio launches a terminal window and displays the URL of the running app. The API is hosted at `https://localhost:<port>`, where `<port>` is a randomly chosen port number set at the project creation. 

   ```output
   ...
   info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7260
   info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:7261
   info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
   ...
   ```

<kbd>Ctrl</kbd>+*click* the HTTPS URL in the output to test the web app in a browser. There's no endpoint at `https://localhost:<port>`, so the browser returns [HTTP 404 Not Found](https://developer.mozilla.org/docs/Web/HTTP/Status/404).

Append `/weatherforecast` to the URL to test the WeatherForecast API. 
The browser displays JSON similar to the following example:

```json
[
    {
        "date": "2025-07-16",
        "temperatureC": 52,
        "temperatureF": 125,
        "summary": "Mild"
    },
    {
        "date": "2025-07-17",
        "temperatureC": 36,
        "temperatureF": 96,
        "summary": "Warm"
    },
    {
        "date": "2025-07-18",
        "temperatureC": 39,
        "temperatureF": 102,
        "summary": "Cool"
    },
    {
        "date": "2025-07-19",
        "temperatureC": 10,
        "temperatureF": 49,
        "summary": "Bracing"
    },
    {
        "date": "2025-07-20",
        "temperatureC": -1,
        "temperatureF": 31,
        "summary": "Chilly"
    }
]
```

# [Visual Studio Code](#tab/visual-studio-code)

* Trust the HTTPS development certificate by running the following command:

  ```dotnetcli
  dotnet dev-certs https --trust
  ```
  **Applies to: <=aspnetcore-8.0**

  The preceding command requires .NET 9 or later SDK on Linux. For Linux on .NET 8.0.401 or earlier SDK, see your Linux distribution's documentation for trusting a certificate.



  The preceding command displays the following dialog, provided the certificate was not previously trusted:

  Security warning dialog

* Select **Yes** if you agree to trust the development certificate.

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


Run the app:

* Run the following command to start the app on the `https` profile:

  ```dotnetcli
  dotnet run --launch-profile https
  ```

 The output shows messages similar to the following, indicating that the app is running and awaiting requests:

   ```output
   ...
   info: Microsoft.Hosting.Lifetime[14]
         Now listening on: https://localhost:{port}
   ...
   ```

* <kbd>Ctrl</kbd>+*click* the HTTPS URL in the output to test the web app in a browser.

* The default browser is launched to `https://localhost:<port>`, where `<port>` is the randomly chosen port number displayed in the output. There's no endpoint at `https://localhost:<port>`, so the browser returns [HTTP 404 Not Found](https://developer.mozilla.org/docs/Web/HTTP/Status/404).

* Append `/weatherforecast` to the URL to test the WeatherForecast API. The browser displays JSON similar to the following example:
    
```json
[
    {
        "date": "2025-07-16",
        "temperatureC": 52,
        "temperatureF": 125,
        "summary": "Mild"
    },
    {
        "date": "2025-07-17",
        "temperatureC": 36,
        "temperatureF": 96,
        "summary": "Warm"
    },
    {
        "date": "2025-07-18",
        "temperatureC": 39,
        "temperatureF": 102,
        "summary": "Cool"
    },
    {
        "date": "2025-07-19",
        "temperatureC": 10,
        "temperatureF": 49,
        "summary": "Bracing"
    },
    {
        "date": "2025-07-20",
        "temperatureC": -1,
        "temperatureF": 31,
        "summary": "Chilly"
    }
]
```
    
* After testing the web app using the following instruction, press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the integrated terminal to close it.

---

### Test the project

# [Visual Studio](#tab/visual-studio)

This tutorial uses [Endpoints Explorer and .http files](https://learn.microsoft.com/search/?terms=test%2Fhttp-files%23use-endpoints-explorer) to test the API.

# [Visual Studio Code](#tab/visual-studio-code) 

## Create API testing UI with Swagger

There are many available web API testing tools to choose from, and you can follow this tutorial's introductory API test steps with your preferred tool.

This tutorial utilizes the .NET package [NSwag.AspNetCore](https://www.nuget.org/packages/NSwag.AspNetCore/), which integrates Swagger tools for generating a testing UI adhering to the OpenAPI specification:

* NSwag: A .NET library that integrates Swagger directly into ASP.NET Core applications, providing middleware and configuration.
* Swagger: A set of open-source tools such as OpenAPIGenerator and SwaggerUI that generate API testing pages that follow the OpenAPI specification.
* OpenAPI specification: A document that describes the capabilities of the API, based on the XML and attribute annotations within the controllers and models.

For more information on using OpenAPI and NSwag with ASP.NET, see [tutorials/web-api-help-pages-using-swagger](web-api-help-pages-using-swagger.md).

### Install Swagger tooling

* Run the following command:

  ```dotnetcli
  dotnet add package NSwag.AspNetCore
  ```

The previous command adds the [NSwag.AspNetCore](https://www.nuget.org/packages/NSwag.AspNetCore/) package, which contains tools to generate Swagger documents and UI.
Because our project is using OpenAPI, we only use the NSwag package to generate the Swagger UI.

### Configure Swagger middleware

* In `Program.cs`, add the following highlighted code:

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Program.cs" id="snippet_UseSwagger" highlight="6-9"::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Program.cs.md)

The previous code enables the Swagger middleware for serving the generated JSON document using the Swagger UI. Swagger is only enabled in a development environment. Enabling Swagger in a production environment could expose potentially sensitive details about the API's structure and implementation.

The app uses the OpenAPI document generated by OpenApi, located at `/openapi/v1.json`, to generate the UI.
View the generated OpenAPI specification for the `WeatherForecast` API while the project is running by navigating to `https://localhost:<port>/openapi/v1.json` in your browser.

The OpenAPI specification is a document in JSON format that describes the structure and capabilities of your API, including endpoints, request/response formats, parameters, and more. It's essentially a blueprint of your API that can be used by various tools to understand and interact with your API.

---

## Add a model class

A *model* is a set of classes that represent the data that the app manages. The model for this app is the `TodoItem` class.

# [Visual Studio](#tab/visual-studio)

* In **Solution Explorer**, right-click the project. Select **Add** > **New Folder**. Name the folder `Models`.
* Right-click the `Models` folder and select **Add** > **Class**. Name the class *TodoItem* and select **Add**.
* Replace the template code with the following:

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi/Models/TodoItem.cs"::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi/Models/TodoItem.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi/Models/TodoItem.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

* Add a folder named `Models`.
* Add a `TodoItem.cs` file to the `Models` folder with the following code:

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Models/TodoItem.cs"::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Models/TodoItem.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Models/TodoItem.cs.md)

---

The `Id` property functions as the unique key in a relational database.

Model classes can go anywhere in the project, but the `Models` folder is used by convention.

## Add a database context

The *database context* is the main class that coordinates Entity Framework functionality for a data model. This class is created by deriving from the [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class.

# [Visual Studio](#tab/visual-studio)

* Right-click the `Models` folder and select **Add** > **Class**. Name the class *TodoContext* and click **Add**.
* Enter the following code:

  [language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi/Models/TodoContext.cs"::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi/Models/TodoContext.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi/Models/TodoContext.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

* Add a `TodoContext.cs` file to the `Models` folder.
* Enter the following code:

  [language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Models/TodoContext.cs"::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Models/TodoContext.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Models/TodoContext.cs.md)

---

## Register the database context

In ASP.NET Core, services such as the DB context must be registered with the [dependency injection (DI)](../fundamentals/dependency-injection.md) container. The container provides the service to controllers.

Update `Program.cs` with the following highlighted code:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi/Program.cs" highlight="1-2,8-9"::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi/Program.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Program.cs" highlight="1-2,8-9"::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi_SwaggerVersion/Program.cs.md)

---

The preceding code:

* Adds `using` directives.
* Adds the database context to the DI container.
* Specifies that the database context will use an in-memory database.

## Scaffold a controller

# [Visual Studio](#tab/visual-studio)

* Right-click the `Controllers` folder.
* Select **Add** > **New Scaffolded Item**.
* Select **API Controller with actions, using Entity Framework**, and then select **Add**.
* In the **Add API Controller with actions, using Entity Framework** dialog:

  * Select **TodoItem (TodoApi.Models)** in the **Model class**.
  * Select **TodoContext (TodoApi.Models)** in the **Data context class**.
  * Select **Add**.

  If the scaffolding operation fails, select **Add** to try scaffolding a second time.

This step adds the `Microsoft.VisualStudio.Web.CodeGeneration.Design` and `Microsoft.EntityFrameworkCore.Tools` NuGet packages to the project. 
These packages are required for scaffolding.

# [Visual Studio Code](#tab/visual-studio-code)

Make sure that all of your changes so far are saved.

* Right-click (or Command-click on macOS) the **TodoAPI** project and select **Open in Terminal**.  The terminal opens at the `TodoAPI` project folder.
Run the following commands:

```dotnetcli
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet tool uninstall -g dotnet-aspnet-codegenerator
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet tool update -g dotnet-aspnet-codegenerator
```

The preceding commands:

* Add NuGet packages required for scaffolding.
* Install the scaffolding engine (`dotnet-aspnet-codegenerator`) after uninstalling any possible previous version.

For Linux, add the .NET tools directory to the system path with the following command:

```Bash
echo 'export PATH=$HOME/.dotnet/tools:$PATH' >> ~/.bashrc
source ~/.bashrc
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


Build the project.

Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator controller -name TodoItemsController -async -api -m TodoItem -dc TodoContext -outDir Controllers
  ```

The preceding command scaffolds the `TodoItemsController`.

---

The generated code:

* Marks the class with the [`[ApiController]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute. This attribute indicates that the controller responds to web API requests. For information about specific behaviors that the attribute enables, see [web-api/index](../web-api/index.md).
* Uses DI to inject the database context (`TodoContext`) into the controller. The database context is used in each of the [CRUD](https://wikipedia.org/wiki/Create,_read,_update_and_delete) methods in the controller.

The ASP.NET Core templates for:

* Controllers with views include `[action]` in the route template.
* API controllers don't include `[action]` in the route template.

When the `[action]` token isn't in the route template, the [action](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23action) name (method name) isn't included in the endpoint. That is, the action's associated method name isn't used in the matching route.

Open the generated `Controllers/TodoItemsController.cs` file to review the scaffolded code. Scaffolding generates a complete, working controller with action methods that create, read, update, and delete `TodoItem` data:

* `GetTodoItems`: Get all to-do items.
* `GetTodoItem`: Get a to-do item by ID.
* `PostTodoItem`: Create a to-do item.
* `PutTodoItem`: Update an existing to-do item.
* `DeleteTodoItem`: Delete a to-do item.

The following sections examine these generated methods, starting with `PostTodoItem`.

## Examine the `PostTodoItem` create method

Examine the scaffolded `PostTodoItem` method. The generated code already works. The return statement uses the [nameof](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/nameof) operator so the action name isn't hard-coded as a string. The commented-out line shows the equivalent hard-coded form that `nameof` replaces:

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs" id="snippet_Create"::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs.md)

The preceding code is an `HTTP POST` method, as indicated by the [`[HttpPost]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPostAttribute) attribute. The method gets the value of the `TodoItem` from the body of the HTTP request.

For more information, see [Attribute routing with Http\[Verb\] attributes](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23verb).

The [Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%252A) method:

* Returns an [HTTP 201 status code](https://developer.mozilla.org/docs/Web/HTTP/Status/201) if successful. `HTTP 201` is the standard response for an `HTTP POST` method that creates a new resource on the server.
* Adds a [Location](https://developer.mozilla.org/docs/Web/HTTP/Headers/Location) header to the response. The `Location` header specifies the [URI](https://developer.mozilla.org/docs/Glossary/URI) of the newly created to-do item. For more information, see [10.2.2 201 Created](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.2).
* References the `GetTodoItem` action to create the `Location` header's URI.

<a name="post7"></a>

### Test PostTodoItem

# [Visual Studio](#tab/visual-studio)

* Select **View** > **Other Windows** > **Endpoints Explorer**.
* Right-click the **POST** endpoint and select **Generate request**.

  Endpoints Explorer context menu highlighting Generate Request menu item.

  A new file is created in the project folder named `TodoApi.http`, with contents similar to the following example:

  ```
  @TodoApi_HostAddress = https://localhost:49738
    
  POST {{TodoApi_HostAddress}}/api/todoitems
  Content-Type: application/json
  
  {
    //TodoItem
  }
  
  ###
  ```

  * The first line creates a variable that is used for all of the endpoints.
  * The next line defines a POST request.
  * The lines after the POST request line defines the headers, and a placeholder for the request body.
  * The triple hashtag (`###`) line is a request delimiter: what comes after it is for a different request.

* The POST request expects a `TodoItem`. To define the todo, replace the `//TodoItem` comment with the following JSON:

  ```json
  {
    "name": "walk dog",
    "isComplete": true
  }
  ```
  
  The TodoApi.http file should now look like the following example, but with your port number:
  
  ```
  @TodoApi_HostAddress = https://localhost:7260
  
  Post {{TodoApi_HostAddress}}/api/todoitems
  Content-Type: application/json
  
  {
    "name": "walk dog",
    "isComplete": true
  }
  
  ###
  ```

* Run the app.

* Select the **Send request** link that is above the `POST` request line.

  .http file window with run link highlighted.

  The POST request is sent to the app and the response is displayed in the **Response** pane.

  .http file window with response from the POST request.

# [Visual Studio Code](#tab/visual-studio-code)

* With the app still running, in the browser, navigate to `https://localhost:<port>/swagger` to display the API testing page generated by Swagger. Click on **TodoItems** to expand the operations.

  Swagger generated API testing page

* On the Swagger API testing page, select **Post /api/todoitems** > **Try it out**.
* Note that the **Request body** field contains a generated example format reflecting the parameters for the API.
* In the request body enter JSON for a to-do item, without specifying the optional `id`:

  ```json
  {
    "name": "walk dog",
    "isComplete": true
  }
  ```

* Select **Execute**.

  Swagger with Post request

* Swagger provides a **Responses** pane below the **Execute** button. 

  Swagger with Post response

Note a few of the useful details:

* cURL: Swagger provides an example cURL command in Unix/Linux syntax, which can be run at the command line with any bash shell that uses Unix/Linux syntax, including Git Bash from [Git for Windows](https://git-scm.com/downloads).
* Request URL: A simplified representation of the HTTP request made by Swagger UI's JavaScript code for the API call. Actual requests can include details such as headers and query parameters and a request body.
* Server response: Includes the response body and headers. The response body shows the `id` was set to `1`.
* Response Code: A 201 `HTTP` status code was returned, indicating that the request was successfully processed and resulted in the creation of a new resource.

---

### Test the location header URI

# [Visual Studio](#tab/visual-studio)

Test the app by calling the `GET` endpoints from a browser or by using **Endpoints Explorer**. The following steps are for **Endpoints Explorer**.

* In **Endpoints Explorer**, right-click the first **GET** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

  ```
  GET {{TodoApi_HostAddress}}/api/todoitems
  
  ###
  ```

* Select the **Send request** link that is above the new `GET` request line.

  The GET request is sent to the app and the response is displayed in the **Response** pane.

* The response body is similar to the following JSON:

  ```json
  [
    {
      "id": 1,
      "name": "walk dog",
      "isComplete": true
    }
  ]
  ```

* In **Endpoints Explorer**, right-click the `/api/todoitems/{id}` **GET** endpoint and select **Generate request**.
  The following content is added to the `TodoApi.http` file:

  ```
  @id=0
  GET {{TodoApi_HostAddress}}/api/todoitems/{{id}}

  ###
  ```

* Assign `{@id}` to `1` (instead of `0`).

* Select the **Send request** link that is above the new GET request line.

  The GET request is sent to the app and the response is displayed in the **Response** pane.

* The response body is similar to the following JSON:

  ```json
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
  ```
  
# [Visual Studio Code](#tab/visual-studio-code)

Test the app by calling the endpoints from a browser or Swagger.

* In Swagger select **GET /api/todoitems** > **Try it out** > **Execute**.

* Alternatively, call **GET /api/todoitems** from a browser by entering the URI `https://localhost:<port>/api/todoitems`. For example, `https://localhost:7260/api/todoitems`

The call to `GET /api/todoitems` produces a response similar to the following:

```json
[
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
]
```

* Call **GET /api/todoitems/{id}** in Swagger to return data from a specific id:
  * Select **GET /api/todoitems** > **Try it out**.
  * Set the **id** field to `1` and select **Execute**.

* Alternatively, call **GET /api/todoitems** from a browser by entering the URI `https://localhost:<port>/api/todoitems/1`. For example, `https://localhost:7260/api/todoitems/1`

* The response is similar to the following:

  ```json
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
  ```

---

## Examine the GET methods

Two GET endpoints are implemented:

* `GET /api/todoitems`
* `GET /api/todoitems/{id}`

The previous section showed an example of the `/api/todoitems/{id}` route.

Follow the [POST](#post7) instructions to add another todo item, and then test the `/api/todoitems` route using Swagger.

This app uses an in-memory database. If the app is stopped and started, the preceding GET request doesn't return any data. If no data is returned, [POST](#post7) data to the app.

## Routing and URL paths

The [`[HttpGet]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpGetAttribute) attribute denotes a method that responds to an `HTTP GET` request. The URL path for each method is constructed as follows:

* Start with the template string in the controller's `Route` attribute:

  [language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs" id="snippet_Route" highlight="1"::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs.md)

* Replace `[controller]` with the name of the controller, which by convention is the controller class name minus the "Controller" suffix. For this sample, the controller class name is **TodoItems**Controller, so the controller name is "TodoItems". ASP.NET Core [routing](../mvc/controllers/routing.md) is case insensitive.
* If the `[HttpGet]` attribute has a route template (for example, `[HttpGet("products")]`), append that to the path. This sample doesn't use a template. For more information, see [Attribute routing with Http\[Verb\] attributes](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23verb).

In the following `GetTodoItem` method, `"{id}"` is a placeholder variable for the unique identifier of the to-do item. When `GetTodoItem` is invoked, the value of `"{id}"` in the URL is provided to the method in its `id` parameter.

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs" id="snippet_GetByID" highlight="1-2"::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs.md)

## Return values

The return type of the `GetTodoItems` and `GetTodoItem` methods is [ActionResult\<T> type](https://learn.microsoft.com/search/?terms=web-api%2Faction-return-types%23actionresultt-type). ASP.NET Core automatically serializes the object to [JSON](https://www.json.org/) and writes the JSON into the body of the response message. The response code for this return type is [200 OK](https://developer.mozilla.org/docs/Web/HTTP/Status/200), assuming there are no unhandled exceptions. Unhandled exceptions are translated into 5xx errors.

`ActionResult` return types can represent a wide range of HTTP status codes. For example, `GetTodoItem` can return two different status values:

* If no item matches the requested ID, the method returns a [404 status](https://developer.mozilla.org/docs/Web/HTTP/Status/404) [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) error code.
* Otherwise, the method returns 200 with a JSON response body. Returning `item` results in an `HTTP 200` response.

## The PutTodoItem method

Examine the `PutTodoItem` method:

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs" id="snippet_Update" ::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs.md)

`PutTodoItem` is similar to `PostTodoItem`, except it uses `HTTP PUT`. The response is [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204). According to the HTTP specification, a `PUT` request requires the client to send the entire updated entity, not just the changes. To support partial updates, use [HTTP PATCH](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPatchAttribute).

### Test the PutTodoItem method

This sample uses an in-memory database that must be initialized each time the app is started. There must be an item in the database before you make a PUT call. Call GET to ensure there's an item in the database before making a PUT call.

Use the `PUT` method to update the `TodoItem` that has Id = 1 and set its name to `"feed fish"`. Note the response is [`HTTP 204 No Content`](https://developer.mozilla.org/docs/Web/HTTP/Status/204).

# [Visual Studio](#tab/visual-studio)

* In **Endpoints Explorer**, right-click the **PUT** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

  ```
  PUT {{TodoApi_HostAddress}}/api/todoitems/{{id}}
  Content-Type: application/json
  
  {
    //TodoItem
  }
  
  ###
  ```

* In the PUT request line, replace `{{id}}` with `1`.

* Replace the `//TodoItem` placeholder with the following lines:

  ```
  PUT {{TodoApi_HostAddress}}/api/todoitems/1
  Content-Type: application/json

  {
    "id": 1,
    "name": "feed fish",
    "isComplete": false
  }
  ```

* Select the **Send request** link that is above the new PUT request line.

  The PUT request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.
  
# [Visual Studio Code](#tab/visual-studio-code)

Use Swagger to send a PUT request:

* Select **Put /api/todoitems/{id}** > **Try it out**.

* Set the **id** field to `1`.

* Set the request body to the following JSON:

  ```json
  {
    "id": 1,
    "name": "feed fish",
    "isComplete": false
  }
  ```

* Select **Execute**.

---

## The DeleteTodoItem method

Examine the `DeleteTodoItem` method:

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs" id="snippet_Delete" ::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApi/Controllers/TodoItemsController.cs.md)

### Test the DeleteTodoItem method

Use the `DELETE` method to delete the `TodoItem` that has Id = 1. Note the response is [`HTTP 204 No Content`](https://developer.mozilla.org/docs/Web/HTTP/Status/204).

# [Visual Studio](#tab/visual-studio)

* In **Endpoints Explorer**, right-click the **DELETE** endpoint and select **Generate request**.

  A DELETE request is added to `TodoApi.http`.

* Replace `{{id}}` in the DELETE request line with `1`. The DELETE request should look like the following example:

  ```
  DELETE {{TodoApi_HostAddress}}/api/todoitems/{{id}}
  
  ###
  ```

* Select the **Send request** link for the DELETE request.

  The DELETE request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.
  
# [Visual Studio Code](#tab/visual-studio-code)

Use Swagger to send a DELETE request:

* Select **DELETE /api/todoitems/{id}** > **Try it out**.
* Set the **ID** field to `1` and select **Execute**.

  The DELETE request is sent to the app and the response is displayed in the **Responses** pane. The response body is empty, and the **Server response** status code is 204.

---

## Test with other tools

There are many other tools that can be used to test web APIs, for example:

* [http-repl](../web-api/http-repl/index.md)
* [curl](https://terminalcheatsheet.com/guides/curl-rest-api). Swagger uses `curl` and shows the `curl` commands it submits.
* [Fiddler](https://www.telerik.com/fiddler)


<!-- Verify https://go.microsoft.com/fwlink/?linkid=2123754 goes to this H2. Verify the latest released version is on top so this anchor works -->
<a name="over-post"></a>

## Prevent over-posting

Currently the sample app exposes the entire `TodoItem` object. Production apps typically limit the data that's input and returned using a subset of the model. There are multiple reasons behind this, and security is a major one. The subset of a model is usually referred to as a Data Transfer Object (DTO), input model, or view model. **DTO** is used in this tutorial.

A DTO may be used to:

* Prevent over-posting.
* Hide properties that clients are not supposed to view.
* Omit some properties in order to reduce payload size.
* Flatten object graphs that contain nested objects. Flattened object graphs can be more convenient for clients.

To demonstrate the DTO approach, update the `TodoItem` class to include a secret field:

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApiDTO/Models/TodoItem.cs" highlight="8" ::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApiDTO/Models/TodoItem.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApiDTO/Models/TodoItem.cs.md)

The secret field needs to be hidden from this app, but an administrative app could choose to expose it.

Verify you can post and get the secret field.

Create a DTO model in a **Models/TodoItemDTO.cs** file:

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApiDTO/Models/TodoItemDTO.cs" ::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApiDTO/Models/TodoItemDTO.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApiDTO/Models/TodoItemDTO.cs.md)

Update the `TodoItemsController` to use `TodoItemDTO`:

[language="csharp" source="\~/tutorials/first-web-api/samples/9.0/TodoApiDTO/Controllers/TodoItemsController.cs" ::: (complete source file; reference: \~/tutorials/first-web-api/samples/9.0/TodoApiDTO/Controllers/TodoItemsController.cs)](../../_code/aspnetcore/tutorials/first-web-api/samples/9.0/TodoApiDTO/Controllers/TodoItemsController.cs.md)

Verify you can't post or get the secret field.

## Call the web API with JavaScript

See [Tutorial: Call an ASP.NET Core web API with JavaScript](web-api-javascript.md).

## Web API video series

See [Video: Beginner's Series to: Web APIs](https://learn.microsoft.com/shows/beginners-series-to-web-apis/).

## Enterprise web app patterns

For guidance on creating a reliable, secure, performant, testable, and scalable ASP.NET Core app, see [Enterprise web app patterns](https://learn.microsoft.com/azure/architecture/web-apps/guides/enterprise-app-patterns/overview). A complete production-quality sample web app that implements the patterns is available.


<a name="auth"></a>

## Add authentication support to a web API

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* [Microsoft Entra ID](https://learn.microsoft.com/azure/api-management/api-management-howto-protect-backend-with-aad)
* [Duende Identity Server](https://docs.duendesoftware.com)

Duende Identity Server is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende Identity Server enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> [Duende Software](https://duendesoftware.com/) might require you to pay a license fee for production use of Duende Identity Server. For more information, see [migration/50-to-60#project-templates-use-duende-identity-server](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23project-templates-use-duende-identity-server).

For more information, see the [Duende Identity Server documentation (Duende Software website)](https://docs.duendesoftware.com).


## Publish to Azure

For information on deploying to Azure, see [Quickstart: Deploy an ASP.NET web app](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore).

## Additional resources

[View or download sample code for this tutorial](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-web-api/samples). See [how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample).

For more information, see the following resources:

* [web-api/index](../web-api/index.md)
* [tutorials/min-web-api](min-web-api.md)
* [fundamentals/openapi/using-openapi-documents](../fundamentals/openapi/using-openapi-documents.md)
* [tutorials/web-api-help-pages-using-swagger](web-api-help-pages-using-swagger.md)
* [data/ef-rp/intro](../data/ef-rp/intro.md)
* [mvc/controllers/routing](../mvc/controllers/routing.md)
* [web-api/action-return-types](../web-api/action-return-types.md)
* [host-and-deploy/azure-apps/index](../host-and-deploy/azure-apps/index.md)
* [host-and-deploy/index](../host-and-deploy/index.md)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)



**Applies to: \= aspnetcore-7.0**

This tutorial teaches the basics of building a controller-based web API that uses a database. Another approach to creating APIs in ASP.NET Core is to create *Minimal APIs*. For help with choosing between Minimal APIs and controller-based APIs, see [fundamentals/apis](../fundamentals/apis.md). For a tutorial on creating a Minimal API, see [tutorials/min-web-api](min-web-api.md).

## Overview

This tutorial creates the following API:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /api/todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /api/todoitems/{id}` | Get an item by ID | None | To-do item |
| `POST /api/todoitems` | Add a new item | To-do item | To-do item |
| `PUT /api/todoitems/{id}` | Update an existing item &nbsp; | To-do item | None |
| `DELETE /api/todoitems/{id}` &nbsp; &nbsp; | Delete an item &nbsp; &nbsp; | None | None |

The following diagram shows the design of the app.

The client is represented by a box on the left. It submits a request and receives a response from the application, a box drawn on the right. Within the application box, three boxes represent the controller, the model, and the data access layer. The request comes into the application's controller, and read/write operations occur between the controller and the data access layer. The model is serialized and returned to the client in the response.

## Prerequisites

# [Visual Studio](#tab/visual-studio)


* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/#download) with the **ASP.NET and web development** workload.

  VS22 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


# [Visual Studio for Mac](#tab/visual-studio-mac)

* [Visual Studio 2022 for Mac (latest version)](https://learn.microsoft.com/lifecycle/announcements/visual-studio-mac-end-of-servicing)
  
  > **Important:**
> Microsoft has announced the retirement of Visual Studio for Mac. Visual Studio for Mac will no longer be supported starting August 31, 2024. Alternatives include:
>
> * Visual Studio Code with the [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) and related extensions, such as [.NET MAUI](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-maui) and [Unity](https://marketplace.visualstudio.com/items?itemName=visualstudiotoolsforunity.vstuc).
> * Visual Studio IDE running on Windows in a VM on Mac.
> * Visual Studio IDE running on Windows in a [VM in the Cloud](https://aka.ms/devbox).
>
> For more information, see [Visual Studio for Mac retirement announcement](https://devblogs.microsoft.com/visualstudio/visual-studio-for-mac-retirement-announcement).


---

## Create a web project

# [Visual Studio](#tab/visual-studio)

* From the **File** menu, select **New** > **Project**.
* Enter *Web API* in the search box.
* Select the **ASP.NET Core Web API** template and select **Next**.
* In the **Configure your new project dialog**, name the project *TodoApi* and select **Next**.
* In the **Additional information** dialog:
  * Confirm the **Framework** is **.NET 8.0 (Long Term Support)**.
  * Confirm the checkbox for **Use controllers(uncheck to use Minimal APIs)** is checked.
  * Confirm the checkbox for **Enable OpenAPI support** is checked.
  * Select **Create**.

## Add a NuGet package

A NuGet package must be added to support the database used in this tutorial.

* From the **Tools** menu, select **NuGet Package Manager > Manage NuGet Packages for Solution**.
* Select the **Browse** tab.
* Enter **Microsoft.EntityFrameworkCore.InMemory** in the search box, and then select `Microsoft.EntityFrameworkCore.InMemory`.
* Select the **Project** checkbox in the right pane and then select **Install**.

# [Visual Studio Code](#tab/visual-studio-code)

* Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change directories (`cd`) to the folder that will contain the project folder.
* Run the following commands:

   ```dotnetcli
   dotnet new webapi --use-controllers -o TodoApi
   cd TodoApi
   dotnet add package Microsoft.EntityFrameworkCore.InMemory
   code -r ../TodoApi
   ```

  These commands:

  * Create a new web API project and open it in Visual Studio Code.
  * Add a NuGet package that is needed for the next section.
  * Open the *TodoApi* folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

# [Visual Studio for Mac](#tab/visual-studio-mac)

* In Visual Studio for Mac 2022, select **File** > **New Project...**.

* In the **Choose a template for your new project** dialog:
  * Select **Web and Console** > **App** > **API**.
  * Select **Continue**.

* In the **Configure your new API** dialog, make the following selections:
  * Confirm the **Target framework** is **.NET 8.0**.
  * Confirm the checkbox for **Enable OpenAPI support** is checked.
  * Confirm the checkbox for **Use controllers** is checked.
  * Select **Create**.

* Enter the following:
  * **Project name:** TodoApi
  * **Solution name:** TodoApi
  * Select **Create**.

## Add a NuGet package

* In the Visual Studio for Mac 2022 toolbar, select **Project** > **Manage NuGet Packages...**.
* In the search box, enter **Microsoft.EntityFrameworkCore.InMemory**.
* In the results window, check `Microsoft.EntityFrameworkCore.InMemory`.
* Select **Add Package**
* In the **Select Projects** window, select **Ok**.
* In the **License Agreement** window, select **Agree**.

---

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


### Test the project

The project template creates a `WeatherForecast` API with support for [Swagger](web-api-help-pages-using-swagger.md).

# [Visual Studio](#tab/visual-studio)

Press Ctrl+F5 to run without the debugger.

Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio launches the default browser and navigates to `https://localhost:<port>/swagger/index.html`, where `<port>` is a randomly chosen port number set at the project creation.

# [Visual Studio Code](#tab/visual-studio-code)

* Trust the HTTPS development certificate by running the following command:

  ```dotnetcli
  dotnet dev-certs https --trust
  ```
  **Applies to: <=aspnetcore-8.0**

  The preceding command requires .NET 9 or later SDK on Linux. For Linux on .NET 8.0.401 or earlier SDK, see your Linux distribution's documentation for trusting a certificate.



  The preceding command displays the following dialog, provided the certificate was not previously trusted:

  Security warning dialog

* Select **Yes** if you agree to trust the development certificate.

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


Run the app:

* Run the following command to start the app on the `https` profile:

  ```dotnetcli
  dotnet run --launch-profile https
  ```

 The output shows messages similar to the following, indicating that the app is running and awaiting requests:

   ```output
   ...
   info: Microsoft.Hosting.Lifetime[14]
         Now listening on: https://localhost:{port}
   ...
   ```

* <kbd>Ctrl</kbd>+*click* the HTTPS URL in the output to test the web app in a browser.

* The default browser is launched to `https://localhost:<port>/swagger/index.html`, where `<port>` is the randomly chosen port number displayed in the output. There's no endpoint at `https://localhost:<port>`, so the browser returns [HTTP 404 Not Found](https://developer.mozilla.org/docs/Web/HTTP/Status/404). Append `/swagger` to the URL, `https://localhost:<port>/swagger`.

After testing the web app in the following instruction, press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the integrated terminal to shut it down.

# [Visual Studio for Mac](#tab/visual-studio-mac)

Select **Debug** > **Start Debugging** to launch the app. Visual Studio for Mac launches a browser and navigates to `https://localhost:<port>/swagger/index.html`, where `<port>` is a randomly chosen port number set at the project creation.

---

The Swagger page `/swagger/index.html` is displayed. Select **GET** > **Try it out** > **Execute**. The page displays:

* The [Curl](https://curl.haxx.se/) command to test the WeatherForecast API.
* The URL to test the WeatherForecast API.
* The response code, body, and headers.
* A drop-down list box with media types and the example value and schema.

If the Swagger page doesn't appear, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/21647).

Swagger is used to generate useful documentation and help pages for web APIs. This tutorial uses Swagger to test the app. For more information on Swagger, see [tutorials/web-api-help-pages-using-swagger](web-api-help-pages-using-swagger.md).

Copy and paste the **Request URL** in the browser:  `https://localhost:<port>/weatherforecast`

JSON similar to the following example is returned:

```json
[
    {
        "date": "2019-07-16T19:04:05.7257911-06:00",
        "temperatureC": 52,
        "temperatureF": 125,
        "summary": "Mild"
    },
    {
        "date": "2019-07-17T19:04:05.7258461-06:00",
        "temperatureC": 36,
        "temperatureF": 96,
        "summary": "Warm"
    },
    {
        "date": "2019-07-18T19:04:05.7258467-06:00",
        "temperatureC": 39,
        "temperatureF": 102,
        "summary": "Cool"
    },
    {
        "date": "2019-07-19T19:04:05.7258471-06:00",
        "temperatureC": 10,
        "temperatureF": 49,
        "summary": "Bracing"
    },
    {
        "date": "2019-07-20T19:04:05.7258474-06:00",
        "temperatureC": -1,
        "temperatureF": 31,
        "summary": "Chilly"
    }
]
```

## Add a model class

A *model* is a set of classes that represent the data that the app manages. The model for this app is the `TodoItem` class.

# [Visual Studio](#tab/visual-studio)

* In **Solution Explorer**, right-click the project. Select **Add** > **New Folder**. Name the folder `Models`.
* Right-click the `Models` folder and select **Add** > **Class**. Name the class *TodoItem* and select **Add**.
* Replace the template code with the following:

# [Visual Studio Code](#tab/visual-studio-code)

* Add a folder named `Models`.
* Add a `TodoItem.cs` file to the `Models` folder with the following code:

# [Visual Studio for Mac](#tab/visual-studio-mac)

* Control-click the **TodoAPI** project and select **Add** > **New Folder**. Name the folder `Models`.
* Control-click the `Models` folder, and select **Add** > **New Class...** > **General** > **Empty Class**.
* Name the class *TodoItem*, and then select **Create**.

* Replace the template code with the following:

---

  [Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/7.0/TodoApi/Models/TodoItem.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

The `Id` property functions as the unique key in a relational database.

Model classes can go anywhere in the project, but the `Models` folder is used by convention.

## Add a database context

The *database context* is the main class that coordinates Entity Framework functionality for a data model. This class is created by deriving from the [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class.

# [Visual Studio](#tab/visual-studio)

* Right-click the `Models` folder and select **Add** > **Class**. Name the class *TodoContext* and click **Add**.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

* Add a `TodoContext.cs` file to the `Models` folder.

---

* Enter the following code:

  [Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/7.0/TodoApi/Models/TodoContext.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

## Register the database context

In ASP.NET Core, services such as the DB context must be registered with the [dependency injection (DI)](../fundamentals/dependency-injection.md) container. The container provides the service to controllers.

Update `Program.cs` with the following highlighted code:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/7.0/TodoApi/Program.cs?highlight=1-2,7-8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

The preceding code:

* Adds `using` directives.
* Adds the database context to the DI container.
* Specifies that the database context will use an in-memory database.

## Scaffold a controller

# [Visual Studio](#tab/visual-studio)

* Right-click the `Controllers` folder.
* Select **Add** > **New Scaffolded Item**.
* Select **API Controller with actions, using Entity Framework**, and then select **Add**.
* In the **Add API Controller with actions, using Entity Framework** dialog:

  * Select **TodoItem (TodoApi.Models)** in the **Model class**.
  * Select **TodoContext (TodoApi.Models)** in the **Data context class**.
  * Select **Add**.

  If the scaffolding operation fails, select **Add** to try scaffolding a second time.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

Make sure that all of your changes so far are saved.

* Control-click the **TodoAPI** project and select **Open in Terminal**.  The terminal opens at the `TodoAPI` project folder.
Run the following commands:

```dotnetcli
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet tool uninstall -g dotnet-aspnet-codegenerator
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet tool update -g dotnet-aspnet-codegenerator
```

The preceding commands:

* Add NuGet packages required for scaffolding.
* Install the scaffolding engine (`dotnet-aspnet-codegenerator`) after uninstalling any possible previous version.

For Linux, add the .NET tools directory to the system path with the following command:

```Bash
echo 'export PATH=$HOME/.dotnet/tools:$PATH' >> ~/.bashrc
source ~/.bashrc
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


Build the project.

Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator controller -name TodoItemsController -async -api -m TodoItem -dc TodoContext -outDir Controllers
  ```

The preceding command scaffolds the `TodoItemsController`.

---

The generated code:

* Marks the class with the [`[ApiController]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute. This attribute indicates that the controller responds to web API requests. For information about specific behaviors that the attribute enables, see [web-api/index](../web-api/index.md).
* Uses DI to inject the database context (`TodoContext`) into the controller. The database context is used in each of the [CRUD](https://wikipedia.org/wiki/Create,_read,_update_and_delete) methods in the controller.

The ASP.NET Core templates for:

* Controllers with views include `[action]` in the route template.
* API controllers don't include `[action]` in the route template.

When the `[action]` token isn't in the route template, the [action](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23action) name (method name) isn't included in the endpoint. That is, the action's associated method name isn't used in the matching route.

Open the generated `Controllers/TodoItemsController.cs` file to review the scaffolded code. Scaffolding generates a complete, working controller with action methods that create, read, update, and delete `TodoItem` data:

* `GetTodoItems`: Get all to-do items.
* `GetTodoItem`: Get a to-do item by ID.
* `PostTodoItem`: Create a to-do item.
* `PutTodoItem`: Update an existing to-do item.
* `DeleteTodoItem`: Delete a to-do item.

The following sections examine these generated methods, starting with `PostTodoItem`.

## Examine the `PostTodoItem` create method

Examine the scaffolded `PostTodoItem` method, which already works as generated. The return statement uses the [nameof](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/nameof) operator so the action name isn't hard-coded as a string. The commented-out line shows the equivalent hard-coded form that `nameof` replaces:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/7.0/TodoApi/Controllers/TodoItemsController.cs?name=snippet_Create](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

The preceding code is an `HTTP POST` method, as indicated by the [`[HttpPost]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPostAttribute) attribute. The method gets the value of the `TodoItem` from the body of the HTTP request.

For more information, see [Attribute routing with Http\[Verb\] attributes](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23verb).

The [Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%252A) method:

* Returns an [HTTP 201 status code](https://developer.mozilla.org/docs/Web/HTTP/Status/201) if successful. `HTTP 201` is the standard response for an `HTTP POST` method that creates a new resource on the server.
* Adds a [Location](https://developer.mozilla.org/docs/Web/HTTP/Headers/Location) header to the response. The `Location` header specifies the [URI](https://developer.mozilla.org/docs/Glossary/URI) of the newly created to-do item. For more information, see [10.2.2 201 Created](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.2).
* References the `GetTodoItem` action to create the `Location` header's URI.

<a name="post7"></a>

### Test PostTodoItem

* Press Ctrl+F5 to run the app.
* In the Swagger browser window, select **POST /api/TodoItems**, and then select **Try it out**.
* In the **Request body** input window, update the JSON. For example,
  
  ```JSON
  {
    "name": "walk dog",
    "isComplete": true
  }
  ```

* Select **Execute**

  Swagger POST

### Test the location header URI

In the preceding POST, the Swagger UI shows the [location header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Location) under **Response headers**. For example, `location: https://localhost:7260/api/TodoItems/1`. The location header shows the URI to the created resource.

To test the location header:

* In the Swagger browser window, select **GET /api/TodoItems/{id}**, and then select **Try it out**.
* Enter `1` in the `id` input box, and then select **Execute**.

  Swagger GET

## Examine the GET methods

Two GET endpoints are implemented:

* `GET /api/todoitems`
* `GET /api/todoitems/{id}`

The previous section showed an example of the `/api/todoitems/{id}` route.

Follow the [POST](#post7) instructions to add another todo item, and then test the `/api/todoitems` route using Swagger.

This app uses an in-memory database. If the app is stopped and started, the preceding GET request doesn't return any data. If no data is returned, [POST](#post7) data to the app.

## Routing and URL paths

The [`[HttpGet]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpGetAttribute) attribute denotes a method that responds to an `HTTP GET` request. The URL path for each method is constructed as follows:

* Start with the template string in the controller's `Route` attribute:

  [Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/6.0/TodoApi/Controllers/TodoItemsController.cs?name=snippet_Route\\&highlight=1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

* Replace `[controller]` with the name of the controller, which by convention is the controller class name minus the "Controller" suffix. For this sample, the controller class name is **TodoItems**Controller, so the controller name is "TodoItems". ASP.NET Core [routing](../mvc/controllers/routing.md) is case insensitive.
* If the `[HttpGet]` attribute has a route template (for example, `[HttpGet("products")]`), append that to the path. This sample doesn't use a template. For more information, see [Attribute routing with Http\[Verb\] attributes](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23verb).

In the following `GetTodoItem` method, `"{id}"` is a placeholder variable for the unique identifier of the to-do item. When `GetTodoItem` is invoked, the value of `"{id}"` in the URL is provided to the method in its `id` parameter.

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/7.0/TodoApi/Controllers/TodoItemsController.cs?name=snippet_GetByID\\&highlight=1-2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

## Return values

The return type of the `GetTodoItems` and `GetTodoItem` methods is [ActionResult\<T> type](https://learn.microsoft.com/search/?terms=web-api%2Faction-return-types%23actionresultt-type). ASP.NET Core automatically serializes the object to [JSON](https://www.json.org/) and writes the JSON into the body of the response message. The response code for this return type is [200 OK](https://developer.mozilla.org/docs/Web/HTTP/Status/200), assuming there are no unhandled exceptions. Unhandled exceptions are translated into 5xx errors.

`ActionResult` return types can represent a wide range of HTTP status codes. For example, `GetTodoItem` can return two different status values:

* If no item matches the requested ID, the method returns a [404 status](https://developer.mozilla.org/docs/Web/HTTP/Status/404) [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) error code.
* Otherwise, the method returns 200 with a JSON response body. Returning `item` results in an `HTTP 200` response.

## The PutTodoItem method

Examine the `PutTodoItem` method:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/7.0/TodoApi/Controllers/TodoItemsController.cs?name=snippet_Update](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

`PutTodoItem` is similar to `PostTodoItem`, except it uses `HTTP PUT`. The response is [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204). According to the HTTP specification, a `PUT` request requires the client to send the entire updated entity, not just the changes. To support partial updates, use [HTTP PATCH](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPatchAttribute).

### Test the PutTodoItem method

This sample uses an in-memory database that must be initialized each time the app is started. There must be an item in the database before you make a PUT call. Call GET to ensure there's an item in the database before making a PUT call.

Using the Swagger UI, use the PUT button to update the `TodoItem` that has Id = 1 and set its name to `"feed fish"`. Note the response is [`HTTP 204 No Content`](https://developer.mozilla.org/docs/Web/HTTP/Status/204).

## The DeleteTodoItem method

Examine the `DeleteTodoItem` method:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/6.0/TodoApi/Controllers/TodoItemsController.cs?name=snippet_Delete](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

### Test the DeleteTodoItem method

Use the Swagger UI to delete the `TodoItem` that has Id = 1. Note the response is [`HTTP 204 No Content`](https://developer.mozilla.org/docs/Web/HTTP/Status/204).

## Test with other tools

There are many other tools that can be used to test web APIs, for example:

* [Visual Studio Endpoints Explorer and .http files](../test/http-files.md)
* [http-repl](../web-api/http-repl/index.md)
* [curl](https://terminalcheatsheet.com/guides/curl-rest-api). Swagger uses `curl` and shows the `curl` commands it submits.
* [Fiddler](https://www.telerik.com/fiddler)

For more information, see:

* [Minimal API tutorial: test with .http files and Endpoints Explorer](min-web-api.md)

<!-- Verify https://go.microsoft.com/fwlink/?linkid=2123754 goes to this H2. Verify the latest released version is on top so this anchor works -->
<a name="over-post"></a>

## Prevent over-posting

Currently the sample app exposes the entire `TodoItem` object. Production apps typically limit the data that's input and returned using a subset of the model. There are multiple reasons behind this, and security is a major one. The subset of a model is usually referred to as a Data Transfer Object (DTO), input model, or view model. **DTO** is used in this tutorial.

A DTO may be used to:

* Prevent over-posting.
* Hide properties that clients are not supposed to view.
* Omit some properties in order to reduce payload size.
* Flatten object graphs that contain nested objects. Flattened object graphs can be more convenient for clients.

To demonstrate the DTO approach, update the `TodoItem` class to include a secret field:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/6.0/TodoApiDTO/Models/TodoItem.cs?highlight=8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

The secret field needs to be hidden from this app, but an administrative app could choose to expose it.

Verify you can post and get the secret field.

Create a DTO model:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/7.0/TodoApiDTO/Models/TodoItemDTO.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

Update the `TodoItemsController` to use `TodoItemDTO`:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/7.0/TodoApiDTO/Controllers/TodoItemsController.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

Verify you can't post or get the secret field.

## Call the web API with JavaScript

See [Tutorial: Call an ASP.NET Core web API with JavaScript](web-api-javascript.md).

## Web API video series

See [Video: Beginner's Series to: Web APIs](https://learn.microsoft.com/shows/beginners-series-to-web-apis/).

## Enterprise web app patterns

For guidance on creating a reliable, secure, performant, testable, and scalable ASP.NET Core app, see [Enterprise web app patterns](https://learn.microsoft.com/azure/architecture/web-apps/guides/enterprise-app-patterns/overview). A complete production-quality sample web app that implements the patterns is available.


<a name="auth"></a>

## Add authentication support to a web API

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* [Microsoft Entra ID](https://learn.microsoft.com/azure/api-management/api-management-howto-protect-backend-with-aad)
* [Duende Identity Server](https://docs.duendesoftware.com)

Duende Identity Server is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende Identity Server enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> [Duende Software](https://duendesoftware.com/) might require you to pay a license fee for production use of Duende Identity Server. For more information, see [migration/50-to-60#project-templates-use-duende-identity-server](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23project-templates-use-duende-identity-server).

For more information, see the [Duende Identity Server documentation (Duende Software website)](https://docs.duendesoftware.com).


## Publish to Azure

For information on deploying to Azure, see [Quickstart: Deploy an ASP.NET web app](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore).

## Additional resources

[View or download sample code for this tutorial](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-web-api/samples). See [how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample).

For more information, see the following resources:

* [web-api/index](../web-api/index.md)
* [tutorials/min-web-api](min-web-api.md)
* [tutorials/web-api-help-pages-using-swagger](web-api-help-pages-using-swagger.md)
* [data/ef-rp/intro](../data/ef-rp/intro.md)
* [mvc/controllers/routing](../mvc/controllers/routing.md)
* [web-api/action-return-types](../web-api/action-return-types.md)
* [host-and-deploy/azure-apps/index](../host-and-deploy/azure-apps/index.md)
* [host-and-deploy/index](../host-and-deploy/index.md)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)



**Applies to: \= aspnetcore-8.0**

This tutorial teaches the basics of building a controller-based web API that uses a database. Another approach to creating APIs in ASP.NET Core is to create *Minimal APIs*. For help with choosing between Minimal APIs and controller-based APIs, see [fundamentals/apis](../fundamentals/apis.md). For a tutorial on creating a Minimal API, see [tutorials/min-web-api](min-web-api.md).

## Overview

This tutorial creates the following API:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /api/todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /api/todoitems/{id}` | Get an item by ID | None | To-do item |
| `POST /api/todoitems` | Add a new item | To-do item | To-do item |
| `PUT /api/todoitems/{id}` | Update an existing item &nbsp; | To-do item | None |
| `DELETE /api/todoitems/{id}` &nbsp; &nbsp; | Delete an item &nbsp; &nbsp; | None | None |

The following diagram shows the design of the app.

The client is represented by a box on the left. It submits a request and receives a response from the application, a box drawn on the right. Within the application box, three boxes represent the controller, the model, and the data access layer. The request comes into the application's controller, and read/write operations occur between the controller and the data access layer. The model is serialized and returned to the client in the response.

## Prerequisites

# [Visual Studio](#tab/visual-studio)


* [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) with the **ASP.NET and web development** workload.

  VS22 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


---

## Create a web project

# [Visual Studio](#tab/visual-studio)

* From the **File** menu, select **New** > **Project**.
* Enter *Web API* in the search box.
* Select the **ASP.NET Core Web API** template and select **Next**.
* In the **Configure your new project dialog**, name the project *TodoApi* and select **Next**.
* In the **Additional information** dialog:
  * Confirm the **Framework** is **.NET 8.0 (Long Term Support)**.
  * Confirm the checkbox for **Use controllers(uncheck to use Minimal APIs)** is checked.
  * Confirm the checkbox for **Enable OpenAPI support** is checked.
  * Select **Create**.

## Add a NuGet package

A NuGet package must be added to support the database used in this tutorial.

* From the **Tools** menu, select **NuGet Package Manager > Manage NuGet Packages for Solution**.
* Select the **Browse** tab.
* Enter **Microsoft.EntityFrameworkCore.InMemory** in the search box, and then select `Microsoft.EntityFrameworkCore.InMemory`.
* Select the **Project** checkbox in the right pane and then select **Install**.

# [Visual Studio Code](#tab/visual-studio-code)

* Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change directories (`cd`) to the folder that will contain the project folder.
* Run the following commands:

   ```dotnetcli
   dotnet new webapi --use-controllers -o TodoApi
   cd TodoApi
   dotnet add package Microsoft.EntityFrameworkCore.InMemory
   code -r ../TodoApi
   ```

  These commands:

  * Create a new web API project and open it in Visual Studio Code.
  * Add a NuGet package that is needed for the next section.
  * Open the *TodoApi* folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

---

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at [Package consumption workflow (NuGet documentation)](https://learn.microsoft.com/nuget/consume-packages/overview-and-workflow). Confirm correct package versions at [NuGet.org](https://www.nuget.org).


### Test the project

The project template creates a `WeatherForecast` API with support for [Swagger](web-api-help-pages-using-swagger.md).

# [Visual Studio](#tab/visual-studio)

Press Ctrl+F5 to run without the debugger.

Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio launches the default browser and navigates to `https://localhost:<port>/swagger/index.html`, where `<port>` is a randomly chosen port number set at the project creation.

# [Visual Studio Code](#tab/visual-studio-code)

* Trust the HTTPS development certificate by running the following command:

  ```dotnetcli
  dotnet dev-certs https --trust
  ```
  **Applies to: <=aspnetcore-8.0**

  The preceding command requires .NET 9 or later SDK on Linux. For Linux on .NET 8.0.401 or earlier SDK, see your Linux distribution's documentation for trusting a certificate.



  The preceding command displays the following dialog, provided the certificate was not previously trusted:

  Security warning dialog

* Select **Yes** if you agree to trust the development certificate.

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


Run the app:

* Run the following command to start the app on the `https` profile:

  ```dotnetcli
  dotnet run --launch-profile https
  ```

 The output shows messages similar to the following, indicating that the app is running and awaiting requests:

   ```output
   ...
   info: Microsoft.Hosting.Lifetime[14]
         Now listening on: https://localhost:{port}
   ...
   ```

* <kbd>Ctrl</kbd>+*click* the HTTPS URL in the output to test the web app in a browser.

* The default browser is launched to `https://localhost:<port>/swagger/index.html`, where `<port>` is the randomly chosen port number displayed in the output. There's no endpoint at `https://localhost:<port>`, so the browser returns [HTTP 404 Not Found](https://developer.mozilla.org/docs/Web/HTTP/Status/404). Append `/swagger` to the URL, `https://localhost:<port>/swagger`.

After testing the web app in the following instruction, press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the integrated terminal to shut it down.

---

The Swagger page `/swagger/index.html` is displayed. Select **GET** > **Try it out** > **Execute**. The page displays:

* The [Curl](https://curl.haxx.se/) command to test the WeatherForecast API.
* The URL to test the WeatherForecast API.
* The response code, body, and headers.
* A drop-down list box with media types and the example value and schema.

If the Swagger page doesn't appear, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/21647).

Swagger is used to generate useful documentation and help pages for web APIs. This tutorial uses Swagger to test the app. For more information on Swagger, see [tutorials/web-api-help-pages-using-swagger](web-api-help-pages-using-swagger.md).

Copy and paste the **Request URL** in the browser:  `https://localhost:<port>/weatherforecast`

JSON similar to the following example is returned:

```json
[
    {
        "date": "2019-07-16T19:04:05.7257911-06:00",
        "temperatureC": 52,
        "temperatureF": 125,
        "summary": "Mild"
    },
    {
        "date": "2019-07-17T19:04:05.7258461-06:00",
        "temperatureC": 36,
        "temperatureF": 96,
        "summary": "Warm"
    },
    {
        "date": "2019-07-18T19:04:05.7258467-06:00",
        "temperatureC": 39,
        "temperatureF": 102,
        "summary": "Cool"
    },
    {
        "date": "2019-07-19T19:04:05.7258471-06:00",
        "temperatureC": 10,
        "temperatureF": 49,
        "summary": "Bracing"
    },
    {
        "date": "2019-07-20T19:04:05.7258474-06:00",
        "temperatureC": -1,
        "temperatureF": 31,
        "summary": "Chilly"
    }
]
```

## Add a model class

A *model* is a set of classes that represent the data that the app manages. The model for this app is the `TodoItem` class.

# [Visual Studio](#tab/visual-studio)

* In **Solution Explorer**, right-click the project. Select **Add** > **New Folder**. Name the folder `Models`.
* Right-click the `Models` folder and select **Add** > **Class**. Name the class *TodoItem* and select **Add**.
* Replace the template code with the following:

# [Visual Studio Code](#tab/visual-studio-code)

* Add a folder named `Models`.
* Add a `TodoItem.cs` file to the `Models` folder with the following code:

---

  [Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/8.0/TodoApi/Models/TodoItem.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

The `Id` property functions as the unique key in a relational database.

Model classes can go anywhere in the project, but the `Models` folder is used by convention.

## Add a database context

The *database context* is the main class that coordinates Entity Framework functionality for a data model. This class is created by deriving from the [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class.

# [Visual Studio](#tab/visual-studio)

* Right-click the `Models` folder and select **Add** > **Class**. Name the class *TodoContext* and click **Add**.

# [Visual Studio Code](#tab/visual-studio-code)

* Add a `TodoContext.cs` file to the `Models` folder.

---

* Enter the following code:

  [Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/8.0/TodoApi/Models/TodoContext.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

## Register the database context

In ASP.NET Core, services such as the DB context must be registered with the [dependency injection (DI)](../fundamentals/dependency-injection.md) container. The container provides the service to controllers.

Update `Program.cs` with the following highlighted code:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/8.0/TodoApi/Program.cs?highlight=1-2,7-8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

The preceding code:

* Adds `using` directives.
* Adds the database context to the DI container.
* Specifies that the database context will use an in-memory database.

## Scaffold a controller

# [Visual Studio](#tab/visual-studio)

* Right-click the `Controllers` folder.
* Select **Add** > **New Scaffolded Item**.
* Select **API Controller with actions, using Entity Framework**, and then select **Add**.
* In the **Add API Controller with actions, using Entity Framework** dialog:

  * Select **TodoItem (TodoApi.Models)** in the **Model class**.
  * Select **TodoContext (TodoApi.Models)** in the **Data context class**.
  * Select **Add**.

  If the scaffolding operation fails, select **Add** to try scaffolding a second time.

# [Visual Studio Code](#tab/visual-studio-code)

Make sure that all of your changes so far are saved.

* Control-click the **TodoAPI** project and select **Open in Terminal**.  The terminal opens at the `TodoAPI` project folder.
Run the following commands:

```dotnetcli
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet tool uninstall -g dotnet-aspnet-codegenerator
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet tool update -g dotnet-aspnet-codegenerator
```

The preceding commands:

* Add NuGet packages required for scaffolding.
* Install the scaffolding engine (`dotnet-aspnet-codegenerator`) after uninstalling any possible previous version.

For Linux, add the .NET tools directory to the system path with the following command:

```Bash
echo 'export PATH=$HOME/.dotnet/tools:$PATH' >> ~/.bashrc
source ~/.bashrc
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


Build the project.

Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator controller -name TodoItemsController -async -api -m TodoItem -dc TodoContext -outDir Controllers
  ```

The preceding command scaffolds the `TodoItemsController`.

---

The generated code:

* Marks the class with the [`[ApiController]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ApiControllerAttribute) attribute. This attribute indicates that the controller responds to web API requests. For information about specific behaviors that the attribute enables, see [web-api/index](../web-api/index.md).
* Uses DI to inject the database context (`TodoContext`) into the controller. The database context is used in each of the [CRUD](https://wikipedia.org/wiki/Create,_read,_update_and_delete) methods in the controller.

The ASP.NET Core templates for:

* Controllers with views include `[action]` in the route template.
* API controllers don't include `[action]` in the route template.

When the `[action]` token isn't in the route template, the [action](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23action) name (method name) isn't included in the endpoint. That is, the action's associated method name isn't used in the matching route.

Open the generated `Controllers/TodoItemsController.cs` file to review the scaffolded code. Scaffolding generates a complete, working controller with action methods that create, read, update, and delete `TodoItem` data:

* `GetTodoItems`: Get all to-do items.
* `GetTodoItem`: Get a to-do item by ID.
* `PostTodoItem`: Create a to-do item.
* `PutTodoItem`: Update an existing to-do item.
* `DeleteTodoItem`: Delete a to-do item.

The following sections examine these generated methods, starting with `PostTodoItem`.

## Examine the `PostTodoItem` create method

Examine the scaffolded `PostTodoItem` method. The generated code already works. The return statement uses the [nameof](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/nameof) operator so the action name isn't hard-coded as a string. The commented-out line shows the equivalent hard-coded form that `nameof` replaces:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/8.0/TodoApi/Controllers/TodoItemsController.cs?name=snippet_Create](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

The preceding code is an `HTTP POST` method, as indicated by the [`[HttpPost]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPostAttribute) attribute. The method gets the value of the `TodoItem` from the body of the HTTP request.

For more information, see [Attribute routing with Http\[Verb\] attributes](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23verb).

The [Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.CreatedAtAction%252A) method:

* Returns an [HTTP 201 status code](https://developer.mozilla.org/docs/Web/HTTP/Status/201) if successful. `HTTP 201` is the standard response for an `HTTP POST` method that creates a new resource on the server.
* Adds a [Location](https://developer.mozilla.org/docs/Web/HTTP/Headers/Location) header to the response. The `Location` header specifies the [URI](https://developer.mozilla.org/docs/Glossary/URI) of the newly created to-do item. For more information, see [10.2.2 201 Created](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.2).
* References the `GetTodoItem` action to create the `Location` header's URI.

<a name="post7"></a>

### Test PostTodoItem

* Press Ctrl+F5 to run the app.
* In the Swagger browser window, select **POST /api/TodoItems**, and then select **Try it out**.
* In the **Request body** input window, update the JSON. For example,
  
  ```JSON
  {
    "name": "walk dog",
    "isComplete": true
  }
  ```

* Select **Execute**

  Swagger POST

### Test the location header URI

In the preceding POST, the Swagger UI shows the [location header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Location) under **Response headers**. For example, `location: https://localhost:7260/api/TodoItems/1`. The location header shows the URI to the created resource.

To test the location header:

* In the Swagger browser window, select **GET /api/TodoItems/{id}**, and then select **Try it out**.
* Enter `1` in the `id` input box, and then select **Execute**.

  Swagger GET

## Examine the GET methods

Two GET endpoints are implemented:

* `GET /api/todoitems`
* `GET /api/todoitems/{id}`

The previous section showed an example of the `/api/todoitems/{id}` route.

Follow the [POST](#post7) instructions to add another todo item, and then test the `/api/todoitems` route using Swagger.

This app uses an in-memory database. If the app is stopped and started, the preceding GET request doesn't return any data. If no data is returned, [POST](#post7) data to the app.

## Routing and URL paths

The [`[HttpGet]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpGetAttribute) attribute denotes a method that responds to an `HTTP GET` request. The URL path for each method is constructed as follows:

* Start with the template string in the controller's `Route` attribute:

  [Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/6.0/TodoApi/Controllers/TodoItemsController.cs?name=snippet_Route\\&highlight=1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

* Replace `[controller]` with the name of the controller, which by convention is the controller class name minus the "Controller" suffix. For this sample, the controller class name is **TodoItems**Controller, so the controller name is "TodoItems". ASP.NET Core [routing](../mvc/controllers/routing.md) is case insensitive.
* If the `[HttpGet]` attribute has a route template (for example, `[HttpGet("products")]`), append that to the path. This sample doesn't use a template. For more information, see [Attribute routing with Http\[Verb\] attributes](https://learn.microsoft.com/search/?terms=mvc%2Fcontrollers%2Frouting%23verb).

In the following `GetTodoItem` method, `"{id}"` is a placeholder variable for the unique identifier of the to-do item. When `GetTodoItem` is invoked, the value of `"{id}"` in the URL is provided to the method in its `id` parameter.

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/8.0/TodoApi/Controllers/TodoItemsController.cs?name=snippet_GetByID\\&highlight=1-2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

## Return values

The return type of the `GetTodoItems` and `GetTodoItem` methods is [ActionResult\<T> type](https://learn.microsoft.com/search/?terms=web-api%2Faction-return-types%23actionresultt-type). ASP.NET Core automatically serializes the object to [JSON](https://www.json.org/) and writes the JSON into the body of the response message. The response code for this return type is [200 OK](https://developer.mozilla.org/docs/Web/HTTP/Status/200), assuming there are no unhandled exceptions. Unhandled exceptions are translated into 5xx errors.

`ActionResult` return types can represent a wide range of HTTP status codes. For example, `GetTodoItem` can return two different status values:

* If no item matches the requested ID, the method returns a [404 status](https://developer.mozilla.org/docs/Web/HTTP/Status/404) [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) error code.
* Otherwise, the method returns 200 with a JSON response body. Returning `item` results in an `HTTP 200` response.

## The PutTodoItem method

Examine the `PutTodoItem` method:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/8.0/TodoApi/Controllers/TodoItemsController.cs?name=snippet_Update](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

`PutTodoItem` is similar to `PostTodoItem`, except it uses `HTTP PUT`. The response is [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204). According to the HTTP specification, a `PUT` request requires the client to send the entire updated entity, not just the changes. To support partial updates, use [HTTP PATCH](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPatchAttribute).

### Test the PutTodoItem method

This sample uses an in-memory database that must be initialized each time the app is started. There must be an item in the database before you make a PUT call. Call GET to ensure there's an item in the database before making a PUT call.

Using the Swagger UI, use the PUT button to update the `TodoItem` that has Id = 1 and set its name to `"feed fish"`. Note the response is [`HTTP 204 No Content`](https://developer.mozilla.org/docs/Web/HTTP/Status/204).

## The DeleteTodoItem method

Examine the `DeleteTodoItem` method:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/6.0/TodoApi/Controllers/TodoItemsController.cs?name=snippet_Delete](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

### Test the DeleteTodoItem method

Use the Swagger UI to delete the `TodoItem` that has Id = 1. Note the response is [`HTTP 204 No Content`](https://developer.mozilla.org/docs/Web/HTTP/Status/204).

## Test with other tools

There are many other tools that can be used to test web APIs, for example:

* [Visual Studio Endpoints Explorer and .http files](../test/http-files.md)
* [http-repl](../web-api/http-repl/index.md)
* [curl](https://terminalcheatsheet.com/guides/curl-rest-api). Swagger uses `curl` and shows the `curl` commands it submits.
* [Fiddler](https://www.telerik.com/fiddler)

For more information, see:

* [Minimal API tutorial: test with .http files and Endpoints Explorer](min-web-api.md)

<!-- Verify https://go.microsoft.com/fwlink/?linkid=2123754 goes to this H2. Verify the latest released version is on top so this anchor works -->
<a name="over-post"></a>

## Prevent over-posting

Currently the sample app exposes the entire `TodoItem` object. Production apps typically limit the data that's input and returned using a subset of the model. There are multiple reasons behind this, and security is a major one. The subset of a model is usually referred to as a Data Transfer Object (DTO), input model, or view model. **DTO** is used in this tutorial.

A DTO may be used to:

* Prevent over-posting.
* Hide properties that clients are not supposed to view.
* Omit some properties in order to reduce payload size.
* Flatten object graphs that contain nested objects. Flattened object graphs can be more convenient for clients.

To demonstrate the DTO approach, update the `TodoItem` class to include a secret field:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/6.0/TodoApiDTO/Models/TodoItem.cs?highlight=8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

The secret field needs to be hidden from this app, but an administrative app could choose to expose it.

Verify you can post and get the secret field.

Create a DTO model:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/8.0/TodoApiDTO/Models/TodoItemDTO.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

Update the `TodoItemsController` to use `TodoItemDTO`:

[Code reference unavailable in this source snapshot: first-web-api/includes/~/tutorials/first-web-api/samples/8.0/TodoApiDTO/Controllers/TodoItemsController.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-web-api.md)

Verify you can't post or get the secret field.

## Call the web API with JavaScript

See [Tutorial: Call an ASP.NET Core web API with JavaScript](web-api-javascript.md).

## Web API video series

See [Video: Beginner's Series to: Web APIs](https://learn.microsoft.com/shows/beginners-series-to-web-apis/).

## Enterprise web app patterns

For guidance on creating a reliable, secure, performant, testable, and scalable ASP.NET Core app, see [Enterprise web app patterns](https://learn.microsoft.com/azure/architecture/web-apps/guides/enterprise-app-patterns/overview). A complete production-quality sample web app that implements the patterns is available.


<a name="auth"></a>

## Add authentication support to a web API

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* [Microsoft Entra ID](https://learn.microsoft.com/azure/api-management/api-management-howto-protect-backend-with-aad)
* [Duende Identity Server](https://docs.duendesoftware.com)

Duende Identity Server is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende Identity Server enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> [Duende Software](https://duendesoftware.com/) might require you to pay a license fee for production use of Duende Identity Server. For more information, see [migration/50-to-60#project-templates-use-duende-identity-server](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23project-templates-use-duende-identity-server).

For more information, see the [Duende Identity Server documentation (Duende Software website)](https://docs.duendesoftware.com).


## Publish to Azure

For information on deploying to Azure, see [Quickstart: Deploy an ASP.NET web app](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore).

## Additional resources

[View or download sample code for this tutorial](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-web-api/samples). See [how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample).

For more information, see the following resources:

* [web-api/index](../web-api/index.md)
* [tutorials/min-web-api](min-web-api.md)
* [tutorials/web-api-help-pages-using-swagger](web-api-help-pages-using-swagger.md)
* [data/ef-rp/intro](../data/ef-rp/intro.md)
* [mvc/controllers/routing](../mvc/controllers/routing.md)
* [web-api/action-return-types](../web-api/action-return-types.md)
* [host-and-deploy/azure-apps/index](../host-and-deploy/azure-apps/index.md)
* [host-and-deploy/index](../host-and-deploy/index.md)
* [Create a web API with ASP.NET Core](https://learn.microsoft.com/training/modules/build-web-api-aspnet-core/)
