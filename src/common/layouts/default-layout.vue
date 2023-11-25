<script setup>
import { reactive, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";

const dropdowns = reactive({
  user: false,
  workspace: false,
  project: false,
  notifications: false,
});

const router = useRoute();

const toggleDropdown = (key) => {
  closeAllDropdowns();
  dropdowns[key] = !dropdowns[key];
};

const closeAllDropdowns = () => {
  for (let key in dropdowns) {
    dropdowns[key] = false;
  }
};

const selectedBoard = ref("Доска");

</script>

<template>
  <div :class="$style.flow" @click.stop="closeAllDropdowns">
    <header :class="$style.header">
      <div :class="$style.left">
        <button class="button is-black is-medium is-bold"><b>RndTeam</b></button>

        <div class="is-flex ml-4">
          <div class="select is-rounded">
            <select v-model="selectedBoard" @change="changeBoard">
              <option>Доска</option>
              <option>Вики</option>
            </select>
          </div>

          <div class="select is-rounded ml-2">
            <select>
              <option>Проекты</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Docs Dev</option>
            </select>
          </div>

          <button class="button is-primary ml-3">
            <span class="icon">
              <i class="fi fi-rr-add mr-1"></i>
            </span>
            <span>Новый проект</span>
          </button>
        </div>
      </div>
      <div :class="$style.rigth">
        <div :class="$style.notifications" @click.stop>
          <div class="dropdown is-right" :class="{ 'is-active': dropdowns.notifications }">
            <div class="dropdown-trigger">
              <i @click.stop="() => toggleDropdown('notifications')" class="fi fi-rr-cowbell"></i>
            </div>
            <div class="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item is-size-4"><b>Уведомления 🔔</b></a>
                <hr class="dropdown-divider" />
                <a href="#" class="dropdown-item"> У вас собрания в 11:00 по МСК времени </a>
                <a class="dropdown-item"> Вам назначили новую карточку </a>
                <a href="#" class="dropdown-item"> Вас добавили в проект "Frontend" </a>
              </div>
            </div>
          </div>
        </div>

        <div :class="$style.avatar">
          <div class="dropdown is-right" :class="{ 'is-active': dropdowns.user }">
            <div class="dropdown-trigger">
              <button class="button" @click.stop="() => toggleDropdown('user')">
                <b>Иванов И.П.</b>
              </button>
            </div>
            <div class="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item"> Профиль </a>
                <a class="dropdown-item"> Настройки </a>
                <hr class="dropdown-divider" />
                <a href="#" class="dropdown-item"> Выйти </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main :class="$style.main">
      <RouterView />
    </main>
  </div>
</template>

<style module lang="scss">
.flow {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main {
  width: 100%;
  height: calc(100% - 70px);
}

.header {
  height: 70px;
  display: flex;
  grid-area: "header";
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background-color: white;
  border-bottom: 1px solid grey;
}

.left {
  display: flex;
  align-items: center;
  width: 400px;
}

.rigth {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
}

.notifications {
  font-size: 24px;
  font-weight: bold;
}
</style>
