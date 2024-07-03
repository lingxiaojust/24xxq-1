<script setup>
import {ref,onMounted,reactive}from 'vue';
import*as BABYLON from 'babylonjs';
import * as echarts from 'echarts';
import 'babylonjs-loaders';
import { Plane } from 'babylonjs';
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import navList from "../utils/navList";
import { useUserStore } from '../store/user';
import 'babylonjs-inspector'
const userStore = useUserStore();
const {userlist} =storeToRefs(userStore)

const canvasRef=ref(null);
const camera = ref(null);
const activeKey = ref(0);
  const lightFlag = ref(false);
  const light = ref(null);
  const cacheName = reactive([]);
  const position = reactive({
    x: 0,
    y: 1,
    z: 0
  });
  const target = reactive({
    x: 0,
    y: 0,
    z: 0
  });

  const switchLight = () => {
    if (light.value.intensity === 1 ) {
      light.value.intensity = 0.1;
      lightFlag.value = false;
    } else {
      light.value.intensity = 1;
      lightFlag.value = true;
    }
  }
const setPosition = () => {
    animateCamera("position", new BABYLON.Vector3(0,10,0), camera.value);
  };
const setTarget = () => {
    if (camera.value) {
      animateCamera("target", new BABYLON.Vector3(target.x, target.y, target.z), camera.value);
    }
  };
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
const selectModel = (names, animation, scene) => {
    scene.meshes.forEach((mesh) => {
      if (cacheName.includes(mesh.name)) {
        mesh.material.albedoColor = scene.cacheMeshColor;
      }
      if (names.includes(mesh.name)) {
        scene.cacheMeshColor = mesh.material.albedoColor;
        cacheName.push(...names);
        mesh.material.albedoColor = new BABYLON.Color3(0, 221 / 255, 1);
        showModel(animation);
      }
    });
  }
const initEngine=async()=>{
    if(canvasRef.value){
        const engine=new BABYLON.Engine(canvasRef.value,true);
        const scene=new BABYLON.Scene(engine);
        camera.value = new BABYLON.ArcRotateCamera(
            'camera',
            Math.PI / 10,
            Math.PI / 3,
            20,
            BABYLON.Vector3.Zero(),
            scene,
        )
        camera.value.attachControl(canvasRef.value)
        camera.value.lowerBetaLimit = 0;
        camera.value.upperBetaLimit = Math.PI / 2;
        camera.value.lowerRadiusLimit = 3;
        camera.value.upperRadiusLimit = 40;
        // const sphere=BABYLON.MeshBuilder.CreateSphere("shpere",{diameter:2,diameterX:1.8,diameterZ:2.2},
        //     scene);
        //     sphere.position.set(-1,1,0);
            // sphere.material.diffuseColor=new BABYLON.StandardMaterial()
        // const light=new BABYLON.DirectionalLight(
        //     'light',
        //     new BABYLON.Vector3(0,-1,0),
        //     scene
        // )
        light.value = new BABYLON.HemisphericLight(
            'light',
            new BABYLON.Vector3(0,1,0),
            this
        )
        light.intensity=1.5;
        light.value.specular = new BABYLON.Color3(1, 1, 0);
        const ground=BABYLON.MeshBuilder.CreateGround("ground",{width:600,height:600},scene);
        const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);  // 设置漫反射颜色为黑色
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // 设置高光颜色为黑色
        ground.material = groundMaterial;
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
       // BABYLON.SceneLoader.Append('../src/model/', 'library_draco.glb', scene);
        BABYLON.SceneLoader.Append('../src/model/', 'library_draco.glb', scene, (meshes) => {
            const myElement = scene.getMeshById("lpMaleG");
            if (myElement) {
                myElement.actionManager = new BABYLON.ActionManager(scene);
                myElement.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                message.info({
                    content: `姓名：${userStore.userlist[1].name}，年龄：${userStore.userlist[1].age}岁，学号：${userStore.userlist[1].id}`,
                    duration: 1 // 显示1秒后自动关闭
                });
                const { names, animation } = navList.find(item => item.names.includes('lpMaleG'));
                selectModel(names, animation, scene);
                }));
            }
            navList.forEach(navItem => {
                const mesh = scene.getMeshById(navItem.names[0]);
                if (mesh) {
                    mesh.actionManager = new BABYLON.ActionManager(scene);
                    mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                        selectModel(navItem.names, navItem.animation, scene);
                        message.info({
                            content: `区域：${navItem.text}`,
                            duration: 1 // 显示1秒后自动关闭
                        });
                    }));
                }
            });
            // const myElement1 = scene.getMeshById("Etageres_Books");
            // if (myElement1) {
            //     myElement1.actionManager = new BABYLON.ActionManager(scene);
            //     myElement1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            //     selectModel(navList[0].names, navList[0].animation, scene);
            //     message.info({
            //         content: `区域：${navList[0].text}`,
            //         duration: 1 // 显示1秒后自动关闭
            //     });
            // }));
            // }
            // const myElement2 = scene.getMeshById("Bureau_Accueil");
            // if (myElement2) {
            //     myElement2.actionManager = new BABYLON.ActionManager(scene);
            //     myElement2.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            //     selectModel(navList[1].names, navList[1].animation, scene);
            //     message.info({
            //         content: `区域：${navList[1].text}`,
            //         duration: 1 // 显示1秒后自动关闭
            //     });
            // }));
            // }

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

const chart=ref(null);

onMounted(()=>{
    initEngine();
    const myChart=echarts.init(chart.value);
        myChart.setOption({
        title: {
            text: '年龄图表',
            subtext: '图书馆入馆统计',
            left: 'center'
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
        <a-space
          direction="vertical"
          align="start"
        >
          <a-space>
            <a-button class="light-btn" @click="switchLight">{{ lightFlag ? '关灯' : '开灯' }}</a-button>
            <a-button type="primary" class="light-btn" @click="setPosition">俯视</a-button>
          </a-space>
        </a-space>
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
    background-color: rgba(228, 234, 245, 0.635);
    z-index: 2;
}
.canvas{
    /* z-index: -1; */
    position: relative;
    width: 100%;
    height: 100%;
}
</style>