---
title: "Tutorial: Create a Minimal API with ASP.NET Core"
author: wadepickett
description: Create a Minimal API with ASP.NET Core using Visual Studio or Visual Studio Code. This tutorial covers GET, POST, PUT, PATCH, and DELETE endpoints for a to-do app.
ai-usage: ai-assisted
ms.author: wpickett
ms.reviewer: wpickett
ms.date: 06/28/2026
monikerRange: '>= aspnetcore-6.0'
uid: tutorials/min-web-api
---

# Tutorial: Create a Minimal API with ASP.NET Core

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


By [Wade Pickett](https://github.com/wadepickett) and [Tom Dykstra](https://github.com/tdykstra)

**Applies to: \>= aspnetcore-10.0**

Minimal APIs are designed to create HTTP APIs with minimal dependencies. They're ideal for microservices and apps that want to include only the minimum files, features, and dependencies in ASP.NET Core.

This tutorial teaches the basics of building a Minimal API with ASP.NET Core. Another approach to creating APIs in ASP.NET Core is to use controllers. For help with choosing between Minimal APIs and controller-based APIs, see [fundamentals/apis](../fundamentals/apis.md). For a tutorial on creating an API project based on [controllers](../web-api/index.md) that contains more features, see [Create a web API](first-web-api.md).

## Overview

This tutorial creates the following API:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /todoitems/complete` | Get completed to-do items | None | Array of to-do items |
| `GET /todoitems/{id}` | Get an item by ID | None | To-do item |
| `POST /todoitems` | Add a new item | To-do item | To-do item |
| `PUT /todoitems/{id}` | Update an existing item &nbsp; | To-do item | None |
| `PATCH /todoitems/{id}` | Partially update an item &nbsp; | Partial to-do item | None |
| `DELETE /todoitems/{id}` &nbsp; &nbsp; | Delete an item &nbsp; &nbsp; | None | None |

## Prerequisites

# [Visual Studio](#tab/visual-studio)

* [The latest version of Visual Studio](https://visualstudio.microsoft.com/downloads/) with the **ASP.NET and web development** workload.

  VS26 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# Dev Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
* [.NET 10.0 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)


You can follow the Visual Studio Code instructions on macOS, Linux, or Windows. Changes may be required if you use an integrated development environment (IDE) other than Visual Studio Code.


---

## Create an API project

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio 2026 and select **Create a new project**.
* In the **Create a new project** dialog:
  * Select the **ASP.NET Core Web API** project type, and select **Next**.
  * Name the project *TodoApi*, and select **Next**.
* In the **Additional information** dialog:
   * Confirm the **Framework** is **.NET 10.0 (Long Term Support)**.
   * Confirm the checkbox for **Enable OpenAPI support** is checked.
   * Confirm the checkbox for **Use controllers** is **not** checked. Uncheck this setting to create a Minimal API project as required for this tutorial rather than a controller-based one.
   * Select **Create**.

  Additional information

# [Visual Studio Code](#tab/visual-studio-code)

* Start Visual Studio Code, select **View**, and then select **Terminal** to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change directory (`cd`) to the folder where you want to create the project.
* Run the following commands:

```dotnetcli
  dotnet new webapi -o TodoApi
  code -r TodoApi
```

* When a dialog box asks if you want to trust the authors, select **Yes**.
* When a dialog box asks if you want to add required assets to the project, select **Yes**.

  The preceding commands create a new web API project and open it in Visual Studio Code.

---

### Examine the code

The `Program.cs` file generated by the template contains the following code:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_templatestart"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs" id="snippet_templatestart"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs.md)

---

The preceding code:

* Creates a [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) and a [Microsoft.AspNetCore.Builder.WebApplication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication) with preconfigured defaults.
* Registers the in-box OpenAPI document generator by using `builder.Services.AddOpenApi()`.
* Maps the generated OpenAPI document at `/openapi/v1.json` by using `app.MapOpenApi()`, in the Development environment only.
* Defines a sample `GET /weatherforecast` endpoint that returns five randomly generated `WeatherForecast` records.

In this tutorial, you replace the `WeatherForecast` with a new Todo sample, with endpoints to create, read, update, and delete items, backed by a model and a database.

## Add NuGet packages

Add NuGet packages to support the database used in this tutorial.

# [Visual Studio](#tab/visual-studio)

* From the **Tools** menu, select **NuGet Package Manager > Manage NuGet Packages for Solution**.
* Select the **Browse** tab.
* Enter **Microsoft.EntityFrameworkCore.InMemory** in the search box, and then select `Microsoft.EntityFrameworkCore.InMemory`.
* Select the **Project** checkbox in the right pane and then select **Install**.

# [Visual Studio Code](#tab/visual-studio-code)

* Run the following command:

```dotnetcli
  dotnet add package Microsoft.EntityFrameworkCore.InMemory
```

---

<a name="model-db-classes"></a> 

## The model and database context classes

* In the project folder, create a file named `Todo.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Todo.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Todo.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Todo.cs.md)

The preceding code creates the model for this app. A *model* is a class that represents data that the app manages.

The `Secret` property is included to demonstrate a common real-world need: data the app stores and uses internally, such as the ID of the user who owns the item, that you don't want clients to see or set. In the [Prevent over-posting](#prevent-over-posting) step later in this tutorial, you use a Data Transfer Object (DTO) to keep fields like `Secret` out of the API's input and responses.

* Create a file named `TodoDb.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/TodoDb.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/TodoDb.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/TodoDb.cs.md)

The preceding code defines the *database context*, which is the main class that coordinates [Entity Framework](https://learn.microsoft.com/ef/core/) functionality for a data model. This class derives from the [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class.

The app uses an in-memory database named `TodoList`. The database is registered later in `Program.cs` with `builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));`, where the string `"TodoList"` is the database name. Because the data is stored in memory, it's reset every time the app restarts.

## Replace the `WeatherForecast` sample with the Todo API

The `webapi` template adds a sample `GET /weatherforecast` endpoint to `Program.cs` and a `WeatherForecast` record at the bottom of the file. The sample is just a placeholder to show the template works - replace both with the Todo endpoints described in the following section.

* Replace all of the code in `Program.cs` with the following. The `WeatherForecast` sample endpoint and record are removed, and the Todo endpoints take their place:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_minimal_start_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs" id="snippet_minimal_start_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs.md)

The pasted code also includes `using Scalar.AspNetCore;` and `app.MapScalarApiReference();`, which add a browser UI for testing the API. You configure the Scalar package for these lines later in this tutorial, in [Add a browser UI to view the OpenAPI document](#add-a-browser-ui-to-view-the-openapi-document). The project won't build until then.

---

The OpenAPI lines that the template adds (`builder.Services.AddOpenApi()` and `app.MapOpenApi()`) stay in place. They now describe the Todo endpoints instead of the sample weather endpoint.

The following highlighted code registers the app's services in the [dependency injection (DI)](../fundamentals/dependency-injection.md) container: the database context (`AddDbContext`) and the OpenAPI document generator (`AddOpenApi`):

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_DI" highlight="2-3"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs" id="snippet_DI" highlight="2-3"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs.md)

---

The DI container provides access to the database context and other services.

# [Visual Studio](#tab/visual-studio)

This tutorial uses [Endpoints Explorer and .http files](https://learn.microsoft.com/search/?terms=test%2Fhttp-files%23use-endpoints-explorer) to test the API.

# [Visual Studio Code](#tab/visual-studio-code)

<a name="add-a-browser-ui-to-view-the-openapi-document"></a> 

### Add a browser UI to view the OpenAPI document

The template already generates the OpenAPI document at `/openapi/v1.json`. To explore and test the API from a browser, add a UI that consumes that document. This tutorial uses Scalar.

Add the [Scalar.AspNetCore](https://www.nuget.org/packages/Scalar.AspNetCore/) package, which provides the middleware that serves the UI:

* Run the following command:

```dotnetcli
  dotnet add package Scalar.AspNetCore
```

In this tutorial, Scalar is used only for its API reference middleware, which reads the OpenAPI document generated by the AddOpenApi and MapOpenApi calls.

Confirm that `Program.cs` includes the highlighted `MapScalarApiReference` line inside the `if (app.Environment.IsDevelopment())` block, right after the `app.MapOpenApi();` line, and that `using Scalar.AspNetCore;` is at the top of the file. You added these lines when you pasted the Todo code earlier.

  [language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs" id="snippet_scalar" highlight="4"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs.md)

  The preceding code enables the Scalar UI in Development only. It reads `/openapi/v1.json`, the document produced by `MapOpenApi()`, and serves the API reference at `/scalar/v1`. Be sure to add `using Scalar.AspNetCore;` to the top of the file.

  > **Note:**
  > Scalar is one of several options for an OpenAPI UI. Alternatives such as `NSwag.AspNetCore` or `Swashbuckle.AspNetCore.SwaggerUi` consume the same OpenAPI document and can be substituted for Scalar without changing the rest of the tutorial.

---

<a name="post"></a>
## Test posting data

The following code in `Program.cs` creates an HTTP POST endpoint `/todoitems` that adds data to the in-memory database:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_post"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs" id="snippet_post"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs.md)

---


# [Visual Studio](#tab/visual-studio)

* Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging. Visual Studio launches the [Kestrel web server](../fundamentals/servers/kestrel.md) and trusts the development certificate if needed.

Visual Studio displays the following dialog:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


Use the POST endpoint to add data to the app.

* Select **View** > **Other Windows** > **Endpoints Explorer**.
* Right-click the **POST** endpoint and select **Generate request**.

  Endpoints Explorer context menu highlighting Generate Request menu item.

  A new file is created in the project folder named `TodoApi.http`, with contents similar to the following example:

```http
  @TodoApi_HostAddress = https://localhost:7031

  POST {{TodoApi_HostAddress}}/todoitems

  ###
```

  * The first line creates a variable that is used for all of the endpoints.
  * The next line defines a POST request.
  * The triple hashtag (`###`) line is a request delimiter: what comes after it is for a different request.

* The POST request needs headers and a body. To define those parts of the request, add the following lines immediately after the POST request line:

```
  Content-Type: application/json
  
  {
    "name":"walk dog",
    "isComplete":true
  }
```
  
  The preceding code adds a Content-Type header and a JSON request body. The TodoApi.http file should now look like the following example, but with your port number:
  
```http
  @TodoApi_HostAddress = https://localhost:7057
  
  POST {{TodoApi_HostAddress}}/todoitems
  Content-Type: application/json
  
  {
    "name":"walk dog",
    "isComplete":true
  }
  
  ###
```

* Select the **Send request** link that is above the `POST` request line.

  .http file window with run link highlighted.

  The POST request is sent to the app and the response is displayed in the **Response** pane.

  .http file window with response from the POST request.

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


* In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows) or <kbd>control</kbd>+<kbd>F5</kbd> (macOS) to run the app without debugging.

* You're prompted to select a debugger. Select **C#**.

* You're prompted to select a launch configuration. Select **C#:TodoApi  [Default Configuration] TodoApi**

  Select a launch configuration prompt.

The `TodoApi` app starts and listens on a randomly assigned local port. In the **Terminal** panel, find the `Now listening on:` line to get the URL and port, for example:

```output
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5090
```

In this example, the `TodoApi` app is listening at `http://localhost:5090`, so the port is `5090`. Your port number is likely different.

* To open the app in your default browser, hold <kbd>Ctrl</kbd> (Windows) or <kbd>Cmd</kbd> (macOS) and select the URL on the `Now listening on:` line in the **Terminal** panel. The browser opens at the app's root, `http://localhost:{port}`.

* In the browser address bar, append `/scalar/v1` to the URL to display the API reference page generated by Scalar, for example `http://localhost:5090/scalar/v1`.

* On the Scalar page, select the **POST /todoitems** operation, and then select **Test Request**.

* In the request body, enter JSON for a to-do item without specifying the optional `id`:

```json
  {
    "name":"walk dog",
    "isComplete":true
  }
```

* Select **Send**.

The Scalar UI displays the response, including the status code and response body. The response body shows:

* The `id` is set to `1`.
* A 201 `HTTP` status code is returned, which indicates that the request was successfully processed and resulted in the creation of a new resource.

---

## Examine the GET endpoints

