---
description: "Learn more about: Side by Side Versioning in WorkflowServiceHost"
title: "Side by Side Versioning in WorkflowServiceHost"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 60887eed-df40-4412-b812-41e1dd329d15
---
# Side by Side Versioning in WorkflowServiceHost

The [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost) side-by-side versioning introduced in .NET Framework 4.5 provides the capability to host multiple versions of a workflow service on a single endpoint. The side-by-side functionality provided allows a workflow service to be configured so that new instances of the workflow service are created using the new workflow definition, while running instances complete using the existing definition. This topic provides an overview of workflow service side-by-side execution using [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost).

## Hosting Multiple Versions in a Workflow Service

 [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost) contains two properties that can be configured to allow multiple versions of a workflow to execute side-by-side: [System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*) and [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*). [System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*) contains the supported versions of the workflow service, and [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) is used to uniquely identify each workflow service. This is done by associating a [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity) with the workflow service. A [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity) contains three identifying pieces of information. [System.Activities.WorkflowIdentity.Name*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Name*) and [System.Activities.WorkflowIdentity.Version*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Version*) contain a name and a [System.Version](https://learn.microsoft.com/search/?terms=System.Version) and are required, and [System.Activities.WorkflowIdentity.Package*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Package*) is optional and can be used to specify an additional string containing information such as assembly name or other desired information. Each workflow service contained in the [System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*) collection must have a unique [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity). A [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity) is unique if any of its three properties are different from another [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity). A `null` [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity) is an allowable value for [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*), but only one previous version of a workflow service may have a `null` [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity).

> **Important:**
> A [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity) should not contain any personally identifiable information (PII). [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity) is composed of three parts: a [System.Activities.WorkflowIdentity.Name*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Name*) ([System.String](https://learn.microsoft.com/search/?terms=System.String)), a [System.Activities.WorkflowIdentity.Version*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Version*) ([System.Version](https://learn.microsoft.com/search/?terms=System.Version)), and a [System.Activities.WorkflowIdentity.Package*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Package*) ([System.String](https://learn.microsoft.com/search/?terms=System.String)). Information about the [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity) used to create an instance is emitted to any configured tracking services at several different points of the activity life-cycle by the runtime. WF Tracking does not have any mechanism to hide PII (sensitive user data). Therefore, a [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity) instance should not contain any PII data as it will be emitted by the runtime in tracking records and may be visible to anyone with access to view the tracking records.

### Rules for Hosting Multiple Versions of a Workflow Service

 When a user adds an additional version to the [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost), there are several conditions that must be met in order for a workflow service to be hosted with the same set of endpoints and description. If any of the additional versions fail to meet these conditions, the [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost) throws an exception when `Open` is called. Each workflow definition provided to the host as an additional version must meet the following requirements (where the primary version is the workflow service definition that is provided to the host constructor). The additional workflow version must:

- Have the same the [System.ServiceModel.Activities.WorkflowService.Name*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.Name*) as the primary version of the workflow service.

- Must not have any [System.ServiceModel.Activities.Receive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Receive) or [System.ServiceModel.Activities.SendReply](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.SendReply) activities in its [System.ServiceModel.Activities.WorkflowService.Body*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.Body*) that are not in the primary version, and they must match the operation contract.

- Have a unique [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*). One and only one workflow definition may have a `null`[System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*).

 Some changes are permitted. The following items may be different between the versions:

- The [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) may have a different Name and Package than the primary version.

- The [System.ServiceModel.Activities.WorkflowService.AllowBufferedReceive*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.AllowBufferedReceive*) value may be different than the primary version.

- The [System.ServiceModel.Activities.WorkflowService.ConfigurationName*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.ConfigurationName*) may be different than the primary version.

- The [System.ServiceModel.Activities.WorkflowService.ImplementedContracts*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.ImplementedContracts*) may be different than the primary version.

### Configuring the DefinitionIdentity

 When a workflow service is created using the workflow designer, the [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) is set using the **Properties** window. Click outside of the service’s root activity in the designer to select the workflow service, and choose **Properties Window** from the **View** menu. Select **WorkflowIdentity** from the drop-down list that appears beside the **DefinitionIdentity** property, and then expand and specify the desired [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity) properties. In the following example the [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) is configured with the [System.Activities.WorkflowIdentity.Name*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Name*) `MortgageWorkflow` and a [System.Activities.WorkflowIdentity.Version*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Version*) of `1.0.0.0`. [System.Activities.WorkflowIdentity.Package*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Package*) is optional and in this example is `null`.

 Screenshot that shows the DefinitionIdentity property.

 When a workflow service is self-hosted, the [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) is configured when the workflow service is constructed. In the following example, the [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) is configured with the same values as the previous example, with the [System.Activities.WorkflowIdentity.Name*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Name*) `MortgageWorkflow` and a [System.Activities.WorkflowIdentity.Name*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Name*) of `1.0.0.0`.

```csharp
WorkflowService service = new WorkflowService
{
    Name = "MortgageWorkflowService",
    Body = new MortgageWorkflow(),
    DefinitionIdentity = new WorkflowIdentity
    {
        Name = "MortgageWorkflow",
        Version = new Version(1, 0, 0, 0)
    }
};
```

```vb
Dim service As New WorkflowService
With service
    .Name = "MortgageWorkflowService"
    .Body = New MortgageWorkflow
    .DefinitionIdentity = New WorkflowIdentity With _
    { _
        .Name = "MortgageWorkflow", _
        .Version = New Version(1, 0, 0, 0) _
    }
End With
```

 A [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) is not required, although only one version of the workflow service may have a **null**[System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*).

> **Note:**
> This is useful if the service was deployed initially without a [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) configured, and then an updated version is created.

### Adding a New Version to a Web-hosted Workflow Service

 The first step in configuring a new version of a workflow service in a web-hosted service is to create a new folder in the `App_Code` folder that has the same name as the service file. If the service’s `xamlx` file is named `MortgageWorkflow.xamlx`, then the folder must be named `MortgageWorkflow`. Place a copy of the original service’s `xamlx` file into this folder and rename it to a new name, such as `MortgageWorkflowV1.xamlx`. Make the desired changes to the primary service, update its [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*), and then deploy the service. In the following example the [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) has been updated with a [System.Activities.WorkflowIdentity.Name*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Name*) of `MortgageWorkflow` and a [System.Activities.WorkflowIdentity.Version*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity.Version*) of `2.0.0.0`.

 Screenshot that shows DefinitionIdentity of WorkflowIdentity.

 When the service restarts, the previous version will automatically be added to the [System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*) collection because it is located in the designated `App_Code` subfolder. Note that if the primary version of the workflow service has a `null` [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) the previous versions will not be added. One version may have a `null`[System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*), but if there are multiple versions the primary version must not be the one with the `null`[System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) or else the previous versions will not be added to the [System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*) collection.

### Adding a New Version to a Self-hosted Workflow Service

 When adding a new version to a self-hosted workflow service, the [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost) is configured with the primary version of the workflow service, and previous versions must be explicitly added to the [System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*) collection. In the following example, a [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost) is configured with a primary workflow service that uses a `MortgageWorkflowV2` workflow definition, and a workflow service configured with a `MortgageWorkflowV1` workflow definition is added to the [System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost.SupportedVersions*) collection. Each workflow service is configured with a unique [System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService.DefinitionIdentity*) that reflects the version of the workflow definition.

```csharp
// Create the primary version of the workflow service.
WorkflowService serviceV2 = new WorkflowService
{
    Name = "MortgageWorkflowService",
    Body = new MortgageWorkflowV2(),
    DefinitionIdentity = new WorkflowIdentity
    {
        Name = "MortgageWorkflow",
        Version = new Version(2, 0, 0, 0)
    }
};

// Configure the WorkflowServiceHost with the current version
// of the workflow service. This code requires Administrator
// privileges to function correctly. If running from Visual
// Studio, Visual Studio must be run with Administrator privileges.
WorkflowServiceHost host = new WorkflowServiceHost(serviceV2,
    new Uri("http://localhost:8080/MortgageWorkflowService"));

// Create the previous version of the workflow service.
WorkflowService serviceV1 = new WorkflowService
{
    Name = "MortgageWorkflowService",
    Body = new MortgageWorkflowV1(),
    DefinitionIdentity = new WorkflowIdentity
    {
        Name = "MortgageWorkflow",
        Version = new Version(1, 0, 0, 0)
    }
};

// Add the previous version of the service to the SupportedVersions collection.
host.SupportedVersions.Add(serviceV1);
```

```vb
'Create the primary version of the workflow service
Dim serviceV2 As New WorkflowService
With serviceV2
    .Name = "MortgageWorkflowService"
    .Body = New MortgageWorkflowV2
    .DefinitionIdentity = New WorkflowIdentity With _
    { _
        .Name = "MortgageWorkflow", _
        .Version = New Version(2, 0, 0, 0) _
    }
End With

'Configure the WorkflowServiceHost with the current version
'of the workflow service. This code requires Administrator
'privileges to function correctly. If running from Visual
'Studio, Visual Studio must be run with Administrator privileges.

Dim host As New WorkflowServiceHost(serviceV2, _
    New Uri("http://localhost:8080/MortgageWorkflowService"))

'Create the previous version of the workflow service.
Dim serviceV1 As New WorkflowService
With serviceV1
    .Name = "MortgageWorkflowService"
    .Body = New MortgageWorkflowV1
    .DefinitionIdentity = New WorkflowIdentity With _
    { _
        .Name = "MortgageWorkflow", _
        .Version = New Version(1, 0, 0, 0) _
    }
End With

'Add the previous version of the service to the SupportedVersions collection.
host.SupportedVersions.Add(serviceV1)
```
