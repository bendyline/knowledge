---
author: clemensv
ms.service: azure-relay
ms.topic: include
ms.date: 01/24/2026
ms.author: samurp
---

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
