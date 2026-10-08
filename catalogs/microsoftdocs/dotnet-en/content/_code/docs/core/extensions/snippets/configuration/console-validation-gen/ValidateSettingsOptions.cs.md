# Source code: docs/core/extensions/snippets/configuration/console-validation-gen/ValidateSettingsOptions.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Options;

namespace ConsoleJson.Example;

[OptionsValidator]
public partial class ValidateSettingsOptions : IValidateOptions<SettingsOptions>
{
}

```
