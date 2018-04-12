{
    let view = {
        el: '.recommend .new-content',
        init() {
            this.$el = $(this.view)
        },
        template: `<li>
                    <a href="./song.html?id={{song.id}}">
                        <h4>{{song.name}}</h4>
                        <div>{{song.singer}}</div>
                        <i class="iconfont icon-play"></i>
                    </a>
                </li>`,
        render(data) {
            let songs = data.songs
            console.log(1)

            songs.map((song) => {
                let $li = $(this.template
                    .replace('{{song.name}}', song.name)
                    .replace('{{song.singer}}', song.singer)
                    .replace('{{song.id}}', song.id))

                $(this.el).append($li)
            })
        }
    }
    let model = {
        data: {
            songs: [],
        },
        find () {
            let query = new AV.Query('Song')
            return query.find().then((response) => {
                this.data.songs = response.map((song) => {
                    return {id: song.id, ...song.attributes}
                })
                return response
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.bindEvent()
            this.model.find().then(() => {
                this.view.render(this.model.data)
            })
        },
        bindEvent () {

        }
    }

    controller.init(view, model)
}
