### Contract.Invariant or Contract.Requires\<TException> do not consider String.IsNullOrEmpty to be pure

#### Details

For apps that target the .NET Framework 4.6.1, if the invariant contract for [System.Diagnostics.Contracts.Contract.Invariant%2A](https://learn.microsoft.com/search/?terms=System.Diagnostics.Contracts.Contract.Invariant%252A) or the precondition contract for [System.Diagnostics.Contracts.Contract.Requires%2A](https://learn.microsoft.com/search/?terms=System.Diagnostics.Contracts.Contract.Requires%252A) calls the [System.String.IsNullOrEmpty%2A](https://learn.microsoft.com/search/?terms=System.String.IsNullOrEmpty%252A) method, the rewriter emits compiler warning CC1036: &quot;Detected call to method 'System.String.IsNullOrWhiteSpace(System.String)' without [Pure] in method.&quot; This is a compiler warning rather than a compiler error.

#### Suggestion

This behavior was addressed in [GitHub Issue #339](https://github.com/Microsoft/CodeContracts/issues/339). To eliminate this warning, you can download and compile an updated version of the source code for the Code Contracts tool from [GitHub](https://github.com/Microsoft/CodeContracts/blob/master/README.md). Download information is found at the bottom of the page.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6.1 |
| Type | Runtime |

#### Affected APIs

- [System.Diagnostics.Contracts.Contract.Invariant(System.Boolean)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Contracts.Contract.Invariant(System.Boolean))
- [System.Diagnostics.Contracts.Contract.Requires(System.Boolean)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Contracts.Contract.Requires(System.Boolean))

<!--

#### Affected APIs

- `M:System.Diagnostics.Contracts.Contract.Invariant(System.Boolean)`
- `M:System.Diagnostics.Contracts.Contract.Requires(System.Boolean)`

-->
