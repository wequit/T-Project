<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AButton } from '@common/shared/ui'
import { BaseAlert } from '@rupoi/shared/ui'
import { CommonRouteConfig } from '@common/shared/config'

const router = useRouter()

function goBack() {
  router.back()
}

function goHome() {
  router.push({ name: CommonRouteConfig.Home.name })
}
</script>

<template>
  <div class="not-found-page">
    <div class="not-found-container">
      <div class="not-found-content">
        <!-- Иконка -->
        <div class="not-found-icon mb-4">
          <i class="fas fa-search text-primary"></i>
        </div>

        <!-- Код ошибки -->
        <h1 class="error-code text-primary mb-3">404</h1>

        <!-- Заголовок -->
        <h2 class="error-title mb-3">Страница не найдена</h2>

        <!-- Описание -->
        <p class="error-description text-muted mb-4">
          К сожалению, запрашиваемая страница не существует.<br>
          Возможно, она была удалена или перемещена.
        </p>

        <!-- Дополнительная информация -->
        <div class="mb-4">
          <BaseAlert
            type="info"
            icon="info-circle"
            title="Что делать?"
          >
            <ul class="mb-0 ps-3 mt-2">
              <li>Проверьте правильность адреса страницы</li>
              <li>Вернитесь на предыдущую страницу</li>
              <li>Перейдите на главную страницу</li>
            </ul>
          </BaseAlert>
        </div>

        <!-- Действия -->
        <div class="action-buttons d-flex gap-3 justify-content-center mb-4">
          <AButton
            color="secondary"
            size="md"
            variant="outline"
            @click="goBack"
          >
            <i class="fas fa-arrow-left me-2"></i>
            Назад
          </AButton>

          <AButton
            color="primary"
            size="md"
            @click="goHome"
          >
            <i class="fas fa-home me-2"></i>
            На главную
          </AButton>
        </div>

        <!-- Контакты поддержки -->
        <BaseAlert type="warning" icon="exclamation-circle">
          <div class="text-center">
            <strong class="d-block mb-1">Продолжаются проблемы?</strong>
            <span class="small">Свяжитесь с технической поддержкой для получения помощи</span>
          </div>
        </BaseAlert>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.not-found-container {
  width: 100%;
  max-width: 700px;
  padding: 2rem;
}

.not-found-content {
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.not-found-icon {
  animation: bounce 2s infinite;
}

.not-found-icon i {
  font-size: 100px;
  opacity: 0.9;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.error-code {
  font-size: 6rem;
  font-weight: 700;
  line-height: 1;
  margin: 0;
}

.error-title {
  font-size: 2rem;
  font-weight: 600;
  color: #344767;
}

.error-description {
  font-size: 1rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto 1.5rem;
}

.action-buttons {
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .not-found-content {
    padding: 2rem 1.5rem;
  }

  .error-code {
    font-size: 4rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .not-found-icon i {
    font-size: 80px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .btn {
    width: 100%;
  }
}
</style>

