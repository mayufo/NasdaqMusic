{
    let view = {
        el: '.tab',
        init() {
            this.$el = $(this.el)
        }
    }
    let model = {}
    let controller = {
        init (view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvent()
        },
        bindEvent () {
            this.view.$el.on('click', 'a', (e) => {
                let $a = $(e.currentTarget)
                $a.addClass('active').siblings().removeClass('active')
                console.log($a.attr('data-name'))
                window.eventHub.emit('tabs', $a.attr('data-name'))
            })
        }
    }
    controller.init(view, model)
}