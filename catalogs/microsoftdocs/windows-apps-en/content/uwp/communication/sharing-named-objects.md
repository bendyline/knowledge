---
title: Sharing named objects
description: This topic explains how to share named objects between Universal Windows Platform (UWP) applications and Win32 applications.
ms.date: 04/06/2020
ms.topic: concept-article
keywords: windows 10, uwp
---
# Sharing named objects

This topic explains how to share named objects between Universal Windows Platform (UWP) applications and Win32 applications.

## Named objects in packaged applications

[Named objects](https://learn.microsoft.com/windows/win32/sync/object-names) provide an easy way for processes to share object handles. After a process has created a named object, other processes can use the name to call the appropriate function to open a handle to the object. Named objects are commonly used for [thread synchronization](https://learn.microsoft.com/windows/win32/sync/interprocess-synchronization) and [interprocess communication](interprocess-communication.md).

By default, packaged applications can only access named objects they've created. In order to share named objects with packaged applications, permissions must be set when objects are created, and names must be qualified when objects are opened.

## Creating named objects

Named objects are created with a corresponding `Create` API:

* [CreateEvent](https://learn.microsoft.com/windows/win32/api/synchapi/nf-synchapi-createeventexw)
* [CreateFileMapping](https://learn.microsoft.com/windows/win32/api/memoryapi/nf-memoryapi-createfilemappingw)
* [CreateMutex](https://learn.microsoft.com/windows/win32/api/synchapi/nf-synchapi-createmutexexw)
* [CreateSemaphore](https://learn.microsoft.com/windows/win32/api/synchapi/nf-synchapi-createsemaphoreexw)
* [CreateWaitableTimer](https://learn.microsoft.com/windows/win32/api/synchapi/nf-synchapi-createwaitabletimerexw)

All of these APIs share an `LPSECURITY_ATTRIBUTES` parameter which enables the caller to specify [access control lists (ACLs)](https://learn.microsoft.com/previous-versions/windows/desktop/legacy/aa379560\(v=vs.85\)) to control what processes can access the object. In order to share named objects with packaged applications, permission must be granted within the ACLs when the named objects are created.

Security identifiers (SIDs) represent identities within ACLs. Every packaged application has its own SID based on its package family name. You can generate the SID for a packaged application by passing its package family name to [DeriveAppContainerSidFromAppContainerName](https://learn.microsoft.com/windows/win32/api/userenv/nf-userenv-deriveappcontainersidfromappcontainername).

> **Note:**
> The package family name can be found via the package manifest editor in Visual Studio during development time, via [Partner Center](https://learn.microsoft.com/windows/apps/publish/view-app-identity-details) for applications published through the Microsoft Store, or via the [Get-AppxPackage](https://learn.microsoft.com/powershell/module/appx/get-appxpackage?windowsserver2019-ps\&preserve-view=true) PowerShell command for applications that are already installed.

[This sample](https://learn.microsoft.com/windows/win32/api/securityappcontainer/nf-securityappcontainer-getappcontainernamedobjectpath#examples) demonstrates the basic pattern needed to ACL a named object. To share named objects with packaged applications, build an [EXPLICIT_ACCESS](https://learn.microsoft.com/windows/win32/api/accctrl/ns-accctrl-explicit_access_w) structure for each application:

* `grfAccessMode = GRANT_ACCESS`
* `grfAccessPermissions =` appropriate permissions based on the object and intended usage
    * [Generic Access Rights](https://learn.microsoft.com/windows/win32/secauthz/generic-access-rights)
    * [Synchronization Object Security and Access Rights](https://learn.microsoft.com/windows/win32/sync/synchronization-object-security-and-access-rights)
    * [File Mapping Security and Access Rights](https://learn.microsoft.com/windows/win32/memory/file-mapping-security-and-access-rights)
* `grfInheritance = NO_INHERITANCE`
* `Trustee.TrusteeForm = TRUSTEE_IS_SID`
* `Trustee.TrusteeType = TRUSTEE_IS_USER`
* `Trustee.ptstrName =` the SID  acquired from [DeriveAppContainerSidFromAppContainerName](https://learn.microsoft.com/windows/win32/api/userenv/nf-userenv-deriveappcontainersidfromappcontainername)

By populating the `LPSECURITY_ATTRIBUTES` parameter in `Create` calls with `EXPLICIT_ACCESS` rules for packaged applications, you can grant access to those applications to open the named object.

> **Note:**
> Win32 applications can access all named objects created by packaged applications as long as they qualify the object names when [opening them](#opening-named-objects). They do not need to be granted access.

## Opening named objects

Named objects are opened by passing a name to a corresponding `Open` API:

* [OpenEvent](https://learn.microsoft.com/windows/win32/api/synchapi/nf-synchapi-openeventw)
* [OpenFileMapping](https://learn.microsoft.com/windows/win32/api/memoryapi/nf-memoryapi-openfilemappingw)
* [OpenMutex](https://learn.microsoft.com/windows/win32/api/synchapi/nf-synchapi-openmutexw)
* [OpenSemaphore](https://learn.microsoft.com/windows/win32/api/synchapi/nf-synchapi-opensemaphorew)
* [OpenWaitableTimer](https://learn.microsoft.com/windows/win32/api/synchapi/nf-synchapi-openwaitabletimerw)

Named objects created by a packaged application are created within the namespace of the application, otherwise known as the named object path. When opening named objects created by a packaged application, the object names must be prefixed with the creating application's named object path.

[GetAppContainerNamedObjectPath](https://learn.microsoft.com/windows/win32/api/securityappcontainer/nf-securityappcontainer-getappcontainernamedobjectpath) will return the named object path for a packaged application based on its SID. You can generate the SID for a packaged application by passing its package family name to [DeriveAppContainerSidFromAppContainerName](https://learn.microsoft.com/windows/win32/api/userenv/nf-userenv-deriveappcontainersidfromappcontainername).

> **Note:**
> The package family name can be found via the package manifest editor in Visual Studio during development time, via [Partner Center](https://learn.microsoft.com/windows/apps/publish/view-app-identity-details) for applications published through the Microsoft Store, or via the [Get-AppxPackage](https://learn.microsoft.com/powershell/module/appx/get-appxpackage?windowsserver2019-ps\&preserve-view=true) PowerShell command for applications that are already installed.

When opening named objects created by a packaged application, use the format `<PATH>\<NAME>`:

* Replace `<PATH>` with the creating application's named object path.
* Replace `<NAME>` with the object name.

> **Note:**
> Prefixing object names with `<PATH>` is only required if a packaged application created the object. Named objects created by Win32 applications do not need to be qualified, though access must still be granted when the objects are [created](#creating-named-objects).

## Remarks

Named objects in packaged applications are isolated by default to preserve security and ensure support for application lifecycle events like suspension and termination. Sharing named objects across applications introduces tight binding and versioning constraints and requires each application to be resilient to the lifecycle of others. For these reasons, it is recommended to only share named objects between applications from the same publisher.
