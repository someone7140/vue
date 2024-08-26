<script setup lang="ts">

const props = defineProps({
    html: {
        type: String,
        default: undefined
    },
})

const { loadScriptAsync } = useDisplayUtil()
const mounted = ref(false)

onMounted(async () => {
    // マウントされたらXの埋め込みスクリプトを読み込む
    await loadScriptAsync(document, "https://platform.twitter.com/widgets.js", 500)
    mounted.value = true
});

</script>

<template>
    <div v-html="props.html" v-show="mounted"></div>
</template>
