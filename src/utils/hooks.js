import { ref, onMounted } from "vue";
export function useMouse(){
    let x=ref(0);
    let y=ref(0);

    onMounted(() => {
        window.addEventListener('mousemove', (e) => {
            x.value = e.screenX;
            y.value = e.screenY;
        })
    });
    return {x,y};
}
