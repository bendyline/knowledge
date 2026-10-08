---
title: Set up an instance and authentication (portal)
titleSuffix: Azure Digital Twins
description: See how to set up an instance of the Azure Digital Twins service using the Azure portal
author: baanders
ms.author: baanders
ms.date: 2/12/2025
ms.topic: how-to
ms.service: azure-digital-twins
ms.custom:
  - subject-rbac-steps
  - engagement-fy23
  - sfi-image-nochange
---

# Set up an Azure Digital Twins instance and authentication (portal)


> 
> * [Portal](how-to-set-up-instance-portal.md)
> * [CLI](how-to-set-up-instance-cli.md)


This article covers the steps to set up a new Azure Digital Twins instance, including creating the instance and setting up authentication. After completing this article, you'll have an Azure Digital Twins instance ready to start programming against.

This version of this article goes through these steps manually, one by one, using the Azure portal. The Azure portal is a web-based, unified console that provides an alternative to command-line tools.


Full setup for a new Azure Digital Twins instance consists of two parts:
1. Creating the instance.
2. Setting up user access permissions: Azure users need to have the **Azure Digital Twins Data Owner** role on the Azure Digital Twins instance to be able to manage it and its data. In this step, you as an Owner/administrator of the Azure subscription assigns this role to the person who manages your Azure Digital Twins instance. This person might be yourself or someone else in your organization.
 
>**Important:**
>To complete this full article and set up a usable instance, you need permissions to manage both resources and user access on the Azure subscription. Anyone who's able to create resources on the subscription can complete the first step, but the second step requires user access management permissions (or the cooperation of someone with these permissions). You can read more about the required permissions in the [Prerequisites: Required permissions](#prerequisites-permission-requirements) section for the user access permission step.


## Create the Azure Digital Twins instance


