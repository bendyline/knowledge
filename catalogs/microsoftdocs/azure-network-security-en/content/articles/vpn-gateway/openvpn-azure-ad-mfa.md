---
title: 'Enable MFA for VPN users - Microsoft Entra ID authentication'
titleSuffix: Azure VPN Gateway
description: Learn how to enable multifactor authentication (MFA) for VPN users.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: how-to
ms.date: 01/17/2025
ms.author: duau

# Customer intent: As a network administrator, I want to enable multifactor authentication for VPN users so that I can enhance security and protect sensitive data accessed through the VPN.
---
# Enable Microsoft Entra ID multifactor authentication (MFA) for P2S VPN users


If you want users to be prompted for a second factor of authentication before granting access, you can configure Microsoft Entra multifactor authentication (MFA). You can configure MFA on a per user basis, or you can leverage MFA via [Conditional Access](https://learn.microsoft.com/azure/active-directory/conditional-access/overview).

* MFA per user can be enabled at no-additional cost. When you enable MFA per user, the user is prompted for second factor authentication against all applications tied to the Microsoft Entra tenant. See [Option 1](#peruser) for steps.
* Conditional Access allows for finer-grained control over how a second factor should be promoted. It can allow assignment of MFA to only VPN, and exclude other applications tied to the Microsoft Entra tenant. See [Option 2](#conditional) for configuration steps. For more information about Conditional Access, see [What is Conditional Access](https://learn.microsoft.com/entra/identity/conditional-access/overview)?

## <a name="enableauth"></a>Enable authentication


1. Navigate to **Microsoft Entra ID  -> Enterprise applications -> All applications**.
1. On the **Enterprise applications - All applications** page, select **Azure VPN**.


## <a name="enablesign"></a>Configure sign-in settings


On the **Azure VPN - Properties** page, configure sign-in settings.

1. Set **Enabled for users to sign-in?** to **Yes**. This setting allows all users in the AD tenant to connect to the VPN successfully.
2. Set **User assignment required?** to **Yes** if you want to limit sign-in to only users that have permissions to the Azure VPN.
3. Save your changes.

## <a name="peruser"></a>Option 1 - Per User access


### <a name="mfa"></a>Open the MFA page

1. Sign in to the Azure portal.
1. Navigate to **Microsoft Entra ID -> Users**.
1. On the **Users - All users** page, select **Per-user MFA** to open the **Per-user multifactor authentication** page.

### <a name="users"></a> Select users

1. On the **multi-factor authentication** page, select the user(s) for whom you want to enable MFA.
1. Select **Enable MFA**.

## <a name="conditional"></a>Option 2 - Conditional Access

The recommended way to enable and use Microsoft Entra multifactor authentication is with Conditional Access policies. For granular configuration steps, see the tutorial: [Require multifactor authentication](https://learn.microsoft.com/entra/identity/authentication/tutorial-enable-azure-mfa).

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com) as at least a [Conditional Access Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator).
1. Browse to **Protection** > **Security Center**>**Conditional Access**, select **+ New policy**, and then select **Create new policy**.
1. On the **New** pane, enter a name for the policy, such as VPN Policy.
1. Complete the following fields:

   | Field | Value |
   | --- | --- |
   | What does this policy apply to? | Users and groups |
   | Assignments | Specific users included |
   | Include | Select users and groups. Select the checkbox for Users and groups |
   | Select | Select at least one user or group |

1. On the **Select** page, browse for and select the Microsoft Entra user or group to which you want this policy to apply. For example, VPN Users, then choose **Select**.

Next, configure conditions for multifactor authentication. In the following steps, you configure the Azure VPN Client app to require multifactor authentication when a user signs in. For more information, see [Configure the conditions](https://learn.microsoft.com/entra/identity/authentication/tutorial-enable-azure-mfa#configure-the-conditions-for-multifactor-authentication).

1. Select the current value under **Cloud apps or actions**, and then under **Select what this policy applies to**, verify that **Cloud apps** is selected.

1. Under **Include**, choose **Select resources**. Since no apps are yet selected, the list of apps opens automatically.

1. In the **Select** pane, select the **Azure VPN Client** app, then choose **Select**.

Next, configure the access controls to require multifactor authentication during a sign-in event.

1. Under **Access controls**, select **Grant**, and then select **Grant access**.

1. Select **Require multifactor authentication**.

1. For multiple controls, select **Require all the selected controls**.

Now, activate the policy.

1. Under **Enable policy**, select **On**.

1. To apply the Conditional Access policy, select **Create**.


## Next steps

To connect to your virtual network, you must create and configure a VPN client profile. See [Configure a VPN client for P2S VPN connections](point-to-site-entra-gateway.md#download).
