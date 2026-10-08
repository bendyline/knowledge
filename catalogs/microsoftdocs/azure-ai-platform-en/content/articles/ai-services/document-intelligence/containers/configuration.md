---
title: Configure Document Intelligence containers
titleSuffix: Foundry Tools
description: Learn how to configure the Document Intelligence container to parse form and table data.
author: laujan
manager: mcleans
ms.service: azure-document-intelligence-foundry-tools
ms.topic: how-to
ms.date: 08/15/2026
ms.author: lajanuar
---



# Configure Document Intelligence containers

**Applies to: doc-intel-2.1.0**

Support for containers is currently available with Document Intelligence version `2022-08-31 (GA)` for all models, `2023-07-31 (GA)` for Read, Layout, Invoice, Receipt, and ID Document models, and `2024-11-30 (GA)` for Read and Layout model:

* [REST API `2022-08-31 (GA)`](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-v3.0%20\(2022-08-31\)\&preserve-view=true\&tabs=HTTP)
* [REST API `2023-07-31 (GA)`](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-v3.1%20\(2023-07-31\)\&tabs=HTTP\&preserve-view=true)
* [REST API `2024-11-30 (GA)`](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-v4.0%20\(2024-11-30\)\&tabs=HTTP\&preserve-view=true)
* [Client libraries targeting `REST API 2022-08-31 (GA)`](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-0.md)
* [Client libraries targeting `REST API 2023-07-31 (GA)`](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-1.md)
* [Client libraries targeting `REST API 2024-11-30 (GA)`](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v4-0.md)


✔️ See [**Configure Document Intelligence v3.0 containers**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/containers/configuration.md?view=doc-intel-3.0.0\&preserve-view=true) or [**Configure Document Intelligence v3.1 containers**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/containers/configuration.md?view=doc-intel-3.1.0\&preserve-view=true) or [**Configure Document Intelligence v4.0 containers**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/containers/configuration.md?view=doc-intel-4.0.0\&preserve-view=true) for supported versions of container documentation.



**Applies to: \>=doc-intel-3.0.0**

**This content applies to:** 🟩 **v3.0 (GA)** 🟩 **v3.1 (GA)** 🟩 **v4.0 (GA)**

