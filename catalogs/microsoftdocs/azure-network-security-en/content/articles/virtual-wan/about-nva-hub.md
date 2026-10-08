---
title: 'About Network Virtual Appliances - Virtual WAN hub'
titleSuffix: Azure Virtual WAN
description: Learn about Network Virtual Appliances in a Virtual WAN hub.
author: wtnlee
ms.service: azure-virtual-wan
ms.topic: concept-article
ms.date: 08/27/2026
ms.author: wellee
ms.custom: references_regions
# Customer intent: As someone with a networking background, I want to learn about Network Virtual Appliances in a Virtual WAN hub.
---
# About NVAs in a Virtual WAN hub

Customers can deploy select Network Virtual Appliances (NVAs) directly into a Virtual WAN hub in a solution that is jointly managed by Microsoft Azure and third-party Network Virtual Appliance vendors. Not all Network Virtual Appliances in Azure Marketplace can be deployed into a Virtual WAN hub. For a full list of available partners, see the [Partners](#partners) section of this article.

## Key benefits

When an NVA is deployed into a Virtual WAN hub, it can serve as a third-party gateway with various functionalities. It could serve as an SD-WAN gateway, Firewall, or a combination of both.

Deploying NVAs into a Virtual WAN hub provides the following benefits:

* **Pre-defined and pre-tested selection of infrastructure choices ([NVA Infrastructure Units](#units))**: Microsoft and the partner work together to validate throughput and bandwidth limits prior to solution being made available to customers.
* **Built-in availability and resiliency**: Virtual WAN NVA deployments are Availability Zone (AZ) aware and are automatically configured to be highly available.
* **No-hassle provisioning and boot-strapping**: A managed application is prequalified for provisioning and boot-strapping for the Virtual WAN platform. This managed application is available through the Azure Marketplace link.
* **Simplified routing**: Leverage Virtual WAN's intelligent routing systems. NVA solutions peer with the Virtual WAN hub router and participate in the Virtual WAN routing decision process similarly to Microsoft Gateways.
* **Integrated support**: Partners have a special support agreement with Microsoft Azure Virtual WAN to quickly diagnose and resolve any customer problems.
* **Optional platform-provided lifecycle management**: Upgrades and patches are managed either directly by you or as part of the Azure Virtual WAN service. For best practices related to software lifecycle management for NVAs in Virtual WAN, reach out to your NVA provider or reference provider documentation.
* **Integrated with platform features**: Transit connectivity with Microsoft gateways and Virtual Networks, Encrypted ExpressRoute (SD-WAN overlay running over an ExpressRoute circuit) and Virtual hub route tables interact seamlessly.

> **Important:**
> To ensure you get the best support for this integrated solution, make sure you have similar levels of support entitlement with both Microsoft and your Network Virtual Appliance provider.

## <a name="partners"></a> Partners

The following tables describe the Network Virtual Appliances that are eligible to be deployed in the Virtual WAN hub and the relevant use cases (connectivity and/or firewall). The Virtual WAN NVA Vendor Identifier column corresponds to the NVA Vendor that is displayed in Azure portal when you deploy a new NVA or view existing NVAs deployed in the Virtual hub.

> **Note:**
> New deployments of VMware SD-WAN in Azure Virtual WAN will be blocked at the end of June 2026. While existing deployments will continue to work, use Arista Velocloud SD-WAN for new NVA deployments.

 

The following SD-WAN connectivity Network Virtual Appliances can be deployed in the Virtual WAN hub.

| Partners | Virtual WAN NVA Vendor Identifier | Configuration/How-to/Deployment guide | Dedicated support model |
| --- | --- | --- | --- |
| [Barracuda Networks](https://azuremarketplace.microsoft.com/marketplace/apps/barracudanetworks.barracuda_cloudgenwan_gateway?tab=Overviewus/marketplace/apps/barracudanetworks.barracuda_cloudgenwan_gateway?tab=Overview) | barracudasdwanrelease | [Barracuda SecureEdge for Virtual WAN Deployment Guide](https://campus.barracuda.com/product/secureedge/doc/98223577/how-to-create-a-barracuda-secureedge-service-in-microsoft-azure) | Yes |
| [Cisco SD-WAN](https://aka.ms/ciscoMarketPlaceOffer) | ciscosdwan | The integration of the Cisco SD-WAN solution with Azure virtual WAN enhances Cloud OnRamp for Multi-Cloud deployments and enables configuring Cisco Catalyst 8000V Edge Software (Cisco Catalyst 8000V) as a network virtual appliance (NVA) in Azure Virtual WAN hubs. [View Cisco SD-WAN Cloud OnRamp, Cisco IOS XE Release 17.x configuration guide](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/cloudonramp/ios-xe-17/cloud-onramp-book-xe/cloud-onramp-multi-cloud.html#Cisco_Concept.dita_c61e0e7a-fff8-4080-afee-47b81e8df701) | Yes |
| VMware SD-WAN: **new deployments blocked at end of June 2026** | vmwaresdwaninvwan | New deployments of Velocloud SD-WAN in Azure Virtual WAN will be blocked as of the end of June 2026. Use the Arista Velocloud SD-WAN offering below for all new deployments. Arista Velocloud SD-WAN deployments support the latest compute infrastructure used by the Integrated NVA program. | - |
| [Arista Velocloud SD-WAN](https://www.arista.com/en/admin-guide-vc-6-4/sd-wan-6-4-velocloud-sd-wan-in-azure-virtual-wan-hub-deployment) | arista-velocloud-sdwan | [Arista VeloCloud SD-WAN in Azure Virtual WAN hub deployment](https://www.arista.com/en/admin-guide-vc-6-4/sd-wan-6-4-velocloud-sd-wan-in-azure-virtual-wan-hub-deployment). The managed application for deployment can be found at this [Azure Marketplace link](https://ms.portal.azure.com/#create/arista-networks.velocloud_sdwan_in_vwanvelocloudsdwaninvwan6122). | Yes |
| [Versa Networks](https://versa-networks.com/partners/microsoft-azure/) | versanetworks | If you're an existing Versa Networks customer, log on to your Versa account and access the deployment guide using the following link [Versa Deployment Guide](https://docs.versa-networks.com/Special:AuthenticationProviders?returntotitle=Getting_Started%2FDeployment_and_Initial_Configuration%2FBranch_Deployment%2FInitial_Configuration%2FInstall_a_VOS_Cloud_Gateway_on_an_Azure_Virtual_WAN). If you're a new Versa customer, sign-up using the [Versa preview sign-up link](https://versa-networks.com/demo/). | Yes |
| [HPE Aruba Networking EdgeConnect SD‑WAN](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.hpe.com%2Fus%2Fen%2Faruba-edgeconnect-sd-wan.html&data=05%7C02%7Ccfields%40microsoft.com%7C14255ea70cb5487e312a08de8f4c6dda%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C639105755794389164%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=hfJPRW23g2hrVwEQzFF2%2BmWKfgJ710Tq71PlynZQ%2Fg8%3D&reserved=0) | arubaedgeconnectenterprise | [HPE Aruba Networking EdgeConnect SD‑WAN deployment guide](https://arubanetworking.hpe.com/techdocs/sdwan-PDFs/deployments/dg_ECV-Azure_latest.pdf). : [Azure Marketplace link](https://portal.azure.com/#create/silver-peak-systems.aruba_edgeconnect_enterprise_in_vwan_apparuba_edgeconnect_enterprise_in_vwan_v1) | No |

The following security Network Virtual Appliance can be deployed in the Virtual WAN hub. This Virtual Appliance can be used to inspect all North-South, East-West, and Internet-bound traffic.

| Partners | Virtual WAN NVA Vendor | Configuration/How-to/Deployment guide | Dedicated support model |
| --- | --- | --- | --- |
| [Check Point CloudGuard Network Security for Azure Virtual WAN](https://www.checkpoint.com/cloudguard/microsoft-azure-security/wan/) | checkpoint | [Check Point Network Security for Virtual WAN](https://sc1.checkpoint.com/documents/IaaS/WebAdminGuides/EN/CP_CloudGuard_Network_for_Azure_vWAN/Default.htm) deployment guide | No |
| [Fortinet Next-Generation Firewall (NGFW)](https://www.fortinet.com/products/next-generation-firewall) | fortinet-ngfw | [Fortinet NGFW](https://aka.ms/fortinetngfwdocumentation) deployment guide.  Fortinet NGFW supports up to 80 scale units and isn't recommended to be used for SD-WAN tunnel termination. For Fortigate SD-WAN tunnel termination, see [Fortinet SD-WAN and NGFW documentation](https://aka.ms/fortinetdualroledocumentation). | No |
| [Cisco Secure Firewall Threat Defense for Azure Virtual WAN](https://azuremarketplace.microsoft.com/marketplace/apps/cisco.cisco-tdv-for-vwan?tab=Overview) | cisco-tdv-vwan-nva | [Cisco Secure Firewall Threat Defense for Azure Virtual WAN for Virtual WAN](https://www.cisco.com/c/en/us/td/docs/security/firepower/quick_start/consolidated_ftdv_gsg/ftdv-gsg/m-ftdv-azure-gsg.html#topic_kcy_l1r_szb-tdv_on_azure_vWAN) deployment guide | No |

The following dual-role SD-WAN connectivity and security (Next-Generation Firewall) Network Virtual Appliances can be deployed in the Virtual WAN hub. These Virtual Appliances can be used to inspect all North-South, East-West, and Internet-bound traffic.

| Partners | Virtual WAN NVA Vendor | Configuration/How-to/Deployment guide | Dedicated support model |
| --- | --- | --- | --- |
| [Fortinet Next-Generation Firewall (NGFW)](https://www.fortinet.com/products/next-generation-firewall) | fortinet-sdwan-and-ngfw | [Fortinet SD-WAN and NGFW NVA](https://aka.ms/fortinetdualroledocumentation) deployment guide. Fortinet SD-WAN and NGFW NVA support up to 20 scale units and supports both SD-WAN tunnel termination and Next-Generation Firewall capabilities. | No |



## Basic use cases

### Any-to-any connectivity

Customers can deploy an NVA in every Azure region where they have a footprint. Branch sites are connected to Azure via SD-WAN tunnels terminating on the closest NVA deployed in an Azure Virtual WAN hub.

Branch sites can then access workloads in Azure deployed in virtual networks in the same region or other regions through the Microsoft global-backbone. SD-WAN connected sites can also communicate with other branches that are connected to Azure via ExpressRoute, Site-to-site VPN, or Remote User connectivity.

Global transit architecture.

### Security provided by Azure Firewall along with connectivity NVA

Customers can deploy an Azure Firewall along side their connectivity-based NVAs. Virtual WAN routing can be configured to send all traffic to Azure Firewall for inspection. You can also configure Virtual WAN to send all internet-bound traffic to Azure Firewall for inspection.

Global transit architecture with Azure Firewall.

### Security provided by NVA firewalls

Customers can also deploy NVAs into a Virtual WAN hub that performs both SD-WAN connectivity and Next-Generation Firewall capabilities. Customers can connect on-premises devices to the NVA in the hub and also use the same appliance to inspect all North-South, East-West, and Internet-bound traffic. Routing to enable these scenarios can be configured via [Routing Intent and Routing Policies](how-to-routing-policies.md).

Partners that support these traffic flows are listed as **dual-role SD-WAN connectivity and security (Next-Generation Firewall) Network Virtual Appliances** in the [Partners section](#partners).

Global transit architecture with third-party NVA.

## <a name="how"></a>How does it work?

The NVAs that are available to be deployed directly into the Azure Virtual WAN hub are engineered specifically to be used in a Virtual WAN hub. The NVA offer is published to Azure Marketplace as a managed application, and customers can deploy the offer directly from Azure Marketplace.

Process overview

Each partner's NVA offering will have a slightly different experience and functionality based on their deployment requirements.

### <a name="managed"></a>Managed application

All NVA offerings that are available to be deployed into a Virtual WAN hub will have a **managed application** that is available in Azure Marketplace. Managed applications allow partners to do the following:

* Build a custom deployment experience for their NVA.
* Provide a specialized Resource Manager template that allows them to create the NVA directly in a Virtual WAN hub.
* Bill software licensing costs directly, or through Azure Marketplace.
* Expose custom properties and resource meters.

NVA Partners might create different resources depending on their appliance deployment, configuration licensing, and management needs. When a customer creates an NVA in a Virtual WAN hub, like all managed applications, there will be two resource groups created in their subscription.

* **Customer resource group** - This contains an application placeholder for the managed application. Partners can use this to expose whatever customer properties they choose here.
* **Managed resource group** - Customers can't configure or change resources in this resource group directly, as this is controlled by the publisher of the managed application. This resource group contains the **NetworkVirtualAppliances** resource.

Managed Application resource groups


### Managed resource group permissions

By default, all managed resource groups have a deny-all Microsoft Entra assignment. Deny-all assignments prevent customers from calling write operations on any resources in the managed resource group, including Network Virtual Appliance resources.

However, partners might create exceptions for specific actions that customers are allowed to perform on resources deployed in managed resource groups.

Permissions on resources in existing managed resource groups aren't dynamically updated as new permitted actions are added by partners and require a manual refresh.

To refresh permissions on the managed resource groups, customers can leverage the [Refresh Permissions REST API ](https://learn.microsoft.com/rest/api/managedapplications/applications/refresh-permissions).

> **Note:**
> To properly apply new permissions, refresh permissions API must be called with an additional query parameter **targetVersion**. The value for targetVersion is provider-specific. Please reference your provider's documentation for the latest version number.

```http-interactive
POST https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}/refreshPermissions?api-version=2019-07-01&targetVersion={targetVersion}
```

### <a name="units"></a>NVA Infrastructure Units

When you create an NVA in a Virtual WAN hub, you must choose the number of NVA Infrastructure Units you want to deploy it with. An **NVA Infrastructure Unit** is a unit of aggregate bandwidth capacity for an NVA in a Virtual WAN hub. An **NVA Infrastructure Unit** is similar to a VPN [Scale Unit](pricing-concepts.md#scale-unit) in terms of the way you think about capacity and sizing.

* NVA Infrastructure Units are a guideline for how much aggregate networking throughput the **virtual machine infrastructure** on which NVAs are deployed can support. 1 NVA Infrastructure Unit corresponds to 500 Mbps of aggregate throughput. This 500 Mbps number doesn't take into consideration differences between the software that runs on Network Virtual Appliances. Depending on the features turned on in the NVA or partner-specific software implementation, networking functions such as encryption/decryption, encapsulation/decapsulation or deep packet inspection might be more intensive. This means you might see less throughput than the NVA infrastructure unit. For a mapping of Virtual WAN NVA infrastructure units to expected throughputs, please contact the vendor.
* Azure supports deployments ranging from 2-80 NVA Infrastructure Units for a given NVA virtual hub deployment, but partners might choose which scale units they support. As such, you might not be able to deploy all possible scale unit configurations.

NVAs in Virtual WAN are deployed to ensure you always are able to achieve at minimum the vendor-specific throughput numbers for a particular chosen scale unit. To achieve this, NVAs in Virtual WAN are overprovisioned with additional capacity in the form of multiple instances in a 'n+1' manner. This means that at any given time you might see aggregate throughput across the instances to be greater than the vendor-specific throughput numbers. This ensures if an instance is unhealthy, the remaining 'n' instance(s) can service customer traffic and provide the vendor-specific throughput for that scale unit.

If the total amount of traffic that passes through an NVA at a given time goes above the vendor-specific throughput numbers for the chosen scale unit, events that might cause an NVA instance to be unavailable including but not limited to routine Azure platform maintenance activities or software upgrades can result in service or connectivity disruption. To minimize service disruptions, you should choose the scale unit based on your peak traffic profile and vendor-specific throughput numbers for a particular scale unit as opposed to relying on best-case throughput numbers observed during testing.

### <a name="hubspace"></a> Hub address space

Every Virtual WAN hub is deployed with a hub address space. The minimum recommended hub address space is /23. Certain NVA capabilities have a minimum hub address space requirement. 

| Capability | Minimum Hub Address Space required |
| --- | --- |
| NVA deployments with greater than 2 network interfaces | /23 |

There are a limited number of IP addresses available in the Virtual WAN hub that can be assigned to the internal or external subnet of NVA deployments. The number of IP addresses allocated to either the internal or external subnet of NVAs is static for all Virtual WAN hubs deployed with a specific address size, irrespective of whether or not customers utilize or plan to utilize all services in the Virtual WAN hub. Service-level allocation can't be modified.

The following table describes the number of IP addresses available for NVA deployments for different hub address sizes.

| Hub Address Space | IP addresses available for NVA internal subnet | IP addresses available for NVA external subnet |
| --- | --- | --- |
| /23 or smaller | 11 | 11 |
| /22 | 27 | 27 |
| /21 | 59 | 59 |
| /20 or larger | 123 | 123 |

#### <a name="ipconsumed" ></a> Consumed IP addresses

>**Note:**
> Select your hub address space with scalability taken into consideration as the subnets allocated to NVAs can't be re-sized. Actions such as deploying multiple NVAs in the hub or adding additional IP configurations to existing NVAs requires sufficient available IP addresses.

The number of IP addresses that are consumed by a single NVA deployment is calculated separately for the internal and external interfaces. NVAs deployed in the same hub consume IP addresses from the same subnet as other NVAs and therefore all NVAs in the same hub contribute towards to hub's limit.

The following table shows the number of NVA instances deployed for different scale units.

| Scale Unit | Instances |
| --- | --- |
| 2-20 | 2 |
| 30-40 | 3 |
| 60 | 4 |
| 80 | 5 |

**Internal Interface**

* For NVA deployments that are **not** compatible for [Internet Inbound](how-to-network-virtual-appliance-inbound.md), **1 IP address** is assigned to the Internal Load Balancer. **2 IP addresses** are consumed if the NVA deployments is compatible  for [Internet-Inbound](how-to-network-virtual-appliance-inbound.md). Reference [Internet-Inbound](how-to-network-virtual-appliance-inbound.md) for documentation on how to verify your NVA's compatability status.
* One IP address is consumed per NVA instance. This IP address is assigned to each NVAs internal NIC. You may add [additional IP configurations](how-to-network-virtual-appliance-add-ip-configurations.md) to the internal NIC. One additional IP configuration results in one additional private IP address consumed per NVA instance. 

**Example**: 

* 60 scale unit NVA (4 instances)
* Internet-inbound compatible
* 3 IP configurations on the internal interface.

In this example, 14 IP addresses are consumed in the internal subnet. 12 IP addresses are assigned to the internal interface. 2 additional IP addresses are consumed by the load balancer. 

**External Interface**

One IP address is consumed per NVA instance. This IP address is assigned to the external NIC as part of a private and public IP tuple. You can assign [additional IP configurations](how-to-network-virtual-appliance-add-ip-configurations.md)  to the external NIC to add additional private and public IP tuples. One additional IP configuration results in one additional IP address consumed per NVA instance. 

**Example**: 

* 60 scale unit NVA (4 instances)
* 2 IP configurations on the internal interface.

In this example, 8 IP addresses are consumed in the external subnet. 8 IP addresses are assigned to the internal interface. 


## <a name="configuration"></a>NVA configuration process

Partners provide an experience that configures the NVA automatically as part of the deployment process. After the deployment, use the NVA partner portal or management application for any additional configuration. You can't access the NVA directly for configuration.

If an NVA instance becomes unresponsive or unreachable, Virtual WAN provides recovery operations instead of direct access. For more information, see [How to restart a Network Virtual Appliance in an Azure Virtual WAN hub](how-to-network-virtual-appliance-restart.md) and [How to reimage a Network Virtual Appliance in an Azure Virtual WAN hub](how-to-network-virtual-appliance-reimage.md). Access to an NVA instance's serial console requires Azure Support.

## <a name="resources"></a>Site and connection resources with NVAs

Unlike Virtual WAN Site-to-site VPN gateway configurations, you don't need to create **Site** resources, **Site-to-Site connection** resources, or **point-to-site connection** resources to connect your branch sites to your NVA in a Virtual WAN hub.

You still need to create Hub-to-VNet connections to connect your Virtual WAN hub to your Azure virtual networks as well as connect ExpressRoute, Site-to-site VPN, or Remote User VPN connections.

## <a name="regions"></a>Supported regions

NVA in the virtual hub is available in the following regions:

| Geopolitical region | Azure regions |
| --- | --- |
| North America | Canada Central, Canada East, Central US, East US, East US 2, South Central US, North Central US, West Central US, West US, West US 2, West US 3, Mexico Central |
| South America | Brazil South, Brazil Southeast |
| Europe | France Central, France South, Germany North, Germany West Central, North Europe, Norway East, Norway West, Switzerland North, Switzerland West, UK South, UK West, West Europe, Sweden Central, Italy North, Spain Central, Poland Central, Sweden South, Belgium Central, Austria East |
| Middle East | UAE North, Qatar Central, Israel Central |
| Asia | East Asia, Japan East, Japan West, Korea Central, Korea South, Southeast Asia, Malaysia West |
| Australia | Australia South East, Australia East, Australia Central, Australia Central 2, New Zealand North |
| Africa | South Africa North, South Africa West |
| India | South India, West India, Central India |

## NVA FAQ

### I'm a network virtual appliance (NVA) partner and want to get our NVA in the hub. Can I join this partner program?

Unfortunately, we don't have capacity to on-board any new partner offers at this time. Check back with us at a later date!

### Can I deploy any NVA from Azure Marketplace into the Virtual WAN hub?

Only partners listed in the [Partners](about-nva-hub.md#partners) section can be deployed into the Virtual WAN hub.

### What is the cost of the NVA?

You must purchase a license for the NVA from the NVA vendor. Bring-your-own license (BYOL) is the only licensing model supported today. In addition, Microsoft charges for the NVA Infrastructure Units you consume, and any other resources you use. For more information, see [Pricing concepts](pricing-concepts.md).

### Can I deploy an NVA to a Basic hub?

No, you must use a Standard hub if you want to deploy an NVA.

### Can I deploy an NVA into a Secure hub?

Yes. Partner NVAs can be deployed into a hub with Azure Firewall.

### Can I connect any device in my branch office to my NVA in the hub?

No,  Barracuda CloudGen WAN is only compatible with Barracuda edge devices. To learn more about CloudGen WAN requirements, see [Barracuda's CloudGen WAN page](https://www.barracuda.com/products/cloudgenwan). For Cisco, there are several SD-WAN devices that are compatible. See [Cisco Cloud OnRamp for Multi-Cloud](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/cloudonramp/ios-xe-17/cloud-onramp-book-xe/cloud-onramp-multi-cloud.html#Cisco_Concept.dita_c61e0e7a-fff8-4080-afee-47b81e8df701) documentation for compatible devices. Reach out to your provider with any questions.

### What routing scenarios are supported with NVA in the hub?

All routing scenarios supported by Virtual WAN are supported with NVAs in the hub.

### What regions are supported?

For supported regions, see [NVA supported regions](about-nva-hub.md#regions).

### How do I delete my NVA in the hub?

If the Network Virtual Appliance resource was deployed via a Managed Application, delete the Managed Application. Deleting the Managed Application automatically deletes the Managed Resource Group and associated Network Virtual Appliance resource.

You can't delete an NVA that is the next hop resource for a Routing Policy. To delete the NVA, first delete the Routing Policy.

If the Network Virtual Appliance resource was deployed via partner orchestration software, reference partner documentation to delete the Network Virtual Appliance.

Alternatively, you can run the following PowerShell command to delete your Network Virtual Appliance.

1. Find the Azure resource group of the NVA you want to delete. The Azure resource group is usually **different** than the resource group  the Virtual WAN hub is deployed in. Ensure the  Virtual Hub property of the NVA resource corresponds to the NVA you want to delete. The following example assumes that all NVAs in your subscription have distinct names. If there are multiple NVAs with the same name, make sure you collect the information associated with the NVA you want to delete.  

    ```azurepowershell-interactive
    $nva = Get-AzNetworkVirtualAppliance -Name <NVA name>
    $nva.VirtualHub
    ```  
2. Delete the NVA.
   ```azurepowershell-interactive
   Remove-AzNetworkVirtualAppliance -Name $nva.Name -ResourceGroupName $nva.ResourceGroupName
   ```

The same series of steps can be executed from Azure CLI.

1. Find the Azure resource group of the NVA you want to delete.  The Azure resource group is usually **different** than the resource group  the Virtual WAN hub is deployed in. Ensure the  Virtual Hub property of the NVA resource corresponds to the NVA you want to delete. 
   ```azurecli-interactive
    az network virtual-appliance list
   ```
2. Delete the NVA
   ```azurecli-interactive
    az network virtual-appliance delete --subscription <subscription name> --resource-group <resource group name> --name <NVA name>
   ```
### How is MANA support handled for NVAs in the hub?

For all NVA in the hub deployments, Azure automatically applies the [LegacyVMNVA](../virtual-network/accelerated-networking-mana-overview.md) tag. This tag prevents the NVA from running on MANA hardware through [May 31, 2027](../virtual-network/accelerated-networking-mana-overview.md). After this date, the tag is no longer honored, and NVAs deployed in the hub might run on MANA hardware. No action is required to apply the tag. To avoid any network disruption, work with your NVA provider to upgrade to a software version that supports MANA before [May 31, 2027](../virtual-network/accelerated-networking-mana-overview.md).
   


## Next steps

To learn more about Virtual WAN, see the [Virtual WAN Overview](virtual-wan-about.md) article.
