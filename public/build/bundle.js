
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function (Text) {
    'use strict';

    Text = Text && Object.prototype.hasOwnProperty.call(Text, 'default') ? Text['default'] : Text;

    function noop() { }
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

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
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
    function empty() {
        return text('');
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
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
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
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
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
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
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
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
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
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
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
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.22.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/entities/Box.svelte generated by Svelte v3.22.2 */

    const file = "src/entities/Box.svelte";

    function create_fragment(ctx) {
    	let a_box;

    	const block = {
    		c: function create() {
    			a_box = element("a-box");
    			set_custom_element_data(a_box, "position", "-1 0.5 -3");
    			set_custom_element_data(a_box, "rotation", "0 45 0");
    			set_custom_element_data(a_box, "color", /*color*/ ctx[0]);
    			add_location(a_box, file, 4, 0, 44);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a_box, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*color*/ 1) {
    				set_custom_element_data(a_box, "color", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a_box);
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
    	let { color } = $$props;
    	const writable_props = ["color"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Box> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Box", $$slots, []);

    	$$self.$set = $$props => {
    		if ("color" in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ color });

    	$$self.$inject_state = $$props => {
    		if ("color" in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Box extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Box",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*color*/ ctx[0] === undefined && !("color" in props)) {
    			console.warn("<Box> was created without expected prop 'color'");
    		}
    	}

    	get color() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/entities/Stage.svelte generated by Svelte v3.22.2 */

    const file$1 = "src/entities/Stage.svelte";

    function create_fragment$1(ctx) {
    	let a_entity2;
    	let a_entity0;
    	let a_camera;
    	let t0;
    	let a_entity1;
    	let t1;
    	let a_plane;
    	let a_plane_position_value;

    	const block = {
    		c: function create() {
    			a_entity2 = element("a-entity");
    			a_entity0 = element("a-entity");
    			a_camera = element("a-camera");
    			t0 = space();
    			a_entity1 = element("a-entity");
    			t1 = space();
    			a_plane = element("a-plane");
    			set_custom_element_data(a_camera, "wasd-controls", "acceleration: 1000");
    			add_location(a_camera, file$1, 14, 4, 275);
    			set_custom_element_data(a_entity0, "position", "0 10 10");
    			set_custom_element_data(a_entity0, "rotation", "-40 0 0");
    			add_location(a_entity0, file$1, 13, 2, 221);
    			set_custom_element_data(a_entity1, "environment", /*environment*/ ctx[0]);
    			add_location(a_entity1, file$1, 16, 2, 341);
    			set_custom_element_data(a_plane, "position", a_plane_position_value = "0 0 " + FloorSize / 4 * -1);
    			set_custom_element_data(a_plane, "rotation", "-90 0 0");
    			set_custom_element_data(a_plane, "width", FloorSize);
    			set_custom_element_data(a_plane, "height", FloorSize);
    			set_custom_element_data(a_plane, "opacity", "0");
    			set_custom_element_data(a_plane, "shadow", "");
    			set_custom_element_data(a_plane, "static-body", "");
    			add_location(a_plane, file$1, 17, 2, 371);
    			add_location(a_entity2, file$1, 12, 0, 207);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a_entity2, anchor);
    			append_dev(a_entity2, a_entity0);
    			append_dev(a_entity0, a_camera);
    			append_dev(a_entity2, t0);
    			append_dev(a_entity2, a_entity1);
    			append_dev(a_entity2, t1);
    			append_dev(a_entity2, a_plane);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a_entity2);
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

    const FloorSize = 100;

    function instance$1($$self, $$props, $$invalidate) {
    	const environment = {
    		preset: "forest",
    		dressingAmount: 1000,
    		skyType: "gradient",
    		skyColor: "#00F",
    		horizonColor: "#994"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Stage> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Stage", $$slots, []);
    	$$self.$capture_state = () => ({ FloorSize, environment });
    	return [environment];
    }

    class Stage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Stage",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    var Rotator = {
      name: "rotator",

      schema: {
        speed: { type: "number" },
      },

      init: function () {
        this.delta = 0;
      },

      tick: function (time, timeDelta) {
        const currentRotation = this.el.object3D.rotation;

        this.delta += (timeDelta / 10) * this.data.speed;

        this.el.setAttribute("rotation", `0 ${this.delta} 0`);
      },
    };

    var ConwayGrid = {
      name: "conway-grid",

      schema: {
        size: { type: "number" },
      },

      init: function () {
        this.size = this.size || 10;
        this.width = this.size;
        this.height = this.size;
        this.doCalculateGeneration = true;
        this.generationDelay = 500;
        this.present = [];
        this.future = [];

        this.seedLife();
      },

      seedLife: function () {
        this.present = new Array(this.width).fill(null);

        for (let i = 0; i < this.width; i++) {
          if (this.present[i] === null) {
            this.present[i] = new Array(this.height).fill(null);
            this.future[i] = new Array(this.height).fill(null);
          }
          for (let j = 0; j < this.height; j++) {
            this.present[i][j] = Math.round(Math.random());
          }
        }
        // console.table(this.present);
      },

      calculateGeneration: function () {
        this.doCalculateGeneration = false;
        setTimeout(() => {
          this.doCalculateGeneration = true;
        }, this.generationDelay);

        // ported from: geeksforgeeks.org/program-for-conways-game-of-life
        for (let l = 0; l < this.width; l++) {
          for (let m = 0; m < this.height; m++) {
            // finding no Of Neighbours
            // that are alive
            let aliveNeighbours = 0;
            for (let i = -1; i <= 1; i++) {
              for (let j = -1; j <= 1; j++) {
                let x = l + i;
                let y = m + j;

                if (x < 0) {
                  x = this.width + i;
                }

                if (y < 0) {
                  y = this.height + j;
                }

                if (x === this.width) {
                  x = 0;
                }

                if (y === this.height) {
                  y = 0;
                }

                aliveNeighbours += this.present[x][y];
              }
            }

            // The cell needs to be subtracted
            // from its neighbours as it was
            // counted before
            aliveNeighbours -= this.present[l][m];

            // Implementing the Rules of Life

            // Cell is lonely and dies
            if (this.present[l][m] == 1 && aliveNeighbours < 2) {
              this.future[l][m] = 0;
            }

            // Cell dies due to over population
            else if (this.present[l][m] == 1 && aliveNeighbours > 3) {
              this.future[l][m] = 0;
            }

            // A new cell is born
            else if (this.present[l][m] == 0 && aliveNeighbours == 3) {
              this.future[l][m] = 1;
            }

            // Remains the same
            else {
              this.future[l][m] = this.present[l][m];
            }
          }
        }
      },

      tick: function (time, timeDelta) {
        if (this.doCalculateGeneration) {
          this.calculateGeneration();
          this.present = JSON.parse(JSON.stringify(this.future));
          console.clear();
          console.table(this.present);
        }
      },
    };

    /* src/entities/GameOfLife.svelte generated by Svelte v3.22.2 */
    const file$2 = "src/entities/GameOfLife.svelte";

    function create_fragment$2(ctx) {
    	let a_entity1;
    	let a_entity0;
    	let t;
    	let a_box;

    	const block = {
    		c: function create() {
    			a_entity1 = element("a-entity");
    			a_entity0 = element("a-entity");
    			t = space();
    			a_box = element("a-box");
    			set_custom_element_data(a_entity0, "conway-grid", "");
    			add_location(a_entity0, file$2, 14, 2, 325);
    			set_custom_element_data(a_box, "position", "0 0.5 0");
    			set_custom_element_data(a_box, "rotator", "speed: 0.4");
    			set_custom_element_data(a_box, "color", "#FFF");
    			set_custom_element_data(a_box, "shadow", "");
    			add_location(a_box, file$2, 15, 2, 353);
    			add_location(a_entity1, file$2, 13, 0, 311);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a_entity1, anchor);
    			append_dev(a_entity1, a_entity0);
    			append_dev(a_entity1, t);
    			append_dev(a_entity1, a_box);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a_entity1);
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
    	AFRAME.registerComponent(Rotator.name, Rotator);
    	AFRAME.registerComponent(ConwayGrid.name, ConwayGrid);
    	const cellColors = { alive: "green", death: "black" };
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<GameOfLife> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("GameOfLife", $$slots, []);
    	$$self.$capture_state = () => ({ Rotator, ConwayGrid, cellColors });
    	return [];
    }

    class GameOfLife extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GameOfLife",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/scenes/Main.svelte generated by Svelte v3.22.2 */
    const file$3 = "src/scenes/Main.svelte";

    function create_fragment$3(ctx) {
    	let a_scene;
    	let t;
    	let current;
    	const stage = new Stage({ $$inline: true });
    	const gameoflife = new GameOfLife({ $$inline: true });

    	const block = {
    		c: function create() {
    			a_scene = element("a-scene");
    			create_component(stage.$$.fragment);
    			t = space();
    			create_component(gameoflife.$$.fragment);
    			set_custom_element_data(a_scene, "physics", "debug:true; friction: 0.1; restitution: 0.5");
    			add_location(a_scene, file$3, 6, 0, 167);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a_scene, anchor);
    			mount_component(stage, a_scene, null);
    			append_dev(a_scene, t);
    			mount_component(gameoflife, a_scene, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(stage.$$.fragment, local);
    			transition_in(gameoflife.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(stage.$$.fragment, local);
    			transition_out(gameoflife.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a_scene);
    			destroy_component(stage);
    			destroy_component(gameoflife);
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
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Main> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Main", $$slots, []);
    	$$self.$capture_state = () => ({ Box, Stage, GameOfLife });
    	return [];
    }

    class Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.22.2 */
    const file$4 = "src/App.svelte";

    // (26:2) {#if reloading}
    function create_if_block_1(ctx) {
    	let script;
    	let script_src_value;
    	let dispose;

    	const block = {
    		c: function create() {
    			script = element("script");
    			if (script.src !== (script_src_value = /*Dependencies*/ ctx[3][/*currentDependency*/ ctx[2]])) attr_dev(script, "src", script_src_value);
    			add_location(script, file$4, 26, 4, 792);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, script, anchor);
    			if (remount) dispose();
    			dispose = listen_dev(script, "load", /*onDependencyLoad*/ ctx[4], false, false, false);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentDependency*/ 4 && script.src !== (script_src_value = /*Dependencies*/ ctx[3][/*currentDependency*/ ctx[2]])) {
    				attr_dev(script, "src", script_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(script);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(26:2) {#if reloading}",
    		ctx
    	});

    	return block;
    }

    // (34:2) {#if dependenciesLoaded}
    function create_if_block(ctx) {
    	let current;
    	const mainscene = new Main({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(mainscene.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(mainscene, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mainscene.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mainscene.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mainscene, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(34:2) {#if dependenciesLoaded}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let if_block0_anchor;
    	let t;
    	let main;
    	let current;
    	let if_block0 = /*reloading*/ ctx[1] && create_if_block_1(ctx);
    	let if_block1 = /*dependenciesLoaded*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			if_block0_anchor = empty();
    			t = space();
    			main = element("main");
    			if (if_block1) if_block1.c();
    			add_location(main, file$4, 32, 0, 905);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(document.head, null);
    			append_dev(document.head, if_block0_anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, main, anchor);
    			if (if_block1) if_block1.m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*reloading*/ ctx[1]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*dependenciesLoaded*/ ctx[0]) {
    				if (if_block1) {
    					if (dirty & /*dependenciesLoaded*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(main, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			detach_dev(if_block0_anchor);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(main);
    			if (if_block1) if_block1.d();
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
    	const Dependencies = [
    		"//aframe.io/releases/1.0.4/aframe.js",
    		"//cdn.rawgit.com/donmccurdy/aframe-physics-system/v4.0.1/dist/aframe-physics-system.min.js",
    		"//unpkg.com/aframe-environment-component@1.1.0/dist/aframe-environment-component.min.js"
    	];

    	// ordered dependency loader
    	let dependenciesLoaded = false;

    	let reloading = true;
    	let currentDependency = 0;

    	const onDependencyLoad = () => {
    		$$invalidate(1, reloading = false);
    		$$invalidate(2, currentDependency++, currentDependency);

    		if (currentDependency === Dependencies.length) {
    			$$invalidate(0, dependenciesLoaded = true);
    		}

    		setTimeout(() => $$invalidate(1, reloading = true), 0); // force re-render to load new js
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$capture_state = () => ({
    		Text,
    		MainScene: Main,
    		Dependencies,
    		dependenciesLoaded,
    		reloading,
    		currentDependency,
    		onDependencyLoad
    	});

    	$$self.$inject_state = $$props => {
    		if ("dependenciesLoaded" in $$props) $$invalidate(0, dependenciesLoaded = $$props.dependenciesLoaded);
    		if ("reloading" in $$props) $$invalidate(1, reloading = $$props.reloading);
    		if ("currentDependency" in $$props) $$invalidate(2, currentDependency = $$props.currentDependency);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		dependenciesLoaded,
    		reloading,
    		currentDependency,
    		Dependencies,
    		onDependencyLoad
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}(Text));
//# sourceMappingURL=bundle.js.map
