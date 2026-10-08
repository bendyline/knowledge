---
title: "Breaking change: Cryptography.Oid is functionally init-only"
description: Learn about the breaking change in .NET 5 where property setters on the Cryptography.Oid class now throw an exception if you attempt to change a value.
ms.date: 08/16/2020
---
# System.Security.Cryptography.Oid is functionally init-only

The [System.Security.Cryptography.Oid](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Oid) class, which is used to represent ASN.1 Object Identifier values and their "friendly" names, was previously fully mutable. This mutability was often overlooked or came as a surprise. The property setters now throw a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) when you attempt to change the value after it's already been assigned.

## Change description

In previous versions, the property setters on [System.Security.Cryptography.Oid](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Oid) can be used to change the value of the [System.Security.Cryptography.Oid.FriendlyName](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Oid.FriendlyName) and [System.Security.Cryptography.Oid.Value](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Oid.Value) properties.

In .NET 5 and later versions, the property setters can only be used to initialize the value. Once the property has a value, either from a constructor or a previous call to the property setter, the property setter always throws a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException).

## Reason for change

This change enables the reuse of [System.Security.Cryptography.Oid](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Oid) objects as part of return values in public APIs to reduce object allocation profiles. It avoids the need to create temporary "defensive" copies when [System.Security.Cryptography.Oid](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Oid) values are used as inputs.

## Version introduced

5.0

## Recommended action

Avoid using the [System.Security.Cryptography.Oid](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Oid) property setters other than for object initialization. To represent a new value, use a new instance instead of changing the value on an existing object.

## Affected APIs

- [System.Security.Cryptography.Oid.FriendlyName](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Oid.FriendlyName)
- [System.Security.Cryptography.Oid.Value](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Oid.Value)

<!--

### Affected APIs

- `P:System.Security.Cryptography.Oid.FriendlyName`
- `P:System.Security.Cryptography.Oid.Value`

### Category

Cryptography

-->
