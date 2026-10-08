---
title: 'Configure an Always-On VPN user tunnel'
titleSuffix: Azure Virtual WAN
description: Learn how to configure an Always On VPN user tunnel for your Virtual WAN.
services: virtual-wan
author: duongau

ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 11/21/2023
ms.author: duau

---
# Configure an Always On VPN user tunnel for Virtual WAN


The Always On feature was introduced in the Windows 10 VPN client (this feature is also supported for [macOS](../vpn-gateway/vpn-gateway-howto-always-on-device-tunnel-macos.md)). Always On is the ability to maintain a VPN connection. With Always On, the active VPN profile can connect automatically and remain connected based on triggers, such as:
- **Network transitions** - Switching between Wi-Fi networks or moving from Wi-Fi to a cellular hotspot can cause the VPN tunnel to drop silently.
- **Sleep/wake cycles** - When macOS enters sleep mode, the VPN session may time out and not automatically re-establish when the device wakes.
- **Temporary network interruptions** - Brief network outages, such as signal loss or router restarts, terminate the VPN connection and require manual reconnection.
- **Idle session timeouts** - If no traffic passes through the tunnel for a period, the VPN gateway may tear down the idle session.
- **Device restarts and user sign-out** - After a restart or sign-out, the VPN connection isn't restored unless the user manually reconnects.

These gaps leave the device unprotected and without access to corporate resources. Enabling Always On ensures the VPN client automatically reconnects after any disruption, maintaining a persistent and secure tunnel without user intervention.

You can use gateways with Always On to establish persistent user tunnels and device tunnels to Azure.

Always On VPN connections include either of two types of tunnels:

* **Device tunnel**: Connects to specified VPN servers before users sign in to the device. Pre-sign-in connectivity scenarios and device management use a device tunnel.

* **User tunnel**: Connects only after users sign in to the device. By using user tunnels, you can access organization resources through VPN servers.

Device tunnels and user tunnels operate independent of their VPN profiles. They can be connected at the same time, and they can use different authentication methods and other VPN configuration settings, as appropriate.

## Prerequisites

You must create a point-to-site configuration and edit the virtual hub assignment. See the following sections for instructions:

