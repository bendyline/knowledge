---
title: "Applying Interop Attributes"
description: This article summarizes COM interop attributes of the System.Runtime.InteropServices namespace, including design-time and conversion-tool attributes.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "design-time attributes"
  - ".NET, exposing components to COM"
  - "attributes [.NET], design-time functionality"
  - "conversion-tool attributes"
  - "attributes [.NET], interop-specific"
  - "attributes [.NET], conversion-tool"
  - "interoperation with unmanaged code, applying attributes"
  - "interoperation with unmanaged code, exposing .NET components"
  - "COM interop, exposing COM components"
  - "COM interop, applying attributes"
---

# Apply interop attributes

The [System.Runtime.InteropServices](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices) namespace provides three categories of interop-specific attributes: those applied by you at design time, those applied by COM interop tools and APIs during the conversion process, and those applied either by you or COM interop.

 If you are unfamiliar with the task of applying attributes to managed code, see [Extending Metadata Using Attributes](../attributes/index.md). Like other custom attributes, you can apply interop-specific attributes to types, methods, properties, parameters, fields, and other members.

## Design-Time Attributes

 You can adjust the outcome of the conversion process performed by COM interop tools and APIs by using design-time attributes. The following table describes the attributes that you can apply to your managed source code. COM interop tools, on occasion, might also apply the attributes described in this table.

