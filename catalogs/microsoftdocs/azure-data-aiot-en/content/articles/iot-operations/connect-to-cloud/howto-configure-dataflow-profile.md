---
title: Configure data flow profile in Azure IoT Operations
description: How to configure a data flow profile in Azure IoT Operations to change a data flow behavior.
author: dominicbetts
ms.author: dobett
ms.service: azure-iot-operations
ms.subservice: azure-data-flows
ms.topic: how-to
ms.date: 07/22/2026
ai-usage: ai-assisted

#CustomerIntent: As an operator, I want to understand how I can configure a data flow profile to control data flow behavior.
---

# Configure data flow profile

Data flow profiles can be used to group data flows together so that they share the same configuration. You can create multiple data flow profiles to manage sets of different data flow configurations. 

The most important setting is the instance count. For a given data flow, the instance count determines the number of copies that run on your cluster. For example, you might have a data flow profile with a single instance for development and testing, and another profile with multiple instances for production. Or, you might use a data flow profile with low instance count for low-throughput data flows and a profile with high instance count for high-throughput data flows. Similarly, you can create a data flow profile with different diagnostic settings for debugging purposes.

You should avoid associating too many data flows with a single data flow profile. If you have a large number of data flows, create multiple data flow profiles to reduce the risk of exceeding the data flow profile configuration size limit of 70.

## Set your environment variables


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


This article also uses the following environment variables for values that you choose: `PROFILE` (the name of the data flow profile), `INSTANCE_COUNT`, and `LOG_LEVEL`. Set each one before you run the related commands.

## Default data flow profile

A data flow profile named *default* is created when Azure IoT Operations is deployed. You can use this data flow profile to get started with Azure IoT Operations.

# [Portal](#tab/portal)

1. To view the default data flow profile, go to your IoT Operations instance in the Azure portal.
1. In the left pane under **Components**, select **Data flow profiles**.
1. Select the **default** data flow profile.

    Screenshot of the Azure portal displaying the default data flow profile details, including instance count and configuration options.

# [Azure CLI](#tab/azure-cli)

