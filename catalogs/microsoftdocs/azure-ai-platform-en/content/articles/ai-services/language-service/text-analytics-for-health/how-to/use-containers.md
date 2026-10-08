---
title: How to use Text Analytics for health containers
titleSuffix: Foundry Tools
description: Learn how to extract and label medical information on premises using Text Analytics for health Docker container.
#services: cognitive-services
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: how-to
ms.date: 07/27/2026
ms.author: lajanuar
ai-usage: ai-assisted
ms.custom: language-service-health, devx-track-azurecli
ms.devlang: azurecli
---
# Use Text Analytics for health containers

Containers enable you to host the Text Analytics for health API on your own infrastructure. If you have security or data governance requirements that can't be fulfilled by calling Text Analytics for health remotely, then containers might be a good option.

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Prerequisites

You must meet the following prerequisites before using Text Analytics for health containers. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

* [Docker](https://docs.docker.com/) installed on a host computer. Docker must be configured to allow the containers to connect with and send billing data to Azure.
    * On Windows, Docker must also be configured to support Linux containers.
    * You should have a basic understanding of [Docker concepts](https://docs.docker.com/get-started/overview/).
* A <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics"  title="Create a Language resource"  target="_blank">Language resource </a> with the free (F0) or standard (S) [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/text-analytics/).


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



The following table describes the minimum and recommended specifications for the Text Analytics for health containers. Each CPU core must be at least 2.6 gigahertz (GHz) or faster. The allowable Transactions Per Second (TPS) are also listed.

|  | Minimum host specs | Recommended host specs | Minimum TPS | Maximum TPS |
| --- | --- | --- | --- | --- |
| **1 document/request** | 4 core, 12GB memory | 6 core, 12GB memory | 15 | 30 |
| **10 documents/request** | 6 core, 16GB memory | 8 core, 20GB memory | 15 | 30 |

CPU core and memory correspond to the `--cpus` and `--memory` settings, which are used as part of the `docker run` command.

## Get the container image with `docker pull`

The Text Analytics for health container image can be found on the `mcr.microsoft.com` container registry syndicate. It resides within the `azure-cognitive-services/textanalytics/` repository and is named `healthcare`. The fully qualified container image name is `mcr.microsoft.com/azure-cognitive-services/textanalytics/healthcare`

To use the latest version of the container, you can use the `latest` tag. You can also find a full list of [tags on the MCR](https://mcr.microsoft.com/product/azure-cognitive-services/textanalytics/healthcare/tags).

Use the [`docker pull`](https://docs.docker.com/engine/reference/commandline/pull/) command to download this container image from the Microsoft public container registry. You can find the featured tags on the  [Microsoft Container Registry](https://mcr.microsoft.com/product/azure-cognitive-services/textanalytics/healthcare/about)

```
docker pull mcr.microsoft.com/azure-cognitive-services/textanalytics/healthcare:<tag-name>
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

Once the container is on the host computer, use the [docker run](https://docs.docker.com/engine/reference/commandline/run/) command and run the containers. The container continues to run until you stop it.

> **Important:**

> * The docker commands in the following sections use the back slash, `\`, as a line continuation character. Replace or remove the back slash based on your host operating system's requirements.
> * The `Eula`, `Billing`, and `ApiKey` options must be specified to run the container; otherwise, the container doesn't start. For more information, see [Billing](#billing).
> * The [responsible AI](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/language-service/transparency-note) (RAI) acknowledgment must also be present with a value of `accept`.
> * The sentiment analysis and language detection containers use v3 of the API, and are generally available. The key phrase extraction container uses v2 of the API, and is in preview.

There are multiple ways you can install and run the Text Analytics for health container.

- Use the Azure portal to create a Language resource, and use Docker to get your container.
- Use an Azure virtual machine (VM) with Docker and run the container.
- Use the following PowerShell and Azure CLI scripts to automate resource deployment and container configuration.

When you use the Text Analytics for health container, the data contained in your API requests and responses isn't visible to Microsoft, and isn't used for training the model applied to your data.

### Run the container locally

To run the container in your own environment after downloading the container image, execute the following `docker run` command. Replace the placeholders with your own values:

| Placeholder | Value | Format or example |
| --- | --- | --- |
| **{API_KEY}** | The key for your Language resource. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| **{ENDPOINT_URI}** | The endpoint for accessing the API. You can find it on your resource's **Key and endpoint** page, on the Azure portal. | `https://<your-custom-subdomain>.cognitiveservices.azure.com` |

```bash
docker run --rm -it -p 5000:5000 --cpus 6 --memory 12g \
mcr.microsoft.com/azure-cognitive-services/textanalytics/healthcare:<tag-name> \
Eula=accept \
rai_terms=accept \
Billing={ENDPOINT_URI} \
ApiKey={API_KEY}
```

This command:

- Runs the Text Analytics for health container from the container image
- Allocates 6 CPU core and 12 gigabytes (GB) of memory
- Exposes `TCP` port 5000 and allocates a pseudo-TTY for the container
- Accepts the end user license agreement (EULA) and responsible AI (RAI) terms
- Automatically removes the container after it exits. The container image is still available on the host computer.

### Demo UI to visualize output

The container provides REST-based query prediction endpoint APIs. We also provide a visualization tool in the container that is accessible by appending `/demo` to the endpoint of the container. For example:

```
http://<serverURL>:5000/demo
```

Use the following example cURL request to submit a query to the container you deployed by replacing the `serverURL` variable with the appropriate value.

```bash
curl -X POST 'http://<serverURL>:5000/text/analytics/v3.1/entities/health' --header 'Content-Type: application/json' --header 'accept: application/json' --data-binary @example.json

```

### Install the container using Azure Web App for Containers

Azure [Web App for Containers](https://azure.microsoft.com/services/app-service/containers/) is an Azure resource dedicated to running containers in the cloud. It offers built-in features like autoscaling, support for Docker containers and Docker Compose, and HTTPS support.

> **Note:**
> With Azure Web App, you automatically get a domain in the form of `<appservice_name>.azurewebsites.net`

Run this PowerShell script using the Azure CLI to create a Web App for Containers, using your subscription and the container image over HTTPS. Wait for the script to complete (approximately 25-30 minutes) before submitting the first request.

```azurecli
$subscription_name = ""                    # THe name of the subscription you want you resource to be created on.
$resource_group_name = ""                  # The name of the resource group you want the AppServicePlan
                                           #    and AppService to be attached to.
$resources_location = ""                   # This is the location you wish the AppServicePlan to be deployed to.
                                           #    You can use the "az account list-locations -o table" command to
                                           #    get the list of available locations and location code names.
$appservice_plan_name = ""                 # This is the AppServicePlan name you wish to have.
$appservice_name = ""                      # This is the AppService resource name you wish to have.
$TEXT_ANALYTICS_RESOURCE_API_KEY = ""      # This should be taken from Azure Language resource.
$TEXT_ANALYTICS_RESOURCE_API_ENDPOINT = "" # This should be taken from Azure Language resource.
$DOCKER_IMAGE_NAME = "mcr.microsoft.com/azure-cognitive-services/textanalytics/healthcare:latest"

az login
az account set -s $subscription_name
az appservice plan create -n $appservice_plan_name -g $resource_group_name --is-linux -l $resources_location --sku P3V2
az webapp create -g $resource_group_name -p $appservice_plan_name -n $appservice_name -i $DOCKER_IMAGE_NAME
az webapp config appsettings set -g $resource_group_name -n $appservice_name --settings Eula=accept rai_terms=accept Billing=$TEXT_ANALYTICS_RESOURCE_API_ENDPOINT ApiKey=$TEXT_ANALYTICS_RESOURCE_API_KEY

# Once deployment complete, the resource should be available at: https://<appservice_name>.azurewebsites.net
```

### Install the container using Azure Container Instance

You can also use an Azure Container Instance (ACI) to make deployment easier. ACI is a resource that allows you to run Docker containers on-demand in a managed, serverless Azure environment.

See [How to use Azure Container Instances](../../../containers/azure-container-instance-recipe.md) for steps on deploying an ACI resource using the Azure portal. You can also use the following PowerShell script using Azure CLI, which creates an ACI on your subscription using the container image. Wait for the script to complete (approximately 25-30 minutes) before submitting the first request. Due to the limit on the maximum number of CPUs per ACI resource, don't select this option if you expect to submit more than five large documents (approximately 5,000 characters each) per request.
See the [ACI regional support](https://learn.microsoft.com/azure/container-instances/container-instances-region-availability) article for availability information.

> **Note:**
> Azure Container Instances don't include HTTPS support for the builtin domains. If you need HTTPS, you need to manually configure it, including creating a certificate and registering a domain. You can find instructions with the following NGINX example:

```azurecli
$subscription_name = ""                    # The name of the subscription you want you resource to be created on.
$resource_group_name = ""                  # The name of the resource group you want the AppServicePlan
                                           # and AppService to be attached to.
$resources_location = ""                   # This is the location you wish the web app to be deployed to.
                                           # You can use the "az account list-locations -o table" command to
                                           # Get the list of available locations and location code names.
$azure_container_instance_name = ""        # This is the AzureContainerInstance name you wish to have.
$TEXT_ANALYTICS_RESOURCE_API_KEY = ""      # This should be taken from Azure Language resource.
$TEXT_ANALYTICS_RESOURCE_API_ENDPOINT = "" # This should be taken from Azure Language resource.
$DNS_LABEL = ""                            # This is the DNS label name you wish your ACI will have
$DOCKER_IMAGE_NAME = "mcr.microsoft.com/azure-cognitive-services/textanalytics/healthcare:latest"

az login
az account set -s $subscription_name
az container create --resource-group $resource_group_name --name $azure_container_instance_name --image $DOCKER_IMAGE_NAME --cpu 4 --memory 12 --port 5000 --dns-name-label $DNS_LABEL --environment-variables Eula=accept rai_terms=accept Billing=$TEXT_ANALYTICS_RESOURCE_API_ENDPOINT ApiKey=$TEXT_ANALYTICS_RESOURCE_API_KEY

# Once deployment complete, the resource should be available at: http://<unique_dns_label>.<resource_group_region>.azurecontainer.io:5000
```

### Secure ACI connectivity

By default, ACI with the container API doesn't provide security—containers usually run inside a pod, and a network bridge isolates the pod from external access. You can, however, modify a container with a front-facing component, keeping the container endpoint private. The following examples use [NGINX](https://www.nginx.com) as an ingress gateway to support HTTPS/SSL and client-certificate authentication.

> **Note:**
> NGINX is an open-source, high-performance HTTP server, and proxy. An NGINX container can be used to terminate a `TLS` connection for a single container. More complex NGINX ingress-based `TLS` termination solutions are also possible.

#### Set up NGINX as an ingress gateway

NGINX uses [configuration files](https://docs.nginx.com/nginx/admin-guide/basic-functionality/managing-configuration-files/) to enable features at runtime. In order to enable `TLS` termination for another service, you must specify an SSL certificate to terminate the `TLS` connection and  `proxy_pass` to specify an address for the service. A sample is provided:


> **Note:**
> `ssl_certificate` expects a path to be specified within the NGINX container's local filesystem. The address specified for `proxy_pass` must be available from within the NGINX container's network.

The NGINX container loads all of the files in the `_.conf_` that are mounted under `/etc/nginx/conf.d/` into the HTTP configuration path.

```nginx
server {
  listen              80;
  return 301 https://$host$request_uri;
}
server {
  listen              443 ssl;
  # replace with .crt and .key paths
  ssl_certificate     /cert/Local.crt;
  ssl_certificate_key /cert/Local.key;

  location / {
    proxy_pass http://cognitive-service:5000;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP  $remote_addr;
  }
}
```

#### Compose file example

The following example shows how a [docker compose](https://docs.docker.com/reference/cli/docker/compose/) file can be created to deploy NGINX and health containers:

```yaml
version: "3.7"
services:
  cognitive-service:
    image: {IMAGE_ID}
    ports:
      - 5000:5000
    environment:
      - eula=accept
      - billing={ENDPOINT_URI}
      - apikey={API_KEY}
    volumes:
        # replace with path to logs folder
      - <path-to-logs-folder>:/output
  nginx:
    image: nginx
    ports:
      - 443:443
    volumes:
        # replace with paths for certs and conf folders
      - <path-to-certs-folder>:/cert
      - <path-to-conf-folder>:/etc/nginx/conf.d/
```

To initiate this Docker compose file, execute the following command from a console at the root level of the file:

```bash
docker-compose up
```

For more information, see NGINX's documentation on [NGINX SSL Termination](https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/).


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



### Structure the API request for the container

You can use the [Visual Studio Code REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or the following example cURL request to submit a query to the container you deployed, replacing the `serverURL` variable with the appropriate value. Note the version of the API in the URL for the container is different than the hosted API.

# [Language API (Preview)](#tab/language)

> **Note:**
> Fast Healthcare Interoperability Resources (FHIR) feature is available in the latest container, and is exposed through the new language REST API. 

```bash
curl -i -X POST 'http://<serverURL>:5000/language/analyze-text/jobs?api-version=2022-04-01-preview' --header 'Content-Type: application/json' --header --data-binary @example.json
```
The following JSON is an example of a JSON file attached to Azure Language request's POST body:

```json
example.json

{
    "analysisInput": {
        "documents": [
            {
                "text": "The doctor prescried 200mg Ibuprofen.",
                "language": "en",
                "id": "1"
            }
        ]
    },
    "tasks": [
        {
            "taskName": "analyze 1",
            "kind": "Healthcare",
            "parameters": {
                "fhirVersion": "4.0.1"
            }
        }
    ]
}
```
### Container response body

The following JSON is an example of Azure Language response body from the containerized synchronous call:

```json
{
  "jobId": "{JOB-ID}",
  "lastUpdateDateTime": "2022-04-18T15:50:16Z",
  "createdDateTime": "2022-04-18T15:50:14Z",
  "expirationDateTime": "2022-04-19T15:50:14Z",
  "status": "succeeded",
  "errors": [],
  "tasks": {
    "completed": 1,
    "failed": 0,
    "inProgress": 0,
    "total": 1,
    "items": [
      {
        "kind": "HealthcareLROResults",
        "taskName": "analyze 1",
        "lastUpdateDateTime": "2022-04-18T15:50:16.7046515Z",
        "status": "succeeded",
        "results": {
          "documents": [
            {
              "id": "1",
              "entities": [
                {
                  "offset": 4,
                  "length": 6,
                  "text": "doctor",
                  "category": "HealthcareProfession",
                  "confidenceScore": 0.76
                },
                {
                  "offset": 21,
                  "length": 5,
                  "text": "200mg",
                  "category": "Dosage",
                  "confidenceScore": 0.99
                },
                {
                  "offset": 27,
                  "length": 9,
                  "text": "Ibuprofen",
                  "category": "MedicationName",
                  "confidenceScore": 1.0,
                  "name": "ibuprofen",
                  "links": [
                    { "dataSource": "UMLS", "id": "C0020740" },
                    { "dataSource": "AOD", "id": "0000019879" },
                    { "dataSource": "ATC", "id": "M01AE01" },
                    { "dataSource": "CCPSS", "id": "0046165" },
                    { "dataSource": "CHV", "id": "0000006519" },
                    { "dataSource": "CSP", "id": "2270-2077" },
                    { "dataSource": "DRUGBANK", "id": "DB01050" },
                    { "dataSource": "GS", "id": "1611" },
                    { "dataSource": "LCH_NW", "id": "sh97005926" },
                    { "dataSource": "LNC", "id": "LP16165-0" },
                    { "dataSource": "MEDCIN", "id": "40458" },
                    { "dataSource": "MMSL", "id": "d00015" },
                    { "dataSource": "MSH", "id": "D007052" },
                    { "dataSource": "MTHSPL", "id": "WK2XYI10QM" },
                    { "dataSource": "NCI", "id": "C561" },
                    { "dataSource": "NCI_CTRP", "id": "C561" },
                    { "dataSource": "NCI_DCP", "id": "00803" },
                    { "dataSource": "NCI_DTP", "id": "NSC0256857" },
                    { "dataSource": "NCI_FDA", "id": "WK2XYI10QM" },
                    { "dataSource": "NCI_NCI-GLOSS", "id": "CDR0000613511" },
                    { "dataSource": "NDDF", "id": "002377" },
                    { "dataSource": "PDQ", "id": "CDR0000040475" },
                    { "dataSource": "RCD", "id": "x02MO" },
                    { "dataSource": "RXNORM", "id": "5640" },
                    { "dataSource": "SNM", "id": "E-7772" },
                    { "dataSource": "SNMI", "id": "C-603C0" },
                    { "dataSource": "SNOMEDCT_US", "id": "387207008" },
                    { "dataSource": "USP", "id": "m39860" },
                    { "dataSource": "USPMG", "id": "MTHU000060" },
                    { "dataSource": "VANDF", "id": "4017840" }
                  ]
                }
              ],
              "relations": [
                {
                  "relationType": "DosageOfMedication",
                  "entities": [
                    {
                      "ref": "#/results/documents/0/entities/1",
                      "role": "Dosage"
                    },
                    {
                      "ref": "#/results/documents/0/entities/2",
                      "role": "Medication"
                    }
                  ]
                }
              ],
              "warnings": [],
              "fhirBundle": {
                "resourceType": "Bundle",
                "id": "bae9d4e0-191e-48e6-9c24-c1ff6097c439",
                "meta": {
                  "profile": [
                    "http://hl7.org/fhir/4.0.1/StructureDefinition/Bundle"
                  ]
                },
                "identifier": {
                  "system": "urn:ietf:rfc:3986",
                  "value": "urn:uuid:bae9d4e0-191e-48e6-9c24-c1ff6097c439"
                },
                "type": "document",
                "entry": [
                  {
                    "fullUrl": "Composition/9044c2cc-dcec-4b9d-b005-bfa8be978aa8",
                    "resource": {
                      "resourceType": "Composition",
                      "id": "9044c2cc-dcec-4b9d-b005-bfa8be978aa8",
                      "status": "final",
                      "type": {
                        "coding": [
                          {
                            "system": "http://loinc.org",
                            "code": "11526-1",
                            "display": "Pathology study"
                          }
                        ],
                        "text": "Pathology study"
                      },
                      "subject": {
                        "reference": "Patient/5c554347-4290-4b05-83ac-6637ff3bfb40",
                        "type": "Patient"
                      },
                      "encounter": {
                        "reference": "Encounter/6fe12f5b-e35c-4c92-a492-96feda5a1a3b",
                        "type": "Encounter",
                        "display": "unknown"
                      },
                      "date": "2022-04-18",
                      "author": [
                        {
                          "reference": "Practitioner/fb5da4d8-e0f0-4434-8d29-4419b065c4d7",
                          "type": "Practitioner",
                          "display": "Unknown"
                        }
                      ],
                      "title": "Pathology study",
                      "section": [
                        {
                          "title": "General",
                          "code": {
                            "coding": [
                              {
                                "system": "",
                                "display": "Unrecognized Section"
                              }
                            ],
                            "text": "General"
                          },
                          "text": {
                            "div": "<div>\r\n\t\t\t\t\t\t\t<h1>General</h1>\r\n\t\t\t\t\t\t\t<p>The doctor prescried 200mg Ibuprofen.</p>\r\n\t\t\t\t\t</div>"
                          },
                          "entry": [
                            {
                              "reference": "List/db388912-b5fb-4073-a74c-2751fd3374dd",
                              "type": "List",
                              "display": "General"
                            }
                          ]
                        }
                      ]
                    }
                  },
                  {
                    "fullUrl": "Practitioner/fb5da4d8-e0f0-4434-8d29-4419b065c4d7",
                    "resource": {
                      "resourceType": "Practitioner",
                      "id": "fb5da4d8-e0f0-4434-8d29-4419b065c4d7",
                      "extension": [
                        {
                          "extension": [
                            { "url": "offset", "valueInteger": -1 },
                            { "url": "length", "valueInteger": 7 }
                          ],
                          "url": "http://hl7.org/fhir/StructureDefinition/derivation-reference"
                        }
                      ],
                      "name": [{ "text": "Unknown", "family": "Unknown" }]
                    }
                  },
                  {
                    "fullUrl": "Patient/5c554347-4290-4b05-83ac-6637ff3bfb40",
                    "resource": {
                      "resourceType": "Patient",
                      "id": "5c554347-4290-4b05-83ac-6637ff3bfb40",
                      "gender": "unknown"
                    }
                  },
                  {
                    "fullUrl": "Encounter/6fe12f5b-e35c-4c92-a492-96feda5a1a3b",
                    "resource": {
                      "resourceType": "Encounter",
                      "id": "6fe12f5b-e35c-4c92-a492-96feda5a1a3b",
                      "meta": {
                        "profile": [
                          "http://hl7.org/fhir/us/core/StructureDefinition/us-core-encounter"
                        ]
                      },
                      "status": "finished",
                      "class": {
                        "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                        "display": "unknown"
                      },
                      "subject": {
                        "reference": "Patient/5c554347-4290-4b05-83ac-6637ff3bfb40",
                        "type": "Patient"
                      }
                    }
                  },
                  {
                    "fullUrl": "MedicationStatement/24e860ce-2fdc-4745-aa9e-7d30bb487c4e",
                    "resource": {
                      "resourceType": "MedicationStatement",
                      "id": "24e860ce-2fdc-4745-aa9e-7d30bb487c4e",
                      "extension": [
                        {
                          "extension": [
                            { "url": "offset", "valueInteger": 27 },
                            { "url": "length", "valueInteger": 9 }
                          ],
                          "url": "http://hl7.org/fhir/StructureDefinition/derivation-reference"
                        }
                      ],
                      "status": "active",
                      "medicationCodeableConcept": {
                        "coding": [
                          {
                            "system": "http://www.nlm.nih.gov/research/umls",
                            "code": "C0020740",
                            "display": "Ibuprofen"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/aod",
                            "code": "0000019879"
                          },
                          {
                            "system": "http://www.whocc.no/atc",
                            "code": "M01AE01"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/ccpss",
                            "code": "0046165"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/chv",
                            "code": "0000006519"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/csp",
                            "code": "2270-2077"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/drugbank",
                            "code": "DB01050"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/gs",
                            "code": "1611"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/lch_nw",
                            "code": "sh97005926"
                          },
                          { "system": "http://loinc.org", "code": "LP16165-0" },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/medcin",
                            "code": "40458"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/mmsl",
                            "code": "d00015"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/msh",
                            "code": "D007052"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/mthspl",
                            "code": "WK2XYI10QM"
                          },
                          {
                            "system": "http://ncimeta.nci.nih.gov",
                            "code": "C561"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/nci_ctrp",
                            "code": "C561"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/nci_dcp",
                            "code": "00803"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/nci_dtp",
                            "code": "NSC0256857"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/nci_fda",
                            "code": "WK2XYI10QM"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/nci_nci-gloss",
                            "code": "CDR0000613511"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/nddf",
                            "code": "002377"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/pdq",
                            "code": "CDR0000040475"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/rcd",
                            "code": "x02MO"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
                            "code": "5640"
                          },
                          {
                            "system": "http://snomed.info/sct",
                            "code": "E-7772"
                          },
                          {
                            "system": "http://snomed.info/sct/900000000000207008",
                            "code": "C-603C0"
                          },
                          {
                            "system": "http://snomed.info/sct/731000124108",
                            "code": "387207008"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/usp",
                            "code": "m39860"
                          },
                          {
                            "system": "http://www.nlm.nih.gov/research/umls/uspmg",
                            "code": "MTHU000060"
                          },
                          {
                            "system": "http://hl7.org/fhir/ndfrt",
                            "code": "4017840"
                          }
                        ],
                        "text": "Ibuprofen"
                      },
                      "subject": {
                        "reference": "Patient/5c554347-4290-4b05-83ac-6637ff3bfb40",
                        "type": "Patient"
                      },
                      "context": {
                        "reference": "Encounter/6fe12f5b-e35c-4c92-a492-96feda5a1a3b",
                        "type": "Encounter",
                        "display": "unknown"
                      },
                      "dosage": [
                        {
                          "text": "200mg",
                          "doseAndRate": [{ "doseQuantity": { "value": 200 } }]
                        }
                      ]
                    }
                  },
                  {
                    "fullUrl": "List/db388912-b5fb-4073-a74c-2751fd3374dd",
                    "resource": {
                      "resourceType": "List",
                      "id": "db388912-b5fb-4073-a74c-2751fd3374dd",
                      "status": "current",
                      "mode": "snapshot",
                      "title": "General",
                      "subject": {
                        "reference": "Patient/5c554347-4290-4b05-83ac-6637ff3bfb40",
                        "type": "Patient"
                      },
                      "encounter": {
                        "reference": "Encounter/6fe12f5b-e35c-4c92-a492-96feda5a1a3b",
                        "type": "Encounter",
                        "display": "unknown"
                      },
                      "entry": [
                        {
                          "item": {
                            "reference": "MedicationStatement/24e860ce-2fdc-4745-aa9e-7d30bb487c4e",
                            "type": "MedicationStatement",
                            "display": "Ibuprofen"
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ],
          "errors": [],
          "modelVersion": "2022-03-01"
        }
      }
    ]
  }
}

```


# [Text Analytics API](#tab/text-analytics-api)

```bash
curl -X POST 'http://<serverURL>:5000/text/analytics/v3.1/entities/health' --header 'Content-Type: application/json' --header 'accept: application/json' --data-binary @example.json

```

The following JSON is an example of a JSON file attached to the Text Analytics for health request's POST body:

```json
example.json

{
  "documents": [
    {
      "language": "en",
      "id": "1",
      "text": "Patient reported itchy sores after swimming in the lake."
    },
    {
      "language": "en",
      "id": "2",
      "text": "Prescribed 50mg benadryl, taken twice daily."
    }
  ]
}
```

### Container response body

The following JSON is an example of the Text Analytics for health response body from the containerized synchronous call:

```json
{
    "documents": [
        {
            "id": "1",
            "entities": [
                {
                    "offset": 25,
                    "length": 5,
                    "text": "100mg",
                    "category": "Dosage",
                    "confidenceScore": 1.0
                },
                {
                    "offset": 31,
                    "length": 10,
                    "text": "remdesivir",
                    "category": "MedicationName",
                    "confidenceScore": 1.0,
                    "name": "remdesivir",
                    "links": [
                        {
                            "dataSource": "UMLS",
                            "id": "C4726677"
                        },
                        {
                            "dataSource": "DRUGBANK",
                            "id": "DB14761"
                        },
                        {
                            "dataSource": "GS",
                            "id": "6192"
                        },
                        {
                            "dataSource": "MEDCIN",
                            "id": "398132"
                        },
                        {
                            "dataSource": "MMSL",
                            "id": "d09540"
                        },
                        {
                            "dataSource": "MSH",
                            "id": "C000606551"
                        },
                        {
                            "dataSource": "MTHSPL",
                            "id": "3QKI37EEHE"
                        },
                        {
                            "dataSource": "NCI",
                            "id": "C152185"
                        },
                        {
                            "dataSource": "NCI_FDA",
                            "id": "3QKI37EEHE"
                        },
                        {
                            "dataSource": "NDDF",
                            "id": "018308"
                        },
                        {
                            "dataSource": "RXNORM",
                            "id": "2284718"
                        },
                        {
                            "dataSource": "SNOMEDCT_US",
                            "id": "870592005"
                        },
                        {
                            "dataSource": "VANDF",
                            "id": "4039395"
                        }
                    ]
                },
                {
                    "offset": 42,
                    "length": 13,
                    "text": "intravenously",
                    "category": "MedicationRoute",
                    "confidenceScore": 1.0
                },
                {
                    "offset": 73,
                    "length": 7,
                    "text": "120 min",
                    "category": "Time",
                    "confidenceScore": 0.94
                }
            ],
            "relations": [
                {
                    "relationType": "DosageOfMedication",
                    "entities": [
                        {
                            "ref": "#/documents/0/entities/0",
                            "role": "Dosage"
                        },
                        {
                            "ref": "#/documents/0/entities/1",
                            "role": "Medication"
                        }
                    ]
                },
                {
                    "relationType": "RouteOfMedication",
                    "entities": [
                        {
                            "ref": "#/documents/0/entities/1",
                            "role": "Medication"
                        },
                        {
                            "ref": "#/documents/0/entities/2",
                            "role": "Route"
                        }
                    ]
                },
                {
                    "relationType": "TimeOfMedication",
                    "entities": [
                        {
                            "ref": "#/documents/0/entities/1",
                            "role": "Medication"
                        },
                        {
                            "ref": "#/documents/0/entities/3",
                            "role": "Time"
                        }
                    ]
                }
            ],
            "warnings": []
        }
    ],
    "errors": [],
    "modelVersion": "2021-03-01"
}
```

---



## Run the container with client library support

Starting with container version `3.0.017010001-onprem-amd64` (or if you use the `latest` container), you can run the Text Analytics for health container using the [client library](../quickstart.md). To do so, add the following parameter to the `docker run` command:

`enablelro=true`

Afterwards when you authenticate the client object, use the endpoint that your container is running on:

`http://localhost:5000`

For example, if you're using C# you would use the following code:

```csharp
var client = new TextAnalyticsClient("http://localhost:5000", "your-text-analytics-key");
```

## Stop the container


To shut down the container, in the command-line environment where the container is running, select <kbd>Ctrl+C</kbd>.


## Troubleshooting

If you run the container with an output [mount](configure-containers.md#mount-settings) and logging enabled, the container generates log files. These log files are useful for troubleshooting issues that may occur while the container is starting or running.


> **Tip:**
> For more troubleshooting information and guidance, see [Azure AI containers frequently asked questions (FAQ)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/containers/container-faq.yml).


## Billing

Text Analytics for health containers send billing information to Azure, using a _Language_ resource on your Azure account.


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

In this article, you learned concepts and workflow for downloading, installing, and running Text Analytics for health containers. In summary:

* Text Analytics for health provides a Linux container for Docker
* Container images are downloaded from the Microsoft Container Registry (MCR).
* Container images run in Docker.
* You can use either the REST API or SDK to call operations in Text Analytics for health containers by specifying the host URI of the container.
* You must specify billing information when instantiating a container.

> **Important:**
> Azure AI containers aren't licensed to run without being connected to Azure for metering. Customers must ensure that the containers are always able to communicate billing information to the metering service. Azure AI containers don't send customer data (for example, text that is being analyzed) to Microsoft.

## Next steps

* See [Configure containers](configure-containers.md) for configuration settings.
