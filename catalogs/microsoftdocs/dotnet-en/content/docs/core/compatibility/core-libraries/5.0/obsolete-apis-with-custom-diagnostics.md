---
title: "Breaking change: .NET 5 API obsoletions with non-default diagnostic IDs"
titleSuffix: ""
description: Learn about the .NET 5 breaking change in core .NET libraries where some APIs have been marked as obsolete with a custom diagnostic ID.
ms.date: 11/01/2020
---
# API obsoletions with non-default diagnostic IDs

Some APIs have been marked as obsolete, starting in .NET 5. This breaking change is specific to APIs that have been marked as obsolete *with a custom diagnostic ID*. Suppressing the default obsoletion diagnostic ID, which is [CS0618](../../../../csharp/language-reference/compiler-messages/cs0618.md) for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Change description

In previous .NET versions, these APIs can be used without any build warning. In .NET 5 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the obsoletion warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages for obsoleted APIs.

| Diagnostic ID | Description | Severity |
| - | - |
| [SYSLIB0001](../../../../fundamentals/syslib-diagnostics/syslib0001.md) | The UTF-7 encoding is insecure and should not be used. Consider using UTF-8 instead. | Warning |
| [SYSLIB0002](../../../../fundamentals/syslib-diagnostics/syslib0002.md) | [System.Security.Permissions.PrincipalPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermissionAttribute) is not honored by the runtime and must not be used. | Error |
| [SYSLIB0003](../../../../fundamentals/syslib-diagnostics/syslib0003.md) | Code access security (CAS) is not supported or honored by the runtime. | Warning |
| [SYSLIB0004](../../../../fundamentals/syslib-diagnostics/syslib0004.md) | The constrained execution region (CER) feature is not supported. | Warning |
| [SYSLIB0005](../../../../fundamentals/syslib-diagnostics/syslib0005.md) | The global assembly cache (GAC) is not supported. | Warning |
| [SYSLIB0006](../../../../fundamentals/syslib-diagnostics/syslib0006.md) | [System.Threading.Thread.Abort](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort) is not supported and throws [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). | Warning |
| [SYSLIB0007](../../../../fundamentals/syslib-diagnostics/syslib0007.md) | The default implementation of this cryptography algorithm is not supported. | Warning |
| [SYSLIB0008](../../../../fundamentals/syslib-diagnostics/syslib0008.md) | The [System.Runtime.CompilerServices.DebugInfoGenerator.CreatePdbGenerator](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.DebugInfoGenerator.CreatePdbGenerator) API is not supported and throws [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). | Warning |
| [SYSLIB0009](../../../../fundamentals/syslib-diagnostics/syslib0009.md) | The [System.Net.AuthenticationManager.Authenticate*](https://learn.microsoft.com/search/?terms=System.Net.AuthenticationManager.Authenticate*) and [System.Net.AuthenticationManager.PreAuthenticate*](https://learn.microsoft.com/search/?terms=System.Net.AuthenticationManager.PreAuthenticate*) methods are not supported and throw [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). | Warning |
| [SYSLIB0010](../../../../fundamentals/syslib-diagnostics/syslib0010.md) | Some remoting APIs are not supported and throw [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException). | Warning |
| [SYSLIB0011](../../../../fundamentals/syslib-diagnostics/syslib0011.md) | [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) serialization is obsolete and should not be used. | Warning |
| [SYSLIB0012](../../../../fundamentals/syslib-diagnostics/syslib0012.md) | [System.Reflection.Assembly.CodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.CodeBase) and [System.Reflection.Assembly.EscapedCodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.EscapedCodeBase) are only included for .NET Framework compatibility. Use [System.Reflection.Assembly.Location](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Location) instead. | Warning |

## Version introduced

.NET 5.0

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.

- Warnings or errors for these obsoletions can't be suppressed using the standard diagnostic ID for obsolete types or members; use the custom `SYSLIBxxxx` diagnostic ID value instead.

## Affected APIs

### SYSLIB0001

- [System.Text.Encoding.UTF7](https://learn.microsoft.com/search/?terms=System.Text.Encoding.UTF7)
- [System.Text.UTF7Encoding.%23ctor*](https://learn.microsoft.com/search/?terms=System.Text.UTF7Encoding.%2523ctor*)

### SYSLIB0002

- [System.Security.Permissions.PrincipalPermissionAttribute.%23ctor(System.Security.Permissions.SecurityAction)](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermissionAttribute.%2523ctor(System.Security.Permissions.SecurityAction))

### SYSLIB0003

Classes in the `System.Security.Permissions` namespace:

- [System.Security.Permissions.CodeAccessSecurityAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.CodeAccessSecurityAttribute)
- [System.Security.Permissions.DataProtectionPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.DataProtectionPermission)
- [System.Security.Permissions.DataProtectionPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.DataProtectionPermissionAttribute)
- [System.Security.Permissions.EnvironmentPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.EnvironmentPermission)
- [System.Security.Permissions.EnvironmentPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.EnvironmentPermissionAttribute)
- [System.Security.Permissions.FileDialogPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileDialogPermission)
- [System.Security.Permissions.FileDialogPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileDialogPermissionAttribute)
- [System.Security.Permissions.FileIOPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermission)
- [System.Security.Permissions.FileIOPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermissionAttribute)
- [System.Security.Permissions.GacIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.GacIdentityPermission)
- [System.Security.Permissions.GacIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.GacIdentityPermissionAttribute)
- [System.Security.Permissions.HostProtectionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionAttribute)
- [System.Security.Permissions.IsolatedStorageFilePermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStorageFilePermission)
- [System.Security.Permissions.IsolatedStorageFilePermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStorageFilePermissionAttribute)
- [System.Security.Permissions.IsolatedStoragePermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStoragePermission)
- [System.Security.Permissions.IsolatedStoragePermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStoragePermissionAttribute)
- [System.Security.Permissions.KeyContainerPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermission)
- [System.Security.Permissions.KeyContainerPermissionAccessEntry](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermissionAccessEntry)
- [System.Security.Permissions.KeyContainerPermissionAccessEntryCollection](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermissionAccessEntryCollection)
- [System.Security.Permissions.KeyContainerPermissionAccessEntryEnumerator](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermissionAccessEntryEnumerator)
- [System.Security.Permissions.KeyContainerPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermissionAttribute)
- [System.Security.Permissions.MediaPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.MediaPermission)
- [System.Security.Permissions.MediaPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.MediaPermissionAttribute)
- [System.Security.Permissions.PermissionSetAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PermissionSetAttribute)
- [System.Security.Permissions.PrincipalPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermission)
- [System.Security.Permissions.PrincipalPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermissionAttribute)
- [System.Security.Permissions.PublisherIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PublisherIdentityPermission)
- [System.Security.Permissions.PublisherIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PublisherIdentityPermissionAttribute)
- [System.Security.Permissions.ReflectionPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermission)
- [System.Security.Permissions.ReflectionPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionAttribute)
- [System.Security.Permissions.RegistryPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.RegistryPermission)
- [System.Security.Permissions.RegistryPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.RegistryPermissionAttribute)
- [System.Security.Permissions.ResourcePermissionBase](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ResourcePermissionBase)
- [System.Security.Permissions.ResourcePermissionBaseEntry](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ResourcePermissionBaseEntry)
- [System.Security.Permissions.SecurityAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityAttribute)
- [System.Security.Permissions.SecurityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermission)
- [System.Security.Permissions.SecurityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermissionAttribute)
- [System.Security.Permissions.SiteIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SiteIdentityPermission)
- [System.Security.Permissions.SiteIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SiteIdentityPermissionAttribute)
- [System.Security.Permissions.StorePermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StorePermission)
- [System.Security.Permissions.StorePermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StorePermissionAttribute)
- [System.Security.Permissions.StrongNameIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StrongNameIdentityPermission)
- [System.Security.Permissions.StrongNameIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StrongNameIdentityPermissionAttribute)
- [System.Security.Permissions.StrongNamePublicKeyBlob](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StrongNamePublicKeyBlob)
- [System.Security.Permissions.TypeDescriptorPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.TypeDescriptorPermission)
- [System.Security.Permissions.TypeDescriptorPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.TypeDescriptorPermissionAttribute)
- [System.Security.Permissions.UIPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UIPermission)
- [System.Security.Permissions.UIPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UIPermissionAttribute)
- [System.Security.Permissions.UrlIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UrlIdentityPermission)
- [System.Security.Permissions.UrlIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UrlIdentityPermissionAttribute)
- [System.Security.Permissions.WebBrowserPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.WebBrowserPermission)
- [System.Security.Permissions.WebBrowserPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.WebBrowserPermissionAttribute)
- [System.Security.Permissions.ZoneIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ZoneIdentityPermission)
- [System.Security.Permissions.ZoneIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ZoneIdentityPermissionAttribute)

Classes that derive from `CodeAccessSecurityAttribute`:

- [System.Configuration.ConfigurationPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationPermissionAttribute)
- [System.Data.Common.DBDataPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermissionAttribute)
- [System.Data.Odbc.OdbcPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcPermissionAttribute)
- [System.Data.OleDb.OleDbPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbPermissionAttribute)
- [System.Data.OracleClient.OraclePermissionAttribute](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OraclePermissionAttribute)
- [System.Data.SqlClient.SqlClientPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlClientPermissionAttribute)
- [System.Diagnostics.EventLogPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLogPermissionAttribute)
- [System.Diagnostics.PerformanceCounterPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Diagnostics.PerformanceCounterPermissionAttribute)
- [System.DirectoryServices.DirectoryServicesPermissionAttribute](https://learn.microsoft.com/search/?terms=System.DirectoryServices.DirectoryServicesPermissionAttribute)
- [System.Drawing.Printing.PrintingPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PrintingPermissionAttribute)
- [System.Net.DnsPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.DnsPermissionAttribute)
- [System.Net.SocketPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.SocketPermissionAttribute)
- [System.Net.WebPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.WebPermissionAttribute)
- [System.Net.Mail.SmtpPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpPermissionAttribute)
- [System.Net.NetworkInformation.NetworkInformationPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkInformationPermissionAttribute)
- [System.Net.PeerToPeer.PnrpPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.PnrpPermissionAttribute)
- [System.Net.PeerToPeer.Collaboration.PeerCollaborationPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerCollaborationPermissionAttribute)
- [System.ServiceProcess.ServiceControllerPermissionAttribute](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceControllerPermissionAttribute)
- [System.Transactions.DistributedTransactionPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Transactions.DistributedTransactionPermissionAttribute)
- [System.Web.AspNetHostingPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Web.AspNetHostingPermissionAttribute)

Interfaces:

- [System.Security.Permissions.IUnrestrictedPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IUnrestrictedPermission)
- [System.Security.IPermission](https://learn.microsoft.com/search/?terms=System.Security.IPermission)
- [System.Security.IStackWalk](https://learn.microsoft.com/search/?terms=System.Security.IStackWalk)
- [System.Security.Policy.IIdentityPermissionFactory](https://learn.microsoft.com/search/?terms=System.Security.Policy.IIdentityPermissionFactory)

Classes that implement `IStackWalk`:

- [System.Security.NamedPermissionSet](https://learn.microsoft.com/search/?terms=System.Security.NamedPermissionSet)
- [System.Security.PermissionSet](https://learn.microsoft.com/search/?terms=System.Security.PermissionSet)

Classes that implement `IPermission`:

- [System.Security.CodeAccessPermission](https://learn.microsoft.com/search/?terms=System.Security.CodeAccessPermission)

Classes that derive from `CodeAccessPermission`:

- [System.Configuration.ConfigurationPermission](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationPermission)
- [System.Data.Common.DBDataPermission](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission)
- [System.Data.Odbc.OdbcPermission](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcPermission)
- [System.Data.OleDb.OleDbPermission](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbPermission)
- [System.Data.SqlClient.SqlClientPermission](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlClientPermission)
- [System.Data.OracleClient.OraclePermission](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OraclePermission)
- [System.Drawing.Printing.PrintingPermission](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PrintingPermission)
- [System.Net.DnsPermission](https://learn.microsoft.com/search/?terms=System.Net.DnsPermission)
- [System.Net.SocketPermission](https://learn.microsoft.com/search/?terms=System.Net.SocketPermission)
- [System.Net.WebPermission](https://learn.microsoft.com/search/?terms=System.Net.WebPermission)
- [System.Net.Mail.SmtpPermission](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpPermission)
- [System.Net.NetworkInformation.NetworkInformationPermission](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkInformationPermission)
- [System.Net.PeerToPeer.PnrpPermission](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.PnrpPermission)
- [System.Net.PeerToPeer.Collaboration.PeerCollaborationPermission](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerCollaborationPermission)
- [System.Transactions.DistributedTransactionPermission](https://learn.microsoft.com/search/?terms=System.Transactions.DistributedTransactionPermission)
- [System.Web.AspNetHostingPermission](https://learn.microsoft.com/search/?terms=System.Web.AspNetHostingPermission)
- [System.Xaml.Permissions.XamlLoadPermission](https://learn.microsoft.com/search/?terms=System.Xaml.Permissions.XamlLoadPermission)

Classes that derive from `ResourcePermissionBase`:

- [System.Diagnostics.EventLogPermission](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLogPermission)
- [System.Diagnostics.PerformanceCounterPermission](https://learn.microsoft.com/search/?terms=System.Diagnostics.PerformanceCounterPermission)
- [System.DirectoryServices.DirectoryServicesPermission](https://learn.microsoft.com/search/?terms=System.DirectoryServices.DirectoryServicesPermission)
- [System.ServiceProcess.ServiceControllerPermission](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceControllerPermission)

Enums in the `System.Security.Permissions` namespace:

- [System.Security.Permissions.DataProtectionPermissionFlags](https://learn.microsoft.com/search/?terms=System.Security.Permissions.DataProtectionPermissionFlags)
- [System.Security.Permissions.EnvironmentPermissionAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.EnvironmentPermissionAccess)
- [System.Security.Permissions.FileDialogPermissionAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileDialogPermissionAccess)
- [System.Security.Permissions.FileIOPermissionAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermissionAccess)
- [System.Security.Permissions.HostProtectionResource](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionResource)
- [System.Security.Permissions.IsolatedStorageContainment](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStorageContainment)
- [System.Security.Permissions.KeyContainerPermissionFlags](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermissionFlags)
- [System.Security.Permissions.MediaPermissionAudio](https://learn.microsoft.com/search/?terms=System.Security.Permissions.MediaPermissionAudio)
- [System.Security.Permissions.MediaPermissionImage](https://learn.microsoft.com/search/?terms=System.Security.Permissions.MediaPermissionImage)
- [System.Security.Permissions.MediaPermissionVideo](https://learn.microsoft.com/search/?terms=System.Security.Permissions.MediaPermissionVideo)
- [System.Security.Permissions.PermissionState](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PermissionState)
- [System.Security.Permissions.ReflectionPermissionFlag](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag)
- [System.Security.Permissions.RegistryPermissionAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.RegistryPermissionAccess)
- [System.Security.Permissions.SecurityAction](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityAction)
- [System.Security.Permissions.SecurityPermissionFlag](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermissionFlag)
- [System.Security.Permissions.StorePermissionFlags](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StorePermissionFlags)
- [System.Security.Permissions.TypeDescriptorPermissionFlags](https://learn.microsoft.com/search/?terms=System.Security.Permissions.TypeDescriptorPermissionFlags)
- [System.Security.Permissions.UIPermissionClipboard](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UIPermissionClipboard)
- [System.Security.Permissions.UIPermissionWindow](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UIPermissionWindow)
- [System.Security.Permissions.WebBrowserPermissionLevel](https://learn.microsoft.com/search/?terms=System.Security.Permissions.WebBrowserPermissionLevel)

Classes and members that depend on code access security types:

- [System.AppDomain.ExecuteAssembly(System.String,System.String\[\],System.Byte\[\],System.Configuration.Assemblies.AssemblyHashAlgorithm)](https://learn.microsoft.com/search/?terms=System.AppDomain.ExecuteAssembly(System.String%2CSystem.String%5B%5D%2CSystem.Byte%5B%5D%2CSystem.Configuration.Assemblies.AssemblyHashAlgorithm))
- [System.AppDomain.PermissionSet](https://learn.microsoft.com/search/?terms=System.AppDomain.PermissionSet)
- [System.Runtime.InteropServices.AllowReversePInvokeCallsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.AllowReversePInvokeCallsAttribute)
- [System.Security.HostProtectionException](https://learn.microsoft.com/search/?terms=System.Security.HostProtectionException)
- [System.Security.Policy.FileCodeGroup](https://learn.microsoft.com/search/?terms=System.Security.Policy.FileCodeGroup)
- [System.Security.Policy.StrongName](https://learn.microsoft.com/search/?terms=System.Security.Policy.StrongName)
- [System.Security.Policy.StrongNameMembershipCondition](https://learn.microsoft.com/search/?terms=System.Security.Policy.StrongNameMembershipCondition)
- [System.Security.Policy.ApplicationTrust.ApplicationTrust(PermissionSet, IEnumerable\<StrongName>)](https://learn.microsoft.com/dotnet/api/system.security.policy.applicationtrust.-ctor#System_Security_Policy_ApplicationTrust__ctor_System_Security_PermissionSet_System_Collections_Generic_IEnumerable_System_Security_Policy_StrongName__)
- [System.Security.Policy.ApplicationTrust.FullTrustAssemblies](https://learn.microsoft.com/search/?terms=System.Security.Policy.ApplicationTrust.FullTrustAssemblies)
- [System.Security.Policy.GacInstalled](https://learn.microsoft.com/search/?terms=System.Security.Policy.GacInstalled)
- [System.Security.Policy.PolicyStatement.%23ctor*](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyStatement.%2523ctor*)
- [System.Security.Policy.PolicyLevel.AddNamedPermissionSet(System.Security.NamedPermissionSet)](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyLevel.AddNamedPermissionSet(System.Security.NamedPermissionSet))
- [System.Security.Policy.PolicyLevel.ChangeNamedPermissionSet(System.String,System.Security.PermissionSet)](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyLevel.ChangeNamedPermissionSet(System.String%2CSystem.Security.PermissionSet))
- [System.Security.Policy.PolicyLevel.GetNamedPermissionSet(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyLevel.GetNamedPermissionSet(System.String))
- [System.Security.Policy.PolicyLevel.RemoveNamedPermissionSet(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyLevel.RemoveNamedPermissionSet(System.String))
- [System.Security.Policy.PolicyLevel.RemoveNamedPermissionSet(System.Security.NamedPermissionSet)](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyLevel.RemoveNamedPermissionSet(System.Security.NamedPermissionSet))
- [System.Security.Policy.PolicyStatement.PermissionSet](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyStatement.PermissionSet)
- [System.Security.Policy.Publisher](https://learn.microsoft.com/search/?terms=System.Security.Policy.Publisher)
- [System.Security.Policy.Site](https://learn.microsoft.com/search/?terms=System.Security.Policy.Site)
- [System.Security.Policy.Url](https://learn.microsoft.com/search/?terms=System.Security.Policy.Url)
- [System.Security.Policy.Zone](https://learn.microsoft.com/search/?terms=System.Security.Policy.Zone)
- [System.Security.SecurityManager](https://learn.microsoft.com/search/?terms=System.Security.SecurityManager)

### SYSLIB0004

- [System.Runtime.CompilerServices.RuntimeHelpers.ExecuteCodeWithGuaranteedCleanup(System.Runtime.CompilerServices.RuntimeHelpers.TryCode,System.Runtime.CompilerServices.RuntimeHelpers.CleanupCode,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RuntimeHelpers.ExecuteCodeWithGuaranteedCleanup(System.Runtime.CompilerServices.RuntimeHelpers.TryCode%2CSystem.Runtime.CompilerServices.RuntimeHelpers.CleanupCode%2CSystem.Object))
- [System.Runtime.CompilerServices.RuntimeHelpers.PrepareConstrainedRegions](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RuntimeHelpers.PrepareConstrainedRegions)
- [System.Runtime.CompilerServices.RuntimeHelpers.PrepareConstrainedRegionsNoOP](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RuntimeHelpers.PrepareConstrainedRegionsNoOP)
- [System.Runtime.CompilerServices.RuntimeHelpers.PrepareContractedDelegate(System.Delegate)](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RuntimeHelpers.PrepareContractedDelegate(System.Delegate))
- [System.Runtime.CompilerServices.RuntimeHelpers.ProbeForSufficientStack](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.RuntimeHelpers.ProbeForSufficientStack)
- [System.Runtime.ConstrainedExecution.Cer](https://learn.microsoft.com/search/?terms=System.Runtime.ConstrainedExecution.Cer)
- [System.Runtime.ConstrainedExecution.Consistency](https://learn.microsoft.com/search/?terms=System.Runtime.ConstrainedExecution.Consistency)
- [System.Runtime.ConstrainedExecution.PrePrepareMethodAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.ConstrainedExecution.PrePrepareMethodAttribute)
- [System.Runtime.ConstrainedExecution.ReliabilityContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.ConstrainedExecution.ReliabilityContractAttribute)

### SYSLIB0005

- [System.Reflection.Assembly.GlobalAssemblyCache](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GlobalAssemblyCache)

### SYSLIB0006

- [System.Threading.Thread.Abort](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort)
- [System.Threading.Thread.Abort(System.Object)](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort(System.Object))

### SYSLIB0007

- [System.Security.Cryptography.AsymmetricAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AsymmetricAlgorithm.Create)
- [System.Security.Cryptography.HashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm.Create)
- [System.Security.Cryptography.HMAC.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMAC.Create)
- [System.Security.Cryptography.KeyedHashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.KeyedHashAlgorithm.Create)
- [System.Security.Cryptography.SymmetricAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SymmetricAlgorithm.Create)

### SYSLIB0008

- [System.Runtime.CompilerServices.DebugInfoGenerator.CreatePdbGenerator](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.DebugInfoGenerator.CreatePdbGenerator)

### SYSLIB0009

- [System.Net.AuthenticationManager.Authenticate*](https://learn.microsoft.com/search/?terms=System.Net.AuthenticationManager.Authenticate*)
- [System.Net.AuthenticationManager.PreAuthenticate*](https://learn.microsoft.com/search/?terms=System.Net.AuthenticationManager.PreAuthenticate*)

### SYSLIB0010

- [System.MarshalByRefObject.GetLifetimeService](https://learn.microsoft.com/search/?terms=System.MarshalByRefObject.GetLifetimeService)
- [System.MarshalByRefObject.InitializeLifetimeService](https://learn.microsoft.com/search/?terms=System.MarshalByRefObject.InitializeLifetimeService)

### SYSLIB0011

- [System.Exception.SerializeObjectState](https://learn.microsoft.com/search/?terms=System.Exception.SerializeObjectState)
- [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*)
- [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*)
- [System.Runtime.Serialization.Formatter.Serialize(System.IO.Stream,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatter.Serialize(System.IO.Stream%2CSystem.Object))
- [System.Runtime.Serialization.Formatter.Deserialize(System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatter.Deserialize(System.IO.Stream))
- [System.Runtime.Serialization.IFormatter.Serialize(System.IO.Stream,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IFormatter.Serialize(System.IO.Stream%2CSystem.Object))
- [System.Runtime.Serialization.IFormatter.Deserialize(System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IFormatter.Deserialize(System.IO.Stream))

### SYSLIB0012

- [System.Reflection.Assembly.CodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.CodeBase)
- [System.Reflection.Assembly.EscapedCodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.EscapedCodeBase)

## See also

- [API obsoletions with non-default diagnostic IDs (.NET 6)](../6.0/obsolete-apis-with-custom-diagnostics.md)
- [API obsoletions with non-default diagnostic IDs (.NET 7)](../7.0/obsolete-apis-with-custom-diagnostics.md)
- [Obsolete features in .NET 5+](../../../../fundamentals/syslib-diagnostics/obsoletions-overview.md)
