import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { createMockClient } from 'mock-apollo-client'
import User from "@/components/account/UserInOrganization.vue";
import VueApollo from 'vue-apollo'
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Vue from 'vue'
 
const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(Vuex)
localVue.use(VueApollo)
localVue.use(FingerprintJS)

const fs = require('fs');
var locale = "ru";
var data = JSON.parse(fs.readFileSync("src/i18n/locales/"+locale+".json"));

const auth = {
  namespaced: true,
  state: () => {
    return {
      tokenExpired: false
    }
  },
  getters: {
    tokenExpired: state => state.tokenExpired,
  },
  actions: {
  	loadAuth () {
    	console.log("load auth")
    }
  }
}

const store = new Vuex.Store({
	  modules: {
      auth
    },
    actions: {
    	toggleDevice: function(store, value) {
      	console.log("toggleDevice")
      }
    }
})

localVue.use(store)

describe("UserInOrganization:", () => {
  let mockClient
  let apolloProvider

  //const createComponent = () => {
  //  mockClient = createMockClient()
  //  apolloProvider = new VueApollo({
  //    defaultClient: mockClient,
  //  })
  //}
  //createComponent();

  const wrapper = shallowMount(User, {
    localVue,
    apolloProvider,
      data() {
        return {
          isShowInfoModal: true,
          organizations: {
            organization: {
              id: 1
            }
          },
          isAddOrganization:true,
        }
      },
      //apolloProvider,
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
  it("Правильно инициализируется", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.is(User)).toBeTruthy();
  });
  it("Содержит запросы", () => {
    expect(wrapper.vm.$apollo.queries.organizations).not.toBe(false)
    expect(wrapper.vm.$apollo.queries.organization).not.toBe(false)
    expect(wrapper.vm.$apollo.queries.teams).not.toBe(false)
    expect(wrapper.vm.$apollo.queries.team).not.toBe(false)
  });
  it("Количество отображаемых организаций", () => {
    var len=0;
    for (var i in wrapper.vm.organizations) {
      len++
    }
    expect(wrapper.findAll('.oneOrganization').length).toBe(len);
  });
  it("Клик на организацию.", () => {
    const showModalEdit = jest.fn()
    wrapper.setMethods({ showModalEdit })
    wrapper.find(".btn-link").trigger('click');
    expect(wrapper.vm.isShowInfoModal).toBeTruthy();
    expect(showModalEdit).toHaveBeenCalled();
  });
  it("Выводится popup", () => {
    wrapper.find(".btn-link").trigger('click');
    expect(wrapper.html()).toContain('popup')
  });
  it("Запрос в команду", () => {
    wrapper.setData({ ShowInfoModal: false });
    const requestInTeam = jest.fn()
    wrapper.setMethods({ requestInTeam })
    wrapper.find(".btn").trigger('click');
    expect(requestInTeam);
  });
  it("Вывод при отсутствии организаций", () => {
    wrapper.setData({ organizations: undefined })
    expect(wrapper.find('.organizationNotSearch').exists()).not.toBe(true)
    wrapper.find('.btn-link').trigger('click')
    expect(wrapper.vm.isAddOrganization).toBe(true)
  });
  //it("Содержит запросы", () => {
  //  wrapper.find('.oneOrganization').trigger('click')
  //  expect(wrapper.html()).toContain('<label class="form-nae">')
  //});
});

