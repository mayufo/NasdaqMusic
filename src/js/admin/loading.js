{
    let view = {
        el: '.loading',
        show () {
            $(this.el).show()
        },
        hide () {
            $(this.el).hide()
        }
    }
    let controller = {
        init(view) {
            this.view = view
            this.bindEventHub()
        },
        bindEventHub() {
            window.eventHub.on('showLoading', () => {
                this.view.show()
            })
            window.eventHub.on('hideLoading', () => {
                this.view.hide()
            })
        }
    }
    controller.init(view)
}