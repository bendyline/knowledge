---
title: "Policy based management: Availability groups"
description: "The Always On availability groups health model evaluates a set of predefined policy based management (PBM) policies. You can use these for viewing the health of an availability group and as well as replicas and databases in SQL Server."
author: MashaMSFT
ms.author: mathoma
ms.date: 09/27/2023
ms.service: sql
ms.subservice: availability-groups
ms.topic: reference
helpviewer_keywords:
  - "availability groups [SQL Server], troubleshooting"
  - "availability groups [SQL Server], policies"
---
# Policy based management for operational issues with Always On availability groups


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

The Always On availability groups health model evaluates a set of predefined policy based management (PBM) policies. You can use these for viewing the health of an availability group and its availability replicas and databases in SQL Server.

## <a id="TermsAndDefinitions"></a> Terms and Definitions

Always On predefined policies  
A set of built-in policies that allow a database administrator to check an availability group and its availability replicas and databases for compliance with the states that are defined by the Always On policies.

[Always On availability groups](overview-of-always-on-availability-groups-sql-server.md)  
A high-availability and disaster-recovery solution that provides an enterprise-level alternative to database mirroring.

availability group  
A container for a discrete set of user databases, known as *availability databases*, that fail over together.

availability replica  
An instantiation of an availability group that is hosted by a specific instance of  SQL Server 
 and that maintains a local copy of each availability database that belongs to the availability group. Two types of availability replicas exist: a single *primary replica* and one to four *secondary replicas*. The server instances that host the availability replicas for a given availability group must reside on different nodes of a single Windows Server Failover Clustering (WSFC) cluster.

availability database  
A database that belongs to an availability group. For each availability database, the availability group maintains a single read-write copy (the *primary database*) and one to four read-only copies (*secondary databases*).

