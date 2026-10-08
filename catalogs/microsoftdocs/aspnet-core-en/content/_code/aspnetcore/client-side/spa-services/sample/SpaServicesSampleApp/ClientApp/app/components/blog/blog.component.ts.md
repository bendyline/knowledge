# Source code: aspnetcore/client-side/spa-services/sample/SpaServicesSampleApp/ClientApp/app/components/blog/blog.component.ts

Complete source file; linked examples may select a region or line range.

```
import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'blog',
    templateUrl: './blog.component.html'
})
export class BlogComponent {
    public blogs: Blog[];

    constructor(http: Http) {
        http.get('/api/blogs').subscribe(result => {
            this.blogs = result.json() as Blog[];
        });
    }
}

interface Blog {
    blogId: number;
    title: string;
    url: string;
}
```
