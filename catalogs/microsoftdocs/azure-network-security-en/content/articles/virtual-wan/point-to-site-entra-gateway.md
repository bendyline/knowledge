---
title: Configure P2S User VPN for Microsoft Entra ID authentication - Microsoft-registered client
titleSuffix: Azure Virtual WAN
description: Learn how to configure Virtual WAN P2S User VPN server settings for Microsoft Entra ID authentication using Microsoft-registered Azure VPN Client.
services: virtual-wan
author: duongau
ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 05/26/2026
ms.author: duau

#Audience ID values are not sensitive data.

---
# Configure a point-to-site User VPN connection - Microsoft Entra ID authentication

This article helps you configure point-to-site User VPN connection to Virtual WAN that uses Microsoft Entra ID authentication and the new **Microsoft-registered Azure VPN Client App ID**.


Virtual WAN now supports a Microsoft-registered App ID and corresponding Audience values for the latest versions of the Azure VPN Client. When you configure a P2S VPN gateway using the new Audience values, you skip the previously required Azure VPN Client app manual registration process for your Microsoft Entra tenant. The App ID is already created and your tenant is automatically able to use it with no extra registration steps. This process is more secure than manually registering the Azure VPN Client because you don't need to authorize the app or assign permissions via the Cloud App Administrator role. To better understand the difference between the types of application objects, see [How and why applications are added to Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/how-applications-are-added).

* If you configure your P2S User VPN gateway by using the audience values for the manually configured Azure VPN Client app, you can easily [change](point-to-site-entra-gateway-update.md) the gateway and client settings to take advantage of the new Microsoft-registered app ID.

* For this configuration, you can use a custom audience value. For more information, see [Create a custom audience app ID for P2S VPN](point-to-site-entra-register-custom-app.md).

**Considerations**


> **Important:**
> The Azure VPN Client for Linux (Preview) retired on 31 August, 2026. After this date, the client is no longer supported. For more information, see the **Azure VPN Client for Linux Retirement overview and migration guide** for [VPN Gateway](../vpn-gateway/azure-vpn-client-linux-retirement.md) and [Virtual WAN](azure-vpn-client-linux-retirement.md).


* A P2S User VPN gateway can only support one Audience value. It can't support multiple Audience values simultaneously.

* The latest versions of the Azure VPN Clients for macOS and Windows are backward compatible with P2S gateways configured to use the older Audience values that align with the manually registered app. These clients also support Custom Audience values.

**Azure VPN Client Audience values**

The following table shows the versions of the Azure VPN Client that are supported for each App ID and the corresponding available Audience values.


| App ID | Supported Audience values | Supported clients |
| --- | --- | --- |
| Microsoft-registered | The audience value `c632b3df-fb67-4d84-bdcf-b95ad541b5c8` applies to:<br>- Azure Public<br>- Azure Government<br>- Azure Germany<br>- Microsoft Azure operated by 21Vianet | - Windows<br>- macOS |
| Manually registered | - Azure Public: `41b23e61-6c1e-4545-b367-cd054e0ed4b4`<br>- Azure Government: `51bb15d4-3a4f-4ebf-9dca-40096fe32426`<br>- Azure Germany: `538ee9e6-310a-468d-afef-ea97365856a9`<br>- Microsoft Azure operated by 21Vianet: `49f817b6-84ae-4cc0-928c-73f27289b3aa` | - Windows<br> - macOS |
| Custom | `<custom-app-id>` | - Windows<br> - macOS |



> **Note:**
> Microsoft Entra ID authentication is supported only for OpenVPN® protocol connections and requires the Azure VPN Client.
>


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

Verify that you've met the following criteria before beginning your configuration:

* You have a virtual network that you want to connect to. Verify that none of the subnets of your on-premises networks overlap with the virtual networks that you want to connect to. To create a virtual network in the Azure portal, see the [Quickstart](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-portal.md).

* Your virtual network doesn't have any virtual network gateways. If your virtual network has a gateway (either VPN or ExpressRoute), you must remove all gateways. The steps for this configuration help you connect your virtual network to the Virtual WAN virtual hub gateway.

* Obtain an IP address range for your hub region. The hub is a virtual network that is created and used by Virtual WAN. The address range that you specify for the hub can't overlap with any of your existing virtual networks that you connect to. It also can't overlap with your address ranges that you connect to on premises. If you're unfamiliar with the IP address ranges located in your on-premises network configuration, coordinate with someone who can provide those details for you.

* You need a Microsoft Entra ID tenant for this configuration. If you don't have one, you can create one by following the instructions in [Create a new tenant](https://learn.microsoft.com/entra/fundamentals/create-new-tenant).

* If you want to use a custom audience value, see [Create or modify custom audience app ID](point-to-site-entra-register-custom-app.md).

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

