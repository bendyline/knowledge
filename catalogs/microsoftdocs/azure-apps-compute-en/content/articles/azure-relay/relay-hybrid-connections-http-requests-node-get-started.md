---
title: Azure Relay Hybrid Connections - HTTP requests in Node.js
description: Write a Node.js console application for Azure Relay Hybrid Connections HTTP requests.
ms.topic: tutorial
ms.date: 01/24/2026
ms.custom: devx-track-js, mode-ui, mode-api
---

# Get started with Relay Hybrid Connections HTTP requests in Node.js

> 
> * [NET](relay-hybrid-connections-dotnet-get-started.md)
> * [Node.js](relay-hybrid-connections-node-get-started.md)
> 
>

In this quickstart, you create Node.js sender and receiver applications that send and receive messages by using the HTTP protocol. The applications use Hybrid Connections feature of Azure Relay. To learn about Azure Relay in general, see [Azure Relay](relay-what-is-it.md). 

In this quickstart, you take the following steps:

1. Create a Relay namespace by using the Azure portal.
2. Create a hybrid connection in that namespace by using the Azure portal.
3. Write a server (listener) console application to receive messages.
4. Write a client (sender) console application to send messages.
5. Run applications.

## Prerequisites
- [Node.js](https://nodejs.org/en/).
- An Azure subscription. If you don't have one, [create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Create a namespace using the Azure portal
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


## Create a hybrid connection using the Azure portal
On the **Relay** page for your namespace, follow these steps to create a hybrid connection.

1. On the left menu, Under **Entities**, select **Hybrid Connections**, and then select **+ Hybrid Connection**.

    Screenshot showing the Hybrid Connections page.
2. On the **Create Hybrid Connection** page, enter a name for the hybrid connection, and select **Create**. 
   
    Screenshot showing the Create Hybrid Connection page.




## Create a server application (listener)
To listen and receive messages from the Relay, write a Node.js console application.


### Create a Node.js application

Create a new JavaScript file called `listener.js`.

### Add the Relay package

Run `npm install hyco-https` from a Node command prompt in your project folder.

### Write some code to handle requests

1. Add the following constant to the top of the `listener.js` file.

    ```js
    const https = require('hyco-https');
    ```
2. Add the following constants to the `listener.js` file for the hybrid
   connection details. Replace the placeholders in brackets with the values you
   obtained when you created the hybrid connection.

   - `const ns` - The Relay namespace. Be sure to use the fully qualified namespace name; for example, `{namespace}.servicebus.windows.net`.
   - `const path` - The name of the hybrid connection.
   - `const keyrule` - Name of your Shared Access Policies key, which is `RootManageSharedAccessKey` by default.
   - `const key` -   The primary key of the namespace you saved earlier.

3. Add the following code to the `listener.js` file. :

    You notice that the code isn't much different from any simple HTTP server
    example you can find in Node.js beginner tutorials, which the exception of
    using the `createRelayedServer` instead of the typical `createServer`
    function.

    ```js
    var uri = https.createRelayListenUri(ns, path);
    var server = https.createRelayedServer(
        {
            server : uri,
            token : () => https.createRelayToken(uri, keyrule, key)
        },
        (req, res) => {
            console.log('request accepted: ' + req.method + ' on ' + req.url);
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><head><title>Hey!</title></head><body>Relayed Node.js Server!</body></html>');
        });

    server.listen( (err) => {
            if (err) {
              return console.log('something bad happened', err)
            }
            console.log(`server is listening on ${port}`)
          });

    server.on('error', (err) => {
        console.log('error: ' + err);
    });
    ```
    Here's what your listener.js file should look like:
   
    ```js
    const https = require('hyco-https');
   
    const ns = "{RelayNamespace}";
    const path = "{HybridConnectionName}";
    const keyrule = "{SASKeyName}";
    const key = "{SASKeyValue}";
   
    var uri = https.createRelayListenUri(ns, path);
    var server = https.createRelayedServer(
        {
            server : uri,
            token : () => https.createRelayToken(uri, keyrule, key)
        },
        (req, res) => {
            console.log('request accepted: ' + req.method + ' on ' + req.url);
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><head><title>Hey!</title></head><body>Relayed Node.js Server!</body></html>');
        });

    server.listen( (err) => {
            if (err) {
              return console.log('something bad happened', err)
            }
            console.log(`server is listening on ${port}`)
          });

    server.on('error', (err) => {
        console.log('error: ' + err);
    });
    ```



## Create a client application (sender)

To send messages to the Relay, you can use any HTTP client, or write a Node.js console application.


### Create a Node.js application

If you have disabled the "Requires Client Authorization" option when creating the Relay,
you can send requests to the Hybrid Connections URL with any browser. For accessing
protected endpoints, you need to create and pass a token in the `ServiceBusAuthorization`
header, which is shown here.

To start, create a new JavaScript file called `sender.js`.

### Add the Relay Node Package Manager package

Run `npm install hyco-https` from a Node command prompt in your project folder. This package
also imports the regular `https` package. For the client-side, the key difference is that
the package provides functions to construct Relay URIs and tokens.

### Write some code to send messages

1. Add the following `constants` to the top of the `sender.js` file.
   
    ```js
    const https = require('hyco-https');
    ```

2. Add the following constants to the `sender.js` file for the hybrid connection details. Replace the placeholders in brackets with the values you obtained when you created the hybrid connection.
   
   - `const ns` - The Relay namespace. Be sure to use the fully qualified namespace name; for example, `{namespace}.servicebus.windows.net`.
   - `const path` - The name of the hybrid connection.
   - `const keyrule` - Name of your Shared Access Policies key, which is `RootManageSharedAccessKey` by default.
   - `const key` -   The primary key of the namespace you saved earlier.

3. Add the following code to the `sender.js` file. You notice that the
   code doesn't differ significantly from the regular use of the Node.js
   HTTPS client; it just adds the authorization header.
   
   ```js
   https.get({
        hostname : ns,
        path : (!path || path.length == 0 || path[0] !== '/'?'/':'') + path,
        port : 443,
        headers : {
            'ServiceBusAuthorization' : 
                https.createRelayToken(https.createRelayHttpsUri(ns, path), keyrule, key)
        }
   }, (res) => {
        let error;
        if (res.statusCode !== 200) {
            console.error(`Request Failed.\n Status Code: ${res.statusCode}`);
            res.resume();
        } 
        else {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        };
   }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
   });
   ```
    Here's what your sender.js file should look like:
   
    ```js
    const https = require('hyco-https');
       
    const ns = "{RelayNamespace}";
    const path = "{HybridConnectionName}";
    const keyrule = "{SASKeyName}";
    const key = "{SASKeyValue}";
   
    https.get({
        hostname : ns,
        path : (!path || path.length == 0 || path[0] !== '/'?'/':'') + path,
        port : 443,
        headers : {
            'ServiceBusAuthorization' : 
                https.createRelayToken(https.createRelayHttpsUri(ns, path), keyrule, key)
        }
    }, (res) => {
        let error;
        if (res.statusCode !== 200) {
            console.error(`Request Failed.\n Status Code: ${res.statusCode}`);
            res.resume();
        } 
        else {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        };
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
    ```


> **Note:**
> The sample code in this article uses a connection string to authenticate to an Azure Relay namespace to keep the tutorial simple. We recommend that you use Microsoft Entra ID authentication in production environments, rather than using connection strings or shared access signatures, which can be more easily compromised. For detailed information and sample code for using the Microsoft Entra ID authentication, see [Authenticate and authorize an application with Microsoft Entra ID to access Azure Relay entities](authenticate-application.md) and [Authenticate a managed identity with Microsoft Entra ID to access Azure Relay resources](authenticate-managed-identity.md).


## Run the applications

1. Run the server application: from a Node.js command prompt type `node listener.js`.
2. Run the client application: from a Node.js command prompt type `node sender.js`, and enter some text.
3. Ensure that the server application console outputs the text that was entered in the client application.

Congratulations, you have created an end-to-end Hybrid Connections application using Node.js!

## Next steps
In this quickstart, you created Node.js client and server applications that used HTTP to send and receive messages. The Hybrid Connections feature of Azure Relay also supports using WebSockets to send and receive messages. To learn how to use WebSockets with Azure Relay Hybrid Connections, see the [WebSockets quickstart](relay-hybrid-connections-node-get-started.md).

In this quickstart, you used Node.js to create client and server applications. To learn how to write client and server applications using .NET Framework, see the [.NET WebSockets quickstart](relay-hybrid-connections-dotnet-get-started.md) or the [.NET HTTP quickstart](relay-hybrid-connections-http-requests-dotnet-get-started.md).
