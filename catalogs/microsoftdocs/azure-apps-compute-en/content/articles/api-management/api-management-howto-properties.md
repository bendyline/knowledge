---
title: How to Use Named Values in Azure API Management policies
description: Learn how to use named values in Azure API Management policies. Named values can contain literal strings, policy expressions, and secrets stored in Azure Key Vault.
services: api-management

ms.service: azure-api-management
ms.topic: how-to
ms.date: 05/11/2026
ms.custom:
  - engagement-fy23
  - devx-track-azurecli
  - sfi-image-nochange
---

# Use named values in Azure API Management policies

**APPLIES TO: All API Management tiers**



[API Management policies](api-management-howto-policies.md) are a powerful capability of the system that allow the publisher to change the behavior of the API through configuration. Policies are a collection of statements that are executed sequentially on the request or response of an API. Policy statements can be constructed using literal text values, policy expressions, and named values.

*Named values* are a global collection of name/value pairs in each API Management instance. You can use named values to manage constant string values and secrets across all API configurations and policies.

Named values in the Azure portal

## Value types

| Type | Description |
| --- | --- |
| Plain | Literal string or policy expression |
| Secret | Literal string or policy expression that's encrypted by API Management |
| [Key vault](#key-vault-secrets) | Identifier of a secret stored in an Azure key vault. |

Plain values or secrets can contain [policy expressions](api-management-policy-expressions.md). For example, the expression `@(DateTime.Now.ToString())` returns a string containing the current date and time.

For details about the named value attributes, see the API Management [REST API reference](https://learn.microsoft.com/rest/api/apimanagement/named-value/create-or-update).

## Key vault secrets

Secret values can be stored either as encrypted strings in API Management (custom secrets) or by referencing secrets in [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview).


We recommend using key vault secrets because they help improve API Management security:

> **Note:**
> Currently, integration with key vault for this scenario isn't available in [workspaces](workspaces-overview.md).


* You can reuse secrets stored in key vaults across services.
* You can apply granular [access policies](https://learn.microsoft.com/azure/key-vault/general/security-features#privileged-access) to secrets.
* Secrets updated in the key vault are automatically rotated in API Management. After update in the key vault, a named value in API Management is updated within four hours. You can also manually refresh the secret using the Azure portal or via the management REST API.

> **Note:**
> The secrets stored in Azure Key Vault must be between 1 and 4096 characters, because API Management can't retrieve values that exceed this limit.

## Prerequisites

* If you haven't created an API Management service instance yet, see [Quickstart: Create a new Azure API Management instance by using the Azure portal](get-started-create-service-instance.md).

### Prerequisites for key vault integration

> **Note:**
> Currently, this feature isn't available in [workspaces](workspaces-overview.md).

* If you don't already have a key vault, create one. For steps to create a key vault, see [Quickstart: Create a key vault using the Azure portal](https://learn.microsoft.com/azure/key-vault/general/quick-create-portal).

    To create or import a secret to the key vault, see [Quickstart: Set and retrieve a secret from Azure Key Vault using the Azure portal](https://learn.microsoft.com/azure/key-vault/secrets/quick-create-portal).

* Enable a system-assigned or user-assigned [managed identity](api-management-howto-use-managed-service-identity.md) in the API Management instance.

   

### Configure access to key vault

1. In the Azure portal, go to your key vault.
1. In the left menu, select **Settings** > **Access configuration**. Make a note of the configured **Permission model**.
1. Depending on the permission model, configure either a [key vault access policy](https://learn.microsoft.com/azure/key-vault/general/assign-access-policy) or [Azure RBAC access](https://learn.microsoft.com/azure/key-vault/general/rbac-guide) for an API Management managed identity.
    
**To add a key vault access policy:**

1. In the left menu, select **Access policies**.
1. On the **Access policies** page, select **+ Create**.
1. On the **Permissions** tab, under **Secret permissions**, select **Get** and **List**, and then select **Next**.
1. On the **Principal** tab, search for  the resource name of your managed identity, then select **Next**.
     If you're using a system-assigned identity, the principal is the name of your API Management instance.
1. Select **Next** again. On the **Review + create** tab, select **Create**.

    
**To configure Azure RBAC access:<br/>**

1. In the left menu, select **Access control (IAM)**.
1. On the **Access control (IAM)** page, select **Add role assignment**.
1. On the **Role** tab, select **Key Vault Secrets User**, then select **Next**.
1. On the **Members** tab, select **Managed identity** > **+ Select members**.
1. On the **Select managed identity** page, select the system-assigned managed identity or a user-assigned managed identity associated with your API Management instance, and then select **Select**.
1. Select **Review + assign**.



#### Requirements for Key Vault firewall

If [Key Vault firewall](https://learn.microsoft.com/azure/key-vault/general/network-security) is enabled on your key vault, you must meet these requirements:

- You **must** use the API Management instance's system-assigned managed identity to access the key vault. You can't use a user-assigned identity for access from API Management. 

- In Key Vault firewall, enable the **Allow Trusted Microsoft Services to bypass this firewall** option: 

  1. In your key vault, select **Settings** > **Networking**.
  1. Under **Firewalls and virtual networks**, select **Allow public access from specific virtual networks and IP addresses**.
  1. Under **Exception**, select **Allow trusted Microsoft services to bypass this firewall**.

  API Management supports trusted service connectivity to access the key vault for control-plane options.

- Ensure that your local client IP address is allowed to access the key vault temporarily. You must select a certificate or secret to add to Azure API Management. For more information, see [Configure Azure Key Vault networking settings](https://learn.microsoft.com/azure/key-vault/general/how-to-azure-key-vault-network-security).

  After you complete the configuration, you can block your client address in the key vault firewall.

#### Virtual network requirements

If the API Management instance is deployed in a virtual network, also configure the following network settings:

- Enable a [service endpoint](https://learn.microsoft.com/azure/key-vault/general/overview-vnet-service-endpoints) to Key Vault on the API Management subnet.
- Configure a network security group (NSG) rule to allow outbound traffic to the `AzureKeyVault` and `AzureActiveDirectory` [service tags](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/service-tags-overview.md).

For more information, see [Network configuration when setting up API Management in a virtual network](virtual-network-reference.md).


## Add or edit a named value

### Add a key vault secret to API Management

See [Prerequisites for key vault integration](#prerequisites-for-key-vault-integration).

> **Important:**
> When adding a key vault secret to your API Management instance, you must have permissions to list secrets from the key vault.

> **Caution:**
> When using a key vault secret in API Management, be careful not to delete the secret, key vault, or managed identity used to access the key vault.

1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance.
1. Under **APIs**, select **Named values** > **+ Add**.
1. Enter a **Name** identifier, and enter a **Display name** used to reference the property in policies.
1. Add one or more optional **Tags** to help organize your named values.
1. In the **Type** drop-down, select **Key vault**.
1. Enter the identifier of a key vault secret (without version), or choose **Select** to select a secret from a key vault.
    > **Important:**
    > If you enter a key vault secret identifier yourself, ensure that it doesn't have version information. Otherwise, the secret won't rotate automatically in API Management after an update in the key vault.
1. In **Client identity**, select a system-assigned or an existing user-assigned managed identity. Learn how to [add or modify managed identities in your API Management service](api-management-howto-use-managed-service-identity.md).
    > **Note:**
    > The identity needs permissions to get and list secrets from the key vault. If you haven't already configured access to the key vault, API Management prompts you so it can automatically configure the identity with the necessary permissions.
1. Select **Save**, then select **Create**.

    Add key vault secret value

### Add a plain or secret value to API Management

### [Portal](#tab/azure-portal)

1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance.
1. Under **APIs**, select **Named values** > **+Add**.
1. Enter a **Name** identifier, and enter a **Display name** used to reference the property in policies.
1. In the **Type** drop-down, select **Plain** or **Secret**.
1. In **Value**, enter a string or policy expression.
1. Add one or more optional tags to help organize your named values, then **Save**.
1. Select **Create**.

Once the named value is created, you can edit it by selecting the name. If you change the display name, any policies that reference that named value are automatically updated to use the new display name.

### [Azure CLI](#tab/azure-cli)

To begin using Azure CLI:

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/api-management-howto-properties.md)

To add a named value, use the [az apim nv create](https://learn.microsoft.com/cli/azure/apim/nv#az-apim-nv-create) command. Substitute your resource group name and API Management instance name for the `resource-group` and `service-name` values.

```azurecli
az apim nv create --resource-group apim-hello-word-resource-group \
    --display-name "named_value_01" --named-value-id named_value_01 \
    --secret true --service-name apim-hello-world --value test
```

After you create a named value, you can update it by using the [az apim nv update](https://learn.microsoft.com/cli/azure/apim/nv#az-apim-nv-update) command. To see all your named values, run the [az apim nv list](https://learn.microsoft.com/cli/azure/apim/nv#az-apim-nv-list) command:

```azurecli
az apim nv list --resource-group apim-hello-word-resource-group \
    --service-name apim-hello-world --output table
```

To see the details of the named value you created for this example, run the [az apim nv show](https://learn.microsoft.com/cli/azure/apim/nv#az-apim-nv-show) command:

```azurecli
az apim nv show --resource-group apim-hello-word-resource-group \
    --service-name apim-hello-world --named-value-id named_value_01
```

This example is a secret value. The previous command doesn't return the value. To see the value, run the [az apim nv show-secret](https://learn.microsoft.com/cli/azure/apim/nv#az-apim-nv-show-secret) command:

```azurecli
az apim nv show-secret --resource-group apim-hello-word-resource-group \
    --service-name apim-hello-world --named-value-id named_value_01
```

To delete a named value, use the [az apim nv delete](https://learn.microsoft.com/cli/azure/apim/nv#az-apim-nv-delete) command:

```azurecli
az apim nv delete --resource-group apim-hello-word-resource-group \
    --service-name apim-hello-world --named-value-id named_value_01
```

---

## Use a named value

The examples in this section use the named values shown in the following table.

| Name | Value | Secret |
| --- | --- | --- |
| ContosoHeader | `TrackingId` | False |
| ContosoHeaderValue | •••••••••••••••••••••• | True |
| ExpressionProperty | `@(DateTime.Now.ToString())` | False |
| ContosoHeaderValue2 | `This is a header value.` | False |

To use a named value in a policy, place its display name inside a double pair of braces like `{{ContosoHeader}}`, as shown in the following example:

```xml
<set-header name="{{ContosoHeader}}" exists-action="override">
  <value>{{ContosoHeaderValue}}</value>
</set-header>
```

In this example, `ContosoHeader` is used as the name of a header in a `set-header` policy, and `ContosoHeaderValue` is used as the value of that header. When this policy is evaluated during a request or response to the API Management gateway, `{{ContosoHeader}}` and `{{ContosoHeaderValue}}` are replaced with their respective values.

You can use named values as complete attribute or element values as shown in the previous example, but they can also be inserted into or combined with part of a literal text expression as shown in the following example:

```xml
<set-header name = "CustomHeader{{ContosoHeader}}" ...>
```

Named values can also contain policy expressions. In the following example, the `ExpressionProperty` expression is used.

```xml
<set-header name="CustomHeader" exists-action="override">
    <value>{{ExpressionProperty}}</value>
</set-header>
```

When this policy is evaluated, `{{ExpressionProperty}}` is replaced with its value, `@(DateTime.Now.ToString())`. Because the value is a policy expression, the expression is evaluated and the policy proceeds with its execution.

You can test this in the Azure portal or the [developer portal](developer-portal-overview.md) by calling an operation that has a policy with named values in scope. In the following example, an operation is called with the two previous example `set-header` policies with named values. Notice that the response contains two custom headers that were configured using policies with named values.

Screenshot of a Test API response.

If you look at the outbound [API trace](api-management-howto-api-inspector.md) for a call that includes the two previous sample policies with named values, you can see the two `set-header` policies with the named values inserted as well as the policy expression evaluation for the named value that contained the policy expression.

Screenshot of an API Inspector trace.

You can also use string interpolation with named values.

```xml
<set-header name="CustomHeader" exists-action="override">
    <value>@($"The URL encoded value is {System.Net.WebUtility.UrlEncode("{{ContosoHeaderValue2}}")}")</value>
</set-header>
```

The value for `CustomHeader` will be `The URL encoded value is This+is+a+header+value.`.

> **Caution:**
> If a policy references a secret in Azure Key Vault, the value from the key vault is visible to users who have access to subscriptions enabled for [API request tracing](api-management-howto-api-inspector.md).

> **Important:**
> Named values referenced in policies are resolved at the service level at runtime. A user with permission to edit policies (for example, write access to Microsoft.ApiManagement/service/apis/policies) can read the contents of any named value by referencing it in a policy and using the `{{named-value-id}}` syntax, even if that user doesn't have explicit read access to the named value resource (Microsoft.ApiManagement/service/namedValues). When you grant policy editing permissions, consider that this effectively grants read access to all named values in the service instance.

While named values can contain policy expressions, they can't contain other named values. If text containing a named value reference is used for a value, such as `Text: {{MyProperty}}`, that reference won't be resolved and replaced.

## Delete a named value

To delete a named value, select the name, then select **Delete** from the context menu (**...**).

> **Important:**
> If the named value is referenced by any API Management policies, you can't delete it until you remove the named value from all policies that use it.

## Related content

Learn more about working with policies:

* [Policies in API Management](api-management-howto-policies.md)
* [Policy reference](api-management-policies.md)
* [Policy expressions](api-management-policy-expressions.md)
