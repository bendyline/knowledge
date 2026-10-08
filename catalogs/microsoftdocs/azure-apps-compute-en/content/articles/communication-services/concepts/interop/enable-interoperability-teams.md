---
title: Enable interoperability with Teams
titleSuffix: An Azure Communication Services concept document
description: Enable interoperability with Teams
author: jamescadd
ms.author: jacadd
ms.date: 4/15/2024
ms.topic: concept-article
ms.service: azure-communication-services
ms.subservice: teams-interop
ms.custom: mode-other
---

# Enable interoperability between Azure Communication Services and a Microsoft Teams tenant


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Azure Communication Services can be used to build applications that enable Microsoft Teams external users to participate in calls and meetings with Microsoft Teams users. [Standard Azure Communication Services pricing](https://azure.microsoft.com/pricing/details/communication-services/) applies to these users, but there's no extra fee for the interoperability capability.

For calls with Teams users, ensure the user is Enterprise Voice enabled. To assign the license, use the [Set-CsPhoneNumberAssignment cmdlet](https://learn.microsoft.com/powershell/module/teams/set-csphonenumberassignment) and set the **EnterpriseVoiceEnabled** parameter to $true. For additional information, see [Set up Teams Phone in your organization](https://learn.microsoft.com/microsoftteams/setting-up-your-phone-system).

Follow these steps to enable the connection between a Teams tenant and a Communication Services resource.


## Enable interoperability in your Teams tenant
Microsoft Entra user with [Teams administrator role](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#teams-administrator) can run PowerShell cmdlet with MicrosoftTeams module to enable the Communication Services resource in the tenant. 

### 1. Prepare the Microsoft Teams module

First, open the PowerShell and validate the existence of the Teams module with the following command:

```script
Get-module *teams* 
```

If you don't see the `MicrosoftTeams` module, install it first. To install the module, you need to run PowerShell as an administrator. Then run the following command:

```script
	Install-Module -Name MicrosoftTeams
```

You'll be informed about the modules that will be installed, which you can confirm with a `Y` or `A` answer. If the module is installed but is outdated, you can run the following command to update the module:

```script
	Update-Module MicrosoftTeams
```

### 2. Connect to Microsoft Teams module

When the module is installed and ready, you can connect to the MicrosoftTeams module with the following command. You'll be prompted with an interactive window to log in. The user account that you're going to use needs to have Teams administrator permissions. Otherwise, you might get an `access denied` response in the next steps.

```script
Connect-MicrosoftTeams
```

### 3. Enable tenant configuration

Interoperability with Communication Services resources is controlled via tenant configuration and assigned policy. Teams tenant has a single tenant configuration, and Teams users have assigned global policy or custom policy. For more information, see [Assign Policies in Teams](https://learn.microsoft.com/microsoftteams/policy-assignment-overview).

After successful login, you can run the cmdlet [Set-CsTeamsAcsFederationConfiguration](https://learn.microsoft.com/powershell/module/teams/set-csteamsacsfederationconfiguration) to enable Communication Services resource in your tenant. Replace the text `IMMUTABLE_RESOURCE_ID` with an immutable resource ID in your communication resource. You can find more details on how to get this information [here](../troubleshooting-info.md#get-an-immutable-resource-id).

```script
$allowlist = @('IMMUTABLE_RESOURCE_ID')
Set-CsTeamsAcsFederationConfiguration -EnableAcsUsers $True -AllowedAcsResources $allowlist
```

### 4. Enable tenant policy

Each Teams user has assigned an `External Access Policy` that determines whether Communication Services users can call this Teams user. Use cmdlet
[Set-CsExternalAccessPolicy](https://learn.microsoft.com/powershell/module/skype/set-csexternalaccesspolicy) to ensure that the policy assigned to the Teams user has set `EnableAcsFederationAccess` to  `$true`

```script
Set-CsExternalAccessPolicy -Identity Global -EnableAcsFederationAccess $true
```
