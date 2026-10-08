---
title: 'Microsoft Entra tenant for User VPN connections: Microsoft Entra authentication -OpenVPN'
description: You can use Azure Virtual WAN User VPN (point-to-site) to connect to your VNet using Microsoft Entra authentication
titleSuffix: Azure Virtual WAN
author: duongau
ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 10/08/2024
ms.author: duau

#Note that Audience values are not sensitive data. 
---

# Configure a Microsoft Entra tenant for P2S User VPN OpenVPN protocol connections

When you connect to your VNet using Virtual WAN User VPN (point-to-site), you have a choice of which protocol to use. The protocol you use determines the authentication options that are available to you. If you're using the OpenVPN protocol, Microsoft Entra authentication is one of the authentication options available for you to use. This article helps you configure a Microsoft Entra tenant for Virtual WAN User VPN (point-to-site) using OpenVPN authentication.

> **Note:**
> Microsoft Entra ID authentication is supported only for OpenVPN® protocol connections and requires the Azure VPN Client.
>


<a name='a-nametenanta1-create-the-azure-ad-tenant'></a>

## <a name="tenant"></a>1. Create the Microsoft Entra tenant

Verify that you have a Microsoft Entra tenant. If you don't have a Microsoft Entra tenant, you can create one using the steps in the [Create a new tenant](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-access-create-new-tenant.md) article:

* Organization name
* Initial domain name

<a name='a-nameusersa2-create-azure-ad-tenant-users'></a>

## <a name="users"></a>2. Create Microsoft Entra tenant users

1. Create two accounts in the newly created Microsoft Entra tenant. For steps, see [Add or delete a new user](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/add-users-azure-active-directory.md).

   * [Cloud Application Administrator role](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator)
   * User account

   The Cloud Application Administrator role is used to grant consent to the Azure VPN app registration. The user account can be used to test OpenVPN authentication.
1. Assign one of the accounts the **Cloud Application Administrator** role. For steps, see  [Assign administrator and non-administrator roles to users with Microsoft Entra ID](https://learn.microsoft.com/azure/active-directory-b2c/tenant-management-read-tenant-name).

## <a name="enable-authentication"></a>3. Grant consent to the Azure VPN app registration

1. Sign in to the Azure portal as a user that is assigned the **Cloud Application Administrator** role.

1. Next, grant admin consent for your organization. This allows the Azure VPN application to sign in and read user profiles. Copy and paste the URL that pertains to your deployment location in the address bar of your browser:

    Public

    ```
    https://login.microsoftonline.com/common/oauth2/authorize?client_id=41b23e61-6c1e-4545-b367-cd054e0ed4b4&response_type=code&redirect_uri=https://portal.azure.com&nonce=1234&prompt=admin_consent
    ````

    Azure Government

    ```
    https://login.microsoftonline.us/common/oauth2/authorize?client_id=51bb15d4-3a4f-4ebf-9dca-40096fe32426&response_type=code&redirect_uri=https://portal.azure.us&nonce=1234&prompt=admin_consent
    ````

    Microsoft Cloud Germany

    ```
    https://login-us.microsoftonline.de/common/oauth2/authorize?client_id=538ee9e6-310a-468d-afef-ea97365856a9&response_type=code&redirect_uri=https://portal.microsoftazure.de&nonce=1234&prompt=admin_consent
    ````

    Microsoft Azure operated by 21Vianet

    ```
    https://login.chinacloudapi.cn/common/oauth2/authorize?client_id=49f817b6-84ae-4cc0-928c-73f27289b3aa&response_type=code&redirect_uri=https://portal.azure.cn&nonce=1234&prompt=admin_consent
    ```

   > **Note:**
   > If you're using a Cloud Application Administrator account that is not native to the Microsoft Entra tenant to provide consent, replace "common" with the Microsoft Entra tenant ID in the URL. You may also have to replace "common" with your tenant ID in certain other cases as well. For help with finding your tenant ID, see [How to find your Microsoft Entra tenant ID](https://learn.microsoft.com/azure/active-directory-b2c/tenant-management-read-tenant-name).
   >

1. Select the account that has the **Cloud Application Administrator** role if prompted.

1. On the **Permissions requested** page, select **Accept**.

1. Go to **Microsoft Entra ID**. In the left pane, click **Enterprise applications**. You'll see **Azure VPN** listed.

   Screenshot of the Enterprise application page showing Azure V P N listed.


## Next steps

In order to connect to your virtual networks using Microsoft Entra authentication, you must create a User VPN configuration and associate it to a Virtual Hub. See [Configure Microsoft Entra authentication for point-to-site connection to Azure](virtual-wan-point-to-site-azure-ad.md).
