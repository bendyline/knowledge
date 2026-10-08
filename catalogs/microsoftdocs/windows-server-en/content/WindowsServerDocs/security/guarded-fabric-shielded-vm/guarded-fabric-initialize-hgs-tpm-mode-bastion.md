---
description: "Learn more about: Initialize the HGS cluster using TPM mode in an existing bastion forest"
title: Initialize the HGS cluster using TPM mode in a bastion forest
ms.topic: how-to
author: robinharwood
ms.author: roharwoo
ms.date: 08/29/2018
---

# Initialize the HGS cluster using TPM mode in an existing bastion forest

To initialize the HGS cluster using TPM mode in an existing bastion forest, follow the steps below. Active Directory Domain Services will be installed on the machine, but should remain unconfigured.


Locate your HGS guardian certificates. 
You will need one signing certificate and one encryption certificate to initialize the HGS cluster.
The easiest way to provide certificates to HGS is to create a password-protected PFX file for each certificate which contains both the public and private keys.
If you are using HSM-backed keys or other non-exportable certificates, make sure the certificate is installed into the local machine's certificate store before continuing.
For more information about which certificates to use, see [Obtain certificates for HGS](https://learn.microsoft.com/windows-server/virtualization/guarded-fabric-shielded-vm/guarded-fabric-obtain-certs).

<!-- Appears in guarded-fabric-initialize-hgs-ad-mode-default.md and guarded-fabric-initialize-hgs-tpm-mode-default.md
-->


Before you continue, ensure that you have prestaged your cluster objects for the Host Guardian Service and granted the logged in user **Full Control** over the VCO and CNO objects in Active Directory.
The virtual computer object name needs to be passed to the `-HgsServiceName` parameter, and the cluster name to the `-ClusterName` parameter.

> **Tip:**
> Double check your AD Domain Controllers to ensure your cluster objects have replicated to all DCs before continuing.

If you are using PFX-based certificates, run the following commands on the HGS server:

```powershell
$signingCertPass = Read-Host -AsSecureString -Prompt "Signing certificate password"
$encryptionCertPass = Read-Host -AsSecureString -Prompt "Encryption certificate password"

Install-ADServiceAccount -Identity 'HGSgMSA'

Initialize-HgsServer -UseExistingDomain -ServiceAccount 'HGSgMSA' -JeaReviewersGroup 'HgsJeaReviewers' -JeaAdministratorsGroup 'HgsJeaAdmins' -HgsServiceName 'HgsService' -SigningCertificatePath '.\signCert.pfx' -SigningCertificatePassword $signPass -EncryptionCertificatePath '.\encCert.pfx' -EncryptionCertificatePassword $encryptionCertPass -TrustTpm
```

If you are using certificates installed on the local machine (such as HSM-backed certificates and non-exportable certificates), use the `-SigningCertificateThumbprint` and `-EncryptionCertificateThumbprint` parameters instead.

In a production environment, you should continue to [add additional HGS nodes to your cluster](guarded-fabric-configure-additional-hgs-nodes.md).

## Next step

> 
> [Install TPM root certs](guarded-fabric-install-trusted-tpm-root-certificates.md)
