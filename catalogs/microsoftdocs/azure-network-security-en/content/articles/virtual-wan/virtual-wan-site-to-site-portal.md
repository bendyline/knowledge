---
title: 'Tutorial: Create site-to-site connections using Virtual WAN'
titleSuffix: Azure Virtual WAN
description: Learn how to use Azure Virtual WAN to create a site-to-site VPN connection to Azure.
author: duongau
ms.service: azure-virtual-wan
ms.topic: tutorial
ms.date: 03/10/2025
ms.author: duau
ms.custom: sfi-image-nochange
# Customer intent: As someone with a networking background, I want to connect my local site to my VNets using Virtual WAN and I don't want to go through a Virtual WAN partner.
---
# Tutorial: Create a site-to-site connection using Azure Virtual WAN

This tutorial shows you how to use Virtual WAN to connect to your resources in Azure over an IPsec/IKE (IKEv1 and IKEv2) VPN connection. This type of connection requires a VPN device located on-premises that has an externally facing public IP address assigned to it. For more information about Virtual WAN, see the [Virtual WAN Overview](virtual-wan-about.md).

Screenshot shows a networking diagram for Virtual WAN.

In this tutorial you learn how to:

> 
> * Create a virtual WAN
> * Configure virtual hub Basic settings
> * Configure site-to-site VPN gateway settings
> * Create a site
> * Connect a site to a virtual hub
> * Connect a VPN site to a virtual hub
> * Connect a VNet to a virtual hub
> * Download a configuration file
> * View or edit your VPN gateway

> **Note:**
> If you have many sites, you typically would use a [Virtual WAN partner](https://aka.ms/virtualwan) to create this configuration. However, you can create this configuration yourself if you're comfortable with networking and proficient at configuring your own VPN device.
>

## Prerequisites

Verify that you've met the following criteria before beginning your configuration:


* You have an Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* You have a virtual network to which you want to connect.

  * Verify that none of the subnets of your on-premises networks overlap with the virtual networks that you want to connect to.
  * To create a virtual network in the Azure portal, see the [Quickstart](../virtual-network/quickstart-create-virtual-network.md) article.

    
In this exercise, we used the following example values to create the virtual network. You can modify these values when you create your own virtual network.

| Parameter | Value |
| --- | --- |
| Resource Group | TestRG |
| Name | VNet1 |
| Location/Region | East US |
| IPv4 address space | 10.11.0.0/16 |

* Your virtual network must not have any existing virtual network gateways.

  * If your virtual network already has gateways (VPN or ExpressRoute), you must remove all of the gateways before proceeding.
  * This configuration requires that virtual networks connect to the Virtual WAN hub gateway only.

* Decide the IP address range that you want to use for your virtual hub private address space. This information is used when configuring your virtual hub. A virtual hub is a virtual network that is created and used by Virtual WAN. It's the core of your Virtual WAN network in a region. The address space range must conform the certain rules:

  * The address range that you specify for the hub can't overlap with any of the existing virtual networks that you connect to.
  * The address range can't overlap with the on-premises address ranges that you connect to.
  * If you're unfamiliar with the IP address ranges located in your on-premises network configuration, coordinate with someone who can provide those details for you.


## <a name="openvwan"></a>Create a virtual WAN


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


## <a name="hub"></a>Configure virtual hub settings

A virtual hub is a virtual network that can contain gateways for site-to-site, ExpressRoute, or point-to-site functionality. For this tutorial, you begin by filling out the **Basics** tab for the virtual hub and then continue on to fill out the site-to-site tab in the next section. It's also possible to create an empty virtual hub (a virtual hub that doesn't contain any gateways) and then add gateways (S2S, P2S, ExpressRoute, etc.) later. Once a virtual hub is created, you're charged for the virtual hub, even if you don't attach any sites or create any gateways within the virtual hub.


1. Go to the virtual WAN that you created. On the virtual WAN page left pane, under the **Connectivity**, select **Hubs**.

1. On the **Hubs** page, select **+New Hub** to open the **Create virtual hub** page.

   Screenshot shows the Create virtual hub pane with the Basics tab selected.

