---
title: Monitor the Azure Site Recovery process server
description: This article describes how to monitor Azure Site Recovery process server used for VMware VM/physical server disaster recovery
ms.service: azure-site-recovery
ms.topic: overview
ms.date: 02/12/2026
ms.author: v-gajeronika
ms.reviewer: v-gajeronika
author: Jeronika-MS
ms.custom: sfi-image-nochange
# Customer intent: As an IT administrator managing disaster recovery for VMware VMs and physical servers, I want to monitor the health and performance of the Site Recovery process server, so that I can ensure optimal replication and minimize the risk of data loss during recovery operations.
---
# Monitor the process server

This article describes how to monitor the [Site Recovery](site-recovery-overview.md) process server.

- Use the process server when you set up disaster recovery for on-premises VMware VMs and physical servers to Azure.
- By default, the process server runs on the configuration server. It's installed by default when you deploy the configuration server.
- To scale and handle larger numbers of replicated machines and higher volumes of replication traffic, you can deploy additional, scale-out process servers.

[Learn more](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/vmware-physical-azure-config-process-server-overview.md) about the role and deployment of process servers.

## Monitoring overview

Since the process server has many roles, particularly in replicated data caching, compression, and transfer to Azure, it's important to monitor process server health on an ongoing basis.

Several situations commonly affect process server performance. Issues that affect performance have a cascading effect on VM health, and eventually push both the process server and its replicated machines into a critical state. These situations include:

- High numbers of VMs use a process server, and the number approaches or exceeds recommended limitations.
- VMs that use the process server have a high churn rate.
- Network throughput between VMs and the process server isn't enough to upload replication data to the process server.
- Network throughput between the process server and Azure isn't sufficient to upload replication data from the process server to Azure.

All of these issues can affect the recovery point objective (RPO) of VMs. 

**Why?** Because generating a recovery point for a VM requires all disks on the VM to have a common point. If one disk has a high churn rate, replication is slow, or the process server isn't optimal, it impacts how efficiently recovery points are created.

## Monitor proactively

To avoid issues with the process server, make sure to:

- Understand the specific requirements for process servers by using [capacity and sizing guidance](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/site-recovery-plan-capacity-vmware.md#capacity-considerations). Deploy and run process servers according to these recommendations.
- Monitor alerts and troubleshoot issues as they occur to keep process servers running efficiently.


## Process server alerts

The process server generates several health alerts, which the following table summarizes.

| **Alert type** | **Details** |
| --- | --- |
| Healthy | Process server is connected and healthy. |
| Warning | CPU utilization is greater than 80% for the last 15 minutes. |
| Warning | Memory usage is greater than 80% for the last 15 minutes. |
| Warning | Cache folder free space is less than 30% for the last 15 minutes. |
| Warning | Site Recovery monitors pending and outgoing data every five minutes, and estimates that data in the process server cache can't be uploaded to Azure within 30 minutes. |
| Warning | Process server services aren't running for the last 15 minutes. |
| Critical | CPU utilization is greater than 95% for the last 15 minutes. |
| Critical | Memory usage is greater than 95% for the last 15 minutes. |
| Critical | Cache folder free space is less than 25% for the last 15 minutes. |
| Critical | Site Recovery monitors pending and outgoing data every five minutes, and estimates that data in the process server cache can't be uploaded to Azure within 45 minutes. |
| Critical | No heartbeat from the process server for 15 minutes. |

Table key.

> **Note:**
> The overall health status of the process server is based on the worst alert generated.



## Monitor process server health

You can monitor the health state of your process servers as follows: 

1. To monitor the replication health and status of a replicated machine, and of its process server, in vault > **Replicated items**, select the machine you want to monitor.
1. In **Replication Health**, monitor the VM health status. Select the status to view error details.

    Process server health in VM dashboard.

1. In **Process Server Health**, monitor the status of the process server. Select it for more details.

    Process server details in VM dashboard.

1. You can also monitor health by using the graphical representation on the VM page.
    - A scale-out process server appears in orange if there are warnings associated with it, and red if it has any critical problems. 
    - If the process server runs in the default deployment on the configuration server, the portal highlights the configuration server accordingly.
        - To view more details, select the configuration server or process server. Note any issues, and any remediation recommendations.

You can also monitor process servers in the vault under **Site Recovery Infrastructure**. In **Manage your Site Recovery infrastructure**, select **Configuration Servers**. Select the configuration server associated with the process server, and view process server details.


## Next steps

- If you encounter any process server issues, follow the [troubleshooting guidance](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/vmware-physical-azure-troubleshoot-process-server.md).
- If you need more help, post your question in the [Microsoft Q\&A question page for Azure Site Recovery](https://learn.microsoft.com/answers/topics/azure-site-recovery.html). 

[green]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/media/vmware-physical-azure-monitor-process-server/green.png
[yellow]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/media/vmware-physical-azure-monitor-process-server/yellow.png
[red]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/media/vmware-physical-azure-monitor-process-server/red.png
