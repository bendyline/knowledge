---
title: "Tutorial: Get started with ASP.NET Core SignalR using TypeScript and Webpack"
ai-usage: ai-assisted
author: ssougnez
description: This tutorial provides a walkthrough of bundling and building an ASP.NET Core SignalR web app using TypeScript and Webpack.
<!-- ms.author: bradyg -->
monikerRange: ">= aspnetcore-2.1"
ms.author: wpickett
ms.date: 02/24/2026
uid: tutorials/signalr-typescript-webpack
---
# Tutorial: Get started with ASP.NET Core SignalR using TypeScript and Webpack

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

This tutorial demonstrates using [Webpack](https://webpack.js.org/) in an ASP.NET Core SignalR web app to bundle and build a client written in [TypeScript](https://www.typescriptlang.org/). Webpack enables developers to bundle and build the client-side resources of a web app.

In this tutorial, you learn how to:

> 
> * Create an ASP.NET Core SignalR app
> * Configure the SignalR server
> * Configure a build pipeline using Webpack
> * Configure the SignalR TypeScript client
> * Enable communication between the client and the server

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/signalr-typescript-webpack/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Prerequisites

* [Node.js](https://nodejs.org/) with [npm](https://www.npmjs.com/)

# [Visual Studio](#tab/visual-studio)

* [The latest version of Visual Studio](https://visualstudio.microsoft.com/downloads/) with the **ASP.NET and web development** workload.

  VS26 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# Dev Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
* [.NET 10.0 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)


You can follow the Visual Studio Code instructions on macOS, Linux, or Windows. Changes may be required if you use an integrated development environment (IDE) other than Visual Studio Code.


---

## Create the ASP.NET Core web app

# [Visual Studio](#tab/visual-studio)

By default, Visual Studio uses the version of npm found in its installation directory. To configure Visual Studio to look for npm in the `PATH` environment variable:

Launch the latest version of Visual Studio. At the start window, select **Continue without code**.

1. Navigate to **Tools** > **Options** > **Projects and Solutions** > **Web Package Management** > **External Web Tools**.
1. Select the `$(PATH)` entry from the list. Select the up arrow to move the entry to the second position in the list, and select **OK**:

   Visual Studio Configuration.

To create a new ASP.NET Core web app:

1. Use the **File** > **New** > **Project/Solution...** menu option.
1. In the **Create a new project** dialog, select **ASP.NET Core Empty** template. Then select **Next**.
1. In the **Configure your new project** dialog, enter `SignalRWebpack` for **Project name**. Select **Next**.
1. In the **Additional information** dialog, select **.NET 10.0 (Long Term Support)** from the **Framework** drop-down. Select **Create**.

Add the [Microsoft.TypeScript.MSBuild](https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild/) NuGet package to the project:

1. In **Solution Explorer**, right-click the project node and select **Manage NuGet Packages...**.
1. In the **Browse** tab, search for `Microsoft.TypeScript.MSBuild` and then select **Install** on the right to install the package.
1. In the **Preview Changes** dialog, select **Apply**.
1. In the **License Acceptance** dialog, select **I Accept**.

Visual Studio adds the NuGet package under the **Dependencies** node in **Solution Explorer**, enabling TypeScript compilation in the project.

# [Visual Studio Code](#tab/visual-studio-code)

Run the following commands in the **Terminal**:

```dotnetcli
dotnet new web -o SignalRWebpack
code -r SignalRWebpack
```

* The `dotnet new` command creates an empty ASP.NET Core web app in a `SignalRWebpack` directory.
* The `code` command opens the `SignalRWebpack` directory in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

Run the following .NET CLI command in the **Terminal**:

```dotnetcli
dotnet add package Microsoft.TypeScript.MSBuild
```

The preceding command adds the [Microsoft.TypeScript.MSBuild](https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild/) package, enabling TypeScript compilation in the project.

---

## Configure the server

In this section, you configure the ASP.NET Core web app to send and receive SignalR messages.

1. In `Program.cs`, call [Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%252A):

   [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/Program.cs?name=snippet_AddSignalR\&highlight=3)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/Program.cs.md)

1. Again, in `Program.cs`, call [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A) and [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A):

   [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/Program.cs?name=snippet_FilesMiddleware\&highlight=3-4)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/Program.cs.md)

   The preceding code allows the server to locate and serve the `index.html` file. The file is served whether the user enters its full URL or the root URL of the web app.

1. Create a new directory named `Hubs` in the project root, `SignalRWebpack/`, for the SignalR hub class.

1. Create a new file, `Hubs/ChatHub.cs`, with the following code:

   [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/Hubs/ChatHub.cs)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/Hubs/ChatHub.cs.md)

   The preceding code broadcasts received messages to all connected users once the server receives them. It's unnecessary to have a generic `on` method to receive all the messages. A method named after the message name is enough.

   In this example:

   * The TypeScript client sends a message identified as `newMessage`.
   * The C# `NewMessage` method expects the data sent by the client.
   * A call is made to [Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%252A) on [Clients.All](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.IHubClients%25601.All).
   * The received messages are sent to all clients connected to the hub.

1. Add the following `using` statement at the top of `Program.cs` to resolve the `ChatHub` reference:

   [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/Program.cs?name=snippet_HubsNamespace)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/Program.cs.md)

1. In `Program.cs`, map the `/hub` route to the `ChatHub` hub. Replace the code that displays `Hello World!` with the following code:

   [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/Program.cs?name=snippet_MapHub)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/Program.cs.md)

## Configure the client

In this section, you create a [Node.js](https://nodejs.org/) project to convert TypeScript to JavaScript and bundle client-side resources, including HTML and CSS, using Webpack.

1. Run the following command in the project root to create a `package.json` file:

   ```console
   npm init -y
   ```

1. Add the highlighted property to the `package.json` file and save the file changes:

   [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/package.json?highlight=4)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/package.json.md)

   Setting the `private` property to `true` prevents package installation warnings in the next step.

1. Install the required npm packages. Run the following command from the project root:

    ```console
    npm i -D -E clean-webpack-plugin css-loader html-webpack-plugin mini-css-extract-plugin ts-loader typescript webpack webpack-cli
    ```

    The `-E` option disables npm's default behavior of writing [semantic versioning](https://semver.org/) range operators to `package.json`. For example, `"webpack": "5.76.1"` is used instead of `"webpack": "^5.76.1"`. This option prevents unintended upgrades to newer package versions.

    For more information, see the [npm-install](https://docs.npmjs.com/cli/install) documentation.

1. Replace the `scripts` property of `package.json` file with the following code:

   [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/package.json?range=7-11)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/package.json.md)

   The following scripts are defined:

   * `build`: Bundles the client-side resources in development mode and watches for file changes. The file watcher causes the bundle to regenerate each time a project file changes. The `mode` option disables production optimizations, such as tree shaking and minification. use `build` in development only.
   * `release`: Bundles the client-side resources in production mode.
   * `publish`: Runs the `release` script to bundle the client-side resources in production mode. It calls the .NET CLI's [publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command to publish the app.

1. Create a file named `webpack.config.js` in the project root, with the following code:

   [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/webpack.config.js)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/webpack.config.js.md)

   The preceding file configures the Webpack compilation process:

   * The `output` property overrides the default value of `dist`. The bundle is instead emitted in the `wwwroot` directory.
   * The `resolve.extensions` array includes `.js` to import the SignalR client JavaScript.

1. Create a new directory named `src` in the project root, `SignalRWebpack/`, for the client code.
   
