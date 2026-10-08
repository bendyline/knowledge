---
title: Part 2, add a controller to an ASP.NET Core MVC app
author: wadepickett
description: Part 2 of tutorial series on ASP.NET Core MVC.
ms.author: wpickett
ms.date: 09/06/2026
monikerRange: '>= aspnetcore-3.1'
uid: tutorials/first-mvc-app/adding-controller
---

# Part 2, add a controller to an ASP.NET Core MVC app

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


**Applies to: \>= aspnetcore-10.0**

The Model-View-Controller (MVC) architectural pattern separates an app into three main components: **M**odel, **V**iew, and **C**ontroller. The MVC pattern helps you create apps that are more testable and easier to update than traditional monolithic apps.

MVC-based apps contain:

* **M**odels: Classes that represent the data of the app. The model classes use validation logic to enforce business rules for that data. Typically, model objects retrieve and store model state in a database. In this tutorial, a `Movie` model retrieves movie data from a database, provides it to the view or updates it. Updated data is written to a database.
* **V**iews: Views are the components that display the app's user interface (UI). Generally, this UI displays the model data.
* **C**ontrollers: Classes that:
  * Handle browser requests.
  * Invoke model logic to retrieve or modify data.
  * Call view templates that return a response.

In an MVC app, the view only displays information. The controller handles and responds to user input and interaction. For example, the controller handles URL segments and query-string values, and passes these values to the model. The model might use these values to query the database. For example:

* `https://localhost:5001/Home/Privacy`: specifies the `Home` controller and the `Privacy` action.
* `https://localhost:5001/Movies/Edit/5`: is a request to edit the movie with ID=5 using the `Movies` controller and the `Edit` action, which are detailed later in the tutorial.

Route data is explained later in the tutorial.

The MVC architectural pattern separates an app into three main groups of components: Models, Views, and Controllers. This pattern helps to achieve separation of concerns: The UI logic belongs in the view. Input logic belongs in the controller. Business logic belongs in the model. This separation helps manage complexity when building an app, because it enables work on one aspect of the implementation at a time without impacting the code of another. For example, you can work on the view code without depending on the business logic code.

These concepts are introduced and demonstrated in this tutorial series while building a movie app. The MVC project contains folders for the *Controllers* and *Views*.

## Add a controller

# [Visual Studio](#tab/visual-studio)

In **Solution Explorer**, right-click **Controllers > Add > Controller**.

Solution Explorer, right click Controllers > Add > Controller.

In the **Add New Scaffolded Item** dialog box, select **MVC Controller - Empty** > **Add**.

Add MVC controller.

In the **Add New Item - MvcMovie** dialog, enter *`HelloWorldController.cs`* and select **Add**.

# [Visual Studio Code](#tab/visual-studio-code)

Select the **EXPLORER** icon and then control-click (right-click) **Controllers > New File** and name the new file `HelloWorldController.cs`.

Contextual menu.

---

Replace the contents of `Controllers/HelloWorldController.cs` with the following code:

  [Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie10/Controllers/HelloWorldController.cs?name=snippet_First)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Controllers/HelloWorldController.cs.md)

Every `public` method in a controller is callable as an HTTP endpoint. In the sample above, both methods return a string. Note the comments preceding each method.

An HTTP endpoint:

* Is a targetable URL in the web application, such as `https://localhost:5001/HelloWorld`.
* Combines:
  * The protocol used: `HTTPS`.
  * The network location of the web server, including the TCP port: `localhost:5001`.
  * The target URI: `HelloWorld`.

The first comment states this is an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods/GET) method that's invoked by appending `/HelloWorld/` to the base URL.

The second comment specifies an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods) method that's invoked by appending `/HelloWorld/Welcome/` to the URL. Later on in the tutorial, the scaffolding engine is used to generate `HTTP POST` methods, which update data.

Run the app without the debugger by pressing <kbd>Ctrl</kbd>+<kbd>F5</kbd>.

Append `/HelloWorld` to the path in the address bar. The `Index` method returns a string.

Browser window showing an app response of This is my default action.

MVC invokes controller classes, and the action methods within them, depending on the incoming URL. The default [URL routing logic](../../mvc/controllers/routing.md) used by MVC, uses a format like this to determine what code to invoke:

`/[Controller]/[ActionName]/[Parameters]`

The routing format is set in the `Program.cs` file.

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs?name=snippet_MapControllerRoute\&highlight=3)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs.md)

When you browse to the app and don't supply any URL segments, it defaults to the "Home" controller and the "Index" method specified in the template line highlighted above.  In the preceding URL segments:

* The first URL segment determines the controller class to run. So `localhost:5001/HelloWorld` maps to the **HelloWorld** Controller class.
* The second part of the URL segment determines the action method on the class. So `localhost:5001/HelloWorld/Index` causes the `Index` method of the `HelloWorldController` class to run. Notice that you only had to browse to `localhost:5001/HelloWorld` and the `Index` method was called by default. `Index` is the default method that will be called on a controller if a method name isn't explicitly specified.
* The third part of the URL segment ( `id`) is for route data. Route data is explained later in the tutorial.

Browse to: `https://localhost:{PORT}/HelloWorld/Welcome`. Replace `{PORT}` with your port number.

The `Welcome` method runs and returns the string `This is the Welcome action method...`. For this URL, the controller is `HelloWorld` and `Welcome` is the action method. You haven't used the `[Parameters]` part of the URL yet.

Browser window showing an application response of This is the Welcome action method.

Modify the code to pass some parameter information from the URL to the controller. For example, `/HelloWorld/Welcome?name=Rick&numtimes=4`.

