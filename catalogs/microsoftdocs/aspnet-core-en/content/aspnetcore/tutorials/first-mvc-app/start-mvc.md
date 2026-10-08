---
title: Get started with ASP.NET Core MVC
author: wadepickett
description: Learn how to get started with ASP.NET Core MVC.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 01/22/2026
uid: tutorials/first-mvc-app/start-mvc
---
# Get started with ASP.NET Core MVC

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

This tutorial teaches ASP.NET Core MVC web development with controllers and views. If you're new to ASP.NET Core web development, consider the [Razor Pages](../razor-pages/razor-pages-start.md) version of this tutorial, which provides an easier starting point. See [tutorials/choose-web-ui](../choose-web-ui.md), which compares Razor Pages, MVC, and Blazor for UI development.


This is the first tutorial of a series that teaches ASP.NET Core MVC web development with controllers and views.

At the end of the series, you'll have an app that manages, validates, and displays movie data. You learn how to:

> 
> * Create a web app.
> * Add and scaffold a model.
> * Work with a database.
> * Add search and validation.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-mvc-app/start-mvc/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

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

<!-- 
Each new version, change the layout file to use the non-minified CSS. 
See https://github.com/dotnet/AspNetCore.Docs/issues/21193
-->

## Create a web app

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio and select **Create a new project**.
* In the **Create a new project** dialog, select **ASP.NET Core Web App (Model-View-Controller)** > **Next**.
* In the **Configure your new project** dialog:
  * Enter `MvcMovie` for **Project name**. It's important to name the project *MvcMovie*. Capitalization needs to match each `namespace` when code is copied.
  * The **Location** for the project can be set to anywhere.
* Select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 10.0 (Standard Term Support)**.
  * Verify that **Do not use top-level statements** is unchecked.
* Select **Create**.

Additional info dialog.

For more information, including alternative approaches to create the project, see [Create a new project in Visual Studio](https://learn.microsoft.com/visualstudio/ide/create-new-project).

Visual Studio uses the default project template for the created MVC project. The created project:

* Is a working app.
* Is a basic starter project.

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs) and [Visual Studio Code help](#visual-studio-code-help).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project. The project can be located anywhere.
* Run the following commands:

   ```dotnetcli
   dotnet new mvc -o MvcMovie
   code -r MvcMovie
   ```

  The `dotnet new` command creates a new ASP.NET Core MVC project in the *MvcMovie* folder.

  The `code` command opens the *MvcMovie* project folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

---

### Run the app

# [Visual Studio](#tab/visual-studio)

* Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without the debugger.

  Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio runs the app and opens the default browser.

The address bar shows `localhost:<port#>` and not something like `example.com`. The standard hostname for your local computer is `localhost`. When Visual Studio creates a web project, a random port is used for the web server.

Launching the app without debugging by pressing <kbd>Ctrl</kbd>+<kbd>F5</kbd> allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

You can launch the app in debug or non-debug mode from the **Debug** menu:

Start Debug and Start Without Debugging menus.

You can debug the app by selecting the **https** button in the toolbar:

MvcMovie debug button.

The following image shows the app:

Home or Index page.

* Close the browser window.  Visual Studio will stop the application.

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

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


* In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows)/<kbd>^</kbd>+<kbd>F5</kbd> (macOS) to run the app without debugging.

  Visual Studio Code:

  * Starts [Kestrel](../../fundamentals/servers/kestrel.md)
  * Launches a browser.
  * Navigates to `https://localhost:<port#>`.

  The address bar shows `localhost:<port#>` and not something like `example.com`. The standard hostname for your local computer is `localhost`. Localhost only serves web requests from the local computer.

Launching the app without debugging by selecting Ctrl+F5 allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

  Home or Index page.

* Close the browser window.

* In Visual Studio Code, from the *Run* menu, select *Stop Debugging* or press <kbd>Shift</kbd>+<kbd>F5</kbd> to stop the app.

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

