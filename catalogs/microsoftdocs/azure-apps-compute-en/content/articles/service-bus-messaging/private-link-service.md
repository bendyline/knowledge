---
title: Integrate Azure Service Bus with Azure Private Link Service
description: Learn how to integrate Azure Service Bus with Azure Private Link Service
author: spelluru
ms.author: spelluru
ms.date: 05/02/2026
ms.topic: how-to 
ms.custom:
  - devx-track-azurepowershell
  - sfi-image-nochange
#customer intent: As a developer or administrator, I want to configure private endpoints for Azure Service Bus so that I can securely access the namespace over a private network.
---

# Allow access to Azure Service Bus namespaces via private endpoints
Azure Private Link Service enables you to access Azure services (for example, Azure Service Bus, Azure Storage, and Azure Cosmos DB) and Azure hosted customer/partner services over a **private endpoint** in your virtual network.

A private endpoint is a network interface that connects you privately and securely to a service powered by Azure Private Link. The private endpoint uses a private IP address from your virtual network, effectively bringing the service into your virtual network. All traffic to the service can be routed through the private endpoint, so no gateways, NAT devices, ExpressRoute or VPN connections, or public IP addresses are needed. Traffic between your virtual network and the service traverses over the Microsoft backbone network, eliminating exposure from the public Internet. You can connect to an instance of an Azure resource, giving you the highest level of granularity in access control.

For more information, see [What is Azure Private Link?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-link-overview.md)

