---
description: "Learn more about: How to: Configure Idle Behavior with WorkflowServiceHost"
title: "How to: Configure Idle Behavior with WorkflowServiceHost"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 1bb93652-d687-46ff-bff6-69ecdcf97437
---
# How to: Configure Idle Behavior with WorkflowServiceHost

Workflows go idle when they encounter a bookmark that must be resumed by some external stimulus, for example when the workflow instance is waiting for a message to be delivered using a [System.ServiceModel.Activities.Receive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Receive) activity. [System.ServiceModel.Activities.Description.WorkflowIdleBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowIdleBehavior) is a behavior that allows you to specify the time between when a service instance goes idle and when the instance is persisted or unloaded. It contains two properties that enable you to set these time spans. [System.ServiceModel.Activities.Description.WorkflowIdleBehavior.TimeToPersist*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowIdleBehavior.TimeToPersist*) specifies the time span between when a workflow service instance goes idle and when the workflow service instance is persisted. [System.ServiceModel.Activities.Description.WorkflowIdleBehavior.TimeToUnload*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowIdleBehavior.TimeToUnload*) specifies the time span between when a workflow service instance goes idle and when the workflow service instance is unloaded, where unload means persisting the instance to the instance store and removing it from memory. This topic explains how to configure the [System.ServiceModel.Activities.Description.WorkflowIdleBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowIdleBehavior) in a configuration file.

### To configure WorkflowIdleBehavior

1. Add a `<workflowIdle>` element to the `<behavior>` element within the `<serviceBehaviors>` element as shown in the following example.

    ```xml
    <behaviors>
      <serviceBehaviors>
        <behavior name="">
          <workflowIdle timeToUnload="0:05:0" timeToPersist="0:04:0"/>
        </behavior>
      </serviceBehaviors>
    </behaviors>
    ```

     The `timeToUnload` attribute specifies the time period between when a workflow service instance goes idle and when the workflow service is unloaded. The `timeToPersist` attribute specifies the time period between when a workflow service instance goes idle and when the workflow service instance is persisted. The default value for `timeToUnload` is 1 minute. The default value for `timeToPersist` is [System.TimeSpan.MaxValue](https://learn.microsoft.com/search/?terms=System.TimeSpan.MaxValue). If you want to keep idle instances in memory but persist them for robustness, set values so that `timeToPersist` < `timeToUnload`. If you want to prevent idle instances from being unloaded, set `timeToUnload` to [System.TimeSpan.MaxValue](https://learn.microsoft.com/search/?terms=System.TimeSpan.MaxValue). For more information about [System.ServiceModel.Activities.Description.WorkflowIdleBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowIdleBehavior), see [Workflow Service Host Extensibility](workflow-service-host-extensibility.md).

    > **Note:**
    > The preceding configuration sample is using simplified configuration. For more information, see [Simplified Configuration](../simplified-configuration.md).

### To change idle behavior in code

- The following example changes the time to wait before persisting and unloading programmatically.

     [Wf_SvcHost_Idle_persist#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/wf_svchost_idle_persist/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/wf_svchost_idle_persist/cs/source.cs.md)
     [Wf_SvcHost_Idle_persist#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/wf_svchost_idle_persist/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/wf_svchost_idle_persist/vb/source.vb.md)

## See also

- [Workflow Service Host Extensibility](workflow-service-host-extensibility.md)
- [Simplified Configuration](../simplified-configuration.md)
- [Workflow Services](workflow-services.md)
