---
title: Hybrid Connections - HTTP requests in .NET
description: Provides step-by-step instructions to create a C# console application for Azure Relay Hybrid Connections HTTP requests in .NET.
ms.topic: tutorial
ms.custom: devx-track-csharp, mode-ui, mode-api, devx-track-dotnet
ms.date: 01/24/2026
# Customer intent: I want to learn how to create a .NET app to send and receive messages by using the HTTP protocol. 
---

# Tutorial: Get started with Relay Hybrid Connections HTTP requests in .NET
> 
> * [NET](relay-hybrid-connections-dotnet-get-started.md)
> * [Node.js](relay-hybrid-connections-node-get-started.md)
> 
>

In this quickstart, you create .NET sender and receiver applications that send and receive messages by using the HTTP protocol. The applications use Hybrid Connections feature of Azure Relay. To learn about Azure Relay in general, see [Azure Relay](relay-what-is-it.md). 

In this quickstart, you take the following steps:

1. Create a Relay namespace by using the Azure portal.
2. Create a hybrid connection in that namespace by using the Azure portal.
3. Write a server (listener) console application to receive messages.
4. Write a client (sender) console application to send messages.
5. Run applications. 

## Prerequisites

To complete this tutorial, you need the following prerequisites:

* [Visual Studio 2019 or later](https://www.visualstudio.com). The examples in this tutorial use Visual Studio 2022.
* An Azure subscription. If you don't have one, [create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Create a namespace
1. Sign in to the [Azure portal].
1. Select **All services** on the left menu. Select **Integration**, search for **Relays**, move the mouse over **Relays**, and then select **Create**. 

    Screenshot showing the selection of Relays -> Create button.
1. On the **Create namespace** page, follow these steps: 
    1. Choose an Azure subscription in which to create the namespace.
    1. For [Resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-portal.md), choose an existing resource group in which to place the namespace, or create a new one.  
    1. Enter a name for the Relay namespace. 
    1. Select the region in which your namespace should be hosted.
    1. Select **Review + create** at the bottom of the page.

        Screenshot showing the Create namespace page.
    1. On the **Review + create** page, select **Create**. 
    1. After a few minutes, you see the **Relay** page for the namespace. 

        Screenshot showing the home page for Relay namespace.

### Get management credentials

1. On the **Relay** page, select **Shared access policies** on the left menu.
1. On the **Shared access policies** page, select **RootManageSharedAccessKey**.
1. Under **SAS Policy: RootManageSharedAccessKey**, select the **Copy** button next to **Primary Connection String**. This action copies the connection string to your clipboard for later use. Paste this value into Notepad or some other temporary location.
1. Repeat the preceding step to copy and paste the value of **Primary key** to a temporary location for later use.  

    Screenshot showing the connection info for Relay namespace.

<!--Image references-->

[connection-info]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-relay/includes/media/relay-create-namespace-portal/connection-info.png
[Azure portal]: https://portal.azure.com


## Create a hybrid connection
On the **Relay** page for your namespace, follow these steps to create a hybrid connection.

1. On the left menu, Under **Entities**, select **Hybrid Connections**, and then select **+ Hybrid Connection**.

    Screenshot showing the Hybrid Connections page.
2. On the **Create Hybrid Connection** page, enter a name for the hybrid connection, and select **Create**. 
   
    Screenshot showing the Create Hybrid Connection page.




## Create a server application (listener)
In Visual Studio, write a C# console application to listen for and receive messages from the relay.


### Create a console application

In Visual Studio, create a new **Console App (.NET Framework)** project.

### Add the Relay NuGet package

1. Right-click the newly created project, and then select **Manage NuGet Packages**.
2. Select **Browse**, and then search for **Microsoft.Azure.Relay**. In the search results, select  **Microsoft Azure Relay**.
3. Select **Install** to complete the installation. Close the dialog box.

### Write code to receive messages

1. At the top of the Program.cs file, replace the existing `using` statements with the following `using` statements:
   
    ```csharp
    using System;
    using System.IO;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Azure.Relay;
    using System.Net;
    ```
2. Add constants to the `Program` class for the hybrid connection details. Replace the placeholders in brackets with the values that you obtained when you created the hybrid connection. Be sure to use the fully qualified namespace name.
   
    ```csharp
    // replace {RelayNamespace} with the name of your namespace
    private const string RelayNamespace = "{RelayNamespace}.servicebus.windows.net";

    // replace {HybridConnectionName} with the name of your hybrid connection
    private const string ConnectionName = "{HybridConnectionName}";

    // replace {SAKKeyName} with the name of your Shared Access Policies key, which is RootManageSharedAccessKey by default
    private const string KeyName = "{SASKeyName}";

    // replace {SASKey} with the primary key of the namespace you saved earlier
    private const string Key = "{SASKey}";
    ```

3. Add the `RunAsync` method to the `Program` class:
   
    ```csharp
    private static async Task RunAsync()
    {
        var cts = new CancellationTokenSource();
   
        var tokenProvider = TokenProvider.CreateSharedAccessSignatureTokenProvider(KeyName, Key);
        var listener = new HybridConnectionListener(new Uri(string.Format("sb://{0}/{1}", RelayNamespace, ConnectionName)), tokenProvider);
   
        // Subscribe to the status events.
        listener.Connecting += (o, e) => { Console.WriteLine("Connecting"); };
        listener.Offline += (o, e) => { Console.WriteLine("Offline"); };
        listener.Online += (o, e) => { Console.WriteLine("Online"); };

        // Provide an HTTP request handler
        listener.RequestHandler = (context) =>
        {
            // Do something with context.Request.Url, HttpMethod, Headers, InputStream...
            context.Response.StatusCode = HttpStatusCode.OK;
            context.Response.StatusDescription = "OK, This is pretty neat";
            using (var sw = new StreamWriter(context.Response.OutputStream))
            {
                sw.WriteLine("hello!");
            }
            
            // The context MUST be closed here
            context.Response.Close();
        };
            
        // Opening the listener establishes the control channel to
        // the Azure Relay service. The control channel is continuously 
        // maintained, and is reestablished when connectivity is disrupted.
        await listener.OpenAsync();
        Console.WriteLine("Server listening");
    
        // Start a new thread that will continuously read the console.
        await Console.In.ReadLineAsync();
        
        // Close the listener after you exit the processing loop.
        await listener.CloseAsync();
    }
    ```
5. Add the following line of code to the `Main` method in the `Program` class:
   
    ```csharp
    RunAsync().GetAwaiter().GetResult();
    ```
   
    The completed Program.cs file should look like this:
   
    ```csharp
    namespace Server
    {
        using System;
        using System.IO;
        using System.Threading;
        using System.Threading.Tasks;
        using Microsoft.Azure.Relay;
        using System.Net;
   
        public class Program
        {
            private const string RelayNamespace = "{RelayNamespace}.servicebus.windows.net";
            private const string ConnectionName = "{HybridConnectionName}";
            private const string KeyName = "{SASKeyName}";
            private const string Key = "{SASKey}";
   
            public static void Main(string[] args)
            {
                RunAsync().GetAwaiter().GetResult();
            }
   
            private static async Task RunAsync()
            {
                var tokenProvider = TokenProvider.CreateSharedAccessSignatureTokenProvider(KeyName, Key);
                var listener = new HybridConnectionListener(new Uri(string.Format("sb://{0}/{1}", RelayNamespace, ConnectionName)), tokenProvider);
           
                // Subscribe to the status events.
                listener.Connecting += (o, e) => { Console.WriteLine("Connecting"); };
                listener.Offline += (o, e) => { Console.WriteLine("Offline"); };
                listener.Online += (o, e) => { Console.WriteLine("Online"); };
        
                // Provide an HTTP request handler
                listener.RequestHandler = (context) =>
                {
                    // Do something with context.Request.Url, HttpMethod, Headers, InputStream...
                    context.Response.StatusCode = HttpStatusCode.OK;
                    context.Response.StatusDescription = "OK";
                    using (var sw = new StreamWriter(context.Response.OutputStream))
                    {
                        sw.WriteLine("hello!");
                    }
                    
                    // The context MUST be closed here
                    context.Response.Close();
                };
           
                // Opening the listener establishes the control channel to
                // the Azure Relay service. The control channel is continuously 
                // maintained, and is reestablished when connectivity is disrupted.
                await listener.OpenAsync();
                Console.WriteLine("Server listening");
           
                // Start a new thread that will continuously read the console.
                await Console.In.ReadLineAsync();
               
                // Close the listener after you exit the processing loop.
                await listener.CloseAsync();
            }
        }
    }
    ```


## Create a client application (sender)
In Visual Studio, write a C# console application to send messages to the relay.



### Create a console application

If you disabled the "Requires Client Authorization" option when creating the Relay,
you can send requests to the Hybrid Connections URL with any browser. For accessing
protected endpoints, you need to create and pass a token in the `ServiceBusAuthorization`
header, which is shown here.

In Visual Studio, create a new **Console App (.NET Framework)** project.

### Add the Relay NuGet package

1. Right-click the newly created project, and then select **Manage NuGet Packages**.
2. Select **Include prerelease** option. 
3. Select **Browse**, and then search for **Microsoft.Azure.Relay**. In the search results, select  **Microsoft Azure Relay**.
5. Select **Install** to complete the installation. Close the dialog box.

### Write code to send requests

1. At the top of the Program.cs file, replace the existing `using` statements with the following `using` statements:
   
    ```csharp
    using System;
    using System.IO;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Net.Http;
    using Microsoft.Azure.Relay;
    ```
2. Add constants to the `Program` class for the hybrid connection details. Replace the placeholders in brackets with the values that you obtained when you created the hybrid connection. Be sure to use the fully qualified namespace name.
   
    ```csharp
    // replace {RelayNamespace} with the name of your namespace
    private const string RelayNamespace = "{RelayNamespace}.servicebus.windows.net";

    // replace {HybridConnectionName} with the name of your hybrid connection
    private const string ConnectionName = "{HybridConnectionName}";

    // replace {SAKKeyName} with the name of your Shared Access Policies key, which is RootManageSharedAccessKey by default
    private const string KeyName = "{SASKeyName}";

    // replace {SASKey} with the primary key of the namespace you saved earlier
    private const string Key = "{SASKey}";
    ```
3. Add the following method to the `Program` class:
   
    ```csharp
    private static async Task RunAsync()
    {
        var tokenProvider = TokenProvider.CreateSharedAccessSignatureTokenProvider(
                KeyName, Key);
        var uri = new Uri(string.Format("https://{0}/{1}", RelayNamespace, ConnectionName));
        var token = (await tokenProvider.GetTokenAsync(uri.AbsoluteUri, TimeSpan.FromHours(1))).TokenString;
        var client = new HttpClient();
        var request = new HttpRequestMessage()
        {
            RequestUri = uri,
            Method = HttpMethod.Get,
        };
        request.Headers.Add("ServiceBusAuthorization", token);
        var response = await client.SendAsync(request);
        Console.WriteLine(await response.Content.ReadAsStringAsync());        Console.ReadLine();
    }
    ```
4. Add the following line of code to the `Main` method in the `Program` class.
   
    ```csharp
    RunAsync().GetAwaiter().GetResult();
    ```
   
    The Program.cs should look like this:
   
    ```csharp
    using System;
    using System.IO;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Net.Http;
    using Microsoft.Azure.Relay;
   
    namespace Client
    {
        class Program
        {
            private const string RelayNamespace = "{RelayNamespace}.servicebus.windows.net";
            private const string ConnectionName = "{HybridConnectionName}";
            private const string KeyName = "{SASKeyName}";
            private const string Key = "{SASKey}";
   
            static void Main(string[] args)
            {
                RunAsync().GetAwaiter().GetResult();
            }
   
            private static async Task RunAsync()
            {
               var tokenProvider = TokenProvider.CreateSharedAccessSignatureTokenProvider(
                KeyName, Key);
                var uri = new Uri(string.Format("https://{0}/{1}", RelayNamespace, ConnectionName));
                var token = (await tokenProvider.GetTokenAsync(uri.AbsoluteUri, TimeSpan.FromHours(1))).TokenString;
                var client = new HttpClient();
                var request = new HttpRequestMessage()
                {
                    RequestUri = uri,
                    Method = HttpMethod.Get,
                };
                request.Headers.Add("ServiceBusAuthorization", token);
                var response = await client.SendAsync(request);
                Console.WriteLine(await response.Content.ReadAsStringAsync());
            }
        }
    }
    ```

> **Note:**
> The sample code in this article uses a connection string to authenticate to an Azure Relay namespace to keep the tutorial simple. We recommend that you use Microsoft Entra ID authentication in production environments, rather than using connection strings or shared access signatures, which can be more easily compromised. For detailed information and sample code for using the Microsoft Entra ID authentication, see [Authenticate and authorize an application with Microsoft Entra ID to access Azure Relay entities](authenticate-application.md) and [Authenticate a managed identity with Microsoft Entra ID to access Azure Relay resources](authenticate-managed-identity.md).


## Run the applications
1. Run the server application. You see the following text in the console window:

    ```
    Online
    Server listening
    ```
1. Run the client application. You see `hello!` in the client window. The client sent an HTTP request to the server, and server responded with a `hello!`. 
3. Now, to close the console windows, press **ENTER** in both the console windows. 


## Related content

In this quickstart, you created .NET client and server applications that used HTTP to send and receive messages. The Hybrid Connections feature of Azure Relay also supports using WebSockets to send and receive messages. To learn how to use WebSockets with Azure Relay Hybrid Connections, see the [WebSockets quickstart](relay-hybrid-connections-dotnet-get-started.md).

In this quickstart, you used .NET Framework to create client and server applications. To learn how to write client and server applications using Node.js, see the [Node.js WebSockets quickstart](relay-hybrid-connections-node-get-started.md) or the [Node.js HTTP quickstart](relay-hybrid-connections-http-requests-dotnet-get-started.md).
