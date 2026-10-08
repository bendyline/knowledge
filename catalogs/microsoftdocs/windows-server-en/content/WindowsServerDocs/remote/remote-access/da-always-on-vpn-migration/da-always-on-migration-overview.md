---
title: Remote Access Always On VPN migration overview
description: Always On VPN addresses the previous gaps between Windows VPNs and DirectAccess, and how to migrate from DirectAccess to Always On VPN.
ms.topic: upgrade-and-migration-article
ms.author: roharwoo
author: robinharwood
ms.date: 05/29/2018
---

# Overview of the DirectAccess to Always On VPN migration

&#187; [**Next:** Plan the DirectAccess to Always On VPN migration](da-always-on-migration-planning.md)

In previous versions of the Windows VPN architecture, platform limitations made it difficult to provide the critical functionality needed to replace DirectAccess, such as automatic connections initiated before users sign in. Always On VPN, however, has mitigated most of those limitations or expanded the VPN functionality beyond the capabilities of DirectAccess. Always On VPN addresses the previous gaps between Windows VPNs and DirectAccess.

The DirectAccess–to–Always On VPN migration process consists of four primary components and high-level processes:


1.  **Plan the Always On VPN migration.** Planning helps identify target clients for user phase separation as well as infrastructure and functionality.

    1.  
**Build migration rings.** As in most other system migrations, target client migrations in phases to help identify any issues before they affect the entire organization. The first part of Always On VPN migration is no different.

    2.  
**[Learn about the feature comparison of Always On VPN and DirectAccess](https://github.com/MicrosoftDocs/windowsserverdocs/blob/b30da775fdeb9df0c446fda330fd0f101422edbe/WindowsServerDocs/remote/remote-access/vpn/vpn-map-da.md).** Similar to DirectAccess, Always On VPN has many security, connectivity, authentication, and other options.

    3.  
**[Learn about the feature enhancements of Always On VPN](https://github.com/MicrosoftDocs/windowsserverdocs/blob/b30da775fdeb9df0c446fda330fd0f101422edbe/WindowsServerDocs/remote/remote-access/vpn/always-on-vpn/always-on-vpn-enhancements.md).** Discover new or improved features that Always On VPN offers to improve your configuration.

    4.  
**[Learn about the Always On VPN technology](https://github.com/MicrosoftDocs/windowsserverdocs/blob/b30da775fdeb9df0c446fda330fd0f101422edbe/WindowsServerDocs/remote/remote-access/vpn/always-on-vpn/always-on-vpn-technology-overview.md).** For this deployment, you must install a new Remote Access server that is running Windows Server 2016, as well as modify some of your existing infrastructure for the deployment.

2.  **Deploy a side-by-side VPN infrastructure.** After you have determined your migration phases and the features you want to include in your deployment, you deploy the Always On VPN infrastructure side by side with the existing DirectAccess infrastructure.

3.  **Deploy certificates and configuration to the clients.**  Once the VPN infrastructure is ready, you create and publish the required certificates to the client. When the clients have received the certificates, you deploy the VPN_Profile.ps1 configuration script. Alternatively, you can use Intune to configure the VPN client. Use Microsoft Endpoint Configuration Manager or Microsoft Intune to monitor for successful VPN configuration deployments.

4.  **Remove and decommission.** Properly decommission the environment after you have migrated everyone off DirectAccess.

    1.  
**Remove the DirectAccess configuration from the client.** Monitor Microsoft Endpoint Configuration Manager or Microsoft Intune for successful VPN configuration deployments. Then, use reporting to determine device-assignment information and discover which device belongs to each user. As users migrate successfully, you remove their devices from the DirectAccess security group so that you can remove DirectAccess from your environment.

    2.  
**Decommission the DirectAccess server.** When you have successfully removed the configuration settings and DNS records, you are ready to tear down the DirectAccess server. To do so, either remove the role in Server Manager or decommission the server and remove it from AD DS.


## DirectAccess deployment scenario

In this deployment scenario, you use a simple DirectAccess deployment scenario as a starting point for the migration this guide presents. You do not need to match this deployment scenario before migrating to Always On VPN, but for many organizations, this simple setup is an accurate representation of their current DirectAccess deployment. The table below provides a list of basic features for this setup.

Many DirectAccess deployment scenarios and options exist, so your implementation is likely to be different from the one described here. If so, refer to [Feature mapping between DirectAccess and Always On VPN](https://github.com/MicrosoftDocs/windowsserverdocs/blob/b30da775fdeb9df0c446fda330fd0f101422edbe/WindowsServerDocs/remote/remote-access/vpn/vpn-map-da.md) to determine the Always On VPN feature set mapping for your current additions, and then add those features to your configuration. Also, you can refer to the [Always On VPN enhancements](https://github.com/MicrosoftDocs/windowsserverdocs/blob/b30da775fdeb9df0c446fda330fd0f101422edbe/WindowsServerDocs/remote/remote-access/vpn/always-on-vpn/always-on-vpn-enhancements.md) to add options to your Always On VPN deployment.

>**Note:**
>For nondomain-joined devices, there are additional considerations, such as certificate enrollment. For details, see [Always On VPN Deployment for Windows Server and Windows 10](https://github.com/MicrosoftDocs/windowsserverdocs/blob/b30da775fdeb9df0c446fda330fd0f101422edbe/WindowsServerDocs/remote/remote-access/vpn/always-on-vpn/deploy/always-on-vpn-deploy-deployment.md).

### Deployment scenario feature list

| DirectAccess feature | Typical scenario |
| --- | --- |
| Deployment scenario | Deploy full DirectAccess for client access and remote management |
| Network adapters | 2 |
| User authentication | Active Directory credentials |
| Use computer certificates | Yes |
| Security groups | Yes |
| Single DirectAccess server | Yes |
| Network topology | Network address translation (NAT) behind an edge firewall with two network adapters |
| Access mode | End to edge |
| Tunneling | Split tunnel |
| Authentication | Standard public key infrastructure (PKI) authentication with machine certificate plus Kerberos (not KerbProxy) |
| Protocols | IP over HTTPS (IP-HTTPS) |
| Network location server (NLS) off-box | Yes |

## Always On VPN deployment scenario

In this deployment scenario, you focus on migrating a simple DirectAccess environment to a simple Always On VPN environment, which is the DirectAccess replacement solution. The following table provides the features used in this simple solution. For more detailed information about additional enhancements to the Always On VPN client, see [Always On VPN enhancements](https://github.com/MicrosoftDocs/windowsserverdocs/blob/b30da775fdeb9df0c446fda330fd0f101422edbe/WindowsServerDocs/remote/remote-access/vpn/always-on-vpn/always-on-vpn-enhancements.md).

### Always On VPN features used in the simple environment

| VPN feature | Deployment scenario configuration |
| --- | --- |
| Connection type | Native Internet Key Exchange version 2 (IKEv2) |
| Network adapters | 2 |
| User authentication | Active Directory credentials |
| Use computer certificates | Yes |
| Routing | Split Tunneling |
| Name resolution | Domain name information list and Domain Name System (DNS) suffix |
| Triggering | Always on and trusted network detection |
| Authentication | Protected Extensible Authentication Protocol-Transport Layer Security (PEAP-TLS) with Trusted Platform Module–protected user certificates |

## Next step

[Plan the DirectAccess to Always On VPN migration](da-always-on-migration-planning.md). The primary goal of the migration is for users to maintain remote connectivity to the office throughout the process.

---