Your `Program.cs` includes several GET endpoints, defined with `MapGet`:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /todoitems/complete` | Get all completed to-do items | None | Array of to-do items |
| `GET /todoitems/{id}` | Get an item by ID | None | To-do item |

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_get"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

## Test the GET endpoints

# [Visual Studio](#tab/visual-studio)

Test the app by calling the `GET` endpoints from a browser or by using **Endpoints Explorer**. The following steps are for **Endpoints Explorer**.

* In **Endpoints Explorer**, right-click the first **GET** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

```http
  GET {{TodoApi_HostAddress}}/todoitems

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
      "isComplete": true,
      "secret": null
    }
  ]
```

* In **Endpoints Explorer**, right-click the `/todoitems/{id}` **GET** endpoint and select **Generate request**.
  The following content is added to the `TodoApi.http` file:

```http
  GET {{TodoApi_HostAddress}}/todoitems/{id}

  ###
```

* Replace `{id}` with `1`.

* Select the **Send request** link that is above the new GET request line.

  The GET request is sent to the app and the response is displayed in the **Response** pane.

* The response body is similar to the following JSON:

```json
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true,
    "secret": null
  }
```
  
# [Visual Studio Code](#tab/visual-studio-code)

Test the app by calling the endpoints from a browser or the Scalar UI.

* In the Scalar UI, select **GET /todoitems**, and then select **Test Request** > **Send**.

* Alternatively, call **GET /todoitems** from a browser by entering the URI `http://localhost:{port}/todoitems`. For example, `http://localhost:7032/todoitems`.

The call to `GET /todoitems` produces a response similar to the following:

```json
[
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true,
    "secret": null
  }
]
```

* Call **GET /todoitems/{id}** in Scalar to return data from a specific id:
  * Select **GET /todoitems/{id}**, and then select **Test Request**.
  * Set the **id** field to `1` and select **Send**.

* Alternatively, call **GET /todoitems/{id}** from a browser by entering the URI `http://localhost:{port}/todoitems/1`. For example, `http://localhost:7032/todoitems/1`.

* The response is similar to the following:

```json
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true,
    "secret": null
  }
```

---

This app uses an in-memory database. If you restart the app, the data is lost: `GET /todoitems` returns an empty array (`[]`), and `GET /todoitems/{id}` returns a `404 Not Found`. To repopulate the app, [POST](#post) data to the app and try the GET request again.

## Return values

ASP.NET Core automatically serializes the object to [JSON](https://www.json.org) and writes the JSON into the body of the response message. The response code for this return type is [200 OK](https://developer.mozilla.org/docs/Web/HTTP/Status/200), assuming there are no unhandled exceptions. Unhandled exceptions are translated into 5xx errors.

The return types can represent a wide range of HTTP status codes. For example, `GET /todoitems/{id}` can return two different status values:

* If no item matches the requested ID, the method returns a [404 status](https://developer.mozilla.org/docs/Web/HTTP/Status/404) [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) error code.
* Otherwise, the method returns 200 with a JSON response body. Returning `item` results in an HTTP 200 response.

## Examine the PUT endpoint

The sample app implements a single PUT endpoint using `MapPut`:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_put"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs" id="snippet_put"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs.md)

---

This method is similar to the `MapPost` method, except it uses HTTP PUT. A successful response returns [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204). According to the HTTP specification, a PUT request requires the client to send the entire updated entity, not just the changes. To support partial updates, use [HTTP PATCH](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPatchAttribute).

## Test the PUT endpoint

This sample uses an in-memory database that you must initialize each time you start the app. You need an item in the database before you make a PUT call. Call POST to ensure there's an item in the database before making a PUT call.

Update the Todo item that has `Id = 1` and set its name to `"feed fish"`.

# [Visual Studio](#tab/visual-studio)

* In **Endpoints Explorer**, right-click the **PUT** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

```http
  PUT {{TodoApi_HostAddress}}/todoitems/{id}

  ###
```

* In the PUT request line, replace `{id}` with `1`.

* Add the following lines immediately after the PUT request line:

```http
  Content-Type: application/json

  {
    "id": 1,
    "name": "feed fish",
    "isComplete": false
  }
```

  The preceding code adds a Content-Type header and a JSON request body.

* Select the **Send request** link that is above the new PUT request line.
  
# [Visual Studio Code](#tab/visual-studio-code)

Use the Scalar UI to send a PUT request:

* Select **PUT /todoitems/{id}**, and then select **Test Request**.

* Set the **id** field to `1`.

* Set the request body to the following JSON:

```json
  {
    "id": 1,
    "name": "feed fish",
    "isComplete": false
  }
```

* Select **Send**.

---

The PUT request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.

## Create and examine the PATCH endpoint

A PATCH endpoint lets clients send only the fields they want to update, such as renaming a Todo item without resending its completion status. This approach differs from a PUT request, which replaces the entire item, so the client must send every field even if only one is changed.

The next steps add a new file and modify the `Program.cs` file. Stop the `TodoApi` app before making these changes. Leave the Scalar page in the browser running.

# [Visual Studio](#tab/visual-studio)

* To stop the app, select the **Stop** button (the red square) in the Visual Studio toolbar.

# [Visual Studio Code](#tab/visual-studio-code)

* To stop the app, press <kbd>Shift</kbd>+<kbd>F5</kbd>.

---

This sample uses an in-memory database that you must initialize each time the app starts. The database must contain an item before you make a PATCH call. Call POST to ensure the database has an item before making a PATCH call.

The PATCH endpoint uses a `TodoPatchDto` class with nullable properties to properly handle partial updates. By using nullable properties, the endpoint can distinguish between a field that wasn't provided (null) and a field explicitly set to a value (including false for boolean fields). Without nullable properties, a non-nullable bool defaults to false, which could potentially overwrite an existing true value when that field isn't included in the request.

* Create a file named `TodoPatchDto.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/TodoPatchDto.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/TodoPatchDto.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/TodoPatchDto.cs.md)

The `TodoPatchDto` class uses nullable properties (`string?` and `bool?`) to distinguish between a field that wasn't provided in the request versus a field explicitly set to a value.

* In `Program.cs`, add the following PATCH endpoint immediately after the `MapPut` endpoint:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_patch"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs" id="snippet_patch"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs.md)

---

This method is similar to the `MapPut` method, but it uses HTTP PATCH and only updates the fields provided in the request. A successful response returns [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204).

> **Note:**
> PATCH operations allow partial updates to resources. For more advanced partial updates using JSON Patch documents, see [web-api/jsonpatch](../web-api/jsonpatch.md).

## Test the PATCH endpoint

# [Visual Studio](#tab/visual-studio)

* Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to rebuild and run the app with the new PATCH endpoint.

# [Visual Studio Code](#tab/visual-studio-code)

* Run the app again so it rebuilds with the new PATCH endpoint. In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows) or <kbd>control</kbd>+<kbd>F5</kbd> (macOS) to run the app without debugging.

---


This sample uses an in-memory database that you must initialize each time the app starts. The database must contain an item before you make a PATCH call. Call POST to ensure the database has an item before making a PATCH call.

Update only the `name` property of the Todo item that has `Id = 1` and set its name to `"run errands"`.

# [Visual Studio](#tab/visual-studio)

* In **Endpoints Explorer**, select the refresh button. Then, right-click the **PATCH** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

```http
  PATCH {{TodoApi_HostAddress}}/todoitems/{id}

  ###
```

* In the PATCH request line, replace `{id}` with `1`.

* Add the following lines immediately after the PATCH request line:

```http
  Content-Type: application/json

  {
    "name": "run errands"
  }
```

  The preceding code adds a Content-Type header and a JSON request body with only the field to update.

* Select the **Send request** link that is above the new PATCH request line.
  
# [Visual Studio Code](#tab/visual-studio-code)

Use the Scalar UI to send a PATCH request:

* Refresh the scalar page in the browser so that the new `PATCH` endpoint appears.

* Select **PATCH /todoitems/{id}**, and then select **Test Request**.

* Set the **id** field to `1`.

* Set the request body to the following JSON:

```json
  {
    "name": "run errands"
  }
```

* Select **Send**.

---

The PATCH request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.

## Examine the DELETE endpoint

Your `Program.cs` file includes a single DELETE endpoint, defined with `MapDelete`:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_delete"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs" id="snippet_delete"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs.md)

---

## Test the DELETE endpoint

# [Visual Studio](#tab/visual-studio)

* In **Endpoints Explorer**, right-click the **DELETE** endpoint and select **Generate request**.

  A DELETE request is added to `TodoApi.http`.

* Replace `{id}` in the DELETE request line with `1`. The DELETE request should look like the following example:

```http
  DELETE {{TodoApi_HostAddress}}/todoitems/1

  ###
```

* Select the **Send request** link for the DELETE request.
  
# [Visual Studio Code](#tab/visual-studio-code)

Use the Scalar UI to send a DELETE request:

* Select **DELETE /todoitems/{id}**, then **Test Request**.
* Set the **id** field to `1` and select **Send**.

---

The DELETE request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.

## Use the MapGroup API

* The next steps modify the `Program.cs` file, so stop the app before making these changes. Leave the scalar page in the browser running.

# [Visual Studio](#tab/visual-studio)

* To stop the app, select the **Stop** button (the red square) in the Visual Studio toolbar.

# [Visual Studio Code](#tab/visual-studio-code)

* To stop the app, press <kbd>Shift</kbd>+<kbd>F5</kbd>.

---

The `Program.cs` file you wrote repeats the `todoitems` URL prefix each time it sets up an endpoint. APIs often have groups of endpoints with a common URL prefix, and the [Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%252A) method helps organize such groups. It reduces repetitive code and allows you to customize entire groups of endpoints with a single call to methods like [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A) and [Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata%252A).

* Replace the contents of `Program.cs` with the following code:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_mapgroup_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs" id="snippet_mapgroup_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs.md)

---

The preceding code has the following changes:

* Adds `var todoItems = app.MapGroup("/todoitems");` to set up the group using the URL prefix `/todoitems`.
* Changes all the `app.Map<HttpVerb>` methods to `todoItems.Map<HttpVerb>`.
* Removes the URL prefix `/todoitems` from the `Map<HttpVerb>` method calls.

* Runs the app and tests the endpoints to verify that they work the same.

## Use the TypedResults API

The next steps modify the `Program.cs` file, so stop the app before making these changes. Leave the scalar page in the browser running.

Returning [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) rather than [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) has several advantages, including testability and automatically returning the response type metadata for OpenAPI to describe the endpoint. For more information, see [`TypedResults` versus `Results`](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23typedresults-versus-results).

* The `Map<HttpVerb>` methods can call route handler methods instead of using lambdas. To see an example, update *Program.cs* with the following code:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_typed_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs" id="snippet_typed_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs.md)

---

The `Map<HttpVerb>` code now calls methods instead of lambdas:

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_typed_group"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

The following methods return objects that implement [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult) and are defined by [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults):

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_typed_handlers"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

Unit tests can call these methods and test that they return the correct type. For example, if the method is `GetAllTodos`:

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_typed_getalltodos"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

Unit test code can verify that an object of type [Ok\<Todo\[\]>](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.Ok%25601.Value) is returned from the handler method. For example:

```csharp
public async Task GetAllTodos_ReturnsOkOfTodosResult()
{
    // Arrange
    var db = CreateDbContext();

    // Act
    var result = await TodosApi.GetAllTodos(db);

    // Assert: Check for the correct returned type
    Assert.IsType<Ok<Todo[]>>(result);
}
```

<a name="prevent-over-posting"></a>

## Prevent over-posting

Currently, your API exposes the entire `Todo` object, including the `Secret` property you added in [The model and database context classes](#model-db-classes). In production applications, use a subset of the model to restrict the data that clients can input and receive. Security is a major reason for this restriction. This subset of a model is usually referred to as a Data Transfer Object (DTO), input model, or view model. This article uses **DTO**.

Use a DTO to:

* Prevent over-posting.
* Hide properties that clients aren't supposed to view.
* Omit some properties to reduce payload size.
* Flatten object graphs that contain nested objects. Flattened object graphs can be more convenient for clients.

This app needs to hide the `Secret` field, but an administrative app could choose to expose it.

* The next steps add a file, so stop the app before making these changes. Leave the scalar page in the browser running.

* Create a file named `TodoItemDTO.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/TodoItemDTO.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/TodoItemDTO.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/TodoItemDTO.cs.md)

* Replace the contents of the `Program.cs` file with the following code to use this DTO model:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs" id="snippet_dto_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VS_EndpointExplorer/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs" id="snippet_dto_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/10.x/TodoApi_VSC_Scalar/Program.cs.md)

