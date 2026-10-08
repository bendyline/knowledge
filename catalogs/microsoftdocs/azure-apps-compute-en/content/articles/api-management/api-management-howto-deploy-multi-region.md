---
title: Deploy an Azure API Management Instance to Multiple Azure Regions
titleSuffix: Azure API Management
description: Learn how to deploy a Premium tier Azure API Management instance to multiple Azure regions to improve API gateway availability.
ms.service: azure-api-management
ms.topic: how-to
ms.date: 09/19/2025
ms.custom: sfi-image-nochange
---

# Deploy an Azure API Management instance to multiple Azure regions


**APPLIES TO: Premium**

Azure API Management supports multi-region deployment, which enables API publishers to add regional API gateways to an existing API Management instance in one or more supported Azure regions. Multi-region deployment helps reduce request latency perceived by geographically distributed API consumers and improves service availability if one region goes offline.

When adding a region, you configure:

* The number of scale [units](upgrade-and-scale.md) that region will host. 

* [Availability zones](enable-availability-zone-support.md), if that region supports it. By default, API Management automatically configures availability zones for the added region, which is recommended. You can also manually configure availability zones for the added region.

* [Virtual network](virtual-network-concepts.md) settings in the added region, if networking is configured in the existing region or regions.

> **Important:**
> The feature to enable storing customer data in a single region is currently only available in the Southeast Asia Region (Singapore) of the Asia Pacific Geo. For all other regions, customer data is stored in Geo.

> **Important:**
> Changes to your API Management service's infrastructure (such as configuring custom domains, adding CA certificates, scaling, virtual network configuration, availability zone changes, and region additions) can take 15 minutes or longer to complete, depending on the service tier and the size of the deployment. Expect longer times for an instance with a greater number of scale units or multi-region configuration (gateways in multiple locations). Rolling changes to API Management are executed carefully to preserve capacity and availability.
>
> While the service is updating, other service infrastructure changes can't be made. However, you can configure APIs, products, policies, and user settings. The service will **not** experience gateway downtime, and API Management **will continue** to service API requests without interruption (except in the Developer tier).


## About multi-region deployment