Change the `Welcome` method to include two parameters as shown in the following code.

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie10/Controllers/HelloWorldController.cs?name=snippet_Second)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Controllers/HelloWorldController.cs.md)

The preceding code:

* Uses the C# optional-parameter feature to indicate that the `numTimes` parameter defaults to 1 if no value is passed for that parameter.
* Uses `HtmlEncoder.Default.Encode` to protect the app from malicious input, such as through JavaScript.
* Uses [Interpolated Strings](https://learn.microsoft.com/dotnet/articles/csharp/language-reference/keywords/interpolated-strings) in `$"Hello {name}, NumTimes is: {numTimes}"`.

Run the app and browse to: `https://localhost:{PORT}/HelloWorld/Welcome?name=Rick&numtimes=4`. Replace `{PORT}` with your port number.

Try different values for `name` and `numtimes` in the URL. The MVC [model binding](../../mvc/models/model-binding.md) system automatically maps the named parameters from the query string to parameters in the method. See [Model Binding](../../mvc/models/model-binding.md) for more information.

Browser window showing an application response of Hello Rick, NumTimes is 4.

In the previous image:

* The URL segment `Parameters` isn't used.
* The `name` and `numTimes` parameters are passed in the [query string](https://wikipedia.org/wiki/Query_string).
* The `?` (question mark) in the above URL is a separator, and the query string follows.
* The `&` character separates field-value pairs.

Replace the `Welcome` method with the following code:

  [Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Controllers/HelloWorldController.cs?name=snippet_Third)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Controllers/HelloWorldController.cs.md)

Run the app and enter the following URL: `https://localhost:{PORT}/HelloWorld/Welcome/3?name=Rick`

In the preceding URL:

* The third URL segment matched the route parameter `id`.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` starts the [query string](https://wikipedia.org/wiki/Query_string).

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs?name=snippet_MapControllerRoute\&highlight=3)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs.md)

In the preceding example:

* The third URL segment matched the route parameter `id` as defined in the routing template in the `Program.cs` file.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` (in `id?`) indicates the `id` parameter is optional.

> 
> [Previous: Get Started](start-mvc.md)
> [Next: Add a View](adding-view.md)



**Applies to: \= aspnetcore-9.0**

The Model-View-Controller (MVC) architectural pattern separates an app into three main components: **M**odel, **V**iew, and **C**ontroller. The MVC pattern helps you create apps that are more testable and easier to update than traditional monolithic apps.

MVC-based apps contain:

* **M**odels: Classes that represent the data of the app. The model classes use validation logic to enforce business rules for that data. Typically, model objects retrieve and store model state in a database. In this tutorial, a `Movie` model retrieves movie data from a database, provides it to the view or updates it. Updated data is written to a database.
* **V**iews: Views are the components that display the app's user interface (UI). Generally, this UI displays the model data.
* **C**ontrollers: Classes that:
  * Handle browser requests.
  * Retrieve model data.
  * Call view templates that return a response.

In an MVC app, the view only displays information. The controller handles and responds to user input and interaction. For example, the controller handles URL segments and query-string values, and passes these values to the model. The model might use these values to query the database. For example:

* `https://localhost:5001/Home/Privacy`: specifies the `Home` controller and the `Privacy` action.
* `https://localhost:5001/Movies/Edit/5`: is a request to edit the movie with ID=5 using the `Movies` controller and the `Edit` action, which are detailed later in the tutorial.

Route data is explained later in the tutorial.

The MVC architectural pattern separates an app into three main groups of components: Models, Views, and Controllers. This pattern helps to achieve separation of concerns: The UI logic belongs in the view. Input logic belongs in the controller. Business logic belongs in the model. This separation helps manage complexity when building an app, because it enables work on one aspect of the implementation at a time without impacting the code of another. For example, you can work on the view code without depending on the business logic code.

These concepts are introduced and demonstrated in this tutorial series while building a movie app. The MVC project contains folders for the *Controllers* and *Views*.

## Add a controller

# [Visual Studio](#tab/visual-studio)

In **Solution Explorer**, right-click **Controllers > Add > Controller**.

Solution Explorer, right click Controllers > Add > Controller

In the **Add New Scaffolded Item** dialog box, select **MVC Controller - Empty** > **Add**.

Add MVC controller

In the **Add New Item - MvcMovie** dialog, enter *`HelloWorldController.cs`* and select **Add**.

# [Visual Studio Code](#tab/visual-studio-code)

Select the **EXPLORER** icon and then control-click (right-click) **Controllers > New File** and name the new file `HelloWorldController.cs`.

Contextual menu

---

Replace the contents of `Controllers/HelloWorldController.cs` with the following code:

  [Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie90/Controllers/HelloWorldController.cs?name=snippet_First](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

Every `public` method in a controller is callable as an HTTP endpoint. In the sample above, both methods return a string. Note the comments preceding each method.

An HTTP endpoint:

* Is a targetable URL in the web application, such as `https://localhost:5001/HelloWorld`.
* Combines:
  * The protocol used: `HTTPS`.
  * The network location of the web server, including the TCP port: `localhost:5001`.
  * The target URI: `HelloWorld`.

The first comment states this is an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods/GET) method that's invoked by appending `/HelloWorld/` to the base URL.

The second comment specifies an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods) method that's invoked by appending `/HelloWorld/Welcome/` to the URL. Later on in the tutorial, the scaffolding engine is used to generate `HTTP POST` methods, which update data.

Run the app without the debugger by pressing <kbd>Ctrl</kbd>+<kbd>F5</kbd>.

Append `/HelloWorld` to the path in the address bar. The `Index` method returns a string.

