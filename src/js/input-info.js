/**
 * Created by may on 2018/3/2.
 */
{
    let view = {
        el:　'main > .input-info-wrapper',
        template: `<h3>歌曲详情</h3>
        <form class="input-info-area clearfix">
        <img src="./img/song.jpg" alt="封面占位">
        <div class="input-info">
        <div class="form-row">
        <input type="text" class="short" placeholder="歌曲名字">
        <input type="text" class="short" placeholder="歌手名字">
        </div>
        <input type="text" class="long" placeholder="外链地址">
        <input type="submit" class="button" value="保存">
        </div>
        </form>`,
        render (data) {
            $(this.el).html(this.template)
        }
    }

    let model = {}
    let controller = {
        init (view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
        }
    }
    controller.init(view, model)
}