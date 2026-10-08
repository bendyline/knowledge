---
title: Get started with ASP.NET Core SignalR
ai-usage: ai-assisted
author: wadepickett
description: In this tutorial, you create a chat app that uses ASP.NET Core SignalR.
<!-- ms.author: bradyg -->
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 03/20/2026
uid: tutorials/signalr

# Customer intent: As a developer, I want to get a quick proof-of-concept app running, so I can get a practical introduction to ASP.NET Core SignalR.
---

# Tutorial: Get started with ASP.NET Core SignalR

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

This tutorial teaches the basics of building a real-time app using SignalR. You learn how to:

> 
> * Create a web project.
> * Add the SignalR client library.
> * Create a SignalR hub.
> * Configure the project to use SignalR.
> * Add code that sends messages from any client to all connected clients.

At the end, you'll have a working chat app:

SignalR sample app.

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

## Create a web app project

# [Visual Studio](#tab/visual-studio)

Start the latest version of Visual Studio and select **Create a new project**.

Create a new project from the start window.

In the **Create a new project** dialog, select **ASP.NET Core Web App (Razor Pages)**, and then select **Next**.

Create an ASP.NET Core Web App.

In the **Configure your new project** dialog, enter `SignalRChat` for **Project name**. It's important to name the project `SignalRChat`, including matching the capitalization, so the namespaces match the code in the tutorial.

Select **Next**.

In the **Additional information** dialog, select **.NET 10.0 (Long Term Support)** and then select **Create**.

Additional information.

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs)

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project.
* Run the following commands:

```dotnetcli
dotnet new webapp -o SignalRChat
code -r SignalRChat
```

The `dotnet new` command creates a new Razor Pages project in the `SignalRChat` folder.

The `code` command opens the `SignalRChat` folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

---

## Add the SignalR client library

The SignalR server library is included in the ASP.NET Core shared framework. The JavaScript client library isn't automatically included in the project. For this tutorial, use Library Manager (LibMan) to get the client library from [unpkg](https://unpkg.com/). `unpkg`is a fast, global content delivery network for everything on [npm](https://www.npmjs.com/).

# [Visual Studio](#tab/visual-studio/)

In **Solution Explorer**, right-click the project, and select **Add** > **Client-Side Library**.

In the **Add Client-Side Library** dialog:

* Select **unpkg** for **Provider**
* Enter `@microsoft/signalr@latest` for **Library**.
* Select **Choose specific files**, expand the *dist/browser* folder, and select `signalr.js` and `signalr.min.js`.
* Set **Target Location** to `wwwroot/js/signalr/`.
* Select **Install**.

Add Client-Side Library dialog - select library.

LibMan creates a `wwwroot/js/signalr` folder and copies the selected files to it. A `libman.json` file is created with the following code:

[ChatHub (complete source file; reference: \~/tutorials/signalr/samples/10.x/SignalRChat/libman.json)](../../_code/aspnetcore/tutorials/signalr/samples/10.x/SignalRChat/libman.json.md)

# [Visual Studio Code](#tab/visual-studio-code/)

In the integrated terminal, run the following commands to install LibMan after uninstalling any previous version, if one exists.

