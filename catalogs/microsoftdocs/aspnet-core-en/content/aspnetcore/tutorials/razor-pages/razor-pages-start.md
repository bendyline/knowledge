---
title: "Tutorial: Get started with Razor Pages in ASP.NET Core"
ai-usage: ai-assisted
author: wadepickett
description: This is the first tutorial of a series that teaches the basics of building an ASP.NET Core Razor Pages web app.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 01/07/2026
uid: tutorials/razor-pages/razor-pages-start
---

# Tutorial: Get started with Razor Pages in ASP.NET Core

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


By [Rick Anderson](https://twitter.com/RickAndMSFT)

**Applies to: \>= aspnetcore-10.0**

This tutorial is the first in a series that teaches the basics of building an ASP.NET Core Razor Pages web app.

For a more advanced introduction aimed at developers who are familiar with controllers and views, see [Introduction to Razor Pages](../../razor-pages/index.md). For a video introduction, see [Entity Framework Core for Beginners](https://www.youtube.com/playlist?list=PLdo4fOcmZ0oXCPdC3fTFA3Z79-eVH3K-s).

If you're new to ASP.NET Core development and are unsure of which ASP.NET Core web UI solution will best fit your needs, see [tutorials/choose-web-ui](../choose-web-ui.md).


At the end of this tutorial, you have a Razor Pages web app that manages a database of movies.

Home or Index page.

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

## Create a Razor Pages web app

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio and select **Create a new project**.
* In the **Create a new project** dialog, select **ASP.NET Core Web App (Razor Pages)** > **Next**.
* In the **Configure your new project** dialog, enter `RazorPagesMovie` for **Project name**. Name the project **RazorPagesMovie**, including matching the capitalization, so the namespaces match when you copy and paste example code.
* Select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 10.0**.
  * Verify: **Do not use top-level statements** is unchecked.
* Select **Create**.

  Additional information dialog.

  The following starter project is created:

  Solution Explorer showing the RazorPagesMovie project structure.

For alternative approaches to create the project, see [Create a new project in Visual Studio](https://learn.microsoft.com/visualstudio/ide/create-new-project).

# [Visual Studio Code](#tab/visual-studio-code)

This tutorial assumes you're familiar with Visual Studio Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that contains the project.
* Run the following commands:

  ```dotnetcli
  dotnet new webapp -o RazorPagesMovie
  code -r RazorPagesMovie
  ```

  The `dotnet new` command creates a new Razor Pages project in the *RazorPagesMovie* folder.

  The `code` command opens the *RazorPagesMovie* folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

---

## Run the app

# [Visual Studio](#tab/visual-studio)

<!-- replace all of this with updated includes  -->

Select **RazorPagesMovie** in **Solution Explorer**, and then press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without the debugger.

Visual Studio displays the following dialog when a project isn't yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog.

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio:

* Runs the app, which  launches the [Kestrel server](../../fundamentals/servers/kestrel.md).
* Launches the default browser at `https://localhost:<port>`, which displays the app's UI. `<port>` is the random port that is assigned when the app was created.

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

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

At the **Select debugger** prompt, select **C#**.

Select environment dialog.

At the **Select Launch Configuration** prompt, select **C#: RazorPagesMovie [https] RazorPagesMovie**.

The default browser opens with the following URL: `https://localhost:<port>` where `<port>` is the randomly generated port number.

Close the browser window.

In Visual Studio Code, from the *Run* menu, select *Stop Debugging* or press <kbd>Shift</kbd>+<kbd>F5</kbd> to stop the app.

---

<!-- 
Each new version, change the layout file to use the non-minified CSS. 
See https://github.com/dotnet/AspNetCore.Docs/issues/21193
-->

## Examine the project files

The following sections contain an overview of the main project folders and files that you work with in later tutorials.

### Pages folder

Contains Razor pages and supporting files. Each Razor page is a pair of files:

* A `.cshtml` file that has HTML markup with C# code by using Razor syntax.
* A `.cshtml.cs` file that has C# code that handles page events.

Supporting files have names that begin with an underscore. For example, the `_Layout.cshtml` file configures UI elements common to all pages. `_Layout.cshtml` sets up the navigation menu at the top of the page and the copyright notice at the bottom of the page. For more information, see [mvc/views/layout](../../mvc/views/layout.md).

### wwwroot folder

Contains static assets, like HTML files, JavaScript files, and CSS files. For more information, see [fundamentals/static-files](../../fundamentals/static-files.md).

### `appsettings.json`

Contains configuration data, like connection strings. For more information, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md).

### Program.cs

Contains the following code:

<!-- Throughout the tutoiral series, update code in working project (which becomes the clean finished sample) to compile and verify steps, then copy snippets to snapshot sample folder which contains all the various stages of code steps. -->
[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program1Snip.cs?name=snippet_all)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program1Snip.cs.md)

The following lines of code in this file create a `WebApplicationBuilder` with preconfigured defaults, add Razor Pages support to the [Dependency Injection (DI) container](../../fundamentals/dependency-injection.md), and build the app:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program1Snip.cs?name=snippet_di)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program1Snip.cs.md)