---

In the next tutorial in this series, you learn about MVC and start writing some code.

> 
> [Next: Add a controller](adding-controller.md)



**Applies to: \= aspnetcore-9.0**

This tutorial teaches ASP.NET Core MVC web development with controllers and views. If you're new to ASP.NET Core web development, consider the [Razor Pages](../razor-pages/razor-pages-start.md) version of this tutorial, which provides an easier starting point. See [tutorials/choose-web-ui](../choose-web-ui.md), which compares Razor Pages, MVC, and Blazor for UI development.


This is the first tutorial of a series that teaches ASP.NET Core MVC web development with controllers and views.

At the end of the series, you'll have an app that manages, validates, and displays movie data. You learn how to:

> 
> * Create a web app.
> * Add and scaffold a model.
> * Work with a database.
> * Add search and validation.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/first-mvc-app/start-mvc/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

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

<!-- 
Each new version, change the layout file to use the non-minified CSS. 
See https://github.com/dotnet/AspNetCore.Docs/issues/21193
-->

## Create a web app

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio and select **Create a new project**.
* In the **Create a new project** dialog, select **ASP.NET Core Web App (Model-View-Controller)** > **Next**.
* In the **Configure your new project** dialog:
  * Enter `MvcMovie` for **Project name**. It's important to name the project *MvcMovie*. Capitalization needs to match each `namespace` when code is copied.
  * The **Location** for the project can be set to anywhere.
* Select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 9.0 (Standard Term Support)**.
  * Verify that **Do not use top-level statements** is unchecked.
* Select **Create**.

Additional info dialog

For more information, including alternative approaches to create the project, see [Create a new project in Visual Studio](https://learn.microsoft.com/visualstudio/ide/create-new-project).

Visual Studio uses the default project template for the created MVC project. The created project:

* Is a working app.
* Is a basic starter project.

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs) and [Visual Studio Code help](#visual-studio-code-help).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project. The project can be located anywhere.
* Run the following commands:

   ```dotnetcli
   dotnet new mvc -o MvcMovie
   code -r MvcMovie
   ```

  The `dotnet new` command creates a new ASP.NET Core MVC project in the *MvcMovie* folder.

  The `code` command opens the *MvcMovie* project folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

---

### Run the app

# [Visual Studio](#tab/visual-studio)

* Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without the debugger.

  Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio runs the app and opens the default browser.

The address bar shows `localhost:<port#>` and not something like `example.com`. The standard hostname for your local computer is `localhost`. When Visual Studio creates a web project, a random port is used for the web server.

Launching the app without debugging by pressing <kbd>Ctrl</kbd>+<kbd>F5</kbd> allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

You can launch the app in debug or non-debug mode from the **Debug** menu:

Start Debug and Start Without Debugging menus

You can debug the app by selecting the **https** button in the toolbar:

MvcMovie debug button

The following image shows the app:

Home or Index page

* Close the browser window.  Visual Studio will stop the application.

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

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


* In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows)/<kbd>^</kbd>+<kbd>F5</kbd> (macOS) to run the app without debugging.

  Visual Studio Code:

  * Starts [Kestrel](../../fundamentals/servers/kestrel.md)
  * Launches a browser.
  * Navigates to `https://localhost:<port#>`.

  The address bar shows `localhost:<port#>` and not something like `example.com`. The standard hostname for your local computer is `localhost`. Localhost only serves web requests from the local computer.

Launching the app without debugging by selecting Ctrl+F5 allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

  Home or Index page

* Close the browser window.

* In Visual Studio Code, from the *Run* menu, select *Stop Debugging* or press <kbd>Shift</kbd>+<kbd>F5</kbd> to stop the app.

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

---

In the next tutorial in this series, you learn about MVC and start writing some code.

> 
> [Next: Add a controller](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/start-mvc/includes/~/tutorials/first-mvc-app/adding-controller.md)




