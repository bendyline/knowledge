### EncoderParameter ctor is obsolete

#### Details

The [System.Drawing.Imaging.EncoderParameter.%23ctor(System.Drawing.Imaging.Encoder,System.Int32,System.Int32,System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.EncoderParameter.%2523ctor(System.Drawing.Imaging.Encoder%2CSystem.Int32%2CSystem.Int32%2CSystem.Int32%2CSystem.Int32)) constructor is obsolete now and will introduce build warnings if used.

#### Suggestion

Although the [System.Drawing.Imaging.EncoderParameter.%23ctor(System.Drawing.Imaging.Encoder,System.Int32,System.Int32,System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.EncoderParameter.%2523ctor(System.Drawing.Imaging.Encoder%2CSystem.Int32%2CSystem.Int32%2CSystem.Int32%2CSystem.Int32))constructor will continue to work, the following constructor should be used instead to avoid the obsolete build warning when re-compiling code with .NET Framework  4.5 tools: [System.Drawing.Imaging.EncoderParameter.%23ctor(System.Drawing.Imaging.Encoder,System.Int32,System.Drawing.Imaging.EncoderParameterValueType,System.IntPtr)](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.EncoderParameter.%2523ctor(System.Drawing.Imaging.Encoder%2CSystem.Int32%2CSystem.Drawing.Imaging.EncoderParameterValueType%2CSystem.IntPtr)).

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Retargeting |

#### Affected APIs

- [System.Drawing.Imaging.EncoderParameter.%23ctor(System.Drawing.Imaging.Encoder,System.Int32,System.Int32,System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Drawing.Imaging.EncoderParameter.%2523ctor(System.Drawing.Imaging.Encoder%2CSystem.Int32%2CSystem.Int32%2CSystem.Int32%2CSystem.Int32))
