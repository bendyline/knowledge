---
title: 'Virtual WAN: Microsoft Entra tenant for different user groups: Microsoft Entra authentication'
description: Set up a Microsoft Entra tenant for P2S OpenVPN authentication, and create and register multiple apps in Microsoft Entra ID to allow different access for different users and groups.
services: virtual-wan
author: duongau

ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 04/24/2023
ms.author: duau
ms.custom:
  - devx-track-azurepowershell
  - sfi-image-nochange
---
# Create a Microsoft Entra tenant for P2S OpenVPN protocol connections

When connecting to your VNet, you can use certificate-based authentication or RADIUS authentication. However, when you use the Open VPN protocol, you can also use Microsoft Entra authentication. If you want different set of users to be able to connect to different gateways, you can register multiple apps in AD and link them to different gateways.

This article helps you set up a Microsoft Entra tenant for P2S OpenVPN authentication, and create and register multiple apps in Microsoft Entra ID to allow different access for different users and groups.

> **Note:**
> Microsoft Entra authentication is supported only for OpenVPN&reg; protocol connections.
>


<a name='a-nametenanta1-create-the-azure-ad-tenant'></a>

## <a name="tenant"></a>1. Create the Microsoft Entra tenant

Create a Microsoft Entra tenant using the steps in the [Create a new tenant](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-access-create-new-tenant.md) article:

* Organizational name
* Initial domain name

  Example:

   New Microsoft Entra tenant

## <a name="users"></a>2. Create tenant users

In this step, you create two Microsoft Entra tenant users: One Global Admin account and one master user account. The master user account is used as your master embedding account (service account). When you create a Microsoft Entra tenant user account, you adjust the Directory role for the type of user that you want to create. Use the steps in [this article](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/add-users-azure-active-directory.md) to create at least two users for your Microsoft Entra tenant. Be sure to change the **Directory Role** to create the account types:

* Global Admin
* User

## <a name="register-client"></a>3. Register the VPN Client

Register the VPN client in the Microsoft Entra tenant.

1. Locate the Directory ID of the directory that you want to use for authentication. It is listed in the properties section of the Active Directory page.

    Directory ID

2. Copy the Directory ID.

3. Sign in to the Azure portal as a user that is assigned the **Global administrator** role.

4. Next, give admin consent. Copy and paste the URL that pertains to your deployment location in the address bar of your browser:

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
> If you using a global admin account that is not native to the Microsoft Entra tenant to provide consent, please replace “common” with the Microsoft Entra directory id in the URL. You may also have to replace “common” with your directory id in certain other cases as well.
>

5. Select the **Global Admin** account if prompted.

    Directory ID 2

6. On the **Permissions requested** page, select **Accept** to grant permissions to the app.

7. Under your Microsoft Entra ID, in **Enterprise applications**, you will see **Azure VPN** listed.

     Azure VPN

## <a name="register-apps"></a>4. Register additional applications

In this step, you register additional applications for various users and groups.

1. Under your Microsoft Entra ID, click **App registrations** and then **+ New registration**.

    Azure VPN 2

2. On the **Register an application** page, enter the **Name**. Select the desired **Supported account types**, then click **Register**.

    Azure VPN 3

3. Once the new app has been registered, click **Expose an API** under the app blade.

4. Click **+ Add a scope**.

5. Leave the default **Application ID URI**. Click **Save and continue**.

    Azure VPN 4

6. Fill in the required fields and ensure that **State** is **Enabled**. Click **Add scope**.

    Azure VPN 5

7. Click **Expose an API** then **+ Add a client application**.  For **Client ID**, enter the following values depending on the cloud:

    - Enter **41b23e61-6c1e-4545-b367-cd054e0ed4b4** for Azure **Public**
    - Enter **51bb15d4-3a4f-4ebf-9dca-40096fe32426** for Azure **Government**
    - Enter **538ee9e6-310a-468d-afef-ea97365856a9** for Azure **Germany**
    - Enter **49f817b6-84ae-4cc0-928c-73f27289b3aa** for Azure **China 21Vianet**

8. Click **Add application**.

    Azure VPN 6

9. Copy the **Application (client) ID** from the **Overview** page. You will need this information to configure your VPN gateway(s).

    Azure VPN 7

