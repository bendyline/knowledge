---
title: 'Tutorial - Create S2S VPN connection between on-premises network and Azure virtual network: Azure portal'
description: In this tutorial, you learn how to create a VPN Gateway site-to-site IPsec connection between your on-premises network and a virtual network.
titleSuffix: Azure VPN Gateway
author: duongau
ms.author: duau
ms.service: azure-vpn-gateway
ms.topic: tutorial
ms.date: 07/09/2025

#customer intent: As a network engineer, I want to create a site-to-site VPN connection between my on-premises location and my Azure virtual network.
# Customer intent: As a network engineer, I want to create a site-to-site VPN connection between my on-premises network and Azure, so that I can ensure secure and reliable connectivity for my resources in the cloud.
---

# Tutorial: Create a site-to-site VPN connection in the Azure portal

In this tutorial, you use the Azure portal to create a site-to-site (S2S) VPN gateway connection between your on-premises network and a virtual network. You can also create this configuration by using [Azure PowerShell](vpn-gateway-create-site-to-site-rm-powershell.md) or the [Azure CLI](vpn-gateway-howto-site-to-site-resource-manager-cli.md). This configuration uses a specified pre-shared key for the connection between the Azure VPN gateway and your on-premises VPN device. You can also configure a site-to-site connection using [certificate authentication](site-to-site-certificate-authentication-gateway.md).

Diagram that shows site-to-site VPN gateway cross-premises connections.

## What you accomplish

In this tutorial, you:

> 
> * Create a virtual network.
> * Create a VPN gateway.
> * Create a local network gateway.
> * Create a VPN connection.
> * Verify the connection.
> * Connect to a virtual machine.

**Estimated time to complete**: 90-120 minutes (including gateway deployment time)

## Prerequisites

* You need an Azure account with an active subscription. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* If you're unfamiliar with the IP address ranges located in your on-premises network configuration, you need to coordinate with someone who can provide those details for you. When you create this configuration, you must specify the IP address range prefixes that Azure routes to your on-premises location. None of the subnets of your on-premises network can overlap with the virtual network subnets that you want to connect to.
* VPN devices:
  * Make sure you have a compatible VPN device and someone who can configure it. For more information about compatible VPN devices and device configuration, see [About VPN devices](vpn-gateway-about-vpn-devices.md).
  * Verify that you have an externally facing public IPv4 address for your VPN device.
  * Verify that your VPN device supports active-active mode gateways. This article creates an active-active mode VPN gateway, which is recommended for highly available connectivity. Active-active mode specifies that both gateway VM instances are active and uses two public IP addresses, one for each gateway VM instance. You configure your VPN device to connect to the IP address for each gateway VM instance. If your VPN device doesn't support this mode, don't enable this mode for your gateway. For more information, see [Design highly available connectivity for cross-premises and VNet-to-VNet connections](vpn-gateway-highlyavailable.md) and [About active-active mode VPN gateways](about-active-active-gateways.md).

## <a name="CreateVNet"></a>Create a virtual network

In this section, you create a virtual network by using the following values:

* **Resource group**: TestRG1
* **Name**: VNet1
* **Region**: (US) East US
* **IPv4 address space**: 10.1.0.0/16
* **Subnet name**: FrontEnd
* **Subnet address space**: 10.1.0.0/24
> **Note:**
> When you use a virtual network as part of a cross-premises architecture, be sure to coordinate with your on-premises network administrator to carve out an IP address range that you can use specifically for this virtual network. If a duplicate address range exists on both sides of the VPN connection, traffic will route in an unexpected way. Additionally, if you want to connect this virtual network to another virtual network, the address space can't overlap with the other virtual network. Plan your network configuration accordingly.


