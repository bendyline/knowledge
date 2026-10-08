---
description: "Learn more about: Numerics in .NET"
title: "Numerics in .NET"
titleSuffix: ""
ms.date: 04/23/2021
ai-usage: ai-assisted
helpviewer_keywords:
  - "SIMD"
  - "System.Numerics.Vectors"
  - "vectors"
  - "scientific computing"
  - "Complex"
  - "numerics"
  - "BigInteger"
ms.assetid: dfebc18e-acde-4510-9fa7-9a0f4aa3bd11
---
# Numerics in .NET

.NET provides a range of numeric integer and floating-point primitives, as well as:

- [System.Half](https://learn.microsoft.com/search/?terms=System.Half), which represents a half-precision floating-point number.
- [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal), which represents a decimal floating-point number.
- [System.Numerics.BigInteger](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger), which is an integral type with no theoretical upper or lower bound.
- [System.Numerics.Complex](https://learn.microsoft.com/search/?terms=System.Numerics.Complex), which represents complex numbers.
- A set of SIMD-enabled types in the [System.Numerics](https://learn.microsoft.com/search/?terms=System.Numerics) namespace.

## Integer types

.NET supports both signed and unsigned 8-bit, 16-bit, 32-bit, 64-bit, and 128-bit integer types, which are listed in the following tables.

**Signed integer types**

| Type | Size (in bytes) | Minimum value | Maximum value |
| --- | --- | --- | --- |
| [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) | 2 | -32,768 | 32,767 |
| [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) | 4 | -2,147,483,648 | 2,147,483,647 |
| [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) | 8 | -9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 |
| [System.Int128](https://learn.microsoft.com/search/?terms=System.Int128) | 16 | −170,141,183,460,469,231,731,687,303,715,884,105,728 | 170,141,183,460,469,231,731,687,303,715,884,105,727 |
| [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte) | 1 | -128 | 127 |
| [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) (in 32-bit process) | 4 | -2,147,483,648 | 2,147,483,647 |
| [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) (in 64-bit process) | 8 | -9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 |

**Unsigned integer types**

| Type | Size (in bytes) | Minimum value | Maximum value |
| --- | --- | --- | --- |
| [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) | 1 | 0 | 255 |
| [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16) | 2 | 0 | 65,535 |
| [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) | 4 | 0 | 4,294,967,295 |
| [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) | 8 | 0 | 18,446,744,073,709,551,615 |
| [System.UInt128](https://learn.microsoft.com/search/?terms=System.UInt128) | 16 | 0 | 340,282,366,920,938,463,463,374,607,431,768,211,455 |
| [System.UIntPtr](https://learn.microsoft.com/search/?terms=System.UIntPtr) (in 32-bit process) | 4 | 0 | 4,294,967,295 |
| [System.UIntPtr](https://learn.microsoft.com/search/?terms=System.UIntPtr) (in 64-bit process) | 8 | 0 | 18,446,744,073,709,551,615 |

Each integer type supports a set of standard arithmetic operators. The [System.Math](https://learn.microsoft.com/search/?terms=System.Math) class provides methods for a broader set of mathematical functions.

You can also work with the individual bits in an integer value by using the [System.BitConverter](https://learn.microsoft.com/search/?terms=System.BitConverter) class.

> **Note:**
> The unsigned integer types are not CLS-compliant. For more information, see [Language independence and language-independent components](language-independence.md).

## BigInteger

The [System.Numerics.BigInteger](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger) structure is an immutable type that represents an arbitrarily large integer whose value in theory has no upper or lower bounds. The methods of the [System.Numerics.BigInteger](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger) type closely parallel those of the other integral types.

## Floating-point types

.NET includes the following floating-point types:

| Type | Size (in bytes) | Approximate range | Primitive? | Notes |
| --- | --- | --- | --- | --- |
| [System.Half](https://learn.microsoft.com/search/?terms=System.Half) | 2 | ±65504 | No | Introduced in .NET 5 |
| [System.Single](https://learn.microsoft.com/search/?terms=System.Single) | 4 | ±3.4 x 10<sup>38</sup> | Yes |  |
| [System.Double](https://learn.microsoft.com/search/?terms=System.Double) | 8 | ±1.7 × 10<sup>308</sup> | Yes |  |
| [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) | 16 | ±7.9228 x 10<sup>28</sup> | No |  |

The [System.Half](https://learn.microsoft.com/search/?terms=System.Half), [System.Single](https://learn.microsoft.com/search/?terms=System.Single), and [System.Double](https://learn.microsoft.com/search/?terms=System.Double) types support special values that represent not-a-number and infinity. For example, the [System.Double](https://learn.microsoft.com/search/?terms=System.Double) type provides the following values: [System.Double.NaN](https://learn.microsoft.com/search/?terms=System.Double.NaN), [System.Double.NegativeInfinity](https://learn.microsoft.com/search/?terms=System.Double.NegativeInfinity), and [System.Double.PositiveInfinity](https://learn.microsoft.com/search/?terms=System.Double.PositiveInfinity). You use the [System.Double.IsNaN*](https://learn.microsoft.com/search/?terms=System.Double.IsNaN*), [System.Double.IsInfinity*](https://learn.microsoft.com/search/?terms=System.Double.IsInfinity*), [System.Double.IsPositiveInfinity*](https://learn.microsoft.com/search/?terms=System.Double.IsPositiveInfinity*), and [System.Double.IsNegativeInfinity*](https://learn.microsoft.com/search/?terms=System.Double.IsNegativeInfinity*) methods to test for these special values.

Each floating-point type supports a set of standard arithmetic operators. The [System.Math](https://learn.microsoft.com/search/?terms=System.Math) class provides methods for a broader set of mathematical functions. .NET Core 2.0 and later includes the [System.MathF](https://learn.microsoft.com/search/?terms=System.MathF) class, which provides methods that accept arguments of the [System.Single](https://learn.microsoft.com/search/?terms=System.Single) type.

You can also work with the individual bits in [System.Double](https://learn.microsoft.com/search/?terms=System.Double), [System.Single](https://learn.microsoft.com/search/?terms=System.Single), and [System.Half](https://learn.microsoft.com/search/?terms=System.Half) values by using the [System.BitConverter](https://learn.microsoft.com/search/?terms=System.BitConverter) class. The [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) structure has its own methods, [System.Decimal.GetBits*](https://learn.microsoft.com/search/?terms=System.Decimal.GetBits*) and [System.Decimal.%23ctor%28System.Int32%5B%5D%29](https://learn.microsoft.com/search/?terms=System.Decimal.%2523ctor%2528System.Int32%255B%255D%2529), for working with a decimal value's individual bits, as well as its own set of methods for performing some additional mathematical operations.

The [System.Double](https://learn.microsoft.com/search/?terms=System.Double), [System.Single](https://learn.microsoft.com/search/?terms=System.Single), and [System.Half](https://learn.microsoft.com/search/?terms=System.Half) types are intended to be used for values that, by their nature, are imprecise (for example, the distance between two stars) and for applications in which a high degree of precision and small rounding error is not required. Use the [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) type for cases in which greater precision is required and rounding errors should be minimized.

> **Note:**
> The [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) type doesn't eliminate the need for rounding. Rather, it minimizes errors due to rounding.

## Complex

The [System.Numerics.Complex](https://learn.microsoft.com/search/?terms=System.Numerics.Complex) structure represents a complex number, that is, a number with a real number part and an imaginary number part. It supports a standard set of arithmetic, comparison, equality, explicit and implicit conversion operators, as well as mathematical, algebraic, and trigonometric methods.

## SIMD-enabled types

The [System.Numerics](https://learn.microsoft.com/search/?terms=System.Numerics) namespace includes a set of .NET SIMD-enabled types. SIMD (Single Instruction Multiple Data) operations can be parallelized at the hardware level. That increases the throughput of the vectorized computations, which are common in mathematical, scientific, and graphics apps.

The .NET SIMD-enabled types include the following:

- The [System.Numerics.Vector2](https://learn.microsoft.com/search/?terms=System.Numerics.Vector2), [System.Numerics.Vector3](https://learn.microsoft.com/search/?terms=System.Numerics.Vector3), and [System.Numerics.Vector4](https://learn.microsoft.com/search/?terms=System.Numerics.Vector4) types, which represent vectors with 2, 3, and 4 [System.Single](https://learn.microsoft.com/search/?terms=System.Single) values.

- Two matrix types, [System.Numerics.Matrix3x2](https://learn.microsoft.com/search/?terms=System.Numerics.Matrix3x2), which represents a 3x2 matrix, and [System.Numerics.Matrix4x4](https://learn.microsoft.com/search/?terms=System.Numerics.Matrix4x4), which represents a 4x4 matrix.

- The [System.Numerics.Plane](https://learn.microsoft.com/search/?terms=System.Numerics.Plane) type, which represents a plane in three-dimensional space.

- The [System.Numerics.Quaternion](https://learn.microsoft.com/search/?terms=System.Numerics.Quaternion) type, which represents a vector that is used to encode three-dimensional physical rotations.

- The [System.Numerics.Vector`1](https://learn.microsoft.com/search/?terms=System.Numerics.Vector%601) type, which represents a vector of a specified numeric type and provides a broad set of operators that benefit from SIMD support. The count of a [System.Numerics.Vector`1](https://learn.microsoft.com/search/?terms=System.Numerics.Vector%601) instance is fixed, but its value [System.Numerics.Vector`1.Count*](https://learn.microsoft.com/search/?terms=System.Numerics.Vector%601.Count*) depends on the CPU of the machine, on which code is executed.

  > **Note:**
  > The [System.Numerics.Vector`1](https://learn.microsoft.com/search/?terms=System.Numerics.Vector%601) type is included with .NET Core and .NET 5+, but not .NET Framework. If you're using .NET Framework, install the [System.Numerics.Vectors](https://www.nuget.org/packages/System.Numerics.Vectors) NuGet package to get access to this type.

The SIMD-enabled types are implemented in such a way that they can be used with non-SIMD-enabled hardware or JIT compilers. To take advantage of SIMD instructions, your 64-bit apps must be run by the runtime that uses the RyuJIT compiler, which is included in .NET Core and in .NET Framework 4.6 and later versions. It adds SIMD support when targeting 64-bit processors.

For more information, see [Use SIMD-accelerated numeric types](simd.md).

## Tensors

The [System.Numerics.Tensors](https://www.nuget.org/packages/System.Numerics.Tensors) package provides multidimensional tensor types and operations over spans. For shape and stride conventions, supported overlapping operations, and differences from NumPy, see [Tensor shapes, storage, and NumPy differences](tensor-shapes-and-storage.md).

## See also

- [Standard numeric format strings](base-types/standard-numeric-format-strings.md)
- [Floating-point numeric types in C#](../csharp/language-reference/builtin-types/floating-point-numeric-types.md)
