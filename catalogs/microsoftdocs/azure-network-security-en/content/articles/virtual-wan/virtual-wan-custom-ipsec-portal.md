---
title: 'Configure a custom IPsec policy for Azure Virtual WAN: Portal'
description: Learn how to configure a custom IPsec policy for Azure Virtual WAN using the portal.
services: virtual-wan
author: duongau

ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 12/12/2024
ms.author: duau
ms.custom: sfi-image-nochange

---
# Configure a custom IPsec policy for Virtual WAN using the portal

You can configure a custom IPsec policy for a Virtual WAN VPN connection in the Azure portal. Custom policies are helpful when you want both sides (on-premises and Azure VPN gateway) to use the same settings for IKE Phase 1 and IKE Phase 2.

## Working with custom policies


When working with custom IPsec policies, keep in mind the following requirements:

* **IKE** - For IKE, you can select any parameter from IKE Encryption, plus any parameter from IKE Integrity, plus any parameter from DH Group.
* **IPsec** -  For IPsec, you can select any parameter from IPsec Encryption, plus any parameter from IPsec Integrity, plus PFS. If any of the parameters for IPsec Encryption or IPsec Integrity is GCM, then the parameters for both settings must be GCM.

Custom IKE main mode policies support Diffie-Hellman Group 14, Group 24, or ECP (Elliptic Curve Groups) ECP256 (Group 19) and ECP384 (Group 20). Similar cryptographic group requirements apply to IPsec quick mode policies.

The default custom policy includes SHA1, DHGroup2, and 3DES for backward compatibility. These are weaker algorithms that aren't supported when creating a custom policy. We recommend only using the following algorithms:

**Available settings and parameters**

| Setting | Parameters |
| --- | --- |
| IKE Encryption | GCMAES256, GCMAES128, AES256, AES128 |
| IKE Integrity | SHA384, SHA256 |
| DH Group | ECP384, ECP256, DHGroup24, DHGroup14 |
| IPsec Encryption | GCMAES256, GCMAES128, AES256, AES128, None |
| IPsec Integrity | GCMAES256, GCMAES128, SHA256 |
| PFS Group | ECP384, ECP256, PFS24, PFS14, None |
| SA Lifetime | integer; min. 300/ default 3600 seconds |

The following table lists the corresponding Diffie-Hellman groups that the custom policy supports:

| Diffie-Hellman group | DHGroup | PFSGroup | Key length |
| --- | --- | --- | --- |
| 14 | DHGroup14 | PFS14 | 2048-bit MODP |
| 19 | ECP256 | ECP256 | 256-bit ECP |
| 20 | ECP384 | ECP384 | 384-bit ECP |
| 24 | DHGroup24 | PFS24 | 2048-bit MODP |


## Configure a policy

1. **Locate the virtual hub**. In the Azure portal, go to your Virtual WAN resource and locate the virtual hub that your VPN site is connected to.

1. **Select the VPN site**. From the hub overview page, click **VPN (Site to site)** and select the VPN Site for which you want to set up a custom IPsec policy.

1. **Edit the VPN connection**. From the **Context menu** **...**, select **Edit VPN Connection**.

   Screenshot shows how to use the context menu to edit the policy.

1. **Configure the settings**. On the **Edit VPN connection** page, change the IPsec setting from default to custom and customize the IPsec policy. Select **Save** to save your settings.

   Screenshot shows how to configure and save the policy.

## Next steps

To learn more about Virtual WAN, see the [Virtual WAN Overview](virtual-wan-about.md) page.
