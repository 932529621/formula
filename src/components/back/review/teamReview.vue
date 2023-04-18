<template>
  <div>
    <v-card class="rounded-lg" :elevation="8">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="reserveDessert"
        class="elevation-1"
        :search="search"
        loading="false"
        loading-text="Loading... Please wait"
        show-select
        v-model="selected"
        item-key="ID"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="900px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  v-show="false"
                >
                </v-btn>
                <div class="selectbox">
                  <v-checkbox
                    v-model="checkSelected"
                    label="全部"
                    value="ALL"
                    @click="filterReview({ className: 'ALL' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="待审核"
                    value="will check"
                    color="orange"
                    @click="filterReview({ className: 'will check' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="已通过"
                    value="pass"
                    color="green"
                    @click="filterReview({ className: 'pass' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="基础信息通过"
                    value="info pass"
                    color="blue"
                    @click="filterReview({ className: 'info pass' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="不通过"
                    value="fail"
                    color="red"
                    @click="filterReview({ className: 'fail' })"
                  ></v-checkbox>
                </div>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Driver Details</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-card
                      class="mx-auto"
                      min-width="90%"
                      outlined
                      v-if="editedItem.type == 'enroll'"
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Basic Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">姓名</p>
                              <p class="cards-content">
                                {{ editedItem.VertifyName }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">性别</p>
                              <p class="cards-content">
                                {{ editedItem.gender }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">生日</p>
                              <p class="cards-content">
                                {{ editedItem.birthday }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                身份证号
                              </p>
                              <p class="cards-content">
                                {{ editedItem.VertifyID }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                          </div>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="80">
                          <v-img :src="editedItem.avatar"></v-img>
                        </v-list-item-avatar>
                      </v-list-item>
                    </v-card>
                    <v-card
                      class="mx-auto ma-4"
                      min-width="90%"
                      outlined
                      v-if="editedItem.type == 'enroll'"
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Contact Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                联系电话
                              </p>
                              <p class="cards-content">
                                {{ editedItem.phone }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">地址</p>
                              <p class="cards-content">
                                {{ editedItem.address }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">Email</p>
                              <p class="cards-content">
                                {{ editedItem.email }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                个人简介
                              </p>
                              <p class="cards-content">
                                {{ editedItem.introduction }}
                              </p>
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-card class="mx-auto" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Team Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">车队名</p>
                              <p class="cards-content">
                                {{ editedItem.full_teamname }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                :src="editedItem.team_icon"
                                class="cards-content"
                              ></v-img>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                车队简介
                              </p>
                              <p class="cards-content">
                                {{ editedItem.full_teamname }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                车队地址
                              </p>
                              <p class="cards-content">{{ editedItem.base }}</p>
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-card
                      class="mx-auto"
                      min-width="90%"
                      outlined
                      v-if="editedItem.type == 'uploadDriver'"
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Driver Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                车手头盔
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                :src="driverDetail.driver_helmet"
                                class="cards-content"
                                aspect-ratio="1.7"
                              ></v-img>
                            </div>
                            <v-divider></v-divider>
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                车手头像
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                :src="driverDetail.avatarUrl"
                                class="cards-content"
                                aspect-ratio="1.7"
                                contain
                              ></v-img>
                            </div>
                            <v-divider></v-divider>
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                车手半身照
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                :src="driverDetail.driver_pic"
                                class="cards-content"
                                aspect-ratio="1.7"
                                contain
                              ></v-img>
                            </div>
                            <v-divider></v-divider>
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                车手号码
                              </p>
                              <p class="cards-content">
                                {{ driverDetail.driver_number }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                :src="driverDetail.driver_number_icon"
                                class="cards-content"
                                aspect-ratio="1.7"
                                contain
                              ></v-img>
                            </div>
                            <v-divider></v-divider>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>

                    <v-card
                      class="mx-auto"
                      min-width="90%"
                      outlined
                      v-if="editedItem.type == 'enroll'"
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            License Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                场地所有权或场地租赁凭证
                              </p>
                              <p class="cards-content">
                                {{ editedItem.licensePlaceid }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                contain
                                aspect-ratio="1.7"
                                :src="editedItem.PlaceUrl"
                                class="cards-content"
                              ></v-img>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                经营许可证
                              </p>
                              <p class="cards-content">
                                {{ editedItem.licenseBusinessid }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                contain
                                max-width="100%"
                                :src="editedItem.BusinessUrl"
                                class="cards-content"
                              ></v-img>
                            </div>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                车辆所有权证
                              </p>
                              <p class="cards-content">
                                {{ editedItem.licensecarid }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                contain
                                :src="editedItem.carUrl"
                                class="cards-content"
                              ></v-img>
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-container>
                </v-card-text>

                <v-card-actions v-if="editedItem.type == 'enroll'">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    :disabled="
                      saveloading ||
                      editedItem.status === 'fail' ||
                      editedItem.status === 'pass'
                    "
                    :loading="saveloading"
                    text
                    @click="UpdateTeamReview({ status: 'fail' })"
                  >
                    不通过
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    :loading="saveloading"
                    :disabled="saveloading || editedItem.status !== 'info pass'"
                    text
                    @click="UpdateTeamReview({ status: 'pass' })"
                  >
                    通过
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    :loading="saveloading"
                    :disabled="
                      saveloading ||
                      editedItem.status === 'fail' ||
                      editedItem.status === 'pass' ||
                      editedItem.status === 'info pass'
                    "
                    text
                    @click="UpdateTeamReview({ status: 'info pass' })"
                  >
                    基础信息通过
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>

                <v-card-actions v-if="editedItem.type == 'uploadDriver'">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    :disabled="saveloading"
                    :loading="saveloading"
                    text
                    @click="UpdateDriverDetail({ status: 'fail' })"
                  >
                    不通过
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    :loading="saveloading"
                    :disabled="saveloading"
                    text
                    @click="UpdateDriverDetail({ status: 'pass' })"
                  >
                    通过
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">你确定要删除吗?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >取消</v-btn
                  >
                  <v-btn color="red darken-1" text @click="deleteItemConfirm"
                    >确定</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-eye </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="sendEmaildialog" persistent max-width="550">
      <v-card>
        <v-toolbar flat color="blue-grey" dark>
          <v-toolbar-title>
            <v-avatar> <img :src="editedItem.avatar" /> </v-avatar
          ></v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-text-field
            filled
            label="标题"
            v-model="postemailtitle"
          ></v-text-field>

          <v-textarea
            filled
            label="补充内容"
            v-model="postemailcontent"
          ></v-textarea>

          <v-divider class="my-2"></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" depressed @click="failreview()"> 发送 </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="
              sendEmaildialog = false;
              saveloading = false;
            "
            >取消</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="passdialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">资质审核表</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="审核人"
                  required
                  v-model="form.Reviewer"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="审核人电话"
                  required
                  v-model="form.ReviewerPhone"
                ></v-text-field
              ></v-col>
              <v-col cols="12">
                <v-text-field
                  label="审核单位"
                  v-model="form.Reviewerinstitution"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="审核地址"
                  v-model="form.ReviewerAdress"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="审核时间"
                  v-model="form.ReviewerDate"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-form ref="cardform" v-model="valid" lazy-validation>
                  <div>
                    <v-file-input
                      v-model="Placefile"
                      label="场地所有权或场地租赁证明"
                      hide-details
                      @change="previewPlaceImage"
                      accept="image/*"
                    ></v-file-input>
                    <v-img
                      :src="
                        PlaceimageUrl
                          ? PlaceimageUrl
                          : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                      "
                      width="128"
                      height="128"
                      class="ma-4"
                    ></v-img>
                    <v-text-field
                      v-model="form.licensePlaceid"
                      :rules="rules"
                      :counter="10"
                      label="场地所有权或场地租赁证明号"
                      outlined
                      required
                    ></v-text-field>
                    <v-file-input
                      v-model="Businessfile"
                      label="营业执照"
                      hide-details
                      @change="previewBusinessImage"
                      accept="image/*"
                    ></v-file-input>
                    <v-img
                      :src="
                        BusinessimageUrl
                          ? BusinessimageUrl
                          : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                      "
                      width="128"
                      height="128"
                      class="ma-4"
                    ></v-img>
                    <v-text-field
                      v-model="form.licenseBusinessid"
                      :rules="rules"
                      :counter="10"
                      label="营业执照号"
                      outlined
                      required
                    ></v-text-field>
                    <v-file-input
                      v-model="carfile"
                      label="车辆所有权"
                      hide-details
                      @change="previewcarImage"
                      accept="image/*"
                    ></v-file-input>
                    <v-img
                      :src="
                        carimageUrl
                          ? carimageUrl
                          : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                      "
                      width="128"
                      height="128"
                      class="ma-4"
                    ></v-img>
                    <v-text-field
                      v-model="form.licensecarid"
                      :rules="rules"
                      :counter="10"
                      label="车辆所有权号"
                      outlined
                      required
                    ></v-text-field>
                  </div>
                  <div class="carinfo">
                    <v-card-title>车辆详细参数</v-card-title>
                    <v-divider></v-divider>
                    <div>
                      <v-list-item-title class="text-h6 mt-4 ml-2">
                        发动机:
                      </v-list-item-title>
                      <div class="carinfocol">
                        <v-text-field
                          label="架构"
                          required
                          v-model="form.Architecture"
                        ></v-text-field>
                        <v-text-field
                          label="最高转速"
                          required
                          v-model="form.MaxRotate"
                        ></v-text-field>
                      </div>
                      <div class="carinfocol">
                        <v-text-field
                          label="MGU-K转速限制"
                          required
                          v-model="form.MGUK_speed"
                        ></v-text-field>
                        <v-text-field
                          label="MGU-K输出功率"
                          required
                          v-model="form.MGUK_power"
                        ></v-text-field>
                      </div>
                      <div class="carinfocol">
                        <v-text-field
                          label="排量"
                          required
                          v-model="form.Displacement"
                        ></v-text-field>
                        <v-text-field
                          label="燃油限制"
                          required
                          v-model="form.Fuellimit"
                        ></v-text-field>
                      </div>
                    </div>
                    <div>
                      <v-list-item-title class="text-h6 mt-4 ml-2">
                        车重:
                      </v-list-item-title>
                      <div class="carinfocol">
                        <v-text-field
                          label="总重量（包括驾驶员和车辆）"
                          required
                          suffix="kg"
                          v-model="form.Total_weight"
                        ></v-text-field>
                        <v-text-field
                          label="最小车重（包括驾驶员和样本）"
                          required
                          v-model="form.Minimum_weight"
                          suffix="kg"
                        ></v-text-field>
                      </div>
                      <div class="carinfocol">
                        <v-text-field
                          label="车宽（含轮胎）"
                          required
                          v-model="form.Vehicle_width"
                          suffix="mm"
                        ></v-text-field>
                        <v-text-field
                          label="总高度"
                          required
                          v-model="form.Vehicle_height"
                          suffix="mm"
                        ></v-text-field>
                      </div>
                    </div>
                    <div>
                      <v-list-item-title class="text-h6 mt-4 ml-2">
                        轮胎:
                      </v-list-item-title>
                      <div class="carinfocol">
                        <v-text-field
                          label="前轮轴重量"
                          required
                          v-model="form.weight_front_axle"
                          suffix="kg"
                        ></v-text-field>
                        <v-text-field
                          label="后轮轴重量"
                          required
                          v-model="form.weight_back_axle"
                          suffix="kg"
                        ></v-text-field>
                      </div>
                      <div class="carinfocol">
                        <v-text-field
                          label="前轮规格"
                          required
                          v-model="form.Front_wheel"
                        ></v-text-field>
                        <v-text-field
                          label="后轮规格"
                          required
                          v-model="form.back_wheel"
                        ></v-text-field>
                      </div>
                    </div>
                    <div>
                      <v-list-item-title class="text-h6 mt-4 ml-2">
                        刹车:
                      </v-list-item-title>
                      <div class="carinfocol">
                        <v-text-field
                          label="刹车片宽度"
                          required
                          v-model="form.Brakepad_width"
                          suffix="mm"
                        ></v-text-field>
                        <v-text-field
                          label="刹车片数量"
                          required
                          v-model="form.Brakepad_number"
                        ></v-text-field>
                      </div>
                      <div class="carinfocol">
                        <v-text-field
                          label="刹车盘直径"
                          required
                          v-model="form.Brake_diameter"
                          suffix="mm"
                        ></v-text-field>
                        <v-text-field
                          label="刹车盘厚度"
                          required
                          v-model="form.Brake_thickness"
                          suffix="mm"
                        ></v-text-field>
                      </div>
                    </div>
                    <div>
                      <v-list-item-title class="text-h6 mt-4 ml-2">
                        底盘:
                      </v-list-item-title>
                      <div class="carinfocol">
                        <v-text-field
                          label="底盘结构"
                          required
                          v-model="form.Chassis"
                        ></v-text-field>
                        <v-text-field
                          label="轴距"
                          required
                          v-model="form.Wheelbase"
                          suffix="mm"
                        ></v-text-field>
                      </div>
                      <div class="carinfocol">
                        <v-text-field
                          label="最小地面间隙"
                          required
                          v-model="form.Min_ground_clearance"
                          suffix="mm"
                        ></v-text-field>
                        <v-text-field
                          label="最小底盘厚度"
                          required
                          v-model="form.Min_ground_thickness"
                          suffix="mm"
                        ></v-text-field>
                      </div>
                    </div>
                    <div>
                      <v-list-item-title class="text-h6 mt-4 ml-2">
                        传动系统:
                      </v-list-item-title>
                      <div class="carinfocol">
                        <v-text-field
                          label="变速箱"
                          required
                          v-model="form.Transmission"
                        ></v-text-field>
                        <v-text-field
                          label="变速箱材料"
                          required
                          v-model="form.Trans_material"
                        ></v-text-field>
                      </div>
                      <div class="carinfocol">
                        <v-text-field
                          label="变速箱重量"
                          required
                          v-model="form.Trans_weight"
                          suffix="kg"
                        ></v-text-field>
                        <v-text-field
                          label="差速器"
                          required
                          v-model="form.Trans_Differential"
                        ></v-text-field>
                      </div>
                      <div class="carinfocol">
                        <v-text-field
                          label="最高转速差"
                          required
                          v-model="form.Hight_speed_difference"
                          suffix="rpm"
                        ></v-text-field>
                        <v-text-field
                          label="最大速度差"
                          required
                          v-model="form.Max_speed_difference"
                          suffix="km/h"
                        ></v-text-field>
                      </div>
                      <div class="carinfocol">
                        <v-text-field
                          label="垂直上升速率"
                          required
                          v-model="form.Vertical_rise"
                          suffix="mm/s"
                        ></v-text-field>
                        <v-text-field
                          label="水平上升速率"
                          required
                          v-model="form.Horizontal_rise"
                          suffix="mm/s"
                        ></v-text-field>
                      </div>
                    </div>
                  </div>
                  <v-col> </v-col>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red darken-1"
            text
            @click="
              passdialog = false;
              saveloading = false;
            "
          >
            关闭
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="OfflineReview()">
            上传
          </v-btn>
          <v-btn
            color="light-green accent-4"
            @click="autoComplete()"
            >生成</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="2500"
      :value="isSnackbar"
      fixed
      bottom
      tile
      :color="isSnackbarSuccess ? 'success' : 'red'"
      ref="snackbar"
    >
      {{ snackbarTitle }}
    </v-snackbar>
  </div>
</template>
      
<script>
import {
  getTeamreview,
  UpdateTeamReview,
  InsertOrUpdateBackuser,
  addServeEmailinfo,
  DeleteTeamReview,
  addOrderinfo,
  OssuploadNewsImg,
  addOfflineReview,
  addOrUpdateTeamdetail,
  addTeaminfo,
  getDriverDetail,
  UploadDriverDetails,
  getBackuserByDriverEmail,
} from "@/plugins/http";
import { mapState } from "vuex";
import { nanoid } from "nanoid";
export default {
  data() {
    return {
      isSnackbar: false,
      isSnackbarSuccess: null,
      saveloading: false,

      checkSelected: "ALL",

      dialog: false,
      dialogDelete: false,
      sendEmaildialog: false,
      passdialog: false,

      search: "",
      selected: [],
      roleInfo: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "车队名", value: "full_teamname" },
        { text: "用户名", value: "username" },
        { text: "状态", value: "status" },
        { text: "类型", value: "type" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
      driverDetail: {},
      editedIndex: -1,
      editedItem: {
        id: "",
        user_id: "",
        username: "",
        status: "",
        full_teamname: "",
        team_icon: "",
        team_biography: "",
        base: "",
        PlaceUrl: "",
        BusinessUrl: "",
        carUrl: "",
        licensePlaceid: "",
        licenseBusinessid: "",
        licensecarid: "",
      },
      defaultItem: {
        id: "",
        user_id: "",
        username: "",
        status: "",
        full_teamname: "",
        team_icon: "",
        team_biography: "",
        base: "",
        PlaceUrl: "",
        BusinessUrl: "",
        carUrl: "",
        licensePlaceid: "",
        licenseBusinessid: "",
        licensecarid: "",
      },
      postemailtitle: "",
      postemailcontent: "",
      reserveDessert: [],

      rules: [(v) => !!v || "此项是必填的"],
      valid: true,

      file: null,
      Placefile: null,
      Businessfile: null,
      carfile: null,
      imageUrl: null,
      PlaceimageUrl: null,
      BusinessimageUrl: null,
      carimageUrl: null,
      form: {
        team_apply_id: "",
        Placeurl: "",
        BusinessUrl: "",
        carUrl: "",

        Reviewer: "",
        ReviewerPhone: "",
        Reviewerinstitution: "",
        ReviewerAdress: "",
        Reviewer: "",
        Reviewer: "",
        ReviewerDate: "",

        licensePlaceid: "",
        licenseBusinessid: "",
        licensecarid: "",

        //car
        Architecture: "",
        MaxRotate: "",
        MGUK_speed: "",
        MGUK_power: "",
        Displacement: "",
        Fuellimit: "",
        Total_weight: "",
        Minimum_weight: "",
        Vehicle_width: "",
        Vehicle_height: "",
        weight_front_axle: "",
        weight_back_axle: "",
        back_wheel: "",
        Front_wheel: "",
        Brakepad_width: "",
        Brakepad_number: "",
        Brake_diameter: "",
        Brake_thickness: "",
        Chassis: "",
        Wheelbase: "",
        Min_ground_clearance: "",
        Min_ground_thickness: "",
        Transmission: "",
        Trans_material: "",
        Trans_weight: "",
        Trans_Differential: "",
        Hight_speed_difference: "",
        Max_speed_difference: "",
        Vertical_rise: "",
        Horizontal_rise: "",
      },
    };
  },

  computed: {
    snackbarTitle() {
      return this.isSnackbarSuccess === true ? "操作成功" : "操作失败";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    autoComplete() {
      this.form.Architecture="65";
      this.form.Brake_diameter="57";
      this.form.Brake_thickness="899";
      this.form.Brakepad_number="453";
      this.form.Brakepad_width="446";
      this.form.Chassis="689";
      this.form.Displacement="56";
      this.form.Front_wheel="65";
      this.form.Fuellimit="99";
      this.form.Hight_speed_difference="43";
      this.form.Horizontal_rise="345";
      this.form.MGUK_power="45";
      this.form.MGUK_speed="324";
      this.form.MaxRotate="142";
      this.form.Max_speed_difference="14";
      this.form.Min_ground_clearance="42";
      this.form.Min_ground_thickness="36";
      this.form.Minimum_weight="958";
      this.form.Reviewer="1@qq.com";
      this.form.ReviewerAdress="福建江夏学院";
      this.form.ReviewerDate="2022-4-13";
      this.form.ReviewerPhone="15980618073";
      this.form.Reviewerinstitution="90";
      this.form.Total_weight="54";
      this.form.Trans_Differential="65";
      this.form.Trans_material="73";
      this.form.Trans_weight="27";
      this.form.Transmission="84";
      this.form.Vehicle_height="58";
      this.form.Vehicle_width="58";
      this.form.Vertical_rise="68";
      this.form.Wheelbase="74";
      this.form.back_wheel="66";
      this.form.licenseBusinessid="43";
      this.form.licensePlaceid="99";
      this.form.licensecarid="24";
      this.form.weight_back_axle="57";
      this.form.weight_front_axle="57";
    },
    async initialize() {
      const Review = await getTeamreview();
      if (Review.status === 200) {
        for (let key of Review.data.teamreviewinfo) {
          this.desserts.push(key);
        }
        this.reserveDessert = JSON.parse(JSON.stringify(this.desserts));
      }
    },

    async previewPlaceImage() {
      if (!this.Placefile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.Placefile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);

      this.form.Placeurl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.Placefile);
      reader.onload = () => {
        this.PlaceimageUrl = reader.result;
      };
    },
    async previewBusinessImage() {
      if (!this.Businessfile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.Businessfile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      this.form.BusinessUrl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.Businessfile);
      reader.onload = () => {
        this.BusinessimageUrl = reader.result;
      };
    },
    async previewcarImage() {
      if (!this.carfile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.carfile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      this.form.carUrl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.carfile);
      reader.onload = () => {
        this.carimageUrl = reader.result;
      };
    },

    async UpdateDriverDetail() {
      if (status.status == "pass") {
        const obj = {
          id: this.editedItem.id,
          status: "pass",
          user_id: this.editedItem.user_id,
          full_teamname: this.editedItem.full_teamname,
          type: "uploadDriver",
          driver_email: this.editedItem.driver_email,
        };
        const updateRes = await UpdateTeamReview(obj);
        if (updateRes.data.Operation == "success") {
          this.isSnackbarSuccess = true;
          this.isSnackbar = true;
          this.desserts[this.editedIndex].status = status.status;
          this.reserveDessert[this.editedIndex].status = status.status;
          setTimeout(() => {
            this.isSnackbar = false;
            this.saveloading = false;
            this.close();
          }, 2500);
        } else {
          this.isSnackbarSuccess = false;
          this.isSnackbar = true;
          setTimeout(() => {
            this.isSnackbar = false;
            this.saveloading = false;
            this.close();
          }, 2500);
        }
      } else {
        const obj = {
          id: this.editedItem.id,
          status: "fail",
          user_id: this.editedItem.user_id,
          full_teamname: this.editedItem.full_teamname,
          type: "uploadDriver",
          driver_email: this.editedItem.driver_email,
        };
        const updateRes = await UpdateTeamReview(obj);
        const res = await UploadDriverDetails({
          NumberIconUrl: null,
          driver_number: null,
          helmetUrl: null,
          halfpicUrl: null,
          avatarUrl: null,
        });
        if (updateRes.data.Operation == "success") {
          this.isSnackbarSuccess = true;
          this.isSnackbar = true;
          this.desserts[this.editedIndex].status = status.status;
          this.reserveDessert[this.editedIndex].status = status.status;
          setTimeout(() => {
            this.isSnackbar = false;
            this.saveloading = false;
            this.close();
          }, 2500);
        } else {
          this.isSnackbarSuccess = false;
          this.isSnackbar = true;
          setTimeout(() => {
            this.isSnackbar = false;
            this.saveloading = false;
            this.close();
          }, 2500);
        }
      }
    },

    async UpdateTeamReview(status) {
      this.saveloading = true;
      this.editedItem.status = status.status;
      if (status.status == "info pass") {
        const pwd = nanoid(11);
        const obj = {
          id: this.editedItem.id,
          user_id: this.editedItem.user_id,
          username: this.editedItem.username,
          status: this.editedItem.status,
          full_teamname: this.editedItem.full_teamname,
          team_icon: this.editedItem.team_icon,
          team_biography: this.editedItem.team_biography,
          base: this.editedItem.base,
          PlaceUrl: this.editedItem.PlaceUrl,
          BusinessUrl: this.editedItem.BusinessUrl,
          carUrl: this.editedItem.carUrl,
          licensePlaceid: this.editedItem.licensePlaceid,
          licenseBusinessid: this.editedItem.licenseBusinessid,
          licensecarid: this.editedItem.licensecarid,
        };
        const insetObj = {
          email: this.editedItem.user_email,
          password: pwd,
          avatar: this.editedItem.avatar,
          role_name: "wait Team",
        };
        const addObj = {
          title: "Welcome to Formula One !",
          receiver_id: this.editedItem.user_email,
          type: "mail",
          content: ` Hi!恭喜你通过审核，请在1-3个工作日内登录车队账号完成线下审核费用支付，
              完成最后的线下审核。你的车队账号：${this.editedItem.user_email} 密码:${pwd}`,
        };
        const addOrderObj = {
          user_email: this.editedItem.user_email,
          order_name: "线下审核费用",
          order_intro: "Welcome to Formula One !",
          price: 2000,
          type: "线下审核费用",
        };

        const [updateRes, InsertRes, addRes, addOrderres] = await Promise.all(
          [
            UpdateTeamReview(obj),
            InsertOrUpdateBackuser(insetObj),
            addServeEmailinfo(addObj),
            addOrderinfo(addOrderObj),
          ].map((v) => v.catch((e) => console.log(e)))
        );
        console.log(addOrderres);

        if (
          updateRes.data.Operation == "success" &&
          InsertRes.data.Operation == "success" &&
          addRes.data.Operation == "success" &&
          addOrderres.data.Operation == "success"
        ) {
          this.isSnackbarSuccess = true;
          this.isSnackbar = true;
          this.desserts[this.editedIndex].status = status.status;
          this.reserveDessert[this.editedIndex].status = status.status;
          setTimeout(() => {
            this.isSnackbar = false;
            this.saveloading = false;
            this.close();
          }, 2500);
        } else {
          this.isSnackbarSuccess = false;
          this.isSnackbar = true;
          setTimeout(() => {
            this.isSnackbar = false;
            this.saveloading = false;
            this.close();
          }, 2500);
        }
      } else if (status.status == "fail") {
        this.sendEmaildialog = true;
      } else {
        this.passdialog = true;
      }
    },
    async failreview() {
      const obj = {
        id: this.editedItem.id,
        user_id: this.editedItem.user_id,
        username: this.editedItem.username,
        status: "fail",
        full_teamname: this.editedItem.full_teamname,
        team_icon: this.editedItem.team_icon,
        team_biography: this.editedItem.team_biography,
        base: this.editedItem.base,
        PlaceUrl: this.editedItem.PlaceUrl,
        BusinessUrl: this.editedItem.BusinessUrl,
        carUrl: this.editedItem.carUrl,
        licensePlaceid: this.editedItem.licensePlaceid,
        licenseBusinessid: this.editedItem.licenseBusinessid,
        licensecarid: this.editedItem.licensecarid,
      };
      const [updateRes, addRes] = await Promise.all(
        [
          UpdateTeamReview(obj),
          addServeEmailinfo({
            title: this.postemailtitle,
            content: this.postemailcontent,
            receiver_id: this.editedItem.user_email,
            type: "mail",
          }),
        ].map((v) => v.catch((e) => console.log(e)))
      );
      if (
        updateRes.data.Operation == "success" &&
        addRes.data.Operation == "success"
      ) {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        console.log(this.desserts[this.editedIndex]);
        this.desserts[this.editedIndex].status = status.status;
        this.reserveDessert[this.editedIndex].status = status.status;
        this.sendEmaildialog = false;
        setTimeout(() => {
          this.saveloading = false;
          this.isSnackbar = false;
          this.close();
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        this.sendEmaildialog = false;
        setTimeout(() => {
          this.saveloading = false;
          this.isSnackbar = false;
          this.close();
        }, 2500);
      }
    },
    async OfflineReview() {
      const obj = {
        id: this.editedItem.id,
        user_id: this.editedItem.user_id,
        username: this.editedItem.username,
        status: "pass",
        full_teamname: this.editedItem.full_teamname,
        team_icon: this.editedItem.team_icon,
        team_biography: this.editedItem.team_biography,
        base: this.editedItem.base,
        PlaceUrl: this.editedItem.PlaceUrl,
        BusinessUrl: this.editedItem.BusinessUrl,
        carUrl: this.editedItem.carUrl,
        licensePlaceid: this.editedItem.licensePlaceid,
        licenseBusinessid: this.editedItem.licenseBusinessid,
        licensecarid: this.editedItem.licensecarid,
      };
      const addOrderObj = {
        id: nanoid(11),
        user_email: this.editedItem.user_email,
        order_name: "车队注册费",
        order_intro: "Welcome to Formula One !",
        price: 200000,
        type: "team Registration",
      };
      const addTeamdetail = {
        email: this.editedItem.user_email,
        full_teamname: this.editedItem.full_teamname,
        team_icon: this.editedItem.carUrl,
        team_biography: this.editedItem.team_biography,
        base: this.editedItem.base,
      };
      const [updateRes, addRes, addoff, addOrder, addteam] = await Promise.all(
        [
          UpdateTeamReview(obj),
          addServeEmailinfo({
            title: "congratulations，你通过了全部审核！",
            content:
              "恭喜你，通过了所有审核，请您尽快登录并支付车队注册费，开始赛事相关事务。",
            receiver_id: this.editedItem.user_email,
            type: "mail",
          }),
          addOfflineReview(this.form),
          addOrderinfo(addOrderObj),
          addOrUpdateTeamdetail(addTeamdetail),
          addTeaminfo({
            email: this.editedItem.user_email,
            team: this.editedItem.full_teamname,
          }),
        ].map((v) => v.catch((e) => console.log(e)))
      );
      if (
        updateRes.data.Operation == "success" &&
        addRes.data.Operation == "success" &&
        addoff.data.Operation == "success"
      ) {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        console.log(this.desserts[this.editedIndex]);
        this.desserts[this.editedIndex].status = status.status;
        this.reserveDessert[this.editedIndex].status = status.status;
        this.sendEmaildialog = false;
        setTimeout(() => {
          this.saveloading = false;
          this.isSnackbar = false;
          this.close();
          this.passdialog = false;
          window.location.reload();
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        this.sendEmaildialog = false;
        setTimeout(() => {
          this.saveloading = false;
          this.isSnackbar = false;
          this.close();
          window.location.reload();
          this.passdialog = false;
        }, 2500);
      }
    },

    async DeleteTeamReview() {
      this.saveloading = true;
      const res = await DeleteTeamReview({
        id: this.editedItem.id,
      });
      this.closeDelete();
      if (res.data.Operation == "success") {
        this.desserts.splice(this.editedIndex, 1);
        this.reserveDessert.splice(this.editedIndex, 1);
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.close();
          this.isSnackbar = false;
          this.saveloading = false;
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.close();
          this.isSnackbar = false;
          this.saveloading = false;
        }, 2500);
      }
    },

    filterReview(a) {
      console.log(a.className);
      this.reserveDessert = JSON.parse(JSON.stringify(this.desserts));
      if (a.className == "ALL") {
        this.reserveDessert = this.desserts.filter((item) => {
          return item;
        });
      } else {
        this.reserveDessert = this.desserts.filter((item) => {
          return item.status == a.className;
        });
      }
    },

    getColor(status) {
      if (status == "fail") return "red";
      else if (status == "will check") return "orange";
      else if (status == "info pass") return "blue";
      else return "green";
    },

    async editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = this.desserts.findIndex((item) => {
        return item.LicenseID == this.editedItem.LicenseID;
      });
      this.form.team_apply_id = this.editedItem.id;
      if (this.editedItem.type == "uploadDriver") {
        const user_email = this.editedItem.driver_email;
        const res = await getDriverDetail({
          user_email,
        });
        const ress = await getBackuserByDriverEmail({
          user_email,
        });
        console.log(ress);

        this.driverDetail = res.data.DriverDetail;
        this.driverDetail.avatarUrl = ress.data.users.avatar;
      }
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = this.desserts.findIndex((item) => {
        return item.LicenseID == this.editedItem.LicenseID;
      });
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.DeleteTeamReview();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
      
  <style scoped lang="scss">
.carinfocol {
  display: flex;
  column-gap: 30px;
}
.selectbox {
  display: flex;
  padding: 5px;
  column-gap: 10px;
}
.v-messages {
  min-height: none !important;
}
.basicinfo {
  display: flex;
  max-width: 100%;
  flex-direction: column;
  row-gap: 17px;
  padding: 30px;
  .column-info {
    display: flex;
    column-gap: 20px;
  }
  .cards-title {
    font-size: 12px !important;
    font-weight: 500;
    letter-spacing: 0.1px;
    line-height: 16px;
    white-space: nowrap;
    color: rgb(95, 99, 104);
    flex-grow: 0.5;
  }
  .cards-content {
    font-size: 18px;
    font-weight: 300;
    word-break: break-word;
    word-wrap: break-word;
    color: rgb(32, 33, 36);
    flex-grow: 1;
  }
}
</style>