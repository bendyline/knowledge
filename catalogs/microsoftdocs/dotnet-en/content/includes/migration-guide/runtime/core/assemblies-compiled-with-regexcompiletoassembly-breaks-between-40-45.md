### Assemblies compiled with Regex.CompileToAssembly breaks between 4.0 and 4.5

#### Details

If an assembly of compiled regular expressions is built with the .NET Framework 4.5 but targets the .NET Framework 4, attempting to use one of the regular expressions in that assembly on a system with .NET Framework 4 installed throws an exception.

#### Suggestion

To work around this problem, you can do either of the following:

- Build the assembly that contains the regular expressions with the .NET Framework 4.
- Use an interpreted regular expression.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Text.RegularExpressions.Regex.CompileToAssembly(System.Text.RegularExpressions.RegexCompilationInfo\[\],System.Reflection.AssemblyName)](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.CompileToAssembly(System.Text.RegularExpressions.RegexCompilationInfo%5B%5D%2CSystem.Reflection.AssemblyName))
- [System.Text.RegularExpressions.Regex.CompileToAssembly(System.Text.RegularExpressions.RegexCompilationInfo\[\],System.Reflection.AssemblyName,System.Reflection.Emit.CustomAttributeBuilder\[\])](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.CompileToAssembly(System.Text.RegularExpressions.RegexCompilationInfo%5B%5D%2CSystem.Reflection.AssemblyName%2CSystem.Reflection.Emit.CustomAttributeBuilder%5B%5D))
- [System.Text.RegularExpressions.Regex.CompileToAssembly(System.Text.RegularExpressions.RegexCompilationInfo\[\],System.Reflection.AssemblyName,System.Reflection.Emit.CustomAttributeBuilder\[\],System.String)](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.CompileToAssembly(System.Text.RegularExpressions.RegexCompilationInfo%5B%5D%2CSystem.Reflection.AssemblyName%2CSystem.Reflection.Emit.CustomAttributeBuilder%5B%5D%2CSystem.String))

<!--

#### Affected APIs

- `M:System.Text.RegularExpressions.Regex.CompileToAssembly(System.Text.RegularExpressions.RegexCompilationInfo[],System.Reflection.AssemblyName)`
- `M:System.Text.RegularExpressions.Regex.CompileToAssembly(System.Text.RegularExpressions.RegexCompilationInfo[],System.Reflection.AssemblyName,System.Reflection.Emit.CustomAttributeBuilder[])`
- `M:System.Text.RegularExpressions.Regex.CompileToAssembly(System.Text.RegularExpressions.RegexCompilationInfo[],System.Reflection.AssemblyName,System.Reflection.Emit.CustomAttributeBuilder[],System.String)`

-->
