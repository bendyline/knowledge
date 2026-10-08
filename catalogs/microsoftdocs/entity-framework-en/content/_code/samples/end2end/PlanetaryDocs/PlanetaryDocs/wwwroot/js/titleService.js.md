# Source code: samples/end2end/PlanetaryDocs/PlanetaryDocs/wwwroot/js/titleService.js

Complete source file; linked examples may select a region or line range.

```
window.titleService = {
    titleRef: null,
    setTitle: (title) => {
        var _self = window.titleService;
        if (_self.titleRef == null) {
            _self.titleRef = document.getElementsByTagName("title")[0];
        }
        setTimeout(() => _self.titleRef.innerText = title, 0);
    }
}
```
