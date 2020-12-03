<template>
  <div>
    <div class="wrapper">
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="ball">
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="ball"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
.wrapper {
  text-align: center;
  margin: 0 auto;
  width: 200px;
  height: 200px;
  position: relative;
  -webkit-filter: url(#ball);
  filter: url(#ball);
  .ball {
    display: block;
    width: 50px;
    height: 50px;
    overflow: hidden;
    filter: blur(10px);
    border-radius: 50%;
    background: linear-gradient(to right, $violet, $violet_3);
    position: absolute;
    top: 75px;
    left: 75px;
  }
  .ball:nth-child(1) {
    animation: ball1 2s infinite;
  }
  .ball:nth-child(2) {
    animation: ball2 1.5s infinite;
  }
  .ball:nth-child(3) {
    animation: ball3 2.5s infinite;
  }
  .ball:nth-child(4) {
    animation: ball4 1s infinite;
  }
}

@keyframes ball1 {
  0% {
    transform: translateX(-35px);
  }
  40% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-35px);
  }
}
@keyframes ball2 {
  0% {
    transform: translateX(35px);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(35px);
  }
}
@keyframes ball3 {
  0% {
    transform: translateY(-35px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-35px);
  }
}
@keyframes ball4 {
  0% {
    transform: translateY(35px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(35px);
  }
}
</style>
