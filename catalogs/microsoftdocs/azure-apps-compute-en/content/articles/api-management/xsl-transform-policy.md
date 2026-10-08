---
title: Azure API Management policy reference - xsl-transform | Microsoft Docs
description: Reference for the xsl-transform policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Transform XML using an XSLT

**APPLIES TO: All API Management tiers**



The `xsl-transform` policy applies an XSL transformation to XML in the request or response body.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<xsl-transform>
    <parameter parameter-name="...">...</parameter>
    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
        <xsl:.../>
        <xsl:.../>
    </xsl:stylesheet>
  </xsl-transform>
```

## Elements

| Name | Description | Required |
| --- | --- | --- |
| parameter | Used to define variables used in the transform | No |
| xsl:stylesheet | Root stylesheet element. All elements and attributes defined within follow the standard [XSLT specification](https://www.w3.org/TR/xslt). | Yes |


## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

- This policy can only be used once in a policy section.
- Currently, this policy supports XSLT version 1.0.

## Examples

### Transform request body

```xml
<inbound>
    <base />
    <xsl-transform>
        <parameter name="User-Agent">@(context.Request.Headers.GetValueOrDefault("User-Agent","non-specified"))</parameter>
        <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
            <xsl:output method="xml" indent="yes" />
            <xsl:param name="User-Agent" />
            <xsl:template match="* | @* | node()">
                <xsl:copy>
                    <xsl:if test="self::* and not(parent::*)">
                        <xsl:attribute name="User-Agent">
                            <xsl:value-of select="$User-Agent" />
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select="* | @* | node()" />
                </xsl:copy>
            </xsl:template>
        </xsl:stylesheet>
      </xsl-transform>
</inbound>
```

### Transform response body

```xml
<policies>
  <inbound>
      <base />
  </inbound>
  <outbound>
      <base />
      <xsl-transform>
          <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
            <xsl:output omit-xml-declaration="yes" method="xml" indent="yes" />
            <!-- Copy all nodes directly-->
            <xsl:template match="node()| @*|*">
                <xsl:copy>
                    <xsl:apply-templates select="@* | node()|*" />
                </xsl:copy>
            </xsl:template>
          </xsl:stylesheet>
    </xsl-transform>
  </outbound>
</policies>
```

## Related policies

- [Transformation](api-management-policies.md#transformation)

## Related content

For more information about working with policies, see:

- [Tutorial: Transform and protect your API](transform-api.md)
- [Policy reference](api-management-policies.md) for a full list of policy statements and their settings
- [Policy expressions](api-management-policy-expressions.md)
- [Set or edit policies](set-edit-policies.md)
- [Reuse policy configurations](policy-fragments.md)
- [Policy snippets repo](https://github.com/Azure/api-management-policy-snippets)
- [Policy samples repo](https://github.com/Azure-Samples/Apim-Samples)
- [Azure API Management policy toolkit](https://github.com/Azure/azure-api-management-policy-toolkit/)
- [Get Copilot assistance to create, explain, and troubleshoot policies](https://learn.microsoft.com/azure/copilot/author-api-management-policies?toc=%2Fazure%2Fapi-management%2Ftoc.json\&bc=/azure/api-management/breadcrumb/toc.json)
