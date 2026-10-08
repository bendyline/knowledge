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

  [ChatHub (complete source file; reference: \~/tutorials/signalr/sample-snapshot/3.x/ChatHub.cs)](../../../../_code/aspnetcore/tutorials/signalr/sample-snapshot/3.x/ChatHub.cs.md)

  The `ChatHub` class inherits from the SignalR `Hub` class. The `Hub` class manages connections, groups, and messaging.

  The `SendMessage` method can be called by a connected client to send a message to all clients. JavaScript client code that calls the method is shown later in the tutorial. SignalR code is asynchronous to provide maximum scalability.

## Configure SignalR

The SignalR server must be configured to pass SignalR requests to SignalR.

* Add the following highlighted code to the `Startup.cs` file.

  [Startup (complete source file; reference: \~/tutorials/signalr/sample-snapshot/3.x/Startup.cs?highlight=11,28,55)](../../../../_code/aspnetcore/tutorials/signalr/sample-snapshot/3.x/Startup.cs.md)

  These changes add SignalR to the ASP.NET Core dependency injection and routing systems.

## Add SignalR client code

* Replace the content in `Pages/Index.cshtml` with the following code:

  [Index (complete source file; reference: \~/tutorials/signalr/sample-snapshot/3.x/Index.cshtml)](../../../../_code/aspnetcore/tutorials/signalr/sample-snapshot/3.x/Index.cshtml.md)

  The preceding code:

  * Creates text boxes for name and message text, and a submit button.
  * Creates a list with `id="messagesList"` for displaying messages that are received from the SignalR hub.
  * Includes script references to SignalR and the `chat.js` application code that you create in the next step.

* In the *wwwroot/js* folder, create a `chat.js` file with the following code:

  [chat (complete source file; reference: \~/tutorials/signalr/sample-snapshot/3.x/chat.js)](../../../../_code/aspnetcore/tutorials/signalr/sample-snapshot/3.x/chat.js.md)

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

* [Use hubs](../../../signalr/hubs.md)
* [Strongly typed hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23strongly-typed-hubs)
* [Authentication and authorization in ASP.NET Core SignalR](../../../signalr/authn-and-authz.md)
* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/signalr/javascript-client/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))