**Applies to: \= aspnetcore-8.0**

This tutorial teaches ASP.NET Core MVC web development with controllers and views. If you're new to ASP.NET Core web development, consider the [Razor Pages](../razor-pages/razor-pages-start.md) version of this tutorial, which provides an easier starting point. See [tutorials/choose-web-ui](../choose-web-ui.md), which compares Razor Pages, MVC, and Blazor for UI development.


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


* [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) with the **ASP.NET and web development** workload.

  VS22 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


---

<!-- 
Each new version, change the layout file to use the non-minified CSS. 
See https://github.com/dotnet/AspNetCore.Docs/issues/21193
-->

## Create a web app

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio and select **Create a new project**.
* In the **Create a new project** dialog, select **ASP.NET Core Web App (Model-View-Controller)** > **Next**.
* In the **Configure your new project** dialog:
  * Enter `MvcMovie` for **Project name**. It's important to name the project *MvcMovie*. Capitalization needs to match each `namespace` when code is copied.
  * The **Location** for the project can be set to anywhere.
* Select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 8.0 (Long Term Support)**.
  * Verify that **Do not use top-level statements** is unchecked.
* Select **Create**.

Additional info dialog

For more information, including alternative approaches to create the project, see [Create a new project in Visual Studio](https://learn.microsoft.com/visualstudio/ide/create-new-project).

Visual Studio uses the default project template for the created MVC project. The created project:

* Is a working app.
* Is a basic starter project.

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs) and [Visual Studio Code help](#visual-studio-code-help).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project. The project can be located anywhere.
* Run the following commands:

   ```dotnetcli
   dotnet new mvc -o MvcMovie
   code -r MvcMovie
   ```

  The `dotnet new` command creates a new ASP.NET Core MVC project in the *MvcMovie* folder.

  The `code` command opens the *MvcMovie* project folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

---

### Run the app

# [Visual Studio](#tab/visual-studio)

* Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without the debugger.

  Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio runs the app and opens the default browser.

The address bar shows `localhost:<port#>` and not something like `example.com`. The standard hostname for your local computer is `localhost`. When Visual Studio creates a web project, a random port is used for the web server.

Launching the app without debugging by pressing <kbd>Ctrl</kbd>+<kbd>F5</kbd> allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

You can launch the app in debug or non-debug mode from the **Debug** menu:

Start Debug and Start Without Debugging menus

You can debug the app by selecting the **https** button in the toolbar:

MvcMovie debug button

The following image shows the app:

Home or Index page

* Close the browser window.  Visual Studio will stop the application.

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

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


* In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows)/<kbd>^</kbd>+<kbd>F5</kbd> (macOS) to run the app without debugging.

  Visual Studio Code:

  * Starts [Kestrel](../../fundamentals/servers/kestrel.md)
  * Launches a browser.
  * Navigates to `https://localhost:<port#>`.

  The address bar shows `localhost:<port#>` and not something like `example.com`. The standard hostname for your local computer is `localhost`. Localhost only serves web requests from the local computer.

Launching the app without debugging by selecting Ctrl+F5 allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

  Home or Index page

* Close the browser window.

* In Visual Studio Code, from the *Run* menu, select *Stop Debugging* or press <kbd>Shift</kbd>+<kbd>F5</kbd> to stop the app.

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

In the next tutorial in this series, you learn about MVC and start writing some code.

> 
> [Next: Add a controller](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/start-mvc/includes/~/tutorials/first-mvc-app/adding-controller.md)



**Applies to: \= aspnetcore-7.0**

This tutorial teaches ASP.NET Core MVC web development with controllers and views. If you're new to ASP.NET Core web development, consider the [Razor Pages](../razor-pages/razor-pages-start.md) version of this tutorial, which provides an easier starting point. See [tutorials/choose-web-ui](../choose-web-ui.md), which compares Razor Pages, MVC, and Blazor for UI development.


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