---

* Run the app and verify you can post and get all fields except the `Secret` field.

<a name="troubleshoot-completed-sample"></a>

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/min-web-api/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

* [Configure JSON serialization options](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23configure-json-serialization-options).
* Handle errors and exceptions: The [developer exception page](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling-api%23developer-exception-page) is enabled by default in the `Development` environment for Minimal API apps. For information about how to handle errors and exceptions, see [Handle errors in ASP.NET Core APIs](../fundamentals/error-handling-api.md).
* For an example of testing a Minimal API app, see [this GitHub sample](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/minimal-apis/samples/MinApiTestsSample).
* [OpenAPI support in Minimal APIs](../fundamentals/openapi/aspnetcore-openapi.md).
* [Quickstart: Publish to Azure](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore).
* [Organizing ASP.NET Core Minimal APIs](https://www.tessferrandez.com/blog/2023/10/31/organizing-minimal-apis.html).

### Learn more

See [fundamentals/minimal-apis](../fundamentals/minimal-apis.md)



**Applies to: \= aspnetcore-7.0**

Minimal APIs are architected to create HTTP APIs with minimal dependencies. They are ideal for microservices and apps that want to include only the minimum files, features, and dependencies in ASP.NET Core.

This tutorial teaches the basics of building a Minimal API with ASP.NET Core. Another approach to creating APIs in ASP.NET Core is to use controllers. For help in choosing between Minimal APIs and controller-based APIs, see [fundamentals/apis](../fundamentals/apis.md). For a tutorial on creating an API project based on [controllers](../web-api/index.md) that contains more features, see [Create a web API](first-web-api.md).

## Overview

This tutorial creates the following API:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /todoitems/complete` | Get completed to-do items | None | Array of to-do items |
| `GET /todoitems/{id}` | Get an item by ID | None | To-do item |
| `POST /todoitems` | Add a new item | To-do item | To-do item |
| `PUT /todoitems/{id}` | Update an existing item &nbsp; | To-do item | None |
| `PATCH /todoitems/{id}` | Partially update an item &nbsp; | Partial to-do item | None |
| `DELETE /todoitems/{id}` &nbsp; &nbsp; | Delete an item &nbsp; &nbsp; | None | None |

## Prerequisites

# [Visual Studio](#tab/visual-studio)


* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/#download) with the **ASP.NET and web development** workload.

  VS22 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


---

## Create an API project

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio 2022 and select **Create a new project**.
* In the **Create a new project** dialog:
  * Enter `Empty` in the **Search for templates** search box.
  * Select the **ASP.NET Core Empty** template and select **Next**.

  Visual Studio Create a new project

* Name the project *TodoApi* and select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 7.0**
  * Uncheck **Do not use top-level statements**
  * Select **Create**

  Additional information

# [Visual Studio Code](#tab/visual-studio-code)

* Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change directories (`cd`) to the folder that will contain the project folder.
* Run the following commands:

  ```dotnetcli
  dotnet new web -o TodoApi
  cd TodoApi
  code -r ../TodoApi
  ```

* When a dialog box asks if you want to trust the authors, select **Yes**.
* When a dialog box asks if you want to add required assets to the project, select **Yes**.

  The preceding commands create a new ASP.NET Core project and open it in Visual Studio Code.

---

### Examine the code

The `Program.cs` file contains the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/Program.cs" id="snippet_min"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/Program.cs.md)

The preceding code:

* Creates a [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) and a [Microsoft.AspNetCore.Builder.WebApplication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication) with preconfigured defaults.
* Creates an HTTP GET endpoint `/` that returns `Hello World!`:

### Run the app

# [Visual Studio](#tab/visual-studio)

Press Ctrl+F5 to run without the debugger.

Visual Studio displays the following dialog:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio launches the [Kestrel web server](../fundamentals/servers/kestrel.md) and opens a browser window.

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


Press Ctrl+F5 to run the app. A browser window is opened.

---

`Hello World!` is displayed in the browser. The `Program.cs` file contains a minimal but complete app.

## Add NuGet packages

NuGet packages must be added to support the database and diagnostics used in this tutorial.

# [Visual Studio](#tab/visual-studio)

* From the **Tools** menu, select **NuGet Package Manager > Manage NuGet Packages for Solution**.
* Select the **Browse** tab.
* Enter **Microsoft.EntityFrameworkCore.InMemory** in the search box, and then select `Microsoft.EntityFrameworkCore.InMemory`.
* Select the **Project** checkbox in the right pane.
* In the **Version** drop down select the latest version 7 available, for example `7.0.17`, and then select **Install**. 
* Follow the preceding instructions to add the `Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore` package with the latest version 7 available.

# [Visual Studio Code](#tab/visual-studio-code)

* Run the following commands:

   ```dotnetcli
   dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 7.0.17
   dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore --version 7.0.17
   ```

---

## The model and database context classes

In the project folder, create a file named `Todo.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todoGroup/Todo.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todoGroup/Todo.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todoGroup/Todo.cs.md)

The preceding code creates the model for this app. A *model* is a class that represents data that the app manages. 

Create a file named `TodoDb.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todoGroup/TodoDb.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todoGroup/TodoDb.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todoGroup/TodoDb.cs.md)

The preceding code defines the *database context*, which is the main class that coordinates [Entity Framework](https://learn.microsoft.com/ef/core/) functionality for a data model. This class derives from the [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class.

## Add the API code

Replace the contents of the `Program.cs` file with the following code:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/7.x/todo/Program.cs?name=snippet_all](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

The following highlighted code adds the database context to the [dependency injection (DI)](../fundamentals/dependency-injection.md) container and enables displaying database-related exceptions:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/7.x/todo/Program.cs?name=snippet_DI\\&highlight=2-3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

The DI container provides access to the database context and other services.

## Create API testing UI with Swagger

There are many available web API testing tools to choose from, and you can follow this tutorial's introductory API test steps with your own preferred tool.

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

### Configure Swagger middleware

* Add the following highlighted code before `app` is defined in line `var app = builder.Build();`

  [Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/7.x/todo_SwaggerVersion/Program.cs?name=snippet_swagger_add_service\\&highlight=7-13](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

In the previous code:

  * `builder.Services.AddEndpointsApiExplorer();`: Enables the API Explorer, which is a service that provides metadata about the HTTP API. The API Explorer is used by Swagger to generate the Swagger document.
  * `builder.Services.AddOpenApiDocument(config => {...});`: Adds the Swagger OpenAPI document generator to the application services and configures it to provide more information about the API, such as its title and version. For information on providing more robust API details, see [tutorials/get-started-with-nswag#customize-api-documentation](https://learn.microsoft.com/search/?terms=tutorials%2Fget-started-with-nswag%23customize-api-documentation)

* Add the following highlighted code to the next line after `app` is defined in line `var app = builder.Build();`

  [Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/7.x/todo_SwaggerVersion/Program.cs?name=snippet_swagger_enable_middleware\\&highlight=2-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

  The previous code enables the Swagger middleware for serving the generated JSON document and the Swagger UI. Swagger is only enabled in a development environment. Enabling Swagger in a production environment could expose potentially sensitive details about the API's structure and implementation.

<a name="post"></a>

## Test posting data

The following code in `Program.cs` creates an HTTP POST endpoint `/todoitems` that adds data to the in-memory database:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/7.x/todo/Program.cs?name=snippet_post](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

Run the app. The browser displays a 404 error because there's no longer a `/` endpoint.

The POST endpoint will be used to add data to the app.

* With the app still running, in the browser, navigate to `https://localhost:<port>/swagger` to display the API testing page generated by Swagger.

  Swagger generated API testing page

* On the Swagger API testing page, select **Post /todoitems** > **Try it out**.
* Note that the **Request body** field contains a generated example format reflecting the parameters for the API.
* In the request body enter JSON for a to-do item, without specifying the optional `id`:

  ```json
  {
    "name":"walk dog",
    "isComplete":true
  }
  ```

* Select **Execute**.

  Swagger with Post

Swagger provides a **Responses** pane below the **Execute** button. 

  Swagger with Post response

Note a few of the useful details:

* cURL: Swagger provides an example cURL command in Unix/Linux syntax, which can be run at the command line with any bash shell that uses Unix/Linux syntax, including Git Bash from [Git for Windows](https://git-scm.com/downloads).
* Request URL: A simplified representation of the HTTP request made by Swagger UI's JavaScript code for the API call. Actual requests can include details such as headers and query parameters and a request body.
* Server response: Includes the response body and headers. The response body shows the `id` was set to `1`.
* Response Code: A 201 `HTTP` status code was returned, indicating that the request was successfully processed and resulted in the creation of a new resource.
---

## Examine the GET endpoints

The sample app implements several GET endpoints by calling `MapGet`:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /todoitems/complete` | Get all completed to-do items | None | Array of to-do items |
| `GET /todoitems/{id}` | Get an item by ID | None | To-do item |

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/7.x/todo/Program.cs?name=snippet_get](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

## Test the GET endpoints

Test the app by calling the endpoints from a browser or Swagger.

* In Swagger select **GET /todoitems** > **Try it out** > **Execute**.

* Alternatively, call **GET /todoitems** from a browser by entering the URI `http://localhost:<port>/todoitems`. For example, `http://localhost:5001/todoitems`

The call to `GET /todoitems` produces a response similar to the following:

```json
[
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
]
```

* Call **GET /todoitems/{id}** in Swagger to return data from a specific id:
  * Select **GET /todoitems** > **Try it out**.
  * Set the **id** field to `1` and select **Execute**.

* Alternatively, call **GET /todoitems** from a browser by entering the URI `https://localhost:<port>/todoitems/1`. For example, `https://localhost:5001/todoitems/1`

* The response is similar to the following:

  ```json
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
  ```

This app uses an in-memory database. If the app is restarted, the GET request doesn't return any data. If no data is returned, [POST](#post) data to the app and try the GET request again.

## Return values

ASP.NET Core automatically serializes the object to [JSON](https://www.json.org) and writes the JSON into the body of the response message. The response code for this return type is [200 OK](https://developer.mozilla.org/docs/Web/HTTP/Status/200), assuming there are no unhandled exceptions. Unhandled exceptions are translated into 5xx errors.

The return types can represent a wide range of HTTP status codes. For example, `GET /todoitems/{id}` can return two different status values:

* If no item matches the requested ID, the method returns a [404 status](https://developer.mozilla.org/docs/Web/HTTP/Status/404) [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) error code.
* Otherwise, the method returns 200 with a JSON response body. Returning `item` results in an HTTP 200 response.

## Examine the PUT endpoint

The sample app implements a single PUT endpoint using `MapPut`:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/7.x/todo/Program.cs?name=snippet_put](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

This method is similar to the `MapPost` method, except it uses HTTP PUT. A successful response returns [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204). According to the HTTP specification, a PUT request requires the client to send the entire updated entity, not just the changes. To support partial updates, use [HTTP PATCH](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPatchAttribute).

## Test the PUT endpoint

This sample uses an in-memory database that must be initialized each time the app is started. There must be an item in the database before you make a PUT call. Call GET to ensure there's an item in the database before making a PUT call.

Update the to-do item that has `Id = 1` and set its name to `"feed fish"`.

Use Swagger to send a PUT request:

* Select **Put /todoitems/{id}** > **Try it out**.

* Set the **id** field to `1`.

* Set the request body to the following JSON:

  ```json
  {
    "name": "feed fish",
    "isComplete": false
  }
  ```

* Select **Execute**.

## Examine the PATCH endpoint

Create a file named `TodoPatchDto.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todo/TodoPatchDto.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todo/TodoPatchDto.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todo/TodoPatchDto.cs.md)

The `TodoPatchDto` class uses nullable properties (`string?` and `bool?`) to distinguish between a field that wasn't provided in the request versus a field explicitly set to a value.

The sample app implements a single PATCH endpoint using `MapPatch`:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/7.x/todo/Program.cs?name=snippet_patch](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

This method is similar to the `MapPut` method, except it uses HTTP PATCH and only updates the fields provided in the request. A successful response returns [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204). According to the HTTP specification, a PATCH request enables partial updates, allowing clients to send only the fields that need to be changed.

The PATCH endpoint uses a `TodoPatchDto` class with nullable properties to properly handle partial updates. Using nullable properties allows the endpoint to distinguish between a field that wasn't provided (null) versus a field explicitly set to a value (including false for boolean fields). Without nullable properties, a non-nullable bool would default to false, potentially overwriting an existing true value when that field wasn't included in the request.

> **Note:**
> PATCH operations allow partial updates to resources. For more advanced partial updates using JSON Patch documents, see [web-api/jsonpatch](../web-api/jsonpatch.md).

## Test the PATCH endpoint

This sample uses an in-memory database that must be initialized each time the app is started. There must be an item in the database before you make a PATCH call. Call GET to ensure there's an item in the database before making a PATCH call.

Update only the `name` property of the to-do item that has `Id = 1` and set its name to `"run errands"`.

Use Swagger to send a PATCH request:

* Select **Patch /todoitems/{id}** > **Try it out**.

* Set the **id** field to `1`.

* Set the request body to the following JSON:

  ```json
  {
    "name": "run errands"
  }
  ```

* Select **Execute**.

## Examine and test the DELETE endpoint

The sample app implements a single DELETE endpoint using `MapDelete`:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/7.x/todo/Program.cs?name=snippet_delete](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

Use Swagger to send a DELETE request:

* Select **DELETE /todoitems/{id}** > **Try it out**.
* Set the **ID** field to `1` and select **Execute**.

  The DELETE request is sent to the app and the response is displayed in the **Responses** pane. The response body is empty, and the **Server response** status code is 204.

## Use the MapGroup API

The sample app code repeats the `todoitems` URL prefix each time it sets up an endpoint. APIs often have groups of endpoints with a common URL prefix, and the [Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%252A) method is available to help organize such groups. It reduces repetitive code and allows for customizing entire groups of endpoints with a single call to methods like [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A) and [Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata%252A).

Replace the contents of `Program.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todoGroup_SwaggerVersion/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todoGroup_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todoGroup_SwaggerVersion/Program.cs.md)

The preceding code has the following changes:

* Adds `var todoItems = app.MapGroup("/todoitems");` to set up the group using the URL prefix `/todoitems`.
* Changes all the `app.Map<HttpVerb>` methods to `todoItems.Map<HttpVerb>`.
* Removes the URL prefix `/todoitems` from the `Map<HttpVerb>` method calls.

Test the endpoints to verify that they work the same.

## Use the TypedResults API

Returning [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) rather than [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) has several advantages, including testability and automatically returning the response type metadata for OpenAPI to describe the endpoint. For more information, see [`TypedResults` versus `Results`](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23typedresults-versus-results).

The `Map<HttpVerb>` methods can call route handler methods instead of using lambdas. To see an example, update *Program.cs* with the following code:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todoTypedResults_SwaggerVersion/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todoTypedResults_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todoTypedResults_SwaggerVersion/Program.cs.md)

---

The `Map<HttpVerb>` code now calls methods instead of lambdas:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs" id="snippet_group"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs.md)

These methods return objects that implement [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult) and are defined by [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults):

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs" id="snippet_handlers"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs.md)

Unit tests can call these methods and test that they return the correct type. For example, if the method is `GetAllTodos`:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs" id="snippet_getalltodos"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todoTypedResults/Program.cs.md)

Unit test code can verify that an object of type [Ok\<Todo\[\]>](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.Ok%25601.Value) is returned from the handler method. For example:

```csharp
public async Task GetAllTodos_ReturnsOkOfTodosResult()
{
    // Arrange
    var db = CreateDbContext();

    // Act
    var result = await TodosApi.GetAllTodos(db);

    // Assert: Check for the correct returned type
    Assert.IsType<Ok<Todo[]>>(result);
}
```

<a name="over-post-v7"></a>

## Prevent over-posting

Currently the sample app exposes the entire `Todo` object. Production apps In production applications, a subset of the model is often used to restrict the data that can be input and returned. There are multiple reasons behind this and security is a major one. The subset of a model is usually referred to as a Data Transfer Object (DTO), input model, or view model. **DTO** is used in this article.

A DTO can be used to:

* Prevent over-posting.
* Hide properties that clients aren't supposed to view.
* Omit some properties to reduce payload size.
* Flatten object graphs that contain nested objects. Flattened object graphs can be more convenient for clients.

To demonstrate the DTO approach, update the `Todo` class to include a secret field:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todoDTO/Todo.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todoDTO/Todo.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todoDTO/Todo.cs.md)

