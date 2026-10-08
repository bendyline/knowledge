---
title: Azure API Management policy reference - validate-headers | Microsoft Docs
description: Reference for the validate-headers policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Validate headers

**APPLIES TO: All API Management tiers**



The `validate-headers` policy validates the response headers against the API schema.

> **Important:**
> If you imported an API using a management API version prior to `2021-01-01-preview`, the `validate-headers` policy might not work. You may need to reimport your API using management API version `2021-01-01-preview` or later.

> **Note:**
> The maximum size of the API schema that can be used by this validation policy is 4 MB. If the schema exceeds this limit, validation policies will return errors on runtime. To increase it, please contact [support](https://azure.microsoft.com/support/options/). 

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. To help you configure this policy, the portal provides a guided, form-based editor. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<validate-headers specified-header-action="ignore | prevent | detect" unspecified-header-action="ignore | prevent | detect" errors-variable-name="variable name">
    <header name="header name" action="ignore | prevent | detect" />
</validate-headers>
```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| specified-header-action | [Action](#actions) to perform for response headers specified in the API schema. Policy expressions are allowed. | Yes | N/A |
| unspecified-header-action | [Action](#actions) to perform for response headers that aren’t specified in the API schema. Policy expressions are allowed. | Yes | N/A |
| errors-variable-name | Name of the variable in `context.Variables` to log validation errors to. Policy expressions aren't allowed. | No | N/A |

## Elements

| Name | Description | Required |
| --- | --- | --- |
| header | Add one or more elements for named headers to override the default validation [actions](#actions) for headers in responses. | No |

## Actions

The content validation policies include one or more attributes that specify an action, which API Management takes when validating an entity in an API request or response against the API schema. 

* An action may be specified for elements that are represented in the API schema and, depending on the policy, for elements that aren't represented in the API schema. 

* An action specified in a policy's child element overrides an action specified for its parent.

Available actions:

| Action | Description |
| --- | --- |
| ignore | Skip validation. |
| prevent | Block the request or response processing, log the verbose [validation error](#validation-errors), and return an error. Processing is interrupted when the first set of errors is detected. |
| detect | Log [validation errors](#validation-errors), without interrupting request or response processing. |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) outbound, on-error
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

- This policy can only be used once in a policy section.

## Logs

Details about the validation errors during policy execution are logged to the variable in `context.Variables` specified in the `errors-variable-name` attribute in the policy's root element. When configured in a `prevent` action, a validation error blocks further request or response processing and is also propagated to the `context.LastError` property. 

To investigate errors, use a [trace](trace-policy.md) policy to log the errors from context variables to [Application Insights](api-management-howto-app-insights.md).

## Performance implications

Adding a validation policy may affect API throughput. The following general principles apply:
* The larger the API schema size, the lower the throughput will be. 
* The larger the payload in a request or response, the lower the throughput will be. 
* The size of the API schema has a larger impact on performance than the size of the payload. 
* Validation against an API schema that is several megabytes in size may cause request or response timeouts under some conditions. The effect is more pronounced in the  **Consumption** and **Developer** tiers of the service. 

We recommend performing load tests with your expected production workloads to assess the impact of validation policies on API throughput.


## Example

```xml
<validate-headers specified-header-action="ignore" unspecified-header-action="prevent" errors-variable-name="responseHeadersValidation" />
```


## Validation errors

API Management generates content validation errors  in the following format:

```
{
 "Name": string,
 "Type": string,
 "ValidationRule": string,
 "Details": string,
 "Action": string
}

```

The following table lists all possible errors of the validation policies. 

* **Details**: Can be used to investigate errors. Not meant to be shared publicly.
* **Public response**: Error returned to the client. Does not leak implementation details.

When a validation policy specifies the `prevent` action and produces an error, the response from API management includes an HTTP status code: 400 when the policy is applied in the inbound section, and 502 when the policy is applied in the outbound section.


| **Name** | **Type** | **Validation rule** | **Details** | **Public response** | **Action** |
| --- | --- | --- | --- | --- | --- |
| **validate-content** |  |  |  |  |  |
|  | RequestBody | SizeLimit | Request's body is {size} bytes long and it exceeds the configured limit of {maxSize} bytes. | Request's body is {size} bytes long and it exceeds the limit of {maxSize} bytes. | detect / prevent |
|  | ResponseBody | SizeLimit | Response's body is {size} bytes long and it exceeds the configured limit of {maxSize} bytes. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
| {messageContentType} | RequestBody | Unspecified | Unspecified content type {messageContentType} is not allowed. | Unspecified content type {messageContentType} is not allowed. | detect / prevent |
| {messageContentType} | ResponseBody | Unspecified | Unspecified content type {messageContentType} is not allowed. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
|  | ApiSchema |  | API's schema does not exist or it could not be resolved. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
|  | ApiSchema |  | API's schema does not specify definitions. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
| {messageContentType} | RequestBody / ResponseBody | MissingDefinition | API's schema does not contain definition {definitionName}, which is associated with the content type {messageContentType}. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
| {messageContentType} | RequestBody | IncorrectMessage | Body of the request does not conform to the definition {definitionName}, which is associated with the content type {messageContentType}.<br/><br/>{valError.Message} Line: {valError.LineNumber}, Position: {valError.LinePosition} | Body of the request does not conform to the definition {definitionName}, which is associated with the content type {messageContentType}.<br/><br/>{valError.Message} Line: {valError.LineNumber}, Position: {valError.LinePosition} | detect / prevent |
| {messageContentType} | ResponseBody | IncorrectMessage | Body of the response does not conform to the definition {definitionName}, which is associated with the content type {messageContentType}.<br/><br/>{valError.Message} Line: {valError.LineNumber}, Position: {valError.LinePosition} | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
|  | RequestBody | ValidationException | Body of the request cannot be validated for the content type {messageContentType}.<br/><br/>{exception details} | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
|  | ResponseBody | ValidationException | Body of the response cannot be validated for the content type {messageContentType}.<br/><br/>{exception details} | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
| **validate-parameters / validate-headers** |  |  |  |  |  |
| {paramName} / {headerName} | QueryParameter / PathParameter / RequestHeader | Unspecified | Unspecified {path parameter / query parameter / header} {paramName} is not allowed. | Unspecified {path parameter / query parameter / header} {paramName} is not allowed. | detect / prevent |
| {headerName} | ResponseHeader | Unspecified | Unspecified header {headerName} is not allowed. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
|  | ApiSchema |  | API's schema doesn't exist or it couldn't be resolved. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
|  | ApiSchema |  | API schema does not specify definitions. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
| {paramName} | QueryParameter / PathParameter / RequestHeader / ResponseHeader | MissingDefinition | API's schema does not contain definition {definitionName}, which is associated with the {query parameter / path parameter / header} {paramName}. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
| {paramName} | QueryParameter / PathParameter / RequestHeader | IncorrectMessage | Request cannot contain multiple values for the {query parameter / path parameter / header} {paramName}. | Request cannot contain multiple values for the {query parameter / path parameter / header} {paramName}. | detect / prevent |
| {headerName} | ResponseHeader | IncorrectMessage | Response cannot contain multiple values for the header {headerName}. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
| {paramName} | QueryParameter / PathParameter / RequestHeader | IncorrectMessage | Value of the {query parameter / path parameter / header} {paramName} does not conform to the definition.<br/><br/>{valError.Message} Line: {valError.LineNumber}, Position: {valError.LinePosition} | The value of the {query parameter / path parameter / header} {paramName} does not conform to the definition.<br/><br/>{valError.Message} Line: {valError.LineNumber}, Position: {valError.LinePosition} | detect / prevent |
| {headerName} | ResponseHeader | IncorrectMessage | Value of the header {headerName} does not conform to the definition.<br/><br/>{valError.Message} Line: {valError.LineNumber}, Position: {valError.LinePosition} | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
| {paramName} | QueryParameter / PathParameter / RequestHeader | IncorrectMessage | Value of the {query parameter / path parameter / header} {paramName} cannot be parsed according to the definition. <br/><br/>{ex.Message} | Value of the {query parameter / path parameter / header} {paramName} couldn't be parsed according to the definition. <br/><br/>{ex.Message} | detect / prevent |
| {headerName} | ResponseHeader | IncorrectMessage | Value of the header {headerName} couldn't be parsed according to the definition. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
| {paramName} | QueryParameter / PathParameter / RequestHeader | ValidationError | {Query parameter / Path parameter / Header} {paramName} cannot be validated.<br/><br/>{exception details} | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
| {headerName} | ResponseHeader | ValidationError | Header {headerName} cannot be validated.<br/><br/>{exception details} | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |
| **validate-status-code** |  |  |  |  |  |
| {status-code} | StatusCode | Unspecified | Response status code {status-code} is not allowed. | The request could not be processed due to an internal error. Contact the API owner. | detect / prevent |


The following table lists all the possible Reason values of a validation error along with possible Message values:

| **Reason** | **Message** |
| --- | --- |
| Bad request | {Details} for context variable, {Public response} for client |
| Response not allowed | {Details} for context variable, {Public response} for client |

## Related policies

* [Content validation](api-management-policies.md#content-validation)

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
