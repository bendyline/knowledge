### Sharing session state with ASP.NET StateServer requires all servers in the web farm to use the same .NET Framework version

#### Details

When enabling [System.Web.SessionState.SessionStateMode.StateServer](https://learn.microsoft.com/search/?terms=System.Web.SessionState.SessionStateMode.StateServer) session state, all of the servers in the given web farm must use the same version of the .NET Framework in order for state to be properly shared.

#### Suggestion

Be sure to upgrade .NET Framework versions on web servers that share state at the same time.

|  | Value |
| :--- | :--- |
| **Scope** | Edge |
| **Version** | 4.5 |
| **Type** | Runtime |

#### Affected APIs

- [System.Web.SessionState.SessionStateMode.StateServer](https://learn.microsoft.com/search/?terms=System.Web.SessionState.SessionStateMode.StateServer)

<!--

#### Affected APIs

- `F:System.Web.SessionState.SessionStateMode.StateServer`

-->
