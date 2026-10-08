---
title: 'Configure a P2S User VPN - Microsoft Entra ID authentication - manually registered Azure VPN Client App ID'
titleSuffix: Azure Virtual WAN
description: Learn how to configure Microsoft Entra ID authentication for Virtual WAN User VPN (point-to-site) using a manually registered Azure VPN Client App ID.
services: virtual-wan
author: duongau
ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 05/26/2026
ms.author: duau
ms.custom: sfi-image-nochange

#Audience ID values are not sensitive data.

---
# Configure P2S User VPN gateway for Microsoft Entra ID authentication – manually registered app

This article shows you how to use Virtual WAN to connect to your resources in Azure. In this article, you create a point-to-site User VPN connection to Virtual WAN that uses Microsoft Entra ID authentication. Microsoft Entra ID authentication is only available for gateways that use the OpenVPN protocol. While the steps and Audience values in this article do result in a working configuration, we recommend that you use the [Configure P2S VPN Gateway for Microsoft Entra ID authentication](point-to-site-entra-gateway.md) article instead.

> **Important:**
>Manually registered Azure VPN Clients used for Point-to-Site (P2S) connections with Microsoft Entra ID authentication will retire on March 31, 2028 in Azure Public Cloud, and on March 31, 2029 in Azure Government and Microsoft Azure operated by 21Vianet clouds. \
>After these dates, manually registered clients will no longer function, and only Microsoft-registered VPN clients will be supported after the retirement dates.
> 
>To avoid any service disruption, [migrate manually registered VPN clients](point-to-site-entra-gateway-update.md) to a Microsoft-registered VPN client for point-to-site connections with Microsoft Entra ID authentication before the applicable retirement dates.

In this article, you learn how to:

* Create a virtual WAN
* Create a User VPN configuration
* Download a virtual WAN User VPN profile
* Create a virtual hub
* Edit a hub to add P2S gateway
* Connect a virtual network to a virtual hub
* Download and apply the User VPN client configuration
* View your virtual WAN

Screenshot of Virtual WAN diagram.

## Before you begin


> **Important:**
> The Azure VPN Client for Linux (Preview) retired on 31 August, 2026. After this date, the client is no longer supported. For more information, see the **Azure VPN Client for Linux Retirement overview and migration guide** for [VPN Gateway](../vpn-gateway/azure-vpn-client-linux-retirement.md) and [Virtual WAN](azure-vpn-client-linux-retirement.md).


Verify that you've met the following criteria before beginning your configuration:

* You have a virtual network that you want to connect to. Verify that none of the subnets of your on-premises networks overlap with the virtual networks that you want to connect to. To create a virtual network in the Azure portal, see the [Quickstart](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-portal.md).

* Your virtual network doesn't have any virtual network gateways. If your virtual network has a gateway (either VPN or ExpressRoute), you must remove all gateways. This configuration requires that virtual networks are connected instead, to the Virtual WAN hub gateway.

* Obtain an IP address range for your hub region. The hub is a virtual network that is created and used by Virtual WAN. The address range that you specify for the hub can't overlap with any of your existing virtual networks that you connect to. It also can't overlap with your address ranges that you connect to on premises. If you're unfamiliar with the IP address ranges located in your on-premises network configuration, coordinate with someone who can provide those details for you.

* If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## <a name="wan"></a>Create a virtual WAN