## Important points
- This feature is supported with the **premium** tier of Azure Service Bus. For more information about the premium tier, see the [Service Bus Premium and Standard messaging tiers](service-bus-premium-messaging.md) article.
- Implementing private endpoints can prevent other Azure services from interacting with Service Bus. As an exception, you can allow access to Service Bus resources from certain **trusted services** even when private endpoints are enabled. For a list of trusted services, see [Trusted services](#trusted-microsoft-services).

    The following Microsoft services must be on a virtual network:
    - Azure App Service
    - Azure Functions
- Specify **at least one IP rule or virtual network rule** for the namespace to allow traffic only from the specified IP addresses or subnet of a virtual network. If there are no IP and virtual network rules, the namespace can be accessed over the public internet (using the access key). 


## Add a private endpoint using Azure portal

### Prerequisites

To integrate a Service Bus namespace with Azure Private Link, you need the following entities or permissions:

- A Service Bus namespace.
- An Azure virtual network.
- A subnet in the virtual network. You can use the **default** subnet. 
- Owner or contributor permissions for both the Service Bus namespace and the virtual network.

Your private endpoint and virtual network must be in the same region. When you select a region for the private endpoint in the portal, it automatically filters to show only virtual networks in that region. Your Service Bus namespace can be in a different region. Your private endpoint uses a private IP address in your virtual network.

### Configure private access when creating a namespace
When creating a namespace, you can either allow public only (from all networks) or private only (only via private endpoints) access to the namespace.

If you select the **Private access** option on the **Networking** page of the namespace creation wizard, you can add a private endpoint on the page by selecting **+ Private endpoint** button. See the next section for the detailed steps for adding a private endpoint. 

Screenshot showing the Networking page of the Create namespace wizard with Private access option selected.


### Configure private access for an existing namespace

If you already have an existing namespace, you can create a private endpoint by following these steps:

1. Sign in to the [Azure portal](https://portal.azure.com).
2. In the search bar, type in **Service Bus**.
3. Select the **namespace** from the list to which you want to add a private endpoint.
2. On the left menu, select **Networking** option under **Settings**.  

    > **Note:**
    > You see the **Networking** tab only for **premium** namespaces.  
1. On the **Networking** page, for **Public network access**, select **Disabled** if you want the namespace to be accessed only via private endpoints. 
1. For **Allow trusted Microsoft services to bypass this firewall**, select **Yes** if you want to allow [trusted Microsoft services](#trusted-microsoft-services) to bypass this firewall. 
1. Select **Save** on the toolbar. 

    Screenshot of the Networking page with public network access as Disabled.
1. To allow access to the namespace via private endpoints, select the **Private endpoint connections** tab at the top of the page
1. Select the **+ Private Endpoint** button at the top of the page.

    Screenshot that shows the Private endpoint connections page with Add private endpoint button selected.
7. On the **Basics** page, follow these steps: 
    1. Select the **Azure subscription** in which you want to create the private endpoint. 
    2. Select the **resource group** for the private endpoint resource.
    3. Enter a **name** for the private endpoint. 
    1. Enter a **name for the network interface**. 
    1. Select a **region** for the private endpoint. Your private endpoint must be in the same region as your virtual network, but can be in a different region from the private link resource that you're connecting to. 
    1. Select **Next: Resource >** button at the bottom of the page.

        Screenshot showing the Basics page of the Create private endpoint wizard.
8. On the **Resource** page, review settings, and select **Next: Virtual Network** at the bottom of the page.

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

    Screenshot showing the DNS page of the Create private endpoint wizard.
1. On the **Tags** page, create any tags (names and values) that you want to associate with the private endpoint resource. Then, select **Review + create** button at the bottom of the page. 
1. On the **Review + create**, review all the settings, and select **Create** to create the private endpoint.
    
    Screenshot showing the Review and Create page of the Create private endpoint wizard.
12. Confirm that the private endpoint is created. If you're the owner of the resource, on the **Networking** page of the Service Bus namespace, the endpoint connection should be **auto-approved**. If it's in the **pending** state, see the [Manage private endpoints using Azure portal](#manage-private-endpoints-using-azure-portal) section.

    Screenshot that shows the Private endpoint connections page with the newly created private endpoint.


## Trusted Microsoft services
When you enable the **Allow trusted Microsoft services to bypass this firewall** setting, the following services are granted access to your Service Bus resources.

> **Important:**
> When enabling trusted Microsoft services, always assign a Managed Identity. This identity facilitates secure communication between your Service Bus namespace and the trusted Microsoft service.

| Trusted service | Supported usage scenarios |
| --- | --- |
| Azure Event Grid | Allows Azure Event Grid to send events to queues or topics in your Service Bus namespace. You also need to do the following steps: <ul><li>Enable system-assigned identity for a topic or a domain</li><li>Add the identity to the Azure Service Bus Data Sender role on the Service Bus namespace</li><li>Then, configure the event subscription that uses a Service Bus queue or topic as an endpoint to use the system-assigned identity.</li></ul> <p>For more information, see [Event delivery with a managed identity](../event-grid/managed-service-identity.md)</p> |
| Azure Stream Analytics | Allows an Azure Stream Analytics job to output data to Service Bus [queues](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/service-bus-queues-output.md) to [topics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/service-bus-topics-output.md). <p>**Important**: The Stream Analytics job should be configured to use a **managed identity** to access the Service Bus namespace. Add the identity to the **Azure Service Bus Data Sender** role on the Service Bus namespace. </p> |
| Azure IoT Hub | Allows an IoT hub to send messages to queues or topics in your Service Bus namespace. You also need to do the following steps: <ul><li>[Enable system-assigned or user assigned managed identity for your IoT hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-managed-identity.md).</li><li>[Add the identity to the **Azure Service Bus Data Sender** role on the Service Bus namespace](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).</li><li>[Configure the IoT Hub that uses a Service Bus entity as an endpoint to use the identity-based authentication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-managed-identity.md#configure-message-routing-with-managed-identities).</li></ul> |
| Azure API Management | <p>The API Management service allows you to send messages to a Service Bus queue/topic in your Service Bus Namespace.</p><ul><li>You can trigger custom workflows by sending messages to your Service Bus queue/topic when an API is invoked by using the [send-request policy](../api-management/api-management-sample-send-request.md).</li><li>You can also treat a Service Bus queue/topic as your backend in an API. For a sample policy, see [Authenticate using a managed identity to access a Service Bus queue or topic](https://github.com/Azure/api-management-policy-snippets/blob/master/examples/Authenticate%20using%20Managed%20Identity%20to%20access%20Service%20Bus.xml). You also need to do the following steps:<ol><li>Enable system-assigned identity on the API Management instance. For instructions, see [Use managed identities in Azure API Management](../api-management/api-management-howto-use-managed-service-identity.md).</li><li>Add the identity to the **Azure Service Bus Data Sender** role on the Service Bus namespace</li></ol></li></ul> |
| Azure IoT Central | <p>Allows IoT Central to export data to Service Bus queues or topics in your Service Bus namespace. You also need to do the following steps:</p><ul><li>Enable system-assigned identity for your IoT Central application</li><li>Add the identity to the **Azure Service Bus Data Sender** role on the Service Bus namespace. </li><li>Then, configure the Service Bus [export destination on your IoT Central application](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/howto-export-data.md) to use identity-based authentication. </li> |
| Azure Digital Twins | Allows Azure Digital Twins to egress data to Service Bus topics in your Service Bus namespace. You also need to do the following steps: <p><ul><li>Enable system-assigned identity for your Azure Digital Twins instance.</li><li>Add the identity to the **Azure Service Bus Data Sender** role on the Service Bus namespace.</li><li>Then, configure an Azure Digital Twins endpoint or Azure Digital Twins data history connection that uses the system-assigned identity to authenticate. For more information about configuring endpoints and event routes to Service Bus resources from Azure Digital Twins, see [Route Azure Digital Twins events](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/concepts-route-events.md) and [Create endpoints in Azure Digital Twins](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-create-endpoints.md). </li></ul> |
| Azure Monitor (Diagnostic Settings and Action Groups) | Allows Azure Monitor to send diagnostic information and alert notifications to Service Bus in your Service Bus namespace. Azure Monitor can read from and write data to the Service Bus namespace. |
| Azure Synapse | Allows Azure Synapse to connect to the service bus using the Synapse Workspace Managed Identity. Add the Azure Service Bus Data Sender, Receiver or Owner role to the identity on the Service Bus namespace. |

The other trusted services for Azure Service Bus can be found below: 
-	Azure Data Explorer
-	Azure Health Data Services
-	Azure Arc
-	Azure Kubernetes 
- Azure Machine Learning
- Microsoft Purview
- Microsoft Defender for Cloud
- Azure Provider Hub


To allow trusted services to access your namespace, switch to the **Public Access** tab on the **Networking** page, and select **Yes** for **Allow trusted Microsoft services to bypass this firewall?**. 


## Add a private endpoint using PowerShell
The following example shows you how to use Azure PowerShell to create a private endpoint connection to a Service Bus namespace.

Your private endpoint and virtual network must be in the same region. Your Service Bus namespace can be in a different region. Your private endpoint uses a private IP address in your virtual network.

```azurepowershell-interactive

$rgName = "<RESOURCE GROUP NAME>"
$vnetlocation = "<VNET LOCATION>"
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

# create premium service bus namespace
$namespaceResource = New-AzResource -Location $namespaceLocation -ResourceName $namespaceName -ResourceGroupName $rgName -Sku @{name = "Premium"; capacity = 1} -Properties @{} -ResourceType "Microsoft.ServiceBus/namespaces" -

# create a private link service connection
$privateEndpointConnection = New-AzPrivateLinkServiceConnection `
                                -Name $peConnectionName `
                                -PrivateLinkServiceId $namespaceResource.ResourceId `
                                -GroupId "namespace"

# get subnet object that you will use in the next step                                
$virtualNetwork = Get-AzVirtualNetwork -ResourceGroupName  $rgName -Name $vnetName
$subnet = $virtualNetwork | Select -ExpandProperty subnets `
                                | Where-Object  {$_.Name -eq $subnetName}  
   
# now, create private endpoint   
$privateEndpoint = New-AzPrivateEndpoint -ResourceGroupName $rgName  `
                                -Name $vnetName   `
                                -Location $vnetlocation `
                                -Subnet  $subnet   `
                                -PrivateLinkServiceConnection $privateEndpointConnection

(Get-AzResource -ResourceId $namespaceResource.ResourceId -ExpandProperties).Properties


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
1. In the search bar, type in **Service Bus**.
1. Select the **namespace** that you want to manage.
1. Select the **Networking** tab.
5. See the appropriate following section based on the operation you want to: approve, reject, or remove. 

### Reject a private endpoint connection

1. If there are any private endpoint connections you want to reject, whether it's a pending request or existing connection that was approved earlier, select the endpoint connection and select the **Reject** button.

    Screenshot that shows the Private endpoint connections page with the Reject button highlighted.
2. On the **Reject connection** page, enter an optional comment, and select **Yes**. If you select **No**, nothing happens. 

    Screenshot that shows the Reject connection page.
3. You should see the status of the connection in the list changed **Rejected**. 

    Screenshot that shows the Private endpoint connections page with endpoint rejected.


### Remove a private endpoint connection

1. To remove a private endpoint connection, select it in the list, and select **Remove** on the toolbar. 

    Screenshot that shows the Private endpoint connections page with the Remove button highlighted.
2. On the **Delete connection** page, select **Yes** to confirm the deletion of the private endpoint. If you select **No**, nothing happens. 

    Screenshot that shows the Delete connection page.
3. You should see the status changed to **Disconnected**. Then, the endpoint disappears from the list. 

### Approve a private endpoint connection

1. If there are any connections that are pending, you see a connection listed with **Pending** in the provisioning state. 
2. Select the **private endpoint** you wish to approve
3. Select the **Approve** button on the toolbar.
4. On the **Approve connection** page, enter an optional **comment**, and select **Yes**. If you select **No**, nothing happens. 
5. You should see the status of the connection in the list changed to **Approved**. 


## Validate that the private link connection works

You should validate that resources within the virtual network of the private endpoint are connecting to your Service Bus namespace over a private IP address, and that they have the correct private DNS zone integration.

First, create a virtual machine by following the steps in [Create a Windows virtual machine in the Azure portal](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal)

In the **Networking** tab: 

1. Specify **Virtual network** and **Subnet**. You must select the Virtual Network on which you deployed the private endpoint.
2. Specify a **public IP** resource.
3. For **NIC network security group**, select **None**.
4. For **Load balancing**, select **No**.

Connect to the VM, open the command line, and run the following command:

```console
nslookup <service-bus-namespace-name>.servicebus.windows.net
```

You should see a result that looks like the following. 

```console
Non-authoritative answer:
Name:    <service-bus-namespace-name>.privatelink.servicebus.windows.net
Address:  10.0.0.4 (private IP address associated with the private endpoint)
Aliases:  <service-bus-namespace-name>.servicebus.windows.net
```

## Limitations and Design Considerations

- For pricing information, see [Azure Private Link pricing](https://azure.microsoft.com/pricing/details/private-link/).
- This feature is available in all Azure public regions.
- Maximum number of private endpoints per Service Bus namespace: 120.
- The traffic is blocked at the application layer, not at the TCP layer. Therefore, you see TCP connections or `nslookup` operations succeeding against the public endpoint even though the public access is disabled. 

For more, see [Azure Private Link service: Limitations](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-link-service-overview.md#limitations)

## Troubleshoot private endpoint connectivity

After you enable a private endpoint, most connectivity issues come down to three things: DNS resolution, network rules, and the connection state. Work through the following checks.

### DNS resolves to a public IP instead of the private IP

This problem is common. The client must resolve the namespace to the private IP through the `privatelink.servicebus.windows.net` private DNS zone.

From a host inside the virtual network, run:

```console
nslookup <service-bus-namespace-name>.servicebus.windows.net
```

A correct result returns the `privatelink` alias and a private IP (for example, `10.0.0.4`), as shown in [Validate that the private link connection works](#validate-that-the-private-link-connection-works). If you get a public IP instead:

- Confirm the private DNS zone `privatelink.servicebus.windows.net` exists and is linked to the client's virtual network.
- Confirm an A record for the namespace points to the private endpoint's private IP.
- If you use custom DNS servers or an on-premises resolver, confirm the conditional forwarder for `servicebus.windows.net` forwards to Azure DNS (168.63.129.16) so the private zone is honored.

> **Note:**
> Because traffic is blocked at the application layer rather than the TCP layer, `nslookup` or a TCP connection against the public endpoint can still succeed even when public access is disabled. Resolution returning a public IP from inside the virtual network still indicates a DNS misconfiguration.

### The private endpoint connection isn't approved

In the Azure portal, open the namespace > **Networking** > **Private endpoint connections** and confirm the connection state is **Approved**. A connection in **Pending** or **Rejected** state blocks traffic. See [Approve, reject, or remove a private endpoint connection](#approve-reject-or-remove-a-private-endpoint-connection).

### A network rule blocks the traffic

- Confirm the network security group (NSG) and any user-defined routes (UDRs) on the client subnet allow traffic to the private IP on Advanced Message Queuing Protocol (AMQP) ports 5671 and 5672, or 443 for Web Sockets.
- If public network access is disabled, confirm that at least one IP rule or virtual network rule exists. With no rules and public access disabled, the namespace is unreachable from outside the private network.

### A trusted service can't connect

Azure App Service and Azure Functions must be integrated with the virtual network to reach a namespace behind a private endpoint. For the list of services that can bypass the firewall, see [Trusted Microsoft services](#trusted-microsoft-services).

For broader connectivity and timeout troubleshooting, see [Handle timeouts and configure retries](service-bus-timeouts-retries.md) and the [Troubleshooting guide](service-bus-troubleshooting-guide.md).

## Related content

- Learn more about [Azure Private Link](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-link-service-overview.md)
- Learn more about [Azure Service Bus](service-bus-messaging-overview.md)
