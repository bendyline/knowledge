---
title: Restrict Event Hubs Namespace to Private Endpoints
description: Learn how to securely integrate Azure Event Hubs with Azure Private Link Service to enable private endpoint access and enhance your network security.
#customer intent: As an IT admin, I want to configure Azure Private Link for my Event Hubs namespace so that I can ensure secure communication within my virtual network.
ms.date: 01/30/2026
ms.topic: how-to
ms.custom: sfi-image-nochange
# customer intent: As an IT admin, I want to restrict access to an Event Hubs namespace to a private endpoint in a virtual network. 
---

# Allow access to Azure Event Hubs namespaces via private endpoints 

Azure Private Link Service enables you to access Azure Services (for example, Azure Event Hubs, Azure Storage, and Azure Cosmos DB) and Azure hosted customer/partner services over a **private endpoint** in your virtual network.

A private endpoint is a network interface that connects you privately and securely to a service powered by Azure Private Link. The private endpoint uses a private IP address from your virtual network, effectively bringing the service into your virtual network. All traffic to the service is routed through the private endpoint, so no gateways, NAT devices, ExpressRoute or VPN connections, or public IP addresses are needed. Traffic between your virtual network and the service traverses over the Microsoft backbone network, eliminating exposure from the public Internet. You can connect to an instance of an Azure resource, giving you the highest level of granularity in access control.

For more information, see [What is Azure Private Link?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-link-overview.md)

## Important points