With Document Intelligence containers, you can build an application architecture optimized to take advantage of both robust cloud capabilities and edge locality. Containers provide a minimalist, isolated environment that can be easily deployed on-premises and in the cloud. In this article, we show you how to configure the Document Intelligence container run-time environment by using the `docker compose` command arguments. Document Intelligence features are supported by seven Document Intelligence feature containers—**Read**, **Layout**, **Business Card**,**ID Document**,  **Receipt**, **Invoice**, **Custom**. These containers have both required and optional settings. For a few examples, see the [Example docker-compose.yml file](#example-docker-composeyml-file) section.

> **Important:**
>
> Document Intelligence v4.0 container is currently available for Read and Layout model only.

## Configuration settings

Each container has the following configuration settings:

| Required | Setting | Purpose |
| --- | --- | --- |
| Yes | [Key](#key-and-billing-configuration-setting) | Tracks billing information. |
| Yes | [Billing](#key-and-billing-configuration-setting) | Specifies the endpoint URI of the service resource on Azure. For more information, _see_ [Billing](install-run.md#billing). For more information and a complete list of regional endpoints, _see_ [Custom subdomain names for Foundry Tools](../../cognitive-services-custom-subdomains.md). |
| Yes | [Eula](#eula-setting) | Indicates that you accepted the license for the container. |
| No | [ApplicationInsights](#applicationinsights-setting) | Enables adding [Azure Application Insights](https://learn.microsoft.com/azure/application-insights) customer support for your container. |
| No | [Fluentd](#fluentd-settings) | Writes log and, optionally, metric data to a Fluentd server. |
| No | HTTP Proxy | Configures an HTTP proxy for making outbound requests. |
| No | [Logging](#logging-settings) | Provides ASP.NET Core logging support for your container. |

> **Important:**
> The [`Key`](#key-and-billing-configuration-setting), [`Billing`](#key-and-billing-configuration-setting), and [`Eula`](#eula-setting) settings are used together. You must provide valid values for all three settings; otherwise, your containers won't start. For more information about using these configuration settings to instantiate a container, see [Billing](install-run.md#billing).

## Key and Billing configuration setting

The `Key` setting specifies the Azure resource key that is used to track billing information for the container. The value for the Key must be a valid key for the resource that is specified for `Billing` in the "Billing configuration setting" section.

The `Billing` setting specifies the endpoint URI of the resource on Azure that is used to meter billing information for the container. The value for this configuration setting must be a valid endpoint URI for a resource on Azure. The container reports usage about every 10 to 15 minutes.

 You can find these settings in the Azure portal on the **Keys and Endpoint** page.

   Screenshot of Azure portal keys and endpoint page.

## `EULA` setting


The `Eula` setting indicates that you've accepted the license for the container. You must specify a value for this configuration setting, and the value must be set to `accept`.

| Required | Name | Data type | Description |
| --- | --- | --- | --- |
| Yes | `Eula` | String | License acceptance<br><br>Example:<br>`Eula=accept` |

Foundry Tools containers are licensed under [your agreement](https://go.microsoft.com/fwlink/?linkid=2018657) governing your use of Azure. If you do not have an existing agreement governing your use of Azure, you agree that your agreement governing use of Azure is the [Microsoft Online Subscription Agreement](https://go.microsoft.com/fwlink/?linkid=2018755), which incorporates the [Online Services Terms](https://go.microsoft.com/fwlink/?linkid=2018760). For previews, you also agree to the [Supplemental Terms of Use for Microsoft Azure Previews](https://go.microsoft.com/fwlink/?linkid=2018815). By using the container you agree to these terms.


## ApplicationInsights setting


The `ApplicationInsights` setting allows you to add [Azure Application Insights](https://learn.microsoft.com/azure/application-insights) telemetry support to your container. Application Insights provides in-depth monitoring of your container. You can easily monitor your container for availability, performance, and usage. You can also quickly identify and diagnose errors in your container.

The following table describes the configuration settings supported under the `ApplicationInsights` section.

| Required | Name | Data type | Description |
| --- | --- | --- | --- |
| No | `InstrumentationKey` | String | The instrumentation key of the Application Insights instance to which telemetry data for the container is sent. For more information, see [Application Insights for ASP.NET Core](https://learn.microsoft.com/azure/azure-monitor/app/asp-net-core). <br><br>Example:<br>`InstrumentationKey=123456789` |

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

## Volume settings

Use [**volumes**](https://docs.docker.com/storage/volumes/) to read and write data to and from the container. Volumes are the preferred for persisting data generated and used by Docker containers. You can specify an input mount or an output mount by including the `volumes` option and specifying `type` (bind), `source` (path to the folder), and `target` (file path parameter).

The Document Intelligence container requires an input volume and an output volume. The input volume can be read-only (`ro`), and is required for access to the data that is used for training and scoring. The output volume has to be writable, and you use it to store the models and temporary data.

The exact syntax of the host volume location varies depending on the host operating system. Additionally, the volume location of the [host computer](install-run.md#host-computer-requirements) might not be accessible because of a conflict between the Docker service account permissions and the host mount location permissions.

## Example docker-compose.yml file

The **docker compose** method is built from three steps:

 1. Create a Dockerfile.
 1. Define the services in a **docker-compose.yml** so they can be run together in an isolated environment.
 1. Run `docker-compose up` to start and run your services.

### Single container example

In this example, enter {FORM_RECOGNIZER_ENDPOINT_URI} and {FORM_RECOGNIZER_KEY} values for your Layout container instance.

#### **Layout container**

```yml
version: "3.9"
services:
  azure-cognitive-service-layout:
    container_name: azure-cognitive-service-layout
    image: mcr.microsoft.com/azure-cognitive-services/form-recognizer/layout
    environment:
      - EULA=accept
      - billing={FORM_RECOGNIZER_ENDPOINT_URI}
      - key={FORM_RECOGNIZER_KEY}

    ports:
      - "5000"
    networks:
      - ocrvnet
networks:
  ocrvnet:
    driver: bridge
```

### Multiple containers example

#### **Receipt and OCR Read containers**

In this example, enter {FORM_RECOGNIZER_ENDPOINT_URI} and {FORM_RECOGNIZER_KEY} values for your Receipt container and {COMPUTER_VISION_ENDPOINT_URI} and {COMPUTER_VISION_KEY} values for your Azure Vision Read container.

```yml
version: "3"
services:
  azure-cognitive-service-receipt:
    container_name: azure-cognitive-service-receipt
    image: cognitiveservicespreview.azurecr.io/microsoft/cognitive-services-form-recognizer-receipt:2.1
    environment:
      - EULA=accept
      - billing={FORM_RECOGNIZER_ENDPOINT_URI}
      - key={FORM_RECOGNIZER_KEY}
      - AzureCognitiveServiceReadHost=http://azure-cognitive-service-read:5000
    ports:
      - "5000:5050"
    networks:
      - ocrvnet
  azure-cognitive-service-read:
    container_name: azure-cognitive-service-read
    image: mcr.microsoft.com/azure-cognitive-services/vision/read:3.2
    environment:
      - EULA=accept
      - billing={COMPUTER_VISION_ENDPOINT_URI}
      - key={COMPUTER_VISION_KEY}
    networks:
      - ocrvnet

networks:
  ocrvnet:
    driver: bridge
```

## Next steps

> 
> [Learn more about running multiple containers and the docker compose command](install-run.md)

* [Azure container instance recipe](../../containers/azure-container-instance-recipe.md)
