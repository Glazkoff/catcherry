import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import { mount, createLocalVue  } from "@vue/test-utils";
import LogIn from "@/components/auth/LogIn.vue";
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

describe("LogIn:", () => {
  const mutate = jest.fn()
  const wrapper = mount(LogIn, {
    localVue,
    created(){},
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
    $apollo: {
      mutate
    },
  })
  it("Правильно инициализируется", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.is(LogIn)).toBeTruthy();
  });
  it("Submit", () => {
    const btn = wrapper.find('input.btn')
    btn.trigger('click')
    expect(wrapper.find('error').exists())
  });
  it("Логин", () => {
    wrapper.find('[id="login"]').setValue('123')
    expect(wrapper.vm.$v.login.$invalid).toBe(false)
    expect(wrapper.vm.$v.login.$error).toBe(false)
    expect(wrapper.find('.error').exists()).toBe(false)
    wrapper.find('[id="login"]').setValue('')
    expect(wrapper.vm.$v.login.$invalid).toBe(true)
    expect(wrapper.vm.$v.login.$error).toBe(true)
    expect(wrapper.find('.error').exists()).not.toBe(true)
    wrapper.find('[id="login"]').setValue('qwerty')
    //wrapper.vm.checkLogin();
    expect(wrapper.vm.$v.login.$invalid).toBe(false)
    expect(wrapper.vm.$v.login.$error).toBe(false)
    expect(wrapper.find('.error').exists()).toBe(false)
  });
  it("Пароль", () => {
    wrapper.find('[id="password"]').setValue('123')
    expect(wrapper.vm.$v.password.$invalid).toBe(true)
    expect(wrapper.vm.$v.password.$error).toBe(true)
    expect(wrapper.find('.error').exists()).not.toBe(true)
    wrapper.find('[id="password"]').setValue('')
    expect(wrapper.vm.$v.password.$invalid).toBe(true)
    expect(wrapper.vm.$v.password.$invalid).toBe(true)
    expect(wrapper.find('.error').exists()).not.toBe(true)
    wrapper.find('[id="password"]').setValue('qwerty')
    expect(wrapper.vm.$v.password.$invalid).toBe(false)
    expect(wrapper.vm.$v.password.$invalid).toBe(false)
    expect(wrapper.find('.error').exists()).toBe(false)
  });
});
