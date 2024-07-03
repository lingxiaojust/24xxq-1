<script setup>
import {ref,onMounted}from 'vue';
import*as BABYLON from 'babylonjs';
import * as echarts from 'echarts';
import 'babylonjs-loaders';
import { Plane } from 'babylonjs';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user';
import 'babylonjs-inspector'
const userStore = useUserStore();
const {userlist} =storeToRefs(userStore)

const canvasRef=ref(null);
const showModel = ({ position, target }) => {
  animateCamera("position", new BABYLON.Vector3(...position), camera.value);
  animateCamera("target", new BABYLON.Vector3(...target), camera.value);
}
const animateCamera = (type, newPos, camera) => {
  const speed = 60;
  const frameCount = 240;

  const ease = new BABYLON.CubicEase();
  ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  BABYLON.Animation.CreateAndStartAnimation(
    "animation",
    camera,
    type,
    speed,
    frameCount,
    camera[type],
    newPos,
    0,
    ease
  );
}
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
        // const sphere=BABYLON.MeshBuilder.CreateSphere("shpere",{diameter:2,diameterX:1.8,diameterZ:2.2},
        //     scene);
        //     sphere.position.set(-1,1,0);
            // sphere.material.diffuseColor=new BABYLON.StandardMaterial()
        // const light=new BABYLON.DirectionalLight(
        //     'light',
        //     new BABYLON.Vector3(0,-1,0),
        //     scene
        // )
        const light=new BABYLON.HemisphericLight(
            'light',
            new BABYLON.Vector3(0,-1,0),
            this
        )
        light.intensity=1.5;
        light.diffuse=new BABYLON.Color3(1,1,1);
        light.specular=new BABYLON.Color3(0.1,0,0);
        light.groundColor=new BABYLON.Color3(0.1,0.1,0.1);
        const ground=BABYLON.MeshBuilder.CreateGround("ground",{width:600,height:600},scene);
        // const plane=BABYLON.MeshBuilder.CreatePlane("plane",{size:6},scene)
        // const cylinder=BABYLON.MeshBuilder.CreateCylinder("cylinder",{height:0.2,diameter:2},scene);
        // cylinder.position.set(2,1,0)
        // const cylinder1=BABYLON.MeshBuilder.CreateCylinder("cylinder1",{height:1,diameter:0.2},scene);
        // cylinder1.position.set(2,0.5,0)
        // engine.runRenderLoop(()=>{
        //     scene.render()
        // })
        // const Capsule=BABYLON.MeshBuilder.CreateCapsule("Capsule",{height:1.2,radiusBottom:0.3,radiusTop:0.2
        //     },
        //     scene);
        //     Capsule.position.set(-0.6,2,0)
        // const Capsule1=BABYLON.MeshBuilder.CreateCapsule("Capsule1",{height:1.2,radiusBottom:0.3,radiusTop:0.2},
        // scene);
        // Capsule1.position.set(-1.4,2,0)
        // const sphere1=BABYLON.MeshBuilder.CreateSphere("shpere1",{diameter:0.3},
        //     scene);
        //     sphere1.position.set(-1,1,1.2);
        // const Box=BABYLON.MeshBuilder.CreateBox("Box",{size:1,width:0.3,height:0.1,depth:0.1},
        // scene);
        // Box.position.set(-1,1,-1.2);
        BABYLON.SceneLoader.Append('../src/model/', 'library_draco.glb', scene);
        BABYLON.SceneLoader.Append('/model/', 'library_draco.glb', scene, (meshes) => {
            showModel(animation)
        })
        engine.runRenderLoop(()=>{
            scene.render();
        })
        scene.debugLayer.show({
            embedMode: true,
        });
        window.addEventListener('resize',()=>{
            engine.resize();
        })
    }
}
const autoPlay = (scene) => {
  const play = () => {
    if (loopIndex >= navList.length) loopIndex = 0;
    activeKey.value = loopIndex;
    const { names, animation } = navList[loopIndex];
    // scene.value.selectModel(names, animation);
    selectModel(names, animation, scene);
    // showModel(animation)
    loopIndex++;
  };
  let timer = setInterval(play, 5000);
};
const chart=ref(null);

onMounted(()=>{
    initEngine();
    const myChart=echarts.init(chart.value);
        myChart.setOption({
        title: {
            text: '年龄图表',
            color:'#ffffff',
        },
        tooltip: {},
        xAxis: {
            color:'#ffffff',
            data: userStore.userlist.map(item=>{
                return item.name;
            }),
        },
        yAxis: {
            type:'value',
        },
        series: [
            {
            name: '年龄',
            type: 'bar',
            color:'#ffffff',
            data: userStore.userlist.map(item=>{
                return item.age;
            }),
            },
        ]
        })
});
</script>
<template>
    <div class="all">
        <div ref="chart" class="base-chart-box"></div>
        <canvas ref="canvasRef" class="canvas"></canvas>
    </div>
</template>
<style scoped>
.all{
    width: 100%;
    height: 100%;
    
}
.base-chart-box{
    width: 200px;
    height: 200px;
    position: absolute;
    background-color: rgba(234, 239, 247, 0.347);
    z-index: 2;
}
.canvas{
    /* z-index: -1; */
    position: relative;
    width: 100%;
    height: 100%;
}
</style>