<!-- 
Each new version, change the layout file to use the non-minified CSS. 
See https://github.com/dotnet/AspNetCore.Docs/issues/21193
-->

## Create a web app

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio and select **Create a new project**.
* In the **Create a new project** dialog, select **ASP.NET Core Web App (Model-View-Controller)** > **Next**.
* In the **Configure your new project** dialog:
  * Enter `MvcMovie` for **Project name**. It's important to name the project *MvcMovie*. Capitalization needs to match each `namespace` when code is copied.
  * The **Location** for the project can be set to anywhere.
* Select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 7.0**.
  * Verify that **Do not use top-level statements** is unchecked.
* Select **Create**.

Additional info dialog

For more information, including alternative approaches to create the project, see [Create a new project in Visual Studio](https://learn.microsoft.com/visualstudio/ide/create-new-project).

Visual Studio uses the default project template for the created MVC project. The created project:

* Is a working app.
* Is a basic starter project.

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project. The project can be located anywhere.
* Run the following commands:

   ```dotnetcli
   dotnet new mvc -o MvcMovie
   code -r MvcMovie
   ```

  The `dotnet new` command creates a new ASP.NET Core MVC project in the *MvcMovie* folder.

  The `code` command opens the *MvcMovie* project folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

# [Visual Studio for Mac](#tab/visual-studio-mac)

* Start Visual Studio for Mac and select **File** > **New Project...**.
* In Visual Studio for Mac select **Web and Console** > **App** > **Web Application (Model-View-Controller)** > **Continue**.
* In the **Configure your new Web Application (Model-View-Controller)** dialog:
  * Select **.NET 7.0** for the **Target Framework**.
  * Verify that **Do not use top-level statements** is unchecked.
* Select **Continue**.
* Enter `MvcMovie` for **Project name**. It's important to name the project *MvcMovie*. Capitalization needs to match each `namespace` when code is copied.
* The **Location** for the project can be set to anywhere.
* Select **Create**.

---

### Run the app

# [Visual Studio](#tab/visual-studio)

* Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without the debugger.
  Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio runs the app and opens the default browser.

The address bar shows `localhost:<port#>` and not something like `example.com`. The standard hostname for your local computer is `localhost`. When Visual Studio creates a web project, a random port is used for the web server.

Launching the app without debugging by pressing <kbd>Ctrl</kbd>+<kbd>F5</kbd> allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

You can launch the app in debug or non-debug mode from the **Debug** menu:

Debug menu

You can debug the app by selecting the **https** button in the toolbar:

MvcMovie debug button

The following image shows the app:

Home or Index page

* Close the browser window.  Visual Studio will stop the application.

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

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


* In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows)/<kbd>^</kbd>+<kbd>F5</kbd> (macOS) to run the app without debugging.

  Visual Studio Code:

  * Starts [Kestrel](../../fundamentals/servers/kestrel.md)
  * Launches a browser.
  * Navigates to `https://localhost:<port#>`.

  The address bar shows `localhost:<port#>` and not something like `example.com`. The standard hostname for your local computer is `localhost`. Localhost only serves web requests from the local computer.

Launching the app without debugging by selecting Ctrl+F5 allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

  Home or Index page

* Close the browser window.

* In Visual Studio Code, from the *Run* menu, select *Stop Debugging* or press <kbd>Shift</kbd>+<kbd>F5</kbd> to stop the app.

# [Visual Studio for Mac](#tab/visual-studio-mac)

* Select Option+Command+Return to run the app without the debugger.

  Visual Studio for Mac:

  * Starts [Kestrel](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Findex%23kestrel) server.
  * Launches a browser.
  * Navigates to `http://localhost:port`, where *port* is a randomly chosen port number, set when Visual Studio creates a web project.

  Visual Studio for Mac displays the following popup:

HTTPS Development certificate was not found. Do you want to install and trust the certificate?

* Select **Install and Trust** if you trust the development certificate.

