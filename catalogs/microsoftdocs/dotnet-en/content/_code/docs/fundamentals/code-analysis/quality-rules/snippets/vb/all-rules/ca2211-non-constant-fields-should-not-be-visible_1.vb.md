# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca2211-non-constant-fields-should-not-be-visible_1.vb

Complete source file; linked examples may select a region or line range.

```

Imports System

Namespace ca2211

    Public Class SomeStaticFields
        ' Violates rule: AvoidNonConstantStatic;
        ' the field is public and not a literal.
        Public Shared publicField As DateTime = DateTime.Now

        ' Satisfies rule: AvoidNonConstantStatic.
        Public Shared ReadOnly literalField As DateTime = DateTime.Now

        ' Satisfies rule: NonConstantFieldsShouldNotBeVisible;
        ' the field is private.
        Private Shared privateField As DateTime = DateTime.Now
    End Class
End Namespace

```
