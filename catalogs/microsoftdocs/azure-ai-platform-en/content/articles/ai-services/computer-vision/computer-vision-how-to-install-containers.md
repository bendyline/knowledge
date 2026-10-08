---
title: Azure Vision in Foundry Tools 3.2 GA Read OCR container
titleSuffix: Foundry Tools
description: Use the Read 3.2 OCR containers from Azure Vision in Foundry Tools to extract text from images and documents, on-premises.
author: PatrickFarley
manager: mcleans
ms.service: azure-vision-foundry-tools
ms.topic: how-to
ms.date: 09/26/2025
ms.author: pafarley
keywords: on-premises, OCR, Docker, container
---

# Install Azure Vision in Foundry Tools 3.2 GA Read OCR container

Containers let you run Azure Vision in Foundry Tools APIs in your own environment and can help you meet specific security and data governance requirements. In this article you learn how to download, install, and run the Azure Vision Read (OCR) container.

The Read container allows you to extract printed and handwritten text from images and documents in JPEG, PNG, BMP, PDF, and TIFF file formats. For more information on the Read service, see the [Read API how-to guide](how-to/call-read-api.md).

## What's new
The `3.2-model-2022-04-30` GA version of the Read container is available with support for [164 languages and other enhancements](whats-new.md#may-2022). If you're an existing customer, follow the [download instructions](#get-the-container-image) to get started.

The Read 3.2 OCR container is the latest GA model and provides:
* New models for enhanced accuracy.
* Support for multiple languages within the same document.
* Support for a total of 164 languages. See the full list of [OCR-supported languages](language-support.md#optical-character-recognition-ocr).
* A single operation for both documents and images.
* Support for larger documents and images.
* Confidence scores.
* Support for documents with both print and handwritten text.
* Ability to extract text from only selected pages in a document.
* Choose text line output order from default to a more natural reading order for Latin languages only.
* Text line classification as handwritten style or not for Latin languages only.

If you're using the Read 2.0 container today, see the [migration guide](read-container-migration-guide.md) to learn about changes in the new versions.

## Prerequisites

You must meet the following prerequisites before using the containers:

| Required | Purpose |
| --- | --- |
| Docker Engine | You need the Docker Engine installed on a [host computer](#host-computer-requirements). Docker provides packages that configure the Docker environment on [macOS](https://docs.docker.com/docker-for-mac/), [Windows](https://docs.docker.com/docker-for-windows/), and [Linux](https://docs.docker.com/engine/install/#server). For a primer on Docker and container basics, see the [Docker overview](https://docs.docker.com/engine/docker-overview/).<br><br> Docker must be configured to allow the containers to connect with and send billing data to Azure. <br><br> **On Windows**, Docker must also be configured to support Linux containers.<br><br> |
| Familiarity with Docker | You should have a basic understanding of Docker concepts, like registries, repositories, containers, and container images, as well as knowledge of basic `docker` commands. |
| Computer Vision resource | In order to use the container, you must have:<br><br>A **Computer Vision** resource and the associated API key the endpoint URI. Both values are available on the Overview and Keys pages for the resource and are required to start the container.<br><br>**{API_KEY}**: One of the two available resource keys on the **Keys** page<br><br>**{ENDPOINT_URI}**: The endpoint as provided on the **Overview** page |

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.


## Gather required parameters

Three primary parameters for all Azure AI containers are required. The Microsoft Software License Terms must be present with a value of **accept**. An Endpoint URI and API key are also needed.

### Endpoint URI

The `{ENDPOINT_URI}` value is available on the Azure portal **Overview** page of the corresponding Foundry Tools resource. Go to the **Overview** page, hover over the endpoint, and a **Copy to clipboard** <span class="docon docon-edit-copy x-hidden-focus"></span> icon appears. Copy and use the endpoint where needed.

Screenshot that shows gathering the endpoint URI for later use.

### Keys

The `{API_KEY}` value is used to start the container and is available on the Azure portal's **Keys** page of the corresponding Foundry Tools resource. Go to the **Keys** page, and select the **Copy to clipboard** <span class="docon docon-edit-copy x-hidden-focus"></span> icon.

Screenshot that shows getting one of the two keys for later use.

> **Important:**
> These subscription keys are used to access your Foundry Tools API. Don't share your keys. Store them securely. For example, use Azure Key Vault. We also recommend that you regenerate these keys regularly. Only one key is necessary to make an API call. When you regenerate the first key, you can use the second key for continued access to the service.


### Host computer requirements


The host is an x64-based computer that runs the Docker container. It can be a computer on your premises or a Docker hosting service in Azure, such as:

* [Azure Kubernetes Service](https://learn.microsoft.com/azure/aks/).
* [Azure Container Instances](https://learn.microsoft.com/azure/container-instances/).
* A [Kubernetes](https://kubernetes.io/) cluster deployed to [Azure Stack](https://learn.microsoft.com/azure-stack/operator). For more information, see [Deploy Kubernetes to Azure Stack](https://learn.microsoft.com/azure-stack/user/azure-stack-solution-template-kubernetes-deploy).



### Advanced Vector Extension support

The **host** computer is the computer that runs the docker container. The host *must support* [Advanced Vector Extensions](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX2) (AVX2). You can check for AVX2 support on Linux hosts with the following command:

```console
grep -q avx2 /proc/cpuinfo && echo AVX2 supported || echo No AVX2 support detected
```

> **Warning:**
> The host computer is *required* to support AVX2. The container *will not* function correctly without AVX2 support.

### Container requirements and recommendations


> **Note:**
> The requirements and recommendations are based on benchmarks with a single request per second, using a 523-KB image of a scanned business letter that contains 29 lines and a total of 803 characters. The recommended configuration resulted in approximately 2x faster response compared with the minimum configuration.

The following table describes the minimum and recommended allocation of resources for each Read OCR container.

| Container | Minimum | Recommended |
| --- | --- | --- |
| Read 3.2 2022-04-30 | 4 cores, 8-GB memory | 8 cores, 16-GB memory |
| Read 3.2 2021-04-12 | 4 cores, 16-GB memory | 8 cores, 24-GB memory |

* Each core must be at least 2.6 gigahertz (GHz) or faster.

Core and memory correspond to the `--cpus` and `--memory` settings, which are used as part of the `docker run` command.


## Get the container image

The Azure Vision Read OCR container image can be found on the `mcr.microsoft.com` container registry syndicate. It resides within the `azure-cognitive-services` repository and is named `read`. The fully qualified container image name is, `mcr.microsoft.com/azure-cognitive-services/vision/read`.

To use the latest version of the container, you can use the `latest` tag. You can also find a full list of [tags on the MCR](https://mcr.microsoft.com/product/azure-cognitive-services/vision/read/tags).

The following container images for Read are available.

| Container | Container Registry / Repository / Image Name | Tags |
| --- | --- | --- |
| Read 3.2 GA | `mcr.microsoft.com/azure-cognitive-services/vision/read:3.2-model-2022-04-30` | latest, 3.2, 3.2-model-2022-04-30 |

Use the [`docker pull`](https://docs.docker.com/engine/reference/commandline/pull/) command to download a container image.

```bash
docker pull mcr.microsoft.com/azure-cognitive-services/vision/read:3.2-model-2022-04-30
```

---


> **Tip:**
> You can use the [docker images](https://docs.docker.com/engine/reference/commandline/images/) command to list your downloaded container images. For example, the following command lists the ID, repository, and tag of each downloaded container image, formatted as a table:
>
>  ```
>  docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
>
>  IMAGE ID         REPOSITORY                TAG
>  <image-id>       <repository-path/name>    <tag-name>
>  ```


## How to use the container

Once the container is on the [host computer](#host-computer-requirements), use the following process to work with the container.

1. [Run the container](#run-the-container), with the required billing settings. More [examples](computer-vision-resource-container-config.md) of the `docker run` command are available. 
1. [Query the container's prediction endpoint](#query-the-containers-prediction-endpoint). 

## Run the container

Use the [docker run](https://docs.docker.com/engine/reference/commandline/run/) command to run the container. Refer to [gather required parameters](#gather-required-parameters) for details on how to get the `{ENDPOINT_URI}` and `{API_KEY}` values.

[Examples](computer-vision-resource-container-config.md#example-docker-commands) of the `docker run` command are available.

```bash
docker run --rm -it -p 5000:5000 --memory 16g --cpus 8 \
mcr.microsoft.com/azure-cognitive-services/vision/read:3.2-model-2022-04-30 \
Eula=accept \
Billing={ENDPOINT_URI} \
ApiKey={API_KEY}
```

The above command:

* Runs the Read OCR latest GA container from the container image.
* Allocates 8 CPU core and 16 gigabytes (GB) of memory.
* Exposes TCP port 5000 and allocates a pseudo-TTY for the container.
* Automatically removes the container after it exits. The container image is still available on the host computer.

You can alternatively run the container using environment variables:

```bash
docker run --rm -it -p 5000:5000 --memory 16g --cpus 8 \
--env Eula=accept \
--env Billing={ENDPOINT_URI} \
--env ApiKey={API_KEY} \
mcr.microsoft.com/azure-cognitive-services/vision/read:3.2-model-2022-04-30
```


More [examples](computer-vision-resource-container-config.md#example-docker-commands) of the `docker run` command are available. 

> **Important:**
> The `Eula`, `Billing`, and `ApiKey` options must be specified to run the container; otherwise, the container won't start. For more information, see [Billing](#billing).

<!--If you need higher throughput (for example, when processing multi-page files), consider deploying multiple containers [on a Kubernetes cluster](deploy-computer-vision-on-premises.md), using [Azure Storage](/azure/storage/common/storage-account-create) and [Azure Queue](/azure/storage/queues/storage-queues-introduction).-->

If you're using Azure Storage to store images for processing, you can create a [connection string](https://learn.microsoft.com/azure/storage/common/storage-configure-connection-string) to use when calling the container.

To find your connection string:

1. Navigate to **Storage accounts** on the Azure portal, and find your account.
2. Select on **Access keys** in the left pane.
3. Your connection string is located below **Connection string**


### Run multiple containers on the same host

If you intend to run multiple containers with exposed ports, make sure to run each container with a different exposed port. For example, run the first container on port 5000 and the second container on port 5001.

You can have this container and a different Foundry Tools container running on the HOST together. You also can have multiple containers of the same Foundry Tools container running.


<!--  ## Validate container is running -->


## Validate that a container is running

There are several ways to validate that the container is running. Locate the *External IP* address and exposed port of the container in question, and open your favorite web browser. Use the various request URLs that follow to validate the container is running. The example request URLs listed here are `http://localhost:5000`, but your specific container might vary. Make sure to rely on your container's *External IP* address and exposed port.

| Request URL | Purpose |
| --- | --- |
| `http://localhost:5000/` | The container provides a home page. |
| `http://localhost:5000/ready` | Requested with GET, this URL provides a verification that the container is ready to accept a query against the model. This request can be used for Kubernetes [liveness and readiness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/). |
| `http://localhost:5000/status` | Also requested with GET, this URL verifies if the api-key used to start the container is valid without causing an endpoint query. This request can be used for Kubernetes [liveness and readiness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/). |
| `http://localhost:5000/swagger` | The container provides a full set of documentation for the endpoints and a **Try it out** feature. With this feature, you can enter your settings into a web-based HTML form and make the query without having to write any code. After the query returns, an example CURL command is provided to demonstrate the HTTP headers and body format that's required. |

Container's home page


## Query the container's prediction endpoint

The container provides REST-based query prediction endpoint APIs. 

Use the host, `http://localhost:5000`, for container APIs. You can view the Swagger path at: `http://localhost:5000/swagger/`.

### Asynchronous Read

You can use the `POST /vision/v3.2/read/analyze` and `GET /vision/v3.2/read/operations/{operationId}` operations in concert to asynchronously read an image, similar to how the Azure Vision service uses those corresponding REST operations. The asynchronous POST method returns an `operationId` that is used as the identifier to the HTTP GET request.

From the swagger UI, select the `Analyze` to expand it in the browser. Then select **Try it out** > **Choose file**. In this example, we use the following image:

tabs vs spaces

When the asynchronous POST has run successfully, it returns an **HTTP 202** status code. As part of the response, there is an `operation-location` header that holds the result endpoint for the request.

```http
 content-length: 0
 date: Fri, 04 Sep 2020 16:23:01 GMT
 operation-location: http://localhost:5000/vision/v3.2/read/operations/a527d445-8a74-4482-8cb3-c98a65ec7ef9
 server: Kestrel
```

The `operation-location` is the fully qualified URL and is accessed via an HTTP GET. Here's the JSON response from executing the `operation-location` URL from the preceding image:

```json
{
  "status": "succeeded",
  "createdDateTime": "2021-02-04T06:32:08.2752706+00:00",
  "lastUpdatedDateTime": "2021-02-04T06:32:08.7706172+00:00",
  "analyzeResult": {
    "version": "3.2.0",
    "readResults": [
      {
        "page": 1,
        "angle": 2.1243,
        "width": 502,
        "height": 252,
        "unit": "pixel",
        "lines": [
          {
            "boundingBox": [
              58,
              42,
              314,
              59,
              311,
              123,
              56,
              121
            ],
            "text": "Tabs vs",
            "appearance": {
              "style": {
                "name": "handwriting",
                "confidence": 0.96
              }
            },
            "words": [
              {
                "boundingBox": [
                  68,
                  44,
                  225,
                  59,
                  224,
                  122,
                  66,
                  123
                ],
                "text": "Tabs",
                "confidence": 0.933
              },
              {
                "boundingBox": [
                  241,
                  61,
                  314,
                  72,
                  314,
                  123,
                  239,
                  122
                ],
                "text": "vs",
                "confidence": 0.977
              }
            ]
          },
          {
            "boundingBox": [
              286,
              171,
              415,
              165,
              417,
              197,
              287,
              201
            ],
            "text": "paces",
            "appearance": {
              "style": {
                "name": "handwriting",
                "confidence": 0.746
              }
            },
            "words": [
              {
                "boundingBox": [
                  286,
                  179,
                  404,
                  166,
                  405,
                  198,
                  290,
                  201
                ],
                "text": "paces",
                "confidence": 0.938
              }
            ]
          }
        ]
      }
    ]
  }
}
```


> **Important:**
> If you deploy multiple Read OCR containers behind a load balancer, for example, under Docker Compose or Kubernetes, you must have an external cache. Because the processing container and the `GET` request container might not be the same, an external cache stores the results and shares them across containers. For details about cache settings, see [Configure Azure Vision Docker containers](computer-vision-resource-container-config.md).

### Synchronous read

You can use the following operation to synchronously read an image. 

`POST /vision/v3.2/read/syncAnalyze` 

When the image is read in its entirety, then and only then does the API return a JSON response. The only exception to this behavior is if an error occurs. If an error occurs, the following JSON is returned:

```json
{
    "status": "Failed"
}
```

The JSON response object has the same object graph as the asynchronous version. If you're a JavaScript user and want type safety, consider using TypeScript to cast the JSON response.

For an example use-case, see the <a href="https://aka.ms/ts-read-api-types" target="_blank" rel="noopener noreferrer">TypeScript sandbox here </a> and select **Run** to visualize its ease-of-use.

## Run the container disconnected from the internet


To use this container disconnected from the internet, you must first request access by filling out an application, and purchasing a commitment plan. See [Use Docker containers in disconnected environments](../containers/disconnected-containers.md) for more information.

If you have been approved to run the container disconnected from the internet, use the following example shows the formatting of the `docker run` command you'll use, with placeholder values. Replace these placeholder values with your own values.

The `DownloadLicense=True` parameter in your `docker run` command will download a license file that will enable your Docker container to run when it isn't connected to the internet. It also contains an expiration date, after which the license file will be invalid to run the container. You can only use a license file with the appropriate container that you've been approved for. For example, you can't use a license file for a speech to text container with a Document Intelligence container.

| Placeholder | Value | Format or example |
| --- | --- | --- |
| `{IMAGE}` | The container image you want to use. | `mcr.microsoft.com/azure-cognitive-services/form-recognizer/invoice` |
| `{LICENSE_MOUNT}` | The path where the license will be downloaded, and mounted. | `/host/license:/path/to/license/directory` |
| `{ENDPOINT_URI}` | The endpoint for authenticating your service request. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| `{API_KEY}` | The key for your Text Analytics resource. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `{CONTAINER_LICENSE_DIRECTORY}` | Location of the license folder on the container's local filesystem. | `/path/to/license/directory` |

```bash
docker run --rm -it -p 5000:5000 \ 
-v {LICENSE_MOUNT} \
{IMAGE} \
eula=accept \
billing={ENDPOINT_URI} \
apikey={API_KEY} \
DownloadLicense=True \
Mounts:License={CONTAINER_LICENSE_DIRECTORY} 
```

Once the license file has been downloaded, you can run the container in a disconnected environment. The following example shows the formatting of the `docker run` command you'll use, with placeholder values. Replace these placeholder values with your own values.

Wherever the container is run, the license file must be mounted to the container and the location of the license folder on the container's local filesystem must be specified with `Mounts:License=`. An output mount must also be specified so that billing usage records can be written.

| Placeholder | Value | Format or example |
| --- | --- | --- |
| `{IMAGE}` | The container image you want to use. | `mcr.microsoft.com/azure-cognitive-services/form-recognizer/invoice` |
 | `{MEMORY_SIZE}` | The appropriate size of memory to allocate for your container. | `4g` |
| `{NUMBER_CPUS}` | The appropriate number of CPUs to allocate for your container. | `4` |
| `{LICENSE_MOUNT}` | The path where the license will be located and mounted. | `/host/license:/path/to/license/directory` |
| `{OUTPUT_PATH}` | The output path for logging [usage records](../containers/disconnected-containers.md#usage-records). | `/host/output:/path/to/output/directory` |
| `{CONTAINER_LICENSE_DIRECTORY}` | Location of the license folder on the container's local filesystem. | `/path/to/license/directory` |
| `{CONTAINER_OUTPUT_DIRECTORY}` | Location of the output folder on the container's local filesystem. | `/path/to/output/directory` |

```bash
docker run --rm -it -p 5000:5000 --memory {MEMORY_SIZE} --cpus {NUMBER_CPUS} \ 
-v {LICENSE_MOUNT} \ 
-v {OUTPUT_PATH} \
{IMAGE} \
eula=accept \
Mounts:License={CONTAINER_LICENSE_DIRECTORY}
Mounts:Output={CONTAINER_OUTPUT_DIRECTORY}
```


## Stop the container


To shut down the container, in the command-line environment where the container is running, select <kbd>Ctrl+C</kbd>.


## Troubleshooting

If you run the container with an output [mount](computer-vision-resource-container-config.md#mount-settings) and logging enabled, the container generates log files that are helpful to troubleshoot issues that happen while starting or running the container.


> **Tip:**
> For more troubleshooting information and guidance, see [Azure AI containers frequently asked questions (FAQ)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/containers/container-faq.yml).



If you're having trouble running a Foundry Tools container, you can try using the Microsoft diagnostics container. Use this container to diagnose common errors in your deployment environment that might prevent Azure AI containers from functioning as expected.

To get the container, use the following `docker pull` command:

```bash
docker pull mcr.microsoft.com/azure-cognitive-services/diagnostic
```

Then run the container. Replace `{ENDPOINT_URI}` with your endpoint, and replace `{API_KEY}` with your key to your resource:

```bash
docker run --rm mcr.microsoft.com/azure-cognitive-services/diagnostic \
eula=accept \
Billing={ENDPOINT_URI} \
ApiKey={API_KEY}
```

The container will test for network connectivity to the billing endpoint.


## Billing

The Azure AI containers send billing information to Azure, using the corresponding resource on your Azure account.


Queries to the container are billed at the pricing tier of the Azure resource that's used for the `ApiKey` parameter.

Foundry Tools containers aren't licensed to run without being connected to the metering or billing endpoint. You must enable the containers to communicate billing information with the billing endpoint at all times. Foundry Tools containers don't send customer data, such as the image or text that's being analyzed, to Microsoft.

### Connect to Azure

The container needs the billing argument values to run. These values allow the container to connect to the billing endpoint. The container reports usage about every 10 to 15 minutes. If the container doesn't connect to Azure within the allowed time window, the container continues to run but doesn't serve queries until the billing endpoint is restored. The connection is attempted 10 times at the same time interval of 10 to 15 minutes. If it can't connect to the billing endpoint within the 10 tries, the container stops serving requests. See the [Foundry Tools container FAQ](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/containers/container-faq.yml#how-does-billing-work) for an example of the information sent to Microsoft for billing.

### Billing arguments

The <a href="https://docs.docker.com/engine/reference/commandline/run/" target="_blank">`docker run` <span class="docon docon-navigate-external x-hidden-focus"></span></a> command will start the container when all three of the following options are provided with valid values:

| Option | Description |
| --- | --- |
| `ApiKey` | The API key of the Foundry Tools resource that's used to track billing information.<br/>The value of this option must be set to an API key for the provisioned resource that's specified in `Billing`. |
| `Billing` | The endpoint of the Foundry Tools resource that's used to track billing information.<br/>The value of this option must be set to the endpoint URI of a provisioned Azure resource. |
| `Eula` | Indicates that you accepted the license for the container.<br/>The value of this option must be set to **accept**. |


For more information about these options, see [Configure containers](computer-vision-resource-container-config.md). 

## Summary

In this article, you learned concepts and workflow for downloading, installing, and running Azure Vision containers. In summary:

* Azure Vision provides a Linux container for Docker, encapsulating Read.
* The read container image requires an application to run it. 
* Container images run in Docker.
* You can use either the REST API or SDK to call operations in Read OCR containers by specifying the host URI of the container.
* You must specify billing information when instantiating a container.

> **Important:**
> Azure AI containers are not licensed to run without being connected to Azure for metering. Customers need to enable the containers to communicate billing information with the metering service at all times. Azure AI containers do not send customer data (for example, the image or text that is being analyzed) to Microsoft.

## Next steps

* Review [Configure containers](computer-vision-resource-container-config.md) for configuration settings
* Review the [OCR overview](overview-ocr.md) to learn more about recognizing printed and handwritten text
* Refer to the [Read API](https://learn.microsoft.com/rest/api/computervision/operation-groups) for details about the methods supported by the container.
* Refer to [Frequently asked questions (FAQ)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/FAQ.yml) to resolve issues related to Azure Vision functionality.
* Use more [Azure AI containers](../cognitive-services-container-support.md?context=/azure/foundry-classic/context/context)
