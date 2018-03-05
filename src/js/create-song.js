/**
 * Created by may on 2018/3/2.
 */
{
    let view = {
        el: 'main > .create-song',
        template: '新建歌曲',
        render(data) {
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on('new', (data) => {
                this.active()
            })
            window.eventHub.on('select', (data) => {
                this.deActive()
            })
            $(this.view.el).on('click', () => {
                window.eventHub.emit('new')
            })
        },
        active() {
            $(this.view.el).addClass('active')
        },
        deActive() {
            $(this.view.el).removeClass('active')
        }
    }
    controller.init(view, model)
}