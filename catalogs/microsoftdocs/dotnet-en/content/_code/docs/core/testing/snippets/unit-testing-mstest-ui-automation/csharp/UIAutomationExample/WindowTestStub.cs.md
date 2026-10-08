# Source code: docs/core/testing/snippets/unit-testing-mstest-ui-automation/csharp/UIAutomationExample/WindowTestStub.cs

Complete source file; linked examples may select a region or line range.

```
using System.Diagnostics;

namespace Microsoft.VisualStudio.TestTools.UnitTesting.Windows.UIAutomation;

// Build-only fallback until the MSTest 4.5 preview packages are publicly available.
public abstract class WindowTest
{
    protected abstract ProcessStartInfo CreateProcessStartInfo();
}

```