The secret field needs to be hidden from this app, but an administrative app could choose to expose it.

Verify you can post and get the secret field.

Create a file named `TodoItemDTO.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/7.x/todoDTO/TodoItemDTO.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/7.x/todoDTO/TodoItemDTO.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/7.x/todoDTO/TodoItemDTO.cs.md)

Replace the contents of the `Program.cs` file with the following code to use this DTO model:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/6.x/todoDTO/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/6.x/todoDTO/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/6.x/todoDTO/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/Program.cs.md)

---

Verify you can post and get all fields except the secret field.

<a name="diff-v7"></a>

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/min-web-api/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

* [Configure JSON serialization options](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23configure-json-serialization-options).
* Handle errors and exceptions: The [developer exception page](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling-api%23developer-exception-page) is enabled by default in the `Development` environment for Minimal API apps. For information about how to handle errors and exceptions, see [Handle errors in ASP.NET Core APIs](../fundamentals/error-handling-api.md).
* For an example of testing a Minimal API app, see [this GitHub sample](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/minimal-apis/samples/MinApiTestsSample).
* [OpenAPI support in Minimal APIs](../fundamentals/openapi/aspnetcore-openapi.md).
* [Quickstart: Publish to Azure](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore).
* [Organizing ASP.NET Core Minimal APIs](https://www.tessferrandez.com/blog/2023/10/31/organizing-minimal-apis.html).

### Learn more

See [fundamentals/minimal-apis](../fundamentals/minimal-apis.md)



**Applies to: \= aspnetcore-6.0**

Minimal APIs are architected to create HTTP APIs with minimal dependencies. They are ideal for microservices and apps that want to include only the minimum files, features, and dependencies in ASP.NET Core.

This tutorial teaches the basics of building a Minimal API with ASP.NET Core. Another approach to creating APIs in ASP.NET Core is to use controllers. For help in choosing between Minimal APIs and controller-based APIs, see [fundamentals/apis](../fundamentals/apis.md). For a tutorial on creating an API project based on [controllers](../web-api/index.md) that contains more features, see [Create a web API](first-web-api.md).

## Overview

This tutorial creates the following API:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /todoitems/complete` | Get completed to-do items | None | Array of to-do items |
| `GET /todoitems/{id}` | Get an item by ID | None | To-do item |
| `POST /todoitems` | Add a new item | To-do item | To-do item |
| `PUT /todoitems/{id}` | Update an existing item &nbsp; | To-do item | None |
| `DELETE /todoitems/{id}` &nbsp; &nbsp; | Delete an item &nbsp; &nbsp; | None | None |

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

## Create an API project

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio 2022 and select **Create a new project**.
* In the **Create a new project** dialog:
  * Enter `Empty` in the **Search for templates** search box.
  * Select the **ASP.NET Core Empty** template and select **Next**.

  Visual Studio Create a new project

* Name the project *TodoApi* and select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 6.0**
  * Uncheck **Do not use top-level statements**
  * Select **Create**

# [Visual Studio Code](#tab/visual-studio-code)

* Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change directories (`cd`) to the folder that will contain the project folder.
* Run the following commands:

  ```dotnetcli
  dotnet new web -o TodoApi
  cd TodoApi
  code -r ../TodoApi
  ```

* When a dialog box asks if you want to trust the authors, select **Yes**.
* When a dialog box asks if you want to add required assets to the project, select **Yes**.

  The preceding commands create a new ASP.NET Core project and open it in Visual Studio Code.

---

### Examine the code

The `Program.cs` file contains the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/6.x/todo/Program.cs" id="snippet_min"::: (complete source file; reference: \~/tutorials/min-web-api/samples/6.x/todo/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/6.x/todo/Program.cs.md)

The preceding code:

* Creates a [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) and a [Microsoft.AspNetCore.Builder.WebApplication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication) with preconfigured defaults.
* Creates an HTTP GET endpoint `/` that returns `Hello World!`:

### Run the app

# [Visual Studio](#tab/visual-studio)

Press Ctrl+F5 to run without the debugger.

Visual Studio displays the following dialog:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio launches the [Kestrel web server](../fundamentals/servers/kestrel.md) and opens a browser window.

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


Press Ctrl+F5 to run the app. A browser window is opened.

---

`Hello World!` is displayed in the browser. The `Program.cs` file contains a minimal but complete app.

## Add NuGet packages

NuGet packages must be added to support the database and diagnostics used in this tutorial.

# [Visual Studio](#tab/visual-studio)

* From the **Tools** menu, select **NuGet Package Manager > Manage NuGet Packages for Solution**.
* Select the **Browse** tab.
* Enter **Microsoft.EntityFrameworkCore.InMemory** in the search box, and then select `Microsoft.EntityFrameworkCore.InMemory`.
* Select the **Project** checkbox in the right pane.
* In the **Version** drop down select the latest version 7 available, for example `6.0.28`, and then select **Install**. 
* Follow the preceding instructions to add the `Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore` package with the latest version 7 available.

# [Visual Studio Code](#tab/visual-studio-code)

* Run the following commands:

   ```dotnetcli
   dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 6.0.28
   dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore --version 6.0.28
   ```

---

## The model and database context classes

In the project folder, create a file named `Todo.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/6.x/todo/Todo.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/6.x/todo/Todo.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/6.x/todo/Todo.cs.md)

The preceding code creates the model for this app. A *model* is a class that represents data that the app manages. 

Create a file named `TodoDb.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/6.x/todo/TodoDb.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/6.x/todo/TodoDb.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/6.x/todo/TodoDb.cs.md)

