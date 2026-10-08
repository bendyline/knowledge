---
title: whoami
description: Reference article for whoami, which displays user, group and privileges information for the user who is currently logged on to the local system.
ms.topic: reference
ms.author: roharwoo
author: robinharwood
ms.date: 05/23/2025
---

# whoami

The `whoami` command shows information about the user, groups, and privileges for the account currently logged on to the local system. When run without any parameters, `whoami` returns the current domain and user name.

## Syntax

```
whoami [/upn | /fqdn | /logonid]
whoami {[/user] [/groups] [/claims] [/priv]} [/fo <format>] [/nh]
whoami /all [/fo <format>] [/nh]
```

### Parameters

| Parameter | Description |
| --- | --- |
| /upn | Displays the user name in user principal name (UPN) format. |
| /fqdn | Displays the user name in fully qualified domain name (FQDN) format. |
| /logonid | Displays the logon ID of the current user. |
| /user | Displays the current domain and user name and the security identifier (SID). |
| /groups | Displays the user groups to which the current user belongs. |
| /claims | Displays the claims for current user, such as claim name, flags, type and values. |
| /priv | Displays the security privileges of the current user. |
| /fo \<format> | Specifies the output format. Valid values include:<br><br><li> **table** - Displays output in a table. This is the default value. <li> **list** - Displays output in a list. <li> **csv** - Displays output in comma-separated value (CSV) format. </li> |
| /all | Displays all information in the current access token, including the current user name, security identifiers (SID), privileges, and groups that the current user belongs to. |
| /nh | Specifies that the column header shouldn't be displayed in the output. This is valid only for table and CSV formats. |
| /? | Displays help at the command prompt. |

## Examples

To display the domain and user name of the person who is currently logged on to this computer, type:

```
whoami
```

Output similar to the following appears:

```
DOMAIN1\administrator
```

To display all of the information in the current access token, type:

```
whoami /all
```

## Related links

- [Command-Line Syntax Key](command-line-syntax-key.md)
