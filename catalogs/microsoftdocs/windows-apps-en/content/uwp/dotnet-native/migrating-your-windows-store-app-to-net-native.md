---
description: "Learn more about: Migrate Your Windows 8.x App to .NET Native"
title: "Migrating Your Windows 8.x App to .NET Native"
ms.date: "03/30/2017"
ms.topic: upgrade-and-migration-article
ms.assetid: 4153aa18-6f56-4a0a-865b-d3da743a1d05
ms.custom: sfi-ropc-nochange
---
# Migrate Your Windows 8.x App to .NET Native

.NET Native provides static compilation of apps in the Microsoft Store or on the developer's computer. This differs from the dynamic compilation performed for Windows 8.x apps (also previously called Microsoft Store apps) by the just-in-time (JIT) compiler or the [Native Image Generator (Ngen.exe)](https://learn.microsoft.com/dotnet/framework/tools/ngen-exe-native-image-generator) on the device. Despite the differences, .NET Native tries to maintain compatibility with [.NET for Windows 8.x apps](https://learn.microsoft.com/previous-versions/windows/apps/br230302\(v=vs.140\)). For the most part, things that work on the .NET for Windows 8.x apps also work with .NET Native.  However, in some cases, you may encounter behavioral changes. This document discusses these differences between the standard .NET for Windows 8.x apps and .NET Native in the following areas:

