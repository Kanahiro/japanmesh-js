## usage

```
npm install japanmesh
```

```javascript
const japanmesh = require('japanmesh');
let geojson = japanmesh.make_meshes('2');
/*
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [122, 20],
                        [122, 20.666666666666668],
                        [123, 20.666666666666668],
                        [123, 20],
                        [122, 20]
                    ]
                ]
            },
            "properties": { "code": "3022" }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [123, 20],
                        [123, 20.666666666666668],
                        [124, 20.666666666666668],
                        [124, 20],
                        [123, 20]
                    ]
                ]
            },
            "properties": { "code": "3023" }
        },
        // more 79870 features follows...
    ]
}
*/

```

## test

```
npm install ts-node
ts-node test/test.ts
```