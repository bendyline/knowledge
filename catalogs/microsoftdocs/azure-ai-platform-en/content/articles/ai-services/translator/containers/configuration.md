---
title: Configure containers - Azure Translator
titleSuffix: Foundry Tools
description: The Azure Translator container runtime environment is configured using the `docker run` command arguments. There are both required and optional settings.
author: laujan
manager: mcleans
ms.service: azure-translator-foundry-tools
ms.topic: how-to
ms.date: 07/31/2026
ms.author: lajanuar
ai-usage: ai-assisted
recommendations: false
---

# Configure Azure Translator Docker containers

Foundry Tools offer a unified configuration framework for all containers. You can easily configure your Translator containers to create a Translator application architecture that's optimized for both robust cloud features and edge locality deployment.

The **Azure Translator** container runtime environment is configured using the `docker run` command arguments. This container includes both required and optional settings. The required settings specific to the container are the billing settings.

## Configuration settings

The container has the following configuration settings:

| Required | Setting | Purpose |
| --- | --- | --- |
| Yes | [ApiKey](#apikey-configuration-setting) | Tracks billing information. |
| No | [ApplicationInsights](#applicationinsights-setting) | Enables adding [Azure Application Insights](https://learn.microsoft.com/azure/application-insights) telemetric support to your container. |
| Yes | [Billing](#billing-configuration-setting) | Specifies the endpoint URI of the service resource on Azure. |
| Yes | [EULA](#eula-setting) | Indicates that you accepted the end-user license agreement (EULA) for the container. |
| No | [Fluentd](#fluentd-settings) | Writes log and, optionally, metric data to a Fluentd server. |
| No | HTTP Proxy | Configures an HTTP proxy for making outbound requests. |
| No | [Logging](#logging-settings) | Provides ASP.NET Core logging support for your container. |
| Yes | [Mounts](#mount-settings) | Reads and writes data from the host computer to the container and from the container back to the host computer. |

 > **Important:**
 > The [**ApiKey**](#apikey-configuration-setting), [**Billing**](#billing-configuration-setting), and [**EULA**](#eula-setting) settings are used together, and you must provide valid values for all three of them; otherwise your container can't start. For more information about using these configuration settings to instantiate a container, *see* [Install and run Azure Translator container](install-run.md).

## ApiKey configuration setting

The `ApiKey` setting specifies the Azure resource key used to track billing information for the container. You must specify a value for the ApiKey and the value must be a valid key for the _Translator_ resource specified for the [`Billing`](#billing-configuration-setting) configuration setting.

This setting can be found in the following place:

* Azure portal: **Translator** resource management, under **Keys**

## ApplicationInsights setting


The `ApplicationInsights` setting allows you to add [Azure Application Insights](https://learn.microsoft.com/azure/application-insights) telemetry support to your container. Application Insights provides in-depth monitoring of your container. You can easily monitor your container for availability, performance, and usage. You can also quickly identify and diagnose errors in your container.

The following table describes the configuration settings supported under the `ApplicationInsights` section.

| Required | Name | Data type | Description |
| --- | --- | --- | --- |
| No | `InstrumentationKey` | String | The instrumentation key of the Application Insights instance to which telemetry data for the container is sent. For more information, see [Application Insights for ASP.NET Core](https://learn.microsoft.com/azure/azure-monitor/app/asp-net-core). <br><br>Example:<br>`InstrumentationKey=123456789` |

## Billing configuration setting

The `Billing` setting specifies the endpoint URI of the _Translator_ resource on Azure used to meter billing information for the container. You must specify a value for this configuration setting, and the value must be a valid endpoint URI for a _Translator_ resource on Azure. The container reports usage about every 10 to 15 minutes.

This setting can be found in the following place:

* Azure portal: **Translator** Overview page labeled `Endpoint`

| Required | Name | Data type | Description |
| --- | --- | --- | --- |
| Yes | `Billing` | String | Billing endpoint URI. For more information on obtaining the billing URI, see [gathering required parameters](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/translator/containers/translator-how-to-install-container.md#required-input). For more information and a complete list of regional endpoints, see [Custom subdomain names for Foundry Tools](../../cognitive-services-custom-subdomains.md). |

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

## HTTP/HTTPS proxy credentials settings

If you need to configure an HTTP proxy for making outbound requests, use these two arguments:

| Name | Data type | Description |
| --- | --- | --- |
| HTTPS_PROXY | string | The proxy URL, for example, `https://proxy:8888` |

```bash
docker run --rm -it -p 5000:5000 \
--memory 2g --cpus 1 \
--mount type-bind,src=/home/azureuser/output,target=/output \
<registry-location>/<image-name> \
Eula=accept \
Billing=<endpoint> \
ApiKey=<api-key> \
HTTPS_PROXY=<proxy-url>
```

## Logging settings

Translator containers support the following logging providers:

| Provider | Purpose |
| --- | --- |
| [Console](https://learn.microsoft.com/aspnet/core/fundamentals/logging/#console-provider) | The ASP.NET Core `Console` logging provider. All of the ASP.NET Core configuration settings and default values for this logging provider are supported. |
| [Debug](https://learn.microsoft.com/aspnet/core/fundamentals/logging/#debug-provider) | The ASP.NET Core `Debug` logging provider. All of the ASP.NET Core configuration settings and default values for this logging provider are supported. |
| [Disk](#disk-logging) | The JSON logging provider. This logging provider writes log data to the output mount. |

* The `Logging` settings manage ASP.NET Core logging support for your container. You can use the same configuration settings and values for your container that you use for an ASP.NET Core application.

* The `Logging.LogLevel` specifies the minimum level to log. The severity of the `LogLevel` ranges from 0 to 6. When a `LogLevel` is specified, logging is enabled for messages at the specified level and higher: Trace = 0, Debug = 1, Information = 2, Warning = 3, Error = 4, Critical = 5, None = 6.

* Currently, Translator containers have the ability to restrict logs at the **Warning** LogLevel or higher.

The general command syntax for logging is as follows:

```bash
    -Logging:LogLevel:{Provider}={FilterSpecs}
```

The following command starts the Docker container with the `LogLevel` set to **Warning** and logging provider set to **Console**. This command prints anomalous or unexpected events during the application flow to the console:

```bash
docker run --rm -it -p 5000:5000
-v /mnt/d/TranslatorContainer:/usr/local/models \
-e apikey={API_KEY} \
-e eula=accept \
-e billing={ENDPOINT_URI} \
-e Languages=en,fr,es,ar,ru  \
-e Logging:LogLevel:Console="Warning"
mcr.microsoft.com/azure-cognitive-services/translator/text-translation:latest

```

### Disk logging

The `Disk` logging provider supports the following configuration settings:

| Name | Data type | Description |
| --- | --- | --- |
| `Format` | String | The output format for log files.<br/> **Note:** This value must be set to `json` to enable the logging provider. If this value is specified without also specifying an output mount while instantiating a container, an error occurs. |
| `MaxFileSize` | Integer | The maximum size, in megabytes (MB), of a log file. When the size of the current log file meets or exceeds this value, the logging provider starts a new log file. If -1 is specified, the size of the log file is limited only by the maximum file size, if any, for the output mount. The default value is 1. |

#### Disk provider example

```bash
docker run --rm -it -p 5000:5000 \
--memory 2g --cpus 1 \
--mount type-bind,src=/home/azureuser/output,target=/output \
-e apikey={API_KEY} \
-e eula=accept \
-e billing={ENDPOINT_URI} \
-e Languages=en,fr,es,ar,ru  \
Eula=accept \
Billing=<endpoint> \
ApiKey=<api-key> \
Logging:Disk:Format=json \
Mounts:Output=/output
```

For more information about configuring ASP.NET Core logging support, see [Settings file configuration](https://learn.microsoft.com/aspnet/core/fundamentals/logging/).

## Mount settings

Use bind mounts to read and write data to and from the container. You can specify an input mount or output mount by specifying the `--mount` option in the [docker run](https://docs.docker.com/engine/reference/commandline/run/) command.

## Next steps

> 
> [Learn more about Foundry Tools containers](../../cognitive-services-container-support.md?context=/azure/foundry-classic/context/context)