Browser window showing an app response of This is my default action

MVC invokes controller classes, and the action methods within them, depending on the incoming URL. The default [URL routing logic](../../mvc/controllers/routing.md) used by MVC, uses a format like this to determine what code to invoke:

`/[Controller]/[ActionName]/[Parameters]`

The routing format is set in the `Program.cs` file.

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/Program.cs?name=snippet_MapControllerRoute\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

When you browse to the app and don't supply any URL segments, it defaults to the "Home" controller and the "Index" method specified in the template line highlighted above.  In the preceding URL segments:

* The first URL segment determines the controller class to run. So `localhost:5001/HelloWorld` maps to the **HelloWorld** Controller class.
* The second part of the URL segment determines the action method on the class. So `localhost:5001/HelloWorld/Index` causes the `Index` method of the `HelloWorldController` class to run. Notice that you only had to browse to `localhost:5001/HelloWorld` and the `Index` method was called by default. `Index` is the default method that will be called on a controller if a method name isn't explicitly specified.
* The third part of the URL segment ( `id`) is for route data. Route data is explained later in the tutorial.

Browse to: `https://localhost:{PORT}/HelloWorld/Welcome`. Replace `{PORT}` with your port number.

The `Welcome` method runs and returns the string `This is the Welcome action method...`. For this URL, the controller is `HelloWorld` and `Welcome` is the action method. You haven't used the `[Parameters]` part of the URL yet.

Browser window showing an application response of This is the Welcome action method

Modify the code to pass some parameter information from the URL to the controller. For example, `/HelloWorld/Welcome?name=Rick&numtimes=4`.

