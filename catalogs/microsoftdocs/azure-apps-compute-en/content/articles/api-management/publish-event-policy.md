---
title: Azure API Management policy reference - publish-event | Microsoft Docs
description: Reference for the publish-event policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Publish event to GraphQL subscription

**APPLIES TO: All API Management tiers**



The `publish-event` policy publishes an event to one or more subscriptions specified in a GraphQL API schema. Configure the policy in a [GraphQL resolver](configure-graphql-resolver.md) for a related field in the schema for another operation type such as a mutation. At runtime, the event is published to connected GraphQL clients. Learn more about [GraphQL APIs in API Management](graphql-apis-overview.md).

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<http-data-source>
<!-- http-data-source is an example resolver policy -->
    <http-request>
    [...]
    </http-request>
    <http-response>
        [...]
        <publish-event>
            <targets>
                <graphql-subscription id="subscription field" />
            </targets>
        </publish-event>
    </http-response>
</http-data-source>
```

## Elements

| Name | Description | Required |
| --- | --- | --- |
| targets | One or more subscriptions in the GraphQL schema, specified in `target` subelements, to which the event is published. | Yes |


## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) `http-response` element in `http-data-source` resolver
- [**Policy scopes:**](api-management-howto-policies.md#scopes) GraphQL resolver only
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption

### Usage notes

* This policy is invoked only when a related GraphQL query or mutation is executed.
* Resolver *should not* be defined for the corresponding subscription. Defining a `publish-event` policy on a source query or mutation is sufficient to trigger subscription events.

## Example

The following example policy definition is configured in a resolver for the `createUser` mutation. It publishes an event to the `onUserCreated` subscription.

### Example schema

```
type User {
  id: Int!
  name: String!
}


type Mutation {
    createUser(id: Int!, name: String!): User
}

type Subscription {
    onUserCreated: User!
}
```

### Example policy

```xml
<http-data-source>
    <http-request>
        <set-method>POST</set-method>
        <set-url>https://contoso.com/api/user</set-url>
        <set-body template="liquid">{ "id" : {{body.arguments.id}}, "name" : "{{body.arguments.name}}"}</set-body>
    </http-request>
    <http-response>
        <publish-event>
            <targets>
                <graphql-subscription id="onUserCreated" />
            </targets>
        </publish-event>
    </http-response>
</http-data-source>
```

## Related policies

* [GraphQL resolvers](api-management-policies.md#graphql-resolvers)

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
