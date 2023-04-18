<template>
  <div class="schedulebottom">
    <div class="schedulebottom_container">
      <div class="schedulebottom_title">RACE WEEKEND</div>
      <div class="schedulebottom_subtitle">
        FORMULA 1 GULF AIR BAHRAIN GRAND PRIX 2022
      </div>
      <div class="schedulebottom_table_container">
        <div class="schedulebottom_table_column">
          <div class="schedulebottom_date_container">
            <span class="schedulebottom_day">20</span>
            <span class="schedulebottom_month">MAR</span>
          </div>
          <div class="schedulebottom_type_container">
            <div class="schedulebottom_type">Race</div>
            <div class="schedulebottom_intro">
              <svg
                t="1663896279840"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1058"
                width="28"
                height="28"
              >
                <path
                  d="M738.70336 234.22976c0.1024 0.0512 0.19456 0.09216 0.29696 0.13312-0.34816-0.21504-0.68608-0.39936-1.03424-0.60416-1.62816-1.05472-35.16416-25.5488-97.32096-26.10176l0-0.01024c-0.02048 0-0.0512 0-0.07168 0-0.07168 0-0.12288 0-0.19456 0l0 0.02048c-106.43456 8.2944-199.5264 117.9648-318.33088 32.12288 0 104.04864 0 208.10752 0 312.15616 38.52288 27.84256 74.33216 35.09248 108.78976 31.93856 0-0.01024 0-0.02048 0-0.03072 24.23808-3.66592 69.45792-17.98144 69.20192-17.85856 78.91968-30.19776 155.22816-80.24064 246.81472-14.04928 0-104.05888 0-208.10752 0-312.15616C744.12032 237.824 741.40672 235.99104 738.70336 234.22976zM640.64512 211.56864c41.1648-0.54272 59.91424 7.49568 94.5664 23.22432 2.38592 2.21184 4.79232 2.36544 7.34208 4.89472 0 40.7552 0 61.14304 0 101.90848-40.7552-40.54016-61.14304-43.12064-101.89824-37.7344C640.64512 266.45504 640.64512 246.13888 640.64512 211.56864zM639.36512 514.28352c0-40.9088 0-69.94944 0-110.85824-41.6256 5.90848-62.43328 19.49696-104.05888 41.51296 0 40.9088 0 61.35808 0 102.25664l-27.76064 12.71808c0 0-49.26464 18.13504-76.70784 20.74624 0-35.2256 0-55.6544 0-93.50144-41.6256 6.2976-62.44352 4.1984-104.06912-36.94592 0 40.9088 0 61.36832 0 102.26688-0.17408-0.17408-0.256-0.256-0.43008-0.43008 0.01024-67.2256 0-134.44096 0-201.6768 41.6256 41.40032 62.43328 43.60192 104.05888 37.43744 0-40.76544 0-69.40672 0-110.17216 42.47552-6.28736 63.72352-12.24704 106.19904-34.7136 0 40.76544 0 61.14304 0 101.90848 41.19552-21.79072 61.78816-35.08224 102.98368-40.8576 0 41.6256 0 62.43328 0 104.05888 41.19552-5.77536 61.78816-3.38944 102.98368 37.5808 0 39.05536 0 58.5728 0 97.61792C704.70656 515.35872 679.26016 510.83264 639.36512 514.28352zM431.03232 387.7376c41.61536-6.36928 62.43328-20.06016 104.05888-42.0864 0 41.6256 0 62.43328 0 104.05888-41.61536 22.016-62.43328 35.72736-104.05888 42.0864C431.03232 450.16064 431.03232 429.3632 431.03232 387.7376zM322.048 178.8416c0 20.30592-10.14784 38.22592-25.62048 49.03936l0 642.9184c0 18.87232-15.29856 34.17088-34.17088 34.17088-18.87232 0-34.17088-15.29856-34.17088-34.17088L228.08576 227.87072c-15.47264-10.81344-25.62048-28.7232-25.62048-49.03936 0-33.03424 26.7776-59.8016 59.8016-59.8016C295.2704 119.04 322.048 145.80736 322.048 178.8416z"
                  p-id="1059"
                ></path>
              </svg>
              <span>Highlights and analysis</span>
            </div>
          </div>
          <div class="schedulebottom_btn_container">
            <!-- 传值时注意name与path应与路由配置一致 -->
            <v-btn
              @click="
                $router.push({
                  name: 'Standings',
                  path: '/standing',
                  params: {
                    prixName: 'Bahrain',
                    prixId:itemIndex,
                  },
                })
              "
              class="schedulebottom_resbtn"
              >RESULT</v-btn
            >
            <v-btn class="schedulebottom_reportbtn">REPORT</v-btn>
            <v-btn class="schedulebottom_hightbtn">HIGHLIGHT</v-btn>
          </div>
        </div>
        <div class="schedulebottom_table_column">
          <div class="schedulebottom_date_container">
            <span class="schedulebottom_day">20</span>
            <span class="schedulebottom_month">MAR</span>
          </div>
          <div class="schedulebottom_type_container">
            <div class="schedulebottom_type">Race</div>
            <div class="schedulebottom_intro">
              <svg
                t="1663896279840"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1058"
                width="28"
                height="28"
              >
                <path
                  d="M738.70336 234.22976c0.1024 0.0512 0.19456 0.09216 0.29696 0.13312-0.34816-0.21504-0.68608-0.39936-1.03424-0.60416-1.62816-1.05472-35.16416-25.5488-97.32096-26.10176l0-0.01024c-0.02048 0-0.0512 0-0.07168 0-0.07168 0-0.12288 0-0.19456 0l0 0.02048c-106.43456 8.2944-199.5264 117.9648-318.33088 32.12288 0 104.04864 0 208.10752 0 312.15616 38.52288 27.84256 74.33216 35.09248 108.78976 31.93856 0-0.01024 0-0.02048 0-0.03072 24.23808-3.66592 69.45792-17.98144 69.20192-17.85856 78.91968-30.19776 155.22816-80.24064 246.81472-14.04928 0-104.05888 0-208.10752 0-312.15616C744.12032 237.824 741.40672 235.99104 738.70336 234.22976zM640.64512 211.56864c41.1648-0.54272 59.91424 7.49568 94.5664 23.22432 2.38592 2.21184 4.79232 2.36544 7.34208 4.89472 0 40.7552 0 61.14304 0 101.90848-40.7552-40.54016-61.14304-43.12064-101.89824-37.7344C640.64512 266.45504 640.64512 246.13888 640.64512 211.56864zM639.36512 514.28352c0-40.9088 0-69.94944 0-110.85824-41.6256 5.90848-62.43328 19.49696-104.05888 41.51296 0 40.9088 0 61.35808 0 102.25664l-27.76064 12.71808c0 0-49.26464 18.13504-76.70784 20.74624 0-35.2256 0-55.6544 0-93.50144-41.6256 6.2976-62.44352 4.1984-104.06912-36.94592 0 40.9088 0 61.36832 0 102.26688-0.17408-0.17408-0.256-0.256-0.43008-0.43008 0.01024-67.2256 0-134.44096 0-201.6768 41.6256 41.40032 62.43328 43.60192 104.05888 37.43744 0-40.76544 0-69.40672 0-110.17216 42.47552-6.28736 63.72352-12.24704 106.19904-34.7136 0 40.76544 0 61.14304 0 101.90848 41.19552-21.79072 61.78816-35.08224 102.98368-40.8576 0 41.6256 0 62.43328 0 104.05888 41.19552-5.77536 61.78816-3.38944 102.98368 37.5808 0 39.05536 0 58.5728 0 97.61792C704.70656 515.35872 679.26016 510.83264 639.36512 514.28352zM431.03232 387.7376c41.61536-6.36928 62.43328-20.06016 104.05888-42.0864 0 41.6256 0 62.43328 0 104.05888-41.61536 22.016-62.43328 35.72736-104.05888 42.0864C431.03232 450.16064 431.03232 429.3632 431.03232 387.7376zM322.048 178.8416c0 20.30592-10.14784 38.22592-25.62048 49.03936l0 642.9184c0 18.87232-15.29856 34.17088-34.17088 34.17088-18.87232 0-34.17088-15.29856-34.17088-34.17088L228.08576 227.87072c-15.47264-10.81344-25.62048-28.7232-25.62048-49.03936 0-33.03424 26.7776-59.8016 59.8016-59.8016C295.2704 119.04 322.048 145.80736 322.048 178.8416z"
                  p-id="1059"
                ></path>
              </svg>
              <span>Highlights and analysis</span>
            </div>
          </div>
          <div class="schedulebottom_btn_container">
            <!-- 传值时注意name与path应与路由配置一致 -->
            <v-btn
              @click="
                $router.push({
                  name: 'Standings',
                  path: '/standing',
                  params: {
                    prixName: 'Bahrain',
                    prixId: $route.params.prixId,
                  },
                })
              "
              class="schedulebottom_resbtn"
              >RESULT</v-btn
            >
            <v-btn class="schedulebottom_reportbtn">REPORT</v-btn>
            <v-btn class="schedulebottom_hightbtn">HIGHLIGHT</v-btn>
          </div>
        </div>
        <div class="schedulebottom_table_column">
          <div class="schedulebottom_date_container">
            <span class="schedulebottom_day">20</span>
            <span class="schedulebottom_month">MAR</span>
          </div>
          <div class="schedulebottom_type_container">
            <div class="schedulebottom_type">Race</div>
            <div class="schedulebottom_intro">
              <svg
                t="1663896279840"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1058"
                width="28"
                height="28"
              >
                <path
                  d="M738.70336 234.22976c0.1024 0.0512 0.19456 0.09216 0.29696 0.13312-0.34816-0.21504-0.68608-0.39936-1.03424-0.60416-1.62816-1.05472-35.16416-25.5488-97.32096-26.10176l0-0.01024c-0.02048 0-0.0512 0-0.07168 0-0.07168 0-0.12288 0-0.19456 0l0 0.02048c-106.43456 8.2944-199.5264 117.9648-318.33088 32.12288 0 104.04864 0 208.10752 0 312.15616 38.52288 27.84256 74.33216 35.09248 108.78976 31.93856 0-0.01024 0-0.02048 0-0.03072 24.23808-3.66592 69.45792-17.98144 69.20192-17.85856 78.91968-30.19776 155.22816-80.24064 246.81472-14.04928 0-104.05888 0-208.10752 0-312.15616C744.12032 237.824 741.40672 235.99104 738.70336 234.22976zM640.64512 211.56864c41.1648-0.54272 59.91424 7.49568 94.5664 23.22432 2.38592 2.21184 4.79232 2.36544 7.34208 4.89472 0 40.7552 0 61.14304 0 101.90848-40.7552-40.54016-61.14304-43.12064-101.89824-37.7344C640.64512 266.45504 640.64512 246.13888 640.64512 211.56864zM639.36512 514.28352c0-40.9088 0-69.94944 0-110.85824-41.6256 5.90848-62.43328 19.49696-104.05888 41.51296 0 40.9088 0 61.35808 0 102.25664l-27.76064 12.71808c0 0-49.26464 18.13504-76.70784 20.74624 0-35.2256 0-55.6544 0-93.50144-41.6256 6.2976-62.44352 4.1984-104.06912-36.94592 0 40.9088 0 61.36832 0 102.26688-0.17408-0.17408-0.256-0.256-0.43008-0.43008 0.01024-67.2256 0-134.44096 0-201.6768 41.6256 41.40032 62.43328 43.60192 104.05888 37.43744 0-40.76544 0-69.40672 0-110.17216 42.47552-6.28736 63.72352-12.24704 106.19904-34.7136 0 40.76544 0 61.14304 0 101.90848 41.19552-21.79072 61.78816-35.08224 102.98368-40.8576 0 41.6256 0 62.43328 0 104.05888 41.19552-5.77536 61.78816-3.38944 102.98368 37.5808 0 39.05536 0 58.5728 0 97.61792C704.70656 515.35872 679.26016 510.83264 639.36512 514.28352zM431.03232 387.7376c41.61536-6.36928 62.43328-20.06016 104.05888-42.0864 0 41.6256 0 62.43328 0 104.05888-41.61536 22.016-62.43328 35.72736-104.05888 42.0864C431.03232 450.16064 431.03232 429.3632 431.03232 387.7376zM322.048 178.8416c0 20.30592-10.14784 38.22592-25.62048 49.03936l0 642.9184c0 18.87232-15.29856 34.17088-34.17088 34.17088-18.87232 0-34.17088-15.29856-34.17088-34.17088L228.08576 227.87072c-15.47264-10.81344-25.62048-28.7232-25.62048-49.03936 0-33.03424 26.7776-59.8016 59.8016-59.8016C295.2704 119.04 322.048 145.80736 322.048 178.8416z"
                  p-id="1059"
                ></path>
              </svg>
              <span>Highlights and analysis</span>
            </div>
          </div>
          <div class="schedulebottom_btn_container">
            <!-- 传值时注意name与path应与路由配置一致 -->
            <v-btn
              @click="
                $router.push({
                  name: 'Standings',
                  path: '/standing',
                  params: {
                    prixName: 'Bahrain',
                    prixId: $route.params.prixId,
                  },
                })
              "
              class="schedulebottom_resbtn"
              >RESULT</v-btn
            >
            <v-btn class="schedulebottom_reportbtn">REPORT</v-btn>
            <v-btn class="schedulebottom_hightbtn">HIGHLIGHT</v-btn>
          </div>
        </div>
        <div class="schedulebottom_table_column">
          <div class="schedulebottom_date_container">
            <span class="schedulebottom_day">20</span>
            <span class="schedulebottom_month">MAR</span>
          </div>
          <div class="schedulebottom_type_container">
            <div class="schedulebottom_type">Race</div>
            <div class="schedulebottom_intro">
              <svg
                t="1663896279840"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1058"
                width="28"
                height="28"
              >
                <path
                  d="M738.70336 234.22976c0.1024 0.0512 0.19456 0.09216 0.29696 0.13312-0.34816-0.21504-0.68608-0.39936-1.03424-0.60416-1.62816-1.05472-35.16416-25.5488-97.32096-26.10176l0-0.01024c-0.02048 0-0.0512 0-0.07168 0-0.07168 0-0.12288 0-0.19456 0l0 0.02048c-106.43456 8.2944-199.5264 117.9648-318.33088 32.12288 0 104.04864 0 208.10752 0 312.15616 38.52288 27.84256 74.33216 35.09248 108.78976 31.93856 0-0.01024 0-0.02048 0-0.03072 24.23808-3.66592 69.45792-17.98144 69.20192-17.85856 78.91968-30.19776 155.22816-80.24064 246.81472-14.04928 0-104.05888 0-208.10752 0-312.15616C744.12032 237.824 741.40672 235.99104 738.70336 234.22976zM640.64512 211.56864c41.1648-0.54272 59.91424 7.49568 94.5664 23.22432 2.38592 2.21184 4.79232 2.36544 7.34208 4.89472 0 40.7552 0 61.14304 0 101.90848-40.7552-40.54016-61.14304-43.12064-101.89824-37.7344C640.64512 266.45504 640.64512 246.13888 640.64512 211.56864zM639.36512 514.28352c0-40.9088 0-69.94944 0-110.85824-41.6256 5.90848-62.43328 19.49696-104.05888 41.51296 0 40.9088 0 61.35808 0 102.25664l-27.76064 12.71808c0 0-49.26464 18.13504-76.70784 20.74624 0-35.2256 0-55.6544 0-93.50144-41.6256 6.2976-62.44352 4.1984-104.06912-36.94592 0 40.9088 0 61.36832 0 102.26688-0.17408-0.17408-0.256-0.256-0.43008-0.43008 0.01024-67.2256 0-134.44096 0-201.6768 41.6256 41.40032 62.43328 43.60192 104.05888 37.43744 0-40.76544 0-69.40672 0-110.17216 42.47552-6.28736 63.72352-12.24704 106.19904-34.7136 0 40.76544 0 61.14304 0 101.90848 41.19552-21.79072 61.78816-35.08224 102.98368-40.8576 0 41.6256 0 62.43328 0 104.05888 41.19552-5.77536 61.78816-3.38944 102.98368 37.5808 0 39.05536 0 58.5728 0 97.61792C704.70656 515.35872 679.26016 510.83264 639.36512 514.28352zM431.03232 387.7376c41.61536-6.36928 62.43328-20.06016 104.05888-42.0864 0 41.6256 0 62.43328 0 104.05888-41.61536 22.016-62.43328 35.72736-104.05888 42.0864C431.03232 450.16064 431.03232 429.3632 431.03232 387.7376zM322.048 178.8416c0 20.30592-10.14784 38.22592-25.62048 49.03936l0 642.9184c0 18.87232-15.29856 34.17088-34.17088 34.17088-18.87232 0-34.17088-15.29856-34.17088-34.17088L228.08576 227.87072c-15.47264-10.81344-25.62048-28.7232-25.62048-49.03936 0-33.03424 26.7776-59.8016 59.8016-59.8016C295.2704 119.04 322.048 145.80736 322.048 178.8416z"
                  p-id="1059"
                ></path>
              </svg>
              <span>Highlights and analysis</span>
            </div>
          </div>
          <div class="schedulebottom_btn_container">
            <!-- 传值时注意name与path应与路由配置一致 -->
            <v-btn
              @click="
                $router.push({
                  name: 'Standings',
                  path: '/standing',
                  params: {
                    prixName: 'Bahrain',
                    prixId: $route.params.prixId,
                  },
                })
              "
              class="schedulebottom_resbtn"
              >RESULT</v-btn
            >
            <v-btn class="schedulebottom_reportbtn">REPORT</v-btn>
            <v-btn class="schedulebottom_hightbtn">HIGHLIGHT</v-btn>
          </div>
        </div>
        <div class="schedulebottom_table_column">
          <div class="schedulebottom_date_container">
            <span class="schedulebottom_day">20</span>
            <span class="schedulebottom_month">MAR</span>
          </div>
          <div class="schedulebottom_type_container">
            <div class="schedulebottom_type">Race</div>
            <div class="schedulebottom_intro">
              <svg
                t="1663896279840"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1058"
                width="28"
                height="28"
              >
                <path
                  d="M738.70336 234.22976c0.1024 0.0512 0.19456 0.09216 0.29696 0.13312-0.34816-0.21504-0.68608-0.39936-1.03424-0.60416-1.62816-1.05472-35.16416-25.5488-97.32096-26.10176l0-0.01024c-0.02048 0-0.0512 0-0.07168 0-0.07168 0-0.12288 0-0.19456 0l0 0.02048c-106.43456 8.2944-199.5264 117.9648-318.33088 32.12288 0 104.04864 0 208.10752 0 312.15616 38.52288 27.84256 74.33216 35.09248 108.78976 31.93856 0-0.01024 0-0.02048 0-0.03072 24.23808-3.66592 69.45792-17.98144 69.20192-17.85856 78.91968-30.19776 155.22816-80.24064 246.81472-14.04928 0-104.05888 0-208.10752 0-312.15616C744.12032 237.824 741.40672 235.99104 738.70336 234.22976zM640.64512 211.56864c41.1648-0.54272 59.91424 7.49568 94.5664 23.22432 2.38592 2.21184 4.79232 2.36544 7.34208 4.89472 0 40.7552 0 61.14304 0 101.90848-40.7552-40.54016-61.14304-43.12064-101.89824-37.7344C640.64512 266.45504 640.64512 246.13888 640.64512 211.56864zM639.36512 514.28352c0-40.9088 0-69.94944 0-110.85824-41.6256 5.90848-62.43328 19.49696-104.05888 41.51296 0 40.9088 0 61.35808 0 102.25664l-27.76064 12.71808c0 0-49.26464 18.13504-76.70784 20.74624 0-35.2256 0-55.6544 0-93.50144-41.6256 6.2976-62.44352 4.1984-104.06912-36.94592 0 40.9088 0 61.36832 0 102.26688-0.17408-0.17408-0.256-0.256-0.43008-0.43008 0.01024-67.2256 0-134.44096 0-201.6768 41.6256 41.40032 62.43328 43.60192 104.05888 37.43744 0-40.76544 0-69.40672 0-110.17216 42.47552-6.28736 63.72352-12.24704 106.19904-34.7136 0 40.76544 0 61.14304 0 101.90848 41.19552-21.79072 61.78816-35.08224 102.98368-40.8576 0 41.6256 0 62.43328 0 104.05888 41.19552-5.77536 61.78816-3.38944 102.98368 37.5808 0 39.05536 0 58.5728 0 97.61792C704.70656 515.35872 679.26016 510.83264 639.36512 514.28352zM431.03232 387.7376c41.61536-6.36928 62.43328-20.06016 104.05888-42.0864 0 41.6256 0 62.43328 0 104.05888-41.61536 22.016-62.43328 35.72736-104.05888 42.0864C431.03232 450.16064 431.03232 429.3632 431.03232 387.7376zM322.048 178.8416c0 20.30592-10.14784 38.22592-25.62048 49.03936l0 642.9184c0 18.87232-15.29856 34.17088-34.17088 34.17088-18.87232 0-34.17088-15.29856-34.17088-34.17088L228.08576 227.87072c-15.47264-10.81344-25.62048-28.7232-25.62048-49.03936 0-33.03424 26.7776-59.8016 59.8016-59.8016C295.2704 119.04 322.048 145.80736 322.048 178.8416z"
                  p-id="1059"
                ></path>
              </svg>
              <span>Highlights and analysis</span>
            </div>
          </div>
          <div class="schedulebottom_btn_container">
            <!-- 传值时注意name与path应与路由配置一致 -->
            <v-btn
              @click="
                $router.push({
                  name: 'Standings',
                  path: '/standing',
                  params: {
                    prixName: 'Bahrain',
                    prixId: $route.params.prixId,
                  },
                })
              "
              class="schedulebottom_resbtn"
              >RESULT</v-btn
            >
            <v-btn class="schedulebottom_reportbtn">REPORT</v-btn>
            <v-btn class="schedulebottom_hightbtn">HIGHLIGHT</v-btn>
          </div>
        </div>
      </div>
      <div class="schedulebottom_intro">
        <div class="f1-race-hub--body-text f1-race-hub--content container">
          <p>
            Get up to speed with everything you need to know about the 2022
            Bahrain Grand Prix, which takes place over 57 laps of the
            5.412-kilometre Bahrain International Circuit in Sakhir on Sunday,
            March 20.
          </p>
          <p>
            Using the links above you can find the full weekend schedule,
            including details of practice and qualifying sessions, support
            races, press conferences and special events, plus the latest news
            headlines, circuit information and F1 race results.
          </p>
          <p>
            You can also find broadcast information, with details of how and
            where you can watch the race on TV, or download the 2022 Bahrain
            Grand Prix schedule to your mobile device.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data:()=>({
    itemIndex:null,
  }),
  mounted() {
   this.itemIndex=localStorage.getItem('itemIndex');
    
  },
};
</script>

