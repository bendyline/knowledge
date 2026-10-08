---
title: Azure Relay Hybrid Connections - WebSocket requests in Python
description: Write a Python console application for Azure Relay Hybrid Connections WebSocket requests.
ms.topic: tutorial
ms.date: 01/24/2026
ms.custom: devx-track-Python, mode-ui, mode-api, devx-track-extended-Python
---

# Get started with Relay Hybrid Connections WebSocket requests in Python

> 
> * [NET](relay-hybrid-connections-dotnet-get-started.md)
> * [Node.js](relay-hybrid-connections-node-get-started.md)
> 
>

In this quickstart, you create Python sender and receiver applications that send and receive messages by using the WebSocket protocol. The applications use Hybrid Connections feature of Azure Relay. To learn about Azure Relay in general, see [Azure Relay](relay-what-is-it.md). 

In this quickstart, you take the following steps:

1. Create a Relay namespace by using the Azure portal.
1. Create a hybrid connection in that namespace by using the Azure portal.
1. Generate a config.json properties file to store connection details
1. Develop a relaylib.py for helper functions (SAS tokens, URLs)
1. Write a server (listener) script to receive messages.
1. Write a client (sender) script to send messages.
1. Execute the server (listener) script and optionally the client (sender) script.

## Prerequisites
- [Python](https://www.python.org/). Ensure that you're running Python 3.10+
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
To listen and receive messages from the Relay, write a Python WebSocket Server script.


### Create a Python Script

If you disabled the "Requires Client Authorization" option when creating the Relay,
you can send requests to the Hybrid Connections URL with any browser. For accessing
protected endpoints, you need to create and pass a SAS Token, which is shown here.

Here's a simple Python script that demonstrates sending requests to 
a Hybrid Connections URL with SAS Tokens utilizing WebSockets. 

### Dependencies

1. Install the following Python libraries using pip before running the server application

	`asyncio`, `json`, `logging`, `websockets`

	These libraries can be installed using the following command:

	```bash
	pip install <package name>
	```
2. Generate a `config.json` file to store your connection details

    ```json
    {
        "namespace": "HYBRID_CONNECTION_NAMESPACE",
        "path": "HYBRID_CONNECTION_ENTITY_NAME",
        "keyrule": "SHARED_ACCESS_KEY_NAME",
        "key": "SHARED_ACCESS_PRIMARY_KEY"
	}
	```
	Replace the placeholders in brackets with the values you obtained when you created the hybrid connection.

	- `namespace` - The Relay namespace. Be sure to use the fully qualified namespace name; for example, `{namespace}.servicebus.windows.net`.
	- `path` - The name of the hybrid connection.
	- `keyrule` - Name of your Shared Access Policies key, which is `RootManageSharedAccessKey` by default.
	- `key` -   The primary key of the namespace you saved earlier.
3. Generate a helper function file for helper functions

	The following file is used as `relaylib.py` and have helper functions for WebSocket URL generation and SAS tokens

    
### Create a Python Script

This script provides helper functions for applications utilizing Azure Relay Hybrid Connections. 
These functions likely assist with tasks like generating SAS tokens and establishing WebSocket 
connections for secure communication.

### Dependencies

Install the following Python libraries using pip before generating the helper function script: `base64`, `hashlib`, `hmac`, `math`, `time`, `urllib`

These libraries can be installed using the following command:

```bash
pip install <package name>
```

### Write the helper function script

Here's what your `relaylib.py` file should look like:

 ```python
import base64
import hashlib
import hmac
import math
import time
import urllib

# Function which generates the HMAC-SHA256 of a given message
def hmac_sha256(key, msg):
    hash_obj = hmac.new(key=key, msg=msg, digestmod=hashlib._hashlib.openssl_sha256)
    return hash_obj.digest()

# Function to create a WebSocket URL for listening for a server application
def createListenUrl(serviceNamespace, entityPath, token = None):
    url = 'wss://' + serviceNamespace + '/$hc/' + entityPath + '?sb-hc-action=listen'
    if token is not None:
        url = url + '&sb-hc-token=' + urllib.parse.quote(token)
    return url

# Function which creates the url for the client application
def createSendUrl(serviceNamespace, entityPath, token = None):
    url = 'wss://' + serviceNamespace + '/$hc/' + entityPath + '?sb-hc-action=connect'
    if token is not None:
        url = url + '&sb-hc-token=' + urllib.parse.quote(token)
    return url

# Function which creates the Service Bus SAS token. 
def createSasToken(serviceNamespace, entityPath, sasKeyName, sasKey):
    uri = "http://" + serviceNamespace + "/" + entityPath
    encodedResourceUri = urllib.parse.quote(uri, safe = '')

    # Define the token validity period in seconds (48 hours in this case)   
    tokenValidTimeInSeconds = 60 * 60 * 48 
    unixSeconds = math.floor(time.time())
    expiryInSeconds = unixSeconds + tokenValidTimeInSeconds

    # Create the plain signature string by combining the encoded URI and the expiry time
    plainSignature = encodedResourceUri + "\n" + str(expiryInSeconds)

    # Encode the SAS key and the plain signature as bytes
    sasKeyBytes = sasKey.encode("utf-8")
    plainSignatureBytes = plainSignature.encode("utf-8")
    hashBytes = hmac_sha256(sasKeyBytes, plainSignatureBytes)
    base64HashValue = base64.b64encode(hashBytes)

    # Construct the SAS token string
    token = "SharedAccessSignature sr=" + encodedResourceUri + "&sig=" +  urllib.parse.quote(base64HashValue) + "&se=" + str(expiryInSeconds) + "&skn=" + sasKeyName
    return token
 ```


### Write some code to receive messages

1. Ensure your dependency `config.json` and `relaylib.py` are available in your path 
2. Here's what your `listener.py` file should look like:

    ```python
    import asyncio
    import json
    import logging
    import relaylib
    import websockets

    async def run_application(config):
        serviceNamespace = config["namespace"]
        entityPath = config["path"]
        sasKeyName = config["keyrule"]
        sasKey = config["key"]
        serviceNamespace += ".servicebus.windows.net"
        # Configure logging
        logging.basicConfig(level=logging.INFO)  # Enable DEBUG/INFO logging as appropriate

        try:
            logging.debug("Generating SAS Token for: %s", serviceNamespace)
            token = relaylib.createSasToken(serviceNamespace, entityPath, sasKeyName, sasKey)
            logging.debug("Generating WebSocket URI")
            wssUri = relaylib.createListenUrl(serviceNamespace, entityPath, token)
            async with websockets.connect(wssUri) as websocket:
                logging.info("Listening for messages on Azure Relay WebSocket...")
                while True:
                    message = await websocket.recv()
                    logging.info("Received message: %s", message)
        except KeyboardInterrupt:
            logging.info("Exiting listener.")

    if __name__ == "__main__":
        # Load configuration from JSON file
        with open("config.json") as config_file:
            config = json.load(config_file)

    asyncio.run(run_application(config))
    ```



## Create a client application (sender)

To send messages to the Relay, you can use any HTTP or WebSocket client, the sample included is a python implementation.


### Write some code to send messages

1. Ensure your dependency `config.json` and `relaylib.py` are available in your path 
2. Here's what your `sender.py` file should look like:

    ```python
    import asyncio
    import json
    import logging
    import relaylib
    import websockets

    async def run_application(message, config):
        service_namespace = config["namespace"]
        entity_path = config["path"]
        sas_key_name = config["keyrule"]
        sas_key = config["key"]
        service_namespace += ".servicebus.windows.net"

        # Configure logging
        logging.basicConfig(level=logging.DEBUG)  # Enable debug logging

        token = relaylib.createSasToken(service_namespace, entity_path, sas_key_name, sas_key)
        logging.debug("Token: %s", token)
        wss_uri = relaylib.createSendUrl(service_namespace, entity_path, token)
        logging.debug("WssURI: %s", wss_uri)

        try:
            async with websockets.connect(wss_uri) as websocket:
                logging.info("Sending message to Azure Relay WebSocket...")
                await websocket.send(json.dumps({"message": message}))
                logging.info("Message sent: %s", message)
        except Exception as e:
            logging.error("An error occurred: %s", str(e))

    if __name__ == "__main__":
        # Load configuration from JSON file
        with open("config.json") as config_file:
            config = json.load(config_file)

        asyncio.run(run_application("This is a message to Azure Relay Hybrid Connections!", config))
    ```

> **Note:**
> The sample code in this article uses a connection string to authenticate to an Azure Relay namespace to keep the tutorial simple. We recommend that you use Microsoft Entra ID authentication in production environments, rather than using connection strings or shared access signatures, which can be more easily compromised. For detailed information and sample code for using the Microsoft Entra ID authentication, see [Authenticate and authorize an application with Microsoft Entra ID to access Azure Relay entities](authenticate-application.md) and [Authenticate a managed identity with Microsoft Entra ID to access Azure Relay resources](authenticate-managed-identity.md).


## Run the applications

1. Run the server application: from a command prompt type `python3 listener.py`.
2. Run the client application: from a command prompt type `python3 sender.py`.

Congratulations, you have created an end-to-end Hybrid Connections application using Python!

## Next steps
In this quickstart, you created Python client and server applications that used WebSockets to send and receive messages. The Hybrid Connections feature of Azure Relay also supports using HTTP to send and receive messages. To learn how to use HTTP with Azure Relay Hybrid Connections, see the [HTTP quickstart](relay-hybrid-connections-node-get-started.md).

In this quickstart, you used Python to create client and server applications. To learn how to write client and server applications using .NET Framework, see the [.NET HTTP quickstart](relay-hybrid-connections-dotnet-get-started.md) or the [.NET HTTP quickstart](relay-hybrid-connections-http-requests-dotnet-get-started.md).
