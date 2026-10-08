---
title: Encrypt Connections to SQL Server on Linux
description: SQL Server on Linux uses TLS to encrypt data transmitted across a network between a client application and an instance of SQL Server.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: amitkh, atsingh
ms.date: 05/19/2026
ms.service: sql
ms.subservice: linux
ms.topic: how-to
ms.custom:
  - linux-related-content
helpviewer_keywords:
  - "Linux, encrypted connections"
---
# Encrypt connections to SQL Server on Linux


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


 SQL Server 
 on Linux can use Transport Layer Security (TLS) to encrypt data that is transmitted across a network between a client application and an instance of  SQL Server 
.

## Operating system support

 SQL Server 
 supports the same TLS protocols on both Windows and Linux: 1.3, 1.2, 1.1, and 1.0.

Starting in  SQL Server 2025 (17.x) 
:

- TLS 1.3 is enabled by default
- SUSE Linux Enterprise Server (SLES) isn't supported

The steps to configure TLS are specific to the operating system on which  SQL Server 
 is running.

> **Note:**  
> TLS is not supported for Always On availability group database mirroring endpoints.

## Requirements for certificates

Make sure your certificates follow these requirements:

- The current system time must be after the `Valid from` property of the certificate and before the `Valid to` property of the certificate.

- The certificate must be meant for server authentication. This requires the `Enhanced Key Usage` property of the certificate to specify `Server Authentication (1.3.6.1.5.5.7.3.1)`.

- The certificate must be created by using the `KeySpec` option of `AT_KEYEXCHANGE`. Usually, the certificate's key usage property (`KEY_USAGE`) also includes key encipherment (`CERT_KEY_ENCIPHERMENT_KEY_USAGE`).

- The `Subject` property of the certificate must indicate that the common name (CN) is the same as the host name or fully qualified domain name (FQDN) of the server computer.

  > **Note:**  
  > Wildcard certificates are supported.

## Configure the OpenSSL libraries for use (optional)

You can create symbolic links in the `/opt/mssql/lib/` directory that reference which `libcrypto.so` and `libssl.so` libraries should be used for encryption. This is useful if you want to force  SQL Server 
 to use a specific version of OpenSSL other than the default provided by the system. If these symbolic links aren't present,  SQL Server 
 loads the default configured OpenSSL libraries on the system.

These symbolic links should be named `libcrypto.so` and `libssl.so` and placed in the `/opt/mssql/lib/` directory.

> **Note:**  
> For an example of using Let's Encrypt to generate a certificate, see the blog post [Unlock the power of data in Azure with SQL Server on Linux Azure VMs and Azure AI search](https://techcommunity.microsoft.com/blog/sqlserver/unlock-power-of-data-in-azure--with-sql-server-on-linux-azure-vms-and-azure-ai-s/4144582).

## Overview

TLS is used to encrypt connections from a client application to  SQL Server 
. When configured correctly, TLS provides both privacy and data integrity for communications between the client and the server. TLS connections can either be client initiated or server initiated.

> **Note:**  
> TLS is not supported for Always On availability group database mirroring endpoints.

## [Client initiated encryption](#tab/client)

The following section describes setting up client initiated encryption.

### Generate certificate

`/CN` should match your  SQL Server 
 host's fully qualified domain name.

> **Caution:**  
> This example uses a self-signed certificate. Self-signed certificates shouldn't be used for production scenarios. You should use CA certificates.

Ensure that the folders where you save your certificates and private keys are accessible by the `mssql` user or group and have permissions set to `700` (`drwx------`). You can create folders manually with permissions set to `700` (`drwx------`) and owned by the `mssql` user or group. Alternatively, set the permissions to `755` (`drwxr-xr-x`) and make sure the folders are accessible to the `mssql` group. For example, you can create a folder called `sslcert` under the path `/var/opt/mssql/` and save the certificate and the private key with permissions on the files set to `600`, as shown in the following sample.

