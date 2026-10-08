# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/vb/all-rules/ca1712-do-not-prefix-enum-values-with-type-name_1.vb

Complete source file; linked examples may select a region or line range.

```
Imports System

Namespace ca1712

    Enum DigitalImageMode

        DigitalImageModeBitmap = 0
        DigitalImageModeGrayscale = 1
        DigitalImageModeIndexed = 2
        DigitalImageModeRGB = 3

    End Enum

    Enum DigitalImageMode2

        Bitmap = 0
        Grayscale = 1
        Indexed = 2
        RGB = 3

    End Enum

End Namespace

```
