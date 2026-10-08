# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca2217-do-not-mark-enums-with-flagsattribute_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace Samples

    ' Violates this rule    
    <FlagsAttribute()> _
    Public Enum Color

        None = 0
        Red = 1
        Orange = 3
        Yellow = 4

    End Enum
End Namespace
```
