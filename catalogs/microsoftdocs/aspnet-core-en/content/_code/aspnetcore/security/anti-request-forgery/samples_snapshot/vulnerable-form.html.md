# Source code: aspnetcore/security/anti-request-forgery/samples_snapshot/vulnerable-form.html

Complete source file; linked examples may select a region or line range.

```
<h1>Congratulations! You're a Winner!</h1>
<form action="https://www.good-banking-site.example.com/api/account" method="post">
    <input type="hidden" name="Transaction" value="withdraw" />
    <input type="hidden" name="Amount" value="1000000" />
    <input type="submit" value="Click to collect your prize!" />
</form>

```
