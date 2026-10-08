---
title: 'Azure Virtual WAN partners, regions, and available locations'
description: This article contains a list of Azure Virtual WAN partners and available locations.
author: duongau

ms.service: azure-virtual-wan
ms.topic: concept-article
ms.date: 03/05/2024
ms.author: duau
ms.custom: references_regions
# Customer intent: As someone with a networking background, I want to learn more about Branch IPsec connectivity automation
---
# Virtual WAN Branch IPsec connectivity automation 

This article provides information on Virtual WAN partners for connectivity into a Virtual WAN hub.

There are two types of offerings that make connecting to Azure easier:

* **Network Virtual Appliances (NVAs) deployed in a Virtual WAN hub**: Customers can deploy Network Virtual Appliances directly into a Virtual WAN hub. This solution is jointly managed by Microsoft Azure and third-party Network Virtual Appliance solution providers. To learn more about NVAs deployed in a Virtual WAN hub, see [About NVAs in a Virtual WAN hub](about-nva-hub.md).
* **Branch IPsec connectivity automation**: Customers can automatically configure and connect their branch devices to the Azure Virtual WAN Site-to-site VPN gateway using IPsec tunnels. These configurations are typically set up in the device-management UI (or equivalent).

## Partners with integrated virtual hub offerings

Some partners offer Network Virtual Appliances (NVAs) that can be deployed directly into the Azure Virtual WAN hub through a solution that is jointly managed by Microsoft Azure and third-party Network Virtual Appliance solution providers.

When a Network Virtual Appliance is deployed into a Virtual WAN hub, it can serve as a third-party gateway with various functionalities. It could serve as an SD-WAN gateway, Firewall or a combination of both. For more information about  deploying an NVA into a Virtual WAN hub and available partners, see [About NVAs in a Virtual WAN hub](about-nva-hub.md).



## <a name="automation"></a>Branch IPsec connectivity automation from partners

Devices that connect to Azure Virtual WAN have built-in automation to connect. This is typically set up in the device-management UI (or equivalent), which sets up the connectivity and configuration management between the VPN branch device to an Azure Virtual hub VPN endpoint (VPN gateway).

The following high-level automation is set up in the device console/management center:

* Appropriate permissions for the device to access Azure Virtual WAN Resource Group.
* Uploading of Branch Device into Azure Virtual WAN.
* Automatic download of Azure connectivity information.
* Configuration of on-premises branch device.

Some connectivity partners may extend the automation to include creating the Azure Virtual hub VNet and VPN gateway. If you want to know more about automation, see [Automation guidelines for Virtual WAN partners](virtual-wan-configure-automation-providers.md).

## <a name="partners"></a>Branch IPsec connectivity partners


You can check the links in this section for more information about services offered by partners. If your branch device partner isn't listed in the section below, have your branch device provider contact us. They can contact us by sending an email to azurevirtualwan@microsoft.com.

