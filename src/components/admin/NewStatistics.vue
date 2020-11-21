<script>
import { Bar } from "vue-chartjs";

export default {
  name: "newStatistics",
  extends: Bar,
  props: ["users", "orgs"],
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
        title: {
          display: true,
          text: "Количество новых за последнюю неделю"
        },
        tooltips: {
          displayColors: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0
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
