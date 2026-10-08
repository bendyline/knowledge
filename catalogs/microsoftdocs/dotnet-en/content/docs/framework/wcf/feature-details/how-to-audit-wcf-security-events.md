---
description: "Learn more about: How to: Audit Windows Communication Foundation Security Events"
title: "How to: Audit Windows Communication Foundation Security Events"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "security [WCF], auditing events"
ms.assetid: e71e9587-3336-46a2-9a9e-d72a1743ecec
---
# How to: Audit Windows Communication Foundation Security Events

Windows Communication Foundation (WCF) allows you to log security events to the Windows event log, which can be viewed using the Windows Event Viewer. This topic explains how to set up an application so that it logs security events. For more information about WCF auditing, see [Auditing](auditing-security-events.md).

### To audit security events in code

1. Specify the audit log location. To do this, set the [System.ServiceModel.Description.ServiceSecurityAuditBehavior.AuditLogLocation](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceSecurityAuditBehavior.AuditLogLocation) property of the [System.ServiceModel.Description.ServiceSecurityAuditBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceSecurityAuditBehavior) class to one of the [System.ServiceModel.AuditLogLocation](https://learn.microsoft.com/search/?terms=System.ServiceModel.AuditLogLocation) enumeration values, as shown in the following code.

     [AuditingSecurityEvents#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/auditingsecurityevents/cs/auditingsecurityevents.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/auditingsecurityevents/cs/auditingsecurityevents.cs.md)
     [AuditingSecurityEvents#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/auditingsecurityevents/vb/auditingsecurityevents.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/auditingsecurityevents/vb/auditingsecurityevents.vb.md)

     The [System.ServiceModel.AuditLogLocation](https://learn.microsoft.com/search/?terms=System.ServiceModel.AuditLogLocation) enumeration has three values: `Application`, `Security`, or `Default`. The value specifies one of the logs visible in the Event Viewer, either the Security log or the Application log. If you use the `Default` value, the actual log will depend on the operating system the application is running on. If auditing is enabled and the log location is not specified, the default is the `Security` log for platforms that support writing to the Security log; otherwise, it will write to the `Application` log. Only Windows Server 2003 and Windows Vista support writing to the Security log by default.

2. Set up the types of events to audit. You can simultaneously audit service-level events or message-level authorization events. To do this, set the [System.ServiceModel.Description.ServiceSecurityAuditBehavior.ServiceAuthorizationAuditLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceSecurityAuditBehavior.ServiceAuthorizationAuditLevel) property or the [System.ServiceModel.Description.ServiceSecurityAuditBehavior.MessageAuthenticationAuditLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceSecurityAuditBehavior.MessageAuthenticationAuditLevel) property to one of the [System.ServiceModel.AuditLevel](https://learn.microsoft.com/search/?terms=System.ServiceModel.AuditLevel) enumeration values, as shown in the following code.

     [AuditingSecurityEvents#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/auditingsecurityevents/cs/auditingsecurityevents.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/auditingsecurityevents/cs/auditingsecurityevents.cs.md)
     [AuditingSecurityEvents#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/auditingsecurityevents/vb/auditingsecurityevents.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/auditingsecurityevents/vb/auditingsecurityevents.vb.md)

3. Specify whether to suppress or expose failures to the application regarding log audit events. Set the [System.ServiceModel.Description.ServiceSecurityAuditBehavior.SuppressAuditFailure](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceSecurityAuditBehavior.SuppressAuditFailure) property to either `true` or `false`, as shown in the following code.

     [AuditingSecurityEvents#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/auditingsecurityevents/cs/auditingsecurityevents.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/auditingsecurityevents/cs/auditingsecurityevents.cs.md)
     [AuditingSecurityEvents#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/auditingsecurityevents/vb/auditingsecurityevents.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/auditingsecurityevents/vb/auditingsecurityevents.vb.md)

     The default `SuppressAuditFailure` property is `true`, so that the failure to audit does not affect the application. Otherwise, an exception is thrown. For any successful audit, a verbose trace is written. For any failure to audit, the trace is written at the Error level.

4. Delete the existing [System.ServiceModel.Description.ServiceSecurityAuditBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceSecurityAuditBehavior) from the collection of behaviors found in the description of a [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost). The behavior collection is accessed by the [System.ServiceModel.Description.ServiceDescription.Behaviors](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDescription.Behaviors) property, which in turn is accessed from the [System.ServiceModel.ServiceHostBase.Description](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase.Description) property. Then add the new [System.ServiceModel.Description.ServiceSecurityAuditBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceSecurityAuditBehavior) to the same collection, as shown in the following code.

     [AuditingSecurityEvents#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/auditingsecurityevents/cs/auditingsecurityevents.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/auditingsecurityevents/cs/auditingsecurityevents.cs.md)
     [AuditingSecurityEvents#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/auditingsecurityevents/vb/auditingsecurityevents.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/auditingsecurityevents/vb/auditingsecurityevents.vb.md)

### To set up auditing in configuration

1. To set up auditing in configuration, add a [\<behavior>](../../configure-apps/file-schema/wcf/behavior-of-endpointbehaviors.md) element to the [\<behaviors>](../../configure-apps/file-schema/wcf/behaviors.md) section of the web.config file. Then add a [\<serviceSecurityAudit>](../../configure-apps/file-schema/wcf/servicesecurityaudit.md) element and set the various attributes, as shown in the following example.

    ```xml
    <behaviors>
       <behavior name="myAuditBehavior">
          <serviceSecurityAudit auditLogLocation="Application"
                suppressAuditFailure="false"
                serviceAuthorizationAuditLevel="None"
                messageAuthenticationAuditLevel="SuccessOrFailure" />
          </behavior>
    </behaviors>
    ```

2. You must specify the behavior for the service, as shown in the following example.

    ```xml
    <services>
        <service type="WCS.Samples.Service.Echo"
        behaviorConfiguration=" myAuditBehavior">
           <endpoint address=""
                    binding="wsHttpBinding"
                    bindingConfiguration="CertificateDefault"
                    contract="WCS.Samples.Service.IEcho" />
        </service>
    </services>
    ```

## Example

 The following code creates an instance of the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) class and adds a new [System.ServiceModel.Description.ServiceSecurityAuditBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceSecurityAuditBehavior) to its collection of behaviors.

 [AuditingSecurityEvents#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/auditingsecurityevents/cs/auditingsecurityevents.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/auditingsecurityevents/cs/auditingsecurityevents.cs.md)
 [AuditingSecurityEvents#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/auditingsecurityevents/vb/auditingsecurityevents.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/auditingsecurityevents/vb/auditingsecurityevents.vb.md)

## .NET Framework Security

 Setting the [System.ServiceModel.Description.ServiceSecurityAuditBehavior.SuppressAuditFailure](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceSecurityAuditBehavior.SuppressAuditFailure) property to `true`, suppresses any failure to generate security audits (if set to `false`, an exception is thrown). However, if you enable the following Windows **Local Security Setting** property, a failure to generate audit events will cause Windows to shut down immediately:

 **Audit: Shut down system immediately if unable to log security audits**

 To set the property, open the **Local Security Settings** dialog box. Under **Security Settings**, click **Local Policies**. Then click **Security Options**.

 If the [System.ServiceModel.AuditLogLocation](https://learn.microsoft.com/search/?terms=System.ServiceModel.AuditLogLocation) property is set to [System.ServiceModel.AuditLogLocation.Security](https://learn.microsoft.com/search/?terms=System.ServiceModel.AuditLogLocation.Security) and **Audit Object Access** is not set in the **Local Security Policy**, audit events will not be written to the Security log. Note that no failure is returned, but audit entries are not written to the Security log.

## See also

- [System.ServiceModel.Description.ServiceSecurityAuditBehavior.AuditLogLocation*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceSecurityAuditBehavior.AuditLogLocation*)
- [System.ServiceModel.Description.ServiceSecurityAuditBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceSecurityAuditBehavior)
- [System.ServiceModel.AuditLogLocation](https://learn.microsoft.com/search/?terms=System.ServiceModel.AuditLogLocation)
- [Auditing](auditing-security-events.md)
