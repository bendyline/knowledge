### Custom EncoderFallbackBuffer instances cannot fall back recursively

Custom [System.Text.EncoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer) instances cannot fall back recursively. The implementation of [System.Text.EncoderFallbackBuffer.GetNextChar](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.GetNextChar) must result in a character sequence that is convertible to the destination encoding. Otherwise, an exception occurs.

#### Change description

During a character-to-byte transcoding operation, the runtime detects ill-formed or nonconvertible UTF-16 sequences and provides those characters to the [System.Text.EncoderFallbackBuffer.Fallback%2A](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.Fallback%252A) method. The `Fallback` method determines which characters should be substituted for the original nonconvertible data, and these characters are drained by calling [System.Text.EncoderFallbackBuffer.GetNextChar%2A](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.GetNextChar%252A) in a loop.

The runtime then attempts to transcode these substitution characters to the target encoding. If this operation succeeds, the runtime continues transcoding from where it left off in the original input string.

Previously, custom implementations of [System.Text.EncoderFallbackBuffer.GetNextChar](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.GetNextChar) can return character sequences that are not convertible to the destination encoding. If the substituted characters cannot be transcoded to the target encoding, the runtime invokes the [System.Text.EncoderFallbackBuffer.Fallback%2A](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.Fallback%252A) method once again with the substitution characters, expecting the [System.Text.EncoderFallbackBuffer.GetNextChar](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.GetNextChar) method to return a new substitution sequence. This process continues until the runtime eventually sees a well-formed, convertible substitution, or until a maximum recursion count is reached.

Starting with .NET Core 3.0, custom implementations of [System.Text.EncoderFallbackBuffer.GetNextChar](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.GetNextChar) must return character sequences that are convertible to the destination encoding. If the substituted characters cannot be transcoded to the target encoding, an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) is thrown. The runtime will no longer make recursive calls into the [System.Text.EncoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer) instance.

This behavior only applies when all three of the following conditions are met:

- The runtime detects an ill-formed UTF-16 sequence or a UTF-16 sequence that cannot be converted to the target encoding.
- A custom [System.Text.EncoderFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback) has been specified.
- The custom [System.Text.EncoderFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback) attempts to substitute a new ill-formed or nonconvertible UTF-16 sequence.

#### Version introduced

3.0

#### Recommended action

Most developers needn't take any action.

If an application uses a custom [System.Text.EncoderFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback) and [System.Text.EncoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer) class, ensure the implementation of [System.Text.EncoderFallbackBuffer.Fallback%2A](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.Fallback%252A) populates the fallback buffer with well-formed UTF-16 data that is directly convertible to the target encoding when the [System.Text.EncoderFallbackBuffer.Fallback%2A](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.Fallback%252A) method is first invoked by the runtime.

#### Category

Core .NET libraries

#### Affected APIs

- [System.Text.EncoderFallbackBuffer.Fallback%2A](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.Fallback%252A)
- [System.Text.EncoderFallbackBuffer.GetNextChar](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.GetNextChar)

<!--

#### Affected APIs

- `Overload:System.Text.EncoderFallbackBuffer.Fallback`
- `M:System.Text.EncoderFallbackBuffer.GetNextChar`

-->