<style lang="scss" scoped>
.schedulebottom {
padding:100px 0;
  width: 100%;
  height: 1050px;
  display: flex;
  justify-content: center;
  background-color: rgba(247, 244, 241, 1);
  .schedulebottom_container {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    .schedulebottom_title {
      font-size: 3rem;
      font-family: Heavy;
      color: rgb(0, 0, 0);
    }
    .schedulebottom_subtitle {
      font-size: 1.5rem;
      font-family: Heavy;
      color: rgb(0, 0, 0);
    }

    .schedulebottom_intro {
      font-size: 1rem;
      font-family: Medium;
      color: rgb(0, 0, 0);
    }
    .schedulebottom_table_container {
      width: 100%;
      height: 640px;
      border-bottom: 10px solid rgb(255, 0, 0);
    border-right: 10px solid rgb(255, 0, 0);
    border-bottom-right-radius: 15px;
      .schedulebottom_table_column {
        width: 97%;
        height: 90px;
        background-color: rgb(255, 255, 255);
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        border-radius: 5px;
        .schedulebottom_date_container {
          width: 10%;
          height: 50%;
          display: flex;
          align-items: center;
          flex-direction: column;
          .schedulebottom_day {
            font-family: Medium;
            color: rgb(0, 0, 0);
            font-size: 1rem;
          }
          .schedulebottom_month {
            font-family: Medium;
            color: rgb(0, 0, 0);
            font-size: 1rem;
            background-color: rgb(237, 237, 237);
            border-radius: 10px;
            padding: 0 10px;
          }
        }
        .schedulebottom_type_container {
          width: 30%;
          height: 50%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          flex-direction: column;
          .schedulebottom_type {
            color: rgb(0, 0, 0);
            font-family: Heavy;
            font-size: 1.5rem;
          }
          .schedulebottom_intro {
            color: rgb(0, 0, 0);
            font-family: Heavy;
            font-size: 1rem;
            text-align: center;
            svg {
              vertical-align: middle;
              transform: translateX(-15%);
            }
          }
        }
        .schedulebottom_btn_container {
          width: 55%;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          column-gap: 20px;
          align-items: center;
        }
      }
    
    }
    .schedulebottom_intro {
        color: rgb(0, 0, 0);
        font-size: 1.1rem;
        font-family: Medium;
      }
  }
}
</style>