1. Copy the `src` directory and its contents from the [sample project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/signalr-typescript-webpack/samples/) into the project root. The `src` directory contains the following files:

   * `index.html`, which defines the homepage's boilerplate markup:

      [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/src/index.html)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/src/index.html.md)

   * `css/main.css`, which provides CSS styles for the homepage:

      [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/src/css/main.css)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/src/css/main.css.md)

   * `tsconfig.json`, which configures the TypeScript compiler to produce [ECMAScript](https://wikipedia.org/wiki/ECMAScript) 5-compatible JavaScript:

      [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/src/tsconfig.json)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/src/tsconfig.json.md)

   * `index.ts`:

      [Code example (complete source file; reference: \~/tutorials/signalr-typescript-webpack/samples/10.x/src/index.ts)](../../_code/aspnetcore/tutorials/signalr-typescript-webpack/samples/10.x/src/index.ts.md)

      The preceding code retrieves references to DOM elements and attaches two event handlers:

      * `keyup`: Fires when the user types in the `tbMessage` textbox and calls the `send` function when the user presses the **Enter** key.
      * `click`: Fires when the user selects the **Send** button and calls `send` function is called.

      The `HubConnectionBuilder` class creates a new builder for configuring the server connection. The `withUrl` function configures the hub URL.

      SignalR enables the exchange of messages between a client and a server. Each message has a specific name. For example, messages with the name `messageReceived` can run the logic responsible for displaying the new message in the messages zone. Listening to a specific message can be done via the `on` function. Any number of message names can be listened to. It's also possible to pass parameters to the message, such as the author's name and the content of the message received. Once the client receives a message, a new `div` element is created with the author's name and message content appended as child elements using `textContent`. It's added to the main `div` element displaying the messages.

      Sending a message through the WebSockets connection requires calling the `send` method. The method's first parameter is the message name. The message data inhabits the other parameters. In this example, a message identified as `newMessage` is sent to the server. The message consists of the username and the user input from a text box. If the send works, the text box value is cleared.