* [Create a P2S configuration](virtual-wan-point-to-site-portal.md#p2sconfig)
* [Create hub with P2S gateway](virtual-wan-point-to-site-portal.md#hub)

## Configure a user tunnel



1. Install client certificates on the Windows client, as shown in this [point-to-site VPN client](https://learn.microsoft.com/azure/vpn-gateway/point-to-site-how-to-vpn-client-install-azure-cert) article. The certificate must be in the current user store.

1. You can configure the Always On VPN client through PowerShell, Configuration Manager, or Intune by following the instructions in [Configure Windows 10 or later client Always On VPN connections](https://learn.microsoft.com/windows-server/remote/remote-access/vpn/always-on-vpn/deploy/vpn-deploy-client-vpn-connections).

### Example configuration for the user tunnel

After you've configured the virtual network gateway and installed the client certificate in the local machine store on the Windows client, configure a client device tunnel by using the following examples. Note that these examples have been validated on Windows 10.

1. Copy the following text, and save it as *usercert.ps1*:

   ```
   Param(
   [string]$xmlFilePath,
   [string]$ProfileName
   )

   $a = Test-Path $xmlFilePath
   echo $a

   $ProfileXML = Get-Content $xmlFilePath

   echo $XML

   $ProfileNameEscaped = $ProfileName -replace ' ', '%20'

   $Version = 201606090004

   $ProfileXML = $ProfileXML -replace '<', '&lt;'
   $ProfileXML = $ProfileXML -replace '>', '&gt;'
   $ProfileXML = $ProfileXML -replace '"', '&quot;'

   $nodeCSPURI = './Vendor/MSFT/VPNv2'
   $namespaceName = "root\cimv2\mdm\dmmap"
   $className = "MDM_VPNv2_01"

   $session = New-CimSession

   try
   {
   $newInstance = New-Object Microsoft.Management.Infrastructure.CimInstance $className, $namespaceName
   $property = [Microsoft.Management.Infrastructure.CimProperty]::Create("ParentID", "$nodeCSPURI", 'String', 'Key')
   $newInstance.CimInstanceProperties.Add($property)
   $property = [Microsoft.Management.Infrastructure.CimProperty]::Create("InstanceID", "$ProfileNameEscaped", 'String', 'Key')
   $newInstance.CimInstanceProperties.Add($property)
   $property = [Microsoft.Management.Infrastructure.CimProperty]::Create("ProfileXML", "$ProfileXML", 'String', 'Property')
   $newInstance.CimInstanceProperties.Add($property)

   $session.CreateInstance($namespaceName, $newInstance)
   $Message = "Created $ProfileName profile."
   Write-Host "$Message"
   }
   catch [Exception]
   {
   $Message = "Unable to create $ProfileName profile: $_"
   Write-Host "$Message"
   exit
   }
   $Message = "Complete."
   Write-Host "$Message"
   ```
1. Copy the following text, and save it as *VPNProfile.xml* in the same folder as *usercert.ps1*. Edit the following text to match your environment:

   * `<Servers>azuregateway-1234-56-78dc.cloudapp.net</Servers>  <= Can be found in the VpnSettings.xml in the downloaded profile zip file`
   * `<Address>192.168.3.5</Address>  <= IP of resource in the vnet or the vnet address space`
   * `<Address>192.168.3.4</Address>  <= IP of resource in the vnet or the vnet address space`
   * `<PrefixSize>32</PrefixSize>     <= Subnet mask`

   ```
    <VPNProfile>  
      <NativeProfile>  
    <Servers>azuregateway-b115055e-0882-49bc-a9b9-7de45cba12c0-8e6946892333.vpn.azure.com</Servers>  
    <NativeProtocolType>IKEv2</NativeProtocolType>  
    <Authentication>  
    <UserMethod>Eap</UserMethod>
    <Eap>
    <Configuration>
    <EapHostConfig xmlns="http://www.microsoft.com/provisioning/EapHostConfig"><EapMethod><Type xmlns="http://www.microsoft.com/provisioning/EapCommon">13</Type><VendorId xmlns="http://www.microsoft.com/provisioning/EapCommon">0</VendorId><VendorType xmlns="http://www.microsoft.com/provisioning/EapCommon">0</VendorType><AuthorId xmlns="http://www.microsoft.com/provisioning/EapCommon">0</AuthorId></EapMethod><Config xmlns="http://www.microsoft.com/provisioning/EapHostConfig"><Eap xmlns="http://www.microsoft.com/provisioning/BaseEapConnectionPropertiesV1"><Type>13</Type><EapType xmlns="http://www.microsoft.com/provisioning/EapTlsConnectionPropertiesV1"><CredentialsSource><CertificateStore><SimpleCertSelection>true</SimpleCertSelection></CertificateStore></CredentialsSource><ServerValidation><DisableUserPromptForServerValidation>false</DisableUserPromptForServerValidation><ServerNames></ServerNames></ServerValidation><DifferentUsername>false</DifferentUsername><PerformServerValidation xmlns="http://www.microsoft.com/provisioning/EapTlsConnectionPropertiesV2">false</PerformServerValidation><AcceptServerName xmlns="http://www.microsoft.com/provisioning/EapTlsConnectionPropertiesV2">false</AcceptServerName></EapType></Eap></Config></EapHostConfig>
    </Configuration>
    </Eap>
    </Authentication>  
    <RoutingPolicyType>SplitTunnel</RoutingPolicyType>  
     <!-- disable the addition of a class based route for the assigned IP address on the VPN interface -->
    <DisableClassBasedDefaultRoute>true</DisableClassBasedDefaultRoute>  
      </NativeProfile> 
      <!-- use host routes(/32) to prevent routing conflicts -->  
      <Route>  
    <Address>192.168.3.5</Address>  
    <PrefixSize>32</PrefixSize>  
      </Route>  
      <Route>  
    <Address>192.168.3.4</Address>  
    <PrefixSize>32</PrefixSize>  
      </Route>  
    <!-- traffic filters for the routes specified above so that only this traffic can go over the device tunnel --> 
      <TrafficFilter>  
    <RemoteAddressRanges>192.168.3.4, 192.168.3.5</RemoteAddressRanges>  
      </TrafficFilter>
    <!-- need to specify always on = true --> 
    <AlwaysOn>true</AlwaysOn>
    <RememberCredentials>true</RememberCredentials>
    <!--new node to register client IP address in DNS to enable manage out -->
    <RegisterDNS>true</RegisterDNS>
    </VPNProfile>
   ```
1. Run PowerShell as an administrator.

1. In PowerShell, switch to the folder where *usercert.ps1* and *VPNProfile.xml* are located, and run the following command:

   ```powershell
   C:\> .\usercert.ps1 .\VPNProfile.xml UserTest
   ```
   
   MachineCertTest
1. Under **VPN Settings**, look for the **UserTest** entry, and then select **Connect**.

1. If the connection succeeds, you've successfully configured an Always On user tunnel.

## To remove a profile

To remove a profile, use the following steps:

1. Run the following command:

   ```powershell
   C:\> Remove-VpnConnection UserTest  
   ```

1. Disconnect the connection, and clear the **Connect automatically** check box.

   Cleanup

## Next steps

For more information about Virtual WAN, see the [FAQ](virtual-wan-faq.md).