From a browser, navigate to the [Azure portal](https://portal.azure.com) and sign in with your Azure account.


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


## <a name="user-config"></a>Create a User VPN configuration

A User VPN configuration defines the parameters for connecting remote clients. It's important to create the User VPN configuration before configuring your virtual hub with P2S settings, as you must specify the User VPN configuration you want to use.

1. Navigate to your **Virtual WAN ->User VPN configurations** page and click **+Create user VPN config**.

1. On the **Basics** page, specify the parameters.

   Screenshot of the Basics page.

    * **Configuration name** - Enter the name you want to call your User VPN Configuration.
    * **Tunnel type** - Select OpenVPN from the dropdown menu.

1. Click **Microsoft Entra ID** to open the page. This page might also still be labeled **Azure Active Directory**.

   Screenshot of the Microsoft Entra ID page.

    Toggle **Microsoft Entra ID** to **Yes** and supply the following values based on your tenant details. You can view the necessary values on the Microsoft Entra ID page for Enterprise applications in the portal.
   * **Authentication method** - Select Microsoft Entra ID.
   * **Audience** - Type the Application ID of the Azure VPN Client Enterprise Application registered in your Microsoft Entra tenant. For values, see: [Azure VPN Client Audience values](openvpn-azure-ad-tenant.md)
   * **Issuer** - `https://sts.windows.net/<your Directory ID>/`
   * **Microsoft Entra tenant:** TenantID for the Microsoft Entra tenant. Make sure there isn't a `/` at the end of the Microsoft Entra tenant URL.

     * Enter `https://login.microsoftonline.com/<your Directory Tenant ID>` for Azure Public AD
     * Enter `https://login.microsoftonline.us/<your Directory Tenant ID>` for Azure Government AD
     * Enter `https://login-us.microsoftonline.de/<your Directory Tenant ID>` for Azure Germany AD
     * Enter `https://login.chinacloudapi.cn/<your Directory Tenant ID>` for China 21Vianet AD

1. Click **Create** to create the User VPN configuration. You'll select this configuration later in the exercise.

## <a name="site"></a>Create an empty hub

For this exercise, we create an empty virtual hub in this step and, in the next section, you add a P2S gateway to this hub. However, you can combine these steps and create the hub with the P2S gateway settings all at once. The result is the same either way. After configuring the settings, click **Review + create** to validate, then **Create**.


1. Go to the virtual WAN that you created. On the virtual WAN page left pane, under the **Connectivity**, select **Hubs**.

1. On the **Hubs** page, select **+New Hub** to open the **Create virtual hub** page.

   Screenshot shows the Create virtual hub pane with the Basics tab selected.

1. On the **Create virtual hub** page **Basics** tab, complete the following fields:

   * **Region**: Select the region in which you want to deploy the virtual hub.
   * **Name**: The name by which you want the virtual hub to be known.
   * **Hub private address space**: The hub's address range in CIDR notation. The minimum address space is /24 to create a hub.
   * **Virtual hub capacity**: Select from the dropdown. For more information, see [Virtual hub settings](https://learn.microsoft.com/azure/virtual-wan/hub-settings).
   * **Hub routing preference**: Leave the setting as the default, **ExpressRoute** unless you have a specific need to change this field. For more information, see [Virtual hub routing preference](https://learn.microsoft.com/azure/virtual-wan/about-virtual-hub-routing-preference).


## <a name="hub"></a>Add a P2S gateway to a hub

This section shows you how to add a gateway to an already existing virtual hub. This step can take up to 30 minutes for the hub to complete updating.

1. Navigate to the **Hubs** page under the virtual WAN.
1. Click the name of the hub that you want to edit to open the page for the hub.
1. Click **Edit virtual hub** at the top of the page to open the **Edit virtual hub** page.
1. On the **Edit virtual hub** page, check the checkboxes for **Include vpn gateway for vpn sites** and **Include point-to-site gateway** to reveal the settings. Then configure the values.

   Screenshot shows the Edit virtual hub.

   * **Gateway scale units**: Select the Gateway scale units. Scale units represent the aggregate capacity of the User VPN gateway. If you select 40 or more gateway scale units, plan your client address pool accordingly. For information about how this setting impacts the client address pool, see [About client address pools](about-client-address-pools.md). For information about gateway scale units, see the [FAQ](virtual-wan-faq.md#p2s-concurrent).
   * **User VPN configuration**: Select the configuration that you created earlier.
   * **User Groups to Address Pools Mapping**: For information about this setting, see [Configure user groups and IP address pools for P2S User VPNs (preview)](user-groups-create.md).

1. After configuring the settings, click **Confirm** to update the hub. It can take up to 30 minutes to update a hub.

## <a name="connect-vnet"></a>Connect virtual network to hub

In this section, you create a connection between your virtual hub and your virtual network.


1. In the Azure portal, go to your **Virtual WAN** In the left pane, select **Virtual network connections**.
1. On the **Virtual network connections** page, select **+ Add connection**.
1. On the **Add connection** page, configure the connection settings. For information about routing settings, see [About routing](about-virtual-hub-routing.md).

   * **Connection name**: Name your connection.
   * **Hubs**: Select the hub you want to associate with this connection.
   * **Subscription**: Verify the subscription.
   * **Resource group**: Select the resource group that contains the virtual network to which you want to connect.
   * **Virtual network**: Select the virtual network you want to connect to this hub. The virtual network you select can't have an already existing virtual network gateway.
   * **Propagate to none**: This is set to **No** by default. Changing the switch to **Yes** makes the configuration options for **Propagate to Route Tables** and **Propagate to labels** unavailable for configuration.
   * **Associate Route Table**: From the dropdown, you can select a route table that you want to associate.
   * **Propagate to labels**: Labels are a logical group of route tables. For this setting, select from the dropdown.
   * **Static routes**: Configure static routes, if necessary. Configure static routes for Network Virtual Appliances (if applicable). Virtual WAN supports a single next hop IP for static route in a virtual network connection. For example, if you have a separate virtual appliance for ingress and egress traffic flows, it would be best to have the virtual appliances in separate VNets and attach the VNets to the virtual hub.
   * **Bypass Next Hop IP for workloads within this VNet**: This setting lets you deploy NVAs and other workloads into the same VNet without forcing all the traffic through the NVA. You can only configure this setting when you're configuring a new connection. If you want to use this setting for a connection you already created, delete the connection, then add a new connection. To learn more about routing behavior related to this setting, see [bypass next hop IP documentation](howto-connect-vnet-hub.md#bypassexplained).

      The bypass next hop IP setting **does not apply** to routes learnt via BGP peering from a NVA deployed in a Virtual Network directly connected to the Virtual Hub. This is because the virtual hub automatically learns about system routes associated with addresses in the spoke virtual network when the spoke virtual network connection is created. These automatically learned system routes are preferred over routes learned by the hub through BGP. The system routes can only be overridden by static routes.
   
   * **Propagate static route**: This setting lets you propagate static routes defined in the **Static routes** section to route tables specified in **Propagate to Route Tables**. Additionally, routes will be propagated to route tables that have labels specified as **Propagate to labels**. These routes can be propagated inter-hub, except for the default route 0/0.
   
1. Once you've completed the settings you want to configure, select **Create** to create the connection.


## <a name="download-profile"></a>Download User VPN profile

All of the necessary configuration settings for the VPN clients are contained in a VPN client configuration zip file. The settings in the zip file help you easily configure the VPN clients. The VPN client configuration files that you generate are specific to the User VPN configuration for your gateway. You can download global (WAN-level) profiles, or a profile for a specific hub. For information and additional instructions, see [Download global and hub profiles](global-hub-profile.md). The following steps walk you through downloading a global WAN-level profile.


1. To generate a [WAN-level global profile](global-hub-profile.md) VPN client configuration package, go to the **virtual WAN** (not the virtual hub).

1. In the left pane, select **User VPN configurations**.

1. Select the configuration for which you want to download the profile. If you have multiple hubs assigned to the same profile, expand the profile to show the hubs, then select one of the hubs that uses the profile.

1. Select **Download virtual WAN user VPN profile**.

1. On the download page, select **EAPTLS**, then **Generate and download profile**. A profile package (zip file) containing the client configuration settings is generated and downloads to your computer. The contents of the package depend on the authentication and tunnel choices for your configuration.


##  <a name="configure-client"></a>Configure User VPN clients

Each computer that connects must have a client installed. You configure each client by using the VPN User client profile files that you downloaded in the previous steps. Use the article that pertains to the operating system that you want to connect.


| Authentication method | Tunnel type | Client OS | VPN client |
| --- | --- | --- | --- |
| Certificate |  |  |  |
|  | IKEv2, SSTP, OpenVPN | Windows, macOS, Linux, iOS | [VPN client configuration - certificate authentication](../vpn-gateway/point-to-site-vpn-client-certificate.md) |
| Microsoft Entra ID |  |  |  |
|  | OpenVPN | Windows, macOS | [VPN client configuration - Microsoft Entra ID authentication](../vpn-gateway/point-to-site-entra-vpn-client.md) |


## <a name="viewwan"></a>View your virtual WAN

1. Navigate to the virtual WAN.
2. On the Overview page, each point on the map represents a hub.
3. In the Hubs and connections section, you can view hub status, site, region, VPN connection status, and bytes in and out.

## <a name="cleanup"></a>Clean up resources

When you no longer need the resources that you created, delete them. Some of the Virtual WAN resources must be deleted in a certain order due to dependencies. Deleting can take about 30 minutes to complete.


1. Open the virtual WAN that you created.

1. Select a virtual hub associated to the virtual WAN to open the hub page.

1. Delete all gateway entities following the below order for each gateway type. This can take 30 minutes to complete.

   **VPN:**  
   * Disconnect VPN sites  
   * Delete VPN connections  
   * Delete VPN gateways  

   **ExpressRoute:**  
   * Delete ExpressRoute connections  
   * Delete ExpressRoute gateways

1. Repeat for all hubs associated to the virtual WAN.

1. You can either delete the hubs at this point, or delete the hubs later when you delete the resource group.

1. Navigate to the resource group in the Azure portal.

1. Select **Delete resource group**. This deletes the other resources in the resource group, including the hubs and the virtual WAN.

## Next steps

For Virtual WAN frequently asked questions, see the [Virtual WAN FAQ](virtual-wan-faq.md).
