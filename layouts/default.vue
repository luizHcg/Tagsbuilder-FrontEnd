<template>
  <div>
    <Nuxt />
  </div>
</template>

<style lang="scss">
html {
  font-family: Roboto, "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.border-radius-default {
  border-radius: 15%;
}

.hover-text-pdf {
  i {
    color: #dc3545;
  }

  &:hover {
    i {
      color: white;
    }
  }
}

.m-w50px {
  max-width: 50px;
}

.m-w80px {
  max-width: 80px;
}

.m-w100px {
  max-width: 100px;
}

.m-w180px {
  max-width: 180px;
}

@for $i from 1 through 120 {
  .text-#{$i} {
    font-size: 1px * $i;
  }
}
</style>
