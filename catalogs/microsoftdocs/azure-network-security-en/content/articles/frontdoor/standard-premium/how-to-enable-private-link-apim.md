---
title: 'Connect Front Door Premium to an Azure API Management origin with Private Link'
description: Learn how to connect your Azure Front Door Premium to an Azure API Management privately.
author: halkazwini
ms.author: halkazwini
ms.service: azure-frontdoor
ms.topic: how-to
ms.date: 09/24/2025
ms.custom:
  - ai-usage
  - build-2025
zone_pivot_groups: front-door-dev-exp-portal-ps-cli
---

# Connect Azure Front Door Premium to an Azure API Management with Private Link

**Applies to:** :heavy_check_mark: Front Door Premium

This article guides you through the steps to configure an Azure Front Door Premium to connect privately to your Azure API Management origin using Azure Private Link.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An Azure API Management instance. For more information on how to create an API Management instance, see [Create a new Azure API Management instance](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/get-started-create-service-instance.md). For v1 tiers, the instance should be deployed in public mode and not in virtual network mode.

**Applies to: front-door-portal**


- An Azure Front Door Premium profile and an endpoint. For more information on how to create an Azure Front Door profile, see [Create a Front Door using the Azure portal](../create-front-door-portal.md).

- Sign in to the [Azure portal](https://portal.azure.com) with your Azure account.



**Applies to: front-door-ps**


- An Azure Front Door Premium profile and an endpoint. For more information on how to create an Azure Front Door profile, see [Create a Front Door using Azure PowerShell](../create-front-door-powershell.md)

- Azure Cloud Shell or Azure PowerShell.

    The steps in this article run the Azure PowerShell cmdlets interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the cmdlets in the Cloud Shell, select **Open Cloud Shell** at the upper-right corner of a code block. Select **Copy** to copy the code and then paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.

    You can also [install Azure PowerShell locally](https://learn.microsoft.com/powershell/azure/install-azure-powershell) to run the cmdlets. If you run PowerShell locally, sign in to Azure using the [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) cmdlet.



**Applies to: front-door-cli**


- An Azure Front Door Premium profile and an endpoint. For more information on how to create an Azure Front Door profile, see [Create a Front Door using the Azure CLI](../create-front-door-cli.md).

- Azure Cloud Shell or Azure CLI.

    The steps in this article run the Azure CLI commands interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the commands in the Cloud Shell, select **Open Cloud Shell** at the upper-right corner of a code block. Select **Copy** to copy the code, and paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.

    You can also [install Azure CLI locally](https://learn.microsoft.com/cli/azure/install-azure-cli) to run the commands. If you run Azure CLI locally, sign in to Azure using the [az login](https://learn.microsoft.com/cli/azure/reference-index#az-login) command.



**Applies to: front-door-portal**


## Create an origin group and add the API Management instance as an origin

1. Under **Settings** of your Azure Front Door Premium profile, select **Origin groups**.

1. Select **Add**

1. Enter a name for the origin group.

1. Select **+ Add an origin** 

1. Use the following table to configure the origin settings:

    | Setting | Value |
    | --- | --- |
    | Name | Enter a name to identify this origin. |
    | Origin Type | Select **API Management**. |
    | Host name | Select the host from the dropdown that you want as an origin. |
    | Origin host header | Will be autopopulated with the host of the chosen API Management instance. |
    | HTTP port | 80 (default). |
    | HTTPS port | 443 (default). |
    | Priority | Assign different priorities to origins for primary, secondary, and backup purposes. |
    | Weight | 1000 (default). Use weights to distribute traffic among different origins. |
    | Region | Select the region that matches or is closest to your origin. |
    | Target sub resource | Select **Gateway**. |
    | Request message | Enter a custom message to display while approving the Private Endpoint. |

    Screenshot of origin settings for configuring API Management as a private origin.

1. Select **Add** to save your origin settings

1. Select **Add** to save the origin group settings.

## Approve the private endpoint

1. Go to the API Management instance you configured with Private Link in the previous section.

1. Under **Deployment + infrastructure**, select **Network**.

1. Select **Inbound private endpoint connections** tab. 

1. Find the *pending* private endpoint request from Azure Front Door Premium and select **Approve**.

1. After approval, the connection status will update. It can take a few minutes for the connection to fully establish. Once established, you can access your API Management through Front Door. 

    Screenshot of private endpoint connections tab in API Management portal.



**Applies to: front-door-ps**


## Create an origin group and add the API Management instance as an origin

1. Use [New-AzFrontDoorCdnOriginGroupHealthProbeSettingObject](https://learn.microsoft.com/powershell/module/az.cdn/new-azfrontdoorcdnorigingrouphealthprobesettingobject) to create an in-memory object for storing the health probe settings.

    ```azurepowershell-interactive
    $healthProbeSetting = New-AzFrontDoorCdnOriginGroupHealthProbeSettingObject `
        -ProbeIntervalInSecond 60 `
        -ProbePath "/" `
        -ProbeRequestType GET `
        -ProbeProtocol Http
    ```

1. Use [New-AzFrontDoorCdnOriginGroupLoadBalancingSettingObject](https://learn.microsoft.com/powershell/module/az.cdn/new-azfrontdoorcdnorigingrouploadbalancingsettingobject) to create an in-memory object for storing load balancing settings.

    ```azurepowershell-interactive
    $loadBalancingSetting = New-AzFrontDoorCdnOriginGroupLoadBalancingSettingObject `
        -AdditionalLatencyInMillisecond 50 `
        -SampleSize 4 `
        -SuccessfulSamplesRequired 3
    ```

1. Run [New-AzFrontDoorCdnOriginGroup](https://learn.microsoft.com/powershell/module/az.cdn/new-azfrontdoorcdnorigingroup) to create an origin group that contains your API Management instance.

    ```azurepowershell-interactive
    $origingroup = New-AzFrontDoorCdnOriginGroup `
        -OriginGroupName myOriginGroup `
        -ProfileName myFrontDoorProfile `
        -ResourceGroupName myResourceGroup `
        -HealthProbeSetting $healthProbeSetting `
        -LoadBalancingSetting $loadBalancingSetting
    ```

1. Use the [New-AzFrontDoorCdnOrigin](https://learn.microsoft.com/powershell/module/az.cdn/new-azfrontdoorcdnorigin) command to add your API Management instance to the origin group.

    ```azurepowershell-interactive
    New-AzFrontDoorCdnOrigin ` 
        -OriginGroupName myOriginGroup ` 
        -OriginName myAPIMOrigin ` 
        -ProfileName myFrontDoorProfile ` 
        -ResourceGroupName myResourceGroup ` 
        -HostName myapim.azure-api.net ` 
        -HttpPort 80 ` 
        -HttpsPort 443 ` 
        -OriginHostHeader myapim.azure-api.net ` 
        -Priority 1 ` 
        -PrivateLinkId /subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/myResourceGroup/providers/Microsoft.ApiManagement/service/myAPIM ` 
        -SharedPrivateLinkResourceGroupId Gateway ` 
        -SharedPrivateLinkResourcePrivateLinkLocation CentralUS ` 
        -SharedPrivateLinkResourceRequestMessage 'Azure Front Door private connectivity request' ` 
        -Weight 1000 `
    ```

## Approve the private endpoint

1. Run [Get-AzPrivateEndpointConnection](https://learn.microsoft.com/powershell/module/az.network/get-azprivateendpointconnection) to retrieve the connection name of the private endpoint connection that needs approval.

    ```azurepowershell-interactive
    $PrivateEndpoint = Get-AzPrivateEndpointConnection -ResourceGroupName myResourceGroup -ServiceName myAPIM -PrivateLinkResourceType Microsoft.ApiManagement/service
    ```

2. Run [Approve-AzPrivateEndpointConnection](https://learn.microsoft.com/powershell/module/az.network/approve-azprivateendpointconnection) to approve the private endpoint connection details. Use the *Name* value from the output in the previous step for approving the connection.

    ```azurepowershell-interactive
    Get-AzPrivateEndpointConnection -Name $PrivateEndpoint.Name -ResourceGroupName myResourceGroup -ServiceName myAPIM -PrivateLinkResourceType Microsoft.ApiManagement/service
    ```

## Complete Azure Front Door setup

Use the [New-AzFrontDoorCdnRoute](https://learn.microsoft.com/powershell/module/az.cdn/new-azfrontdoorcdnroute) command to create a route that maps your endpoint to the origin group. This route forwards requests from the endpoint to your origin group.

```azurepowershell-interactive
# Create a route to map the endpoint to the origin group

$Route = New-AzFrontDoorCdnRoute `
    -EndpointName myFrontDoorEndpoint `
    -Name myRoute `
    -ProfileName myFrontDoorProfile `
    -ResourceGroupName myResourceGroup `
    -ForwardingProtocol MatchRequest `
    -HttpsRedirect Enabled `
    -LinkToDefaultDomain Enabled `
    -OriginGroupId $origingroup.Id `
    -SupportedProtocol Http,Https
```

Your Azure Front Door profile is now fully functional after completing the final step.



**Applies to: front-door-cli**


## Create an origin group and add the API Management instance as an origin

1. Run [az afd origin-group create](https://learn.microsoft.com/cli/azure/afd/origin-group#az-afd-origin-group-create) to create an origin group.

    ```azurecli-interactive
    az afd origin-group create \
        --resource-group myResourceGroup \
        --origin-group-name myOriginGroup \
        --profile-name myFrontDoorProfile \
        --probe-request-type GET \
        --probe-protocol Http \
        --probe-interval-in-seconds 60 \
        --probe-path / \
        --sample-size 4 \
        --successful-samples-required 3 \
        --additional-latency-in-milliseconds 50
    ```

1. Run [az afd origin create](https://learn.microsoft.com/cli/azure/afd/origin#az-afd-origin-create) to add the API Management instance as an origin to the origin group.

    ```azurecli-interactive
    az afd origin create \
        --enabled-state Enabled \
        --resource-group myResourceGroup \
        --origin-group-name myOriginGroup \
        --origin-name myAPIMOrigin \
        --profile-name myFrontDoorProfile \
        --host-name myapim.azure-api.net \
        --origin-host-header myapim.azure-api.net \
        --http-port 80  \
        --https-port 443 \
        --priority 1 \
        --weight 500 \
        --enable-private-link true \
        --private-link-location centralus \
        --private-link-request-message 'Azure Front Door private connectivity request.' \
        --private-link-resource /subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/myResourceGroup/providers/Microsoft.ApiManagement/service/myAPIM \
        --private-link-sub-resource-type Gateway
    ```


## Approve the private endpoint connection

1. Run [az network private-endpoint-connection list](https://learn.microsoft.com/cli/azure/network/private-endpoint-connection#az-network-private-endpoint-connection-list) to get the **name** of the private endpoint connection that needs approval.

    ```azurecli-interactive
    az network private-endpoint-connection list --name myAPIM --resource-group myResourceGroup --type Microsoft.ApiManagement/service
    ```

1. Run [az network private-endpoint-connection approve](https://learn.microsoft.com/cli/azure/network/private-endpoint-connection#az-network-private-endpoint-connection-approve) to approve the private endpoint connection using the **name** from the previous step.

    ```azurecli-interactive
    az network private-endpoint-connection approve --id /subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/myResourceGroup/providers/Microsoft.ApiManagement/service/myAPIM/privateEndpointConnections/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb
    ```

## Complete Azure Front Door setup

Run [az afd route create](https://learn.microsoft.com/cli/azure/afd/route#az-afd-route-create) to create a route that maps your endpoint to the origin group. This route forwards requests from the endpoint to your origin group.

```azurecli-interactive
az afd route create \
    --resource-group myResourceGroup \
    --profile-name myFrontDoorProfile \
    --endpoint-name myFrontDoorEndpoint \
    --forwarding-protocol MatchRequest \
    --route-name myRoute \
    --https-redirect Enabled \
    --origin-group myOriginGroup \
    --supported-protocols Http Https \
    --link-to-default-domain Enabled
```

Your Azure Front Door profile is now fully functional after completing the final step.



## Common mistakes to avoid

The following are common mistakes when configuring an Azure API Management origin with Azure Private Link enabled:
* Adding the Azure API Management origin with Azure Private Link to an existing origin group that contains public origins. Azure Front Door doesn't allow mixing public and private origins in the same origin group.


## Next step

> 
> [Private Link service with storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md)
