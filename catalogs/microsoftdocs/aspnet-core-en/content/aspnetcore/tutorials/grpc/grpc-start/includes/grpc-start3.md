**Applies to: \>= aspnetcore-3.0 < aspnetcore-5.0**

This tutorial shows how to create a .NET Core [gRPC](../../../../grpc/index.md) client and an ASP.NET Core gRPC Server.

At the end, you'll have a gRPC client that communicates with the gRPC Greeter service.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/grpc/grpc-start/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

In this tutorial, you:

> 
> * Create a gRPC Server.
> * Create a gRPC client.
> * Test the gRPC client with the gRPC Greeter service.

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

* [Visual Studio for Mac version 8.7 or later](https://learn.microsoft.com/visualstudio/releasenotes/vs2019-mac-relnotes)
* [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)


---

## Create a gRPC service

# [Visual Studio](#tab/visual-studio)

* Start Visual Studio and select **Create a new project**. Alternatively, from the Visual Studio **File** menu, select **New** > **Project**.
* In the **Create a new project** dialog, select **gRPC Service** and select **Next**:

  Create a new project dialog in Visual Studio

* Name the project **GrpcGreeter**. It's important to name the project *GrpcGreeter* so the namespaces match when you copy and paste code.
* Select **Create**.
* In the **Create a new gRPC service** dialog:
  * The **gRPC Service** template is selected.
  * Select **Create**.

# [Visual Studio Code](#tab/visual-studio-code)

* Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change directories (`cd`) to a folder for the project.
* Run the following commands:

  ```dotnetcli
  dotnet new grpc -o GrpcGreeter
  code -r GrpcGreeter
  ```

  * The `dotnet new` command creates a new gRPC service in the *GrpcGreeter* folder.
  * The `code` command opens the *GrpcGreeter* folder in a new instance of Visual Studio Code.

  A dialog box appears with **Required assets to build and debug are missing from 'GrpcGreeter'. Add them?**
* Select **Yes**.

# [Visual Studio for Mac](#tab/visual-studio-mac)

* Start Visual Studio for Mac and select **Create a new project**. Alternatively, from the Visual Studio **File** menu, select **New** > **Project**.
* In the **Create a new project** dialog, select **Web and Console** > **App** > **gRPC Service** and select **Next**:

  Create a new project dialog on macOS

* Select **.NET Core 3.1** for the target framework and select **Next**.
* Name the project **GrpcGreeter**. It's important to name the project *GrpcGreeter* so the namespaces match when you copy and paste code.
* Select **Create**.
---

### Run the service

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

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../../../../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).


* Press **Ctrl-F5** to run without the debugger.

  Visual Studio Code starts [Kestrel](../../../../fundamentals/servers/kestrel.md), launches a browser, and navigates to `http://localhost:5001`. The address bar shows `localhost:port#` and not something like `example.com`. That's because `localhost` is the standard hostname for  local computer. Localhost only serves web requests from the local computer.

<!-- End of VS tabs -->

---


The logs show the service listening on `https://localhost:5001`.

```console
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: https://localhost:5001
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
```

> **Note:**
> The gRPC template is configured to use [Transport Layer Security (TLS)](https://tools.ietf.org/html/rfc5246). gRPC clients need to use HTTPS to call the server.
>
> macOS doesn't support ASP.NET Core gRPC with TLS. Additional configuration is required to successfully run gRPC services on macOS. For more information, see [Unable to start ASP.NET Core gRPC app on macOS](https://learn.microsoft.com/search/?terms=grpc%2Ftroubleshoot%23unable-to-start-aspnet-core-grpc-app-on-macos).

### Examine the project files

*GrpcGreeter* project files:

* *greet.proto*: The *Protos/greet.proto* file defines the `Greeter` gRPC and is used to generate the gRPC server assets. For more information, see [Introduction to gRPC](../../../../grpc/index.md).
* *Services* folder: Contains the implementation of the `Greeter` service.
* `appsettings.json`: Contains configuration data, such as protocol used by Kestrel. For more information, see [fundamentals/configuration/index](../../../../fundamentals/configuration/index.md).
* `Program.cs`: Contains the entry point for the gRPC service. For more information, see [fundamentals/host/generic-host](../../../../fundamentals/host/generic-host.md).
* `Startup.cs`: Contains code that configures app behavior. For more information, see [App startup](../../../../fundamentals/startup.md).

## Create the gRPC client in a .NET console app

# [Visual Studio](#tab/visual-studio)

* Open a second instance of Visual Studio and select **Create a new project**.
* In the **Create a new project** dialog, select **Console App (.NET Core)** and select **Next**.
* In the **Project name** text box, enter **GrpcGreeterClient** and select **Create**.

# [Visual Studio Code](#tab/visual-studio-code)

* Open the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).
* Change directories (`cd`) to a folder for the project.
* Run the following commands:

  ```dotnetcli
  dotnet new console -o GrpcGreeterClient
  code -r GrpcGreeterClient
  ```

