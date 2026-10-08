---
author: duongau
ms.author: duau
ms.date: 05/26/2026
ms.service: azure-virtual-wan
ms.custom: linux-related-content
ms.topic: include
---

Virtual WAN now supports a Microsoft-registered App ID and corresponding Audience values for the latest versions of the Azure VPN Client. When you configure a P2S VPN gateway using the new Audience values, you skip the previously required Azure VPN Client app manual registration process for your Microsoft Entra tenant. The App ID is already created and your tenant is automatically able to use it with no extra registration steps. This process is more secure than manually registering the Azure VPN Client because you don't need to authorize the app or assign permissions via the Cloud App Administrator role. To better understand the difference between the types of application objects, see [How and why applications are added to Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/how-applications-are-added).

* If you configure your P2S User VPN gateway by using the audience values for the manually configured Azure VPN Client app, you can easily [change](../../../virtual-wan/point-to-site-entra-gateway-update.md) the gateway and client settings to take advantage of the new Microsoft-registered app ID.

* For this configuration, you can use a custom audience value. For more information, see [Create a custom audience app ID for P2S VPN](../../../virtual-wan/point-to-site-entra-register-custom-app.md).

**Considerations**


> **Important:**
> The Azure VPN Client for Linux (Preview) retired on 31 August, 2026. After this date, the client is no longer supported. For more information, see the **Azure VPN Client for Linux Retirement overview and migration guide** for [VPN Gateway](../../../vpn-gateway/azure-vpn-client-linux-retirement.md) and [Virtual WAN](../../../virtual-wan/azure-vpn-client-linux-retirement.md).


* A P2S User VPN gateway can only support one Audience value. It can't support multiple Audience values simultaneously.

* The latest versions of the Azure VPN Clients for macOS and Windows are backward compatible with P2S gateways configured to use the older Audience values that align with the manually registered app. These clients also support Custom Audience values.

**Azure VPN Client Audience values**

The following table shows the versions of the Azure VPN Client that are supported for each App ID and the corresponding available Audience values.


| App ID | Supported Audience values | Supported clients |
| --- | --- | --- |
| Microsoft-registered | The audience value `c632b3df-fb67-4d84-bdcf-b95ad541b5c8` applies to:<br>- Azure Public<br>- Azure Government<br>- Azure Germany<br>- Microsoft Azure operated by 21Vianet | - Windows<br>- macOS |
| Manually registered | - Azure Public: `41b23e61-6c1e-4545-b367-cd054e0ed4b4`<br>- Azure Government: `51bb15d4-3a4f-4ebf-9dca-40096fe32426`<br>- Azure Germany: `538ee9e6-310a-468d-afef-ea97365856a9`<br>- Microsoft Azure operated by 21Vianet: `49f817b6-84ae-4cc0-928c-73f27289b3aa` | - Windows<br> - macOS |
| Custom | `<custom-app-id>` | - Windows<br> - macOS |