```dotnetcli
dotnet tool uninstall -g Microsoft.Web.LibraryManager.Cli
dotnet tool install -g Microsoft.Web.LibraryManager.Cli
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


Navigate to the project folder, which contains the `SignalRChat.csproj` file.

Run the following command to get the SignalR client library by using LibMan. It may take a few seconds before displaying output.

```console
libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js
```

The parameters specify the following options:

* Use the unpkg provider.
* Copy files to the `wwwroot/js/signalr` destination.
* Copy only the specified files.

The output looks similar to the following:

```console
Downloading file https://unpkg.com/@microsoft/signalr@latest/dist/browser/signalr.js...
wwwroot/js/signalr/dist/browser/signalr.js written to disk
Installed library "@microsoft/signalr@latest" to "wwwroot/js/signalr"
```

---

## Create a SignalR hub

A *hub* is a class that serves as a high-level pipeline that handles client-server communication.

In the SignalRChat project folder, create a `Hubs` folder.

In the `Hubs` folder, create the `ChatHub` class with the following code:

[ChatHub (complete source file; reference: \~/tutorials/signalr/samples/10.x/SignalRChat/Hubs/ChatHub.cs)](../../_code/aspnetcore/tutorials/signalr/samples/10.x/SignalRChat/Hubs/ChatHub.cs.md)

The `ChatHub` class inherits from the SignalR [Microsoft.AspNetCore.SignalR.Hub](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Hub) class. The `Hub` class manages connections, groups, and messaging.

The `SendMessage` method can be called by a connected client to send a message to all clients. JavaScript client code that calls the method is shown later in the tutorial. SignalR code is asynchronous to provide maximum scalability.

## Configure SignalR

The SignalR server must be configured to pass SignalR requests to SignalR. Add the following highlighted code to the `Program.cs` file.

[Startup (complete source file; reference: \~/tutorials/signalr/samples/10.x/SignalRChat/Program.cs?highlight=1,7,26)](../../_code/aspnetcore/tutorials/signalr/samples/10.x/SignalRChat/Program.cs.md)

The preceding highlighted code adds SignalR to the ASP.NET Core dependency injection and routing systems.

## Add SignalR client code

Replace the content in `Pages/Index.cshtml` with the following code:

[Index (complete source file; reference: \~/tutorials/signalr/samples/10.x/SignalRChat/Pages/Index.cshtml)](../../_code/aspnetcore/tutorials/signalr/samples/10.x/SignalRChat/Pages/Index.cshtml.md)

The preceding markup:

* Creates text boxes and a submit button.
* Creates a list with `id="messagesList"` for displaying messages that are received from the SignalR hub.
* Includes script references to SignalR and the `chat.js` app code is created in the next step.

In the `wwwroot/js` folder, create a `chat.js` file with the following code:

[chat (complete source file; reference: \~/tutorials/signalr/samples/10.x/SignalRChat/wwwroot/js/chat.js)](../../_code/aspnetcore/tutorials/signalr/samples/10.x/SignalRChat/wwwroot/js/chat.js.md)

The preceding JavaScript:

* Creates and starts a connection.
* Adds to the submit button a handler that sends messages to the hub.
* Adds to the connection object a handler that receives messages from the hub and adds them to the list.

## Run the app

# [Visual Studio](#tab/visual-studio)

Select <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

# [Visual Studio Code](#tab/visual-studio-code)

Select <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

---

Copy the URL from the address bar, open another browser instance or tab, and paste the URL in the address bar.

Choose either browser, enter a name and message, and select the **Send Message** button.

The name and message are displayed on both pages instantly.

Completed SignalR sample app.

> **Tip:**
> If the app doesn't work, open the browser developer tools (F12) and go to the console. Look for possible errors related to HTML and JavaScript code. For example, if `signalr.js` was put in a different folder than directed, the reference to that file won't work resulting in a 404 error in the console.
> signalr.js not found error.
> If an `ERR_SPDY_INADEQUATE_TRANSPORT_SECURITY` error has occurred in Chrome, run the following commands to update the development certificate:
>
> ```dotnetcli
> dotnet dev-certs https --clean
> dotnet dev-certs https --trust
> ```

## Publish to Azure

For information on deploying to Azure, see [Quickstart: Deploy an ASP.NET web app](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore). For more information on Azure SignalR Service, see [What is Azure SignalR Service?](https://learn.microsoft.com/azure/azure-signalr/signalr-overview).

## Next steps

* [Use hubs](../signalr/hubs.md)
* [Strongly typed hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23use-strongly-typed-hubs)
* [Authentication and authorization in ASP.NET Core SignalR](../signalr/authn-and-authz.md)
* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/signalr/javascript-client/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))



**Applies to: aspnetcore-8.0 || aspnetcore-9.0**

This tutorial teaches the basics of building a real-time app using SignalR. You learn how to:

> 
> * Create a web project.
> * Add the SignalR client library.
> * Create a SignalR hub.
> * Configure the project to use SignalR.
> * Add code that sends messages from any client to all connected clients.

At the end, you'll have a working chat app:

SignalR sample app

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

## Create a web app project

# [Visual Studio](#tab/visual-studio)

Start Visual Studio 2022 and select **Create a new project**.

Create a new project from the start window

In the **Create a new project** dialog, select **ASP.NET Core Web App (Razor Pages)**, and then select **Next**.

Create an ASP.NET Core Web App

In the **Configure your new project** dialog, enter `SignalRChat` for **Project name**. It's important to name the project `SignalRChat`, including matching the capitalization, so the namespaces match the code in the tutorial.

Select **Next**.

In the **Additional information** dialog, select **.NET 8.0 (Long Term Support)** and then select **Create**.

Additional information

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs)

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project.
* Run the following commands:

```dotnetcli
dotnet new webapp -o SignalRChat
code -r SignalRChat
```

The `dotnet new` command creates a new Razor Pages project in the `SignalRChat` folder.

The `code` command opens the `SignalRChat` folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

---

## Add the SignalR client library

The SignalR server library is included in the ASP.NET Core shared framework. The JavaScript client library isn't automatically included in the project. For this tutorial, use Library Manager (LibMan) to get the client library from [unpkg](https://unpkg.com/). `unpkg`is a fast, global content delivery network for everything on [npm](https://www.npmjs.com/).

# [Visual Studio](#tab/visual-studio/)

In **Solution Explorer**, right-click the project, and select **Add** > **Client-Side Library**.

In the **Add Client-Side Library** dialog:

* Select **unpkg** for **Provider**
* Enter `@microsoft/signalr@latest` for **Library**.
* Select **Choose specific files**, expand the *dist/browser* folder, and select `signalr.js` and `signalr.min.js`.
* Set **Target Location** to `wwwroot/js/signalr/`.
* Select **Install**.

Add Client-Side Library dialog - select library

LibMan creates a `wwwroot/js/signalr` folder and copies the selected files to it.

# [Visual Studio Code](#tab/visual-studio-code/)

In the integrated terminal, run the following commands to install LibMan after uninstalling any previous version, if one exists.

```dotnetcli
dotnet tool uninstall -g Microsoft.Web.LibraryManager.Cli
dotnet tool install -g Microsoft.Web.LibraryManager.Cli
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


