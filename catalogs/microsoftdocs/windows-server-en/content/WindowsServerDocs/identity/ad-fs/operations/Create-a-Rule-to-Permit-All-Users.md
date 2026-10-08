---
description: "Learn more about: Create a Rule to Permit All Users"
title: Create a Rule to Permit All Users
ms.date: 02/13/2024
ms.topic: how-to
---

# Create a Rule to Permit All Users

In Windows Server 2016, you can use an **Access Control Policy** to create a rule that will give all users access to a relying party.  In Windows Server 2012 R2, using the **Permit All Users** rule template in Active Directory Federation Services \(AD FS\), you can create an authorization rule that will give all users access to the relying party.

You can use additional authorization rules to further restrict access. Users who are permitted to access the relying party from the Federation Service may still be denied service by the relying party.

You can use the following procedures to create a claim rule with the AD FS Management snap\-in.

Membership in **Administrators**, or equivalent, on the local computer is the minimum required to complete this procedure.  Review details about using the appropriate accounts and group memberships at [Local and Domain Default Groups](https://learn.microsoft.com/previous-versions/orphan-topics/ws.10/dd728026\(v=ws.10\)).

## To create a rule to permit all users in Windows Server 2016

1.  In Server Manager, click **Tools**, and then select **AD FS Management**.

2.  In the console tree, under **AD FS**, click **Relying Party Trusts**.
Screenshot that shows where to select Relying Party Trusts.

3.  Right-click the **Relying Party Trust** that you want to permit access to and select **Edit Access Control Policy**.
Screenshot that shows where to select Edit Access Control Policy.

4. On the Access control policy select **Permit everyone** and then click **Apply** and **Ok**.
Screenshot that highlights the Permit everyone Access control policy.

## To create a rule to permit all users in Windows Server 2012 R2

1.  In Server Manager, click **Tools**, and then select **AD FS Management**.

2.  In the console tree, under **AD FS\\Trust Relationships\\Relying Party Trusts**, click a specific trust in the list where you want to create this rule.

3.  Right\-click the selected trust, and then click **Edit Claim Rules**.
Screenshot that shows where to select Edit Claim Rules.

4.  In the **Edit Claim Rules** dialog box, click the **Issuance Authorization Rules** tab or the **Delegation Authorization Rules** tab \(based on the type of authorization rule you require\), and then click **Add Rule** to start the **Add Authorization Claim Rule Wizard**.
Screenshot that shows the Issuance Authorization Rules tab.
5.  On the **Select Rule Template** page, under **Claim rule template**, select **Permit All Users** from the list, and then click **Next**.
create rule
6.  On the **Configure Rule** page, click **Finish**.

7.  In the **Edit Claim Rules** dialog box, click **OK** to save the rule.

## Additional references
[Configure Claim Rules](Configure-Claim-Rules.md)

[Checklist: Creating Claim Rules for a Relying Party Trust](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/ee913578\(v=ws.11\))

[When to Use an Authorization Claim Rule](../technical-reference/When-to-Use-an-Authorization-Claim-Rule.md)

[The Role of Claims](../technical-reference/The-Role-of-Claims.md)

[The Role of Claim Rules](../technical-reference/The-Role-of-Claim-Rules.md)
