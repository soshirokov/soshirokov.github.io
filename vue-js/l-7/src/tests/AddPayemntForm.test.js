import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import AddPaymentForm from '../components/AddPaymentForm.vue';
import category from '../store/category';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();
const store = new Vuex.Store({
    modules: {
        category,
    },
});

describe('Add Payment', () => {
    test('Data Model', () => {
        const wrapper = shallowMount(AddPaymentForm, {
            localVue,
            router,
            store
        })

        const dateInput = wrapper.find('input[name=date]');
        dateInput.setValue('01.01.2001');
        expect(wrapper.vm.date).toBe('01.01.2001');
    });

    test('Data Value', () => {
        const wrapper = shallowMount(AddPaymentForm, {
            localVue,
            router,
            store
        })

        const valueInput = wrapper.find('input[name=value]');
        valueInput.setValue('100');
        expect(wrapper.vm.value).toBe('100');
    });

    test('New Category', () => {
        const wrapper = shallowMount(AddPaymentForm, {
            localVue,
            router,
            store
        })

        const addCategoryButton = wrapper.find('#addCategory');

        addCategoryButton.trigger('click');

        const newCategoryInput = wrapper.find('input[name=newCategory]');

        newCategoryInput.setValue('Football');
        expect(wrapper.vm.newCategory).toBe('Football');
    });

    test('Emit AddCategory', () => {
        const wrapper = shallowMount(AddPaymentForm, {
            localVue,
            router,
            store
        })

        const addPaymentButton = wrapper.find('#addPayment');

        addPaymentButton.trigger('click');

        expect(wrapper.emitted('add-payment')).toBeTruthy();
    });

    test('Auto Date', () => {
        const wrapper = shallowMount(AddPaymentForm, {
            localVue,
            router,
            store
        })

        const addPaymentButton = wrapper.find('#addPayment');

        addPaymentButton.trigger('click');

        expect(wrapper.emitted('add-payment')[0][0].date).not.toBe('');
    });

})