* Only the [gateway component](api-management-key-concepts.md#api-management-components) of your API Management instance is replicated to multiple regions. The instance's management plane and developer portal remain hosted only in the *primary* region, the region where you originally deployed the service.
  
* If you want to configure a secondary location for your API Management instance when it's deployed (injected) in a virtual network, the VNet and subnet region should match with the secondary location you're configuring. If you're adding, removing, or enabling the availability zone in the primary region, or if you're changing the subnet of the primary region, then the VIP address of your API Management instance will change. For more information, see [IP addresses of Azure API Management service](https://learn.microsoft.com/azure/api-management/api-management-howto-ip-addresses#changes-to-the-ip-addresses). However, if you're adding a secondary region, the primary region's VIP won't change because every region has its own private VIP.

* Gateway configurations such as APIs and policy definitions are regularly synchronized between the primary and secondary regions you add. Propagation of updates to the regional gateways normally takes less than 10 seconds. Multi-region deployment provides availability of the API gateway in more than one region and provides service availability if one region goes offline.

* When API Management receives public HTTP requests to the traffic manager endpoint (applies for the external VNet and non-networked modes of API Management), traffic is routed to a regional gateway based on lowest latency, which can reduce latency experienced by geographically distributed API consumers. In internal VNet mode, customers must configure their own solution to route and load-balance traffic across the regional gateways. For details, see [Networking considerations](https://learn.microsoft.com/azure/api-management/api-management-howto-deploy-multi-region#virtual-networking).

*  The gateway in each region (including the primary region) has a regional DNS name that follows the URL pattern of `https://<service-name>-<region>-01.regional.azure-api.net`, for example `https://contoso-westus2-01.regional.azure-api.net`.

* If a region goes offline, API requests are automatically routed around the failed region to the next closest gateway.

* If the primary region goes offline, the API Management management plane and developer portal become unavailable, but secondary regions continue to serve API requests using the most recent gateway configuration.

* If configured, the [rate-limit](https://learn.microsoft.com/azure/api-management/rate-limit-policy) and [rate-limit-by-key](https://learn.microsoft.com/azure/api-management/rate-limit-by-key-policy) policies count calls separately at each regional gateway in the deployment. The policies don't aggregate all call data for the instance. Similarly, the [azure-openai-token-limit](https://learn.microsoft.com/azure/api-management/azure-openai-token-limit-policy) and [llm-token-limit](https://learn.microsoft.com/azure/api-management/llm-token-limit-policy) policies count token usage separately at each regional gateway in the deployment. 
  


## Prerequisites

* Thoroughly understand all [requirements and considerations for enabling multi-region deployment in API Management](https://learn.microsoft.com/azure/reliability/reliability-api-management).

* If you haven't created an API Management service instance, see [Create an API Management service instance](get-started-create-service-instance.md). Select the Premium service tier.

* If your API Management instance is deployed in a virtual network, ensure that you set up a virtual network and subnet in the location that you plan to add, and within the same subscription. See [virtual network prerequisites](api-management-using-with-vnet.md#prerequisites).

## Deploy API Management service to an additional region

1. In the Azure portal, navigate to your API Management service and select **Locations** from the left menu.
1. Select **+ Add** in the top bar.
1. Select the added location from the dropdown list.
1. Select the number of scale **[Units](upgrade-and-scale.md)** in the location.
1. If the region supports [**Availability zones**](enable-availability-zone-support.md), leave the **Automatic** setting (recommended), or optionally select one or more zones. If you select specific zones, the number of units that you select must distribute evenly across the availability zones. For example, if you select three units, you must select three zones so that each zone hosts one unit.
1. If the API Management instance is deployed in a [virtual network](api-management-using-with-vnet.md), configure virtual network settings in the location, including virtual network, subnet, and public IP address.
1. Select **Add** to confirm.
1. Repeat this process until you configure all locations.
1. Select **Save** in the top bar to start the deployment process.

## Remove an API Management service region

1. In the Azure portal, navigate to your API Management service and select **Locations** from the left menu.
1. For the location you would like to remove, select the context menu using the **...** button at the right end of the table. Select **Delete**.
1. Confirm the deletion and select **Save** to apply the changes.

## Route API calls to regional backend services

By default, each API routes requests to a single backend service URL. Even if you configure API Management gateways in various regions, the API gateway still forwards requests to the same backend service, which is deployed in only one region. In this case, improved performance comes only from responses cached within API Management in a region specific to the request. Contacting the backend across the globe might still cause high latency.

To take advantage of geographical distribution of your system, you should deploy backend services in the same regions as API Management instances. Then, by using policies and the `@(context.Deployment.Region)` property, you can route the traffic to local instances of your backend.

1. Go to your API Management instance and select **APIs** from the left menu.
2. Select your desired API.
3. On the **Design** tab, in the **Inbound processing** section, select **Code editor**.

    A screenshot that highlights the API code editor in the design tab.

4. Use the `set-backend` combined with conditional `choose` policies to construct a proper routing policy in the `<inbound> </inbound>` section of the file.

    For example, the following XML file would work for West US and East Asia regions:

    ```xml
    <policies>
        <inbound>
            <base />
            <choose>
                <when condition="@("West US".Equals(context.Deployment.Region, StringComparison.OrdinalIgnoreCase))">
                    <set-backend-service base-url="http://contoso-backend-us.com/" />
                </when>
                <when condition="@("East Asia".Equals(context.Deployment.Region, StringComparison.OrdinalIgnoreCase))">
                    <set-backend-service base-url="http://contoso-backend-asia.com/" />
                </when>
                <otherwise>
                    <set-backend-service base-url="http://contoso-backend-other.com/" />
                </otherwise>
            </choose>
        </inbound>
        <backend>
            <base />
        </backend>
        <outbound>
            <base />
        </outbound>
        <on-error>
            <base />
        </on-error>
    </policies>
    ```

### Use Traffic Manager for routing to regional backends

You can also front your backend services with [Azure Traffic Manager](https://azure.microsoft.com/services/traffic-manager/), direct the API calls to the Traffic Manager, and let it resolve the routing automatically. 

* For traffic distribution and failover, we recommend using Traffic Manager with the [**Geographic**](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/traffic-manager-routing-methods.md#geographic-traffic-routing-method) routing method. We don't recommend using Traffic Manager with the Weighted routing method with API Management backends.

* For traffic control during maintenance operations, we recommend using the Priority routing method.

## Use custom routing to API Management regional gateways

API Management routes the requests to a regional gateway based on [the lowest latency](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/traffic-manager-routing-methods.md#performance). Although it isn't possible to override this setting in API Management, you can use your own Traffic Manager with custom routing rules.

1. Create your own [Traffic Manager](https://azure.microsoft.com/services/traffic-manager/).
1. If you use a custom domain, [use it with Traffic Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/traffic-manager-point-internet-domain.md) instead of the API Management service.
1. [Configure the API Management regional endpoints in Traffic Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/traffic-manager-manage-endpoints.md). The regional endpoints follow the URL pattern of `https://<service-name>-<region>-01.regional.azure-api.net`, for example `https://contoso-westus2-01.regional.azure-api.net`.
1. [Configure the API Management regional status endpoints in Traffic Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/traffic-manager-monitoring.md). The regional status endpoints follow the URL pattern of `https://<service-name>-<region>-01.regional.azure-api.net/status-0123456789abcdef`, for example `https://contoso-westus2-01.regional.azure-api.net/status-0123456789abcdef`.
1. Specify [the routing method](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/traffic-manager-routing-methods.md) of the Traffic Manager.

## Disable routing to a regional gateway

Under some conditions, you might need to temporarily disable routing to one of the regional gateways. For example:

* After you add a new region, to keep it disabled while you configure and test the regional backend service 
* During regular backend maintenance in a region
* To redirect traffic to other regions during a planned disaster recovery drill that simulates an unavailable region, or during a regional failure 

To disable routing to a regional gateway in your API Management instance, update the gateway's `disableGateway` property value to `true`. You can set the value by using the [Create or update service](https://learn.microsoft.com/rest/api/apimanagement/current-ga/api-management-service/create-or-update) REST API, the [az apim update](https://learn.microsoft.com/cli/azure/apim#az-apim-update) command in the Azure CLI, the [set-azapimanagement](https://learn.microsoft.com/powershell/module/az.apimanagement/set-azapimanagement) Azure PowerShell cmdlet, or other Azure tools.

> **Important:**
> * You can only set the `disableGateway` property to disable routing to a regional gateway when you use default routing in API Management, not a custom routing solution.
> * You can't set the `disableGateway` property to disable routing to a regional gateway when the API Management instance is deployed in a virtual network in internal mode. In this case, you must manage routing and load balancing across multiple regions yourself.
    
To disable a regional gateway by using the Azure CLI:

1. Use the [az apim show](https://learn.microsoft.com/cli/azure/apim#az-apim-show) command to show the locations, gateway status, and regional URLs configured for the API Management instance. 
    ```azurecli
    az apim show --name contoso --resource-group apim-hello-world-resource \
        --query "additionalLocations[].{Location:location,Disabled:disableGateway,Url:gatewayRegionalUrl}" \
        --output table
    ```
    Example output:

    ```
    Location    Disabled    Url
    ----------  ----------  ------------------------------------------------------------
    West US 2   True        https://contoso-westus2-01.regional.azure-api.net
    West Europe True        https://contoso-westeurope-01.regional.azure-api.net
    ```
1. Use the [az apim update](https://learn.microsoft.com/cli/azure/apim#az-apim-update) command to disable the gateway in an available location, such as West US 2.
    ```azurecli
    az apim update --name contoso --resource-group apim-hello-world-resource \
    --set additionalLocations[location="West US 2"].disableGateway=true
    ```

    The update might take a few minutes. 

1. Verify that traffic directed to the regional gateway URL is redirected to another region. 
 
To restore routing to the regional gateway, set the value of `disableGateway` to `false`. 

## Virtual networking

This section provides considerations for multi-region deployments when the API Management instance is injected in a virtual network.

* Configure each regional network independently. The [connectivity requirements](virtual-network-reference.md), such as required network security group rules for a virtual network in an added region, are generally the same as the requirements for a network in the primary region.
* Virtual networks in the different regions don't need to be peered.
> **Important:**
> When you configure your API Management instance to use internal virtual network mode, each regional gateway must also have outbound connectivity on port 1433 to the Azure SQL database configured for your API Management instance, which is only in the *primary* region. Ensure that you allow connectivity to the fully qualified domain name (FQDN) or IP address of this Azure SQL database in any routes or firewall rules you configure for networks in your secondary regions; the Azure SQL service endpoint can't be used in this scenario. To find the Azure SQL database name in the primary region, go to the **Network** > **Network status** page of your API Management instance in the portal. 

### IP addresses

* A public virtual IP address is created in every region added with a virtual network. For virtual networks in either [external mode](api-management-using-with-vnet.md) or [internal mode](api-management-using-with-internal-vnet.md), this public IP address is used for management traffic on port `3443`.

    * **External VNet mode:** The public IP addresses are also required to route public HTTP traffic to the API gateways.

    * **Internal VNet mode:** A private IP address is also created in every region added with a virtual network. Use these addresses to connect within the network to the API Management endpoints in the primary and secondary regions.

### Routing

* **External VNet mode:** Routing of public HTTP traffic to the regional gateways is handled automatically, in the same way it is for a non-networked API Management instance.

* **Internal VNet mode:** Private HTTP traffic isn't routed or load-balanced to the regional gateways by default. Users own the routing and are responsible for bringing their own solution to manage routing and private load balancing across multiple regions. 

## Related content

* Learn more about [reliability in API Management](https://learn.microsoft.com/azure/reliability/reliability-api-management)

* Learn more about enabling [availability zone support](enable-availability-zone-support.md) for an API Management instance.
    
* For more information about virtual networks and API Management, see:

    * [Connect to a virtual network by using API Management](api-management-using-with-vnet.md)

    * [Connect to a virtual network in internal mode by using API Management](api-management-using-with-internal-vnet.md)

    * [IP addresses of API Management](api-management-howto-ip-addresses.md)


[create an api management service instance]: get-started-create-service-instance.md

[get started with azure api management]: get-started-create-service-instance.md

[deploy an api management service instance to a new region]: #add-region

[delete an api management service instance from a region]: #remove-region

[unit]: https://azure.microsoft.com/pricing/details/api-management/

[premium]: https://azure.microsoft.com/pricing/details/api-management/
