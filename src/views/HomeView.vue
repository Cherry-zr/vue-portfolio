<template>
  <div>
    <section class="hero section">
      <div class="hero__intro">
        <p class="eyebrow">Web Frontend Portfolio</p>
        <h1>Hi, I'm <span>陈乐臻</span></h1>
        <p class="hero__role">Web 前端开发实习</p>
        <p class="hero__text">
          专注于 Vue3 + Spring Boot 全栈开发，熟悉前端工程化、项目开发和部署流程，
          能够将真实业务拆解为清晰、可维护、可展示的 Web 应用。
        </p>

        <div class="hero__contact">
          <span>Location · China</span>
          <span>Email · 14776743270@163.com</span>
          <span>GitHub · Cherry-zr</span>
        </div>

        <div class="hero__actions">
          <RouterLink class="btn btn-primary" to="/projects">查看项目</RouterLink>
          <RouterLink class="btn btn-secondary" to="/demo/campus-market">查看主项目 Demo</RouterLink>
        </div>
      </div>

      <aside class="featured-panel">
        <div class="panel-header">
          <div>
            <p class="panel-label">Featured Project</p>
            <h2>{{ featured.title }}</h2>
          </div>
          <span class="status-pill">本地项目 · 静态演示</span>
        </div>

        <p class="panel-copy">
          {{ featured.summary }}
        </p>

        <ul class="feature-list">
          <li v-for="feature in featured.features.slice(0, 3)" :key="feature">{{ feature }}</li>
        </ul>

        <CampusPreview />
      </aside>
    </section>

    <section class="stack-strip">
      <h2>核心技术栈</h2>
      <TagList :tags="coreSkills" />
    </section>

    <section class="section">
      <div class="section-row">
        <SectionHeader
          eyebrow="Selected Work"
          title="精选项目"
          description="项目均来自本机源码或本地实践，在线部分使用静态 mock 数据展示。"
        />
        <RouterLink class="text-button" to="/projects">查看全部项目 <span aria-hidden="true">→</span></RouterLink>
      </div>

      <div class="project-grid">
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      </div>
    </section>

    <section class="about-strip">
      <div>
        <span class="about-kicker">关于我</span>
        <strong>教育背景</strong>
        <p>计算机相关专业（待补充）</p>
      </div>
      <div>
        <span class="about-kicker">项目经验</span>
        <strong>3 个完整项目</strong>
        <p>前端工程、全栈业务、数据分析</p>
      </div>
      <div>
        <span class="about-kicker">展示重点</span>
        <strong>项目能力</strong>
        <p>功能拆解、页面实现、部署说明</p>
      </div>
      <div>
        <span class="about-kicker">联系方式</span>
        <strong>GitHub / 邮箱</strong>
        <p>用于作品沟通与源码查看</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import CampusPreview from "../components/CampusPreview.vue";
import ProjectCard from "../components/ProjectCard.vue";
import SectionHeader from "../components/SectionHeader.vue";
import TagList from "../components/TagList.vue";
import { coreSkills } from "../data/skills";
import { useProjectStore } from "../stores/projectStore";

const projectStore = useProjectStore();
const { projects, featuredProject: featured } = storeToRefs(projectStore);
</script>
