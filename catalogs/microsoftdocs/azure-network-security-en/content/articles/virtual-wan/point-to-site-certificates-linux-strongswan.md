---
title: 'Generate and export certificates for User VPN P2S: Linux - strongSwan'
description: Learn how to create a self-signed root certificate, export the public key, and to generate client certificates using the Linux (strongSwan) CLI.
titleSuffix: Azure Virtual WAN
author: duongau
ms.service: azure-virtual-wan
ms.custom: linux-related-content
ms.topic: how-to
ms.date: 03/20/2025
ms.author: duau

# The note "Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application, and carries risks that aren't present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable." is in the vpn-gateway-strongswan-certificates-include file.
---
# User VPN - Generate and export certificates - Linux (strongSwan)

This article shows you how to create a self-signed root certificate and generate client certificates using strongSwan. The steps in this exercise help you create certificate **.pem** files. If you need *.pfx* and *.cer* files instead, see the [Windows- PowerShell](certificates-point-to-site.md) instructions.

For point-to-site connections, each VPN client must have a client certificate installed locally to connect. Additionally, the root certificate public key information must be uploaded to Azure. For more information, see [P2S User VPN configuration - certificate authentication](virtual-wan-point-to-site-portal.md#p2sconfig).

## <a name="install"></a>Install strongSwan

The following steps help you install strongSwan.


The following configuration was used when specifying commands:

* Computer: Ubuntu Server 18.04
* Dependencies: strongSwan

Use the following commands to install the required strongSwan configuration:

```CLI
sudo apt-get update
```

```CLI
sudo apt-get upgrade
```

```CLI
sudo apt install strongswan
```

```CLI
sudo apt install strongswan-pki
```

```CLI
sudo apt install libstrongswan-extra-plugins
```

```CLI
sudo apt install libtss2-tcti-tabrmd0
```

## <a name="cli"></a>Linux CLI instructions (strongSwan)

The following steps help you generate and export certificates using the Linux CLI (strongSwan).
For more information, see [Additional instructions to install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-apt).


Generate the CA certificate.

  ```
  ipsec pki --gen --outform pem > caKey.pem
  ipsec pki --self --in caKey.pem --dn "CN=VPN CA" --ca --outform pem > caCert.pem
  ```

Print the CA certificate in base64 format, the format that Azure supports. You upload this certificate to Azure as part of the [P2S configuration steps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal.md).

  ```
  openssl x509 -in caCert.pem -outform der | base64 -w0 ; echo
  ```

Generate the user certificate.

> **Note:**
> Microsoft recommends that you use the most secure authentication flow available. The authentication flow described in this procedure requires a very high degree of trust in the application, and carries risks that aren't present in other flows. You should only use this flow when other more secure flows, such as managed identities, aren't viable.

  ```
  export PASSWORD="password"
  export USERNAME=$(hostnamectl --static)

  ipsec pki --gen --outform pem > "${USERNAME}Key.pem"
  ipsec pki --pub --in "${USERNAME}Key.pem" | ipsec pki --issue --cacert caCert.pem --cakey caKey.pem --dn "CN=${USERNAME}" --san "${USERNAME}" --flag clientAuth --outform pem > "${USERNAME}Cert.pem"
  ```

Generate a p12 bundle containing the user certificate. This bundle will be used in the next steps when working with the client configuration files.

  ```
  openssl pkcs12 -in "${USERNAME}Cert.pem" -inkey "${USERNAME}Key.pem" -certfile caCert.pem -export -out "${USERNAME}.p12" -password "pass:${PASSWORD}"
  ```


## Next steps

Continue with your point-to-site configuration. See  [Configure P2S VPN clients: certificate authentication - Linux](point-to-site-vpn-client-certificate-ike-linux.md).
