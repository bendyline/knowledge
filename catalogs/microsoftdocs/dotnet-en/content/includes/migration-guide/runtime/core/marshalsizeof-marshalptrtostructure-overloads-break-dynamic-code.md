### Marshal.SizeOf and Marshal.PtrToStructure overloads break dynamic code

#### Details

Beginning in the .NET Framework 4.5.1, dynamically binding to the methods [System.Runtime.InteropServices.Marshal.SizeOf%60%601](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.SizeOf%2560%25601), [System.Runtime.InteropServices.Marshal.SizeOf%60%601(%60%600)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.SizeOf%2560%25601(%2560%25600)), [System.Runtime.InteropServices.Marshal.PtrToStructure(System.IntPtr,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.PtrToStructure(System.IntPtr%2CSystem.Object)), [System.Runtime.InteropServices.Marshal.PtrToStructure(System.IntPtr,System.Type)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.PtrToStructure(System.IntPtr%2CSystem.Type)), [System.Runtime.InteropServices.Marshal.PtrToStructure%60%601(System.IntPtr)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.PtrToStructure%2560%25601(System.IntPtr)), or [System.Runtime.InteropServices.Marshal.PtrToStructure%60%601(System.IntPtr,%60%600)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.PtrToStructure%2560%25601(System.IntPtr%2C%2560%25600)), (via Windows PowerShell, IronPython, or the C# dynamic keyword, for example) can result in `MethodInvocationExceptions` because new overloads of these methods have been added that may be ambiguous to the scripting engines.

#### Suggestion

Update scripts to clearly indicate which overload should be used. This can typically done by explicitly casting the methods' type parameters as [System.Type](https://learn.microsoft.com/search/?terms=System.Type). See [this link](https://support.microsoft.com/kb/2909958/) for more detail and examples of how to workaround the issue.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5.1 |
| Type | Runtime |

#### Affected APIs

Not detectable via API analysis.

<!--

#### Affected APIs

Not detectable via API analysis.

-->