The following dialog is displayed:

Security warning dialog

* Enter your password and select **Update Settings**.

See [Trust the ASP.NET Core HTTPS development certificate](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-the-aspnet-core-https-development-certificate-on-windows-and-macos) for more information.


  The address bar shows `localhost:<port#>` and not something like `example.com`. The standard hostname for your local computer is `localhost`. Localhost only serves web requests from the local computer.

You can launch the app in debug or non-debug mode from the **Debug** menu.

The following image shows the app:

Home or Index page

* Close the browser window.  Visual Studio for Mac will stop the application.

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

In the next tutorial in this series, you learn about MVC and start writing some code.

> 
> [Next: Add a controller](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/start-mvc/includes/~/tutorials/first-mvc-app/adding-controller.md)




**Applies to: \= aspnetcore-6.0**

This tutorial teaches ASP.NET Core MVC web development with controllers and views. If you're new to ASP.NET Core web development, consider the [Razor Pages](../razor-pages/razor-pages-start.md) version of this tutorial, which provides an easier starting point. See [tutorials/choose-web-ui](../choose-web-ui.md), which compares Razor Pages, MVC, and Blazor for UI development.


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

* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/#download) with the **ASP.NET and web development** workload.
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)



# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


# [Visual Studio for Mac](#tab/visual-studio-mac)

For Visual Studio for Mac, see the .NET 7 version of this tutorial.

<!--
[!INCLUDE[](~/includes/net-core-prereqs-mac-5.0.md)]
-->
>
---

## Create a web app

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio and select **Create a new project**.
* In the **Create a new project** dialog, select **ASP.NET Core Web App (Model-View-Controller)** > **Next**.
* In the **Configure your new project** dialog, enter `MvcMovie` for **Project name**. It's important to name the project *MvcMovie*. Capitalization needs to match each `namespace` when code is copied.
* Select **Next**.
* In the **Additional information** dialog, select **.NET 6.0 (Long-term support)**.
* Select **Create**.

Additional info dialog

