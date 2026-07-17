<template>
  <header class="site-header">
    <RouterLink class="brand" to="/" aria-label="返回首页">
      Portfolio
    </RouterLink>

    <nav class="main-nav" aria-label="主导航">
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/about">关于我</RouterLink>
      <RouterLink to="/projects">项目</RouterLink>
      <RouterLink to="/skills">技能</RouterLink>
      <RouterLink to="/contact">联系</RouterLink>
    </nav>

    <a class="header-link" href="https://github.com/Cherry-zr" target="_blank" rel="noopener noreferrer">
      GitHub
    </a>
  </header>
</template>
