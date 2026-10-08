---
title: Azure API Management policy reference - json-to-xml | Microsoft Docs
description: Reference for the json-to-xml policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Convert JSON to XML

**APPLIES TO: All API Management tiers**



The `json-to-xml` policy converts a request or response body from JSON to XML.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<json-to-xml 
    apply="always | content-type-json" 
    consider-accept-header="true | false" 
    parse-date="true | false" 
    namespace-separator="separator character"
    namespace-prefix="namespace prefix"
    attribute-block-name="name" />
```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| apply | The attribute must be set to one of the following values.<br /><br /> -   `always` - always apply conversion.<br />-   `content-type-json` - convert only if response Content-Type header indicates presence of JSON.<br/><br/>Policy expressions are allowed. | Yes | N/A |
| consider-accept-header | The attribute must be set to one of the following values.<br /><br /> -   `true` - apply conversion if XML is requested in request Accept header.<br />-   `false` - always apply conversion.<br/><br/>Policy expressions are allowed. | No | `true` |
| parse-date | When set to `false` date values are simply copied during transformation. Policy expressions aren't allowed. | No | `true` |
| namespace-separator | The character to use as a namespace separator. Policy expressions are allowed. | No | Underscore |
| namespace-prefix | The string that identifies property as namespace attribute, usually "xmlns". Properties with names beginning with specified prefix will be added to current element as namespace declarations. Policy expressions are allowed. | No | N/A |
| attribute-block-name | When set, properties inside the named object will be added to the element as attributes. Policy expressions are allowed. | No | Not set |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound, on-error
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

## Example

Consider the following policy:

```xml
<policies>
    <inbound>
        <base />
    </inbound>
    <outbound>
        <base />
        <json-to-xml apply="always" consider-accept-header="false" parse-date="false" namespace-separator=":" namespace-prefix="xmlns" attribute-block-name="#attrs" />
    </outbound>
</policies>
```

If the backend returns the following JSON:

``` json
{
  "soapenv:Envelope": {
    "xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
    "xmlns:v1": "http://localdomain.com/core/v1",
    "soapenv:Header": {},
    "soapenv:Body": {
      "v1:QueryList": {
        "#attrs": {
          "queryName": "test"
        },
        "v1:QueryItem": {
          "name": "dummy text"
        }
      }
    }
  }
}
```

The XML response to the client will be:

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://localdomain.com/core/v1">
  <soapenv:Header />
  <soapenv:Body>
    <v1:QueryList queryName="test">
      <name>dummy text</name>
    </v1:QueryList>
  </soapenv:Body>
</soapenv:Envelope>
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
