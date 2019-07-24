<template>
  <div style="flex: 1;width: 100%;background-color: #E1E7Eb;">
    <el-container style="width: 100%;height: 90%;">
      <el-main class="main-pan">
        <div style="width: 100%;padding: 20px;">
          <div style="width: 100%;" v-if="getCategory == '完形填空'">
            <div style="color: black;font-weight: bold;padding-bottom: 10px;">完形填空题</div>
            <div class="normal_border">
              <div style="font-weight: bold;font-size: 15px;">{{currentData.id}}题.{{getStem}}</div>
              <div v-for="(item,key,index) of getStemParent.question" style="margin-top: 5px;">
                <span>
                  <i :class="getEndChar(getAnswer[key]) == item.myAnswer ?'el-icon-success my_success':'el-icon-error my_error'"
                     style="margin: 3px"
                     v-show="!testing"></i>
                  {{item.stem}}
                  <el-radio-group v-model="item.myAnswer">
                    <el-radio v-for="subItem of ['A','B','C','D']" :label="subItem">{{subItem}}.{{item[subItem]}}</el-radio>
                  </el-radio-group>
                </span>
              </div>
            </div>
          </div>
          <div style="width: 100%;" v-if="getCategory == '阅读理解'">
            <div style="color: black;font-weight: bold;padding-bottom: 10px;">阅读理解题</div>
            <div class="normal_border">
              <div style="font-weight: bold;font-size: 15px;">{{currentData.id}}题.{{getStem}}</div>
              <div v-for="(item,key,index) of getStemParent.question" style="display: flex;margin-top: 5px;">
                <i :class="getEndChar(getAnswer[key]) == item.myAnswer ?'el-icon-success my_success':'el-icon-error my_error'"
                   style="margin: 3px"
                   v-show="!testing"></i>
                <div>
                  <div>{{item.stem}}</div>
                  <el-radio-group v-model="item.myAnswer">
                    <div v-for="subItem of ['A','B','C','D']" style="margin-top: 5px;">
                      <el-radio :label="subItem">{{subItem}}.{{item[subItem]}}</el-radio>
                    </div>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%;" v-if="getCategory == '单选'">
            <div style="color: black;font-weight: bold;padding-bottom: 10px;">单项选择题 阅读题干，从四个选项中（A，B，C，D），选出最佳答案</div>
            <div style="display: flex;" class="normal_border">
              <i
                :class="getEndChar(getAnswer['1']) == currentData.stem.question['1'].myAnswer ?'el-icon-success my_success':'el-icon-error my_error'"
                style="margin: 3px"
                v-show="!testing"></i>
              <div>
                <div style="font-weight: bold;font-size: 15px;">{{currentData.id}}题.{{getStem}}</div>
                <el-radio-group v-model="currentData.stem.question['1'].myAnswer">
                  <div v-for="subItem of ['A','B','C','D']" style="margin-top: 5px;">
                    <el-radio v-show="getStemParent.question['1'][subItem] != undefined" :label="subItem">
                      {{subItem}}.{{getStemParent.question['1'][subItem]}}
                    </el-radio>
                  </div>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div style="width: 100%;" v-if="getCategory == '翻译'">
            <div style="color: black;font-weight: bold;padding-bottom: 10px;">英汉翻译题</div>
            <div class="normal_border">
              <div style="font-weight: bold;font-size: 15px;">{{currentData.id}}题.{{getStemParent.question['1'].stem}}</div>
              <br>
              <div>{{getStemParent.question['1']['A']}}</div>
              <div>请将答案填入下面空格，并用英文","分隔：</div>
              <input style="width: 100%;" v-model="currentData.stem.myAnswer"></input>
            </div>
          </div>
          <div style="width: 100%;" v-if="getCategory == '作文'">
            <div style="color: black;font-weight: bold;padding-bottom: 10px;">书面表达题</div>
            <div class="normal_border">
              <div style="font-weight: bold;font-size: 15px;">{{currentData.id}}题.{{getStem}}</div>
              <el-input style="margin-top: 10px;" type="textarea" :rows="8" v-model="currentData.stem.question['1'].myAnswer"></el-input>
            </div>
          </div>
          <br>
          <div v-if="!testing" style="border: #42b983 solid 1px;padding: 10px;">
            <div>解析：</div>
            <div>
              {{currentData.stem.analyze.stem}}
            </div>
            <br>
            <div v-for="(item,key,index) of currentData.stem.analyze">
              <div v-if="key != 'stem' && key != 'label'">
                {{item}}
              </div>
              <br>
            </div>
          </div>
        </div>
      </el-main>
      <el-aside width="26%" style="padding: 18px 18px 18px 0px;">
        <el-card style="height: 100%;overflow-y: auto;">
          <div style="display: flex;flex-direction: column;align-items: center;">
            <el-card v-show="testing" shadow="never" style="width: 120px" :body-style="{ backgroundColor: '#f7f9fa',textAlign: 'center' }">
              {{Math.floor(totalTime/60)}}:{{totalTime%60}}
            </el-card>
            <div v-show="testing" style="height: 1px;width: 100% ;background-color: #E1E7Eb;margin-top: 30px;margin-bottom: 40px"></div>
            <div style="margin-bottom: 20px;">选题区</div>
            <div class="grid-wrapper" v-show="testing">
              <el-tag class="grid-class" v-for="(item,key,index) of this.qsMap" :effect="index==currentIndex?'dark':'plain'"
                      @click="gridClick(index)">
                {{index+1}}
              </el-tag>
            </div>
            <div class="grid-wrapper" v-show="!testing">
              <el-tag :class="index==currentIndex?'grid-class-border':'grid-class'" v-for="(item,key,index) of this.qsMap" effect="dark"
                      :type="rightWrong(item,key)" @click="gridClick(index)">
                {{index+1}}
              </el-tag>
            </div>
            <div style="height: 1px;width: 100% ;background-color: #E1E7Eb;margin-top: 100px;margin-bottom: 40px"></div>
            <el-button type="primary" v-show="testing" @click="commitAnswer">提交答案</el-button>
            <el-button type="primary" v-show="!testing" @click="testAgain">再考一次</el-button>
          </div>
        </el-card>
      </el-aside>
    </el-container>

    <div style="position: fixed;bottom: 10px;left: 30%;">
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" @click="preStem">上一题</el-button>
        <el-button type="primary" @click="nextStem">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import baseApi from '@/api/base';
  import examApi from '@/api/exam';
  import DateUtil from '@/util/DateUtil';

  export default {
    name: "SelfPractice2",
    data() {
      return {
        testing: true,
        totalTime: 3600,
        datas: [],
        currentIndex: 0,
        questionsId: null,
        qsMap: {},
        qsReverseArray: [],
      }
    },
    created() {
      this.questionsId = this.$route.params.question_id;
      console.log(JSON.stringify(this.questionsId));
      if (this.questionsId != undefined && this.questionsId != null && this.questionsId.length != 0) {
        this.loadData();
      }
      this.countDown();
    },
    computed: {
      getCategory: function () {
        if (this.datas.length == 0) {
          return "";
        }
        var data = this.datas[this.qsMap[this.currentIndex]];
        var cat = data.category.category;
        return cat;
      },
      getStem: function () {
        if (this.datas.length == 0) {
          return "";
        }
        var data = this.datas[this.qsMap[this.currentIndex]];
        var stem = data.stem.stem;
        return stem;
      },
      getStemParent: function () {
        if (this.datas.length == 0) {
          return {};
        }
        var data = this.datas[this.qsMap[this.currentIndex]];
        var stem = data.stem;
        return stem;
      },
      getAnswer: function () {
        if (this.datas.length == 0) {
          return {answer: {}};
        }
        var data = this.datas[this.qsMap[this.currentIndex]];
        var answer = data.stem.answer;
        return answer;
      },
      currentData: function () {
        if (this.datas.length == 0) {
          return {};
        }
        return this.datas[this.qsMap[this.currentIndex]];
      }
    },
    methods: {
      getSplitString(str) {
        if (str == undefined || str == null || str.length == 0) {
          return [];
        } else {
          var arr = str.split(",");
          var newArr = [];
          this.currentData.stem.question['1'].myAnswer = [];
          arr.forEach(word => {
            newArr.push(word.trim());
          });
          return newArr;
        }
      },
      countDown() {
        window.setInterval(() => {
          this.totalTime--;
        }, 1000);
      },
      getEndChar(str) {
        if (str == undefined || str == null || str.length == 0) {
          return '';
        }
        str = str.trim();
        return str[str.length - 1];
      },
      loadData() {
        baseApi.getallrecommendcontent(this.questionsId)
          .then(response => {
            var ret = response.data;
            if (ret.status == '200') {
              var questions = ret.questions_list;
              //把题目遍历到数组中
              //把小题映射到大题中
              var subIndex = 0;
              var keys = Object.getOwnPropertyNames(questions);
              for (let i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = questions[key];
                this.datas.push(value);
                var catName = value.category.category;
                this.qsReverseArray[i] = subIndex;
                if ("翻译" == catName || "作文" == catName || "单选" == catName) {
                  this.qsMap[subIndex] = i;
                  subIndex++;
                } else if ("阅读理解" == catName || "完形填空" == catName) {
                  for (var key in value.stem.question) {
                    this.qsMap[subIndex] = i;
                    subIndex++;
                  }
                }
              }
            } else {
              console.log(JSON.stringify(ret.msg));
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      preStem() {
        if (this.currentIndex > 0) {
          var bigIndex = this.qsMap[this.currentIndex];
          if (bigIndex == 0) {
            this.currentIndex = this.qsReverseArray[0];
            return;
          }
          var newBigIndex = bigIndex - 1;
          var newIndex = this.qsReverseArray[newBigIndex];
          this.currentIndex = newIndex;
        }
      },
      nextStem() {
        //旧大索引
        var oldBigIndex = this.qsMap[this.currentIndex];
        if (oldBigIndex >= this.qsReverseArray.length - 1) {
          return;
        }
        //新大索引
        var newBigIndex = oldBigIndex + 1;
        //新小索引
        var newIndex = this.qsReverseArray[newBigIndex];
        this.currentIndex = newIndex;
      },
      gridClick(index) {
        this.currentIndex = index;
      },
      rightWrong(bigIndex, index) {
        // console.log(bigIndex, index);
        var item = this.datas[bigIndex];
        var startIndex = this.qsReverseArray[bigIndex];
        var innerIndex = (index - startIndex) + 1;
        var innerKey = innerIndex + '';
        var category = item.category.category;
        if (category == '完形填空' || category == '阅读理解') {
          var value = this.getEndChar(item.stem.answer[innerKey]);
          var myValue = item.stem.question[innerKey].myAnswer;
          if (value == myValue) {
            return 'success';
          } else {
            return 'danger';
          }
        } else if (category == '单选') {
          var value = this.getEndChar(item.stem.answer['1']);
          var myValue = item.stem.question['1'].myAnswer;
          if (value == myValue) {
            return 'success';
          } else {
            return 'danger';
          }
        } else if (category == '翻译') {
          var myValue = item.stem.myAnswer;
          if ((myValue == undefined) || (myValue == null) || (myValue.length == 0)) {
            return 'danger';
          } else {
            return 'success';
          }
        } else if (category == '作文') {
          var myValue = item.stem.question['1'].myAnswer;
          if ((myValue == undefined) || (myValue == null) || (myValue.length == 0)) {
            return 'danger';
          } else {
            return 'success';
          }
        } else {
          return 'danger';
        }
      },
      commitAnswer() {
        var uploadBean = {};
        uploadBean.userid = this.$store.getters.getUserId;
        uploadBean.name = DateUtil.format(new Date(), 'yyyyMMdd') + "英语测试考试" + new Date().getHours();
        uploadBean.com_content = "";
        uploadBean.total = {"完形填空": 0, "阅读理解": 0, "单选": 0};
        uploadBean.correct = {"完形填空": 0, "阅读理解": 0, "单选": 0};
        uploadBean.detail = {
          number: [],
          snumber: [],
          wnumber: []
        };
        uploadBean.tot_score = 0;
        uploadBean.mark = '自主训练';
        uploadBean.trans = [];
        for (let i = 0; i < this.datas.length; i++) {
          var bigIndex = i;
          var data = this.datas[bigIndex];
          var category = data['category']['category'];
          if ("完形填空" == category) {
            var questions = data.stem.question;
            for (var key in  questions) {
              var myAnswer = questions[key].myAnswer;
              var answer = this.getEndChar(data.stem.answer[key]);
              var subId = data.id + "_" + key;
              uploadBean.total['完形填空'] += 1;
              uploadBean.detail.number.push(data.id);
              uploadBean.detail.snumber.push(subId);
              if (answer == myAnswer) {
                uploadBean.correct['完形填空'] += 1;
              } else {
                uploadBean.detail.wnumber.push(subId);
              }
            }
          } else if ("阅读理解" == category) {
            var questions = data.stem.question;
            for (var key in  questions) {
              var myAnswer = questions[key].myAnswer;
              var answer = this.getEndChar(data.stem.answer[key]);
              var subId = data.id + "_" + key;
              uploadBean.total['阅读理解'] += 1;
              uploadBean.detail.number.push(data.id);
              uploadBean.detail.snumber.push(subId);
              if (answer == myAnswer) {
                uploadBean.correct['阅读理解'] += 1;
              } else {
                uploadBean.detail.wnumber.push(subId);
              }
            }
          } else if ("单选" == category) {
            var sunId = data.id + "_1";
            uploadBean.detail.number.push(data.id);
            uploadBean.detail.snumber.push(sunId);
            uploadBean.total['单选'] += 1;
            var myAnswer = this.getEndChar(data.stem.question['1'].myAnswer);
            var answer = data.stem.question['1'].myAnswer;
            if (myAnswer == answer) {
              uploadBean.correct['单选'] += 1;
            } else {
              uploadBean.detail.wnumber.push(sunId);
            }
          } else if ("翻译" == category) {
            var transItem = {};
            transItem.mode = 'translation';
            var stemItem = {};
            stemItem.A = data.stem.question['1'].A;
            stemItem.reference = data.stem.answer['1'];
            stemItem.candidate = data.stem.myAnswer;
            transItem.stem = [];
            transItem.stem.push(stemItem);
            uploadBean.trans.push(transItem);
          } else if ("作文" == category) {
            uploadBean.com_content = data.stem.question['1'].myAnswer;
          }
        }
        var total = uploadBean.total['完形填空'] * 2 + uploadBean.total['完形填空'] * 2 + uploadBean.total['单选'];
        var correct = uploadBean.correct['完形填空'] * 2 + uploadBean.correct['完形填空'] * 2 + uploadBean.correct['单选'];
        uploadBean.tot_score = Math.ceil((correct / total) * 60);
        console.log(JSON.stringify(uploadBean));
        examApi.getUpdateExaminfo(uploadBean)
          .then(response => {
            var ret = response.data;
            if ('200' == ret.status) {
              this.testing = false;
              this.$message.success("提交成功");
            } else {
              this.$message.error(ret.msg);
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      },
      testAgain() {
        this.testing = true;
      },
      indexMap(index) {
        if (index == 0) {
          return 'A';
        } else if (index == 1) {
          return 'B';
        } else if (index == 2) {
          return 'C';
        } else if (index == 3) {
          return 'D';
        }
      }
    }
  }
</script>

<style scoped>
  .main-pan {
    border-radius: 4px;
    border-style: solid;
    border-color: white;
    padding: 0px;
    margin: 18px;
    background-color: white;
  }

  .grid-wrapper {
    /*display: flex;*/
    /*flex-flow: wrap;*/
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  .grid-class {
    text-align: center;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .grid-class-border {
    text-align: center;
    margin-right: 10px;
    margin-bottom: 10px;
    border-color: blue;
  }

  .my_success {
    color: #31CF9A;
    font-size: 18px;
  }

  .my_error {
    color: #FF5F5F;
    font-size: 18px;
  }

  .normal_border {
    background-color: #F9F9F9;
    padding: 10px;
  }

  .right_border {
    border: #42b983 solid 1px;
    background-color: #F9F9F9;
    padding: 10px;
  }

  .wrong_border {
    border: #FF5F5F solid 1px;
    background-color: #F9F9F9;
    padding: 10px;
  }

</style>
