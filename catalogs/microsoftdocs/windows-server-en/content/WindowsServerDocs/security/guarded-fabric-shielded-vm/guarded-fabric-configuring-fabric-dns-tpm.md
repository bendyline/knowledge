---
description: "Learn more about: Next step"
title: Configure the fabric DNS for guarded hosts (TPM)
ms.topic: how-to
author: robinharwood
ms.author: roharwoo
ms.date: 08/29/2018
---

# Next step


There are many ways to configure name resolution for the fabric domain. 
One simple way is to set up a conditional forwarder zone in DNS for the fabric. 
To set up this zone, run the following commands in an elevated Windows PowerShell console on a fabric DNS server. 
Substitute the names and addresses in the Windows PowerShell syntax below as needed for your environment. 
Add the parameter `-MasterServers` for the additional HGS nodes.

```
Add-DnsServerConditionalForwarderZone -Name 'bastion.local' -ReplicationScope "Forest" -MasterServers <IP addresses of HGS server>
```

<!-- Appears in guarded-fabric-configuring-fabric-dns-ad.md and guarded-fabric-configuring-fabric-dns.md and set-up-hgs-for-always-encrypted-in-sql-server.md
-->    

> 
> [Configure HTTPS](guarded-fabric-configure-hgs-https.md)

## Additional References

- [Configuration steps for Hyper-V hosts that will become guarded hosts](guarded-fabric-configure-hgs-with-authorized-hyper-v-hosts.md)
- [Deployment tasks for guarded fabrics and shielded VMs](guarded-fabric-deploying-hgs-overview.md#deployment-tasks-for-guarded-fabrics-and-shielded-vms)
