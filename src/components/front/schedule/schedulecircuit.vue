<template>
  <v-app>
    <div class="circuit">
      <div class="circuit_container">
        <div class="circuit_head">
          <div class="circuit_head_title">
            FORMULA 1 GRAN PREMIO DE LA CIUDAD DE MÉXICO 2022
          </div>
          <!-- <div class="circuit_head_time">
            
            
          </div> -->
        </div>
        <div class="circuit_table">
          <img
            class="circuit_table_left"
            src="http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/schedule/nation_map_circuit/Bahrain.png       "
          />
          <div class="circuit_table_right">
            <div class="circuit_table_firstgrind">
              <div class="circuit_table_title">First Grand Prix</div>
              <span class="circuit_table_content">1963</span>
            </div>
            <div class="circuit_table_lap">
              <div class="circuit_table_title">Number of Laps</div>
              <span class="circuit_table_content">71</span>
            </div>
            <div class="circuit_table_length">
              <div class="circuit_table_title">Circuit Length</div>
              <span class="circuit_table_content">4.304</span>
              <span class="circuit_table_another">km</span>
            </div>
            <div class="circuit_table_distance">
              <div class="circuit_table_title">Race Distance</div>
              <span class="circuit_table_content">305.354</span>
              <span class="circuit_table_another">km</span>
            </div>
            <div class="circuit_table_record">
              <div class="circuit_table_title">Lap Record</div>
              <span class="circuit_table_content">1:17.774</span>
              <span class="circuit_table_another">Valtteri Bottas (2021)</span>
            </div>
            <div class="circuit_table_nationname">
              <div class="circuit_table_title">Nation</div>
              <img
                class="circuit_table_nationIcon"
                src="http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/schedule/nation_icon/Hungary.png"
              />
              <span class="circuit_table_content">MEXICO</span>
            </div>
          </div>
          <div class="circuit_table_racename">Autódromo Hermanos Rodríguez</div>
        </div>
        <div class="circuit_intro">
          <h2>Sakhir</h2>
          <h3>When was the track built?</h3>
          <p>
            Ground was broken for the Bahrain International Circuit in December
            2002. Like the Yas Marina Circuit in Abu Dhabi, the developers had a
            blank, sandy canvas to work with, and with that fashioned the
            technical, 5.4km track designed by Hermann Tilke.
          </p>
          <h3>When was its first Grand Prix?</h3>
          <p>
            It was 2004 when the drivers first lined up under an unusually
            cloudy sky for the inaugural Bahrain Grand Prix. The race was
            dominated (like many in 2004) by the two Ferraris, with Michael
            Schumacher winning out from Rubens Barrichello, while the crowds
            were also treated to
            <a href="https://www.youtube.com/watch?v=Q8mRAjFGr4Q"
              >a fantastic dog-fight</a
            >
            between the Jaguar of Mark Webber and the Renault of Fernando
            Alonso.
          </p>
          <h3>What’s the circuit like?</h3>
          <p>
            You can usually expect great racing and decent amounts of overtaking
            in Bahrain, while the drivers have to contend with wind, racing
            under floodlights and the difficulty of finding a decent set-up with
            the wide temperature fluctuations between sessions. The track’s most
            challenging point is the tight, downhill, off-camber Turn 10
            left-hander, while the fast run through Turn 12 is another
            highlight, allowing the racers to really feel their cars coming
            alive.
          </p>
          <h3>Why go?</h3>
          <p>
            Given the nature of the track, race-goers in Bahrain have always got
            a decent chance of being treated to a
            <a href="https://www.youtube.com/watch?v=sTH87phrwEs"
              >'duel in the desert'</a
            >
            or three. Away from the race track, Bahrain, as you might expect, is
            a great place to catch some rays, with the 33-island archipelago
            kingdom featuring some jaw-dropping resorts. And if you want to do
            some racing yourself, the Bahrain International Karting Circuit,
            located right next to the track, is one of the world’s top karting
            facilities.
          </p>
          <h3>Where is the best place to watch?</h3>
          <p>
            Your options are slightly limited in Bahrain, given that the
            organisers understandably don’t want loads of fans having to traipse
            out into the middle of a hot desert to watch the action! We reckon
            your best bet is to get a place in the Batelco grandstand, giving
            you a great view of cars charging into Turn 8, hammering through 9
            and 10 and then passing you on the run down to the short-apex Turn
            11. Otherwise, the grandstand on the outside of Turns 1 and 2 will
            allow you to watch overtaking aplenty on either track layout.
          </p>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.circuit {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  .circuit_container {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 60px;
    .circuit_head {
      width: 100%;
      height: 128px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .circuit_head_title {
        color: rgb(0, 0, 0);
        font-family: Medium;
        font-size: 1.5rem;
      }
      .circuit_head_time {
        width: 30%;
        height: 100%;
        background-color: green;
      }
    }
    .circuit_table {
      width: 100%;
      height: auto;
      display: flex;
      border-top: solid 10px #ff0000;
      border-right: solid 10px #ff0000;
      border-top-right-radius: 15px;
      padding: 50px 60px;
      position: relative;
      .circuit_table_left {
        width: 60%;
        height: 100%;
        object-fit: cover;
      }
      .circuit_table_right {
        width: 40%;
        height: 100%;
        display: grid;
        grid-template-columns: 48% 48%;
        grid-template-rows: 20% 20% 20% 20%;
        column-gap: 20px;
        row-gap: 30px;
        .circuit_table_record {
          grid-column-start: 1;
          grid-column-end: 3;
        }
        .circuit_table_nationname {
          grid-column-start: 1;
          grid-column-end: 3;
        }
        .circuit_table_title,
        .circuit_table_another {
          font-size: 0.8rem;
          font-family: Medium;
          color: rgb(0, 0, 0, 0.8);
        }
        .circuit_table_content {
          font-size: 2.5rem;
          font-family: Heavy;
          color: #000000;
          margin-right: 5px;
          vertical-align: middle;
        }
        .circuit_table_nationIcon {
          width: 60px;
          height: 33px;
          border-radius: 5px;
          margin-right: 15px;
          margin-top: 5px;
          vertical-align: middle;
        }
      }
      .circuit_table_right > div {
        border-bottom: solid 2px #d0d0d2;
        border-right: solid 2px #d0d0d2;
        border-bottom-right-radius: 15px;
        transition: all 0.5s ease;
      }
      .circuit_table_right > div:hover {
        border-bottom: solid 2px #ff0000;
        border-right: solid 2px #ff0000;
        border-bottom-right-radius: 15px;
      }
    }
    .circuit_table_racename {
      position: absolute;
      top: 0%;
      left: 0%;
      transform: translate(0, -60%);
      background-color: rgb(255, 255, 255);
      font-family: Heavy;
      font-size: 3rem;
      color: rgb(0, 0, 0);
    }
    .circuit_intro {
      h2{
        font-family: Heavy;
        font-size: 2.5rem;
      }
      h3{
        font-family: Heavy;
      }
      p{
        font-family: Medium;
      }
      margin-bottom: 200px;
    }
  }
}

</style>