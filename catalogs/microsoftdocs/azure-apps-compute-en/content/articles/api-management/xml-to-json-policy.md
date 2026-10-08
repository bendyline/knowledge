---
title: Azure API Management policy reference - xml-to-json | Microsoft Docs
description: Reference for the xml-to-json policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 09/06/2024
---

# Convert XML to JSON

**APPLIES TO: All API Management tiers**



The `xml-to-json` policy converts a request or response body from XML to JSON. This policy can be used to modernize APIs based on XML-only backend web services.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<xml-to-json kind="javascript-friendly | direct" apply="always | content-type-xml" consider-accept-header="true | false" always-array-child-elements="true | false"/>
```


## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| kind | The attribute must be set to one of the following values.<br /><br /> -   `javascript-friendly` - the converted JSON has a form friendly to JavaScript developers.<br />-   `direct` - the converted JSON reflects the original XML document's structure.<br/><br/>Policy expressions are allowed. | Yes | N/A |
| apply | The attribute must be set to one of the following values.<br /><br /> -   `always` - convert always.<br />-   `content-type-xml` - convert only if response Content-Type header indicates presence of XML.<br/><br/>Policy expressions are allowed. | Yes | N/A |
| consider-accept-header | The attribute must be set to one of the following values.<br /><br /> -   `true` - apply conversion if JSON is requested in request Accept header.<br />-   `false` -always apply conversion.<br/><br/>Policy expressions are allowed. | No | `true` |
| always-array-child-elements | The attribute must be set to one of the following values.<br /><br /> -   `true` - Always convert child elements into a JSON array.<br />-   `false` - Only convert multiple child elements into a JSON array. Convert a single child element into a JSON object.<br/><br/>Policy expressions are allowed. | No | `false` |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound, on-error
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

## Example

```xml
<policies>
    <inbound>
        <base />
    </inbound>
    <outbound>
        <base />
        <xml-to-json kind="direct" apply="always" consider-accept-header="false" />
    </outbound>
</policies>
```

## Related policies

* [Transformation](api-management-policies.md#transformation)

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