1. Sign in to the Azure portal.
1. In **Search resources, service, and docs (G+/)** at the top of the portal page, enter **virtual network**. Select **Virtual network** from the **Marketplace** search results to open the **Virtual network** page.
1. On the **Virtual network** page, select **Create** to open the **Create virtual network** page.
1. On the **Basics** tab, configure the virtual network settings for **Project details** and **Instance details**. You see a green check mark when the values you enter are validated. You can adjust the values shown in the example according to the settings that you require.

   Screenshot that shows the Basics tab.

   * **Subscription**: Verify that the subscription listed is the correct one. You can change subscriptions by using the dropdown box.
   * **Resource group**: Select an existing resource group or select **Create new** to create a new one. For more information about resource groups, see [Azure Resource Manager overview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md#resource-groups).
   * **Name**: Enter the name for your virtual network.
   * **Region**: Select the location for your virtual network. The location determines where the resources that you deploy to this virtual network will reside.

1. Select **Next** or **Security** to go to the **Security** tab. For this exercise, leave the default values for all the services on this page.

1. Select **IP Addresses** to go to the **IP Addresses** tab. On the **IP Addresses** tab, configure the settings.

   * **IPv4 address space**: By default, an address space is automatically created. You can select the address space and adjust it to reflect your own values. You can also add a different address space and remove the default that was automatically created. For example, you can specify the starting address as **10.1.0.0** and specify the address space size as **/16**. Then select **Add** to add that address space.
   * **+ Add subnet**: If you use the default address space, a default subnet is created automatically. If you change the address space, add a new subnet within that address space. Select **+ Add subnet** to open the **Add subnet** window. Configure the following settings, and then select **Add** at the bottom of the page to add the values.

     * **Subnet name**: You can use the default, or specify the name. Example: **FrontEnd**.
     * **Subnet address range**: The address range for this subnet. Examples are **10.1.0.0** and **/24**.

1. Review the **IP addresses** page and remove any address spaces or subnets that you don't need.
1. Select **Review + create** to validate the virtual network settings.
1. After the settings are validated, select **Create** to create the virtual network.


After you create your virtual network, you can optionally configure Azure DDoS Protection. Azure DDoS Protection is simple to enable on any new or existing virtual network, and it requires no application or resource changes. For more information about Azure DDoS Protection, see [What is Azure DDoS Protection?](../ddos-protection/ddos-protection-overview.md)

## Create a gateway subnet


The virtual network gateway requires a specific subnet named **GatewaySubnet**. The gateway subnet is part of the IP address range for your virtual network and contains the IP addresses that the virtual network gateway resources and services use.

When you create the gateway subnet, you specify the number of IP addresses that the subnet contains. The number of IP addresses needed depends on the VPN gateway configuration that you want to create. Some configurations require more IP addresses than others. It's best to specify /27 or larger (/26, /25, etc.) for your gateway subnet.


1. On the page for your virtual network, on the left pane, select **Subnets** to open the **Subnets** page.
1. At the top of the page, select **+ Subnet** to open the **Add subnet** pane.
1. For **Subnet purpose**, select **Virtual Network Gateway** from the dropdown.
1. The name is automatically entered as **GatewaySubnet**. Adjust starting IP address and size if necessary. For example, **10.1.255.0/27**.
1. Don't adjust the other values on the page. Click **Add** to add the subnet.

For more information about adding a subnet to your virtual network, see [Add, change, or delete a virtual network subnet](../virtual-network/virtual-network-manage-subnet.md). For steps to add an address range to your virtual network, see [Add or remove an address range](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/manage-virtual-network.yml).

> **Important:**
> NSGs on the gateway subnet aren't supported. Associating a network security group to this subnet might cause your virtual network gateway (VPN and ExpressRoute gateways) to stop functioning as expected. For more information about network security groups, see [What is a network security group?](https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview)

## <a name="VNetGateway"></a>Create a VPN gateway

In this step, you create a virtual network gateway (VPN gateway) for your virtual network. Creating a gateway can often take 45 minutes or more, depending on the selected gateway SKU.

### Create a VPN gateway

Create a virtual network gateway (VPN gateway) by using the following values:

* **Name**: VNet1GW
* **Gateway type**: VPN
* **SKU**: VpnGw2AZ
* **Generation**: Generation 2
* **Virtual network**: VNet1
* **Gateway subnet address range**: 10.1.255.0/27
* **Public IP address**: Create new
* **Public IP address name:** VNet1GWpip1
* **Public IP address SKU:** Standard
* **Assignment:** Static
* **Second Public IP address name:** VNet1GWpip2
* **Enable active-active mode**: Enabled
* **Configure BGP**: Disabled



1. In **Search resources, services, and docs (G+/)**, enter **virtual network gateway**. Locate **Virtual network gateway** in the **Marketplace** search results and select it to open the **Create virtual network gateway** page.

2. On the **Basics** tab, fill in the values for **Project details** and **Instance details**.

   Screenshot that shows the Instance fields.

   * **Subscription**: Select the subscription you want to use from the dropdown list.
   * **Resource group**: This value is autofilled when you select your virtual network on this page.
   * **Name**: This is the name of the gateway object you're creating. This is different than the gateway subnet to which gateway resources will be deployed.
   * **Region**: Select the region in which you want to create this resource. The region for the gateway must be the same as the virtual network.
   * **Gateway type**: Select **VPN**. VPN gateways use the virtual network gateway type **VPN**.
   * **SKU**: From the dropdown list, select a [gateway SKU](about-gateway-skus.md) that supports the features you want to use.
      * We recommend that you select a SKU that ends in AZ when possible. AZ SKUs support [availability zones](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/about-zone-redundant-vnet-gateways.md).
      * The Basic SKU isn't available in the portal. To configure a Basic SKU gateway, you must use [PowerShell](create-gateway-basic-sku-powershell.md) or CLI.
   * **Generation**: Select **Generation2** from the dropdown.
   * **Virtual network**: From the dropdown list, select the virtual network to which you want to add this gateway. If you can't see the virtual network you want to use, make sure you selected the correct subscription and region in the previous settings.
   * **Gateway subnet address range** or **Subnet**: The gateway subnet is required to create a VPN gateway.

     Currently, this field can show different settings options, depending on the virtual network address space and whether you already created a subnet named **GatewaySubnet** for your virtual network.

     If you don't have a gateway subnet *and* you don't see the option to create one on this page, go back to your virtual network and create the gateway subnet. Then, return to this page and configure the VPN gateway.


3. Specify the values for **Public IP address**. These settings specify the public IP address objects that will be associated to the VPN gateway. A public IP address is assigned to each public IP address object when the VPN gateway is created. The only time the assigned public IP address changes is when the gateway is deleted and re-created. IP addresses don't change across resizing, resetting, or other internal maintenance/upgrades of your VPN gateway.

   Screenshot that shows the Public IP address field.

   * **Public IP address type**: If this option appears, select **Standard**.

   * **Public IP address**: Leave **Create new** selected.
   * **Public IP address name**: In the text box, enter a name for your public IP address instance.
   * **Public IP address SKU**: Setting is autoselected to Standard SKU.
   * **Assignment**: The assignment is typically autoselected and should be Static.
   * **Availability zone**: This setting is available for AZ gateway SKUs in regions that support [availability zones](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/about-zone-redundant-vnet-gateways.md). Select Zone-redundant, unless you know you want to specify a zone.
   * **Enable active-active mode**: We recommend that you select **Enabled** to take advantage of the benefits of an [active-active mode](about-active-active-gateways.md) gateway. If you plan to use this gateway for a site-to-site connection, take into consideration the following:
      * Verify the [active-active design](about-active-active-gateways.md#active-active-mode-design) that you want to use. Connections with your on-premises VPN device must be configured specifically to take advantage of active-active mode.
      * Some VPN devices don't support active-active mode. If you're not sure, check with your VPN device vendor. If you're using a VPN device that doesn't support active-active mode, you can select **Disabled** for this setting. 
   * **Second public IP address:** Select **Create new**. This is available only if you selected **Enabled** for the **Enable active-active mode** setting.
   * **Public IP address name**: In the text box, enter a name for your public IP address instance.
   * **Public IP address SKU**: Setting is autoselected to Standard SKU.
   * **Availability zone**: Select Zone-redundant, unless you know you want to specify a zone.
   * **Configure BGP:** Select Disabled unless your configuration specifically requires this setting. If you do require this setting, the default ASN is 65515, although this value can be changed.
   * **Enable Key Vault Access**: Select Disabled unless your configuration specifically requires this setting.
4. Select **Review + create** to run validation.
5. After validation passes, select **Create** to deploy the VPN gateway.

A gateway can take 45 minutes or more to fully create and deploy. You can see the deployment status on the **Overview** page for your gateway.

> **Important:**
> NSGs on the gateway subnet aren't supported. Associating a network security group to this subnet might cause your virtual network gateway (VPN and ExpressRoute gateways) to stop functioning as expected. For more information about network security groups, see [What is a network security group?](https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview)

### <a name="view"></a>View public IP address

To view the IP address associated with each virtual network gateway VM instance, go to your virtual network gateway in the portal.

1. Go to your virtual network gateway **Properties** page (not the Overview page). You might need to expand **Settings** to see the **Properties** page in the list.
1. If your gateway in active-passive mode, you'll only see one IP address. If your gateway is in active-active mode, you'll see two public IP addresses listed, one for each gateway VM instance. When you create a site-to-site connection, you must specify each IP address when configuring your VPN device because both gateway VMs are active.
1. To view more information about the IP address object, click the associated IP address link.

## <a name="LocalNetworkGateway"></a>Create a local network gateway

The local network gateway is a specific object deployed to Azure that represents your on-premises location (the site) for routing purposes. You give the site a name by which Azure can refer to it, and then specify the IP address of the on-premises VPN device to which you create a connection. You also specify the IP address prefixes that are routed through the VPN gateway to the VPN device. The address prefixes you specify are the prefixes located on your on-premises network. If your on-premises network changes or you need to change the public IP address for the VPN device, you can easily update the values later. You create a separate local network gateway for each VPN device that you want to connect to. Some highly available connectivity designs specify multiple on-premises VPN devices.

Create a local network gateway by using the following values:

* **Name**: Site1
* **Resource Group**: TestRG1
* **Location**: East US


Configuration considerations:

* VPN Gateway supports only one IPv4 address for each FQDN. If the domain name resolves to multiple IP addresses, VPN Gateway uses the first IP address returned by the DNS servers. To eliminate the uncertainty, we recommend that your FQDN always resolve to a single IPv4 address. IPv6 isn't supported.
* VPN Gateway maintains a DNS cache that's refreshed every 5 minutes. The gateway tries to resolve the FQDNs for disconnected tunnels only. Resetting the gateway also triggers FQDN resolution.
* Although VPN Gateway supports multiple connections to different local network gateways with different FQDNs, all FQDNs must resolve to different IP addresses.

1. In the portal, go to **Local network gateways** and open the **Create local network gateway** page.
1. On the **Basics** tab, specify the values for your local network gateway.

   Screenshot that shows creating a local network gateway with IP address.

   * **Subscription**: Verify that the correct subscription is showing.
   * **Resource group**: Select the resource group that you want to use. You can either create a new resource group or select one that you've already created.
   * **Region**: Select the region for this object. You might want to select the same location where your virtual network resides, but you aren't required to do so.
   * **Name**: Specify a name for your local network gateway object.
   * **Endpoint**: Select the endpoint type for the on-premises VPN device as **IP address** or **FQDN (Fully Qualified Domain Name)**.
      * **IP address**: If you have a static public IP address allocated from your internet service provider (ISP) for your VPN device, select the IP address option. Fill in the IP address as shown in the example. This address is the public IP address of the VPN device that you want Azure VPN Gateway to connect to. If you don't have the IP address right now, you can use the values shown in the example. Later, you must go back and replace your placeholder IP address with the public IP address of your VPN device. Otherwise, Azure can't connect.
      * **FQDN**: If you have a dynamic public IP address that could change after a certain period of time, often determined by your ISP, you can use a constant DNS name with a Dynamic DNS service to point to your current public IP address of your VPN device. Your Azure VPN gateway resolves the FQDN to determine the public IP address to connect to.
   * **Address space**: The address space refers to the address ranges for the network that this local network represents. You can add multiple address space ranges. Make sure that the ranges you specify here don't overlap with ranges of other networks that you want to connect to. Azure routes the address range that you specify to the on-premises VPN device IP address. *Use your own values here if you want to connect to your on-premises site, not the values shown in the example*.

1. On the **Advanced** tab, you can configure BGP settings, if needed.
1. After you specify the values, select **Review + create** at the bottom of the page to validate the page.
1. Select **Create** to create the local network gateway object.

## <a name="VPNDevice"></a>Configure your VPN device

Site-to-site connections to an on-premises network require a VPN device. In this step, you configure your VPN device. When you configure your VPN device, you need the following values:

* **Shared key**: This shared key is the same one that you specify when you create your site-to-site VPN connection. In our examples, we use a simple shared key. We recommend that you generate a more complex key to use, with at least 32 characters, including a mix of uppercase and lowercase letters, numbers, and special characters.
* **Public IP addresses of your virtual network gateway instances**: Obtain the IP address for each VM instance. If your gateway is in active-active mode, you'll have an IP address for each gateway VM instance. Be sure to configure your device with both IP addresses, one for each active gateway VM. Active-standby mode gateways have only one IP address.

> **Note:**
> 
For S2S connections with an active-active mode VPN gateway, ensure tunnels are established to each gateway VM instance. If you establish a tunnel to only one gateway VM instance, the connection will go down during maintenance. If your VPN device doesn't support this setup, configure your gateway for active-standby mode instead.



Depending on the VPN device that you have, you might be able to download a VPN device configuration script. For more information, see [Download VPN device configuration scripts](vpn-gateway-download-vpndevicescript.md).

For more configuration information, see the following links:

- For information about compatible VPN devices, see [VPN devices](vpn-gateway-about-vpn-devices.md).
- For links to device configuration settings, see [Validated VPN devices](vpn-gateway-about-vpn-devices.md#devicetable). The device configuration links are provided on a best-effort basis. It's always best to check with your device manufacturer for the latest configuration information. The list shows the versions we've tested. If your OS isn't on that list, it's still possible that the version is compatible. Check with your device manufacturer to verify that the OS version for your VPN device is compatible.
- For an overview of VPN device configuration, see [Overview of third-party VPN device configurations](vpn-gateway-3rdparty-device-config-overview.md).
- For information about editing device configuration samples, see [Editing samples](vpn-gateway-about-vpn-devices.md#editing).
- For cryptographic requirements, see [About cryptographic requirements and Azure VPN gateways](vpn-gateway-about-compliance-crypto.md).
- For information about IPsec/IKE parameters, see [About VPN devices and IPsec/IKE parameters for site-to-site VPN gateway connections](vpn-gateway-about-vpn-devices.md#ipsec). This link shows information about IKE version, Diffie-Hellman Group, authentication method, encryption and hashing algorithms, SA lifetime, PFS, and DPD, in addition to other parameter information that you need to complete your configuration.
- For IPsec/IKE policy configuration steps, see [Configure IPsec/IKE policy for site-to-site VPN or VNet-to-VNet connections](vpn-gateway-ipsecikepolicy-rm-powershell.md).
- To connect multiple policy-based VPN devices, see [Connect Azure VPN gateways to multiple on-premises policy-based VPN devices using PowerShell](vpn-gateway-connect-multiple-policybased-rm-ps.md).


## <a name="CreateConnection"></a>Create VPN connections

Create a site-to-site VPN connection between your virtual network gateway and your on-premises VPN device. If you're using an active-active mode gateway (recommended), each gateway VM instance has a separate IP address. To properly configure [highly available connectivity](vpn-gateway-highlyavailable.md), you must establish a tunnel between each VM instance and your VPN device. Both tunnels are part of the same connection.

Create a connection by using the following values:

* **Local network gateway name**: Site1
* **Connection name**: VNet1toSite1
* **Shared key**: For this example, you use **abc123**. But you can use whatever is compatible with your VPN hardware. The important thing is that the values match on both sides of the connection.

1. In the portal, go to the virtual network gateway and open it.
1. On the page for the gateway, select **Connections**.
1. At the top of the **Connections** page, select **+ Add** to open the **Create connection** page.

   Screenshot that shows the Basics page.
1. On the **Create connection** page, on the **Basics** tab, configure the values for your connection:
   * Under **Project details**, select the subscription and the resource group where your resources are located.
   * Under **Instance details**, configure the following settings:

     * **Connection type**: Select **Site-to-site (IPSec)**.
     * **Name**: Name your connection.
     * **Region**: Select the region for this connection.
1. Select the **Settings** tab and configure the following values:

   Screenshot that shows the Settings page.

   * **Virtual network gateway**: Select the virtual network gateway from the dropdown list.
   * **Local network gateway**: Select the local network gateway from the dropdown list.
   * **Shared key**: The value here must match the value that you're using for your local on-premises VPN device. If this field doesn't appear on your portal page, or you want to later update this key, you can do so once the connection object is created. Go to the connection object you created (example name: VNet1toSite1) and update the key on the **Authentication** page.
   * **IKE Protocol**: Select **IKEv2**.
   * **Use Azure Private IP Address**: Don't select.
   * **Enable BGP**: Don't select.
   * **FastPath**: Don't select.
   * **IPsec/IKE policy:** Select **Default**.
   * **Use policy based traffic selector**: Select **Disable**.
   * **DPD timeout in seconds**: Select **45**.
   * **Connection Mode**: Select **Default**. This setting is used to specify which gateway can initiate the connection. For more information, see [VPN Gateway settings - Connection modes](vpn-gateway-about-vpn-gateway-settings.md#connectionmode).
1. For **NAT Rules Associations**, leave both **Ingress** and **Egress** as **0 selected**.
1. Select **Review + create** to validate your connection settings.
1. Select **Create** to create the connection.
1. After the deployment is finished, you can view the connection on the **Connections** page of the virtual network gateway. The status changes from *Unknown* to *Connecting* and then to *Succeeded*.

### <a name="configure-connect"></a>Configure more connection settings (optional)

You can configure more settings for your connection, if necessary. Otherwise, skip this section and leave the defaults in place. For more information, see [Configure custom IPsec/IKE connection policies](ipsec-ike-policy-howto.md).

1. Go to your virtual network gateway and select **Connections** to open the **Connections** page.
1. Select the name of the connection you want to configure to open the **Connection** page.
1. On the left side of the **Connection** page, select **Configuration** to open the **Configuration** page. Make any necessary changes and then select **Save**.

   In the following screenshots, the settings are enabled so that you can see the configuration settings that are available in the portal. Select the screenshot to see the expanded view. When you configure your connections, only configure the settings that you require. Otherwise, leave the default settings in place.

   Screenshot that shows the Connection page connection settings.

   Screenshot that shows the Connection page with more connection settings.


## <a name="VerifyConnection"></a>Verify the VPN connection

In the Azure portal, you can view the connection status of a VPN gateway by going to the connection. The following steps show one way to go to your connection and verify.

1. On the [Azure portal](https://portal.azure.com) menu, select **All resources** or search for and select **All resources** from any page.
1. Select your virtual network gateway.
1. On the pane for your virtual network gateway, select **Connections**. You can see the status of each connection.
1. Select the name of the connection that you want to verify to open **Essentials**. On the **Essentials** pane, you can view more information about your connection. The status is *Succeeded* and *Connected* after you make a successful connection.

## Optional steps

### <a name="reset"></a>Reset a gateway

Resetting an Azure VPN gateway is helpful if you lose cross-premises VPN connectivity on one or more site-to-site VPN tunnels. In this situation, your on-premises VPN devices are all working correctly but aren't able to establish IPsec tunnels with the Azure VPN gateways. If you need to reset an active-active gateway, you can reset both instances using the portal. You can also use PowerShell or CLI to reset each gateway instance separately using instance VIPs. For more information, see [Reset a VPN gateway or a connection](reset-gateway.md).


1. In the portal, go to the virtual network gateway that you want to reset.
1. On the **Virtual network gateway** page, in the left pane, scroll and locate **Help -> Reset**.
1. On the **Reset** page, select **Reset**. After the command is issued, the current active instance of Azure VPN gateway is rebooted immediately. Resetting the gateway causes a gap in VPN connectivity and might limit future root cause analysis of the issue.


### <a name="addconnect"></a>Add another connection

A gateway can have multiple connections. If you want to configure connections to multiple on-premises sites from the same VPN gateway, the address spaces can't overlap between any of the connections.

1. If you're connecting using a site-to-site VPN and you don't have a local network gateway for the site you want to connect to, create another local network gateway and specify the site details. For more information, see [Create a local network gateway](#LocalNetworkGateway).
1. To add a connection, go to the VPN gateway and then select **Connections** to open the **Connections** page.
1. Select **+ Add** to add your connection. Adjust the connection type to reflect either VNet-to-VNet (if connecting to another virtual network gateway) or site-to-site.
1. Specify the shared key that you want to use and then select **OK** to create the connection.

### Update a connection shared key

You can specify a different shared key for your connection.

1. In the portal, go to the connection.
1. Change the shared key on the **Authentication** page.
1. Save your changes.
1. Update your VPN device with the new shared key as necessary.

### <a name="resize"></a>Upgrade a gateway SKU

You can upgrade the SKU of your VPN gateway to a different SKU. There are rules regarding which SKUs are available for upgrade. For more information, see [Upgrade a gateway SKU](gateway-sku-upgrade.md).

### <a name="additional"></a>More configuration considerations

You can customize site-to-site configurations in various ways. For more information, see the following articles:

* For information about BGP, see the [BGP overview](vpn-gateway-bgp-overview.md) and [How to configure BGP](configure-bgp.md).
* For information about forced tunneling, see [About forced tunneling](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-forced-tunneling-rm.md).
* For information about highly available active-active connections, see [Highly available cross-premises and VNet-to-VNet connectivity](vpn-gateway-highlyavailable.md).
* For information about how to limit network traffic to resources in a virtual network, see [Network security](../virtual-network/network-security-groups-overview.md).
* For information about how Azure routes traffic between Azure, on-premises, and internet resources, see [Virtual network traffic routing](../virtual-network/virtual-networks-udr-overview.md).

## Clean up resources

If you're not going to continue to use this application or go to the next tutorial, delete these resources.

1. Enter the name of your resource group in the **Search** box at the top of the portal and select it from the search results.
1. Select **Delete resource group**.
1. Enter your resource group for **TYPE THE RESOURCE GROUP NAME** and select **Delete**.

## Next steps

After you configure a site-to-site connection, you can add a point-to-site connection to the same gateway.

> 
> [Point-to-site VPN connections](point-to-site-certificate-gateway.md)