> **Important:**
> 
The Azure portal is in the process of updating Azure Active Directory fields to Entra. If you see Microsoft Entra ID referenced and you don't see those values in the portal yet, you can select Azure Active Directory values.


1. Go to your Virtual WAN. In the left pane, expand **Connectivity** and select the **User VPN configurations** page. On the **User VPN configurations** page, click **+Create user VPN config**.
1. On the **Basics** page, specify the following parameters.

    * **Configuration name** - Enter the name you want to call your User VPN Configuration. For example, **TestConfig1**.
    * **Tunnel type** - Select OpenVPN from the dropdown menu.
1. At the top of the page, click **Azure Active Directory**. You can view the necessary values on the Microsoft Entra ID page for Enterprise applications in the portal.

    Screenshot of the Microsoft Entra ID page.

   * **Azure Active Directory** - Select **Yes**.
   * **Audience** - Enter the corresponding value for the Microsoft-registered Azure VPN Client App ID: `c632b3df-fb67-4d84-bdcf-b95ad541b5c8`. [Custom audience](point-to-site-entra-register-custom-app.md) is also supported for this field.
   * **Issuer** - Enter `https://sts.windows.net/<your Directory ID>/`.
   * **AAD Tenant** - Enter the TenantID for the Microsoft Entra tenant. Make sure there isn't an `/` at the end of the Microsoft Entra tenant URL.

1. Click **Create** to create the User VPN configuration. You'll select this configuration later in the exercise.

## <a name="site"></a>Create an empty hub

Next, create the virtual hub. The steps in this section create an empty virtual hub to which you can later add the P2S gateway. However, it's always much more efficient to combine creating the hub along with the gateway because each time you make a configuration change to the hub, you have to wait for the hub settings to build.

For demonstration purposes, we'll create an empty hub first, then add the P2S gateway in the next section. But, you can choose to incorporate the P2S gateway settings from the next section at the same time you configure the hub.


1. Go to the virtual WAN that you created. On the virtual WAN page left pane, under the **Connectivity**, select **Hubs**.

1. On the **Hubs** page, select **+New Hub** to open the **Create virtual hub** page.

   Screenshot shows the Create virtual hub pane with the Basics tab selected.

1. On the **Create virtual hub** page **Basics** tab, complete the following fields:

   * **Region**: Select the region in which you want to deploy the virtual hub.
   * **Name**: The name by which you want the virtual hub to be known.
   * **Hub private address space**: The hub's address range in CIDR notation. The minimum address space is /24 to create a hub.
   * **Virtual hub capacity**: Select from the dropdown. For more information, see [Virtual hub settings](https://learn.microsoft.com/azure/virtual-wan/hub-settings).
   * **Hub routing preference**: Leave the setting as the default, **ExpressRoute** unless you have a specific need to change this field. For more information, see [Virtual hub routing preference](https://learn.microsoft.com/azure/virtual-wan/about-virtual-hub-routing-preference).


After configuring the settings, click **Review + create** to validate, then **Create** the hub. It can take up to 30 minutes to create a hub.

## <a name="hub"></a>Add a P2S gateway to a hub

This section shows you how to add a gateway to an already existing virtual hub. It can take up to 30 minutes to update a hub.

1. Go to your Virtual WAN. In the left pane, expand **Settings** and select **Hubs**.
1. Click the name of the hub that you want to edit.
1. Click **Edit virtual hub** at the top of the page to open the **Edit virtual hub** page.
1. On the **Edit virtual hub** page, check the checkboxes for **Include vpn gateway for vpn sites** and **Include point-to-site gateway** to reveal the settings. Then configure the values.

   Screenshot shows the Edit virtual hub.

   * **Gateway scale units**: Select the Gateway scale units. Scale units represent the aggregate capacity of the User VPN gateway. If you select 40 or more gateway scale units, plan your client address pool accordingly. For information about how this setting impacts the client address pool, see [About client address pools](about-client-address-pools.md). For information about gateway scale units, see the [FAQ](virtual-wan-faq.md#p2s-concurrent).
   * **User VPN configuration**: Select the configuration that you created earlier.
   * **User Groups to Address Pools Mapping**: Specify address pools. For information about this setting, see [Configure user groups and IP address pools for P2S User VPNs](user-groups-create.md).

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


##  <a name="configure-client"></a>Configure the Azure VPN Client

Next, you examine the profile configuration package, configure the Azure VPN Client for the client computers, and connect to Azure. See the articles listed in the Next steps section.

## Next steps

Configure the Azure VPN Client. You can use the steps in the VPN Gateway client documentation to configure the Azure VPN Client for Virtual WAN. See [Configure a VPN client for P2S Microsoft Entra ID authentication connections](../vpn-gateway/point-to-site-entra-vpn-client.md).
