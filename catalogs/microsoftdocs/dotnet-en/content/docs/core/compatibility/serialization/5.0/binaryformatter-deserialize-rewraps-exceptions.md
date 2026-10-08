---
title: "Breaking change: BinaryFormatter.Deserialize rewraps some exceptions"
description: Learn about the breaking change in .NET 5 where BinaryFormatter.Deserialize rewraps some exception objects inside a SerializationException.
ms.date: 08/18/2020
---
# BinaryFormatter.Deserialize rewraps some exceptions in SerializationException

The [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*) method now rewraps some exception objects inside a [System.Runtime.Serialization.SerializationException](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.SerializationException) before propagating the exception back to the caller.

## Change description

Previously, the [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*) method allowed some arbitrary exceptions, such as [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException), to propagate up the stack to its callers.

In .NET 5 and later, the [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*) method more aggressively catches exceptions that occur due to invalid deserialization operations and wraps them in a [System.Runtime.Serialization.SerializationException](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.SerializationException).

## Version introduced

5.0

## Recommended action

In most cases, you don't need to take any action. However, if your call site depends on a particular exception being thrown, you can unwrap the exception from the outer [System.Runtime.Serialization.SerializationException](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.SerializationException), as shown in the following example.

```csharp
Stream inputStream = GetInputStream();
var formatter = new BinaryFormatter();

try
{
    object deserialized = formatter.Deserialize(inputStream);
}
catch (MyException myEx)
{
    // Handle 'myEx' here in case it was thrown directly.
}
catch (SerializationException serEx) when (serEx.InnerException is MyException myEx)
{
    // Handle 'myEx' here in case it was wrapped in SerializationException.
}
```

## Affected APIs

- [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*)

<!--

### Affected APIs

- `Overload:System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize`

### Category

Serialization

-->
