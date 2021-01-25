import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import { shallowMount ,mount, createLocalVue } from "@vue/test-utils";
import { createMockClient } from 'mock-apollo-client'
import TasksTeam from "@/components/manager/TasksTeam.vue";
import VueApollo from 'vue-apollo'
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(Vuex)
localVue.use(VueApollo)
localVue.use(FingerprintJS)
localVue.use(VueRouter)
const router = new VueRouter()

const fs = require('fs');
var locale = "ru";
var data = JSON.parse(fs.readFileSync("src/i18n/locales/"+locale+".json"));

describe("TasksTeam:", () => {
  let wrapper
  let mockClient
  let apolloProvider
  const createComponent = () => {
    mockClient = createMockClient()
    apolloProvider = new VueApollo({
      defaultClient: mockClient,
    })
    wrapper = shallowMount(TasksTeam, {
      localVue,
      router,
      apolloProvider,
      data() {
        return {
          
        }
      },
      stubs: ['router-link'],
      mocks: {
        $t: (msg) => {
          var tmp = msg.split('.');
          var ans = data[tmp[0]];
          for (var i = 1; i < tmp.length; i++) {
            ans = ans[tmp[i]]
          }
          return ans;
        }
      },
    })
  }
  createComponent();
  it("Правильно инициализируется", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.is(TasksTeam)).toBeTruthy();
  });
  it("Содержит запросы", () => {
    expect(wrapper.vm.$apollo.queries.allTasksInOneTeam).toBeTruthy()
  });
  //it("Клик на редактирование.", () => {
  //  const creditPoints = jest.fn()
  //  wrapper.setMethods({ creditPoints })
  //  wrapper.find(".btn").trigger('click');
  //  expect(creditPoints).toHaveBeenCalled();
  //});

});

