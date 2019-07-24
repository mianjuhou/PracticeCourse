<template>
  <div style="flex-grow: 1;display: flex;">
    <el-container style="flex: 1;">
      <el-main style="background-color: white;margin-left: 20px;margin-right: 20px;">
        <el-collapse accordion>
          <el-collapse-item v-for="(item,index) of datas">
            <template slot="title">
              <i class="el-icon-message-solid" style="color:#2D98FF;font-size: 18px;margin-left: 20px;"></i>
              <span style="color: #1C1A1D;font-size: 16px;margin-left: 10px;">{{item.question}}</span>
              <span style="color: #7B93A7;font-size: 12px;margin-left: 40px;">发布者：{{item.publishName}}</span>
              <span style="color: #7B93A7;font-size: 12px;margin-left: 20px;">发布时间：{{item.publishTime}}</span>
              <el-button v-show="item.answer==undefined||item.answer.length==0" style="color: #FF5F5F;margin-left: 100px;" type="primary"
                         plain size="small">待解答
              </el-button>
              <el-button v-show="!(item.answer==undefined||item.answer.length==0)" style="color: #FF5F5F;margin-left: 100px;" type="primary"
                         plain size="small">已解答
              </el-button>
              <el-button v-show="!(item.answer==undefined||item.answer.length==0)" style="color: #FF5F5F;margin-left: 25px;" type="primary"
                         plain size="small">收藏
              </el-button>
            </template>
            <div class="line"></div>
            <div style="margin-top: 20px;text-align: right;" v-show="item.answer==undefined||item.answer.length==0">
              <div>
                <el-input type="textarea" style="border: none;" v-model="textAreaContent">
                </el-input>
                <el-button size="mini" style="margin-top: 10px;" @click="handleSend(item)">回复</el-button>
              </div>
            </div>
            <div v-show="!(item.answer==undefined||item.answer.length==0)">
              <div v-for="(subItem) of item.answer">
                <div style="color: #7B93A7;font-size: 14px;padding-top: 10px;padding-left: 20px;">
                  {{subItem.answerName}}|{{subItem.answerTime}}
                </div>
                <div style="color: #2D98FF;font-size: 14px;padding-top: 20px;padding-bottom: 20px;padding-left: 20px;">
                  {{subItem.answerContent}}
                </div>
                <div class="line"></div>
              </div>
              <div style="text-align: right;">
                <el-button size="mini" style="margin-top: 10px;" @click="handleShow(item)" v-if="item.myShow!=true">我也说一句</el-button>
                <el-button size="mini" style="margin-top: 10px;" @click="handleSend(item)" v-else-if="item.myShow==true">发送</el-button>
                <div v-show="item.myShow==true">
                  <el-input type="textarea" style="border: none;" v-model="item.myAnswer">
                  </el-input>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-main>
      <el-footer style="display: flex;align-items: center;justify-content: center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1,
        textAreaRow: 8,
        textAreaContent: '',
        datas: [
          {
            question: '钢铁是怎样炼成的？',
            publishName: '张三',
            publishTime: '2019-5-28 17:00',
            myShow: false,
            answer: []
          },
          {
            question: '钢铁是怎样炼成的？',
            publishName: '张三',
            publishTime: '2019-5-28 17:00',
            myShow: false,
          },
          {
            question: '钢铁是怎样炼成的？',
            publishName: '张三',
            publishTime: '2019-5-28 17:00',
            myShow: false,
            answer: [
              {answerName: '李四', answerTime: '2019-5-28 21:00', answerContent: '钢铁是怎么炼成的描写的保尔柯察金经历第一次世界大战、十月革命、国内战争和国民经济恢复时期的严峻生活。'},
              {answerName: '王五', answerTime: '2019-5-29 13:00', answerContent: '钢铁是怎么炼成的描写的保尔柯察金经历第一次世界大战、十月革命、国内战争和国民经济恢复时期的严峻生活。'},
            ]
          },
          {
            question: '钢铁是怎样炼成的？',
            publishName: '张三',
            publishTime: '2019-5-28 17:00',
            myShow: false,
            answer: [
              {answerName: '李四', answerTime: '2019-5-28 21:00', answerContent: '钢铁是怎么炼成的描写的保尔柯察金经历第一次世界大战、十月革命、国内战争和国民经济恢复时期的严峻生活。'},
              {answerName: '王五', answerTime: '2019-5-29 13:00', answerContent: '钢铁是怎么炼成的描写的保尔柯察金经历第一次世界大战、十月革命、国内战争和国民经济恢复时期的严峻生活。'},
            ]
          },
          {
            question: '钢铁是怎样炼成的？',
            publishName: '张三',
            publishTime: '2019-5-28 17:00',
            myShow: false,
            answer: [
              {answerName: '李四', answerTime: '2019-5-28 21:00', answerContent: '钢铁是怎么炼成的描写的保尔柯察金经历第一次世界大战、十月革命、国内战争和国民经济恢复时期的严峻生活。'},
              {answerName: '王五', answerTime: '2019-5-29 13:00', answerContent: '钢铁是怎么炼成的描写的保尔柯察金经历第一次世界大战、十月革命、国内战争和国民经济恢复时期的严峻生活。'},
            ]
          },
          {
            question: '钢铁是怎样炼成的？',
            publishName: '张三',
            publishTime: '2019-5-28 17:00',
            myShow: false,
            answer: [
              {answerName: '李四', answerTime: '2019-5-28 21:00', answerContent: '钢铁是怎么炼成的描写的保尔柯察金经历第一次世界大战、十月革命、国内战争和国民经济恢复时期的严峻生活。'},
              {answerName: '王五', answerTime: '2019-5-29 13:00', answerContent: '钢铁是怎么炼成的描写的保尔柯察金经历第一次世界大战、十月革命、国内战争和国民经济恢复时期的严峻生活。'},
            ]
          },
        ],
      }
    },
    created() {
    },
    methods: {
      handleShow(item) {
        item.myShow = true;
      },
      handleSend(item) {
        item.answer.push({
          answerName: '我',
          answerTime: '2019-5-29 13:00',
          answerContent: item.myAnswer
        });
        item.myAnswer = '';
        item.myShow = false;
      }
    }
  }
</script>

<style scoped>
  .line {
    background-color: #E1E7Eb;
    height: 1px;
    margin-left: 24px;
    margin-right: 24px;
  }
</style>