Navigate to the project folder, which contains the `SignalRChat.csproj` file.

Run the following command to get the SignalR client library by using LibMan. It may take a few seconds before displaying output.

```console
libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js
```

The parameters specify the following options:

* Use the unpkg provider.
* Copy files to the `wwwroot/js/signalr` destination.
* Copy only the specified files.

The output looks similar to the following:

```console
Downloading file https://unpkg.com/@microsoft/signalr@latest/dist/browser/signalr.js...
wwwroot/js/signalr/dist/browser/signalr.js written to disk
Installed library "@microsoft/signalr@latest" to "wwwroot/js/signalr"
```

---

## Create a SignalR hub

A *hub* is a class that serves as a high-level pipeline that handles client-server communication.

In the SignalRChat project folder, create a `Hubs` folder.

In the `Hubs` folder, create the `ChatHub` class with the following code:

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/8.x/SignalRChat/Hubs/ChatHub.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The `ChatHub` class inherits from the SignalR [Microsoft.AspNetCore.SignalR.Hub](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Hub) class. The `Hub` class manages connections, groups, and messaging.

The `SendMessage` method can be called by a connected client to send a message to all clients. JavaScript client code that calls the method is shown later in the tutorial. SignalR code is asynchronous to provide maximum scalability.

## Configure SignalR

The SignalR server must be configured to pass SignalR requests to SignalR. Add the following highlighted code to the `Program.cs` file.

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/8.x/SignalRChat/Program.cs?highlight=1,7,27](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The preceding highlighted code adds SignalR to the ASP.NET Core dependency injection and routing systems.

## Add SignalR client code

Replace the content in `Pages/Index.cshtml` with the following code:

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/8.x/SignalRChat/Pages/Index.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The preceding markup:

* Creates text boxes and a submit button.
* Creates a list with `id="messagesList"` for displaying messages that are received from the SignalR hub.
* Includes script references to SignalR and the `chat.js` app code is created in the next step.

In the `wwwroot/js` folder, create a `chat.js` file with the following code:

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/8.x/SignalRChat/wwwroot/js/chat.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The preceding JavaScript:

* Creates and starts a connection.
* Adds to the submit button a handler that sends messages to the hub.
* Adds to the connection object a handler that receives messages from the hub and adds them to the list.

## Run the app

# [Visual Studio](#tab/visual-studio)

Select <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

# [Visual Studio Code](#tab/visual-studio-code)

Select <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

---

Copy the URL from the address bar, open another browser instance or tab, and paste the URL in the address bar.

Choose either browser, enter a name and message, and select the **Send Message** button.

The name and message are displayed on both pages instantly.

Completed SignalR sample app

> **Tip:**
> If the app doesn't work, open the browser developer tools (F12) and go to the console. Look for possible errors related to HTML and JavaScript code. For example, if `signalr.js` was put in a different folder than directed, the reference to that file won't work resulting in a 404 error in the console.
> signalr.js not found error
> If an `ERR_SPDY_INADEQUATE_TRANSPORT_SECURITY` error has occurred in Chrome, run the following commands to update the development certificate:
>
> ```dotnetcli
> dotnet dev-certs https --clean
> dotnet dev-certs https --trust
> ```

## Publish to Azure

For information on deploying to Azure, see [Quickstart: Deploy an ASP.NET web app](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore). For more information on Azure SignalR Service, see [What is Azure SignalR Service?](https://learn.microsoft.com/azure/azure-signalr/signalr-overview).

## Next steps

* [Use hubs](../signalr/hubs.md)
* [Strongly typed hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23use-strongly-typed-hubs)
* [Authentication and authorization in ASP.NET Core SignalR](../signalr/authn-and-authz.md)
* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/signalr/javascript-client/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))




**Applies to: \= aspnetcore-7.0**

This tutorial teaches the basics of building a real-time app using SignalR. You learn how to:

