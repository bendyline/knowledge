---
title: "Breaking change: Most code access security APIs are obsolete"
description: Learn about the .NET 5 breaking change in core .NET libraries where most code access security (CAS)-related types in .NET are now obsolete as warning.
ms.date: 11/01/2020
---
# Most code access security APIs are obsolete

Most code access security (CAS)-related types in .NET are now obsolete as warning. This includes CAS attributes, such as [System.Security.Permissions.SecurityPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermissionAttribute), CAS permission objects, such as [System.Net.SocketPermission](https://learn.microsoft.com/search/?terms=System.Net.SocketPermission), [System.Security.Policy.EvidenceBase](https://learn.microsoft.com/search/?terms=System.Security.Policy.EvidenceBase)-derived types, and other supporting APIs.

## Change description

In .NET Framework 2.x - 4.x, CAS attributes and APIs can influence the course of code execution, including ensuring that CAS-demand stack walks succeed or fail.

```csharp
// In .NET Framework, the attribute causes CAS stack walks
// to terminate successfully when this permission is demanded.
[SocketPermission(SecurityAction.Assert, Host = "contoso.com", Port = "443")]
public void DoSomething()
{
    // open a socket to contoso.com:443
}
```

In .NET Core 2.x - 3.x, the runtime does not honor CAS attributes or CAS APIs. The runtime ignores attributes on method entry, and most programmatic APIs have no effect.

```csharp
// The .NET Core runtime ignores the following attribute.
[SocketPermission(SecurityAction.Assert, Host = "contoso.com", Port = "443")]
public void DoSomething()
{
    // open a socket to contoso.com:443
}
```

Additionally, programmatic calls to expansive APIs (`Assert`) always succeed, while programmatic calls to restrictive APIs (`Deny`, `PermitOnly`) always throw an exception at runtime. ([System.Security.Permissions.PrincipalPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermission) is an exception to this rule. See the [Recommended action](#cas-action) section below.)

```csharp
public void DoAssert()
{
    // The line below has no effect at runtime.
    new SocketPermission(PermissionState.Unrestricted).Assert();
}

public void DoDeny()
{
    // The line below throws PlatformNotSupportedException at runtime.
    new SocketPermission(PermissionState.Unrestricted).Deny();
}
```

In .NET 5 and later versions, most CAS-related APIs are obsolete and produce compile-time warning `SYSLIB0003`.

```csharp
[SocketPermission(SecurityAction.Assert, Host = "contoso.com", Port = "443")] // warning SYSLIB0003
public void DoSomething()
{
    new SocketPermission(PermissionState.Unrestricted).Assert(); // warning SYSLIB0003
    new SocketPermission(PermissionState.Unrestricted).Deny(); // warning SYSLIB0003
}
```

This is a compile-time only change. There is no runtime change from previous versions of .NET Core. Methods that perform no operation in .NET Core 2.x - 3.x will continue to perform no operation at runtime in .NET 5 and later. Methods that throw [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) in .NET Core 2.x - 3.x will continue to throw a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) at runtime in .NET 5 and later.

## Reason for change

[Code access security (CAS)](https://learn.microsoft.com/previous-versions/dotnet/framework/code-access-security/code-access-security) is an unsupported legacy technology. The infrastructure to enable CAS exists only in .NET Framework 2.x - 4.x, but is deprecated and not receiving servicing or security fixes.

Due to CAS's deprecation, the [supporting infrastructure was not brought forward to .NET Core](../../../porting/net-framework-tech-unavailable.md) or .NET 5+. However, the APIs were brought forward so that apps could cross-compile against .NET Framework and .NET Core. This led to "fail open" scenarios, where some CAS-related APIs exist and are callable but perform no action at runtime. This can lead to security issues for components that expect the runtime to honor CAS-related attributes or programmatic API calls. To better communicate that the runtime doesn't respect these attributes or APIs, we have obsoleted the majority of them in .NET 5.0.

## Version introduced

5.0

## <a id="cas-action">Recommended action</a>

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

- If you're demanding [System.Security.Permissions.PrincipalPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermission), consult the guidance for [PrincipalPermissionAttribute is obsolete as error](principalpermissionattribute-obsolete.md). That guidance applies for both [System.Security.Permissions.PrincipalPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermission) and [System.Security.Permissions.PrincipalPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermissionAttribute).

- If you absolutely must disable these warnings (which is not recommended), you can suppress the `SYSLIB0003` warning in code.

  ```csharp
  #pragma warning disable SYSLIB0003 // disable the warning
  [SecurityPermission(SecurityAction.Demand, ControlThread = true)]
  #pragma warning restore SYSLIB0003 // re-enable the warning
  public void DoSomething()
  {
  }

  public void DoDemand()
  {
  #pragma warning disable SYSLIB0003 // disable the warning
      new SecurityPermission(SecurityPermissionFlag.ControlThread).Demand();
  #pragma warning restore SYSLIB0003 // re-enable the warning
  }
  ```

  You can also suppress the warning in your project file. Doing so disables the warning for all source files within the project.

  ```xml
  <Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
      <TargetFramework>net5.0</TargetFramework>
      <!-- NoWarn below suppresses SYSLIB0003 project-wide -->
      <NoWarn>$(NoWarn);SYSLIB0003</NoWarn>
    </PropertyGroup>
  </Project>
  ```

  > **Note:**
  > Suppressing `SYSLIB0003` disables only the CAS-related obsoletion warnings. It does not disable any other warnings or change the behavior of the .NET 5+ runtime.
- Security

## Affected APIs

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
- [System.Security.SecurityManager](https://learn.microsoft.com/search/?terms=System.Security.SecurityManager)
- [System.ServiceProcess.ServiceControllerPermission](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceControllerPermission)
- [System.ServiceProcess.ServiceControllerPermissionAttribute](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceControllerPermissionAttribute)
- [System.Transactions.DistributedTransactionPermission](https://learn.microsoft.com/search/?terms=System.Transactions.DistributedTransactionPermission)
- [System.Transactions.DistributedTransactionPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Transactions.DistributedTransactionPermissionAttribute)
- [System.Web.AspNetHostingPermission](https://learn.microsoft.com/search/?terms=System.Web.AspNetHostingPermission)
- [System.Web.AspNetHostingPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Web.AspNetHostingPermissionAttribute)
- [System.Xaml.Permissions.XamlLoadPermission](https://learn.microsoft.com/search/?terms=System.Xaml.Permissions.XamlLoadPermission)

<!--

#### Category

- Core .NET libraries
- Security

### Affected APIs

- `P:System.AppDomain.PermissionSet`
- `T:System.Configuration.ConfigurationPermission`
- `T:System.Configuration.ConfigurationPermissionAttribute`
- `T:System.Data.Common.DBDataPermission`
- `T:System.Data.Common.DBDataPermissionAttribute`
- `T:System.Data.Odbc.OdbcPermission`
- `T:System.Data.Odbc.OdbcPermissionAttribute`
- `T:System.Data.OleDb.OleDbPermission`
- `T:System.Data.OleDb.OleDbPermissionAttribute`
- `T:System.Data.OracleClient.OraclePermission`
- `T:System.Data.OracleClient.OraclePermissionAttribute`
- `T:System.Data.SqlClient.SqlClientPermission`
- `T:System.Data.SqlClient.SqlClientPermissionAttribute`
- `T:System.Diagnostics.EventLogPermission`
- `T:System.Diagnostics.EventLogPermissionAttribute`
- `T:System.Diagnostics.PerformanceCounterPermission`
- `T:System.Diagnostics.PerformanceCounterPermissionAttribute`
- `T:System.DirectoryServices.DirectoryServicesPermission`
- `T:System.DirectoryServices.DirectoryServicesPermissionAttribute`
- `T:System.Drawing.Printing.PrintingPermission`
- `T:System.Drawing.Printing.PrintingPermissionAttribute`
- `T:System.Net.DnsPermission`
- `T:System.Net.DnsPermissionAttribute`
- `T:System.Net.Mail.SmtpPermission`
- `T:System.Net.Mail.SmtpPermissionAttribute`
- `T:System.Net.NetworkInformation.NetworkInformationPermission`
- `T:System.Net.NetworkInformation.NetworkInformationPermissionAttribute`
- `T:System.Net.PeerToPeer.Collaboration.PeerCollaborationPermission`
- `T:System.Net.PeerToPeer.Collaboration.PeerCollaborationPermissionAttribute`
- `T:System.Net.PeerToPeer.PnrpPermission`
- `T:System.Net.PeerToPeer.PnrpPermissionAttribute`
- `T:System.Net.SocketPermission`
- `T:System.Net.SocketPermissionAttribute`
- `T:System.Net.WebPermission`
- `T:System.Net.WebPermissionAttribute`
- `T:System.Runtime.InteropServices.AllowReversePInvokeCallsAttribute`
- `T:System.Security.CodeAccessPermission`
- `T:System.Security.HostProtectionException`
- `T:System.Security.IPermission`
- `T:System.Security.IStackWalk`
- `T:System.Security.NamedPermissionSet`
- `T:System.Security.PermissionSet`
- `T:System.Security.Permissions.CodeAccessSecurityAttribute`
- `T:System.Security.Permissions.DataProtectionPermission`
- `T:System.Security.Permissions.DataProtectionPermissionAttribute`
- `T:System.Security.Permissions.DataProtectionPermissionFlags`
- `T:System.Security.Permissions.EnvironmentPermission`
- `T:System.Security.Permissions.EnvironmentPermissionAccess`
- `T:System.Security.Permissions.EnvironmentPermissionAttribute`
- `T:System.Security.Permissions.FileDialogPermission`
- `T:System.Security.Permissions.FileDialogPermissionAccess`
- `T:System.Security.Permissions.FileDialogPermissionAttribute`
- `T:System.Security.Permissions.FileIOPermission`
- `T:System.Security.Permissions.FileIOPermissionAccess`
- `T:System.Security.Permissions.FileIOPermissionAttribute`
- `T:System.Security.Permissions.GacIdentityPermission`
- `T:System.Security.Permissions.GacIdentityPermissionAttribute`
- `T:System.Security.Permissions.HostProtectionAttribute`
- `T:System.Security.Permissions.HostProtectionResource`
- `T:System.Security.Permissions.IUnrestrictedPermission`
- `T:System.Security.Permissions.IsolatedStorageContainment`
- `T:System.Security.Permissions.IsolatedStorageFilePermission`
- `T:System.Security.Permissions.IsolatedStorageFilePermissionAttribute`
- `T:System.Security.Permissions.IsolatedStoragePermission`
- `T:System.Security.Permissions.IsolatedStoragePermissionAttribute`
- `T:System.Security.Permissions.KeyContainerPermission`
- `T:System.Security.Permissions.KeyContainerPermissionAccessEntry`
- `T:System.Security.Permissions.KeyContainerPermissionAccessEntryCollection`
- `T:System.Security.Permissions.KeyContainerPermissionAccessEntryEnumerator`
- `T:System.Security.Permissions.KeyContainerPermissionAttribute`
- `T:System.Security.Permissions.KeyContainerPermissionFlags`
- `T:System.Security.Permissions.MediaPermission`
- `T:System.Security.Permissions.MediaPermissionAttribute`
- `T:System.Security.Permissions.MediaPermissionAudio`
- `T:System.Security.Permissions.MediaPermissionImage`
- `T:System.Security.Permissions.MediaPermissionVideo`
- `T:System.Security.Permissions.PermissionSetAttribute`
- `T:System.Security.Permissions.PermissionState`
- `T:System.Security.Permissions.PrincipalPermission`
- `T:System.Security.Permissions.PrincipalPermissionAttribute`
- `T:System.Security.Permissions.PublisherIdentityPermission`
- `T:System.Security.Permissions.PublisherIdentityPermissionAttribute`
- `T:System.Security.Permissions.ReflectionPermission`
- `T:System.Security.Permissions.ReflectionPermissionAttribute`
- `T:System.Security.Permissions.ReflectionPermissionFlag`
- `T:System.Security.Permissions.RegistryPermission`
- `T:System.Security.Permissions.RegistryPermissionAccess`
- `T:System.Security.Permissions.RegistryPermissionAttribute`
- `T:System.Security.Permissions.ResourcePermissionBase`
- `T:System.Security.Permissions.ResourcePermissionBaseEntry`
- `T:System.Security.Permissions.SecurityAction`
- `T:System.Security.Permissions.SecurityAttribute`
- `T:System.Security.Permissions.SecurityPermission`
- `T:System.Security.Permissions.SecurityPermissionAttribute`
- `T:System.Security.Permissions.SecurityPermissionFlag`
- `T:System.Security.Permissions.SiteIdentityPermission`
- `T:System.Security.Permissions.SiteIdentityPermissionAttribute`
- `T:System.Security.Permissions.StorePermission`
- `T:System.Security.Permissions.StorePermissionAttribute`
- `T:System.Security.Permissions.StorePermissionFlags`
- `T:System.Security.Permissions.StrongNameIdentityPermission`
- `T:System.Security.Permissions.StrongNameIdentityPermissionAttribute`
- `T:System.Security.Permissions.StrongNamePublicKeyBlob`
- `T:System.Security.Permissions.TypeDescriptorPermission`
- `T:System.Security.Permissions.TypeDescriptorPermissionAttribute`
- `T:System.Security.Permissions.TypeDescriptorPermissionFlags`
- `T:System.Security.Permissions.UIPermission`
- `T:System.Security.Permissions.UIPermissionAttribute`
- `T:System.Security.Permissions.UIPermissionClipboard`
- `T:System.Security.Permissions.UIPermissionWindow`
- `T:System.Security.Permissions.UrlIdentityPermission`
- `T:System.Security.Permissions.UrlIdentityPermissionAttribute`
- `T:System.Security.Permissions.WebBrowserPermission`
- `T:System.Security.Permissions.WebBrowserPermissionAttribute`
- `T:System.Security.Permissions.WebBrowserPermissionLevel`
- `T:System.Security.Permissions.ZoneIdentityPermission`
- `T:System.Security.Permissions.ZoneIdentityPermissionAttribute`
- `M:System.Security.Policy.ApplicationTrust.ApplicationTrust(PermissionSet, IEnumerable<StrongName>)`
- `P:System.Security.Policy.ApplicationTrust.FullTrustAssemblies`
- `T:System.Security.Policy.FileCodeGroup`
- `T:System.Security.Policy.GacInstalled`
- `T:System.Security.Policy.IIdentityPermissionFactory`
- `M:System.Security.Policy.PolicyLevel.AddNamedPermissionSet(System.Security.NamedPermissionSet)`
- `M:System.Security.Policy.PolicyLevel.ChangeNamedPermissionSet(System.String,System.Security.PermissionSet)`
- `M:System.Security.Policy.PolicyLevel.GetNamedPermissionSet(System.String)`
- `Overload:System.Security.Policy.PolicyLevel.RemoveNamedPermissionSet`
- `T:System.Security.Policy.PolicyStatement.PermissionSet`
- `Overload:System.Security.Policy.PolicyStatement.#ctor`
- `T:System.Security.Policy.Publisher`
- `T:System.Security.Policy.Site`
- `T:System.Security.Policy.StrongName`
- `T:System.Security.Policy.StrongNameMembershipCondition`
- `T:System.Security.Policy.Url`
- `T:System.Security.Policy.Zone`
- `T:System.Security.SecurityManager`
- `T:System.ServiceProcess.ServiceControllerPermission`
- `T:System.ServiceProcess.ServiceControllerPermissionAttribute`
- `T:System.Transactions.DistributedTransactionPermission`
- `T:System.Transactions.DistributedTransactionPermissionAttribute`
- `T:System.Web.AspNetHostingPermission`
- `T:System.Web.AspNetHostingPermissionAttribute`
- `T:System.Xaml.Permissions.XamlLoadPermission`

-->
