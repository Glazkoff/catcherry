<script>
import { Bar } from "vue-chartjs";

export default {
  name: "deleteStatistics",
  extends: Bar,
  props: ["users", "orgs"],
  defaultFontFamily: "Lato",
  data() {
    return {
      chartdata: {
        labels: ["Пользователи", "Организации"],
        datasets: [
          {
            label: "Количество",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
            data: [this.users, this.orgs]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        labels: {
          fontColor: "white"
        },
        title: {
          display: true,
          text: "Количество удаленных за последнюю неделю",
          fontSize: "16",
          fontColor: "white"
        },
        tooltips: {
          displayColors: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                display: true,
                fontColor: "white"
              },
              gridLines: {
                color: "rgba(255,255,255,0.2)",
                lineWidth: 1,
                borderDash: [2, 5]
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "white"
              },
              gridLines: {
                color: "rgba(255,255,255,0.2)",
                lineWidth: 1,
                borderDash: [2, 5]
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
* {
  color: $white;
}
</style>
