---
description: This article lists the modules and cmdlets that are included in various versions of PowerShell.
ms.date: 04/20/2026
title: Release history of modules and cmdlets
---
# Release history of modules and cmdlets

This article lists the modules and cmdlets that are included in various versions of PowerShell. This
is a summary of information found in the release notes. More detailed information can be found in
the release notes:

- [What's new in PowerShell 7.7][34]
- [What's new in PowerShell 7.6][33]
- [What's new in PowerShell 7.5][32]
- [What's new in PowerShell 7.4][31]
- [What's new in PowerShell 7.3][30]
- [What's new in PowerShell 7.2][29]
- [What's new in PowerShell 7.1][04]
- [What's new in PowerShell 7.0][03]

This is a work in progress. Please help us keep this information fresh.

## Module release history

| ModuleName / PSVersion | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| [CimCmdlets][05] | Included | Included | Windows only |
| [ISE (introduced in 2.0)][06] | Included |  | Windows only |
| [Microsoft.PowerShell.Archive][07] | Included | Included |  |
| [Microsoft.PowerShell.Core][08] | Included | Included |  |
| [Microsoft.PowerShell.Diagnostics][09] | Included | Included | Windows only |
| [Microsoft.PowerShell.Host][10] | Included | Included |  |
| [Microsoft.PowerShell.LocalAccounts][11] | Included |  | Windows only (64-bit only) |
| [Microsoft.PowerShell.Management][12] | Included | Included |  |
| [Microsoft.PowerShell.ODataUtils][13] | Included |  | Windows only |
| [Microsoft.PowerShell.Operation.Validation][14] | Included |  | Windows only |
| [Microsoft.PowerShell.PSResourceGet][15] |  | Included | New versions available from the Gallery |
| [Microsoft.PowerShell.Security][16] | Included | Included |  |
| [Microsoft.PowerShell.ThreadJob][28] |  |  | Installable in PowerShell 5.1 - Replaced ThreadJob in PowerShell 7.6 |
| [Microsoft.PowerShell.Utility][17] | Included | Included |  |
| [Microsoft.WsMan.Management][18] | Included | Included | Windows only |
| [PackageManagement][19] | Included | Included |  |
| [PowerShellGet 1.1][20] | Included |  | Must upgrade to v2.x |
| [PowerShellGet 2.x][20] |  | Included | New versions available from the Gallery |
| [PSDesiredStateConfiguration 1.1][21] | Included |  | Removed in 7.2 - available from the Gallery |
| [PSDesiredStateConfiguration 2.x][22] |  |  | Removed in 7.2 - available from the Gallery |
| [PSDesiredStateConfiguration 3.x][23] |  |  | Preview available from the Gallery |
| [PSDiagnostics][24] | Included | Included | Windows only |
| [PSReadLine][25] | Included | Included | New versions available from the Gallery |
| [PSScheduledJob][26] | Included |  | Windows only |
| [PSWorkflow][27] | Included |  | Windows only |
| [PSWorkflowUtility][27] | Included |  | Windows only |
| [ThreadJob][28] |  | Included | Replaced by Microsoft.PowerShell.ThreadJob in PowerShell 7.6 |

## Cmdlet release history

### CimCmdlets

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Export-BinaryMiLog | Included |  | Windows only |
| Get-CimAssociatedInstance | Included | Included | Windows only |
| Get-CimClass | Included | Included | Windows only |
| Get-CimInstance | Included | Included | Windows only |
| Get-CimSession | Included | Included | Windows only |
| Import-BinaryMiLog | Included |  | Windows only |
| Invoke-CimMethod | Included | Included | Windows only |
| New-CimInstance | Included | Included | Windows only |
| New-CimSession | Included | Included | Windows only |
| New-CimSessionOption | Included | Included | Windows only |
| Register-CimIndicationEvent | Included | Included | Windows only |
| Remove-CimInstance | Included | Included | Windows only |
| Remove-CimSession | Included | Included | Windows only |
| Set-CimInstance | Included | Included | Windows only |

### ISE (introduced in 2.0)

This modules is only available in Windows PowerShell.

| Cmdlet name | 5.1 | Note |
| --- | --- | --- |
| Get-IseSnippet | Included |  |
| Import-IseSnippet | Included |  |
| New-IseSnippet | Included |  |

### Microsoft.PowerShell.Archive

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Compress-Archive | Included | Included |  |
| Expand-Archive | Included | Included |  |

### Microsoft.PowerShell.Core

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Add-History | Included | Included |  |
| Add-PSSnapin | Included |  | Windows only |
| Clear-History | Included | Included |  |
| Clear-Host | Included | Included |  |
| Connect-PSSession | Included | Included | Windows only |
| Debug-Job | Included | Included |  |
| Disable-ExperimentalFeature |  | Included | Added in 6.2 |
| Disable-PSRemoting | Included | Included | Windows only |
| Disable-PSSessionConfiguration | Included | Included | Windows only |
| Disconnect-PSSession | Included | Included | Windows only |
| Enable-ExperimentalFeature |  | Included | Added in 6.2 |
| Enable-PSRemoting | Included | Included | Windows only |
| Enable-PSSessionConfiguration | Included | Included | Windows only |
| Enter-PSHostProcess | Included | Included | Added Linux support in 6.2 |
| Enter-PSSession | Included | Included |  |
| Exit-PSHostProcess | Included | Included | Added Linux support in 6.2 |
| Exit-PSSession | Included | Included |  |
| Export-Console | Included |  | Windows only |
| Export-ModuleMember | Included | Included |  |
| ForEach-Object | Included | Included |  |
| Get-Command | Included | Included |  |
| Get-ExperimentalFeature |  | Included | Added in 6.2 |
| Get-Help | Included | Included |  |
| Get-History | Included | Included |  |
| Get-Job | Included | Included |  |
| Get-Module | Included | Included |  |
| Get-PSHostProcessInfo | Included | Included | Added Linux support in 6.2 |
| Get-PSSession | Included | Included |  |
| Get-PSSessionCapability | Included | Included |  |
| Get-PSSessionConfiguration | Included | Included |  |
| Get-PSSnapin | Included |  | Windows only |
| Get-Verb | Included |  | Moved to Microsoft.PowerShell.Utility 6.0+ |
| Import-Module | Included | Included |  |
| Invoke-Command | Included | Included |  |
| Invoke-History | Included | Included |  |
| New-Module | Included | Included |  |
| New-ModuleManifest | Included | Included |  |
| New-PSRoleCapabilityFile | Included | Included |  |
| New-PSSession | Included | Included |  |
| New-PSSessionConfigurationFile | Included | Included | Added Linux support in 7.3 |
| New-PSSessionOption | Included | Included |  |
| New-PSTransportOption | Included | Included |  |
| Out-Default | Included | Included |  |
| Out-Host | Included | Included |  |
| Out-Null | Included | Included |  |
| Receive-Job | Included | Included |  |
| Receive-PSSession | Included | Included | Windows only |
| Register-ArgumentCompleter | Included | Included |  |
| Register-PSSessionConfiguration | Included | Included | Windows only |
| Remove-Job | Included | Included |  |
| Remove-Module | Included | Included |  |
| Remove-PSSession | Included | Included |  |
| Remove-PSSnapin | Included |  | Windows only |
| Resume-Job | Included |  |  |
| Save-Help | Included | Included |  |
| Set-PSDebug | Included | Included |  |
| Set-PSSessionConfiguration | Included | Included | Windows only |
| Set-StrictMode | Included | Included |  |
| Start-Job | Included | Included |  |
| Stop-Job | Included | Included |  |
| Switch-Process |  |  | Linux and macOS only |
| Suspend-Job | Included |  | Windows only |
| Test-ModuleManifest | Included | Included |  |
| Test-PSSessionConfigurationFile | Included | Included | Windows only |
| Unregister-PSSessionConfiguration | Included | Included | Windows only |
| Update-Help | Included | Included |  |
| Wait-Job | Included | Included |  |
| Where-Object | Included | Included |  |

### Microsoft.PowerShell.Diagnostics

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Export-Counter | Included |  | Windows only |
| Get-Counter | Included | Included | Windows only |
| Get-WinEvent | Included | Included | Windows only |
| Import-Counter | Included |  | Windows only |
| New-WinEvent | Included | Included | Windows only |

### Microsoft.PowerShell.Host

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Start-Transcript | Included | Included |  |
| Stop-Transcript | Included | Included |  |

### Microsoft.PowerShell.LocalAccounts (64-bit only)

This modules is only available in Windows PowerShell.

| Cmdlet name | 5.1 | Note |
| --- | --- | --- |
| Add-LocalGroupMember | Included |  |
| Disable-LocalUser | Included |  |
| Enable-LocalUser | Included |  |
| Get-LocalGroup | Included |  |
| Get-LocalGroupMember | Included |  |
| Get-LocalUser | Included |  |
| New-LocalGroup | Included |  |
| New-LocalUser | Included |  |
| Remove-LocalGroup | Included |  |
| Remove-LocalGroupMember | Included |  |
| Remove-LocalUser | Included |  |
| Rename-LocalGroup | Included |  |
| Rename-LocalUser | Included |  |
| Set-LocalGroup | Included |  |
| Set-LocalUser | Included |  |

### Microsoft.PowerShell.Management

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Add-Computer | Included |  | Windows only |
| Add-Content | Included | Included |  |
| Checkpoint-Computer | Included |  | Windows only |
| Clear-Content | Included | Included |  |
| Clear-EventLog | Included |  | Windows only |
| Clear-Item | Included | Included |  |
| Clear-ItemProperty | Included | Included |  |
| Clear-RecycleBin | Included | Included | Windows only |
| Complete-Transaction | Included |  | Windows only |
| Convert-Path | Included | Included |  |
| Copy-Item | Included | Included |  |
| Copy-ItemProperty | Included | Included |  |
| Debug-Process | Included | Included |  |
| Disable-ComputerRestore | Included |  | Windows only |
| Enable-ComputerRestore | Included |  | Windows only |
| Get-ChildItem | Included | Included |  |
| Get-Clipboard | Included | Included |  |
| Get-ComputerInfo | Included | Included | Windows only |
| Get-ComputerRestorePoint | Included |  | Windows only |
| Get-Content | Included | Included |  |
| Get-ControlPanelItem | Included |  | Windows only |
| Get-EventLog | Included |  | Windows only |
| Get-HotFix | Included | Included | Windows only |
| Get-Item | Included | Included |  |
| Get-ItemProperty | Included | Included |  |
| Get-ItemPropertyValue | Included | Included |  |
| Get-Location | Included | Included |  |
| Get-Process | Included | Included |  |
| Get-PSDrive | Included | Included |  |
| Get-PSProvider | Included | Included |  |
| Get-Service | Included | Included | Windows only |
| Get-TimeZone | Included | Included | Windows only |
| Get-Transaction | Included |  | Windows only |
| Get-WmiObject | Included |  | Windows only |
| Invoke-Item | Included | Included |  |
| Invoke-WmiMethod | Included |  | Windows only |
| Join-Path | Included | Included |  |
| Limit-EventLog | Included |  | Windows only |
| Move-Item | Included | Included |  |
| Move-ItemProperty | Included | Included |  |
| New-EventLog | Included |  | Windows only |
| New-Item | Included | Included |  |
| New-ItemProperty | Included | Included |  |
| New-PSDrive | Included | Included |  |
| New-Service | Included | Included | Windows only |
| New-WebServiceProxy | Included |  | Windows only |
| Pop-Location | Included | Included |  |
| Push-Location | Included | Included |  |
| Register-WmiEvent | Included |  | Windows only |
| Remove-Computer | Included |  | Windows only |
| Remove-EventLog | Included |  | Windows only |
| Remove-Item | Included | Included |  |
| Remove-ItemProperty | Included | Included |  |
| Remove-PSDrive | Included | Included |  |
| Remove-Service |  | Included | Windows only |
| Remove-WmiObject | Included |  | Windows only |
| Rename-Computer | Included | Included | Windows only |
| Rename-Item | Included | Included |  |
| Rename-ItemProperty | Included | Included |  |
| Reset-ComputerMachinePassword | Included |  | Windows only |
| Resolve-Path | Included | Included |  |
| Restart-Computer | Included | Included | Added Linux/macOS support in 7.1 |
| Restart-Service | Included | Included | Windows only |
| Restore-Computer | Included |  | Windows only |
| Resume-Service | Included | Included | Windows only |
| Set-Clipboard | Included | Included |  |
| Set-Content | Included | Included |  |
| Set-Item | Included | Included |  |
| Set-ItemProperty | Included | Included |  |
| Set-Location | Included | Included |  |
| Set-Service | Included | Included | Windows only |
| Set-TimeZone | Included | Included | Windows only |
| Set-WmiInstance | Included |  | Windows only |
| Show-ControlPanelItem | Included |  | Windows only |
| Show-EventLog | Included |  | Windows only |
| Split-Path | Included | Included |  |
| Start-Process | Included | Included |  |
| Start-Service | Included | Included | Windows only |
| Start-Transaction | Included |  | Windows only |
| Stop-Computer | Included | Included | Added Linux/macOS support in 7.1 |
| Stop-Process | Included | Included |  |
| Stop-Service | Included | Included | Windows only |
| Suspend-Service | Included | Included | Windows only |
| Test-ComputerSecureChannel | Included |  | Windows only |
| Test-Connection | Included | Included |  |
| Test-Path | Included | Included |  |
| Undo-Transaction | Included |  | Windows only |
| Use-Transaction | Included |  | Windows only |
| Wait-Process | Included | Included |  |
| Write-EventLog | Included |  | Windows only |

### Microsoft.PowerShell.ODataUtils


This modules is only available in Windows PowerShell.

| Cmdlet name | 5.1 | Note |
| --- | --- | --- |
| Export-ODataEndpointProxy | Included |  |

### Microsoft.PowerShell.Operation.Validation

This modules is only available in Windows PowerShell.

| Cmdlet name | 5.1 | Note |
| --- | --- | --- |
| Get-OperationValidation | Included |  |
| Invoke-OperationValidation | Included |  |

### Microsoft.PowerShell.PSResourceGet

| Cmdlet name | 7.4 and higher | Note |
| --- | --- | --- |
| Compress-PSResource |  | Added in v1.1.0 of the module |
| Find-PSResource | Included |  |
| Get-InstalledPSResource | Included |  |
| Get-PSResource | Included |  |
| Get-PSResourceRepository | Included |  |
| Get-PSScriptFileInfo | Included |  |
| Import-PSGetRepository | Included |  |
| Install-PSResource | Included |  |
| New-PSScriptFileInfo | Included |  |
| Publish-PSResource | Included |  |
| Register-PSResourceRepository | Included |  |
| Save-PSResource | Included |  |
| Set-PSResourceRepository | Included |  |
| Test-PSScriptFileInfo | Included |  |
| Uninstall-PSResource | Included |  |
| Unregister-PSResourceRepository | Included |  |
| Update-PSModuleManifest | Included |  |
| Update-PSResource | Included |  |
| Update-PSScriptFileInfo | Included |  |

### Microsoft.PowerShell.Security

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| ConvertFrom-SecureString | Included | Included |  |
| ConvertTo-SecureString | Included | Included |  |
| Get-Acl | Included | Included | Windows only |
| Get-AuthenticodeSignature | Included | Included | Windows only |
| Get-CmsMessage | Included | Included | Support for Linux/macOS added in 7.1 |
| Get-Credential | Included | Included |  |
| Get-ExecutionPolicy | Included | Included | Returns **Unrestricted** on Linux/macOS |
| Get-PfxCertificate | Included | Included |  |
| New-FileCatalog | Included | Included | Windows only |
| Protect-CmsMessage | Included | Included | Support for Linux/macOS added in 7.1 |
| Set-Acl | Included | Included | Windows only |
| Set-AuthenticodeSignature | Included | Included | Windows only |
| Set-ExecutionPolicy | Included | Included | Does nothing on Linux/macOS |
| Test-FileCatalog | Included | Included | Windows only |
| Unprotect-CmsMessage | Included | Included | Support for Linux/macOS added in 7.1 |

### Microsoft.PowerShell.Utility

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Add-Member | Included | Included |  |
| Add-Type | Included | Included |  |
| Clear-Variable | Included | Included |  |
| Compare-Object | Included | Included |  |
| Convert-String | Included |  |  |
| ConvertFrom-CliXml |  |  | Added in 7.5 |
| ConvertFrom-Csv | Included | Included |  |
| ConvertFrom-Json | Included | Included |  |
| ConvertFrom-Markdown |  | Included | Added in 6.1 |
| ConvertFrom-SddlString | Included | Included | Windows only |
| ConvertFrom-String | Included |  |  |
| ConvertFrom-StringData | Included | Included |  |
| ConvertTo-CliXml |  |  | Added in 7.5 |
| ConvertTo-Csv | Included | Included |  |
| ConvertTo-Html | Included | Included |  |
| ConvertTo-Json | Included | Included |  |
| ConvertTo-Xml | Included | Included |  |
| Debug-Runspace | Included | Included |  |
| Disable-PSBreakpoint | Included | Included |  |
| Disable-RunspaceDebug | Included | Included |  |
| Enable-PSBreakpoint | Included | Included |  |
| Enable-RunspaceDebug | Included | Included |  |
| Export-Alias | Included | Included |  |
| Export-Clixml | Included | Included |  |
| Export-Csv | Included | Included |  |
| Export-FormatData | Included | Included |  |
| Export-PSSession | Included | Included |  |
| Format-Custom | Included | Included |  |
| Format-Hex | Included | Included |  |
| Format-List | Included | Included |  |
| Format-Table | Included | Included |  |
| Format-Wide | Included | Included |  |
| Get-Alias | Included | Included |  |
| Get-Culture | Included | Included |  |
| Get-Date | Included | Included |  |
| Get-Error |  | Included |  |
| Get-Event | Included | Included | No event sources available on Linux/macOS |
| Get-EventSubscriber | Included | Included |  |
| Get-FileHash | Included | Included |  |
| Get-FormatData | Included | Included |  |
| Get-Host | Included | Included |  |
| Get-MarkdownOption |  | Included | Added in 6.1 |
| Get-Member | Included | Included |  |
| Get-PSBreakpoint | Included | Included |  |
| Get-PSCallStack | Included | Included |  |
| Get-Random | Included | Included |  |
| Get-Runspace | Included | Included |  |
| Get-RunspaceDebug | Included | Included |  |
| Get-SecureRandom |  | Included | Added in 7.4 |
| Get-TraceSource | Included | Included |  |
| Get-TypeData | Included | Included |  |
| Get-UICulture | Included | Included |  |
| Get-Unique | Included | Included |  |
| Get-Uptime |  | Included |  |
| Get-Variable | Included | Included |  |
| Get-Verb |  | Included | Moved from Microsoft.PowerShell.Core |
| Group-Object | Included | Included |  |
| Import-Alias | Included | Included |  |
| Import-Clixml | Included | Included |  |
| Import-Csv | Included | Included |  |
| Import-LocalizedData | Included | Included |  |
| Import-PowerShellDataFile | Included | Included |  |
| Import-PSSession | Included | Included |  |
| Invoke-Expression | Included | Included |  |
| Invoke-RestMethod | Included | Included |  |
| Invoke-WebRequest | Included | Included |  |
| Join-String |  | Included |  |
| Measure-Command | Included | Included |  |
| Measure-Object | Included | Included |  |
| New-Alias | Included | Included |  |
| New-Event | Included | Included | No event sources available on Linux/macOS |
| New-Guid | Included | Included |  |
| New-Object | Included | Included |  |
| New-TemporaryFile | Included | Included |  |
| New-TimeSpan | Included | Included |  |
| New-Variable | Included | Included |  |
| Out-File | Included | Included |  |
| Out-GridView | Included | Included | Windows only |
| Out-Printer | Included | Included | Windows only |
| Out-String | Included | Included |  |
| Read-Host | Included | Included |  |
| Register-EngineEvent | Included | Included | No event sources available on Linux/macOS |
| Register-ObjectEvent | Included | Included |  |
| Remove-Alias |  | Included |  |
| Remove-Event | Included | Included | No event sources available on Linux/macOS |
| Remove-PSBreakpoint | Included | Included |  |
| Remove-TypeData | Included | Included |  |
| Remove-Variable | Included | Included |  |
| Select-Object | Included | Included |  |
| Select-String | Included | Included |  |
| Select-Xml | Included | Included |  |
| Send-MailMessage | Included | Included |  |
| Set-Alias | Included | Included |  |
| Set-Date | Included | Included |  |
| Set-MarkdownOption |  | Included | Added in 6.1 |
| Set-PSBreakpoint | Included | Included |  |
| Set-TraceSource | Included | Included |  |
| Set-Variable | Included | Included |  |
| Show-Command | Included | Included | Windows only |
| Show-Markdown |  | Included | Added in 6.1 |
| Sort-Object | Included | Included |  |
| Start-Sleep | Included | Included |  |
| Tee-Object | Included | Included |  |
| Test-Json |  | Included |  |
| Trace-Command | Included | Included |  |
| Unblock-File | Included | Included | Added support for macOS in 7.0 |
| Unregister-Event | Included | Included | No event sources available on Linux/macOS |
| Update-FormatData | Included | Included |  |
| Update-List | Included | Included |  |
| Update-TypeData | Included | Included |  |
| Wait-Debugger | Included | Included |  |
| Wait-Event | Included | Included |  |
| Write-Debug | Included | Included |  |
| Write-Error | Included | Included |  |
| Write-Host | Included | Included |  |
| Write-Information | Included | Included |  |
| Write-Output | Included | Included |  |
| Write-Progress | Included | Included |  |
| Write-Verbose | Included | Included |  |
| Write-Warning | Included | Included |  |

### Microsoft.WsMan.Management

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Connect-WSMan | Included | Included | Windows only |
| Disable-WSManCredSSP | Included | Included | Windows only |
| Disconnect-WSMan | Included | Included | Windows only |
| Enable-WSManCredSSP | Included | Included | Windows only |
| Get-WSManCredSSP | Included | Included | Windows only |
| Get-WSManInstance | Included | Included | Windows only |
| Invoke-WSManAction | Included | Included | Windows only |
| New-WSManInstance | Included | Included | Windows only |
| New-WSManSessionOption | Included | Included | Windows only |
| Remove-WSManInstance | Included | Included | Windows only |
| Set-WSManInstance | Included | Included | Windows only |
| Set-WSManQuickConfig | Included | Included | Windows only |
| Test-WSMan | Included | Included | Windows only |

### PackageManagement

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Find-Package | Included | Included |  |
| Find-PackageProvider | Included | Included |  |
| Get-Package | Included | Included |  |
| Get-PackageProvider | Included | Included |  |
| Get-PackageSource | Included | Included |  |
| Import-PackageProvider | Included | Included |  |
| Install-Package | Included | Included |  |
| Install-PackageProvider | Included | Included |  |
| Register-PackageSource | Included | Included |  |
| Save-Package | Included | Included |  |
| Set-PackageSource | Included | Included |  |
| Uninstall-Package | Included | Included |  |
| Unregister-PackageSource | Included | Included |  |

### PowerShellGet 2.x

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Find-Command | Included | Included |  |
| Find-DscResource | Included | Included |  |
| Find-Module | Included | Included |  |
| Find-RoleCapability | Included | Included |  |
| Find-Script | Included | Included |  |
| Get-CredsFromCredentialProvider |  | Included |  |
| Get-InstalledModule | Included | Included |  |
| Get-InstalledScript | Included | Included |  |
| Get-PSRepository | Included | Included |  |
| Install-Module | Included | Included |  |
| Install-Script | Included | Included |  |
| New-ScriptFileInfo | Included | Included |  |
| Publish-Module | Included | Included |  |
| Publish-Script | Included | Included |  |
| Register-PSRepository | Included | Included |  |
| Save-Module | Included | Included |  |
| Save-Script | Included | Included |  |
| Set-PSRepository | Included | Included |  |
| Test-ScriptFileInfo | Included | Included |  |
| Uninstall-Module | Included | Included |  |
| Uninstall-Script | Included | Included |  |
| Unregister-PSRepository | Included | Included |  |
| Update-Module | Included | Included |  |
| Update-ModuleManifest | Included | Included |  |
| Update-Script | Included | Included |  |
| Update-ScriptFileInfo | Included | Included |  |

### PSDesiredStateConfiguration v1.1

This modules is only available from in Windows PowerShell.

| Cmdlet name | 5.1 | Note |
| --- | --- | --- |
| Configuration | Included |  |
| Disable-DscDebug | Included |  |
| Enable-DscDebug | Included |  |
| Get-DscConfiguration | Included |  |
| Get-DscConfigurationStatus | Included |  |
| Get-DscLocalConfigurationManager | Included |  |
| Get-DscResource | Included |  |
| Invoke-DscResource | Included |  |
| New-DSCCheckSum | Included |  |
| Publish-DscConfiguration | Included |  |
| Remove-DscConfigurationDocument | Included |  |
| Restore-DscConfiguration | Included |  |
| Set-DscLocalConfigurationManager | Included |  |
| Start-DscConfiguration | Included |  |
| Stop-DscConfiguration | Included |  |
| Test-DscConfiguration | Included |  |
| Update-DscConfiguration | Included |  |

### PSDesiredStateConfiguration v2.0.5

This modules is only available from the PowerShell Gallery.

| Cmdlet name | 2.0.5 | Note |
| --- | --- | --- |
| Configuration | Included |  |
| Get-DscResource | Included |  |
| Invoke-DscResource | Included | Experimental |
| New-DSCCheckSum | Included |  |

### PSDesiredStateConfiguration v3.x - Preview

This modules is only available from the PowerShell Gallery.

| Cmdlet name | 3.0 (preview) | Note |
| --- | --- | --- |
| Configuration | Included |  |
| ConvertTo-DscJsonSchema | Included |  |
| Get-DscResource | Included |  |
| Invoke-DscResource | Included |  |
| New-DscChecksum | Included |  |

### PSDiagnostics

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Disable-PSTrace | Included | Included | Windows only |
| Disable-PSWSManCombinedTrace | Included | Included | Windows only |
| Disable-WSManTrace | Included | Included | Windows only |
| Enable-PSTrace | Included | Included | Windows only |
| Enable-PSWSManCombinedTrace | Included | Included | Windows only |
| Enable-WSManTrace | Included | Included | Windows only |
| Get-LogProperties | Included | Included | Windows only |
| Set-LogProperties | Included | Included | Windows only |
| Start-Trace | Included | Included | Windows only |
| Stop-Trace | Included | Included | Windows only |

### PSReadLine

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Get-PSReadLineKeyHandler | Included | Included |  |
| Get-PSReadLineOption | Included | Included |  |
| PSConsoleHostReadLine | Included | Included |  |
| Remove-PSReadLineKeyHandler | Included | Included |  |
| Set-PSReadLineKeyHandler | Included | Included |  |
| Set-PSReadLineOption | Included | Included |  |

### PSScheduledJob

This modules is only available in Windows PowerShell.

| Cmdlet name | 5.1 | Note |
| --- | --- | --- |
| Add-JobTrigger | Included |  |
| Disable-JobTrigger | Included |  |
| Disable-ScheduledJob | Included |  |
| Enable-JobTrigger | Included |  |
| Enable-ScheduledJob | Included |  |
| Get-JobTrigger | Included |  |
| Get-ScheduledJob | Included |  |
| Get-ScheduledJobOption | Included |  |
| New-JobTrigger | Included |  |
| New-ScheduledJobOption | Included |  |
| Register-ScheduledJob | Included |  |
| Remove-JobTrigger | Included |  |
| Set-JobTrigger | Included |  |
| Set-ScheduledJob | Included |  |
| Set-ScheduledJobOption | Included |  |
| Unregister-ScheduledJob | Included |  |

### PSWorkflow & PSWorkflowUtility

This modules is only available in Windows PowerShell.

| Cmdlet name | 5.1 | Note |
| --- | --- | --- |
| New-PSWorkflowExecutionOption | Included |  |
| New-PSWorkflowSession | Included |  |
| Invoke-AsWorkflow | Included |  |

### Microsoft.PowerShell.ThreadJob (formerly ThreadJob)

<a id="threadjob"></a>
This module can be installed from the PowerShell Gallery on any supported version of PowerShell. The
ThreadJob module was initially included in PowerShell 6.0. The ThreadJob module was renamed to
Microsoft.PowerShell.ThreadJob in PowerShell 7.6.

| Cmdlet name | 5.1 | 7.4 and higher | Note |
| --- | --- | --- | --- |
| Start-ThreadJob |  | Included |  |

<!-- link references -->
[01]: https://github.com/MicrosoftDocs/PowerShell-Docs/blob/a3de8f22552170e70852470d46cd52cd9ca471ec/reference/media/shared/check-mark-button-2705.svg
[02]: https://github.com/MicrosoftDocs/PowerShell-Docs/blob/a3de8f22552170e70852470d46cd52cd9ca471ec/reference/media/shared/cross-mark-274c.svg
[03]: https://learn.microsoft.com/previous-versions/powershell/scripting/whats-new/what-s-new-in-powershell-70
[04]: https://learn.microsoft.com/previous-versions/powershell/scripting/whats-new/what-s-new-in-powershell-71
[05]: #cimcmdlets
[06]: #ise-introduced-in-20
[07]: #microsoftpowershellarchive
[08]: #microsoftpowershellcore
[09]: #microsoftpowershelldiagnostics
[10]: #microsoftpowershellhost
[11]: #microsoftpowershelllocalaccounts-64-bit-only
[12]: #microsoftpowershellmanagement
[13]: #microsoftpowershellodatautils
[14]: #microsoftpowershelloperationvalidation
[15]: #microsoftpowershellpsresourceget
[16]: #microsoftpowershellsecurity
[17]: #microsoftpowershellutility
[18]: #microsoftwsmanmanagement
[19]: #packagemanagement
[20]: #powershellget-2x
[21]: #psdesiredstateconfiguration-v11
[22]: #psdesiredstateconfiguration-v205
[23]: #psdesiredstateconfiguration-v3x---preview
[24]: #psdiagnostics
[25]: #psreadline
[26]: #psscheduledjob
[27]: #psworkflow--psworkflowutility
[28]: #threadjob
[29]: What-s-New-in-PowerShell-72.md
[30]: What-s-New-in-PowerShell-73.md
[31]: What-s-New-in-PowerShell-74.md
[32]: What-s-New-in-PowerShell-75.md
[33]: What-s-New-in-PowerShell-76.md
[34]: What-s-New-in-PowerShell-77.md
