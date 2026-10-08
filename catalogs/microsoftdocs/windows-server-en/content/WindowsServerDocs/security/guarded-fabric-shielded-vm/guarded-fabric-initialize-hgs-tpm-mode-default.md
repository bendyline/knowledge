---
description: "Learn more about: Initialize the HGS cluster using TPM mode in a new dedicated forest (default)"
title: Initialize the HGS cluster using TPM mode in a new dedicated forest (default)
ms.topic: how-to
author: robinharwood
ms.author: roharwoo
ms.date: 08/29/2018
---

# Initialize the HGS cluster using TPM mode in a new dedicated forest (default)

1.  
Clients can easily contact any HGS node by using the failover clustering distributed network name (DNN). 
You'll need to choose a DNN. 
This name will be registered in the HGS DNS service. 
As an example, if you have 3 HGS nodes with hostnames HGS01, HGS02, and HGS03, you might decide to choose "hgs" or "HgsCluster" for the DNN. 


<!-- Appears in guarded-fabric-initialize-hgs-ad-mode-default.md and guarded-fabric-initialize-hgs-tpm-mode-default.md
-->


2.  
Locate your HGS guardian certificates. 
You will need one signing certificate and one encryption certificate to initialize the HGS cluster.
The easiest way to provide certificates to HGS is to create a password-protected PFX file for each certificate which contains both the public and private keys.
If you are using HSM-backed keys or other non-exportable certificates, make sure the certificate is installed into the local machine's certificate store before continuing.
For more information about which certificates to use, see [Obtain certificates for HGS](https://learn.microsoft.com/windows-server/virtualization/guarded-fabric-shielded-vm/guarded-fabric-obtain-certs).

<!-- Appears in guarded-fabric-initialize-hgs-ad-mode-default.md and guarded-fabric-initialize-hgs-tpm-mode-default.md
-->


3.  Run [Initialize-HgsServer](https://learn.microsoft.com/powershell/module/hgsserver/initialize-hgsserver) in an elevated PowerShell window on the first HGS node. The syntax of this cmdlet supports many different inputs, but the 2 most common invocations are below:

    -   If you are using PFX files for your signing and encryption certificates, run the following commands:

        ```powershell
        $signingCertPass = Read-Host -AsSecureString -Prompt "Signing certificate password"
        $encryptionCertPass = Read-Host -AsSecureString -Prompt "Encryption certificate password"

        Initialize-HgsServer -HgsServiceName 'MyHgsDNN' -SigningCertificatePath '.\signCert.pfx' -SigningCertificatePassword $signingCertPass -EncryptionCertificatePath '.\encCert.pfx' -EncryptionCertificatePassword $encryptionCertPass -TrustTpm
        ```

    -   If you are using non-exportable certificates that are installed in the local certificate store, run the following command. If you do not know the thumbprints of your certificates, you can list available certificates by running `Get-ChildItem Cert:\LocalMachine\My`.

        ```powershell
        Initialize-HgsServer -HgsServiceName 'MyHgsDNN' -SigningCertificateThumbprint '1A2B3C4D5E6F...' -EncryptionCertificateThumbprint '0F9E8D7C6B5A...' -TrustTpm
        ```

4.  
If you provided any certificates to HGS using thumbprints, you will be instructed to grant HGS read access to the private key of those certificates. 
On a server with Desktop Experience installed, complete the following steps:

1.  Open the local computer certificate manager (**certlm.msc**)
2.  Find the certificate(s) > right-click > all tasks > manage private keys
3.  Click **Add**
4.  In the object picker window, click **Object types** and enable **service accounts**
5.  Enter the name of the service account mentioned in the warning text from `Initialize-HgsServer`
6.  Ensure the gMSA has "Read" access to the private key.

On server core, you will need to download a PowerShell module to assist in setting the private key permissions.

1.  Run `Install-Module GuardedFabricTools` on the HGS server if it has Internet connectivity, or run `Save-Module GuardedFabricTools` on another computer and copy the module over to the HGS server.
2.  Run `Import-Module GuardedFabricTools`. This will add additional properties to certificate objects found in PowerShell.
3.  Find your certificate thumbprint in PowerShell with `Get-ChildItem Cert:\LocalMachine\My`
4.  Update the ACL, replacing the thumbprint with your own and the gMSA account in the code below with the account listed in the warning text of `Initialize-HgsServer`.

    ```powershell
    $certificate = Get-Item "Cert:\LocalMachine\1A2B3C..."
    $certificate.Acl = $certificate.Acl | Add-AccessRule "HgsSvc_1A2B3C" Read Allow
    ```

If you are using HSM-backed certificates, or certificates stored in a third party key storage provider, these steps may not apply to you. 
Consult your key storage provider's documentation to learn how to manage permissions on your private key. 
In some cases, there is no authorization, or authorization is provided to the entire computer when the certificate is installed.

<!-- Appears in guarded-fabric-initialize-hgs-ad-mode-default.md and guarded-fabric-initialize-hgs-tpm-mode-default.md
-->

5.  
That's it! In a production environment, you should continue to [add additional HGS nodes to your cluster](https://learn.microsoft.com/windows-server/virtualization/guarded-fabric-shielded-vm/guarded-fabric-configure-additional-hgs-nodes).


## Next step

> 
> [Install TPM root certs](guarded-fabric-install-trusted-tpm-root-certificates.md)
