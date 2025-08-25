'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Nest Server Template</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/BasicAuthModule.html" data-type="entity-link" >BasicAuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BasicAuthModule-650227b76192edf510d74c80a44fc7f8126b701791359fde85e34c74bfe525905ed6e9f5f2f124347db8735a50d75ba85bc0dfd4ba4c080aaaa765d9d76bfbd2"' : 'data-bs-target="#xs-controllers-links-module-BasicAuthModule-650227b76192edf510d74c80a44fc7f8126b701791359fde85e34c74bfe525905ed6e9f5f2f124347db8735a50d75ba85bc0dfd4ba4c080aaaa765d9d76bfbd2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BasicAuthModule-650227b76192edf510d74c80a44fc7f8126b701791359fde85e34c74bfe525905ed6e9f5f2f124347db8735a50d75ba85bc0dfd4ba4c080aaaa765d9d76bfbd2"' :
                                            'id="xs-controllers-links-module-BasicAuthModule-650227b76192edf510d74c80a44fc7f8126b701791359fde85e34c74bfe525905ed6e9f5f2f124347db8735a50d75ba85bc0dfd4ba4c080aaaa765d9d76bfbd2"' }>
                                            <li class="link">
                                                <a href="controllers/BasicAuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BasicAuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BasicAuthModule-650227b76192edf510d74c80a44fc7f8126b701791359fde85e34c74bfe525905ed6e9f5f2f124347db8735a50d75ba85bc0dfd4ba4c080aaaa765d9d76bfbd2"' : 'data-bs-target="#xs-injectables-links-module-BasicAuthModule-650227b76192edf510d74c80a44fc7f8126b701791359fde85e34c74bfe525905ed6e9f5f2f124347db8735a50d75ba85bc0dfd4ba4c080aaaa765d9d76bfbd2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BasicAuthModule-650227b76192edf510d74c80a44fc7f8126b701791359fde85e34c74bfe525905ed6e9f5f2f124347db8735a50d75ba85bc0dfd4ba4c080aaaa765d9d76bfbd2"' :
                                        'id="xs-injectables-links-module-BasicAuthModule-650227b76192edf510d74c80a44fc7f8126b701791359fde85e34c74bfe525905ed6e9f5f2f124347db8735a50d75ba85bc0dfd4ba4c080aaaa765d9d76bfbd2"' }>
                                        <li class="link">
                                            <a href="injectables/BasicAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BasicAuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BasicAuthStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BasicAuthStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BootstrapModule.html" data-type="entity-link" >BootstrapModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-ce1d56724a8a6e924a39aa63b1318b8b12eefad6de0abce5e16a79b09639da21f3edbc0a204baa96459a004f62c17326ff0e52833616feeb0032e3a527a427c0"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-ce1d56724a8a6e924a39aa63b1318b8b12eefad6de0abce5e16a79b09639da21f3edbc0a204baa96459a004f62c17326ff0e52833616feeb0032e3a527a427c0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-ce1d56724a8a6e924a39aa63b1318b8b12eefad6de0abce5e16a79b09639da21f3edbc0a204baa96459a004f62c17326ff0e52833616feeb0032e3a527a427c0"' :
                                            'id="xs-controllers-links-module-HealthModule-ce1d56724a8a6e924a39aa63b1318b8b12eefad6de0abce5e16a79b09639da21f3edbc0a204baa96459a004f62c17326ff0e52833616feeb0032e3a527a427c0"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HealthModule-ce1d56724a8a6e924a39aa63b1318b8b12eefad6de0abce5e16a79b09639da21f3edbc0a204baa96459a004f62c17326ff0e52833616feeb0032e3a527a427c0"' : 'data-bs-target="#xs-injectables-links-module-HealthModule-ce1d56724a8a6e924a39aa63b1318b8b12eefad6de0abce5e16a79b09639da21f3edbc0a204baa96459a004f62c17326ff0e52833616feeb0032e3a527a427c0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HealthModule-ce1d56724a8a6e924a39aa63b1318b8b12eefad6de0abce5e16a79b09639da21f3edbc0a204baa96459a004f62c17326ff0e52833616feeb0032e3a527a427c0"' :
                                        'id="xs-injectables-links-module-HealthModule-ce1d56724a8a6e924a39aa63b1318b8b12eefad6de0abce5e16a79b09639da21f3edbc0a204baa96459a004f62c17326ff0e52833616feeb0032e3a527a427c0"' }>
                                        <li class="link">
                                            <a href="injectables/HealthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfraModule.html" data-type="entity-link" >InfraModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PluginModule.html" data-type="entity-link" >PluginModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RouteModule.html" data-type="entity-link" >RouteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RouteModule-d1ccf368efc91e6fff57069ffdf316df91b04ca60eaf4e964467086dd09cc171c43e0782417a45ab56164b98d29adccaa99b76f3ad06438650a27d400b40aba2"' : 'data-bs-target="#xs-controllers-links-module-RouteModule-d1ccf368efc91e6fff57069ffdf316df91b04ca60eaf4e964467086dd09cc171c43e0782417a45ab56164b98d29adccaa99b76f3ad06438650a27d400b40aba2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RouteModule-d1ccf368efc91e6fff57069ffdf316df91b04ca60eaf4e964467086dd09cc171c43e0782417a45ab56164b98d29adccaa99b76f3ad06438650a27d400b40aba2"' :
                                            'id="xs-controllers-links-module-RouteModule-d1ccf368efc91e6fff57069ffdf316df91b04ca60eaf4e964467086dd09cc171c43e0782417a45ab56164b98d29adccaa99b76f3ad06438650a27d400b40aba2"' }>
                                            <li class="link">
                                                <a href="controllers/RouteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RouteController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SuperCacheModule.html" data-type="entity-link" >SuperCacheModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SuperConfigModule.html" data-type="entity-link" >SuperConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SuperConfigModule-f3374763cbda8d17dd481e92e8af3dff47f02e43f6566f9c716e7374a56441175fbfbd8ebba59f32482d92c14cbf919c7c996c6826e8c24086a72a06d7b6d2ca"' : 'data-bs-target="#xs-injectables-links-module-SuperConfigModule-f3374763cbda8d17dd481e92e8af3dff47f02e43f6566f9c716e7374a56441175fbfbd8ebba59f32482d92c14cbf919c7c996c6826e8c24086a72a06d7b6d2ca"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SuperConfigModule-f3374763cbda8d17dd481e92e8af3dff47f02e43f6566f9c716e7374a56441175fbfbd8ebba59f32482d92c14cbf919c7c996c6826e8c24086a72a06d7b6d2ca"' :
                                        'id="xs-injectables-links-module-SuperConfigModule-f3374763cbda8d17dd481e92e8af3dff47f02e43f6566f9c716e7374a56441175fbfbd8ebba59f32482d92c14cbf919c7c996c6826e8c24086a72a06d7b6d2ca"' }>
                                        <li class="link">
                                            <a href="injectables/SuperConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuperConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SuperObserveModule.html" data-type="entity-link" >SuperObserveModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SuperServerModule.html" data-type="entity-link" >SuperServerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SuperServerModule-8cc64cf19e982d7aac637a0025787755f541e67c9e1e46835b65e386c27f952488efa7190ba6427832799d5943e3ca221ccf4cb83559eb1dd1f5eb005ee9bc9f"' : 'data-bs-target="#xs-controllers-links-module-SuperServerModule-8cc64cf19e982d7aac637a0025787755f541e67c9e1e46835b65e386c27f952488efa7190ba6427832799d5943e3ca221ccf4cb83559eb1dd1f5eb005ee9bc9f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SuperServerModule-8cc64cf19e982d7aac637a0025787755f541e67c9e1e46835b65e386c27f952488efa7190ba6427832799d5943e3ca221ccf4cb83559eb1dd1f5eb005ee9bc9f"' :
                                            'id="xs-controllers-links-module-SuperServerModule-8cc64cf19e982d7aac637a0025787755f541e67c9e1e46835b65e386c27f952488efa7190ba6427832799d5943e3ca221ccf4cb83559eb1dd1f5eb005ee9bc9f"' }>
                                            <li class="link">
                                                <a href="controllers/SuperServerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuperServerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SuperServerModule-8cc64cf19e982d7aac637a0025787755f541e67c9e1e46835b65e386c27f952488efa7190ba6427832799d5943e3ca221ccf4cb83559eb1dd1f5eb005ee9bc9f"' : 'data-bs-target="#xs-injectables-links-module-SuperServerModule-8cc64cf19e982d7aac637a0025787755f541e67c9e1e46835b65e386c27f952488efa7190ba6427832799d5943e3ca221ccf4cb83559eb1dd1f5eb005ee9bc9f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SuperServerModule-8cc64cf19e982d7aac637a0025787755f541e67c9e1e46835b65e386c27f952488efa7190ba6427832799d5943e3ca221ccf4cb83559eb1dd1f5eb005ee9bc9f"' :
                                        'id="xs-injectables-links-module-SuperServerModule-8cc64cf19e982d7aac637a0025787755f541e67c9e1e46835b65e386c27f952488efa7190ba6427832799d5943e3ca221ccf4cb83559eb1dd1f5eb005ee9bc9f"' }>
                                        <li class="link">
                                            <a href="injectables/SuperServerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuperServerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UmzugModule.html" data-type="entity-link" >UmzugModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UmzugModule-9b9b3b98c5bcf1e0541e31fd344845a3cca759301869ccb0eb0a7129316668a5effe2e84c6a3431b3af5c229b4fb6882a67ca8e5c726e531735e5cd4bdeefb31"' : 'data-bs-target="#xs-injectables-links-module-UmzugModule-9b9b3b98c5bcf1e0541e31fd344845a3cca759301869ccb0eb0a7129316668a5effe2e84c6a3431b3af5c229b4fb6882a67ca8e5c726e531735e5cd4bdeefb31"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UmzugModule-9b9b3b98c5bcf1e0541e31fd344845a3cca759301869ccb0eb0a7129316668a5effe2e84c6a3431b3af5c229b4fb6882a67ca8e5c726e531735e5cd4bdeefb31"' :
                                        'id="xs-injectables-links-module-UmzugModule-9b9b3b98c5bcf1e0541e31fd344845a3cca759301869ccb0eb0a7129316668a5effe2e84c6a3431b3af5c229b4fb6882a67ca8e5c726e531735e5cd4bdeefb31"' }>
                                        <li class="link">
                                            <a href="injectables/UmzugService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UmzugService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-3828d497a8454714608aa6e3434fe1ed0504f97602e1320a56414f6d8629a12a1f71cc44702762b7472f8a233ab41f8f6ecc1e2b6da47778018b02499e286d17"' : 'data-bs-target="#xs-controllers-links-module-UserModule-3828d497a8454714608aa6e3434fe1ed0504f97602e1320a56414f6d8629a12a1f71cc44702762b7472f8a233ab41f8f6ecc1e2b6da47778018b02499e286d17"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-3828d497a8454714608aa6e3434fe1ed0504f97602e1320a56414f6d8629a12a1f71cc44702762b7472f8a233ab41f8f6ecc1e2b6da47778018b02499e286d17"' :
                                            'id="xs-controllers-links-module-UserModule-3828d497a8454714608aa6e3434fe1ed0504f97602e1320a56414f6d8629a12a1f71cc44702762b7472f8a233ab41f8f6ecc1e2b6da47778018b02499e286d17"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-3828d497a8454714608aa6e3434fe1ed0504f97602e1320a56414f6d8629a12a1f71cc44702762b7472f8a233ab41f8f6ecc1e2b6da47778018b02499e286d17"' : 'data-bs-target="#xs-injectables-links-module-UserModule-3828d497a8454714608aa6e3434fe1ed0504f97602e1320a56414f6d8629a12a1f71cc44702762b7472f8a233ab41f8f6ecc1e2b6da47778018b02499e286d17"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-3828d497a8454714608aa6e3434fe1ed0504f97602e1320a56414f6d8629a12a1f71cc44702762b7472f8a233ab41f8f6ecc1e2b6da47778018b02499e286d17"' :
                                        'id="xs-injectables-links-module-UserModule-3828d497a8454714608aa6e3434fe1ed0504f97602e1320a56414f6d8629a12a1f71cc44702762b7472f8a233ab41f8f6ecc1e2b6da47778018b02499e286d17"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseDriver.html" data-type="entity-link" >DatabaseDriver</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileDriver.html" data-type="entity-link" >FileDriver</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemoryDriver.html" data-type="entity-link" >MemoryDriver</a>
                            </li>
                            <li class="link">
                                <a href="classes/RedisDriver.html" data-type="entity-link" >RedisDriver</a>
                            </li>
                            <li class="link">
                                <a href="classes/SuperCache.html" data-type="entity-link" >SuperCache</a>
                            </li>
                            <li class="link">
                                <a href="classes/SuperObserve.html" data-type="entity-link" >SuperObserve</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BasicAuthGuard.html" data-type="entity-link" >BasicAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseFormatInterceptor.html" data-type="entity-link" >ResponseFormatInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SuperCacheService.html" data-type="entity-link" >SuperCacheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SuperObserveInterceptor.html" data-type="entity-link" >SuperObserveInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/DevelopmentGuard.html" data-type="entity-link" >DevelopmentGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BootstrapFunctionArgs.html" data-type="entity-link" >BootstrapFunctionArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CacheDriver.html" data-type="entity-link" >CacheDriver</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatabaseOptions.html" data-type="entity-link" >DatabaseOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtraSetOptions.html" data-type="entity-link" >ExtraSetOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileOptions.html" data-type="entity-link" >FileOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderSettingsOptions.html" data-type="entity-link" >HeaderSettingsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MemoryOptions.html" data-type="entity-link" >MemoryOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RedisOptions.html" data-type="entity-link" >RedisOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseFormatResponse.html" data-type="entity-link" >ResponseFormatResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SuperConfigOptions.html" data-type="entity-link" >SuperConfigOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});