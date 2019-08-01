import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SelfStudy from "@/components/SelfStudy";
import KnowledgeCommun from "@/components/KnowledgeCommun";
import TaskTest from "@/components/TaskTest";
import RandomLook from "@/components/commun/RandomLook";
import MyPublish from "@/components/commun/MyPublish";
import ReplyMe from "@/components/commun/ReplyMe";
import MyCollect from "@/components/commun/MyCollect";
import Completed from "@/components/tasktest/Completed";
import ToDoComplete from "@/components/tasktest/ToDoComplete";
import SelfPractice from "@/components/SelfPractice";
import SelfPracticeDetail from "@/components/practice/SelfPracticeDetail";
import SelfPracticeStart from "@/components/practice/SelfPracticeStart";
import SelfStudy3 from "@/components/SelfStudy3";
import SelfPracticeStart2 from "@/components/practice/SelfPracticeStart2";
import CompletedIndex from "@/components/tasktest/complete/CompletedIndex";
import CompletedDetail from "@/components/tasktest/complete/CompletedDetail";
import TodoIndex from "@/components/tasktest/todo/TodoIndex";
import QuestionAnswer from "@/components/qa/QuestionAnswer";
import QADefault from "@/components/qa/QADefault";
import QSPlane from "@/components/qa/QSPlane";
import TeacherMain from "@/components/TeacherMain";
import MainPane from "@/components/MainPane";

Vue.use(Router)

export default new Router({
  routes: [
    {
      // path: '/',
      path: '/teacher',
      name: 'TeacherMain',
      component: TeacherMain
    },
    {
      // path: '/main',
      path: '/',
      name: 'MainPane',
      component: MainPane,
      children: [
        {
          path: '/',
          name: 'SelfStudy',
          component: SelfStudy3
        },
        {
          path: '/practice',
          name: 'SelfPractice',
          component: SelfPractice,
          children: [
            {
              path: '',
              name: 'SelfPracticeStart',
              component: SelfPracticeStart2
            },
            {
              path: 'practicedetail',
              name: 'SelfPracticeDetail',
              component: SelfPracticeDetail
            }
          ]
        },
        {
          path: '/commun',
          name: 'KnowledgeCommun',
          component: KnowledgeCommun,
          children: [
            {
              path: '',
              name: 'RandomLook',
              component: RandomLook
            }, {
              path: 'publish',
              name: 'MyPublish',
              component: MyPublish
            }, {
              path: 'reply',
              name: 'ReplyMe',
              component: ReplyMe
            }, {
              path: 'collect',
              name: 'MyCollect',
              component: MyCollect
            }
          ]
        },
        {
          path: '/tasktest',
          name: 'TaskTest',
          component: TaskTest,
          children: [
            {
              path: '',
              name: 'Completed',
              component: Completed,
              children: [
                {
                  path: '',
                  name: 'CompletedIndex',
                  component: CompletedIndex,
                },
                {
                  path: 'completeddetail',
                  name: 'CompletedDetail',
                  component: CompletedDetail,
                  children: [
                    {
                      path: '',
                      name: 'SelfPracticeDetail2',
                      component: SelfPracticeDetail,
                    }
                  ]
                }
              ]
            },
            {
              path: 'todocomplete',
              name: 'ToDoComplete',
              component: ToDoComplete,
              children: [
                {
                  path: '',
                  name: 'TodoIndex',
                  component: TodoIndex,
                },
                {
                  path: 'practicedetail',
                  name: 'SelfPracticeDetail3',
                  component: SelfPracticeDetail
                }
              ]
            }
          ]
        },
        {
          path: '/qsPlane',
          name: 'QSPlane',
          component: QSPlane,
          children: [
            {
              path: '/',
              name: 'QuestionAnswer',
              component: QuestionAnswer
            },
            {
              path: '/qaDefault',
              name: 'QADefault',
              component: QADefault
            },
          ]
        },
      ]
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
  ]
})
