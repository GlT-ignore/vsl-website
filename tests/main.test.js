/** @jest-environment jsdom */

describe('Animation and loader behaviors', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.requestAnimationFrame = (cb) => cb();

    class MockIntersectionObserver {
      constructor(cb) {
        this.cb = cb;
      }
      observe(element) {
        this.cb([{ isIntersecting: true, target: element }], this);
      }
      unobserve() {}
      disconnect() {}
    }
    global.IntersectionObserver = MockIntersectionObserver;
    global.scrollTo = jest.fn();

    document.body.innerHTML = `
      <div class="counter" data-target="7">0</div>
      <div class="counter" data-target="3">0</div>
      <div class="page-loader"></div>
    `;

    jest.isolateModules(() => {
      require('../js/main.js');
    });

    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.resetModules();
  });

  test('counter elements reach their target values', () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      expect(String(counter.innerText)).toBe(counter.getAttribute('data-target'));
    });
  });

  test('page loader fades out after load event', () => {
    const loader = document.querySelector('.page-loader');
    window.dispatchEvent(new Event('load'));
    jest.advanceTimersByTime(1000);
    expect(loader.classList.contains('fade-out')).toBe(true);
  });

  test('scroll is disabled during load and enabled after loader hides', () => {
    const loader = document.querySelector('.page-loader');
    expect(document.body.classList.contains('no-scroll')).toBe(true);

    window.dispatchEvent(new Event('load'));
    jest.advanceTimersByTime(1500);

    expect(loader.style.display).toBe('none');
    expect(document.body.classList.contains('no-scroll')).toBe(false);
  });
});
