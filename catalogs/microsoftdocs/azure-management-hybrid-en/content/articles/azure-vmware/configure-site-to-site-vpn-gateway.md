---
title: Configure a site-to-site VPN in vWAN for Azure VMware Solution
description: Learn how to establish a VPN (IPsec IKEv1 and IKEv2) site-to-site tunnel into Azure VMware Solutions.
ms.topic: how-to
ms.service: azure-vmware
ms.date: 2/2/2026
ms.custom:
  - engagement-fy23
  - sfi-image-nochange
# Customer intent: "As a network administrator, I want to configure a site-to-site VPN connection between my on-premises environment and Azure VMware Solution, so that I can securely integrate my infrastructure with Azure resources for enhanced scalability and disaster recovery."
---

# Configure a site-to-site VPN in vWAN for Azure VMware Solution

In this article, learn how to establish a VPN (IPsec IKEv1 and IKEv2) site-to-site tunnel terminating in the Microsoft Azure Virtual WAN hub. The hub contains the Azure VMware Solution ExpressRoute gateway and the site-to-site VPN gateway. It connects an on-premises VPN device with an Azure VMware Solution endpoint.

Diagram showing VPN site-to-site tunnel architecture.

## Prerequisites
You must have a public-facing IP address terminating on an on-premises VPN device.

## Create an Azure Virtual WAN


1. In the portal, in the **Search resources** bar, type **Virtual WAN** in the search box and select **Enter**.

1. Select **Virtual WANs** from the results. On the Virtual WANs page, select **+ Create** to open the **Create WAN** page.

1. On the **Create WAN** page, on the **Basics** tab, fill in the fields. Modify the example values to apply to your environment.

   Screenshot shows the Create WAN pane with the Basics tab selected.

   * **Subscription**: Select the subscription that you want to use.
   * **Resource group**: Create new or use existing.
   * **Resource group location**: Choose a resource location from the dropdown. A WAN is a global resource and doesn't live in a particular region. However, you must select a region in order to manage and locate the WAN resource that you create.
   * **Name**: Type the Name that you want to call your virtual WAN.
   * **Type**: Basic or Standard. Select **Standard**. If you select Basic, understand that Basic virtual WANs can only contain Basic hubs. Basic hubs can only be used for site-to-site connections.

1. After you finish filling out the fields, at the bottom of the page, select **Review +Create**.

1. Once validation passes, click **Create** to create the virtual WAN.


## Create a virtual hub

A virtual hub is a virtual network that is created and used by Azure Virtual WAN. It's the core of your Virtual WAN network in a region. It can contain gateways for site-to-site and ExpressRoute. 

