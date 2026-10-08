# Source code: samples/snippets/cpp/VS_Snippets_CLR_System/system.appdomain.load/cpp/source3.cpp

Complete source file; linked examples may select a region or line range.

```
//<snippet3>
using namespace System;
using namespace System::Reflection;

ref class AppDomain2
{
public:
    static void Main()
    {
        Console::WriteLine("Creating new AppDomain.");
        AppDomain^ domain = AppDomain::CreateDomain("MyDomain", nullptr);

        Console::WriteLine("Host domain: " + AppDomain::CurrentDomain->FriendlyName);
        Console::WriteLine("child domain: " + domain->FriendlyName);
        AppDomain::Unload(domain);
        try
        {
            Console::WriteLine();
            Console::WriteLine("Host domain: " + AppDomain::CurrentDomain->FriendlyName);
            // The following statement creates an exception because the domain no longer exists.
            Console::WriteLine("child domain: " + domain->FriendlyName);
        }
        catch (AppDomainUnloadedException^ e)
        {
            Console::WriteLine(e->GetType()->FullName);
            Console::WriteLine("The appdomain MyDomain does not exist.");
        }
    }
};

int main()
{
    AppDomain2::Main();
}
//</snippet3>

```