- [General runtime differences](#Runtime)

- [Dynamic programming differences](#Dynamic)

- [Other reflection-related differences](#Reflection)

- [Unsupported scenarios and APIs](#Unsupported)

- [Visual Studio differences](#VS)

<a name="Runtime"></a>

## General runtime differences

- Exceptions, such as [System.TypeLoadException](https://learn.microsoft.com/search/?terms=System.TypeLoadException), that are thrown by the JIT compiler when an app runs on the common language runtime (CLR) generally result in compile-time errors when processed by .NET Native.

- Don't call the [System.GC.WaitForPendingFinalizers%2A](https://learn.microsoft.com/search/?terms=System.GC.WaitForPendingFinalizers%252A) method from an app's UI thread. This can result in a deadlock on .NET Native.

- Don't rely on static class constructor invocation ordering. In .NET Native, the invocation order is different from the order on the standard runtime. (Even with the standard runtime, you shouldn't rely on the order of execution of static class constructors.)

- Infinite looping without making a call (for example, `while(true);`) on any thread may bring the app to a halt. Similarly, large or infinite waits may bring the app to a halt.

- Certain generic initialization cycles don't throw exceptions in .NET Native. For example, the following code throws a [System.TypeLoadException](https://learn.microsoft.com/search/?terms=System.TypeLoadException) exception on the standard CLR. In .NET Native, it doesn't.

  [ProjectN#8 (complete source file; reference: code/compat1.cs#8)](../../_code/uwp/dotnet-native/code/compat1.cs.md)

- In some cases, .NET Native provides different implementations of .NET Framework class libraries. An object returned from a method will always implement the members of the returned type. However, since its backing implementation is different, you may not be able to cast it to the same set of types as you could on other .NET Framework platforms. For example, in some cases, you may not be able to cast the [System.Collections.Generic.IEnumerable%601](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%25601) interface object returned by methods such as [System.Reflection.TypeInfo.DeclaredMembers%2A](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo.DeclaredMembers%252A) or [System.Reflection.TypeInfo.DeclaredProperties%2A](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo.DeclaredProperties%252A) to `T[]`.

- The WinInet cache isn't enabled by default on .NET for Windows 8.x apps, but it is on .NET Native. This improves performance but has working set implications. No developer action is necessary.

<a name="Dynamic"></a>

## Dynamic programming differences

.NET Native statically links in code from .NET Framework to make the code app-local for maximum performance. However, binary sizes have to remain small, so the entire .NET Framework can't be brought in. The .NET Native compiler resolves this limitation by using a dependency reducer that removes references to unused code. However, .NET Native might not maintain or generate some type information and code when that information can't be inferred statically at compile time, but instead is retrieved dynamically at runtime.

.NET Native does enable reflection and dynamic programming. However, not all types can be marked for reflection, because this would make the generated code size too large (especially because reflecting on public APIs in .NET Framework is supported). The .NET Native compiler makes smart choices about which types should support reflection, and it keeps the metadata and generates code only for those types.

For example, data binding requires an app to be able to map property names to functions. In .NET for Windows 8.x apps, the common language runtime automatically uses reflection to provide this capability for managed types and publicly available native types. In .NET Native, the compiler automatically includes metadata for types to which you bind data.

The .NET Native compiler can also handle commonly used generic types such as [System.Collections.Generic.List%601](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%25601) and [System.Collections.Generic.Dictionary%602](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%25602), which work without requiring any hints or directives. The [dynamic](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/reference-types#the-dynamic-type) keyword is also supported within certain limits.

> **Note:**
> You should test all dynamic code paths thoroughly when porting your app to .NET Native.

The default configuration for .NET Native is sufficient for most developers, but some developers might want to fine- tune their configurations by using a runtime directives (.rd.xml) file. In addition, in some cases, the .NET Native compiler is unable to determine which metadata must be available for reflection and relies on hints, particularly in the following cases:

- Some constructs like [System.Type.MakeGenericType%2A](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericType%252A) and [System.Reflection.MethodInfo.MakeGenericMethod%2A](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo.MakeGenericMethod%252A) can't be determined statically.

- Because the compiler can't determine the instantiations, a generic type that you want to reflect on has to be specified by runtime directives. This isn't just because all code must be included, but because reflection on generic types can form an infinite cycle (for example, when a generic method is invoked on a generic type).

> **Note:**
> Runtime directives are defined in a runtime directives (.rd.xml) file. For general information about using this file, see [Getting Started](getting-started-with-net-native.md). For information about the runtime directives, see [Runtime Directives (rd.xml) Configuration File Reference](runtime-directives-rd-xml-configuration-file-reference.md).

.NET Native also includes profiling tools that help the developer determine which types outside the default set should support reflection.

<a name="Reflection"></a>

## Other reflection-related differences

There are a number of other individual reflection-related differences in behavior between .NET for Windows 8.x apps and .NET Native.

In .NET Native:

- Private reflection over types and members in the .NET Framework class library is not supported. You can, however, reflect over your own private types and members, as well as types and members in third-party libraries.

- The [System.Reflection.ParameterInfo.HasDefaultValue%2A](https://learn.microsoft.com/search/?terms=System.Reflection.ParameterInfo.HasDefaultValue%252A) property correctly returns `false` for a [System.Reflection.ParameterInfo](https://learn.microsoft.com/search/?terms=System.Reflection.ParameterInfo) object that represents a return value. In .NET for Windows 8.x apps, it returns `true`. Intermediate language (IL) doesn't support this directly, and interpretation is left to the language.

- Public members on the [System.RuntimeFieldHandle](https://learn.microsoft.com/search/?terms=System.RuntimeFieldHandle) and [System.RuntimeMethodHandle](https://learn.microsoft.com/search/?terms=System.RuntimeMethodHandle) structures aren't supported. These types are supported only for LINQ, expression trees, and static array initialization.

- [System.Reflection.RuntimeReflectionExtensions.GetRuntimeProperties%2A](https://learn.microsoft.com/search/?terms=System.Reflection.RuntimeReflectionExtensions.GetRuntimeProperties%252A) and [System.Reflection.RuntimeReflectionExtensions.GetRuntimeEvents%2A](https://learn.microsoft.com/search/?terms=System.Reflection.RuntimeReflectionExtensions.GetRuntimeEvents%252A) include hidden members in base classes and thus may be overridden without explicit overrides. This is also true of other [RuntimeReflectionExtensions.GetRuntime\*](https://learn.microsoft.com/search/?terms=System.Reflection.RuntimeReflectionExtensions) methods.

- [System.Type.MakeArrayType%2A](https://learn.microsoft.com/search/?terms=System.Type.MakeArrayType%252A) and [System.Type.MakeByRefType%2A](https://learn.microsoft.com/search/?terms=System.Type.MakeByRefType%252A) don't fail when you try to create certain combinations (for example, an array of `byref` objects).

- You can't use reflection to invoke members that have pointer parameters.

- You can't use reflection to get or set a pointer field.

- When the argument count is wrong and the type of one of the arguments is incorrect, .NET Native throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) instead of a [System.Reflection.TargetParameterCountException](https://learn.microsoft.com/search/?terms=System.Reflection.TargetParameterCountException).

- Binary serialization of exceptions is generally not supported. As a result, non-serializable objects can be added to the [System.Exception.Data%2A](https://learn.microsoft.com/search/?terms=System.Exception.Data%252A) dictionary.

<a name="Unsupported"></a>

## Unsupported scenarios and APIs

The following sections list unsupported scenarios and APIs for general development, interop, and technologies such as HTTPClient and Windows Communication Foundation (WCF):

- [General development](#General)

- [HttpClient](#HttpClient)

- [Interop](#Interop)

- [Unsupported APIs](#APIs)

<a name="General"></a>

### General development differences

**Value types**

- If you override the [System.ValueType.Equals%2A](https://learn.microsoft.com/search/?terms=System.ValueType.Equals%252A) and [System.ValueType.GetHashCode%2A](https://learn.microsoft.com/search/?terms=System.ValueType.GetHashCode%252A) methods for a value type, don't call the base class implementations. In .NET for Windows 8.x apps, these methods rely on reflection. At compile time, .NET Native generates an implementation that doesn't rely on runtime reflection. This means that if you don't override these two methods, they will work as expected, because .NET Native generates the implementation at compile time. However, overriding these methods but calling the base class implementation results in an exception.

- Value types larger than 1 megabyte aren't supported.

- Value types can't have a parameterless constructor in .NET Native. (C# and Visual Basic prohibit parameterless constructors on value types. However, these can be created in IL.)

**Arrays**

- Arrays with a lower bound other than zero aren't supported. Typically, these arrays are created by calling the [System.Array.CreateInstance%28System.Type%2CSystem.Int32%5B%5D%2CSystem.Int32%5B%5D%29](https://learn.microsoft.com/search/?terms=System.Array.CreateInstance%2528System.Type%252CSystem.Int32%255B%255D%252CSystem.Int32%255B%255D%2529) overload.

- Dynamic creation of multidimensional arrays isn't supported. Such arrays are typically created by calling an overload of the [System.Array.CreateInstance%2A](https://learn.microsoft.com/search/?terms=System.Array.CreateInstance%252A) method that includes a `lengths` parameter, or by calling the [System.Type.MakeArrayType%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.Type.MakeArrayType%2528System.Int32%2529) method.

- Multidimensional arrays that have four or more dimensions aren't supported; that is, their [System.Array.Rank%2A](https://learn.microsoft.com/search/?terms=System.Array.Rank%252A) property value is four or greater. Use [jagged arrays](https://learn.microsoft.com/dotnet/csharp/programming-guide/arrays/jagged-arrays) (an array of arrays) instead. For example, `array[x,y,z]` is invalid, but `array[x][y][z]` isn't.

- Variance for multidimensional arrays isn't supported and causes an [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException) exception at run time.

**Generics**

- Infinite generic type expansion results in a compiler error. For example, this code fails to compile:

  [ProjectN#9 (complete source file; reference: code/compat2.cs#9)](../../_code/uwp/dotnet-native/code/compat2.cs.md)

**Pointers**

- Arrays of pointers aren't supported.

- You can't use reflection to get or set a pointer field.

**Serialization**

The [System.Runtime.Serialization.KnownTypeAttribute.%23ctor%28System.String%29](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.KnownTypeAttribute.%2523ctor%2528System.String%2529) attribute isn't supported. Use the [System.Runtime.Serialization.KnownTypeAttribute.%23ctor%28System.Type%29](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.KnownTypeAttribute.%2523ctor%2528System.Type%2529) attribute instead.

**Resources**

The use of localized resources with the [System.Diagnostics.Tracing.EventSource](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventSource) class isn't supported. The [System.Diagnostics.Tracing.EventSourceAttribute.LocalizationResources%2A](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventSourceAttribute.LocalizationResources%252A) property doesn't define localized resources.

**Delegates**

`Delegate.BeginInvoke` and `Delegate.EndInvoke` aren't supported.

**Miscellaneous APIs**

- The [TypeInfo.GUID](https://learn.microsoft.com/search/?terms=System.Type.GUID) property throws a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) exception if a [System.Runtime.InteropServices.GuidAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.GuidAttribute) attribute isn't applied to the type. The GUID is used primarily for COM support.

- The [System.DateTime.Parse%2A](https://learn.microsoft.com/search/?terms=System.DateTime.Parse%252A) method correctly parses strings that contain short dates in .NET Native. However, it doesn't maintain compatibility with certain changes in date and time parsing.

- [System.Numerics.BigInteger.ToString%2A](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger.ToString%252A) `("E")` is correctly rounded in .NET Native. In some versions of the CLR, the result string is truncated instead of rounded.

<a name="HttpClient"></a>

### HttpClient differences

In .NET Native, the [System.Net.Http.HttpClientHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler) class internally uses WinINet (through the [Windows.Web.Http.Filters.HttpBaseProtocolFilter](https://learn.microsoft.com/search/?terms=Windows.Web.Http.Filters.HttpBaseProtocolFilter) class) instead of the [System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest) and [System.Net.WebResponse](https://learn.microsoft.com/search/?terms=System.Net.WebResponse) classes used in the standard .NET for Windows 8.x apps.  WinINet doesn't support all the configuration options that the [System.Net.Http.HttpClientHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler) class supports.  As a result:

- Some of the capability properties on [System.Net.Http.HttpClientHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler) return `false` on .NET Native, whereas they return `true` in the standard .NET for Windows 8.x apps.

- Some of the configuration property `get` accessors always return a fixed value on .NET Native that is different than the default configurable value in .NET for Windows 8.x apps.

Some additional behavior differences are covered in the following subsections.

**Proxy**

The [Windows.Web.Http.Filters.HttpBaseProtocolFilter](https://learn.microsoft.com/search/?terms=Windows.Web.Http.Filters.HttpBaseProtocolFilter) class doesn't support configuring or overriding the proxy on a per-request basis.  This means that all requests on .NET Native use the system-configured proxy server or no proxy server, depending on the value of the [System.Net.Http.HttpClientHandler.UseProxy%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.UseProxy%252A) property.  In .NET for Windows 8.x apps, the proxy server is defined by the [System.Net.Http.HttpClientHandler.Proxy%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.Proxy%252A) property.  On .NET Native, setting the [System.Net.Http.HttpClientHandler.Proxy%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.Proxy%252A) to a value other than `null` throws a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) exception.  The [System.Net.Http.HttpClientHandler.SupportsProxy%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.SupportsProxy%252A) property returns `false` on .NET Native, whereas it returns `true` in the standard .NET Framework for Windows 8.x apps.

**Automatic redirection**

The [Windows.Web.Http.Filters.HttpBaseProtocolFilter](https://learn.microsoft.com/search/?terms=Windows.Web.Http.Filters.HttpBaseProtocolFilter) class doesn't allow the maximum number of automatic redirections to be configured.  The value of the [System.Net.Http.HttpClientHandler.MaxAutomaticRedirections%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.MaxAutomaticRedirections%252A) property is 50 by default in the standard .NET for Windows 8.x apps and can be modified. On .NET Native, the value of this property is 10, and trying to modify it throws a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) exception.  The [System.Net.Http.HttpClientHandler.SupportsRedirectConfiguration%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.SupportsRedirectConfiguration%252A) property returns `false` on .NET Native, whereas it returns `true` in .NET for Windows 8.x apps.

**Automatic decompression**

.NET for Windows 8.x apps allows you to set the [System.Net.Http.HttpClientHandler.AutomaticDecompression%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.AutomaticDecompression%252A) property to [System.Net.DecompressionMethods.Deflate](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.Deflate), [System.Net.DecompressionMethods.GZip](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.GZip), both [System.Net.DecompressionMethods.Deflate](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.Deflate) and [System.Net.DecompressionMethods.GZip](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.GZip), or [System.Net.DecompressionMethods.None](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.None).  .NET Native only supports [System.Net.DecompressionMethods.Deflate](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.Deflate) together with [System.Net.DecompressionMethods.GZip](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.GZip), or [System.Net.DecompressionMethods.None](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.None).  Trying to set the [System.Net.Http.HttpClientHandler.AutomaticDecompression%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.AutomaticDecompression%252A) property to either [System.Net.DecompressionMethods.Deflate](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.Deflate) or [System.Net.DecompressionMethods.GZip](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.GZip) alone silently sets it to both [System.Net.DecompressionMethods.Deflate](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.Deflate) and [System.Net.DecompressionMethods.GZip](https://learn.microsoft.com/search/?terms=System.Net.DecompressionMethods.GZip).

**Cookies**

Cookie handling is performed simultaneously by [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) and WinINet.  Cookies from the [System.Net.CookieContainer](https://learn.microsoft.com/search/?terms=System.Net.CookieContainer) are combined with cookies in the WinINet cookie cache.  Removing a cookie from [System.Net.CookieContainer](https://learn.microsoft.com/search/?terms=System.Net.CookieContainer) prevents [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) from sending the cookie, but if the cookie was already seen by WinINet, and cookies weren't deleted by the user, WinINet sends it.  It isn't possible to programmatically remove a cookie from WinINet by using the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient), [System.Net.Http.HttpClientHandler](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler), or [System.Net.CookieContainer](https://learn.microsoft.com/search/?terms=System.Net.CookieContainer) API.  Setting the [System.Net.Http.HttpClientHandler.UseCookies%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.UseCookies%252A) property to `false` causes only [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) to stop sending cookies; WinINet might still include its cookies in the request.

**Credentials**

In .NET for Windows 8.x apps, the [System.Net.Http.HttpClientHandler.UseDefaultCredentials%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.UseDefaultCredentials%252A) and [System.Net.Http.HttpClientHandler.Credentials%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.Credentials%252A) properties work independently.  Additionally, the [System.Net.Http.HttpClientHandler.Credentials%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.Credentials%252A) property accepts any object that implements the [System.Net.ICredentials](https://learn.microsoft.com/search/?terms=System.Net.ICredentials) interface.  In .NET Native, setting the [System.Net.Http.HttpClientHandler.UseDefaultCredentials%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.UseDefaultCredentials%252A) property to `true` causes the [System.Net.Http.HttpClientHandler.Credentials%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.Credentials%252A) property to become `null`.  In addition, the [System.Net.Http.HttpClientHandler.Credentials%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.Credentials%252A) property can be set only to `null`, [System.Net.CredentialCache.DefaultCredentials%2A](https://learn.microsoft.com/search/?terms=System.Net.CredentialCache.DefaultCredentials%252A), or an object of type [System.Net.NetworkCredential](https://learn.microsoft.com/search/?terms=System.Net.NetworkCredential).  Assigning any other [System.Net.ICredentials](https://learn.microsoft.com/search/?terms=System.Net.ICredentials) object, the most popular of which is [System.Net.CredentialCache](https://learn.microsoft.com/search/?terms=System.Net.CredentialCache), to the [System.Net.Http.HttpClientHandler.Credentials%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.Credentials%252A) property throws a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException).

**Other unsupported or unconfigurable features**

In .NET Native:

- The value of the [System.Net.Http.HttpClientHandler.ClientCertificateOptions%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.ClientCertificateOptions%252A) property is always [System.Net.Http.ClientCertificateOption.Automatic](https://learn.microsoft.com/search/?terms=System.Net.Http.ClientCertificateOption.Automatic).  In .NET for Windows 8.x apps, the default is [System.Net.Http.ClientCertificateOption.Manual](https://learn.microsoft.com/search/?terms=System.Net.Http.ClientCertificateOption.Manual).

- The [System.Net.Http.HttpClientHandler.MaxRequestContentBufferSize%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.MaxRequestContentBufferSize%252A) property isn't configurable.

- The [System.Net.Http.HttpClientHandler.PreAuthenticate%2A](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClientHandler.PreAuthenticate%252A) property is always `true`.  In .NET for Windows 8.x apps, the default is `false`.

- The `SetCookie2` header in responses is ignored as obsolete.

<a name="Interop"></a>

### Interop differences

**Deprecated APIs**

A number of infrequently used APIs for interoperability with managed code have been deprecated. When used with .NET Native, these APIs may throw a [System.NotImplementedException](https://learn.microsoft.com/search/?terms=System.NotImplementedException) or [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) exception, or result in a compiler error. In .NET for Windows 8.x apps, these APIs are marked as obsolete, although calling them generates a compiler warning rather than a compiler error.

Deprecated APIs for `VARIANT` marshaling include:

- [System.Runtime.InteropServices.BStrWrapper](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.BStrWrapper)
- [System.Runtime.InteropServices.CurrencyWrapper](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.CurrencyWrapper)
- [System.Runtime.InteropServices.DispatchWrapper](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DispatchWrapper)
- [System.Runtime.InteropServices.ErrorWrapper](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ErrorWrapper)
- [System.Runtime.InteropServices.UnknownWrapper](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.UnknownWrapper)
- [System.Runtime.InteropServices.VariantWrapper](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.VariantWrapper)
- [System.Runtime.InteropServices.UnmanagedType.IDispatch](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.UnmanagedType.IDispatch)
- [System.Runtime.InteropServices.UnmanagedType.SafeArray](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.UnmanagedType.SafeArray)
- [System.Runtime.InteropServices.VarEnum](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.VarEnum)

[System.Runtime.InteropServices.UnmanagedType.Struct](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.UnmanagedType.Struct) is supported, but it throws an exception in some scenarios, such as when it is used with [IDispatch](https://learn.microsoft.com/previous-versions/windows/desktop/api/oaidl/nn-oaidl-idispatch) or `byref` variants.

Deprecated APIs for [IDispatch](https://learn.microsoft.com/previous-versions/windows/desktop/api/oaidl/nn-oaidl-idispatch) support include:

- [System.Runtime.InteropServices.ClassInterfaceType.AutoDispatch](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ClassInterfaceType.AutoDispatch)
- [System.Runtime.InteropServices.ClassInterfaceType.AutoDual](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ClassInterfaceType.AutoDual)
- [System.Runtime.InteropServices.ComDefaultInterfaceAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComDefaultInterfaceAttribute)

Deprecated APIs for classic COM events include:

- [System.Runtime.InteropServices.ComEventsHelper](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComEventsHelper)
- [System.Runtime.InteropServices.ComSourceInterfacesAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComSourceInterfacesAttribute)

Deprecated APIs in the [System.Runtime.InteropServices.ICustomQueryInterface](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ICustomQueryInterface) interface, which isn't supported in .NET Native, include:

- [System.Runtime.InteropServices.ICustomQueryInterface](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ICustomQueryInterface) (all members)
- [System.Runtime.InteropServices.CustomQueryInterfaceMode](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.CustomQueryInterfaceMode) (all members)
- [System.Runtime.InteropServices.CustomQueryInterfaceResult](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.CustomQueryInterfaceResult) (all members)
- [System.Runtime.InteropServices.Marshal.GetComInterfaceForObject%28System.Object%2CSystem.Type%2CSystem.Runtime.InteropServices.CustomQueryInterfaceMode%29](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.GetComInterfaceForObject%2528System.Object%252CSystem.Type%252CSystem.Runtime.InteropServices.CustomQueryInterfaceMode%2529)

Other unsupported interop features include:

- [System.Runtime.InteropServices.ICustomAdapter](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ICustomAdapter) (all members)
- [System.Runtime.InteropServices.SafeBuffer](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeBuffer) (all members)
- [System.Runtime.InteropServices.UnmanagedType.Currency](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.UnmanagedType.Currency)
- [System.Runtime.InteropServices.UnmanagedType.VBByRefStr](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.UnmanagedType.VBByRefStr)
- [System.Runtime.InteropServices.UnmanagedType.AnsiBStr](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.UnmanagedType.AnsiBStr)
- [System.Runtime.InteropServices.UnmanagedType.AsAny](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.UnmanagedType.AsAny)
- [System.Runtime.InteropServices.UnmanagedType.CustomMarshaler](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.UnmanagedType.CustomMarshaler)

Rarely used marshaling APIs:

- [System.Runtime.InteropServices.Marshal.ReadByte%28System.Object%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.ReadByte%2528System.Object%252CSystem.Int32%2529)
- [System.Runtime.InteropServices.Marshal.ReadInt16%28System.Object%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.ReadInt16%2528System.Object%252CSystem.Int32%2529)
- [System.Runtime.InteropServices.Marshal.ReadInt32%28System.Object%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.ReadInt32%2528System.Object%252CSystem.Int32%2529)
- [System.Runtime.InteropServices.Marshal.ReadInt64%28System.Object%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.ReadInt64%2528System.Object%252CSystem.Int32%2529)
- [System.Runtime.InteropServices.Marshal.ReadIntPtr%28System.Object%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.ReadIntPtr%2528System.Object%252CSystem.Int32%2529)
- [System.Runtime.InteropServices.Marshal.WriteByte%28System.Object%2CSystem.Int32%2CSystem.Byte%29](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.WriteByte%2528System.Object%252CSystem.Int32%252CSystem.Byte%2529)
- [System.Runtime.InteropServices.Marshal.WriteInt16%28System.Object%2CSystem.Int32%2CSystem.Int16%29](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.WriteInt16%2528System.Object%252CSystem.Int32%252CSystem.Int16%2529)
- [System.Runtime.InteropServices.Marshal.WriteInt32%28System.Object%2CSystem.Int32%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.WriteInt32%2528System.Object%252CSystem.Int32%252CSystem.Int32%2529)
- [System.Runtime.InteropServices.Marshal.WriteInt64%28System.Object%2CSystem.Int32%2CSystem.Int64%29](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.WriteInt64%2528System.Object%252CSystem.Int32%252CSystem.Int64%2529)
- [System.Runtime.InteropServices.Marshal.WriteIntPtr%28System.Object%2CSystem.Int32%2CSystem.IntPtr%29](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.WriteIntPtr%2528System.Object%252CSystem.Int32%252CSystem.IntPtr%2529)

**Platform invoke and COM interop compatibility**

Most platform invoke and COM interop scenarios are still supported in .NET Native. In particular, all interoperability with Windows Runtime (WinRT) APIs and all marshaling required for the Windows Runtime is supported. This includes marshaling support for:

- Arrays (including [System.Runtime.InteropServices.UnmanagedType.ByValArray](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.UnmanagedType.ByValArray))

- `BStr`

- Delegates

- Strings (Unicode, ANSI, and HSTRING)

- Structs (`byref` and `byval`)

- Unions

- Win32 handles

- All WinRT constructs

- Partial support for marshaling variant types. The following are supported:

  - [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean)

  - [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte)

  - [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal)

  - [System.Double](https://learn.microsoft.com/search/?terms=System.Double)

  - [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16)

  - [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32)

  - [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64)

  - [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte)

  - [System.Single](https://learn.microsoft.com/search/?terms=System.Single)

  - [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16)

  - [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32)

  - [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64)

  - `BStr`

  - [IUnknown](https://learn.microsoft.com/windows/desktop/api/unknwn/nn-unknwn-iunknown)

However, .NET Native doesn't support the following:

- Using classic COM events

- Implementing the [System.Runtime.InteropServices.ICustomQueryInterface](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ICustomQueryInterface) interface on a managed type

- Implementing the [IDispatch](https://learn.microsoft.com/previous-versions/windows/desktop/api/oaidl/nn-oaidl-idispatch) interface on a managed type through the [System.Runtime.InteropServices.ComDefaultInterfaceAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComDefaultInterfaceAttribute) attribute. However, you can't call COM objects through `IDispatch`, and your managed object can't implement `IDispatch`.

Using reflection to invoke a platform invoke method isn't supported. You can work around this limitation by wrapping the method call in another method and using reflection to call the wrapper instead.

<a name="APIs"></a>

### Other differences from .NET APIs for Windows 8.x apps

This section lists the remaining APIs that aren't supported in .NET Native. The largest set of the unsupported APIs is the Windows Communication Foundation (WCF) APIs.

**DataAnnotations (System.ComponentModel.DataAnnotations)**

The types in the [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) and [System.ComponentModel.DataAnnotations.Schema](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.Schema) namespaces aren't supported in .NET Native. These include the following types that are present in .NET for Windows 8.x apps:

- [System.ComponentModel.DataAnnotations.AssociationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.AssociationAttribute)
- [System.ComponentModel.DataAnnotations.ConcurrencyCheckAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ConcurrencyCheckAttribute)
- [System.ComponentModel.DataAnnotations.CustomValidationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.CustomValidationAttribute)
- [System.ComponentModel.DataAnnotations.DataType](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataType)
- [System.ComponentModel.DataAnnotations.DataTypeAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute)
- [System.ComponentModel.DataAnnotations.DisplayAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayAttribute)
- [System.ComponentModel.DataAnnotations.DisplayColumnAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayColumnAttribute)
- [System.ComponentModel.DataAnnotations.DisplayFormatAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DisplayFormatAttribute)
- [System.ComponentModel.DataAnnotations.EditableAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.EditableAttribute)
- [System.ComponentModel.DataAnnotations.EnumDataTypeAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.EnumDataTypeAttribute)
- [System.ComponentModel.DataAnnotations.FilterUIHintAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.FilterUIHintAttribute)
- [System.ComponentModel.DataAnnotations.KeyAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.KeyAttribute)
- [System.ComponentModel.DataAnnotations.RangeAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RangeAttribute)
- [System.ComponentModel.DataAnnotations.RegularExpressionAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RegularExpressionAttribute)
- [System.ComponentModel.DataAnnotations.RequiredAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.RequiredAttribute)
- [System.ComponentModel.DataAnnotations.StringLengthAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.StringLengthAttribute)
- [System.ComponentModel.DataAnnotations.TimestampAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.TimestampAttribute)
- [System.ComponentModel.DataAnnotations.UIHintAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.UIHintAttribute)
- [System.ComponentModel.DataAnnotations.ValidationAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationAttribute)
- [System.ComponentModel.DataAnnotations.ValidationContext](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationContext)
- [System.ComponentModel.DataAnnotations.ValidationException](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationException)
- [System.ComponentModel.DataAnnotations.ValidationResult](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.ValidationResult)
- [System.ComponentModel.DataAnnotations.Validator](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.Validator)
- [System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedAttribute)
- [System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption)

**Visual Basic**

Visual Basic isn't currently supported in .NET Native. The following types in the [Microsoft.VisualBasic](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic) and [Microsoft.VisualBasic.CompilerServices](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices) namespaces aren't available in .NET Native:

- [Microsoft.VisualBasic.CallType](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CallType)
- [Microsoft.VisualBasic.Constants](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Constants)
- [Microsoft.VisualBasic.HideModuleNameAttribute](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.HideModuleNameAttribute)
- [Microsoft.VisualBasic.Strings](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Strings)
- [Microsoft.VisualBasic.CompilerServices.Conversions](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.Conversions)
- [Microsoft.VisualBasic.CompilerServices.DesignerGeneratedAttribute](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.DesignerGeneratedAttribute)
- [Microsoft.VisualBasic.CompilerServices.IncompleteInitialization](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.IncompleteInitialization)
- [Microsoft.VisualBasic.CompilerServices.NewLateBinding](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.NewLateBinding)
- [Microsoft.VisualBasic.CompilerServices.ObjectFlowControl](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.ObjectFlowControl)
- [Microsoft.VisualBasic.CompilerServices.ObjectFlowControl.ForLoopControl](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.ObjectFlowControl.ForLoopControl)
- [Microsoft.VisualBasic.CompilerServices.Operators](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.Operators)
- [Microsoft.VisualBasic.CompilerServices.OptionCompareAttribute](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.OptionCompareAttribute)
- [Microsoft.VisualBasic.CompilerServices.OptionTextAttribute](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.OptionTextAttribute)
- [Microsoft.VisualBasic.CompilerServices.ProjectData](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.ProjectData)
- [Microsoft.VisualBasic.CompilerServices.StandardModuleAttribute](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.StandardModuleAttribute)
- [Microsoft.VisualBasic.CompilerServices.StaticLocalInitFlag](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.StaticLocalInitFlag)
- [Microsoft.VisualBasic.CompilerServices.Utils](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.CompilerServices.Utils)

**Reflection Context (System.Reflection.Context namespace)**

The [System.Reflection.Context.CustomReflectionContext](https://learn.microsoft.com/search/?terms=System.Reflection.Context.CustomReflectionContext) class isn't supported in .NET Native.

**RTC (System.Net.Http.Rtc)**

The `System.Net.Http.RtcRequestFactory` class isn't supported in .NET Native.

**Windows Communication Foundation (WCF) (System.ServiceModel.\*)**

The types in the [System.ServiceModel.\* namespaces](https://learn.microsoft.com/search/?terms=System.ServiceModel) aren't supported in .NET Native. These include the following types:

- [System.ServiceModel.ActionNotSupportedException](https://learn.microsoft.com/search/?terms=System.ServiceModel.ActionNotSupportedException)
- [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding)
- [System.ServiceModel.BasicHttpMessageCredentialType](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpMessageCredentialType)
- [System.ServiceModel.BasicHttpSecurity](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpSecurity)
- [System.ServiceModel.BasicHttpSecurityMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpSecurityMode)
- [System.ServiceModel.CallbackBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.CallbackBehaviorAttribute)
- [System.ServiceModel.ChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory)
- [System.ServiceModel.ChannelFactory%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%25601)
- [System.ServiceModel.ClientBase%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientBase%25601)
- [System.ServiceModel.ClientBase%601.BeginOperationDelegate](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientBase%25601.BeginOperationDelegate)
- [System.ServiceModel.ClientBase%601.ChannelBase%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientBase%25601.ChannelBase%25601)
- [System.ServiceModel.ClientBase%601.EndOperationDelegate](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientBase%25601.EndOperationDelegate)
- [System.ServiceModel.ClientBase%601.InvokeAsyncCompletedEventArgs](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientBase%25601.InvokeAsyncCompletedEventArgs)
- [System.ServiceModel.CommunicationException](https://learn.microsoft.com/search/?terms=System.ServiceModel.CommunicationException)
- [System.ServiceModel.CommunicationObjectAbortedException](https://learn.microsoft.com/search/?terms=System.ServiceModel.CommunicationObjectAbortedException)
- [System.ServiceModel.CommunicationObjectFaultedException](https://learn.microsoft.com/search/?terms=System.ServiceModel.CommunicationObjectFaultedException)
- [System.ServiceModel.CommunicationState](https://learn.microsoft.com/search/?terms=System.ServiceModel.CommunicationState)
- [System.ServiceModel.DataContractFormatAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.DataContractFormatAttribute)
- [System.ServiceModel.DnsEndpointIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.DnsEndpointIdentity)
- [System.ServiceModel.DuplexChannelFactory%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.DuplexChannelFactory%25601)
- [System.ServiceModel.DuplexClientBase%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.DuplexClientBase%25601)
- [System.ServiceModel.EndpointAddress](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointAddress)
- [System.ServiceModel.EndpointAddressBuilder](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointAddressBuilder)
- [System.ServiceModel.EndpointIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointIdentity)
- [System.ServiceModel.EndpointNotFoundException](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointNotFoundException)
- [System.ServiceModel.EnvelopeVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.EnvelopeVersion)
- [System.ServiceModel.ExceptionDetail](https://learn.microsoft.com/search/?terms=System.ServiceModel.ExceptionDetail)
- [System.ServiceModel.FaultCode](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultCode)
- [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute)
- [System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException)
- [System.ServiceModel.FaultException%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%25601)
- [System.ServiceModel.FaultReason](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultReason)
- [System.ServiceModel.FaultReasonText](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultReasonText)
- [System.ServiceModel.HttpBindingBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.HttpBindingBase)
- [System.ServiceModel.HttpClientCredentialType](https://learn.microsoft.com/search/?terms=System.ServiceModel.HttpClientCredentialType)
- [System.ServiceModel.HttpTransportSecurity](https://learn.microsoft.com/search/?terms=System.ServiceModel.HttpTransportSecurity)
- [System.ServiceModel.IClientChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.IClientChannel)
- [System.ServiceModel.ICommunicationObject](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject)
- [System.ServiceModel.IContextChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.IContextChannel)
- [System.ServiceModel.IDefaultCommunicationTimeouts](https://learn.microsoft.com/search/?terms=System.ServiceModel.IDefaultCommunicationTimeouts)
- [System.ServiceModel.IExtensibleObject%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensibleObject%25601)
- [System.ServiceModel.IExtension%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%25601)
- [System.ServiceModel.IExtensionCollection%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensionCollection%25601)
- [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext)
- [System.ServiceModel.InvalidMessageContractException](https://learn.microsoft.com/search/?terms=System.ServiceModel.InvalidMessageContractException)
- [System.ServiceModel.MessageBodyMemberAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageBodyMemberAttribute)
- [System.ServiceModel.MessageContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageContractAttribute)
- [System.ServiceModel.MessageContractMemberAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageContractMemberAttribute)
- [System.ServiceModel.MessageCredentialType](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageCredentialType)
- [System.ServiceModel.MessageHeader%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageHeader%25601)
- [System.ServiceModel.MessageHeaderException](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageHeaderException)
- [System.ServiceModel.MessageParameterAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageParameterAttribute)
- [System.ServiceModel.MessageSecurityOverTcp](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageSecurityOverTcp)
- [System.ServiceModel.MessageSecurityVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageSecurityVersion)
- [System.ServiceModel.NetHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetHttpBinding)
- [System.ServiceModel.NetHttpMessageEncoding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetHttpMessageEncoding)
- [System.ServiceModel.NetTcpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpBinding)
- [System.ServiceModel.NetTcpSecurity](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpSecurity)
- [System.ServiceModel.OperationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext)
- [System.ServiceModel.OperationContextScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContextScope)
- [System.ServiceModel.OperationContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContractAttribute)
- [System.ServiceModel.OperationFormatStyle](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationFormatStyle)
- [System.ServiceModel.ProtocolException](https://learn.microsoft.com/search/?terms=System.ServiceModel.ProtocolException)
- [System.ServiceModel.QuotaExceededException](https://learn.microsoft.com/search/?terms=System.ServiceModel.QuotaExceededException)
- [System.ServiceModel.SecurityMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.SecurityMode)
- [System.ServiceModel.ServerTooBusyException](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServerTooBusyException)
- [System.ServiceModel.ServiceActivationException](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceActivationException)
- [System.ServiceModel.ServiceContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute)
- [System.ServiceModel.ServiceKnownTypeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceKnownTypeAttribute)
- [System.ServiceModel.SpnEndpointIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.SpnEndpointIdentity)
- [System.ServiceModel.TcpClientCredentialType](https://learn.microsoft.com/search/?terms=System.ServiceModel.TcpClientCredentialType)
- [System.ServiceModel.TcpTransportSecurity](https://learn.microsoft.com/search/?terms=System.ServiceModel.TcpTransportSecurity)
- [System.ServiceModel.TransferMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.TransferMode)
- [System.ServiceModel.UnknownMessageReceivedEventArgs](https://learn.microsoft.com/search/?terms=System.ServiceModel.UnknownMessageReceivedEventArgs)
- [System.ServiceModel.UpnEndpointIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.UpnEndpointIdentity)
- [System.ServiceModel.XmlSerializerFormatAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.XmlSerializerFormatAttribute)
- [System.ServiceModel.Channels.AddressHeader](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.AddressHeader)
- [System.ServiceModel.Channels.AddressHeaderCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.AddressHeaderCollection)
- [System.ServiceModel.Channels.AddressingVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.AddressingVersion)
- [System.ServiceModel.Channels.BinaryMessageEncodingBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BinaryMessageEncodingBindingElement)
- [System.ServiceModel.Channels.ChannelManagerBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelManagerBase)
- [System.ServiceModel.Channels.ChannelParameterCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ChannelParameterCollection)
- [System.ServiceModel.Channels.CommunicationObject](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CommunicationObject)
- [System.ServiceModel.Channels.CompressionFormat](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CompressionFormat)
- [System.ServiceModel.Channels.ConnectionOrientedTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ConnectionOrientedTransportBindingElement)
- [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding)
- [System.ServiceModel.Channels.FaultConverter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.FaultConverter)
- [System.ServiceModel.Channels.HttpRequestMessageProperty](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpRequestMessageProperty)
- [System.ServiceModel.Channels.HttpResponseMessageProperty](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpResponseMessageProperty)
- [System.ServiceModel.Channels.HttpsTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpsTransportBindingElement)
- [System.ServiceModel.Channels.HttpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement)
- [System.ServiceModel.Channels.IChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannel)
- [System.ServiceModel.Channels.IChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannelFactory)
- [System.ServiceModel.Channels.IChannelFactory%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IChannelFactory%25601)
- [System.ServiceModel.Channels.IDuplexChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IDuplexChannel)
- [System.ServiceModel.Channels.IDuplexSession](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IDuplexSession)
- [System.ServiceModel.Channels.IDuplexSessionChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IDuplexSessionChannel)
- [System.ServiceModel.Channels.IHttpCookieContainerManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IHttpCookieContainerManager)
- [System.ServiceModel.Channels.IInputChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IInputChannel)
- [System.ServiceModel.Channels.IInputSession](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IInputSession)
- [System.ServiceModel.Channels.IInputSessionChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IInputSessionChannel)
- [System.ServiceModel.Channels.IMessageProperty](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IMessageProperty)
- [System.ServiceModel.Channels.IOutputChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IOutputChannel)
- [System.ServiceModel.Channels.IOutputSession](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IOutputSession)
- [System.ServiceModel.Channels.IOutputSessionChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IOutputSessionChannel)
- [System.ServiceModel.Channels.IRequestChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IRequestChannel)
- [System.ServiceModel.Channels.IRequestSessionChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IRequestSessionChannel)
- [System.ServiceModel.Channels.ISession](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ISession)
- [System.ServiceModel.Channels.ISessionChannel%601](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.ISessionChannel%25601)
- [System.ServiceModel.Channels.LocalClientSecuritySettings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.LocalClientSecuritySettings)
- [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message)
- [System.ServiceModel.Channels.MessageBuffer](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageBuffer)
- [System.ServiceModel.Channels.MessageEncoder](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncoder)
- [System.ServiceModel.Channels.MessageEncoderFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncoderFactory)
- [System.ServiceModel.Channels.MessageEncodingBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageEncodingBindingElement)
- [System.ServiceModel.Channels.MessageFault](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageFault)
- [System.ServiceModel.Channels.MessageHeader](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeader)
- [System.ServiceModel.Channels.MessageHeaderInfo](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaderInfo)
- [System.ServiceModel.Channels.MessageHeaders](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders)
- [System.ServiceModel.Channels.MessageProperties](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageProperties)
- [System.ServiceModel.Channels.MessageState](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageState)
- [System.ServiceModel.Channels.MessageVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageVersion)
- [System.ServiceModel.Channels.RequestContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.RequestContext)
- [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement)
- [System.ServiceModel.Channels.SecurityHeaderLayout](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityHeaderLayout)
- [System.ServiceModel.Channels.SslStreamSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SslStreamSecurityBindingElement)
- [System.ServiceModel.Channels.TcpConnectionPoolSettings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TcpConnectionPoolSettings)
- [System.ServiceModel.Channels.TcpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TcpTransportBindingElement)
- [System.ServiceModel.Channels.TextMessageEncodingBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TextMessageEncodingBindingElement)
- [System.ServiceModel.Channels.TransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportBindingElement)
- [System.ServiceModel.Channels.TransportSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportSecurityBindingElement)
- [System.ServiceModel.Channels.WebSocketTransportSettings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.WebSocketTransportSettings)
- [System.ServiceModel.Channels.WebSocketTransportUsage](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.WebSocketTransportUsage)
- [System.ServiceModel.Channels.WindowsStreamSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.WindowsStreamSecurityBindingElement)
- [System.ServiceModel.Description.ClientCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials)
- [System.ServiceModel.Description.ContractDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ContractDescription)
- [System.ServiceModel.Description.DataContractSerializerOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.DataContractSerializerOperationBehavior)
- [System.ServiceModel.Description.FaultDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.FaultDescription)
- [System.ServiceModel.Description.FaultDescriptionCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.FaultDescriptionCollection)
- [System.ServiceModel.Description.IContractBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehavior)
- [System.ServiceModel.Description.IEndpointBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IEndpointBehavior)
- [System.ServiceModel.Description.IOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IOperationBehavior)
- [System.ServiceModel.Description.MessageBodyDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageBodyDescription)
- [System.ServiceModel.Description.MessageDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescription)
- [System.ServiceModel.Description.MessageDescriptionCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDescriptionCollection)
- [System.ServiceModel.Description.MessageDirection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDirection)
- [System.ServiceModel.Description.MessageHeaderDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageHeaderDescription)
- [System.ServiceModel.Description.MessageHeaderDescriptionCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageHeaderDescriptionCollection)
- [System.ServiceModel.Description.MessagePartDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescription)
- [System.ServiceModel.Description.MessagePartDescriptionCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePartDescriptionCollection)
- [System.ServiceModel.Description.MessagePropertyDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePropertyDescription)
- [System.ServiceModel.Description.MessagePropertyDescriptionCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessagePropertyDescriptionCollection)
- [System.ServiceModel.Description.OperationDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription)
- [System.ServiceModel.Description.OperationDescriptionCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescriptionCollection)
- [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint)
- [System.ServiceModel.Dispatcher.ClientOperation](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.ClientOperation)
- [System.ServiceModel.Dispatcher.ClientRuntime](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.ClientRuntime)
- [System.ServiceModel.Dispatcher.DispatchOperation](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.DispatchOperation)
- [System.ServiceModel.Dispatcher.DispatchRuntime](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.DispatchRuntime)
- [System.ServiceModel.Dispatcher.EndpointDispatcher](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.EndpointDispatcher)
- [System.ServiceModel.Dispatcher.IClientMessageFormatter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IClientMessageFormatter)
- [System.ServiceModel.Dispatcher.IClientMessageInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IClientMessageInspector)
- [System.ServiceModel.Dispatcher.IClientOperationSelector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IClientOperationSelector)
- [System.ServiceModel.Dispatcher.IParameterInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IParameterInspector)
- [System.ServiceModel.Security.BasicSecurityProfileVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.BasicSecurityProfileVersion)
- [System.ServiceModel.Security.HttpDigestClientCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.HttpDigestClientCredential)
- [System.ServiceModel.Security.MessageSecurityException](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.MessageSecurityException)
- [System.ServiceModel.Security.SecureConversationVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.SecureConversationVersion)
- [System.ServiceModel.Security.SecurityAccessDeniedException](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.SecurityAccessDeniedException)
- [System.ServiceModel.Security.SecurityPolicyVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.SecurityPolicyVersion)
- [System.ServiceModel.Security.SecurityVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.SecurityVersion)
- [System.ServiceModel.Security.TrustVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.TrustVersion)
- [System.ServiceModel.Security.UserNamePasswordClientCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.UserNamePasswordClientCredential)
- [System.ServiceModel.Security.WindowsClientCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.WindowsClientCredential)
- [System.ServiceModel.Security.Tokens.SecureConversationSecurityTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecureConversationSecurityTokenParameters)
- [System.ServiceModel.Security.Tokens.SecurityTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecurityTokenParameters)
- [System.ServiceModel.Security.Tokens.SupportingTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SupportingTokenParameters)
- [System.ServiceModel.Security.Tokens.UserNameSecurityTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.UserNameSecurityTokenParameters)

### Differences in serializers

The following differences concern serialization and deserialization with the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer), [System.Runtime.Serialization.Json.DataContractJsonSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Json.DataContractJsonSerializer), and [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) classes:

- In .NET Native, [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) and [System.Runtime.Serialization.Json.DataContractJsonSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Json.DataContractJsonSerializer) fail to serialize or deserialize a derived class that has a base class member whose type isn't a root serialization type. For example, in the following code, trying to serialize or deserialize `Y` results in an error:

  [ProjectN#10 (complete source file; reference: code/compat3.cs#10)](../../_code/uwp/dotnet-native/code/compat3.cs.md)

  Type `InnerType` isn't known to the serializer, because the members of the base class aren't traversed during serialization.

- [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) and [System.Runtime.Serialization.Json.DataContractJsonSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Json.DataContractJsonSerializer) fail to serialize a class or structure that implements the [System.Collections.Generic.IEnumerable%601](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%25601) interface. For example, the following types fail to serialize or deserialize:

- [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) fails to serialize the following object value, because it doesn't know the exact type of the object to be serialized:

- [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) fails to serialize or deserialize if the type of the serialized object is [System.Xml.XmlQualifiedName](https://learn.microsoft.com/search/?terms=System.Xml.XmlQualifiedName).

- All serializers ([System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer), [System.Runtime.Serialization.Json.DataContractJsonSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Json.DataContractJsonSerializer), and [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer)) fail to generate serialization code for type [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) or for a type that contains [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement). They display build-time errors instead.

- The following constructors of the serialization types aren't guaranteed to work as expected:

  - [System.Runtime.Serialization.DataContractSerializer.%23ctor%28System.Type%2CSystem.Collections.Generic.IEnumerable%7BSystem.Type%7D%29](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer.%2523ctor%2528System.Type%252CSystem.Collections.Generic.IEnumerable%257BSystem.Type%257D%2529)

  - [System.Runtime.Serialization.DataContractSerializer.%23ctor%28System.Type%2CSystem.Runtime.Serialization.DataContractSerializerSettings%29](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer.%2523ctor%2528System.Type%252CSystem.Runtime.Serialization.DataContractSerializerSettings%2529)

  - [System.Runtime.Serialization.DataContractSerializer.%23ctor%28System.Type%2CSystem.String%2CSystem.String%2CSystem.Collections.Generic.IEnumerable%7BSystem.Type%7D%29](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer.%2523ctor%2528System.Type%252CSystem.String%252CSystem.String%252CSystem.Collections.Generic.IEnumerable%257BSystem.Type%257D%2529)

  - [System.Runtime.Serialization.DataContractSerializer.%23ctor%28System.Type%2CSystem.Xml.XmlDictionaryString%2CSystem.Xml.XmlDictionaryString%2CSystem.Collections.Generic.IEnumerable%7BSystem.Type%7D%29](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer.%2523ctor%2528System.Type%252CSystem.Xml.XmlDictionaryString%252CSystem.Xml.XmlDictionaryString%252CSystem.Collections.Generic.IEnumerable%257BSystem.Type%257D%2529)

  - [System.Runtime.Serialization.Json.DataContractJsonSerializer.%23ctor%28System.Type%2CSystem.Runtime.Serialization.Json.DataContractJsonSerializerSettings%29](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Json.DataContractJsonSerializer.%2523ctor%2528System.Type%252CSystem.Runtime.Serialization.Json.DataContractJsonSerializerSettings%2529)

  - [System.Runtime.Serialization.Json.DataContractJsonSerializer.%23ctor%28System.Type%2CSystem.Collections.Generic.IEnumerable%7BSystem.Type%7D%29](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Json.DataContractJsonSerializer.%2523ctor%2528System.Type%252CSystem.Collections.Generic.IEnumerable%257BSystem.Type%257D%2529)

  - [System.Xml.Serialization.XmlSerializer.%23ctor%28System.Type%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.%2523ctor%2528System.Type%252CSystem.String%2529)

  - [System.Xml.Serialization.XmlSerializer.%23ctor%28System.Type%2CSystem.Type%5B%5D%29](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.%2523ctor%2528System.Type%252CSystem.Type%255B%255D%2529)

  - [System.Xml.Serialization.XmlSerializer.%23ctor%28System.Type%2CSystem.Xml.Serialization.XmlAttributeOverrides%29](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.%2523ctor%2528System.Type%252CSystem.Xml.Serialization.XmlAttributeOverrides%2529)

  - [System.Xml.Serialization.XmlSerializer.%23ctor%28System.Type%2CSystem.Xml.Serialization.XmlRootAttribute%29](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.%2523ctor%2528System.Type%252CSystem.Xml.Serialization.XmlRootAttribute%2529)

  - [System.Xml.Serialization.XmlSerializer.%23ctor%28System.Type%2CSystem.Xml.Serialization.XmlAttributeOverrides%2CSystem.Type%5B%5D%2CSystem.Xml.Serialization.XmlRootAttribute%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.%2523ctor%2528System.Type%252CSystem.Xml.Serialization.XmlAttributeOverrides%252CSystem.Type%255B%255D%252CSystem.Xml.Serialization.XmlRootAttribute%252CSystem.String%2529)

- [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) fails to generate code for a type that has methods attributed with any of the following attributes:

  - [System.Runtime.Serialization.OnSerializingAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.OnSerializingAttribute)

  - [System.Runtime.Serialization.OnSerializedAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.OnSerializedAttribute)

  - [System.Runtime.Serialization.OnDeserializingAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.OnDeserializingAttribute)

  - [System.Runtime.Serialization.OnDeserializedAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.OnDeserializedAttribute)

- [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) doesn't honor the [System.Xml.Serialization.IXmlSerializable](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable) custom serialization interface. If you have a class that implements this interface, [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) considers the type a plain old CLR object (POCO) type and serializes only its public properties.

- Serializing a plain [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) object doesn't work well with [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) and [System.Runtime.Serialization.Json.DataContractJsonSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Json.DataContractJsonSerializer).

<a name="VS"></a>

## Visual Studio differences

**Exceptions and debugging**

When you're running apps compiled by using .NET Native in the debugger, first-chance exceptions are enabled for the following exception types:

- [System.MemberAccessException](https://learn.microsoft.com/search/?terms=System.MemberAccessException)

- [System.TypeAccessException](https://learn.microsoft.com/search/?terms=System.TypeAccessException)

**Building apps**

Use the x86 build tools that are used by default by Visual Studio. We don't recommend using the AMD64 MSBuild tools, which are found in C:\Program Files (x86)\MSBuild\12.0\bin\amd64; these may create build problems.

**Profilers**

- The Visual Studio CPU Profiler and XAML Memory Profiler don't display Just-My-Code correctly.

- The XAML Memory Profiler doesn't accurately display managed heap data.

- The CPU Profiler doesn't correctly identify modules, and displays prefixed function names.

**Unit Test Library projects**

Enabling .NET Native on a Unit Test Library for a Windows 8.x app project isn't supported and causes the project to fail to build.

## See also

- [Getting Started](getting-started-with-net-native.md)
- [Runtime Directives (rd.xml) Configuration File Reference](runtime-directives-rd-xml-configuration-file-reference.md)
- [.NET Framework Support for Microsoft Store Apps and Windows Runtime](https://learn.microsoft.com/dotnet/framework/cross-platform/support-for-windows-store-apps-and-windows-runtime)