The preceding code defines the *database context*, which is the main class that coordinates [Entity Framework](https://learn.microsoft.com/ef/core/) functionality for a data model. This class derives from the [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class.

## Add the API code

Replace the contents of the `Program.cs` file with the following code:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/6.x/todo/Program.cs?name=snippet_all](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

The following highlighted code adds the database context to the [dependency injection (DI)](../fundamentals/dependency-injection.md) container and enables displaying database-related exceptions:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/6.x/todo/Program.cs?name=snippet_DI\\&highlight=2-3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

The DI container provides access to the database context and other services.

## Create API testing UI with Swagger

There are many available web API testing tools to choose from, and you can follow this tutorial's introductory API test steps with your own preferred tool.

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

### Configure Swagger middleware

* In Program.cs add the following `using` statements at the top:

  [Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/6.x/todo_SwaggerVersion/Program.cs?name=snippet_swagger_using_statements](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

* Add the following highlighted code before `app` is defined in line `var app = builder.Build();`

  [Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/6.x/todo_SwaggerVersion/Program.cs?name=snippet_swagger_add_service\\&highlight=8-14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

In the previous code:

  * `builder.Services.AddEndpointsApiExplorer();`: Enables the API Explorer, which is a service that provides metadata about the HTTP API. The API Explorer is used by Swagger to generate the Swagger document.
  * `builder.Services.AddOpenApiDocument(config => {...});`: Adds the Swagger OpenAPI document generator to the application services and configures it to provide more information about the API, such as its title and version. For information on providing more robust API details, see [tutorials/get-started-with-nswag#customize-api-documentation](https://learn.microsoft.com/search/?terms=tutorials%2Fget-started-with-nswag%23customize-api-documentation)

* Add the following highlighted code to the next line after `app` is defined in line `var app = builder.Build();`

  [Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/6.x/todo_SwaggerVersion/Program.cs?name=snippet_swagger_enable_middleware\\&highlight=4-14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

  The previous code enables the Swagger middleware for serving the generated JSON document and the Swagger UI. Swagger is only enabled in a development environment. Enabling Swagger in a production environment could expose potentially sensitive details about the API's structure and implementation.

<a name="post"></a>

## Test posting data

The following code in `Program.cs` creates an HTTP POST endpoint `/todoitems` that adds data to the in-memory database:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/6.x/todo/Program.cs?name=snippet_post](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

Run the app. The browser displays a 404 error because there's no longer a `/` endpoint.

The POST endpoint will be used to add data to the app.

* With the app still running, in the browser, navigate to `https://localhost:<port>/swagger` to display the API testing page generated by Swagger.

  Swagger generated API testing page

* On the Swagger API testing page, select **Post /todoitems** > **Try it out**.
* Note that the **Request body** field contains a generated example format reflecting the parameters for the API.
* In the request body enter JSON for a to-do item, without specifying the optional `id`:

  ```json
  {
    "name":"walk dog",
    "isComplete":true
  }
  ```

* Select **Execute**.

  Swagger with Post data

Swagger provides a **Responses** pane below the **Execute** button. 

  Swagger with Post resonse pane

Note a few of the useful details:

* cURL: Swagger provides an example cURL command in Unix/Linux syntax, which can be run at the command line with any bash shell that uses Unix/Linux syntax, including Git Bash from [Git for Windows](https://git-scm.com/downloads).
* Request URL: A simplified representation of the HTTP request made by Swagger UI's JavaScript code for the API call. Actual requests can include details such as headers and query parameters and a request body.
* Server response: Includes the response body and headers. The response body shows the `id` was set to `1`.
* Response Code: A 201 `HTTP` status code was returned, indicating that the request was successfully processed and resulted in the creation of a new resource.
---

## Examine the GET endpoints

The sample app implements several GET endpoints by calling `MapGet`:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /todoitems/complete` | Get all completed to-do items | None | Array of to-do items |
| `GET /todoitems/{id}` | Get an item by ID | None | To-do item |

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/6.x/todo/Program.cs?name=snippet_get](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

## Test the GET endpoints

Test the app by calling the endpoints from a browser or Swagger.

* In Swagger select **GET /todoitems** > **Try it out** > **Execute**.

* Alternatively, call **GET /todoitems** from a browser by entering the URI `http://localhost:<port>/todoitems`. For example, `http://localhost:5001/todoitems`

The call to `GET /todoitems` produces a response similar to the following:

```json
[
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
]
```

* Call **GET /todoitems/{id}** in Swagger to return data from a specific id:
  * Select **GET /todoitems** > **Try it out**.
  * Set the **id** field to `1` and select **Execute**.

* Alternatively, call **GET /todoitems** from a browser by entering the URI `https://localhost:<port>/todoitems/1`. For example, For example, `https://localhost:5001/todoitems/1`

* The response is similar to the following:

  ```json
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
  ```

This app uses an in-memory database. If the app is restarted, the GET request doesn't return any data. If no data is returned, [POST](#post) data to the app and try the GET request again.

## Return values

ASP.NET Core automatically serializes the object to [JSON](https://www.json.org) and writes the JSON into the body of the response message. The response code for this return type is [200 OK](https://developer.mozilla.org/docs/Web/HTTP/Status/200), assuming there are no unhandled exceptions. Unhandled exceptions are translated into 5xx errors.

The return types can represent a wide range of HTTP status codes. For example, `GET /todoitems/{id}` can return two different status values:

* If no item matches the requested ID, the method returns a [404 status](https://developer.mozilla.org/docs/Web/HTTP/Status/404) [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) error code.
* Otherwise, the method returns 200 with a JSON response body. Returning `item` results in an HTTP 200 response.

## Examine the PUT endpoint

The sample app implements a single PUT endpoint using `MapPut`:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/6.x/todo/Program.cs?name=snippet_put](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

This method is similar to the `MapPost` method, except it uses HTTP PUT. A successful response returns [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204). According to the HTTP specification, a PUT request requires the client to send the entire updated entity, not just the changes. To support partial updates, use [HTTP PATCH](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPatchAttribute).

## Test the PUT endpoint

This sample uses an in-memory database that must be initialized each time the app is started. There must be an item in the database before you make a PUT call. Call GET to ensure there's an item in the database before making a PUT call.

Update the to-do item that has `Id = 1` and set its name to `"feed fish"`.

Use Swagger to send a PUT request:

* Select **Put /todoitems/{id}** > **Try it out**.

* Set the **id** field to `1`.

* Set the request body to the following JSON:

  ```json
  {
    "name": "feed fish",
    "isComplete": false
  }
  ```

* Select **Execute**.

## Examine and test the DELETE endpoint

The sample app implements a single DELETE endpoint using `MapDelete`:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/6.x/todo/Program.cs?name=snippet_delete](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

Use Swagger to send a DELETE request:

* Select **DELETE /todoitems/{id}** > **Try it out**.
* Set the **ID** field to `1` and select **Execute**.

  The DELETE request is sent to the app and the response is displayed in the **Responses** pane. The response body is empty, and the **Server response** status code is 204.

<a name="over-post-v7"></a>

## Prevent over-posting

Currently the sample app exposes the entire `Todo` object. Production apps In production applications, a subset of the model is often used to restrict the data that can be input and returned. There are multiple reasons behind this and security is a major one. The subset of a model is usually referred to as a Data Transfer Object (DTO), input model, or view model. **DTO** is used in this article.

A DTO can be used to:

* Prevent over-posting.
* Hide properties that clients aren't supposed to view.
* Omit some properties to reduce payload size.
* Flatten object graphs that contain nested objects. Flattened object graphs can be more convenient for clients.

To demonstrate the DTO approach, update the `Todo` class to include a secret field:

[language="csharp" source="\~/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/Todo.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/Todo.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/Todo.cs.md)

The secret field needs to be hidden from this app, but an administrative app could choose to expose it.

Verify you can post and get the secret field.

Create a file named `TodoItemDTO.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/TodoItemDTO.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/TodoItemDTO.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/TodoItemDTO.cs.md)

Replace the contents of the `Program.cs` file with the following code to use this DTO model:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/6.x/todoDTO/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/6.x/todoDTO/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/6.x/todoDTO/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/6.x/todoDTO_SwaggerVersion/Program.cs.md)

---

Verify you can post and get all fields except the secret field.

## Test Minimal API

For an example of testing a Minimal API app, see [this GitHub sample](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/minimal-apis/samples/MinApiTestsSample).

## Publish to Azure

For information on deploying to Azure, see [Quickstart: Deploy an ASP.NET web app](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore).

## Additional resources

* [fundamentals/minimal-apis](../fundamentals/minimal-apis.md)



**Applies to: \= aspnetcore-8.0**

Minimal APIs are architected to create HTTP APIs with minimal dependencies. They're ideal for microservices and apps that want to include only the minimum files, features, and dependencies in ASP.NET Core.

This tutorial teaches the basics of building a Minimal API with ASP.NET Core. Another approach to creating APIs in ASP.NET Core is to use controllers. For help with choosing between Minimal APIs and controller-based APIs, see [fundamentals/apis](../fundamentals/apis.md). For a tutorial on creating an API project based on [controllers](../web-api/index.md) that contains more features, see [Create a web API](first-web-api.md).

## Overview

This tutorial creates the following API:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /todoitems/complete` | Get completed to-do items | None | Array of to-do items |
| `GET /todoitems/{id}` | Get an item by ID | None | To-do item |
| `POST /todoitems` | Add a new item | To-do item | To-do item |
| `PUT /todoitems/{id}` | Update an existing item &nbsp; | To-do item | None |
| `PATCH /todoitems/{id}` | Partially update an item &nbsp; | Partial to-do item | None |
| `DELETE /todoitems/{id}` &nbsp; &nbsp; | Delete an item &nbsp; &nbsp; | None | None |

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

## Create an API project

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio 2022 and select **Create a new project**.
* In the **Create a new project** dialog:
  * Enter `Empty` in the **Search for templates** search box.
  * Select the **ASP.NET Core Empty** template and select **Next**.

  Visual Studio Create a new project

* Name the project *TodoApi* and select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 8.0 (Long Term Support)**
  * Uncheck **Do not use top-level statements**
  * Select **Create**

  Additional information

# [Visual Studio Code](#tab/visual-studio-code)

* Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change directories (`cd`) to the folder that will contain the project folder.
* Run the following commands:

  ```dotnetcli
  dotnet new web -o TodoApi
  cd TodoApi
  code -r ../TodoApi
  ```

* When a dialog box asks if you want to trust the authors, select **Yes**.
* When a dialog box asks if you want to add required assets to the project, select **Yes**.

  The preceding commands create a new ASP.NET Core project and open it in Visual Studio Code.

---

### Examine the code

The `Program.cs` file contains the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todo/Program.cs" id="snippet_min"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todo/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todo/Program.cs.md)

The preceding code:

* Creates a [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) and a [Microsoft.AspNetCore.Builder.WebApplication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication) with preconfigured defaults.
* Creates an HTTP GET endpoint `/` that returns `Hello World!`:

### Run the app

# [Visual Studio](#tab/visual-studio)

<!-- replace all of this with an include -->

Press Ctrl+F5 to run without the debugger.

Visual Studio displays the following dialog:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio launches the [Kestrel web server](../fundamentals/servers/kestrel.md) and opens a browser window.

`Hello World!` is displayed in the browser. The `Program.cs` file contains a minimal but complete app.

Close the browser window.

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


In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows) or <kbd>control</kbd>+<kbd>F5</kbd> (macOS) to run the app without debugging.

The default browser launches with the following URL: `https://localhost:<port>` where `<port>` is the randomly generated port number.

Close the browser window.

In Visual Studio Code, from the *Run* menu, select *Stop Debugging* or press <kbd>Shift</kbd>+<kbd>F5</kbd> to stop the app.

---

## Add NuGet packages

NuGet packages must be added to support the database and diagnostics used in this tutorial.

# [Visual Studio](#tab/visual-studio)

* From the **Tools** menu, select **NuGet Package Manager > Manage NuGet Packages for Solution**.
* Select the **Browse** tab.
* Enter **Microsoft.EntityFrameworkCore.InMemory** in the search box, and then select `Microsoft.EntityFrameworkCore.InMemory`.
* Select the **Project** checkbox in the right pane and then select **Install**.
* Follow the preceding instructions to add the `Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore` package.

# [Visual Studio Code](#tab/visual-studio-code)

* Run the following commands:

  ```dotnetcli
  dotnet add package Microsoft.EntityFrameworkCore.InMemory
  dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore
  ```

---

## The model and database context classes

* In the project folder, create a file named `Todo.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoGroup/Todo.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoGroup/Todo.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoGroup/Todo.cs.md)

The preceding code creates the model for this app. A *model* is a class that represents data that the app manages.

* Create a file named `TodoDb.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoGroup/TodoDb.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoGroup/TodoDb.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoGroup/TodoDb.cs.md)

The preceding code defines the *database context*, which is the main class that coordinates [Entity Framework](https://learn.microsoft.com/ef/core/) functionality for a data model. This class derives from the [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class.

## Add the API code

* Replace the contents of the `Program.cs` file with the following code:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/8.x/todo/Program.cs?name=snippet_all](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

The following highlighted code adds the database context to the [dependency injection (DI)](../fundamentals/dependency-injection.md) container and enables displaying database-related exceptions:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/8.x/todo/Program.cs?name=snippet_DI\\&highlight=2-3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

The DI container provides access to the database context and other services.

# [Visual Studio](#tab/visual-studio)

This tutorial uses [Endpoints Explorer and .http files](https://learn.microsoft.com/search/?terms=test%2Fhttp-files%23use-endpoints-explorer) to test the API.

# [Visual Studio Code](#tab/visual-studio-code)

## Create API testing UI with Swagger

There are many available web API testing tools to choose from, and you can follow this tutorial's introductory API test steps with your own preferred tool.

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

### Configure Swagger middleware

* Add the following highlighted code before `app` is defined in line `var app = builder.Build();`

  [Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/8.x/todo_SwaggerVersion/Program.cs?name=snippet_swagger_add_service\\&highlight=8-14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

In the previous code:

  * `builder.Services.AddEndpointsApiExplorer();`: Enables the API Explorer, which is a service that provides metadata about the HTTP API. The API Explorer is used by Swagger to generate the Swagger document.
  * `builder.Services.AddOpenApiDocument(config => {...});`: Adds the Swagger OpenAPI document generator to the application services and configures it to provide more information about the API, such as its title and version. For information on providing more robust API details, see [tutorials/get-started-with-nswag#customize-api-documentation](https://learn.microsoft.com/search/?terms=tutorials%2Fget-started-with-nswag%23customize-api-documentation)

* Add the following highlighted code to the next line after `app` is defined in line `var app = builder.Build();`

  [Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/8.x/todo_SwaggerVersion/Program.cs?name=snippet_swagger_enable_middleware\\&highlight=2-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

  The previous code enables the Swagger middleware for serving the generated JSON document and the Swagger UI. Swagger is only enabled in a development environment. Enabling Swagger in a production environment could expose potentially sensitive details about the API's structure and implementation.

<a name="post"></a>

---

## Test posting data

The following code in `Program.cs` creates an HTTP POST endpoint `/todoitems` that adds data to the in-memory database:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/8.x/todo/Program.cs?name=snippet_post](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

Run the app. The browser displays a 404 error because there's no longer a `/` endpoint.

The POST endpoint will be used to add data to the app.

# [Visual Studio](#tab/visual-studio)

* Select **View** > **Other Windows** > **Endpoints Explorer**.
* Right-click the **POST** endpoint and select **Generate request**.

  Endpoints Explorer context menu highlighting Generate Request menu item.

  A new file is created in the project folder named `TodoApi.http`, with contents similar to the following example:

  ```
  @TodoApi_HostAddress = https://localhost:7031

  Post {{TodoApi_HostAddress}}/todoitems

  ###
  ```

  * The first line creates a variable that is used for all of the endpoints.
  * The next line defines a POST request.
  * The triple hashtag (`###`) line is a request delimiter: what comes after it is for a different request.

* The POST request needs headers and a body. To define those parts of the request, add the following lines immediately after the POST request line:

  ```
  Content-Type: application/json
  
  {
    "name":"walk dog",
    "isComplete":true
  }
  ```
  
  The preceding code adds a Content-Type header and a JSON request body. The TodoApi.http file should now look like the following example, but with your port number:
  
  ```
  @TodoApi_HostAddress = https://localhost:7057
  
  Post {{TodoApi_HostAddress}}/todoitems
  Content-Type: application/json
  
  {
    "name":"walk dog",
    "isComplete":true
  }
  
  ###
  ```

* Run the app.

* Select the **Send request** link that is above the `POST` request line.

  .http file window with run link highlighted.

  The POST request is sent to the app and the response is displayed in the **Response** pane.

  .http file window with response from the POST request.

# [Visual Studio Code](#tab/visual-studio-code)

* With the app still running, in the browser, navigate to `https://localhost:<port>/swagger` to display the API testing page generated by Swagger.

  Swagger generated API testing page

* On the Swagger API testing page, select **Post /todoitems** > **Try it out**.
* Note that the **Request body** field contains a generated example format reflecting the parameters for the API.
* In the request body enter JSON for a to-do item, without specifying the optional `id`:

  ```json
  {
    "name":"walk dog",
    "isComplete":true
  }
  ```

* Select **Execute**.

  Swagger with Post request

Swagger provides a **Responses** pane below the **Execute** button. 

  Swagger with Post resonse

Note a few of the useful details:

* cURL: Swagger provides an example cURL command in Unix/Linux syntax, which can be run at the command line with any bash shell that uses Unix/Linux syntax, including Git Bash from [Git for Windows](https://git-scm.com/downloads).
* Request URL: A simplified representation of the HTTP request made by Swagger UI's JavaScript code for the API call. Actual requests can include details such as headers and query parameters and a request body.
* Server response: Includes the response body and headers. The response body shows the `id` was set to `1`.
* Response Code: A 201 `HTTP` status code was returned, indicating that the request was successfully processed and resulted in the creation of a new resource.
---

## Examine the GET endpoints

The sample app implements several GET endpoints by calling `MapGet`:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /todoitems/complete` | Get all completed to-do items | None | Array of to-do items |
| `GET /todoitems/{id}` | Get an item by ID | None | To-do item |

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/8.x/todo/Program.cs?name=snippet_get](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

## Test the GET endpoints

# [Visual Studio](#tab/visual-studio)

Test the app by calling the `GET` endpoints from a browser or by using **Endpoints Explorer**. The following steps are for **Endpoints Explorer**.

* In **Endpoints Explorer**, right-click the first **GET** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

  ```
  Get {{TodoApi_HostAddress}}/todoitems

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

* In **Endpoints Explorer**, right-click the `/todoitems/{id}` **GET** endpoint and select **Generate request**.
  The following content is added to the `TodoApi.http` file:

  ```
  GET {{TodoApi_HostAddress}}/todoitems/{id}

  ###
  ```

* Replace `{id}` with `1`.

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

* In Swagger select **GET /todoitems** > **Try it out** > **Execute**.

* Alternatively, call **GET /todoitems** from a browser by entering the URI `http://localhost:<port>/todoitems`. For example, `http://localhost:5001/todoitems`

The call to `GET /todoitems` produces a response similar to the following:

```json
[
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
]
```

* Call **GET /todoitems/{id}** in Swagger to return data from a specific id:
  * Select **GET /todoitems** > **Try it out**.
  * Set the **id** field to `1` and select **Execute**.

* Alternatively, call **GET /todoitems** from a browser by entering the URI `https://localhost:<port>/todoitems/1`. For example, `https://localhost:5001/todoitems/1`

* The response is similar to the following:

  ```json
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
  ```

---

This app uses an in-memory database. If the app is restarted, the GET request doesn't return any data. If no data is returned, [POST](#post) data to the app and try the GET request again.

## Return values

ASP.NET Core automatically serializes the object to [JSON](https://www.json.org) and writes the JSON into the body of the response message. The response code for this return type is [200 OK](https://developer.mozilla.org/docs/Web/HTTP/Status/200), assuming there are no unhandled exceptions. Unhandled exceptions are translated into 5xx errors.

The return types can represent a wide range of HTTP status codes. For example, `GET /todoitems/{id}` can return two different status values:

* If no item matches the requested ID, the method returns a [404 status](https://developer.mozilla.org/docs/Web/HTTP/Status/404) [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) error code.
* Otherwise, the method returns 200 with a JSON response body. Returning `item` results in an HTTP 200 response.

## Examine the PUT endpoint

The sample app implements a single PUT endpoint using `MapPut`:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/8.x/todo/Program.cs?name=snippet_put](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

This method is similar to the `MapPost` method, except it uses HTTP PUT. A successful response returns [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204). According to the HTTP specification, a PUT request requires the client to send the entire updated entity, not just the changes. To support partial updates, use [HTTP PATCH](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPatchAttribute).

## Test the PUT endpoint

This sample uses an in-memory database that must be initialized each time the app is started. There must be an item in the database before you make a PUT call. Call GET to ensure there's an item in the database before making a PUT call.

Update the to-do item that has `Id = 1` and set its name to `"feed fish"`.

# [Visual Studio](#tab/visual-studio)

* In **Endpoints Explorer**, right-click the **PUT** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

  ```
  Put {{TodoApi_HostAddress}}/todoitems/{id}

  ###
  ```

* In the PUT request line, replace `{id}` with `1`.

* Add the following lines immediately after the PUT request line:

  ```
  Content-Type: application/json

  {
    "name": "feed fish",
    "isComplete": false
  }
  ```

  The preceding code adds a Content-Type header and a JSON request body.

* Select the **Send request** link that is above the new PUT request line.

  The PUT request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.
  
# [Visual Studio Code](#tab/visual-studio-code)

Use Swagger to send a PUT request:

* Select **Put /todoitems/{id}** > **Try it out**.

* Set the **id** field to `1`.

* Set the request body to the following JSON:

  ```json
  {
    "name": "feed fish",
    "isComplete": false
  }
  ```

* Select **Execute**.

---

## Examine the PATCH endpoint

Create a file named `TodoPatchDto.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todo/TodoPatchDto.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todo/TodoPatchDto.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todo/TodoPatchDto.cs.md)

The `TodoPatchDto` class uses nullable properties (`string?` and `bool?`) to distinguish between a field that wasn't provided in the request versus a field explicitly set to a value.

The sample app implements a single PATCH endpoint using `MapPatch`:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/8.x/todo/Program.cs?name=snippet_patch](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

This method is similar to the `MapPut` method, except it uses HTTP PATCH and only updates the fields provided in the request. A successful response returns [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204). According to the HTTP specification, a PATCH request enables partial updates, allowing clients to send only the fields that need to be changed.

The PATCH endpoint uses a `TodoPatchDto` class with nullable properties to properly handle partial updates. Using nullable properties allows the endpoint to distinguish between a field that wasn't provided (null) versus a field explicitly set to a value (including false for boolean fields). Without nullable properties, a non-nullable bool would default to false, potentially overwriting an existing true value when that field wasn't included in the request.

> **Note:**
> PATCH operations allow partial updates to resources. For more advanced partial updates using JSON Patch documents, see [web-api/jsonpatch](../web-api/jsonpatch.md).

## Test the PATCH endpoint

This sample uses an in-memory database that must be initialized each time the app is started. There must be an item in the database before you make a PATCH call. Call GET to ensure there's an item in the database before making a PATCH call.

Update only the `name` property of the to-do item that has `Id = 1` and set its name to `"run errands"`.

# [Visual Studio](#tab/visual-studio)

* In **Endpoints Explorer**, right-click the **PATCH** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

  ```http
  PATCH {{TodoApi_HostAddress}}/todoitems/{id}

  ###
  ```

* In the PATCH request line, replace `{id}` with `1`.

* Add the following lines immediately after the PATCH request line:

  ```http
  Content-Type: application/json

  {
    "name": "run errands"
  }
  ```

  The preceding code adds a Content-Type header and a JSON request body with only the field to update.

* Select the **Send request** link that is above the new PATCH request line.

  The PATCH request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.
  
# [Visual Studio Code](#tab/visual-studio-code)

Use Swagger to send a PATCH request:

* Select **Patch /todoitems/{id}** > **Try it out**.

* Set the **id** field to `1`.

* Set the request body to the following JSON:

  ```json
  {
    "name": "run errands"
  }
  ```

* Select **Execute**.

---

## Examine and test the DELETE endpoint

The sample app implements a single DELETE endpoint using `MapDelete`:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/8.x/todo/Program.cs?name=snippet_delete](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

# [Visual Studio](#tab/visual-studio)

* In **Endpoints Explorer**, right-click the **DELETE** endpoint and select **Generate request**.

  A DELETE request is added to `TodoApi.http`.

* Replace `{id}` in the DELETE request line with `1`. The DELETE request should look like the following example:

  ```
  DELETE {{TodoApi_HostAddress}}/todoitems/1

  ###
  ```

* Select the **Send request** link for the DELETE request.

  The DELETE request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.
  
# [Visual Studio Code](#tab/visual-studio-code)

Use Swagger to send a DELETE request:

* Select **DELETE /todoitems/{id}** > **Try it out**.
* Set the **ID** field to `1` and select **Execute**.

  The DELETE request is sent to the app and the response is displayed in the **Responses** pane. The response body is empty, and the **Server response** status code is 204.

---

## Use the MapGroup API

The sample app code repeats the `todoitems` URL prefix each time it sets up an endpoint. APIs often have groups of endpoints with a common URL prefix, and the [Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%252A) method is available to help organize such groups. It reduces repetitive code and allows for customizing entire groups of endpoints with a single call to methods like [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A) and [Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata%252A).

Replace the contents of `Program.cs` with the following code:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoGroup/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoGroup/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoGroup/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoGroup_SwaggerVersion/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoGroup_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoGroup_SwaggerVersion/Program.cs.md)

---

The preceding code has the following changes:

* Adds `var todoItems = app.MapGroup("/todoitems");` to set up the group using the URL prefix `/todoitems`.
* Changes all the `app.Map<HttpVerb>` methods to `todoItems.Map<HttpVerb>`.
* Removes the URL prefix `/todoitems` from the `Map<HttpVerb>` method calls.

Test the endpoints to verify that they work the same.

## Use the TypedResults API

Returning [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) rather than [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) has several advantages, including testability and automatically returning the response type metadata for OpenAPI to describe the endpoint. For more information, see [`TypedResults` versus `Results`](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23typedresults-versus-results).

The `Map<HttpVerb>` methods can call route handler methods instead of using lambdas. To see an example, update *Program.cs* with the following code:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoTypedResults_SwaggerVersion/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoTypedResults_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoTypedResults_SwaggerVersion/Program.cs.md)

---

The `Map<HttpVerb>` code now calls methods instead of lambdas:

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs" id="snippet_group"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs.md)

These methods return objects that implement [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult) and are defined by [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults):

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs" id="snippet_handlers"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs.md)

Unit tests can call these methods and test that they return the correct type. For example, if the method is `GetAllTodos`:

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs" id="snippet_getalltodos"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoTypedResults/Program.cs.md)

Unit test code can verify that an object of type [Ok\<Todo\[\]>](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.Ok%25601.Value) is returned from the handler method. For example:

```csharp
public async Task GetAllTodos_ReturnsOkOfTodosResult()
{
    // Arrange
    var db = CreateDbContext();

    // Act
    var result = await TodosApi.GetAllTodos(db);

    // Assert: Check for the correct returned type
    Assert.IsType<Ok<Todo[]>>(result);
}
```

<a name="over-post-v7"></a>

## Prevent over-posting

Currently the sample app exposes the entire `Todo` object. Production apps In production applications, a subset of the model is often used to restrict the data that can be input and returned. There are multiple reasons behind this and security is a major one. The subset of a model is usually referred to as a Data Transfer Object (DTO), input model, or view model. **DTO** is used in this article.

A DTO can be used to:

* Prevent over-posting.
* Hide properties that clients aren't supposed to view.
* Omit some properties to reduce payload size.
* Flatten object graphs that contain nested objects. Flattened object graphs can be more convenient for clients.

To demonstrate the DTO approach, update the `Todo` class to include a secret field:

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoDTO/Todo.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoDTO/Todo.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoDTO/Todo.cs.md)

The secret field needs to be hidden from this app, but an administrative app could choose to expose it.

Verify you can post and get the secret field.

Create a file named `TodoItemDTO.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoDTO/TodoItemDTO.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoDTO/TodoItemDTO.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoDTO/TodoItemDTO.cs.md)

Replace the contents of the `Program.cs` file with the following code to use this DTO model:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoDTO/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoDTO/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoDTO/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/8.x/todoDTO_SwaggerVersion/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/8.x/todoDTO_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/8.x/todoDTO_SwaggerVersion/Program.cs.md)

---

Verify you can post and get all fields except the secret field.

<a name="diff-v7"></a>

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/min-web-api/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

* [Configure JSON serialization options](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23configure-json-serialization-options).
* Handle errors and exceptions: The [developer exception page](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling-api%23developer-exception-page) is enabled by default in the `Development` environment for Minimal API apps. For information about how to handle errors and exceptions, see [Handle errors in ASP.NET Core APIs](../fundamentals/error-handling-api.md).
* For an example of testing a Minimal API app, see [this GitHub sample](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/minimal-apis/samples/MinApiTestsSample).
* [OpenAPI support in Minimal APIs](../fundamentals/openapi/aspnetcore-openapi.md).
* [Quickstart: Publish to Azure](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore).
* [Organizing ASP.NET Core Minimal APIs](https://www.tessferrandez.com/blog/2023/10/31/organizing-minimal-apis.html).

### Learn more

See [fundamentals/minimal-apis](../fundamentals/minimal-apis.md)



**Applies to: \= aspnetcore-9.0**

Minimal APIs are architected to create HTTP APIs with minimal dependencies. They're ideal for microservices and apps that want to include only the minimum files, features, and dependencies in ASP.NET Core.

This tutorial teaches the basics of building a Minimal API with ASP.NET Core. Another approach to creating APIs in ASP.NET Core is to use controllers. For help with choosing between Minimal APIs and controller-based APIs, see [fundamentals/apis](../fundamentals/apis.md). For a tutorial on creating an API project based on [controllers](../web-api/index.md) that contains more features, see [Create a web API](first-web-api.md).

## Overview

This tutorial creates the following API:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /todoitems/complete` | Get completed to-do items | None | Array of to-do items |
| `GET /todoitems/{id}` | Get an item by ID | None | To-do item |
| `POST /todoitems` | Add a new item | To-do item | To-do item |
| `PUT /todoitems/{id}` | Update an existing item &nbsp; | To-do item | None |
| `PATCH /todoitems/{id}` | Partially update an item &nbsp; | Partial to-do item | None |
| `DELETE /todoitems/{id}` &nbsp; &nbsp; | Delete an item &nbsp; &nbsp; | None | None |

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

## Create an API project

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio 2022 and select **Create a new project**.
* In the **Create a new project** dialog:
  * Enter `Empty` in the **Search for templates** search box.
  * Select the **ASP.NET Core Empty** template and select **Next**.

  Visual Studio Create a new project

* Name the project *TodoApi* and select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 9.0**
  * Uncheck **Do not use top-level statements**
  * Select **Create**

  Additional information

# [Visual Studio Code](#tab/visual-studio-code)

* Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change directories (`cd`) to the folder that will contain the project folder.
* Run the following commands:

  ```dotnetcli
  dotnet new web -o TodoApi
  cd TodoApi
  code -r ../TodoApi
  ```

* When a dialog box asks if you want to trust the authors, select **Yes**.
* When a dialog box asks if you want to add required assets to the project, select **Yes**.

  The preceding commands create a new ASP.NET Core project and open it in Visual Studio Code.

---

### Examine the code

The `Program.cs` file contains the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todo/Program.cs" id="snippet_min"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todo/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todo/Program.cs.md)

The preceding code:

* Creates a [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) and a [Microsoft.AspNetCore.Builder.WebApplication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication) with preconfigured defaults.
* Creates an HTTP GET endpoint `/` that returns `Hello World!`.

### Run the app

# [Visual Studio](#tab/visual-studio)


Press Ctrl+F5 to run without the debugger.

Visual Studio displays the following dialog:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio launches the [Kestrel web server](../fundamentals/servers/kestrel.md) and opens a browser window.

`Hello World!` is displayed in the browser. The `Program.cs` file contains a minimal but complete app.

Close the browser window.

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


In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows) or <kbd>control</kbd>+<kbd>F5</kbd> (macOS) to run the app without debugging.

The default browser launches with the following URL: `https://localhost:{PORT}` where `{PORT}` is the randomly generated port number.

Close the browser window.

In Visual Studio Code, from the *Run* menu, select *Stop Debugging* or press <kbd>Shift</kbd>+<kbd>F5</kbd> to stop the app.

---

## Add NuGet packages

NuGet packages must be added to support the database and diagnostics used in this tutorial.

# [Visual Studio](#tab/visual-studio)

* From the **Tools** menu, select **NuGet Package Manager > Manage NuGet Packages for Solution**.
* Select the **Browse** tab.
* Select **Include prerelease**.
* Enter **Microsoft.EntityFrameworkCore.InMemory** in the search box, and then select `Microsoft.EntityFrameworkCore.InMemory`.
* Select the **Project** checkbox in the right pane and then select **Install**.
* Follow the preceding instructions to add the `Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore` package.

# [Visual Studio Code](#tab/visual-studio-code)

* Run the following commands:

  ```dotnetcli
  dotnet add package Microsoft.EntityFrameworkCore.InMemory
  dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore
  ```

---

## The model and database context classes

* In the project folder, create a file named `Todo.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoGroup/Todo.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoGroup/Todo.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoGroup/Todo.cs.md)

The preceding code creates the model for this app. A *model* is a class that represents data that the app manages.

* Create a file named `TodoDb.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoGroup/TodoDb.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoGroup/TodoDb.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoGroup/TodoDb.cs.md)

The preceding code defines the *database context*, which is the main class that coordinates [Entity Framework](https://learn.microsoft.com/ef/core/) functionality for a data model. This class derives from the [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class.

## Add the API code

* Replace the contents of the `Program.cs` file with the following code:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/9.x/todo/Program.cs?name=snippet_all](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

The following highlighted code adds the database context to the [dependency injection (DI)](../fundamentals/dependency-injection.md) container and enables displaying database-related exceptions:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/9.x/todo/Program.cs?name=snippet_DI\\&highlight=2-3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

The DI container provides access to the database context and other services.

# [Visual Studio](#tab/visual-studio)

This tutorial uses [Endpoints Explorer and .http files](https://learn.microsoft.com/search/?terms=test%2Fhttp-files%23use-endpoints-explorer) to test the API.

# [Visual Studio Code](#tab/visual-studio-code)

## Create API testing UI with Swagger

There are many available web API testing tools to choose from, and you can follow this tutorial's introductory API test steps with your own preferred tool.

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

### Configure Swagger middleware

* In Program.cs add the following highlighted code before `app` is defined in line `var app = builder.Build();`

  [Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/9.x/todo_SwaggerVersion/Program.cs?name=snippet_swagger_add_service\\&highlight=7-13](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

In the previous code:

  * `builder.Services.AddEndpointsApiExplorer();`: Enables the API Explorer, which is a service that provides metadata about the HTTP API. The API Explorer is used by Swagger to generate the Swagger document.
  * `builder.Services.AddOpenApiDocument(config => {...});`: Adds the Swagger OpenAPI document generator to the application services and configures it to provide more information about the API, such as its title and version. For information on providing more robust API details, see [tutorials/get-started-with-nswag#customize-api-documentation](https://learn.microsoft.com/search/?terms=tutorials%2Fget-started-with-nswag%23customize-api-documentation)

* Add the following highlighted code to the next line after `app` is defined in line `var app = builder.Build();`

  [Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/9.x/todo_SwaggerVersion/Program.cs?name=snippet_swagger_enable_middleware\\&highlight=2-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

  The previous code enables the Swagger middleware for serving the generated JSON document and the Swagger UI. Swagger is only enabled in a development environment. Enabling Swagger in a production environment could expose potentially sensitive details about the API's structure and implementation.

<a name="post"></a>

---

## Test posting data

The following code in `Program.cs` creates an HTTP POST endpoint `/todoitems` that adds data to the in-memory database:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/9.x/todo/Program.cs?name=snippet_post](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

Run the app. The browser displays a 404 error because there's no longer a `/` endpoint.

The POST endpoint will be used to add data to the app.

# [Visual Studio](#tab/visual-studio)

* Select **View** > **Other Windows** > **Endpoints Explorer**.
* Right-click the **POST** endpoint and select **Generate request**.

  Endpoints Explorer context menu highlighting Generate Request menu item.

  A new file is created in the project folder named `TodoApi.http`, with contents similar to the following example:

  ```http
  @TodoApi_HostAddress = https://localhost:7031

  POST {{TodoApi_HostAddress}}/todoitems

  ###
  ```

  * The first line creates a variable that is used for all of the endpoints.
  * The next line defines a POST request.
  * The triple hashtag (`###`) line is a request delimiter: what comes after it is for a different request.

* The POST request needs headers and a body. To define those parts of the request, add the following lines immediately after the POST request line:

  ```
  Content-Type: application/json
  
  {
    "name":"walk dog",
    "isComplete":true
  }
  ```
  
  The preceding code adds a Content-Type header and a JSON request body. The TodoApi.http file should now look like the following example, but with your port number:
  
  ```http
  @TodoApi_HostAddress = https://localhost:7057
  
  POST {{TodoApi_HostAddress}}/todoitems
  Content-Type: application/json
  
  {
    "name":"walk dog",
    "isComplete":true
  }
  
  ###
  ```

* Run the app.

* Select the **Send request** link that is above the `POST` request line.

  .http file window with run link highlighted.

  The POST request is sent to the app and the response is displayed in the **Response** pane.

  .http file window with response from the POST request.

# [Visual Studio Code](#tab/visual-studio-code)

* With the app still running, in the browser, navigate to `https://localhost:{PORT}/swagger` to display the API testing page generated by Swagger.

  Swagger generated API testing page

* On the Swagger API testing page, select **Post /todoitems** > **Try it out**.
* Note that the **Request body** field contains a generated example format reflecting the parameters for the API.
* In the request body enter JSON for a to-do item, without specifying the optional `id`:

  ```json
  {
    "name":"walk dog",
    "isComplete":true
  }
  ```

* Select **Execute**.

  Swagger with Post request

Swagger provides a **Responses** pane below the **Execute** button. 

  Swagger with Post response

Note a few of the useful details:

* cURL: Swagger provides an example cURL command in Unix/Linux syntax, which can be run at the command line with any bash shell that uses Unix/Linux syntax, including Git Bash from [Git for Windows](https://git-scm.com/downloads).
* Request URL: A simplified representation of the HTTP request made by Swagger UI's JavaScript code for the API call. Actual requests can include details such as headers and query parameters and a request body.
* Server response: Includes the response body and headers. The response body shows the `id` was set to `1`.
* Response Code: A 201 `HTTP` status code was returned, indicating that the request was successfully processed and resulted in the creation of a new resource.

---

## Examine the GET endpoints

The sample app implements several GET endpoints by calling `MapGet`:

| API | Description | Request body | Response body |
| --- | --- | --- | --- |
| `GET /todoitems` | Get all to-do items | None | Array of to-do items |
| `GET /todoitems/complete` | Get all completed to-do items | None | Array of to-do items |
| `GET /todoitems/{id}` | Get an item by ID | None | To-do item |

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/9.x/todo/Program.cs?name=snippet_get](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

## Test the GET endpoints

# [Visual Studio](#tab/visual-studio)

Test the app by calling the `GET` endpoints from a browser or by using **Endpoints Explorer**. The following steps are for **Endpoints Explorer**.

* In **Endpoints Explorer**, right-click the first **GET** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

  ```http
  GET {{TodoApi_HostAddress}}/todoitems

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

* In **Endpoints Explorer**, right-click the `/todoitems/{id}` **GET** endpoint and select **Generate request**.
  The following content is added to the `TodoApi.http` file:

  ```http
  GET {{TodoApi_HostAddress}}/todoitems/{id}

  ###
  ```

* Replace `{id}` with `1`.

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

* In Swagger select **GET /todoitems** > **Try it out** > **Execute**.

* Alternatively, call **GET /todoitems** from a browser by entering the URI `http://localhost:{PORT}/todoitems`. For example, `http://localhost:5001/todoitems`

The call to `GET /todoitems` produces a response similar to the following:

```json
[
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
]
```

* Call **GET /todoitems/{id}** in Swagger to return data from a specific id:
  * Select **GET /todoitems** > **Try it out**.
  * Set the **id** field to `1` and select **Execute**.

* Alternatively, call **GET /todoitems** from a browser by entering the URI `https://localhost:{PORT}/todoitems/1`. For example, `https://localhost:5001/todoitems/1`

* The response is similar to the following:

  ```json
  {
    "id": 1,
    "name": "walk dog",
    "isComplete": true
  }
  ```

---

This app uses an in-memory database. If the app is restarted, the GET request doesn't return any data. If no data is returned, [POST](#post) data to the app and try the GET request again.

## Return values

ASP.NET Core automatically serializes the object to [JSON](https://www.json.org) and writes the JSON into the body of the response message. The response code for this return type is [200 OK](https://developer.mozilla.org/docs/Web/HTTP/Status/200), assuming there are no unhandled exceptions. Unhandled exceptions are translated into 5xx errors.

The return types can represent a wide range of HTTP status codes. For example, `GET /todoitems/{id}` can return two different status values:

* If no item matches the requested ID, the method returns a [404 status](https://developer.mozilla.org/docs/Web/HTTP/Status/404) [Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ControllerBase.NotFound%252A) error code.
* Otherwise, the method returns 200 with a JSON response body. Returning `item` results in an HTTP 200 response.

## Examine the PUT endpoint

The sample app implements a single PUT endpoint using `MapPut`:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/9.x/todo/Program.cs?name=snippet_put](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

This method is similar to the `MapPost` method, except it uses HTTP PUT. A successful response returns [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204). According to the HTTP specification, a PUT request requires the client to send the entire updated entity, not just the changes. To support partial updates, use [HTTP PATCH](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.HttpPatchAttribute).

## Test the PUT endpoint

This sample uses an in-memory database that must be initialized each time the app is started. There must be an item in the database before you make a PUT call. Call GET to ensure there's an item in the database before making a PUT call.

Update the to-do item that has `Id = 1` and set its name to `"feed fish"`.

# [Visual Studio](#tab/visual-studio)

* In **Endpoints Explorer**, right-click the **PUT** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

  ```http
  PUT {{TodoApi_HostAddress}}/todoitems/{id}

  ###
  ```

* In the PUT request line, replace `{id}` with `1`.

* Add the following lines immediately after the PUT request line:

  ```http
  Content-Type: application/json

  {
    "id": 1,
    "name": "feed fish",
    "isComplete": false
  }
  ```

  The preceding code adds a Content-Type header and a JSON request body.

* Select the **Send request** link that is above the new PUT request line.

  The PUT request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.
  
# [Visual Studio Code](#tab/visual-studio-code)

Use Swagger to send a PUT request:

* Select **Put /todoitems/{id}** > **Try it out**.

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

## Examine the PATCH endpoint

Create a file named `TodoPatchDto.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todo/TodoPatchDto.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todo/TodoPatchDto.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todo/TodoPatchDto.cs.md)

The `TodoPatchDto` class uses nullable properties (`string?` and `bool?`) to distinguish between a field that wasn't provided in the request versus a field explicitly set to a value.

The sample app implements a single PATCH endpoint using `MapPatch`:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/9.x/todo/Program.cs?name=snippet_patch](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

This method is similar to the `MapPut` method, except it uses HTTP PATCH and only updates the fields provided in the request. A successful response returns [204 (No Content)](https://www.rfc-editor.org/rfc/rfc9110#status.204). According to the HTTP specification, a PATCH request enables partial updates, allowing clients to send only the fields that need to be changed.

The PATCH endpoint uses a `TodoPatchDto` class with nullable properties to properly handle partial updates. Using nullable properties allows the endpoint to distinguish between a field that wasn't provided (null) versus a field explicitly set to a value (including false for boolean fields). Without nullable properties, a non-nullable bool would default to false, potentially overwriting an existing true value when that field wasn't included in the request.

> **Note:**
> PATCH operations allow partial updates to resources. For more advanced partial updates using JSON Patch documents, see [web-api/jsonpatch](../web-api/jsonpatch.md).

## Test the PATCH endpoint

This sample uses an in-memory database that must be initialized each time the app is started. There must be an item in the database before you make a PATCH call. Call GET to ensure there's an item in the database before making a PATCH call.

Update only the `name` property of the to-do item that has `Id = 1` and set its name to `"run errands"`.

# [Visual Studio](#tab/visual-studio)

* In **Endpoints Explorer**, right-click the **PATCH** endpoint, and select **Generate request**.

  The following content is added to the `TodoApi.http` file:

  ```http
  PATCH {{TodoApi_HostAddress}}/todoitems/{id}

  ###
  ```

* In the PATCH request line, replace `{id}` with `1`.

* Add the following lines immediately after the PATCH request line:

  ```http
  Content-Type: application/json

  {
    "name": "run errands"
  }
  ```

  The preceding code adds a Content-Type header and a JSON request body with only the field to update.

* Select the **Send request** link that is above the new PATCH request line.

  The PATCH request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.
  
# [Visual Studio Code](#tab/visual-studio-code)

Use Swagger to send a PATCH request:

* Select **Patch /todoitems/{id}** > **Try it out**.

* Set the **id** field to `1`.

* Set the request body to the following JSON:

  ```json
  {
    "name": "run errands"
  }
  ```

* Select **Execute**.

---

## Examine and test the DELETE endpoint

The sample app implements a single DELETE endpoint using `MapDelete`:

[Code reference unavailable in this source snapshot: min-web-api/includes/~/tutorials/min-web-api/samples/9.x/todo/Program.cs?name=snippet_delete](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/min-web-api.md)

# [Visual Studio](#tab/visual-studio)

* In **Endpoints Explorer**, right-click the **DELETE** endpoint and select **Generate request**.

  A DELETE request is added to `TodoApi.http`.

* Replace `{id}` in the DELETE request line with `1`. The DELETE request should look like the following example:

  ```http
  DELETE {{TodoApi_HostAddress}}/todoitems/1

  ###
  ```

* Select the **Send request** link for the DELETE request.

  The DELETE request is sent to the app and the response is displayed in the **Response** pane. The response body is empty, and the status code is 204.
  
# [Visual Studio Code](#tab/visual-studio-code)

Use Swagger to send a DELETE request:

* Select **DELETE /todoitems/{id}** > **Try it out**.
* Set the **ID** field to `1` and select **Execute**.

  The DELETE request is sent to the app and the response is displayed in the **Responses** pane. The response body is empty, and the **Server response** status code is 204.

---

## Use the MapGroup API

The sample app code repeats the `todoitems` URL prefix each time it sets up an endpoint. APIs often have groups of endpoints with a common URL prefix, and the [Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGroup%252A) method is available to help organize such groups. It reduces repetitive code and allows for customizing entire groups of endpoints with a single call to methods like [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A) and [Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithMetadata%252A).

Replace the contents of `Program.cs` with the following code:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoGroup/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoGroup/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoGroup/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoGroup_SwaggerVersion/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoGroup_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoGroup_SwaggerVersion/Program.cs.md)

---

The preceding code has the following changes:

* Adds `var todoItems = app.MapGroup("/todoitems");` to set up the group using the URL prefix `/todoitems`.
* Changes all the `app.Map<HttpVerb>` methods to `todoItems.Map<HttpVerb>`.
* Removes the URL prefix `/todoitems` from the `Map<HttpVerb>` method calls.

Test the endpoints to verify that they work the same.

## Use the TypedResults API

Returning [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) rather than [Microsoft.AspNetCore.Http.Results](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Results) has several advantages, including testability and automatically returning the response type metadata for OpenAPI to describe the endpoint. For more information, see [`TypedResults` versus `Results`](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23typedresults-versus-results).

The `Map<HttpVerb>` methods can call route handler methods instead of using lambdas. To see an example, update *Program.cs* with the following code:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoTypedResults_SwaggerVersion/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoTypedResults_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoTypedResults_SwaggerVersion/Program.cs.md)

---

The `Map<HttpVerb>` code now calls methods instead of lambdas:

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs" id="snippet_group"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs.md)

These methods return objects that implement [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult) and are defined by [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults):

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs" id="snippet_handlers"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs.md)

Unit tests can call these methods and test that they return the correct type. For example, if the method is `GetAllTodos`:

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs" id="snippet_getalltodos"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoTypedResults/Program.cs.md)

Unit test code can verify that an object of type [Ok\<Todo\[\]>](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.Ok%25601.Value) is returned from the handler method. For example:

```csharp
public async Task GetAllTodos_ReturnsOkOfTodosResult()
{
    // Arrange
    var db = CreateDbContext();

    // Act
    var result = await TodosApi.GetAllTodos(db);

    // Assert: Check for the correct returned type
    Assert.IsType<Ok<Todo[]>>(result);
}
```

<a name="over-post-v7"></a>

## Prevent over-posting

Currently the sample app exposes the entire `Todo` object. In production applications, a subset of the model is often used to restrict the data that can be input and returned. There are multiple reasons behind this and security is a major one. The subset of a model is usually referred to as a Data Transfer Object (DTO), input model, or view model. **DTO** is used in this article.

A DTO can be used to:

* Prevent over-posting.
* Hide properties that clients aren't supposed to view.
* Omit some properties to reduce payload size.
* Flatten object graphs that contain nested objects. Flattened object graphs can be more convenient for clients.

To demonstrate the DTO approach, update the `Todo` class to include a secret field:

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoDTO/Todo.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoDTO/Todo.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoDTO/Todo.cs.md)

The secret field needs to be hidden from this app, but an administrative app could choose to expose it.

Verify you can post and get the secret field.

Create a file named `TodoItemDTO.cs` with the following code:

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoDTO/TodoItemDTO.cs"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoDTO/TodoItemDTO.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoDTO/TodoItemDTO.cs.md)

Replace the contents of the `Program.cs` file with the following code to use this DTO model:

# [Visual Studio](#tab/visual-studio)

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoDTO/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoDTO/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoDTO/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[language="csharp" source="\~/tutorials/min-web-api/samples/9.x/todoDTO_SwaggerVersion/Program.cs" id="snippet_all"::: (complete source file; reference: \~/tutorials/min-web-api/samples/9.x/todoDTO_SwaggerVersion/Program.cs)](../../_code/aspnetcore/tutorials/min-web-api/samples/9.x/todoDTO_SwaggerVersion/Program.cs.md)

---

Verify you can post and get all fields except the secret field.

<a name="diff-v7"></a>

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/min-web-api/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

* [Configure JSON serialization options](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%2Fresponses%23configure-json-serialization-options).
* Handle errors and exceptions: The [developer exception page](https://learn.microsoft.com/search/?terms=fundamentals%2Ferror-handling-api%23developer-exception-page) is enabled by default in the `Development` environment for Minimal API apps. For information about how to handle errors and exceptions, see [Handle errors in ASP.NET Core APIs](../fundamentals/error-handling-api.md).
* For an example of testing a Minimal API app, see [this GitHub sample](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/minimal-apis/samples/MinApiTestsSample).
* [OpenAPI support in Minimal APIs](../fundamentals/openapi/aspnetcore-openapi.md).
* [Quickstart: Publish to Azure](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore).
* [Organizing ASP.NET Core Minimal APIs](https://www.tessferrandez.com/blog/2023/10/31/organizing-minimal-apis.html).

### Learn more

See [fundamentals/minimal-apis](../fundamentals/minimal-apis.md)
