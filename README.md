# app

## day1
    一、vue-cli脚手架初始化项目
        1.node + webpack + 淘宝镜像
        2.node_modules文件夹：项目依赖文件夹
        3.public文件夹：一般放置一些静态资源（图片），需要注意，放在public文件夹中的静态资源，webpack进行打包的时候，会原封不动打包到dist文件夹中
        4.src文件夹（程序员源代码文件夹）：
            （1）asset文件夹：一般也是放置静态资源（一般放置多个组件共用的静态资源），需要注意，放在asset文件夹中的静态资源，webpack进行打包的时候，会把静态资源当作一个模块，打包到JS文件夹中
            里
            （2）components文件夹：一般放置的是非路由组件（全局组件）
            （3）App.vue：唯一的根组件，Vue当中的组件（.vue）
            （4）main.js：程序入口文件，也是整个程序中最先执行的文件
        5.babel.config.js：配置文件（babel相关）
        6.package.json：认为是项目‘身份证’，记录项目叫做什么、项目当中有哪些依赖、项目怎么运行
        7.package-lock.json：缓存性的文件
        8.README.md：说明性文件
    二、项目的其他配置
        1.项目运行起来的时候，让浏览器自动打开
        ---package.json
            "scripts": {
                "serve": "vue-cli-service serve --open",
                "build": "vue-cli-service build",
                "lint": "vue-cli-service lint"
            },
        2.eslint校验功能关闭
        ---vue.config.js
            lintOnSave:false, //关闭eslint
        3.src文件夹简写方法，配置别名。@代表的是src文件夹，这样将来文件过多，找的时候方便很多
        ---jsconfig.json配置别名@提示
            {
                "compilerOptions": {
                    "target": "es5",
                    "module": "esnext",
                    "baseUrl": "./",
                    "moduleResolution": "node",
                    "paths": {"@/*": ["src/*"]},
                    "lib": [
                    "esnext",
                    "dom",
                    "dom.iterable",
                    "scripthost"
                    ]
                }
            }
    三、项目路由的分析
        1.vue-router：前端所谓路由就是KV键值对，其中key为URL（地址栏中的路径），value为相应的路由组件
        2.注意：项目上中下结构
        3.路由组件：Home首页路由组件、Search搜索路由组件、Login登录路由组件、Register注册路由组件
        4.非路由组件：Header组件、Footer组件
    四、完成非路由组件Header与Footer业务
        1.在咱们项目当中，不在以HTML + CSS为主，主要搞业务、逻辑
        2.在开发项目的时候
            （1）书写静态页面（HTML + CSS）
            （2）拆分组件
            （3）获取服务器的数据进行动态展示
            （4）完成相应的动态业务逻辑
        3.注意
            （1）创建组件的时候，组件的结构 + 组件的样式 + 图片资源
            （2）咱们项目采用的是less样式，浏览器不识别less样式，需要通过less、le·ss-loader进行处理less，把less样式变为css样式，浏览器才可以识别
            （3）如果想让组件识别less样式，需要在style标签的身上加上lang="less"
        4.使用组件的步骤（非路由组件）
            （1）创建或者定义组件
            （2）引入
            （3）注册
            （4）使用
    五、路由组件的搭建
        1.pages、views文件夹：经常放置路由组件,配置路由（一般放置在router文件夹中）
        2.路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字），非路由组件在使用的时候，一般都是以标签的形式使用，注册完路由，不管是路由组件还是非路由组件，身上都有$route、$router属性
            $route：一般获取1路由信息（路径、query、params等等）
            $router：一般进行编程式导航进行路由跳转（push、replace）
        3.路由的跳转的两种形式
            （1）声明式导航router-link，可以进行路由的跳转
            （2）编程式导航push、replace，可以进行路由的跳转，
            注意：声明式导航能做的，编程式导航都能做，但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑
    六、Footer组件显示与隐藏:Footer组件在Home、Search组件显示，Login、Register组件隐藏
        1.可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏
        <Footer v-show="$route.path=='/home' || $route.path=='/search'"></Footer>
        2.配置路由的时候，可以给路由添加路由元信息（meta），路由需要配置对象，它的key不能乱写
        <Footer v-show="$route.meta.showFooter"></Footer>
    八、路由传参
        1.路由跳转的两种方式
            声明式导航（route-link，务必要有to属性）
            编程式导航（利用的是组件实例的$router.push/replace方法）
        2.路由传参，参数的两种写法
            params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
            query参数：不属于路径当中的一部分，类似与ajax中的queryString /home?k=v&k=v，不需要占位
    九、路由传参相关面试题
        1.路由传递参数（对象写法）path是否可以结合params参数一起使用？
            答：路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是path这种写法不能与params参数一起使用
            this.$router.push({path:'/search',params:{keyWord:this.keyWord},query:{k:this.keyWord.toLocaleUpperCase()}})
        2.如何指定params参数可传可不传？
            答：配置路由的时候，占位了（params参数），但是路由跳转的时候不传递params参数，路径会出现问题：http://localhost:8080/#/?k=QWE,在配置路由的时候，在占位的后面加上一个问号，代表params参数可传可不传
            this.$router.push({name:'searchRoute',query:{k:this.keyWord.toLocaleUpperCase()}})
        3.params参数可以传递也可以不传递，但是如果传递的是空串，如何解决？
            答：params参数传递的是空串，路径会出现问题：http://localhost:8080/#/?k=QWE,使用undefined解决params参数可以传递也可以不传递（空串）
            this.$router.push({name:'searchRoute',params:{keyWord:'' || undefined},query:{k:this.keyWord.toLocaleUpperCase()}})
        4.路由组件能不能传递props数据？
            答：可以，有三种写法
