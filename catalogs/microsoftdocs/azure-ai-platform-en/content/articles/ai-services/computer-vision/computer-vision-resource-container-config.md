---
title: Configure Read containers - Azure Vision in Foundry Tools
titleSuffix: Foundry Tools
description: This article shows you how to configure both required and optional settings for Read optical character recognition (OCR) containers in Azure Vision in Foundry Tools.
author: aahill
manager: mcleans
ms.service: azure-vision-foundry-tools
ms.topic: how-to
ms.date: 09/26/2025
ms.author: aahi
ms.custom: sfi-ropc-nochange
---

# Configure Read OCR Docker containers

You can configure Azure Vision in Foundry Tools Read OCR container's runtime environment by using the `docker run` command arguments. This container has some required settings, along with a few optional settings. Several [examples](#example-docker-commands) of the command are available. The container-specific settings are the billing settings. 

## Configuration settings


The container has the following configuration settings:

| Required | Setting | Purpose |
| --- | --- | --- |
| Yes | [ApiKey](#apikey-configuration-setting) | Tracks billing information. |
| No | [ApplicationInsights](#applicationinsights-setting) | Enables adding [Azure Application Insights](https://learn.microsoft.com/azure/application-insights) telemetry support to your container. |
| Yes | [Billing](#billing-configuration-setting) | Specifies the endpoint URI of the service resource on Azure. |
| Yes | [Eula](#eula-setting) | Indicates that you accepted the license for the container. |
| No | [Fluentd](#fluentd-settings) | Writes log and, optionally, metric data to a Fluentd server. |
| No | HTTP Proxy | Configures an HTTP proxy for making outbound requests. |
| No | [Logging](#logging-settings) | Provides ASP.NET Core logging support for your container. |
| No | [Mounts](#mount-settings) | Reads and writes data from the host computer to the container and from the container back to the host computer. |

> **Important:**
> The [`ApiKey`](#apikey-configuration-setting), [`Billing`](#billing-configuration-setting), and [`Eula`](#eula-setting) settings are used together, and you must provide valid values for all three of them; otherwise your container won't start. For more information about using these configuration settings to instantiate a container, see [Billing](computer-vision-how-to-install-containers.md).

The container also has the following container-specific configuration settings:

| Required | Setting | Purpose |
| --- | --- | --- |
| No | `ReadEngineConfig:ResultExpirationPeriod` | v2.0 containers only. Result expiration period in hours. The default is 48 hours. The setting specifies when the system should clear recognition results. For example, if `resultExpirationPeriod=1`, the system clears the recognition result 1 hour after the process. If `resultExpirationPeriod=0`, the system clears the recognition result after the result is retrieved. |
| No | `Cache:Redis` | v2.0 containers only. Enables Redis storage for storing results. A cache is *required* if multiple read OCR containers are placed behind a load balancer. |
| No | `Queue:RabbitMQ` | v2.0 containers only. Enables RabbitMQ for dispatching tasks. The setting is useful when multiple read OCR containers are placed behind a load balancer. |
| No | `Queue:Azure:QueueVisibilityTimeoutInMilliseconds` | v3.x containers only. The time for a message to be invisible when another worker is processing it. |
| No | `Storage::DocumentStore::MongoDB` | v2.0 containers only. Enables MongoDB for permanent result storage. |
| No | `Storage:ObjectStore:AzureBlob:ConnectionString` | v3.x containers only. Azure blob storage connection string. |
| No | `Storage:TimeToLiveInDays` | v3.x containers only. Result expiration period in days. The setting specifies when the system should clear recognition results. The default is two days, which means any result that's live for longer than that period isn't guaranteed to be successfully retrieved. The value is integer and it must be between one day to seven days. |
| No | `StorageTimeToLiveInMinutes` | v3.2-model-2021-09-30-preview and new containers. Result expiration period in minutes. The setting specifies when the system should clear recognition results. The default is two days (2,880 minutes), which means any result that's live for longer than that period isn't guaranteed to be successfully retrieved. The value is integer and it must be between 60 minutes to seven days (10080 minutes). |
| No | `Task:MaxRunningTimeSpanInMinutes` | v3.x containers only. Maximum running time for a single request. The default is 60 minutes. |
| No | `EnableSyncNTPServer` | v3.x containers only, except for v3.2-model-2021-09-30-preview and newer containers. Enables the NTP server synchronization mechanism, which ensures synchronization between the system time and expected task runtime. Note that this requires external network traffic. The default is `true`. |
| No | `NTPServerAddress` | v3.x containers only, except for v3.2-model-2021-09-30-preview and newer containers. NTP server for the time sync-up. The default is `time.windows.com`. |
| No | `Mounts:Shared` | v3.x containers only. Local folder for storing recognition result. The default is `/share`. For running container without using Azure blob storage, we recommend mounting a volume to this folder to ensure you have enough space for the recognition results. |

## ApiKey configuration setting

The `ApiKey` setting specifies the Vision resource key used to track billing information for the container. You must specify a value for the ApiKey and the value must be a valid key for the Vision resource specified for the [`Billing`](#billing-configuration-setting) configuration setting.

This setting can be found in the following place:

* Azure portal: **Foundry Tools** Resource Management, under **Keys**

## ApplicationInsights setting


The `ApplicationInsights` setting allows you to add [Azure Application Insights](https://learn.microsoft.com/azure/application-insights) telemetry support to your container. Application Insights provides in-depth monitoring of your container. You can easily monitor your container for availability, performance, and usage. You can also quickly identify and diagnose errors in your container.

The following table describes the configuration settings supported under the `ApplicationInsights` section.

| Required | Name | Data type | Description |
| --- | --- | --- | --- |
| No | `InstrumentationKey` | String | The instrumentation key of the Application Insights instance to which telemetry data for the container is sent. For more information, see [Application Insights for ASP.NET Core](https://learn.microsoft.com/azure/azure-monitor/app/asp-net-core). <br><br>Example:<br>`InstrumentationKey=123456789` |

## Billing configuration setting

The `Billing` setting specifies the endpoint URI of the _Foundry Tools_ resource on Azure used to meter billing information for the container. You must specify a value for this configuration setting, and the value must be a valid endpoint URI for a _Foundry Tools_ resource on Azure. The container reports usage about every 10 to 15 minutes.

This setting can be found in the following place:

* Azure portal: **Foundry Tools** Overview; labeled `Endpoint`

Remember to add the `vision/<version>` routing to the endpoint URI as shown in the following table. 

| Required | Name | Data type | Description |
| --- | --- | --- | --- |
| Yes | `Billing` | String | Billing endpoint URI<br><br>Example:<br>`Billing=https://westcentralus.api.cognitive.microsoft.com/vision/v3.2` |

## EULA setting


The `Eula` setting indicates that you've accepted the license for the container. You must specify a value for this configuration setting, and the value must be set to `accept`.

| Required | Name | Data type | Description |
| --- | --- | --- | --- |
| Yes | `Eula` | String | License acceptance<br><br>Example:<br>`Eula=accept` |

Foundry Tools containers are licensed under [your agreement](https://go.microsoft.com/fwlink/?linkid=2018657) governing your use of Azure. If you do not have an existing agreement governing your use of Azure, you agree that your agreement governing use of Azure is the [Microsoft Online Subscription Agreement](https://go.microsoft.com/fwlink/?linkid=2018755), which incorporates the [Online Services Terms](https://go.microsoft.com/fwlink/?linkid=2018760). For previews, you also agree to the [Supplemental Terms of Use for Microsoft Azure Previews](https://go.microsoft.com/fwlink/?linkid=2018815). By using the container you agree to these terms.


## Fluentd settings


Fluentd is an open-source data collector for unified logging. The `Fluentd` settings manage the container's connection to a [Fluentd](https://www.fluentd.org) server. The container includes a Fluentd logging provider, which allows your container to write logs and, optionally, metric data to a Fluentd server.

The following table describes the configuration settings supported under the `Fluentd` section.

| Name | Data type | Description |
| --- | --- | --- |
| `Host` | String | The IP address or DNS host name of the Fluentd server. |
| `Port` | Integer | The port of the Fluentd server.<br/> The default value is 24224. |
| `HeartbeatMs` | Integer | The heartbeat interval, in milliseconds. If no event traffic has been sent before this interval expires, a heartbeat is sent to the Fluentd server. The default value is 60000 milliseconds (1 minute). |
| `SendBufferSize` | Integer | The network buffer space, in bytes, allocated for send operations. The default value is 32768 bytes (32 kilobytes). |
| `TlsConnectionEstablishmentTimeoutMs` | Integer | The timeout, in milliseconds, to establish a SSL/TLS connection with the Fluentd server. The default value is 10000 milliseconds (10 seconds).<br/> If `UseTLS` is set to false, this value is ignored. |
| `UseTLS` | Boolean | Indicates whether the container should use SSL/TLS for communicating with the Fluentd server. The default value is false. |

## HTTP proxy credentials settings


If you need to configure an HTTP proxy for making outbound requests, use these two arguments:

| Name | Data type | Description |
| --- | --- | --- |
| HTTP_PROXY | string | The proxy to use, for example, `http://proxy:8888`<br>`<proxy-url>` |
| HTTP_PROXY_CREDS | string | Any credentials needed to authenticate against the proxy, for example, `username:password`. This value **must be in lowercase**. |
| `<proxy-user>` | string | The user for the proxy. |
| `<proxy-password>` | string | The password associated with `<proxy-user>` for the proxy. |

```bash
docker run --rm -it -p 5000:5000 \
--memory 2g --cpus 1 \
--mount type=bind,src=/home/azureuser/output,target=/output \
<registry-location>/<image-name> \
Eula=accept \
Billing=<endpoint> \
ApiKey=<api-key> \
HTTP_PROXY=<proxy-url> \
HTTP_PROXY_CREDS=<proxy-user>:<proxy-password>
```


## Logging settings
 

The `Logging` settings manage ASP.NET Core logging support for your container. You can use the same configuration settings and values for your container that you use for an ASP.NET Core application. 

The following logging providers are supported by the container:

| Provider | Purpose |
| --- | --- |
| [Console](https://learn.microsoft.com/aspnet/core/fundamentals/logging/#console-provider) | The ASP.NET Core `Console` logging provider. All of the ASP.NET Core configuration settings and default values for this logging provider are supported. |
| [Debug](https://learn.microsoft.com/aspnet/core/fundamentals/logging/#debug-provider) | The ASP.NET Core `Debug` logging provider. All of the ASP.NET Core configuration settings and default values for this logging provider are supported. |
| [Disk](#disk-logging) | The JSON logging provider. This logging provider writes log data to the output mount. |

This container command stores logging information in the JSON format to the output mount:

```bash
docker run --rm -it -p 5000:5000 \
--memory 2g --cpus 1 \
--mount type=bind,src=/home/azureuser/output,target=/output \
<registry-location>/<image-name> \
Eula=accept \
Billing=<endpoint> \
ApiKey=<api-key> \
Logging:Disk:Format=json \
Mounts:Output=/output
```

This container command shows debugging information, prefixed with `dbug`, while the container is running:

```bash
docker run --rm -it -p 5000:5000 \
--memory 2g --cpus 1 \
<registry-location>/<image-name> \
Eula=accept \
Billing=<endpoint> \
ApiKey=<api-key> \
Logging:Console:LogLevel:Default=Debug
```

### Disk logging

The `Disk` logging provider supports the following configuration settings:

| Name | Data type | Description |
| --- | --- | --- |
| `Format` | String | The output format for log files.<br/> **Note:** This value must be set to `json` to enable the logging provider. If this value is specified without also specifying an output mount while instantiating a container, an error occurs. |
| `MaxFileSize` | Integer | The maximum size, in megabytes (MB), of a log file. When the size of the current log file meets or exceeds this value, a new log file is started by the logging provider. If -1 is specified, the size of the log file is limited only by the maximum file size, if any, for the output mount. The default value is 1. |

For more information about configuring ASP.NET Core logging support, see [Settings file configuration](https://learn.microsoft.com/aspnet/core/fundamentals/logging/).

## Mount settings

Use bind mounts to read and write data to and from the container. You can specify an input mount or output mount by specifying the `--mount` option in the [docker run](https://docs.docker.com/engine/reference/commandline/run/) command.

The Azure Vision containers don't use input or output mounts to store training or service data. 

The exact syntax of the host mount location varies depending on the host operating system. Additionally, the [host computer](computer-vision-how-to-install-containers.md#host-computer-requirements)'s mount location might not be accessible due to a conflict between permissions used by the Docker service account and the host mount location permissions. 

| Optional | Name | Data type | Description |
| --- | --- | --- | --- |
| Not allowed | `Input` | String | Azure Vision containers don't use this field. |
| Optional | `Output` | String | The target of the output mount. The default value is `/output`. This is the location of the logs. This includes container logs. <br><br>Example:<br>`--mount type=bind,src=c:\output,target=/output` |

## Example docker commands

The following examples use the configuration settings to illustrate how to write and use `docker run` commands. Once running, the container continues to run until you [stop](computer-vision-how-to-install-containers.md#stop-the-container) it.

* **Line-continuation character**: The Docker commands in the following sections use the back slash, `\`, as a line continuation character. Replace or remove this based on your host operating system's requirements. 
* **Argument order**: Do not change the order of the arguments unless you're familiar with Docker containers.

Replace {_argument_name_} with your own values:

| Placeholder | Value | Format or example |
| --- | --- | --- |
| **{API_KEY}** | The endpoint key of the Vision resource on the resource keys page. | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| **{ENDPOINT_URI}** | The billing endpoint value is available on the resource overview page. | See [gather required parameters](computer-vision-how-to-install-containers.md#gather-required-parameters) for explicit examples. |


> **Note:**
> New resources created after July 1, 2019, will use custom subdomain names. For more information and a complete list of regional endpoints, see [Custom subdomain names for Foundry Tools](https://learn.microsoft.com/azure/cognitive-services/cognitive-services-custom-subdomains).


> **Important:**
> The `Eula`, `Billing`, and `ApiKey` options must be specified to run the container; otherwise, the container won't start. For more information, see [Billing](computer-vision-how-to-install-containers.md#billing).
>
> The ApiKey value is the **Key** from the Vision resource keys page.

## Container Docker examples

The following Docker examples are for the Read OCR container.


# [Version 3.2](#tab/version-3-2)

### Basic example

```bash
docker run --rm -it -p 5000:5000 --memory 16g --cpus 8 \
mcr.microsoft.com/azure-cognitive-services/vision/read:3.2-model-2022-04-30 \
Eula=accept \
Billing={ENDPOINT_URI} \
ApiKey={API_KEY}

```

### Logging example 

```bash
docker run --rm -it -p 5000:5000 --memory 16g --cpus 8 \
mcr.microsoft.com/azure-cognitive-services/vision/read:3.2-model-2022-04-30 \
Eula=accept \
Billing={ENDPOINT_URI} \
ApiKey={API_KEY}
Logging:Console:LogLevel:Default=Information
```

# [Version 2.0-preview](#tab/version-2)

### Basic example

```bash
docker run --rm -it -p 5000:5000 --memory 16g --cpus 8 \
mcr.microsoft.com/azure-cognitive-services/vision/read:2.0-preview \
Eula=accept \
Billing={ENDPOINT_URI} \
ApiKey={API_KEY}

```

### Logging example 

```bash
docker run --rm -it -p 5000:5000 --memory 16g --cpus 8 \
mcr.microsoft.com/azure-cognitive-services/vision/read:2.0-preview \
Eula=accept \
Billing={ENDPOINT_URI} \
ApiKey={API_KEY}
Logging:Console:LogLevel:Default=Information
```

---

## Next step

> [div class="nextstepaction"]
> Review [How to install and run containers](computer-vision-how-to-install-containers.md).
