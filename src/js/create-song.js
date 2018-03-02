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
        }
    }
    controller.init(view, model)
}