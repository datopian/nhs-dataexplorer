// Run with: node --test ckanext/dataexplorer/tests/test_filter_history.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname,
  '../assets/resource-view-filters-override.js'), 'utf8');

function showPage({ type = 'navigate', persisted = false,
  href = 'https://example.com/resource/123?view_id=456&filters=area%3ALondon#data',
  performanceAvailable = true } = {}) {
  const replacements = [];
  let pageshow;
  const window = {
    location: { href, replace: url => replacements.push(url) },
    addEventListener: (name, handler) => {
      assert.equal(name, 'pageshow');
      pageshow = handler;
    }
  };
  if (performanceAvailable) {
    window.performance = { getEntriesByType: () => [{ type }] };
  }
  vm.runInNewContext(source, { window, URL, ckan: { module: () => {} } });
  pageshow({ persisted });
  return replacements;
}

test('normal navigation retains filters, including shared filtered links', () => {
  assert.deepEqual(showPage(), []);
});

test('refresh retains filters', () => {
  assert.deepEqual(showPage({ type: 'reload' }), []);
});

test('uncached Back/Forward replaces the URL to reset the whole page', () => {
  assert.deepEqual(showPage({ type: 'back_forward' }),
    ['/resource/123?view_id=456#data']);
});

test('cached Back/Forward resets even when original navigation was normal', () => {
  assert.deepEqual(showPage({ persisted: true }),
    ['/resource/123?view_id=456#data']);
});

test('cached restoration works without navigation timing support', () => {
  assert.deepEqual(showPage({ persisted: true, performanceAvailable: false }),
    ['/resource/123?view_id=456#data']);
});

test('clean history entries do not reload or loop', () => {
  assert.deepEqual(showPage({ type: 'back_forward',
    href: 'https://example.com/resource/123?view_id=456#data' }), []);
});

test('all filter parameters are removed and a bare resource URL is valid', () => {
  assert.deepEqual(showPage({ type: 'back_forward',
    href: 'https://example.com/resource/123?filters=area%3ALondon&filters=' }),
  ['/resource/123']);
});
