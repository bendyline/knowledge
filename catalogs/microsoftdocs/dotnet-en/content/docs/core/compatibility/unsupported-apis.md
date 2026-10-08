---
title: Unsupported APIs on .NET Core and .NET 5+
titleSuffix: ""
description: Learn which .NET APIs always throw an exception on .NET Core and .NET 5 and later versions.
ms.date: 03/16/2026
ai-usage: ai-assisted
---
# APIs that always throw exceptions on .NET (Core)

The following APIs always throw an exception on .NET (Core) on all or a subset of platforms. In most cases, the exception that's thrown is [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException).

This article organizes the affected APIs by namespace.

> **Note:**
>
> - This article is a work-in-progress. It is not a complete list of APIs that throw exceptions on .NET 5+.
> - This article does not include the explicit interface implementations for binary serialization that throw on .NET 5+. For more information, see [Binary serialization in .NET Core](https://learn.microsoft.com/previous-versions/dotnet/fundamentals/serialization/binary/binary-serialization#net-core).

## System

| Member | Platforms that throw |
| --- | --- |
| [System.AppDomain.CreateDomain*](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateDomain*) | All |
| [System.AppDomain.ExecuteAssembly(System.String,System.String\[\],System.Byte\[\],System.Configuration.Assemblies.AssemblyHashAlgorithm)](https://learn.microsoft.com/search/?terms=System.AppDomain.ExecuteAssembly(System.String%2CSystem.String%5B%5D%2CSystem.Byte%5B%5D%2CSystem.Configuration.Assemblies.AssemblyHashAlgorithm)) | All |
| [System.AppDomain.Unload(System.AppDomain)](https://learn.microsoft.com/search/?terms=System.AppDomain.Unload(System.AppDomain)) | All |
| [System.Console.CapsLock](https://learn.microsoft.com/search/?terms=System.Console.CapsLock) | Linux and macOS |
| [System.Console.NumberLock](https://learn.microsoft.com/search/?terms=System.Console.NumberLock) | Linux and macOS |
| [System.Delegate.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Delegate.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Exception.SerializeObjectState](https://learn.microsoft.com/search/?terms=System.Exception.SerializeObjectState) | All |
| [System.MarshalByRefObject.GetLifetimeService](https://learn.microsoft.com/search/?terms=System.MarshalByRefObject.GetLifetimeService) | All |
| [System.MarshalByRefObject.InitializeLifetimeService](https://learn.microsoft.com/search/?terms=System.MarshalByRefObject.InitializeLifetimeService) | All |
| [System.OperatingSystem.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.OperatingSystem.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Type.ReflectionOnlyGetType(System.String,System.Boolean,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Type.ReflectionOnlyGetType(System.String%2CSystem.Boolean%2CSystem.Boolean)) | All |

## System.CodeDom.Compiler

| Member | Platforms that throw |
| --- | --- |
| [System.CodeDom.Compiler.CodeDomProvider.CompileAssemblyFromDom*](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CodeDomProvider.CompileAssemblyFromDom*) | All |
| [System.CodeDom.Compiler.CodeDomProvider.CompileAssemblyFromFile*](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CodeDomProvider.CompileAssemblyFromFile*) | All |
| [System.CodeDom.Compiler.CodeDomProvider.CompileAssemblyFromSource*](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.CodeDomProvider.CompileAssemblyFromSource*) | All |

## System.Collections.Specialized

| Member | Platforms that throw |
| --- | --- |
| [System.Collections.Specialized.NameObjectCollectionBase.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.NameObjectCollectionBase.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Collections.Specialized.NameObjectCollectionBase.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.NameObjectCollectionBase.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Collections.Specialized.NameObjectCollectionBase.OnDeserialization(System.Object)](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.NameObjectCollectionBase.OnDeserialization(System.Object)) | All |

## System.Configuration

| Member | Platforms that throw |
| --- | --- |
| [System.Configuration.RsaProtectedConfigurationProvider](https://learn.microsoft.com/search/?terms=System.Configuration.RsaProtectedConfigurationProvider) (all members) | All |

## System.Console

| Member | Platforms that throw |
| --- | --- |
| [System.Console.Beep](https://learn.microsoft.com/search/?terms=System.Console.Beep) | Linux and macOS |
| [System.Console.BufferHeight](https://learn.microsoft.com/search/?terms=System.Console.BufferHeight) (set only) | Linux and macOS |
| [System.Console.BufferWidth](https://learn.microsoft.com/search/?terms=System.Console.BufferWidth) (set only) | Linux and macOS |
| [System.Console.CursorSize](https://learn.microsoft.com/search/?terms=System.Console.CursorSize) (set only) | Linux and macOS |
| [System.Console.CursorVisible](https://learn.microsoft.com/search/?terms=System.Console.CursorVisible) (get only) | Linux and macOS |
| [System.Console.MoveBufferArea*](https://learn.microsoft.com/search/?terms=System.Console.MoveBufferArea*) | Linux and macOS |
| [System.Console.SetWindowPosition*](https://learn.microsoft.com/search/?terms=System.Console.SetWindowPosition*) | Linux and macOS |
| [System.Console.SetWindowSize*](https://learn.microsoft.com/search/?terms=System.Console.SetWindowSize*) | Linux and macOS |
| [System.Console.Title](https://learn.microsoft.com/search/?terms=System.Console.Title) (get only) | Linux and macOS |
| [System.Console.WindowHeight](https://learn.microsoft.com/search/?terms=System.Console.WindowHeight) (set only) | Linux and macOS |
| [System.Console.WindowLeft](https://learn.microsoft.com/search/?terms=System.Console.WindowLeft) (set only) | Linux and macOS |
| [System.Console.WindowTop](https://learn.microsoft.com/search/?terms=System.Console.WindowTop) (set only) | Linux and macOS |
| [System.Console.WindowWidth](https://learn.microsoft.com/search/?terms=System.Console.WindowWidth) (set only) | Linux and macOS |

## System.Diagnostics.Process

| Member | Platforms that throw |
| --- | --- |
| [System.Diagnostics.Process.MaxWorkingSet](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.MaxWorkingSet) (set only) | Linux |
| [System.Diagnostics.Process.MinWorkingSet](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.MinWorkingSet) (set only) | Linux |
| [System.Diagnostics.Process.ProcessorAffinity](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.ProcessorAffinity) | macOS |
| [System.Diagnostics.Process.MainWindowHandle](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.MainWindowHandle) | Linux and macOS |
| [System.Diagnostics.Process.Start(System.String,System.String,System.String,System.Security.SecureString,System.String)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.Start(System.String%2CSystem.String%2CSystem.String%2CSystem.Security.SecureString%2CSystem.String)) | Linux and macOS |
| [System.Diagnostics.Process.Start(System.String,System.String,System.Security.SecureString,System.String)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Process.Start(System.String%2CSystem.String%2CSystem.Security.SecureString%2CSystem.String)) | Linux and macOS |
| [System.Diagnostics.ProcessStartInfo.UserName](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.UserName) | Linux and macOS |
| [System.Diagnostics.ProcessStartInfo.PasswordInClearText](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.PasswordInClearText) | Linux and macOS |
| [System.Diagnostics.ProcessStartInfo.Domain](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.Domain) | Linux and macOS |
| [System.Diagnostics.ProcessStartInfo.LoadUserProfile](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessStartInfo.LoadUserProfile) | Linux and macOS |
| [System.Diagnostics.ProcessThread.BasePriority](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessThread.BasePriority) (set only) | Linux and macOS |
| [System.Diagnostics.ProcessThread.BasePriority](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessThread.BasePriority) (get only) | macOS |
| [System.Diagnostics.ProcessThread.ProcessorAffinity](https://learn.microsoft.com/search/?terms=System.Diagnostics.ProcessThread.ProcessorAffinity) (set only) | Linux and macOS |

## System.IO

| Member | Platforms that throw |
| --- | --- |
| [System.IO.FileSystemInfo.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.FileSystemInfo.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.IO.FileSystemInfo.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.IO.FileSystemInfo.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |

## System.IO.Pipes

| Member | Platforms that throw |
| --- | --- |
| [System.IO.Pipes.NamedPipeClientStream.NumberOfServerInstances](https://learn.microsoft.com/search/?terms=System.IO.Pipes.NamedPipeClientStream.NumberOfServerInstances) | Linux and macOS |
| [System.IO.Pipes.NamedPipeServerStream.GetImpersonationUserName](https://learn.microsoft.com/search/?terms=System.IO.Pipes.NamedPipeServerStream.GetImpersonationUserName) | Linux and macOS |
| [System.IO.Pipes.PipeStream.InBufferSize](https://learn.microsoft.com/search/?terms=System.IO.Pipes.PipeStream.InBufferSize) | Linux and macOS |
| [System.IO.Pipes.PipeStream.OutBufferSize](https://learn.microsoft.com/search/?terms=System.IO.Pipes.PipeStream.OutBufferSize) | Linux and macOS |
| [System.IO.Pipes.PipeStream.ReadMode](https://learn.microsoft.com/search/?terms=System.IO.Pipes.PipeStream.ReadMode) (set only) | Linux and macOS |
| [System.IO.Pipes.PipeStream.WaitForPipeDrain](https://learn.microsoft.com/search/?terms=System.IO.Pipes.PipeStream.WaitForPipeDrain) | Linux and macOS |

## System.Media

| Member | Platforms that throw |
| --- | --- |
| [System.Media.SoundPlayer.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Media.SoundPlayer.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |

## System.Net

| Member | Platforms that throw |
| --- | --- |
| [System.Net.AuthenticationManager](https://learn.microsoft.com/search/?terms=System.Net.AuthenticationManager)\* | All |
| [System.Net.AuthenticationManager.Authenticate(System.String,System.Net.WebRequest,System.Net.ICredentials)](https://learn.microsoft.com/search/?terms=System.Net.AuthenticationManager.Authenticate(System.String%2CSystem.Net.WebRequest%2CSystem.Net.ICredentials)) | All |
| [System.Net.AuthenticationManager.PreAuthenticate(System.Net.WebRequest,System.Net.ICredentials)](https://learn.microsoft.com/search/?terms=System.Net.AuthenticationManager.PreAuthenticate(System.Net.WebRequest%2CSystem.Net.ICredentials)) | All |
| [System.Net.FileWebRequest.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.FileWebRequest.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.FileWebRequest.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.FileWebRequest.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.FileWebResponse.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.FileWebResponse.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.FileWebResponse.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.FileWebResponse.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.HttpWebRequest.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.HttpWebRequest.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.HttpWebResponse.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.HttpWebResponse.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.HttpWebResponse.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.HttpWebResponse.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.WebProxy.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.WebProxy.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.WebProxy.GetDefaultProxy](https://learn.microsoft.com/search/?terms=System.Net.WebProxy.GetDefaultProxy) | All |
| [System.Net.WebProxy.GetObjectData*](https://learn.microsoft.com/search/?terms=System.Net.WebProxy.GetObjectData*) | All |
| [System.Net.WebRequest.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.WebRequest.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.WebRequest.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.WebRequest.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.WebResponse.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.WebResponse.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Net.WebResponse.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Net.WebResponse.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |

\* .NET 9 and later versions.

## System.Net.NetworkInformation

| Member | Platforms that throw |
| --- | --- |
| [System.Net.NetworkInformation.Ping.Send*](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.Ping.Send*) | Windows (UWP) |

## System.Net.Sockets

| Member | Platforms that throw |
| --- | --- |
| [System.Net.Sockets.Socket.%23ctor(System.Net.Sockets.SocketInformation)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.%2523ctor(System.Net.Sockets.SocketInformation)) | All |
| [System.Net.Sockets.Socket.DuplicateAndClose(System.Int32)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.DuplicateAndClose(System.Int32)) | All |

## System.Net.WebSockets

| Member | Platforms that throw |
| --- | --- |
| [System.Net.WebSockets.WebSocket.RegisterPrefixes](https://learn.microsoft.com/search/?terms=System.Net.WebSockets.WebSocket.RegisterPrefixes) | All |

## System.Reflection

| Member | Platforms that throw |
| --- | --- |
| [System.Reflection.Assembly.CodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.CodeBase) | All |
| [System.Reflection.Assembly.EscapedCodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.EscapedCodeBase) | All |
| [System.Reflection.Assembly.LoadFrom(System.String,System.Byte\[\],System.Configuration.Assemblies.AssemblyHashAlgorithm)](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.LoadFrom(System.String%2CSystem.Byte%5B%5D%2CSystem.Configuration.Assemblies.AssemblyHashAlgorithm)) | All |
| [System.Reflection.Assembly.ReflectionOnlyLoad*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.ReflectionOnlyLoad*) | All |
| [System.Reflection.Assembly.ReflectionOnlyLoadFrom(System.String)](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.ReflectionOnlyLoadFrom(System.String)) | All |
| [System.Reflection.AssemblyName.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Reflection.AssemblyName.KeyPair](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.KeyPair) | All |
| [System.Reflection.AssemblyName.OnDeserialization(System.Object)](https://learn.microsoft.com/search/?terms=System.Reflection.AssemblyName.OnDeserialization(System.Object)) | All |
| [System.Reflection.StrongNameKeyPair.%23ctor*](https://learn.microsoft.com/search/?terms=System.Reflection.StrongNameKeyPair.%2523ctor*) | All |
| [System.Reflection.StrongNameKeyPair.PublicKey](https://learn.microsoft.com/search/?terms=System.Reflection.StrongNameKeyPair.PublicKey) | All |

## System.Runtime.CompilerServices

| Member | Platforms that throw |
| --- | --- |
| [System.Runtime.CompilerServices.DebugInfoGenerator.CreatePdbGenerator](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.DebugInfoGenerator.CreatePdbGenerator) | All |

## System.Runtime.InteropServices

| Member | Platforms that throw |
| --- | --- |
| [System.Runtime.InteropServices.IDispatchImplAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.IDispatchImplAttribute) | All |
| [System.Runtime.InteropServices.Marshal.GetIDispatchForObject(System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.GetIDispatchForObject(System.Object)) | All |
| [System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile) | All |
| [System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid,System.Guid)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid%2CSystem.Guid)) | All |
| [System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid,System.Guid)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid%2CSystem.Guid)) | All |
| [System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeMarshal.StringToHString(System.String)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeMarshal.StringToHString(System.String)) | Linux and macOS |
| [System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeMarshal.PtrToStringHString(System.IntPtr)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeMarshal.PtrToStringHString(System.IntPtr)) | Linux and macOS |
| [System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeMarshal.FreeHString(System.IntPtr)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeMarshal.FreeHString(System.IntPtr)) | Linux and macOS |

## System.Runtime.Serialization

| Member | Platforms that throw |
| --- | --- |
| [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize(System.IO.Stream,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize(System.IO.Stream%2CSystem.Object))\* | All |
| [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize(System.IO.Stream,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize(System.IO.Stream%2CSystem.Object))† | All |
| [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream))† | All |
| [System.Runtime.Serialization.XsdDataContractExporter.Schemas](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractExporter.Schemas) | All |

\* .NET 9 and later versions.
† .NET 8 only for all project types except Windows Forms and WPF.

## System.Security

| Member | Platforms that throw |
| --- | --- |
| [System.Security.CodeAccessPermission.Deny](https://learn.microsoft.com/search/?terms=System.Security.CodeAccessPermission.Deny) | All |
| [System.Security.CodeAccessPermission.PermitOnly](https://learn.microsoft.com/search/?terms=System.Security.CodeAccessPermission.PermitOnly) | All |
| [System.Security.PermissionSet.ConvertPermissionSet(System.String,System.Byte\[\],System.String)](https://learn.microsoft.com/search/?terms=System.Security.PermissionSet.ConvertPermissionSet(System.String%2CSystem.Byte%5B%5D%2CSystem.String)) | All |
| [System.Security.PermissionSet.Deny](https://learn.microsoft.com/search/?terms=System.Security.PermissionSet.Deny) | All |
| [System.Security.PermissionSet.PermitOnly](https://learn.microsoft.com/search/?terms=System.Security.PermissionSet.PermitOnly) | All |
| [System.Security.SecurityContext.Capture](https://learn.microsoft.com/search/?terms=System.Security.SecurityContext.Capture) | All |
| [System.Security.SecurityContext.CreateCopy](https://learn.microsoft.com/search/?terms=System.Security.SecurityContext.CreateCopy) | All |
| [System.Security.SecurityContext.Dispose](https://learn.microsoft.com/search/?terms=System.Security.SecurityContext.Dispose) | All |
| [System.Security.SecurityContext.IsFlowSuppressed](https://learn.microsoft.com/search/?terms=System.Security.SecurityContext.IsFlowSuppressed) | All |
| [System.Security.SecurityContext.IsWindowsIdentityFlowSuppressed](https://learn.microsoft.com/search/?terms=System.Security.SecurityContext.IsWindowsIdentityFlowSuppressed) | All |
| [System.Security.SecurityContext.RestoreFlow](https://learn.microsoft.com/search/?terms=System.Security.SecurityContext.RestoreFlow) | All |
| [System.Security.SecurityContext.Run(System.Security.SecurityContext,System.Threading.ContextCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.Security.SecurityContext.Run(System.Security.SecurityContext%2CSystem.Threading.ContextCallback%2CSystem.Object)) | All |
| [System.Security.SecurityContext.SuppressFlow](https://learn.microsoft.com/search/?terms=System.Security.SecurityContext.SuppressFlow) | All |
| [System.Security.SecurityContext.SuppressFlowWindowsIdentity](https://learn.microsoft.com/search/?terms=System.Security.SecurityContext.SuppressFlowWindowsIdentity) | All |

## System.Security.Claims

| Member | Platforms that throw |
| --- | --- |
| [System.Security.Claims.ClaimsPrincipal.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Security.Claims.ClaimsPrincipal.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Security.Claims.ClaimsIdentity.%23ctor(System.Runtime.Serialization.SerializationInfo)](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.%2523ctor(System.Runtime.Serialization.SerializationInfo)) | All |
| [System.Security.Claims.ClaimsIdentity.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Security.Claims.ClaimsIdentity.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |

## System.Security.Cryptography

| Member | Platforms that throw |
| --- | --- |
| [System.Security.Cryptography.AesCcm.%23ctor*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCcm.%2523ctor*) | macOS |
| [System.Security.Cryptography.AsymmetricAlgorithm.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AsymmetricAlgorithm.Create(System.String)) | All |
| [System.Security.Cryptography.CngAlgorithm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CngAlgorithm) | Linux and macOS |
| [System.Security.Cryptography.CngAlgorithmGroup](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CngAlgorithmGroup) | Linux and macOS |
| [System.Security.Cryptography.CngKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CngKey) | Linux and macOS |
| [System.Security.Cryptography.CngKeyBlobFormat](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CngKeyBlobFormat) | Linux and macOS |
| [System.Security.Cryptography.CngKeyCreationParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CngKeyCreationParameters) | Linux and macOS |
| [System.Security.Cryptography.CngProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CngProvider) | Linux and macOS |
| [System.Security.Cryptography.CngUIPolicy](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CngUIPolicy) | Linux and macOS |
| [System.Security.Cryptography.CryptoConfig.EncodeOID(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoConfig.EncodeOID(System.String)) | All |
| [System.Security.Cryptography.CspKeyContainerInfo.%23ctor*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.%2523ctor*) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.Accessible](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.Accessible) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.Exportable](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.Exportable) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.HardwareDevice](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.HardwareDevice) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.KeyContainerName](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.KeyContainerName) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.KeyNumber](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.KeyNumber) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.MachineKeyStore](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.MachineKeyStore) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.Protected](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.Protected) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.ProviderName](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.ProviderName) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.ProviderType](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.ProviderType) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.RandomlyGenerated](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.RandomlyGenerated) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.Removable](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.Removable) | Linux and macOS |
| [System.Security.Cryptography.CspKeyContainerInfo.UniqueKeyContainerName](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspKeyContainerInfo.UniqueKeyContainerName) | Linux and macOS |
| [System.Security.Cryptography.DSA.Create*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSA.Create*)\* | macOS |
| [System.Security.Cryptography.DSACryptoServiceProvider.%23ctor*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSACryptoServiceProvider.%2523ctor*)\* | macOS |
| [System.Security.Cryptography.X509Certificates.DSACertificateExtensions.GetDSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.DSACertificateExtensions.GetDSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2))\* | macOS |
| [System.Security.Cryptography.X509Certificates.DSACertificateExtensions.GetDSAPublicKey(System.Security.Cryptography.X509Certificates.X509Certificate2)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.DSACertificateExtensions.GetDSAPublicKey(System.Security.Cryptography.X509Certificates.X509Certificate2))\* | macOS |
| [System.Security.Cryptography.X509Certificates.DSACertificateExtensions.CopyWithPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2,System.Security.Cryptography.DSA)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.DSACertificateExtensions.CopyWithPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2%2CSystem.Security.Cryptography.DSA))\* | macOS |
| [System.Security.Cryptography.DSAOpenSsl.%23ctor*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSAOpenSsl.%2523ctor*) | macOS |
| [System.Security.Cryptography.ECDiffieHellmanCng.FromXmlString(System.String,System.Security.Cryptography.ECKeyXmlFormat)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanCng.FromXmlString(System.String%2CSystem.Security.Cryptography.ECKeyXmlFormat)) | All |
| [System.Security.Cryptography.ECDiffieHellmanCng.ToXmlString(System.Security.Cryptography.ECKeyXmlFormat)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanCng.ToXmlString(System.Security.Cryptography.ECKeyXmlFormat)) | All |
| [System.Security.Cryptography.ECDiffieHellmanCngPublicKey.FromXmlString(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanCngPublicKey.FromXmlString(System.String)) | All |
| [System.Security.Cryptography.ECDiffieHellmanCngPublicKey.ToXmlString](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanCngPublicKey.ToXmlString) | All |
| [System.Security.Cryptography.ECDiffieHellmanOpenSsl.%23ctor*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanOpenSsl.%2523ctor*) | macOS |
| [System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray) | Linux and macOS |
| [System.Security.Cryptography.ECDiffieHellmanPublicKey.ToXmlString](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.ToXmlString) | All |
| [System.Security.Cryptography.ECDsaCng.FromXmlString(System.String,System.Security.Cryptography.ECKeyXmlFormat)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDsaCng.FromXmlString(System.String%2CSystem.Security.Cryptography.ECKeyXmlFormat)) | All |
| [System.Security.Cryptography.ECDsaCng.ToXmlString(System.Security.Cryptography.ECKeyXmlFormat)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDsaCng.ToXmlString(System.Security.Cryptography.ECKeyXmlFormat)) | All |
| [System.Security.Cryptography.ECDsaOpenSsl.%23ctor*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDsaOpenSsl.%2523ctor*) | macOS |
| [System.Security.Cryptography.HashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm.Create) | All |
| [System.Security.Cryptography.HMAC.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMAC.Create) | All |
| [System.Security.Cryptography.HMAC.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMAC.Create(System.String)) | All |
| [System.Security.Cryptography.HMAC.HashCore*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMAC.HashCore*) | All |
| [System.Security.Cryptography.HMAC.HashFinal*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMAC.HashFinal*) | All |
| [System.Security.Cryptography.HMAC.Initialize*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMAC.Initialize*) | All |
| [System.Security.Cryptography.KeyedHashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.KeyedHashAlgorithm.Create) | All |
| [System.Security.Cryptography.KeyedHashAlgorithm.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.KeyedHashAlgorithm.Create(System.String)) | All |
| [System.Security.Cryptography.ProtectedData.Protect*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ProtectedData.Protect*) | Linux and macOS |
| [System.Security.Cryptography.ProtectedData.Unprotect*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ProtectedData.Unprotect*) | Linux and macOS |
| [System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte%5B%5D)) | All |
| [System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte%5B%5D)) | All |
| [System.Security.Cryptography.RSAOpenSsl.%23ctor*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSAOpenSsl.%2523ctor*) | macOS |
| [System.Security.Cryptography.RSA.DecryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.DecryptValue(System.Byte%5B%5D)) | All |
| [System.Security.Cryptography.RSA.EncryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.EncryptValue(System.Byte%5B%5D)) | All |
| [System.Security.Cryptography.RSA.FromXmlString*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.FromXmlString*) | All |
| [System.Security.Cryptography.RSA.ToXmlString*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.ToXmlString*) | All |
| [System.Security.Cryptography.SafeEvpPKeyHandle](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SafeEvpPKeyHandle) | macOS |
| [System.Security.Cryptography.SymmetricAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SymmetricAlgorithm.Create) | All |
| [System.Security.Cryptography.SymmetricAlgorithm.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SymmetricAlgorithm.Create(System.String)) | All |

\* .NET 11 and later versions.

## System.Security.Cryptography.Pkcs

| Member | Platforms that throw |
| --- | --- |
| [System.Security.Cryptography.Pkcs.CmsSigner.%23ctor(System.Security.Cryptography.CspParameters)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.CmsSigner.%2523ctor(System.Security.Cryptography.CspParameters)) | All |
| [System.Security.Cryptography.Pkcs.SignerInfo.ComputeCounterSignature](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Pkcs.SignerInfo.ComputeCounterSignature) | All |

## System.Security.Cryptography.X509Certificates

| Member | Platforms that throw |
| --- | --- |
| [System.Security.Cryptography.X509Certificates.X509Certificate.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Security.Cryptography.X509Certificates.X509Certificate.Import*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate.Import*) | All |
| [System.Security.Cryptography.X509Certificates.X509Certificate2.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Security.Cryptography.X509Certificates.X509Certificate2.PrivateKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2.PrivateKey) (set only) | All |

## System.Security.Authentication.ExtendedProtection

| Member | Platforms that throw |
| --- | --- |
| [System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |

## System.Security.Policy

| Member | Platforms that throw |
| --- | --- |
| [System.Security.Policy.Hash.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Security.Policy.Hash.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |

## System.ServiceProcess.ServiceController

| Member | Platforms that throw |
| --- | --- |
| [System.ServiceProcess.TimeoutException.%23ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.ServiceProcess.TimeoutException.%2523ctor(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |

## System.Text.RegularExpressions

| Member | Platforms that throw |
| --- | --- |
| [System.Text.RegularExpressions.Regex.CompileToAssembly*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.CompileToAssembly*) | All |

## System.Threading

| Member | Platforms that throw |
| --- | --- |
| [System.Threading.CompressedStack.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.CompressedStack.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Threading.ExecutionContext.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)](https://learn.microsoft.com/search/?terms=System.Threading.ExecutionContext.GetObjectData(System.Runtime.Serialization.SerializationInfo%2CSystem.Runtime.Serialization.StreamingContext)) | All |
| [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) | All |
| [System.Threading.Thread.ResetAbort](https://learn.microsoft.com/search/?terms=System.Threading.Thread.ResetAbort) | All |
| [System.Threading.Thread.Resume](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Resume) | All |
| [System.Threading.Thread.Suspend](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Suspend) | All |

## System.Xml

| Member | Platforms that throw |
| --- | --- |
| [System.Xml.XmlDictionaryReader.CreateMtomReader(System.Byte\[\],System.Int32,System.Int32,System.Text.Encoding\[\],System.String,System.Xml.XmlDictionaryReaderQuotas,System.Int32,System.Xml.OnXmlDictionaryReaderClose)](https://learn.microsoft.com/search/?terms=System.Xml.XmlDictionaryReader.CreateMtomReader(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.Text.Encoding%5B%5D%2CSystem.String%2CSystem.Xml.XmlDictionaryReaderQuotas%2CSystem.Int32%2CSystem.Xml.OnXmlDictionaryReaderClose)) | All |
| [System.Xml.XmlDictionaryReader.CreateMtomReader(System.IO.Stream,System.Text.Encoding\[\],System.String,System.Xml.XmlDictionaryReaderQuotas,System.Int32,System.Xml.OnXmlDictionaryReaderClose)](https://learn.microsoft.com/search/?terms=System.Xml.XmlDictionaryReader.CreateMtomReader(System.IO.Stream%2CSystem.Text.Encoding%5B%5D%2CSystem.String%2CSystem.Xml.XmlDictionaryReaderQuotas%2CSystem.Int32%2CSystem.Xml.OnXmlDictionaryReaderClose)) | All |
| [System.Xml.XmlDictionaryWriter.CreateMtomWriter(System.IO.Stream,System.Text.Encoding,System.Int32,System.String,System.String,System.String,System.Boolean,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Xml.XmlDictionaryWriter.CreateMtomWriter(System.IO.Stream%2CSystem.Text.Encoding%2CSystem.Int32%2CSystem.String%2CSystem.String%2CSystem.String%2CSystem.Boolean%2CSystem.Boolean)) | All |
| [System.Xml.Xsl.XsltSettings.EnableScript](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltSettings.EnableScript) (when set to `true`) | All |

## See also

- [Breaking changes for migration from .NET Framework to .NET Core](fx-core.md)
- [Binary serialization in .NET Core](https://learn.microsoft.com/previous-versions/dotnet/fundamentals/serialization/binary/binary-serialization#net-core)
- [.NET portability analyzer](../../standard/analyzers/portability-analyzer.md)
