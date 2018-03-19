{
    let view = {
        el: '.recommend .list',
        init() {
            this.$el = $(this.view)
        },
        render() {}
    }
    let model = {

    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model

            this.bindEvent()
        },
        bindEvent () {

        }
    }

    controller.init(view, model)
}