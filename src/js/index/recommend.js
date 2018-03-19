{
    let view = {
        el: '.recommend',
        init () {
            this.$el = $(this.el)
        }
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvent()
            this.loadModuleList()
            this.loadModuleNew()
        },
        bindEvent () {
            window.eventHub.on('tabs', (data) => {
                if (data === 'recommend') {
                    this.view.$el.show()
                } else {
                    this.view.$el.hide()
                }
            })
        },
        loadModuleList () {
            let script = document.createElement('script')
            script.src = './js/index/recommend-list.js'
            document.body.appendChild(script)
        },
        loadModuleNew () {
            let script = document.createElement('script')
            script.src = './js/index/recommend-new.js'
            document.body.appendChild(script)
        }
    }
    controller.init(view, model)
}