10. Repeat the steps in this [register additional applications](#register-apps) section to create as many applications that are needed for your security requirement. Each application will be associated to a VPN gateway and can have a different set of users. Only one application can be associated to a gateway.

## <a name="assign-users"></a>5. Assign users to applications

Assign the users to your applications.

1. Under **Microsoft Entra ID -> Enterprise applications**, select the newly registered application and click **Properties**. Ensure that **User assignment required?** is set to **yes**. Click **Save**.

    Azure VPN 8

2. On the app page, click **Users and groups**, and then click **+Add user**.

    Azure VPN 9

3. Under **Add Assignment**, click **Users and groups**. Select the users that you want to be able to access this VPN application. Click **Select**.

    Azure VPN 10


## <a name="site"></a>6. Create a new P2S configuration

A P2S configuration defines the parameters for connecting remote clients.

1. Set the following variables, replacing values as needed for your environment.

   ```azurepowershell-interactive
   $aadAudience = "00000000-abcd-abcd-abcd-999999999999"
   $aadIssuer = "https://sts.windows.net/00000000-abcd-abcd-abcd-999999999999/"
   $aadTenant = "https://login.microsoftonline.com/00000000-abcd-abcd-abcd-999999999999"    
   ```

2. Run the following commands to create the configuration:

   ```azurepowershell-interactive
   $aadConfig = New-AzVpnServerConfiguration -ResourceGroupName <ResourceGroup> -Name newAADConfig -VpnProtocol OpenVPN -VpnAuthenticationType AAD -AadTenant $aadTenant -AadIssuer $aadIssuer -AadAudience $aadAudience -Location westcentralus
   ```

   > **Note:**
   > Do not use the Azure VPN client's application ID in the commands above: It will grant all users access to the gateway. Use the ID of the application(s) you registered.

## <a name="hub"></a>7. Edit hub assignment

1. Navigate to the **Hubs** blade under the virtual WAN.

2. Select the hub that you want to associate the vpn server configuration to and click the ellipsis (...).

    Screenshot shows Edit virtual hub selected from the menu.

3. Click **Edit virtual hub**.

4. Check the **Include point-to-site gateway** check box and pick the **Gateway scale unit** that you want.

    Screenshot shows the Edit virtual hub dialog box where you can select your Gateway scale unit.

5. Enter the **Address pool** from which the VPN clients will be assigned IP addresses.

6. Click **Confirm**.

7. The operation can take up to 30 minutes to complete.

## <a name="device"></a>8. Download VPN profile

Use the VPN profile to configure your clients.

1. On the page for your virtual WAN, click **User VPN configurations**.

2. At the top of the  page, click **Download user VPN config**.

3. Once the file has finished creating, you can click the link to download it.

4. Use the profile file to configure the VPN clients.

5. Extract the downloaded zip file.

6. Browse to the unzipped "AzureVPN" folder.

7. Make a note of the location of the "azurevpnconfig.xml" file. The azurevpnconfig.xml contains the setting for the VPN connection and can be imported directly into the Azure VPN Client application. You can also distribute this file to all the users that need to connect via e-mail or other means. The user will need valid Microsoft Entra credentials to connect successfully.

## 9. Configure User VPN clients

To connect, you need to download the Azure VPN Client and import the VPN client profile that was downloaded in the previous steps on every computer that wants to connect to the VNet.

> **Note:**
> Microsoft Entra authentication is supported only for OpenVPN&reg; protocol connections.
>

#### To download the Azure VPN client

Use this [link](https://go.microsoft.com/fwlink/?linkid=2117554) to download the Azure VPN Client.

#### <a name="import"></a>To import a client profile

1. On the page, select **Import**.

    Screenshot shows Import selected from the plus menu.

2. Browse to the profile xml file and select it. With the file selected, select **Open**.

    Screenshot shows an Open dialog box where you can select a file.

3. Specify the name of the profile and select **Save**.

    Screenshot shows the Connection Name added and the Save button selected.

4. Select **Connect** to connect to the VPN.

    Screenshot shows the Connect button for the for the connection you just created.

5. Once connected, the icon will turn green and say **Connected**.

    Screenshot shows the connection in a Connected status with the option to disconnect.

#### <a name="delete"></a>To delete a client profile

1. Select the ellipsis (...) next to the client profile that you want to delete. Then, select **Remove**.

    Screenshot shows Remove selected from the menu.

2. Select **Remove** to delete.

    Screenshot shows a confirmation dialog box with the option to Remove or Cancel.

#### <a name="diagnose"></a>To diagnose connection issues

1. To diagnose connection issues, you can use the **Diagnose** tool. Select the ellipsis (...) next to the VPN connection that you want to diagnose to reveal the menu. Then select **Diagnose**.

    Screenshot shows Diagnose selected from the menu.

2. On the **Connection Properties** page, select **Run Diagnosis**.

    Screenshot shows the Run Diagnosis button for a connection.

3. Sign in with your credentials.

    diagnose 3

4. View the diagnosis results.

    Screenshot shows the Run Diagnosis button for a connection.

3. Sign in with your credentials.

    Screenshot shows the Sign in dialog box for this action.

4. View the diagnosis results.

    Screenshot shows the results of the diagnosis.

## <a name="viewwan"></a>10. View your virtual WAN

1. Navigate to the virtual WAN.

2. On the Overview page, each point on the map represents a hub.

3. In the Hubs and connections section, you can view hub status, site, region, VPN connection status, and bytes in and out.

## <a name="cleanup"></a>Clean up resources

When you no longer need these resources, you can use [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) to remove the resource group and all of the resources it contains. Replace "myResourceGroup" with the name of your resource group and run the following PowerShell command:

```azurepowershell-interactive
Remove-AzResourceGroup -Name myResourceGroup -Force
```

## Next steps

To learn more about Virtual WAN, see the [Virtual WAN Overview](virtual-wan-about.md) page.
