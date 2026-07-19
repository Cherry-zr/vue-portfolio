<template>
  <section class="page section city-party-detail">
    <RouterLink class="back-link" to="/projects">← 返回项目列表</RouterLink>

    <article class="city-party-detail-hero">
      <div class="city-party-detail-hero__copy">
        <p class="eyebrow">Featured Full-stack Project</p>
        <h1>{{ project.title }}</h1>
        <p class="city-party-detail-hero__summary">{{ project.summary }}</p>

        <div class="city-party-detail-hero__status" aria-label="项目状态">
          <span>公开源码</span>
          <span>本地完整运行</span>
          <span>暂无公网业务 Demo</span>
        </div>

        <TagList :tags="project.homeTags" />

        <div class="detail-actions">
          <a
            class="btn btn-primary"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub 源码
          </a>
          <button type="button" class="btn btn-secondary" @click="scrollToGallery">查看项目截图</button>
        </div>
      </div>

      <div class="city-party-detail-hero__visual" aria-label="CityParty 项目界面预览">
        <figure v-if="desktopHero" class="city-party-detail-hero__desktop">
          <CityPartyImage
            :src="desktopHero.src"
            :alt="desktopHero.title"
            :width="desktopHero.width"
            :height="desktopHero.height"
            :orientation="desktopHero.orientation"
            loading="eager"
            fetchpriority="high"
          />
          <figcaption>{{ desktopHero.title }}</figcaption>
        </figure>
        <figure v-if="mobileHero" class="city-party-detail-hero__phone">
          <CityPartyImage
            :src="mobileHero.src"
            :alt="mobileHero.title"
            :width="mobileHero.width"
            :height="mobileHero.height"
            :orientation="mobileHero.orientation"
            loading="eager"
          />
          <figcaption>{{ mobileHero.title }}</figcaption>
        </figure>
      </div>
    </article>

    <article class="content-card city-party-overview">
      <div>
        <p class="eyebrow">Project Overview</p>
        <h2>项目概述</h2>
        <p>{{ project.description }}</p>
      </div>
      <dl class="city-party-overview__facts">
        <div>
          <dt>我的角色</dt>
          <dd>{{ project.role }}</dd>
        </div>
        <div>
          <dt>项目状态</dt>
          <dd>{{ project.status }}</dd>
        </div>
        <div>
          <dt>部署边界</dt>
          <dd>{{ project.deploymentNote }}</dd>
        </div>
        <div>
          <dt>项目仓库</dt>
          <dd>
            <a class="inline-link" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">
              GitHub 公开源码
            </a>
          </dd>
        </div>
      </dl>
    </article>

    <article class="content-card city-party-workflow">
      <div class="city-party-section-heading">
        <p class="eyebrow">Core Journey</p>
        <h2>核心业务流程</h2>
        <p>围绕一次同城活动，从发现和参与一直连接到活动结束后的互评与信用记录。</p>
      </div>
      <ol>
        <li v-for="(step, index) in project.workflow" :key="step">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          <strong>{{ step }}</strong>
        </li>
      </ol>
    </article>

    <article class="content-card">
      <div class="city-party-section-heading">
        <p class="eyebrow">Product Scope</p>
        <h2>核心功能</h2>
      </div>
      <div class="city-party-feature-grid">
        <section v-for="feature in project.featureCards" :key="feature.title">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </section>
      </div>
    </article>

    <article class="content-card">
      <div class="city-party-section-heading">
        <p class="eyebrow">Technology</p>
        <h2>技术栈</h2>
        <p>按实际业务层级组织技术，避免把全部依赖堆成一组标签。</p>
      </div>
      <div class="city-party-tech-grid">
        <section v-for="group in project.techGroups" :key="group.title">
          <h3>{{ group.title }}</h3>
          <TagList :tags="group.items" />
        </section>
      </div>
    </article>

    <article class="content-card">
      <div class="city-party-section-heading">
        <p class="eyebrow">Engineering Decisions</p>
        <h2>技术难点与实现</h2>
      </div>
      <div class="city-party-challenge-list">
        <section v-for="challenge in project.challenges" :key="challenge.title">
          <h3>{{ challenge.title }}</h3>
          <dl>
            <div>
              <dt>问题</dt>
              <dd>{{ challenge.problem }}</dd>
            </div>
            <div>
              <dt>实现</dt>
              <dd>{{ challenge.solution }}</dd>
            </div>
            <div>
              <dt>价值</dt>
              <dd>{{ challenge.value }}</dd>
            </div>
          </dl>
        </section>
      </div>
    </article>

    <article class="content-card">
      <div class="city-party-section-heading">
        <p class="eyebrow">Quality Record</p>
        <h2>测试与工程质量</h2>
        <p>以下为项目最终验收记录，不是实时线上指标或测试覆盖率。</p>
      </div>
      <div class="city-party-quality-grid">
        <section v-for="item in project.quality" :key="item.label">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <small>{{ item.detail }}</small>
        </section>
      </div>
    </article>

    <article id="city-party-gallery" ref="gallerySection" class="content-card city-party-gallery-card">
      <CityPartyGallery :screenshots="project.screenshots" />
    </article>

    <article class="content-card city-party-limitations">
      <div>
        <p class="eyebrow">Project Boundary</p>
        <h2>项目限制</h2>
      </div>
      <ul>
        <li v-for="limitation in project.limitations" :key="limitation">{{ limitation }}</li>
      </ul>
    </article>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import CityPartyGallery from "./CityPartyGallery.vue";
import CityPartyImage from "./CityPartyImage.vue";
import TagList from "./TagList.vue";

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const gallerySection = ref(null);

function scrollToGallery() {
  gallerySection.value?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const heroScreenshots = computed(() =>
  props.project.showcase.detailHero
    .map((id) => props.project.screenshots.find((screenshot) => screenshot.id === id))
    .filter(Boolean)
);

const desktopHero = computed(() =>
  heroScreenshots.value.find((screenshot) => screenshot.orientation === "landscape")
);

const mobileHero = computed(() =>
  heroScreenshots.value.find((screenshot) => screenshot.orientation === "portrait")
);
</script>
