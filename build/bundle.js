
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.6' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const createViewStore = () => {
      const { subscribe, set, update } = writable({});

      return {
        views: {},
        subscribe,

        setView: (id, props) => {
          const view = viewStore.views[id];
          view.props = props;
          set(view);
        },
      };
    };

    const viewStore = createViewStore();

    /**
     * The function fetches an url with json data and returns a Promise for that
     * json data.
     *
     * @param {String} url The url to fetch.
     * @returns A promise for the json data.
     */
    const fetchJson = (url) => {
      return fetch(url)
        .then((response) => response.json())
        .catch((e) => console.error(e));
    };

    /**
     * The funciton call an url with a HEAD request an returns the last modified
     * value as a Date instance.
     *
     * @param {String} url The url to fetch.
     * @returns A promise for the last modified Date
     */
    const fetchLastModified = (url) => {
      return fetch(url, { method: 'HEAD' })
        .then((response) => {
          //
          // Get the last modified from the response.
          //
          const lastModified = response.headers.get('Last-Modified');
          console.log('url: ', url, ' header: ', lastModified);

          //
          // Ensure that the header exists.
          //
          if (lastModified) {
            return new Date(lastModified);
          }
        })
        .catch((e) => console.error(e));
    };

    /**
     * The function is called with a transaction for a store, that has an index
     * with a given name. It deletes all elements from the store that have an index
     * with the value.
     *
     * @param {IDBTransaction} tx Transaction
     * @param {String} storeName Name of the store.
     * @param {String} idxName Name of the index.
     * @param {String} idxValue Value of the index.
     * @returns A Promise.
     */
    const storeDeleteIndex = (tx, storeName, idxName, idxValue) => {
      return new Promise((resolve, reject) => {
        //
        // Get the store from the transaction.
        //
        const store = tx.objectStore(storeName);

        //
        // Get an array with the keys of the matching objects,
        //
        store.index(idxName).getAllKeys(idxValue).onsuccess = (e) => {
          const keys = e.target.result;

          //
          // Delete all objects with their keys,
          //
          keys.forEach((key) => {
            store.delete(key).onsuccess = (e) => {
              console.log('Store: ', store.name, ' deleted: ', key);
            };
          });

          //
          // Resolve after all elements are deleted.
          //
          resolve();
        };
      });
    };

    /**
     * The function is called with a transaction for a store with a given name and
     * an array of objects. All elements of the array are added to the store.
     *
     * @param {IDBTransaction} tx Transaction
     * @param {String} storeName Name of the store.
     * @param {Array} arr Array with the objects.
     * @returns The function returns a Promise.
     */
    const storeAddAll = (tx, storeName, arr) => {
      return new Promise((resolve, reject) => {
        //
        // Get the store from the transaction.
        //
        const store = tx.objectStore(storeName);

        arr.forEach((item) => {
          store.add(item).onsuccess = (e) => {
            console.log('Store: ', store.name, '  added: ', item);
          };
        });

        //
        // Resolve after all elements are added.
        //
        resolve();
      });
    };

    let db;

    /**
     * Simple error callback function.
     *
     * @param {*} event
     */
    const onError = (e) => {
      console.error(e.target.error);
    };

    /**
     * The function create the object stores and indices.
     *
     * @param {IDBVersionChangeEvent} e
     */
    const onUpgradeNeeded = (e) => {
      if (e.oldVersion < 1) {
        db = e.target.result;

        //
        // Create topics store
        //
        db.createObjectStore('topics', {
          keyPath: 'file',
        });

        //
        // Create questions store
        //
        const storeQuest = db.createObjectStore('questions', {
          keyPath: 'id',
        });
        storeQuest.createIndex('file', 'file', { unique: false });

        //
        // Create config store
        //
        const storeConfig = db.createObjectStore('config', {
          keyPath: 'key',
        });

        storeConfig.transaction.oncomplete = () => {
          console.log('Upgrade completed!');
        };
      }
    };

    /**
     * The function iniitalizes the indexed db.
     */
    const dbInit = () => {
      return new Promise((resolve, reject) => {
        //
        // Open db request for version 1.
        //
        const request = indexedDB.open('s-card', 1);

        //
        // Callback function for creating or upgrading the db.
        //
        request.onupgradeneeded = onUpgradeNeeded;

        //
        // Error handling callback function for the opening request.
        //
        request.onerror = onError;

        request.onsuccess = (e) => {
          //
          //
          //
          db = e.target.result;

          //
          // Centeralized error handling callback function.
          //
          db.onerror = onError;
          console.log('db init success!');
          resolve();
        };
      });
    };

    /**
     * The function returns a formated date value or an empty string if the date is
     * not defined.
     *
     * @param {Date} date The date to be formatted.
     * @returns A string with the formatted date.
     */
    function fmtDate(date) {
      //
      // Handle empty dates.
      //
      if (!date) {
        return '';
      }

      const d = new Date();
      d.setTime(date);

      const day = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
      const month = d.getMonth() > 9 ? d.getMonth() : '0' + d.getMonth();
      const hour = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
      const minute = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();

      return `${day}.${month}.${d.getFullYear()} ${hour}:${minute}`;
    }

    /**
     * The function is called with an array of objects. Each object should have
     * property named 'prop'. The function returns a map of the objects and the
     * key is the property.
     *
     * @param {Array} arr Array of objects.
     * @param {string} prop The name of a unique property of the objects.
     * @returns A map of objects with the key 'prop'.
     */
    const arrToMap = (arr, prop) => {
      const map = new Map();
      arr.forEach((elem) => {
        map.set(elem[prop], elem);
      });
      return map;
    };

    /**
     * The function is called with an array and a value. The function checks if all
     * of the array values have the given value.
     *
     * @param {Array<number>} arr The array with values.
     * @param {number} val The expected value.
     * @returns True or false.
     */
    const arrAll = (arr, val) => {
      for (let i in arr) {
        if (arr[i] !== val) {
          return false;
        }
      }
      return true;
    };

    /**
     * The function is called with an array of integers. Each can have a max value.
     * The function computes a percentage string from the values. 100% means that
     * all entries have the max value.
     *
     * @param {Array<number>} arr An array of integers.
     * @param {number} max The integer value that is 100%.
     * @returns The function returns a string with the percent value.
     */
    const arrPercentage = (arr, max) => {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }

      return percentage(sum, arr.length * max);
    };

    /**
     * The function returns a percentage for a fraction of a total value.
     *
     * @param {number} num The fraction of the total value.
     * @param {number} total The integer value that is 100%.
     * @returns The function returns a string with the percent value.
     */
    const percentage = (num, total) => {
      const result = (num * 100) / total;
      return result.toFixed(0) + '%';
    };

    /**
     * The function returns a random number between min and max. Both are included
     * and it is assumed that both parameters are integers.
     *
     * @param {number} min The minimum value, included.
     * @param {number} max The maximum value,  included.
     * @returns a random number
     */
    function getRandomIntInclusive(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * The function shuffles an array in place.
     *
     * @param {Array<any>} arr The array to shuffle.
     */
    function shuffleArr(arr) {
      for (let i = 0; i < arr.length; i++) {
        //
        // Get a random index of the array
        //
        let j = getRandomIntInclusive(0, arr.length - 1);

        //
        // Ensure that there is something to do
        //
        if (i === j) {
          continue;
        }

        //
        // Swap i and j
        //
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }

    /**
     * The function creates a toogling function, which toogles two string values 
     * after 'repeat' calls.
     * 
     * @param {number} repeat Return the same then toogle.
     * @param {string} first The first value.
     * @param {string} second The second value.
     * @returns The toogled value.
     */
    const createRepeatToggle = (repeat, first, second) => {
      let count = 0;

      return () => {
        return (count++ % (2 * repeat) < repeat) ? first : second;
      }
    };

    /**
     * The function reads the last modified date from the topics store for a given
     * file.
     *
     * @param {String} file Name of the file, which is the id.
     * @returns A Promise.
     */
    const topicGetLastModified = (file) => {
      return new Promise((resolve, reject) => {
        //
        // Create a transaction for the topics store.
        //
        const store = db.transaction(['topics'], 'readonly').objectStore('topics');

        store.get(file).onsuccess = (e) => {
          //
          // Get the topic object from the store. It is possible that the value is
          // undefined.
          //
          const lastModified = e.target.result.lastModified;
          console.log('Store:', store.name, ' get lastModified:', lastModified);
          resolve(lastModified);
        };
      });
    };

    /**
     * The function stores the last modified date of a topic file in the topic
     * store.
     *
     * @param {IDBTransaction} tx
     * @param {String} file
     * @param {Date} lastModified
     */
    const topicSetLastModified = (tx, file, lastModified) => {
      const store = tx.objectStore('topics');
      store.get(file).onsuccess = (e) => {
        //
        // Get the topic from the store and set the last modified date.
        //
        const topic = e.target.result;
        topic.lastModified = lastModified;

        //
        // Write the updated tpic to the store.
        //
        store.put(topic).onsuccess = () => {
          console.log('Store:', store.name, ' set lastModified:', topic);
        };
      };
    };

    /**
     * The function gets all topics from the store.
     *
     * @returns A Promise for the array with the topics.
     */
    const topicGetAll = () => {
      return new Promise((resolve, reject) => {
        const store = db.transaction(['topics'], 'readonly').objectStore('topics');

        store.getAll().onsuccess = (e) => {
          resolve(e.target.result);
        };
      });
    };

    /**
     * The function is called with a json array that contains the topics. It
     * deletes all topics from the store, that are not contained in the json and
     * updates the rest.
     *
     * @param {Array} json
     */

    // TODO: Wrong place!! If file was removed, then the Question and process stores have to be also removed.

    const topicSync = (json) => {
      const store = db.transaction(['topics'], 'readwrite').objectStore('topics');

      store.getAll().onsuccess = (e) => {
        //
        // Create a map with the topics and the file as the key.
        //
        const storeMap = arrToMap(e.target.result, 'file');

        //
        // Get an array with the files from the json array. The file is the key for
        // the topics in the store and has to be unique.
        //
        const jsonKeys = json.map((item) => item['file']);

        //
        // Delete the topics from the store that are not in the json array.
        //
        for (let storeKey in storeMap) {
          if (!jsonKeys.includes(storeKey)) {
            store.delete(storeKey).onsuccess = () => {
              console.log('Store:', store.name, ' deleted:', storeKey);
            };
          }
        }

        //
        // Update the topics in the store.
        //
        json.forEach((jsonItem) => {
          //
          // Copy last modified if present.
          //
          const storeItem = storeMap.get(jsonItem.file);
          if (storeItem && storeItem.lastModified) {
            jsonItem.lastModified = storeItem.lastModified;
          }

          store.put(jsonItem).onsuccess = (e) => {
            console.log('Store:', store.name, ' update:', e.target.result);
          };
        });
      };
    };

    // TODO: nename file => questModel.js

    /**
     * The function sets all 'current' properties from questions from a given file
     * to a given value.
     *
     * @param {string} file The file name for the questions.
     * @param {number} value The new value.
     */
    const questSetProgress = (file, value) => {
      //
      // We are only interested in questions from a given file.
      //
      const range = IDBKeyRange.only(file);

      const store = db
        .transaction(['questions'], 'readwrite')
        .objectStore('questions');

      store.index('file').openCursor(range).onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const elem = cursor.value;
          //
          // Ensure that we need to update the value in the store.
          //
          if (elem.progress !== value) {
            elem.progress = value;
            elem.failed = 0;
            store.put(elem);
            console.log('Store:', store.name, ' update:', elem.id);
          }

          cursor.continue();
        }
        //
        // The cursor has finished.
        //
        else {
          console.log('Store:', store.name, ' set progress done:', value);
        }
      };
    };

    /**
     * The function collects the 'progress' property from questions that are from a
     * given file.
     *
     * @param {string} file The name of the file.
     * @returns An array with the 'progress' values.
     */
    const questGetStats = (file) => {
      return new Promise((resolve, reject) => {
        const result = [];

        //
        // We are only interested in questions from a given file.
        //
        const range = IDBKeyRange.only(file);

        const store = db
          .transaction(['questions'], 'readwrite')
          .objectStore('questions');

        store.index('file').openCursor(range).onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
            result.push(cursor.value.progress);
            cursor.continue();
          }
          //
          // The cursor has finished.
          //
          else {
            console.log('Store:', store.name, ' progress values:', result);
            resolve(result);
          }
        };
      });
    };

    /**
     * The function is called with an array of questions and counts the number of 
     * correct answers for each question.
     * 
     * @param {Array<any>} quests The array of questions that are processed.
     * @returns An array of integers.
     */
    const questGetStatistics = (quests) => {
      const statistic = [0, 0, 0, 0];

      quests.forEach((a) => {
        statistic[a.progress]++;
      });

      return statistic;
    };

    /**
     * The function is called with a question and a boolean value indicating if the
     * answer was correct.
     * 
     * @param {Object} quest The current question.
     * @param {boolean} isCorrect True if the answer was corrent.
     */
    const questOnAnswer = (quest, isCorrect) => {

      if (isCorrect) {
        quest.progress++;
      } else {
        quest.progress = 0;
        quest.failed++;
      }

      quest.total++;
      quest.ratio = percentage(quest.failed, quest.total);
    };

    /**
     * The function is called with a quest, which should be persisted.
     * 
     * @param {Object} quest 
     * @returns A Promise
     */
    const questPersist = (quest) => {

      return new Promise((resolve, reject) => {

        const store = db
          .transaction(['questions'], 'readwrite')
          .objectStore('questions');

        store.put(quest).onsuccess = (e) => {
          console.log('Store:', store.name, ' update:', quest);
          resolve();
        };
      });
    };

    /**
     * The function gets all questions for a topic from the store.
     *
     * @returns A Promise for the array with the questions.
     */
    const questGetAll = (topic) => {

      return new Promise((resolve, reject) => {

        const store = db
          .transaction(['questions'], 'readonly')
          .objectStore('questions');

        store.index('file').getAll(topic.file).onsuccess = (e) => {
          resolve(e.target.result);
        };
      });
    };

    /**
     * The function initializes a quest that was loaded from a topic file.
     * 
     * @param {Object} quest The question to be initialized.
     * @param {string} file The name of the topic file.
     */
    const questInit = (quest, file) => {
      quest.file = file;
      quest.total = 0;
      quest.failed = 0;
      quest.ratio = 0.0;
      quest.progress = 0;
    };

    /**
     * The function gets the last modified date of the topics file from the config
     * store.
     *
     * @param {IDBDatabase} db The Database.
     * @returns A Promise for the last modified date.
     */
    const dbcGetLastModified = () => {

      return new Promise((resolve, reject) => {
        db
          .transaction(['config'], 'readonly')
          .objectStore('config')
          .get('topics-last-modified').onsuccess = (e) => {

            const prop = e.target.result;

            //
            // It is possible that no date exists in the store.
            //
            if (prop) {
              resolve(prop.value);
            } else {
              resolve();
            }
          };
      });
    };

    /**
     * The function stores the last modified date for the topics file in the config
     * store.
     *
     * @param {Date} lastModified The last modified date of the topics file.
     */
    const dbcSetLastModified = (lastModified) => {

      const data = { key: 'topics-last-modified', value: lastModified };
      const store = db.transaction(['config'], 'readwrite').objectStore('config');

      store.put(data).onsuccess = () => {
        console.log('Store:', store.name, ' set lastModified:', data);
      };
    };

    // TODO: rename file

    /**
     * The function is called with the file name of a topic. It checks if an update
     * of the stored questions of a topic is necessary and if so, if does the
     * update.
     *
     * @param {String} file
     */
    const loadQuestions = async (file) => {
      console.log(file);

      //
      // Compare the last modified date of the stored topic file, with the last
      // modified date of the file on the server, to decide if an update is
      // necessary.
      //
      const storeLm = topicGetLastModified(file);
      const jsonLm = fetchLastModified(file);

      const [lmStore, lmJson] = await Promise.all([storeLm, jsonLm]);
      console.log('lmStore', lmStore, 'lmJson', lmJson);

      if (lmStore && lmStore >= lmJson) {
        return;
      }

      const json = await fetchJson(file);

      json.forEach(quest => questInit(quest, file));
      console.log(json);

      //
      // At this point we know that we have to update the questions for the topic.
      //
      const tx = db.transaction(['topics', 'questions'], 'readwrite');

      await storeDeleteIndex(
        tx,
        'questions',
        'file',
        file
      );

      storeAddAll(tx, 'questions', json);

      //
      // The last step is to update the last modified value for the topic file.
      //
      topicSetLastModified(tx, file, lmJson);
    };

    // -----------------------------

    const initApp = async () => {
      //
      // Ensure that the database is initialized before we go on.
      //
      await dbInit();

      const storeLmPromise = dbcGetLastModified();

      const headLmPromise = fetchLastModified('data/topics.json');

      const [storeLm, headLm] = await Promise.all([storeLmPromise, headLmPromise]);

      console.log('last modified store:', storeLm);
      console.log('last modified head:', headLm);

      if (!storeLm || storeLm < headLm) {
        //
        // TODO: comment => TopicList.svelte has to wait for the sync to finish
        // We have to wait for the sync before view can read from the store
        //
        await fetchJson('data/topics.json').then((json) => {
          topicSync(json);
          dbcSetLastModified(headLm);
        });
      }
    };

    /**
     * PWA service worker registration.
     */
    const pwaSerivceWorkerRegister = async () => {

        if ('serviceWorker' in navigator) {
            try {
                //
                // Finish registration, before we init app.
                //
                const registration = await navigator.serviceWorker.register(
                    'service-worker.js'
                );
                console.log(
                    'Registration of serivce worker done - scope:',
                    registration.scope
                );
            } catch (error) {
                console.log('Service worker registration failed, error:', error);
            }
        }
    };

    /* src/components/Header.svelte generated by Svelte v3.42.6 */

    const file$8 = "src/components/Header.svelte";

    function create_fragment$8(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Cards";
    			add_location(h2, file$8, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/components/Footer.svelte generated by Svelte v3.42.6 */

    const file$7 = "src/components/Footer.svelte";

    function create_fragment$7(ctx) {
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "by Volker Senkel 2021";
    			attr_dev(div0, "class", "is-text-right");
    			add_location(div0, file$7, 1, 2, 22);
    			attr_dev(div1, "class", "block");
    			add_location(div1, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/TopicCard.svelte generated by Svelte v3.42.6 */
    const file$6 = "src/components/TopicCard.svelte";

    // (23:2) {#if topic.desc}
    function create_if_block$1(ctx) {
    	let p;
    	let t_value = /*topic*/ ctx[0].desc + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file$6, 23, 4, 401);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*topic*/ 1 && t_value !== (t_value = /*topic*/ ctx[0].desc + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(23:2) {#if topic.desc}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div1;
    	let h4;
    	let t0_value = /*topic*/ ctx[0].title + "";
    	let t0;
    	let t1;
    	let table;
    	let tr0;
    	let td0;
    	let t3;
    	let td1;
    	let t4;
    	let tr1;
    	let td2;
    	let t6;
    	let td3;
    	let t7;
    	let t8;
    	let div0;
    	let button;
    	let mounted;
    	let dispose;
    	let if_block = /*topic*/ ctx[0].desc && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			table = element("table");
    			tr0 = element("tr");
    			td0 = element("td");
    			td0.textContent = "Modified";
    			t3 = space();
    			td1 = element("td");
    			t4 = space();
    			tr1 = element("tr");
    			td2 = element("td");
    			td2.textContent = "Status";
    			t6 = space();
    			td3 = element("td");
    			t7 = space();
    			if (if_block) if_block.c();
    			t8 = space();
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Show";
    			add_location(h4, file$6, 11, 2, 224);
    			add_location(td0, file$6, 14, 6, 272);
    			add_location(td1, file$6, 15, 6, 296);
    			add_location(tr0, file$6, 13, 4, 261);
    			add_location(td2, file$6, 18, 6, 328);
    			add_location(td3, file$6, 19, 6, 350);
    			add_location(tr1, file$6, 17, 4, 317);
    			add_location(table, file$6, 12, 2, 249);
    			attr_dev(button, "class", "button");
    			add_location(button, file$6, 26, 4, 457);
    			attr_dev(div0, "class", "buttons");
    			add_location(div0, file$6, 25, 2, 431);
    			attr_dev(div1, "class", "card card-shadow content");
    			add_location(div1, file$6, 10, 0, 183);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h4);
    			append_dev(h4, t0);
    			append_dev(div1, t1);
    			append_dev(div1, table);
    			append_dev(table, tr0);
    			append_dev(tr0, td0);
    			append_dev(tr0, t3);
    			append_dev(tr0, td1);
    			append_dev(table, t4);
    			append_dev(table, tr1);
    			append_dev(tr1, td2);
    			append_dev(tr1, t6);
    			append_dev(tr1, td3);
    			append_dev(div1, t7);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t8);
    			append_dev(div1, div0);
    			append_dev(div0, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*topic*/ 1 && t0_value !== (t0_value = /*topic*/ ctx[0].title + "")) set_data_dev(t0, t0_value);

    			if (/*topic*/ ctx[0].desc) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(div1, t8);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TopicCard', slots, []);
    	let { topic } = $$props;

    	const onClick = topic => {
    		viewStore.setView('TopicShow', { topic });
    	};

    	const writable_props = ['topic'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TopicCard> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => onClick(topic);

    	$$self.$$set = $$props => {
    		if ('topic' in $$props) $$invalidate(0, topic = $$props.topic);
    	};

    	$$self.$capture_state = () => ({ viewStore, topic, onClick });

    	$$self.$inject_state = $$props => {
    		if ('topic' in $$props) $$invalidate(0, topic = $$props.topic);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [topic, onClick, click_handler];
    }

    class TopicCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { topic: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TopicCard",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*topic*/ ctx[0] === undefined && !('topic' in props)) {
    			console.warn("<TopicCard> was created without expected prop 'topic'");
    		}
    	}

    	get topic() {
    		throw new Error("<TopicCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set topic(value) {
    		throw new Error("<TopicCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/TopicList.svelte generated by Svelte v3.42.6 */
    const file$5 = "src/components/TopicList.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (18:2) {#each topics as topic}
    function create_each_block$1(ctx) {
    	let topiccard;
    	let current;

    	topiccard = new TopicCard({
    			props: { topic: /*topic*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(topiccard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(topiccard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const topiccard_changes = {};
    			if (dirty & /*topics*/ 1) topiccard_changes.topic = /*topic*/ ctx[1];
    			topiccard.$set(topiccard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(topiccard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(topiccard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(topiccard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(18:2) {#each topics as topic}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let current;
    	let each_value = /*topics*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "grid grid-4");
    			add_location(div, file$5, 16, 0, 257);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*topics*/ 1) {
    				each_value = /*topics*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TopicList', slots, []);
    	let topics = [];

    	onMount(() => {
    		topicGetAll().then(t => {
    			$$invalidate(0, topics = t);
    		});
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TopicList> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ onMount, topicGetAll, TopicCard, topics });

    	$$self.$inject_state = $$props => {
    		if ('topics' in $$props) $$invalidate(0, topics = $$props.topics);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [topics];
    }

    class TopicList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TopicList",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/components/TopicShow.svelte generated by Svelte v3.42.6 */

    const { console: console_1$1 } = globals;
    const file$4 = "src/components/TopicShow.svelte";

    function create_fragment$4(ctx) {
    	let div3;
    	let h4;
    	let t0_value = /*topic*/ ctx[0].title + "";
    	let t0;
    	let t1;
    	let div1;
    	let table;
    	let tr0;
    	let td0;
    	let t3;
    	let td1;
    	let t4_value = /*topic*/ ctx[0].file + "";
    	let t4;
    	let t5;
    	let tr1;
    	let td2;
    	let t7;
    	let td3;
    	let t8_value = fmtDate(/*topic*/ ctx[0].lastModified) + "";
    	let t8;
    	let t9;
    	let tr2;
    	let td4;
    	let t11;
    	let td5;
    	let t12_value = /*topic*/ ctx[0].desc + "";
    	let t12;
    	let t13;
    	let tr3;
    	let td6;
    	let t15;
    	let td7;
    	let t16;
    	let t17;
    	let tr4;
    	let td8;
    	let t19;
    	let td9;
    	let t20;
    	let t21;
    	let div0;
    	let label;
    	let t23;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let option3;
    	let option4;
    	let t29;
    	let div2;
    	let button0;
    	let t31;
    	let button1;
    	let t33;
    	let button2;
    	let t34;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			table = element("table");
    			tr0 = element("tr");
    			td0 = element("td");
    			td0.textContent = "File";
    			t3 = space();
    			td1 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			tr1 = element("tr");
    			td2 = element("td");
    			td2.textContent = "Modified";
    			t7 = space();
    			td3 = element("td");
    			t8 = text(t8_value);
    			t9 = space();
    			tr2 = element("tr");
    			td4 = element("td");
    			td4.textContent = "Description";
    			t11 = space();
    			td5 = element("td");
    			t12 = text(t12_value);
    			t13 = space();
    			tr3 = element("tr");
    			td6 = element("td");
    			td6.textContent = "Status";
    			t15 = space();
    			td7 = element("td");
    			t16 = text(/*status*/ ctx[1]);
    			t17 = space();
    			tr4 = element("tr");
    			td8 = element("td");
    			td8.textContent = "Size";
    			t19 = space();
    			td9 = element("td");
    			t20 = text(/*size*/ ctx[3]);
    			t21 = space();
    			div0 = element("div");
    			label = element("label");
    			label.textContent = "Number of correct answers";
    			t23 = space();
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "-- Select --";
    			option1 = element("option");
    			option1.textContent = "Set 0";
    			option2 = element("option");
    			option2.textContent = "Set 1";
    			option3 = element("option");
    			option3.textContent = "Set 2";
    			option4 = element("option");
    			option4.textContent = "Set 3";
    			t29 = space();
    			div2 = element("div");
    			button0 = element("button");
    			button0.textContent = "Back";
    			t31 = space();
    			button1 = element("button");
    			button1.textContent = "Listing";
    			t33 = space();
    			button2 = element("button");
    			t34 = text("Start");
    			add_location(h4, file$4, 80, 2, 1782);
    			add_location(td0, file$4, 85, 8, 1886);
    			add_location(td1, file$4, 86, 8, 1908);
    			add_location(tr0, file$4, 84, 6, 1873);
    			add_location(td2, file$4, 89, 8, 1961);
    			add_location(td3, file$4, 90, 8, 1987);
    			add_location(tr1, file$4, 88, 6, 1948);
    			add_location(td4, file$4, 93, 8, 2057);
    			add_location(td5, file$4, 94, 8, 2086);
    			add_location(tr2, file$4, 92, 6, 2044);
    			add_location(td6, file$4, 97, 8, 2139);
    			add_location(td7, file$4, 98, 8, 2163);
    			add_location(tr3, file$4, 96, 6, 2126);
    			add_location(td8, file$4, 101, 8, 2212);
    			add_location(td9, file$4, 102, 8, 2234);
    			add_location(tr4, file$4, 100, 6, 2199);
    			attr_dev(table, "class", "is-text-left");
    			add_location(table, file$4, 83, 4, 1838);
    			attr_dev(label, "for", "sf-set");
    			add_location(label, file$4, 107, 6, 2292);
    			option0.__value = "";
    			option0.value = option0.__value;
    			add_location(option0, file$4, 109, 8, 2402);
    			option1.__value = "0";
    			option1.value = option1.__value;
    			add_location(option1, file$4, 110, 8, 2449);
    			option2.__value = "1";
    			option2.value = option2.__value;
    			add_location(option2, file$4, 111, 8, 2490);
    			option3.__value = "2";
    			option3.value = option3.__value;
    			add_location(option3, file$4, 112, 8, 2531);
    			option4.__value = "3";
    			option4.value = option4.__value;
    			add_location(option4, file$4, 113, 8, 2572);
    			attr_dev(select, "id", "sf-set");
    			add_location(select, file$4, 108, 6, 2352);
    			add_location(div0, file$4, 106, 4, 2280);
    			attr_dev(div1, "class", "grid grid-4");
    			add_location(div1, file$4, 82, 2, 1808);
    			attr_dev(button0, "class", "button");
    			add_location(button0, file$4, 119, 4, 2670);
    			attr_dev(button1, "class", "button");
    			add_location(button1, file$4, 120, 4, 2729);
    			attr_dev(button2, "class", "button");
    			button2.disabled = /*startDisabled*/ ctx[2];
    			add_location(button2, file$4, 121, 4, 2794);
    			attr_dev(div2, "class", "buttons");
    			add_location(div2, file$4, 118, 2, 2644);
    			attr_dev(div3, "class", "card card-shadow content");
    			add_location(div3, file$4, 79, 0, 1741);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, h4);
    			append_dev(h4, t0);
    			append_dev(div3, t1);
    			append_dev(div3, div1);
    			append_dev(div1, table);
    			append_dev(table, tr0);
    			append_dev(tr0, td0);
    			append_dev(tr0, t3);
    			append_dev(tr0, td1);
    			append_dev(td1, t4);
    			append_dev(table, t5);
    			append_dev(table, tr1);
    			append_dev(tr1, td2);
    			append_dev(tr1, t7);
    			append_dev(tr1, td3);
    			append_dev(td3, t8);
    			append_dev(table, t9);
    			append_dev(table, tr2);
    			append_dev(tr2, td4);
    			append_dev(tr2, t11);
    			append_dev(tr2, td5);
    			append_dev(td5, t12);
    			append_dev(table, t13);
    			append_dev(table, tr3);
    			append_dev(tr3, td6);
    			append_dev(tr3, t15);
    			append_dev(tr3, td7);
    			append_dev(td7, t16);
    			append_dev(table, t17);
    			append_dev(table, tr4);
    			append_dev(tr4, td8);
    			append_dev(tr4, t19);
    			append_dev(tr4, td9);
    			append_dev(td9, t20);
    			append_dev(div1, t21);
    			append_dev(div1, div0);
    			append_dev(div0, label);
    			append_dev(div0, t23);
    			append_dev(div0, select);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			append_dev(select, option3);
    			append_dev(select, option4);
    			append_dev(div3, t29);
    			append_dev(div3, div2);
    			append_dev(div2, button0);
    			append_dev(div2, t31);
    			append_dev(div2, button1);
    			append_dev(div2, t33);
    			append_dev(div2, button2);
    			append_dev(button2, t34);

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*onSelect*/ ctx[7], false, false, false),
    					listen_dev(button0, "click", /*onBack*/ ctx[4], false, false, false),
    					listen_dev(button1, "click", /*onListing*/ ctx[5], false, false, false),
    					listen_dev(button2, "click", /*onStart*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*topic*/ 1 && t0_value !== (t0_value = /*topic*/ ctx[0].title + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*topic*/ 1 && t4_value !== (t4_value = /*topic*/ ctx[0].file + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*topic*/ 1 && t8_value !== (t8_value = fmtDate(/*topic*/ ctx[0].lastModified) + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*topic*/ 1 && t12_value !== (t12_value = /*topic*/ ctx[0].desc + "")) set_data_dev(t12, t12_value);
    			if (dirty & /*status*/ 2) set_data_dev(t16, /*status*/ ctx[1]);
    			if (dirty & /*size*/ 8) set_data_dev(t20, /*size*/ ctx[3]);

    			if (dirty & /*startDisabled*/ 4) {
    				prop_dev(button2, "disabled", /*startDisabled*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TopicShow', slots, []);
    	let { topic } = $$props;

    	//
    	// Properties for the view.
    	//
    	let status = '';

    	let startDisabled = true;
    	let size = 0;

    	/**
     * The function gets the values for 'status' and 'startDisabled' and the
     * number of questions.
     */
    	const updateStatus = () => {
    		questGetStats(topic.file).then(arr => {
    			$$invalidate(1, status = arrPercentage(arr, 3));
    			$$invalidate(2, startDisabled = arrAll(arr, 3));
    			$$invalidate(3, size = arr.length);
    		});
    	};

    	/**
     * On mount we load the questions for the topic and then we update the
     * properties for this view.
     */
    	onMount(() => {
    		loadQuestions(topic.file).then(() => updateStatus());
    	});

    	/**
     * Callback function for the back button.
     */
    	const onBack = () => {
    		viewStore.setView('TopicList');
    	};

    	/**
     * Callback function for the listing button.
     */
    	const onListing = () => {
    		viewStore.setView('QuestList', { topic });
    	};

    	/**
     * Callback function for the start button.
     */
    	const onStart = () => {
    		viewStore.setView('QuestShow', { topic });
    	};

    	/**
     * Callback function for the select box.
     *
     * @param {Event} e
     */
    	const onSelect = e => {
    		console.log('index', e.target.selectedIndex);

    		//
    		// Set the number of correct answers.
    		//
    		questSetProgress(topic.file, e.target.selectedIndex - 1);

    		//
    		// Set the index to 0 to restore the orignal state.
    		//
    		e.target.selectedIndex = 0;

    		updateStatus();
    	};

    	const writable_props = ['topic'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<TopicShow> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('topic' in $$props) $$invalidate(0, topic = $$props.topic);
    	};

    	$$self.$capture_state = () => ({
    		fmtDate,
    		arrPercentage,
    		arrAll,
    		loadQuestions,
    		questSetProgress,
    		questGetStats,
    		viewStore,
    		onMount,
    		topic,
    		status,
    		startDisabled,
    		size,
    		updateStatus,
    		onBack,
    		onListing,
    		onStart,
    		onSelect
    	});

    	$$self.$inject_state = $$props => {
    		if ('topic' in $$props) $$invalidate(0, topic = $$props.topic);
    		if ('status' in $$props) $$invalidate(1, status = $$props.status);
    		if ('startDisabled' in $$props) $$invalidate(2, startDisabled = $$props.startDisabled);
    		if ('size' in $$props) $$invalidate(3, size = $$props.size);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [topic, status, startDisabled, size, onBack, onListing, onStart, onSelect];
    }

    class TopicShow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { topic: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TopicShow",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*topic*/ ctx[0] === undefined && !('topic' in props)) {
    			console_1$1.warn("<TopicShow> was created without expected prop 'topic'");
    		}
    	}

    	get topic() {
    		throw new Error("<TopicShow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set topic(value) {
    		throw new Error("<TopicShow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/QuestList.svelte generated by Svelte v3.42.6 */
    const file$3 = "src/components/QuestList.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (43:8) {#if question.total != 0}
    function create_if_block(ctx) {
    	let span2;
    	let t0;
    	let span0;
    	let t1_value = /*question*/ ctx[5].total + "";
    	let t1;
    	let t2;
    	let span1;
    	let t3_value = /*question*/ ctx[5].ratio + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			span2 = element("span");
    			t0 = text("( Total: ");
    			span0 = element("span");
    			t1 = text(t1_value);
    			t2 = text(" /\n            ");
    			span1 = element("span");
    			t3 = text(t3_value);
    			t4 = text(")");
    			attr_dev(span0, "class", "is-text-success");
    			add_location(span0, file$3, 44, 21, 1127);
    			attr_dev(span1, "class", "is-text-danger");
    			add_location(span1, file$3, 45, 12, 1195);
    			attr_dev(span2, "class", "h6");
    			add_location(span2, file$3, 43, 10, 1088);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span2, anchor);
    			append_dev(span2, t0);
    			append_dev(span2, span0);
    			append_dev(span0, t1);
    			append_dev(span2, t2);
    			append_dev(span2, span1);
    			append_dev(span1, t3);
    			append_dev(span2, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*questions*/ 2 && t1_value !== (t1_value = /*question*/ ctx[5].total + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*questions*/ 2 && t3_value !== (t3_value = /*question*/ ctx[5].ratio + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(43:8) {#if question.total != 0}",
    		ctx
    	});

    	return block;
    }

    // (40:4) {#each questions as question}
    function create_each_block(ctx) {
    	let div1;
    	let div0;
    	let t0_value = /*question*/ ctx[5].id + "";
    	let t0;
    	let t1;
    	let t2;
    	let div3;
    	let div2;
    	let p0;
    	let t3_value = /*question*/ ctx[5].quest + "";
    	let t3;
    	let t4;
    	let div5;
    	let div4;
    	let p1;
    	let t5_value = /*question*/ ctx[5].answer + "";
    	let t5;
    	let t6;
    	let if_block = /*question*/ ctx[5].total != 0 && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			div3 = element("div");
    			div2 = element("div");
    			p0 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			div5 = element("div");
    			div4 = element("div");
    			p1 = element("p");
    			t5 = text(t5_value);
    			t6 = space();
    			attr_dev(div0, "class", "h5");
    			add_location(div0, file$3, 41, 8, 1008);
    			attr_dev(div1, "class", "is-flex-spread grid-full");
    			add_location(div1, file$3, 40, 6, 961);
    			add_location(p0, file$3, 52, 10, 1377);
    			attr_dev(div2, "class", "content");
    			add_location(div2, file$3, 51, 8, 1345);
    			attr_dev(div3, "class", "card " + /*repeatToggle*/ ctx[3]());
    			add_location(div3, file$3, 50, 6, 1301);
    			add_location(p1, file$3, 57, 10, 1511);
    			attr_dev(div4, "class", "content");
    			add_location(div4, file$3, 56, 8, 1479);
    			attr_dev(div5, "class", "card " + /*repeatToggle*/ ctx[3]());
    			add_location(div5, file$3, 55, 6, 1435);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);
    			if (if_block) if_block.m(div1, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, p0);
    			append_dev(p0, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, p1);
    			append_dev(p1, t5);
    			append_dev(div5, t6);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*questions*/ 2 && t0_value !== (t0_value = /*question*/ ctx[5].id + "")) set_data_dev(t0, t0_value);

    			if (/*question*/ ctx[5].total != 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*questions*/ 2 && t3_value !== (t3_value = /*question*/ ctx[5].quest + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*questions*/ 2 && t5_value !== (t5_value = /*question*/ ctx[5].answer + "")) set_data_dev(t5, t5_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(40:4) {#each questions as question}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div2;
    	let h4;
    	let t0_value = /*topic*/ ctx[0].title + "";
    	let t0;
    	let t1;
    	let div0;
    	let t2;
    	let div1;
    	let button;
    	let mounted;
    	let dispose;
    	let each_value = /*questions*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			div1 = element("div");
    			button = element("button");
    			button.textContent = "Back";
    			add_location(h4, file$3, 37, 2, 870);
    			attr_dev(div0, "class", "grid grid-2");
    			add_location(div0, file$3, 38, 2, 895);
    			attr_dev(button, "class", "button");
    			add_location(button, file$3, 64, 4, 1614);
    			attr_dev(div1, "class", "buttons");
    			add_location(div1, file$3, 63, 2, 1588);
    			attr_dev(div2, "class", "card card-shadow content");
    			add_location(div2, file$3, 36, 0, 829);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, h4);
    			append_dev(h4, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*topic*/ 1 && t0_value !== (t0_value = /*topic*/ ctx[0].title + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*repeatToggle, questions*/ 10) {
    				each_value = /*questions*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('QuestList', slots, []);
    	let { topic } = $$props;
    	let questions = [];

    	/**
     * On mounting the component the questions for the topic is loaded.
     */
    	onMount(() => {
    		questGetAll(topic).then(topicQuests => {
    			$$invalidate(1, questions = topicQuests);
    		});
    	});

    	/**
     * Change the view.
     *
     * @param topic The topic for the next view.
     */
    	const onClick = topic => {
    		viewStore.setView('TopicShow', { topic });
    	};

    	//
    	// The function toogles the values after 2 calls.
    	//
    	const repeatToggle = createRepeatToggle(2, 'is-primary', 'is-info');

    	const writable_props = ['topic'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<QuestList> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => onClick(topic);

    	$$self.$$set = $$props => {
    		if ('topic' in $$props) $$invalidate(0, topic = $$props.topic);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		viewStore,
    		questGetAll,
    		createRepeatToggle,
    		topic,
    		questions,
    		onClick,
    		repeatToggle
    	});

    	$$self.$inject_state = $$props => {
    		if ('topic' in $$props) $$invalidate(0, topic = $$props.topic);
    		if ('questions' in $$props) $$invalidate(1, questions = $$props.questions);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [topic, questions, onClick, repeatToggle, click_handler];
    }

    class QuestList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { topic: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "QuestList",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*topic*/ ctx[0] === undefined && !('topic' in props)) {
    			console.warn("<QuestList> was created without expected prop 'topic'");
    		}
    	}

    	get topic() {
    		throw new Error("<QuestList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set topic(value) {
    		throw new Error("<QuestList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/QuestStatistic.svelte generated by Svelte v3.42.6 */

    const file$2 = "src/components/QuestStatistic.svelte";

    function create_fragment$2(ctx) {
    	let table;
    	let tr0;
    	let td0;
    	let t1;
    	let td1;
    	let t2_value = /*statistic*/ ctx[0][0] + "";
    	let t2;
    	let t3;
    	let tr1;
    	let td2;
    	let t5;
    	let td3;
    	let t6_value = /*statistic*/ ctx[0][1] + "";
    	let t6;
    	let t7;
    	let tr2;
    	let td4;
    	let t9;
    	let td5;
    	let t10_value = /*statistic*/ ctx[0][2] + "";
    	let t10;
    	let t11;
    	let tr3;
    	let td6;
    	let t13;
    	let td7;
    	let t14_value = /*statistic*/ ctx[0][3] + "";
    	let t14;

    	const block = {
    		c: function create() {
    			table = element("table");
    			tr0 = element("tr");
    			td0 = element("td");
    			td0.textContent = "No correct Answers";
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			tr1 = element("tr");
    			td2 = element("td");
    			td2.textContent = "One correct Answer";
    			t5 = space();
    			td3 = element("td");
    			t6 = text(t6_value);
    			t7 = space();
    			tr2 = element("tr");
    			td4 = element("td");
    			td4.textContent = "Two correct Answers";
    			t9 = space();
    			td5 = element("td");
    			t10 = text(t10_value);
    			t11 = space();
    			tr3 = element("tr");
    			td6 = element("td");
    			td6.textContent = "Learned";
    			t13 = space();
    			td7 = element("td");
    			t14 = text(t14_value);
    			add_location(td0, file$2, 6, 4, 100);
    			add_location(td1, file$2, 7, 4, 132);
    			add_location(tr0, file$2, 5, 2, 91);
    			add_location(td2, file$2, 10, 4, 175);
    			add_location(td3, file$2, 11, 4, 207);
    			add_location(tr1, file$2, 9, 2, 166);
    			add_location(td4, file$2, 14, 4, 250);
    			add_location(td5, file$2, 15, 4, 283);
    			add_location(tr2, file$2, 13, 2, 241);
    			add_location(td6, file$2, 18, 4, 326);
    			add_location(td7, file$2, 19, 4, 347);
    			add_location(tr3, file$2, 17, 2, 317);
    			attr_dev(table, "class", "table hide-md");
    			add_location(table, file$2, 4, 0, 59);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);
    			append_dev(table, tr0);
    			append_dev(tr0, td0);
    			append_dev(tr0, t1);
    			append_dev(tr0, td1);
    			append_dev(td1, t2);
    			append_dev(table, t3);
    			append_dev(table, tr1);
    			append_dev(tr1, td2);
    			append_dev(tr1, t5);
    			append_dev(tr1, td3);
    			append_dev(td3, t6);
    			append_dev(table, t7);
    			append_dev(table, tr2);
    			append_dev(tr2, td4);
    			append_dev(tr2, t9);
    			append_dev(tr2, td5);
    			append_dev(td5, t10);
    			append_dev(table, t11);
    			append_dev(table, tr3);
    			append_dev(tr3, td6);
    			append_dev(tr3, t13);
    			append_dev(tr3, td7);
    			append_dev(td7, t14);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*statistic*/ 1 && t2_value !== (t2_value = /*statistic*/ ctx[0][0] + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*statistic*/ 1 && t6_value !== (t6_value = /*statistic*/ ctx[0][1] + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*statistic*/ 1 && t10_value !== (t10_value = /*statistic*/ ctx[0][2] + "")) set_data_dev(t10, t10_value);
    			if (dirty & /*statistic*/ 1 && t14_value !== (t14_value = /*statistic*/ ctx[0][3] + "")) set_data_dev(t14, t14_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('QuestStatistic', slots, []);
    	let { statistic = [0, 0, 0, 0] } = $$props;
    	const writable_props = ['statistic'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<QuestStatistic> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('statistic' in $$props) $$invalidate(0, statistic = $$props.statistic);
    	};

    	$$self.$capture_state = () => ({ statistic });

    	$$self.$inject_state = $$props => {
    		if ('statistic' in $$props) $$invalidate(0, statistic = $$props.statistic);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [statistic];
    }

    class QuestStatistic extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { statistic: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "QuestStatistic",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get statistic() {
    		throw new Error("<QuestStatistic>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set statistic(value) {
    		throw new Error("<QuestStatistic>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/QuestShow.svelte generated by Svelte v3.42.6 */

    const { console: console_1 } = globals;
    const file$1 = "src/components/QuestShow.svelte";

    function create_fragment$1(ctx) {
    	let div7;
    	let h4;
    	let t0_value = /*topic*/ ctx[0].title + "";
    	let t0;
    	let t1;
    	let queststatistic;
    	let t2;
    	let div5;
    	let div2;
    	let div0;
    	let h50;
    	let t4;
    	let span4;
    	let t5;
    	let span0;
    	let t6_value = /*quest*/ ctx[3].progress + "";
    	let t6;
    	let t7;
    	let span1;
    	let t8_value = /*quest*/ ctx[3].failed + "";
    	let t8;
    	let t9;
    	let span2;
    	let t10_value = /*quest*/ ctx[3].total + "";
    	let t10;
    	let t11;
    	let span3;
    	let t12_value = /*quest*/ ctx[3].ratio + "";
    	let t12;
    	let t13;
    	let t14;
    	let div1;
    	let p0;
    	let t15_value = /*quest*/ ctx[3].quest + "";
    	let t15;
    	let t16;
    	let div4;
    	let h51;
    	let t18;
    	let div3;
    	let p1;
    	let t19_value = /*quest*/ ctx[3].answer + "";
    	let t19;
    	let t20;
    	let div6;
    	let button0;
    	let t21;
    	let button0_hidden_value;
    	let t22;
    	let button1;
    	let t23;
    	let t24;
    	let button2;
    	let t25;
    	let t26;
    	let button3;
    	let current;
    	let mounted;
    	let dispose;

    	queststatistic = new QuestStatistic({
    			props: { statistic: /*statistic*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(queststatistic.$$.fragment);
    			t2 = space();
    			div5 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			h50 = element("h5");
    			h50.textContent = "Question";
    			t4 = space();
    			span4 = element("span");
    			t5 = text("(Progress: ");
    			span0 = element("span");
    			t6 = text(t6_value);
    			t7 = text(" /\n          ");
    			span1 = element("span");
    			t8 = text(t8_value);
    			t9 = text("\n          Total: ");
    			span2 = element("span");
    			t10 = text(t10_value);
    			t11 = text(" /\n          ");
    			span3 = element("span");
    			t12 = text(t12_value);
    			t13 = text(")");
    			t14 = space();
    			div1 = element("div");
    			p0 = element("p");
    			t15 = text(t15_value);
    			t16 = space();
    			div4 = element("div");
    			h51 = element("h5");
    			h51.textContent = "Answer";
    			t18 = space();
    			div3 = element("div");
    			p1 = element("p");
    			t19 = text(t19_value);
    			t20 = space();
    			div6 = element("div");
    			button0 = element("button");
    			t21 = text("Show");
    			t22 = space();
    			button1 = element("button");
    			t23 = text("Correct");
    			t24 = space();
    			button2 = element("button");
    			t25 = text("Wrong");
    			t26 = space();
    			button3 = element("button");
    			button3.textContent = "Stop";
    			add_location(h4, file$1, 84, 2, 1594);
    			add_location(h50, file$1, 91, 8, 1733);
    			attr_dev(span0, "class", "is-text-success");
    			add_location(span0, file$1, 93, 21, 1798);
    			attr_dev(span1, "class", "is-text-danger");
    			add_location(span1, file$1, 94, 10, 1864);
    			attr_dev(span2, "class", "is-text-success");
    			add_location(span2, file$1, 95, 17, 1932);
    			attr_dev(span3, "class", "is-text-danger");
    			add_location(span3, file$1, 96, 10, 1995);
    			attr_dev(span4, "class", "h6");
    			add_location(span4, file$1, 92, 8, 1759);
    			attr_dev(div0, "class", "is-flex-spread");
    			add_location(div0, file$1, 90, 6, 1696);
    			add_location(p0, file$1, 101, 8, 2128);
    			attr_dev(div1, "class", "card content is-primary");
    			add_location(div1, file$1, 100, 6, 2082);
    			add_location(div2, file$1, 89, 4, 1684);
    			add_location(h51, file$1, 106, 6, 2210);
    			add_location(p1, file$1, 108, 8, 2275);
    			attr_dev(div3, "class", "card content is-info");
    			add_location(div3, file$1, 107, 6, 2232);
    			div4.hidden = /*hideAnswer*/ ctx[2];
    			add_location(div4, file$1, 105, 4, 2178);
    			attr_dev(div5, "class", "grid grid-2");
    			add_location(div5, file$1, 88, 2, 1654);
    			attr_dev(button0, "class", "button");
    			button0.hidden = button0_hidden_value = !/*hideAnswer*/ ctx[2];
    			add_location(button0, file$1, 115, 4, 2411);
    			attr_dev(button1, "class", "button is-success");
    			button1.hidden = /*hideAnswer*/ ctx[2];
    			add_location(button1, file$1, 116, 4, 2491);
    			attr_dev(button2, "class", "button is-danger");
    			button2.hidden = /*hideAnswer*/ ctx[2];
    			add_location(button2, file$1, 119, 4, 2599);
    			attr_dev(button3, "class", "button");
    			add_location(button3, file$1, 122, 4, 2702);
    			attr_dev(div6, "class", "buttons");
    			add_location(div6, file$1, 114, 2, 2385);
    			attr_dev(div7, "class", "card card-shadow content");
    			add_location(div7, file$1, 83, 0, 1553);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, h4);
    			append_dev(h4, t0);
    			append_dev(div7, t1);
    			mount_component(queststatistic, div7, null);
    			append_dev(div7, t2);
    			append_dev(div7, div5);
    			append_dev(div5, div2);
    			append_dev(div2, div0);
    			append_dev(div0, h50);
    			append_dev(div0, t4);
    			append_dev(div0, span4);
    			append_dev(span4, t5);
    			append_dev(span4, span0);
    			append_dev(span0, t6);
    			append_dev(span4, t7);
    			append_dev(span4, span1);
    			append_dev(span1, t8);
    			append_dev(span4, t9);
    			append_dev(span4, span2);
    			append_dev(span2, t10);
    			append_dev(span4, t11);
    			append_dev(span4, span3);
    			append_dev(span3, t12);
    			append_dev(span4, t13);
    			append_dev(div2, t14);
    			append_dev(div2, div1);
    			append_dev(div1, p0);
    			append_dev(p0, t15);
    			append_dev(div5, t16);
    			append_dev(div5, div4);
    			append_dev(div4, h51);
    			append_dev(div4, t18);
    			append_dev(div4, div3);
    			append_dev(div3, p1);
    			append_dev(p1, t19);
    			append_dev(div7, t20);
    			append_dev(div7, div6);
    			append_dev(div6, button0);
    			append_dev(button0, t21);
    			append_dev(div6, t22);
    			append_dev(div6, button1);
    			append_dev(button1, t23);
    			append_dev(div6, t24);
    			append_dev(div6, button2);
    			append_dev(button2, t25);
    			append_dev(div6, t26);
    			append_dev(div6, button3);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*onShow*/ ctx[5], false, false, false),
    					listen_dev(button1, "click", /*onCorrect*/ ctx[6], false, false, false),
    					listen_dev(button2, "click", /*onWrong*/ ctx[7], false, false, false),
    					listen_dev(button3, "click", /*onStop*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*topic*/ 1) && t0_value !== (t0_value = /*topic*/ ctx[0].title + "")) set_data_dev(t0, t0_value);
    			const queststatistic_changes = {};
    			if (dirty & /*statistic*/ 2) queststatistic_changes.statistic = /*statistic*/ ctx[1];
    			queststatistic.$set(queststatistic_changes);
    			if ((!current || dirty & /*quest*/ 8) && t6_value !== (t6_value = /*quest*/ ctx[3].progress + "")) set_data_dev(t6, t6_value);
    			if ((!current || dirty & /*quest*/ 8) && t8_value !== (t8_value = /*quest*/ ctx[3].failed + "")) set_data_dev(t8, t8_value);
    			if ((!current || dirty & /*quest*/ 8) && t10_value !== (t10_value = /*quest*/ ctx[3].total + "")) set_data_dev(t10, t10_value);
    			if ((!current || dirty & /*quest*/ 8) && t12_value !== (t12_value = /*quest*/ ctx[3].ratio + "")) set_data_dev(t12, t12_value);
    			if ((!current || dirty & /*quest*/ 8) && t15_value !== (t15_value = /*quest*/ ctx[3].quest + "")) set_data_dev(t15, t15_value);
    			if ((!current || dirty & /*quest*/ 8) && t19_value !== (t19_value = /*quest*/ ctx[3].answer + "")) set_data_dev(t19, t19_value);

    			if (!current || dirty & /*hideAnswer*/ 4) {
    				prop_dev(div4, "hidden", /*hideAnswer*/ ctx[2]);
    			}

    			if (!current || dirty & /*hideAnswer*/ 4 && button0_hidden_value !== (button0_hidden_value = !/*hideAnswer*/ ctx[2])) {
    				prop_dev(button0, "hidden", button0_hidden_value);
    			}

    			if (!current || dirty & /*hideAnswer*/ 4) {
    				prop_dev(button1, "hidden", /*hideAnswer*/ ctx[2]);
    			}

    			if (!current || dirty & /*hideAnswer*/ 4) {
    				prop_dev(button2, "hidden", /*hideAnswer*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(queststatistic.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(queststatistic.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			destroy_component(queststatistic);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('QuestShow', slots, []);
    	let { topic } = $$props;
    	let statistic = [];
    	let hideAnswer = true;
    	let quests = [];
    	let unlearned = [];
    	let quest = {};

    	const handleAnswer = isCorrect => {
    		questOnAnswer(quest, isCorrect);

    		questPersist(quest).then(() => {
    			if (quest.progress < 3) {
    				unlearned.push(quest);
    			}

    			if (unlearned.length === 0) {
    				onStop();
    			}

    			$$invalidate(1, statistic = questGetStatistics(quests));
    			next();
    			$$invalidate(2, hideAnswer = !hideAnswer);
    		});
    	};

    	const next = () => {
    		$$invalidate(3, quest = unlearned.shift());
    		console.log('next', quest);
    	};

    	/**
     * Callback function for the mount event.
     */
    	onMount(() => {
    		questGetAll(topic).then(arr => {
    			quests = arr;
    			unlearned = quests.filter(q => q.progress < 3);
    			shuffleArr(unlearned);
    			$$invalidate(1, statistic = questGetStatistics(quests));
    			next();
    		});
    	});

    	/**
     * Callback function for the stop button.
     */
    	const onStop = () => {
    		viewStore.setView('TopicList');
    	};

    	/**
     * Callback function for the show button.
     */
    	const onShow = () => {
    		$$invalidate(2, hideAnswer = !hideAnswer);
    	};

    	const onCorrect = () => {
    		handleAnswer(true);
    	};

    	const onWrong = () => {
    		handleAnswer(false);
    	};

    	const writable_props = ['topic'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<QuestShow> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('topic' in $$props) $$invalidate(0, topic = $$props.topic);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		viewStore,
    		QuestStatistic,
    		questGetAll,
    		questPersist,
    		questOnAnswer,
    		questGetStatistics,
    		shuffleArr,
    		topic,
    		statistic,
    		hideAnswer,
    		quests,
    		unlearned,
    		quest,
    		handleAnswer,
    		next,
    		onStop,
    		onShow,
    		onCorrect,
    		onWrong
    	});

    	$$self.$inject_state = $$props => {
    		if ('topic' in $$props) $$invalidate(0, topic = $$props.topic);
    		if ('statistic' in $$props) $$invalidate(1, statistic = $$props.statistic);
    		if ('hideAnswer' in $$props) $$invalidate(2, hideAnswer = $$props.hideAnswer);
    		if ('quests' in $$props) quests = $$props.quests;
    		if ('unlearned' in $$props) unlearned = $$props.unlearned;
    		if ('quest' in $$props) $$invalidate(3, quest = $$props.quest);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [topic, statistic, hideAnswer, quest, onStop, onShow, onCorrect, onWrong];
    }

    class QuestShow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { topic: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "QuestShow",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*topic*/ ctx[0] === undefined && !('topic' in props)) {
    			console_1.warn("<QuestShow> was created without expected prop 'topic'");
    		}
    	}

    	get topic() {
    		throw new Error("<QuestShow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set topic(value) {
    		throw new Error("<QuestShow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.42.6 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let div1;
    	let header;
    	let t0;
    	let div0;
    	let switch_instance;
    	let t1;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	const switch_instance_spread_levels = [/*$viewStore*/ ctx[0].props];
    	var switch_value = /*$viewStore*/ ctx[0].component;

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(header.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t1 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(div0, "id", "main");
    			attr_dev(div0, "class", "block");
    			add_location(div0, file, 44, 2, 1047);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file, 41, 0, 1007);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(header, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);

    			if (switch_instance) {
    				mount_component(switch_instance, div0, null);
    			}

    			append_dev(div1, t1);
    			mount_component(footer, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const switch_instance_changes = (dirty & /*$viewStore*/ 1)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*$viewStore*/ ctx[0].props)])
    			: {};

    			if (switch_value !== (switch_value = /*$viewStore*/ ctx[0].component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div0, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(header);
    			if (switch_instance) destroy_component(switch_instance);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $viewStore;
    	validate_store(viewStore, 'viewStore');
    	component_subscribe($$self, viewStore, $$value => $$invalidate(0, $viewStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	onMount(() => {
    		pwaSerivceWorkerRegister();

    		viewStore.views = {
    			TopicList: { component: TopicList },
    			TopicShow: { component: TopicShow },
    			QuestList: { component: QuestList },
    			QuestShow: { component: QuestShow }
    		};

    		//
    		// Set the view if the initialization of the app finished.
    		//
    		initApp().then(() => {
    			viewStore.setView('TopicList');
    		});
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		viewStore,
    		initApp,
    		pwaSerivceWorkerRegister,
    		Header,
    		Footer,
    		TopicList,
    		TopicShow,
    		QuestList,
    		QuestShow,
    		$viewStore
    	});

    	return [$viewStore];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
      props: {},
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