Change the `Welcome` method to include two parameters as shown in the following code.

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie90/Controllers/HelloWorldController.cs?name=snippet_Second](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

The preceding code:

* Uses the C# optional-parameter feature to indicate that the `numTimes` parameter defaults to 1 if no value is passed for that parameter.
* Uses `HtmlEncoder.Default.Encode` to protect the app from malicious input, such as through JavaScript.
* Uses [Interpolated Strings](https://learn.microsoft.com/dotnet/articles/csharp/language-reference/keywords/interpolated-strings) in `$"Hello {name}, NumTimes is: {numTimes}"`.

Run the app and browse to: `https://localhost:{PORT}/HelloWorld/Welcome?name=Rick&numtimes=4`. Replace `{PORT}` with your port number.

Try different values for `name` and `numtimes` in the URL. The MVC [model binding](../../mvc/models/model-binding.md) system automatically maps the named parameters from the query string to parameters in the method. See [Model Binding](../../mvc/models/model-binding.md) for more information.

Browser window showing an application response of Hello Rick, NumTimes is: 4

In the previous image:

* The URL segment `Parameters` isn't used.
* The `name` and `numTimes` parameters are passed in the [query string](https://wikipedia.org/wiki/Query_string).
* The `?` (question mark) in the above URL is a separator, and the query string follows.
* The `&` character separates field-value pairs.

Replace the `Welcome` method with the following code:

  [Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/Controllers/HelloWorldController.cs?name=snippet_Third](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

Run the app and enter the following URL: `https://localhost:{PORT}/HelloWorld/Welcome/3?name=Rick`

In the preceding URL:

* The third URL segment matched the route parameter `id`.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` starts the [query string](https://wikipedia.org/wiki/Query_string).

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/Program.cs?name=snippet_MapControllerRoute\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

In the preceding example:

* The third URL segment matched the route parameter `id` as defined in the routing template in the `Program.cs` file.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` (in `id?`) indicates the `id` parameter is optional.

> 
> [Previous: Get Started](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller/includes/~/tutorials/first-mvc-app/start-mvc.md)
> [Next: Add a View](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller/includes/~/tutorials/first-mvc-app/adding-view.md)




**Applies to: \= aspnetcore-8.0**

The Model-View-Controller (MVC) architectural pattern separates an app into three main components: **M**odel, **V**iew, and **C**ontroller. The MVC pattern helps you create apps that are more testable and easier to update than traditional monolithic apps.

MVC-based apps contain:

* **M**odels: Classes that represent the data of the app. The model classes use validation logic to enforce business rules for that data. Typically, model objects retrieve and store model state in a database. In this tutorial, a `Movie` model retrieves movie data from a database, provides it to the view or updates it. Updated data is written to a database.
* **V**iews: Views are the components that display the app's user interface (UI). Generally, this UI displays the model data.
* **C**ontrollers: Classes that:
  * Handle browser requests.
  * Retrieve model data.
  * Call view templates that return a response.

In an MVC app, the view only displays information. The controller handles and responds to user input and interaction. For example, the controller handles URL segments and query-string values, and passes these values to the model. The model might use these values to query the database. For example:

* `https://localhost:5001/Home/Privacy`: specifies the `Home` controller and the `Privacy` action.
* `https://localhost:5001/Movies/Edit/5`: is a request to edit the movie with ID=5 using the `Movies` controller and the `Edit` action, which are detailed later in the tutorial.

Route data is explained later in the tutorial.

The MVC architectural pattern separates an app into three main groups of components: Models, Views, and Controllers. This pattern helps to achieve separation of concerns: The UI logic belongs in the view. Input logic belongs in the controller. Business logic belongs in the model. This separation helps manage complexity when building an app, because it enables work on one aspect of the implementation at a time without impacting the code of another. For example, you can work on the view code without depending on the business logic code.

These concepts are introduced and demonstrated in this tutorial series while building a movie app. The MVC project contains folders for the *Controllers* and *Views*.

## Add a controller

# [Visual Studio](#tab/visual-studio)

In **Solution Explorer**, right-click **Controllers > Add > Controller**.

Solution Explorer, right click Controllers > Add > Controller

In the **Add New Scaffolded Item** dialog box, select **MVC Controller - Empty** > **Add**.

Add MVC controller

In the **Add New Item - MvcMovie** dialog, enter *`HelloWorldController.cs`* and select **Add**.

# [Visual Studio Code](#tab/visual-studio-code)

Select the **EXPLORER** icon and then control-click (right-click) **Controllers > New File** and name the new file `HelloWorldController.cs`.

Contextual menu

---

Replace the contents of `Controllers/HelloWorldController.cs` with the following code:

  [Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie80/Controllers/HelloWorldController.cs?name=snippet_First](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

Every `public` method in a controller is callable as an HTTP endpoint. In the sample above, both methods return a string. Note the comments preceding each method.

An HTTP endpoint:

* Is a targetable URL in the web application, such as `https://localhost:5001/HelloWorld`.
* Combines:
  * The protocol used: `HTTPS`.
  * The network location of the web server, including the TCP port: `localhost:5001`.
  * The target URI: `HelloWorld`.

The first comment states this is an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods/GET) method that's invoked by appending `/HelloWorld/` to the base URL.

The second comment specifies an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods) method that's invoked by appending `/HelloWorld/Welcome/` to the URL. Later on in the tutorial, the scaffolding engine is used to generate `HTTP POST` methods, which update data.

Run the app without the debugger by pressing <kbd>Ctrl</kbd>+<kbd>F5</kbd>.

Append `/HelloWorld` to the path in the address bar. The `Index` method returns a string.

Browser window showing an app response of This is my default action

MVC invokes controller classes, and the action methods within them, depending on the incoming URL. The default [URL routing logic](../../mvc/controllers/routing.md) used by MVC, uses a format like this to determine what code to invoke:

`/[Controller]/[ActionName]/[Parameters]`

The routing format is set in the `Program.cs` file.

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie80/Program.cs?name=snippet_MapControllerRoute\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

When you browse to the app and don't supply any URL segments, it defaults to the "Home" controller and the "Index" method specified in the template line highlighted above.  In the preceding URL segments:

* The first URL segment determines the controller class to run. So `localhost:5001/HelloWorld` maps to the **HelloWorld** Controller class.
* The second part of the URL segment determines the action method on the class. So `localhost:5001/HelloWorld/Index` causes the `Index` method of the `HelloWorldController` class to run. Notice that you only had to browse to `localhost:5001/HelloWorld` and the `Index` method was called by default. `Index` is the default method that will be called on a controller if a method name isn't explicitly specified.
* The third part of the URL segment ( `id`) is for route data. Route data is explained later in the tutorial.

Browse to: `https://localhost:{PORT}/HelloWorld/Welcome`. Replace `{PORT}` with your port number.

The `Welcome` method runs and returns the string `This is the Welcome action method...`. For this URL, the controller is `HelloWorld` and `Welcome` is the action method. You haven't used the `[Parameters]` part of the URL yet.

Browser window showing an application response of This is the Welcome action method

Modify the code to pass some parameter information from the URL to the controller. For example, `/HelloWorld/Welcome?name=Rick&numtimes=4`.

Change the `Welcome` method to include two parameters as shown in the following code.

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie80/Controllers/HelloWorldController.cs?name=snippet_Second](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

The preceding code:

* Uses the C# optional-parameter feature to indicate that the `numTimes` parameter defaults to 1 if no value is passed for that parameter.
* Uses `HtmlEncoder.Default.Encode` to protect the app from malicious input, such as through JavaScript.
* Uses [Interpolated Strings](https://learn.microsoft.com/dotnet/articles/csharp/language-reference/keywords/interpolated-strings) in `$"Hello {name}, NumTimes is: {numTimes}"`.

Run the app and browse to: `https://localhost:{PORT}/HelloWorld/Welcome?name=Rick&numtimes=4`. Replace `{PORT}` with your port number.

Try different values for `name` and `numtimes` in the URL. The MVC [model binding](../../mvc/models/model-binding.md) system automatically maps the named parameters from the query string to parameters in the method. See [Model Binding](../../mvc/models/model-binding.md) for more information.

Browser window showing an application response of Hello Rick, NumTimes is: 4

In the previous image:

* The URL segment `Parameters` isn't used.
* The `name` and `numTimes` parameters are passed in the [query string](https://wikipedia.org/wiki/Query_string).
* The `?` (question mark) in the above URL is a separator, and the query string follows.
* The `&` character separates field-value pairs.

Replace the `Welcome` method with the following code:

  [Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie80/Controllers/HelloWorldController.cs?name=snippet_Third](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

Run the app and enter the following URL: `https://localhost:{PORT}/HelloWorld/Welcome/3?name=Rick`

In the preceding URL:

* The third URL segment matched the route parameter `id`.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` starts the [query string](https://wikipedia.org/wiki/Query_string).

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie80/Program.cs?name=snippet_MapControllerRoute\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

In the preceding example:

* The third URL segment matched the route parameter `id`.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` (in `id?`) indicates the `id` parameter is optional.

> 
> [Previous: Get Started](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller/includes/~/tutorials/first-mvc-app/start-mvc.md)
> [Next: Add a View](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller/includes/~/tutorials/first-mvc-app/adding-view.md)




**Applies to: \= aspnetcore-7.0**

The Model-View-Controller (MVC) architectural pattern separates an app into three main components: **M**odel, **V**iew, and **C**ontroller. The MVC pattern helps you create apps that are more testable and easier to update than traditional monolithic apps.

MVC-based apps contain:

* **M**odels: Classes that represent the data of the app. The model classes use validation logic to enforce business rules for that data. Typically, model objects retrieve and store model state in a database. In this tutorial, a `Movie` model retrieves movie data from a database, provides it to the view or updates it. Updated data is written to a database.
* **V**iews: Views are the components that display the app's user interface (UI). Generally, this UI displays the model data.
* **C**ontrollers: Classes that:
  * Handle browser requests.
  * Retrieve model data.
  * Call view templates that return a response.

In an MVC app, the view only displays information. The controller handles and responds to user input and interaction. For example, the controller handles URL segments and query-string values, and passes these values to the model. The model might use these values to query the database. For example:

* `https://localhost:5001/Home/Privacy`: specifies the `Home` controller and the `Privacy` action.
* `https://localhost:5001/Movies/Edit/5`: is a request to edit the movie with ID=5 using the `Movies` controller and the `Edit` action, which are detailed later in the tutorial.

Route data is explained later in the tutorial.

The MVC architectural pattern separates an app into three main groups of components: Models, Views, and Controllers. This pattern helps to achieve separation of concerns: The UI logic belongs in the view. Input logic belongs in the controller. Business logic belongs in the model. This separation helps manage complexity when building an app, because it enables work on one aspect of the implementation at a time without impacting the code of another. For example, you can work on the view code without depending on the business logic code.

These concepts are introduced and demonstrated in this tutorial series while building a movie app. The MVC project contains folders for the *Controllers* and *Views*.

## Add a controller

# [Visual Studio](#tab/visual-studio)

In **Solution Explorer**, right-click **Controllers > Add > Controller**.

Solution Explorer, right click Controllers > Add > Controller

In the **Add New Scaffolded Item** dialog box, select **MVC Controller - Empty** > **Add**.

Add MVC controller

In the **Add New Item - MvcMovie** dialog, enter *`HelloWorldController.cs`* and select **Add**.

# [Visual Studio Code](#tab/visual-studio-code)

Select the **EXPLORER** icon and then control-click (right-click) **Controllers > New File** and name the new file `HelloWorldController.cs`.

Contextual menu

# [Visual Studio for Mac](#tab/visual-studio-mac)

In **Solution Explorer**, control-click **Controllers** and select **Add > New File**.

Contextual menu for adding a controller

Select **ASP.NET Core** and **Controller Class**.

Name the controller **HelloWorldController**.

Add MVC controller and name it

---

Replace the contents of `Controllers/HelloWorldController.cs` with the following code:

  [Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Controllers/HelloWorldController.cs?name=snippet_First](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

Every `public` method in a controller is callable as an HTTP endpoint. In the sample above, both methods return a string. Note the comments preceding each method.

An HTTP endpoint:

* Is a targetable URL in the web application, such as `https://localhost:5001/HelloWorld`.
* Combines:
  * The protocol used: `HTTPS`.
  * The network location of the web server, including the TCP port: `localhost:5001`.
  * The target URI: `HelloWorld`.

The first comment states this is an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods/GET) method that's invoked by appending `/HelloWorld/` to the base URL.

The second comment specifies an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods) method that's invoked by appending `/HelloWorld/Welcome/` to the URL. Later on in the tutorial, the scaffolding engine is used to generate `HTTP POST` methods, which update data.

Run the app without the debugger by pressing <kbd>Ctrl</kbd>+<kbd>F5</kbd>.

Append `/HelloWorld` to the path in the address bar. The `Index` method returns a string.

Browser window showing an app response of This is my default action

MVC invokes controller classes, and the action methods within them, depending on the incoming URL. The default [URL routing logic](../../mvc/controllers/routing.md) used by MVC, uses a format like this to determine what code to invoke:

`/[Controller]/[ActionName]/[Parameters]`

The routing format is set in the `Program.cs` file.

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Program.cs?name=snippet_MapControllerRoute\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

When you browse to the app and don't supply any URL segments, it defaults to the "Home" controller and the "Index" method specified in the template line highlighted above.  In the preceding URL segments:

* The first URL segment determines the controller class to run. So `localhost:5001/HelloWorld` maps to the **HelloWorld** Controller class.
* The second part of the URL segment determines the action method on the class. So `localhost:5001/HelloWorld/Index` causes the `Index` method of the `HelloWorldController` class to run. Notice that you only had to browse to `localhost:5001/HelloWorld` and the `Index` method was called by default. `Index` is the default method that will be called on a controller if a method name isn't explicitly specified.
* The third part of the URL segment ( `id`) is for route data. Route data is explained later in the tutorial.

Browse to: `https://localhost:{PORT}/HelloWorld/Welcome`. Replace `{PORT}` with your port number.

The `Welcome` method runs and returns the string `This is the Welcome action method...`. For this URL, the controller is `HelloWorld` and `Welcome` is the action method. You haven't used the `[Parameters]` part of the URL yet.

Browser window showing an application response of This is the Welcome action method

Modify the code to pass some parameter information from the URL to the controller. For example, `/HelloWorld/Welcome?name=Rick&numtimes=4`.

Change the `Welcome` method to include two parameters as shown in the following code.

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Controllers/HelloWorldController.cs?name=snippet_Second](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

The preceding code:

* Uses the C# optional-parameter feature to indicate that the `numTimes` parameter defaults to 1 if no value is passed for that parameter.
* Uses `HtmlEncoder.Default.Encode` to protect the app from malicious input, such as through JavaScript.
* Uses [Interpolated Strings](https://learn.microsoft.com/dotnet/articles/csharp/language-reference/keywords/interpolated-strings) in `$"Hello {name}, NumTimes is: {numTimes}"`.

Run the app and browse to: `https://localhost:{PORT}/HelloWorld/Welcome?name=Rick&numtimes=4`. Replace `{PORT}` with your port number.

Try different values for `name` and `numtimes` in the URL. The MVC [model binding](../../mvc/models/model-binding.md) system automatically maps the named parameters from the query string to parameters in the method. See [Model Binding](../../mvc/models/model-binding.md) for more information.

Browser window showing an application response of Hello Rick, NumTimes is: 4

In the previous image:

* The URL segment `Parameters` isn't used.
* The `name` and `numTimes` parameters are passed in the [query string](https://wikipedia.org/wiki/Query_string).
* The `?` (question mark) in the above URL is a separator, and the query string follows.
* The `&` character separates field-value pairs.

Replace the `Welcome` method with the following code:

  [Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Controllers/HelloWorldController.cs?name=snippet_Third](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

Run the app and enter the following URL: `https://localhost:{PORT}/HelloWorld/Welcome/3?name=Rick`

In the preceding URL:

* The third URL segment matched the route parameter `id`.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` starts the [query string](https://wikipedia.org/wiki/Query_string).

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Program.cs?name=snippet_MapControllerRoute\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

In the preceding example:

* The third URL segment matched the route parameter `id`.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` (in `id?`) indicates the `id` parameter is optional.

> 
> [Previous: Get Started](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller/includes/~/tutorials/first-mvc-app/start-mvc.md)
> [Next: Add a View](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller/includes/~/tutorials/first-mvc-app/adding-view.md)




**Applies to: \= aspnetcore-6.0**

The Model-View-Controller (MVC) architectural pattern separates an app into three main components: **M**odel, **V**iew, and **C**ontroller. The MVC pattern helps you create apps that are more testable and easier to update than traditional monolithic apps.

MVC-based apps contain:

* **M**odels: Classes that represent the data of the app. The model classes use validation logic to enforce business rules for that data. Typically, model objects retrieve and store model state in a database. In this tutorial, a `Movie` model retrieves movie data from a database, provides it to the view or updates it. Updated data is written to a database.
* **V**iews: Views are the components that display the app's user interface (UI). Generally, this UI displays the model data.
* **C**ontrollers: Classes that:
  * Handle browser requests.
  * Retrieve model data.
  * Call view templates that return a response.

In an MVC app, the view only displays information. The controller handles and responds to user input and interaction. For example, the controller handles URL segments and query-string values, and passes these values to the model. The model might use these values to query the database. For example:

* `https://localhost:5001/Home/Privacy`: specifies the `Home` controller and the `Privacy` action.
* `https://localhost:5001/Movies/Edit/5`: is a request to edit the movie with ID=5 using the `Movies` controller and the `Edit` action, which are detailed later in the tutorial.

Route data is explained later in the tutorial.

The MVC architectural pattern separates an app into three main groups of components: Models, Views, and Controllers. This pattern helps to achieve separation of concerns: The UI logic belongs in the view. Input logic belongs in the controller. Business logic belongs in the model. This separation helps manage complexity when building an app, because it enables work on one aspect of the implementation at a time without impacting the code of another. For example, you can work on the view code without depending on the business logic code.

These concepts are introduced and demonstrated in this tutorial series while building a movie app. The MVC project contains folders for the *Controllers* and *Views*.

## Add a controller

# [Visual Studio](#tab/visual-studio)

In **Solution Explorer**, right-click **Controllers > Add > Controller**.

Solution Explorer, right click Controllers > Add > Controller

In the **Add New Scaffolded Item** dialog box, select **MVC Controller - Empty** > **Add**.

Add MVC controller

In the **Add New Item - MvcMovie** dialog, enter *`HelloWorldController.cs`* and select **Add**.

# [Visual Studio Code](#tab/visual-studio-code)

Select the **EXPLORER** icon and then control-click (right-click) **Controllers > New File** and name the new file `HelloWorldController.cs`.

Contextual menu

# [Visual Studio for Mac](#tab/visual-studio-mac)

For Visual Studio for Mac, see the .NET 7 version of this tutorial.

<!--
In **Solution Explorer**, right-click **Controllers > Add > New File**.

![Contextual menu](~/tutorials/first-mvc-app-mac/adding-controller/_static/add_controller.png)

Select **ASP.NET Core** and **Controller Class**.

Name the controller **HelloWorldController**.

![Add MVC controller and name it](~/tutorials/first-mvc-app-mac/adding-controller/_static/ac.png)
-->

---

Replace the contents of `Controllers/HelloWorldController.cs` with the following code:

  [Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Controllers/HelloWorldController.cs?name=First](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

Every `public` method in a controller is callable as an HTTP endpoint. In the sample above, both methods return a string. Note the comments preceding each method.

An HTTP endpoint:

* Is a targetable URL in the web application, such as `https://localhost:5001/HelloWorld`.
* Combines:
  * The protocol used: `HTTPS`.
  * The network location of the web server, including the TCP port: `localhost:5001`.
  * The target URI: `HelloWorld`.

The first comment states this is an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods/GET) method that's invoked by appending `/HelloWorld/` to the base URL.

The second comment specifies an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods) method that's invoked by appending `/HelloWorld/Welcome/` to the URL. Later on in the tutorial, the scaffolding engine is used to generate `HTTP POST` methods, which update data.

Run the app without the debugger.

Append "HelloWorld" to the path in the address bar. The `Index` method returns a string.

Browser window showing an app response of This is my default action

MVC invokes controller classes, and the action methods within them, depending on the incoming URL. The default [URL routing logic](../../mvc/controllers/routing.md) used by MVC, uses a format like this to determine what code to invoke:

`/[Controller]/[ActionName]/[Parameters]`

The routing format is set in the `Program.cs` file.

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Program.cs?name=MapControllerRoute\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

When you browse to the app and don't supply any URL segments, it defaults to the "Home" controller and the "Index" method specified in the template line highlighted above.  In the preceding URL segments:

* The first URL segment determines the controller class to run. So `localhost:5001/HelloWorld` maps to the **HelloWorld** Controller class.
* The second part of the URL segment determines the action method on the class. So `localhost:5001/HelloWorld/Index` causes the `Index` method of the `HelloWorldController` class to run. Notice that you only had to browse to `localhost:5001/HelloWorld` and the `Index` method was called by default. `Index` is the default method that will be called on a controller if a method name isn't explicitly specified.
* The third part of the URL segment ( `id`) is for route data. Route data is explained later in the tutorial.

Browse to: `https://localhost:{PORT}/HelloWorld/Welcome`. Replace `{PORT}` with your port number.

The `Welcome` method runs and returns the string `This is the Welcome action method...`. For this URL, the controller is `HelloWorld` and `Welcome` is the action method. You haven't used the `[Parameters]` part of the URL yet.

Browser window showing an application response of This is the Welcome action method

Modify the code to pass some parameter information from the URL to the controller. For example, `/HelloWorld/Welcome?name=Rick&numtimes=4`.

Change the `Welcome` method to include two parameters as shown in the following code.

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Controllers/HelloWorldController.cs?name=Second](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

The preceding code:

* Uses the C# optional-parameter feature to indicate that the `numTimes` parameter defaults to 1 if no value is passed for that parameter.
* Uses `HtmlEncoder.Default.Encode` to protect the app from malicious input, such as through JavaScript.
* Uses [Interpolated Strings](https://learn.microsoft.com/dotnet/articles/csharp/language-reference/keywords/interpolated-strings) in `$"Hello {name}, NumTimes is: {numTimes}"`.

Run the app and browse to: `https://localhost:{PORT}/HelloWorld/Welcome?name=Rick&numtimes=4`. Replace `{PORT}` with your port number.

Try different values for `name` and `numtimes` in the URL. The MVC [model binding](../../mvc/models/model-binding.md) system automatically maps the named parameters from the query string to parameters in the method. See [Model Binding](../../mvc/models/model-binding.md) for more information.

Browser window showing an application response of Hello Rick, NumTimes is: 4

In the previous image:

* The URL segment `Parameters` isn't used.
* The `name` and `numTimes` parameters are passed in the [query string](https://wikipedia.org/wiki/Query_string).
* The `?` (question mark) in the above URL is a separator, and the query string follows.
* The `&` character separates field-value pairs.

Replace the `Welcome` method with the following code:

  [Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Controllers/HelloWorldController.cs?name=Third](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

Run the app and enter the following URL: `https://localhost:{PORT}/HelloWorld/Welcome/3?name=Rick`

In the preceding URL:

* The third URL segment matched the route parameter `id`. 
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` starts the [query string](https://wikipedia.org/wiki/Query_string).

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Program.cs?name=MapControllerRoute\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

In the preceding example:

* The third URL segment matched the route parameter `id`.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` (in `id?`) indicates the `id` parameter is optional.

> 
> [Previous: Get Started](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller/includes/~/tutorials/first-mvc-app/start-mvc.md)
> [Next: Add a View](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller/includes/~/tutorials/first-mvc-app/adding-view.md)




**Applies to: \>= aspnetcore-3.1 < aspnetcore-6.0**

The Model-View-Controller (MVC) architectural pattern separates an app into three main components: **M**odel, **V**iew, and **C**ontroller. The MVC pattern helps you create apps that are more testable and easier to update than traditional monolithic apps.

MVC-based apps contain:

* **M**odels: Classes that represent the data of the app. The model classes use validation logic to enforce business rules for that data. Typically, model objects retrieve and store model state in a database. In this tutorial, a `Movie` model retrieves movie data from a database, provides it to the view or updates it. Updated data is written to a database.
* **V**iews: Views are the components that display the app's user interface (UI). Generally, this UI displays the model data.
* **C**ontrollers: Classes that:
  * Handle browser requests.
  * Retrieve model data.
  * Call view templates that return a response.

In an MVC app, the view only displays information. The controller handles and responds to user input and interaction. For example, the controller handles URL segments and query-string values, and passes these values to the model. The model might use these values to query the database. For example:

* `https://localhost:5001/Home/Privacy`: specifies the `Home` controller and the `Privacy` action.
* `https://localhost:5001/Movies/Edit/5`: is a request to edit the movie with ID=5 using the `Movies` controller and the `Edit` action, which are detailed later in the tutorial.

Route data is explained later in the tutorial.

The MVC architectural pattern separates an app into three main groups of components: Models, Views, and Controllers. This pattern helps to achieve separation of concerns: The UI logic belongs in the view. Input logic belongs in the controller. Business logic belongs in the model. This separation helps manage complexity when building an app, because it enables work on one aspect of the implementation at a time without impacting the code of another. For example, you can work on the view code without depending on the business logic code.

These concepts are introduced and demonstrated in this tutorial series while building a movie app. The MVC project contains folders for the *Controllers* and *Views*.

## Add a controller

# [Visual Studio](#tab/visual-studio)

In the **Solution Explorer**, right-click **Controllers > Add > Controller**.

Solution Explorer, right click Controllers > Add > Controller

In the **Add Scaffold** dialog box, select **MVC Controller - Empty**.

Add MVC controller and name it

In the **Add New Item - MvcMovie dialog**, enter *`HelloWorldController.cs`* and select **Add**.

# [Visual Studio Code](#tab/visual-studio-code)

Select the **EXPLORER** icon and then control-click (right-click) **Controllers > New File** and name the new file `HelloWorldController.cs`.

Contextual menu

# [Visual Studio for Mac](#tab/visual-studio-mac)

In **Solution Explorer**, right-click **Controllers > Add > New File**.

Contextual menu

Select **ASP.NET Core** and **Controller Class**.

Name the controller **HelloWorldController**.

Add MVC controller and name it

---

Replace the contents of `Controllers/HelloWorldController.cs` with the following:

  [Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie/Controllers/HelloWorldController.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

Every `public` method in a controller is callable as an HTTP endpoint. In the sample above, both methods return a string. Note the comments preceding each method.

An HTTP endpoint:

* Is a targetable URL in the web application, such as `https://localhost:5001/HelloWorld`.
* Combines:
  * The protocol used: `HTTPS`.
  * The network location of the web server, including the TCP port: `localhost:5001`.
  * The target URI: `HelloWorld`.

The first comment states this is an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods/GET) method that's invoked by appending `/HelloWorld/` to the base URL.

The second comment specifies an [HTTP GET](https://developer.mozilla.org/docs/Web/HTTP/Methods) method that's invoked by appending `/HelloWorld/Welcome/` to the URL. Later on in the tutorial, the scaffolding engine is used to generate `HTTP POST` methods, which update data.

Run the app without the debugger.

Append "HelloWorld" to the path in the address bar. The `Index` method returns a string.

Browser window showing an app response of This is my default action

MVC invokes controller classes, and the action methods within them, depending on the incoming URL. The default [URL routing logic](../../mvc/controllers/routing.md) used by MVC, uses a format like this to determine what code to invoke:

`/[Controller]/[ActionName]/[Parameters]`

The routing format is set in the `Configure` method in `Startup.cs` file.

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie3/Startup.cs?name=snippet_1\\&highlight=5](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

When you browse to the app and don't supply any URL segments, it defaults to the "Home" controller and the "Index" method specified in the template line highlighted above.  In the preceding URL segments:

* The first URL segment determines the controller class to run. So `localhost:5001/HelloWorld` maps to the **HelloWorld**Controller class.
* The second part of the URL segment determines the action method on the class. So `localhost:5001/HelloWorld/Index` causes the `Index` method of the `HelloWorldController` class to run. Notice that you only had to browse to `localhost:5001/HelloWorld` and the `Index` method was called by default. `Index` is the default method that will be called on a controller if a method name isn't explicitly specified.
* The third part of the URL segment ( `id`) is for route data. Route data is explained later in the tutorial.

Browse to: `https://localhost:{PORT}/HelloWorld/Welcome`. Replace `{PORT}` with your port number.

The `Welcome` method runs and returns the string `This is the Welcome action method...`. For this URL, the controller is `HelloWorld` and `Welcome` is the action method. You haven't used the `[Parameters]` part of the URL yet.

Browser window showing an application response of This is the Welcome action method

Modify the code to pass some parameter information from the URL to the controller. For example, `/HelloWorld/Welcome?name=Rick&numtimes=4`.

Change the `Welcome` method to include two parameters as shown in the following code.

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie/Controllers/HelloWorldController.cs?name=snippet_2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

The preceding code:

* Uses the C# optional-parameter feature to indicate that the `numTimes` parameter defaults to 1 if no value is passed for that parameter.
* Uses `HtmlEncoder.Default.Encode` to protect the app from malicious input, such as through JavaScript.
* Uses [Interpolated Strings](https://learn.microsoft.com/dotnet/articles/csharp/language-reference/keywords/interpolated-strings) in `$"Hello {name}, NumTimes is: {numTimes}"`.

Run the app and browse to: `https://localhost:{PORT}/HelloWorld/Welcome?name=Rick&numtimes=4`. Replace `{PORT}` with your port number.

Try different values for `name` and `numtimes` in the URL. The MVC [model binding](../../mvc/models/model-binding.md) system automatically maps the named parameters from the query string to parameters in the method. See [Model Binding](../../mvc/models/model-binding.md) for more information.

Browser window showing an application response of Hello Rick, NumTimes is: 4

In the previous image:

* The URL segment `Parameters` isn't used.
* The `name` and `numTimes` parameters are passed in the [query string](https://wikipedia.org/wiki/Query_string).
* The `?` (question mark) in the above URL is a separator, and the query string follows.
* The `&` character separates field-value pairs.

Replace the `Welcome` method with the following code:

  [Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie/Controllers/HelloWorldController.cs?name=snippet_3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

Run the app and enter the following URL: `https://localhost:{PORT}/HelloWorld/Welcome/3?name=Rick`

In the preceding URL:

* The third URL segment matched the route parameter `id`. 
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` starts the [query string](https://wikipedia.org/wiki/Query_string).

[Code reference unavailable in this source snapshot: adding-controller/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie5/Startup.cs?name=snippet_route\\&highlight=5](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller.md)

In the preceding example:

* The third URL segment matched the route parameter `id`.
* The `Welcome` method contains a parameter `id` that matched the URL template in the `MapControllerRoute` method.
* The trailing `?` (in `id?`) indicates the `id` parameter is optional.

> 
> [Previous: Get Started](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller/includes/~/tutorials/first-mvc-app/start-mvc.md)
> [Next: Add a View](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/adding-controller/includes/~/tutorials/first-mvc-app/adding-view.md)
