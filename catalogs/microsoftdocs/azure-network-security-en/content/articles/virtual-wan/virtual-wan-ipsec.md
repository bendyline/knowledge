---
title: 'Virtual WAN site-to-site IPsec policies'
titleSuffix: Azure Virtual WAN
description: Learn about Azure Virtual WAN IPsec connectivity policies, including default initiator and responder policies, and custom policy combinations.
services: virtual-wan
author: duongau
ms.service: azure-virtual-wan
ms.topic: reference
ms.date: 03/27/2025
ms.author: duau
#Customer intent: As a Virtual WAN software-defined connectivity provider, I want to know the IPsec policies
---

# Site-to-site IPsec policies

This article shows the supported IPsec policy combinations.

## Default IPsec policies


> **Note:**
> When you work with default policies, Azure acts as both initiator and responder during an IPsec tunnel setup. While Virtual WAN VPN supports many algorithm combinations, use GCMAES256 for both IPSEC Encryption and Integrity for optimal performance. AES256 and SHA256 offer lower performance, so expect performance degradation such as latency and packet drops when you use these algorithm types. For more information about Virtual WAN, see the [Azure Virtual WAN FAQ](virtual-wan-faq.md).
>

### Initiator

The following sections list the supported policy combinations when Azure is the initiator for the tunnel.

**Phase-1**

* AES_256, SHA1, DH_GROUP_2
* AES_256, SHA_256, DH_GROUP_2
* AES_128, SHA1, DH_GROUP_2
* AES_128, SHA_256, DH_GROUP_2

**Phase-2**

* GCM_AES_256, GCM_AES_256, PFS_NONE
* AES_256, SHA_1, PFS_NONE
* AES_256, SHA_256, PFS_NONE
* AES_128, SHA_1, PFS_NONE

### Responder

The following sections list the supported policy combinations when Azure is the responder for the tunnel.

**Phase-1**

* AES_256, SHA1, DH_GROUP_2
* AES_256, SHA_256, DH_GROUP_2
* AES_128, SHA1, DH_GROUP_2
* AES_128, SHA_256, DH_GROUP_2

**Phase-2**

* GCM_AES_256, GCM_AES_256, PFS_NONE
* AES_256, SHA_1, PFS_NONE
* AES_256, SHA_256, PFS_NONE
* AES_128, SHA_1, PFS_NONE
* AES_256, SHA_1, PFS_1
* AES_256, SHA_1, PFS_2
* AES_256, SHA_1, PFS_14
* AES_128, SHA_1, PFS_1
* AES_128, SHA_1, PFS_2
* AES_128, SHA_1, PFS_14
* AES_256, SHA_256, PFS_1
* AES_256, SHA_256, PFS_2
* AES_256, SHA_256, PFS_14
* AES_256, SHA_1, PFS_24
* AES_256, SHA_256, PFS_24
* AES_128, SHA_256, PFS_NONE
* AES_128, SHA_256, PFS_1
* AES_128, SHA_256, PFS_2
* AES_128, SHA_256, PFS_14

### SA Lifetime Values

These life time values apply for both initiator and responder

* SA Lifetime in seconds: 3600 seconds
* SA Lifetime in Bytes: 102,400,000 KB


## Custom IPsec policies


When working with custom IPsec policies, keep in mind the following requirements:

* **IKE** - For IKE, you can select any parameter from IKE Encryption, plus any parameter from IKE Integrity, plus any parameter from DH Group.
* **IPsec** -  For IPsec, you can select any parameter from IPsec Encryption, plus any parameter from IPsec Integrity, plus PFS. If any of the parameters for IPsec Encryption or IPsec Integrity is GCM, then the parameters for both settings must be GCM.

Custom IKE main mode policies support Diffie-Hellman Group 14, Group 24, or ECP (Elliptic Curve Groups) ECP256 (Group 19) and ECP384 (Group 20). Similar cryptographic group requirements apply to IPsec quick mode policies.

The default custom policy includes SHA1, DHGroup2, and 3DES for backward compatibility. These are weaker algorithms that aren't supported when creating a custom policy. We recommend only using the following algorithms:

**Available settings and parameters**

| Setting | Parameters |
| --- | --- |
| IKE Encryption | GCMAES256, GCMAES128, AES256, AES128 |
| IKE Integrity | SHA384, SHA256 |
| DH Group | ECP384, ECP256, DHGroup24, DHGroup14 |
| IPsec Encryption | GCMAES256, GCMAES128, AES256, AES128, None |
| IPsec Integrity | GCMAES256, GCMAES128, SHA256 |
| PFS Group | ECP384, ECP256, PFS24, PFS14, None |
| SA Lifetime | integer; min. 300/ default 3600 seconds |

The following table lists the corresponding Diffie-Hellman groups that the custom policy supports:

| Diffie-Hellman group | DHGroup | PFSGroup | Key length |
| --- | --- | --- | --- |
| 14 | DHGroup14 | PFS14 | 2048-bit MODP |
| 19 | ECP256 | ECP256 | 256-bit ECP |
| 20 | ECP384 | ECP384 | 384-bit ECP |
| 24 | DHGroup24 | PFS24 | 2048-bit MODP |


## Next steps

For steps to configure a custom IPsec policy, see [Configure a custom IPsec policy for Virtual WAN](virtual-wan-custom-ipsec-portal.md).

For more information about Virtual WAN, see [About Azure Virtual WAN](virtual-wan-about.md) and the [Azure Virtual WAN FAQ](virtual-wan-faq.md).
