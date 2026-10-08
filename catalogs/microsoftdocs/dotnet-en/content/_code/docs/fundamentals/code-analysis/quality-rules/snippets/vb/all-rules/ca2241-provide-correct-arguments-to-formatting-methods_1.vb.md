# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca2241-provide-correct-arguments-to-formatting-methods_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca2241

    Class CallsStringFormat

        Sub CallFormat()

            Dim file As String = "file name"
            Dim errors As Integer = 13

            ' Violates the rule.
            Console.WriteLine(String.Format("{0}", file, errors))

            Console.WriteLine(String.Format("{0}: {1}", file, errors))

            ' Violates the rule and generates a FormatException at runtime.
            Console.WriteLine(String.Format("{0}: {1}, {2}", file, errors))

        End Sub

    End Class

End Namespace

```
