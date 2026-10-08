---
title: Configure Speech containers
titleSuffix: Foundry Tools
description: Speech service provides each container with a common configuration framework, so that you can easily configure and manage storage, logging, and security settings for your containers.
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 09/02/2026
ms.author: pafarley
ms.custom: doc-kit-assisted
ai-usage: ai-assisted
#Customer intent: As a developer, I want to learn how to configure Speech containers.
---

# Configure Speech service containers

Speech containers enable customers to build one speech application architecture that is optimized to take advantage of both robust cloud capabilities and edge locality. 

Configure the Speech container runtime environment with `docker run` command arguments. The following sections describe billing, logging, volume mounts, and the cache settings required for real-time diarization.

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

> **Note:**
> Speech-to-text containers that enable real-time diarization also require the settings described in [Real-time diarization cache settings](#real-time-diarization-cache-settings).

> **Important:**
> The [`ApiKey`](#apikey-configuration-setting), [`Billing`](#billing-configuration-setting), and [`Eula`](#eula-setting) settings are used together, and you must provide valid values for all three of them; otherwise your container won't start. For more information about using these configuration settings to instantiate a container, see [Billing](speech-container-overview.md#billing-information).

## ApiKey configuration setting

The `ApiKey` setting specifies the Azure resource key used to track billing information for the container. You must specify a value for the ApiKey and the value must be a valid key for the _Speech_ resource specified for the [`Billing`](#billing-configuration-setting) configuration setting.

This setting can be found in the following place:

- Azure portal: **Speech** Resource Management, under **Keys**

## ApplicationInsights setting


The `ApplicationInsights` setting allows you to add [Azure Application Insights](https://learn.microsoft.com/azure/application-insights) telemetry support to your container. Application Insights provides in-depth monitoring of your container. You can easily monitor your container for availability, performance, and usage. You can also quickly identify and diagnose errors in your container.

The following table describes the configuration settings supported under the `ApplicationInsights` section.

| Required | Name | Data type | Description |
| --- | --- | --- | --- |
| No | `InstrumentationKey` | String | The instrumentation key of the Application Insights instance to which telemetry data for the container is sent. For more information, see [Application Insights for ASP.NET Core](https://learn.microsoft.com/azure/azure-monitor/app/asp-net-core). <br><br>Example:<br>`InstrumentationKey=123456789` |

## Billing configuration setting

The `Billing` setting specifies the endpoint URI of the _Speech_ resource on Azure used to meter billing information for the container. You must specify a value for this configuration setting, and the value must be a valid endpoint URI for a _Speech_ resource on Azure. The container reports usage about every 10 to 15 minutes.

This setting can be found in the following place:

- Azure portal: Labeled `Endpoint` on the **Speech** overview page

| Required | Name | Data type | Description |
| --- | --- | --- | --- |
| Yes | `Billing` | String | Billing endpoint URI. For more information on obtaining the billing URI, see [billing](speech-container-overview.md#billing-information). For more information and a complete list of regional endpoints, see [Custom subdomain names for Foundry Tools](../cognitive-services-custom-subdomains.md). |

## Eula setting


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

## Real-time diarization cache settings

For generally available real-time diarization, use speech-to-text container version 5.1.0 or later. Connected and disconnected speech-to-text containers require a customer-operated Redis-compatible cache whenever you enable real-time diarization, including for audio shorter than four hours. Fast transcription containers don't require this cache. Configure both settings for proper real-time diarization functionality. For setup and validation, see [Configure a cache for speech container diarization](speech-container-speech-to-text-diarization-cache.md).

By default, the cache retains four hours of diarization data. For audio beyond four hours, the oldest cached data begins to be discarded, which might reduce speaker association or labeling quality. This retention behavior doesn't end the diarization session or prevent longer audio from running.

| Requirement | Name | Data type | Description |
| --- | --- | --- | --- |
| Required for real-time diarization | `InClusterRedisCacheEnabled` | Boolean | Set to `true` to enable the required Redis-compatible cache. |
| Required for real-time diarization | `InClusterRedisCacheEndpoint` | String | Set to the reachable cache endpoint in `<host-or-ip>:<port>` format. |

Add both settings to the speech-to-text container startup command:

```bash
InClusterRedisCacheEnabled=true \
InClusterRedisCacheEndpoint=<host-or-ip>:<port>
```

## Mount settings

Use bind mounts to read and write data to and from the container. You can specify an input mount or output mount by specifying the `--mount` option in the [docker run](https://docs.docker.com/engine/reference/commandline/run/) command.

The Standard Speech containers don't use input or output mounts to store training or service data. However, custom speech containers rely on volume mounts.

The exact syntax of the host mount location varies depending on the host operating system. Additionally, the [host computer](speech-container-howto.md#host-computer-requirements-and-recommendations)'s mount location might not be accessible due to a conflict between permissions used by the docker service account and the host mount location permissions.

| Optional | Name | Data type | Description |
| --- | --- | --- | --- |
| Not allowed | `Input` | String | Standard Speech containers don't use this. Custom speech containers use [volume mounts](#volume-mount-settings). |
| Optional | `Output` | String | The target of the output mount. The default value is `/output`. This is the location of the logs. This includes container logs. <br><br>Example:<br>`--mount type=bind,src=c:\output,target=/output` |

## Volume mount settings

The custom speech containers use [volume mounts](https://docs.docker.com/storage/volumes/) to persist custom models. You can specify a volume mount by adding the `-v` (or `--volume`) option to the [docker run](https://docs.docker.com/engine/reference/commandline/run/) command.

> **Note:**
> The volume mount settings are only applicable for [custom speech to text](speech-container-cstt.md) containers. 

Custom models are downloaded the first time that a new model is ingested as part of the custom speech container `docker run` command. Sequential runs of the same `ModelId` for a custom speech container uses the previously downloaded model. If the volume mount isn't provided, custom models can't be persisted.

The volume mount setting consists of three colon-separated fields:

1. The first field is the name of the volume on the host machine, for example _C:\input_.
2. The second field is the directory in the container, for example _/usr/local/models_.
3. The third field (optional) is a comma-separated list of options, for more information, see [use volumes](https://docs.docker.com/storage/volumes/).

Here's a volume mount example that mounts the host machine _C:\input_ directory to the containers _/usr/local/models_ directory.

```bash
-v C:\input:/usr/local/models
```


## Next steps

- Review [How to install and run containers](speech-container-howto.md)
