---
title: SYSLIB0003 warning
description: Learn about the obsoletions that generate compile-time warning SYSLIB0003.
ms.date: 08/16/2021
f1_keywords:
  - syslib0003
---
# SYSLIB0003: Code access security is not supported

[Code access security (CAS)](../../framework/data/adonet/code-access-security.md) is an unsupported, legacy technology. The infrastructure to enable CAS, which exists only in .NET Framework 2.x - 4.x, is deprecated and not receiving servicing or security fixes.

As a result, most code access security (CAS)-related types in .NET are obsolete, starting in .NET 5. This includes CAS attributes, such as [System.Security.Permissions.SecurityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermissionAttribute), CAS permission objects, such as [System.Net.SocketPermission](https://learn.microsoft.com/search/?terms=System.Net.SocketPermission), [System.Security.Policy.EvidenceBase](https://learn.microsoft.com/search/?terms=System.Security.Policy.EvidenceBase)-derived types, and other supporting APIs. Using these APIs generates warning `SYSLIB0003` at compile time.

The complete list of obsolete CAS APIs is as follows:

- [System.AppDomain.ExecuteAssembly(System.String,System.String\[\],System.Byte\[\],System.Configuration.Assemblies.AssemblyHashAlgorithm)](https://learn.microsoft.com/search/?terms=System.AppDomain.ExecuteAssembly(System.String%2CSystem.String%5B%5D%2CSystem.Byte%5B%5D%2CSystem.Configuration.Assemblies.AssemblyHashAlgorithm))
- [System.AppDomain.PermissionSet](https://learn.microsoft.com/search/?terms=System.AppDomain.PermissionSet)
- [System.Configuration.ConfigurationPermission](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationPermission)
- [System.Configuration.ConfigurationPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationPermissionAttribute)
- [System.Data.Common.DBDataPermission](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermission)
- [System.Data.Common.DBDataPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Data.Common.DBDataPermissionAttribute)
- [System.Data.Odbc.OdbcPermission](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcPermission)
- [System.Data.Odbc.OdbcPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Data.Odbc.OdbcPermissionAttribute)
- [System.Data.OleDb.OleDbPermission](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbPermission)
- [System.Data.OleDb.OleDbPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Data.OleDb.OleDbPermissionAttribute)
- [System.Data.OracleClient.OraclePermission](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OraclePermission)
- [System.Data.OracleClient.OraclePermissionAttribute](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OraclePermissionAttribute)
- [System.Data.SqlClient.SqlClientPermission](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlClientPermission)
- [System.Data.SqlClient.SqlClientPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlClientPermissionAttribute)
- [System.Diagnostics.EventLogPermission](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLogPermission)
- [System.Diagnostics.EventLogPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLogPermissionAttribute)
- [System.Diagnostics.PerformanceCounterPermission](https://learn.microsoft.com/search/?terms=System.Diagnostics.PerformanceCounterPermission)
- [System.Diagnostics.PerformanceCounterPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Diagnostics.PerformanceCounterPermissionAttribute)
- [System.DirectoryServices.DirectoryServicesPermission](https://learn.microsoft.com/search/?terms=System.DirectoryServices.DirectoryServicesPermission)
- [System.DirectoryServices.DirectoryServicesPermissionAttribute](https://learn.microsoft.com/search/?terms=System.DirectoryServices.DirectoryServicesPermissionAttribute)
- [System.Drawing.Printing.PrintingPermission](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PrintingPermission)
- [System.Drawing.Printing.PrintingPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Drawing.Printing.PrintingPermissionAttribute)
- [System.Net.DnsPermission](https://learn.microsoft.com/search/?terms=System.Net.DnsPermission)
- [System.Net.DnsPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.DnsPermissionAttribute)
- [System.Net.Mail.SmtpPermission](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpPermission)
- [System.Net.Mail.SmtpPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpPermissionAttribute)
- [System.Net.NetworkInformation.NetworkInformationPermission](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkInformationPermission)
- [System.Net.NetworkInformation.NetworkInformationPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkInformationPermissionAttribute)
- [System.Net.PeerToPeer.Collaboration.PeerCollaborationPermission](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerCollaborationPermission)
- [System.Net.PeerToPeer.Collaboration.PeerCollaborationPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerCollaborationPermissionAttribute)
- [System.Net.PeerToPeer.PnrpPermission](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.PnrpPermission)
- [System.Net.PeerToPeer.PnrpPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.PnrpPermissionAttribute)
- [System.Net.SocketPermission](https://learn.microsoft.com/search/?terms=System.Net.SocketPermission)
- [System.Net.SocketPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.SocketPermissionAttribute)
- [System.Net.WebPermission](https://learn.microsoft.com/search/?terms=System.Net.WebPermission)
- [System.Net.WebPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Net.WebPermissionAttribute)
- [System.Runtime.InteropServices.AllowReversePInvokeCallsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.AllowReversePInvokeCallsAttribute)
- [System.Security.CodeAccessPermission](https://learn.microsoft.com/search/?terms=System.Security.CodeAccessPermission)
- [System.Security.HostProtectionException](https://learn.microsoft.com/search/?terms=System.Security.HostProtectionException)
- [System.Security.IPermission](https://learn.microsoft.com/search/?terms=System.Security.IPermission)
- [System.Security.IStackWalk](https://learn.microsoft.com/search/?terms=System.Security.IStackWalk)
- [System.Security.NamedPermissionSet](https://learn.microsoft.com/search/?terms=System.Security.NamedPermissionSet)
- [System.Security.PermissionSet](https://learn.microsoft.com/search/?terms=System.Security.PermissionSet)
- [System.Security.Permissions.CodeAccessSecurityAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.CodeAccessSecurityAttribute)
- [System.Security.Permissions.DataProtectionPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.DataProtectionPermission)
- [System.Security.Permissions.DataProtectionPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.DataProtectionPermissionAttribute)
- [System.Security.Permissions.DataProtectionPermissionFlags](https://learn.microsoft.com/search/?terms=System.Security.Permissions.DataProtectionPermissionFlags)
- [System.Security.Permissions.EnvironmentPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.EnvironmentPermission)
- [System.Security.Permissions.EnvironmentPermissionAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.EnvironmentPermissionAccess)
- [System.Security.Permissions.EnvironmentPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.EnvironmentPermissionAttribute)
- [System.Security.Permissions.FileDialogPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileDialogPermission)
- [System.Security.Permissions.FileDialogPermissionAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileDialogPermissionAccess)
- [System.Security.Permissions.FileDialogPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileDialogPermissionAttribute)
- [System.Security.Permissions.FileIOPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermission)
- [System.Security.Permissions.FileIOPermissionAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermissionAccess)
- [System.Security.Permissions.FileIOPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermissionAttribute)
- [System.Security.Permissions.GacIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.GacIdentityPermission)
- [System.Security.Permissions.GacIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.GacIdentityPermissionAttribute)
- [System.Security.Permissions.HostProtectionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionAttribute)
- [System.Security.Permissions.HostProtectionResource](https://learn.microsoft.com/search/?terms=System.Security.Permissions.HostProtectionResource)
- [System.Security.Permissions.IUnrestrictedPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IUnrestrictedPermission)
- [System.Security.Permissions.IsolatedStorageContainment](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStorageContainment)
- [System.Security.Permissions.IsolatedStorageFilePermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStorageFilePermission)
- [System.Security.Permissions.IsolatedStorageFilePermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStorageFilePermissionAttribute)
- [System.Security.Permissions.IsolatedStoragePermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStoragePermission)
- [System.Security.Permissions.IsolatedStoragePermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStoragePermissionAttribute)
- [System.Security.Permissions.KeyContainerPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermission)
- [System.Security.Permissions.KeyContainerPermissionAccessEntry](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermissionAccessEntry)
- [System.Security.Permissions.KeyContainerPermissionAccessEntryCollection](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermissionAccessEntryCollection)
- [System.Security.Permissions.KeyContainerPermissionAccessEntryEnumerator](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermissionAccessEntryEnumerator)
- [System.Security.Permissions.KeyContainerPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermissionAttribute)
- [System.Security.Permissions.KeyContainerPermissionFlags](https://learn.microsoft.com/search/?terms=System.Security.Permissions.KeyContainerPermissionFlags)
- [System.Security.Permissions.MediaPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.MediaPermission)
- [System.Security.Permissions.MediaPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.MediaPermissionAttribute)
- [System.Security.Permissions.MediaPermissionAudio](https://learn.microsoft.com/search/?terms=System.Security.Permissions.MediaPermissionAudio)
- [System.Security.Permissions.MediaPermissionImage](https://learn.microsoft.com/search/?terms=System.Security.Permissions.MediaPermissionImage)
- [System.Security.Permissions.MediaPermissionVideo](https://learn.microsoft.com/search/?terms=System.Security.Permissions.MediaPermissionVideo)
- [System.Security.Permissions.PermissionSetAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PermissionSetAttribute)
- [System.Security.Permissions.PermissionState](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PermissionState)
- [System.Security.Permissions.PrincipalPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermission)
- [System.Security.Permissions.PrincipalPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermissionAttribute)
- [System.Security.Permissions.PublisherIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PublisherIdentityPermission)
- [System.Security.Permissions.PublisherIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PublisherIdentityPermissionAttribute)
- [System.Security.Permissions.ReflectionPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermission)
- [System.Security.Permissions.ReflectionPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionAttribute)
- [System.Security.Permissions.ReflectionPermissionFlag](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag)
- [System.Security.Permissions.RegistryPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.RegistryPermission)
- [System.Security.Permissions.RegistryPermissionAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.RegistryPermissionAccess)
- [System.Security.Permissions.RegistryPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.RegistryPermissionAttribute)
- [System.Security.Permissions.ResourcePermissionBase](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ResourcePermissionBase)
- [System.Security.Permissions.ResourcePermissionBaseEntry](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ResourcePermissionBaseEntry)
- [System.Security.Permissions.SecurityAction](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityAction)
- [System.Security.Permissions.SecurityAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityAttribute)
- [System.Security.Permissions.SecurityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermission)
- [System.Security.Permissions.SecurityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermissionAttribute)
- [System.Security.Permissions.SecurityPermissionFlag](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermissionFlag)
- [System.Security.Permissions.SiteIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SiteIdentityPermission)
- [System.Security.Permissions.SiteIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SiteIdentityPermissionAttribute)
- [System.Security.Permissions.StorePermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StorePermission)
- [System.Security.Permissions.StorePermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StorePermissionAttribute)
- [System.Security.Permissions.StorePermissionFlags](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StorePermissionFlags)
- [System.Security.Permissions.StrongNameIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StrongNameIdentityPermission)
- [System.Security.Permissions.StrongNameIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StrongNameIdentityPermissionAttribute)
- [System.Security.Permissions.StrongNamePublicKeyBlob](https://learn.microsoft.com/search/?terms=System.Security.Permissions.StrongNamePublicKeyBlob)
- [System.Security.Permissions.TypeDescriptorPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.TypeDescriptorPermission)
- [System.Security.Permissions.TypeDescriptorPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.TypeDescriptorPermissionAttribute)
- [System.Security.Permissions.TypeDescriptorPermissionFlags](https://learn.microsoft.com/search/?terms=System.Security.Permissions.TypeDescriptorPermissionFlags)
- [System.Security.Permissions.UIPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UIPermission)
- [System.Security.Permissions.UIPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UIPermissionAttribute)
- [System.Security.Permissions.UIPermissionClipboard](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UIPermissionClipboard)
- [System.Security.Permissions.UIPermissionWindow](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UIPermissionWindow)
- [System.Security.Permissions.UrlIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UrlIdentityPermission)
- [System.Security.Permissions.UrlIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.UrlIdentityPermissionAttribute)
- [System.Security.Permissions.WebBrowserPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.WebBrowserPermission)
- [System.Security.Permissions.WebBrowserPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.WebBrowserPermissionAttribute)
- [System.Security.Permissions.WebBrowserPermissionLevel](https://learn.microsoft.com/search/?terms=System.Security.Permissions.WebBrowserPermissionLevel)
- [System.Security.Permissions.ZoneIdentityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ZoneIdentityPermission)
- [System.Security.Permissions.ZoneIdentityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ZoneIdentityPermissionAttribute)
- [System.Security.Policy.ApplicationTrust.ApplicationTrust(PermissionSet, IEnumerable\<StrongName>)](https://learn.microsoft.com/dotnet/api/system.security.policy.applicationtrust.-ctor#System_Security_Policy_ApplicationTrust__ctor_System_Security_PermissionSet_System_Collections_Generic_IEnumerable_System_Security_Policy_StrongName__)
- [System.Security.Policy.ApplicationTrust.FullTrustAssemblies](https://learn.microsoft.com/search/?terms=System.Security.Policy.ApplicationTrust.FullTrustAssemblies)
- [System.Security.Policy.FileCodeGroup](https://learn.microsoft.com/search/?terms=System.Security.Policy.FileCodeGroup)
- [System.Security.Policy.GacInstalled](https://learn.microsoft.com/search/?terms=System.Security.Policy.GacInstalled)
- [System.Security.Policy.IIdentityPermissionFactory](https://learn.microsoft.com/search/?terms=System.Security.Policy.IIdentityPermissionFactory)
- [System.Security.Policy.PolicyLevel.AddNamedPermissionSet(System.Security.NamedPermissionSet)](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyLevel.AddNamedPermissionSet(System.Security.NamedPermissionSet))
- [System.Security.Policy.PolicyLevel.ChangeNamedPermissionSet(System.String,System.Security.PermissionSet)](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyLevel.ChangeNamedPermissionSet(System.String%2CSystem.Security.PermissionSet))
- [System.Security.Policy.PolicyLevel.GetNamedPermissionSet(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyLevel.GetNamedPermissionSet(System.String))
- [System.Security.Policy.PolicyLevel.RemoveNamedPermissionSet*](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyLevel.RemoveNamedPermissionSet*)
- [System.Security.Policy.PolicyStatement.PermissionSet](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyStatement.PermissionSet)
- [System.Security.Policy.PolicyStatement.%23ctor*](https://learn.microsoft.com/search/?terms=System.Security.Policy.PolicyStatement.%2523ctor*)
- [System.Security.Policy.Publisher](https://learn.microsoft.com/search/?terms=System.Security.Policy.Publisher)
- [System.Security.Policy.Site](https://learn.microsoft.com/search/?terms=System.Security.Policy.Site)
- [System.Security.Policy.StrongName](https://learn.microsoft.com/search/?terms=System.Security.Policy.StrongName)
- [System.Security.Policy.StrongNameMembershipCondition](https://learn.microsoft.com/search/?terms=System.Security.Policy.StrongNameMembershipCondition)
- [System.Security.Policy.Url](https://learn.microsoft.com/search/?terms=System.Security.Policy.Url)
- [System.Security.Policy.Zone](https://learn.microsoft.com/search/?terms=System.Security.Policy.Zone)
- [System.Security.SecurityContext](https://learn.microsoft.com/search/?terms=System.Security.SecurityContext)
- [System.Security.SecurityManager](https://learn.microsoft.com/search/?terms=System.Security.SecurityManager)
- [System.ServiceProcess.ServiceControllerPermission](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceControllerPermission)
- [System.ServiceProcess.ServiceControllerPermissionAttribute](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceControllerPermissionAttribute)
- [System.Threading.Thread.GetCompressedStack](https://learn.microsoft.com/search/?terms=System.Threading.Thread.GetCompressedStack)
- [System.Threading.Thread.SetCompressedStack(System.Threading.CompressedStack)](https://learn.microsoft.com/search/?terms=System.Threading.Thread.SetCompressedStack(System.Threading.CompressedStack))
- [System.Transactions.DistributedTransactionPermission](https://learn.microsoft.com/search/?terms=System.Transactions.DistributedTransactionPermission)
- [System.Transactions.DistributedTransactionPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Transactions.DistributedTransactionPermissionAttribute)
- [System.Web.AspNetHostingPermission](https://learn.microsoft.com/search/?terms=System.Web.AspNetHostingPermission)
- [System.Web.AspNetHostingPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Web.AspNetHostingPermissionAttribute)
- [System.Xaml.Permissions.XamlLoadPermission](https://learn.microsoft.com/search/?terms=System.Xaml.Permissions.XamlLoadPermission)

## Workarounds

- If you're asserting any security permission, remove the attribute or call that asserts the permission.

  ```csharp
  // REMOVE the attribute below.
  [SecurityPermission(SecurityAction.Assert, ControlThread = true)]
  public void DoSomething()
  {
  }
  public void DoAssert()
  {
      // REMOVE the line below.
      new SecurityPermission(SecurityPermissionFlag.ControlThread).Assert();
  }
  ```

- If you're denying or restricting (via `PermitOnly`) any permission, contact your security advisor. Because CAS attributes are not honored by the .NET 5+ runtime, your application could have a security hole if it incorrectly relies on the CAS infrastructure to restrict access to these methods.

  ```csharp
  // REVIEW the attribute below; could indicate security vulnerability.
  [SecurityPermission(SecurityAction.Deny, ControlThread = true)]
  public void DoSomething()
  {
  }
  public void DoPermitOnly()
  {
      // REVIEW the line below; could indicate security vulnerability.
      new SecurityPermission(SecurityPermissionFlag.ControlThread).PermitOnly();
  }
  ```

- If you're demanding any permission (except [System.Security.Permissions.PrincipalPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermission)), remove the demand. All demands will succeed at runtime.

  ```csharp
  // REMOVE the attribute below; it will always succeed.
  [SecurityPermission(SecurityAction.Demand, ControlThread = true)]
  public void DoSomething()
  {
  }
  public void DoDemand()
  {
      // REMOVE the line below; it will always succeed.
      new SecurityPermission(SecurityPermissionFlag.ControlThread).Demand();
  }
  ```

- If you're demanding [System.Security.Permissions.PrincipalPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermission), consult the guidance for [SYSLIB0002: PrincipalPermissionAttribute is obsolete](syslib0002.md#workarounds). That guidance applies for both [System.Security.Permissions.PrincipalPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermission) and [System.Security.Permissions.PrincipalPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermissionAttribute).

## Suppress a warning

If you must use the obsolete APIs, you can suppress the warning in code or in your project file.

To suppress only a single violation, add preprocessor directives to your source file to disable and then re-enable the warning.

```csharp
// Disable the warning.
#pragma warning disable SYSLIB0003

// Code that uses obsolete API.
// ...

// Re-enable the warning.
#pragma warning restore SYSLIB0003
```

To suppress all the `SYSLIB0003` warnings in your project, add a `<NoWarn>` property to your project file.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
   ...
   <NoWarn>$(NoWarn);SYSLIB0003</NoWarn>
  </PropertyGroup>
</Project>
```

For more information, see [Suppress warnings](obsoletions-overview.md#suppress-warnings).

## See also

- [SYSLIB0002: PrincipalPermissionAttribute is obsolete](syslib0002.md)
