<template>
    <div class="leading-normal landingFade tracking-normal text-gray-900" style="font-family: 'Source Sans Pro', sans-serif;">
        <div class="h-screen pb-14 bg-right bg-cover" style="background-image:url('bg.svg');">
            <!--Nav-->
            <div class="w-full container mx-auto p-6">
                <div class="w-full flex items-center justify-between">
                    <a class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"  href="#">
                        RampRider
                    </a>

                    <div class="flex w-1/2 justify-end content-center">
                        <a class="inline-block text-blue-300 no-underline hover:text-indigo-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 " data-tippy-content="#" href="https://www.instagram.com/rampridercom/">
                            <svg class="fill-current h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            ><path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path></svg>
                        </a>
                    </div>

                </div>
            </div>

            <!--Main-->
            <div class="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">

                <!--Left Col-->
                <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                    <h1 class="my-4 text-3xl md:text-5xl text-purple-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">RampRider Beta Out Now!</h1>
                    <span class="leading-normal text-base md:text-2xl text-center mb-8 md:text-left slide-in-bottom-subtitle"><p>Do you spend hours at the skatepark shredding up your shoes? It's time to amp up your riding experience with RampRider! <a v-if="open === false" @click="about()" class="text-purple-800" style="cursor: pointer;">Learn More</a><a v-if="open === true" @click="about()" class="text-purple-800">See Less</a></p></span>
                    <span v-if="open === true" class="leading-normal text-base md:text-2xl text-center mb-8 md:text-left slide-in-bottom-context"><p>Ramp Rider allows you to find skateparks or street spots nearby (Or anywhere!), write reviews, and even share a skatepark or spot of your own to the world! Shred more places with RampRider!</p></span>

                    <p class="text-blue-400 font-bold pb-8 lg:pb-6 text-center md:text-left fade-in">Give it a try:</p>
                    <div class="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl" @click="SetPage('LoginPage')">Try It Out!</button>
                    </div>

                </div>

                <!--Footer-->
                <div class="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
                    <a class="text-gray-500 no-underline hover:no-underline" href="#">&copy; RampRider 2022</a>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open: false,
        };
    },
    methods: {
        SetPage(page) {
            this.$emit('SetPage', page);
        },
        about() {
            if (this.open === false) {
                this.open = true;
            } else {
                this.open = false;
            }
        },
  },
};
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

    .slide-in-bottom{
        -webkit-animation:slide-in-bottom .5s cubic-bezier(.25,.46,.45,.94) both;
        animation:slide-in-bottom .5s cubic-bezier(.25,.46,.45,.94) both
    }
    .slide-in-bottom-h1{
        -webkit-animation:slide-in-bottom .5s cubic-bezier(.25,.46,.45,.94) .5s both;
        animation:slide-in-bottom .5s cubic-bezier(.25,.46,.45,.94) .5s both
    }
    .slide-in-bottom-subtitle{
        -webkit-animation:slide-in-bottom .5s cubic-bezier(.25,.46,.45,.94) .75s both;
        animation:slide-in-bottom .5s cubic-bezier(.25,.46,.45,.94) .75s both
    }
    .slide-in-bottom-context{
        -webkit-animation:fade-in cubic-bezier(.39,.575,.565,1.000) 1s both;
        animation:fade-in cubic-bezier(.39,.575,.565,1.000) 1s both
    }
    .fade-in{
        -webkit-animation:fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) 1s both;
        animation:fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) 1s both
    }
    .bounce-top-icons{
        -webkit-animation:bounce-top .9s 1s both;
        animation:bounce-top .9s 1s both
    }
    @-webkit-keyframes slide-in-bottom{
        0%{
            -webkit-transform:translateY(1000px);
            transform:translateY(1000px);
            opacity:0
        }
        100%{
            -webkit-transform:translateY(0);
            transform:translateY(0);
            opacity:1
        }
    }
    @keyframes slide-in-bottom{
        0%{
            -webkit-transform:translateY(1000px);
            transform:translateY(1000px);
            opacity:0
        }
        100%{
            -webkit-transform:translateY(0);
            transform:translateY(0);
            opacity:1
        }
    }
    @-webkit-keyframes bounce-top{
        0%{
            -webkit-transform:translateY(-45px);
            transform:translateY(-45px);
            -webkit-animation-timing-function:ease-in;
            animation-timing-function:ease-in;
            opacity:1
        }
        24%{
            opacity:1
        }
        40%{
            -webkit-transform:translateY(-24px);
            transform:translateY(-24px);
            -webkit-animation-timing-function:ease-in;
            animation-timing-function:ease-in
        }
        65%{
            -webkit-transform:translateY(-12px);
            transform:translateY(-12px);
            -webkit-animation-timing-function:ease-in;
            animation-timing-function:ease-in
        }
        82%{
            -webkit-transform:translateY(-6px);
            transform:translateY(-6px);
            -webkit-animation-timing-function:ease-in;
            animation-timing-function:ease-in
        }
        93%{
            -webkit-transform:translateY(-4px);
            transform:translateY(-4px);
            -webkit-animation-timing-function:ease-in;
            animation-timing-function:ease-in
        }
        25%,55%,75%,87%{
            -webkit-transform:translateY(0);
            transform:translateY(0);
            -webkit-animation-timing-function:ease-out;
            animation-timing-function:ease-out
        }
        100%{
            -webkit-transform:translateY(0);
            transform:translateY(0);
            -webkit-animation-timing-function:ease-out;
            animation-timing-function:ease-out;
            opacity:1
        }
    }
    @keyframes bounce-top{
        0%{
            -webkit-transform:translateY(-45px);
            transform:translateY(-45px);
            -webkit-animation-timing-function:ease-in;
            animation-timing-function:ease-in;
            opacity:1
        }
        24%{
            opacity:1
        }
        40%{
            -webkit-transform:translateY(-24px);
            transform:translateY(-24px);
            -webkit-animation-timing-function:ease-in;
            animation-timing-function:ease-in
        }
        65%{
            -webkit-transform:translateY(-12px);
            transform:translateY(-12px);
            -webkit-animation-timing-function:ease-in;
            animation-timing-function:ease-in
        }
        82%{
            -webkit-transform:translateY(-6px);
            transform:translateY(-6px);
            -webkit-animation-timing-function:ease-in;
            animation-timing-function:ease-in
        }
        93%{
            -webkit-transform:translateY(-4px);
            transform:translateY(-4px);
            -webkit-animation-timing-function:ease-in;
            animation-timing-function:ease-in
        }
        25%,55%,75%,87%{
            -webkit-transform:translateY(0);
            transform:translateY(0);
            -webkit-animation-timing-function:ease-out;
            animation-timing-function:ease-out
        }
        100%{
            -webkit-transform:translateY(0);
            transform:translateY(0);
            -webkit-animation-timing-function:ease-out;
            animation-timing-function:ease-out;
            opacity:1
        }
    }
    @-webkit-keyframes fade-in{
        0%{
            opacity:0
        }
        100%{
            opacity:1
        }
    }
    @keyframes fade-in{
        0%{
            opacity:0
        }
        100%{
            opacity:1
        }
    }

</style>
