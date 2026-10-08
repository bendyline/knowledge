---
 author: duongau
 ms.service: azure-vpn-gateway
 ms.topic: include
 ms.date: 04/28/2023
 ms.author: duau
 ms.custom: include file

#Customer intent: this file is used for both virtual wan and vpn gateway articles.
---
> **Important:**
> Only iOS 11.0 and above is supported with OpenVPN protocol.
>


> **Note:**
> OpenVPN Client version 2.6 is not yet supported.
> 

1. Install the OpenVPN client (version 2.4 or higher) from the App Store. Version 2.6 is not yet supported.
1. If you haven't already done so, download the VPN client profile package from the Azure portal.
1. Unzip the profile. Open the vpnconfig.ovpn configuration file from the OpenVPN folder in a text editor.
1. Fill in the P2S client certificate section with the P2S client certificate public key in base64. In a PEM formatted certificate, you can open the .cer file and copy over the base64 key between the certificate headers.
1. Fill in the private key section with the P2S client certificate private key in base64. See [Export your private key](https://openvpn.net/as-docs/tutorials/tutorial--epki-with-openssl.html#tutorial--configure-external-pki-with-openssl) on the OpenVPN site for information about how to extract a private key.
1. Don't change any other fields.
1. E-mail the profile file (.ovpn) to your email account that is configured in the mail app on your iPhone.
1. Open the e-mail in the mail app on the iPhone, and tap the attached file.

   Screenshot shows message ready to be sent.

1. Tap **More** if you don't see **Copy to OpenVPN** option.

   Screenshot shows to tap more.

1. Tap **Copy to OpenVPN**.

   Screenshot shows to copy to OpenVPN.

1. Tap on **ADD** in the **Import Profile** page

   Screenshot shows Import profile.

1. Tap on **ADD** in the **Imported Profile** page

   Screenshot shows Imported Profile.

1. Launch the OpenVPN app and slide the switch in the **Profile** page right to connect

   Screenshot shows slide to connect.
