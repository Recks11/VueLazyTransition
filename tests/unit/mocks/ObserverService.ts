import sinon from 'sinon'
export class MockObserverService {
  spy = sinon.spy()

  get observer () {
    return this.spy
  }

  startObserving (el: Element): void {
    this.spy(el)
  }
  stopObserving (el: Element): void {
    this.spy(el)
  }
  disposeObserver (): void {
    this.spy('disposed')
  }
}
