---
description: "Learn more about: Create a Non-Claims-Aware Relying Party Trust"
title: Create a Non-Claims Aware Relying Party Trust
ms.date: 02/13/2024
ms.topic: how-to
---


# Create a Non-Claims-Aware Relying Party Trust


In the AD FS Management snap\-in, non\-claims\-aware relying party trusts are objects that are created to represent the trust between the federation service and a single web\-based application that is not claims\-aware and that is accessed through the Web Application Proxy.

A non\-claims\-aware relying party trust is a relying party trust which consists of identifiers, names, and rules for authentication and authorization when the relying party trust is accessed through the Web Application Proxy. These web\-based applications that do not rely on claims, in other words, these Integrated Windows Authentication\-based applications, can have authorization rules that enforce access that is based on claims when the access is external to the corporate network through the Web Application Proxy.

To add a new non\-claims\-aware relying party trust, by using the AD FS Management snap\-in, perform the following procedure.

Membership in **Administrators**, or equivalent, on the local computer is the minimum required to complete this procedure.  Review details about using the appropriate accounts and group memberships at [Local and Domain Default Groups](https://learn.microsoft.com/previous-versions/orphan-topics/ws.10/dd728026\(v=ws.10\)).

## To create a non-claims aware Relying Party Trust manually
1. In Server Manager, click **Tools**, and then select **AD FS Management**.

2.  Under **Actions**, click **Add Relying Party Trust**.
Screenshot that highlights the Add Relying Party Trust action.

3.  On the **Welcome** page, choose **Non claims aware** and click **Start**.
Screenshot that highlights the Non claims aware option.

4.  On the **Specify Display Name** page, type a name in **Display name**, under **Notes** type a description for this relying party trust, and then click **Next**.
Screenshot that shows where to specify the name for the relying party trust.

5. On the **Configure Identifiers** page, specify one or more identifiers for this relying party, click **Add** to add them to the list, and then click **Next**.
Screenshot that shows where to specify one or more identifiers for the relying party trust.

6.  On the **Choose Access Control Policy** select a policy and click **Next**.  For more information about Access Control Policies, see [Access Control Policies in AD FS](Access-Control-Policies-in-AD-FS.md).
Screenshot that shows where to select an Access Control Policy for the relying party trust.

7. On the **Ready to Add Trust** page, review the settings, and then click **Next** to save your relying party trust information.
   Screenshot that shows how to save your relying party trust information.

8. On the **Finish** page, click **Close**. This action automatically displays the **Edit Claim Rules** dialog box.
relying party

## See Also
[AD FS Operations](../ad-fs-operations.md)
