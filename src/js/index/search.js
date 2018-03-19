{
    let view = {
        el: '.search',
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
        },
        bindEvent () {
            window.eventHub.on('tabs', (data) => {
                if (data === 'search') {
                    this.view.$el.show()
                } else {
                    this.view.$el.hide()
                }
            })
        }
    }
    controller.init(view, model)
}