---
title: Build Akri connectors with VS Code extension
description: Learn how to build Akri connectors for Azure IoT Operations using the Visual Studio Code extension.
author: dominicbetts 
ms.author: dobett 
ms.topic: how-to
ms.date: 12/08/2025
ms.service: azure-iot-operations
ms.subservice: azure-akri
# CustomerIntent: As a developer, I want to understand how to use the VS Code extension to build and deploy custom Akri connectors.
---

# Build Akri connectors in VS Code

This article describes how to build, validate, debug, and publish custom Akri connectors using the **Azure IoT Operations Akri Connectors** preview VS Code extension.

The extension supports the following platforms:

- Linux
- Microsoft Windows Subsystem for Linux (WSL)
- Windows

The extension enables you to create connectors by using the following programming languages:

- .NET
- Rust

## Prerequisites

Development environment:

- Docker
- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure IoT Operations Akri Connectors (preview)](https://marketplace.visualstudio.com/items?itemName=ms-azureiotoperations.azure-iot-operations-akri-connectors-vscode) VS Code extension
- [.NET SDK](https://dotnet.microsoft.com/download)
- To debug .NET based connectors - [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
- To debug Rust based connectors - [C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-VSCode.cpptools)
- [ORAS CLI](https://oras.land/docs/installation/)
- Clone the [Explore Azure IoT Operations](https://github.com/Azure-Samples/explore-iot-operations) repository if you haven't already done so.

Docker configuration:

- Images used by the extension must be pulled and tagged locally before you use the extension:

    ```bash
    docker pull mcr.microsoft.com/azureiotoperations/devx-runtime:0.1.10
    docker tag mcr.microsoft.com/azureiotoperations/devx-runtime:0.1.10 devx-runtime
    ```

- All the containers the extension launches are configured to run on a custom network named `aio_akri_network` for network isolation purpose:

    ```bash
    docker network create aio_akri_network
    ```

- The DevX container uses a custom volume `akri_devx_docker_volume` to store cluster configuration:

    ```bash
    docker volume rm akri-devx-docker-volume # delete the volume created from any previous release
    docker volume create akri-devx-docker-volume
    ```

To deploy and use your connector with an Azure IoT Operations instance, you also need:


- An instance of Azure IoT Operations deployed in a Kubernetes cluster. For more information, see [Deploy Azure IoT Operations](../deploy-iot-ops/howto-deploy-iot-operations.md).

- Access to a container registry, such as Azure Container Registry, to publish your connector images.
- A container registry endpoint configured in your Azure IoT Operations instance to pull your connector images. For more information, see [Configure registry endpoints](howto-configure-registry-endpoint.md).

## Author and validate an Akri connector

# [.NET](#tab/dotnet)

In this example, you create an HTTP/REST connector using the C# language, build a docker image, and then run the connector application by using the VS Code extension:

1. Press `Ctrl+Shift+P` to open the command palette and search for **Azure IoT Operations Akri Connectors: Create a New Akri Connector** command. Create a new folder called `my-connectors` and select it, select **C#** as the language, enter a name for the connector like `MyConnector`, and select **PollingTelemetryConnector** as the connector type.

1. The extension creates a new workspace named by using the connector name you chose in the previous step. The workspace includes the scaffolding for a polling telemetry connector written in the C# language.


The following steps assume you created a .NET project called **MyConnector**.

> **Important:**
> The following example code is for illustrative purposes only and is not intended to be used in production. In a production connector, you should implement robust error handling and retry logic, and ensure that any credentials used to connect to the asset are stored and used securely. A production quality connector must implement the contract described in the [Akri operator and connector contract](https://github.com/Azure/iot-operations-sdks/blob/main/doc/akri_connector/Akri%20operator%20and%20connector%20contract.md) document in the SDKs repository.

To represent the thermostat status, create a file called **ThermostatStatus.cs** in the `MyConnector` folder in the workspace with the following content. This file models the JSON response from the REST endpoint:

```c#
using System.Text.Json.Serialization;

namespace MyConnector
{
    internal class ThermostatStatus
    {
        [JsonPropertyName("desiredTemperature")]
        public double? DesiredTemperature { get; set; }

        [JsonPropertyName("currentTemperature")]
        public double? CurrentTemperature { get; set; }
    }
}
```

Implement the `SampleDatasetAsync` method in the provided `DatasetSampler` class. The method takes a `Dataset` as a parameter. A `Dataset` contains the data points for the connector to process.

1. Open the file `MyConnector/DatasetSampler.cs` in your VS Code workspace.

1. To pass in the required data for processing the endpoint data, add a constructor to the `DatasetSampler` class. The class uses the `HttpClient` and `EndpointProfileCredentials` to connect to and authenticate with the asset endpoint. Add the JSON serializer options and the `DisposeAsync` method to clean up the `HttpClient` when the `DatasetSampler` is disposed:

    ```c#
    private readonly HttpClient _httpClient;
    private readonly string _assetName;
    private readonly EndpointCredentials? _credentials;

    private readonly static JsonSerializerOptions _jsonSerializerOptions = new()
    {
        AllowTrailingCommas = true,
    };

    public DatasetSampler(HttpClient httpClient, string assetName, EndpointCredentials? credentials)
    {
        _httpClient = httpClient;
        _assetName = assetName;
        _credentials = credentials;
    }

    public ValueTask DisposeAsync()
    {
        _httpClient.Dispose();
        return ValueTask.CompletedTask;
    }
    ```

1. Modify the `GetSamplingIntervalAsync` method to return a sampling interval of three seconds:

    ```c#
    public Task<TimeSpan> GetSamplingIntervalAsync(AssetDataset dataset, CancellationToken cancellationToken = default)
    {
        return Task.FromResult(TimeSpan.FromSeconds(3));
    }
    ```

    > **Note:**
    > For simplicity, this example uses a fixed sampling interval. In a production connector, you can make the sampling interval configurable by using the connector metadata to define a sampling interval property that a user can set in the operations experience UI.

1. Replace the existing `SampleDatasetAsync` method with the following outline:

    ```c#
    public async Task<byte[]> SampleDatasetAsync(AssetDataset dataset, CancellationToken cancellationToken = default)
    {
        int retryCount = 0;
        while (true)
        {
            try
            {
                // TODO: Implement your dataset sampling logic here.
            }
            catch (Exception ex)
            {
                if (++retryCount >= 3)
                {
                    throw new InvalidOperationException($"Failed to sample dataset with name {dataset.Name} in asset with name {_assetName}. Error: {ex.Message}", ex);
                }
                await Task.Delay(1000, cancellationToken);
            }
        }
    }
    ```

1. In the `try` block in the `SampleDatasetAsync` method, add the following code to retrieve the temperature data from the `DataSet` and extract the data source paths. These paths are part of the URLs used to fetch the data from the REST endpoint. The `currentTemperature` and `desiredTemperature` data points were modeled previously in the `ThermostatStatus` class:

    ```c#
    if (_credentials != null && _credentials.Username != null && _credentials.Password != null)
    {
        // Note that this sample uses username + password for authenticating the connection to the asset. In general,
        // x509 authentication should be used instead (if available) as it is more secure.
        string httpServerUsername = _credentials.Username;
        string httpServerPassword = _credentials.Password;
        var byteArray = Encoding.ASCII.GetBytes($"{httpServerUsername}:{httpServerPassword}");
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
    }

    ThermostatStatus mergedStatus = new();

    foreach (var dataPoint in dataset.DataPoints)
    {
        string path = dataPoint.DataSource!;

        var response = await _httpClient.GetAsync(path, cancellationToken);

        if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
        {
            throw new Exception("Failed to authorize request to HTTP server. Check credentials configured in rest-server-device-definition.yaml.");
        }

        response.EnsureSuccessStatusCode();

        var bytes = await response.Content.ReadAsByteArrayAsync(cancellationToken);
        ThermostatStatus partial = JsonSerializer.Deserialize<ThermostatStatus>(bytes, _jsonSerializerOptions)!;

        if (partial.CurrentTemperature.HasValue)
        {
            mergedStatus.CurrentTemperature = partial.CurrentTemperature;
        }
        if (partial.DesiredTemperature.HasValue)
        {
            mergedStatus.DesiredTemperature = partial.DesiredTemperature;
        }
    }

    return JsonSerializer.SerializeToUtf8Bytes(mergedStatus, _jsonSerializerOptions);
    ```

    > **Tip:**
    > Optionally, the connector can register a schema in the schema registry to enable other Azure IoT Operations to understand the format of the messages.

1. Finally, import the necessary types:

    ```c#
    using Azure.Iot.Operations.Connector;
    using Azure.Iot.Operations.Connector.Files;
    using Azure.Iot.Operations.Services.AssetAndDeviceRegistry.Models;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Text.Json;
    ```

The final version of the code looks similar to [DatasetSampler](https://raw.githubusercontent.com/Azure/iot-operations-sdks/refs/heads/main/dotnet/samples/Connectors/PollingRestThermostatConnector/ThermostatStatusDatasetSampler.cs).

Implement the `CreateDatasetSampler` method in the `DatasetSamplerProvider` class. This class creates `DataSetSampler` objects to inject into the application as required.

1. Open the `MyConnector/DatasetSamplerProvider.cs` file in your VS Code workspace.

1. In the `CreateDatasetSampler` method, return a `DatasetSampler` along with the `endpointCredentials`, if the dataset name is `thermostat_status`:

    ```c#
    if (dataset.Name.Equals("thermostat_status"))
    {
        if (device.Endpoints != null
            && device.Endpoints.Inbound != null
            && device.Endpoints.Inbound.TryGetValue(inboundEndpointName, out var inboundEndpoint))
        {
            var httpClient = new HttpClient()
            {
                BaseAddress = new Uri(inboundEndpoint.Address),
            };

            return new DatasetSampler(httpClient, assetName, endpointCredentials);
        }
    }

    throw new InvalidOperationException($"Unrecognized dataset with name {dataset.Name} on asset with name {assetName}");
    ```

    > **Note:**
    > For simplicity, this example assumes that the dataset name is always `thermostat_status`. In a production connector, you can implement additional logic to handle multiple datasets.

The final version of the code looks similar to [DatasetSamplerProvider](https://raw.githubusercontent.com/Azure/iot-operations-sdks/refs/heads/main/dotnet/samples/Connectors/PollingRestThermostatConnector/RestThermostatDatasetSamplerProvider.cs).

Implement the MessageSchemaProvider class to register a message schema for the dataset. This step is optional but allows other Azure IoT Operations to understand the format of the messages from the connector:

1. Open the `MyConnector/MessageSchemaProvider.cs` file in your VS Code workspace.

1. Add a string  to the class that contains the JSON schema for the `thermostat_status` dataset:

    ```c#
    private static readonly string _datasetJsonSchema = """
    {
        "$schema": "https://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
        "desiredTemperature": {
                "type": "number"
            },
            "currentTemperature": {
                "type": "number"
            }
        }
    }
    """;
    ```

1. In the `GetMessageSchemaAsync` method, return the JSON schema for the `thermostat_status` dataset:

    ```c#
    public Task<ConnectorMessageSchema?> GetMessageSchemaAsync(Device device, Asset asset, string datasetName, AssetDataset dataset, CancellationToken cancellationToken = default)
    {
        if (datasetName.Equals("thermostat_status", StringComparison.OrdinalIgnoreCase))
        {
            ConnectorMessageSchema? schema = new ConnectorMessageSchema(_datasetJsonSchema, Azure.Iot.Operations.Services.SchemaRegistry.SchemaRegistry.Format.JsonSchemaDraft07, Azure.Iot.Operations.Services.SchemaRegistry.SchemaRegistry.SchemaType.MessageSchema, "1", null);
            return Task.FromResult((ConnectorMessageSchema?)schema);
        }

        return Task.FromResult((ConnectorMessageSchema?)null);
    }
    ```

The final version of the code looks similar to [MessageSchemaProvider](https://raw.githubusercontent.com/Azure/iot-operations-sdks/refs/heads/main/dotnet/samples/Connectors/PollingRestThermostatConnector/MessageSchemaProvider.cs).


Next, build the project to confirm there are no errors. Use the VS Code command **Azure IoT Operations Akri Connectors: Build an Akri Connector** and choose the **Release** mode. This command shows the build progress in the **OUTPUT** console and notifies you when the build completes. You can then see a new Docker image named `<connector_name>` with tag `release` locally in Docker Desktop.

To test the new connector locally, follow these steps:

1. Create a local endpoint that acts as a REST server for the connector to connect to. In the `explore-iot-operation` repository you cloned previously, run the following commands to build a local REST server for testing:

    ```bash
    cd samples/akri-vscode-extension/sample-rest-server
    docker build -t rest-server:latest .
    ```

    You can see the image in Docker Desktop.

1. Run the following command to start the REST server in a local container:

    ```bash
    docker run -d --rm --network aio_akri_network --name restserver rest-server:latest
    ```

1. You can see the container running in Docker Desktop. The REST server is accessible at `http://restserver:3000` for containers running on `aio_akri_network`.

# [Rust](#tab/rust)

In this example, you create an HTTP/REST connector using the Rust language, build a Docker image, and then run the connector application by using the VS Code extension:

> **Important:**
> The following example code is meant for illustrative purposes only and is not intended to be used in production. In a production connector, you should implement robust error handling and retry logic, and ensure that any credentials used to connect to the asset are stored and used securely. A production quality connector must implement the contract described in the [Akri operator and connector contract](https://github.com/Azure/iot-operations-sdks/blob/main/doc/akri_connector/Akri%20operator%20and%20connector%20contract.md) document in the SDKs repository.

1. Press `Ctrl+Shift+P` to open the command palette and search for the **Azure IoT Operations Akri Connectors: Create a New Akri Connector** command. Create a new folder called `my-connectors` and select it, select **Rust** as the language, and enter a name for the connector like `rest_connector`.

1. The extension creates a new workspace named by using the connector name you chose in the previous step. The workspace includes the scaffolding for a connector written in the Rust language. There are `Implement` tags in the comments to help you write your own custom Akri connector. For testing purposes, you can try out the connector with just the scaffolding code. To see logs from your connector crate, replace the tag `sample_connector_scaffolding` with your connector name in the `DEFAULT_LOG_LEVEL` variable in the `main.rs` file.

Next, build the project to confirm there are no errors. Use the VS Code command **Azure IoT Operations Akri Connectors: Build an Akri Connector** and choose the **Release** mode. This command shows the build progress in the **OUTPUT** console and notifies you when the build completes. You can then see a new Docker image named `<connector_name>` with tag `release` locally in Docker Desktop.

---

1. Copy the file `rest-server-device-definition.yaml` from the `samples/akri-vscode-extension/rest-server-custom-resources` folder in your local copy of the `explore-iot-operations` repository to the **Devices** folder in your connector workspace in VS Code. This device resource defines an endpoint connection to the REST server.

1. Copy the file `rest-server-asset1-definition.yaml` from the `samples/akri-vscode-extension/rest-server-custom-resources` folder in your local copy of the `explore-iot-operations` repository to the **Assets** folder in your connector workspace in VS Code. This asset publishes temperature information from the device to the `mqtt/machine/asset1/status` MQTT topic.

1. Copy the file `rest-server-asset2-definition.yaml` from the `samples/akri-vscode-extension/rest-server-custom-resources` folder in your local copy of the `explore-iot-operations` repository to the **Assets** folder in your connector workspace in VS Code. This asset publishes temperature information from the device to the state store.
 
1. To start the local execution environment, press `Ctrl+Shift+P` to open the command palette and search for **Azure IoT Operations Akri Connectors: Start Development Environment**. This command launches a terminal that runs the `aio-broker` container, which is the local runtime for Akri connectors. It takes several minutes for the local execution environment to start. You can see the logs from the `aio-broker` container in the terminal window in VS Code and also in Docker Desktop.

1. To test the connector with the device and asset resources, go to the **Run and Debug** panel in the VS Code workspace and select the **Run an Akri Connector** configuration. This configuration launches a terminal that runs a container called `<connector_name>_release` that hosts the REST connector.

1. You can stop the execution anytime by using the **Stop** button on the debug command panel. This command cleans up and deletes the running container `<connector_name>_release`.

1. When you've finished your testing, stop the local execution environment by using the **Azure IoT Operations Akri Connectors: Stop Development Environment** command. This command stops and cleans up the `aio-broker` container.

## Debug an Akri connector

# [.NET](#tab/dotnet)

To debug a .NET based Akri connector, make sure you have the **C#** VS Code extension installed. Use the same REST connector you created previously:

1. To build the connector in **Debug** mode, use the VS Code command **Azure IoT Operations Akri Connectors: Build an Akri Connector** and select **Debug** mode. This command creates a local Docker image called `<connector_name>` with the tag `debug`. You can see the image in Docker Desktop.

1. You can add a breakpoint and the execution stops when the breakpoint is hit. Try adding a breakpoint at the start of the `SampleDatasetAsync` method in `DatasetSampler.cs`.

1. Before you start debugging, make sure the local execution environment is running by using the **Azure IoT Operations Akri Connectors: Start Development Environment** command. This command launches a terminal that runs the `aio-broker` container, which is the local runtime for Akri connectors. It takes several minutes for the local execution environment to start. You can see the logs from the `aio-broker` container in the terminal window in VS Code and also in Docker Desktop.
 
1. To debug the connector, go to the **Run and Debug** panel in VS Code workspace and select the **Debug an Akri Connector** configuration. This configuration launches a terminal that runs a container called `<connector_name>_release` that hosts the REST connector.  You can see the telemetry data flow from the REST server to the MQ broker through the REST connector in the terminal window in VS Code. The container logs are also visible in Docker Desktop.

1. Use the **Disconnect** button on the debug command panel to terminate the execution.

1. When you've finished your debugging, stop the local execution environment by using the **Azure IoT Operations Akri Connectors: Stop Development Environment** command. This command stops and cleans up the `aio-broker` container.

# [Rust](#tab/rust)

To debug a Rust-based Akri connector, make sure you have the **C/C++** VS Code extension installed. Use the same REST connector you created previously:

1. To build the connector in **Debug** mode, use the VS Code command **Azure IoT Operations Akri Connectors: Build an Akri Connector** and select **Debug** mode. This command creates a local Docker image called `<connector_name>` with the tag `debug`. You can see the image in Docker Desktop.

1. Add a breakpoint. The execution stops when the breakpoint is hit. Try adding a breakpoint in the `report_status_one_way` macro in `main.rs`.
 
1. To debug the connector, go to the **Run and Debug** panel in VS Code workspace and select the **Debug an Akri Connector** configuration. This configuration launches a terminal that runs the prelaunch tasks to start the `aio-broker` container and the REST connector you developed in another container called `<connector_name>_debug`. This process takes several minutes. You can see the telemetry data flow from the REST server to the MQ broker through the REST connector in the terminal window in VS Code. The container logs are also visible in Docker Desktop.

1. Use the **Disconnect** button on the debug command panel to terminate the execution.

> **Note:**
> The Akri VS Code extension launches the DevX container in a Run/Debug scenario with a timeout period of three minutes. If the container doesn't complete the launch within the timeout period, the extension terminates the container.

---

## Apply configuration updates

You can dynamically update the device and asset configurations in the local runtime environment while you're running your connector. This capability lets you verify that your connector responds to configuration changes. Use the following VS Code extension commands to make these changes:

- **Azure IoT Operations Akri Connectors: Apply Device YAML on cluster**
- **Azure IoT Operations Akri Connectors: Apply Asset YAML on cluster**
- **Azure IoT Operations Akri Connectors: Delete Device YAML from cluster**
- **Azure IoT Operations Akri Connectors: Delete Asset YAML from cluster**

## Capture connector state

To capture the current state of the schema registry, use the **Azure IoT Operations Akri Connectors: Capture Connector State** VS Code extension command. This command creates a folder in the workspace **OUTPUT** folder with a name based on the current timestamp. The created folder contains a copy of the current state of the schema registry, including any schemas created by the custom connector. 

The state of the schema registry is always visible in the `Output/ConnectorState` folder. The command lets you capture the state of the schema registry at a specific point in time.

## Publish a connector image

Use the **Azure IoT Operations Akri connectors: Publish Akri Connector Image or Metadata** command to publish connector images to a Microsoft Azure Container Registry (ACR) registry. The command uses the Microsoft Azure CLI and `oras` commands. To publish to an ACR registry, you need your Azure subscription ID and ACR registry name.

## Author connector metadata configuration

Use the VS Code workspace created from the **Create an Akri Connector** command to author the `connector-metadata.json` file that complies with the [JSON schema for Azure IoT Operations Connector Metadata 11.0-preview](https://json.schemastore.org/aio-connector-metadata-11.0-preview.json) schema. You can place this file anywhere in your connector workspace. The extension provides a static validation capability using the `connector-metadata.json` file and shows warnings in the `PROBLEMS` panel if any required properties are missing.

## Author additional configuration

Use the VS Code workspace created from the **Create an Akri Connector** command to author the `additionalConfig.json` file. You can place this file anywhere in your connector workspace. The extension provides the **Azure IoT Operations Akri Connectors: Preview Additional Configuration** command that lets you preview the file as it will be rendered in the operations experience:

Screenshot that shows the configuration preview active in VS Code.


The following JSON snippet shows an example additional configuration:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "MQTT Device Endpoint Config Schema",
  "description": "The JSON schema for the MQTT device endpoint additional configuration field",
  "type": "object",
  "properties": {
    "useBuiltInMqttBroker": {
      "type": "boolean",
      "default": false,
      "description": "Whether to use the built-in AIO broker as the inbound endpoint"
    },
    "assetDiscoveryConfiguration": {
      "type": "object",
      "description": "Configuration options for discovering assets via MQTT topics.",
      "properties": {
        "topicFilter": {
          "type": "string",
          "description": "The MQTT topic filter to subscribe to. This supports single level wildcard (+)"
        },
        "assetLevel": {
          "type": "integer",
          "minimum": 1,
          "default": 1,
          "description": "The level in topic tree where MQTT Connector looks for asset name. If single level wildcard (+) is used, please map this to it's position in topic filter."
        },
        "topicMappingPrefix": {
          "type": "string",
          "description": "A prefix used to map incoming topic to UNS topic. This will be used as prefix for the destination topic on the discovered dataset."
        }
      }
    },
    "externalBrokerConfiguration": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "External Broker Configuration Schema",
      "type": "object",
      "description": "Configuration options for external MQTT broker connections.",
      "properties": {
        "keepAlive": {
          "type": "integer",
          "default": 60,
          "description": "The keep alive interval in seconds for the MQTT connection."
        },
        "receiveMax": {
          "type": "integer",
          "default": 65535,
          "maximum": 65535,
          "description": "The maximum number of in-flight QoS 1 and QoS 2 publishes that the client is willing to process concurrently."
        },
        "receivePacketSizeMax": {
          "title": "Maximum received packet size",
          "type": "integer",
          "description": "The maximum packet size in bytes that the client is willing to accept."
        },
        "sessionExpiry": {
          "type": "integer",
          "default": 3600,
          "description": "The expiry of the session in seconds."
        },
        "connectionTimeout": {
          "type": "integer",
          "default": 30,
          "description": "The connection timeout in seconds for the MQTT connection."
        }
      },
      "required": ["receiveMax", "receivePacketSizeMax"]
    }
  }
}
```

You can save the previous JSON snippet to a standalone file or embed it in the *connector-metadata.json* file for the MQTT connector. If you embed it in the *connector-metadata.json* file, use the `additionalConfigurationSchema` property inside an `inboundEndpoints` array entry.


To learn more, see [Akri operator and connector contract > ADDITIONAL_CONNECTOR_CONFIGURATION](https://github.com/Azure/iot-operations-sdks/blob/main/doc/akri_connector/Akri%20operator%20and%20connector%20contract.md).

> **Note:**
> Currently, the extension only lets you preview a standalone `additionalConfig.json` file. The extension doesn't preview embedded additional configuration in the `connector-metadata.json` file.

## Publish metadata artifacts

Use the **Azure IoT Operations Akri connectors: Publish Akri Connector Image or Metadata** command to publish metadata folders to an ACR registry. The command uses the Azure CLI and `oras` commands. To publish to an ACR registry, you need your Azure subscription ID and ACR registry name. Currently, the extension expects files called `connector-metadata.json` and optionally `additionalConfig.json` to be present in any folder you push.


## Known Issues

- The configuration updates that result from the `Delete/Apply Asset/Device YAML` VS Code commands currently don't work in Windows due limitations of CIFS implementation in Linux kernel. Any file change events in mounted folders on the host aren't propagated to the container by Docker for Windows.

-  When you delete an asset or device from the cluster by using the VS Code commands, the .NET connector currently throws the following 404 error:

    ```
    Unhandled exception. Azure.Iot.Operations.Protocol.Retry.RetryExpiredException: Retry expired while attempting the operation. Last known exception is the inner exception.
    ---> Azure.Iot.Operations.Services.AssetAndDeviceRegistry.Models.AkriServiceErrorException: ApiError: assets.namespaces.deviceregistry.microsoft.com "my-rest-thermostat-asset2" not found: NotFound (ErrorResponse { status: "Failure", message: "assets.namespaces.deviceregistry.microsoft.com \"my-rest-thermostat-asset2\" not found", reason: "NotFound", code: 404 })
    at Azure.Iot.Operations.Services.AssetAndDeviceRegistry.AdrServiceClient.<>c__DisplayClass19_0.<<SetNotificationPreferenceForAssetUpdatesAsync>b__0>d.MoveNext()
    --- End of stack trace from previous location ---
    at Azure.Iot.Operations.Services.AssetAndDeviceRegistry.AdrServiceClient.RunWithRetryAsync[TResult](Func`1 taskFunc, CancellationToken cancellationToken)
    --- End of inner exception stack trace ---
    at Azure.Iot.Operations.Services.AssetAndDeviceRegistry.AdrServiceClient.RunWithRetryAsync[TResult](Func`1 taskFunc, CancellationToken cancellationToken)
    at Azure.Iot.Operations.Services.AssetAndDeviceRegistry.AdrServiceClient.SetNotificationPreferenceForAssetUpdatesAsync(String deviceName, String inboundEndpointName, String assetName, NotificationPreference notificationPreference, Nullable`1 commandTimeout, CancellationToken cancellationToken)
    at Azure.Iot.Operations.Connector.AdrClientWrapper.AssetFileChanged(Object sender, AssetFileChangedEventArgs e)
    at System.Threading.Tasks.Task.<>c.<ThrowAsync>b__128_1(Object state)
    at System.Threading.ThreadPoolWorkQueue.Dispatch()
    at System.Threading.PortableThreadPool.WorkerThread.WorkerThreadStart()
    ```

- Currently, launching the DevX image as a container from WSL without Docker Desktop installed causes the container to hang forever.
