import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import { shallowMount ,mount, createLocalVue } from "@vue/test-utils";
import { createMockClient } from 'mock-apollo-client'
import SignUp from "@/components/auth/SignUp.vue";
import VueApollo from 'vue-apollo'
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { exception } from 'console';

const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(Vuex)
localVue.use(VueApollo)
localVue.use(FingerprintJS)

const fs = require('fs');
var locale = "ru";
var data = JSON.parse(fs.readFileSync("src/i18n/locales/"+locale+".json"));

describe("SignUp:", () => {
  let wrapper
  let mockClient
  let apolloProvider
  const createComponent = () => {
    mockClient = createMockClient()
    apolloProvider = new VueApollo({
      defaultClient: mockClient,
    })
    wrapper = shallowMount(SignUp, {
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
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.is(SignUp)).toBeTruthy();
  });
  it("Открытие политик", () => {
    const openPrivacyPolicy = jest.fn()
    wrapper.setMethods({ openPrivacyPolicy })
    wrapper.find("#PrivacyPolicy").trigger('click');
    expect(openPrivacyPolicy).toHaveBeenCalled();
  })
  it("Submit", () => {
    const btn = wrapper.find('input.btn')
    const check = wrapper.find('[type="checkbox"]')
    expect(btn.element.disabled).toBe(true)
    check.element.checked = !check.element.checked;
    expect(check.element.checked).toBe(true)
    btn.element.disabled = false
    expect(btn.element.disabled).toBe(false)
    btn.trigger('click')
    expect(wrapper.contains('[class="error"]'))

  });
  //it("Правильно рендерится", () => {
  //    expect(wrapper.html()).toMatchSnapshot();
  //});
  it("Имя", () => {
    wrapper.find('[id="name"]').setValue('')
    expect(wrapper.vm.$v.name.$invalid).toBe(true)
    expect(wrapper.vm.$v.name.$error).toBe(true)
    wrapper.find('[id="name"]').setValue('123')
    expect(wrapper.vm.$v.name.$invalid).toBe(true)
    expect(wrapper.vm.$v.name.$error).toBe(true)
    wrapper.find('[id="name"]').setValue('Александр')
    expect(wrapper.vm.$v.name.$invalid).toBe(false)
    expect(wrapper.vm.$v.name.$error).toBe(false)
  });
  //it("s", () => {
  //  wrapper.find('[class="form-text box"]').trigger('click')
  //  wrapper.find('[class="btn btn-primary block"]').trigger('click')
  //  expect(wrapper.html()).toContain('<label class="form-nae">')
  //});
  it("Фамилия", () => {
    wrapper.find('[id="surname"]').setValue('')
    expect(wrapper.vm.$v.surname.$invalid).toBe(true)
    expect(wrapper.vm.$v.surname.$error).toBe(true)
    expect(wrapper.find('.error').exists()).toBeTruthy()
    wrapper.find('[id="surname"]').setValue('123')
    expect(wrapper.vm.$v.surname.$invalid).toBe(true)
    expect(wrapper.vm.$v.surname.$error).toBe(true)
    expect(wrapper.find('.error').exists()).toBeTruthy()
    wrapper.find('[id="surname"]').setValue('Иванов')
    expect(wrapper.vm.$v.surname.$invalid).toBe(false)
    expect(wrapper.vm.$v.surname.$error).toBe(false)
    expect(wrapper.find('.error').exists()).not.toBe(false)
  });
  it("Отчство", () => {
    wrapper.find('[id="patricity"]').setValue('123')
    expect(wrapper.vm.$v.patricity.$invalid).toBe(true)
    expect(wrapper.vm.$v.patricity.$error).toBe(true)
    expect(wrapper.find('.error').exists()).toBeTruthy()
    wrapper.find('[id="patricity"]').setValue('')
    expect(wrapper.vm.$v.patricity.$invalid).toBe(false)
    expect(wrapper.vm.$v.patricity.$error).toBe(false)
    expect(wrapper.find('.error').exists()).not.toBe(false)
    wrapper.find('[id="patricity"]').setValue('Иванович')
    expect(wrapper.vm.$v.patricity.$invalid).toBe(false)
    expect(wrapper.vm.$v.patricity.$error).toBe(false)
    expect(wrapper.find('.error').exists()).not.toBe(false)
  });
  it("Логин", () => {
    wrapper.find('[id="login"]').setValue('123')
    expect(wrapper.vm.$v.login.$invalid).toBe(false)
    expect(wrapper.vm.$v.login.$error).toBe(false)
    expect(wrapper.find('.error').exists()).not.toBe(false)
    wrapper.find('[id="login"]').setValue('')
    expect(wrapper.vm.$v.login.$invalid).toBe(true)
    expect(wrapper.vm.$v.login.$error).toBe(true)
    expect(wrapper.find('.error').exists()).toBeTruthy()
    wrapper.find('[id="login"]').setValue('qwerty')
    //wrapper.vm.checkLogin();
    expect(wrapper.vm.$v.login.$invalid).toBe(false)
    expect(wrapper.vm.$v.login.$error).toBe(false)
    expect(wrapper.find('.error').exists()).not.toBe(false)
  });
  it("Пароль", () => {
    wrapper.find('[id="password"]').setValue('123')
    expect(wrapper.vm.$v.password.$invalid).toBe(true)
    expect(wrapper.vm.$v.password.$error).toBe(true)
    expect(wrapper.find('.error').exists()).toBeTruthy()
    wrapper.find('[id="password"]').setValue('')
    expect(wrapper.vm.$v.password.$invalid).toBe(true)
    expect(wrapper.vm.$v.password.$invalid).toBe(true)
    expect(wrapper.find('.error').exists()).toBeTruthy()
    wrapper.find('[id="password"]').setValue('qwerty')
    expect(wrapper.vm.$v.password.$invalid).toBe(false)
    expect(wrapper.vm.$v.password.$invalid).toBe(false)
    expect(wrapper.find('.error').exists()).not.toBe(false)
  });
});