For alternative approaches to create the project, see [Create a new project in Visual Studio](https://learn.microsoft.com/visualstudio/ide/create-new-project).

Visual Studio uses the default project template for the created MVC project. The created project:

* Is a working app.
* Is a basic starter project.

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs) and [Visual Studio Code help](#visual-studio-code-help).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project.
* Run the following commands:

   ```dotnetcli
   dotnet new mvc -o MvcMovie
   code -r MvcMovie
   ```

  The `dotnet new` command creates a new ASP.NET Core MVC project in the *MvcMovie* folder.

  The `code` command opens the *MvcMovie* project folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

# [Visual Studio for Mac](#tab/visual-studio-mac)

For Visual Studio for Mac, see the .NET 7 version of this tutorial.

<!--
* Select **File** > **New Solution**.

  ![macOS New solution](~/tutorials/first-mvc-app/start-mvc/_static/new_project_vsmac.png)

* In Visual Studio for Mac earlier than version 8.6, select **.NET Core** > **App** > **Web Application (Model-View-Controller)** > **Next**. In version 8.6 or later, select **Web and Console** > **App** > **Web Application (Model-View-Controller)** > **Next**.

  ![macOS web app template selection](~/tutorials/first-mvc-app/start-mvc/_static/web_app_template_vsmac.png)

* In the **Configure your new Web Application** dialog:

  * Confirm that **Authentication** is set to **No Authentication**.
  * If an option to select a **Target Framework** is presented, select the latest 5.x version.
  * Select **Next**.

* Name the project **MvcMovie**, and then select **Create**.

  ![macOS name the project](~/tutorials/first-mvc-app/start-mvc/_static/MvcMovie.png)
-->

---

### Run the app

# [Visual Studio](#tab/visual-studio)

* Select Ctrl+F5 to run the app without the debugger.

  Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio runs the app and opens the default browser.

The address bar shows `localhost:<port#>` and not something like `example.com`. The standard hostname for your local computer is `localhost`. When Visual Studio creates a web project, a random port is used for the web server.

Launching the app without debugging by selecting Ctrl+F5 allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

You can launch the app in debug or non-debug mode from the **Debug** menu:

Debug menu

You can debug the app by selecting the **MvcMovie** button in the toolbar:

MvcMovie debug button

The following image shows the app:

Home or Index page

# [Visual Studio Code](#tab/visual-studio-code)

* Select Ctrl+F5 to run without the debugger.

  * Trust the HTTPS development certificate by running the following command:

  ```dotnetcli
  dotnet dev-certs https --trust
  ```
  **Applies to: <=aspnetcore-8.0**

  The preceding command requires .NET 9 or later SDK on Linux. For Linux on .NET 8.0.401 or earlier SDK, see your Linux distribution's documentation for trusting a certificate.



  The preceding command displays the following dialog, provided the certificate was not previously trusted:

  Security warning dialog

* Select **Yes** if you agree to trust the development certificate.

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


  Visual Studio Code:

  * Starts [Kestrel](../../fundamentals/servers/kestrel.md)
  * Launches a browser.
  * Navigates to `https://localhost:<port#>`.

  The address bar shows `localhost:<port#>` and not something like `example.com`. The standard hostname for your local computer is `localhost`. Localhost only serves web requests from the local computer.

Launching the app without debugging by selecting Ctrl+F5 allows you to:

* Make code changes.
* Save the file.
* Quickly refresh the browser and see the code changes.

  Home or Index page

# [Visual Studio for Mac](#tab/visual-studio-mac)

For Visual Studio for Mac, see the .NET 7 version of this tutorial.

<!--
* Select **Run** > **Start Without Debugging** to launch the app.

  Visual Studio for Mac:

  * Starts [Kestrel](xref:fundamentals/servers/index#kestrel) server.
  * Launches a browser.
  * Navigates to `http://localhost:port`, where *port* is a randomly chosen port number.

  [!INCLUDE[](~/includes/trustCertMac.md)]

  The address bar shows `localhost:port#` and not something like `example.com`. The standard hostname for your local computer is `localhost`. When Visual Studio creates a web project, a random port is used for the web server.

You can launch the app in debug or non-debug mode from the **Run** menu.

The following image shows the app:

![Home or Index page](./~/tutorials/first-mvc-app/start-mvc/_static/output_macos.png)
-->

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

In the next tutorial in this series, you learn about MVC and start writing some code.

> 
> [Next: Add a controller](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/start-mvc/includes/~/tutorials/first-mvc-app/adding-controller.md)




**Applies to: \= aspnetcore-5.0**

This tutorial teaches ASP.NET Core MVC web development with controllers and views. If you're new to ASP.NET Core web development, consider the [Razor Pages](../razor-pages/razor-pages-start.md) version of this tutorial, which provides an easier starting point. See [tutorials/choose-web-ui](../choose-web-ui.md), which compares Razor Pages, MVC, and Blazor for UI development.


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

* [Visual Studio 2019 16.8 or later](https://visualstudio.microsoft.com/downloads/?utm_medium=microsoft&utm_source=learn.microsoft.com&utm_campaign=inline+link&utm_content=download+vs2019) with the **ASP.NET and web development** workload
* [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)



# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


# [Visual Studio for Mac](#tab/visual-studio-mac)

* [Visual Studio for Mac](https://learn.microsoft.com/lifecycle/announcements/visual-studio-mac-end-of-servicing)
* [.NET 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)



---

## Create a web app

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio and select **Create a new project**.
* In the **Create a new project** dialog, select **ASP.NET Core Web Application** > **Next**.
* In the **Configure your new project** dialog, enter `MvcMovie` for **Project name**. It's important to name the project *MvcMovie*. Capitalization needs to match each `namespace` matches when code is copied.
* Select **Create**.
* In the **Create a new ASP.NET Core web application** dialog, select:
  * **.NET Core** and **ASP.NET Core 5.0** in the dropdowns.
  * **ASP.NET Core Web App (Model-View-Controller)**.
  * **Create**.

Create a new ASP.NET Core web application

For alternative approaches to create the project, see [Create a new project in Visual Studio](https://learn.microsoft.com/visualstudio/ide/create-new-project).

Visual Studio used the default project template for the created MVC project. The created project:

* Is a working app.
* Is a basic starter project.

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project.
* Run the following commands:

   ```dotnetcli
   dotnet new mvc -o MvcMovie
   code -r MvcMovie
   ```

  The `dotnet new` command creates a new ASP.NET Core MVC project in the *MvcMovie* folder.

  The `code` command opens the *MvcMovie* project folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

# [Visual Studio for Mac](#tab/visual-studio-mac)

* Select **File** > **New Solution**.

  macOS New solution

* In Visual Studio for Mac earlier than version 8.6, select **.NET Core** > **App** > **Web Application (Model-View-Controller)** > **Next**. In version 8.6 or later, select **Web and Console** > **App** > **Web Application (Model-View-Controller)** > **Next**.

  macOS web app template selection

* In the **Configure your new Web Application** dialog:

  * Confirm that **Authentication** is set to **No Authentication**.
  * If an option to select a **Target Framework** is presented, select the latest 5.x version.
  * Select **Next**.

* Name the project **MvcMovie**, and then select **Create**.

  macOS name the project

---

### Run the app

# [Visual Studio](#tab/visual-studio)

* Select Ctrl+F5 to run the app without the debugger.

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

* Select Ctrl+F5 to run without the debugger.

  * Trust the HTTPS development certificate by running the following command:

  ```dotnetcli
  dotnet dev-certs https --trust
  ```
  **Applies to: <=aspnetcore-8.0**

  The preceding command requires .NET 9 or later SDK on Linux. For Linux on .NET 8.0.401 or earlier SDK, see your Linux distribution's documentation for trusting a certificate.



  The preceding command displays the following dialog, provided the certificate was not previously trusted:

  Security warning dialog

* Select **Yes** if you agree to trust the development certificate.

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


  Visual Studio Code:

  * Starts [Kestrel](../../fundamentals/servers/kestrel.md)
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

  Visual Studio for Mac:

  * Starts [Kestrel](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Findex%23kestrel) server.
  * Launches a browser.
  * Navigates to `http://localhost:port`, where *port* is a randomly chosen port number.

  Visual Studio for Mac displays the following popup:

HTTPS Development certificate not found. Do you want to install and trust the certificate?

Select **Yes** if you trust the development certificate.

The following dialog is displayed:

Security warning dialog

Enter your password and select **OK**

Select **Yes** if you agree to trust the development certificate.

See [Trust the ASP.NET Core HTTPS development certificate](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-the-aspnet-core-https-development-certificate-on-windows-and-macos) for more information.


  The address bar shows `localhost:port#` and not something like `example.com`. The standard hostname for your local computer is `localhost`. When Visual Studio creates a web project, a random port is used for the web server.

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
> [Next](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/start-mvc/includes/~/tutorials/first-mvc-app/adding-controller.md)




**Applies to: \= aspnetcore-3.1**

This tutorial teaches ASP.NET Core MVC web development with controllers and views. If you're new to ASP.NET Core web development, consider the [Razor Pages](../razor-pages/razor-pages-start.md) version of this tutorial, which provides an easier starting point. See [tutorials/choose-web-ui](../choose-web-ui.md), which compares Razor Pages, MVC, and Blazor for UI development.


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

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


  Visual Studio Code:

  * Starts [Kestrel](../../fundamentals/servers/kestrel.md)
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
> [Next](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/start-mvc/includes/~/tutorials/first-mvc-app/adding-controller.md)
