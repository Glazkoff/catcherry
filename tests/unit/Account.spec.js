import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { createMockClient } from 'mock-apollo-client'
import Account from "@/components/account/Account.vue";
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
  const createComponent = () => {
    mockClient = createMockClient()
    apolloProvider = new VueApollo({
      defaultClient: mockClient,
    })
    wrapper = shallowMount(Account, {
      localVue,
      apolloProvider,
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
//    expect(wrapper.isVueInstance()).toBeTruthy();
//    expect(wrapper.is(Account)).toBeTruthy();
//    //expect(wrapper.vm.$apollo.queries.users).toBeTruthy()
//    //expect(wrapper.vm.$apollo.queries.teams).toBeTruthy()
  });
//  
});

