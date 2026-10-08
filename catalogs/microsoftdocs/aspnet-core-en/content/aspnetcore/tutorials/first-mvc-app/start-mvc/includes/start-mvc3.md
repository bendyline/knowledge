**Applies to: \= aspnetcore-3.1**

This tutorial teaches ASP.NET Core MVC web development with controllers and views. If you're new to ASP.NET Core web development, consider the [Razor Pages](../../../razor-pages/razor-pages-start.md) version of this tutorial, which provides an easier starting point. See [tutorials/choose-web-ui](../../../choose-web-ui.md), which compares Razor Pages, MVC, and Blazor for UI development.


This is the first tutorial of a series that teaches ASP.NET Core MVC web development with controllers and views.

At the end of the series, you'll have an app that manages and displays movie data. You learn how to:

> 
> * Create a web app.
> * Add and scaffold a model.
> * Work with a database.
> * Add search and validation.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-mvc-app/start-mvc/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Prerequisites

# [Visual Studio](#tab/visual-studio)

* [Visual Studio 2019 16.4 or later](https://visualstudio.microsoft.com/downloads/?utm_medium=microsoft&utm_source=learn.microsoft.com&utm_campaign=inline+link&utm_content=download+vs2019) with the **ASP.NET and web development** workload
* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)



# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on any platform (macOS, Linux, or Windows) and with any code editor. Minor changes may be required if you use something other than Visual Studio Code. For more information on installing Visual Studio Code on macOS, see [Visual Studio Code on macOS](https://code.visualstudio.com/docs/setup/mac).


# [Visual Studio for Mac](#tab/visual-studio-mac)

* [Visual Studio for Mac version 8.4 or later](https://learn.microsoft.com/lifecycle/announcements/visual-studio-mac-end-of-servicing)
* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)



---

## Create a web app

# [Visual Studio](#tab/visual-studio)

* From the Visual Studio, select **Create a new project**.

* Select **ASP.NET Core Web Application** > **Next**.

  Create a new ASP.NET Core Web Application project

* Name the project **MvcMovie** and select **Create**. It's important to name the project **MvcMovie** so when you copy code, the namespace will match.

  Configure your new project

* Select **Web Application(Model-View-Controller)**. From the dropdown boxes, select **.NET Core** and **ASP.NET Core 3.1**, then select **Create**.

  New project dialog, .NET Core in left pane, ASP.NET Core web

Visual Studio used the default project template for the created MVC project. The created project:

* Is a working app.
* Is a basic starter project.

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs) and [Visual Studio Code help](#visual-studio-code-help).

* Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change directories (`cd`) to a folder that will contain the project.
* Run the following command:

   ```dotnetcli
   dotnet new mvc -o MvcMovie
   code -r MvcMovie
   ```

  * A dialog box appears with **Required assets to build and debug are missing from 'MvcMovie'. Add them?**, select **Yes**.

  * `dotnet new mvc -o MvcMovie`: Creates a new ASP.NET Core MVC project in the *MvcMovie* folder.
  * `code -r MvcMovie`: Loads the `MvcMovie.csproj` project file in Visual Studio Code.

# [Visual Studio for Mac](#tab/visual-studio-mac)

* Select **File** > **New Solution**.

  macOS New solution

* In Visual Studio for Mac earlier than version 8.6, select **.NET Core** > **App** > **Web Application (Model-View-Controller)** > **Next**. In version 8.6 or later, select **Web and Console** > **App** > **Web Application (Model-View-Controller)** > **Next**.

  macOS web app template selection

* In the **Configure your new Web Application** dialog:

  * Confirm that **Authentication** is set to **No Authentication**.
  * If an option to select a **Target Framework** is presented, select the latest 3.x version.
  * Select **Next**.

* Name the project **MvcMovie**, and then select **Create**.

  macOS name the project

---

### Run the app

# [Visual Studio](#tab/visual-studio)

* Select Ctrl+F5 to run the app without debugging.

  Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

  Visual Studio:

  * Starts [IIS Express](https://learn.microsoft.com/iis/extensions/introduction-to-iis-express/iis-express-overview).
  * Runs the app.

  The address bar shows `localhost:port#` and not something like `example.com`. The standard hostname for your local computer is `localhost`. When Visual Studio creates a web project, a random port is used for the web server.

Launching the app without debugging by selecting Ctrl+F5 allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

You can launch the app in debug or non-debug mode from the **Debug** menu item:

Debug menu

You can debug the app by selecting the **IIS Express** button

IIS Express

The following image shows the app:

Home or Index page

# [Visual Studio Code](#tab/visual-studio-code)

* Select Ctrl+F5 to run the app without debugging.

  * Trust the HTTPS development certificate by running the following command:

  ```dotnetcli
  dotnet dev-certs https --trust
  ```
  **Applies to: <=aspnetcore-8.0**

  The preceding command requires .NET 9 or later SDK on Linux. For Linux on .NET 8.0.401 or earlier SDK, see your Linux distribution's documentation for trusting a certificate.



  The preceding command displays the following dialog, provided the certificate was not previously trusted:

  Security warning dialog

* Select **Yes** if you agree to trust the development certificate.

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


  Visual Studio Code:

  * Starts [Kestrel](../../../../fundamentals/servers/kestrel.md)
  * Launches a browser.
  * Navigates to `https://localhost:5001`.

  The address bar shows `localhost:port:5001` and not something like `example.com`. The standard hostname for your local computer is `localhost`. Localhost only serves web requests from the local computer.

Launching the app without debugging by selecting Ctrl+F5 allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

  Home or Index page

# [Visual Studio for Mac](#tab/visual-studio-mac)

* Select **Run** > **Start Without Debugging** to launch the app.

  Visual Studio for Mac: starts [Kestrel](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Findex%23kestrel) server, launches a browser, and navigates to `http://localhost:port`, where *port* is a randomly chosen port number.

Visual Studio for Mac displays the following popup:

HTTPS Development certificate not found. Do you want to install and trust the certificate?

Select **Yes** if you trust the development certificate.

The following dialog is displayed:

Security warning dialog

Enter your password and select **OK**

Select **Yes** if you agree to trust the development certificate.

See [Trust the ASP.NET Core HTTPS development certificate](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-the-aspnet-core-https-development-certificate-on-windows-and-macos) for more information.


The address bar shows `localhost:port#` and not something like `example.com`. The standard hostname for your local computer is `localhost`. When Visual Studio creates a web project, a random port is used for the web server. When you run the app, you'll see a different port number.

You can launch the app in debug or non-debug mode from the **Run** menu.

The following image shows the app:

Home or Index page

---

# [Visual Studio](#tab/visual-studio)

## Visual Studio help

* [Learn to debug C# code using Visual Studio](https://learn.microsoft.com/visualstudio/debugger/getting-started-with-the-debugger)
* [Introduction to the Visual Studio IDE](https://learn.microsoft.com/visualstudio/ide/visual-studio-ide)

# [Visual Studio Code](#tab/visual-studio-code)

## Visual Studio Code help

* [Getting started](https://code.visualstudio.com/docs)
* [Debugging](https://code.visualstudio.com/docs/editor/debugging)
* [Integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal)
* [Keyboard shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference)

  * [macOS keyboard shortcuts](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)
  * [Linux keyboard shortcuts](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf)
  * [Windows keyboard shortcuts](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

# [Visual Studio for Mac](#tab/visual-studio-mac)

## Visual Studio for Mac help

* [Visual Studio for Mac Tour](https://learn.microsoft.com/visualstudio/mac/ide-tour)
* [Introducing Visual Studio for Mac](https://learn.microsoft.com/visualstudio/mac/)

---

In the next part of this tutorial, you learn about MVC and start writing some code.

> 
> [Next](../../adding-controller.md)
