---
author: duongau
ms.author: duau
ms.date: 05/26/2026
ms.service: azure-vpn-gateway
ms.topic: include
ms.custom:
  - linux-related-content
  - sfi-ga-nochange
---
VPN Gateway now supports a new Microsoft-registered App ID and corresponding Audience values for the latest versions of the Azure VPN Client. When you configure a P2S VPN gateway using the new Audience values, you skip the previously required Azure VPN Client app manual registration process for your Microsoft Entra tenant. The App ID is already created and your tenant is automatically able to use it with no extra registration steps. This process is more secure than manually registering the Azure VPN Client because you don't need to authorize the app or assign permissions via the Cloud App Administrator role. To better understand the difference between the types of application objects, see [How and why applications are added to Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/how-applications-are-added).

* If your P2S User VPN gateway is configured using the Audience values for the manually configured Azure VPN Client app, you can easily [change](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/point-to-site-entra-gateway-update.md) the gateway and client settings to take advantage of the new Microsoft-registered App ID.
* If you want to create or modify a custom Audience value, see [Create a custom audience app ID for P2S VPN](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/point-to-site-entra-register-custom-app.md).
* If you want to configure or restrict access to P2S based on users and groups, see [Scenario: Configure P2S VPN access based on users and groups](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/point-to-site-entra-users-access.md).

**Considerations**

> **Important:**
> The Azure VPN Client for Linux (Preview) retired on 31 August, 2026. After this date, the client is no longer supported. For more information, see the **Azure VPN Client for Linux Retirement overview and migration guide** for [VPN Gateway](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/azure-vpn-client-linux-retirement.md) and [Virtual WAN](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-wan/azure-vpn-client-linux-retirement.md).


* A P2S VPN gateway can only support one Audience value. It can't support multiple Audience values simultaneously.

While it's possible that the Azure VPN Client for Windows might work on other operating system versions, the Azure VPN Client for Windows is only supported on the following releases:

* Supported Windows releases: Windows 11 on x64, x86, and ARM64 architectures.

* The latest versions of the Azure VPN Clients for macOS and Windows are backward compatible with P2S gateways configured to use the older Audience values that align with the manually registered app. These clients also support Custom Audience values.

> **Important:**
>Manually registered Azure VPN Clients used for Point-to-Site (P2S) connections with Microsoft Entra ID authentication will retire on March 31, 2028 in Azure Public Cloud, and on March 31, 2029 in Azure Government and Microsoft Azure operated by 21Vianet clouds.
>After these dates, manually registered clients will no longer function, and only Microsoft-registered VPN clients will be supported after the retirement dates.
>
>To avoid any service disruption, [migrate manually registered VPN clients](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/point-to-site-entra-gateway-update.md) to a Microsoft-registered VPN client for point-to-site connections with Microsoft Entra ID authentication before the applicable retirement dates.

**Azure VPN Client Audience values**

The following table shows the versions of the Azure VPN Client that are supported for each App ID and the corresponding available Audience values.


| App ID | Supported Audience values | Supported clients |
| --- | --- | --- |
| Microsoft-registered | The audience value `c632b3df-fb67-4d84-bdcf-b95ad541b5c8` applies to:<br>- Azure Public<br>- Azure Government<br>- Azure Germany<br>- Microsoft Azure operated by 21Vianet | - Windows<br>- macOS |
| Manually registered | - Azure Public: `41b23e61-6c1e-4545-b367-cd054e0ed4b4`<br>- Azure Government: `51bb15d4-3a4f-4ebf-9dca-40096fe32426`<br>- Azure Germany: `538ee9e6-310a-468d-afef-ea97365856a9`<br>- Microsoft Azure operated by 21Vianet: `49f817b6-84ae-4cc0-928c-73f27289b3aa` | - Windows<br> - macOS |
| Custom | `<custom-app-id>` | - Windows<br> - macOS |
