/**
 * Created by may on 2018/3/2.
 */
{
    let view = {
        el: 'main > .song-list-wrapper',
        template: `<h3>歌曲列表</h3>
        <ol class="song-list">
            <li class="active">
                <div class="long">B-15 [Liberation, Catalysis]</div>
                <div class="short">鷺巣詩郎</div>
                <div class="short">5:00</div>
            </li>
            <li>
                <div class="long">{禁じられた游び}(TV size)(OPテーマ)</div>
                <div class="short">光宗信吉</div>
                <div class="short">5:00</div>
            </li>
            <li>
                <div class="long">川べりの家</div>
                <div class="short">松崎名央</div>
                <div class="short">5:00</div>
            </li>
        </ol>`,
        render(data) {
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