## day2
    一、编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误（声明式导航没有这样的问题，因为vue-router底层已经处理好了；编程式导航存在这样的问题）
        1.为什么编程式导航进行路由跳转的时候，就有这种警告错误？
        "vue-router": "^3.5.4"：最新的vue-router引入promise
        2.通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决
        3.可以通过下面的代码解决这个错误（治标不治本，将来在别的组件当中push/replace，编程式导航还是有类似的错误）
        this.$router.push({name:'searchRoute',params:{keyWord:this.keyWord},query:{k:this.keyWord.toLocaleUpperCase()}},()=>{},()=>{})
    二、axios二次封装
        1.为什么需要进行二次封装axios？
        请求拦截器、响应拦截器：请求拦截器，可以在发请求之前可以处理一些业务、响应拦截器，当服务器数据返回以后，可以处理一些事情
        2.在项目当中经常使用API文件夹（axios），接口当中路径都带有/api，baseURL:'/api'，如：http://xxx.xxx:8080/api
        3.接口统一管理，项目小，完全可以在组件的生命周期函数中发请求，项目大，axios.get('xxx')
        4.跨域问题：协议、域名、端口号不同请求
            http://localhost:8080/#/home   ---前端项目本地服务器
            http://gmall-h5-api.atguigu.cn ---后台服务器
    三、nprogress进度条的使用：start-进度条开始，done-进度条结束，颜色可以修改，需要修改它的样式
    四、vuex状态管理库（插件）
        1.集中式管理项目中组件共用的数据
        2.基本使用,项目过大，数据过多，可以让Vuex实现模块式开发
    五、防抖与节流
        1.防抖：前面所有的触发都被取消，最后一次在规定的时间之后才会触发，只会执行一次
        2.节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，不频繁触发变为少量触发
    六、mock数据（模拟）：需要用到mockjs插件（生成随机数据，拦截 Ajax 请求）
        1.使用步骤
            （1）在项目的src文件夹中创建mock文件夹
            （2）准备JSON数据（假数据），在mock文件夹中创建相应的JSON文件（必须格式化一下）
            （3）把mock数据需要的图片放置在public文件夹中（public文件夹打包时，会把相应资源原封不动打包到dist文件夹中）
            （4）创建mockServe.js通过mockjs插件实现模拟数据
            （5）mockServe.js文件在入口文件中引入（至少需要执行一次，才能模拟数据）
    七、轮播图（swiper，安装swiper插件，安装5版本）
        （1）引包（相应JS、CSS）
        （2）页面中结构务必要有
        （3）（页面中结构务必要有）：new Swiper实例【轮播图添加动态效果】
        watch+$nextTick:数据监听（数据发生了变化）、页面加载完成（v-for运行完成）
        （$nextTick:将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上）
    八、组件间通信的方式
        1.props：父组件-->子组件（频繁）
        2.自定义事件：@on、@emit，子组件-->父组件
        3.全局事件总线：$bus,全能
        4.pubsub-js：vue当中几乎不用，全能
        5.插槽
        6.vuex
        