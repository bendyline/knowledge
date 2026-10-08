---
title: "&lt;AgentProfileName&gt; Properties"
description: "&lt;AgentProfileName&gt; Properties"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
f1_keywords:
  - "sql13.rep.profiles.perfprofileprops.f1"
helpviewer_keywords:
  - "Agent Profile Properties dialog box"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# &lt;AgentProfileName&gt; Properties

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  Use the **Agent Profiles Properties** dialog box to view the values specified for each agent parameter in a profile and to modify the values for user-defined profiles.  
  
## Options  
 **Name**  
 The name of the profile.  
  
 **Description**  
 A description of the profile.  
  
 **Parameter**  
 The agent parameters included in the profile. Profiles do not necessarily specify a value for each parameter. To see all parameters that are valid for a given agent, clear the **Show only parameters used in this profile** check box. For descriptions of each parameter, see:  
  
-   [Replication Snapshot Agent](agents/replication-snapshot-agent.md)  
  
-   [Replication Log Reader Agent](agents/replication-log-reader-agent.md)  
  
-   [Replication Distribution Agent](agents/replication-distribution-agent.md)  
  
-   [Replication Merge Agent](agents/replication-merge-agent.md)  
  
-   [Replication Queue Reader Agent](agents/replication-queue-reader-agent.md)  
  
 **Default Value**  
 The default value for each agent parameter.  
  
 **Value**  
 The value specified for the parameter in the profile. This field is editable for user-defined profiles.  
  
 **Show only parameters used in this profile**  
 Clear to show all valid parameters for a given agent.  
  
## Related content

- [Work with Replication Agent Profiles](agents/work-with-replication-agent-profiles.md)
- [Replication Agents Overview](agents/replication-agents-overview.md)
- [Replication Agent Profiles](agents/replication-agent-profiles.md)
