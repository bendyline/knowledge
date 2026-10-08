# Source code: docs/core/testing/snippets/unit-testing-mstest-ui-automation/csharp/UIAutomationExample/MyAppTests.cs

Complete source file; linked examples may select a region or line range.

```
// <WindowTestClass>
using System.Diagnostics;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.VisualStudio.TestTools.UnitTesting.Windows.UIAutomation;

[STATestClass]
public sealed class MyAppTests : WindowTest
{
    protected override ProcessStartInfo CreateProcessStartInfo()
        => new(@"C:\MyApp\MyApp.exe");
}
// </WindowTestClass>

```
