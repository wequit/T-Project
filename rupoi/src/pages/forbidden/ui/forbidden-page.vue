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
  // Редирект на страницу входа
  router.push({ name: CommonRouteConfig.Home.name })
}
</script>

<template>
  <div class="forbidden-page">
    <div class="forbidden-container">
      <div class="forbidden-content">
        <!-- Иконка запрета -->
        <div class="forbidden-icon mb-4">
          <i class="fas fa-ban text-danger"></i>
        </div>

        <!-- Код ошибки -->
        <h1 class="error-code text-danger mb-3">403</h1>

        <!-- Заголовок -->
        <h2 class="error-title mb-3">Доступ запрещён</h2>

        <!-- Описание -->
        <p class="error-description text-muted mb-4">
          У вас нет прав для просмотра этой страницы.<br>
          Если вы считаете, что это ошибка, обратитесь к администратору системы.
        </p>

        <!-- Дополнительная информация -->
        <div class="mb-4">
          <BaseAlert
            type="warning"
            icon="exclamation-triangle"
            title="Возможные причины"
          >
            <ul class="mb-0 ps-3 mt-2">
              <li>У вас отсутствуют необходимые права доступа</li>
              <li>Страница доступна только определённым ролям пользователей</li>
              <li>Ваша учётная запись была изменена</li>
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
        <BaseAlert type="info" icon="question-circle">
          <div class="text-center">
            <strong class="d-block mb-1">Нужна помощь?</strong>
            <span class="small">Обратитесь к администратору системы или в техническую поддержку</span>
          </div>
        </BaseAlert>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forbidden-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.forbidden-container {
  width: 100%;
  max-width: 700px;
  padding: 2rem;
}

.forbidden-content {
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.forbidden-icon {
  animation: pulse 2s infinite;
}

.forbidden-icon i {
  font-size: 100px;
  opacity: 0.9;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
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
  .forbidden-content {
    padding: 2rem 1.5rem;
  }

  .error-code {
    font-size: 4rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .forbidden-icon i {
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

