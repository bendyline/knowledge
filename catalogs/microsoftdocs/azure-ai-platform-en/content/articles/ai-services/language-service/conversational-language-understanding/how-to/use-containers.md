---
title: Use conversational language understanding (CLU) Docker containers on-premises
titleSuffix: Foundry Tools
description: Use Docker containers for the conversational language understanding (CLU) API to determine the language of written text, on-premises.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 06/30/2026
ms.author: lajanuar
---
# Install and run Conversational Language Understanding (CLU) containers

> **Note:**
> The data limits in a single synchronous API call for the CLU container are 5,120 characters per document and up to 10 documents per call.

Containers enable you to host the CLU API on your own infrastructure. If you have security or data governance requirements that can't be fulfilled by calling CLU remotely, then containers might be a good option.

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Prerequisites

You must meet the following prerequisites before using CLU containers.

* An active Azure subscription. If you don't have one, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* [Docker](https://docs.docker.com/) installed on a host computer. Docker must be configured to allow the containers to connect with and send billing data to Azure.
    * On Windows, Docker must also be configured to support Linux containers.
    * You should have a basic understanding of [Docker concepts](https://docs.docker.com/get-started/overview/).
* A <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics"  title="Create a Language resource"  target="_blank">Language resource </a>


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


## Host computer requirements and recommendations


The host is an x64-based computer that runs the Docker container. It can be a computer on your premises or a Docker hosting service in Azure, such as:

* [Azure Kubernetes Service](https://learn.microsoft.com/azure/aks/).
* [Azure Container Instances](https://learn.microsoft.com/azure/container-instances/).
* A [Kubernetes](https://kubernetes.io/) cluster deployed to [Azure Stack](https://learn.microsoft.com/azure-stack/operator). For more information, see [Deploy Kubernetes to Azure Stack](https://learn.microsoft.com/azure-stack/user/azure-stack-solution-template-kubernetes-deploy).



The following table describes the minimum and recommended specifications for the available container. Each CPU core must be at least 2.6 gigahertz (GHz) or faster.

We recommended that you have a CPU with AVX-512 instruction set, for the best experience (performance and accuracy).

| Processor | Minimum host specs | Recommended host specs |
| --- | --- | --- |
| **CPU** | 1-core, 2-GB memory | 4-cores, 8-GB memory |

CPU core and memory correspond to the `--cpus` and `--memory` settings, which are used as part of the `docker run` command.

## Export your Conversational Language Understanding model

Before you proceed with running the docker image, you need to export your own trained model to expose it to your container. Use the following command to extract your model and replace the placeholders with your own values:

| Placeholder | Value | Format or example |
| --- | --- | --- |
| **{API_KEY}** | The key for your Language resource. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |
| **{ENDPOINT_URI}** | The endpoint for accessing the Conversational Language Understanding API. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| **{PROJECT_NAME}** | The name of the project containing the model that you want to export. You can find it on your projects tab in the Microsoft Foundry portal. | myProject |
| **{TRAINED_MODEL_NAME}** | The name of the trained model you want to export. You can find your trained models on your model evaluation tab under your project in the Microsoft Foundry portal. | myTrainedModel |
| **{EXPORTED_MODEL_NAME}** | The name to assign for the new exported model created. | myExportedModel |

```bash
curl --location --request PUT '{ENDPOINT_URI}/language/authoring/analyze-conversations/projects/{PROJECT_NAME}/exported-models/{EXPORTED_MODEL_NAME}?api-version=2024-11-15-preview' \
--header 'Ocp-Apim-Subscription-Key: {API_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "TrainedModelLabel": "{TRAINED_MODEL_NAME}"
}'
```

## Get the container image with `docker pull`

The CLU container image can be found on the `mcr.microsoft.com` container registry syndicate. It resides within the `azure-cognitive-services/language/` repository and is named `clu`. The fully qualified container image name is, `mcr.microsoft.com/azure-cognitive-services/language/clu`

 To use the latest version of the container, you can use the `latest` tag, which is for English. You can also find a full list of containers for supported languages using the [tags on the MCR](https://mcr.microsoft.com/product/azure-cognitive-services/language/clu/tags).

The latest CLU container is available in several languages. To download the container for the English container, use the following command:

```bash
  docker pull mcr.microsoft.com/azure-cognitive-services/language/clu:latest
```


> **Tip:**
> You can use the [docker images](https://docs.docker.com/engine/reference/commandline/images/) command to list your downloaded container images. For example, the following command lists the ID, repository, and tag of each downloaded container image, formatted as a table:
>
>  ```
>  docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
>
>  IMAGE ID         REPOSITORY                TAG
>  <image-id>       <repository-path/name>    <tag-name>
>  ```


## Run the container in download model mode

After the exported model is created, users have to run the container to download the deployment package that was created specifically for their exported models.

| Placeholder | Value | Format or example |
| --- | --- | --- |
| **{API_KEY}** | The key for your Language resource. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | See Azure portal |
| **{ENDPOINT_URI}** | The endpoint for accessing the API. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| **{IMAGE_TAG}**  | The image tag representing the language of the container you want to run. Make sure the tag matches the `docker pull` command you used.  | latest |
| **{LOCAL_CLU_PORT}** | Port number assigned for the container in local machine. | 5000 |
| **{LOCAL_MODEL_DIRECTORY}** | Absolute directory in host machine where exported models are saved in. | `C:\usr\local\myDeploymentPackage` |
| **{PROJECT_NAME}** | Name of the project that the exported model belongs to | myProject |
| **{EXPORTED_MODEL_NAME}** | Exported model to be downloaded | myExportedModel |


  
  ```bash
    docker run --rm -it -p {LOCAL_CLU_PORT}:80 \
    mcr.microsoft.com/azure-cognitive-services/language/clu:{IMAGE_TAG} \ 
    -v {LOCAL_MODEL_DIRECTORY}:/DeploymentPackage \
    Billing={ENDPOINT_URI} \ 
    ApiKey={API_KEY} \
    downloadmodel \
    projectName={PROJECT_NAME} \
    exportedModelName={EXPORTED_MODEL_NAME}
  ```

DO NOT alter the downloaded files. Even altering the name or folder structure can affect the integrity of the container and might break it.

Repeat those steps to download as many models as you'd like to test. Your models can belong to different projects and have different (exported) model names.

## Run the container with `docker run`

Once the container is on the host computer, use the [docker run](https://docs.docker.com/engine/reference/commandline/run/) command to run the containers. The container continues to run until you stop it. Replace the placeholders with your own values:


> **Important:**
> * The docker commands in the following sections use the back slash, `\`, as a line continuation character. Replace or remove the back slash based on your host operating system's requirements.
> * The `Eula`, `Billing`, and `ApiKey` options must be specified to run the container; otherwise, the container doesn't start. For more information, see [Billing](#billing).

To run the CLU container, execute the following `docker run` command. Replace the placeholders with your own values:

| Placeholder | Value | Format or example |
| --- | --- | --- |
| **{API_KEY}** | The key for your Language resource. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| **{ENDPOINT_URI}** | The endpoint for accessing the API. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| **{IMAGE_TAG}** | The image tag representing the language of the container you want to run. Make sure the tag matches the `docker pull` command you used. | `latest` |
| **{LOCAL_CLU_PORT}** | Port number assigned for the container in local machine. | 5000 |
| **{LOCAL_NER_PORT}** | Port number of the `NER` container. See Run `NER` Container section. | 5001 (Has to be different than the port number) |
| **{LOCAL_LOGGING_DIRECTORY}** | Absolute directory in host machine where that logs are saved in. | `C:\usr\local\mylogs` |
| **{LOCAL_MODEL_DIRECTORY}** | Absolute directory in host machine where exported models are saved in. | `C:\usr\local\myDeploymentPackage` |

```bash
docker run --rm -it -p 5000:5000 --memory 8g --cpus 1 \
mcr.microsoft.com/azure-cognitive-services/language/clu:{IMAGE_TAG} \
Eula=accept \
Billing={ENDPOINT_URI} \
ApiKey={API_KEY}
```

This command:

* Runs a *CLU* container from the container image
* Allocates one CPU core and 8 gigabytes (GB) of memory
* Exposes `TCP` port 5000 and allocates a pseudo-TTY for the container
* Automatically removes the container after it exits. The container image is still available on the host computer.


### Run multiple containers on the same host

If you intend to run multiple containers with exposed ports, make sure to run each container with a different exposed port. For example, run the first container on port 5000 and the second container on port 5001.

You can have this container and a different Foundry Tools container running on the HOST together. You also can have multiple containers of the same Foundry Tools container running.


## Running named entity recognition (NER) Container
CLU relies on NER to handle prebuilt entities. The CLU container works properly without NER if users decide not to integrate it. NER billing is turned off when accessed via CLU, so there are no added charges unless you make a direct call to the NER container.

To set up NER in CLU container
- Follow the [NER container documentation](../../named-entity-recognition/how-to/use-containers.md).
- When running CLU container, make sure to set the parameter `Ner_Url `so that `Ner_Url=http://host.docker.internal:{LOCAL_NER_PORT}`

## Query the container's prediction endpoint

The container provides REST-based query prediction endpoint APIs.

Use the host, `http://localhost:5000`, for container APIs.

<!-- ## Validate container is running -->


## Validate that a container is running

There are several ways to validate that the container is running. Locate the *External IP* address and exposed port of the container in question, and open your favorite web browser. Use the various request URLs that follow to validate the container is running. The example request URLs listed here are `http://localhost:5000`, but your specific container might vary. Make sure to rely on your container's *External IP* address and exposed port.

| Request URL | Purpose |
| --- | --- |
| `http://localhost:5000/` | The container provides a home page. |
| `http://localhost:5000/ready` | Requested with GET, this URL provides a verification that the container is ready to accept a query against the model. This request can be used for Kubernetes [liveness and readiness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/). |
| `http://localhost:5000/status` | Also requested with GET, this URL verifies if the api-key used to start the container is valid without causing an endpoint query. This request can be used for Kubernetes [liveness and readiness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/). |
| `http://localhost:5000/swagger` | The container provides a full set of documentation for the endpoints and a **Try it out** feature. With this feature, you can enter your settings into a web-based HTML form and make the query without having to write any code. After the query returns, an example CURL command is provided to demonstrate the HTTP headers and body format that's required. |

Container's home page


For information on how to call CLU see [our guide](build-train-deploy-model.md#send-prediction-requests-to-a-deployment).

## Run the container disconnected from the internet


To use this container disconnected from the internet, you must first request access by filling out an application, and purchasing a commitment plan. See [Use Docker containers in disconnected environments](../../../containers/disconnected-containers.md) for more information.

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
| `{OUTPUT_PATH}` | The output path for logging [usage records](../../../containers/disconnected-containers.md#usage-records). | `/host/output:/path/to/output/directory` |
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

If you run the container with both an output [mount](../../concepts/configure-containers.md#mount-settings) and logging enabled, the container generates log files. The log files can help you troubleshoot any issues that occur during startup or while the container is running.


> **Tip:**
> For more troubleshooting information and guidance, see [Azure AI containers frequently asked questions (FAQ)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/containers/container-faq.yml).


## Billing

The CLU containers send billing information to Azure, using a _Language_ resource on your Azure account.


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


For more information about these options, see [Configure containers](../../concepts/configure-containers.md).

## Summary

In this article, you learned concepts and workflow for downloading, installing, and running CLU containers. In summary:

* CLU provides Linux containers for Docker
* Container images are downloaded from the Microsoft Container Registry (MCR).
* Container images run in Docker.
* You must specify billing information when instantiating a container.

> **Important:**
> Azure AI containers aren't licensed to run without being connected to Azure for metering. Customers must enable containers to always communicate billing information to the metering service. Azure AI containers don't send customer data (for example, text that is being analyzed) to Microsoft.

## Next steps

* See [Configure containers](../../concepts/configure-containers.md) for configuration settings.
