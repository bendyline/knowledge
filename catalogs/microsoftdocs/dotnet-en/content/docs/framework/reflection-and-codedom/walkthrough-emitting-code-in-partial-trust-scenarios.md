---
title: "Walkthrough: Emitting Code in Partial Trust Scenarios"
description: See how to emit code in partial trust scenarios. Reflection emit uses the same APIs, but some features need special permissions in partial trusted code.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "reflection emit, anonymously hosted dynamic methods"
  - "partial trust, reflection"
  - "partial trust, emitting dynamic methods"
  - "reflection emit, partial trust scenarios"
  - "anonymously hosted dynamic methods [.NET Framework]"
  - "emitting dynamic assemblies,partial trust scenarios"
  - "reflection emit, dynamic methods"
  - "dynamic methods"
ms.topic: tutorial
---
# Walkthrough: Emitting Code in Partial Trust Scenarios

Reflection emit uses the same API set in full or partial trust, but some features require special permissions in partially trusted code. In addition, reflection emit has a feature, anonymously hosted dynamic methods, that is designed to be used with partial trust and by security-transparent assemblies.

> **Note:**
> Before .NET Framework 3.5, emitting code required [System.Security.Permissions.ReflectionPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermission) with the [System.Security.Permissions.ReflectionPermissionFlag.ReflectionEmit](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag.ReflectionEmit) flag. This permission is included by default in the `FullTrust` and `Intranet` named permission sets, but not in the `Internet` permission set. Therefore, a library could be used from partial trust only if it had the [System.Security.SecurityCriticalAttribute](https://learn.microsoft.com/search/?terms=System.Security.SecurityCriticalAttribute) attribute and also executed an [System.Security.PermissionSet.Assert*](https://learn.microsoft.com/search/?terms=System.Security.PermissionSet.Assert*) method for [System.Security.Permissions.ReflectionPermissionFlag.ReflectionEmit](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag.ReflectionEmit). Such libraries require careful security review because coding errors could result in security holes. The .NET Framework 3.5 allows code to be emitted in partial trust scenarios without issuing any security demands, because generating code is not inherently a privileged operation. That is, the generated code has no more permissions than the assembly that emits it. This enables libraries that emit code to be security-transparent and removes the need to assert [System.Security.Permissions.ReflectionPermissionFlag.ReflectionEmit](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag.ReflectionEmit), so that writing a secure library does not require such a thorough security review.

This walkthrough illustrates the following tasks:

- [Setting up a simple sandbox for testing partially trusted code](#Setting_up).

  > **Important:**
  > This is a simple way to experiment with code in partial trust. To run code that actually comes from untrusted locations, see [How to: Run Partially Trusted Code in a Sandbox](https://learn.microsoft.com/previous-versions/dotnet/framework/code-access-security/how-to-run-partially-trusted-code-in-a-sandbox).

- [Running code in partially trusted application domains](#Running_code).

- [Using anonymously hosted dynamic methods to emit and execute code in partial trust](#Using_methods).

For more information about emitting code in partial trust scenarios, see [Security Issues in Reflection Emit](security-issues-in-reflection-emit.md).

For a complete listing of the code shown in these procedures, see the [Example section](#Example) at the end of this walkthrough.

<a name="Setting_up"></a>

## Setting up Partially Trusted Locations

The following two procedures show how to set up locations from which you can test code with partial trust.

- The first procedure shows how to create a sandboxed application domain in which code is granted Internet permissions.

- The second procedure shows how to add [System.Security.Permissions.ReflectionPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermission) with the [System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess) flag to a partially trusted application domain, to enable access to private data in assemblies of equal or lesser trust.

### Creating Sandboxed Application Domains

To create an application domain in which your assemblies run with partial trust, you must specify the set of permissions to be granted to the assemblies by using the [System.AppDomain.CreateDomain%28System.String%2CSystem.Security.Policy.Evidence%2CSystem.AppDomainSetup%2CSystem.Security.PermissionSet%2CSystem.Security.Policy.StrongName%5B%5D%29](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateDomain%2528System.String%252CSystem.Security.Policy.Evidence%252CSystem.AppDomainSetup%252CSystem.Security.PermissionSet%252CSystem.Security.Policy.StrongName%255B%255D%2529) method overload to create the application domain. The easiest way to specify the grant set is to retrieve a named permission set from security policy.

The following procedure creates a sandboxed application domain that runs your code with partial trust, to test scenarios in which emitted code can access only public members of public types. A subsequent procedure shows how to add [System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess), to test scenarios in which emitted code can access nonpublic types and members in assemblies that are granted equal or lesser permissions.

#### To create an application domain with partial trust

1. Create a permission set to grant to the assemblies in the sandboxed application domain. In this case, the permission set of the Internet zone is used.

    [HowToEmitCodeInPartialTrust#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
    [HowToEmitCodeInPartialTrust#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

2. Create an [System.AppDomainSetup](https://learn.microsoft.com/search/?terms=System.AppDomainSetup) object to initialize the application domain with an application path.

    > **Important:**
    > For simplicity, this code example uses the current folder. To run code that actually comes from the Internet, use a separate folder for the untrusted code, as described in [How to: Run Partially Trusted Code in a Sandbox](https://learn.microsoft.com/previous-versions/dotnet/framework/code-access-security/how-to-run-partially-trusted-code-in-a-sandbox).

    [HowToEmitCodeInPartialTrust#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
    [HowToEmitCodeInPartialTrust#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

3. Create the application domain, specifying the application domain setup information and the grant set for all assemblies that execute in the application domain.

    [HowToEmitCodeInPartialTrust#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
    [HowToEmitCodeInPartialTrust#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

    The last parameter of the [System.AppDomain.CreateDomain%28System.String%2CSystem.Security.Policy.Evidence%2CSystem.AppDomainSetup%2CSystem.Security.PermissionSet%2CSystem.Security.Policy.StrongName%5B%5D%29](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateDomain%2528System.String%252CSystem.Security.Policy.Evidence%252CSystem.AppDomainSetup%252CSystem.Security.PermissionSet%252CSystem.Security.Policy.StrongName%255B%255D%2529) method overload enables you to specify a set of assemblies that are to be granted full trust, instead of the grant set of the application domain. You do not have to specify the .NET Framework assemblies that your application uses, because those assemblies are in the global assembly cache. Assemblies in the global assembly cache are always fully trusted. You can use this parameter to specify strong-named assemblies that are not in the global assembly cache.

### Adding RestrictedMemberAccess to Sandboxed Domains

Host applications can allow anonymously hosted dynamic methods to have access to private data in assemblies that have trust levels equal to or less than the trust level of the assembly that emits the code. To enable this restricted ability to skip just-in-time (JIT) visibility checks, the host application adds a [System.Security.Permissions.ReflectionPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermission) object with the [System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess) (RMA) flag to the grant set.

For example, a host might grant Internet applications Internet permissions plus RMA, so that an Internet application can emit code that accesses private data in its own assemblies. Because the access is limited to assemblies of equal or lesser trust, an Internet application cannot access members of fully trusted assemblies such as .NET Framework assemblies.

> **Note:**
> To prevent elevation of privilege, stack information for the emitting assembly is included when anonymously hosted dynamic methods are constructed. When the method is invoked, the stack information is checked. Thus, an anonymously hosted dynamic method that is invoked from fully trusted code is still limited to the trust level of the emitting assembly.

#### To create an application domain with partial trust plus RMA

1. Create a new [System.Security.Permissions.ReflectionPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermission) object with the [System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess) (RMA) flag, and use the [System.Security.PermissionSet.SetPermission*](https://learn.microsoft.com/search/?terms=System.Security.PermissionSet.SetPermission*) method to add the permission to the grant set.

    [HowToEmitCodeInPartialTrust#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
    [HowToEmitCodeInPartialTrust#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

    The [System.Security.PermissionSet.AddPermission*](https://learn.microsoft.com/search/?terms=System.Security.PermissionSet.AddPermission*) method adds the permission to the grant set if it is not already included. If the permission is already included in the grant set, the specified flags are added to the existing permission.

    > **Note:**
    > RMA is a feature of anonymously hosted dynamic methods. When ordinary dynamic methods skip JIT visibility checks, the emitted code requires full trust.

2. Create the application domain, specifying the application domain setup information and the grant set.

    [HowToEmitCodeInPartialTrust#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
    [HowToEmitCodeInPartialTrust#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

<a name="Running_code"></a>

## Running Code in Sandboxed Application Domains

The following procedure explains how to define a class by using methods that can be executed in an application domain, how to create an instance of the class in the domain, and how to execute its methods.

#### To define and execute a method in an application domain

1. Define a class that derives from [System.MarshalByRefObject](https://learn.microsoft.com/search/?terms=System.MarshalByRefObject). This enables you to create instances of the class in other application domains and to make method calls across application domain boundaries. The class in this example is named `Worker`.

    [HowToEmitCodeInPartialTrust#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
    [HowToEmitCodeInPartialTrust#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

2. Define a public method that contains the code you want to execute. In this example, the code emits a simple dynamic method, creates a delegate to execute the method, and invokes the delegate.

    [HowToEmitCodeInPartialTrust#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
    [HowToEmitCodeInPartialTrust#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

3. In your main program, get the display name of your assembly. This name is used when you create instances of the `Worker` class in the sandboxed application domain.

    [HowToEmitCodeInPartialTrust#14 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
    [HowToEmitCodeInPartialTrust#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

4. In your main program, create a sandboxed application domain, as described in [the first procedure](#Setting_up) in this walkthrough. You do not have to add any permissions to the `Internet` permission set, because the `SimpleEmitDemo` method uses only public methods.

5. In your main program, create an instance of the `Worker` class in the sandboxed application domain.

    [HowToEmitCodeInPartialTrust#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
    [HowToEmitCodeInPartialTrust#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

    The [System.AppDomain.CreateInstanceAndUnwrap*](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateInstanceAndUnwrap*) method creates the object in the target application domain and returns a proxy that can be used to call the properties and methods of the object.

    > **Note:**
    > If you use this code in Visual Studio, you must change the name of the class to include the namespace. By default, the namespace is the name of the project. For example, if the project is "PartialTrust", the class name must be "PartialTrust.Worker".

6. Add code to call the `SimpleEmitDemo` method. The call is marshalled across the application domain boundary, and the code is executed in the sandboxed application domain.

    [HowToEmitCodeInPartialTrust#13 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#13)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
    [HowToEmitCodeInPartialTrust#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

<a name="Using_methods"></a>

## Using Anonymously Hosted Dynamic Methods

Anonymously hosted dynamic methods are associated with a transparent assembly that is provided by the system. Therefore, the code they contain is transparent. Ordinary dynamic methods, on the other hand, must be associated with an existing module (whether directly specified or inferred from an associated type), and take their security level from that module.

> **Note:**
> The only way to associate a dynamic method with the assembly that provides anonymous hosting is to use the constructors that are described in the following procedure. You cannot explicitly specify a module in the anonymous hosting assembly.

Ordinary dynamic methods have access to the internal members of the module they are associated with, or to the private members of the type they are associated with. Because anonymously hosted dynamic methods are isolated from other code, they do not have access to private data. However, they do have a restricted ability to skip JIT visibility checks to gain access to private data. This ability is limited to assemblies that have trust levels equal to or less than the trust level of the assembly that emits the code.

To prevent elevation of privilege, stack information for the emitting assembly is included when anonymously hosted dynamic methods are constructed. When the method is invoked, the stack information is checked. An anonymously hosted dynamic method that is invoked from fully trusted code is still limited to the trust level of the assembly that emitted it.

#### To use anonymously hosted dynamic methods

- Create an anonymously hosted dynamic method by using a constructor that does not specify an associated module or type.

  [HowToEmitCodeInPartialTrust#15 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#15)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
  [HowToEmitCodeInPartialTrust#15 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#15)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

  If an anonymously hosted dynamic method uses only public types and methods, it does not require restricted member access and does not have to skip JIT visibility checks.

  No special permissions are required to emit a dynamic method, but the emitted code requires the permissions that are demanded by the types and methods it uses. For example, if the emitted code calls a method that accesses a file, it requires [System.Security.Permissions.FileIOPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermission). If the trust level does not include that permission, a security exception is thrown when the emitted code is executed. The code shown here emits a dynamic method that uses only the [System.Console.WriteLine*](https://learn.microsoft.com/search/?terms=System.Console.WriteLine*) method. Therefore, the code can be executed from partially trusted locations.

- Alternatively, create an anonymously hosted dynamic method with restricted ability to skip JIT visibility checks, by using the [System.Reflection.Emit.DynamicMethod.%23ctor%28System.String%2CSystem.Type%2CSystem.Type%5B%5D%2CSystem.Boolean%29](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.DynamicMethod.%2523ctor%2528System.String%252CSystem.Type%252CSystem.Type%255B%255D%252CSystem.Boolean%2529) constructor and specifying `true` for the `restrictedSkipVisibility` parameter.

  [HowToEmitCodeInPartialTrust#16 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#16)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
  [HowToEmitCodeInPartialTrust#16 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#16)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

  The restriction is that the anonymously hosted dynamic method can access private data only in assemblies with trust levels equal to or less than the trust level of the emitting assembly. For example, if the dynamic method is executing with Internet trust, it can access private data in other assemblies that are also executing with Internet trust, but it cannot access private data of .NET Framework assemblies. .NET Framework assemblies are installed in the global assembly cache and are always fully trusted.

  Anonymously hosted dynamic methods can use this restricted ability to skip JIT visibility checks only if the host application grants [System.Security.Permissions.ReflectionPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermission) with the [System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess) flag. The demand for this permission is made when the method is invoked.

  > **Note:**
  > Call stack information for the emitting assembly is included when the dynamic method is constructed. Therefore, the demand is made against the permissions of the emitting assembly instead of the assembly that invokes the method. This prevents the emitted code from being executed with elevated permissions.

  The [complete code example](#Example) at the end of this walkthrough demonstrates the use and limitations of restricted member access. Its `Worker` class includes a method that can create anonymously hosted dynamic methods with or without the restricted ability to skip visibility checks, and the example shows the result of executing this method in application domains that have different trust levels.

  > **Note:**
  > The restricted ability to skip visibility checks is a feature of anonymously hosted dynamic methods. When ordinary dynamic methods skip JIT visibility checks, they must be granted full trust.

<a name="Example"></a>

## Example

### Description

The following code example demonstrates the use of the [System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess) flag to allow anonymously hosted dynamic methods to skip JIT visibility checks, but only when the target member is at an equal or lower level of trust than the assembly that emits the code.

The example defines a `Worker` class that can be marshalled across application domain boundaries. The class has two `AccessPrivateMethod` method overloads that emit and execute dynamic methods. The first overload emits a dynamic method that calls the private `PrivateMethod` method of the `Worker` class, and it can emit the dynamic method with or without JIT visibility checks. The second overload emits a dynamic method that accesses an `internal` property (`Friend` property in Visual Basic) of the [System.String](https://learn.microsoft.com/search/?terms=System.String) class.

The example uses a helper method to create a grant set limited to `Internet` permissions, and then creates an application domain, using the [System.AppDomain.CreateDomain%28System.String%2CSystem.Security.Policy.Evidence%2CSystem.AppDomainSetup%2CSystem.Security.PermissionSet%2CSystem.Security.Policy.StrongName%5B%5D%29](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateDomain%2528System.String%252CSystem.Security.Policy.Evidence%252CSystem.AppDomainSetup%252CSystem.Security.PermissionSet%252CSystem.Security.Policy.StrongName%255B%255D%2529) method overload to specify that all code that executes in the domain uses this grant set. The example creates an instance of the `Worker` class in the application domain, and executes the `AccessPrivateMethod` method two times.

- The first time the `AccessPrivateMethod` method is executed, JIT visibility checks are enforced. The dynamic method fails when it is invoked, because JIT visibility checks prevent it from accessing the private method.

- The second time the `AccessPrivateMethod` method is executed, JIT visibility checks are skipped. The dynamic method fails when it is compiled, because the `Internet` grant set does not grant sufficient permissions to skip visibility checks.

The example adds [System.Security.Permissions.ReflectionPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermission) with [System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess) to the grant set. The example then creates a second domain, specifying that all code that executes in the domain is granted the permissions in the new grant set. The example creates an instance of the `Worker` class in the new application domain, and executes both overloads of the `AccessPrivateMethod` method.

- The first overload of the `AccessPrivateMethod` method is executed, and JIT visibility checks are skipped. The dynamic method compiles and executes successfully, because the assembly that emits the code is the same as the assembly that contains the private method. Therefore, the trust levels are equal. If the application that contains the `Worker` class had several assemblies, the same process would succeed for any one of those assemblies, because they would all be at the same trust level.

- The second overload of the `AccessPrivateMethod` method is executed, and again JIT visibility checks are skipped. This time the dynamic method fails when it is compiled, because it tries to access the `internal` `FirstChar` property of the [System.String](https://learn.microsoft.com/search/?terms=System.String) class. The assembly that contains the [System.String](https://learn.microsoft.com/search/?terms=System.String) class is fully trusted. Therefore, it is at a higher level of trust than the assembly that emits the code.

This comparison shows how [System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess](https://learn.microsoft.com/search/?terms=System.Security.Permissions.ReflectionPermissionFlag.RestrictedMemberAccess) enables partially trusted code to skip visibility checks for other partially trusted code without compromising the security of trusted code.

### Code

[HowToEmitCodeInPartialTrust#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/cs/source.cs.md)
[HowToEmitCodeInPartialTrust#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEmitCodeInPartialTrust/vb/source.vb.md)

## Compiling the Code

- If you build this code example in Visual Studio, you must change the name of the class to include the namespace when you pass it to the [System.AppDomain.CreateInstanceAndUnwrap*](https://learn.microsoft.com/search/?terms=System.AppDomain.CreateInstanceAndUnwrap*) method. By default, the namespace is the name of the project. For example, if the project is "PartialTrust", the class name must be "PartialTrust.Worker".

## See also

- [Security Issues in Reflection Emit](security-issues-in-reflection-emit.md)
- [How to: Run Partially Trusted Code in a Sandbox](https://learn.microsoft.com/previous-versions/dotnet/framework/code-access-security/how-to-run-partially-trusted-code-in-a-sandbox)
