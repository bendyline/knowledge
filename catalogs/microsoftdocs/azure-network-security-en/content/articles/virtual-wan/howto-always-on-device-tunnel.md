---
title: 'Configure an Always-On VPN tunnel'
titleSuffix: Azure Virtual WAN
description: Learn how to configure Always On VPN device tunnel for Virtual WAN.
services: virtual-wan
author: duongau

ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 08/24/2023
ms.author: duau

---
# Configure an Always On VPN device tunnel for Virtual WAN


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

## Configure the device tunnel


The following requirements must be met in order to successfully establish a device tunnel:

* The device must be a domain joined computer running Windows 10 Enterprise or Education version 1809 or later.
* The tunnel is only configurable for the Windows built-in VPN solution and is established using IKEv2 with computer certificate authentication.
* Only one device tunnel can be configured per device.

1. Install client certificates on the Windows 10 or later client using the [point-to-site VPN client](https://learn.microsoft.com/azure/vpn-gateway/point-to-site-how-to-vpn-client-install-azure-cert) article. The certificate needs to be in the Local Machine store.
1. Create a VPN Profile and configure device tunnel in the context of the LOCAL SYSTEM account using [these instructions](https://learn.microsoft.com/windows-server/remote/remote-access/vpn/vpn-device-tunnel-config#vpn-device-tunnel-configuration).

### Configuration example for device tunnel

After you have configured the virtual network gateway and installed the client certificate in the Local Machine store on the Windows 10 or later client, use the following examples to configure a client device tunnel:

1. Copy the following text and save it as ***devicecert.ps1***.

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
1. Copy the following text and save it as ***VPNProfile.xml*** in the same folder as **devicecert.ps1**. Edit the following text to match your environment.

   * `<Servers>azuregateway-1234-56-78dc.cloudapp.net</Servers> <= Can be found in the VpnSettings.xml in the downloaded profile zip file`
   * `<Address>192.168.3.5</Address> <= IP of resource in the vnet or the vnet address space`
   * `<Address>192.168.3.4</Address> <= IP of resource in the vnet or the vnet address space`

   ```
   <VPNProfile>  
     <NativeProfile>  
   <Servers>azuregateway-1234-56-78dc.cloudapp.net</Servers>  
   <NativeProtocolType>IKEv2</NativeProtocolType>  
   <Authentication>  
     <MachineMethod>Certificate</MachineMethod>  
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
   <!-- need to specify always on = true --> 
     <AlwaysOn>true</AlwaysOn> 
   <!-- new node to specify that this is a device tunnel -->  
    <DeviceTunnel>true</DeviceTunnel>
   <!--new node to register client IP address in DNS to enable manage out -->
   <RegisterDNS>true</RegisterDNS>
   </VPNProfile>
   ```
1. Download **PsExec** from [Sysinternals](https://learn.microsoft.com/sysinternals/downloads/psexec) and extract the files to **C:\PSTools**.
1. From an Admin CMD prompt, launch PowerShell by running:
   
   For 32-bit Windows:
   
   ```
   PsExec.exe -s -i powershell
   ```
   
   For 64-bit Windows:
   
   ```
   PsExec64.exe -s -i powershell
   ```

   Screenshot shows a command prompt window with a command to start the 64-bit version of PowerShell.
1. In PowerShell, switch to the folder where **devicecert.ps1** and **VPNProfile.xml** are located, and run the following command:

   ```powershell
   .\devicecert.ps1 .\VPNProfile.xml MachineCertTest
   ```
   
   Screenshot shows a PowerShell window that has run MachineCertTest by using the devicesert script.
1. Run **rasphone**.

   Screenshot shows a Run dialog box with rasphone selected.
1. Look for the **MachineCertTest** entry and click **Connect**.

   Screenshot shows a Network Connections dialog box with MachineCertTest selected and a Connect button.
1. If the connection succeeds, reboot the computer. The tunnel will connect automatically.


## To remove a profile

To remove the profile, run the following command:

Screenshot shows a PowerShell window that runs the command Remove-VpnConnection -Name MachineCertTest.

## Next steps

For more information about Virtual WAN, see the [FAQ](virtual-wan-faq.md).
