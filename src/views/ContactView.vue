<template>
  <section class="page section">
    <SectionHeader
      eyebrow="Contact"
      title="联系方式"
      description="网站只保留 GitHub 与邮箱占位，方便查看源码和进一步沟通。"
    />

    <div class="contact-grid">
      <article class="content-card">
        <h2>GitHub</h2>
        <p>Cherry-zr</p>
        <a class="text-button" href="https://github.com/Cherry-zr" target="_blank" rel="noopener noreferrer">
          打开 GitHub <span aria-hidden="true">→</span>
        </a>
      </article>
      <article class="content-card">
        <h2>邮箱</h2>
        <p>14776743270@163.com</p>
        <a class="text-button" href="mailto:14776743270@163.com">
          发送邮件 <span aria-hidden="true">→</span>
        </a>
      </article>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "../components/SectionHeader.vue";
</script>
