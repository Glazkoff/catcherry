<template>
  <div>
    <div class="side-bar__nav-list">
      <router-link
        :to="{
          name: 'RaitingList',
          params: { id: $route.params.id }
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
          <div class="side-bar__nav-list__nav-element__text">
            Рейтинг участников
          </div>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'TeamMembers', params: { id: $route.params.id } }"
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
            Участники
          </div>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'RequestsList', params: { id: $route.params.id } }"
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
            Заявки на вхождение
          </div>
        </div>
      </router-link>
      <router-link
        :to="{
          name: 'EditTeam',
          params: { id: $route.params.id }
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.0332 12.6875C3.07227 12.6875 3.11133 12.6836 3.15039 12.6777L6.43555 12.1016C6.47461 12.0938 6.51172 12.0762 6.53906 12.0469L14.8184 3.76758C14.8365 3.74951 14.8508 3.72805 14.8606 3.70442C14.8704 3.68079 14.8755 3.65546 14.8755 3.62988C14.8755 3.6043 14.8704 3.57897 14.8606 3.55535C14.8508 3.53172 14.8365 3.51026 14.8184 3.49219L11.5723 0.244141C11.5352 0.207031 11.4863 0.1875 11.4336 0.1875C11.3809 0.1875 11.332 0.207031 11.2949 0.244141L3.01562 8.52344C2.98633 8.55273 2.96875 8.58789 2.96094 8.62695L2.38477 11.9121C2.36577 12.0167 2.37255 12.1244 2.40454 12.2258C2.43654 12.3273 2.49276 12.4193 2.56836 12.4941C2.69727 12.6191 2.85938 12.6875 3.0332 12.6875ZM4.34961 9.28125L11.4336 2.19922L12.8652 3.63086L5.78125 10.7129L4.04492 11.0195L4.34961 9.28125ZM15.1875 14.3281H0.8125C0.466797 14.3281 0.1875 14.6074 0.1875 14.9531V15.6562C0.1875 15.7422 0.257812 15.8125 0.34375 15.8125H15.6562C15.7422 15.8125 15.8125 15.7422 15.8125 15.6562V14.9531C15.8125 14.6074 15.5332 14.3281 15.1875 14.3281Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Редактирование
          </div>
        </div>
      </router-link>

      <router-link
        :to="{
          name: 'TasksTeam',
          params: { id: $route.params.id }
        }"
        :exact="true"
        active-class="nav-checked"
      >
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
      <router-link
        :to="{ name: 'TasksTeam', params: { id: $route.params.id } }"
        active-class="nav-checked"
      >
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
            Конструктор заданий
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