| Attribute | Description |
| --- | --- |
| [System.Runtime.InteropServices.AutomationProxyAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.AutomationProxyAttribute) | Specifies whether the type should be marshalled using the Automation marshaller or a custom proxy and stub. |
| [System.Runtime.InteropServices.ClassInterfaceAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ClassInterfaceAttribute) | Controls the type of interface generated for a class. |
| [System.Runtime.InteropServices.CoClassAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.CoClassAttribute) | Identifies the CLSID of the original coclass imported from a type library.<br /><br /> COM interop tools typically apply this attribute. |
| [System.Runtime.InteropServices.ComImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComImportAttribute) | Indicates that a coclass or interface definition was imported from a COM type library. The runtime uses this flag to know how to activate and marshal the type. This attribute prohibits the type from being exported back to a type library.<br /><br /> COM interop tools typically apply this attribute. |
| [System.Runtime.InteropServices.ComRegisterFunctionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComRegisterFunctionAttribute) | Indicates that a method should be called when the assembly is registered for use from COM, so that user-written code can be executed during the registration process. |
| [System.Runtime.InteropServices.ComSourceInterfacesAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComSourceInterfacesAttribute) | Identifies interfaces that are sources of events for the class.<br /><br /> COM interop tools can apply this attribute. |
| [System.Runtime.InteropServices.ComUnregisterFunctionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComUnregisterFunctionAttribute) | Indicates that a method should be called when the assembly is unregistered from COM, so that user-written code can execute during the process. |
| [System.Runtime.InteropServices.ComVisibleAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComVisibleAttribute) | Renders types invisible to COM when the attribute value equals **false**. This attribute can be applied to an individual type or to an entire assembly to control COM visibility. By default, all managed, public types are visible; the attribute is not needed to make them visible. |
| [System.Runtime.InteropServices.DispIdAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DispIdAttribute) | Specifies the COM dispatch identifier (DISPID) of a method or field. This attribute contains the DISPID for the method, field, or property it describes.<br /><br /> COM interop tools can apply this attribute. |
| [System.Runtime.InteropServices.ComDefaultInterfaceAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComDefaultInterfaceAttribute) | Indicates the default interface for a COM class implemented in .NET.<br /><br /> COM interop tools can apply this attribute. |
| [System.Runtime.InteropServices.FieldOffsetAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.FieldOffsetAttribute) | Indicates the physical position of each field within a class when used with the **StructLayoutAttribute**, and the **LayoutKind** is set to Explicit. |
| [System.Runtime.InteropServices.GuidAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.GuidAttribute) | Specifies the globally unique identifier (GUID) of a class, interface, or an entire type library. The string passed to the attribute must be a format that is an acceptable constructor argument for the type **System.Guid**.<br /><br /> COM interop tools can apply this attribute. |
| [System.Runtime.InteropServices.IDispatchImplAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.IDispatchImplAttribute) | Indicates which **IDispatch** interface implementation the common language runtime uses when exposing dual interfaces and dispinterfaces to COM. |
| [System.Runtime.InteropServices.InAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.InAttribute) | Indicates that data should be marshalled in to the caller. Can be used to attribute parameters. |
| [System.Runtime.InteropServices.InterfaceTypeAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.InterfaceTypeAttribute) | Controls how a managed interface is exposed to COM clients (Dual, IUnknown-derived, or IDispatch only).<br /><br /> COM interop tools can apply this attribute. |
| [System.Runtime.InteropServices.LCIDConversionAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.LCIDConversionAttribute) | Indicates that an unmanaged method signature expects an LCID parameter.<br /><br /> COM interop tools can apply this attribute. |
| [System.Runtime.InteropServices.MarshalAsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.MarshalAsAttribute) | Indicates how the data in fields or parameters should be marshalled between managed and unmanaged code. The attribute is always optional because each data type has default marshalling behavior.<br /><br /> COM interop tools can apply this attribute. |
| [System.Runtime.InteropServices.OptionalAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.OptionalAttribute) | Indicates that a parameter is optional.<br /><br /> COM interop tools can apply this attribute. |
| [System.Runtime.InteropServices.OutAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.OutAttribute) | Indicates that the data in a field or parameter must be marshalled from a called object back to its caller. |
| [System.Runtime.InteropServices.PreserveSigAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.PreserveSigAttribute) | Suppresses the HRESULT or retval signature transformation that normally takes place during interoperation calls. The attribute affects marshalling as well as type library exporting.<br /><br /> COM interop tools can apply this attribute. |
| [System.Runtime.InteropServices.ProgIdAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ProgIdAttribute) | Specifies the ProgID of a .NET class. Can be used to attribute classes. |
| [System.Runtime.InteropServices.StructLayoutAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.StructLayoutAttribute) | Controls the physical layout of the fields of a class. For managed fixed-size buffers, see [Fixed-size buffers and inline arrays](customize-struct-marshalling.md#fixed-size-buffers-and-inline-arrays) and [System.Runtime.CompilerServices.InlineArrayAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.InlineArrayAttribute).<br /><br /> COM interop tools can apply this attribute. |

## Conversion-Tool Attributes

 The following table describes attributes that COM interop tools apply during the conversion process. You do not apply these attributes at design time.

| Attribute | Description |
| --- | --- |
| [System.Runtime.InteropServices.ComAliasNameAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComAliasNameAttribute) | Indicates the COM alias for a parameter or field type. Can be used to attribute parameters, fields, or return values. |
| [System.Runtime.InteropServices.ComConversionLossAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComConversionLossAttribute) | Indicates that information about a class or interface was lost when it was imported from a type library to an assembly. |
| [System.Runtime.InteropServices.ComEventInterfaceAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ComEventInterfaceAttribute) | Identifies the source interface and the class that implements the methods of the event interface. |
| [System.Runtime.InteropServices.ImportedFromTypeLibAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.ImportedFromTypeLibAttribute) | Indicates that the assembly was originally imported from a COM type library. This attribute contains the type library definition of the original type library. |
| [System.Runtime.InteropServices.TypeLibFuncAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.TypeLibFuncAttribute) | Contains the **FUNCFLAGS** that were originally imported for this function from the COM type library. |
| [System.Runtime.InteropServices.TypeLibTypeAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.TypeLibTypeAttribute) | Contains the **TYPEFLAGS** that were originally imported for this type from the COM type library. |
| [System.Runtime.InteropServices.TypeLibVarAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.TypeLibVarAttribute) | Contains the **VARFLAGS** that were originally imported for this variable from the COM type library. |

## See also

- [System.Runtime.InteropServices](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices)
- [Exposing .NET Framework Components to COM](exposing-dotnet-components-to-com.md)
- [Attributes](../attributes/index.md)
- [Qualifying .NET Types for Interoperation](qualify-net-types-for-interoperation.md)
- [Packaging a .NET Framework Assembly for COM](packaging-an-assembly-for-com.md)
