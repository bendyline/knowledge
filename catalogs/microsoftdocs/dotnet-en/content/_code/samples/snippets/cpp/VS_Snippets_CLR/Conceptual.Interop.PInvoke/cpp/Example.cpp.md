# Source code: samples/snippets/cpp/VS_Snippets_CLR/Conceptual.Interop.PInvoke/cpp/Example.cpp

Complete source file; linked examples may select a region or line range.

```
// <Snippet1>
using namespace System::Runtime::InteropServices;

typedef void* HWND;

[DllImport("user32", CharSet=CharSet::Auto)]
extern "C" IntPtr MessageBox(HWND hWnd,
                             String* pText,
                             String* pCaption,
                             unsigned int uType);

void main() 
{
     String* pText = L"Hello World!";
     String* pCaption = L"Platform Invoke Sample";
     MessageBox(0, pText, pCaption, 0);
}
// </Snippet1>

```