In this section, you create a new instance of Azure Digital Twins using the [Azure portal](https://portal.azure.com/). Navigate to the portal and sign in with your credentials.

1. Once in the portal, start by selecting **Create a resource** in the Azure services home page menu.

    Screenshot of the Azure portal, highlighting the 'Create a resource' icon from the home page.

2. Search for *Azure Digital Twins* in the search box, and choose the **Azure Digital Twins** service from the results. 
    
    Leave the **Plan** field set to **Azure Digital Twins** and select the **Create** button to start creating a new instance of the service.

    Screenshot of the Azure portal, highlighting the 'Create' button from the Azure Digital Twins service page.

3. On the following **Create Resource** page, fill in the following values:
    * **Subscription**: The Azure subscription you're using.
      - **Resource group**: A resource group in which to deploy the instance. If you don't already have an existing resource group in mind, you can create one here by selecting the **Create new** link and entering a name for a new resource group.
    * **Resource name**: A name for your Azure Digital Twins instance. If your subscription has another Azure Digital Twins instance in the region that's already using the specified name, you are asked to pick a different name.
    * **Region**: An Azure Digital Twins-enabled region for the deployment. For more details on regional support, visit [Azure products available by region (Azure Digital Twins)](https://azure.microsoft.com/global-infrastructure/services/?products=digital-twins).
    * **Grant access to resource**: Checking the box in this section gives your Azure account permission to access and manage data in the instance. If you're the one that will be managing the instance, you should check this box now. If it's greyed out because you don't have permission in the subscription, you can continue creating the resource and have someone with the required permissions grant you the role later. For more information about this role and assigning roles to your instance, see the next section, [Set up user access permissions](#set-up-user-access-permissions).

    Screenshot of the Create Resource process for Azure Digital Twins in the Azure portal. The described values are filled in.

4. When you're finished, you can select **Review + create** if you don't want to configure any more settings for your instance. Doing so takes you to a summary page, where you can review the instance details that you entered and finish with **Create**. 

    If you do want to configure more details for your instance, the next section describes the remaining setup tabs.

### Additional setup options

Here are the additional options you can configure during setup, using the other tabs in the **Create Resource** process.

* **Networking**: In this tab, you can enable private endpoints with [Azure Private Link](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-link-overview.md) to eliminate public network exposure to your instance. For instructions, see [Enable private access with Private Link](how-to-enable-private-link.md?tabs=portal#add-a-private-endpoint-during-instance-creation).
* **Advanced**: In this tab, you can enable a system-assigned [managed identity](concepts-security.md#managed-identity-for-accessing-other-resources) for your instance. When this option is enabled, Azure automatically creates an identity for the instance in [Microsoft Entra ID](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-whatis.md), which can be used to authenticate to other services. You can enable that system-assigned managed identity while you're creating the instance here, or [later on an existing instance](#enabledisable-managed-identity-for-the-instance). If you want to enable a user-assigned managed identity instead, you need to do it later on an existing instance.
* **Tags**: In this tab, you can add tags to your instance to help you organize it among your Azure resources. For more about Azure resource tags, see [Tag resources, resource groups, and subscriptions for logical organization](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

### Verify success and collect important values

After finishing your instance setup by selecting **Create**, you can view the status of your instance's deployment in your Azure notifications along the portal icon bar. The notification indicates when deployment succeeds, at which point you can select the **Go to resource** button to view your created instance.

Screenshot of the Azure notifications showing a successful deployment and highlighting the 'Go to resource' button in the Azure portal.

If deployment fails, the notification indicates why. Observe the advice from the error message and retry creating the instance.

>**Tip:**
>Once your instance is created, you can return to its page at any time by searching for the name of your instance in the Azure portal search bar.

From the instance's **Overview** page, note its **Name**, **Resource group**, and **Host name**. These values are all important and you might need to use them as you continue working with your Azure Digital Twins instance. If other users will be programming against the instance, you should share these values with them.

Screenshot of the Azure portal, highlighting the important values from the Azure Digital Twins instance's Overview page.

You now have an Azure Digital Twins instance ready to go. Next, you'll give the appropriate Azure user permissions to manage it.

## Set up user access permissions


Azure Digital Twins uses [Microsoft Entra ID](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-whatis.md) for role-based access control (RBAC). This means that before a user can make data plane calls to your Azure Digital Twins instance, that user needs to be assigned a role with appropriate permissions for it.

For Azure Digital Twins, this role is **Azure Digital Twins Data Owner**. You can read more about roles and security in [Security for Azure Digital Twins solutions](concepts-security.md).

> **Note:**
> This role is different from the Microsoft Entra ID **Owner** role, which can also be assigned at the scope of the Azure Digital Twins instance. These are two distinct management roles, and **Owner** doesn't grant access to data plane features that are granted with **Azure Digital Twins Data Owner**.

This section shows you how to create a role assignment for a user in your Azure Digital Twins instance, using that user's email in the Microsoft Entra tenant on your Azure subscription. Depending on your role in your organization, you might set up this permission for yourself, or set it up on behalf of someone else who manages the Azure Digital Twins instance.


There are two ways to create a role assignment for a user in Azure Digital Twins:
* [During Azure Digital Twins instance creation](#assign-the-role-during-instance-creation)
* [Using Azure Identity Management (IAM)](#assign-the-role-using-azure-identity-management-iam)

They both require the same permissions.

### Prerequisites: Permission requirements


To be able to complete all the following steps, you need to have a [role in your subscription](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/rbac-and-directory-admin-roles.md) that has the following permissions:
* Create and manage Azure resources
* Manage user access to Azure resources (including granting and delegating permissions)

Common roles that meet this requirement are **Owner**, **Account admin**, or the combination of **User Access Administrator** and **Contributor**. For a complete explanation of roles and permissions, including what permissions are included with other roles, visit [Azure roles, Microsoft Entra roles, and classic subscription administrator roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/rbac-and-directory-admin-roles.md) in the Azure RBAC documentation.

To view your role in your subscription, visit the [Subscriptions page](https://portal.azure.com/#blade/Microsoft_Azure_Billing/SubscriptionsBlade) in the Azure portal (you can use this link or look for *Subscriptions* with the portal search bar). Look for the name of the subscription you're using, and view your role for it in the **My role** column:

Screenshot of the Subscriptions page in the Azure portal, showing user as an owner.

If you find that the value is **Contributor**, or another role that doesn't have the required permissions previously described, you can contact the user on your subscription that does have these permissions (such as a subscription Owner or Account admin) and proceed in one of the following ways:
* Request that they complete the role assignment steps on your behalf.
* Request that they elevate your role on the subscription so that you have the permissions to proceed yourself. Whether this request is appropriate can depend on your organization and your role within it.


### Assign the role during instance creation

While creating your Azure Digital Twins resource through the process described [earlier in this article](#create-the-azure-digital-twins-instance), select the **Assign Azure Digital Twins Data Owner Role** under **Grant access to resource**. Doing so grants yourself full access to the data plane APIs.

Screenshot of the Create Resource process for Azure Digital Twins in the Azure portal. The checkbox under Grant access to resource is highlighted.

If you don't have permission to assign a role to an identity, the box appears greyed out.

Screenshot of the Create Resource process for Azure Digital Twins in the Azure portal. The checkbox under Grant access to resource is disabled.

In that case, you can still continue to successfully create the Azure Digital Twins resource, but someone with the appropriate permissions needs to assign this role to you or to the person who will manage the instance's data.

### Assign the role using Azure Identity Management (IAM)

You can also assign the **Azure Digital Twins Data Owner** role using the access control options in Azure Identity Management (IAM).

1. First, open the page for your Azure Digital Twins instance in the Azure portal. 

1. Select **Access control (IAM)**.

1. Select **Add** > **Add role assignment** to open the Add role assignment page.

1. Assign the **Azure Digital Twins Data Owner** role. For detailed steps, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).
    
    | Setting | Value |
    | --- | --- |
    | Role | [Azure Digital Twins Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#azure-digital-twins-data-owner) |
    | Assign access to | User, group, or service principal |
    | Members | Search for the name or email address of the user to assign |
    
    Add role assignment page

### Verify success

You can view the role assignment you set up under **Access control (IAM) > Role assignments**. The user should show up in the list with a role of **Azure Digital Twins Data Owner**. 

Screenshot of the role assignments for an Azure Digital Twins instance in the Azure portal.

You now have an Azure Digital Twins instance ready to go, and assigned permissions to manage it.

## Enable/disable managed identity for the instance

This section shows you how to add a managed identity (either system-assigned or user-assigned) to an existing Azure Digital Twins instance. You can also use this page to disable managed identity on an instance that has it already.

Start by opening the [Azure portal](https://portal.azure.com) in a browser.

1. Search for the name of your instance in the portal search bar, and select it to view its details.

1. Select **Settings > Identity** in the left-hand menu.

1. Use the tabs to select which type of managed identity you want to add or remove.
    1. **System-assigned**: After selecting this tab, select the **On** option to turn on this feature, or **Off** to remove it.

       Screenshot of the Azure portal showing the Identity page and system-assigned options for an Azure Digital Twins instance.

        Select the **Save** button, and **Yes** to confirm. After system-assigned identity is turned on, more fields will be displayed on this page showing the new identity's **Object ID** and **Permissions** (Azure role assignments).

    1. **User-assigned (preview)**: After selecting this tab, select **Associate a user-assigned managed identity** and follow the prompts to choose an identity to associate with the instance.

       Screenshot of the Azure portal showing the Identity page and user-assigned options for an Azure Digital Twins instance.

        Or, if there's already an identity listed here that you want to disable, you can check the box next to it in the list and **Remove** it.

        Once an identity is added, you can select its name from the list here to open its details. From its details page, you can view its **Object ID** and use the left menu to see its **Azure role assignments**.

### Considerations for disabling managed identities

It's important to consider the effects that any changes to the identity or its roles can have on the resources that use it. If you're [using managed identities with your Azure Digital Twins endpoints](how-to-create-endpoints.md#endpoint-options-identity-based-authentication) or for [data history](how-to-create-data-history-connection.md) and the identity is disabled, or a necessary role is removed from it, the endpoint or data history connection can become inaccessible and the flow of events is disrupted.

## Next steps

Test out individual REST API calls on your instance using the Azure Digital Twins CLI commands: 
* [az dt reference](https://learn.microsoft.com/cli/azure/dt)
* [Azure Digital Twins CLI command set](concepts-cli.md)

Or, see how to connect a client application to your instance with authentication code:
* [Write app authentication code](how-to-authenticate-client.md)