The developer exception page is enabled by default and provides helpful information on exceptions. Don't run production apps in development mode because the developer exception page can leak sensitive information.

The following code sets the exception endpoint to `/Error` and enables [HTTP Strict Transport Security (HSTS) protocol](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23http-strict-transport-security-hsts-protocol) when the app is ***not*** running in development mode:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program1Snip.cs?name=snippet_env)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program1Snip.cs.md)

For example, the preceding code runs when the app is in production or test mode. For more information, see [Use multiple environments in ASP.NET Core](../../fundamentals/environments.md).

The following code enables various [Middleware](../../fundamentals/middleware/index.md):

* `app.UseHttpsRedirection();` : Redirects HTTP requests to HTTPS.
* `app.UseRouting();` : Adds route matching to the middleware pipeline. For more information, see [fundamentals/routing](../../fundamentals/routing.md).
* `app.UseAuthorization();` : Authorizes a user to access secure resources. This app doesn't use authorization, so you can remove this line.
* `app.MapRazorPages();`: Configures endpoint routing for Razor Pages.
* `app.MapStaticAssets()` : Optimizes the delivery of static assets in an app, such as HTML, CSS, images, and JavaScript. For more information, see [aspnetcore-9#optimizing-static-web-asset-delivery](https://learn.microsoft.com/search/?terms=aspnetcore-9%23optimizing-static-web-asset-delivery).
* `.WithStaticAssets();` :  Ensures Razor Pages participate in the optimization system for static assets.
* `app.Run();` : Runs the app.

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie10) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Next: Add a model](model.md)



**Applies to: aspnetcore-9.0**

This is the first tutorial of a series that teaches the basics of building an ASP.NET Core Razor Pages web app.

