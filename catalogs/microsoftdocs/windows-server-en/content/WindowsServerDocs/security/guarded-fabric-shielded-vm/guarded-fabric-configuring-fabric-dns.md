---
description: "Learn more about: Configure the fabric DNS for guarded hosts"
title: Configure the fabric DNS for guarded hosts
ms.topic: how-to
author: robinharwood
ms.author: roharwoo
ms.date: 08/29/2018
---

# Configure the fabric DNS for guarded hosts

A fabric administrator needs to configure the fabric DNS takes to allow guarded hosts to resolve the HGS cluster.
The HGS cluster must already be set up by the [HGS administrator](https://learn.microsoft.com/windows-server/security/guarded-fabric-shielded-vm/guarded-fabric-initialize-hgs).


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


## Next step

- [Configure HTTPS](guarded-fabric-configure-hgs-https.md)
