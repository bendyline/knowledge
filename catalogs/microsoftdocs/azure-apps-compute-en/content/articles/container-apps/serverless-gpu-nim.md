---
title: 'Tutorial: Deploy an NVIDIA Llama3 NIM to Azure Container Apps'
description: Deploy a NVIDIA NIM to Azure Container Apps.
services: container-apps
author: craigshoemaker
ms.service: azure-container-apps
ms.topic: tutorial
ms.date: 03/16/2025
ms.author: cachai
ms.devlang: azurecli
---

# Tutorial: Deploy an NVIDIA Llama3 NIM to Azure Container Apps

NVIDIA Inference Microservices (NIMs) are optimized, containerized AI inference microservices which simplify and accelerate how you build AI applications. These models are pre-packaged, scalable, and performance-tuned for direct deployment as secure endpoints on Azure Container Apps. When you use Azure Container Apps with serverless GPUs, you can run these NIMs efficiently without having to manage the underlying infrastructure.​

In this tutorial, you learn to deploy a Llama3 NVIDIA NIM to Azure Container Apps using serverless GPUs.

This tutorial uses a premium instance of Azure Container Registry to improve cold start performance when working with serverless GPUs. If you don't want to use a premium Azure Container Registry, make sure to modify the `az acr create` command in this tutorial to set `--sku` to `basic`.

## Prerequisites