For a more advanced introduction aimed at developers who are familiar with controllers and views, see [Introduction to Razor Pages](../../razor-pages/index.md). For a video introduction, see [Entity Framework Core for Beginners](https://www.youtube.com/playlist?list=PLdo4fOcmZ0oXCPdC3fTFA3Z79-eVH3K-s).

If you're new to ASP.NET Core development and are unsure of which ASP.NET Core web UI solution will best fit your needs, see [tutorials/choose-web-ui](../choose-web-ui.md).


At the end of this tutorial, you'll have a Razor Pages web app that manages a database of movies.

Home or Index page

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

## Create a Razor Pages web app

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio and select **New project**.
* In the **Create a new project** dialog, select **ASP.NET Core Web App (Razor Pages)** > **Next**.
* In the **Configure your new project** dialog, enter `RazorPagesMovie` for **Project name**. It's important to name the project **RazorPagesMovie**, including matching the capitalization, so the namespaces will match when you copy and paste example code.
* Select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 9.0**.
  * Verify: **Do not use top-level statements** is unchecked.
* Select **Create**.

   Additional information

  The following starter project is created:

   Solution Explorer

For alternative approaches to create the project, see [Create a new project in Visual Studio](https://learn.microsoft.com/visualstudio/ide/create-new-project).

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project.
* Run the following commands:

  ```dotnetcli
  dotnet new webapp -o RazorPagesMovie
  code -r RazorPagesMovie
  ```

  The `dotnet new` command creates a new Razor Pages project in the *RazorPagesMovie* folder.

  The `code` command opens the *RazorPagesMovie* folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

---

## Run the app

# [Visual Studio](#tab/visual-studio)

<!-- replace all of this with updated includes  -->

Select **RazorPagesMovie** in **Solution Explorer**, and then press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without the debugger.

Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio:

* Runs the app, which  launches the [Kestrel server](../../fundamentals/servers/kestrel.md).
* Launches the default browser at `https://localhost:<port>`, which displays the apps UI. `<port>` is the random port that is assigned when the app was created.

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

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

At the **Select debugger** prompt, select **C#**.

Select environment dialog

At the **Select Launch Configuration** prompt, select **C#: RazorPagesMovie [https] RazorPagesMovie**.

The default browser launched with the following URL: `https://localhost:<port>` where `<port>` is the randomly generated port number.

Close the browser window.

In Visual Studio Code, from the *Run* menu, select *Stop Debugging* or press <kbd>Shift</kbd>+<kbd>F5</kbd> to stop the app.

---

<!-- 
Each new version, change the layout file to use the non-minified CSS. 
See https://github.com/dotnet/AspNetCore.Docs/issues/21193
-->

## Examine the project files

The following sections contain an overview of the main project folders and files that you'll work with in later tutorials.

### Pages folder

Contains Razor pages and supporting files. Each Razor page is a pair of files:

* A `.cshtml` file that has HTML markup with C# code using Razor syntax.
* A `.cshtml.cs` file that has C# code that handles page events.

Supporting files have names that begin with an underscore. For example, the `_Layout.cshtml` file configures UI elements common to all pages. `_Layout.cshtml` sets up the navigation menu at the top of the page and the copyright notice at the bottom of the page. For more information, see [mvc/views/layout](../../mvc/views/layout.md).

### wwwroot folder

Contains static assets, like HTML files, JavaScript files, and CSS files. For more information, see [fundamentals/static-files](../../fundamentals/static-files.md).

### `appsettings.json`

Contains configuration data, like connection strings. For more information, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md).

### Program.cs

Contains the following code:

<!-- Throughout the tutoiral series, update code in working project (which becomes the clean finished sample) to compile and verify steps, then copy snippets to snapshot sample folder which contains all the various stages of code steps. -->
[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Program1Snip.cs?name=snippet_all](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

The following lines of code in this file create a `WebApplicationBuilder` with preconfigured defaults, add Razor Pages support to the [Dependency Injection (DI) container](../../fundamentals/dependency-injection.md), and builds the app:

[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Program1Snip.cs?name=snippet_di](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

The developer exception page is enabled by default and provides helpful information on exceptions. Production apps should not be run in development mode because the developer exception page can leak sensitive information.

The following code sets the exception endpoint to `/Error` and enables [HTTP Strict Transport Security (HSTS) protocol](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23http-strict-transport-security-hsts-protocol) when the app is ***not*** running in development mode:

[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Program1Snip.cs?name=snippet_env](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

For example, the preceding code runs when the app is in production or test mode. For more information, see [Use multiple environments in ASP.NET Core](../../fundamentals/environments.md).

The following code enables various [Middleware](../../fundamentals/middleware/index.md):

* `app.UseHttpsRedirection();` : Redirects HTTP requests to HTTPS.
* `app.UseRouting();` : Adds route matching to the middleware pipeline. For more information, see [fundamentals/routing](../../fundamentals/routing.md).
* `app.UseAuthorization();` : Authorizes a user to access secure resources. This app doesn't use authorization, therefore this line could be removed.
* `app.MapRazorPages();`: Configures endpoint routing for Razor Pages.
* `app.MapStaticAssets();` : Optimize the delivery of static assets in an app, such as HTML, CSS, images, and JavaScript. For more information, see [aspnetcore-9#optimizing-static-web-asset-delivery](https://learn.microsoft.com/search/?terms=aspnetcore-9%23optimizing-static-web-asset-delivery).
* `app.Run();` : Runs the app.

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie90) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Next: Add a model](model.md)




**Applies to: \= aspnetcore-8.0**

This is the first tutorial of a series that teaches the basics of building an ASP.NET Core Razor Pages web app.

For a more advanced introduction aimed at developers who are familiar with controllers and views, see [Introduction to Razor Pages](../../razor-pages/index.md). For a video introduction, see [Entity Framework Core for Beginners](https://www.youtube.com/playlist?list=PLdo4fOcmZ0oXCPdC3fTFA3Z79-eVH3K-s).

If you're new to ASP.NET Core development and are unsure of which ASP.NET Core web UI solution will best fit your needs, see [tutorials/choose-web-ui](../choose-web-ui.md).


At the end of this tutorial, you'll have a Razor Pages web app that manages a database of movies.

Home or Index page

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

## Create a Razor Pages web app

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio and select **New project**.
* In the **Create a new project** dialog, select **ASP.NET Core Web App (Razor Pages)** > **Next**.
* In the **Configure your new project** dialog, enter `RazorPagesMovie` for **Project name**. It's important to name the project **RazorPagesMovie**, including matching the capitalization, so the namespaces will match when you copy and paste example code.
* Select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 8.0 (Long Term Support)**.
  * Verify: **Do not use top-level statements** is unchecked.
* Select **Create**.

   Additional information

  The following starter project is created:

   Solution Explorer

For alternative approaches to create the project, see [Create a new project in Visual Studio](https://learn.microsoft.com/visualstudio/ide/create-new-project).

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project.
* Run the following commands:

  ```dotnetcli
  dotnet new webapp -o RazorPagesMovie
  code -r RazorPagesMovie
  ```

  The `dotnet new` command creates a new Razor Pages project in the *RazorPagesMovie* folder.

  The `code` command opens the *RazorPagesMovie* folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

---

## Run the app

# [Visual Studio](#tab/visual-studio)

<!-- replace all of this with updated includes  -->

Select **RazorPagesMovie** in **Solution Explorer**, and then press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without the debugger.

Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio:

* Runs the app, which  launches the [Kestrel server](../../fundamentals/servers/kestrel.md).
* Launches the default browser at `https://localhost:<port>`, which displays the apps UI. `<port>` is the random port that is assigned when the app was created.

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

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

At the **Select debugger** prompt, select **.NET 5+ and .NET Core**.

Select environment dialog

The default browser launched with the following URL: `https://localhost:<port>` where `<port>` is the randomly generated port number.

Close the browser window.

In Visual Studio Code, from the *Run* menu, select *Stop Debugging* or press <kbd>Shift</kbd>+<kbd>F5</kbd> to stop the app.

---

<!-- 
Each new version, change the layout file to use the non-minified CSS. 
See https://github.com/dotnet/AspNetCore.Docs/issues/21193
-->

## Examine the project files

The following sections contain an overview of the main project folders and files that you'll work with in later tutorials.

### Pages folder

Contains Razor pages and supporting files. Each Razor page is a pair of files:

* A `.cshtml` file that has HTML markup with C# code using Razor syntax.
* A `.cshtml.cs` file that has C# code that handles page events.

Supporting files have names that begin with an underscore. For example, the `_Layout.cshtml` file configures UI elements common to all pages. `_Layout.cshtml` sets up the navigation menu at the top of the page and the copyright notice at the bottom of the page. For more information, see [mvc/views/layout](../../mvc/views/layout.md).

### wwwroot folder

Contains static assets, like HTML files, JavaScript files, and CSS files. For more information, see [fundamentals/static-files](../../fundamentals/static-files.md).

### `appsettings.json`

Contains configuration data, like connection strings. For more information, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md).

### Program.cs

Contains the following code:

[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program1Snip.cs?name=snippet_all](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

The following lines of code in this file create a `WebApplicationBuilder` with preconfigured defaults, add Razor Pages support to the [Dependency Injection (DI) container](../../fundamentals/dependency-injection.md), and builds the app:

[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program1Snip.cs?name=snippet_di](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

The developer exception page is enabled by default and provides helpful information on exceptions. Production apps should not be run in development mode because the developer exception page can leak sensitive information.

The following code sets the exception endpoint to `/Error` and enables [HTTP Strict Transport Security (HSTS) protocol](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23http-strict-transport-security-hsts-protocol) when the app is ***not*** running in development mode:

[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program1Snip.cs?name=snippet_env](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

For example, the preceding code runs when the app is in production or test mode. For more information, see [Use multiple environments in ASP.NET Core](../../fundamentals/environments.md).

The following code enables various [Middleware](../../fundamentals/middleware/index.md):

* `app.UseHttpsRedirection();` : Redirects HTTP requests to HTTPS.
* `app.UseStaticFiles();` : Enables static files, such as HTML, CSS, images, and JavaScript to be served. For more information, see [fundamentals/static-files](../../fundamentals/static-files.md).
* `app.UseRouting();` : Adds route matching to the middleware pipeline. For more information, see [fundamentals/routing](../../fundamentals/routing.md)
* `app.MapRazorPages();`: Configures endpoint routing for Razor Pages.
* `app.UseAuthorization();` : Authorizes a user to access secure resources. This app doesn't use authorization, therefore this line could be removed.
* `app.Run();` : Runs the app.

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Next: Add a model](model.md)




**Applies to: \= aspnetcore-7.0**

This is the first tutorial of a series that teaches the basics of building an ASP.NET Core Razor Pages web app.

For a more advanced introduction aimed at developers who are familiar with controllers and views, see [Introduction to Razor Pages](../../razor-pages/index.md). For a video introduction, see [Entity Framework Core for Beginners](https://www.youtube.com/playlist?list=PLdo4fOcmZ0oXCPdC3fTFA3Z79-eVH3K-s).

If you're new to ASP.NET Core development and are unsure of which ASP.NET Core web UI solution will best fit your needs, see [tutorials/choose-web-ui](../choose-web-ui.md).


At the end of this tutorial, you'll have a Razor Pages web app that manages a database of movies.

Home or Index page

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

## Create a Razor Pages web app

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio and select **Create a new project**.
* In the **Create a new project** dialog, select **ASP.NET Core Web App** > **Next**.
* In the **Configure your new project** dialog, enter `RazorPagesMovie` for **Project name**. It's important to name the project **RazorPagesMovie**, including matching the capitalization, so the namespaces will match when you copy and paste example code.
* Select **Next**.
* In the **Additional information** dialog:
  * Select **.NET 7.0 (Standard Term Support)**.
  * Verify: **Do not use top-level statements** is unchecked.
* Select **Create**.

   Additional information

  The following starter project is created:

   Solution Explorer

For alternative approaches to create the project, see [Create a new project in Visual Studio](https://learn.microsoft.com/visualstudio/ide/create-new-project).

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project.
* Run the following commands:

  ```dotnetcli
  dotnet new webapp -o RazorPagesMovie
  code -r RazorPagesMovie
  ```

  The `dotnet new` command creates a new Razor Pages project in the *RazorPagesMovie* folder.

  The `code` command opens the *RazorPagesMovie* project folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

# [Visual Studio for Mac](#tab/visual-studio-mac)

* In Visual Studio for Mac 2022, select **File** > **New Project...**.

* In the **Choose a template for your new project** dialog:
  * Select **Web and Console** > **App** > **Web Application**.
  * Select **Continue**.

* In the **Configure your new Web Application** dialog:
  * Verify: **Target framework** is set to **.NET 7.0** (or later).
  * Verify: **Authentication** is set to **No Authentication**.
  * Verify: **Do not use top-level statements** is unchecked.
  * Select **Continue**.

* In the **Configure your new Web Application** dialog:
  * Enter `RazorPagesMovie` for **Project name**. It's important to name the project **RazorPagesMovie**, including matching the capitalization, so the namespaces will match when you copy and paste example code.
  * Select **Create**.

---

## Run the app

# [Visual Studio](#tab/visual-studio)

<!-- replace all of this with updated includes  -->

Select **RazorPagesMovie** in **Solution Explorer**, and then press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without the debugger.

Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio:

* Runs the app, which  launches the [Kestrel server](../../fundamentals/servers/kestrel.md).
* Launches the default browser at `https://localhost:<port>`, which displays the apps UI. `<port>` is the random port that is assigned when the app was created.

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

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

At the **Select debugger** prompt, select **.NET 5+ and .NET Core**.

Select environment dialog

The default browser launched with the following URL: `https://localhost:<port>` where `<port>` is the randomly generated port number.

Close the browser window.

In Visual Studio Code, from the *Run* menu, select *Stop Debugging* or press <kbd>Shift</kbd>+<kbd>F5</kbd> to stop the app.

# [Visual Studio for Mac](#tab/visual-studio-mac)

Select **Debug** > **Start Debugging** to launch the app.

Visual Studio for Mac launches a browser and navigates to `https://localhost:<port>`, where `<port>` is the port number randomly assigned at project creation and is set in `Properties/launchSettings.json`.

Close the browser window.

---

<!-- 
Each new version, change the layout file to use the non-minified CSS. 
See https://github.com/dotnet/AspNetCore.Docs/issues/21193
-->

## Examine the project files

The following sections contain an overview of the main project folders and files that you'll work with in later tutorials.

### Pages folder

Contains Razor pages and supporting files. Each Razor page is a pair of files:

* A `.cshtml` file that has HTML markup with C# code using Razor syntax.
* A `.cshtml.cs` file that has C# code that handles page events.

Supporting files have names that begin with an underscore. For example, the `_Layout.cshtml` file configures UI elements common to all pages. `_Layout.cshtml` sets up the navigation menu at the top of the page and the copyright notice at the bottom of the page. For more information, see [mvc/views/layout](../../mvc/views/layout.md).

### wwwroot folder

Contains static assets, like HTML files, JavaScript files, and CSS files. For more information, see [fundamentals/static-files](../../fundamentals/static-files.md).

### `appsettings.json`

Contains configuration data, like connection strings. For more information, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md).

### Program.cs

Contains the following code:

[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Program1Snip.cs?name=snippet_all](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

The following lines of code in this file create a `WebApplicationBuilder` with preconfigured defaults, add Razor Pages support to the [Dependency Injection (DI) container](../../fundamentals/dependency-injection.md), and builds the app:

[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Program1Snip.cs?name=snippet_di](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

The developer exception page is enabled by default and provides helpful information on exceptions. Production apps should not be run in development mode because the developer exception page can leak sensitive information.

The following code sets the exception endpoint to `/Error` and enables [HTTP Strict Transport Security (HSTS) protocol](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23http-strict-transport-security-hsts-protocol) when the app is ***not*** running in development mode:

[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Program1Snip.cs?name=snippet_env](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

For example, the preceding code runs when the app is in production or test mode. For more information, see [Use multiple environments in ASP.NET Core](../../fundamentals/environments.md).

The following code enables various [Middleware](../../fundamentals/middleware/index.md):

* `app.UseHttpsRedirection();` : Redirects HTTP requests to HTTPS.
* `app.UseStaticFiles();` : Enables static files, such as HTML, CSS, images, and JavaScript to be served. For more information, see [fundamentals/static-files](../../fundamentals/static-files.md).
* `app.UseRouting();` : Adds route matching to the middleware pipeline. For more information, see [fundamentals/routing](../../fundamentals/routing.md)
* `app.MapRazorPages();`: Configures endpoint routing for Razor Pages.
* `app.UseAuthorization();` : Authorizes a user to access secure resources. This app doesn't use authorization, therefore this line could be removed.
* `app.Run();` : Runs the app.

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Next: Add a model](model.md)




**Applies to: \= aspnetcore-6.0**
This is the first tutorial of a series that teaches the basics of building an ASP.NET Core Razor Pages web app.

For a more advanced introduction aimed at developers who are familiar with controllers and views, see [Introduction to Razor Pages](../../razor-pages/index.md). For a video introduction, see [Entity Framework Core for Beginners](https://www.youtube.com/playlist?list=PLdo4fOcmZ0oXCPdC3fTFA3Z79-eVH3K-s).

If you're new to ASP.NET Core development and are unsure of which ASP.NET Core web UI solution will best fit your needs, see [tutorials/choose-web-ui](../choose-web-ui.md).


At the end of the series, you'll have an app that manages a database of movies.  

In this tutorial, you:

> 
> * Create a Razor Pages web app.
> * Run the app.
> * Examine the project files.

At the end of this tutorial, you'll have a working Razor Pages web app that you'll enhance in later tutorials.

Home or Index page

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

## Create a Razor Pages web app

# [Visual Studio](#tab/visual-studio)

1. Start Visual Studio 2022 and select **Create a new project**.

   Create a new project from the start window

1. In the **Create a new project** dialog, select **ASP.NET Core Web App**, and then select **Next**.

   Create an ASP.NET Core Web App

1. In the **Configure your new project** dialog, enter `RazorPagesMovie` for **Project name**. It's important to name the project *RazorPagesMovie*, including matching the capitalization, so the namespaces will match when you copy and paste example code.

   Configure your new project

1. Select **Next**.

1. In the **Additional information** dialog, select **.NET 6.0 (Long-term support)** and then select **Create**.

   Additional information

  The following starter project is created:

   Solution Explorer

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project.
* Run the following commands:

  ```dotnetcli
  dotnet new webapp -o RazorPagesMovie
  code -r RazorPagesMovie
  ```

  The `dotnet new` command creates a new Razor Pages project in the *RazorPagesMovie* folder.

  The `code` command opens the *RazorPagesMovie* project folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

# [Visual Studio for Mac](#tab/visual-studio-mac)

1. Select **File** > **New Solution**.

   macOS New solution

1. In Visual Studio 2022 for Mac select **Web and Console** > **App** > **Web Application** > **Next**.

   macOS web app template selection

1. In the **Configure your new Web Application** dialog:

   1. Confirm that **Target framework** is set to the latest .NET 6.x version.
   1. Confirm that **Authentication** is set to **No Authentication**.
   1. Select **Next**.

1. Name the project *RazorPagesMovie* and select **Create**.

   macOS name the project

---

## Run the app

# [Visual Studio](#tab/visual-studio)

<!-- replace all of this with updated includes  -->

Select **RazorPagesMovie** in **Solution Explorer**, and then press Ctrl+F5 to run without the debugger.

Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

Visual Studio:

* Runs the app, which  launches the [Kestrel server](../../fundamentals/servers/kestrel.md).
* Launches the default browser at `https://localhost:5001`, which displays the apps UI.

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


In Visual Studio Code, press Ctrl+F5 to run the app. At the **Select environment** prompt, select **.NET Core**.

The default browser launched with the following URL: `https://localhost:5001`

# [Visual Studio for Mac](#tab/visual-studio-mac)

Select **Debug** > **Start Debugging** to launch the app. Visual Studio for Mac launches a browser and navigates to `https://localhost:<port>`, where `<port>` is the port number randomly assigned at project creation and is set in `Properties/launchSettings.json`.

---

## Examine the project files

The following sections contain an overview of the main project folders and files that you'll work with in later tutorials.

### Pages folder

Contains Razor pages and supporting files. Each Razor page is a pair of files:

* A `.cshtml` file that has HTML markup with C# code using Razor syntax.
* A `.cshtml.cs` file that has C# code that handles page events.

Supporting files have names that begin with an underscore. For example, the `_Layout.cshtml` file configures UI elements common to all pages. This file sets up the navigation menu at the top of the page and the copyright notice at the bottom of the page. For more information, see [mvc/views/layout](../../mvc/views/layout.md).

### wwwroot folder

Contains static assets, like HTML files, JavaScript files, and CSS files. For more information, see [fundamentals/static-files](../../fundamentals/static-files.md).

### `appsettings.json`

Contains configuration data, like connection strings. For more information, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md).

### Program.cs

Contains the following code:

[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Program1Snip.cs?name=snippet_all](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

The following lines of code in this file create a `WebApplicationBuilder` with preconfigured defaults, add Razor Pages support to the [Dependency Injection (DI) container](../../fundamentals/dependency-injection.md), and build the app:

[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Program1Snip.cs?name=snippet_di](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

The developer exception page is enabled by default and provides helpful information on exceptions. Production apps should not be run in development mode because the developer exception page can leak sensitive information.

The following code sets the exception endpoint to `/Error` and enables [HTTP Strict Transport Security (HSTS) protocol](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23http-strict-transport-security-hsts-protocol) when the app is ***not*** running in development mode:

[Code reference unavailable in this source snapshot: razor-pages-start/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Program1Snip.cs?name=snippet_env](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/razor-pages-start.md)

For example, the preceding code runs when the app is in production or test mode. For more information, see [Use multiple environments in ASP.NET Core](../../fundamentals/environments.md).

The following code enables various [Middleware](../../fundamentals/middleware/index.md):

* `app.UseHttpsRedirection();` : Redirects HTTP requests to HTTPS.
* `app.UseStaticFiles();` : Enables static files, such as HTML, CSS, images, and JavaScript to be served. For more information, see [fundamentals/static-files](../../fundamentals/static-files.md).
* `app.UseRouting();` : Adds route matching to the middleware pipeline. For more information, see [fundamentals/routing](../../fundamentals/routing.md)
* `app.MapRazorPages();`: Configures endpoint routing for Razor Pages.
* `app.UseAuthorization();` : Authorizes a user to access secure resources. This app doesn't use authorization, therefore this line could be removed.
* `app.Run();` : Runs the app.

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Next: Add a model](model.md)




**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

This is the first tutorial of a series that teaches the basics of building an ASP.NET Core Razor Pages web app.

For a more advanced introduction aimed at developers who are familiar with controllers and views, see [Introduction to Razor Pages](../../razor-pages/index.md).

If you're new to ASP.NET Core development and are unsure of which ASP.NET Core web UI solution will best fit your needs, see [tutorials/choose-web-ui](../choose-web-ui.md).


At the end of the series, you'll have an app that manages a database of movies.  

In this tutorial, you:

> 
> * Create a Razor Pages web app.
> * Run the app.
> * Examine the project files.

At the end of this tutorial, you'll have a working Razor Pages web app that you'll enhance in later tutorials.

Home or Index page

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

## Create a Razor Pages web app

# [Visual Studio](#tab/visual-studio)

1. Start Visual Studio and select **Create a new project**. For more information, see [Create a new project in Visual Studio](https://learn.microsoft.com/visualstudio/ide/create-new-project).

   Create a new project from the start window

1. In the **Create a new project** dialog, select **ASP.NET Core Web Application**, and then select **Next**.

   Create an ASP.NET Core Web Application

1. In the **Configure your new project** dialog, enter `RazorPagesMovie` for **Project name**. It's important to name the project *RazorPagesMovie*, including matching the capitalization, so the namespaces will match when you copy and paste example code.

1. Select **Create**.

   Configure the project

1. In the **Create a new ASP.NET Core web application** dialog, select:
    1. **.NET Core** and **ASP.NET Core 5.0** in the dropdowns.
    1. **Web Application**.
    1. **Create**.

   Select ASP.NET Core Web App

  The following starter project is created:

   Solution Explorer

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs).

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project.
* Run the following commands:

  ```dotnetcli
  dotnet new webapp -o RazorPagesMovie
  code -r RazorPagesMovie
  ```

  The `dotnet new` command creates a new Razor Pages project in the *RazorPagesMovie* folder.

  The `code` command opens the *RazorPagesMovie* project folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

# [Visual Studio for Mac](#tab/visual-studio-mac)

1. Select **File** > **New Solution**.

  macOS New solution
  
1. In Visual Studio for Mac earlier than version 8.6, select **.NET Core** > **App** > **Web Application** > **Next**. In version 8.6 or later, select **Web and Console** > **App** > **Web Application** > **Next**.

  macOS web app template selection

1. In the **Configure the new Web Application** dialog:

   1. Confirm that **Authentication** is set to **No Authentication**.
   1. If presented an option to select a **Target Framework**, select the latest .NET 5.x version.
   1. Select **Next**.

1. Name the project *RazorPagesMovie* and select **Create**.

  macOS name the project

<!-- End of VS tabs -->

---

## Run the app

  # [Visual Studio](#tab/visual-studio)

* Press Ctrl+F5 to run without the debugger.

  Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

  Visual Studio starts [IIS Express](https://learn.microsoft.com/iis/extensions/introduction-to-iis-express/iis-express-overview) and runs the app. The address bar shows `localhost:port#` and not something like `example.com`. That's because `localhost` is the standard hostname for the local computer. Localhost only serves web requests from the local computer. When Visual Studio creates a web project, a random port is used for the web server.
 
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


* Press **Ctrl-F5** to run without the debugger.

  Visual Studio Code starts [Kestrel](../../fundamentals/servers/kestrel.md), launches a browser, and navigates to `http://localhost:5001`. The address bar shows `localhost:port#` and not something like `example.com`. That's because `localhost` is the standard hostname for  local computer. Localhost only serves web requests from the local computer.

<!-- End of VS tabs -->

---


## Examine the project files

Here's an overview of the main project folders and files that you'll work with in later tutorials.

### Pages folder

Contains Razor pages and supporting files. Each Razor page is a pair of files:

* A `.cshtml` file that has HTML markup with C# code using Razor syntax.
* A `.cshtml.cs` file that has C# code that handles page events.

Supporting files have names that begin with an underscore. For example, the `_Layout.cshtml` file configures UI elements common to all pages. This file sets up the navigation menu at the top of the page and the copyright notice at the bottom of the page. For more information, see [mvc/views/layout](../../mvc/views/layout.md).

### wwwroot folder

Contains static assets, like HTML files, JavaScript files, and CSS files. For more information, see [fundamentals/static-files](../../fundamentals/static-files.md).

### `appsettings.json`

Contains configuration data, like connection strings. For more information, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md).

### Program.cs

Contains the entry point for the app. For more information, see [fundamentals/host/generic-host](../../fundamentals/host/generic-host.md).

### Startup.cs

Contains code that configures app behavior. For more information, see [fundamentals/startup](../../fundamentals/startup.md).

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Next: Add a model](model.md)




**Applies to: < aspnetcore-5.0**

This is the first tutorial of a series that teaches the basics of building an ASP.NET Core Razor Pages web app.

For a more advanced introduction aimed at developers who are familiar with controllers and views, see [Introduction to Razor Pages](../../razor-pages/index.md).

At the end of the series, you'll have an app that manages a database of movies.  

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

In this tutorial, you:

> 
> * Create a Razor Pages web app.
> * Run the app.
> * Examine the project files.

At the end of this tutorial, you'll have a working Razor Pages web app that you'll build on in later tutorials.

The Home or Index page

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

## Create a Razor Pages web app

# [Visual Studio](#tab/visual-studio)

* From the Visual Studio **File** menu, select **New** > **Project**.
* Create a new ASP.NET Core Web Application and select **Next**.
  Create the new project from the start window
* Name the project **RazorPagesMovie**. It's important to name the project *RazorPagesMovie* so the namespaces will match when you copy and paste code.
  Name the project

* Select **ASP.NET Core 3.1** in the dropdown, **Web Application**, and then select **Create**.

Select ASP.NET Core Web Application

  The following starter project is created:

  Solution Explorer

# [Visual Studio Code](#tab/visual-studio-code)

* Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).

* Change to the directory (`cd`) which will contain the project.

* Run the following commands:

  ```dotnetcli
  dotnet new webapp -o RazorPagesMovie
  code -r RazorPagesMovie
  ```

  * The `dotnet new` command creates a new Razor Pages project in the *RazorPagesMovie* folder.
  * The `code` command opens the *RazorPagesMovie* folder in the current instance of Visual Studio Code.

* After the status bar's OmniSharp flame icon turns green, a dialog asks **Required assets to build and debug are missing from 'RazorPagesMovie'. Add them?** Select **Yes**.

  A *.vscode* directory, containing `launch.json` and `tasks.json` files, is added to the project's root directory.

  If Visual Studio Code doesn't offer to add the assets automatically, see the **Linux** operating system guidance in [blazor/tooling](../../blazor/tooling.md).

# [Visual Studio for Mac](#tab/visual-studio-mac)

* Select **File** > **New Solution**.

  macOS New solution

* In Visual Studio for Mac earlier than version 8.6, select **.NET Core** > **App** > **Web Application** > **Next**. In version 8.6 or later, select **Web and Console** > **App** > **Web Application** > **Next**.

  macOS web app template selection

* In the **Configure the new Web Application** dialog:

  * Confirm that **Authentication** is set to **No Authentication**.
  * If presented an option to select a **Target Framework**, select the latest 3.x version.

  Select **Next**.

* Name the project **RazorPagesMovie**, and then select **Create**.

  macOS name the project

<!-- End of VS tabs -->

---

## Run the app

  # [Visual Studio](#tab/visual-studio)

* Press Ctrl+F5 to run without the debugger.

  Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

  Visual Studio starts [IIS Express](https://learn.microsoft.com/iis/extensions/introduction-to-iis-express/iis-express-overview) and runs the app. The address bar shows `localhost:port#` and not something like `example.com`. That's because `localhost` is the standard hostname for the local computer. Localhost only serves web requests from the local computer. When Visual Studio creates a web project, a random port is used for the web server.
 
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


* Press **Ctrl-F5** to run without the debugger.

  Visual Studio Code starts [Kestrel](../../fundamentals/servers/kestrel.md), launches a browser, and navigates to `http://localhost:5001`. The address bar shows `localhost:port#` and not something like `example.com`. That's because `localhost` is the standard hostname for  local computer. Localhost only serves web requests from the local computer.

<!-- End of VS tabs -->

---


## Examine the project files

Here's an overview of the main project folders and files that you'll work with in later tutorials.

### Pages folder

Contains Razor pages and supporting files. Each Razor page is a pair of files:

* A `.cshtml` file that has HTML markup with C# code using Razor syntax.
* A `.cshtml.cs` file that has C# code that handles page events.

Supporting files have names that begin with an underscore. For example, the `_Layout.cshtml` file configures UI elements common to all pages. This file sets up the navigation menu at the top of the page and the copyright notice at the bottom of the page. For more information, see [mvc/views/layout](../../mvc/views/layout.md).

### wwwroot folder

Contains static files, like HTML files, JavaScript files, and CSS files. For more information, see [fundamentals/static-files](../../fundamentals/static-files.md).

### `appSettings.json`

Contains configuration data, like connection strings. For more information, see [fundamentals/configuration/index](../../fundamentals/configuration/index.md).

### Program.cs

Contains the entry point for the program. For more information, see [fundamentals/host/generic-host](../../fundamentals/host/generic-host.md).

### Startup.cs

Contains code that configures app behavior. For more information, see [fundamentals/startup](../../fundamentals/startup.md).

## Next steps

> 
> [Next: Add a model](model.md)
