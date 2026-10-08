# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca2217-do-not-mark-enums-with-flagsattribute_2.vb

Complete source file; linked examples may select a region or line range.

```
Imports System
Namespace Samples

    <FlagsAttribute()> _
    Public Enum Days

        None = 0
        Monday = 1
        Tuesday = 2
        Wednesday = 4
        Thursday = 8
        Friday = 16
        All = Monday Or Tuesday Or Wednesday Or Thursday Or Friday

    End Enum
End Namespace

```
