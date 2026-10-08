---
description: "Learn more about: How to: Add or remove Access Control List entries"
title: "How to: Add or remove Access Control List entries"
ms.date: 06/07/2024
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "ACEs"
  - "ACLs"
  - "access control entries"
  - "I/O, access control list entries"
  - "access control lists"
---
# How to: Add or remove access control list entries

To add or remove access control list (ACL) entries from a file or directory, get the [System.Security.AccessControl.FileSecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.FileSecurity) or [System.Security.AccessControl.DirectorySecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.DirectorySecurity) object from the file or directory. Modify the object, and then apply it back to the file or directory.

## From a file

1. Call the [System.IO.FileSystemAclExtensions.GetAccessControl(System.IO.FileInfo)](https://learn.microsoft.com/search/?terms=System.IO.FileSystemAclExtensions.GetAccessControl(System.IO.FileInfo)) (or, for .NET Framework apps, [System.IO.FileInfo.GetAccessControl*](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.GetAccessControl*)) method to get a [System.Security.AccessControl.FileSecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.FileSecurity) object that contains the current ACL entries of a file.

2. Add or remove ACL entries from the [System.Security.AccessControl.FileSecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.FileSecurity) object obtained in step 1.

3. To apply the changes, pass the [System.Security.AccessControl.FileSecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.FileSecurity) object to the [System.IO.FileSystemAclExtensions.SetAccessControl(System.IO.FileInfo,System.Security.AccessControl.FileSecurity)](https://learn.microsoft.com/search/?terms=System.IO.FileSystemAclExtensions.SetAccessControl(System.IO.FileInfo%2CSystem.Security.AccessControl.FileSecurity)) (or, for .NET Framework apps, [System.IO.FileInfo.SetAccessControl*](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.SetAccessControl*)) method.

## From a directory

1. Call the [System.IO.FileSystemAclExtensions.GetAccessControl(System.IO.DirectoryInfo)](https://learn.microsoft.com/search/?terms=System.IO.FileSystemAclExtensions.GetAccessControl(System.IO.DirectoryInfo)) (or, for .NET Framework apps, [System.IO.DirectoryInfo.GetAccessControl*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.GetAccessControl*)) method to get a [System.Security.AccessControl.DirectorySecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.DirectorySecurity) object that contains the current ACL entries of a directory.

2. Add or remove ACL entries from the [System.Security.AccessControl.DirectorySecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.DirectorySecurity) object obtained in step 1.

3. To apply the changes, pass the [System.Security.AccessControl.DirectorySecurity](https://learn.microsoft.com/search/?terms=System.Security.AccessControl.DirectorySecurity) object to the [System.IO.FileSystemAclExtensions.SetAccessControl(System.IO.DirectoryInfo,System.Security.AccessControl.DirectorySecurity)](https://learn.microsoft.com/search/?terms=System.IO.FileSystemAclExtensions.SetAccessControl(System.IO.DirectoryInfo%2CSystem.Security.AccessControl.DirectorySecurity)) (or, for .NET Framework apps, [System.IO.DirectoryInfo.SetAccessControl*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.SetAccessControl*)) method.

## Example

You must specify a valid user or group account to run this example. The example uses a [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo) object. Use the same procedure for the [System.IO.DirectoryInfo](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo) class.

[IO.File.GetAccessControl-SetAccessControl#1 (complete source file; reference: ./snippets/add-remove-acls/csharp/sample.cs#1)](../../../_code/docs/standard/io/snippets/add-remove-acls/csharp/sample.cs.md)
[IO.File.GetAccessControl-SetAccessControl#1 (complete source file; reference: ./snippets/add-remove-acls/vb/sample.vb#1)](../../../_code/docs/standard/io/snippets/add-remove-acls/vb/sample.vb.md)
