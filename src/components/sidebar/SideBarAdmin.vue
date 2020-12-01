<template>
  <div>
    <div class="side-bar__nav-list">
      <router-link
        :to="{
          name: 'Dashboard'
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0H1.25V20H0V0ZM1.25 18.75H20V20H1.25V18.75Z"
                fill="white"
                class="fill"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.9876 5.38989L12.5514 12.1874L8.75012 8.38364L4.19262 12.9424L3.30762 12.0574L8.75012 6.61614L12.4489 10.3124L17.0114 4.60864L17.9876 5.38864V5.38989Z"
                fill="white"
                class="fill"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.5 4.375C12.5 4.20924 12.5658 4.05027 12.6831 3.93306C12.8003 3.81585 12.9592 3.75 13.125 3.75H18.125C18.2908 3.75 18.4497 3.81585 18.5669 3.93306C18.6842 4.05027 18.75 4.20924 18.75 4.375V9.375C18.75 9.54076 18.6842 9.69973 18.5669 9.81694C18.4497 9.93415 18.2908 10 18.125 10C17.9592 10 17.8003 9.93415 17.6831 9.81694C17.5658 9.69973 17.5 9.54076 17.5 9.375V5H13.125C12.9592 5 12.8003 4.93415 12.6831 4.81694C12.5658 4.69973 12.5 4.54076 12.5 4.375Z"
                fill="white"
                class="fill"
              />
            </svg>
          </div>
          <div
            class="side-bar__nav-list__nav-element__text"
            v-html="$t('systemStatisticsBr')"
          ></div>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'Users' }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C6.93667 0 4.44444 2.36105 4.44444 5.26316C4.44444 8.16526 6.93667 10.5263 10 10.5263C13.0633 10.5263 15.5556 8.16526 15.5556 5.26316C15.5556 2.36105 13.0633 0 10 0ZM10 8.42105C8.16222 8.42105 6.66667 7.00421 6.66667 5.26316C6.66667 3.5221 8.16222 2.10526 10 2.10526C11.8378 2.10526 13.3333 3.5221 13.3333 5.26316C13.3333 7.00421 11.8378 8.42105 10 8.42105ZM20 20V18.9474C20 14.8853 16.51 11.5789 12.2222 11.5789H7.77778C3.48889 11.5789 0 14.8853 0 18.9474V20H2.22222V18.9474C2.22222 16.0453 4.71444 13.6842 7.77778 13.6842H12.2222C15.2856 13.6842 17.7778 16.0453 17.7778 18.9474V20H20Z"
                fill="white"
                class="fill"
              />
            </svg>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("listUser") }}
          </div>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'Organization' }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16675 4H10.0001V10H4.16675V4ZM10.9723 12H4.16675V14H15.8334V12H11.9445H10.9723ZM11.9445 8H15.8334V10H11.9445V8ZM11.9445 4H15.8334V6H11.9445V4Z"
                fill="white"
                class="fill"
              />
              <rect
                x="0.5"
                y="0.5"
                width="19"
                height="17"
                rx="1.5"
                stroke="white"
                class="fill-stroke"
              />
            </svg>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("listOrganization") }}
          </div>
        </div>
      </router-link>

      <router-link to="/feed" :exact="true" active-class="nav-checked">
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C6.93667 0 4.44444 2.36105 4.44444 5.26316C4.44444 8.16526 6.93667 10.5263 10 10.5263C13.0633 10.5263 15.5556 8.16526 15.5556 5.26316C15.5556 2.36105 13.0633 0 10 0ZM10 8.42105C8.16222 8.42105 6.66667 7.00421 6.66667 5.26316C6.66667 3.5221 8.16222 2.10526 10 2.10526C11.8378 2.10526 13.3333 3.5221 13.3333 5.26316C13.3333 7.00421 11.8378 8.42105 10 8.42105ZM20 20V18.9474C20 14.8853 16.51 11.5789 12.2222 11.5789H7.77778C3.48889 11.5789 0 14.8853 0 18.9474V20H2.22222V18.9474C2.22222 16.0453 4.71444 13.6842 7.77778 13.6842H12.2222C15.2856 13.6842 17.7778 16.0453 17.7778 18.9474V20H20Z"
                fill="white"
                class="fill"
              />
            </svg>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Назад
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  margin: 1rem;
  margin-right: 5rem;
}

nav p {
  background-color: wheat;
  margin: 0;
  border: 1px solid rgb(247, 77, 77);
  padding: 1rem;
}

.router-link-exact-active {
  font-weight: 700;
}
</style>
