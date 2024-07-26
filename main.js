/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");


class SolarSystem {
    scene;
    camera;
    renderer;
    stars;
    sun;
    planets;
    controls;
    constructor() {
        //シーンを作成
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight); //レンダラーのサイズをウィンドウサイズに設定
        document.body.appendChild(this.renderer.domElement); //レンダラーのDOM要素をHTMLに追加
        //カメラの設定
        this.camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000); // カメラを作成
        this.controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(this.camera, this.renderer.domElement); // カメラコントロールを作成
        this.camera.position.z = 1000; //カメラの位置を設定
        this.stars = this.createStars(); //星を作成
        this.sun = this.createSun(); //太陽を作成
        this.planets = this.createSolarSystem(); //太陽系の惑星を作成
        window.addEventListener('resize', this.onWindowResize); //ウィンドウサイズ変更時のイベントリスナーを追加
        this.animate(); //アニメーションを開始
    }
    //ウィンドウサイズ変更時の処理
    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight; // カメラのアスペクト比を更新
        this.camera.updateProjectionMatrix(); //カメラのプロジェクションマトリックスを更新
        this.renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーのサイズを更新
    };
    //星を作成する関数
    createStars() {
        const starGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        const starMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
            color: 0xffffff,
            size: 0.5,
            transparent: true //透明
        });
        const starVertices = []; //星の配列
        for (let i = 0; i < 10000; i++) { //10000個
            //-2000から2000でランダムに生成
            const x = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.randFloatSpread(4000);
            const y = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.randFloatSpread(4000);
            const z = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.randFloatSpread(4000);
            starVertices.push(x, y, z); //頂点を配列に追加
        }
        starGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_1__.Float32BufferAttribute(starVertices, 3)); // 頂点をジオメトリに設定
        const stars = new three__WEBPACK_IMPORTED_MODULE_1__.Points(starGeometry, starMaterial); //星のポイントを作成
        //シーンに追加
        this.scene.add(stars);
        return stars;
    }
    //太陽を作成する関数
    createSun() {
        const sunGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(50, 32, 32); //太陽のジオメトリ
        const sunMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0xffff00 }); //太陽のマテリアル
        const sun = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(sunGeometry, sunMaterial); // 太陽のメッシュを作成
        // シーンに太陽を追加
        this.scene.add(sun);
        return sun;
    }
    //惑星を作成する関数
    createPlanet(radius, distance, color) {
        const planetGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(radius, 32, 32); //惑星のジオメトリ
        const planetMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: color }); //惑星のマテリアル
        const planet = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(planetGeometry, planetMaterial); //惑星のメッシュを作成
        const planetOrbit = new three__WEBPACK_IMPORTED_MODULE_1__.Object3D(); //惑星の軌道オブジェクトを作成
        planet.position.set(distance, 0, 0); //惑星の位置
        planetOrbit.add(planet); //軌道オブジェクトに惑星を追加
        //シーンに軌道オブジェクトを追加
        this.scene.add(planetOrbit);
        return { planet, planetOrbit };
    }
    //いくつかの惑星を太陽の周りに配置する関数
    createSolarSystem() {
        const planets = []; //惑星の配列
        const planetData = [
            { radius: 10, distance: 200, color: 0xaaaaaa, speed: 0.01 },
            { radius: 15, distance: 300, color: 0xff0000, speed: 0.007 },
            { radius: 20, distance: 400, color: 0x0000ff, speed: 0.005 },
            { radius: 18, distance: 500, color: 0xffa500, speed: 0.003 } //火星
        ];
        planetData.forEach(data => {
            const { planet, planetOrbit } = this.createPlanet(data.radius, data.distance, data.color); //惑星を作成
            planets.push({ planet, planetOrbit, speed: data.speed }); //惑星を配列に追加
        });
        return planets;
    }
    //アニメーション関数
    animate = () => {
        requestAnimationFrame(this.animate);
        // 星の輝きをランダムに
        this.stars.material.opacity = 0.5 + Math.random() * 0.5;
        // 惑星の自転と公転
        this.planets.forEach(({ planet, planetOrbit, speed }) => {
            planet.rotation.y += 0.01; //惑星の自転
            planetOrbit.rotation.y += speed; //惑星の公転
        });
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    };
}
window.addEventListener("DOMContentLoaded", () => {
    //SolarSystemクラスのインスタンスを作成
    new SolarSystem();
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MEJBQTBCO0lBQzFCLElBQUksV0FBVyxFQUFFLENBQUM7QUFDdEIsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7VUMxSUg7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnO1xyXG5cclxuY2xhc3MgU29sYXJTeXN0ZW0ge1xyXG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XHJcbiAgICBwcml2YXRlIGNhbWVyYTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xyXG4gICAgcHJpdmF0ZSBzdGFyczogVEhSRUUuUG9pbnRzO1xyXG4gICAgcHJpdmF0ZSBzdW46IFRIUkVFLk1lc2g7XHJcbiAgICBwcml2YXRlIHBsYW5ldHM6IHsgcGxhbmV0OiBUSFJFRS5NZXNoOyBwbGFuZXRPcmJpdDogVEhSRUUuT2JqZWN0M0Q7IHNwZWVkOiBudW1iZXIgfVtdO1xyXG4gICAgcHJpdmF0ZSBjb250cm9sczogT3JiaXRDb250cm9scztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+OCt+ODvOODs+OCkuS9nOaIkFxyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTsgXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7ICBcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7Ly/jg6zjg7Pjg4Djg6njg7zjga7jgrXjgqTjgrrjgpLjgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrrjgavoqK3lrppcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7Ly/jg6zjg7Pjg4Djg6njg7zjga5ET03opoHntKDjgpJIVE1M44Gr6L+95YqgXHJcblxyXG4gICAgICAgIC8v44Kr44Oh44Op44Gu6Kit5a6aXHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDUwMDApOyAgLy8g44Kr44Oh44Op44KS5L2c5oiQXHJcbiAgICAgICAgdGhpcy5jb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpOyAgLy8g44Kr44Oh44Op44Kz44Oz44OI44Ot44O844Or44KS5L2c5oiQXHJcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDEwMDA7Ly/jgqvjg6Hjg6njga7kvY3nva7jgpLoqK3lrppcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnN0YXJzID0gdGhpcy5jcmVhdGVTdGFycygpOyAvL+aYn+OCkuS9nOaIkFxyXG4gICAgICAgIHRoaXMuc3VuID0gdGhpcy5jcmVhdGVTdW4oKTsgIC8v5aSq6Zm944KS5L2c5oiQXHJcbiAgICAgICAgdGhpcy5wbGFuZXRzID0gdGhpcy5jcmVhdGVTb2xhclN5c3RlbSgpOy8v5aSq6Zm957O744Gu5oOR5pif44KS5L2c5oiQXHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplKTsvL+OCpuOCo+ODs+ODieOCpuOCteOCpOOCuuWkieabtOaZguOBruOCpOODmeODs+ODiOODquOCueODiuODvOOCkui/veWKoFxyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGUoKTsvL+OCouODi+ODoeODvOOCt+ODp+ODs+OCkumWi+Wni1xyXG4gICAgfVxyXG5cclxuICAgIC8v44Km44Kj44Oz44OJ44Km44K144Kk44K65aSJ5pu05pmC44Gu5Yem55CGXHJcbiAgICBwcml2YXRlIG9uV2luZG93UmVzaXplID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9d2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7ICAvLyDjgqvjg6Hjg6njga7jgqLjgrnjg5rjgq/jg4jmr5TjgpLmm7TmlrBcclxuICAgICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7ICAvL+OCq+ODoeODqeOBruODl+ODreOCuOOCp+OCr+OCt+ODp+ODs+ODnuODiOODquODg+OCr+OCueOCkuabtOaWsFxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTsgIC8vIOODrOODs+ODgOODqeODvOOBruOCteOCpOOCuuOCkuabtOaWsFxyXG4gICAgfVxyXG5cclxuICAgIC8v5pif44KS5L2c5oiQ44GZ44KL6Zai5pWwXHJcbiAgICBwcml2YXRlIGNyZWF0ZVN0YXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHN0YXJHZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xyXG4gICAgICAgIGNvbnN0IHN0YXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XHJcbiAgICAgICAgICAgIGNvbG9yOiAweGZmZmZmZiwgIC8v55m9XHJcbiAgICAgICAgICAgIHNpemU6IDAuNSwgIC8v5aSn44GN44GVMC41XHJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OnRydWUgIC8v6YCP5piOXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXJWZXJ0aWNlcyA9IFtdOyAgIC8v5pif44Gu6YWN5YiXXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwMDsgaSsrKSB7ICAgICAvLzEwMDAw5YCLXHJcbiAgICAgICAgICAgIC8vLTIwMDDjgYvjgokyMDAw44Gn44Op44Oz44OA44Og44Gr55Sf5oiQXHJcbiAgICAgICAgICAgIGNvbnN0IHggPSBUSFJFRS5NYXRoVXRpbHMucmFuZEZsb2F0U3ByZWFkKDQwMDApO1xyXG4gICAgICAgICAgICBjb25zdCB5ID0gVEhSRUUuTWF0aFV0aWxzLnJhbmRGbG9hdFNwcmVhZCg0MDAwKTtcclxuICAgICAgICAgICAgY29uc3QgeiA9IFRIUkVFLk1hdGhVdGlscy5yYW5kRmxvYXRTcHJlYWQoNDAwMCk7XHJcbiAgICAgICAgICAgIHN0YXJWZXJ0aWNlcy5wdXNoKHgsIHksIHopOyAgIC8v6aCC54K544KS6YWN5YiX44Gr6L+95YqgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXJHZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoc3RhclZlcnRpY2VzLCAzKSk7ICAvLyDpoILngrnjgpLjgrjjgqrjg6Hjg4jjg6rjgavoqK3lrppcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBzdGFycyA9IG5ldyBUSFJFRS5Qb2ludHMoc3Rhckdlb21ldHJ5LCBzdGFyTWF0ZXJpYWwpOyAgLy/mmJ/jga7jg53jgqTjg7Pjg4jjgpLkvZzmiJBcclxuICAgICAgICBcclxuICAgICAgICAvL+OCt+ODvOODs+OBq+i/veWKoFxyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHN0YXJzKTsgICBcclxuICAgICAgICByZXR1cm4gc3RhcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lpKrpmb3jgpLkvZzmiJDjgZnjgovplqLmlbBcclxuICAgIHByaXZhdGUgY3JlYXRlU3VuKCkge1xyXG4gICAgICAgIGNvbnN0IHN1bkdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDUwLCAzMiwgMzIpOyAvL+WkqumZveOBruOCuOOCquODoeODiOODqlxyXG4gICAgICAgIGNvbnN0IHN1bk1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZjAwIH0pOyAgLy/lpKrpmb3jga7jg57jg4bjg6rjgqLjg6tcclxuICAgICAgICBjb25zdCBzdW4gPSBuZXcgVEhSRUUuTWVzaChzdW5HZW9tZXRyeSwgc3VuTWF0ZXJpYWwpOyAvLyDlpKrpmb3jga7jg6Hjg4Pjgrfjg6XjgpLkvZzmiJBcclxuICAgICAgICAvLyDjgrfjg7zjg7PjgavlpKrpmb3jgpLov73liqBcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZChzdW4pO1xyXG4gICAgICAgIHJldHVybiBzdW47XHJcbiAgICB9XHJcblxyXG4gICAgLy/mg5HmmJ/jgpLkvZzmiJDjgZnjgovplqLmlbBcclxuICAgIHByaXZhdGUgY3JlYXRlUGxhbmV0KHJhZGl1czogbnVtYmVyLCBkaXN0YW5jZTogbnVtYmVyLCBjb2xvcjogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcGxhbmV0R2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkocmFkaXVzLCAzMiwgMzIpOyAvL+aDkeaYn+OBruOCuOOCquODoeODiOODqlxyXG4gICAgICAgIGNvbnN0IHBsYW5ldE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IGNvbG9yIH0pOyAgLy/mg5HmmJ/jga7jg57jg4bjg6rjgqLjg6tcclxuICAgICAgICBjb25zdCBwbGFuZXQgPSBuZXcgVEhSRUUuTWVzaChwbGFuZXRHZW9tZXRyeSwgcGxhbmV0TWF0ZXJpYWwpOyAgLy/mg5HmmJ/jga7jg6Hjg4Pjgrfjg6XjgpLkvZzmiJBcclxuXHJcbiAgICAgICAgY29uc3QgcGxhbmV0T3JiaXQgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTsgIC8v5oOR5pif44Gu6LuM6YGT44Kq44OW44K444Kn44Kv44OI44KS5L2c5oiQXHJcbiAgICAgICAgcGxhbmV0LnBvc2l0aW9uLnNldChkaXN0YW5jZSwgMCwgMCk7ICAvL+aDkeaYn+OBruS9jee9rlxyXG4gICAgICAgIHBsYW5ldE9yYml0LmFkZChwbGFuZXQpOyAgLy/ou4zpgZPjgqrjg5bjgrjjgqfjgq/jg4jjgavmg5HmmJ/jgpLov73liqBcclxuICAgICAgICAvL+OCt+ODvOODs+OBq+i7jOmBk+OCquODluOCuOOCp+OCr+ODiOOCkui/veWKoFxyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHBsYW5ldE9yYml0KTsgICBcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB7IHBsYW5ldCwgcGxhbmV0T3JiaXQgfTtcclxuICAgIH1cclxuXHJcbiAgICAvL+OBhOOBj+OBpOOBi+OBruaDkeaYn+OCkuWkqumZveOBruWRqOOCiuOBq+mFjee9ruOBmeOCi+mWouaVsFxyXG4gICAgcHJpdmF0ZSBjcmVhdGVTb2xhclN5c3RlbSgpIHtcclxuICAgICAgICBjb25zdCBwbGFuZXRzID0gW107ICAvL+aDkeaYn+OBrumFjeWIl1xyXG4gICAgICAgIGNvbnN0IHBsYW5ldERhdGEgPSBbXHJcblxyXG4gICAgICAgICAgICB7cmFkaXVzOiAxMCwgZGlzdGFuY2U6IDIwMCwgY29sb3I6IDB4YWFhYWFhLCBzcGVlZDogMC4wMSB9LCAvL+awtOaYn1xyXG4gICAgICAgICAgICB7cmFkaXVzOiAxNSwgZGlzdGFuY2U6IDMwMCwgY29sb3I6IDB4ZmYwMDAwLCBzcGVlZDogMC4wMDcgfSwgLy/ph5HmmJ9cclxuICAgICAgICAgICAge3JhZGl1czogMjAsIGRpc3RhbmNlOiA0MDAsIGNvbG9yOiAweDAwMDBmZiwgc3BlZWQ6IDAuMDA1IH0sIC8v5Zyw55CDXHJcbiAgICAgICAgICAgIHtyYWRpdXM6IDE4LCBkaXN0YW5jZTogNTAwLCBjb2xvcjogMHhmZmE1MDAsIHNwZWVkOiAwLjAwMyB9ICAvL+eBq+aYn1xyXG4gICAgICAgIF07XHJcblxyXG5cclxuICAgICAgICBwbGFuZXREYXRhLmZvckVhY2goZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgcGxhbmV0LCBwbGFuZXRPcmJpdCB9ID0gdGhpcy5jcmVhdGVQbGFuZXQoZGF0YS5yYWRpdXMsIGRhdGEuZGlzdGFuY2UsIGRhdGEuY29sb3IpOyAgLy/mg5HmmJ/jgpLkvZzmiJBcclxuICAgICAgICAgICAgcGxhbmV0cy5wdXNoKHsgcGxhbmV0LCBwbGFuZXRPcmJpdCwgc3BlZWQ6IGRhdGEuc3BlZWQgfSk7ICAvL+aDkeaYn+OCkumFjeWIl+OBq+i/veWKoFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcGxhbmV0cztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/jgqLjg4vjg6Hjg7zjgrfjg6fjg7PplqLmlbBcclxuICAgIHByaXZhdGUgYW5pbWF0ZSA9ICgpID0+IHtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlKTtcclxuXHJcbiAgICAgICAgLy8g5pif44Gu6Lyd44GN44KS44Op44Oz44OA44Og44GrXHJcbiAgICAgICAgKHRoaXMuc3RhcnMubWF0ZXJpYWwgYXMgVEhSRUUuUG9pbnRzTWF0ZXJpYWwpLm9wYWNpdHkgPSAwLjUgKyBNYXRoLnJhbmRvbSgpICogMC41O1xyXG5cclxuXHJcbiAgICAgICAgLy8g5oOR5pif44Gu6Ieq6Lui44Go5YWs6LuiXHJcbiAgICAgICAgdGhpcy5wbGFuZXRzLmZvckVhY2goKHsgcGxhbmV0LCBwbGFuZXRPcmJpdCwgc3BlZWQgfSkgPT4ge1xyXG4gICAgICAgICAgICBwbGFuZXQucm90YXRpb24ueSArPSAwLjAxOyAvL+aDkeaYn+OBruiHqui7olxyXG4gICAgICAgICAgICBwbGFuZXRPcmJpdC5yb3RhdGlvbi55ICs9IHNwZWVkOyAgIC8v5oOR5pif44Gu5YWs6LuiXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcblxyXG4gICAgLy9Tb2xhclN5c3RlbeOCr+ODqeOCueOBruOCpOODs+OCueOCv+ODs+OCueOCkuS9nOaIkFxyXG4gICAgbmV3IFNvbGFyU3lzdGVtKCk7XHJcbn0pOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=