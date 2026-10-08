---
title: Use Docker containers for Custom Named Entity Recognition on-premises
titleSuffix: Foundry Tools
description: Learn how to use Docker containers for Custom Named Entity Recognition on-premises.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 07/25/2026
ms.author: lajanuar
ai-usage: ai-assisted
ms.custom: language-service-custom-named-entity-recognition
keywords: on-premises, Docker, container, natural language processing
---
# Install and run Custom Named Entity Recognition containers


Containers enable you to host the Custom Named Entity Recognition API on your own infrastructure using your own trained model. If you have security or data governance requirements that can't be fulfilled by calling Custom Named Entity Recognition remotely, then containers might be a good option.

> **Note:**
> * The free account is limited to 5,000 text records per month and only the **Free** and **Standard** [pricing tiers](https://azure.microsoft.com/pricing/details/cognitive-services/text-analytics) are valid for containers. For more information on transaction request rates, see [Data and service limits](../../concepts/data-limits.md).


## Prerequisites

* If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* [Docker](https://docs.docker.com/) installed on a host computer. Docker must be configured to allow the containers to connect with and send billing data to Azure. 
    * On Windows, Docker must also be configured to support Linux containers.
    * You should have a basic understanding of [Docker concepts](https://docs.docker.com/get-started/overview/). 
* A <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics"  title="Create a Language resource"  target="_blank">Language resource </a> with the free (F0) or standard (S) [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/text-analytics/).
* A [trained and deployed Custom Named Entity Recognition model](../quickstart.md)


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



The following table describes the minimum and recommended specifications for Custom Named Entity Recognition containers. Each CPU core must be at least 2.6 gigahertz (GHz) or faster. The allowable Transactions Per Second (TPS) are also listed.

|  | Minimum host specs | Recommended host specs | Minimum TPS | Maximum TPS |
| --- | --- | --- | --- | --- |
| **Custom Named Entity Recognition** | 1 core, 2 GB memory | 1 core, 4 GB memory | 15 | 30 |

CPU core and memory correspond to the `--cpus` and `--memory` settings, which are used as part of the `docker run` command.

## Export your Custom Named Entity Recognition model

Before you proceed with running the docker image, you need to export your own trained model to expose it to your container. Use the following command to extract your model and replace the placeholders with your own values:

| Placeholder | Value | Format or example |
| --- | --- | --- |
| **{API_KEY}** | The key for your Custom Named Entity Recognition resource. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| **{ENDPOINT_URI}** | The endpoint for accessing the Custom Named Entity Recognition API. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| **{PROJECT_NAME}** | The name of the project containing the model that you want to export. You can find it on your projects tab in the Microsoft Foundry portal. | `myProject` |
| **{TRAINED_MODEL_NAME}** | The name of the trained model you want to export. You can find your trained models on your model evaluation tab under your project in the Microsoft Foundry portal. | `myTrainedModel` |

```bash
curl --location --request PUT '{ENDPOINT_URI}/language/authoring/analyze-text/projects/{PROJECT_NAME}/exported-models/{TRAINED_MODEL_NAME}?api-version=2023-04-15-preview' \
--header 'Ocp-Apim-Subscription-Key: {API_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "TrainedmodelLabel": "{TRAINED_MODEL_NAME}"
}'
```

## Get the container image with `docker pull`

The Custom Named Entity Recognition container image can be found on the `mcr.microsoft.com` container registry syndicate. It resides within the `azure-cognitive-services/textanalytics/` repository and is named `customner`. The fully qualified container image name is, `mcr.microsoft.com/azure-cognitive-services/textanalytics/customner`.

To use the latest version of the container, you can use the `latest` tag. You can also find a full list of [tags on the MCR](https://mcr.microsoft.com/product/azure-cognitive-services/textanalytics/customner/about).

Use the [`docker pull`](https://docs.docker.com/engine/reference/commandline/pull/) command to download a container image from Microsoft Container Registry.

```
docker pull mcr.microsoft.com/azure-cognitive-services/textanalytics/customner:latest
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


## Run the container with `docker run`

Once the container is on the host computer, use the [docker run](https://docs.docker.com/engine/reference/commandline/run/) command to run the containers. The container will continue to run until you stop it.

> **Important:**
> * The docker commands in the following sections use the back slash, `\`, as a line continuation character. Replace or remove this based on your host operating system's requirements. 
> * The `Eula`, `Billing`, and `ApiKey` options must be specified to run the container; otherwise, the container won't start.  For more information, see [Billing](#billing).

To run the *Custom Named Entity Recognition* container, execute the following `docker run` command. Replace the placeholders with your own values:

| Placeholder | Value | Format or example |
| --- | --- | --- |
| **{API_KEY}** | The key for your Custom Named Entity Recognition resource. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| **{ENDPOINT_URI}** | The endpoint for accessing the Custom Named Entity Recognition API. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |
| **{PROJECT_NAME}** | The name of the project containing the model that you want to export. You can find it on your projects tab in the Microsoft Foundry portal. | `myProject` |
| **{LOCAL_PATH}** | The path where the exported model in the previous step will be downloaded in. You can choose any path of your liking. | `C:/custom-ner-model` |
| **{TRAINED_MODEL_NAME}** | The name of the trained model you want to export. You can find your trained models on your model evaluation tab under your project in the Microsoft Foundry portal. | `myTrainedModel` |


```bash
docker run --rm -it -p5000:5000  --memory 4g --cpus 1 \
-v {LOCAL_PATH}:/modelPath \
mcr.microsoft.com/azure-cognitive-services/textanalytics/customner:latest \
EULA=accept \
BILLING={ENDPOINT_URI} \
APIKEY={API_KEY} \
projectName={PROJECT_NAME}
exportedModelName={TRAINED_MODEL_NAME}
```

This command:

* Runs a *Custom Named Entity Recognition* container and downloads your exported model to the local path specified.
* Allocates one CPU core and 4 gigabytes (GB) of memory
* Exposes TCP port 5000 and allocates a pseudo-TTY for the container
* Automatically removes the container after it exits. The container image is still available on the host computer.


### Run multiple containers on the same host

If you intend to run multiple containers with exposed ports, make sure to run each container with a different exposed port. For example, run the first container on port 5000 and the second container on port 5001.

You can have this container and a different Foundry Tools container running on the HOST together. You also can have multiple containers of the same Foundry Tools container running.


## Query the container's prediction endpoint

The container provides REST-based query prediction endpoint APIs.

Use the host, `http://localhost:5000`, for container APIs.


## Validate that a container is running

There are several ways to validate that the container is running. Locate the *External IP* address and exposed port of the container in question, and open your favorite web browser. Use the various request URLs that follow to validate the container is running. The example request URLs listed here are `http://localhost:5000`, but your specific container might vary. Make sure to rely on your container's *External IP* address and exposed port.

| Request URL | Purpose |
| --- | --- |
| `http://localhost:5000/` | The container provides a home page. |
| `http://localhost:5000/ready` | Requested with GET, this URL provides a verification that the container is ready to accept a query against the model. This request can be used for Kubernetes [liveness and readiness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/). |
| `http://localhost:5000/status` | Also requested with GET, this URL verifies if the api-key used to start the container is valid without causing an endpoint query. This request can be used for Kubernetes [liveness and readiness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/). |
| `http://localhost:5000/swagger` | The container provides a full set of documentation for the endpoints and a **Try it out** feature. With this feature, you can enter your settings into a web-based HTML form and make the query without having to write any code. After the query returns, an example CURL command is provided to demonstrate the HTTP headers and body format that's required. |

Container's home page



## Stop the container


To shut down the container, in the command-line environment where the container is running, select <kbd>Ctrl+C</kbd>.


## Troubleshooting

If you run the container with an output [mount](../../concepts/configure-containers.md#mount-settings) and logging enabled, the container generates log files that are helpful to troubleshoot issues that happen while starting or running the container.


> **Tip:**
> For more troubleshooting information and guidance, see [Azure AI containers frequently asked questions (FAQ)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/containers/container-faq.yml).


## Billing

The Custom Named Entity Recognition containers send billing information to Azure, using a _Custom Named Entity Recognition_ resource on your Azure account. 


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


## Summary

In this article, you learned concepts and workflow for downloading, installing, and running Custom Named Entity Recognition containers. In summary:

* Custom Named Entity Recognition provides Linux containers for Docker.
* Container images are downloaded from the Microsoft Container Registry (MCR).
* Container images run in Docker.
* You can use either the REST API or SDK to call operations in Custom Named Entity Recognition containers by specifying the host URI of the container.
* You must specify billing information when instantiating a container.

> **Important:**
> Azure AI containers are not licensed to run without being connected to Azure for metering. Customers need to enable the containers to communicate billing information with the metering service at all times. Azure AI containers do not send customer data (e.g. text that is being analyzed) to Microsoft.

## Next steps

* See [Configure containers](../../concepts/configure-containers.md) for configuration settings.