| Resource | Description |
| --- | --- |
| Azure account | An Azure account with an active subscription.<br><br>If you don't have one, you [can create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). |
| Azure CLI | Install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli). |
| NVIDIA NGC API key | You can get an API key from the [NVIDIA GPU Cloud (NGC) website](https://catalog.ngc.nvidia.com). |


## Setup

To sign in to Azure from the CLI, run the following command and follow the prompts to complete the authentication process.

# [Bash](#tab/bash)

```azurecli
az login
```

# [PowerShell](#tab/powershell)

```azurepowershell
Connect-AzAccount
```

---

To ensure you're running the latest version of the CLI, run the upgrade command.

# [Bash](#tab/bash)

```azurecli
az upgrade
```

# [PowerShell](#tab/powershell)

```azurepowershell
Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force
```

Ignore any warnings about modules currently in use.

---

Next, install or update the Azure Container Apps extension for the CLI.

If you receive errors about missing parameters when you run `az containerapp` commands in Azure CLI or cmdlets from the `Az.App` module in PowerShell, be sure you have the latest version of the Azure Container Apps extension installed.

# [Bash](#tab/bash)

```azurecli
az extension add --name containerapp --upgrade
```

> **Note:**
> Starting in May 2024, Azure CLI extensions no longer enable preview features by default. To access Container Apps [preview features](whats-new.md), install the Container Apps extension with `--allow-preview true`.
> ```azurecli
> az extension add --name containerapp --upgrade --allow-preview true
> ```

# [PowerShell](#tab/powershell)

```azurepowershell
Install-Module -Name Az.App
```

Make sure to update the `Az.App` module to the latest version.

```azurepowershell
Update-Module -Name Az.App
```

---

Now that the current extension or module is installed, register the `Microsoft.App` and `Microsoft.OperationalInsights` namespaces.

# [Bash](#tab/bash)

```azurecli
az provider register --namespace Microsoft.App
```

```azurecli
az provider register --namespace Microsoft.OperationalInsights
```

# [PowerShell](#tab/powershell)

```azurepowershell
Register-AzResourceProvider -ProviderNamespace Microsoft.App
```

```azurepowershell
Register-AzResourceProvider -ProviderNamespace Microsoft.OperationalInsights
```

---


1. Set up environment variables by naming the resource group and setting the location.

    ```bash
    RESOURCE_GROUP="my-resource-group"
    LOCATION="swedencentral"
    ```

    Next, generate a unique container registry name.

    ```bash
    SUFFIX=$(head /dev/urandom | tr -dc 'a-z0-9' | head -c 6)
    ACR_NAME="mygpututorialacr${SUFFIX}"
    ```

    Finally, set variables to name the environment and identify the environment, workload profile type, container app name, and container.

    ```bash
    CONTAINERAPPS_ENVIRONMENT="my-environment-name"
    GPU_TYPE="Consumption-GPU-NC24-A100"
    CONTAINER_APP_NAME="llama3-nim"
    CONTAINER_AND_TAG="meta/llama-3.1-8b-instruct:latest"
    NGC_SECRET=<Your NVIDIA NGC API Key>
    ```


## Create an Azure resource group

Create a resource group to organize the services related to your container app deployment.

# [Bash](#tab/bash)

```azurecli
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION
```

# [PowerShell](#tab/powershell)

```azurepowershell
New-AzResourceGroup -Location $Location -Name $ResourceGroupName
```

---



1. Create an Azure Container Registry (ACR).

    > **Note:**
    > This tutorial uses a premium Azure Container Registry to improve cold start performance when working with serverless GPUs. If you don't want to use a premium Azure Container Registry, modify the following command and set `--sku` to `basic`.

    ```azurecli
    az acr create \
      --resource-group $RESOURCE_GROUP \
      --name $ACR_NAME \
      --location $LOCATION \
      --sku premium
    ```

## Import the NVIDIA NIM image into your Azure Container Registry

Next, import the image from NVIDIA GPU Cloud to Azure Container Registry.

> **Note:**
> NVIDIA NICs each have their own hardware requirements. Make sure the GPU type you select supports the [NIM](https://build.nvidia.com/models?filters=nimType%3Anim_type_run_anywhere&q=llama) of your choice. The Llama3 NIM used in this tutorial can run on NVIDIA A100 GPUs.

1. Authenticate to Azure Container Registry.

    ```bash
    az acr login --name $ACR_NAME
    ```

1. Push the image to Azure Container Registry.

    ```azurecli
    az acr import \
        --name $ACR_NAME \
        --source nvcr.io/nim/$CONTAINER_AND_TAG \
        --image $CONTAINER_AND_TAG \
        --username '$oauthtoken' \
        --password $NGC_SECRET
        
    ```

## Enable artifact streaming (recommended but optional)

When your container app runs, it pulls the container from your container registry. When you have larger images like in the case of AI workloads, this image pull may take some time. By enabling artifact streaming, your container app will load the essential parts of your image first, reducing the amount of time to startup your container. Use the following steps to enable artifact streaming.

> **Note:**
> The following commands can take a long time to complete.

1. Enable artifact streaming on your container registry.

    ```azurecli
    az acr artifact-streaming update \
        --name $ACR_NAME \
        --repository llama-3.1-8b-instruct \
        --enable-streaming True
    ```

1. Enable artifact streaming on the container image.

    ```azurecli
    az acr artifact-streaming create \
      --name $ACR_NAME \
      --image $CONTAINER_AND_TAG
    ```

## Create your container app

Next you create a container app with the NVIDIA GPU Cloud API key.

1. Create the container app environment.

    ```azurecli
    az containerapp env create \
      --name $CONTAINERAPPS_ENVIRONMENT \
      --resource-group $RESOURCE_GROUP \
      --location $LOCATION
    ```

1. Add the GPU workload profile to your environment.

    ```azurecli
    az containerapp env workload-profile add \
        --resource-group $RESOURCE_GROUP \
        --name $CONTAINERAPPS_ENVIRONMENT \
        --workload-profile-type $GPU_TYPE \
        --workload-profile-name LLAMA_PROFILE
    ```

1. Create the container app.

    ```azurecli
    az containerapp create \
      --name $CONTAINER_APP_NAME \
      --resource-group $RESOURCE_GROUP \
      --environment $CONTAINERAPPS_ENVIRONMENT \
      --image $ACR_NAME.azurecr.io/$CONTAINER_AND_TAG \
      --cpu 24 \
      --memory 220 \
      --target-port 8000 \
      --ingress external \
      --secrets ngc-api-key=<PASTE_NGC_API_KEY_HERE> \
      --env-vars NGC_API_KEY=secretref:ngc-api-key \
      --registry-server $ACR_NAME.azurecr.io \
      --workload-profile-name LLAMA_PROFILE \
      --query properties.configuration.ingress.fqdn
    ```

    This command returns the URL of your container app. Set this value aside in a text editor for use in a following command.

> **Note:**
> Some NIMs have longer startup times. To account for this, you can configure a [health probe](health-probes.md) or set your container app's min-replica count with `--min-replicas 1` to keep a replica running at all times.

## Verify the application works

You can verify a successful deployment by sending a request `POST` request to your application.

Before you run this command, make  sure you replace the `<YOUR_CONTAINER_APP_URL>` URL with your container app URL returned from the previous command.

```bash
curl -X POST \
  'http://<YOUR_CONTAINER_APP_URL>/v1/completions' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "meta/llama-3.1-8b-instruct",
    "prompt":  [{"role":"user", "content":"Once upon a time..."}],
    "max_tokens": 64
  }'
```

## Improving performance with volume mounts (optional)

When starting up and using artifact streaming with Azure Container Registry, Azure Container Apps is still pulling the images from the container registry at startup. This action results in a cold start even with the optimized artifact streaming.

For even faster cold start times, many of the NIMs provide a volume mount path to store your image in a cache directory. You can use this cache directory to store the model weights and other files that the NIM needs to run.

To set up a volume mount for the Llama3 NIM, you need to set a volume mount on the `./opt/nim/.cache` as specified in the [NVIDIA Llama-3.1-8b documentation](https://build.nvidia.com/meta/llama-3_1-8b-instruct/deploy). To do so, follow the steps in the [volume mounts tutorial](storage-mounts-azure-files.md) and set the volume mount path to `/opt/nim/.cache`.

## Clean up resources

If you're not going to continue to use this application, run the following command to delete the resource group along with all the resources created in this tutorial.

>**Caution:**
> The following command deletes the specified resource group and all resources contained within it. This command also deletes any resources outside the scope of this tutorial that exist in this resource group.

```azurecli
az group delete --name $RESOURCE_GROUP
```

> **Tip:**
> Having issues? Let us know on GitHub by opening an issue in the [Azure Container Apps repo](https://github.com/microsoft/azure-container-apps).

## Related content

- [Serverless GPUs overview](gpu-serverless-overview.md)
- [Tutorial: Generate image with GPUs](gpu-image-generation.md)
