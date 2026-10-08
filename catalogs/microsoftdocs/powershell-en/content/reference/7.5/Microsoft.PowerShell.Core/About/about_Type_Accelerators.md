---
description: Describes the type accelerators available for .NET types.
Locale: en-US
ms.date: 01/21/2025
online version: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_type_accelerators?view=powershell-7.5&WT.mc_id=ps-gethelp
schema: 2.0.0
title: about_Type_Accelerators
---
# about_Type_Accelerators

## Short description

Describes the type accelerators available for .NET types.

## Long description

Type accelerators are aliases for .NET types. They allow you to access specific
.NET types without explicitly using the full type name. For example, you can
shorten `[System.Management.Automation.AliasAttribute]` to `[Alias]`.

Type accelerator names are mostly lowercase, but some are defined using
Pascal-case. PowerShell is case-insensitive, so you can use either.

## Using type accelerators

For most type accelerators, you use type accelerators in the same way as
you would use the full type name. However, PowerShell has special handling for
the following two type accelerators:

- `pscustomobject` - See [about_PSCustomObject](about_PSCustomObject.md)
- `ref` - See [about_Ref](about_Ref.md)

Type accelerators are most commonly used to specify the type of a variable or
cast an object to a specific type. For those cases, you must enclose the type
name or its accelerator in square brackets (`[]`). For example, `[int]` or
`[int32]`.

In some contexts, you can specify the type accelerator name as a string. For
example:

- When used with type comparison operators

  ```powershell
  PS> '1' -as 'int'
  1
  PS> 1 -is 'int'
  True
  ```

- When used with `[type]` type class

  ```powershell
  PS> [type]'int'

  IsPublic IsSerial Name                                     BaseType
  -------- -------- ----                                     --------
  True     True     Int32                                    System.ValueType
  ```

In other contexts, like reflection, you must use the full type name as a string
rather than the type accelerator name.

## Default type accelerators

