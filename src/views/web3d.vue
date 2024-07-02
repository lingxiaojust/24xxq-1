<script setup>
import {ref,onMounted}from 'vue';
import*as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { Plane } from 'babylonjs';

const canvasRef=ref(null);
const initEngine=async()=>{
    if(canvasRef.value){
        const engine=new BABYLON.Engine(canvasRef.value,true);
        const scene=new BABYLON.Scene(engine);
        const camera=new BABYLON.ArcRotateCamera(
            'camera',
            0,
            0,
            10,
            BABYLON.Vector3.Zero(),
            scene,
        )
        camera.attachControl(canvasRef.value);
        camera.position=new BABYLON.Vector3(0,6,-6);
        const sphere=BABYLON.MeshBuilder.CreateSphere("shpere",{diameter:2,diameterX:1.8,diameterZ:2.2},
            scene);
            sphere.position.set(-1,1,0);
            // sphere.material.diffuseColor=new BABYLON.StandardMaterial()
        // const light=new BABYLON.DirectionalLight(
        //     'light',
        //     new BABYLON.Vector3(0,-1,0),
        //     scene
        // )
        const light=new BABYLON.HemisphericLight(
            'light',
            new BABYLON.Vector3(0,-1,0),
            scene
        )
        light.intensity=1.5;
        light.diffuse=new BABYLON.Color3(1,1,1);
        light.specular=new BABYLON.Color3(0.1,0,0);
        light.groundColor=new BABYLON.Color3(0.1,0.1,0.1);
        const ground=BABYLON.MeshBuilder.CreateGround("ground",{width:600,height:600},scene);
        // const plane=BABYLON.MeshBuilder.CreatePlane("plane",{size:6},scene)
        const cylinder=BABYLON.MeshBuilder.CreateCylinder("cylinder",{height:0.2,diameter:2},scene);
        cylinder.position.set(2,1,0)
        const cylinder1=BABYLON.MeshBuilder.CreateCylinder("cylinder1",{height:1,diameter:0.2},scene);
        cylinder1.position.set(2,0.5,0)
        engine.runRenderLoop(()=>{
            scene.render()
        })
        const Capsule=BABYLON.MeshBuilder.CreateCapsule("Capsule",{height:1.2,radiusBottom:0.3,radiusTop:0.2
            },
            scene);
            Capsule.position.set(-0.6,2,0)
        const Capsule1=BABYLON.MeshBuilder.CreateCapsule("Capsule1",{height:1.2,radiusBottom:0.3,radiusTop:0.2},
        scene);
        Capsule1.position.set(-1.4,2,0)
        const sphere1=BABYLON.MeshBuilder.CreateSphere("shpere1",{diameter:0.3},
            scene);
            sphere1.position.set(-1,1,1.2);
        // const Box=BABYLON.MeshBuilder.CreateBox("Box",{size:1,width:0.3,height:0.1,depth:0.1},
        // scene);
        // Box.position.set(-1,1,-1.2);
        BABYLON.SceneLoader.Append('../src/model/', 'library_draco.glb', scene);

        window.addEventListener('resize',()=>{
            engine.resize();
        })
    }
}
onMounted(()=>{
    initEngine();
});
</script>
<template>
    <div >
        <canvas ref="canvasRef" class="canvas"></canvas>
    </div>
</template>
<style scoped>
.canvas{
    width: 100%;
    height: 500px;
}
</style>