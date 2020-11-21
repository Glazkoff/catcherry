<template>
  <div>
    <h3>Рейтинг участников</h3>
    <hr />
    <!-- инпуты для смены периода отображения рейтинга  -->
    В период с
    <input type="date" v-model="weekAgo" class="form-control mini" /> по
    <input type="date" v-model="today" class="form-control mini" /> в сравнении
    с предыдущим
    <select class="form-control mini" v-model="comparsionPeriod">
      <option value="1">аналогичным</option>
      <option value="2">недельным</option>
      <option value="3">месячным</option>
    </select>
    периодом
    <hr />
    <a @click="sortList()" class="btn btn-link">По общему количеству</a>
    <a @click="weeklyList()" class="btn btn-link">По результату периода</a>
    <div v-for="raiting in raitingInTeams" :key="raiting.id" class="oneUser">
      <img src="@/assets/avatar.jpg" alt="photo" class="mediumAvatar" />
      <p>
        <b>{{ raiting.user.name }}</b>
      </p>
      <p>Заработанные баллы: {{ raiting.user.userPoints.pointQuantity }}</p>
      <div>
        За период заработано:
        <!-- функция отображения баллов пользователя -->
        <div
          v-if="+summOperations(raiting.user.userPoints.pointsOperation).summ > 0"
          class="up"
        >
          ↑ +{{ summOperations(raiting.user.userPoints.pointsOperation).summ }}
        </div>
        <div
          v-else-if="
            +summOperations(raiting.user.userPoints.pointsOperation).summ < 0
          "
          class="down"
        >
          ↓ {{ summOperations(raiting.user.userPoints.pointsOperation).summ }}
        </div>
        <div v-else>0</div>
        <div>Процентный показатель: {{summOperations(raiting.user.userPoints.pointsOperation).percent}}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import { RAITING_IN_TEAMS_QUERY } from "@/graphql/queries";
export default {
  data() {
    return {
      today: this.stampToDate(new Date()),
      weekAgo: this.stampToDate(new Date().setDate(new Date().getDate() - 7)),
      comparsionPeriod: 1
    };
  },
  apollo: {
    // массив пользователей команды с рейтиногм по баллам
    raitingInTeams: {
      query: RAITING_IN_TEAMS_QUERY,
      variables() {
        return {
          teamId: this.$route.params.id
        };
      }
    }
  },
  methods: {
    // сортировка по общему количеству баллов
    sortList() {
      this.raitingInTeams.sort(
        (a, b) =>
          parseFloat(b.user.userPoints.pointQuantity) -
          parseFloat(a.user.userPoints.pointQuantity)
      );
    },
    // сортировка по недельному количеству заработанных баллов
    weeklyList() {
      this.raitingInTeams.sort(
        (a, b) =>
          parseFloat(this.summOperations(b.user.userPoints.pointsOperation)) -
          parseFloat(this.summOperations(a.user.userPoints.pointsOperation))
      );
    },
    // сумма баллов по заданному временному промежутку
    summOperations(pointsOperation) {
      let summ = 0;
      let summCurrent = 0;
      let summComparsion = 0;
      for (let i = 0; i < pointsOperation.length; i++) {
        if (
          this.stampToDate(+pointsOperation[i].createdAt) <
            this.stampToDate(this.today) &&
          this.stampToDate(+pointsOperation[i].createdAt) >=
            this.stampToDate(this.weekAgo)
        ) {
          //сумма баллов в установленном периоде
          summCurrent += pointsOperation[i].delta;
        }
      }

      if (this.comparsionPeriod == 1) {
        //аналогичным периодом
        console.log(this.stampToDate(this.weekAgo));
        console.log(
          this.stampToDate(
            new Date().setDate(
              new Date(this.weekAgo).getDate() -
                (new Date(this.today).getDate() -
                  new Date(this.weekAgo).getDate())
            )
          )
        );

        for (let i = 0; i < pointsOperation.length; i++) {
          if (
            this.stampToDate(+pointsOperation[i].createdAt) <
              this.stampToDate(this.weekAgo) &&
            this.stampToDate(+pointsOperation[i].createdAt) >=
              this.stampToDate(
                new Date().setDate(
                  new Date(this.weekAgo).getDate() -
                    (new Date(this.today).getDate() -
                      new Date(this.weekAgo).getDate())
                )
              )
          ) {
            //если дата операции меньше даты начала установленного периода И
            //если дата операции больше даты начала предыдущего установленному периоду
            summComparsion += pointsOperation[i].delta;
          }
        }
      }

      if (this.comparsionPeriod == 2) {
        //недельным периодом
        console.log(
          this.stampToDate(
            new Date(this.today).setDate(new Date(this.today).getDate() - 7)
          )
        );
        console.log(
          this.stampToDate(
            new Date(this.weekAgo).setDate(new Date(this.weekAgo).getDate() - 7)
          )
        );

        for (let i = 0; i < pointsOperation.length; i++) {
          if (
            this.stampToDate(+pointsOperation[i].createdAt) <
              this.stampToDate(
                new Date(this.today).setDate(new Date(this.today).getDate() - 7)
              ) &&
            this.stampToDate(+pointsOperation[i].createdAt) >=
              this.stampToDate(
                new Date(this.weekAgo).setDate(
                  new Date(this.weekAgo).getDate() - 7
                )
              )
          ) {
            //если дата операции меньше даты конца установленного периода недельной давности И
            //если дата операции больше начала значения установленного периода недельной давности
            summComparsion += pointsOperation[i].delta;
          }
        }
      }

      if (this.comparsionPeriod == 3) {
        //недельным периодом
        console.log(
          this.stampToDate(
            new Date(this.today).setMonth(new Date(this.today).getMonth() - 1)
          )
        );
        console.log(
          this.stampToDate(
            new Date(this.weekAgo).setMonth(
              new Date(this.weekAgo).getMonth() - 1
            )
          )
        );

        for (let i = 0; i < pointsOperation.length; i++) {
          if (
            this.stampToDate(+pointsOperation[i].createdAt) <
              this.stampToDate(
                new Date(this.today).setMonth(
                  new Date(this.today).getMonth() - 1
                )
              ) &&
            this.stampToDate(+pointsOperation[i].createdAt) >=
              this.stampToDate(
                new Date(this.weekAgo).setMonth(
                  new Date(this.weekAgo).getMonth() - 1
                )
              )
          ) {
            //если дата операции меньше даты конца установленного периода месячной давности И
            //если дата операции больше начала значения установленного периода месячной давности
            summComparsion += pointsOperation[i].delta;
          }
        }
      }
      summ = summCurrent - summComparsion; //текущая сумма минус предыдущая сумма
      let percent = ((summCurrent * 100) / summComparsion - 100).toFixed(2); //текущая сумма *100 поделена на предыдущую сумму с вычетом 100
      return {summ, percent};
    },
    // отображение тайм-штампа в фотмате для input date
    stampToDate(stamp) {
      let a = new Date(stamp);
      let year = a.getFullYear();
      let month = a.getMonth() + 1;
      if (month < 10) month = "0" + month;
      let date = a.getDate();
      if (date < 10) date = "0" + date;
      let time = year + "-" + month + "-" + date;
      return time;
    }
  }
};
</script>

<style>
.oneUser {
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px gray;
}
.mediumAvatar {
  height: 50px;
  border-radius: 25px;
}
.up {
  color: rgb(13, 135, 88);
}
.down {
  color: rgb(244, 96, 94);
}

.mini {
  width: 150px;
  display: inline-block;
}

.btn-link {
  display: inline-block;
}
</style>
