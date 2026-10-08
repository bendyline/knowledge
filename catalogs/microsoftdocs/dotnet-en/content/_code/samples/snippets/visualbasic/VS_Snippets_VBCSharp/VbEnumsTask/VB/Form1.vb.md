# Source code: samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbEnumsTask/VB/Form1.vb

Complete source file; linked examples may select a region or line range.

```
Public Class Form1
    Public Enum Days
        'NO SUNDAY ON PURPOSE, DON'T KEYWORD THIS
        Monday
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
    End Enum

    Public Enum WorkDays
        'NO MONDAY ON PURPOSE, DON'T KEYWORD THIS
        Saturday
        Sunday = 0
        Tuesday
        Wednesday
        Thursday
        Friday
        Invalid = -1
    End Enum
End Class

```
