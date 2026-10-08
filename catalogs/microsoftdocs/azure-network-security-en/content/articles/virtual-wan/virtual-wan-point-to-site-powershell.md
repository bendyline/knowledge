---

title: Create a point-to-site connection to Azure using PowerShell'
description: Learn how to use Azure Virtual WAN to create a User VPN (point-to-site) connection to Azure using PowerShell.
services: virtual-wan
author: duongau

ms.service: azure-virtual-wan
ms.custom: devx-track-azurepowershell
ms.topic: how-to
ms.date: 03/27/2025
ms.author: duau
---
# Create a P2S User VPN connection using Azure Virtual WAN - PowerShell

This article shows you how to use Virtual WAN to connect to your resources in Azure. In this article, you create a point-to-site User VPN connection over OpenVPN or IPsec/IKE (IKEv2) using PowerShell. This type of connection requires the native VPN client to be configured on each connecting client computer. Most of the steps in this article can be performed using Azure Cloud Shell, except for uploading certificates for certificate authentication.

Screenshot of Virtual WAN diagram.

## Prerequisites


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


### Azure PowerShell




This article uses PowerShell cmdlets. To run the cmdlets, you can use Azure Cloud Shell. Cloud Shell is a free interactive shell that you can use to run the steps in this article. It has common Azure tools preinstalled and configured to use with your account.

