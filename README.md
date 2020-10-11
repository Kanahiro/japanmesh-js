## usage

```
npm install japanmesh-maker
```

```javascript
const japanmesh_maker = require('japanmesh-maker');
// make_meshes(meshnum:string, extent(option):[min_lon, min_lat, max_lon, max_lat])
let meshes = make_meshes('1', [122.0, 20.0, 130.0, 30.0]);
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
        // more 118 features follows...
    ]
}
*/

```

Please set mesh-making extent in mesh sizes over '2' because they have too many meshes to calculate.
Making too many meshes may cause to drop performance.

```javascript
// YOU SHOULD NOT USE LIKE THIS
//let meshes = make_meshes('3'); // 7987200 features

// YOU SHOLD
let meshes = make_meshes('3', [122.0, 20.0, 130.0, 30.0]);
```


## test

```
npm install ts-node
ts-node test/test.ts
```