---
author: asudbring
ms.author: allensu
ms.date: 03/14/2025
ms.service: azure-bastion
ms.topic: include

---

| Feature | Basic SKU | Standard SKU | Premium SKU |
| --- | --- | --- | --- |
| Connect to target VMs in same virtual network | Yes | Yes | Yes |
| Connect to target VMs in peered virtual networks | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/vnet-peering.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/vnet-peering.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/vnet-peering.md) |
| Support for concurrent connections | Yes | Yes | Yes |
| Access Linux VM Private Keys in Azure Key Vault (AKV) | Yes | Yes | Yes |
| Connect to Linux VM using SSH | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/bastion-connect-vm-ssh-linux.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/bastion-connect-vm-ssh-linux.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/bastion-connect-vm-ssh-linux.md) |
| Connect to Windows VM using RDP | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/bastion-connect-vm-rdp-windows.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/bastion-connect-vm-rdp-windows.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/bastion-connect-vm-rdp-windows.md) |
| Connect to Linux VM using RDP | No | Yes | Yes |
| Connect to Windows VM using SSH | No | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/bastion-connect-vm-ssh-windows.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/bastion-connect-vm-ssh-windows.md) |
| Specify custom inbound port | No | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/configuration-settings.md#ports) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/configuration-settings.md#ports) |
| Connect to VMs using Azure CLI | No | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/native-client.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/native-client.md) |
| Host scaling | No | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/configuration-settings.md#instance) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/configuration-settings.md#instance) |
| Upload or download files | No | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/vm-upload-download-native.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/vm-upload-download-native.md) |
| Kerberos authentication | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/kerberos-authentication-portal.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/kerberos-authentication-portal.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/kerberos-authentication-portal.md) |
| Shareable link | No | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/shareable-link.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/shareable-link.md) |
| Connect to VMs via IP address | No | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/connect-ip-address.md) | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/connect-ip-address.md) |
| VM audio output | Yes | Yes | Yes |
| Disable copy/paste (web-based clients) | No | Yes | Yes |
| Session recording | No | No | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/session-recording.md) |
| Private-only deployment | No | No | [Yes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/private-only-deployment.md) |
