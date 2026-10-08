---
title: Configure bot protection for Web Application Firewall with Azure Front Door
description: Learn how to configure bot protection rule in Azure Web Application Firewall (WAF) for Front Door by using Azure portal.
author: halkazwini
ms.author: halkazwini
ms.service: azure-web-application-firewall
ms.topic: how-to
ms.date: 11/10/2022
ms.custom: devx-track-bicep
zone_pivot_groups: web-application-firewall-configuration
# Customer intent: As a security administrator, I want to configure bot protection rules in the Web Application Firewall for Azure Front Door, so that I can effectively manage traffic from bots and enhance the security posture of my web applications.
---

# Configure bot protection for Web Application Firewall

**Applies to:** :heavy_check_mark: Front Door Premium

The Azure Web Application Firewall (WAF) for Front Door provides bot rules to identify good bots and protect from bad bots. For more information on the bot protection rule set, see [Bot protection rule set](afds-overview.md#bot-protection-rule-set).

This article shows how to enable bot protection rules on the Azure Front Door Premium tier.

## Prerequisites

Create a basic WAF policy for Front Door by following the instructions described in [Create a WAF policy for Azure Front Door by using the Azure portal](waf-front-door-create-portal.md).

**Applies to: portal**


## Enable the bot protection rule set

1. In the Azure portal, navigate to your WAF policy.

1. Select **Managed rules**, then select **Assign**.

   Screenshot of the Azure portal showing the WAF policy's managed rules configuration, and the Assign button highlighted.

1. In the **Additional rule set** drop-down list, select the version of the bot protection rule set that you want to use. It's usually a good practice to use the most recent version of the rule set.

   Screenshot of the Azure portal showing the managed rules assignment page, with the 'Additional rule set' drop-down field highlighted.

1. Select **Save**.



**Applies to: powershell**


## Get your WAF policy's current configuration

Use the [Get-AzFrontDoorWafPolicy](https://learn.microsoft.com/powershell/module/az.frontdoor/get-azfrontdoorwafpolicy) cmdlet to retrieve the current configuration of your WAF policy. Ensure that you use the correct resource group name and WAF policy name for your own environment.

```azurepowershell
$frontDoorWafPolicy = Get-AzFrontDoorWafPolicy `
  -ResourceGroupName 'FrontDoorWafPolicy' `
  -Name 'WafPolicy'
```

## Add the bot protection rule set

Use the [New-AzFrontDoorWafManagedRuleObject](https://learn.microsoft.com/powershell/module/az.frontdoor/new-azfrontdoorwafmanagedruleobject) cmdlet to select the bot protection rule set, including the version of the rule set. Then, add the rule set to the WAF's configuration.

The example below adds version 1.0 of the bot protection rule set to the WAF's configuration.

```azurepowershell
$botProtectionRuleSet = New-AzFrontDoorWafManagedRuleObject `
  -Type 'Microsoft_BotManagerRuleSet' `
  -Version '1.0'

$frontDoorWafPolicy.ManagedRules.Add($botProtectionRuleSet)
```

## Apply the configuration

Use the [Update-AzFrontDoorWafPolicy](https://learn.microsoft.com/powershell/module/az.frontdoor/update-azfrontdoorwafpolicy) cmdlet to update your WAF policy to include the configuration you created above.

```azurepowershell
$frontDoorWafPolicy | Update-AzFrontDoorWafPolicy
```



**Applies to: cli**


## Enable the bot protection rule set

Use the [az network front-door waf-policy managed-rules add](https://learn.microsoft.com/cli/azure/network/front-door/waf-policy/managed-rules#az-network-front-door-waf-policy-managed-rules-add) command to update your WAF policy to add the bot protection rule set.

The example below adds version 1.0 of the bot protection rule set to the WAF. Ensure that you use the correct resource group name and WAF policy name for your own environment.

```azurecli
az network front-door waf-policy managed-rules add \
  --resource-group FrontDoorWafPolicy \
  --policy-name WafPolicy \
  --type Microsoft_BotManagerRuleSet \
  --version 1.0
```



**Applies to: bicep**


The following example Bicep file shows how to do the following steps:

- Create a Front Door WAF policy.
- Enable version 1.0 of the bot protection rule set.

```bicep
param wafPolicyName string = 'WafPolicy'

@description('The mode that the WAF should be deployed using. In "Prevention" mode, the WAF will block requests it detects as malicious. In "Detection" mode, the WAF will not block requests and will simply log the request.')
@allowed([
  'Detection'
  'Prevention'
])
param wafMode string = 'Prevention'

resource wafPolicy 'Microsoft.Network/frontDoorWebApplicationFirewallPolicies@2022-05-01' = {
  name: wafPolicyName
  location: 'Global'
  sku: {
    name: 'Premium_AzureFrontDoor'
  }
  properties: {
    policySettings: {
      enabledState: 'Enabled'
      mode: wafMode
    }
    managedRules: {
      managedRuleSets: [
        {
          ruleSetType: 'Microsoft_BotManagerRuleSet'
          ruleSetVersion: '1.0'
        }
      ]
    }
  }
}
```



## Next steps

- Learn how to [monitor WAF](waf-front-door-monitor.md).
