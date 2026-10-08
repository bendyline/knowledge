## <a name="windows"></a>Windows clients


1. Download and install the OpenVPN client (version 2.4 or higher) from the official [OpenVPN website](https://openvpn.net/index.php/open-source/downloads.html).
1. Locate the VPN client profile configuration package that you generated and downloaded to your computer. Extract the package. Go to the OpenVPN folder and open the *vpnconfig.ovpn* configuration file using Notepad.
1. Next, locate the child certificate you created. If you don't have the certificate, use one of the following links for steps to export the certificate. You'll use the certificate information in the next step.

   * [VPN Gateway](https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-certificates-point-to-site#clientexport) instructions
   * [Virtual WAN](https://learn.microsoft.com/azure/virtual-wan/certificates-point-to-site#clientexport) instructions
1. From the child certificate, extract the private key and the base64 thumbprint from the *.pfx*. There are multiple ways to do this. Using OpenSSL on your computer is one way. The *profileinfo.txt* file contains the private key and the thumbprint for the CA and the Client certificate. Be sure to use the thumbprint of the client certificate.

   ```
   openssl pkcs12 -in "filename.pfx" -nodes -out "profileinfo.txt"
   ```
1. Switch to the **vpnconfig.ovpn** file you opened in Notepad. Fill in the section between `<cert>` and `</cert>`, getting the values for `$CLIENT_CERTIFICATE`, `$INTERMEDIATE_CERTIFICATE`, and `$ROOT_CERTIFICATE` as shown in the following example.

   ```
      # P2S client certificate
      # please fill this field with a PEM formatted cert
      <cert>
      $CLIENT_CERTIFICATE
      $INTERMEDIATE_CERTIFICATE (optional)
      $ROOT_CERTIFICATE
      </cert>
      ```

   * Open **profileinfo.txt** from the previous step in Notepad. You can identify each certificate by looking at the `subject=` line. For example, if your child certificate is called P2SChildCert, your client certificate will be after the `subject=CN = P2SChildCert` attribute.
   * For each certificate in the chain, copy the text (including and between) "-----BEGIN CERTIFICATE-----" and "-----END CERTIFICATE-----".
   * Only include an  `$INTERMEDIATE_CERTIFICATE` value if you have an intermediate certificate in your *profileinfo.txt* file.
1. Open the *profileinfo.txt* in Notepad. To get the private key, select the text (including and between) "-----BEGIN PRIVATE KEY-----" and "-----END PRIVATE KEY-----" and copy it.
1. Go back to the vpnconfig.ovpn file in Notepad and find this section. Paste the private key replacing everything between and `<key>` and `</key>`.

   ```
   # P2S client root certificate private key
   # please fill this field with a PEM formatted key
   <key>
   $PRIVATEKEY
   </key>
   ```

1. If you're using the 2.6 version of the OpenVPN client, add the "disable-dco" option to the profile. This option doesn't seem to be backward compatible with previous versions, so it should only be added to OpenVPN client version 2.6.
1. Don't change any other fields. Use the filled in configuration in client input to connect to the VPN.
1. Copy the vpnconfig.ovpn file to C:\Program Files\OpenVPN\config folder.
1. Right-click the OpenVPN icon in the system tray and click **Connect**.

## <a name="macOS"></a>macOS clients


> **Important:**
> Only macOS 10.13 and above is supported with OpenVPN protocol.


> **Note:**
> OpenVPN Client version 2.6 is not yet supported.
> 

1. Download and install an OpenVPN client, such as [TunnelBlick](https://tunnelblick.net/downloads.html).

1. Download the VPN client profile package from the Azure portal.

1. Unzip the profile. Open the vpnconfig.ovpn configuration file from the OpenVPN folder in a text editor.

1. Fill in the P2S client certificate section with the P2S client certificate public key in base64. In a PEM formatted certificate, you can open the .cer file and copy over the base64 key between the certificate headers.

1. Fill in the private key section with the P2S client certificate private key in base64. See [Export your private key](https://openvpn.net/community-docs/how-to.html#pki) on the OpenVPN site for information about how to extract a private key.

1. Don't change any other fields. Use the filled in configuration in client input to connect to the VPN.

1. Double-click the profile file to create the profile in Tunnelblick.

1. Launch Tunnelblick from the applications folder.

1. Click on the Tunnelblick icon in the system tray and pick connect.


## <a name="iOS"></a>iOS clients

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

## <a name="linux"></a>Linux clients



> **Note:**
> OpenVPN Client version 2.6 is not yet supported.
> 

1. Open a new Terminal session. You can open a new session by pressing 'Ctrl + Alt + t' at the same time.

1. Enter the following command to install needed components:

   ```
   sudo apt-get install openvpn
   sudo apt-get -y install network-manager-openvpn
   sudo service network-manager restart
   ```
1. Download the VPN profile for the gateway. This can be done from the Point-to-site configuration tab in the Azure portal.

1. Export the P2S client certificate you created and uploaded to your P2S configuration on the gateway. See [Virtual WAN point-to-site](../articles/virtual-wan/certificates-point-to-site.md#clientexport) for instructions.

1. Extract the private key and the base64 thumbprint from the .pfx. There are multiple ways to do this. Using OpenSSL on your computer is one way.

   ```
   openssl pkcs12 -in "filename.pfx" -nodes -out "profileinfo.txt"
   ```

   The *profileinfo.txt* file will contain the private key and the thumbprint for the CA, and the Client certificate. Be sure to use the thumbprint of the client certificate.

1. Open *profileinfo.txt* in a text editor. To get the thumbprint of the client (child) certificate, select the text including and between "-----BEGIN CERTIFICATE-----" and "-----END CERTIFICATE-----" for the child certificate and copy it. You can identify the child certificate by looking at the subject=/ line.

1. Open the *vpnconfig.ovpn* file and find the section shown below. Replace everything between "cert" and "/cert".

   ```
   # P2S client certificate
   # please fill this field with a PEM formatted cert
   <cert>
   $CLIENTCERTIFICATE
   </cert>
   ```

1. Open the profileinfo.txt in a text editor. To get the private key, select the text including and between "-----BEGIN PRIVATE KEY-----" and "-----END PRIVATE KEY-----" and copy it.

1. Open the vpnconfig.ovpn file in a text editor and find this section. Paste the private key replacing everything between "key" and "/key".

   ```
   # P2S client root certificate private key
   # please fill this field with a PEM formatted key
   <key>
   $PRIVATEKEY
   </key>
   ```

1. Don't change any other fields. Use the filled in configuration in client input to connect to the VPN.

1. To connect using the command line, type the following command:
  
    ```
    sudo openvpn --config <name and path of your VPN profile file>&
    ```

1. To connect using the GUI, go to system settings.

1. Click **+** to add a new VPN connection.

1. Under **Add VPN**, pick **Import from file…**.

1. Browse to the profile file and double-click or pick **Open**.

1. Click **Add** on the **Add VPN** window.
  
   Screenshot shows Import from file on the Add VPN page.

1. You can connect by turning the VPN **ON** on the **Network Settings** page, or under the network icon in the system tray.



## Original source metadata

```text
---
 author: duongau
 ms.service: vpn-gateway
ms.custom: linux-related-content
 ms.topic: include
 ms.date: 05/04/2023
 ms.author: duau
#Customer intent: this file is used for both virtual wan and vpn gateway articles.
---
```