>**Tip:**
>You can also [create a gateway in an existing hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-wan/virtual-wan-expressroute-portal.md#existinghub).


1. Go to the virtual WAN that you created. On the virtual WAN page left pane, under the **Connectivity**, select **Hubs**.

1. On the **Hubs** page, select **+New Hub** to open the **Create virtual hub** page.

   Screenshot shows the Create virtual hub pane with the Basics tab selected.

1. On the **Create virtual hub** page **Basics** tab, complete the following fields:

   * **Region**: Select the region in which you want to deploy the virtual hub.
   * **Name**: The name by which you want the virtual hub to be known.
   * **Hub private address space**: The hub's address range in CIDR notation. The minimum address space is /24 to create a hub.
   * **Virtual hub capacity**: Select from the dropdown. For more information, see [Virtual hub settings](https://learn.microsoft.com/azure/virtual-wan/hub-settings).
   * **Hub routing preference**: Leave the setting as the default, **ExpressRoute** unless you have a specific need to change this field. For more information, see [Virtual hub routing preference](https://learn.microsoft.com/azure/virtual-wan/about-virtual-hub-routing-preference).


## Create a VPN gateway 


1. On the **Create virtual hub** page, click **Site to site** to open the **Site to site** tab.

   Screenshot shows the Create virtual hub pane with Site to site selected.

1. On the **Site to site** tab, complete the following fields:

   * Select **Yes** to create a Site-to-site VPN.
   * **AS Number**: The AS Number field can't be edited.
   * **Gateway scale units**: Select the **Gateway scale units** value from the dropdown. The scale unit lets you pick the aggregate throughput of the VPN gateway being created in the virtual hub to connect sites to.

     If you pick 1 scale unit = 500 Mbps, it implies that two instances for redundancy will be created, each having a maximum throughput of 500 Mbps. For example, if you had five branches, each doing 10 Mbps at the branch, you'll need an aggregate of 50 Mbps at the head end. Planning for aggregate capacity of the Azure VPN gateway should be done after assessing the capacity needed to support the number of branches to the hub.
   * **Routing preference**: Azure routing preference lets you choose how your traffic routes between Azure and the internet. You can choose to route traffic either via the Microsoft network, or via the ISP network (public internet). These options are also referred to as cold potato routing and hot potato routing, respectively. 

     The public IP address in Virtual WAN is assigned by the service, based on the routing option selected. For more information about routing preference via Microsoft network or ISP, see the [Routing preference](https://learn.microsoft.com/azure/virtual-network/ip-services/routing-preference-overview) article.
1. Select **Review + Create** to validate.
1. Select **Create** to create the hub and gateway. This can take up to 30 minutes. After 30 minutes, **Refresh** to view the hub on the **Hubs** page. Select **Go to resource** to navigate to the resource.

## Create a site-to-site VPN

1. In the Azure portal, select the virtual WAN you created earlier.

2. In the **Overview** of the virtual hub, select **Connectivity** > **VPN (Site-to-site)** > **Create new VPN site**.

   Screenshot of the Overview page for the virtual hub, with VPN (site-to-site) and Create new VPN site selected.
 
3. On the **Basics** tab, enter the required fields. 

   Screenshot showing the Create VPN site page with the Basics tab open.

   * **Region** - Previously referred to as location. It's the location you want to create this site resource in.
   
   * **Name** - The name by which you want to refer to your on-premises site.
   
   * **Device vendor** - The name of the VPN device vendor, for example, Citrix, Cisco, or Barracuda. It helps the Azure Team better understand your environment to add more optimization possibilities in the future or help you troubleshoot.

   * **Private address space** - The CIDR IP address space located on your on-premises site. Traffic destined for this address space is routed to your local site. The CIDR block is only required if you [BGP](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/configure-bgp.md) isn't enabled for the site.
    
   >**Note:**
   >If you edit the address space (add more address spaces) after creating the site, it can take 8-10 minutes to update the effective routes while the components are recreated.

1. Select **Links** to add information about the physical links at the branch. If you have a Virtual WAN partner CPE device, check with them to see if this information gets exchanged with Azure as a part of the branch information upload set up from their systems.

   Specifying link and provider names allow you to distinguish between any number of gateways that can eventually be created as part of the hub.  [BGP](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-bgp-overview.md) and autonomous system number (ASN) must be unique inside your organization. BGP ensures that both Azure VMware Solution and the on-premises servers advertise their routes across the tunnel. If disabled, the subnets that need to be advertised must be manually maintained. If subnets are missed, HCX fails to form the service mesh. 
 
   >**Important:**
   >By default, Azure assigns a private IP address from the GatewaySubnet prefix range automatically as the Azure BGP IP address on the Azure VPN gateway. The custom Azure APIPA BGP address is needed when  on-premises VPN devices use an APIPA address (169.254.0.1 to 169.254.255.254) as the BGP IP. Azure VPN Gateway chooses the custom APIPA address if the corresponding local network gateway resource (on-premises network) has an APIPA address as the BGP peer IP. If the local network gateway uses a regular IP address (not APIPA), Azure VPN Gateway reverts to the private IP address from the GatewaySubnet range.

   Screenshot showing the Create VPN site page with the Links tab open.

1. Select **Review + create**. 

1. Navigate to the virtual hub you want, and deselect **Hub association** to connect your VPN site to the hub.
 
   Screenshot shows Connect to this hub.

## (Optional) Create policy-based VPN site-to-site tunnels

>**Important:**
>This optional step only applies to policy-based VPNs. 

[Policy-based VPN setups](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-wan/virtual-wan-custom-ipsec-portal.md) require on-premises and Azure VMware Solution networks to be specified, including the hub ranges. These ranges specify the encryption domain of the policy-based VPN tunnel on-premises endpoint. The Azure VMware Solution side only requires the policy-based traffic selector indicator to be enabled.

1. In the Azure portal, go to your Virtual WAN hub site and, under **Connectivity**, select **VPN (Site to site)**.

2. Select the VPN Site for which you want to set up a custom IPsec policy.

3. Select your VPN site name, select **More (...)** at the far right, and then select **Edit VPN Connection**.

   Screenshot showing the context menu for an existing VPN site.

   - Internet Protocol Security (IPsec), select **Custom**.

   - Use policy-based traffic selector, select **Enable**

   - Specify the details for **IKE Phase 1** and **IKE Phase 2(ipsec)**. 

4. Change the IPsec setting from default to custom and customize the IPsec policy. Then select **Save**.

   Screenshot showing the existing VPN sites.

   Your traffic selectors or subnets that are part of the policy-based encryption domain should be:
    
   - Virtual WAN hub `/24`

   - Azure VMware Solution private cloud `/22`

   - Connected Azure virtual network (if present)

## Connect your VPN site to the hub

1. Select your VPN site name and then select **Connect VPN sites**. 

1. In the **Pre-shared key** field, enter the key previously defined for the on-premises endpoint. 

   >**Tip:**
   >If you don't have a previously defined key, you can leave this field blank. A key is generated for you automatically. 

   Screenshot that shows the Connected Sites pane for Virtual HUB ready for a Preshared key and associated settings.&#x20;

1. If you're deploying a firewall in the hub and it's the next hop, set the **Propagate Default Route** option to **Enable**. 

   When enabled, the Virtual WAN hub propagates to a connection if either: the hub already learned the default route when deploying a firewall in the hub or if another connected site forced tunneling enabled. The default route doesn't originate in the Virtual WAN hub.  

1. Select **Connect**. After a few minutes, the site shows the connection and connectivity status.

   Screenshot that shows a site-to-site connection and connectivity status.

   **Connection Status:** Status of the Azure resource for the connection that connects the VPN site to the Azure hub’s VPN gateway. Once this control plane operation is successful, the Azure VPN gateway and the on-premises VPN device establish connectivity.

   **Connectivity Status:** Actual connectivity (data path) status between Azure’s VPN gateway in the hub and VPN site. It can show any of the following states:

    * **Unknown**: Typically seen if the backend systems are working to transition to another status.
    * **Connecting**: Azure VPN gateway is trying to reach out to the actual on-premises VPN site.
    * **Connected**: Connectivity established between Azure VPN gateway and on-premises VPN site.
    * **Disconnected**: Typically seen if disconnected for any reason (on-premises or in Azure)

1. Download the VPN configuration file and apply it to the on-premises endpoint.  
   
   1. On the VPN (Site to site) page, near the top, select **Download VPN Config**.  Azure creates a storage account in the resource group 'microsoft-network-\[location\]', where location is the location of the WAN. After you apply the configuration to your VPN devices, you can delete this storage account.

   1. Once created, select the link to download it. 

   1. Apply the configuration to your on-premises VPN device.

   For more information about the configuration file, see [About the VPN device configuration file](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-wan/virtual-wan-site-to-site-portal.md#config-file).


1. Patch the Azure VMware Solution ExpressRoute in the Virtual WAN hub. 


   >**Important:**
   >You must first have a private cloud created before you can patch the platform. 

   >**Important:**
   >You must also have an ExpressRoute Gateway configured as part of your Virtual WAN Hub. 


   
<!-- used in tutorial-expressroute-global-reach-private-cloud.md and create-ipsec-tunnel.md -->

1. In the Azure portal, go to the Azure VMware Solution private cloud.

1. Under **Manage**, select **Connectivity**.

1. Select the **ExpressRoute** tab, and then select **+ Request an authorization key**.

   Screenshot that shows selections for requesting an ExpressRoute authorization key.

1. Provide a name for the authorization key, and then select **Create**.

   It can take about 30 seconds to create the key. After the key is created, it appears in the list of authorization keys for the private cloud.

   Screenshot that shows the ExpressRoute Global Reach authorization key.

1. Copy the authorization key and the ExpressRoute ID. You need them to complete the peering. The authorization key disappears after some time, so copy it as soon as it appears.



1. Link Azure VMware Solution and the VPN gateway together in the Virtual WAN hub. You use the authorization key and ExpressRoute ID (peer circuit URI) from the previous step.

   1. Select your ExpressRoute gateway and then select **Redeem authorization key**.

      Screenshot of the ExpressRoute page for the private cloud, with Redeem authorization key selected.

   1. Paste the authorization key in the **Authorization Key** field.

   1. Paste the ExpressRoute ID into the **Peer circuit URI** field. 

   1. Select **Automatically associate this ExpressRoute circuit with the hub** check box. 

   1. Select **Add** to establish the link. 

1. Test your connection by [creating an NSX-T Data Center segment](tutorial-nsx-t-network-segment.md) and provisioning a VM on the network. Ping both the on-premises and Azure VMware Solution endpoints.

   >**Note:**
   >Wait approximately 5 minutes before you test connectivity from a client behind your ExpressRoute circuit, for example, a VM in the VNet that you created earlier.
