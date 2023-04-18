<!-- <template>
  <div id="chart" class="capacity"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data: () => ({}),
  methods: {},
  mounted() {
    let chart = echarts.init(document.getElementById("chart"));
    // 配置图表
    let option = {
      title: {
        text: "Basic Radar Chart",
        bottom: "bottom",
        left: "left",
        textStyle: {
          color: "white",
        },
      },
      legend: {
        data: ["Allocated Budget", "Actual Spending"],
        left: "left",
        itemWidth: 10,
        textStyle: {
          color: "white",
        },
      },

      radar: {
        // shape: 'circle',
        indicator: [
          { name: "Sales", max: 6500 },
          { name: "Administration", max: 16000 },
          { name: "Information Technology", max: 30000 },
          { name: "Customer Support", max: 38000 },
          { name: "Development", max: 52000 },
          { name: "Marketing", max: 25000 },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: "Allocated Budget",
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: "Actual Spending",
            },
          ],
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表
    chart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
.capacity {
  width: 100%;
  height: 400px;
  padding: 50px;
  background-color: rgb(16, 12, 42);
}
</style> -->