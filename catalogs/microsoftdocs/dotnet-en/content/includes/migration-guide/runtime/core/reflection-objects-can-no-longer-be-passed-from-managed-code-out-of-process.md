### Reflection objects can no longer be passed from managed code to out-of-process DCOM clients

#### Details

Reflection objects can no longer be passed from managed code to out-of-process DCOM clients. The following types are affected:

- [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly)
- [System.Reflection.MemberInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MemberInfo) (and its derived types, including [System.Reflection.FieldInfo](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo), [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo), [System.Type](https://learn.microsoft.com/search/?terms=System.Type), and [System.Reflection.TypeInfo](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo))
- [System.Reflection.MethodBody](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBody)
- [System.Reflection.Module](https://learn.microsoft.com/search/?terms=System.Reflection.Module)
- [System.Reflection.ParameterInfo](https://learn.microsoft.com/search/?terms=System.Reflection.ParameterInfo)

Calls to `IMarshal` for the object return `E_NOINTERFACE`.

#### Suggestion

Update marshaling code to work with non-reflection objects.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6 |
| Type | Runtime |

#### Affected APIs

- [System.Reflection.Assembly](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly)
- [System.Reflection.FieldInfo](https://learn.microsoft.com/search/?terms=System.Reflection.FieldInfo)
- [System.Reflection.MemberInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MemberInfo)
- [System.Reflection.MethodBody](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBody)
- [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo)
- [System.Reflection.Module](https://learn.microsoft.com/search/?terms=System.Reflection.Module)
- [System.Reflection.ParameterInfo](https://learn.microsoft.com/search/?terms=System.Reflection.ParameterInfo)
- [System.Reflection.TypeInfo](https://learn.microsoft.com/search/?terms=System.Reflection.TypeInfo)
- [System.Type](https://learn.microsoft.com/search/?terms=System.Type)

<!--

#### Affected APIs

- `T:System.Reflection.Assembly`
- `T:System.Reflection.FieldInfo`
- `T:System.Reflection.MemberInfo`
- `T:System.Reflection.MethodBody`
- `T:System.Reflection.MethodInfo`
- `T:System.Reflection.Module`
- `T:System.Reflection.ParameterInfo`
- `T:System.Reflection.TypeInfo`
- `T:System.Type`

-->
