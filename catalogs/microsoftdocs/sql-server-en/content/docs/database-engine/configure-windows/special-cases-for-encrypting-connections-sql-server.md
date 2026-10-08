---
title: Configure Client Computer and Application for Encryption
description: Learn how to configure the client computer and application for encryption using self-signed certificates and a certificate automatically by SQL Server.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest, vanto
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
---

# Special cases for encrypting connections to SQL Server

A client computer must trust the server certificate so that the client can request Transport Layer Security (TLS) encryption, and the certificate must already exist on the server. The most common scenario for  SQL Server 
 encryption involves environments that:

- Forces encryption for all incoming client connections to  SQL Server 
.
- Use certificates from a public commercial certification authority that Windows already trusts. The corresponding root certificate for the CA is installed in the [Trusted Root Certification Authorities certificate store](https://learn.microsoft.com/windows-hardware/drivers/install/trusted-root-certification-authorities-certificate-store) on all the computers in your network.

In this scenario, you don't need to perform extra steps for successful encryption after configuring  SQL Server 
 for encryption as per the procedure described in [Encrypt connections to SQL Server by importing a certificate](configure-sql-server-encryption.md).
This article provides the procedures for encrypting connections to  SQL Server 
 for less common scenarios that aren't covered in [Encrypt connections to SQL Server by importing a certificate](configure-sql-server-encryption.md).

> **Note:**  
> For a complete list of participants in the Microsoft Trusted Root Program, see [List of Participants - Microsoft Trusted Root Program](https://learn.microsoft.com/security/trusted-root/participants-list).

## Use a certificate issued by a public commercial certificate authority and only some clients need encrypted connections

1. Configure the certificate on  SQL Server 
 as per the procedure documented in [Configure SQL Server to use certificates](configure-sql-server-encryption.md#step-1-configure-sql-server-to-use-certificates).

1. Specify the encryption keyword in connection properties to *Yes* or *True*. For example, if you're using Microsoft ODBC Driver for  SQL Server 
, the connection string should specify `Encrypt=yes;`.

## Use a certificate issued by an internal CA or created by using New-SelfSignedCertificate or makecert

### Scenario 1: You want to encrypt all the connections to SQL Server

After completing both the procedures documented in [Step 1: Configure SQL Server to use certificates](configure-sql-server-encryption.md#step-1-configure-sql-server-to-use-certificates) and [Step 2: Configure encryption settings in SQL Server](configure-sql-server-encryption.md#step-2-configure-encryption-settings-in-sql-server) in the article [Encrypt connections to SQL Server by importing a certificate](configure-sql-server-encryption.md), use one of the following options to configure your client application for encryption.

<a id="scenario1option1"></a>

**Option 1:** Configure client applications to **Trust Server Certificate**. This setting causes the client to skip the step that validates the server certificate and continue with the encryption process. For example, if you're using  SQL Server Management Studio 
 (SSMS) 20 and later versions, you can select **Trust Server Certificate** on the **Login** page (or on the **Options** page in earlier versions).

<a id="scenario1option2"></a>

**Option 2:** On each client, add the certificate's issuing authority to the trusted root authority store by performing the following steps:

1. Export the certificate from a computer that's running  SQL Server 
 by using the procedure documented in [Export server certificate](certificate-procedures.md#export-server-certificates).

1. Import the certificate by using the procedure documented in [Export and import certificates](certificate-procedures.md).

### Scenario 2: Only some clients need encrypted connections

After you configure the certificate for  SQL Server 
 use as documented in [Step 1](configure-sql-server-encryption.md#step-1-configure-sql-server-to-use-certificates) in [Encrypt connections to SQL Server by importing a certificate](configure-sql-server-encryption.md), use one of the following options to configure your client application for encryption:

<a id="scenario2option1"></a>

**Option 1**: Configure client applications to trust the server certificate and specify the encryption keyword in connection properties to *Yes* or *True*. For example, if you're using Microsoft ODBC Driver for  SQL Server 
, the connection string should specify `Encrypt=Yes;TrustServerCertificate=Yes;`.

For more information about server certificates and encryption, see [Using TrustServerCertificate](https://learn.microsoft.com/dotnet/framework/data/adonet/connection-string-syntax).

<a id="scenario2option2"></a>

**Option 2**: On each client, add the certificate's issuing authority to the trusted root authority store and specify encryption parameters to *Yes* in the connection string:

1. Export the certificate from a computer that's running  SQL Server 
 by using the procedure documented in [Export the certificate](certificate-procedures.md#export-server-certificates) from a computer that's running  SQL Server 
.

1. [Import the certificate](certificate-procedures.md#add-a-private-certification-authority-ca-to-the-trusted-root-certification-authorities-certificate-store).

1. Specify the encryption keyword in connection properties to *Yes* or *True*. For example, if you're using Microsoft OLEDB Driver for  SQL Server 
, the connection string should specify *Use Encryption for Data = True;*

## Use the self-signed certificate automatically created by SQL Server

### Scenario 1: You want to encrypt all incoming connections to SQL Server

1. Enable encryption on  SQL Server 
 using the procedure [Step 2: Configure encryption settings in SQL Server](configure-sql-server-encryption.md#step-2-configure-encryption-settings-in-sql-server) documented in [Encrypt connections to SQL Server by importing a certificate](configure-sql-server-encryption.md).

1. Configure client applications to trust the server certificate. Trusting the server certificate causes the client to skip the step that validates the server certificate and continue with the encryption process. For example, if you're using  SQL Server Management Studio 
 (SSMS) 20 and later versions, you can select **Trust Server Certificate** on the **Login** page (or on the **Options** page in earlier versions).

### Scenario 2: Only some clients need encrypted connections

Configure client applications to trust the server certificate and specify the encryption keyword in connection properties to *Yes* or *True*. For example, if you're using Microsoft ODBC Driver for  SQL Server 
, the connection string should specify `Encrypt=Yes;TrustServerCertificate=Yes;`.

No extra configuration is required on the  SQL Server 
 for this scenario.

> **Warning:**  
> TLS/SSL connections encrypted using a self-signed certificate don't provide strong security, because the length of the key in the self-signed certificates is shorter than the key in the certificates generated by the CA. They're susceptible to man-in-the-middle attacks. You shouldn't rely on TLS/SSL using self-signed certificates in a production environment or on servers connected to the Internet.

## Related content

- [SQL Server and client encryption summary](sql-server-and-client-encryption-summary.md)