```bash
openssl req -x509 -nodes -newkey rsa:2048 -subj '/CN=mssql.contoso.com' -keyout mssql.key -out mssql.pem -days 365
sudo chown mssql:mssql mssql.pem mssql.key
sudo chmod 600 mssql.pem mssql.key
# Save the certificate to the certs folder under /etc/ssl/
sudo mv mssql.pem /etc/ssl/certs/
# Save the private key to the private folder under /etc/ssl/
sudo mv mssql.key /etc/ssl/private/
```

### Configure SQL Server

For  SQL Server 2022 (16.x) 
 and earlier versions:

```bash
systemctl stop mssql-server
sudo cat /var/opt/mssql/mssql.conf
sudo /opt/mssql/bin/mssql-conf set network.tlscert /etc/ssl/certs/mssql.pem
sudo /opt/mssql/bin/mssql-conf set network.tlskey /etc/ssl/private/mssql.key
sudo /opt/mssql/bin/mssql-conf set network.tlsprotocols 1.2
sudo /opt/mssql/bin/mssql-conf set network.forceencryption 0
systemctl restart mssql-server
```

For  SQL Server 2025 (17.x) 
:

```bash
systemctl stop mssql-server
sudo cat /var/opt/mssql/mssql.conf
sudo /opt/mssql/bin/mssql-conf set network.tlscert /etc/ssl/certs/mssql.pem
sudo /opt/mssql/bin/mssql-conf set network.tlskey /etc/ssl/private/mssql.key
sudo /opt/mssql/bin/mssql-conf set network.forceencryption 0
systemctl restart mssql-server
```

### Register the certificate on your client machine (Windows, Linux, or macOS)

- If you're using a CA-signed certificate, copy the Certificate Authority (CA) certificate instead of the user certificate to the client machine.

- If you're using the self-signed certificate, copy the `.pem` file to the folder for your distribution and run the command to enable it:

  - **Ubuntu**: Copy the certificate to `/usr/share/ca-certificates/`, rename its extension to `.crt`, and use `dpkg-reconfigure ca-certificates` to enable it as a system CA certificate.

  - **RHEL**: Copy the certificate to `/etc/pki/ca-trust/source/anchors/` and use `update-ca-trust` to enable it as a system CA certificate.

  - **SUSE**: Copy the certificate to `/usr/share/pki/trust/anchors/` and use `update-ca-certificates` to enable it as a system CA certificate.

  - **Windows**: Import the `.pem` file as a certificate under **Current User** > **Trusted Root Certification Authorities** > **Certificates**.

  - **macOS**:

    - Copy the certificate to `/usr/local/etc/openssl/certs`.
    - Run the following command to get the hash value:

      ```bash
      /usr/local/Cellar/openssl/1.0.2l/openssl x509 -hash -in mssql.pem -noout
      ```

    - Rename the certificate to the value. For example, use `mv mssql.pem dc2dd900.0`. Make sure `dc2dd900.0` is in `/usr/local/etc/openssl/certs`.

### Example connection strings

> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


- ** SQL Server Management Studio 
**

  Screenshot of SQL Server Management Studio connection dialog.

- **`sqlcmd`**

  `sqlcmd -S <sqlhostname> -N -U sa -P '<password>'`

- **ADO.NET**

  `"Encrypt=True; TrustServerCertificate=False;"`

- **ODBC**

  `"Encrypt=Yes; TrustServerCertificate=no;"`

- **JDBC**

  `"encrypt=true; trustServerCertificate=false;"`

## [Server initiated encryption](#tab/server)

The following section describes setting up server initiated encryption.

### Generate certificate

`/CN` should match your  SQL Server 
 host's fully qualified domain name.

> **Caution:**  
> This example uses a self-signed certificate. Self-signed certificates shouldn't be used for production scenarios. You should use CA certificates.