Always On Dashboard  
A  SQL Server Management Studio 
 dashboard that provides an at-a-glance view of the health of an availability group. For more information, see [Always On Dashboard](#Dashboard), later in this article.

## <a id="Always OnPBM"></a> Predefined Policies and Issues

The following table summarizes the predefined policies.

| Policy name | Issue | Category**&#42;** | Facet |
| --- | --- | --- | --- |
| WSFC Cluster State | [WSFC cluster service is offline](wsfc-cluster-service-is-offline.md). | Critical | Instance of SQL Server |
| availability group Online State | [Availability group is offline](availability-group-is-offline.md). | Critical | Availability group |
| availability group Automatic Failover Readiness | [Availability group isn't ready for automatic failover](availability-group-is-not-ready-for-automatic-failover.md). | Critical | Availability group |
| Availability Replicas Data Synchronization State | [Some availability replicas aren't synchronizing data](some-availability-replicas-are-not-synchronizing-data.md). | Warning | Availability group |
| Synchronous Replicas Data Synchronization State | [Some synchronous replicas aren't synchronized](some-synchronous-replicas-are-not-synchronized.md). | Warning | Availability group |
| Availability Replicas Role State | [Some availability replicas don't have a healthy role](some-availability-replicas-do-not-have-a-healthy-role.md). | Warning | Availability group |
| Availability Replicas Connection State | [Some availability replicas are disconnected](some-availability-replicas-are-disconnected.md). | Warning | Availability group |
| Availability Replica Role State | [Availability replica doesn't have a healthy role](availability-replica-does-not-have-a-healthy-role.md). | Critical | Availability replica |
| Availability Replica Connection State | [Availability replica is disconnected](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/database-engine/availability-groups/windows/availability-replica-is-disconnected.md). | Critical | Availability replica |
| Availability Replica Join State | [Availability replica isn't joined](availability-replica-is-not-joined.md). | Warning | Availability replica |
| Availability Replica Data Synchronization State | [Data synchronization state of some availability database isn't healthy](data-synchronization-state-of-some-availability-database-is-not-healthy.md). | Warning | Availability replica |
| Availability Database Suspension State | [Availability database is suspended](availability-database-is-suspended.md). | Warning | Availability database |
| Availability Database Join State | [Secondary database isn't joined](secondary-database-is-not-joined.md). | Warning | Availability database |
| Availability Database Data Synchronization State | [Data synchronization state of availability database isn't healthy](data-synchronization-state-of-availability-database-is-not-healthy.md). | Warning | Availability database |

> **Important:**  
> **&#42;** For Always On policies, the category names are used as IDs. Changing the name of an Always On category would break its health-evaluation functionality. Therefore, do not modify the names of Always On categories.

## <a id="Dashboard"></a> Always On Dashboard

The Always On Dashboard gives you an at-a-glance view of the health of an availability group. The Always On Dashboard includes the following features:

- Enables you to easily display details about a given availability group, its availability replicas, and its databases.

- Displays visual indications of key states to help database administrators make quick operational decisions.

- Provides launch points for troubleshooting scenarios.

- For a given operational issue, populates the **Policy Evaluation Result** dialog box with information about specific Always On health policy violations and with links to remediation help.

- Provides a health extended event viewer to show previous events for Always On-specific issues.

- If failing over the availability group is a possible remediation for an issue, provides a launch point for the links[Fail Over availability group Wizard](use-the-fail-over-availability-group-wizard-sql-server-management-studio.md). This wizard takes a database administrator through the manual failover process.

## <a id="ExtendHealthModel"></a> Extend the Always On Health Model

Extending the  Always On availability groups 
 health model is simply a matter of creating your own user-defined policies and putting them into certain categories based on the type of object that you're monitoring.  After you alter a few settings, the Always On dashboard automatically evaluates your own user-defined policies, as well as the Always On predefined policies.

A user-defined policy can use any of the available PBM facets, including those used by the Always On predefined policies (see [Predefined Policies and Issues](#Always OnPBM), earlier in this article). The Server facet provides the following properties for monitoring  Always On availability groups 
 health: (**IsHadrEnabled** and **HadrManagerStatus**). The Server facet also provides properties the following policies for monitoring the WSFC cluster configuration: **ClusterQuorumType**, and **ClusterQuorumState**.

For more information, see [The Always On Health Model Part 2--Extending the Health Model](https://learn.microsoft.com/archive/blogs/sqlalwayson/the-alwayson-health-model-part-2-extending-the-health-model) (a SQL Server Always On Team blog).

## <a id="RelatedTasks"></a> Related Tasks

- [Use Always On Policies to View the Health of an availability group](use-always-on-policies-to-view-the-health-of-an-availability-group-sql-server.md)

- [Use the availability group dashboard in SSMS](use-the-always-on-dashboard-sql-server-management-studio.md)

- [WSFC Disaster Recovery through Forced Quorum](../../../sql-server/failover-clusters/windows/wsfc-disaster-recovery-through-forced-quorum-sql-server.md)

- [Force a WSFC Cluster to Start Without a Quorum](../../../sql-server/failover-clusters/windows/force-a-wsfc-cluster-to-start-without-a-quorum.md)

- [Perform a Forced Manual Failover of an availability group](perform-a-forced-manual-failover-of-an-availability-group-sql-server.md)

- [Troubleshoot a Failed Add-File Operation](troubleshoot-a-failed-add-file-operation-always-on-availability-groups.md)

## Related content

- [The Always On Health Model Part 1--Health Model Architecture](https://learn.microsoft.com/archive/blogs/sqlalwayson/the-alwayson-health-model-part-1-health-model-architecture)
- [The Always On Health Model Part 2--Extending the Health Model](https://learn.microsoft.com/archive/blogs/sqlalwayson/the-alwayson-health-model-part-2-extending-the-health-model)
- [Microsoft SQL Server Always On Solutions Guide for High Availability and Disaster Recovery](https://learn.microsoft.com/previous-versions/sql/sql-server-2012/hh781257\(v=msdn.10\))
- [What is an Always On availability group?](overview-of-always-on-availability-groups-sql-server.md)
- [Administration of an availability group](administration-of-an-availability-group-sql-server.md)
- [Tools to monitor Always On availability groups](monitoring-of-availability-groups-sql-server.md)
