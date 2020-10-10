import { make_mesh, make_meshes } from '../src/makemesh';
import { get_meshsize } from '../src/constants';

let mesh1 = make_mesh('1', 0, 0);
console.log(mesh1);
console.assert(mesh1.properties.code === '3022');

let mesh2 = make_mesh('2', 0, 0);
console.assert(mesh2.properties.code === '302200');
console.log(mesh2);

let mesh3 = make_mesh('3', 0, 0);
console.assert(mesh3.properties.code === '30220000');
console.log(mesh3);

let mesh4 = make_mesh('4', 0, 0);
console.assert(mesh4.properties.code === '302200001');
console.log(mesh4);
