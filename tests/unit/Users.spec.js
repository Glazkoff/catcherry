import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { createMockClient } from 'mock-apollo-client'
import Users from "@/components/admin/Users.vue";
import VueApollo from 'vue-apollo'
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(Vuex)
localVue.use(VueApollo)
localVue.use(FingerprintJS)

const fs = require('fs');
var locale = "ru";
var data = JSON.parse(fs.readFileSync("src/i18n/locales/"+locale+".json"));

describe("Users:", () => {
  let wrapper
  let mockClient
  let apolloProvider
  let truе=false
  const createComponent = () => {
    mockClient = createMockClient()
    apolloProvider = new VueApollo({
      defaultClient: mockClient,
    })
    wrapper = shallowMount(Users, {
      localVue,
      apolloProvider,
      data() {
        return {
          users: {
            user: {
              id: 1
            }
          },
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
    expect(wrapper.is(Users)).toBeTruthy();
  });
  it("Содержит запросы", () => {
    expect(wrapper.vm.$apollo.queries.users).toBeTruthy()
    expect(wrapper.vm.$apollo.queries.teams).toBeTruthy()
    expect(wrapper.vm.$apollo.queries.user).toBeTruthy()
    expect(wrapper.vm.$apollo.queries.oneUserInTeams).toBeTruthy()
    expect(wrapper.vm.$apollo.queries.getPointsUser).toBeTruthy()
  });
  it("Количество отображаемых пользователей", () => {
    var len = 0;
    for (var i in wrapper.vm.users) {
      len++
    }
    expect(wrapper.findAll('.card').length).toBe(len);
  });
  it("Клик на пользователя", () => {
    const showFullInformation = jest.fn()
    wrapper.setMethods({ showFullInformation })
    wrapper.find(".card").trigger('click');
    expect(showFullInformation).toHaveBeenCalled();
  });
  it("Отображается popup", () => {
    wrapper.setData({isShowFullInformation:true})
    wrapper.find(".card").trigger('click');
    expect(wrapper.vm.isShowFullInformation == true).toBeTruthy()
    expect(wrapper.find('popup').exists()).toBe(truе)
  });
  it("Окно удаления", () => {
    wrapper.setData({isShowModalDelete:true})
    wrapper.find(".card").trigger('click');
    expect(wrapper.vm.isShowModalDelete == true).toBeTruthy()
    expect(wrapper.find('div[slot="exit"]').exists()).toBe(truе)
  });
})