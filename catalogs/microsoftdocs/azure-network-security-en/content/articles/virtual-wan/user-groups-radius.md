---
title: 'Configure vender-specific attributes for P2S User Groups - RADIUS'
titleSuffix: Azure Virtual WAN
description: Learn how to configure RADIUS/NPS for user groups to assign IP addresses from specific address pools based on identity or authentication credentials.
author: duongau
ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 04/23/2025
ms.author: duau

---
# RADIUS - Configure NPS for vendor-specific attributes - P2S user groups

This article helps you configure Windows Server Network Policy Server (NPS) to authenticate users to respond to Access-Request messages with the Vendor Specific Attribute (VSA) that is used for user group support in Virtual WAN point-to-site-VPN. For more information RADIUS and user groups for point-to-site, see [About user groups and IP address pools for P2S User VPNs](user-groups-about.md#radius-server-openvpn-and-ikev2).

The steps in the following sections help you set up a network policy on the NPS server. The NPS server replies with the specified VSA for all users who match this policy, and the value of this VSA can be used on your Virtual WAN point-to-site VPN gateway.

You can create multiple network policies on your NPS server to send different Access-Accept messages to the Virtual WAN point-to-site VPN gateway based on Active Directory group membership, or any other mechanism you'd like to support.

## Prerequisites

Verify that you have a working RADIUS server (NPS) already registered to Active Directory.

## Configure the NPS server

Use the following steps to help you configure a network policy on your NPS server. Steps might vary, depending on vendor and version. For more information about how to configure network policies, see [Network Policy Server](https://learn.microsoft.com/windows-server/networking/technologies/nps/nps-np-configure).

1. Open the Network Policy Server console, and then double-click **Policies**.
1. In the console tree, right-click **Network Policies**, and click **New**. The New Network Policy wizard opens.
1. Use the New Network Policy wizard to create a policy. Advance through the policy pages, specifying the following settings:

   | Page | Setting | Value |
   | --- | --- | --- |
   | Specify Network Policy Name and Connection Type | Policy name | Enter a name for the policy. |
   |  | Type of network access server | From the dropdown, select **Remote Access Server (VPN-Dial up)**. |
   | Specify Conditions | Conditions | Click **Add** and select **User Groups**. Then, click **Add**. You can also use other Network Policy conditions supported by your RADIUS server vendor. |
   | User Groups | Add Groups | Click **Add Groups** and select the Active Directory groups that will use this policy. Click **OK** and **OK**, then click **Next**. |
   | Specify Access Permission | Access Permission | Select **Access granted**, then **Next**. |
   | Configuration Authentication Methods | Authentication methods | Make any necessary changes. |
   | Configure Constraints | Constraints | Select any necessary settings. |
   | Configure Settings | RADIUS Attributes | Click to highlight **Vendor Specific**, then click **Add**. |
   | Add Vendor Specific Attribute | Attributes | Scroll to select **Vendor-Specific**, then click **Add**. |
   | Attribute Information | Attribute values | Select **Add**. |
   | Vendor-Specific Attribute Information | Specify network access server vendor/Specify conforms | Choose **Select from list** and select **Microsoft**.<br>Select **Yes. It conforms**. Then, click **Configure Attribute**. |
   | Configure VSA (RFC Compliant) | Vendor-assigned attribute number | 65 |
   |  | Attribute format | Hexadecimal |
   |  | Attribute value | Set this value to the VSA value configured on your VPN server configuration, such as 6ad1bd08. The VSA value should begin with **6ad1bd**. |

1. Click **OK**, and **OK** again. Then, **Close** to return to the **Configure Settings** page.
1. Click **Next**, and then **Finish** to create your policy.

## Next steps

* For more information about user groups, see [About user groups and IP address pools for P2S User VPNs](user-groups-about.md).
* To configure user groups, see [Configure user groups and IP address pools for P2S User VPNs](user-groups-create.md).