| Accelerator name | Full type name |
| --- | --- |
| adsi | [System.DirectoryServices.DirectoryEntry](https://learn.microsoft.com/search/?terms=System.DirectoryServices.DirectoryEntry) |
| adsisearcher | [System.DirectoryServices.DirectorySearcher](https://learn.microsoft.com/search/?terms=System.DirectoryServices.DirectorySearcher) |
| Alias | [System.Management.Automation.AliasAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.AliasAttribute) |
| AllowEmptyCollection | [System.Management.Automation.AllowEmptyCollectionAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.AllowEmptyCollectionAttribute) |
| AllowEmptyString | [System.Management.Automation.AllowEmptyStringAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.AllowEmptyStringAttribute) |
| AllowNull | [System.Management.Automation.AllowNullAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.AllowNullAttribute) |
| ArgumentCompleter | [System.Management.Automation.ArgumentCompleterAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ArgumentCompleterAttribute) |
| ArgumentCompletions | [System.Management.Automation.ArgumentCompletionsAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ArgumentCompletionsAttribute) |
| array | [System.Array](https://learn.microsoft.com/search/?terms=System.Array) |
| bigint | [System.Numerics.BigInteger](https://learn.microsoft.com/search/?terms=System.Numerics.BigInteger) |
| bool | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) |
| byte | [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) |
| char | [System.Char](https://learn.microsoft.com/search/?terms=System.Char) |
| cimclass | [Microsoft.Management.Infrastructure.CimClass](https://learn.microsoft.com/search/?terms=Microsoft.Management.Infrastructure.CimClass) |
| cimconverter | [Microsoft.Management.Infrastructure.CimConverter](https://learn.microsoft.com/search/?terms=Microsoft.Management.Infrastructure.CimConverter) |
| ciminstance | [Microsoft.Management.Infrastructure.CimInstance](https://learn.microsoft.com/search/?terms=Microsoft.Management.Infrastructure.CimInstance) |
| CimSession | [Microsoft.Management.Infrastructure.CimSession](https://learn.microsoft.com/search/?terms=Microsoft.Management.Infrastructure.CimSession) |
| cimtype | [Microsoft.Management.Infrastructure.CimType](https://learn.microsoft.com/search/?terms=Microsoft.Management.Infrastructure.CimType) |
| CmdletBinding | [System.Management.Automation.CmdletBindingAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.CmdletBindingAttribute) |
| cultureinfo | [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) |
| datetime | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| decimal | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| double | [System.Double](https://learn.microsoft.com/search/?terms=System.Double) |
| DscLocalConfigurationManager | [System.Management.Automation.DscLocalConfigurationManagerAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.DscLocalConfigurationManagerAttribute) |
| DscProperty | [System.Management.Automation.DscPropertyAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.DscPropertyAttribute) |
| DscResource | [System.Management.Automation.DscResourceAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.DscResourceAttribute) |
| ExperimentAction | [System.Management.Automation.ExperimentAction](https://learn.microsoft.com/search/?terms=System.Management.Automation.ExperimentAction) |
| Experimental | [System.Management.Automation.ExperimentalAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ExperimentalAttribute) |
| ExperimentalFeature | [System.Management.Automation.ExperimentalFeature](https://learn.microsoft.com/search/?terms=System.Management.Automation.ExperimentalFeature) |
| float | [System.Single](https://learn.microsoft.com/search/?terms=System.Single) |
| guid | [System.Guid](https://learn.microsoft.com/search/?terms=System.Guid) |
| hashtable | [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) |
| initialsessionstate | [System.Management.Automation.Runspaces.InitialSessionState](https://learn.microsoft.com/search/?terms=System.Management.Automation.Runspaces.InitialSessionState) |
| int | [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) |
| int16 | [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) |
| int32 | [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) |
| int64 | [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) |
| ipaddress | [System.Net.IPAddress](https://learn.microsoft.com/search/?terms=System.Net.IPAddress) |
| IPEndpoint | [System.Net.IPEndPoint](https://learn.microsoft.com/search/?terms=System.Net.IPEndPoint) |
| long | [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) |
| mailaddress | [System.Net.Mail.MailAddress](https://learn.microsoft.com/search/?terms=System.Net.Mail.MailAddress) |
| NoRunspaceAffinity | [System.Management.Automation.Language.NoRunspaceAffinityAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.Language.NoRunspaceAffinityAttribute) |
| NullString | [System.Management.Automation.Language.NullString](https://learn.microsoft.com/search/?terms=System.Management.Automation.Language.NullString) |
| ObjectSecurity | [System.Security.AccessControl.ObjectSecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.ObjectSecurity) |
| ordered | [System.Collections.Specialized.OrderedDictionary](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.OrderedDictionary) |
| OutputType | [System.Management.Automation.OutputTypeAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.OutputTypeAttribute) |
| Parameter | [System.Management.Automation.ParameterAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ParameterAttribute) |
| PhysicalAddress | [System.Net.NetworkInformation.PhysicalAddress](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.PhysicalAddress) |
| powershell | [System.Management.Automation.PowerShell](https://learn.microsoft.com/search/?terms=System.Management.Automation.PowerShell) |
| psaliasproperty | [System.Management.Automation.PSAliasProperty](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSAliasProperty) |
| pscredential | [System.Management.Automation.PSCredential](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSCredential) |
| pscustomobject | [System.Management.Automation.PSObject](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSObject) |
| PSDefaultValue | [System.Management.Automation.PSDefaultValueAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSDefaultValueAttribute) |
| pslistmodifier | [System.Management.Automation.PSListModifier](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSListModifier) |
| psmoduleinfo | [System.Management.Automation.PSModuleInfo](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSModuleInfo) |
| psnoteproperty | [System.Management.Automation.PSNoteProperty](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSNoteProperty) |
| psobject | [System.Management.Automation.PSObject](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSObject) |
| psprimitivedictionary | [System.Management.Automation.PSPrimitiveDictionary](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSPrimitiveDictionary) |
| pspropertyexpression | [Microsoft.PowerShell.Commands.PSPropertyExpression](https://learn.microsoft.com/search/?terms=Microsoft.PowerShell.Commands.PSPropertyExpression) |
| psscriptmethod | [System.Management.Automation.PSScriptMethod](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSScriptMethod) |
| psscriptproperty | [System.Management.Automation.PSScriptProperty](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSScriptProperty) |
| PSTypeNameAttribute | [System.Management.Automation.PSTypeNameAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSTypeNameAttribute) |
| psvariable | [System.Management.Automation.PSVariable](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSVariable) |
| psvariableproperty | [System.Management.Automation.PSVariableProperty](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSVariableProperty) |
| ref | [System.Management.Automation.PSReference](https://learn.microsoft.com/search/?terms=System.Management.Automation.PSReference) |
| regex | [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) |
| runspace | [System.Management.Automation.Runspaces.Runspace](https://learn.microsoft.com/search/?terms=System.Management.Automation.Runspaces.Runspace) |
| runspacefactory | [System.Management.Automation.Runspaces.RunspaceFactory](https://learn.microsoft.com/search/?terms=System.Management.Automation.Runspaces.RunspaceFactory) |
| sbyte | [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte) |
| scriptblock | [System.Management.Automation.ScriptBlock](https://learn.microsoft.com/search/?terms=System.Management.Automation.ScriptBlock) |
| securestring | [System.Security.SecureString](https://learn.microsoft.com/search/?terms=System.Security.SecureString) |
| semver | [System.Management.Automation.SemanticVersion](https://learn.microsoft.com/search/?terms=System.Management.Automation.SemanticVersion) |
| short | [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) |
| single | [System.Single](https://learn.microsoft.com/search/?terms=System.Single) |
| string | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| SupportsWildcards | [System.Management.Automation.SupportsWildcardsAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.SupportsWildcardsAttribute) |
| switch | [System.Management.Automation.SwitchParameter](https://learn.microsoft.com/search/?terms=System.Management.Automation.SwitchParameter) |
| timespan | [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) |
| type | [System.Type](https://learn.microsoft.com/search/?terms=System.Type) |
| uint | [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) |
| uint16 | [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16) |
| uint32 | [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) |
| uint64 | [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) |
| ulong | [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) |
| uri | [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) |
| ushort | [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16) |
| ValidateCount | [System.Management.Automation.ValidateCountAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidateCountAttribute) |
| ValidateDrive | [System.Management.Automation.ValidateDriveAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidateDriveAttribute) |
| ValidateLength | [System.Management.Automation.ValidateLengthAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidateLengthAttribute) |
| ValidateNotNull | [System.Management.Automation.ValidateNotNullAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidateNotNullAttribute) |
| ValidateNotNullOrEmpty | [System.Management.Automation.ValidateNotNullOrEmptyAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidateNotNullOrEmptyAttribute) |
| ValidateNotNullOrWhiteSpace | [System.Management.Automation.ValidateNotNullOrWhiteSpaceAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidateNotNullOrWhiteSpaceAttribute) |
| ValidatePattern | [System.Management.Automation.ValidatePatternAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidatePatternAttribute) |
| ValidateRange | [System.Management.Automation.ValidateRangeAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidateRangeAttribute) |
| ValidateScript | [System.Management.Automation.ValidateScriptAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidateScriptAttribute) |
| ValidateSet | [System.Management.Automation.ValidateSetAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidateSetAttribute) |
| ValidateTrustedData | [System.Management.Automation.ValidateTrustedDataAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidateTrustedDataAttribute) |
| ValidateUserDrive | [System.Management.Automation.ValidateUserDriveAttribute](https://learn.microsoft.com/search/?terms=System.Management.Automation.ValidateUserDriveAttribute) |
| version | [System.Version](https://learn.microsoft.com/search/?terms=System.Version) |
| void | [System.Void](https://learn.microsoft.com/search/?terms=System.Void) |
| WildcardPattern | [System.Management.Automation.WildcardPattern](https://learn.microsoft.com/search/?terms=System.Management.Automation.WildcardPattern) |
| wmi | [System.Management.ManagementObject](https://learn.microsoft.com/search/?terms=System.Management.ManagementObject) |
| wmiclass | [System.Management.ManagementClass](https://learn.microsoft.com/search/?terms=System.Management.ManagementClass) |
| wmisearcher | [System.Management.ManagementObjectSearcher](https://learn.microsoft.com/search/?terms=System.Management.ManagementObjectSearcher) |
| X500DistinguishedName | [System.Security.Cryptography.X509Certificates.X500DistinguishedName](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X500DistinguishedName) |
| X509Certificate | [System.Security.Cryptography.X509Certificates.X509Certificate](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate) |
| xml | [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) |
