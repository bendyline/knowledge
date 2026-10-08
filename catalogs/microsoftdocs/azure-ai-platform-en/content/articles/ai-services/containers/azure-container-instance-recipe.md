---
title: Azure Container Instance recipe
titleSuffix: Foundry Tools
description: Learn how to deploy Azure AI containers on Azure Container Instance
author: aahill
manager: mcleans
ms.custom: devx-track-azurecli
ms.service: foundry-tools
ms.topic: how-to
ms.date: 10/02/2025
ms.author: aahi
#Customer intent: As a potential customer, I want to know more about how Foundry Tools provides and supports Docker containers for each service.
---

# Deploy and run containers on Azure Container Instance

With the following steps, scale Foundry Tools applications in the cloud easily with Azure [Container Instances](https://learn.microsoft.com/azure/container-instances/). Containerization helps you focus on building your applications instead of managing the infrastructure. For more information on using containers, see [features and benefits](../cognitive-services-container-support.md?context=/azure/foundry-classic/context/context#features-and-benefits).

## Prerequisites

The recipe works with any Foundry Tools container. The Foundry resource must be created before using the recipe. Each Foundry Tool that supports containers has a "How to install" article for installing and configuring the service for a container. Some services require a file or set of files as input for the container, it is important that you understand and have used the container successfully before using this solution.

* An Azure resource for the Foundry Tool that you're using.
* Azure resource **endpoint URL** - review your specific service's "How to install" for the container, to find where the endpoint URL is from within the Azure portal, and what a correct example of the URL looks like. The exact format can change from service to service.
* Azure resource **key** - the keys are on the **Keys** page for the Azure resource. You only need one of the two keys. The key is a string of 84 alpha-numeric characters.

* A single Foundry Tools container on your local host (your computer). Make sure you can:
  * Pull down the image with a `docker pull` command.
  * Run the local container successfully with all required configuration settings with a `docker run` command.
  * Call the container's endpoint, getting a response of HTTP 2xx and a JSON response back.

All variables in angle brackets, `<>`, need to be replaced with your own values. This replacement includes the angle brackets.

> **Important:**
> The LUIS container requires a `.gz` model file that is pulled in at runtime. The container must be able to access this model file via a volume mount from the container instance. To upload a model file, follow these steps:
> 1. [Create an Azure file share](https://learn.microsoft.com/azure/storage/files/storage-how-to-create-file-share). Take note of the Azure Storage account name, key, and file share name as you'll need them later.
> 2. [export your LUIS model (packaged app) from the LUIS portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/LUIS/luis-container-howto.md#export-packaged-app-from-luis). 
> 3. In the Azure portal, navigate to the **Overview** page of your storage account resource, and select **File shares**. 
> 4. Select the file share name that you recently created, then select **Upload**. Then upload your packaged app. 

# [Azure portal](#tab/portal)


## Create an Azure Container Instance resource using the Azure portal

1. Go to the [Create](https://portal.azure.com/#create/Microsoft.ContainerInstances) page for Container Instances.

2. On the **Basics** tab, enter the following details:

    | Setting | Value |
    | --- | --- |
    | Subscription | Select your subscription. |
    | Resource group | Select the available resource group or create a new one such as `cognitive-services`. |
    | Container name | Enter a name such as `cognitive-container-instance`. The name must be in lower caps. |
    | Location | Select a region for deployment. |
    | Image type | If your container image is stored in a container registry that doesn’t require credentials, choose `Public`. If accessing your container image requires credentials, choose `Private`. Refer to [container repositories and images](../cognitive-services-container-support.md?context=/azure/foundry-classic/context/context) for details on whether or not the container image is `Public` or `Private` ("Public Preview"). |
    | Image name | Enter the Foundry Tools container location. The location is what's used as an argument to the `docker pull` command. Refer to the [container repositories and images](../cognitive-services-container-support.md?context=/azure/foundry-classic/context/context) for the available image names and their corresponding repository.<br><br>The image name must be fully qualified specifying three parts. First, the container registry, then the repository, finally the image name: `<container-registry>/<repository>/<image-name>`.<br><br>Here is an example, `mcr.microsoft.com/azure-cognitive-services/keyphrase` would represent the Key Phrase Extraction image in the Microsoft Container Registry under the Foundry Tools repository. Another example is, `containerpreview.azurecr.io/microsoft/cognitive-services-speech-to-text` which would represent the Speech to text image in the Microsoft repository of the Container Preview container registry. |
    | OS type | `Linux` |
    | Size | Change size to the suggested recommendations for your specific Azure AI container:<br>2 CPU cores<br>4 GB |

3. On the **Networking** tab, enter the following details:

    | Setting | Value |
    | --- | --- |
    | Ports | Set the TCP port to `5000`. Exposes the container on port 5000. |

4. On the **Advanced** tab, enter the required **Environment Variables** for the container billing settings of the Azure Container Instance resource:

    | Key | Value |
    | --- | --- |
    | `ApiKey` | Copied from the **Keys and endpoint** page of the resource. It is a 84 alphanumeric-character string with no spaces or dashes, `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`. |
    | `Billing` | Your endpoint URL copied from the **Keys and endpoint** page of the resource. |
    | `Eula` | `accept` |

5. Select **Review and Create**
6. After validation passes, click **Create** to finish the creation process
7. When the resource is successfully deployed, it's ready


# [Azure CLI](#tab/cli)


## Create an Azure Container Instance resource from the Azure CLI

You must first [install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) before running the commands in this article. 

The YAML below defines the Azure Container Instance resource. Copy and paste the contents into a new file, named `my-aci.yaml` and replace the commented values with your own. Refer to the [template format][template-format] for valid YAML. Refer to the [container repositories and images][repositories-and-images] for the available image names and their corresponding repository. For more information of the YAML reference for Container instances, see [YAML reference: Azure Container Instances][aci-yaml-ref].

```yaml
apiVersion: 2018-10-01
location: # < Valid location >
name: # < Container Group name >
properties:
  imageRegistryCredentials: # This is only required if you are pulling a non-public image that requires authentication to access. For example Text Analytics for health.
  - server: containerpreview.azurecr.io
    username: # < The username for the preview container registry >
    password: # < The password for the preview container registry >
  containers:
  - name: # < Container name >
    properties:
      image: # < Repository/Image name >
      environmentVariables: # These env vars are required
        - name: eula
          value: accept
        - name: billing
          value: # < Service specific Endpoint URL >
        - name: apikey
          value: # < Service specific API key >
      resources:
        requests:
          cpu: 4 # Always refer to recommended minimal resources
          memoryInGb: 8 # Always refer to recommended minimal resources
      ports:
        - port: 5000
  osType: Linux
  volumes: # This node, is only required for container instances that pull their model in at runtime, such as LUIS.
  - name: aci-file-share
    azureFile:
      shareName: # < File share name >
      storageAccountName: # < Storage account name>
      storageAccountKey: # < Storage account key >
  restartPolicy: OnFailure
  ipAddress:
    type: Public
    ports:
    - protocol: tcp
      port: 5000
tags: null
type: Microsoft.ContainerInstance/containerGroups
```

> **Note:**
> Not all locations have the same CPU and Memory availability. Refer to the [location and resources][location-to-resource] table for the listing of available resources for containers per location and OS.

We'll rely on the YAML file we created for the [`az container create`][azure-container-create] command. From the Azure CLI, execute the `az container create` command replacing the `<resource-group>` with your own. Additionally, for securing values within a YAML deployment refer to [secure values][secure-values].

```azurecli
az container create -g <resource-group> -f my-aci.yaml
```

The output of the command is `Running...` if valid, after sometime the output changes to a JSON string representing the newly created ACI resource. The container image is more than likely not be available for a while, but the resource is now deployed.

> **Tip:**
> Pay close attention to the locations of Foundry Tools in public preview, as the YAML will needed to be adjusted accordingly to match the location.

[azure-container-create]: https://learn.microsoft.com/cli/azure/container#az_container_create
[template-format]: https://learn.microsoft.com/azure/templates/Microsoft.ContainerInstance/2018-10-01/containerGroups#template-format
[aci-yaml-ref]: https://learn.microsoft.com/azure/container-instances/container-instances-reference-yaml
[repositories-and-images]: ../cognitive-services-container-support.md?context=/azure/foundry-classic/context/context
[location-to-resource]: https://learn.microsoft.com/azure/container-instances/container-instances-region-availability
[secure-values]: https://learn.microsoft.com/azure/container-instances/container-instances-environment-variables#secure-values


---


## Use the Container Instance

# [Azure portal](#tab/portal)

1. Select the **Overview** and copy the IP address. It will be a numeric IP address such as `55.55.55.55`.
1. Open a new browser tab and use the IP address, for example, `http://<IP-address>:5000 (http://55.55.55.55:5000`). You will see the container's home page, letting you know the container is running.

    Container's home page

1. Select **Service API Description** to view the swagger page for the container.

1. Select any of the **POST** APIs and select **Try it out**.  The parameters are displayed including the input. Fill in the parameters.

1. Select **Execute** to send the request to your Container Instance.

    You have successfully created and used Azure AI containers in Azure Container Instance.

# [Azure CLI](#tab/cli)


## Validate that a container is running

There are several ways to validate that the container is running. Locate the *External IP* address and exposed port of the container in question, and open your favorite web browser. Use the various request URLs that follow to validate the container is running. The example request URLs listed here are `http://localhost:5000`, but your specific container might vary. Make sure to rely on your container's *External IP* address and exposed port.

| Request URL | Purpose |
| --- | --- |
| `http://localhost:5000/` | The container provides a home page. |
| `http://localhost:5000/ready` | Requested with GET, this URL provides a verification that the container is ready to accept a query against the model. This request can be used for Kubernetes [liveness and readiness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/). |
| `http://localhost:5000/status` | Also requested with GET, this URL verifies if the api-key used to start the container is valid without causing an endpoint query. This request can be used for Kubernetes [liveness and readiness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/). |
| `http://localhost:5000/swagger` | The container provides a full set of documentation for the endpoints and a **Try it out** feature. With this feature, you can enter your settings into a web-based HTML form and make the query without having to write any code. After the query returns, an example CURL command is provided to demonstrate the HTTP headers and body format that's required. |

Container's home page


> **Note:**
> If you're running the Text Analytics for health container, use the following URL to submit queries: `http://localhost:5000/text/analytics/v3.2-preview.1/entities/health`

---
