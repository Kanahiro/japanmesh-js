// メッシュ番号順で経緯度でのメッシュサイズを定義:(x, y)
type MESH_INFO = {
    parent: string;
    ratio: number;
};

const FIRST_MESH_SIZE: [number, number] = [1, 2 / 3];
const MESH_SIZES: { [key: string]: MESH_INFO } = {
    '1': { parent: '1', ratio: 1 },
    '2': { parent: '1', ratio: 8 },
    '3': { parent: '2', ratio: 10 },
    '4': { parent: '3', ratio: 2 },
    '5': { parent: '4', ratio: 2 },
    '6': { parent: '5', ratio: 2 },
    '100': { parent: '3', ratio: 10 },
    '50': { parent: '100', ratio: 2 },
    '10': { parent: '100', ratio: 10 },
};

function get_meshsize(meshnum: string): [number, number] {
    if (meshnum === '1') {
        return FIRST_MESH_SIZE;
    }
    const meshinfo = MESH_SIZES[meshnum];
    const parentMeshsize = get_meshsize(meshinfo.parent);
    const meshsize: [number, number] = [
        parentMeshsize[0] / meshinfo.ratio,
        parentMeshsize[1] / meshinfo.ratio,
    ];
    return meshsize;
}

export { MESH_SIZES, get_meshsize };
