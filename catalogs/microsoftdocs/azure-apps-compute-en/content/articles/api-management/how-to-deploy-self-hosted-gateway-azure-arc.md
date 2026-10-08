---
title: Deploy an Azure API Management Gateway on Azure Arc
description: Enable Azure Arc to deploy your self-hosted Azure API Management gateway. 
ms.service: azure-api-management
ms.custom: 
  - devx-track-azurecli
  - references_regions
ms.topic: how-to 
ms.date: 10/06/2025
---

# Deploy an Azure API Management gateway on Azure Arc (preview)

**APPLIES TO: Developer | Premium**



With the integration between Azure API Management and [Azure Arc on Kubernetes](https://learn.microsoft.com/azure/azure-arc/kubernetes/overview), you can deploy the API Management gateway component as an [extension in an Azure Arc-enabled Kubernetes cluster](https://learn.microsoft.com/azure/azure-arc/kubernetes/extensions).

Deploying the API Management gateway on an Azure Arc-enabled Kubernetes cluster expands API Management support for hybrid and multicloud environments. Enable the deployment using a cluster extension to make managing and applying policies to your Azure Arc-enabled cluster a consistent experience.


> **Important:**
> API Management self-hosted gateway on Azure Arc is currently in preview. During preview, the API Management gateway extension is available in the following regions:
> 
> - Asia (East, Southeast)
> - Australia (Central, Central 2, East & Southeast)
> - Brazil (South & Southeast)
> - Canada (Central, East)
> - Europe (North, West)
> - France (Central & South)
> - Germany (North & West Central)
> - India (Central, South, West, Jio central & Jio West)
> - Japan (East & West)
> - Korea (Central & South)
> - Norway (East & West)
> - South Africa (North & West)
> - Sweden (Central)
> - Switzerland (North & West)
> - United Arab Emirates (UAE - Central & North)
> - United Kingdom (UK -South)
> - United States (US - Central, Central EUAP, East, East 2, East 2 EUAP, North Central, South Central, West Central, West, West 2, West 3)

> **Note:**
> You can also deploy the self-hosted gateway [directly to Kubernetes](how-to-deploy-self-hosted-gateway-azure-kubernetes-service.md).

## Prerequisites

* [Connect your Kubernetes cluster](https://learn.microsoft.com/azure/azure-arc/kubernetes/quickstart-connect-cluster) within a supported Azure Arc region.
* Install the `k8s-extension` Azure CLI extension:

    ```azurecli
    az extension add --name k8s-extension
    ```

    If you've already installed the `k8s-extension` module, update to the latest version:

    ```azurecli
    az extension update --name k8s-extension
    ```

* [Create an Azure API Management instance](get-started-create-service-instance.md).
* [Provision a gateway resource in your Azure API Management instance](api-management-howto-provision-self-hosted-gateway.md).

## Deploy the API Management gateway extension using Azure CLI


> **Tip:**
> The following steps deploy the self-hosted gateway to Kubernetes and enable authentication to the API Management instance by using a gateway access token (authentication key). You can also deploy the self-hosted gateway to Kubernetes and enable authentication to the API Management instance by using Microsoft Entra ID. For more information, see [Self-hosted gateway authentication options](self-hosted-gateway-authentication-options.md).

1. In the Azure portal, navigate to your API Management instance.
1. Select **Deployment + infrastructure** > **Gateways** from the side navigation menu.
1. Select and open your provisioned gateway resource from the list.
1. In your provisioned gateway resource, click **Deployment** from the side navigation menu.
1. Make note of the **Token** and **Configuration endpoint** values for the next step.
1. In Azure CLI, deploy the gateway extension using the `az k8s-extension create` command. Fill in the `token` and `configuration URL` values.
    * The following example uses the `service.type='LoadBalancer'` extension configuration. See more [available extension configurations](#available-extension-configurations).

    ```azurecli
    az k8s-extension create --cluster-type connectedClusters --cluster-name <cluster-name> \
        --resource-group <rg-name> --name <extension-name> --extension-type Microsoft.ApiManagement.Gateway \
        --scope namespace --target-namespace <namespace> \
        --configuration-settings gateway.configuration.uri='<Configuration URL>' \
        --config-protected-settings gateway.auth.token='<token>' \
        --configuration-settings service.type='LoadBalancer' --release-train preview
    ```

    > **Tip:**
    > `-protected-` flag for `gateway.auth.token` is optional, but recommended. 

1. Verify deployment status using the following CLI command:

    ```azurecli
    az k8s-extension show --cluster-type connectedClusters --cluster-name <cluster-name> --resource-group <rg-name> --name <extension-name>
    ```

1. Navigate back to the **Gateways** list to verify the gateway status shows a green check mark with a node count. This status means the deployed self-hosted gateway pods:
    * Are successfully communicating with the API Management service.
    * Have a regular "heartbeat".

## Deploy the API Management gateway extension using Azure portal

1. In the Azure portal, navigate to your Azure Arc-connected cluster.
1. In the left menu, select **Settings** > **Extensions + applications** > **+ Add** > **API Management gateway (preview)**.
1. Select **Create**.
1. In the **Install API Management gateway** window, configure the gateway extension:
    * Select the subscription and resource group for your API Management instance.
    * In **Gateway details**, select the **API Management instance** and **Gateway name**. Enter a **Namespace** scope for your extension and optionally a number of **Replicas**, if supported in your API Management service tier.
    * In **Kubernetes configuration**, select the default configuration or a different configuration for your cluster. For options, see [available extension configurations](#available-extension-configurations).

    Screenshot of deploying the extension in Azure portal

1. On the **Monitoring** tab, optionally enable monitoring to upload metrics tracking requests to the gateway and backend. If enabled, select an existing **Log Analytics** workspace.
1. Select **Review + install**, then select **Install**.

## Available extension configurations

The self-hosted gateway extension for Azure Arc provides many configuration settings to customize the extension for your environment. This section lists required deployment settings and optional settings for integration with Log Analytics. For a complete list of settings, see the self-hosted gateway extension [reference](self-hosted-gateway-arc-reference.md).

### Required settings

The following extension configurations are **required**.

| Setting | Description |
| --- | --- |
| `gateway.configuration.uri` | Configuration endpoint in API Management service for the self-hosted gateway. |
| `gateway.auth.token` | Gateway token (authentication key) to authenticate to API Management service. Typically starts with `GatewayKey`. |
| `service.type` | Kubernetes service configuration for the gateway: `LoadBalancer`, `NodePort`, or `ClusterIP`. |

### Log Analytics settings

To enable monitoring of the self-hosted gateway, configure the following Log Analytics settings:

| Setting | Description |
| --- | --- |
| `monitoring.customResourceId` | Azure Resource Manager resource ID for the API Management instance. |
| `monitoring.workspaceId` | Workspace ID of Log Analytics. |
| `monitoring.ingestionKey` | Secret with ingestion key from Log Analytics. |

> **Note:**
> If you haven't enabled Log Analytics:
>
> 1. Walk through the [Create a Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/quick-create-workspace) quickstart.
> 1. Learn where to find the [Log Analytics agent settings](https://learn.microsoft.com/azure/azure-monitor/agents/log-analytics-agent).

## Related content

* To learn more about the self-hosted gateway, see [Azure API Management self-hosted gateway overview](self-hosted-gateway-overview.md).
* Learn more about the [observability capabilities of the Azure API Management gateways](observability.md).
* Discover all [Azure Arc-enabled Kubernetes extensions](https://learn.microsoft.com/azure/azure-arc/kubernetes/extensions).
* Learn more about [Azure Arc-enabled Kubernetes](https://learn.microsoft.com/azure/azure-arc/kubernetes/overview).
* Learn more about guidance to [run the self-hosted gateway on Kubernetes in production](how-to-self-hosted-gateway-on-kubernetes-in-production.md).
* For configuration options, see the [self-hosted gateway extension reference](self-hosted-gateway-arc-reference.md).
`
