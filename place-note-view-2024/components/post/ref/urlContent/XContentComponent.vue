<script setup lang="ts">

const props = defineProps({
    html: {
        type: String,
        default: undefined
    },
})

const mounted = ref(false)

onMounted(async () => {
    // マウントされたらXの埋め込みスクリプトを読み込む
    const head = document.getElementsByTagName("head")[0] as HTMLElement;
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.type = "text/javascript";
    head.appendChild(script);
    await new Promise(resolve => setTimeout(resolve, 500))
    mounted.value = true
});

</script>

<template>
    <div v-html="props.html" v-show="mounted"></div>
</template>
