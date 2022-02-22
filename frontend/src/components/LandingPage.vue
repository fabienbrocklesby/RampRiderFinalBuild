<template>
    <div class="landingFade py-44 text-center text-2xl font-semibold">
        <h1>Landing Page</h1>
    </div>
</template>

<script>
</script>

<style lang="scss">
    .landingFade {
        animation: fadeInAnimation ease .4s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    }
    @keyframes fadeInAnimation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