| Partners | Configuration/How-to/Deployment Guide |
| --- | --- |
| [Barracuda Networks](https://www.barracuda.com/AzurevWAN) | [Barracuda CloudGen Firewall: Azure Virtual WAN](https://campus.barracuda.com/doc/79463435/) |
| [Check Point](https://www.checkpoint.com/solutions/microsoft-azure-virtual-wan/) | [Check Point for the Microsoft Azure Virtual WAN Quick Start Guide](https://sc1.checkpoint.com/documents/IaaS/WebAdminGuides/EN/CP_CloudGuard_Network_for_Azure_vWAN/Content/Topics-Azure-vWAN/Introduction.htm?tocpath=Introduction%7C_____0) |
| [Cisco Meraki](https://documentation.meraki.com/MX/Deployment_Guides/Cisco_Meraki_MX_Branch_to_Azure_Virtual_WAN_Deployment_Guide) | [Azure Virtual WAN Cisco Meraki Deployment Guide](https://documentation.meraki.com/MX/Deployment_Guides/Cisco_Meraki_MX_Branch_to_Azure_Virtual_WAN_Deployment_Guide) and [vMX and Azure vWAN](https://documentation.meraki.com/MX/Deployment_Guides/vMX_and_Azure_vWAN) |
| [Citrix](https://www.citrix.com/) | [Using Citrix SD-WAN to connect to Microsoft Azure Virtual WAN](https://docs.citrix.com/en-us/citrix-sd-wan-center/11/azure-virtual-wan/configure-azure-virtual-wan.html#how-does-microsoft-azure-virtual-wan-work) |
| [CloudGenix](https://login.elcapitan.cloudgenix.com/sign-in.html) | [CloudGenix Azure Virtual WAN CloudBlade Deployment Guide](https://login.elcapitan.cloudgenix.com/sign-in.html) |
| [Fortinet](https://www.fortinet.com/) | [FortiGate and Microsoft Azure Virtual WAN Integration deployment guide](https://www.fortinet.com/content/dam/fortinet/assets/deployment-guides/DG-FortiGate-IBM-Qradar.pdf),[Routing Scenario Blog](https://www.fortinet.com/blog/business-and-technology/fortinet-secure-sd-wan-enhances-azure-virtual-wan-integrations) |
| [HPE Aruba](https://arubanetworking.hpe.com/) | [Aruba SD-WAN and Microsoft Azure Virtual WAN Deployment Guide](https://arubanetworking.hpe.com/techdocs/sdwan-PDFs/deployments/dg_ECV-Azure_latest.pdf) |
| [NetFoundry](https://netfoundry.io) | [Netfoundry Support Hub: Azure Virtual WAN](https://support.netfoundry.io/hc/articles/360054527871-Configure-NetFoundry-Network-for-Azure-Windows-Virtual-Desktop-Short-Path) |
| [Nuage/Nokia](https://www.nokia.com/) | [Nuage and Azure Virtual WAN Deployment Guide](https://onestore.nokia.com/asset/210073) |
| [Open Systems](https://open-systems.com/solutions/microsoft-azure-virtual-wan) | [Open Systems and Azure Virtual WAN Deployment Guide](https://open-systems.com/wp-content/uploads/2020/07/Azure-Virtual-WAN-UserGuide.pdf) |
| [Palo Alto Networks](https://www.paloaltonetworks.com/blog/2018/09/) | [Palo Alto Networks Azure Virtual WAN Deployment Guide](https://github.com/PaloAltoNetworks/microsoft_azure_virtual_wan) |
| [Riverbed Technology](https://www.riverbed.com/technical-alliance-microsoft/) | [Azure Virtual WAN & SteelConnect EX](https://www.riverbed.com/technical-alliance-microsoft/) |
| [Silver-Peak (HPE)](https://www.hpe.com/us/en/alliance/microsoft.html) | [EdgeConnect and Microsoft Azure Virtual WAN Integration Guide](https://arubanetworking.hpe.com/techdocs/sdwan/) |
| [VMware SD-WAN](https://www.vmware.com/docs/sdwan-997-azure-vmware-solution-sd-wan-so-0921) | [Azure Virtual WAN VMware SD-WAN Deployment Guide](https://www.vmware.com/docs/sdwan-997-azure-vmware-solution-sd-wan-so-0921) |
| [Versa](https://www.versa-networks.com/partners/microsoft-azure) | [Configuring Versa SD-WAN and Microsoft Azure vWAN (Available for registered customers)](https://docs.versa-networks.com/Versa_Director/Versa_Director_Configuration/Integrate_Director_and_Azure_Virtual_WAN) |
| [F5](https://www.f5.com/resources/deployment-guides) | [Azure Virtual WAN F5 Deployment Guide](https://www.f5.com/pdf/deployment-guide/f5-big-ip-and-azure-virtual-wan-deployment-guide.pdf) |
| [Cato Networks](https://support.catonetworks.com/hc/en-us) | [Azure Virtual WAN Cato Networks Deployment Guide](https://support.catonetworks.com/hc/en-us/articles/24728632513821-Integrating-Cato-with-Azure-vWAN) |

*\* Direct link unavailable. Contact partner company for support.*


The following partners are slated on our roadmap based on a terms sheet signed between the companies indicating the scope of work to automate IPsec connectivity between the partner device and Azure Virtual WAN VPN gateways: 128 Technologies, Arista, F5 Networks, Oracle SD-WAN (Talari), and SharpLink.

## Next steps

* For more information about Virtual WAN, see the [Virtual WAN FAQ](virtual-wan-faq.md).

* For more information about how to automate connectivity to Azure Virtual WAN, see [Automation guidelines for Virtual WAN partners](virtual-wan-configure-automation-providers.md).