# [Visual Studio for Mac](#tab/visual-studio-mac)

Follow the instructions in [Building a complete .NET Core solution on macOS using Visual Studio for Mac](https://learn.microsoft.com/dotnet/core/tutorials/using-on-mac-vs-full-solution) to create a console app with the name *GrpcGreeterClient*.

---

### Add required packages

The gRPC client project requires the following packages:

* [Grpc.Net.Client](https://www.nuget.org/packages/Grpc.Net.Client), which contains the .NET Core client.
* [Google.Protobuf](https://www.nuget.org/packages/Google.Protobuf/), which contains protobuf message APIs for C#.
* [Grpc.Tools](https://www.nuget.org/packages/Grpc.Tools/), which contains C# tooling support for protobuf files. The tooling package isn't required at runtime, so the dependency is marked with `PrivateAssets="All"`.

# [Visual Studio](#tab/visual-studio)

Install the packages using either the Package Manager Console (PMC) or Manage NuGet Packages.

#### PMC option to install packages

* From Visual Studio, select **Tools** > **NuGet Package Manager** > **Package Manager Console**
* From the **Package Manager Console** window, run `cd GrpcGreeterClient` to change directories to the folder containing the `GrpcGreeterClient.csproj` files.
* Run the following commands:

  ```powershell
  Install-Package Grpc.Net.Client
  Install-Package Google.Protobuf
  Install-Package Grpc.Tools
  ```

#### Manage NuGet Packages option to install packages

* Right-click the project in **Solution Explorer** > **Manage NuGet Packages**.
* Select the **Browse** tab.
* Enter **Grpc.Net.Client** in the search box.
* Select the **Grpc.Net.Client** package from the **Browse** tab and select **Install**.
* Repeat for `Google.Protobuf` and `Grpc.Tools`.

# [Visual Studio Code](#tab/visual-studio-code)

Run the following commands from the **Integrated Terminal**:

```dotnetcli
dotnet add GrpcGreeterClient.csproj package Grpc.Net.Client
dotnet add GrpcGreeterClient.csproj package Google.Protobuf
dotnet add GrpcGreeterClient.csproj package Grpc.Tools
```

# [Visual Studio for Mac](#tab/visual-studio-mac)

* Right-click **GrpcGreeterClient** project in the **Solution Pad** and select **Manage NuGet Packages**.
* Enter **Grpc.Net.Client** in the search box.
* Select the **Grpc.Net.Client** package from the results pane and select **Add Package**.
* Select the **Accept** button on the **Accept License** dialog.
* Repeat for `Google.Protobuf` and `Grpc.Tools`.

---

### Add greet.proto

* Create a *Protos* folder in the gRPC client project.
* Copy the *Protos\greet.proto* file from the gRPC Greeter service to the *Protos* folder in the gRPC client project.
* Update the namespace inside the `greet.proto` file to the project's namespace:

  ```json
  option csharp_namespace = "GrpcGreeterClient";
  ```

* Edit the `GrpcGreeterClient.csproj` project file:

  # [Visual Studio](#tab/visual-studio)

  Right-click the project and select **Edit Project File**.

  # [Visual Studio Code](#tab/visual-studio-code)

  Select the `GrpcGreeterClient.csproj` file.

  # [Visual Studio for Mac](#tab/visual-studio-mac)

  Right-click the project and select **Edit Project File**.

  ---

* Add an item group with a `<Protobuf>` element that refers to the *greet.proto* file:

  ```xml
  <ItemGroup>
    <Protobuf Include="Protos\greet.proto" GrpcServices="Client" />
  </ItemGroup>
  ```

### Create the Greeter client

* Build the client project to create the types in the `GrpcGreeterClient` namespace.

> **Note:**
> The `GrpcGreeterClient` types are generated automatically by the build process. The tooling package [Grpc.Tools](https://www.nuget.org/packages/Grpc.Tools/) generates the following files based on the *greet.proto* file:
>
> * `GrpcGreeterClient\obj\Debug\[TARGET_FRAMEWORK]\Protos\Greet.cs`: The protocol buffer code which populates, serializes and retrieves the request and response message types.
> * `GrpcGreeterClient\obj\Debug\[TARGET_FRAMEWORK]\Protos\GreetGrpc.cs`: Contains the generated client classes.
>
> For more information on the C# assets automatically generated by [Grpc.Tools](https://www.nuget.org/packages/Grpc.Tools/), see [gRPC services with C#: Generated C# assets](https://learn.microsoft.com/search/?terms=grpc%2Fbasics%23generated-c-assets).

Update the gRPC client `Program.cs` file with the following code:

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeterClient/Program.cs?name=snippet2)](../../../../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeterClient/Program.cs.md)

`Program.cs` contains the entry point and logic for the gRPC client.

The Greeter client is created by:

* Instantiating a `GrpcChannel` containing the information for creating the connection to the gRPC service.
* Using the `GrpcChannel` to construct the Greeter client:

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeterClient/Program.cs?name=snippet\&highlight=3-5)](../../../../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeterClient/Program.cs.md)

The Greeter client calls the asynchronous `SayHello` method. The result of the `SayHello` call is displayed:

[Code example (complete source file; reference: \~/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeterClient/Program.cs?name=snippet\&highlight=6-8)](../../../../../_code/aspnetcore/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeterClient/Program.cs.md)

## Test the gRPC client with the gRPC Greeter service

# [Visual Studio](#tab/visual-studio)

* In the Greeter service, press `Ctrl+F5` to start the server without the debugger.
* In the `GrpcGreeterClient` project, press `Ctrl+F5` to start the client without the debugger.

# [Visual Studio Code](#tab/visual-studio-code)

* Start the Greeter service.
* Start the client.

# [Visual Studio for Mac](#tab/visual-studio-mac)

* Due to the previously mentioned [HTTP/2 TLS issue on macOS workaround](https://learn.microsoft.com/search/?terms=grpc%2Ftroubleshoot%23unable-to-start-aspnet-core-grpc-app-on-macos), you'll need to update the channel address in the client to "http://localhost:5000". Update line 13 of *`GrpcGreeterClient/Program.cs`* to read:

  ```csharp
  using var channel = GrpcChannel.ForAddress("http://localhost:5000");
  ```

* Start the Greeter service.
* Start the client.

---

The client sends a greeting to the service with a message containing its name, *GreeterClient*. The service sends the message "Hello GreeterClient" as a response. The "Hello GreeterClient" response is displayed in the command prompt:

```console
Greeting: Hello GreeterClient
Press any key to exit...
```

The gRPC service records the details of the successful call in the logs written to the command prompt:

```console
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: https://localhost:5001
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: C:\GH\aspnet\docs\4\Docs\aspnetcore\tutorials\grpc\grpc-start\sample\GrpcGreeter
info: Microsoft.AspNetCore.Hosting.Diagnostics[1]
      Request starting HTTP/2 POST https://localhost:5001/Greet.Greeter/SayHello application/grpc
info: Microsoft.AspNetCore.Routing.EndpointMiddleware[0]
      Executing endpoint 'gRPC - /Greet.Greeter/SayHello'
info: Microsoft.AspNetCore.Routing.EndpointMiddleware[1]
      Executed endpoint 'gRPC - /Greet.Greeter/SayHello'
info: Microsoft.AspNetCore.Hosting.Diagnostics[2]
      Request finished in 78.32260000000001ms 200 application/grpc
```

> **Note:**
> The code in this article requires the ASP.NET Core HTTPS development certificate to secure the gRPC service. If the .NET gRPC client fails with the message `The remote certificate is invalid according to the validation procedure.` or `The SSL connection could not be established.`, the development certificate isn't trusted. To fix this issue, see [Call a gRPC service with an untrusted/invalid certificate](https://learn.microsoft.com/search/?terms=grpc%2Ftroubleshoot%23call-a-grpc-service-with-an-untrustedinvalid-certificate).

### Next steps

* [grpc/index](../../../../grpc/index.md)
* [grpc/basics](../../../../grpc/basics.md)
* [grpc/migration](../../../../grpc/migration.md)