> 
> * Create a web project.
> * Add the SignalR client library.
> * Create a SignalR hub.
> * Configure the project to use SignalR.
> * Add code that sends messages from any client to all connected clients.

At the end, you'll have a working chat app:

SignalR sample app

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

## Create a web app project

# [Visual Studio](#tab/visual-studio)

Start Visual Studio 2022 and select **Create a new project**.

Create a new project from the start window

In the **Create a new project** dialog, select **ASP.NET Core Web App**, and then select **Next**.

Create an ASP.NET Core Web App

In the **Configure your new project** dialog, enter `SignalRChat` for **Project name**. It's important to name the project `SignalRChat`, including matching the capitalization, so the namespaces match the code in the tutorial.

Select **Next**.

In the **Additional information** dialog, select **.NET 7.0 (Standard Term Support)** and then select **Create**.

Additional information

# [Visual Studio Code](#tab/visual-studio-code)

The tutorial assumes familiarity with VS Code. For more information, see [Getting started with VS Code](https://code.visualstudio.com/docs)

* Select **New Terminal** from the **Terminal** menu to open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change to the directory (`cd`) that will contain the project.
* Run the following commands:

```dotnetcli
dotnet new webapp -o SignalRChat
code -r SignalRChat
```

The `dotnet new` command creates a new Razor Pages project in the `SignalRChat` folder.

The `code` command opens the `SignalRChat1 folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

# [Visual Studio for Mac](#tab/visual-studio-mac)

Select **File** > **New Project**.

macOS New solution

In Visual Studio 2022 for Mac select **Web and Console** > **App** > **Web Application** > **Continue**.

macOS web app template selection

In the **Configure your new Web Application** dialog:

* Confirm that **Authentication** is set to **No Authentication**.
* Confirm that **Target framework** is set to the latest .NET 7.x version.
* Select **Continue**.

Name the project `SignalRChat` and select **Continue**.

---

## Add the SignalR client library

The SignalR server library is included in the ASP.NET Core shared framework. The JavaScript client library isn't automatically included in the project. For this tutorial, use Library Manager (LibMan) to get the client library from [unpkg](https://unpkg.com/). `unpkg`is a fast, global content delivery network for everything on [npm](https://www.npmjs.com/).

# [Visual Studio](#tab/visual-studio/)

In **Solution Explorer**, right-click the project, and select **Add** > **Client-Side Library**.

In the **Add Client-Side Library** dialog:

* Select **unpkg** for **Provider**
* Enter `@microsoft/signalr@latest` for **Library**.
* Select **Choose specific files**, expand the *dist/browser* folder, and select `signalr.js` and `signalr.min.js`.
* Set **Target Location** to `wwwroot/js/signalr/`.
* Select **Install**.

Add Client-Side Library dialog - select library

LibMan creates a `wwwroot/js/signalr` folder and copies the selected files to it.

# [Visual Studio Code](#tab/visual-studio-code/)

In the integrated terminal, run the following commands to install LibMan after uninstalling any previous version, if one exists.

```dotnetcli
dotnet tool uninstall -g Microsoft.Web.LibraryManager.Cli
dotnet tool install -g Microsoft.Web.LibraryManager.Cli
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


Navigate to the project folder, which contains the `SignalRChat.csproj` file.

Run the following command to get the SignalR client library by using LibMan. It may take a few seconds before displaying output.

```console
libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js
```

The parameters specify the following options:

* Use the unpkg provider.
* Copy files to the `wwwroot/js/signalr` destination.
* Copy only the specified files.

The output looks like the following example:

```console
wwwroot/js/signalr/dist/browser/signalr.js written to disk
wwwroot/js/signalr/dist/browser/signalr.js written to disk
Installed library "@microsoft/signalr@latest" to "wwwroot/js/signalr"
```

# [Visual Studio for Mac](#tab/visual-studio-mac)

In the **Terminal**, run the following commands to install LibMan after uninstalling any previous version, if one exists.

```dotnetcli
dotnet tool uninstall -g Microsoft.Web.LibraryManager.Cli
dotnet tool install -g Microsoft.Web.LibraryManager.Cli
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


Navigate to the project folder, which contains the `SignalRChat.csproj` file.

Run the following command to get the SignalR client library by using LibMan:

```console
libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js --files dist/browser/signalr.js
```

The parameters specify the following options:

* Use the unpkg provider.
* Copy files to the `wwwroot/js/signalr` destination.
* Copy only the specified files.

The output looks like the following example:

```console
wwwroot/js/signalr/dist/browser/signalr.js written to disk
wwwroot/js/signalr/dist/browser/signalr.js written to disk
Installed library "@microsoft/signalr@latest" to "wwwroot/js/signalr"
```

---

## Create a SignalR hub

A *hub* is a class that serves as a high-level pipeline that handles client-server communication.

In the SignalRChat project folder, create a `Hubs` folder.

In the `Hubs` folder, create the `ChatHub` class with the following code:

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/7.x/SignalRChat/Hubs/ChatHub.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The `ChatHub` class inherits from the SignalR [Microsoft.AspNetCore.SignalR.Hub](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Hub) class. The `Hub` class manages connections, groups, and messaging.

The `SendMessage` method can be called by a connected client to send a message to all clients. JavaScript client code that calls the method is shown later in the tutorial. SignalR code is asynchronous to provide maximum scalability.

## Configure SignalR

The SignalR server must be configured to pass SignalR requests to SignalR. Add the following highlighted code to the `Program.cs` file.

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/7.x/SignalRChat/Program.cs?highlight=1,7,27](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The preceding highlighted code adds SignalR to the ASP.NET Core dependency injection and routing systems.

## Add SignalR client code

Replace the content in `Pages/Index.cshtml` with the following code:

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/7.x/SignalRChat/Pages/Index.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The preceding markup:

* Creates text boxes and a submit button.
* Creates a list with `id="messagesList"` for displaying messages that are received from the SignalR hub.
* Includes script references to SignalR and the `chat.js` app code is created in the next step.

In the `wwwroot/js` folder, create a `chat.js` file with the following code:

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/7.x/SignalRChat/wwwroot/js/chat.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The preceding JavaScript:

* Creates and starts a connection.
* Adds to the submit button a handler that sends messages to the hub.
* Adds to the connection object a handler that receives messages from the hub and adds them to the list.

## Run the app

# [Visual Studio](#tab/visual-studio)

Select <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

# [Visual Studio Code](#tab/visual-studio-code)

Select <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

# [Visual Studio for Mac](#tab/visual-studio-mac)

Select **Debug** > **Start Without Debugging** to run the app without debugging.

---

Copy the URL from the address bar, open another browser instance or tab, and paste the URL in the address bar.

Choose either browser, enter a name and message, and select the **Send Message** button.

The name and message are displayed on both pages instantly.

Completed SignalR sample app

> **Tip:**
> If the app doesn't work, open the browser developer tools (F12) and go to the console. Look for possible errors related to HTML and JavaScript code. For example, if `signalr.js` was put in a different folder than directed, the reference to that file won't work resulting in a 404 error in the console.
> signalr.js not found error
> If an `ERR_SPDY_INADEQUATE_TRANSPORT_SECURITY` error has occurred in Chrome, run the following commands to update the development certificate:
>
> ```dotnetcli
> dotnet dev-certs https --clean
> dotnet dev-certs https --trust
> ```

## Publish to Azure

For information on deploying to Azure, see [Quickstart: Deploy an ASP.NET web app](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore). For more information on Azure SignalR Service, see [What is Azure SignalR Service?](https://learn.microsoft.com/azure/azure-signalr/signalr-overview).

## Next steps

* [Use hubs](../signalr/hubs.md)
* [Strongly typed hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23strongly-typed-hubs)
* [Authentication and authorization in ASP.NET Core SignalR](../signalr/authn-and-authz.md)
* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/signalr/javascript-client/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))




**Applies to: \= aspnetcore-6.0**

This tutorial teaches the basics of building a real-time app using SignalR. You learn how to:

> 
> * Create a web project.
> * Add the SignalR client library.
> * Create a SignalR hub.
> * Configure the project to use SignalR.
> * Add code that sends messages from any client to all connected clients.

At the end, you'll have a working chat app:

SignalR sample app

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

## Create a web app project

# [Visual Studio](#tab/visual-studio)

Start Visual Studio 2022 and select **Create a new project**.

Create a new project from the start window

In the **Create a new project** dialog, select **ASP.NET Core Web App**, and then select **Next**.

Create an ASP.NET Core Web App

In the **Configure your new project** dialog, enter `SignalRChat` for **Project name**. It's important to name the project `SignalRChat`, including matching the capitalization, so the namespaces match the code in the tutorial.

Select **Next**.

In the **Additional information** dialog, select **.NET 6.0 (Long-term support)** and then select **Create**.

Additional information

# [Visual Studio Code](#tab/visual-studio-code)

Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).

Change to the directory (`cd`) that will contain the project.

Run the following commands:

```dotnetcli
dotnet new webapp -o SignalRChat
code -r SignalRChat
```

Visual Studio Code displays a dialog box that asks **Do you trust the authors of the files in this folder**.  Select:

* The checkbox **trust the authors of all files in the parent folder**
* **Yes, I trust the authors** (because dotnet generated the files).

The `dotnet new` command creates a new Razor Pages project in the `SignalRChat` folder.

The `code` command opens the `SignalRChat1 folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

# [Visual Studio for Mac](#tab/visual-studio-mac)

Select **File** > **New Solution**.

macOS New solution

In Visual Studio 2022 for Mac select **Web and Console** > **App** > **Web Application** > **Continue**.

macOS web app template selection

In the **Configure your new Web Application** dialog:

* Confirm that **Authentication** is set to **No Authentication**.
* Confirm that **Target framework** is set to the latest .NET 6.x version.
* Select **Continue**.

Name the project `SignalRChat` and select **Continue**.

---

## Add the SignalR client library

The SignalR server library is included in the ASP.NET Core shared framework. The JavaScript client library isn't automatically included in the project. For this tutorial, use Library Manager (LibMan) to get the client library from [unpkg](https://unpkg.com/). `unpkg`is a fast, global content delivery network for everything on [npm](https://www.npmjs.com/).

# [Visual Studio](#tab/visual-studio/)

In **Solution Explorer**, right-click the project, and select **Add** > **Client-Side Library**.

In the **Add Client-Side Library** dialog:

* Select **unpkg** for **Provider**
* Enter `@microsoft/signalr@latest` for **Library**.
* Select **Choose specific files**, expand the *dist/browser* folder, and select `signalr.js` and `signalr.min.js`.
* Set **Target Location** to `wwwroot/js/signalr/`.
* Select **Install**.

Add Client-Side Library dialog - select library

LibMan creates a `wwwroot/js/signalr` folder and copies the selected files to it.

# [Visual Studio Code](#tab/visual-studio-code/)

In the integrated terminal, run the following commands to install LibMan after uninstalling any previous version, if one exists.

```dotnetcli
dotnet tool uninstall -g Microsoft.Web.LibraryManager.Cli
dotnet tool install -g Microsoft.Web.LibraryManager.Cli
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


Run the following command to get the SignalR client library by using LibMan. It may take a few seconds before displaying output.

```console
libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js --files dist/browser/signalr.js
```

The parameters specify the following options:

* Use the unpkg provider.
* Copy files to the `wwwroot/js/signalr` destination.
* Copy only the specified files.

The output looks like the following example:

```console
wwwroot/js/signalr/dist/browser/signalr.js written to disk
wwwroot/js/signalr/dist/browser/signalr.js written to disk
Installed library "@microsoft/signalr@latest" to "wwwroot/js/signalr"
```

# [Visual Studio for Mac](#tab/visual-studio-mac)

In the **Terminal**, run the following commands to install LibMan after uninstalling any previous version, if one exists.

```dotnetcli
dotnet tool uninstall -g Microsoft.Web.LibraryManager.Cli
dotnet tool install -g Microsoft.Web.LibraryManager.Cli
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


Navigate to the project folder (the one that contains the `SignalRChat.csproj` file).

Run the following command to get the SignalR client library by using LibMan:

```console
libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js --files dist/browser/signalr.js
```

The parameters specify the following options:

* Use the unpkg provider.
* Copy files to the `wwwroot/js/signalr` destination.
* Copy only the specified files.

The output looks like the following example:

```console
wwwroot/js/signalr/dist/browser/signalr.js written to disk
wwwroot/js/signalr/dist/browser/signalr.js written to disk
Installed library "@microsoft/signalr@latest" to "wwwroot/js/signalr"
```

---

## Create a SignalR hub

A *hub* is a class that serves as a high-level pipeline that handles client-server communication.

In the SignalRChat project folder, create a `Hubs` folder.

In the `Hubs` folder, create the `ChatHub` class with the following code:

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/6.x/SignalRChat/Hubs/ChatHub.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The `ChatHub` class inherits from the SignalR [Microsoft.AspNetCore.SignalR.Hub](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Hub) class. The `Hub` class manages connections, groups, and messaging.

The `SendMessage` method can be called by a connected client to send a message to all clients. JavaScript client code that calls the method is shown later in the tutorial. SignalR code is asynchronous to provide maximum scalability.

## Configure SignalR

The SignalR server must be configured to pass SignalR requests to SignalR. Add the following highlighted code to the `Program.cs` file.

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/6.x/SignalRChat/Program.cs?highlight=1,6,24](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The preceding highlighted code adds SignalR to the ASP.NET Core dependency injection and routing systems.

## Add SignalR client code

Replace the content in `Pages/Index.cshtml` with the following code:

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/6.x/SignalRChat/Pages/Index.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The preceding markup:

* Creates text boxes and a submit button.
* Creates a list with `id="messagesList"` for displaying messages that are received from the SignalR hub.
* Includes script references to SignalR and the `chat.js` app code is created in the next step.

In the `wwwroot/js` folder, create a `chat.js` file with the following code:

[Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/samples/6.x/SignalRChat/wwwroot/js/chat.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

The preceding JavaScript:

* Creates and starts a connection.
* Adds to the submit button a handler that sends messages to the hub.
* Adds to the connection object a handler that receives messages from the hub and adds them to the list.

## Run the app

# [Visual Studio](#tab/visual-studio)

Press CTRL+F5 to run the app without debugging.

# [Visual Studio Code](#tab/visual-studio-code)

Select Ctrl+F5 to run the app without the debugger.

# [Visual Studio for Mac](#tab/visual-studio-mac)

From the menu, select **Run > Start Without Debugging**.

---

Copy the URL from the address bar, open another browser instance or tab, and paste the URL in the address bar.

Choose either browser, enter a name and message, and select the **Send Message** button.

The name and message are displayed on both pages instantly.

SignalR sample app

> **Tip:**
> If the app doesn't work, open the browser developer tools (F12) and go to the console. Look for possible errors related to HTML and JavaScript code. For example, if `signalr.js` was put in a different folder than directed, the reference to that file won't work resulting in a 404 error in the console.
> signalr.js not found error
> If an `ERR_SPDY_INADEQUATE_TRANSPORT_SECURITY` error has occurred in Chrome, run the following commands to update the development certificate:
>
> ```dotnetcli
> dotnet dev-certs https --clean
> dotnet dev-certs https --trust
> ```

## Publish to Azure

For information on deploying to Azure, see [Quickstart: Deploy an ASP.NET web app](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore). For more information on Azure SignalR Service, see [What is Azure SignalR Service?](https://learn.microsoft.com/azure/azure-signalr/signalr-overview).

## Next steps

* [Use hubs](../signalr/hubs.md)
* [Strongly typed hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23strongly-typed-hubs)
* [Authentication and authorization in ASP.NET Core SignalR](../signalr/authn-and-authz.md)
* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/signalr/javascript-client/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))




**Applies to: \>= aspnetcore-3.1 < aspnetcore-6.0**

This tutorial teaches the basics of building a real-time app using SignalR. You learn how to:

> 
> * Create a web project.
> * Add the SignalR client library.
> * Create a SignalR hub.
> * Configure the project to use SignalR.
> * Add code that sends messages from any client to all connected clients.

At the end, you'll have a working chat app:

SignalR sample app

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

## Create a web app project

# [Visual Studio](#tab/visual-studio/)

  * From the menu, select **File > New Project**.
  * In the **Create a new project** dialog, select **ASP.NET Core Web Application**, and then select **Next**.
  * In the **Configure your new project** dialog, name the project *SignalRChat*, and then select **Create**.
  * In the **Create a new ASP.NET Core web Application** dialog, select **.NET Core** and **ASP.NET Core 3.1**.
  * Select **Web Application** to create a project that uses Razor Pages, and then select **Create**.

  New Project dialog in Visual Studio

# [Visual Studio Code](#tab/visual-studio-code/)

  * Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) to the folder in which the new project folder will be created.
  * Run the following commands:

   ```dotnetcli
   dotnet new webapp -o SignalRChat
   cd SignalRChat
   code -r .
   ```

