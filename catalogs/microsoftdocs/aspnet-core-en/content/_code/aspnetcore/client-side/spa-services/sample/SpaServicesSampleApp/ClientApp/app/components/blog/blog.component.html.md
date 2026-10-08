# Source code: aspnetcore/client-side/spa-services/sample/SpaServicesSampleApp/ClientApp/app/components/blog/blog.component.html

Complete source file; linked examples may select a region or line range.

```
<h1>Blogs</h1>

<p *ngIf="!blogs"><em>Loading...</em></p>

<table class='table' *ngIf="blogs">
    <thead>
        <tr>
            <td>Title</td>
            <th>Url</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let blog of blogs">
            <td><a [routerLink]="['/blog', blog.blogId]">{{ blog.title }}</a></td>
            <td>{{ blog.url }}</td>
        </tr>
    </tbody>
</table>
```
