---
title: Azure Relay Hybrid Connections - HTTP requests in Java
description: Write a Java console application for Azure Relay Hybrid Connections HTTP requests.
ms.topic: tutorial
ms.date: 01/24/2026
ms.custom: devx-track-java, mode-ui, mode-api, devx-track-extended-java
---

# Get started with Relay Hybrid Connections HTTP requests in Java

> 
> * [NET](relay-hybrid-connections-dotnet-get-started.md)
> * [Node.js](relay-hybrid-connections-node-get-started.md)
> 
>

In this quickstart, you create Java sender and receiver applications that send and receive messages by using the HTTP protocol. The applications use Hybrid Connections feature of Azure Relay. To learn about Azure Relay in general, see [Azure Relay](relay-what-is-it.md). 

In this quickstart, you take the following steps:

1. Create a Relay namespace by using the Azure portal.
2. Create a hybrid connection in that namespace by using the Azure portal.
3. Write a server (listener) console application to receive messages.
4. Write a client (sender) console application to send messages.
5. Run applications.

## Prerequisites
- [Java](https://www.java.com/en/). Ensure that you're running JDK 1.8+
- [Maven](https://maven.apache.org/install.html). Ensure that you have Maven installed
- [Azure Relay SDK](https://github.com/Azure/azure-relay-java). Review Java SDK
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
To listen and receive messages from the Relay, write a Java console application.


### Create a Java application

If you disabled the "Requires Client Authorization" option when creating the Relay,
you can send requests to the Hybrid Connections URL with any browser. For accessing
protected endpoints, you need to create and pass a token in the `ServiceBusAuthorization`
header, which is shown here.

Here's a simple Maven project structure and a Java class that demonstrates sending requests to 
a Hybrid Connections URL with client authorization utilizing the Azure Relay library. 

### Add the Relay package

Modify your pom.xml file in your maven application package to include the Azure Relay package.

```xml
<dependency>
    <groupId>com.microsoft.azure</groupId>
    <artifactId>azure-relay</artifactId>
    <version>0.0.6</version>
</dependency>
```

Run `mvn dependency:copy-dependencies -DoutputDirectory=lib` in your mvn project to add the dependency jar file in the lib directory of your project. It imports all dependencies of the `azure-relay` mvn package. This package provides functions to construct Relay uniform resource identifiers (URIs) and tokens.

### Write some code to send messages

1. Add the dependency jar files to the ClassPath of your `Listener.java` file.

    ```bash
    javac -cp lib/* src/main/java/com/example/listener/Listener.Java
    ```

2. Import the dependencies into your `Listener.java` class.

    ```java
    import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.net.URI;
    import java.net.URISyntaxException;
    import java.util.Scanner;
    import com.microsoft.azure.relay.HybridConnectionListener;
    import com.microsoft.azure.relay.RelayConnectionStringBuilder;
    import com.microsoft.azure.relay.RelayedHttpListenerResponse;
    import com.microsoft.azure.relay.TokenProvider;
    ```

3. Add the following `constants` to the top of the `Listener.java` file to a `createConnectionString` java function for the hybrid connection details.

    ```java
    public static String createConnectionString(){
        StringBuilder connectionString = new StringBuilder();
        connectionString.append("Endpoint=sb://");
        connectionString.append("{namespace}");
        connectionString.append(".servicebus.windows.net/;SharedAccessKeyName=");
        connectionString.append("{keyrule}");
        connectionString.append(";SharedAccessKey=");
        connectionString.append("{key}");
        connectionString.append(";EntityPath=");
        connectionString.append("{path}");
        return connectionString.toString();
    }
    ```

    Replace the placeholders in brackets with the values you obtained when you created the hybrid connection.

    - `namespace` - The Relay namespace. Be sure to use the fully qualified namespace name; for example, `{namespace}.servicebus.windows.net`.
    - `path` - The name of the hybrid connection.
    - `keyrule` - Name of your Shared Access Policies key, which is `RootManageSharedAccessKey` by default.
    - `nst key` -   The primary key of the namespace you saved earlier.

4. Add the following code to the `Listener.java` file. The main function should look like the following code:

    ```java
    public static void main( String[] args ) throws URISyntaxException
    {
        String CONNECTION_STRING_ENV_VARIABLE_NAME = createConnectionString();
        RelayConnectionStringBuilder connectionParams = new RelayConnectionStringBuilder(CONNECTION_STRING_ENV_VARIABLE_NAME);
        TokenProvider tokenProvider = TokenProvider.createSharedAccessSignatureTokenProvider(
                    connectionParams.getSharedAccessKeyName(),
                    connectionParams.getSharedAccessKey());
        HybridConnectionListener listener = new HybridConnectionListener(new URI(connectionParams.getEndpoint().toString() + connectionParams.getEntityPath()), tokenProvider);

        // The "context" object encapsulates both the incoming request and the outgoing response
        listener.setRequestHandler((context) -> {
            String receivedText = "";
            if (context.getRequest().getInputStream() != null) {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(context.getRequest().getInputStream(), "UTF8"))) {
                    StringBuilder builder = new StringBuilder();
                    String inputLine;
                    while ((inputLine = reader.readLine()) != null) {
                        builder.append(inputLine);
                    }
                    receivedText = builder.toString();
                } catch (IOException e) {
                    System.out.println(e.getMessage());
                }
            }
            System.out.println("requestHandler received " + receivedText);

            RelayedHttpListenerResponse response = context.getResponse();
            response.setStatusCode(202);
            response.setStatusDescription("OK");

            try {
                response.getOutputStream().write(("Echo: " + receivedText).getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }

            // The context MUST be closed for the message to be sent
            response.close();
        });

        listener.openAsync().join();

        Scanner in = new Scanner(System.in);
        System.out.println("Press ENTER to terminate this program.");
        in.nextLine();

        listener.close();
        in.close();
    }

    ```
    Here's what your `Listener.java` file should look like:

    ```java
    package com.example.listener;
    import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.net.URI;
    import java.net.URISyntaxException;
    import java.util.Scanner;
    import com.microsoft.azure.relay.HybridConnectionListener;
    import com.microsoft.azure.relay.RelayConnectionStringBuilder;
    import com.microsoft.azure.relay.RelayedHttpListenerResponse;
    import com.microsoft.azure.relay.TokenProvider;
    
     public class Listener
     {
        public static String createConnectionString(){
            StringBuilder connectionString = new StringBuilder();
            connectionString.append("Endpoint=sb://");
            connectionString.append("{namespace}");
            connectionString.append(".servicebus.windows.net/;SharedAccessKeyName=");
            connectionString.append("{keyrule}");
            connectionString.append(";SharedAccessKey=");
            connectionString.append("{key}");
            connectionString.append(";EntityPath=");
            connectionString.append("{path}");
            return connectionString.toString();
        }
    
        public static void main( String[] args ) throws URISyntaxException
        {
            String CONNECTION_STRING_ENV_VARIABLE_NAME = createConnectionString();
            RelayConnectionStringBuilder connectionParams = new RelayConnectionStringBuilder(CONNECTION_STRING_ENV_VARIABLE_NAME);
            TokenProvider tokenProvider = TokenProvider.createSharedAccessSignatureTokenProvider(
                        connectionParams.getSharedAccessKeyName(),
                        connectionParams.getSharedAccessKey());
            HybridConnectionListener listener = new HybridConnectionListener(new URI(connectionParams.getEndpoint().toString() + connectionParams.getEntityPath()), tokenProvider);
    
            // The "context" object encapsulates both the incoming request and the outgoing response
            listener.setRequestHandler((context) -> {
                String receivedText = "";
                if (context.getRequest().getInputStream() != null) {
                    try (BufferedReader reader = new BufferedReader(new InputStreamReader(context.getRequest().getInputStream(), "UTF8"))) {
                        StringBuilder builder = new StringBuilder();
                        String inputLine;
                        while ((inputLine = reader.readLine()) != null) {
                            builder.append(inputLine);
                        }
                        receivedText = builder.toString();
                    } catch (IOException e) {
                        System.out.println(e.getMessage());
                    }
                }
                System.out.println("requestHandler received " + receivedText);
    
                RelayedHttpListenerResponse response = context.getResponse();
                response.setStatusCode(202);
                response.setStatusDescription("OK");
    
                try {
                    response.getOutputStream().write(("Echo: " + receivedText).getBytes());
                } catch (IOException e) {
                    e.printStackTrace();
                }
    
                // The context MUST be closed for the message to be sent
                response.close();
            });
    
            listener.openAsync().join();
    
            Scanner in = new Scanner(System.in);
            System.out.println("Press ENTER to terminate this program.");
            in.nextLine();
    
            listener.close();
            in.close();
        }
    }
    ```



## Create a client application (sender)

To send messages to the Relay, you can use any HTTP client, or write a Java console application.


### Create a Java application

If you disabled the "Requires Client Authorization" option when creating the Relay,
you can send requests to the Hybrid Connections URL with any browser. For accessing
protected endpoints, you need to create and pass a token in the `ServiceBusAuthorization`
header, which is shown here.

Here's a simple Maven project structure and a Java class that demonstrates sending requests to 
a Hybrid Connections URL with client authorization utilizing the Azure Relay library. 

### Add the Relay package

Modify your pom.xml file in your maven application package to include the Azure Relay package.

```xml
<dependency>
	<groupId>com.microsoft.azure</groupId>
	<artifactId>azure-relay</artifactId>
	<version>0.0.6</version>
</dependency>
```

Run `mvn dependency:copy-dependencies -DoutputDirectory=lib` in your mvn project to add the 
dependency jar file in the lib directory of your project. It also imports all dependencies
of the `azure-relay` mvn package. This package provides functions to construct Relay uniform resource identifiers (URIs) and tokens.

### Write some code to send messages

1. Add the dependency jar files to the ClassPath of your `Sender.java` file.

    ```bash
    javac -cp lib/* src/main/java/com/example/sender/Sender.Java
    ```

2. Import the dependencies into your `Sender.java` class.

    ```java
    import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStream;
    import java.io.InputStreamReader;
    import java.io.OutputStreamWriter;
    import java.net.HttpURLConnection;
    import java.net.MalformedURLException;
    import java.net.URL;
    import java.time.Duration;
    import java.util.Scanner;
    import com.microsoft.azure.relay.RelayConnectionStringBuilder;
    import com.microsoft.azure.relay.TokenProvider;
    ```

4. Add the following `constants` to the top of the `Sender.java` file to a `createConnectionString` java function for the hybrid connection details.

    ```java
    public static String createConnectionString(){
        StringBuilder connectionString = new StringBuilder();
        connectionString.append("Endpoint=sb://");
        connectionString.append("{namespace}");
        connectionString.append(".servicebus.windows.net/;SharedAccessKeyName=");
        connectionString.append("{keyrule}");
        connectionString.append(";SharedAccessKey=");
        connectionString.append("{key}");
        connectionString.append(";EntityPath=");
        connectionString.append("{path}");
        return connectionString.toString();
    }
    ```
    Replace the placeholders in brackets with the values you obtained when you created the hybrid connection.
    - `namespace` - The Relay namespace. Be sure to use the fully qualified namespace name; for example, `{namespace}.servicebus.windows.net`.
    - `path` - The name of the hybrid connection.
    - `keyrule` - Name of your Shared Access Policies key, which is `RootManageSharedAccessKey` by default.
    - `nst key` -   The primary key of the namespace you saved earlier.

5. Add the following code to the `Sender.java` file. The main function should look like the following code. 

    ```java
    public static void main(String[] args) throws IOException {
        String CONNECTION_STRING_ENV_VARIABLE_NAME = createConnectionString();
        if (CONNECTION_STRING_ENV_VARIABLE_NAME == null || CONNECTION_STRING_ENV_VARIABLE_NAME.isEmpty()){
            System.err.println("Connection string is null or empty. Please check your createConnectionString method.");
            return;
        }
        RelayConnectionStringBuilder connectionParams = new RelayConnectionStringBuilder(CONNECTION_STRING_ENV_VARIABLE_NAME);
        TokenProvider tokenProvider = TokenProvider.createSharedAccessSignatureTokenProvider(
                connectionParams.getSharedAccessKeyName(), 
                connectionParams.getSharedAccessKey());
        URL url = buildHttpConnectionURL(connectionParams.getEndpoint().toString(), connectionParams.getEntityPath());
        String tokenString = tokenProvider.getTokenAsync(url.toString(), Duration.ofHours(1)).join().getToken();
        Scanner in = new Scanner(System.in);
        while (true) {
            System.out.println("Press ENTER to terminate this program.");
            String message = in.nextLine();
            int value = System.in.read();
            if (value == '\n' || value == '\r') {
                System.out.println("Terminating the program...");
                break;}
            // Starting a HTTP connection to the listener
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            // Sending an HTTP request to the listener
            // To send a message body, use POST
            conn.setRequestMethod((message == null || message.length() == 0) ? "GET" : "POST");
            conn.setRequestProperty("ServiceBusAuthorization", tokenString);
            conn.setDoOutput(true);
            OutputStreamWriter out = new OutputStreamWriter(conn.getOutputStream());
            out.write(message, 0, message.length());
            out.flush();
            out.close();
            // Reading the HTTP response
            String inputLine;
            BufferedReader reader = null;
            StringBuilder responseBuilder = new StringBuilder();
            try {
                InputStream inputStream = conn.getInputStream();
                reader = new BufferedReader(new InputStreamReader(inputStream));
                System.out.println("status code: " + conn.getResponseCode());
                while ((inputLine = reader.readLine()) != null) {
                    responseBuilder.append(inputLine);
                }
                System.out.println("received back " + responseBuilder.toString());
            } catch (IOException e) {
                System.out.println("The listener is offline or could not be reached.");
                break;
            } finally {
                if (reader != null) {
                    reader.close();
                }
            }
        }
        in.close();
    }
    
    static URL buildHttpConnectionURL(String endpoint, String entity) throws MalformedURLException {
        StringBuilder urlBuilder = new StringBuilder(endpoint + entity);
        
        // For HTTP connections, the scheme must be https://
        int schemeIndex = urlBuilder.indexOf("://");
        if (schemeIndex < 0) {
            throw new IllegalArgumentException("Invalid scheme from the given endpoint.");
        }
        urlBuilder.replace(0, schemeIndex, "https");
        return new URL(urlBuilder.toString());
    }
    ```

    Here's what your `Sender.java` file should look like:

    ```java
    package com.example.sender;
    import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStream;
    import java.io.InputStreamReader;
    import java.io.OutputStreamWriter;
    import java.net.HttpURLConnection;
    import java.net.MalformedURLException;
    import java.net.URL;
    import java.time.Duration;
    import java.util.Scanner;
    import com.microsoft.azure.relay.RelayConnectionStringBuilder;
    import com.microsoft.azure.relay.TokenProvider;

    public class Sender
    {
        public static String createConnectionString(){
            StringBuilder connectionString = new StringBuilder();
            connectionString.append("Endpoint=sb://");
            connectionString.append("{namespace}");
            connectionString.append(".servicebus.windows.net/;SharedAccessKeyName=");
            connectionString.append("{keyrule}");
            connectionString.append(";SharedAccessKey=");
            connectionString.append("{key}");
            connectionString.append(";EntityPath=");
            connectionString.append("{path}");
            return connectionString.toString();
            }
        public static void main(String[] args) throws IOException {
            String CONNECTION_STRING_ENV_VARIABLE_NAME = createConnectionString();
            if (CONNECTION_STRING_ENV_VARIABLE_NAME == null || CONNECTION_STRING_ENV_VARIABLE_NAME.isEmpty()){
                System.err.println("Connection string is null or empty. Please check your createConnectionString method.");
                return;
            }
            RelayConnectionStringBuilder connectionParams = new RelayConnectionStringBuilder(CONNECTION_STRING_ENV_VARIABLE_NAME);
            TokenProvider tokenProvider = TokenProvider.createSharedAccessSignatureTokenProvider(
                    connectionParams.getSharedAccessKeyName(), 
                    connectionParams.getSharedAccessKey());
            URL url = buildHttpConnectionURL(connectionParams.getEndpoint().toString(), connectionParams.getEntityPath());
            String tokenString = tokenProvider.getTokenAsync(url.toString(), Duration.ofHours(1)).join().getToken();
            Scanner in = new Scanner(System.in);
            while (true) {
                System.out.println("Press ENTER to terminate this program.");
                String message = in.nextLine();
                int value = System.in.read();
                if (value == '\n' || value == '\r') {
                    System.out.println("Terminating the program...");
                    break;}
                // Starting a HTTP connection to the listener
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                // Sending an HTTP request to the listener
                // To send a message body, use POST
                conn.setRequestMethod((message == null || message.length() == 0) ? "GET" : "POST");
                conn.setRequestProperty("ServiceBusAuthorization", tokenString);
                conn.setDoOutput(true);
                OutputStreamWriter out = new OutputStreamWriter(conn.getOutputStream());
                out.write(message, 0, message.length());
                out.flush();
                out.close();
                // Reading the HTTP response
                String inputLine;
                BufferedReader reader = null;
                StringBuilder responseBuilder = new StringBuilder();
                try {
                    InputStream inputStream = conn.getInputStream();
                    reader = new BufferedReader(new InputStreamReader(inputStream));
                    System.out.println("status code: " + conn.getResponseCode());
                    while ((inputLine = reader.readLine()) != null) {
                        responseBuilder.append(inputLine);
                    }
                    System.out.println("received back " + responseBuilder.toString());
                } catch (IOException e) {
                    System.out.println("The listener is offline or could not be reached.");
                    break;
                } finally {
                    if (reader != null) {
                        reader.close();
                    }
                }
            }
            in.close();
        }
    
        static URL buildHttpConnectionURL(String endpoint, String entity) throws MalformedURLException {
            StringBuilder urlBuilder = new StringBuilder(endpoint + entity);
        
            // For HTTP connections, the scheme must be https://
            int schemeIndex = urlBuilder.indexOf("://");
            if (schemeIndex < 0) {
                throw new IllegalArgumentException("Invalid scheme from the given endpoint.");
            }
            urlBuilder.replace(0, schemeIndex, "https");
            return new URL(urlBuilder.toString());
        }
    }
    ```

> **Note:**
> The sample code in this article uses a connection string to authenticate to an Azure Relay namespace to keep the tutorial simple. We recommend that you use Microsoft Entra ID authentication in production environments, rather than using connection strings or shared access signatures, which can be more easily compromised. For detailed information and sample code for using the Microsoft Entra ID authentication, see [Authenticate and authorize an application with Microsoft Entra ID to access Azure Relay entities](authenticate-application.md) and [Authenticate a managed identity with Microsoft Entra ID to access Azure Relay resources](authenticate-managed-identity.md).



## Run the applications

1. Run the server application: from a Java command prompt or application type `java -cp <jar_dependency_path> com.example.listener.Listener.java`.
2. Run the client application: from a Java command prompt or application type `java -cp <jar_dependency_path> com.example.sender.Sender.java`, and enter some text.
3. Ensure that the server application console outputs the text that was entered in the client application.

Congratulations, you have created an end-to-end Hybrid Connections application using Java!

## Next steps
In this quickstart, you created Java client and server applications that used HTTP to send and receive messages. The Hybrid Connections feature of Azure Relay also supports using WebSockets to send and receive messages. To learn how to use WebSockets with Azure Relay Hybrid Connections, see the [WebSockets quickstart](relay-hybrid-connections-node-get-started.md).

In this quickstart, you used Java to create client and server applications. To learn how to write client and server applications using .NET Framework, see the [.NET WebSockets quickstart](relay-hybrid-connections-dotnet-get-started.md) or the [.NET HTTP quickstart](relay-hybrid-connections-http-requests-dotnet-get-started.md).
