<template>
  <section class="page section demo-page">
    <div class="demo-heading">
      <div>
        <p class="eyebrow">Static Demo</p>
        <h1>登录注册</h1>
        <p>仅展示前端表单状态，不接入真实账号系统。</p>
      </div>
      <RouterLink class="btn btn-secondary" to="/demo/campus-market">返回商品列表</RouterLink>
    </div>

    <DemoNav />

    <div class="auth-card content-card">
      <div class="auth-tabs">
        <button type="button" :class="{ active: mode === 'login' }" @click="mode = 'login'">登录</button>
        <button type="button" :class="{ active: mode === 'register' }" @click="mode = 'register'">注册</button>
      </div>

      <form @submit.prevent="notice = '这是静态演示，不会发送真实请求。'">
        <label>
          账号
          <input type="text" placeholder="student_demo" />
        </label>
        <label>
          密码
          <input type="password" placeholder="******" />
        </label>
        <label v-if="mode === 'register'">
          昵称
          <input type="text" placeholder="校园用户" />
        </label>
        <button class="btn btn-primary" type="submit">
          {{ mode === "login" ? "模拟登录" : "模拟注册" }}
        </button>
      </form>

      <p v-if="notice" class="form-notice">{{ notice }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import DemoNav from "../components/DemoNav.vue";

const mode = ref("login");
const notice = ref("");
</script>