# [Visual Studio for Mac](#tab/visual-studio-mac)

  * From the menu, select **File > New Solution**.
  * Select **.NET Core > App > Web Application** (Don't select **Web Application (Model-View-Controller)**), and then select **Next**.
  * Make sure the **Target Framework** is set to **.NET Core 3.1**, and then select **Next**.
  * Name the project *SignalRChat*, and then select **Create**.

---

## Add the SignalR client library

The SignalR server library is included in the ASP.NET Core 3.1 shared framework. The JavaScript client library isn't automatically included in the project. For this tutorial, you use Library Manager (LibMan) to get the client library from *unpkg*. unpkg is a content delivery network (CDN) that can deliver anything found in npm, the Node.js package manager.

# [Visual Studio](#tab/visual-studio/)

  * In **Solution Explorer**, right-click the project, and select **Add** > **Client-Side Library**.
  * In the **Add Client-Side Library** dialog, for **Provider** select **unpkg**.
  * For **Library**, enter `@microsoft/signalr@latest`.
  * Select **Choose specific files**, expand the *dist/browser* folder, and select `signalr.js` and `signalr.min.js`.
  * Set **Target Location** to *wwwroot/js/signalr/*
  * Select **Install**

  Add Client-Side Library dialog - select library

  LibMan creates a *wwwroot/js/signalr* folder and copies the selected files to it.

# [Visual Studio Code](#tab/visual-studio-code/)

  * In the integrated terminal, run the following command to install LibMan.

  ```dotnetcli
  dotnet tool install -g Microsoft.Web.LibraryManager.Cli
  ```

  > **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


  * Run the following command to get the SignalR client library by using LibMan. You might have to wait a few seconds before seeing output.

  ```console
  libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js --files dist/browser/signalr.js
  ```

  The parameters specify the following options:
  * Use the unpkg provider.
  * Copy files to the *wwwroot/js/signalr* destination.
  * Copy only the specified files.

  The output looks like the following example:

  ```console
  wwwroot/js/signalr/dist/browser/signalr.js written to disk
  wwwroot/js/signalr/dist/browser/signalr.js written to disk
  Installed library "@microsoft/signalr@latest" to "wwwroot/js/signalr"
  ```

# [Visual Studio for Mac](#tab/visual-studio-mac)


  * In the **Terminal**, run the following command to install LibMan.

  ```dotnetcli
  dotnet tool install -g Microsoft.Web.LibraryManager.Cli
  ```

  > **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


  * Navigate to the project folder (the one that contains the `SignalRChat.csproj` file).

  * Run the following command to get the SignalR client library by using LibMan.

  ```console
  libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js --files dist/browser/signalr.js
  ```

  The parameters specify the following options:
  * Use the unpkg provider.
  * Copy files to the *wwwroot/js/signalr* destination.
  * Copy only the specified files.

  The output looks like the following example:

  ```console
  wwwroot/js/signalr/dist/browser/signalr.js written to disk
  wwwroot/js/signalr/dist/browser/signalr.js written to disk
  Installed library "@microsoft/signalr@latest" to "wwwroot/js/signalr"
  ```

---

## Create a SignalR hub

A *hub* is a class that serves as a high-level pipeline that handles client-server communication.

  * In the SignalRChat project folder, create a *Hubs* folder.
  * In the *Hubs* folder, create a `ChatHub.cs` file with the following code:

  [Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/sample-snapshot/3.x/ChatHub.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

  The `ChatHub` class inherits from the SignalR `Hub` class. The `Hub` class manages connections, groups, and messaging.

  The `SendMessage` method can be called by a connected client to send a message to all clients. JavaScript client code that calls the method is shown later in the tutorial. SignalR code is asynchronous to provide maximum scalability.

## Configure SignalR

The SignalR server must be configured to pass SignalR requests to SignalR.

* Add the following highlighted code to the `Startup.cs` file.

  [Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/sample-snapshot/3.x/Startup.cs?highlight=11,28,55](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

  These changes add SignalR to the ASP.NET Core dependency injection and routing systems.

## Add SignalR client code

* Replace the content in `Pages/Index.cshtml` with the following code:

  [Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/sample-snapshot/3.x/Index.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

  The preceding code:

  * Creates text boxes for name and message text, and a submit button.
  * Creates a list with `id="messagesList"` for displaying messages that are received from the SignalR hub.
  * Includes script references to SignalR and the `chat.js` application code that you create in the next step.

* In the *wwwroot/js* folder, create a `chat.js` file with the following code:

  [Code reference unavailable in this source snapshot: signalr/includes/~/tutorials/signalr/sample-snapshot/3.x/chat.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr.md)

  The preceding code:

  * Creates and starts a connection.
  * Adds to the submit button a handler that sends messages to the hub.
  * Adds to the connection object a handler that receives messages from the hub and adds them to the list.

## Run the app

# [Visual Studio](#tab/visual-studio)

* Press **CTRL+F5** to run the app without debugging.

# [Visual Studio Code](#tab/visual-studio-code)

* In the integrated terminal, run the following command:

  ```dotnetcli
  dotnet watch run -p SignalRChat.csproj
  ```

# [Visual Studio for Mac](#tab/visual-studio-mac)

  * From the menu, select **Run > Start Without Debugging**.

---

  * Copy the URL from the address bar, open another browser instance or tab, and paste the URL in the address bar.
  * Choose either browser, enter a name and message, and select the **Send Message** button.
  The name and message are displayed on both pages instantly.

  SignalR sample app

> **Tip:**
> * If the app doesn't work, open your browser developer tools (F12) and go to the console. You might see errors related to your HTML and JavaScript code. For example, suppose you put `signalr.js` in a different folder than directed. In that case the reference to that file won't work and you'll see a 404 error in the console.
>   signalr.js not found error
> * If you get the error ERR_SPDY_INADEQUATE_TRANSPORT_SECURITY in Chrome, run these commands to update your development certificate:
>
>   ```dotnetcli
>   dotnet dev-certs https --clean
>   dotnet dev-certs https --trust
>   ```

## Publish to Azure

For information on deploying to Azure, see [Quickstart: Deploy an ASP.NET web app](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore).

## Next steps

* [Use hubs](../signalr/hubs.md)
* [Strongly typed hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23strongly-typed-hubs)
* [Authentication and authorization in ASP.NET Core SignalR](../signalr/authn-and-authz.md)
* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/signalr/javascript-client/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
