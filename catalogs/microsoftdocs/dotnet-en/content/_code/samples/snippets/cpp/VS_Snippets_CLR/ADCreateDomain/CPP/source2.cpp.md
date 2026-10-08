# Source code: samples/snippets/cpp/VS_Snippets_CLR/ADCreateDomain/CPP/source2.cpp

Complete source file; linked examples may select a region or line range.

```
//<snippet2>
using namespace System;
using namespace System::Reflection;

ref class AppDomain1
{
public:
    static void Main()
    {
        Console::WriteLine("Creating new AppDomain.");
        AppDomain^ domain = AppDomain::CreateDomain("MyDomain");

        Console::WriteLine("Host domain: " + AppDomain::CurrentDomain->FriendlyName);
        Console::WriteLine("child domain: " + domain->FriendlyName);
    }
};

int main()
{
    AppDomain1::Main();
}
//</snippet2>

```