To open Cloud Shell, just select **Open Cloudshell** from the upper-right corner of a code block. You can also open Cloud Shell on a separate browser tab by going to [https://shell.azure.com/powershell](https://shell.azure.com/powershell). Select **Copy** to copy the blocks of code, paste them into Cloud Shell, and select the Enter key to run them.


You can also install and run the Azure PowerShell cmdlets locally on your computer. PowerShell cmdlets are updated frequently. If you haven't installed the latest version, the values specified in the instructions may fail. To find the versions of Azure PowerShell installed on your computer, use the `Get-Module -ListAvailable Az` cmdlet. To install or update, see [Install the Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-azure-powershell).



## <a name="signin"></a>Sign in

**If you're using Azure Cloud Shell** you'll automatically be directed to sign into your account after you open Cloudshell. You don't need to run `Connect-AzAccount`. Once signed in, you can still change subscriptions if necessary by using `Get-AzSubscription` and `Select-AzSubscription`.

**If you're running PowerShell locally**, open the PowerShell console with elevated privileges and connect to your Azure account. The `Connect-AzAccount` cmdlet prompts you for credentials. After you authenticate, it downloads your account settings so that they're available to Azure PowerShell. You can change subscription by using `Get-AzSubscription` and `Select-AzSubscription -SubscriptionName "Name of subscription"`.

## <a name="openvwan"></a>Create a virtual WAN

Before you can create a virtual wan, you have to create a resource group to host the virtual wan or use an existing resource group. Create a resource group with [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.Resources/New-azResourceGroup). This example creates a new resource group named **testRG** in the **West US** location:

1. Create a resource group:

   ```azurepowershell-interactive
   New-AzResourceGroup -Location "West US" -Name "testRG" 
   ```

1. Create the virtual wan:

   ```azurepowershell-interactive
   $virtualWan = New-AzVirtualWan -ResourceGroupName testRG -Name myVirtualWAN -Location "West US"
   ```

## <a name="p2sconfig"></a>Create a User VPN configuration

The User VPN (P2S) configuration defines the parameters for remote clients to connect. The instructions you follow depend on the authentication method you want to use.

In the following steps, when selecting the authentication method, you have three choices. Each method has specific requirements. Select one of the following methods, and then complete the steps.

* **Azure certificates:** For this configuration, certificates are required. You need to either generate or obtain certificates. A client certificate is required for each client. Additionally, the root certificate information (public key) needs to be uploaded. For more information about the required certificates, see [Generate and export certificates](certificates-point-to-site.md).

* **Radius-based authentication:** Obtain the Radius server IP, Radius server secret, and certificate information.

* **Microsoft Entra authentication:** See [Configure a User VPN connection - Microsoft Entra authentication](virtual-wan-point-to-site-azure-ad.md).

### Configuration steps using Azure Certificate authentication

1. User VPN (point-to-site) connections can use certificates to authenticate. To create a self-signed root certificate and generate client certificates using PowerShell, see [Generate and export certificates](certificates-point-to-site.md).

1. Once you've generated and exported the self-signed root certificate, you need to reference the location of the stored certificate. This step can't be completed using Azure Cloud Shell because you can't upload certificate files through the Cloud Shell interface. To perform the next steps in this section, you need to either install the Azure PowerShell cmdlets and use PowerShell locally, or use the [Azure portal](virtual-wan-point-to-site-portal.md#p2sconfig).

   ```azurepowershell
   $VpnServerConfigCertFilePath = Join-Path -Path /home/name -ChildPath "\P2SRootCert1.cer"
   $listOfCerts = New-Object "System.Collections.Generic.List[String]"
   $listOfCerts.Add($VpnServerConfigCertFilePath)
   ```

1. Create the User VPN Server Configuration. For the VPN protocol, you can choose IKEv2 VPN, OpenVPN, and OpenVPN and IKEv2, depending on your requirements.

   ```azurepowershell
   New-AzVpnServerConfiguration -Name testconfig -ResourceGroupName testRG -VpnProtocol IkeV2 -VpnAuthenticationType Certificate -VpnClientRootCertificateFilesList $listOfCerts -VpnClientRevokedCertificateFilesList $listOfCerts -Location westus
   ```

## <a name="hub"></a>Create the hub and point-to-site gateway

1. Create the virtual hub.

   ```azurepowershell-interactive
   New-AzVirtualHub -VirtualWan $virtualWan -ResourceGroupName "testRG" -Name "westushub" -AddressPrefix "10.11.0.0/24" -Location "westus"
   ```

1. Declare the variables for the existing resources and specify the Client address pool from which IP addresses will be automatically assigned to VPN clients.

   ```azurepowershell-interactive
   $virtualHub = Get-AzVirtualHub -ResourceGroupName testRG -Name westushub
   $vpnServerConfig = Get-AzVpnServerConfiguration -ResourceGroupName testRG -Name testconfig
   $vpnClientAddressSpaces = New-Object string[] 1
   $vpnClientAddressSpaces[0] = "192.168.2.0/24"
   ```

1. For the point-to-site gateway, you need to specify the gateway scale units and also reference the User VPN Server Configuration created earlier. Creating a point-to-site gateway can take 30 minutes or more to complete.

   ```azurepowershell-interactive
   $P2SVpnGateway = New-AzP2sVpnGateway -ResourceGroupName testRG -Name p2svpngw -VirtualHub $virtualHub -VpnGatewayScaleUnit 1 -VpnClientAddressPool $vpnClientAddressSpaces -VpnServerConfiguration $vpnServerConfig -EnableInternetSecurityFlag -EnableRoutingPreferenceInternetFlag
   ```

## <a name="download"></a>Generate client configuration files

When you connect to VNet using User VPN (P2S), you use the VPN client that is natively installed on the operating system from which you're connecting. All of the necessary configuration settings for the VPN clients are contained in a VPN client configuration zip file. The settings in the zip file help you easily configure the VPN clients. The VPN client configuration files that you generate are specific to the User VPN configuration for your gateway. In this section, you run the script to get the profile URL to generate and download the files used to configure your VPN clients.

```azurepowershell-interactive
Get-AzVirtualWanVpnServerConfigurationVpnProfile -Name myVirtualWAN -ResourceGroupName testRG -VpnServerConfiguration $vpnServerConfig -AuthenticationMethod EAPTLS
```

## <a name="configure-client"></a>Configure VPN clients

Use the downloaded profile package to configure the remote access VPN clients. The procedure for each operating system is different. Follow the instructions that apply to your system.
Once you have finished configuring your client, you can connect.


**IKEv2**

In the User VPN configuration, if you specified the IKEv2 VPN tunnel type, you can configure the native VPN client (Windows and macOS Catalina or later).

The following steps are for Windows. For macOS, see [Configure P2S User VPN clients - native VPN client - macOS](point-to-site-vpn-client-cert-mac.md) steps.

1. Select the VPN client configuration files that correspond to the architecture of the Windows computer. For a 64-bit processor architecture, choose the 'VpnClientSetupAmd64' installer package. For a 32-bit processor architecture, choose the 'VpnClientSetupX86' installer package.

1. Double-click the package to install it. If you see a SmartScreen popup, select **More info**, then **Run anyway**.

1. On the client computer, navigate to **Network Settings** and select **VPN**. The VPN connection shows the name of the virtual network that it connects to.

1. Install a client certificate on each computer that you want to connect through this User VPN configuration. You need a client certificate for authentication when using the native Azure certificate authentication type. For more information about generating certificates, see [Generate Certificates](certificates-point-to-site.md). For information about how to install a client certificate, see [Install a client certificate](install-client-certificates.md).

**OpenVPN**

In the User VPN configuration, if you specified the OpenVPN tunnel type, you can download and configure the Azure VPN Client or, in some cases, you can use OpenVPN client software. For steps, use the link that corresponds to your configuration.

**Client configuration**


| Authentication method | Tunnel type | Client OS | VPN client |
| --- | --- | --- | --- |
| Certificate | IKEv2, SSTP | Windows | [Native VPN client](point-to-site-vpn-client-certificate-windows-native.md) |
|  | IKEv2 | macOS | [Native VPN client](point-to-site-vpn-client-cert-mac.md) |
|  | IKEv2 | Linux | [strongSwan](point-to-site-vpn-client-certificate-ike-linux.md) |
|  | OpenVPN | Windows | [Azure VPN client](vpn-client-certificate-windows.md)<br>[OpenVPN client version 2.x](point-to-site-vpn-client-certificate-windows-openvpn-client-version-2.md)<br>[OpenVPN client version 3.x](point-to-site-vpn-client-certificate-windows-openvpn-client-version-3.md) |
|  | OpenVPN | macOS | [OpenVPN client](point-to-site-vpn-client-certificate-openvpn-mac.md) |
|  | OpenVPN | iOS | [OpenVPN client](point-to-site-vpn-client-certificate-openvpn-ios.md) |
|  | OpenVPN | Linux | [OpenVPN client](point-to-site-vpn-client-certificate-openvpn-linux.md) |
| Microsoft Entra ID | OpenVPN | Windows | [Azure VPN client](point-to-site-entra-vpn-client-windows.md) |
|  | OpenVPN | macOS | [Azure VPN client](point-to-site-entra-vpn-client-mac.md) |


## <a name="connect-vnet"></a>Connect VNet to hub

1. Declare a variable to get the already existing virtual network.

   ```azurepowershell-interactive
   $remoteVirtualNetwork = Get-AzVirtualNetwork -Name "testRGvnet" -ResourceGroupName "testRG"
   ```

1. Create a connection between your virtual hub and your VNet.

   ```azurepowershell-interactive
   New-AzVirtualHubVnetConnection -ResourceGroupName "testRG" -VirtualHubName "westushub" -Name "testvnetconnection" -RemoteVirtualNetwork $remoteVirtualNetwork
   ```

## <a name="cleanup"></a>Clean up resources

When you no longer need the resources that you created, delete them. Some of the Virtual WAN resources must be deleted in a certain order due to dependencies. Deleting can take about 30 minutes to complete.

Delete the gateway entities following the below order for the point-to-site VPN configuration. This can take up to 30 minutes to complete.

1. Delete the point-to-site VPN gateway.

   ```azurepowershell-interactive
   Remove-AzP2sVpnGateway -Name "p2svpngw" -ResourceGroupName "testRG"
   ```

1. Delete the User VPN Server configuration.

   ```azurepowershell-interactive
   Remove-AzVpnServerConfiguration -Name "testconfig" -ResourceGroupName "testRG"
   ```

1. You can delete the entire resource group in order to delete all the remaining resources it contains, including the hubs, sites, and the virtual WAN.

   ```azurepowershell-interactive
   Remove-AzResourceGroup -Name "testRG"
   ```

1. Or, you can choose to delete each of the resources in the resource group.

   Delete the virtual hub.

   ```azurepowershell-interactive
   Remove-AzVirtualHub -ResourceGroupName "testRG" -Name "westushub"
    ```

   Delete the virtual WAN.

   ```azurepowershell-interactive
   Remove-AzVirtualWan -Name "MyVirtualWan" -ResourceGroupName "testRG"
   ```

## Next steps

Next, to learn more about Virtual WAN, see the [Virtual WAN FAQ](virtual-wan-faq.md).