1. On the **Create virtual hub** page **Basics** tab, complete the following fields:

   * **Region**: Select the region in which you want to deploy the virtual hub.
   * **Name**: The name by which you want the virtual hub to be known.
   * **Hub private address space**: The hub's address range in CIDR notation. The minimum address space is /24 to create a hub.
   * **Virtual hub capacity**: Select from the dropdown. For more information, see [Virtual hub settings](https://learn.microsoft.com/azure/virtual-wan/hub-settings).
   * **Hub routing preference**: Leave the setting as the default, **ExpressRoute** unless you have a specific need to change this field. For more information, see [Virtual hub routing preference](https://learn.microsoft.com/azure/virtual-wan/about-virtual-hub-routing-preference).


**Don't create the virtual hub yet**. Continue on to the next section to configure more settings.

## <a name="gateway"></a>Configure a site-to-site gateway

In this section, you configure site-to-site connectivity settings, and then create the virtual hub and site-to-site VPN gateway. A virtual hub and gateway can take about 30 minutes to create.


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

When you create a new hub, you may notice a Warning message in the portal referring to the router version. This sometimes occurs when the router is provisioning. Once the router is fully provisioned, the message will no longer appear.


## <a name="site"></a>Create a site

In this section, you create a site. Sites correspond to your physical locations. Create as many sites as you need. These sites contain your on-premises VPN device endpoints.

For example, if you have a branch office in NY, a branch office in London, and a branch office in LA, you'd create three separate sites. You can create up to 1,000 sites per virtual hub in a virtual WAN. If you have multiple virtual hubs, you can create 1000 per each virtual hub.

If you have a Virtual WAN partner CPE device, check with them to learn about their automation to Azure. Typically, automation implies a simple click experience to export large-scale branch information into Azure, and setting up connectivity from the CPE to Azure Virtual WAN VPN gateway. For more information, see [Automation guidance from Azure to CPE partners](virtual-wan-configure-automation-providers.md).


1. Navigate to your **Virtual WAN -> VPN sites** to open the **VPN sites** page.
1. On the **VPN sites** page, click **+Create site**.
1. On the **Create VPN Site** page, on the **Basics** tab, complete the following fields:

   Screenshot shows Create VPN site page with the Basics tab open.

    * **Region**: Previously referred to as location. This is the location you want to create this site resource in.
    * **Name**: The name by which you want to refer to your on-premises site.
    * **Device vendor**: The name of the VPN device vendor (for example: Citrix, Cisco, Barracuda). Adding the device vendor can help the Azure Team better understand your environment in order to add additional optimization possibilities in the future, or to help you troubleshoot.
    * **Private address space**: The IP address space that is located on your on-premises site. Traffic destined for this address space is routed to your local site. This is required when BGP isn't enabled for the site.
    
      >**Note:**
      >If you edit the address space after creating the site (for example, add an additional address space) it can take 8-10 minutes to update the effective routes while the components are recreated.
      >
1. Select **Links** to add information about the physical links at the branch. If you have a Virtual WAN partner CPE device, check with them to see if this information is exchanged with Azure as a part of the branch information upload set up from their systems.

   Screenshot shows Create VPN site page with the Links tab open.

   * **Link Name**: A name you want to provide for the physical link at the VPN Site. Example: mylink1.
   * **Link speed**: This is the speed of the VPN device at the branch location. Example: 50, which means 50 Mbps is the speed of the VPN device at the branch site.
   * **Link provider name**: The name of the physical link at the VPN Site. Example: ATT, Verizon.
   * **Link IP address/FQDN**: Public IP address of the on-premises device using this link. Optionally, you can provide the private IP address of your on-premises VPN device that is behind ExpressRoute. You can also include a fully qualified domain name. For example, *something.contoso.com*. The FQDN should be resolvable from the VPN gateway. This is possible if the DNS server hosting this FQDN is reachable over internet. IP address takes precedence when both IP address and FQDN are specified.

     >**Note:**
     >
     >* Supports one IPv4 address per FQDN. If the FQDN were to be resolved to multiple IP addresses, then the VPN gateway picks up the first IP4 address from the list. IPv6 addresses are not supported at this time.
     >
     >* VPN gateway maintains a DNS cache which is refreshed every 5 minutes. The gateway tries to resolve FQDNs for disconnected tunnels only. A gateway reset or configuration change can also trigger FQDN resolution.
     >
   * **Link Border Gateway Protocol**: Configuring BGP on a virtual WAN link is equivalent to configuring BGP on an Azure virtual network gateway VPN. Your on-premises BGP peer address can't be the same as the public IP address of your VPN to device or the VNet address space of the VPN site. Use a different IP address on the VPN device for your BGP peer IP. It can be an address assigned to the loopback interface on the device. Specify this address in the corresponding VPN site representing the location. For BGP prerequisites, see [About BGP with Azure VPN Gateway](../vpn-gateway/vpn-gateway-bgp-overview.md). You can always edit a VPN link connection to update its BGP parameters (Peering IP on the link and the AS #).
1. You can add or delete more links. Four links per VPN Site are supported. For example, if you have four ISPs (Internet service provider) at the branch location, you can create four links, one per each ISP, and provide the information for each link.
1. Once you have finished filling out the fields, select **Review + create** to verify. Click **Create** to create the site.
1. Go to your **Virtual WAN**. On the **VPN sites** page, you should be able to see the site you created. If you can't see the site, you need to adjust the filter. Click the **X** in the **Hub association:** bubble to clear the filter.

   Screenshot shows Connect to this hub.
1. Once the filter has cleared, you can view your site.

   Screenshot shows site.


## <a name="connectsites"></a>Connect the VPN site to a virtual hub

In this section, you connect your VPN site to the virtual hub.

1. On your Virtual WAN page, go to **Hubs**.

1. On the **Hubs** page, click the hub that you created.

1. On the page for the hub that you created, under **Connectivity** on the left pane, click **VPN (Site to site)** to open the VPN Site to site page.

1. On the **VPN (Site to site)** page, you should see your site. If you don't, you might need to click the **Hub association:x** bubble to clear the filters and view your site.

1. Select the checkbox next to the name of the site (don't click the site name directly), then click **Connect VPN sites**.

   Screenshot shows Connect site.

1. On the **Connect sites** page, configure the settings.

   Screenshot shows the Connected Sites pane for Virtual HUB ready for a preshared key and associated settings.

   * **Pre-shared key (PSK)**: Enter the preshared key used by your VPN device. If you don't enter a key, Azure autogenerates one for you. You would then use that key when configuring your VPN device.
   * **Protocol and IPsec**: You can either leave the default settings for Protocol (IKEv2) and IPsec (Default), or you can configure custom settings. For more information, see [default/custom IPsec](virtual-wan-ipsec.md).
   * **Propagate Default Route**: Only change this setting to **Enable** if you know you want to propagate the default route. Otherwise, leave it as **Disable**. You can always modify this setting later.
   
     The **Enable** option allows the virtual hub to propagate a learned default route to this connection. This flag enables default route propagation to a connection only if the default route is already learned by the Virtual WAN hub as a result of deploying a firewall in the hub, or if another connected site has forced tunneling enabled. The default route doesn't originate in the Virtual WAN hub.
   * **Use policy based traffic selector**: Leave this setting as **Disable** unless you're configuring a connection to a device that uses this setting.
   * **Configure traffic selector**: Leave the default. You can always modify this setting later.
   * **Connection Mode**: Leave the default. This setting is used to decide which gateway can initiate the connection.

1. At the bottom of the page, select **Connect**.

1. Once you select **Connect**, the connectivity status shows **Updating**. After updating completes, the site shows the connection and connectivity status.

   Screenshot shows a site to site connection and connectivity status.

   **Connection Provisioning status**: This is the status of the Azure resource for the connection that connects the VPN site to the Azure hub’s VPN gateway. Once this control plane operation is successful, Azure VPN gateway and the on-premises VPN device will proceed to establish connectivity.

   **Connectivity status**: This is the actual connectivity (data path) status between Azure’s VPN gateway in the hub and VPN site. After updating is completed, it can show any of the following states:

    * **Unknown**: This state is typically seen if the backend systems are working to transition to another status.
    * **Connecting**: The VPN gateway is trying to reach out to the actual on-premises VPN site.
    * **Connected**: Connectivity is established between VPN gateway and the on-premises VPN site.
    * **Not connected**: Connectivity isn't established.
    * **Disconnected**: This status is seen if, for any reason (on-premises or in Azure), the connection was disconnected.
1. If you want to make changes to your site, select the checkbox next to the site name (don't click the site name directly), then click the **...** context menu.

   Screenshot shows edit, delete and download.

   From this page, you can do the following:

   * Edit the VPN connection to this hub.
   * Delete the VPN connection to this hub.
   * Download the VPN configuration file specific to this site. If you instead want to download the configuration file for sites connected to this hub, select **Download VPN Config** from the menu at the top of the page.


1. You can then click on the VPN Site to see the connectivity status per each link connection.
   Screenshot shows link connections for a given VPN site.



## <a name="vnet"></a>Connect a VNet to the virtual hub

In this section, you create a connection between the virtual hub and your virtual network.


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


## <a name="device"></a>Download VPN configuration

Use the VPN device configuration file to configure your on-premises VPN device. Here are the basic steps:

1. From your Virtual WAN page, go to **Hubs -> Your virtual hub -> VPN (Site to site)** page.

1. At the top of the **VPN (Site to site)** page, click **Download VPN Config**. You'll see a series of messages as Azure creates a new storage account in the resource group 'microsoft-network-[location]', where location is the location of the WAN. You can also add an existing storage account by clicking "Use Existing" and adding a valid SAS URL with write permissions enabled. To learn more about creating a new SAS URL, see [Generate the SAS URL](packet-capture-site-to-site-portal.md#URL).

1. Once the file finishes creating, click the link to download the file. This creates a new file with VPN configuration at the provided SAS url location. To learn about the contents of the file, see [About the VPN device configuration file](#config-file) in this section.

1. Apply the configuration to your on-premises VPN device. For more information, see [VPN device configuration](#vpn-device) in this section.

1. After you've applied the configuration to your VPN devices, you aren't required to keep the storage account that you created.

### <a name="config-file"></a>About the VPN device configuration file

The device configuration file contains the settings to use when configuring your on-premises VPN device. When you view this file, notice the following information:

* **vpnSiteConfiguration -** This section denotes the device details configured as a site connecting to the virtual WAN. It includes the name and public IP address of the branch device.
* **vpnSiteConnections -** This section provides information about the following settings:

    * **Address space** of the virtual hub(s) virtual network.<br>Example:
 
        ```
        "AddressSpace":"10.1.0.0/24"
        ```
    * **Address space** of the virtual networks that are connected to the virtual hub.<br>Example:

         ```
        "ConnectedSubnets":["10.2.0.0/16","10.3.0.0/16"]
         ```
    * **IP addresses** of the virtual hub vpngateway. Because each vpngateway connection is composed of two tunnels in active-active configuration, you'll see both IP addresses listed in this file. In this example, you see "Instance0" and "Instance1" for each site.<br>Example:

        ``` 
        "Instance0":"104.45.18.186"
        "Instance1":"104.45.13.195"
        ```
    * **Vpngateway connection configuration details** such as BGP, preshared key, etc. The PSK is the preshared key that is automatically generated for you. You can always edit the connection in the **Overview** page for a custom PSK.
  
### Example device configuration file

```
  { 
      "configurationVersion":{ 
         "LastUpdatedTime":"2018-07-03T18:29:49.8405161Z",
         "Version":"r403583d-9c82-4cb8-8570-1cbbcd9983b5"
      },
      "vpnSiteConfiguration":{ 
         "Name":"testsite1",
         "IPAddress":"73.239.3.208"
      },
      "vpnSiteConnections":[ 
         { 
            "hubConfiguration":{ 
               "AddressSpace":"10.1.0.0/24",
               "Region":"West Europe",
               "ConnectedSubnets":[ 
                  "10.2.0.0/16",
                  "10.3.0.0/16"
               ]
            },
            "gatewayConfiguration":{ 
               "IpAddresses":{ 
                  "Instance0":"203.0.113.186",
                  "Instance1":"203.0.113.195"
               }
            },
            "connectionConfiguration":{ 
               "IsBgpEnabled":false,
               "PSK":"bkOWe5dPPqkx0DfFE3tyuP7y3oYqAEbI",
               "IPsecParameters":{ 
                  "SADataSizeInKilobytes":102400000,
                  "SALifeTimeInSeconds":3600
               }
            }
         }
      ]
   },
   { 
      "configurationVersion":{ 
         "LastUpdatedTime":"2018-07-03T18:29:49.8405161Z",
         "Version":"1f33f891-e1ab-42b8-8d8c-c024d337bcac"
      },
      "vpnSiteConfiguration":{ 
         "Name":" testsite2",
         "IPAddress":"198.51.100.122"
      },
      "vpnSiteConnections":[ 
         { 
            "hubConfiguration":{ 
               "AddressSpace":"10.1.0.0/24",
               "Region":"West Europe"
            },
            "gatewayConfiguration":{ 
               "IpAddresses":{ 
                  "Instance0":"203.0.113.186",
                  "Instance1":"203.0.113.195"
               }
            },
            "connectionConfiguration":{ 
               "IsBgpEnabled":false,
               "PSK":"XzODPyAYQqFs4ai9WzrJour0qLzeg7Qg",
               "IPsecParameters":{ 
                  "SADataSizeInKilobytes":102400000,
                  "SALifeTimeInSeconds":3600
               }
            }
         }
      ]
   },
   { 
      "configurationVersion":{ 
         "LastUpdatedTime":"2018-07-03T18:29:49.8405161Z",
         "Version":"cd1e4a23-96bd-43a9-93b5-b51c2a945c7"
      },
      "vpnSiteConfiguration":{ 
         "Name":" testsite3",
         "IPAddress":"192.0.2.228"
      },
      "vpnSiteConnections":[ 
         { 
            "hubConfiguration":{ 
               "AddressSpace":"10.1.0.0/24",
               "Region":"West Europe"
            },
            "gatewayConfiguration":{ 
               "IpAddresses":{ 
                  "Instance0":"203.0.113.186",
                  "Instance1":"203.0.113.195"
               }
            },
            "connectionConfiguration":{ 
               "IsBgpEnabled":false,
               "PSK":"YLkSdSYd4wjjEThR3aIxaXaqNdxUwSo9",
               "IPsecParameters":{ 
                  "SADataSizeInKilobytes":102400000,
                  "SALifeTimeInSeconds":3600
               }
            }
         }
      ]
   }
```

### <a name="vpn-device"></a>Configuring your VPN device

> **Note:**
> If you're working with a Virtual WAN partner solution, VPN device configuration automatically happens. The device controller obtains the configuration file from Azure and applies to the device to set up connection to Azure. This means you don't need to know how to manually configure your VPN device.
>

If you need instructions to configure your device, you can use the instructions on the [VPN device configuration scripts page](../vpn-gateway/vpn-gateway-about-vpn-devices.md#configscripts) with the following caveats:

* The instructions on the VPN devices page aren't written for Virtual WAN, but you can use the Virtual WAN values from the configuration file to manually configure your VPN device.

* The downloadable device configuration scripts that are for VPN Gateway don't work for Virtual WAN, as the configuration is different.

* A new Virtual WAN can support both IKEv1 and IKEv2.

* Virtual WAN can use both policy based and route-based VPN devices and device instructions.

## <a name="gateway-config"></a>View or edit gateway settings

You can view and edit your VPN gateway settings at any time. Go to your **Virtual HUB -> VPN (Site to site)** and click on the **Gateway configuration**.

Screenshot that shows the 'VPN (Site-to-site)' page with red box around the Gateway configuration.

On the **Edit VPN Gateway** page, you can see the following settings:

* **Public IP Address**: Assigned by Azure.
* **Private IP Address**: Assigned by Azure.
* **Default BGP IP Address**: Assigned by Azure.
* **Custom BGP IP Address**: This field is reserved for APIPA (Automatic Private IP Addressing). Azure supports BGP IP in the ranges 169.254.21.* and 169.254.22.*. Azure accepts BGP connections in these ranges but will dial connection with the default BGP IP. Users can specify multiple custom BGP IP addresses for each instance. The same custom BGP IP address shouldn't be used for both instances. 

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

Next, to learn more about Virtual WAN, see:

> 
> * [Virtual WAN FAQ](virtual-wan-faq.md)