Use the [az iot ops dataflow profile show](https://learn.microsoft.com/cli/azure/iot/ops/dataflow/profile#az-iot-ops-dataflow-profile-show) command to view the default data flow profile:

```azurecli
az iot ops dataflow profile show --resource-group $RESOURCE_GROUP --instance $AIO_INSTANCE_NAME --name default
```

Here's an example command to view the default data flow profile:

```azurecli
az iot ops dataflow profile show --resource-group myResourceGroup --instance myAioInstance --name default
```

# [Bicep](#tab/bicep)

```bicep
param aioInstanceName string = '<AIO_INSTANCE_NAME>'
param customLocationName string = '<CUSTOM_LOCATION_NAME>'

// Pointer to the Azure IoT Operations instance
resource aioInstance 'Microsoft.IoTOperations/instances@2026-07-01' existing = {
  name: aioInstanceName
}

// Pointer to your custom location where Azure IoT Operations is deployed
resource customLocation 'Microsoft.ExtendedLocation/customLocations@2021-08-31-preview' existing = {
  name: customLocationName
}

// Pointer to the default data flow profile
resource defaultDataflowProfile 'Microsoft.IoTOperations/instances/dataflowProfiles@2026-07-01' = {
  parent: aioInstance
  name: 'default'
  extendedLocation: {
    name: customLocation.id
    type: 'CustomLocation'
  }
  properties: {
    instanceCount: 1
  }
}
```

# [Kubernetes (debug only)](#tab/kubernetes)


> **Important:**
> The use of Kubernetes deployment manifests isn't supported in production environments and should only be used for debugging and testing.


```yaml
apiVersion: connectivity.iotoperations.azure.com/v1
kind: DataflowProfile
metadata:
  name: default
  namespace: azure-iot-operations
spec:
  instanceCount: 1
```

---

Unless you need additional throughput or redundancy, you can use the default data flow profile for your data flows. If you need to adjust the instance count or other settings, you can create a new data flow profile.

## Create a new data flow profile

To create a new data flow profile, specify the name of the profile and the instance count.

> **Important:**
> Data profile name length must be between 1 and 39 characters.


# [Portal](#tab/portal)

1. In the Azure portal, go to your IoT Operations instance.
1. In the left pane under **Components**, select **Data flow profiles**.
1. Select **+ Data flow profile** to create a new data flow profile.
1. In the **Create data flow profile** pane, enter a name for the data flow profile and set the instance count. You can also set other settings such as diagnostics settings.

    Screenshot of the Azure portal displaying the create data flow profile pane, including fields for name, instance count, and configuration options.

# [Azure CLI](#tab/azure-cli)

Use the [az iot ops dataflow profile create](https://learn.microsoft.com/cli/azure/iot/ops/dataflow/profile#az-iot-ops-dataflow-profile-create) command to create a new data flow profile:

```azurecli
az iot ops dataflow profile create --resource-group $RESOURCE_GROUP --instance $AIO_INSTANCE_NAME --name $PROFILE
```
Here's an example command to create a new data flow profile named `my-dataflow-profile`:

```azurecli
az iot ops dataflow profile create --resource-group myResourceGroup --instance myAioInstance --name my-dataflow-profile
```

# [Bicep](#tab/bicep)

```bicep
resource dataflowProfile 'Microsoft.IoTOperations/instances/dataflowProfiles@2026-07-01' = {
  parent: aioInstance
  name: '<NAME>'
  properties: {
    instanceCount: <COUNT>
  }
}
```

# [Kubernetes (debug only)](#tab/kubernetes)


> **Important:**
> The use of Kubernetes deployment manifests isn't supported in production environments and should only be used for debugging and testing.


```yaml
apiVersion: connectivity.iotoperations.azure.com/v1
kind: DataflowProfile
metadata:
  name: '<NAME>'
  namespace: azure-iot-operations
spec:
  instanceCount: <COUNT>
```

---

## Scaling

You can scale the data flow profile to adjust the number of instances that run the data flows. For a given data flow, instance count is the number of copies that run on your cluster. Increasing the instance count can improve the throughput of the data flows by creating multiple clients to process the data. When using data flows with cloud services that have rate limits per client, increasing the instance count can help you stay within the rate limits.

Scaling can also improve the resiliency of the data flows by providing redundancy in case of failures.

> **Important:**
> **Stateful transforms maintain separate state in each instance.** When the instance count is greater than one, [shared subscriptions](howto-configure-dataflow-source.md#shared-subscriptions) distribute incoming messages across instances, and the instances don't share state with each other. A [window](howto-dataflow-graphs-window.md) transform therefore aggregates only a subset of the messages in each instance and must use an instance count of **1**. A [throttle](howto-dataflow-graphs-throttle.md) transform enforces its configured rate independently in each instance. Use an instance count of **1** when the throttle rate limit must apply across all messages in the graph.

To manually scale the data flow profile, specify the number of instances you want to run. For example, to set the instance count to 3:

# [Portal](#tab/portal)

1. In the Azure portal, go to your IoT Operations instance.
1. In the left pane under **Components**, select **Data flow profiles**.
1. Select the data flow profile you want to configure.
1. Use the slider to set the instance count.

    Screenshot of the Azure portal displaying data flow details and the instance count slider set to 3.

# [Azure CLI](#tab/azure-cli)

Use the [az iot ops dataflow profile update](https://learn.microsoft.com/cli/azure/iot/ops/dataflow/profile#az-iot-ops-dataflow-profile-update) command to update the instance count of a data flow profile:

```azurecli
az iot ops dataflow profile update --resource-group $RESOURCE_GROUP --instance $AIO_INSTANCE_NAME --name $PROFILE --profile-instances $INSTANCE_COUNT
```

Here's an example command to set the instance count to three for data flow profile `my-dataflow-profile`:

```azurecli
az iot ops dataflow profile update --resource-group myResourceGroup --instance myAioInstance --name my-dataflow-profile --profile-instances 3
```

# [Bicep](#tab/bicep)

```bicep
properties: {
  instanceCount: 3
}
```


# [Kubernetes (debug only)](#tab/kubernetes)


> **Important:**
> The use of Kubernetes deployment manifests isn't supported in production environments and should only be used for debugging and testing.


```yaml
spec:
  instanceCount: 3
```

---

## Diagnostic settings

You can configure other diagnostics settings for a data flow profile such as log level.

In most cases, the default settings are sufficient. However, you can override the log level or other settings for debugging. 

To learn how to configure these diagnostic settings, see [ProfileDiagnostics](https://learn.microsoft.com/rest/api/iotoperations/dataflow-profile/create-or-update?#profilediagnostics).

# [Portal](#tab/portal)

1. In the Azure portal, go to your IoT Operations instance.
1. Under **Components**, select **Data flow profiles**.
1. Select the data flow profile you want to configure.

    Screenshot of the Azure portal displaying data flow details and the log level options listed.

# [Azure CLI](#tab/azure-cli)

Use the [az iot ops dataflow profile update](https://learn.microsoft.com/cli/azure/iot/ops/dataflow/profile#az-iot-ops-dataflow-profile-update) command to update the diagnostic settings of a data flow profile:

```azurecli
az iot ops dataflow profile update --resource-group $RESOURCE_GROUP --instance $AIO_INSTANCE_NAME --name $PROFILE --log-level $LOG_LEVEL
```

Here's an example command that sets the log level to `debug` for data flow profile `my-dataflow-profile`:

```azurecli
az iot ops dataflow profile update --resource-group myResourceGroup --instance myAioInstance --name my-dataflow-profile --log-level debug
```

# [Bicep](#tab/bicep)

```bicep
resource dataflowProfile 'Microsoft.IoTOperations/instances/dataflowProfiles@2026-07-01' = {
  parent: aioInstance
  name: '<NAME>'
  properties: {
    instanceCount: 1
    diagnostics: {
      {
        logs: {
          level: 'debug'
        }
      }
    }
  }
}
```

# [Kubernetes (debug only)](#tab/kubernetes)


> **Important:**
> The use of Kubernetes deployment manifests isn't supported in production environments and should only be used for debugging and testing.


```yaml
apiVersion: connectivity.iotoperations.azure.com/v1
kind: DataflowProfile
metadata:
  name: '<NAME>'
  namespace: azure-iot-operations
spec:
  instanceCount: 1
  diagnostics:
    logs:
      level: debug
```

---

## Next steps

To learn more about data flows, see [Create a data flow](howto-create-dataflow.md).
