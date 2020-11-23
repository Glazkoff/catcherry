<template>
  <div>
    <div class="side-bar__nav-list">
      <router-link to="/" :exact="true" active-class="nav-checked">
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
            Профиль
          </div>
        </div>
      </router-link>
      <router-link to="/" :exact="true" active-class="nav-checked">
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.4537 0.0936031C18.5443 0.149596 18.619 0.227785 18.6709 0.320757C18.7227 0.413729 18.7499 0.518403 18.75 0.624853V19.3749C18.75 19.5406 18.6842 19.6996 18.5669 19.8168C18.4497 19.934 18.2908 19.9999 18.125 19.9999H14.375C14.2092 19.9999 14.0503 19.934 13.9331 19.8168C13.8158 19.6996 13.75 19.5406 13.75 19.3749V17.4999H12.5V19.3749C12.5 19.5406 12.4342 19.6996 12.3169 19.8168C12.1997 19.934 12.0408 19.9999 11.875 19.9999H0.625C0.45924 19.9999 0.300269 19.934 0.183058 19.8168C0.065848 19.6996 0 19.5406 0 19.3749V12.4999C9.95584e-05 12.3687 0.0414351 12.241 0.118156 12.1346C0.194877 12.0283 0.303098 11.9488 0.4275 11.9074L7.5 9.54985V5.62485C7.5 5.50888 7.53228 5.3952 7.5932 5.29652C7.65413 5.19784 7.74132 5.11806 7.845 5.0661L17.845 0.066103C17.9404 0.0183603 18.0464 -0.00417676 18.153 0.00063685C18.2595 0.00545046 18.3631 0.0374546 18.4537 0.0936031ZM7.5 10.8674L1.25 12.9499V18.7499H7.5V10.8674ZM8.75 18.7499H11.25V16.8749C11.25 16.7091 11.3158 16.5501 11.4331 16.4329C11.5503 16.3157 11.7092 16.2499 11.875 16.2499H14.375C14.5408 16.2499 14.6997 16.3157 14.8169 16.4329C14.9342 16.5501 15 16.7091 15 16.8749V18.7499H17.5V1.6361L8.75 6.0111V18.7499Z"
                fill="white"
                class="fill"
              />
              <path
                d="M2.5 13.75H3.75V15H2.5V13.75ZM5 13.75H6.25V15H5V13.75ZM2.5 16.25H3.75V17.5H2.5V16.25ZM5 16.25H6.25V17.5H5V16.25ZM10 11.25H11.25V12.5H10V11.25ZM12.5 11.25H13.75V12.5H12.5V11.25ZM10 13.75H11.25V15H10V13.75ZM12.5 13.75H13.75V15H12.5V13.75ZM15 11.25H16.25V12.5H15V11.25ZM15 13.75H16.25V15H15V13.75ZM10 8.75H11.25V10H10V8.75ZM12.5 8.75H13.75V10H12.5V8.75ZM15 8.75H16.25V10H15V8.75ZM10 6.25H11.25V7.5H10V6.25ZM12.5 6.25H13.75V7.5H12.5V6.25ZM15 6.25H16.25V7.5H15V6.25ZM15 3.75H16.25V5H15V3.75Z"
                fill="white"
                class="fill"
              />
            </svg>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Организация
          </div>
        </div>
      </router-link>
      <router-link to="/feed" :exact="true" active-class="nav-checked">
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
            Лента новостей
          </div>
        </div>
      </router-link>
      <router-link to="/" :exact="true" active-class="nav-checked">
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
          <div class="side-bar__nav-list__nav-element__text">
            Личная статистика
          </div>
        </div>
      </router-link>
      <router-link to="/" :exact="true" active-class="nav-checked">
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
                d="M19.3521 6.72529L13.3565 5.85394L10.6763 0.420339C10.6031 0.271571 10.4827 0.151139 10.3339 0.0779352C9.9608 -0.106255 9.50741 0.0472369 9.32086 0.420339L6.64066 5.85394L0.645051 6.72529C0.479753 6.74891 0.328623 6.82683 0.212914 6.9449C0.0730283 7.08868 -0.00405509 7.28211 -0.00139838 7.4827C0.00125833 7.68328 0.0834378 7.8746 0.227082 8.01462L4.56499 12.2439L3.54014 18.2159C3.5161 18.3548 3.53148 18.4977 3.58451 18.6283C3.63755 18.759 3.72612 18.8721 3.8402 18.955C3.95427 19.0378 4.08927 19.087 4.2299 19.0971C4.37053 19.1071 4.51115 19.0775 4.63583 19.0117L9.99858 16.1922L15.3613 19.0117C15.5077 19.0896 15.6778 19.1156 15.8407 19.0873C16.2516 19.0164 16.5279 18.6268 16.457 18.2159L15.4322 12.2439L19.7701 8.01462C19.8882 7.89891 19.9661 7.74778 19.9897 7.58248C20.0534 7.16924 19.7654 6.78669 19.3521 6.72529ZM13.6068 11.6488L14.4593 16.6149L9.99858 14.2723L5.53789 16.6172L6.39035 11.6512L2.78212 8.13269L7.76941 7.40774L9.99858 2.89037L12.2278 7.40774L17.215 8.13269L13.6068 11.6488Z"
                fill="white"
                class="fill"
              />
            </svg>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Баллы
          </div>
        </div>
      </router-link>
      <router-link to="/" :exact="true" active-class="nav-checked">
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.1991 0H0V2.22913H13.1991V0Z"
                fill="white"
                class="fill"
              />
              <path
                d="M13.1991 4.45801H0V6.68714H13.1991V4.45801Z"
                fill="white"
                class="fill"
              />
              <path
                d="M0 8.9165H8.79943V11.1456H0V8.9165Z"
                fill="white"
                class="fill"
              />
              <path
                d="M9.88757 10.0589L11.444 8.48289L13.7769 10.8469L18.4439 6.1189L19.9992 7.69489L13.7769 14L9.88867 10.0589H9.88757Z"
                fill="white"
                class="fill"
              />
            </svg>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Задания
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBarDefault",
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    }
  }
};
</script>

<style lang="scss" scoped></style>
