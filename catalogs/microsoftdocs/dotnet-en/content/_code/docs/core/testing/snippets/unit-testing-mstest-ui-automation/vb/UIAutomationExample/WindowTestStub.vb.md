# Source code: docs/core/testing/snippets/unit-testing-mstest-ui-automation/vb/UIAutomationExample/WindowTestStub.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Diagnostics

Namespace Global.Microsoft.VisualStudio.TestTools.UnitTesting.Windows.UIAutomation

    ' Build-only fallback until the MSTest 4.5 preview packages are publicly available.
    Public MustInherit Class WindowTest

        Protected MustOverride Function CreateProcessStartInfo() As ProcessStartInfo

    End Class

End Namespace

```
