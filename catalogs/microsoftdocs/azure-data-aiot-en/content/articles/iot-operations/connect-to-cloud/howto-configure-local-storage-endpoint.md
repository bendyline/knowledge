---
title: Configure a Local Storage Data Flow Endpoint in Azure IoT Operations
description: Learn how to configure a local storage data flow endpoint in Azure IoT Operations.
author: dominicbetts
ms.author: dobett
ms.service: azure-iot-operations
ms.subservice: azure-data-flows
ms.topic: how-to
ms.date: 07/13/2026
ai-usage: ai-assisted

#CustomerIntent: As an operator, I want to understand how to configure a local storage data flow endpoint so that I can create a data flow.
---

# Configure data flow endpoints for local storage

To send data to local storage in Azure IoT Operations, you can configure a data flow endpoint. With this configuration, you can specify the endpoint, authentication, table, and other settings.

## Prerequisites


- An instance of Azure IoT Operations deployed in a Kubernetes cluster. For more information, see [Deploy Azure IoT Operations](../deploy-iot-ops/howto-deploy-iot-operations.md).



- The Azure CLI installed on your development machine. Check [Available Azure CLI extensions](https://learn.microsoft.com/cli/azure/azure-cli-extensions-list) for the minimum required version to use the **azure-iot-ops** extension. Use `az --version` to check your version and `az upgrade` to update if necessary. For more information, see [Install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).
- The Azure IoT Operations extension for the Azure CLI. Use the following command to add the extension or update it to the latest version:

  ```azurecli
  az extension add --upgrade --name azure-iot-ops
  ```


- A [PersistentVolumeClaim (PVC) request](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).


The Azure CLI examples in this article use environment variables so that you can set each value once and then copy and paste the commands as-is. If you're using the Azure IoT Operations Codespaces environment from the [quickstart](../get-started-end-to-end-sample/quickstart-deploy.md), these variables are already set for you and you can skip this step. Otherwise, set the following environment variables in your shell before you run the commands.

The following scripts set the most commonly used environment variables:

| Environment variable | Description |
| --- | --- |
| `SUBSCRIPTION_ID` | The ID of the subscription that contains your Azure IoT Operations instance. |
| `RESOURCE_GROUP` | The name of the resource group that contains your Azure IoT Operations instance. |
| `AIO_INSTANCE_NAME` | The name of your Azure IoT Operations instance. To list your instances, run `az iot ops list -o table`. |
| `CLUSTER_NAME` | The name of the Azure Arc-enabled Kubernetes cluster that hosts your instance. |
| `LOCATION` | The Azure region to use for new resources, for example `eastus`. |

# [Bash](#tab/bash)

```bash
SUBSCRIPTION_ID=<subscription-id>
RESOURCE_GROUP=<resource-group-name>
AIO_INSTANCE_NAME=<instance-name>
CLUSTER_NAME=<cluster-name>
LOCATION=<region>
```

# [PowerShell](#tab/powershell)

```powershell
$SUBSCRIPTION_ID = "<subscription-id>"
$RESOURCE_GROUP = "<resource-group-name>"
$AIO_INSTANCE_NAME = "<instance-name>"
$CLUSTER_NAME = "<cluster-name>"
$LOCATION = "<region>"
```

---

You only need to set the variables that this article uses. This article might use additional environment variables for resource names that you choose. The article explains how to set them where they're introduced.


This article also uses the following environment variables for values that you choose: `ENDPOINT` (the name of the data flow endpoint) and `PVC_NAME` (the persistent volume claim name). Set each one before you run the related commands.

## Create a local storage data flow endpoint

Use the local storage option to send data to a locally available persistent volume. You can use it to upload data via Azure Container Storage enabled by Azure Arc edge volumes.

# [Operations experience](#tab/portal)

1. In the operations experience, select the **Data flow endpoints** tab.
1. Under **Create new data flow endpoint**, select **Local Storage** > **New**.

    Screenshot that shows using the operations experience to create a local storage data flow endpoint.

1. Enter the following settings for the endpoint:

    | Setting | Description |
    | --- | --- |
    | Name | The name of the data flow endpoint. |
    | Persistent volume claim name | The name of the PVC to use for local storage. |

1. Select **Apply** to provision the endpoint.

# [Azure CLI](#tab/cli)

#### Create or replace

Use the [az iot ops dataflow endpoint create fabric-onelake](https://learn.microsoft.com/cli/azure/iot/ops/dataflow/endpoint/create#az-iot-ops-dataflow-endpoint-create-local-storage) command to create or replace a local storage data flow endpoint.

```azurecli
az iot ops dataflow endpoint create local-storage --resource-group $RESOURCE_GROUP --instance $AIO_INSTANCE_NAME --name $ENDPOINT --pvc-ref $PVC_NAME
```

The `--pvc-ref` parameter is the name of the PVC to use for local storage. The PVC must be in the same namespace as the data flow endpoint.

The following example command creates or replaces a local storage data flow endpoint named `local-storage-endpoint`:

```azurecli
az iot ops dataflow endpoint create local-storage --resource-group myResourceGroup --instance myAioInstance --name local-storage-endpoint --pvc-ref mypvc
```

#### Create or change

Use the [az iot ops dataflow endpoint apply](https://learn.microsoft.com/cli/azure/iot/ops/dataflow/endpoint#az-iot-ops-dataflow-endpoint-apply) command to create or change a local storage data flow endpoint.

```azurecli
az iot ops dataflow endpoint apply --resource-group $RESOURCE_GROUP --instance $AIO_INSTANCE_NAME --name $ENDPOINT --config-file config.json
```

The `--config-file` parameter is the path and file name of a JSON configuration file that contains the resource properties.

In this example, assume that a configuration file named `local-storage-endpoint.json` with the following content is stored in the user's home directory:

```json
{
    "endpointType": "LocalStorage",
    "localStorageSettings": {
        "persistentVolumeClaimRef": "<PersistentVolumeClaimName>"
    }
}
```

The following example command creates a new local storage data flow endpoint named `local-storage-endpoint`:

```azurecli
az iot ops dataflow endpoint apply --resource-group myResourceGroupName --instance myAioInstanceName --name local-storage-endpoint --config-file ~/local-storage-endpoint.json
```

# [Bicep](#tab/bicep)

Create a `.bicep` file with the following content:

```bicep
param aioInstanceName string = '<AIO_INSTANCE_NAME>'
param customLocationName string = '<CUSTOM_LOCATION_NAME>'
param endpointName string = '<ENDPOINT_NAME>'
param persistentVCName string = '<PERSISTENT_VC_NAME>'

resource aioInstance 'Microsoft.IoTOperations/instances@2026-07-01' existing = {
  name: aioInstanceName
}
resource customLocation 'Microsoft.ExtendedLocation/customLocations@2021-08-31-preview' existing = {
  name: customLocationName
}
resource localStorageDataflowEndpoint 'Microsoft.IoTOperations/instances/dataflowEndpoints@2026-07-01' = {
  parent: aioInstance
  name: endpointName
  extendedLocation: {
    name: customLocation.id
    type: 'CustomLocation'
  }
  properties: {
    endpointType: 'LocalStorage'
    localStorageSettings: {
      persistentVolumeClaimRef: persistentVCName
    }
  }
}
```

Deploy the file via the Azure CLI:

```azurecli
az deployment group create --resource-group $RESOURCE_GROUP --template-file main.bicep
```

# [Kubernetes (debug only)](#tab/kubernetes)


> **Important:**
> The use of Kubernetes deployment manifests isn't supported in production environments and should only be used for debugging and testing.


Create a Kubernetes manifest `.yaml` file with the following content:

```yaml
apiVersion: connectivity.iotoperations.azure.com/v1
kind: DataflowEndpoint
metadata:
  name: <ENDPOINT_NAME>
  namespace: azure-iot-operations
spec:
  endpointType: LocalStorage
  localStorageSettings:
    persistentVolumeClaimRef: <PVC_NAME>
```

Apply the manifest file to the Kubernetes cluster:

```bash
kubectl apply -f main.yaml
```

---

The PVC must be in the same namespace as `DataflowEndpoint`.

## Supported serialization formats

The only supported serialization format is Parquet.

## Use Azure Container Storage enabled by Azure Arc

You can use the local storage data flow endpoint together with [Azure Container Storage enabled by Azure Arc](https://learn.microsoft.com/azure/azure-arc/container-storage/howto-configure-cloud-ingest-subvolumes) to store data locally or send data to a cloud destination.

> **Important:**
> You must install [Azure Container Storage enabled by Azure Arc](https://learn.microsoft.com/azure/azure-arc/container-storage/howto-install-edge-volumes) before you use it with a local storage data flow endpoint.

### Local shared volume

To write to a local shared volume, first create a PVC according to the instructions in [Local shared edge volumes](https://learn.microsoft.com/azure/azure-arc/container-storage/tutorial-create-local-shared-volume).

When you configure your local storage data flow endpoint, input the PVC name under `persistentVolumeClaimRef`.

### Cloud ingest

To write your data to the cloud, follow the instructions in [Cloud ingest edge volumes configuration](https://learn.microsoft.com/azure/azure-arc/container-storage/howto-configure-cloud-ingest-subvolumes) to create a PVC and attach a subvolume for the cloud destination that you want.

To configure cloud ingest, your cluster must have secure settings enabled. The cloud ingest feature relies on [workload identity federation](../secure-iot-ops/howto-enable-secure-settings.md#enable-the-cluster-for-secure-settings).

> **Important:**
> Don't forget to create the subvolume after you create the PVC. Otherwise, the data flow fails to start and the logs show a "read-only file system" error.

When you configure your local storage data flow endpoint, input the PVC name under `persistentVolumeClaimRef`.

Finally, when you create the data flow, the [data destination](howto-configure-dataflow-destination.md#configure-the-data-destination-topic-container-or-table) parameter must match the `spec.path` parameter that you created for your subvolume during configuration.

## Next step
> 
> [Create a data flow](howto-create-dataflow.md)
