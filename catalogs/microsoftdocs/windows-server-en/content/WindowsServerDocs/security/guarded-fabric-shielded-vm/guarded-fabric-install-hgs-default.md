---
description: "Learn more about: Install HGS in a new forest"
title: Install HGS in a new forest
ms.topic: install-set-up-deploy
author: robinharwood
ms.author: roharwoo
ms.date: 08/29/2018
---

# Install HGS in a new forest

## Add the HGS server role

Run the following commands in an elevated PowerShell session to add the HGS server role and install HGS.


Add the Host Guardian Service role by running the following command:

```powershell
Install-WindowsFeature -Name HostGuardianServiceRole -IncludeManagementTools -Restart
```

<!-- Appears in guarded-fabric-install-hgs-default.md and guarded-fabric-install-hgs-in-a-bastion-forest.md and set-up-hgs-for-always-encrypted-in-sql-server.md
-->


## Install HGS


The Host Guardian Service should be installed in a separate Active Directory forest.
Ensure that the HGS machine is **not** joined to a domain before you start and sign in as the local machine Administrtor.

Run the following commands to install the Host Guardian Service and configure its domain.
The password you specify here will only apply to the Directory Services Repair Mode password for Active Directory; it will *not* change your admin account's login password.
You may provide any domain name of your choosing for -HgsDomainName.

```powershell
$adminPassword = ConvertTo-SecureString -AsPlainText '<password>' -Force

Install-HgsServer -HgsDomainName 'bastion.local' -SafeModeAdministratorPassword $adminPassword -Restart
```

<!-- Appears in guarded-fabric-install-hgs-default.md and set-up-hgs-for-always-encrypted-in-sql-server.md
-->


## Next steps

- For the next steps to set up TPM-based attestation, see [Initialize the HGS cluster using TPM mode in a new dedicated forest (default)](guarded-fabric-initialize-hgs-tpm-mode-default.md).
- For the next steps to set up host key attestation, see [Initialize the HGS cluster using key mode in a new dedicated forest (default)](guarded-fabric-initialize-hgs-key-mode-default.md).
- For the next steps to set up Admin-based attestation (deprecated in Windows Server 2019), see [Initialize the HGS cluster using AD mode in a new dedicated forest (default)](guarded-fabric-initialize-hgs-ad-mode-default.md).

## Next step

> 
> [Initialize HGS](guarded-fabric-initialize-hgs.md)
