import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { createMockClient } from 'mock-apollo-client'
import Organization from "@/components/admin/Organization.vue";
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

describe("Organization:", () => {
  let wrapper
  let mockClient
  let apolloProvider
  const createComponent = () => {
    mockClient = createMockClient()
    apolloProvider = new VueApollo({
      defaultClient: mockClient,
    })
    wrapper = shallowMount(Organization, {
      localVue,
      apolloProvider,
      data() {
        return {
          organizations: {
            organization: {
              id: 1
            }
          }
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
  length = wrapper.findAll('.col-12').length
  it("Правильно инициализируется", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.is(Organization)).toBeTruthy();
  });
  it("Содержит запросы", () => {
    expect(wrapper.vm.$apollo.queries.organizations).toBeTruthy()
    expect(wrapper.vm.$apollo.queries.organization).toBeTruthy()
    expect(wrapper.vm.$apollo.queries.teamsInOneOrganization).toBeTruthy()
  });
  it("Вызов функции", () => {
    const showFullInformation = jest.fn()
    wrapper.setMethods({ showFullInformation })
    wrapper.find(".col-12").trigger('click');
  }); 
  it("Количество элементов", () => {
    var lеngth = wrapper.vm.length
    expect(wrapper.findAll('.card').length).toBe(length);
  });
  it("Отображается popup", () => {
    wrapper.setData({isShowFullInformation:true})
    expect(wrapper.vm.isShowFullInformation == true).toBeTruthy()
    expect(wrapper.find('popup').exists()).not.toBe(true)
    wrapper.setData({isShowModalDelete:true,isShowFullInformation:false})
    expect(wrapper.vm.isShowModalDelete == true).toBeTruthy()
    expect(wrapper.find('div[slot="exit"').exists()).not.toBe(true)
    wrapper.setData({isShowModalEdit:true,isShowFullInformation:false,isShowModalDelete:false})
    expect(wrapper.vm.isShowModalEdit == true).toBeTruthy()
    expect(wrapper.find('div[slot="exit"').exists()).not.toBe(true)
    //expect(wrapper.html()).toContain('popup')
  });
});