```bash
openssl req -x509 -nodes -newkey rsa:2048 -subj '/CN=mssql.contoso.com' -keyout mssql.key -out mssql.pem -days 365
sudo chown mssql:mssql mssql.pem mssql.key
sudo chmod 600 mssql.pem mssql.key
sudo mv mssql.pem /etc/ssl/certs/
sudo mv mssql.key /etc/ssl/private/
```

### Configure SQL Server

For  SQL Server 2022 (16.x) 
 and earlier versions:

```bash
systemctl stop mssql-server
sudo cat /var/opt/mssql/mssql.conf
sudo /opt/mssql/bin/mssql-conf set network.tlscert /etc/ssl/certs/mssql.pem
sudo /opt/mssql/bin/mssql-conf set network.tlskey /etc/ssl/private/mssql.key
sudo /opt/mssql/bin/mssql-conf set network.tlsprotocols 1.2
sudo /opt/mssql/bin/mssql-conf set network.forceencryption 1
systemctl restart mssql-server
```

For  SQL Server 2025 (17.x) 
:

```bash
systemctl stop mssql-server
sudo cat /var/opt/mssql/mssql.conf
sudo /opt/mssql/bin/mssql-conf set network.tlscert /etc/ssl/certs/mssql.pem
sudo /opt/mssql/bin/mssql-conf set network.tlskey /etc/ssl/private/mssql.key
sudo /opt/mssql/bin/mssql-conf set network.forceencryption 1
systemctl restart mssql-server
```

### Example connection strings

> **Caution:**  
> Your password should follow the  SQL Server 
 default [password policy](../../relational-databases/security/password-policy.md). By default, the password must be at least eight characters long and contain characters from three of the following four sets: uppercase letters, lowercase letters, base-10 digits, and symbols. Passwords can be up to 128 characters long. Use passwords that are as long and complex as possible.


- **`sqlcmd`**

  `sqlcmd -S <sqlhostname> -U sa -P '<password>'`

- **ADO.NET**

  `"Encrypt=False; TrustServerCertificate=False;"`

- **ODBC**

  `"Encrypt=no; TrustServerCertificate=no;"`

- **JDBC**

  `"encrypt=false; trustServerCertificate=false;"`

> **Note:**  
> Set `TrustServerCertificate` to `True` if the client can't connect to the CA, to validate the authenticity of the certificate.

---

## Common connection errors

| Error message | Fix |
| --- | --- |
| `The certificate chain was issued by an authority that is not trusted.` | This error occurs when clients are unable to verify the signature on the certificate presented by  SQL Server |
 | during the TLS handshake. Make sure the client trusts either the  SQL Server |
 | certificate directly, or the CA that signed the  SQL Server |
 | certificate. |
| `The target principal name is incorrect.` | Make sure that the common name field on  SQL Server |
| 's certificate matches the server name specified in the client's connection string. |
| `An existing connection was forcibly closed by the remote host.` | This error can occur when the client doesn't support the TLS protocol version required by  SQL Server |
| . For example, if  SQL Server |
 | is configured to require TLS 1.2, make sure your clients also support the TLS 1.2 protocol. |

### Ubuntu 20.04 and other recent Linux distribution releases

#### Symptom

When a  SQL Server 
 on Linux instance loads a certificate that was created with a signature algorithm using less than 112 bits of security (examples: MD5, SHA-1), you might observe a connection failure error, like this example:

```output
A connection was successfully established with the server, but then an error occurred during the login process. (provider: SSL Provider, error: 0 - An existing connection was forcibly closed by the remote host.) (Microsoft SQL Server, Error: 10054)
```

The error is due to OpenSSL security level 2 being enabled by default on Ubuntu 20.04 and later versions. Security level 2 prohibits TLS connections that have less than 112 bits of security from being established.

#### Solution

Install a certificate with a signature algorithm using at least 112 bits of security. Signature algorithms that satisfy this requirement include SHA-224, SHA-256, SHA-384, and SHA-512.
