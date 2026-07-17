<template>
  <div>
    <section class="hero section">
      <div class="hero__intro">
        <p class="eyebrow">Web Frontend Portfolio</p>
        <h1>Hi, I'm <span>陈乐臻</span></h1>
        <p class="hero__role">Web 前端开发实习</p>
        <p class="hero__text">
          专注于 Vue 3 前端开发，具备移动端 H5、后台管理、接口联调、状态管理和前端工程化实践，
          同时能够完成 Spring Boot 后端开发与完整项目交付。
        </p>

        <div class="hero__contact">
          <span>Location · China</span>
          <span>Email · 14776743270@163.com</span>
          <span>GitHub · Cherry-zr</span>
        </div>

        <div class="hero__actions">
          <RouterLink class="btn btn-primary" :to="`/projects/${featured.slug}`">查看项目详情</RouterLink>
          <a
            v-if="featured.githubUrl"
            class="btn btn-secondary"
            :href="featured.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub 源码
          </a>
        </div>
      </div>

      <aside class="featured-panel">
        <div class="panel-header">
          <div>
            <p class="panel-label">Featured Project</p>
            <h2>{{ featured.title }}</h2>
          </div>
          <span class="status-pill">{{ featured.status }}</span>
        </div>

        <p class="panel-copy">
          {{ featured.summary }}
        </p>

        <ul class="feature-list">
          <li v-for="feature in featured.features.slice(0, 3)" :key="feature">{{ feature }}</li>
        </ul>

        <CityPartyPreview :screenshots="featured.screenshots" />
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
          description="展示复杂业务型 Vue 项目、早期全栈实践、传统管理系统与数据分析项目。"
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
        <p>计算机科学与技术</p>
      </div>
      <div>
        <span class="about-kicker">项目经验</span>
        <strong>{{ projects.length }} 个完整项目</strong>
        <p>前端工程、全栈业务、数据分析</p>
      </div>
      <div>
        <span class="about-kicker">展示重点</span>
        <strong>项目能力</strong>
        <p>功能拆解、页面实现、部署说明</p>
      </div>
      <div>
        <span class="about-kicker">联系方式</span>
        <strong>GitHub / 14776743270@163.com</strong>
        <p>用于作品沟通与源码查看</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import CityPartyPreview from "../components/CityPartyPreview.vue";
import ProjectCard from "../components/ProjectCard.vue";
import SectionHeader from "../components/SectionHeader.vue";
import TagList from "../components/TagList.vue";
import { coreSkills } from "../data/skills";
import { useProjectStore } from "../stores/projectStore";

const projectStore = useProjectStore();
const { projects, featuredProject: featured } = storeToRefs(projectStore);
</script>
