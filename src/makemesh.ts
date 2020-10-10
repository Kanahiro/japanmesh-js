import { Feature, FeatureCollection } from 'geojson';
import { MESH_SIZES, get_meshsize } from './constants';

interface MeshFeature extends Feature {
    properties: {
        code: string;
    };
}

interface MeshFeatureCollection extends FeatureCollection {
    features: Array<MeshFeature>;
}

// メッシュコード生成範囲
const MINIMUM_LON = 122.0;
const MAXIMUM_LON = 154.0;
const MINIMUM_LAT = 20.0;
const MAXIMUM_LAT = 46.0;

function get_start_offset(
    meshnum: string,
    lonlat: [number, number],
): [number, number] {
    const meshsize = get_meshsize(meshnum);

    let x_offset = 0;
    while (lonlat[0] >= MINIMUM_LON + meshsize[0] * (x_offset + 1)) {
        x_offset += 1;
    }

    let y_offset = 0;
    while (lonlat[1] >= MINIMUM_LAT + meshsize[1] * (y_offset + 1)) {
        y_offset += 1;
    }

    return [x_offset, y_offset];
}

function get_end_offset(
    meshnum: string,
    lonlat: [number, number],
): [number, number] {
    let meshsize = get_meshsize(meshnum);

    let x_offset = 0;
    while (lonlat[0] <= MAXIMUM_LON - meshsize[0] * (x_offset + 1)) {
        x_offset += 1;
    }
    let y_offset = 0;
    while (lonlat[1] <= MAXIMUM_LAT - meshsize[1] * (y_offset + 1)) {
        y_offset += 1;
    }

    return [x_offset, y_offset];
}

function get_meshcode(meshnum: string, x: number, y: number): string {
    const ratio = MESH_SIZES[meshnum].ratio;
    let meshcode: string;
    if (meshnum === '1') {
        return '';
    } else if (meshnum === '4' || meshnum === '5' || meshnum === '6') {
        meshcode = String((y % ratio) * 2 + (x % ratio) + 1);
    } else {
        meshcode = String(y % ratio) + String(x % ratio);
    }

    const parent = MESH_SIZES[meshnum].parent;
    if (parent === '1') {
        return meshcode;
    } else {
        return (
            get_meshcode(parent, Math.floor(x / ratio), Math.floor(y / ratio)) +
            meshcode
        );
    }
}

function make_mesh(meshnum: string, x: number, y: number): MeshFeature {
    const meshsize = get_meshsize(meshnum);
    const left_lon = MINIMUM_LON + x * meshsize[0];
    const bottom_lat = MINIMUM_LAT + y * meshsize[1];
    const right_lon = MINIMUM_LON + (x + 1) * meshsize[0];
    const top_lat = MINIMUM_LAT + (y + 1) * meshsize[1];

    let base_meshcode =
        String(Math.floor(bottom_lat * 1.5)) +
        String(Math.floor(left_lon)).substr(1);

    return {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [left_lon, bottom_lat],
                    [left_lon, top_lat],
                    [right_lon, top_lat],
                    [right_lon, bottom_lat],
                    [left_lon, bottom_lat],
                ],
            ],
        },
        properties: {
            code: base_meshcode + get_meshcode(meshnum, x, y),
        },
    };
}

function make_meshes(
    meshnum: string,
    extent: [number, number, number, number] | null = null,
): MeshFeatureCollection {
    const meshsize = MESH_SIZES[meshnum];
    const x_mesh_count = Math.ceil(
        (MAXIMUM_LON - MINIMUM_LON) / get_meshsize(meshnum)[0],
    );
    const y_mesh_count = Math.ceil(
        (MAXIMUM_LAT - MINIMUM_LAT) / get_meshsize(meshnum)[1],
    );

    let start_offset = [0, 0];
    let end_offset = [0, 0];
    if (extent) {
        const min_lon = Math.min(extent[0], extent[2]);
        const min_lat = Math.min(extent[1], extent[3]);
        const max_lon = Math.max(extent[0], extent[2]);
        const max_lat = Math.max(extent[1], extent[3]);

        // [左下経緯度, 右上経緯度]にソート
        const start_lonlat: [number, number] = [min_lon, min_lat];
        const end_lonlat: [number, number] = [max_lon, max_lat];

        start_offset = get_start_offset(meshnum, start_lonlat);
        end_offset = get_end_offset(meshnum, end_lonlat);
    }

    let geojson: MeshFeatureCollection = {
        type: 'FeatureCollection' as 'FeatureCollection',
        features: [] as Array<MeshFeature>,
    };

    for (let y = start_offset[1]; y < y_mesh_count - end_offset[1]; y++) {
        for (let x = start_offset[1]; x < x_mesh_count - end_offset[1]; x++) {
            geojson.features.push(make_mesh(meshnum, x, y));
        }
    }
    return geojson;
}

export { make_meshes, get_meshcode, make_mesh };