1. Run the following command at the project root:

   ```console
   npm i @microsoft/signalr @types/node
   ```

   The preceding command installs:

   * The [SignalR TypeScript client](https://www.npmjs.com/package/@microsoft/signalr), which allows the client to send messages to the server.
   * The TypeScript type definitions for Node.js, which enables compile-time checking of Node.js types.

## Test the app

Confirm that the app works with the following steps:

# [Visual Studio](#tab/visual-studio)

1. Run Webpack in `release` mode. Using the **Package Manager Console** window, run the following command in the project root.

   ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Select **Debug** > **Start without debugging** to launch the app in a browser without attaching the debugger. The `wwwroot/index.html` file is served at `https://localhost:<port>`.

   If there are compile errors, try closing and reopening the solution.

1. Open another browser instance (any browser) and paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

# [Visual Studio Code](#tab/visual-studio-code)

1. Run Webpack in `release` mode by executing the following command in the project root:

   ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Build and run the app by executing the following command in the project root:

   ```dotnetcli
   dotnet run
   ```

   The web server starts the app and makes it available on localhost.

1. Open a browser to `https://localhost:<port>`. The `wwwroot/index.html` file is served. Copy the URL from the address bar.

1. Open another browser instance (any browser). Paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

---

Message displayed in both browser windows.

## Next steps

* [Strongly typed hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23use-strongly-typed-hubs)
* [Authentication and authorization in ASP.NET Core SignalR](../signalr/authn-and-authz.md)
* [MessagePack Hub Protocol in SignalR for ASP.NET Core](../signalr/messagepackhubprotocol.md)

## Additional resources

* [signalr/javascript-client](../signalr/javascript-client.md)
* [signalr/hubs](../signalr/hubs.md)



**Applies to: aspnetcore-8.0 || aspnetcore-9.0**

This tutorial demonstrates using [Webpack](https://webpack.js.org/) in an ASP.NET Core SignalR web app to bundle and build a client written in [TypeScript](https://www.typescriptlang.org/). Webpack enables developers to bundle and build the client-side resources of a web app.

In this tutorial, you learn how to:

> 
> * Create an ASP.NET Core SignalR app
> * Configure the SignalR server
> * Configure a build pipeline using Webpack
> * Configure the SignalR TypeScript client
> * Enable communication between the client and the server

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/tutorials/signalr-typescript-webpack/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Prerequisites

* [Node.js](https://nodejs.org/) with [npm](https://www.npmjs.com/)

# [Visual Studio](#tab/visual-studio)


* [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) with the **ASP.NET and web development** workload.

  VS22 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


---

## Create the ASP.NET Core web app

# [Visual Studio](#tab/visual-studio)

By default, Visual Studio uses the version of npm found in its installation directory. To configure Visual Studio to look for npm in the `PATH` environment variable:

Launch Visual Studio. At the start window, select **Continue without code**.

1. Navigate to **Tools** > **Options** > **Projects and Solutions** > **Web Package Management** > **External Web Tools**.
1. Select the `$(PATH)` entry from the list. Select the up arrow to move the entry to the second position in the list, and select **OK**:

   Visual Studio Configuration.

To create a new ASP.NET Core web app:

1. Use the **File** > **New** > **Project** menu option and choose the **ASP.NET Core Empty** template. Select **Next**.
1. Name the project `SignalRWebpack`, and select **Create**.
1. Select **.NET 8.0 (Long Term Support)** from the **Framework** drop-down. Select **Create**.

Add the [Microsoft.TypeScript.MSBuild](https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild/) NuGet package to the project:

1. In **Solution Explorer**, right-click the project node and select **Manage NuGet Packages**. In the **Browse** tab, search for `Microsoft.TypeScript.MSBuild` and then select **Install** on the right to install the package.

Visual Studio adds the NuGet package under the **Dependencies** node in **Solution Explorer**, enabling TypeScript compilation in the project.

# [Visual Studio Code](#tab/visual-studio-code)

Run the following commands in the **Integrated Terminal**:

```dotnetcli
dotnet new web -o SignalRWebpack
code -r SignalRWebpack
```

* The `dotnet new` command creates an empty ASP.NET Core web app in a `SignalRWebpack` directory.
* The `code` command opens the `SignalRWebpack` directory in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

Run the following .NET CLI command in the **Integrated Terminal**:

```dotnetcli
dotnet add package Microsoft.TypeScript.MSBuild
```

The preceding command adds the [Microsoft.TypeScript.MSBuild](https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild/) package, enabling TypeScript compilation in the project.

---

## Configure the server

In this section, you configure the ASP.NET Core web app to send and receive SignalR messages.

1. In `Program.cs`, call [Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%252A):

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/Program.cs?name=snippet_AddSignalR\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. Again, in `Program.cs`, call [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A) and [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A):

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/Program.cs?name=snippet_FilesMiddleware\\&highlight=3-4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The preceding code allows the server to locate and serve the `index.html` file. The file is served whether the user enters its full URL or the root URL of the web app.

1. Create a new directory named `Hubs` in the project root, `SignalRWebpack/`, for the SignalR hub class.

1. Create a new file, `Hubs/ChatHub.cs`, with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/Hubs/ChatHub.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The preceding code broadcasts received messages to all connected users once the server receives them. It's unnecessary to have a generic `on` method to receive all the messages. A method named after the message name is enough.

   In this example:

   * The TypeScript client sends a message identified as `newMessage`.
   * The C# `NewMessage` method expects the data sent by the client.
   * A call is made to [Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%252A) on [Clients.All](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.IHubClients%25601.All).
   * The received messages are sent to all clients connected to the hub.

1. Add the following `using` statement at the top of `Program.cs` to resolve the `ChatHub` reference:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/Program.cs?name=snippet_HubsNamespace](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. In `Program.cs`, map the `/hub` route to the `ChatHub` hub. Replace the code that displays `Hello World!` with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/Program.cs?name=snippet_MapHub](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

## Configure the client

In this section, you create a [Node.js](https://nodejs.org/) project to convert TypeScript to JavaScript and bundle client-side resources, including HTML and CSS, using Webpack.

1. Run the following command in the project root to create a `package.json` file:

   ```console
   npm init -y
   ```

1. Add the highlighted property to the `package.json` file and save the file changes:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples_snapshot/8.x/package.json?highlight=4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   Setting the `private` property to `true` prevents package installation warnings in the next step.

1. Install the required npm packages. Run the following command from the project root:

    ```console
    npm i -D -E clean-webpack-plugin css-loader html-webpack-plugin mini-css-extract-plugin ts-loader typescript webpack webpack-cli
    ```

    The `-E` option disables npm's default behavior of writing [semantic versioning](https://semver.org/) range operators to `package.json`. For example, `"webpack": "5.76.1"` is used instead of `"webpack": "^5.76.1"`. This option prevents unintended upgrades to newer package versions.

    For more information, see the [npm-install](https://docs.npmjs.com/cli/install) documentation.

1. Replace the `scripts` property of `package.json` file with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/package.json?range=7-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The following scripts are defined:

   * `build`: Bundles the client-side resources in development mode and watches for file changes. The file watcher causes the bundle to regenerate each time a project file changes. The `mode` option disables production optimizations, such as tree shaking and minification. use `build` in development only.
   * `release`: Bundles the client-side resources in production mode.
   * `publish`: Runs the `release` script to bundle the client-side resources in production mode. It calls the .NET CLI's [publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command to publish the app.

1. Create a file named `webpack.config.js` in the project root, with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/webpack.config.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The preceding file configures the Webpack compilation process:

   * The `output` property overrides the default value of `dist`. The bundle is instead emitted in the `wwwroot` directory.
   * The `resolve.extensions` array includes `.js` to import the SignalR client JavaScript.

1. Create a new directory named `src` in the project root, `SignalRWebpack/`, for the client code.
   
1. Copy the `src` directory and its contents from the [sample project](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/) into the project root. The `src` directory contains the following files:

   * `index.html`, which defines the homepage's boilerplate markup:

      [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/src/index.html](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   * `css/main.css`, which provides CSS styles for the homepage:

      [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/src/css/main.css](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   * `tsconfig.json`, which configures the TypeScript compiler to produce [ECMAScript](https://wikipedia.org/wiki/ECMAScript) 5-compatible JavaScript:

      [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/src/tsconfig.json](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   * `index.ts`:

      [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/8.x/SignalRWebpack/src/index.ts](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

      The preceding code retrieves references to DOM elements and attaches two event handlers:

      * `keyup`: Fires when the user types in the `tbMessage` textbox and calls the `send` function when the user presses the **Enter** key.
      * `click`: Fires when the user selects the **Send** button and calls `send` function is called.

      The `HubConnectionBuilder` class creates a new builder for configuring the server connection. The `withUrl` function configures the hub URL.

      SignalR enables the exchange of messages between a client and a server. Each message has a specific name. For example, messages with the name `messageReceived` can run the logic responsible for displaying the new message in the messages zone. Listening to a specific message can be done via the `on` function. Any number of message names can be listened to. It's also possible to pass parameters to the message, such as the author's name and the content of the message received. Once the client receives a message, a new `div` element is created with the author's name and message content appended as child elements using `textContent`. It's added to the main `div` element displaying the messages.

      Sending a message through the WebSockets connection requires calling the `send` method. The method's first parameter is the message name. The message data inhabits the other parameters. In this example, a message identified as `newMessage` is sent to the server. The message consists of the username and the user input from a text box. If the send works, the text box value is cleared.

1. Run the following command at the project root:

   ```console
   npm i @microsoft/signalr @types/node
   ```

   The preceding command installs:

   * The [SignalR TypeScript client](https://www.npmjs.com/package/@microsoft/signalr), which allows the client to send messages to the server.
   * The TypeScript type definitions for Node.js, which enables compile-time checking of Node.js types.

## Test the app

Confirm that the app works with the following steps:

# [Visual Studio](#tab/visual-studio)

1. Run Webpack in `release` mode. Using the **Package Manager Console** window, run the following command in the project root.

   ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Select **Debug** > **Start without debugging** to launch the app in a browser without attaching the debugger. The `wwwroot/index.html` file is served at `https://localhost:<port>`.

   If there are compile errors, try closing and reopening the solution.

1. Open another browser instance (any browser) and paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

# [Visual Studio Code](#tab/visual-studio-code)

1. Run Webpack in `release` mode by executing the following command in the project root:

   ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Build and run the app by executing the following command in the project root:

   ```dotnetcli
   dotnet run
   ```

   The web server starts the app and makes it available on localhost.

1. Open a browser to `https://localhost:<port>`. The `wwwroot/index.html` file is served. Copy the URL from the address bar.

1. Open another browser instance (any browser). Paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

---

Message displayed in both browser windows

## Next steps

* [Strongly typed hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23use-strongly-typed-hubs)
* [Authentication and authorization in ASP.NET Core SignalR](../signalr/authn-and-authz.md)
* [MessagePack Hub Protocol in SignalR for ASP.NET Core](../signalr/messagepackhubprotocol.md)

## Additional resources

* [signalr/javascript-client](../signalr/javascript-client.md)
* [signalr/hubs](../signalr/hubs.md)





**Applies to: \= aspnetcore-7.0**

This tutorial demonstrates using [Webpack](https://webpack.js.org/) in an ASP.NET Core SignalR web app to bundle and build a client written in [TypeScript](https://www.typescriptlang.org/). Webpack enables developers to bundle and build the client-side resources of a web app.

In this tutorial, you learn how to:

> 
> * Create an ASP.NET Core SignalR app
> * Configure the SignalR server
> * Configure a build pipeline using Webpack
> * Configure the SignalR TypeScript client
> * Enable communication between the client and the server

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/tutorials/signalr-typescript-webpack/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Prerequisites

* [Node.js](https://nodejs.org/) with [npm](https://www.npmjs.com/)

# [Visual Studio](#tab/visual-studio)


* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/#download) with the **ASP.NET and web development** workload.

  VS22 installer workloads


# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


---

## Create the ASP.NET Core web app

# [Visual Studio](#tab/visual-studio)

By default, Visual Studio uses the version of npm found in its installation directory. To configure Visual Studio to look for npm in the `PATH` environment variable:

Launch Visual Studio. At the start window, select **Continue without code**.

1. Navigate to **Tools** > **Options** > **Projects and Solutions** > **Web Package Management** > **External Web Tools**.
1. Select the `$(PATH)` entry from the list. Select the up arrow to move the entry to the second position in the list, and select **OK**:

   Visual Studio Configuration.

To create a new ASP.NET Core web app:

1. Use the **File** > **New** > **Project** menu option and choose the **ASP.NET Core Empty** template. Select **Next**.
1. Name the project `SignalRWebpack`, and select **Create**.
1. Select **.NET 7.0 (Standard Term Support)** from the **Framework** drop-down. Select **Create**.

Add the [Microsoft.TypeScript.MSBuild](https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild/) NuGet package to the project:

1. In **Solution Explorer**, right-click the project node and select **Manage NuGet Packages**. In the **Browse** tab, search for `Microsoft.TypeScript.MSBuild` and then select **Install** on the right to install the package.

Visual Studio adds the NuGet package under the **Dependencies** node in **Solution Explorer**, enabling TypeScript compilation in the project.

# [Visual Studio Code](#tab/visual-studio-code)

1. Run the following commands in the **Integrated Terminal**:

   ```dotnetcli
   dotnet new web -o SignalRWebpack
   code -r SignalRWebpack
   ```

* The `dotnet new` command creates an empty ASP.NET Core web app in a `SignalRWebpack` directory.
* The `code` command opens the `SignalRWebpack` directory in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

1. Run the following .NET CLI command in the **Integrated Terminal**:

   ```dotnetcli
   dotnet add package Microsoft.TypeScript.MSBuild
   ```

   The preceding command adds the [Microsoft.TypeScript.MSBuild](https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild/) package, enabling TypeScript compilation in the project.

---

## Configure the server

In this section, you configure the ASP.NET Core web app to send and receive SignalR messages.

1. In `Program.cs`, call [Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%252A):

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/Program.cs?name=snippet_AddSignalR\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. Again, in `Program.cs`, call [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A) and [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A):

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/Program.cs?name=snippet_FilesMiddleware\\&highlight=3-4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The preceding code allows the server to locate and serve the `index.html` file. The file is served whether the user enters its full URL or the root URL of the web app.

1. Create a new directory named `Hubs` in the project root, `SignalRWebpack/`, for the SignalR hub class.

1. Create a new file, `Hubs/ChatHub.cs`, with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/Hubs/ChatHub.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The preceding code broadcasts received messages to all connected users once the server receives them. It's unnecessary to have a generic `on` method to receive all the messages. A method named after the message name is enough.

   In this example:

   * The TypeScript client sends a message identified as `newMessage`.
   * The C# `NewMessage` method expects the data sent by the client.
   * A call is made to [Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%252A) on [Clients.All](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.IHubClients%25601.All).
   * The received messages are sent to all clients connected to the hub.

1. Add the following `using` statement at the top of `Program.cs` to resolve the `ChatHub` reference:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/Program.cs?name=snippet_HubsNamespace](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. In `Program.cs`, map the `/hub` route to the `ChatHub` hub. Replace the code that displays `Hello World!` with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/Program.cs?name=snippet_MapHub](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

## Configure the client

In this section, you create a [Node.js](https://nodejs.org/) project to convert TypeScript to JavaScript and bundle client-side resources, including HTML and CSS, using Webpack.

1. Run the following command in the project root to create a `package.json` file:

   ```console
   npm init -y
   ```

1. Add the highlighted property to the `package.json` file and save the file changes:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples_snapshot/7.x/package.json?highlight=4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   Setting the `private` property to `true` prevents package installation warnings in the next step.

1. Install the required npm packages. Run the following command from the project root:

   ```console
   npm i -D -E clean-webpack-plugin css-loader html-webpack-plugin mini-css-extract-plugin ts-loader typescript webpack webpack-cli
   ```

   The `-E` option disables npm's default behavior of writing [semantic versioning](https://semver.org/) range operators to `package.json`. For example, `"webpack": "5.76.1"` is used instead of `"webpack": "^5.76.1"`. This option prevents unintended upgrades to newer package versions.

   For more information, see the [npm-install](https://docs.npmjs.com/cli/install) documentation.

1. Replace the `scripts` property of `package.json` file with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/package.json?range=7-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The following scripts are defined:

   * `build`: Bundles the client-side resources in development mode and watches for file changes. The file watcher causes the bundle to regenerate each time a project file changes. The `mode` option disables production optimizations, such as tree shaking and minification. use `build` in development only.
   * `release`: Bundles the client-side resources in production mode.
   * `publish`: Runs the `release` script to bundle the client-side resources in production mode. It calls the .NET CLI's [publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command to publish the app.

1. Create a file named `webpack.config.js` in the project root, with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/webpack.config.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The preceding file configures the Webpack compilation process:

   * The `output` property overrides the default value of `dist`. The bundle is instead emitted in the `wwwroot` directory.
   * The `resolve.extensions` array includes `.js` to import the SignalR client JavaScript.

1. Copy the `src` directory and its contents from the [sample project](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/) into the project root. The `src` directory contains the following files:

   * `index.html`, which defines the homepage's boilerplate markup:

     [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/src/index.html](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   * `css/main.css`, which provides CSS styles for the homepage:

     [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/src/css/main.css](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   * `tsconfig.json`, which configures the TypeScript compiler to produce [ECMAScript](https://wikipedia.org/wiki/ECMAScript) 5-compatible JavaScript:

     [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/src/tsconfig.json](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   * `index.ts`:

     [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/7.x/SignalRWebpack/src/index.ts](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

     The preceding code retrieves references to DOM elements and attaches two event handlers:

     * `keyup`: Fires when the user types in the `tbMessage` textbox and calls the `send` function when the user presses the **Enter** key.
     * `click`: Fires when the user selects the **Send** button and calls `send` function is called.

     The `HubConnectionBuilder` class creates a new builder for configuring the server connection. The `withUrl` function configures the hub URL.

     SignalR enables the exchange of messages between a client and a server. Each message has a specific name. For example, messages with the name `messageReceived` can run the logic responsible for displaying the new message in the messages zone. Listening to a specific message can be done via the `on` function. Any number of message names can be listened to. It's also possible to pass parameters to the message, such as the author's name and the content of the message received. Once the client receives a message, a new `div` element is created with the author's name and message content appended as child elements using `textContent`. It's added to the main `div` element displaying the messages.

     Sending a message through the WebSockets connection requires calling the `send` method. The method's first parameter is the message name. The message data inhabits the other parameters. In this example, a message identified as `newMessage` is sent to the server. The message consists of the username and the user input from a text box. If the send works, the text box value is cleared.

1. Run the following command at the project root:

   ```console
   npm i @microsoft/signalr @types/node
   ```

   The preceding command installs:

   * The [SignalR TypeScript client](https://www.npmjs.com/package/@microsoft/signalr), which allows the client to send messages to the server.
   * The TypeScript type definitions for Node.js, which enables compile-time checking of Node.js types.

## Test the app

Confirm that the app works with the following steps:

# [Visual Studio](#tab/visual-studio)

1. Run Webpack in `release` mode. Using the **Package Manager Console** window, run the following command in the project root.

   ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Select **Debug** > **Start without debugging** to launch the app in a browser without attaching the debugger. The `wwwroot/index.html` file is served at `https://localhost:<port>`.

   If there are compile errors, try closing and reopening the solution.

1. Open another browser instance (any browser) and paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

# [Visual Studio Code](#tab/visual-studio-code)

1. Run Webpack in `release` mode by executing the following command in the project root:

   ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Build and run the app by executing the following command in the project root:

   ```dotnetcli
   dotnet run
   ```

   The web server starts the app and makes it available on localhost.

1. Open a browser to `https://localhost:<port>`. The `wwwroot/index.html` file is served. Copy the URL from the address bar.

1. Open another browser instance (any browser). Paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

---

Message displayed in both browser windows

## Next steps

* [Strongly typed hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23strongly-typed-hubs)
* [Authentication and authorization in ASP.NET Core SignalR](../signalr/authn-and-authz.md)
* [MessagePack Hub Protocol in SignalR for ASP.NET Core](../signalr/messagepackhubprotocol.md)

## Additional resources

* [signalr/javascript-client](../signalr/javascript-client.md)
* [signalr/hubs](../signalr/hubs.md)




**Applies to: \= aspnetcore-6.0**

This tutorial demonstrates using [Webpack](https://webpack.js.org/) in an ASP.NET Core SignalR web app to bundle and build a client written in [TypeScript](https://www.typescriptlang.org/). Webpack enables developers to bundle and build the client-side resources of a web app.

In this tutorial, you learn how to:

> 
> * Create an ASP.NET Core SignalR app
> * Configure the SignalR server
> * Configure a build pipeline using Webpack
> * Configure the SignalR TypeScript client
> * Enable communication between the client and the server

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/tutorials/signalr-typescript-webpack/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Prerequisites

* [Node.js](https://nodejs.org/) with [npm](https://www.npmjs.com/)

# [Visual Studio](#tab/visual-studio)

* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/#download) with the **ASP.NET and web development** workload.
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)



# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code (latest version)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)


The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.


---

## Create the ASP.NET Core web app

# [Visual Studio](#tab/visual-studio)

By default, Visual Studio uses the version of npm found in its installation directory. To configure Visual Studio to look for npm in the `PATH` environment variable:

1. Launch Visual Studio. At the start window, select **Continue without code**.
1. Navigate to **Tools** > **Options** > **Projects and Solutions** > **Web Package Management** > **External Web Tools**.
1. Select the `$(PATH)` entry from the list. Select the up arrow to move the entry to the second position in the list, and select **OK**:

   Visual Studio Configuration.

To create a new ASP.NET Core web app:

1. Use the **File** > **New** > **Project** menu option and choose the **ASP.NET Core Empty** template. Select **Next**.
1. Name the project `SignalRWebpack`, and select **Create**.
1. Select **.NET 6.0 (Long Term Support)** from the **Framework** drop-down. Select **Create**.

Add the [Microsoft.TypeScript.MSBuild](https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild/) NuGet package to the project:

1. In **Solution Explorer**, right-click the project node and select **Manage NuGet Packages**. In the **Browse** tab, search for `Microsoft.TypeScript.MSBuild` and then select **Install** on the right to install the package.

Visual Studio adds the NuGet package under the **Dependencies** node in **Solution Explorer**, enabling TypeScript compilation in the project.

# [Visual Studio Code](#tab/visual-studio-code)

1. Run the following commands in the **Integrated Terminal**:

   ```dotnetcli
   dotnet new web -o SignalRWebpack
   code -r SignalRWebpack
   ```

   * The `dotnet new` command creates an empty ASP.NET Core web app in a `SignalRWebpack` directory.
   * The `code` command opens the `SignalRWebpack` directory in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

1. Run the following .NET CLI command in the **Integrated Terminal**:

   ```dotnetcli
   dotnet add package Microsoft.TypeScript.MSBuild
   ```

   The preceding command adds the [Microsoft.TypeScript.MSBuild](https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild/) package, enabling TypeScript compilation in the project.

---

## Configure the server

In this section, you configure the ASP.NET Core web app to send and receive SignalR messages.

1. In `Program.cs`, call [Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%252A):

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/Program.cs?name=snippet_AddSignalR\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. Again, in `Program.cs`, call [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles%252A) and [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles%252A):

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/Program.cs?name=snippet_FilesMiddleware\\&highlight=3-4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The preceding code allows the server to locate and serve the `index.html` file. The file is served whether the user enters its full URL or the root URL of the web app.

1. Create a new directory named `Hubs` in the project root, `SignalRWebpack/`, for the SignalR hub class.

1. Create a new file, `Hubs/ChatHub.cs`, with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/Hubs/ChatHub.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The preceding code broadcasts received messages to all connected users once the server receives them. It's unnecessary to have a generic `on` method to receive all the messages. A method named after the message name is enough.

   In this example, the TypeScript client sends a message identified as `newMessage`. The C# `NewMessage` method expects the data sent by the client. A call is made to [Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%252A) on [Clients.All](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.IHubClients%25601.All). The received messages are sent to all clients connected to the hub.

1. Add the following `using` statement at the top of `Program.cs` to resolve the `ChatHub` reference:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/Program.cs?name=snippet_HubsNamespace](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. In `Program.cs`, map the `/hub` route to the `ChatHub` hub. Replace the code that displays `Hello World!` with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/Program.cs?name=snippet_MapHub](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

## Configure the client

In this section, you create a [Node.js](https://nodejs.org/) project to convert TypeScript to JavaScript and bundle client-side resources, including HTML and CSS, using Webpack.

1. Run the following command in the project root to create a `package.json` file:

   ```console
   npm init -y
   ```

1. Add the highlighted property to the `package.json` file and save the file changes:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples_snapshot/6.x/package.json?highlight=4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   Setting the `private` property to `true` prevents package installation warnings in the next step.

1. Install the required npm packages. Run the following command from the project root:

   ```console
   npm i -D -E clean-webpack-plugin css-loader html-webpack-plugin mini-css-extract-plugin ts-loader typescript webpack webpack-cli
   ```

   The `-E` option disables npm's default behavior of writing [semantic versioning](https://semver.org/) range operators to `package.json`. For example, `"webpack": "5.70.0"` is used instead of `"webpack": "^5.70.0"`. This option prevents unintended upgrades to newer package versions.

   For more information, see the [npm-install](https://docs.npmjs.com/cli/install) documentation.

1. Replace the `scripts` property of `package.json` file with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/package.json?range=7-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The following scripts are defined:

   * `build`: Bundles the client-side resources in development mode and watches for file changes. The file watcher causes the bundle to regenerate each time a project file changes. The `mode` option disables production optimizations, such as tree shaking and minification. use `build` in development only.
   * `release`: Bundles the client-side resources in production mode.
   * `publish`: Runs the `release` script to bundle the client-side resources in production mode. It calls the .NET CLI's [publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command to publish the app.

1. Create a file named `webpack.config.js` in the project root, with the following code:

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/webpack.config.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The preceding file configures the Webpack compilation process:

   * The `output` property overrides the default value of `dist`. The bundle is instead emitted in the `wwwroot` directory.
   * The `resolve.extensions` array includes `.js` to import the SignalR client JavaScript.

1. Copy the `src` directory and its contents from the [sample project](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/) into the project root. The `src` directory contains the following files:

   * `index.html`, which defines the homepage's boilerplate markup:

     [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/src/index.html](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   * `css/main.css`, which provides CSS styles for the homepage:

     [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/src/css/main.css](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   * `tsconfig.json`, which configures the TypeScript compiler to produce [ECMAScript](https://wikipedia.org/wiki/ECMAScript) 5-compatible JavaScript:

     [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/src/tsconfig.json](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   * `index.ts`:

     [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/AspNetCore.Docs.Samples/tutorials/signalr-typescript-webpack/samples/6.x/SignalRWebpack/src/index.ts](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The preceding code retrieves references to DOM elements and attaches two event handlers:

   * `keyup`: Fires when the user types in the `tbMessage` textbox and calls the `send` function when the user presses the **Enter** key.
   * `click`: Fires when the user selects the **Send** button and calls `send` function is called.

   The `HubConnectionBuilder` class creates a new builder for configuring the server connection. The `withUrl` function configures the hub URL.

   SignalR enables the exchange of messages between a client and a server. Each message has a specific name. For example, messages with the name `messageReceived` can run the logic responsible for displaying the new message in the messages zone. Listening to a specific message can be done via the `on` function. Any number of message names can be listened to. It's also possible to pass parameters to the message, such as the author's name and the content of the message received. Once the client receives a message, a new `div` element is created with the author's name and message content appended as child elements using `textContent`. It's added to the main `div` element displaying the messages.

   Sending a message through the WebSockets connection requires calling the `send` method. The method's first parameter is the message name. The message data inhabits the other parameters. In this example, a message identified as `newMessage` is sent to the server. The message consists of the username and the user input from a text box. If the send works, the text box value is cleared.

1. Run the following command at the project root:

   ```console
   npm i @microsoft/signalr @types/node
   ```

   The preceding command installs:

   * The [SignalR TypeScript client](https://www.npmjs.com/package/@microsoft/signalr), which allows the client to send messages to the server.
   * The TypeScript type definitions for Node.js, which enables compile-time checking of Node.js types.

## Test the app

Confirm that the app works with the following steps:

# [Visual Studio](#tab/visual-studio)

1. Run Webpack in `release` mode. Using the **Package Manager Console** window, run the following command in the project root. If you aren't in the project root, enter `cd SignalRWebpack` before entering the command.

   ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Select **Debug** > **Start without debugging** to launch the app in a browser without attaching the debugger. The `wwwroot/index.html` file is served at `https://localhost:<port>`.

   If you get compile errors, try closing and reopening the solution.

1. Open another browser instance (any browser) and paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

# [Visual Studio Code](#tab/visual-studio-code)

1. Run Webpack in `release` mode by executing the following command in the project root:

   ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Build and run the app by executing the following command in the project root:

   ```dotnetcli
   dotnet run
   ```

   The web server starts the app and makes it available on localhost.

1. Open a browser to `https://localhost:<port>`. The `wwwroot/index.html` file is served. Copy the URL from the address bar.

1. Open another browser instance (any browser). Paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

---

Message displayed in both browser windows

## Next steps

* [Strongly typed hubs](https://learn.microsoft.com/search/?terms=signalr%2Fhubs%23strongly-typed-hubs)
* [Authentication and authorization in ASP.NET Core SignalR](../signalr/authn-and-authz.md)
* [MessagePack Hub Protocol in SignalR for ASP.NET Core](../signalr/messagepackhubprotocol.md)

## Additional resources

* [signalr/javascript-client](../signalr/javascript-client.md)
* [signalr/hubs](../signalr/hubs.md)




**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

This tutorial demonstrates using [Webpack](https://webpack.js.org/) in an ASP.NET Core SignalR web app to bundle and build a client written in [TypeScript](https://www.typescriptlang.org/). Webpack enables developers to bundle and build the client-side resources of a web app.

In this tutorial, you learn how to:

> 
> * Scaffold a starter ASP.NET Core SignalR app
> * Configure the SignalR TypeScript client
> * Configure a build pipeline using Webpack
> * Configure the SignalR server
> * Enable communication between client and server

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/signalr-typescript-webpack/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Prerequisites

# [Visual Studio](#tab/visual-studio)

* [Visual Studio 2019](https://visualstudio.microsoft.com/downloads/?utm_medium=microsoft&utm_source=learn.microsoft.com&utm_campaign=inline+link&utm_content=download+vs2019) with the **ASP.NET and web development** workload
* [.NET Core SDK 3.0 or later](https://dotnet.microsoft.com/download/dotnet-core)
* [Node.js](https://nodejs.org/) with [npm](https://www.npmjs.com/)

# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [.NET Core SDK 3.0 or later](https://dotnet.microsoft.com/download/dotnet-core)
* [C# for Visual Studio Code version 1.17.1 or later](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [Node.js](https://nodejs.org/) with [npm](https://www.npmjs.com/)

---

## Create the ASP.NET Core web app

# [Visual Studio](#tab/visual-studio)

Configure Visual Studio to look for npm in the *PATH* environment variable. By default, Visual Studio uses the version of npm found in its installation directory. Follow these instructions in Visual Studio:

1. Launch Visual Studio. At the start window, select **Continue without code**.
1. Navigate to **Tools** > **Options** > **Projects and Solutions** > **Web Package Management** > **External Web Tools**.
1. Select the *$(PATH)* entry from the list. Select the up arrow to move the entry to the second position in the list, and select **OK**.

   Visual Studio Configuration.

Visual Studio configuration is complete.

1. Use the **File** > **New** > **Project** menu option and choose the **ASP.NET Core Web Application** template. Select **Next**.
1. Name the project *SignalRWebPac``, and select **Create**.
1. Select *.NET Core* from the target framework drop-down, and select *ASP.NET Core 3.1* from the framework selector drop-down. Select the **Empty** template, and select **Create**.

Add the `Microsoft.TypeScript.MSBuild` package to the project:

1. In **Solution Explorer** (right pane), right-click the project node and select **Manage NuGet Packages**. In the **Browse** tab, search for `Microsoft.TypeScript.MSBuild`, and then click **Install** on the right to install the package.

Visual Studio adds the NuGet package under the **Dependencies** node in **Solution Explorer**, enabling TypeScript compilation in the project.

# [Visual Studio Code](#tab/visual-studio-code)

Run the following command in the **Integrated Terminal**:

```dotnetcli
dotnet new web -o SignalRWebPack
code -r SignalRWebPack
```

* The `dotnet new` command creates an empty ASP.NET Core web app in a `SignalRWebPack` directory.
* The `code` command opens the `SignalRWebPack` folder in the current instance of Visual Studio Code.

Visual Studio Code might display a dialog box that asks: **Do you trust the authors of the files in this folder?**

* If you trust all files in the parent folder, select **Trust the authors of all files in the parent folder**.
* Select **Yes, I trust the authors** since the project folder has files generated by .NET.
* When Visual Studio Code requests that you add assets to build and debug the project, select **Yes**. If Visual Studio Code doesn't offer to add build and debug assets, select **View** > **Command Palette** and type "`.NET`" into the search box. From the list of commands, select the `.NET: Generate Assets for Build and Debug` command.

Visual Studio Code adds a `.vscode` folder with generated `launch.json` and `tasks.json` files.

Run the following .NET CLI command in the **Integrated Terminal**:

```dotnetcli
dotnet add package Microsoft.TypeScript.MSBuild
```

The preceding command adds the [Microsoft.TypeScript.MSBuild](https://www.nuget.org/packages/Microsoft.TypeScript.MSBuild/) package, enabling TypeScript compilation in the project.

---

## Configure Webpack and TypeScript

The following steps configure the conversion of TypeScript to JavaScript and the bundling of client-side resources.

1. Run the following command in the project root to create a `package.json` file:

    ```console
    npm init -y
    ```

1. Add the highlighted property to the `package.json` file and save the file changes:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples_snapshot/3.x/package1.json?highlight=4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    Setting the `private` property to `true` prevents package installation warnings in the next step.

1. Install the required npm packages. Run the following command from the project root:

    ```console
    npm i -D -E clean-webpack-plugin@3.0.0 css-loader@3.4.2 html-webpack-plugin@3.2.0 mini-css-extract-plugin@0.9.0 ts-loader@6.2.1 typescript@3.7.5 webpack@4.41.5 webpack-cli@3.3.10
    ```

    Some command details to note:

    * A version number follows the `@` sign for each package name. npm installs those specific package versions.
    * The `-E` option disables npm's default behavior of writing [semantic versioning](https://semver.org/) range operators to *package`json`. For example, `"webpack": "4.41.5"` is used instead of `"webpack": "^4.41.5"`. This option prevents unintended upgrades to newer package versions.

    See the [npm-install](https://docs.npmjs.com/cli/install) docs for more detail.

1. Replace the `scripts` property of the `package.json` file with the following code:

    ```json
    "scripts": {
      "build": "webpack --mode=development --watch",
      "release": "webpack --mode=production",
      "publish": "npm run release && dotnet publish -c Release"
    },
    ```

    Some explanation of the scripts:

    * `build`: Bundles the client-side resources in development mode and watches for file changes. The file watcher causes the bundle to regenerate each time a project file changes. The `mode` option disables production optimizations, such as tree shaking and minification. Only use `build` in development.
    * `release`: Bundles the client-side resources in production mode.
    * `publish`: Runs the `release` script to bundle the client-side resources in production mode. It calls the .NET CLI's [publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command to publish the app.

1. Create a file named `webpack.config.js`, in the project root, with the following code:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/3.x/webpack.config.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding file configures the Webpack compilation. Some configuration details to note:

    * The `output` property overrides the default value of `dist`. The bundle is instead emitted in the `wwwroot` directory.
    * The `resolve.extensions` array includes `.js` to import the SignalR client JavaScript.

1. Create a new *src* directory in the project root to store the project's client-side assets.

1. Create `src/index.html` with the following markup.

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/3.x/src/index.html](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding HTML defines the homepage's boilerplate markup.

1. Create a new *src/css* directory. Its purpose is to store the project's `.css` files.

1. Create `src/css/main.css` with the following CSS:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/3.x/src/css/main.css](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding `main.css` file styles the app.

1. Create `src/tsconfig.json` with the following JSON:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/3.x/src/tsconfig.json](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding code configures the TypeScript compiler to produce [ECMAScript](https://wikipedia.org/wiki/ECMAScript) 5-compatible JavaScript.

1. Create `src/index.ts` with the following code:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples_snapshot/3.x/index1.ts](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding TypeScript retrieves references to DOM elements and attaches two event handlers:

    * `keyup`: This event fires when the user types in the `tbMessage`textbox. The `send` function is called when the user presses the **Enter** key.
    * `click`: This event fires when the user selects the **Send** button. The `send` function is called.

## Configure the app

1. In `Startup.Configure`, add calls to [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles(Microsoft.AspNetCore.Builder.IApplicationBuilder)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles(Microsoft.AspNetCore.Builder.IApplicationBuilder)) and [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles(Microsoft.AspNetCore.Builder.IApplicationBuilder)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles(Microsoft.AspNetCore.Builder.IApplicationBuilder)).

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/3.x/Startup.cs?name=snippet_UseStaticDefaultFiles\\&highlight=9-10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

   The preceding code allows the server to locate and serve the `index.html` file.  The file is served whether the user enters its full URL or the root URL of the web app.

1. At the end of `Startup.Configure`, map a */hub* route to the `ChatHub` hub. Replace the code that displays *Hello World!* with the following line: 

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/3.x/Startup.cs?name=snippet_UseSignalR\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. In `Startup.ConfigureServices`, call [Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%252A).

   [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/3.x/Startup.cs?name=snippet_AddSignalR](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. Create a new directory named *Hubs* in the project root *SignalRWebPack/* to store the SignalR hub.

1. Create hub `Hubs/ChatHub.cs` with the following code:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples_snapshot/3.x/ChatHub.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. Add the following `using` statement at the top of the `Startup.cs` file to resolve the `ChatHub` reference:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/3.x/Startup.cs?name=snippet_HubsNamespace](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

## Enable client and server communication

The app currently displays a basic form to send messages, but isn't yet functional. The server is listening to a specific route but does nothing with sent messages.

1. Run the following command at the project root:

    ```console
    npm i @microsoft/signalr @types/node
    ```

    The preceding command installs:

     * The [SignalR TypeScript client](https://www.npmjs.com/package/@microsoft/signalr), which allows the client to send messages to the server.
     * The TypeScript type definitions for Node.js, which enables compile-time checking of Node.js types.

1. Add the highlighted code to the `src/index.ts` file:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples_snapshot/3.x/index2.ts?highlight=2,9-23](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding code supports receiving messages from the server. The `HubConnectionBuilder` class creates a new builder for configuring the server connection. The `withUrl` function configures the hub URL.

    SignalR enables the exchange of messages between a client and a server. Each message has a specific name. For example, messages with the name `messageReceived` can run the logic responsible for displaying the new message in the messages zone. Listening to a specific message can be done via the `on` function. Any number of message names can be listened to. It's also possible to pass parameters to the message, such as the author's name and the content of the message received. Once the client receives a message, a new `div` element is created with the author's name and message content appended as child elements using `textContent`. It's added to the main `div` element displaying the messages.

1. Now that the client can receive a message, configure it to send messages. Add the highlighted code to the `src/index.ts` file:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/3.x/src/index.ts?highlight=34-35](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    Sending a message through the WebSockets connection requires calling the `send` method. The method's first parameter is the message name. The message data inhabits the other parameters. In this example, a message identified as `newMessage` is sent to the server. The message consists of the username and the user input from a text box. If the send works, the text box value is cleared.

1. Add the `NewMessage` method to the `ChatHub` class:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/3.x/Hubs/ChatHub.cs?highlight=8-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding code broadcasts received messages to all connected users once the server receives them. It's unnecessary to have a generic `on` method to receive all the messages. A method named after the message name suffices.

    In this example, the TypeScript client sends a message identified as `newMessage`. The C# `NewMessage` method expects the data sent by the client. A call is made to [Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%252A) on [Clients.All](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.IHubClients%25601.All). The received messages are sent to all clients connected to the hub.

## Test the app

Confirm that the app works with the following steps.

# [Visual Studio](#tab/visual-studio)

1. Run Webpack in *release* mode. Using the **Package Manager Console** window, run the following command in the project root. If you aren't in the project root, enter `cd SignalRWebPack` before entering the command.

    ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Select **Debug** > **Start without debugging** to launch the app in a browser without attaching the debugger. The `wwwroot/index.html` file is served at `http://localhost:<port_number>`.

   If you get compile errors, try closing and reopening the solution. 

1. Open another browser instance (any browser). Paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

# [Visual Studio Code](#tab/visual-studio-code)

1. Run Webpack in *release* mode by executing the following command in the project root:

    ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Build and run the app by executing the following command in the project root:

    ```dotnetcli
    dotnet run
    ```

    The web server starts the app and makes it available on localhost.

1. Open a browser to `http://localhost:<port_number>`. The `wwwroot/index.html` file is served. Copy the URL from the address bar.

1. Open another browser instance (any browser). Paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

---

Message displayed in both browser windows

## Additional resources

* [signalr/javascript-client](../signalr/javascript-client.md)
* [signalr/hubs](../signalr/hubs.md)



**Applies to: < aspnetcore-3.0**

This tutorial demonstrates using [Webpack](https://webpack.js.org/) in an ASP.NET Core SignalR web app to bundle and build a client written in [TypeScript](https://www.typescriptlang.org/). Webpack enables developers to bundle and build the client-side resources of a web app.

In this tutorial, you learn how to:

> 
> * Scaffold a starter ASP.NET Core SignalR app
> * Configure the SignalR TypeScript client
> * Configure a build pipeline using Webpack
> * Configure the SignalR server
> * Enable communication between client and server

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/signalr-typescript-webpack/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

## Prerequisites

# [Visual Studio](#tab/visual-studio)

* [Visual Studio 2019](https://visualstudio.microsoft.com/downloads/?utm_medium=microsoft&utm_source=learn.microsoft.com&utm_campaign=inline+link&utm_content=download+vs2019) with the **ASP.NET and web development** workload
* [.NET Core SDK 2.2 or later](https://dotnet.microsoft.com/download/dotnet-core)
* [Node.js](https://nodejs.org/) with [npm](https://www.npmjs.com/)

# [Visual Studio Code](#tab/visual-studio-code)

* [Visual Studio Code](https://code.visualstudio.com/download)
* [.NET Core SDK 2.2 or later](https://dotnet.microsoft.com/download/dotnet-core)
* [C# for Visual Studio Code version 1.17.1 or later](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [Node.js](https://nodejs.org/) with [npm](https://www.npmjs.com/)

---

## Create the ASP.NET Core web app

# [Visual Studio](#tab/visual-studio)

Configure Visual Studio to look for npm in the *PATH* environment variable. By default, Visual Studio uses the version of npm found in its installation directory. Follow these instructions in Visual Studio:

1. Navigate to **Tools** > **Options** > **Projects and Solutions** > **Web Package Management** > **External Web Tools**.
1. Select the *$(PATH)* entry from the list. Select the up arrow to move the entry to the second position in the list.

   Visual Studio Configuration

Visual Studio configuration is completed. It's time to create the project.

1. Use the **File** > **New** > **Project** menu option and choose the **ASP.NET Core Web Application** template.
1. Name the project *SignalRWebPack`, and select **Create**.
1. Select *.NET Core* from the target framework drop-down, and select *ASP.NET Core 2.2* from the framework selector drop-down. Select the **Empty** template, and select **Create**.

# [Visual Studio Code](#tab/visual-studio-code)

Run the following command in the **Integrated Terminal**:

```dotnetcli
dotnet new web -o SignalRWebPack
```

An empty ASP.NET Core web app, targeting .NET Core, is created in a `SignalRWebPack` directory.

---

## Configure Webpack and TypeScript

The following steps configure the conversion of TypeScript to JavaScript and the bundling of client-side resources.

1. Run the following command in the project root to create a `package.json` file:

    ```console
    npm init -y
    ```

1. Add the highlighted property to the `package.json` file:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples_snapshot/2.x/package1.json?highlight=4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    Setting the `private` property to `true` prevents package installation warnings in the next step.

1. Install the required npm packages. Run the following command from the project root:

    ```console
    npm install -D -E clean-webpack-plugin@1.0.1 css-loader@2.1.0 html-webpack-plugin@4.0.0-beta.5 mini-css-extract-plugin@0.5.0 ts-loader@5.3.3 typescript@3.3.3 webpack@4.29.3 webpack-cli@3.2.3
    ```

    Some command details to note:

    * A version number follows the `@` sign for each package name. npm installs those specific package versions.
    * The `-E` option disables npm's default behavior of writing [semantic versioning](https://semver.org/) range operators to *package`json`. For example, `"webpack": "4.29.3"` is used instead of `"webpack": "^4.29.3"`. This option prevents unintended upgrades to newer package versions.

    See the [npm-install](https://docs.npmjs.com/cli/install) docs for more detail.

1. Replace the `scripts` property of the `package.json` file with the following code:

    ```json
    "scripts": {
      "build": "webpack --mode=development --watch",
      "release": "webpack --mode=production",
      "publish": "npm run release && dotnet publish -c Release"
    },
    ```

    Some explanation of the scripts:

    * `build`: Bundles the client-side resources in development mode and watches for file changes. The file watcher causes the bundle to regenerate each time a project file changes. The `mode` option disables production optimizations, such as tree shaking and minification. Only use `build` in development.
    * `release`: Bundles the client-side resources in production mode.
    * `publish`: Runs the `release` script to bundle the client-side resources in production mode. It calls the .NET CLI's [publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) command to publish the app.

1. Create a file named`*webpack.config.js` in the project root, with the following code:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/2.x/webpack.config.js](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding file configures the Webpack compilation. Some configuration details to note:

    * The `output` property overrides the default value of `dist`. The bundle is instead emitted in the `wwwroot` directory.
    * The `resolve.extensions` array includes `.js` to import the SignalR client JavaScript.

1. Create a new *src* directory in the project root to store the project's client-side assets.

1. Create `src/index.html` with the following markup.

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/2.x/src/index.html](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding HTML defines the homepage's boilerplate markup.

1. Create a new *src/css* directory. Its purpose is to store the project's `.css` files.

1. Create `src/css/main.css` with the following markup:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/2.x/src/css/main.css](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding `main.css` file styles the app.

1. Create `src/tsconfig.json` with the following JSON:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/2.x/src/tsconfig.json](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding code configures the TypeScript compiler to produce [ECMAScript](https://wikipedia.org/wiki/ECMAScript) 5-compatible JavaScript.

1. Create `src/index.ts` with the following code:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples_snapshot/2.x/index1.ts](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding TypeScript retrieves references to DOM elements and attaches two event handlers:

    * `keyup`: This event fires when the user types in the `tbMessage` textbox. The `send` function is called when the user presses the **Enter** key.
    * `click`: This event fires when the user selects the **Send** button. The `send` function is called.

## Configure the ASP.NET Core app

1. The code provided in the `Startup.Configure` method displays *Hello World!*. Replace the `app.Run` method call with calls to [Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles(Microsoft.AspNetCore.Builder.IApplicationBuilder)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles(Microsoft.AspNetCore.Builder.IApplicationBuilder)) and [Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles(Microsoft.AspNetCore.Builder.IApplicationBuilder)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles(Microsoft.AspNetCore.Builder.IApplicationBuilder)).

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/2.x/Startup.cs?name=snippet_UseStaticDefaultFiles](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding code allows the server to locate and serve the `index.html` file, whether the user enters its full URL or the root URL of the web app.

1. Call [Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR%252A) in `Startup.ConfigureServices`. It adds the SignalR services to the project.

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/2.x/Startup.cs?name=snippet_AddSignalR](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. Map a */hub* route to the `ChatHub` hub. Add the following lines at the end of `Startup.Configure`:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/2.x/Startup.cs?name=snippet_UseSignalR](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. Create a new directory, called *Hubs*, in the project root. Its purpose is to store the SignalR hub, which is created in the next step.

1. Create hub `Hubs/ChatHub.cs` with the following code:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples_snapshot/2.x/ChatHub.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

1. Add the following code at the top of the `Startup.cs` file to resolve the `ChatHub` reference:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/2.x/Startup.cs?name=snippet_HubsNamespace](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

## Enable client and server communication

The app currently displays a simple form to send messages. Nothing happens when you try to do so. The server is listening to a specific route but does nothing with sent messages.

1. Run the following command at the project root:

    ```console
    npm install @aspnet/signalr
    ```

    The preceding command installs the [SignalR TypeScript client](https://www.npmjs.com/package/@microsoft/signalr), which allows the client to send messages to the server.

1. Add the highlighted code to the `src/index.ts` file:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples_snapshot/2.x/index2.ts?highlight=2,9-23](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding code supports receiving messages from the server. The `HubConnectionBuilder` class creates a new builder for configuring the server connection. The `withUrl` function configures the hub URL.

    SignalR enables the exchange of messages between a client and a server. Each message has a specific name. For example, messages with the name `messageReceived` can run the logic responsible for displaying the new message in the messages zone. Listening to a specific message can be done via the `on` function. You can listen to any number of message names. It's also possible to pass parameters to the message, such as the author's name and the content of the message received. Once the client receives a message, a new `div` element is created with the author's name and message content appended as child elements using `textContent`. The new message is added to the main `div` element displaying the messages.

1. Now that the client can receive a message, configure it to send messages. Add the highlighted code to the `src/index.ts` file:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/2.x/src/index.ts?highlight=34-35](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    Sending a message through the WebSockets connection requires calling the `send` method. The method's first parameter is the message name. The message data inhabits the other parameters. In this example, a message identified as `newMessage` is sent to the server. The message consists of the username and the user input from a text box. If the send works, the text box value is cleared.

1. Add the `NewMessage` method to the `ChatHub` class:

    [Code reference unavailable in this source snapshot: signalr-typescript-webpack/includes/~/tutorials/signalr-typescript-webpack/samples/2.x/Hubs/ChatHub.cs?highlight=8-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/signalr-typescript-webpack.md)

    The preceding code broadcasts received messages to all connected users once the server receives them. It's unnecessary to have a generic `on` method to receive all the messages. A method named after the message name suffices.

    In this example, the TypeScript client sends a message identified as `newMessage`. The C# `NewMessage` method expects the data sent by the client. A call is made to [Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync%252A) on [Clients.All](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.IHubClients%25601.All). The received messages are sent to all clients connected to the hub.

## Test the app

Confirm that the app works with the following steps.

# [Visual Studio](#tab/visual-studio)

1. Run Webpack in *release* mode. Using the **Package Manager Console** window, run the following command in the project root. If you aren't in the project root, enter `cd SignalRWebPack` before entering the command.

    ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Select **Debug** > **Start without debugging** to launch the app in a browser without attaching the debugger. The `wwwroot/index.html` file is served at `http://localhost:<port_number>`.

1. Open another browser instance (any browser). Paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

# [Visual Studio Code](#tab/visual-studio-code)

1. Run Webpack in *release* mode by executing the following command in the project root:

    ```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.


1. Build and run the app by executing the following command in the project root:

    ```dotnetcli
    dotnet run
    ```

    The web server starts the app and makes it available on localhost.

1. Open a browser to `http://localhost:<port_number>`. The `wwwroot/index.html` file is served. Copy the URL from the address bar.

1. Open another browser instance (any browser). Paste the URL in the address bar.

1. Choose either browser, type something in the **Message** text box, and select the **Send** button. The unique user name and message are displayed on both pages instantly.

---

Message displayed in both browser windows

## Additional resources

* [signalr/javascript-client](../signalr/javascript-client.md)
* [signalr/hubs](../signalr/hubs.md)
