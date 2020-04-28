import { Vue } from 'vue/types/vue'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { MockObserverService } from '../mocks/ObserverService'
import LazyTransitionComponent from '@/component/LazyTransition.vue'

chai.use(sinonChai)

const localInstance = createLocalVue();

describe('LazyTransition.vue Component Tests', () => {
  let wrapper: Wrapper<Vue>;
  const transitionStub = () => localInstance.component('transition', {
    //@ts-ignore
    render: function (h) {
      // @ts-ignore
      return this.$options._renderChildren
    }
  })

  beforeEach(() => {
    wrapper = mount(LazyTransitionComponent, {
      mocks: {
        $lazyObserver: new MockObserverService()
      },
      stubs: {
        transition: transitionStub()
      },
      localVue: localInstance
    });
  })

  it('passes expected props', async () => {
    const name = 'slide-in'
    const height = 400

    await wrapper.setProps({
      name: name,
      height: height
    })

    expect(wrapper.element.style.minHeight).equals(`${ 400 }px`)
    expect(wrapper.vm.$props.name).equals(name)
  })

  it('passes default props', () => {

    expect(wrapper.element.style.minHeight).equals(`${ 200 }px`)
    expect(wrapper.vm.$props.name).equals('')
  })

  it('should render slot when show is true', async () => {
    expect(wrapper.text()).is.equal('')

    await wrapper.setData({ show: true })

    expect(wrapper.text()).to.equal('DEFAULT')
  })

  it('calls $lazyObserver to observe and unobserve', () => {
    const element = wrapper.vm.$refs.animateditem as Element

    expect(wrapper.vm.$lazyObserver.observer).to.be.calledOnceWith(element)
    wrapper.destroy()
    expect(wrapper.vm.$lazyObserver.observer).to.be.calledTwice
  })
})
