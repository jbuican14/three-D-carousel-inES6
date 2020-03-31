var container = document.getElementById('header'); 
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 200); 
var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(300, 250);
renderer.render(scene, camera);
container.appendChild(renderer.domElement); 

// console.log(THREE); 

var loader = new THREE.SVGLoader();

loader.load(
    '../assets/myAvatar.svg',
    function(data) {
        console.log(data); 
        var paths = data;
        var group = new THREE.Group();
        // group.scale.multiplyScalar(0.25);
        // group.position.x = -70;
        // group.position.y = 70;
        // group.scale.y *= -1;

        // console.log(paths);
        for( let i = 0; i < paths.length; i++) {
            var path = paths[i];
             
            var material = new THREE.MeshBasicMaterial( {
                color: path.color,
                side: THREE.DoubleSide,
                depthWrite: false
            });

            var shapes = path.toShapes(true);
            console.log('shapes', shapes); 

            for( let j = 0; j < shapes.length; j++) {
                let shape = shapes [j];
                var geometry = new THREE.ShapeBufferGeometry(shape);
                var mesh = new THREE.Mesh(geometry, material);
                group.add(mesh);
            }
        }

        scene.add(mesh);
    }, 
    function (xhr) {
        console.log(xhr.loaded/ xhr.total * 100) + '%loaded';
    },
    function(error) {
        console.log('error happened'); 
    }
)