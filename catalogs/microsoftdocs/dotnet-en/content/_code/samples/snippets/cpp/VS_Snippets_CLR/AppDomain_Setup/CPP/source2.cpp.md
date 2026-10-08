# Source code: samples/snippets/cpp/VS_Snippets_CLR/AppDomain_Setup/CPP/source2.cpp

Complete source file; linked examples may select a region or line range.

```
//<snippet2>
using namespace System;
using namespace System::Reflection;

ref class AppDomain3
{
public:
    static void Main()
    {
        // Create the new application domain.
        AppDomain^ domain = AppDomain::CreateDomain("MyDomain", nullptr);

        // Output to the console.
        Console::WriteLine("Host domain: " + AppDomain::CurrentDomain->FriendlyName);
        Console::WriteLine("New domain: " + domain->FriendlyName);
        Console::WriteLine("Application base is: " + domain->BaseDirectory);
        Console::WriteLine("Relative search path is: " + domain->RelativeSearchPath);
        Console::WriteLine("Shadow copy files is set to: " + domain->ShadowCopyFiles);
        AppDomain::Unload(domain);
    }
};

int main()
{
    AppDomain3::Main();
}
//</snippet2>

```
