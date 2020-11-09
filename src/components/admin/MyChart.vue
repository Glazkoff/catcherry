<script>
import { Pie } from "vue-chartjs";

export default {
  name: "MyChart",
  extends: Pie,
  data() {
    return {
      gender: [0, 0],
      chartdata: {
        labels: ["Уже смешарик", "Новенький"],
        datasets: [
          {
            label: "Половое распределение команды Catcherry",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1,
            data: [1, 1]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>
