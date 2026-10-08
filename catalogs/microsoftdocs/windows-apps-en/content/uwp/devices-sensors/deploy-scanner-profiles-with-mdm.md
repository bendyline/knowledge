---
title: Deploy barcode scanner profiles with MDM
description: Learn how to deploy barcode scanner profiles with a Mobile Device Management (MDM) server using the EnterpriseExtFileSystem configuration service provider (CSP).

ms.date: 05/04/2023
ms.topic: install-set-up-deploy

ms.localizationpriority: medium
---

# Deploy barcode scanner profiles with a Mobile Device Management server

Barcode scanner profiles can be deployed with a Mobile Device Management (MDM) server. To deploy the profiles, use *OemProfile* in the [EnterpriseExtFileSystem CSP](https://learn.microsoft.com/windows/client-management/mdm/enterpriseextfilesystem-csp) to place them into the \\Data\\SharedData\\OEM\\Public\\Profile folder. These scanner profiles can then be used by driver manufacturers to configure settings that are not exposed through the API surface.

Microsoft does not define the specifics of a scanner profile or how to implement them.

> **Note:**
> This feature requires Windows 10 Mobile or later.

## Related topics

- [EnterpriseExtFileSystem CSP](https://learn.microsoft.com/windows/client-management/mdm/enterpriseextfilesystem-csp)
- [Barcode scanner device support](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/uwp/devices-sensors/pos-device-support.md#barcode-scanner)
