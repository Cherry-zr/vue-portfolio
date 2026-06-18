<template>
  <section class="page section">
    <SectionHeader
      eyebrow="About"
      title="关于我"
      description="这个页面用于补充个人背景和学习方向，重点仍然放在项目展示。"
    />

    <div class="two-column">
      <article class="content-card">
        <h2>个人简介</h2>
        <p>
          我正在准备 Web 前端开发实习岗位，主要围绕 Vue3、前端工程化、组件化开发、
          接口联调和静态部署进行项目实践。作品集中的项目来自本机源码和课程/实训实践，
          目标是让面试官快速了解我的编码能力、业务理解和项目交付意识。
        </p>
      </article>

      <article class="content-card">
        <h2>教育背景</h2>
        <dl class="info-list">
          <div>
            <dt>学校</dt>
            <dd>待补充</dd>
          </div>
          <div>
            <dt>专业</dt>
            <dd>计算机科学与技术</dd>
          </div>
          <div>
            <dt>求职方向</dt>
            <dd>Web 前端开发实习</dd>
          </div>
        </dl>
      </article>
    </div>

    <article class="content-card">
      <h2>当前关注方向</h2>
      <div class="focus-grid">
        <div>
          <strong>前端工程化</strong>
          <p>使用 Vite、Vue Router、Pinia 组织可维护的前端项目结构。</p>
        </div>
        <div>
          <strong>真实业务页面</strong>
          <p>围绕商品、订单、用户、后台审核等业务模块构建可演示页面。</p>
        </div>
        <div>
          <strong>部署与交付</strong>
          <p>使用 GitHub Pages、Nginx 和 README 文档完成项目展示闭环。</p>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import SectionHeader from "../components/SectionHeader.vue";
</script>