- This feature isn't supported in the **basic** tier.
- Enabling private endpoints can prevent other Azure services from interacting with Event Hubs. Requests that are blocked include those from other Azure services, from the Azure portal, from logging and metrics services, and so on. As an exception, you can allow access to Event Hubs resources from certain **trusted services** even when private endpoints are enabled. For a list of trusted services, see [Trusted services](#trusted-microsoft-services).

## Add a private endpoint using Azure portal

### Prerequisites

To integrate an Event Hubs namespace with Azure Private Link, you need the following entities or permissions:

- An Event Hubs namespace.
- An Azure virtual network.
- A subnet in the virtual network. You can use the **default** subnet. 
- Owner or contributor permissions for both the namespace and the virtual network.

Your private endpoint and virtual network must be in the same region. When you select a region for the private endpoint using the portal, it automatically filters virtual networks that are in that region. Your namespace can be in a different region.

Your private endpoint uses a private IP address in your virtual network.

### Configure private access when creating a namespace
When creating a namespace, you can either allow public only (from all networks) or private only (only via private endpoints) access to the namespace.

If you select the **Private access** option on the **Networking** page of the namespace creation wizard, you can add a private endpoint on the page by selecting **+ Private endpoint** button. See the next section for the detailed steps for adding a private endpoint. 

Screenshot showing the Networking page of the Create namespace wizard with Private access option selected.


### Configure private access for an existing namespace
If you already have an Event Hubs namespace, you can create a private link connection by following these steps:

#### Disable public access

Disable public access to your Event Hubs namespace to allow access only via private endpoints.

1. Navigate to your **Event Hubs namespace** in the [Azure portal](https://portal.azure.com).
1. Select **Networking** under **Settings** on the left menu. 
1. On the **Networking** page, select **Manage** under **Public network access**.

    Screenshot showing the Public access page with Manage button highlighted.
1. On the **Public network access** page, select **Disable** to restrict inbound access while allowing outbound access. In the pop-up, select **Proceed** to confirm.

    Screenshot showing the Public network access page with Disable option selected.
1. On the **Public network access** page, select **Save** at the bottom of the page.

    Screenshot showing the Public network access page with Disable option selected in the main page.
1. In the **Exception** section, specify whether you want to **allow trusted Microsoft services to access this resource**. See [Trusted Microsoft services](#trusted-microsoft-services) for details.


#### Add a private endpoint

Now, add a private endpoint to your Event Hubs namespace by following these steps:

1. On the **Networking** page, switch to the **Private access** tab. 
1. Select the **Create private Endpoint** button at the top of the page.

    Networking page - Private endpoint connections tab - Add private endpoint link.
7. On the **Basics** page, follow these steps: 
    1. Select the **Azure subscription** in which you want to create the private endpoint. 
    2. Select the **resource group** for the private endpoint resource.
    3. Enter a **name** for the private endpoint. 
    1. Enter a **name for the network interface**. 
    1. Select a **region** for the private endpoint. Your private endpoint must be in the same region as your virtual network, but can be in a different region from the private link resource that you're connecting to. 
    1. Select **Next: Resource >** button at the bottom of the page.

        Screenshot showing the Basics page of the Create private endpoint wizard.
8. On the **Resource** page, review settings, and select **Next: Virtual Network**.  

    Screenshot showing the Resource page of the Create private endpoint wizard.
9. On the **Virtual Network** page, you select the subnet in a virtual network to where you want to deploy the private endpoint. 
    1. Select a **virtual network**. Only virtual networks in the currently selected subscription and location are listed in the drop-down list. 
    2. Select a **subnet** in the virtual network you selected. 
    1. Notice that the **network policy for private endpoints** is disabled. If you want to enable it, select **edit**, update the setting, and select **Save**. 
    1. For **Private IP configuration**, by default, **Dynamically allocate IP address** option is selected. If you want to assign a static IP address, select **Statically allocate IP address***.  
    1. For **Application security group**, select an existing application security group or create one that's to be associated with the private endpoint. 
    1. Select **Next: DNS >** button at the bottom of the page. 

        Screenshot showing the Virtual Network page of the Create private endpoint wizard.
10. On the **DNS** page, select whether you want the private endpoint to be integrated with a private DNS zone, and then select **Next: Tags**. 
1. On the **Tags** page, create any tags (names and values) that you want to associate with the private endpoint resource. Then, select **Review + create** button at the bottom of the page. 
1. On the **Review + create**, review all the settings, and select **Create** to create the private endpoint.
    
    Screenshot that shows the Review + create page.
12. Confirm that you see the private endpoint connection you created shows up in the list of endpoints. Refresh the page and switch to the **Private endpoint connections** tab. In this example, the private endpoint is auto-approved because you connected to an Azure resource in your directory and you have sufficient permissions. 

    Screenshot showing the Private endpoint connections page with the newly created private endpoint.


## Trusted Microsoft services

When you enable the **Allow trusted Microsoft services to bypass this firewall** setting, the following services within the same tenant are granted access to your Event Hubs resources.

| Trusted service | Supported usage scenarios |
| --- | --- |
| Azure Event Grid | Allows Azure Event Grid to send events to event hubs in your Event Hubs namespace. You also need to do the following steps: <ul><li>Enable system-assigned identity for a topic or a domain</li><li>Add the identity to the Azure Event Hubs Data Sender role on the Event Hubs namespace</li><li>Then, configure the event subscription that uses an event hub as an endpoint to use the system-assigned identity.</li></ul> <p>For more information, see [Event delivery with a managed identity](../event-grid/managed-service-identity.md)</p> |
| Azure Stream Analytics | Allows an Azure Stream Analytics job to read data from ([input](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/stream-analytics-add-inputs.md)) or write data to ([output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/event-hubs-output.md)) event hubs in your Event Hubs namespace. <p>**Important**: The Stream Analytics job should be configured to use a **managed identity** to access the event hub. For more information, see [Use managed identities to access the event hub from an Azure Stream Analytics job (Preview)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/event-hubs-managed-identity.md). </p> |
| Azure IoT Hub | Allows IoT Hub to send messages to event hubs in your Event Hubs namespace. You also need to do the following steps: <ul><li>Enable system-assigned identity for your IoT hub</li><li>Add the identity to the Azure Event Hubs Data Sender role on the Event Hubs namespace.</li><li>Then, configure the IoT Hub that uses an event hub as a custom endpoint to use the identity-based authentication.</li></ul> |
| Azure API Management | <p>The API Management service allows you to send events to an event hub in your Event Hubs namespace.</p> <ul><li>You can trigger custom workflows by sending events to your event hub when an API is invoked by using the [send-request policy](../api-management/api-management-sample-send-request.md).</li><li>You can also treat an event hub as your backend in an API. For a sample policy, see [Authenticate using a managed identity to access an event hub](https://github.com/Azure/api-management-policy-snippets/blob/master/examples/Authenticate%20using%20Managed%20Identity%20to%20access%20Event%20Hub.xml). You also need to do the following steps:<ol><li>Enable system-assigned identity on the API Management instance. For instructions, see [Use managed identities in Azure API Management](../api-management/api-management-howto-use-managed-service-identity.md).</li><li>Add the identity to the **Azure Event Hubs Data Sender** role on the Event Hubs namespace</li></ol></li></ul> |
| Azure Monitor (Diagnostic Settings and Action Groups) | Allows Azure Monitor to send diagnostic information and alert notifications to event hubs in your Event Hubs namespace. Azure Monitor can read from the event hub and also write data to the event hub. |
| Azure Synapse | Allows Azure Synapse to connect to the event hub using the Synapse Workspace Managed Identity. Add the Azure Event Hubs Data Sender, Receiver or Owner role to the identity on the Event Hubs namespace. |
| Azure Data Explorer | Allows Azure Data Explorer to receive events from the event hub using the Managed Identity of the cluster. You need to do the following steps: <ul><li>[Configure](https://learn.microsoft.com/azure/data-explorer/configure-managed-identities-cluster) the Managed Identity on Azure Data Explorer</li><li>Grant the **Azure Event Hubs Data Receiver** role to the identity, on the event hub.</li></ul>  |
| Azure IoT Central | <p>Allows IoT Central to export data to event hubs in your Event Hubs namespace. You also need to do the following steps:</p><ul><li>Enable system-assigned identity for your IoT Central application.</li><li>Add the identity to the **Azure Event Hubs Data Sender** role on the Event Hubs namespace.</li><li>Then, configure the Event Hubs [export destination on your IoT Central application](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/howto-export-to-event-hubs.md) to use identity-based authentication.</li></ul> |
| Azure Health Data Services | Allows Healthcare APIs IoT connector to ingest medical device data from your Event Hubs namespace and persist data in your configured [Fast Healthcare Interoperability Resources (FHIR®) service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/fhir/overview.md). The IoT connector should be configured to use a managed identity to access the event hub. For more information, see [Get started with the IoT connector - Azure Healthcare APIs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/iot/get-started.md). |
| Azure Digital Twins | Allows Azure Digital Twins to egress data to event hubs in your Event Hubs namespace. You also need to do the following steps: <p><ul><li>Enable system-assigned identity for your Azure Digital Twins instance.</li><li>Add the identity to the **Azure Event Hubs Data Sender** role on the Event Hubs namespace.</li><li>Then, configure an Azure Digital Twins endpoint or Azure Digital Twins data history connection that uses the system-assigned identity to authenticate. For more information about configuring endpoints and event routes to Event Hubs resources from Azure Digital Twins, see [Route Azure Digital Twins events](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/concepts-route-events.md) and [Create endpoints in Azure Digital Twins](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-create-endpoints.md). </li></ul> |

The other trusted services for Azure Event Hubs can be found below: 
- Azure Arc
- Azure Kubernetes 
- Azure Machine Learning
- Microsoft Purview


To allow trusted services to access your namespace, switch to the **Public Access** tab on the **Networking** page, and select **Yes** for **Allow trusted Microsoft services to bypass this firewall?**. 

## Add a private endpoint using PowerShell
The following example shows how to use Azure PowerShell to create a private endpoint connection. It doesn't create a dedicated cluster for you. Follow steps in [this article](event-hubs-dedicated-cluster-create-portal.md) to create a dedicated Event Hubs cluster. 

```azurepowershell-interactive
$rgName = "<RESOURCE GROUP NAME>"
$vnetlocation = "<VIRTUAL NETWORK LOCATION>"
$vnetName = "<VIRTUAL NETWORK NAME>"
$subnetName = "<SUBNET NAME>"
$namespaceLocation = "<NAMESPACE LOCATION>"
$namespaceName = "<NAMESPACE NAME>"
$peConnectionName = "<PRIVATE ENDPOINT CONNECTION NAME>"

# create resource group
New-AzResourceGroup -Name $rgName -Location $vnetLocation 

# create virtual network
$virtualNetwork = New-AzVirtualNetwork `
                    -ResourceGroupName $rgName `
                    -Location $vnetlocation `
                    -Name $vnetName `
                    -AddressPrefix 10.0.0.0/16

# create subnet with endpoint network policy disabled
$subnetConfig = Add-AzVirtualNetworkSubnetConfig `
                    -Name $subnetName `
                    -AddressPrefix 10.0.0.0/24 `
                    -PrivateEndpointNetworkPoliciesFlag "Disabled" `
                    -VirtualNetwork $virtualNetwork

# update virtual network
$virtualNetwork | Set-AzVirtualNetwork

# create an event hubs namespace in a dedicated cluster
$namespaceResource = New-AzResource -Location $namespaceLocation `
                                    -ResourceName $namespaceName `
                                    -ResourceGroupName $rgName `
                                    -Sku @{name = "Standard"; capacity = 1} `
                                    -Properties @{clusterArmId = "/subscriptions/<SUBSCRIPTION ID>/resourceGroups/<RESOURCE GROUP NAME>/providers/Microsoft.EventHub/clusters/<EVENT HUBS CLUSTER NAME>"} `
                                    -ResourceType "Microsoft.EventHub/namespaces" -ApiVersion "2018-01-01-preview"

# create private endpoint connection
$privateEndpointConnection = New-AzPrivateLinkServiceConnection `
                                -Name $peConnectionName `
                                -PrivateLinkServiceId $namespaceResource.ResourceId `
                                -GroupId "namespace"

# get subnet object that you'll use later
$virtualNetwork = Get-AzVirtualNetwork -ResourceGroupName  $rgName -Name $vnetName
$subnet = $virtualNetwork | Select -ExpandProperty subnets `
                                | Where-Object  {$_.Name -eq $subnetName}  
   
# create a private endpoint   
$privateEndpoint = New-AzPrivateEndpoint -ResourceGroupName $rgName  `
                                -Name $vnetName   `
                                -Location $vnetlocation `
                                -Subnet  $subnet   `
                                -PrivateLinkServiceConnection $privateEndpointConnection

(Get-AzResource -ResourceId $namespaceResource.ResourceId -ExpandProperties).Properties


```

### Configure the private DNS Zone
Create a private DNS zone for Event Hubs domain and create an association link with the virtual network:

```azurepowershell-interactive
$zone = New-AzPrivateDnsZone -ResourceGroupName $rgName `
                            -Name "privatelink.servicebus.windows.net" 
 
$link  = New-AzPrivateDnsVirtualNetworkLink -ResourceGroupName $rgName `
                                            -ZoneName "privatelink.servicebus.windows.net" `
                                            -Name "mylink" `
                                            -VirtualNetworkId $virtualNetwork.Id  
 
$networkInterface = Get-AzResource -ResourceId $privateEndpoint.NetworkInterfaces[0].Id -ApiVersion "2019-04-01" 
 
foreach ($ipconfig in $networkInterface.properties.ipConfigurations) { 
    foreach ($fqdn in $ipconfig.properties.privateLinkConnectionProperties.fqdns) { 
        Write-Host "$($ipconfig.properties.privateIPAddress) $($fqdn)"  
        $recordName = $fqdn.split('.',2)[0] 
        $dnsZone = $fqdn.split('.',2)[1] 
        New-AzPrivateDnsRecordSet -Name $recordName -RecordType A -ZoneName "privatelink.servicebus.windows.net"  `
                                -ResourceGroupName $rgName -Ttl 600 `
                                -PrivateDnsRecords (New-AzPrivateDnsRecordConfig -IPv4Address $ipconfig.properties.privateIPAddress)  
    } 
}
```

## Manage private endpoints using Azure portal

When you create a private endpoint, the connection must be approved. If the resource for which you're creating a private endpoint is in your directory, you can approve the connection request provided you have sufficient permissions. If you're connecting to an Azure resource in another directory, you must wait for the owner of that resource to approve your connection request.

There are four provisioning states:

| Service action | Service consumer private endpoint state | Description |
| --- | --- | --- |
| None | Pending | Connection is created manually and is pending approval from the Private Link resource owner. |
| Approve | Approved | Connection was automatically or manually approved and is ready to be used. |
| Reject | Rejected | Connection was rejected by the private link resource owner. |
| Remove | Disconnected | Connection was removed by the private link resource owner. The private endpoint becomes informative and should be deleted for cleanup. |
 
###  Approve, reject, or remove a private endpoint connection

1. Sign in to the Azure portal.
2. In the search bar, type in **event hubs**.
3. Select the **namespace** that you want to manage.
4. Select the **Networking** tab.
5. Go to the appropriate following section based on the operation you want to: approve, reject, or remove.

### Approve a private endpoint connection

1. If there are any connections that are pending, you see a connection listed with **Pending** in the provisioning state. 
2. Select the **private endpoint** you wish to approve
3. Select the **Approve** button.
4. On the **Approve connection** page, add a comment (optional), and select **Yes**. If you select **No**, nothing happens. 
5. You should see the status of the private endpoint connection in the list changed to **Approved**. 

### Reject a private endpoint connection

1. If there are any private endpoint connections you want to reject, whether it's a pending request or existing connection, select the connection and select the **Reject** button.

    Screenshot that shows the Private endpoint connections tab with the Reject button highlighted.
2. On the **Reject connection** page, enter a comment (optional), and select **Yes**. If you select **No**, nothing happens. 
3. You should see the status of the private endpoint connection in the list changed to **Rejected**. 

### Delete a private endpoint connection

1. To delete a private endpoint connection, select it in the list, and select **Delete** on the toolbar.
2. On the **Delete connection** page, select **Yes** to confirm the deletion of the private endpoint. If you select **No**, nothing happens.
3. You should see the status changed to **Disconnected**. Then, the endpoint disappears from the list.

## Validate that the private link connection works

You should validate that resources within the virtual network of the private endpoint are connecting to your Event Hubs namespace over a private IP address, and that they have the correct private DNS zone integration.

First, create a virtual machine by following the steps in [Create a Windows virtual machine in the Azure portal](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal)

In the **Networking** tab: 

1. Specify **Virtual network** and **Subnet**. You must select the Virtual Network on which you deployed the private endpoint.
2. Specify a **public IP** resource.
3. For **NIC network security group**, select **None**.
4. For **Load balancing**, select **No**.

Connect to the VM, open the command line, and run the following command:

```console
nslookup <event-hubs-namespace-name>.servicebus.windows.net
```

You should see a result that looks like the following. 

```console
Non-authoritative answer:
Name:    <event-hubs-namespace-name>.privatelink.servicebus.windows.net
Address:  10.0.0.4 (private IP address associated with the private endpoint)
Aliases:  <event-hubs-namespace-name>.servicebus.windows.net
```

## Limitations and design considerations

- For pricing information, see [Azure Private Link pricing](https://azure.microsoft.com/pricing/details/private-link/).
- This feature is available in all Azure public regions.
- Maximum number of private endpoints per Event Hubs namespace: 120.
- The traffic is blocked at the application layer, not at the TCP layer. Therefore, you see TCP connections or `nslookup` operations succeeding against the public endpoint even though the public access is disabled. 

For more, see [Azure Private Link service: Limitations](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-link-service-overview.md#limitations)

## Related content

- Learn more about [Azure Private Link](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-link-service-overview.md)
- Learn more about [Azure Event Hubs](event-hubs-about.md)
